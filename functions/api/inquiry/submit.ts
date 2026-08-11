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
  type InquiryPagesHandler,
} from "../../../lib/cloudflare/inquiry";

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
  email: {
    filename: string;
    content: string;
  };
  digest: string;
};

type ParsedInquiryRequest = {
  body: Record<string, unknown>;
  uploadedAttachments: File[];
};

const MAX_ATTACHMENT_COUNT = 5;
const MAX_SINGLE_ATTACHMENT_BYTES =
  20 * 1024 * 1024;
const MAX_TOTAL_ATTACHMENT_BYTES =
  20 * 1024 * 1024;
const MAX_MULTIPART_BODY_BYTES =
  24 * 1024 * 1024;

const ALLOWED_ATTACHMENT_EXTENSIONS =
  new Set([
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "jpg",
    "jpeg",
    "png",
    "webp",
    "zip",
    "rar",
    "dxf",
    "dwg",
  ]);

function getFileExtension(
  fileName: string,
): string {
  const lastDotIndex =
    fileName.lastIndexOf(".");

  if (
    lastDotIndex < 0 ||
    lastDotIndex === fileName.length - 1
  ) {
    return "";
  }

  return fileName
    .slice(lastDotIndex + 1)
    .toLowerCase();
}

function normalizeUploadedFileName(
  fileName: string,
  fallbackIndex: number,
): string {
  const cleanedName =
    cleanText(fileName, 180)
      .replace(
        /[\\/:*?"<>|\u0000-\u001f\u007f]/g,
        "_",
      )
      .trim();

  return (
    cleanedName ||
    `attachment-${fallbackIndex + 1}`
  );
}

function arrayBufferToBase64(
  buffer: ArrayBuffer,
): string {
  const bytes =
    new Uint8Array(buffer);

  const chunkSize = 0x8000;
  let binary = "";

  for (
    let index = 0;
    index < bytes.length;
    index += chunkSize
  ) {
    const chunk =
      bytes.subarray(
        index,
        Math.min(
          index + chunkSize,
          bytes.length,
        ),
      );

    binary +=
      String.fromCharCode(...chunk);
  }

  return btoa(binary);
}

async function createFileDigest(
  buffer: ArrayBuffer,
): Promise<string> {
  const digestBuffer =
    await crypto.subtle.digest(
      "SHA-256",
      buffer,
    );

  return Array.from(
    new Uint8Array(digestBuffer),
  )
    .map((byte) =>
      byte.toString(16).padStart(2, "0"),
    )
    .join("");
}

/**
 * 同时兼容：
 * 1. 原有 application/json 请求
 * 2. 包含真实附件的 multipart/form-data 请求
 */
async function readInquiryRequest(
  request: Request,
): Promise<ParsedInquiryRequest> {
  const contentType =
    request.headers
      .get("Content-Type")
      ?.toLowerCase() || "";

  if (
    !contentType.startsWith(
      "multipart/form-data",
    )
  ) {
    return {
      body:
        await readJsonBody(
          request,
          64_000,
        ),
      uploadedAttachments: [],
    };
  }

  const contentLength =
    Number(
      request.headers.get(
        "Content-Length",
      ) || "0",
    );

  if (
    Number.isFinite(contentLength) &&
    contentLength >
      MAX_MULTIPART_BODY_BYTES
  ) {
    throw new InquiryRequestError(
      413,
      "attachments_total_too_large",
    );
  }

  const formData =
    await request.formData();

  const body:
    Record<string, unknown> = {};

  for (
    const [key, value]
    of formData.entries()
  ) {
    if (typeof value === "string") {
      body[key] = value;
    }
  }

  const uploadedAttachments =
    formData
      .getAll("attachments")
      .filter(
        (value): value is File =>
          typeof value !== "string",
      );

  return {
    body,
    uploadedAttachments,
  };
}

async function prepareUploadedAttachments(
  files: File[],
): Promise<PreparedAttachment[]> {
  if (
    files.length >
    MAX_ATTACHMENT_COUNT
  ) {
    throw new InquiryRequestError(
      400,
      "too_many_attachments",
    );
  }

  let totalSize = 0;

  const preparedAttachments:
    PreparedAttachment[] = [];

  for (
    let index = 0;
    index < files.length;
    index += 1
  ) {
    const file = files[index];

    if (file.size <= 0) {
      throw new InquiryRequestError(
        400,
        "attachment_empty",
      );
    }

    if (
      file.size >
      MAX_SINGLE_ATTACHMENT_BYTES
    ) {
      throw new InquiryRequestError(
        413,
        "attachment_too_large",
      );
    }

    totalSize += file.size;

    if (
      totalSize >
      MAX_TOTAL_ATTACHMENT_BYTES
    ) {
      throw new InquiryRequestError(
        413,
        "attachments_total_too_large",
      );
    }

    const safeFileName =
      normalizeUploadedFileName(
        file.name,
        index,
      );

    const extension =
      getFileExtension(
        safeFileName,
      );

    if (
      !ALLOWED_ATTACHMENT_EXTENSIONS
        .has(extension)
    ) {
      throw new InquiryRequestError(
        400,
        "attachment_type_not_allowed",
      );
    }

    const arrayBuffer =
      await file.arrayBuffer();

    const digest =
      await createFileDigest(
        arrayBuffer,
      );

    preparedAttachments.push({
      metadata: {
        name: safeFileName,
        type:
          file.type ||
          "application/octet-stream",
        size: file.size,
      },
      email: {
        filename: safeFileName,
        content:
          arrayBufferToBase64(
            arrayBuffer,
          ),
      },
      digest,
    });
  }

  return preparedAttachments;
}

/* =========================================================
   清理附件元数据
   旧 JSON 请求只接收附件元数据；multipart 请求可接收真实文件
========================================================= */

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

      const name =
        cleanText(record.name, 180);

      const type =
        cleanText(record.type, 100);

      const rawSize =
        Number(record.size);

      if (!name) {
        return null;
      }

      return {
        name,
        type,

        size:
          Number.isFinite(rawSize) &&
          rawSize >= 0
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

function formatFileSize(
  bytes: number,
): string {
  if (bytes >= 1024 * 1024) {
    return `${(
      bytes /
      1024 /
      1024
    ).toFixed(2)} MB`;
  }

  if (bytes >= 1024) {
    return `${(
      bytes /
      1024
    ).toFixed(2)} KB`;
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
 * POST /api/inquiry/submit
 *
 * 同时兼容：
 * 1. 首页简版询盘
 * 2. 联系我们详细询盘
 * 3. 图纸申请
 * 4. 经销商合作申请
 *
 * 附件当前仅接收：
 * - 文件名
 * - 文件类型
 * - 文件大小
 *
 * multipart/form-data 请求可以接收原始附件文件。
 */
export const onRequestPost:
  InquiryPagesHandler = async ({
    request,
    env,
  }) => {
    try {
      ensureSameOrigin(request);

      const {
        body,
        uploadedAttachments,
      } =
        await readInquiryRequest(
          request,
        );

      const preparedAttachments =
        await prepareUploadedAttachments(
          uploadedAttachments,
        );

      const name =
        cleanText(body.name, 100);

      const company =
        cleanText(body.company, 160);

      const email =
        normalizeEmail(body.email);

      const phone =
        cleanText(body.phone, 100);

      const region =
        cleanText(body.region, 160);

      /*
       * 首页简版表单使用：
       * product / application
       *
       * 详细表单使用：
       * productType / projectStage
       */
      const legacyProduct =
        cleanText(body.product, 200);

      const legacyApplication =
        cleanText(body.application, 200);

      const requestType =
        cleanText(
          body.requestType,
          160,
        ) || "Website Inquiry";

      const productType =
        cleanText(
          body.productType,
          200,
        ) || legacyProduct;

      const targetModel =
        cleanText(
          body.targetModel,
          200,
        );

      const projectStage =
        cleanText(
          body.projectStage,
          160,
        ) || legacyApplication;

      const message =
        cleanText(
          body.message,
          4_000,
        );

      const locale =
        cleanText(
          body.locale,
          20,
        ) || "unknown";

      const productName =
        cleanText(
          body.productName,
          240,
        );

      const productSeries =
        cleanText(
          body.productSeries,
          200,
        );

      const productModel =
        cleanText(
          body.productModel,
          240,
        );

      const currentUrl =
        cleanText(
          body.currentUrl,
          2_048,
        );

      const isCadRequest =
        requestType.toUpperCase() ===
        "CAD";

      const displayedName =
        name ||
        (isCadRequest
          ? "Customer"
          : "");

      const displayedMessage =
        message ||
        (isCadRequest
          ? "No additional CAD requirements provided."
          : "");

      const attachments =
        preparedAttachments.length > 0
          ? preparedAttachments.map(
              (attachment) =>
                attachment.metadata,
            )
          : normalizeAttachments(
              body.attachments,
            );

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

      if (
        !productType ||
        (!message && !isCadRequest)
      ) {
        return jsonResponse(
          {
            success: false,
            error:
              "required_fields_missing",
          },
          400,
        );
      }

      const emailStorageId =
        await sha256(email);

      const verifiedKey =
        `inquiry:verified:${emailStorageId}`;

      const rawVerifiedRecord =
        await env.INQUIRY_KV.get(
          verifiedKey,
        );

      if (!rawVerifiedRecord) {
        return jsonResponse(
          {
            success: false,
            error:
              "email_not_verified",
          },
          403,
        );
      }

      let verifiedRecord:
        VerifiedRecord;

      try {
        verifiedRecord =
          JSON.parse(
            rawVerifiedRecord,
          ) as VerifiedRecord;
      }
      catch {
        await env.INQUIRY_KV.delete(
          verifiedKey,
        );

        return jsonResponse(
          {
            success: false,
            error:
              "email_not_verified",
          },
          403,
        );
      }

      if (
        verifiedRecord.email !== email ||
        verifiedRecord.expiresAt <=
          Date.now()
      ) {
        await env.INQUIRY_KV.delete(
          verifiedKey,
        );

        return jsonResponse(
          {
            success: false,
            error:
              "email_verification_expired",
          },
          403,
        );
      }

      const attachmentText =
        buildAttachmentText(
          attachments,
        );

      const formFingerprint =
        await sha256(
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
            preparedAttachments.map(
              (attachment) =>
                attachment.digest,
            ),
          ]),
        );

      const referenceId =
        formFingerprint
          .slice(0, 12)
          .toUpperCase();

      const isDistributor =
        requestType ===
        "Distributor Partnership";

      const notificationHtml =
        buildEmailShell(
          isDistributor
            ? "New Distributor Partnership Application"
            : "New Website Inquiry",
          `
            <p style="margin:0 0 22px;font-size:16px;line-height:1.7;color:#263a59;">
              A new verified request has been submitted through the FOREACH website.
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
              ${buildTableRow("Target / Website / Model", targetModel)}
              ${buildTableRow("Industry / Project Stage", projectStage)}
              ${buildTableRow("Website Language", locale)}
              ${buildTableRow("Product Name", productName)}
              ${buildTableRow("Product Series", productSeries)}
              ${buildTableRow("Product Model", productModel)}
              ${buildTableRow("Current URL", currentUrl)}
              ${buildTableRow("Requirement", displayedMessage)}
              ${buildTableRow("Selected Files", attachmentText)}
            </table>

            ${
              preparedAttachments.length > 0
                ? `
                  <p style="margin:24px 0 0;font-size:13px;line-height:1.7;color:#67758a;">
                    The original customer files are attached to this notification.
                  </p>
                `
                : attachments.length > 0
                  ? `
                    <p style="margin:24px 0 0;font-size:13px;line-height:1.7;color:#67758a;">
                      Selected file names are listed for reference only.
                      The original files were not included in this submission.
                    </p>
                  `
                  : ""
            }

            <p style="margin:12px 0 0;font-size:13px;line-height:1.7;color:#67758a;">
              Reply directly to this email to contact the customer.
            </p>
          `,
        );

      const confirmationHtml =
        buildEmailShell(
          isDistributor
            ? "Application Received"
            : "Inquiry Received",
          `
            <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#263a59;">
              Dear ${escapeHtml(displayedName)},
            </p>

            <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#263a59;">
              Thank you for contacting FOREACH.
              We have received your request and our team will review it shortly.
            </p>

            <div style="margin:22px 0;padding:18px;background:#f4f7fa;border-left:4px solid #09e9b4;font-size:14px;line-height:1.8;color:#263a59;">
              <strong>Reference:</strong>
              ${escapeHtml(referenceId)}
              <br />

              <strong>Request Type:</strong>
              ${escapeHtml(requestType)}
              <br />

              <strong>Product:</strong>
              ${escapeHtml(
                productType ||
                  targetModel ||
                  "-",
              )}
            </div>

            ${
              preparedAttachments.length > 0
                ? `
                  <p style="margin:0;font-size:14px;line-height:1.7;color:#596980;">
                    Your selected files have been received successfully.
                  </p>
                `
                : attachments.length > 0
                  ? `
                    <p style="margin:0;font-size:14px;line-height:1.7;color:#596980;">
                      If required, please reply to this email with the original files.
                    </p>
                  `
                  : ""
            }

            <p style="margin:20px 0 0;font-size:14px;line-height:1.7;color:#596980;">
              感谢您的提交。恒永达团队将尽快查看需求并与您联系。
            </p>
          `,
        );

      const notificationText =
        `New FOREACH website request\n` +
        `Reference: ${referenceId}\n` +
        `Name: ${name || "-"}\n` +
        `Company: ${company}\n` +
        `Email: ${email}\n` +
        `Phone / WhatsApp: ${phone || "-"}\n` +
        `Country / Region: ${region || "-"}\n` +
        `Request Type: ${requestType}\n` +
        `Product Type: ${productType || "-"}\n` +
        `Target / Website / Model: ${targetModel || "-"}\n` +
        `Industry / Project Stage: ${projectStage || "-"}\n` +
        `Website Language: ${locale}\n` +
        `Product Name: ${productName || "-"}\n` +
        `Product Series: ${productSeries || "-"}\n` +
        `Product Model: ${productModel || "-"}\n` +
        `Current URL: ${currentUrl || "-"}\n` +
        `Requirement: ${displayedMessage || "-"}\n` +
        `Selected Files:\n${attachmentText}`;

      const confirmationText =
        `Dear ${displayedName},\n\n` +
        "Thank you for contacting FOREACH. We have received your request.\n" +
        `Reference: ${referenceId}\n` +
        `Request Type: ${requestType}\n` +
        `Product: ${productType || targetModel || "-"}\n\n` +
                (
          preparedAttachments.length > 0
            ? "Your selected files have been received successfully.\n\n"
            : attachments.length > 0
              ? "If required, please reply to this email with the original files.\n\n"
              : ""
        ) +
        "Our team will contact you as soon as possible.";

      await Promise.all([
        sendResendEmail(
          env.RESEND_API_KEY,
          {
            from:
              env.INQUIRY_FROM_EMAIL,

            to:
              env.INQUIRY_TO_EMAIL,

            replyTo:
              email,

            subject:
              isDistributor
                ? `[FOREACH Distributor Application] ${company} · ${region || "Unknown Region"}`
                : `[FOREACH Website Inquiry] ${company} · ${requestType}`,

            html:
              notificationHtml,

            text:
              notificationText,

            attachments:
              preparedAttachments.map(
                (attachment) =>
                  attachment.email,
              ),

            idempotencyKey:
              `inquiry-notification-${formFingerprint}`,
          },
        ),

        sendResendEmail(
          env.RESEND_API_KEY,
          {
            from:
              env.INQUIRY_FROM_EMAIL,

            to:
              email,

            subject:
              isDistributor
                ? `We received your FOREACH distributor application · ${referenceId}`
                : `We received your FOREACH inquiry · ${referenceId}`,

            html:
              confirmationHtml,

            text:
              confirmationText,

            idempotencyKey:
              `inquiry-confirmation-${formFingerprint}`,
          },
        ),
      ]);

      await env.INQUIRY_KV.delete(
        verifiedKey,
      );

      return jsonResponse({
        success: true,
        referenceId,
      });
    }
    catch (error) {
      return handleInquiryError(
        error,
        "提交网站询盘失败：",
      );
    }
  };
