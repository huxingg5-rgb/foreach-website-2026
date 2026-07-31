/**
 * Cloudflare Pages Functions 询盘公共工具
 *
 * 说明：
 * 1. 不依赖 Node.js API，可直接运行在 Cloudflare Workers Runtime
 * 2. 使用 Cloudflare KV 保存验证码和验证状态
 * 3. 使用 Resend HTTP API 发送邮件
 * 4. 所有密钥均从 Cloudflare 环境变量读取
 */

export interface InquiryKvNamespace {
  get(key: string): Promise<string | null>;

  put(
    key: string,
    value: string,
    options?: {
      expirationTtl?: number;
    },
  ): Promise<void>;

  delete(key: string): Promise<void>;
}

export interface InquiryEnv {
  INQUIRY_KV: InquiryKvNamespace;
  RESEND_API_KEY: string;
  INQUIRY_FROM_EMAIL: string;
  INQUIRY_TO_EMAIL: string;
}

export interface InquiryFunctionContext {
  request: Request;
  env: InquiryEnv;
}

export type InquiryPagesHandler = (
  context: InquiryFunctionContext,
) => Response | Promise<Response>;

export class InquiryRequestError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string) {
    super(code);
    this.status = status;
    this.code = code;
  }
}

type ResendEmailAttachment = {
  filename: string;
  content: string;
};

type ResendEmailInput = {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: ResendEmailAttachment[];
  idempotencyKey?: string;
};

/**
 * 返回统一 JSON。
 *
 * API 不直接返回中文或英文提示，
 * 让官网前端继续使用当前页面对应语言的提示文案。
 */
export function jsonResponse(
  data: Record<string, unknown>,
  status = 200,
): Response {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

/**
 * 只允许官网自身发起请求。
 */
export function ensureSameOrigin(request: Request): void {
  const origin = request.headers.get("Origin");

  if (!origin) {
    return;
  }

  const requestOrigin = new URL(request.url).origin;

  if (origin !== requestOrigin) {
    throw new InquiryRequestError(403, "origin_not_allowed");
  }
}

/**
 * 限制请求体大小并读取 JSON。
 */
export async function readJsonBody(
  request: Request,
  maxBytes = 32_768,
): Promise<Record<string, unknown>> {
  const contentLength = Number(request.headers.get("Content-Length") || "0");

  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new InquiryRequestError(413, "request_too_large");
  }

  const rawBody = await request.text();
  const bodyBytes = new TextEncoder().encode(rawBody).byteLength;

  if (bodyBytes > maxBytes) {
    throw new InquiryRequestError(413, "request_too_large");
  }

  try {
    const parsedBody = JSON.parse(rawBody) as unknown;

    if (
      !parsedBody ||
      typeof parsedBody !== "object" ||
      Array.isArray(parsedBody)
    ) {
      throw new InquiryRequestError(400, "invalid_json");
    }

    return parsedBody as Record<string, unknown>;
  } catch (error) {
    if (error instanceof InquiryRequestError) {
      throw error;
    }

    throw new InquiryRequestError(400, "invalid_json");
  }
}

/**
 * 清理普通文本并限制长度。
 */
export function cleanText(value: unknown, maxLength: number): string {
  return String(value ?? "").trim().slice(0, maxLength);
}

/**
 * 邮箱统一转为小写。
 */
export function normalizeEmail(value: unknown): string {
  return cleanText(value, 254).toLowerCase();
}

/**
 * 基础邮箱格式校验。
 */
export function isValidEmail(email: string): boolean {
  return (
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)
  );
}

/**
 * 使用 Web Crypto 生成六位验证码。
 */
export function createSixDigitCode(): string {
  const randomValues = new Uint32Array(1);

  crypto.getRandomValues(randomValues);

  return String(100000 + (randomValues[0] % 900000));
}

/**
 * 生成随机十六进制字符串。
 */
export function createRandomHex(byteLength = 16): string {
  const bytes = new Uint8Array(byteLength);

  crypto.getRandomValues(bytes);

  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * SHA-256 哈希。
 */
export async function sha256(value: string): Promise<string> {
  const encodedValue = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encodedValue);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * 固定长度字符串比较，减少时序差异。
 */
export function safeEqual(first: string, second: string): boolean {
  if (first.length !== second.length) {
    return false;
  }

  let difference = 0;

  for (let index = 0; index < first.length; index += 1) {
    difference |= first.charCodeAt(index) ^ second.charCodeAt(index);
  }

  return difference === 0;
}

/**
 * 防止客户输入破坏邮件 HTML。
 */
export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function htmlText(value: string): string {
  return escapeHtml(value).replaceAll("\n", "<br />");
}

/**
 * FOREACH 品牌邮件外框。
 */
export function buildEmailShell(
  title: string,
  content: string,
): string {
  return `
<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f2f5f8;font-family:Arial,Helvetica,sans-serif;color:#173368;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f2f5f8;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #dce3eb;">
            <tr>
              <td style="padding:24px 32px;background:#173368;color:#ffffff;">
                <div style="font-size:20px;font-weight:700;letter-spacing:0.08em;">FOREACH</div>
                <div style="margin-top:8px;color:#09e9b4;font-size:14px;">${escapeHtml(title)}</div>
              </td>
            </tr>

            <tr>
              <td style="padding:32px;">
                ${content}
              </td>
            </tr>

            <tr>
              <td style="padding:18px 32px;border-top:1px solid #e2e8ef;color:#67758a;font-size:12px;line-height:1.6;">
                FOREACH · Microfluidic Components &amp; Fluidic System Solutions
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

export function buildTableRow(
  label: string,
  value: string,
): string {
  return `
<tr>
  <td style="width:150px;padding:10px 12px;border-bottom:1px solid #e5eaf0;font-weight:700;vertical-align:top;">
    ${escapeHtml(label)}
  </td>
  <td style="padding:10px 12px;border-bottom:1px solid #e5eaf0;vertical-align:top;word-break:break-word;">
    ${htmlText(value || "-")}
  </td>
</tr>
  `.trim();
}

/**
 * 通过 Resend HTTP API 发送邮件。
 */
export async function sendResendEmail(
  apiKey: string,
  input: ResendEmailInput,
): Promise<void> {
  if (!apiKey || !input.from || !input.to) {
    throw new Error("Missing Resend configuration.");
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  if (input.idempotencyKey) {
    headers["Idempotency-Key"] = input.idempotencyKey;
  }

  const payload: Record<string, unknown> = {
    from: input.from,
    to: input.to,
    subject: input.subject,
    html: input.html,
  };

  if (input.text) {
    payload.text = input.text;
  }

  if (input.replyTo) {
    payload.reply_to = input.replyTo;
  }

  if (
    input.attachments &&
    input.attachments.length > 0
  ) {
    payload.attachments = input.attachments;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(
      `Resend request failed: ${response.status} ${responseText.slice(0, 500)}`,
    );
  }
}

/**
 * 统一处理已知请求错误和未知服务器错误。
 */
export function handleInquiryError(
  error: unknown,
  logLabel: string,
): Response {
  if (error instanceof InquiryRequestError) {
    return jsonResponse(
      {
        success: false,
        error: error.code,
      },
      error.status,
    );
  }

  console.error(logLabel, error);

  return jsonResponse(
    {
      success: false,
      error: "server_error",
    },
    500,
  );
}