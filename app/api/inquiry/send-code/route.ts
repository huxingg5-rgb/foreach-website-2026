import { buildVerificationEmail } from "@/lib/email/inquiry-email";
import {
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
} from "@/lib/cloudflare/inquiry";

import {
  getInquiryEmailConfig,
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
 * POST /api/inquiry/send-code/
 *
 * 功能：
 * 1. 校验邮箱格式
 * 2. 60 秒内禁止重复发送
 * 3. 生成六位验证码
 * 4. 验证码有效期为 10 分钟
 * 5. 验证码仅以哈希形式保存到 Upstash Redis
 * 6. 使用 Resend 发送验证码邮件
 */
export async function POST(request: Request): Promise<Response> {
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

    const redis = getInquiryRedis();
    const emailStorageId = await sha256(email);

    const codeKey =
      `inquiry:code:${emailStorageId}`;

    const sendLockKey =
      `inquiry:send-lock:${emailStorageId}`;

    /*
     * 使用 NX 原子创建发送锁。
     * 如果返回 null，说明 60 秒内已经发送过验证码。
     */
    const sendLockResult = await redis.set(
      sendLockKey,
      "1",
      {
        ex: 60,
        nx: true,
      },
    );

    if (sendLockResult !== "OK") {
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

    const codeRecord: VerificationCodeRecord = {
      email,
      salt,
      codeHash,
      attempts: 0,
      expiresAt,
    };

    await redis.set(
      codeKey,
      codeRecord,
      {
        ex: 600,
      },
    );

    const emailConfig = getInquiryEmailConfig();

    const verificationEmail = buildVerificationEmail(code, body.locale);

    try {
      await sendResendEmail(emailConfig.apiKey, {
        from: emailConfig.from,
        to: email,
        ...verificationEmail,
        idempotencyKey:
          `verification-${emailStorageId.slice(0, 24)}-${codeHash.slice(0, 24)}`,
      });
    } catch (error) {
      /*
       * 邮件发送失败时清除验证码和发送锁，
       * 允许客户立即重新尝试。
       */
      await Promise.all([
        redis.del(codeKey),
        redis.del(sendLockKey),
      ]);

      throw error;
    }

    return jsonResponse({
      success: true,
    });
  } catch (error) {
    return handleInquiryError(
      error,
      "Vercel 发送询盘验证码失败：",
    );
  }
}
