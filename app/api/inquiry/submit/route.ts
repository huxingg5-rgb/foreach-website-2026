import {
  buildEmailShell,
  buildTableRow,
  cleanText,
  ensureSameOrigin,
  escapeHtml,
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
 * - 本接口只接收附件名称、类型和大小
 * - 不直接上传附件文件内容
 * - 客户可回复确认邮件发送原始附件
 */
export async function POST(request: Request): Promise<Response> {
  try {
    ensureSameOrigin(request);

    const body = await readJsonBody(request, 48_000);

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

    const attachments =
      normalizeAttachments(body.attachments);

    if (!name) {
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

    if (!productType || !message) {
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
        attachments,
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
          ${buildTableRow("Name", name)}
          ${buildTableRow("Company", company)}
          ${buildTableRow("Email", email)}
          ${buildTableRow("Phone / WhatsApp", phone)}
          ${buildTableRow("Country / Region", region)}
          ${buildTableRow("Request Type", requestType)}
          ${buildTableRow("Product Type", productType)}
          ${buildTableRow("Target / Competitor Model", targetModel)}
          ${buildTableRow("Project Stage", projectStage)}
          ${buildTableRow("Website Language", locale)}
          ${buildTableRow("Requirement", message)}
          ${buildTableRow("Selected Files", attachmentText)}
        </table>

        <p style="margin:24px 0 0;font-size:13px;line-height:1.7;color:#67758a;">
          File names are listed for reference only.
          The original files are not attached to this notification.
          Please ask the customer to reply with the files if required.
        </p>

        <p style="margin:12px 0 0;font-size:13px;line-height:1.7;color:#67758a;">
          Reply directly to this email to contact the customer.
        </p>
      `,
    );

    const confirmationHtml = buildEmailShell(
      "Inquiry Received",
      `
        <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#263a59;">
          Dear ${escapeHtml(name)},
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

        <p style="margin:0;font-size:14px;line-height:1.7;color:#596980;">
          If you selected drawings, BOM files, images, or other attachments,
          please reply to this confirmation email with the original files.
        </p>

        <p style="margin:20px 0 0;font-size:14px;line-height:1.7;color:#596980;">
          感谢您的询盘。恒永达团队将尽快查看需求并与您联系。
          如需提交图纸或其他附件，可直接回复本邮件并添加附件。
        </p>
      `,
    );

    const notificationText =
      `New FOREACH website inquiry\n` +
      `Reference: ${referenceId}\n` +
      `Name: ${name}\n` +
      `Company: ${company}\n` +
      `Email: ${email}\n` +
      `Phone / WhatsApp: ${phone || "-"}\n` +
      `Country / Region: ${region || "-"}\n` +
      `Request Type: ${requestType}\n` +
      `Product Type: ${productType || "-"}\n` +
      `Target Model: ${targetModel || "-"}\n` +
      `Project Stage: ${projectStage || "-"}\n` +
      `Website Language: ${locale}\n` +
      `Requirement: ${message}\n` +
      `Selected Files:\n${attachmentText}\n\n` +
      "The original files are not attached. " +
      "Ask the customer to reply with them if required.";

    const confirmationText =
      `Dear ${name},\n\n` +
      "Thank you for contacting FOREACH. " +
      "We have received your inquiry.\n" +
      `Reference: ${referenceId}\n` +
      `Request Type: ${requestType}\n` +
      `Product: ${productType || targetModel || "-"}\n\n` +
      "If you selected files, please reply to this email " +
      "with the original attachments.\n\n" +
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