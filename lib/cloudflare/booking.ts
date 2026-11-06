/**
 * 展会快速预约（MEDICA 2026）公共逻辑
 *
 * 说明：
 * 1. Cloudflare（functions/api/inquiry/booking.ts）和本地 / Vercel（app/api/inquiry/booking/route.ts）共用
 * 2. 不要求公司、不要求邮箱验证码，主打快速提交
 * 3. 防刷：同一 IP 每小时最多 5 次（由调用方用 KV / Redis 计数）
 * 4. 暂停开关：data/resources/news/news-booking.config.ts 的 enabled
 * 5. 只给公司收件箱发通知，不给访客自动回信（邮箱未验证，避免被人拿来乱发邮件）
 * 6. 只用相对路径引用，保证 Cloudflare Functions 打包时能找到
 * 7. 附件（选填）：最多 5 个、合计 20 MB，格式与「联系我们」询盘一致，作为邮件附件发出
 */

import {
  buildEmailShell,
  buildTableRow,
  cleanText,
  InquiryRequestError,
  isValidEmail,
  normalizeEmail,
  readJsonBody,
} from "./inquiry";
import { NEWS_BOOKING_CONFIG } from "../../data/resources/news/news-booking.config";

export const BOOKING_EVENT_NAME = "MEDICA 2026";
export const BOOKING_EVENT_DETAIL = "Booth 1H39-1 · Messe Düsseldorf · Nov 16–19, 2026";

/* 暂停时直接拒收，不计数、不发邮件 */
export function assertBookingOpen(): void {
  if (!NEWS_BOOKING_CONFIG.enabled) {
    throw new InquiryRequestError(403, "booking_closed");
  }
}

export const BOOKING_RATE_LIMIT = {
  maxPerWindow: 5,
  windowSeconds: 60 * 60,
};

/* 产品系列：key 固定，前端只提交 key，邮件里显示英文名 */
export const BOOKING_PRODUCT_NAMES = {
  pumps: "Pump Series",
  valves: "Valve Series",
  probes: "Probe Series",
  fittings: "Fitting Series",
  tubing: "Tubing Series",
  "smart-control": "Smart Control Series",
  other: "Other / not sure",
} as const;

export type BookingProduct = keyof typeof BOOKING_PRODUCT_NAMES;

export const BOOKING_PRODUCTS = Object.keys(BOOKING_PRODUCT_NAMES) as BookingProduct[];

/* 附件规则：前端选文件时、后端收文件时用同一份 */
export const BOOKING_ATTACHMENT_RULES = {
  maxCount: 5,
  maxTotalBytes: 20 * 1024 * 1024,
  extensions: [
    "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx",
    "jpg", "jpeg", "png", "webp", "zip", "rar", "dxf", "dwg",
  ],
} as const;

/* multipart 请求体上限（附件 20 MB + 表单字段与编码余量） */
const BOOKING_MAX_MULTIPART_BYTES = 24 * 1024 * 1024;

export type BookingAttachment = {
  filename: string;
  /** base64，直接交给 Resend */
  content: string;
  size: number;
};

export function getFileExtension(fileName: string): string {
  const index = fileName.lastIndexOf(".");
  return index < 0 || index === fileName.length - 1 ? "" : fileName.slice(index + 1).toLowerCase();
}

export function isAllowedBookingFile(fileName: string): boolean {
  return (BOOKING_ATTACHMENT_RULES.extensions as readonly string[]).includes(getFileExtension(fileName));
}

/**
 * 读取请求：
 * 1. application/json（无附件，兼容旧前端）
 * 2. multipart/form-data（字段 + attachments 文件）
 */
export async function readBookingRequest(
  request: Request,
): Promise<{ body: Record<string, unknown>; files: File[] }> {
  const contentType = request.headers.get("Content-Type")?.toLowerCase() || "";

  if (!contentType.startsWith("multipart/form-data")) {
    return { body: await readJsonBody(request, 8_192), files: [] };
  }

  const contentLength = Number(request.headers.get("Content-Length") || "0");
  if (Number.isFinite(contentLength) && contentLength > BOOKING_MAX_MULTIPART_BYTES) {
    throw new InquiryRequestError(413, "attachments_total_too_large");
  }

  const formData = await request.formData();
  const body: Record<string, unknown> = {};

  formData.forEach((value, key) => {
    if (typeof value === "string") body[key] = value;
  });

  const files = formData
    .getAll("attachments")
    .filter((value): value is File => typeof value !== "string");

  return { body, files };
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, Math.min(index + chunkSize, bytes.length)));
  }

  return btoa(binary);
}

