import { buildInquiryEmails } from "../../../lib/email/inquiry-email";
import {
  cleanText,
  CONTACT_INQUIRY_RATE_LIMIT,
  ensureSameOrigin,
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

/**
 * POST /api/inquiry/submit
 *
 * 同时兼容：
 * 1. 首页简版询盘
 * 2. 联系我们表单（仅姓名、公司及邮箱必填，无需验证码）
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

      const isGeneralInquiry =
        body.formType === "general_inquiry" &&
        !isCadRequest &&
        requestType !== "Distributor Partnership";

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

      if (!isGeneralInquiry && (!productType || (!message && !isCadRequest))) {
        return jsonResponse(
          {
            success: false,
            error:
              "required_fields_missing",
          },
          400,
        );
      }

      let verifiedKey = "";
      if (isGeneralInquiry) {
        const clientIp = request.headers.get("CF-Connecting-IP");
        if (clientIp) {
          const rateKey = `inquiry:general:ip:${await sha256(clientIp)}`;
          const submissions = Number(await env.INQUIRY_KV.get(rateKey) || "0");
          if (submissions >= CONTACT_INQUIRY_RATE_LIMIT.maxPerWindow) {
            return jsonResponse({ success: false, error: "too_many_requests" }, 429);
          }
          await env.INQUIRY_KV.put(rateKey, String(submissions + 1), {
            expirationTtl: CONTACT_INQUIRY_RATE_LIMIT.windowSeconds,
          });
        }
      } else {
        const emailStorageId =
          await sha256(email);

        verifiedKey =
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
      }

      const formFingerprint =
        await sha256(
          JSON.stringify([
            ...(isGeneralInquiry ? ["general_inquiry"] : []),
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

      const { notification, confirmation } = buildInquiryEmails({
        locale, referenceId, name, company, email, phone, region, requestType,
        productType, targetModel, projectStage, productName, productSeries,
        productModel, currentUrl, message, attachments,
        filesReceived: preparedAttachments.length > 0,
        emailVerified: !isGeneralInquiry,
      });

      await Promise.all([
        sendResendEmail(env.RESEND_API_KEY, {
          from: env.INQUIRY_FROM_EMAIL,
          to: env.INQUIRY_TO_EMAIL,
          subject: notification.subject,
          html: notification.html,
          text: notification.text,
          replyTo: email,
          attachments: preparedAttachments.map(attachment => attachment.email),
          idempotencyKey: `inquiry-notification-${formFingerprint}`,
        }),
        sendResendEmail(env.RESEND_API_KEY, {
          from: env.INQUIRY_FROM_EMAIL,
          to: email,
          ...confirmation,
          idempotencyKey: `inquiry-confirmation-${formFingerprint}`,
        }),
      ]);

      if (verifiedKey) {
        await env.INQUIRY_KV.delete(verifiedKey);
      }

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
