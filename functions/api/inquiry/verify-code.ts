import {
  ensureSameOrigin,
  handleInquiryError,
  isValidEmail,
  jsonResponse,
  normalizeEmail,
  readJsonBody,
  safeEqual,
  sha256,
  type InquiryPagesHandler,
} from "../../../lib/cloudflare/inquiry";

type CodeRecord = {
  email: string;
  salt: string;
  codeHash: string;
  attempts: number;
  expiresAt: number;
};

/**
 * POST /api/inquiry/verify-code
 *
 * 验证成功后：
 * - 删除原验证码
 * - 在 KV 中保存“邮箱已验证”状态
 * - 验证状态有效期 15 分钟
 */
export const onRequestPost: InquiryPagesHandler = async ({
  request,
  env,
}) => {
  try {
    ensureSameOrigin(request);

    const body = await readJsonBody(request, 8_192);
    const email = normalizeEmail(body.email);
    const code = String(body.code ?? "").trim();

    if (!isValidEmail(email) || !/^\d{6}$/.test(code)) {
      return jsonResponse(
        {
          success: false,
          error: "invalid_verification_data",
        },
        400,
      );
    }

    const emailStorageId = await sha256(email);
    const codeKey = `inquiry:code:${emailStorageId}`;
    const verifiedKey = `inquiry:verified:${emailStorageId}`;

    const rawRecord = await env.INQUIRY_KV.get(codeKey);

    if (!rawRecord) {
      return jsonResponse(
        {
          success: false,
          error: "verification_code_missing",
        },
        400,
      );
    }

    let record: CodeRecord;

    try {
      record = JSON.parse(rawRecord) as CodeRecord;
    } catch {
      await env.INQUIRY_KV.delete(codeKey);

      return jsonResponse(
        {
          success: false,
          error: "verification_code_invalid",
        },
        400,
      );
    }

    if (
      record.email !== email ||
      !record.salt ||
      !record.codeHash ||
      !record.expiresAt ||
      record.expiresAt <= Date.now()
    ) {
      await env.INQUIRY_KV.delete(codeKey);

      return jsonResponse(
        {
          success: false,
          error: "verification_code_expired",
        },
        400,
      );
    }

    const submittedHash = await sha256(`${record.salt}:${code}`);
    const isCorrect = safeEqual(submittedHash, record.codeHash);

    if (!isCorrect) {
      const nextAttempts = Number(record.attempts || 0) + 1;

      if (nextAttempts >= 5) {
        await env.INQUIRY_KV.delete(codeKey);
      } else {
        const remainingSeconds = Math.max(
          60,
          Math.ceil((record.expiresAt - Date.now()) / 1000),
        );

        await env.INQUIRY_KV.put(
          codeKey,
          JSON.stringify({
            ...record,
            attempts: nextAttempts,
          }),
          {
            expirationTtl: remainingSeconds,
          },
        );
      }

      return jsonResponse(
        {
          success: false,
          error: "verification_code_incorrect",
        },
        400,
      );
    }

    const verifiedAt = Date.now();

    await Promise.all([
      env.INQUIRY_KV.put(
        verifiedKey,
        JSON.stringify({
          email,
          verifiedAt,
          expiresAt: verifiedAt + 15 * 60 * 1000,
        }),
        {
          expirationTtl: 900,
        },
      ),

      env.INQUIRY_KV.delete(codeKey),
    ]);

    return jsonResponse({
      success: true,
    });
  } catch (error) {
    return handleInquiryError(error, "校验询盘验证码失败：");
  }
};