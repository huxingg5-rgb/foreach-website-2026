import {
  ensureSameOrigin,
  handleInquiryError,
  isValidEmail,
  jsonResponse,
  normalizeEmail,
  readJsonBody,
  safeEqual,
  sha256,
} from "@/lib/cloudflare/inquiry";

import {
  getInquiryRedis,
} from "@/lib/vercel/inquiry-runtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type VerificationCodeRecord = {
  email: string;
  salt: string;
  codeHash: string;
  attempts: number;
  expiresAt: number;
};

/**
 * POST /api/inquiry/verify-code/
 *
 * 验证成功后：
 * 1. 删除原验证码
 * 2. 保存邮箱已验证状态
 * 3. 验证状态有效期为 15 分钟
 * 4. 同一验证码最多允许错误输入 5 次
 */
export async function POST(request: Request): Promise<Response> {
  try {
    ensureSameOrigin(request);

    const body = await readJsonBody(request, 8_192);
    const email = normalizeEmail(body.email);
    const code = String(body.code ?? "").trim();

    if (
      !isValidEmail(email) ||
      !/^\d{6}$/.test(code)
    ) {
      return jsonResponse(
        {
          success: false,
          error: "invalid_verification_data",
        },
        400,
      );
    }

    const redis = getInquiryRedis();
    const emailStorageId = await sha256(email);

    const codeKey =
      `inquiry:code:${emailStorageId}`;

    const verifiedKey =
      `inquiry:verified:${emailStorageId}`;

    const record =
      await redis.get<VerificationCodeRecord>(codeKey);

    if (!record) {
      return jsonResponse(
        {
          success: false,
          error: "verification_code_missing",
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
      await redis.del(codeKey);

      return jsonResponse(
        {
          success: false,
          error: "verification_code_expired",
        },
        400,
      );
    }

    const submittedHash =
      await sha256(`${record.salt}:${code}`);

    const isCorrect =
      safeEqual(submittedHash, record.codeHash);

    if (!isCorrect) {
      const nextAttempts =
        Number(record.attempts || 0) + 1;

      if (nextAttempts >= 5) {
        await redis.del(codeKey);
      } else {
        const remainingSeconds = Math.max(
          60,
          Math.ceil(
            (record.expiresAt - Date.now()) / 1000,
          ),
        );

        await redis.set(
          codeKey,
          {
            ...record,
            attempts: nextAttempts,
          },
          {
            ex: remainingSeconds,
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
      redis.set(
        verifiedKey,
        {
          email,
          verifiedAt,
          expiresAt:
            verifiedAt + 15 * 60 * 1000,
        },
        {
          ex: 900,
        },
      ),

      redis.del(codeKey),
    ]);

    return jsonResponse({
      success: true,
    });
  } catch (error) {
    return handleInquiryError(
      error,
      "Vercel 校验询盘验证码失败：",
    );
  }
}