/**
 * 校验附件并转成邮件附件。
 * 不合规抛 InquiryRequestError（错误码都含 attachment，前端统一提示）。
 */
export async function prepareBookingAttachments(files: File[]): Promise<BookingAttachment[]> {
  if (files.length > BOOKING_ATTACHMENT_RULES.maxCount) {
    throw new InquiryRequestError(400, "too_many_attachments");
  }

  let totalSize = 0;
  const attachments: BookingAttachment[] = [];

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];

    if (file.size <= 0) {
      throw new InquiryRequestError(400, "attachment_empty");
    }

    totalSize += file.size;
    if (totalSize > BOOKING_ATTACHMENT_RULES.maxTotalBytes) {
      throw new InquiryRequestError(413, "attachments_total_too_large");
    }

    const filename =
      cleanText(file.name, 180)
        .replace(/[\\/:*?"<>|\u0000-\u001f\u007f]/g, "_")
        .trim() || `attachment-${index + 1}`;

    if (!isAllowedBookingFile(filename)) {
      throw new InquiryRequestError(400, "attachment_type_not_allowed");
    }

    attachments.push({
      filename,
      content: arrayBufferToBase64(await file.arrayBuffer()),
      size: file.size,
    });
  }

  return attachments;
}

export function formatBookingFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export type BookingSubmission = {
  name: string;
  contact: string;
  email: string;
  products: BookingProduct[];
  message: string;
  locale: string;
  currentUrl: string;
};

/**
 * 校验请求体。
 * 字段错误抛 InquiryRequestError，前端显示对应提示。
 */
export function parseBookingBody(body: Record<string, unknown>): BookingSubmission {
  const name = cleanText(body.name, 100);
  const contact = cleanText(body.contact, 100);
  const message = cleanText(body.message, 1_000);
  const email = normalizeEmail(body.email);
  const rawProducts = Array.isArray(body.products) ? body.products : [];
  const products = Array.from(
    new Set(
      rawProducts
        .map((item) => cleanText(item, 40))
        .filter((item): item is BookingProduct => item in BOOKING_PRODUCT_NAMES),
    ),
  );

  if (!name) {
    throw new InquiryRequestError(400, "name_required");
  }

  if (!isValidEmail(email)) {
    throw new InquiryRequestError(400, "invalid_email");
  }

  return {
    name,
    contact,
    email,
    products,
    message,
    locale: cleanText(body.locale, 20) || "unknown",
    currentUrl: cleanText(body.currentUrl, 2_048),
  };
}

/**
 * 通知邮件（发到公司询盘邮箱，回复直接回给访客）。
 */
export function buildBookingNotification(
  booking: BookingSubmission,
  meta: { country?: string; attachments?: Array<Pick<BookingAttachment, "filename" | "size">> } = {},
): { subject: string; html: string; text: string } {
  const productNames = booking.products
    .map((key) => BOOKING_PRODUCT_NAMES[key])
    .join(", ");

  const submittedAt = new Date().toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    hour12: false,
  });

  const rows: Array<[string, string]> = [
    ["Name", booking.name],
    ["Email", booking.email],
    ["Phone / WhatsApp", booking.contact],
    ...(productNames ? ([["Products", productNames]] as Array<[string, string]>) : []),
    ["Message", booking.message],
    [
      "Attachments",
      (meta.attachments ?? [])
        .map((file, index) => `${index + 1}. ${file.filename} (${formatBookingFileSize(file.size)})`)
        .join("\n"),
    ],
    ["Event", `${BOOKING_EVENT_NAME} · ${BOOKING_EVENT_DETAIL}`],
    ["Page language", booking.locale],
    ["Visitor country", meta.country || ""],
    ["Page", booking.currentUrl],
    ["Submitted (UTC+8)", submittedAt],
  ];

  const html = buildEmailShell(
    `${BOOKING_EVENT_NAME} Booth Meeting Request`,
    `
<p style="margin:0 0 18px;font-size:15px;line-height:1.6;">
  A visitor booked a meeting at ${BOOKING_EVENT_NAME} through the website. Reply to this email to confirm a time.
</p>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:14px;color:#1f2a3d;">
  ${rows.map(([label, value]) => buildTableRow(label, value)).join("\n")}
</table>
    `.trim(),
  );

  const text =
    `${BOOKING_EVENT_NAME} booth meeting request\n\n` +
    rows.map(([label, value]) => `${label}: ${value || "-"}`).join("\n");

  return {
    subject: `[FOREACH ${BOOKING_EVENT_NAME} Booking] ${booking.name}${productNames ? ` · ${productNames}` : ""}`,
    html,
    text,
  };
}
