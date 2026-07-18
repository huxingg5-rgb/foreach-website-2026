import { Redis } from "@upstash/redis";

import { InquiryRequestError } from "@/lib/cloudflare/inquiry";

/**
 * Vercel 询盘接口公共运行配置
 *
 * 说明：
 * 1. Upstash Redis 保存验证码、发送锁和邮箱验证状态
 * 2. Resend 负责发送验证码及询盘邮件
 * 3. 所有密钥只从服务端环境变量读取
 * 4. 不允许把密钥写入浏览器端代码
 */

let inquiryRedisClient: Redis | null = null;

function readRequiredEnvironmentVariable(
  name: string,
  errorCode: string,
): string {
  const value = String(process.env[name] || "").trim();

  if (!value) {
    throw new InquiryRequestError(500, errorCode);
  }

  return value;
}

export function getInquiryRedis(): Redis {
  if (inquiryRedisClient) {
    return inquiryRedisClient;
  }

  const url = readRequiredEnvironmentVariable(
    "UPSTASH_REDIS_REST_URL",
    "storage_not_configured",
  );

  const token = readRequiredEnvironmentVariable(
    "UPSTASH_REDIS_REST_TOKEN",
    "storage_not_configured",
  );

  inquiryRedisClient = new Redis({
    url,
    token,
  });

  return inquiryRedisClient;
}

export function getInquiryEmailConfig(): {
  apiKey: string;
  from: string;
  recipients: string[];
} {
  const apiKey = readRequiredEnvironmentVariable(
    "RESEND_API_KEY",
    "email_service_not_configured",
  );

  const from = readRequiredEnvironmentVariable(
    "INQUIRY_FROM_EMAIL",
    "email_service_not_configured",
  );

  const rawRecipients = readRequiredEnvironmentVariable(
    "INQUIRY_TO_EMAIL",
    "email_service_not_configured",
  );

  const recipients = rawRecipients
    .split(/[,;]+/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    throw new InquiryRequestError(
      500,
      "email_service_not_configured",
    );
  }

  return {
    apiKey,
    from,
    recipients,
  };
}