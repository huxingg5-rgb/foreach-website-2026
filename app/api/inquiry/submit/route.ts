import {
  buildEmailShell,
  buildTableRow,
  cleanText,
  ensureSameOrigin,
  escapeHtml,
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

function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  }

  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  return `${bytes} B`;
}

function buildAttachmentText(
  attachments: AttachmentMetadata[],
): string {
  if (attachments.length === 0) {
    return "No attachment selected.";
  }

  return attachments
    .map((attachment, index) => {
      return (
        `${index + 1}. ${attachment.name}` +
        ` · ${attachment.type || "unknown type"}` +
        ` · ${formatFileSize(attachment.size)}`
      );
    })
    .join("\n");
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

    const displayedName =
      name || (isCadRequest ? "Customer" : "");

    const displayedMessage =
      message ||
      (isCadRequest
        ? "No additional CAD requirements provided."
        : "");

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

    const attachmentText =
      buildAttachmentText(attachments);

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

    const notificationHtml = buildEmailShell(
      "New Website Inquiry",
      `
        <p style="margin:0 0 22px;font-size:16px;line-height:1.7;color:#263a59;">
          A new verified inquiry has been submitted through the FOREACH website.
        </p>

        <p style="margin:0 0 22px;font-size:13px;color:#67758a;">
          Reference:
          <strong>${escapeHtml(referenceId)}</strong>
        </p>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e1e7ee;border-collapse:collapse;font-size:14px;line-height:1.6;">
          ${buildTableRow("Name", name || "-")}
          ${buildTableRow("Company", company)}
          ${buildTableRow("Email", email)}
          ${buildTableRow("Phone / WhatsApp", phone)}
          ${buildTableRow("Country / Region", region)}
          ${buildTableRow("Request Type", requestType)}
          ${buildTableRow("Product Type", productType)}
          ${buildTableRow("Target / Competitor Model", targetModel)}
          ${buildTableRow("Project Stage", projectStage)}
          ${buildTableRow("Website Language", locale)}
          ${buildTableRow("Product Name", productName)}
          ${buildTableRow("Product Series", productSeries)}
          ${buildTableRow("Product Model", productModel)}
          ${buildTableRow("Current URL", currentUrl)}
          ${buildTableRow("Requirement", displayedMessage)}
          ${buildTableRow("Selected Files", attachmentText)}
        </table>

        ${preparedAttachments.length > 0 ? `
        <p style="margin:24px 0 0;font-size:13px;line-height:1.7;color:#67758a;">
          The original customer files are attached to this notification.
        </p>
        ` : `
        <p style="margin:24px 0 0;font-size:13px;line-height:1.7;color:#67758a;">
          File names are listed for reference only.
          The original files are not attached to this notification.
          Please ask the customer to reply with the files if required.
        </p>
        `}

        <p style="margin:12px 0 0;font-size:13px;line-height:1.7;color:#67758a;">
          Reply directly to this email to contact the customer.
        </p>
      `,
    );

    const confirmationHtml = buildEmailShell(
      "Inquiry Received",
      `
        <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#263a59;">
          Dear ${escapeHtml(displayedName)},
        </p>

        <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#263a59;">
          Thank you for contacting FOREACH.
          We have received your inquiry and our team will review your requirements.
        </p>

        <div style="margin:22px 0;padding:18px;background:#f4f7fa;border-left:4px solid #09e9b4;font-size:14px;line-height:1.8;color:#263a59;">
          <strong>Reference:</strong>
          ${escapeHtml(referenceId)}
          <br />

          <strong>Request Type:</strong>
          ${escapeHtml(requestType)}
          <br />

          <strong>Product:</strong>
          ${escapeHtml(productType || targetModel || "-")}
        </div>

        ${preparedAttachments.length > 0 ? `
        <p style="margin:0;font-size:14px;line-height:1.7;color:#596980;">
          Your selected files have been received successfully.
        </p>
        ` : `
        <p style="margin:0;font-size:14px;line-height:1.7;color:#596980;">
          If you selected drawings, BOM files, images, or other attachments,
          please reply to this confirmation email with the original files.
        </p>
        `}

        <p style="margin:20px 0 0;font-size:14px;line-height:1.7;color:#596980;">
          感谢您的询盘。恒永达团队将尽快查看需求并与您联系。
          ${preparedAttachments.length > 0
            ? "您选择的附件已成功接收。"
            : "如需提交图纸或其他附件，可直接回复本邮件并添加附件。"}
        </p>
      `,
    );

    const notificationText =
      `New FOREACH website inquiry\n` +
      `Reference: ${referenceId}\n` +
      `Name: ${name || "-"}\n` +
      `Company: ${company}\n` +
      `Email: ${email}\n` +
      `Phone / WhatsApp: ${phone || "-"}\n` +
      `Country / Region: ${region || "-"}\n` +
      `Request Type: ${requestType}\n` +
      `Product Type: ${productType || "-"}\n` +
      `Target Model: ${targetModel || "-"}\n` +
      `Project Stage: ${projectStage || "-"}\n` +
      `Website Language: ${locale}\n` +
      `Product Name: ${productName || "-"}\n` +
      `Product Series: ${productSeries || "-"}\n` +
      `Product Model: ${productModel || "-"}\n` +
      `Current URL: ${currentUrl || "-"}\n` +
      `Requirement: ${displayedMessage || "-"}\n` +
      `Selected Files:\n${attachmentText}\n\n` +
      (preparedAttachments.length > 0
        ? "The original customer files are attached to this notification."
        : "The original files are not attached. Ask the customer to reply with them if required.");

    const confirmationText =
      `Dear ${displayedName},\n\n` +
      "Thank you for contacting FOREACH. " +
      "We have received your inquiry.\n" +
      `Reference: ${referenceId}\n` +
      `Request Type: ${requestType}\n` +
      `Product: ${productType || targetModel || "-"}\n\n` +
      (preparedAttachments.length > 0
        ? "Your selected files have been received successfully.\n\n"
        : "If you selected files, please reply to this email with the original attachments.\n\n") +
      "Our team will contact you as soon as possible.";

    await Promise.all([
      sendResendEmail(
        emailConfig.apiKey,
        {
          from: emailConfig.from,
          to: emailConfig.recipients,
          replyTo: email,
          subject:
            `[FOREACH Website Inquiry] ${company} · ${requestType}`,
          html: notificationHtml,
          text: notificationText,
          ...(preparedAttachments.length > 0 ? {
            attachments: preparedAttachments.map((attachment) => attachment.email),
          } : {}),
          idempotencyKey:
            `inquiry-notification-${formFingerprint}`,
        },
      ),

      sendResendEmail(
        emailConfig.apiKey,
        {
          from: emailConfig.from,
          to: email,
          subject:
            `We received your FOREACH inquiry · ${referenceId}`,
          html: confirmationHtml,
          text: confirmationText,
          idempotencyKey:
            `inquiry-confirmation-${formFingerprint}`,
        },
      ),
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
