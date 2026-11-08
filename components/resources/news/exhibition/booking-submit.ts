/* =========================================================
   booking-submit.ts
   恒永达官网｜展会预约表单公用逻辑（右侧表单 + 公告条弹窗共用）

   说明：
   1. 附件规则与后端 lib/cloudflare/booking.ts 共用一份（最多 5 个、合计 20 MB、指定格式）
   2. 提交统一用 multipart/form-data：字段 + attachments 文件
   3. 返回的 reason 对应 medica-2026-booking.ts 里 messages 的 key，直接取提示语
========================================================= */

import type { InquiryErrorType } from "@/lib/analytics/track-event";
import {
  BOOKING_ATTACHMENT_RULES,
  formatBookingFileSize,
  isAllowedBookingFile,
} from "@/lib/cloudflare/booking";

export { formatBookingFileSize };

/** <input type="file" accept> */
export const BOOKING_ATTACHMENT_ACCEPT = BOOKING_ATTACHMENT_RULES.extensions
  .map((extension) => `.${extension}`)
  .join(",");

/**
 * 把新选的文件加进已选列表。
 * 超过个数 / 总大小、空文件、格式不支持的文件不加入，rejected = true 时前端提示。
 */
export function addBookingFiles(current: File[], incoming: File[]): { files: File[]; rejected: boolean } {
  const files = [...current];
  let totalSize = files.reduce((sum, file) => sum + file.size, 0);
  let rejected = false;

  for (const file of incoming) {
    const duplicate = files.some(
      (item) => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified,
    );
    if (duplicate) continue;

    if (
      file.size <= 0 ||
      !isAllowedBookingFile(file.name) ||
      files.length >= BOOKING_ATTACHMENT_RULES.maxCount ||
      totalSize + file.size > BOOKING_ATTACHMENT_RULES.maxTotalBytes
    ) {
      rejected = true;
      continue;
    }

    files.push(file);
    totalSize += file.size;
  }

  return { files, rejected };
}

export type BookingFields = {
  name: string;
  email: string;
  contact: string;
  message: string;
  locale: string;
  currentUrl: string;
};

export type BookingSubmitResult =
  | { ok: true }
  | {
      ok: false;
      reason: "tooFrequent" | "closed" | "attachmentInvalid" | "submitFailed";
      errorType: InquiryErrorType;
    };

export async function submitBooking(fields: BookingFields, files: File[]): Promise<BookingSubmitResult> {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
  files.forEach((file) => formData.append("attachments", file, file.name));

  let response: Response;
  try {
    response = await fetch("/api/inquiry/booking/", { method: "POST", body: formData });
  } catch {
    return { ok: false, reason: "submitFailed", errorType: "network_error" };
  }

  if (response.ok) return { ok: true };
  if (response.status === 429) return { ok: false, reason: "tooFrequent", errorType: "rate_limit" };

  const data = (await response.json().catch(() => ({}))) as { error?: string };

  if (data.error === "booking_closed") return { ok: false, reason: "closed", errorType: "api_error" };
  if (response.status === 413 || data.error?.includes("attachment")) {
    return { ok: false, reason: "attachmentInvalid", errorType: "attachment_error" };
  }

  return { ok: false, reason: "submitFailed", errorType: "api_error" };
}
