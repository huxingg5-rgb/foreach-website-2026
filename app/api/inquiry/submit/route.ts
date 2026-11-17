import { buildInquiryEmails } from "@/lib/email/inquiry-email";
import {
  cleanText,
  ensureSameOrigin,
  handleInquiryError,
  InquiryRequestError,
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

type VerifiedRecord = {
  email: string;
  verifiedAt: number;
  expiresAt: number;
};

type AttachmentMetadata = {
  name: string;
  type: string;
  size: number;
};

type PreparedAttachment = {
  metadata: AttachmentMetadata;
  email: { filename: string; content: string };
  digest: string;
};

const MAX_ATTACHMENT_COUNT = 5;
const MAX_SINGLE_ATTACHMENT_BYTES = 20 * 1024 * 1024;
const MAX_TOTAL_ATTACHMENT_BYTES = 20 * 1024 * 1024;
const MAX_MULTIPART_BODY_BYTES = 24 * 1024 * 1024;
const ALLOWED_ATTACHMENT_EXTENSIONS = new Set([
  "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx",
  "jpg", "jpeg", "png", "webp", "zip", "rar", "dxf", "dwg",
]);

async function readInquiryRequest(request: Request): Promise<{
  body: Record<string, unknown>;
  uploadedAttachments: File[];
}> {
  const contentType = request.headers.get("Content-Type")?.toLowerCase() || "";
  if (!contentType.startsWith("multipart/form-data")) {
    return {
      body: await readJsonBody(request, 48_000),
      uploadedAttachments: [],
    };
  }

  const contentLength = Number(request.headers.get("Content-Length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_MULTIPART_BODY_BYTES) {
    throw new InquiryRequestError(413, "attachments_total_too_large");
  }

  const formData = await request.formData();
  const body: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") body[key] = value;
  }
  return {
    body,
    uploadedAttachments: formData.getAll("attachments").filter(
      (value): value is File => typeof value !== "string",
    ),
  };
}

async function prepareUploadedAttachments(files: File[]): Promise<PreparedAttachment[]> {
  if (files.length > MAX_ATTACHMENT_COUNT) {
    throw new InquiryRequestError(400, "too_many_attachments");
  }

  let totalSize = 0;
  const preparedAttachments: PreparedAttachment[] = [];
  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    if (file.size <= 0) throw new InquiryRequestError(400, "attachment_empty");
    if (file.size > MAX_SINGLE_ATTACHMENT_BYTES) {
      throw new InquiryRequestError(413, "attachment_too_large");
    }
    totalSize += file.size;
    if (totalSize > MAX_TOTAL_ATTACHMENT_BYTES) {
      throw new InquiryRequestError(413, "attachments_total_too_large");
    }

    const safeFileName = cleanText(file.name, 180)
      .replace(/[\\/:*?"<>|\u0000-\u001f\u007f]/g, "_").trim()
      || `attachment-${index + 1}`;
    const extension = safeFileName.includes(".")
      ? safeFileName.slice(safeFileName.lastIndexOf(".") + 1).toLowerCase()
      : "";
    if (!ALLOWED_ATTACHMENT_EXTENSIONS.has(extension)) {
      throw new InquiryRequestError(400, "attachment_type_not_allowed");
    }

    const arrayBuffer = await file.arrayBuffer();
    const digestBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const digest = Array.from(new Uint8Array(digestBuffer))
      .map((byte) => byte.toString(16).padStart(2, "0")).join("");
    preparedAttachments.push({
      metadata: {
        name: safeFileName,
        type: file.type || "application/octet-stream",
        size: file.size,
      },
      email: {
        filename: safeFileName,
        content: Buffer.from(arrayBuffer).toString("base64"),
      },
      digest,
    });
  }
  return preparedAttachments;
}

function normalizeAttachments(
  value: unknown,
): AttachmentMetadata[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .slice(0, 20)
    .map((item) => {
      if (
        !item ||
        typeof item !== "object" ||
        Array.isArray(item)
      ) {
        return null;
      }

      const record =
        item as Record<string, unknown>;

      const name = cleanText(record.name, 180);
      const type = cleanText(record.type, 100);
      const rawSize = Number(record.size);

      if (!name) {
        return null;
      }

      return {
        name,
        type,
        size:
          Number.isFinite(rawSize) && rawSize >= 0
            ? Math.round(rawSize)
            : 0,
      };
    })
    .filter(
      (
        item,
      ): item is AttachmentMetadata =>
        item !== null,
    );
}

/**
 * POST /api/inquiry/submit/
 *
 * 功能：
 * 1. 校验表单字段
 * 2. 检查邮箱是否已经验证
 * 3. 给公司邮箱发送询盘通知
 * 4. 给客户发送确认邮件
 * 5. 成功后删除邮箱验证状态
 *
 * 当前附件说明：
 * - JSON 请求保留原有附件元数据行为
 * - multipart 请求接收原始附件，并附至公司通知邮件
 * - 附件数量、类型及大小限制与 Cloudflare 接口一致
 */
export async function POST(request: Request): Promise<Response> {
  try {
    ensureSameOrigin(request);

    const { body, uploadedAttachments } = await readInquiryRequest(request);
    const preparedAttachments = await prepareUploadedAttachments(uploadedAttachments);

    const name = cleanText(body.name, 100);
    const company = cleanText(body.company, 160);
    const email = normalizeEmail(body.email);
    const phone = cleanText(body.phone, 100);

    const region =
      cleanText(body.region, 160);

    /*
     * 首页简版表单使用 product / application。
     * 详细表单使用 productType / projectStage。
     * 这里同时兼容两套字段。
     */
    const legacyProduct =
      cleanText(body.product, 200);

    const legacyApplication =
      cleanText(body.application, 200);

    const requestType =
      cleanText(body.requestType, 160) ||
      "Website Inquiry";

    const productType =
      cleanText(body.productType, 200) ||
      legacyProduct;

    const targetModel =
      cleanText(body.targetModel, 200);

    const projectStage =
      cleanText(body.projectStage, 160) ||
      legacyApplication;

    const message =
      cleanText(body.message, 4_000);

    const locale =
      cleanText(body.locale, 20) ||
      "unknown";

    const productName =
      cleanText(body.productName, 240);

    const productSeries =
      cleanText(body.productSeries, 200);

    const productModel =
      cleanText(body.productModel, 240);

    const currentUrl =
      cleanText(body.currentUrl, 2_048);

    const isCadRequest =
      requestType.toUpperCase() === "CAD";

    const attachments = preparedAttachments.length > 0
      ? preparedAttachments.map((attachment) => attachment.metadata)
      : normalizeAttachments(body.attachments);

    if (!name && !isCadRequest) {
      return jsonResponse(
        {
          success: false,
          error: "name_required",
        },
        400,
      );
    }

    if (!company) {
      return jsonResponse(
        {
          success: false,
          error: "company_required",
        },
        400,
      );
    }

    if (!isValidEmail(email)) {
      return jsonResponse(
        {
          success: false,
          error: "invalid_email",
        },
        400,
      );
    }

    if (!productType || (!message && !isCadRequest)) {
      return jsonResponse(
        {
          success: false,
          error: "required_fields_missing",
        },
        400,
      );
    }

    const redis = getInquiryRedis();
    const emailStorageId = await sha256(email);

    const verifiedKey =
      `inquiry:verified:${emailStorageId}`;

    const verifiedRecord =
      await redis.get<VerifiedRecord>(verifiedKey);

    if (!verifiedRecord) {
      return jsonResponse(
        {
          success: false,
          error: "email_not_verified",
        },
        403,
      );
    }

    if (
      verifiedRecord.email !== email ||
      verifiedRecord.expiresAt <= Date.now()
    ) {
      await redis.del(verifiedKey);

      return jsonResponse(
        {
          success: false,
          error: "email_verification_expired",
        },
        403,
      );
    }

    const formFingerprint = await sha256(
      JSON.stringify([
        name,
        company,
        email,
        phone,
        region,
        requestType,
        productType,
        targetModel,
        projectStage,
        message,
        locale,
        productName,
        productSeries,
        productModel,
        currentUrl,
        attachments,
        ...(preparedAttachments.length > 0
          ? [preparedAttachments.map((attachment) => attachment.digest)]
          : []),
      ]),
    );

    const referenceId =
      formFingerprint.slice(0, 12).toUpperCase();

    const emailConfig =
      getInquiryEmailConfig();

    const { notification, confirmation } = buildInquiryEmails({
      locale, referenceId, name, company, email, phone, region, requestType,
      productType, targetModel, projectStage, productName, productSeries,
      productModel, currentUrl, message, attachments,
      filesReceived: preparedAttachments.length > 0,
    });

    await Promise.all([
      sendResendEmail(emailConfig.apiKey, {
        from: emailConfig.from,
        to: emailConfig.recipients,
        subject: notification.subject,
        html: notification.html,
        text: notification.text,
        replyTo: email,
        attachments: preparedAttachments.map(attachment => attachment.email),
        idempotencyKey: `inquiry-notification-${formFingerprint}`,
      }),
      sendResendEmail(emailConfig.apiKey, {
        from: emailConfig.from,
        to: email,
        ...confirmation,
        idempotencyKey: `inquiry-confirmation-${formFingerprint}`,
      }),
    ]);

    await redis.del(verifiedKey);

    return jsonResponse({
      success: true,
      referenceId,
    });
  } catch (error) {
    return handleInquiryError(
      error,
      "Vercel 提交网站询盘失败：",
    );
  }
}
