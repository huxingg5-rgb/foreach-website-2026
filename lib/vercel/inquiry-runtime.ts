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
 * 5. 兼容 Vercel 集成变量和 Upstash 标准变量
 */

let inquiryRedisClient: Redis | null = null;

/**
 * 按照给定顺序读取第一个有效环境变量。
 *
 * 例如 Redis URL 会优先读取：
 * 1. KV_REST_API_URL
 * 2. UPSTASH_REDIS_REST_URL
 */
function readRequiredEnvironmentVariable(
  names: string[],
  errorCode: string,
): string {
  for (const name of names) {
    const value = String(
      process.env[name] || "",
    ).trim();

    if (value) {
      return value;
    }
  }

  throw new InquiryRequestError(
    500,
    errorCode,
  );
}

/**
 * 获取询盘 Redis 客户端。
 *
 * Vercel Upstash 集成通常生成：
 * - KV_REST_API_URL
 * - KV_REST_API_TOKEN
 *
 * Upstash 控制台标准名称为：
 * - UPSTASH_REDIS_REST_URL
 * - UPSTASH_REDIS_REST_TOKEN
 *
 * 当前代码同时兼容两套名称。
 */
export function getInquiryRedis(): Redis {
  if (inquiryRedisClient) {
    return inquiryRedisClient;
  }

  const url =
    readRequiredEnvironmentVariable(
      [
        "KV_REST_API_URL",
        "UPSTASH_REDIS_REST_URL",
      ],
      "storage_not_configured",
    );

  const token =
    readRequiredEnvironmentVariable(
      [
        "KV_REST_API_TOKEN",
        "UPSTASH_REDIS_REST_TOKEN",
      ],
      "storage_not_configured",
    );

  inquiryRedisClient = new Redis({
    url,
    token,
  });

  return inquiryRedisClient;
}

/**
 * 获取 Resend 邮件配置。
 */
export function getInquiryEmailConfig(): {
  apiKey: string;
  from: string;
  recipients: string[];
} {
  const apiKey =
    readRequiredEnvironmentVariable(
      ["RESEND_API_KEY"],
      "email_service_not_configured",
    );

  const from =
    readRequiredEnvironmentVariable(
      ["INQUIRY_FROM_EMAIL"],
      "email_service_not_configured",
    );

  const rawRecipients =
    readRequiredEnvironmentVariable(
      ["INQUIRY_TO_EMAIL"],
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