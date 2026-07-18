import {
  buildEmailShell,
  createRandomHex,
  createSixDigitCode,
  ensureSameOrigin,
  handleInquiryError,
  isValidEmail,
  jsonResponse,
  normalizeEmail,
  readJsonBody,
  sendResendEmail,
  sha256,
  type InquiryPagesHandler,
} from "../../../lib/cloudflare/inquiry";

/**
 * POST /api/inquiry/send-code
 *
 * 功能：
 * 1. 校验邮箱
 * 2. 限制同一邮箱 60 秒内重复发送
 * 3. 生成六位验证码
 * 4. 验证码哈希后保存至 KV，有效期 10 分钟
 * 5. 通过 Resend 把验证码发给客户
 */
export const onRequestPost: InquiryPagesHandler = async ({
  request,
  env,
}) => {
  try {
    ensureSameOrigin(request);

    const body = await readJsonBody(request, 8_192);
    const email = normalizeEmail(body.email);

    if (!isValidEmail(email)) {
      return jsonResponse(
        {
          success: false,
          error: "invalid_email",
        },
        400,
      );
    }

    const emailStorageId = await sha256(email);
    const codeKey = `inquiry:code:${emailStorageId}`;
    const sendLockKey = `inquiry:send-lock:${emailStorageId}`;

    const existingSendLock = await env.INQUIRY_KV.get(sendLockKey);

    if (existingSendLock) {
      return jsonResponse(
        {
          success: false,
          error: "send_too_frequently",
        },
        429,
      );
    }

    const code = createSixDigitCode();
    const salt = createRandomHex(16);
    const codeHash = await sha256(`${salt}:${code}`);
    const expiresAt = Date.now() + 10 * 60 * 1000;

    const codeRecord = {
      email,
      salt,
      codeHash,
      attempts: 0,
      expiresAt,
    };

    await Promise.all([
      env.INQUIRY_KV.put(codeKey, JSON.stringify(codeRecord), {
        expirationTtl: 600,
      }),

      env.INQUIRY_KV.put(sendLockKey, "1", {
        expirationTtl: 60,
      }),
    ]);

    const html = buildEmailShell(
      "Email Verification",
      `
        <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#263a59;">
          Use the following verification code to continue your FOREACH website inquiry.
        </p>

        <div style="margin:24px 0;padding:22px;text-align:center;background:#f4f7fa;border-left:4px solid #09e9b4;font-size:34px;font-weight:700;letter-spacing:8px;color:#173368;">
          ${code}
        </div>

        <p style="margin:0;font-size:14px;line-height:1.7;color:#596980;">
          This code is valid for 10 minutes. If you did not request this code, you can ignore this email.
        </p>

        <p style="margin:22px 0 0;font-size:14px;line-height:1.7;color:#596980;">
          验证码有效期为 10 分钟。如非本人操作，请忽略本邮件。
        </p>
      `,
    );

    try {
      await sendResendEmail(env.RESEND_API_KEY, {
        from: env.INQUIRY_FROM_EMAIL,
        to: email,
        subject: `FOREACH website verification code: ${code}`,
        html,
        text:
          `FOREACH website verification code: ${code}\n` +
          "This code is valid for 10 minutes.\n" +
          "验证码有效期为 10 分钟。",
        idempotencyKey:
          `verification-${emailStorageId.slice(0, 24)}-${codeHash.slice(0, 24)}`,
      });
    } catch (error) {
      await Promise.all([
        env.INQUIRY_KV.delete(codeKey),
        env.INQUIRY_KV.delete(sendLockKey),
      ]);

      throw error;
    }

    return jsonResponse({
      success: true,
    });
  } catch (error) {
    return handleInquiryError(error, "发送询盘验证码失败：");
  }
};