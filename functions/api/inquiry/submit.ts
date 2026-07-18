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
  type InquiryPagesHandler,
} from "../../../lib/cloudflare/inquiry";

type VerifiedRecord = {
  email: string;
  verifiedAt: number;
  expiresAt: number;
};

/**
 * POST /api/inquiry/submit
 *
 * 功能：
 * 1. 后端重新校验所有字段
 * 2. 检查邮箱是否真的在 KV 中验证通过
 * 3. 给公司邮箱发送询盘通知
 * 4. 给客户发送询盘确认邮件
 * 5. 成功后删除邮箱验证状态，避免重复提交
 */
export const onRequestPost: InquiryPagesHandler = async ({
  request,
  env,
}) => {
  try {
    ensureSameOrigin(request);

    const body = await readJsonBody(request, 48_000);

    const name = cleanText(body.name, 100);
    const company = cleanText(body.company, 160);
    const email = normalizeEmail(body.email);
    const product = cleanText(body.product, 160);
    const region = cleanText(body.region, 160);
    const application = cleanText(body.application, 200);
    const message = cleanText(body.message, 4_000);
    const locale = cleanText(body.locale, 20) || "unknown";

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

    if (!product || !application || !message) {
      return jsonResponse(
        {
          success: false,
          error: "required_fields_missing",
        },
        400,
      );
    }

    const emailStorageId = await sha256(email);
    const verifiedKey = `inquiry:verified:${emailStorageId}`;
    const rawVerifiedRecord = await env.INQUIRY_KV.get(verifiedKey);

    if (!rawVerifiedRecord) {
      return jsonResponse(
        {
          success: false,
          error: "email_not_verified",
        },
        403,
      );
    }

    let verifiedRecord: VerifiedRecord;

    try {
      verifiedRecord = JSON.parse(rawVerifiedRecord) as VerifiedRecord;
    } catch {
      await env.INQUIRY_KV.delete(verifiedKey);

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
      await env.INQUIRY_KV.delete(verifiedKey);

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
        product,
        region,
        application,
        message,
        locale,
      ]),
    );

    const referenceId = formFingerprint.slice(0, 12).toUpperCase();

    const notificationHtml = buildEmailShell(
      "New Website Inquiry",
      `
        <p style="margin:0 0 22px;font-size:16px;line-height:1.7;color:#263a59;">
          A new verified inquiry has been submitted through the FOREACH website.
        </p>

        <p style="margin:0 0 22px;font-size:13px;color:#67758a;">
          Reference: <strong>${escapeHtml(referenceId)}</strong>
        </p>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e1e7ee;border-collapse:collapse;font-size:14px;line-height:1.6;">
          ${buildTableRow("Name", name)}
          ${buildTableRow("Company", company)}
          ${buildTableRow("Email", email)}
          ${buildTableRow("Country / Region", region)}
          ${buildTableRow("Interested Product", product)}
          ${buildTableRow("Application", application)}
          ${buildTableRow("Website Language", locale)}
          ${buildTableRow("Requirement", message)}
        </table>

        <p style="margin:24px 0 0;font-size:13px;line-height:1.7;color:#67758a;">
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
          Thank you for contacting FOREACH. We have received your inquiry and our team will review your requirements.
        </p>

        <div style="margin:22px 0;padding:18px;background:#f4f7fa;border-left:4px solid #09e9b4;font-size:14px;line-height:1.8;color:#263a59;">
          <strong>Reference:</strong> ${escapeHtml(referenceId)}<br />
          <strong>Product:</strong> ${escapeHtml(product)}<br />
          <strong>Application:</strong> ${escapeHtml(application)}
        </div>

        <p style="margin:0;font-size:14px;line-height:1.7;color:#596980;">
          This is an automatic confirmation email. Our sales or engineering team will contact you as soon as possible.
        </p>

        <p style="margin:20px 0 0;font-size:14px;line-height:1.7;color:#596980;">
          感谢您的询盘。恒永达团队将尽快查看需求并与您联系。
        </p>
      `,
    );

    const notificationText =
      `New FOREACH website inquiry\n` +
      `Reference: ${referenceId}\n` +
      `Name: ${name}\n` +
      `Company: ${company}\n` +
      `Email: ${email}\n` +
      `Country / Region: ${region || "-"}\n` +
      `Product: ${product}\n` +
      `Application: ${application}\n` +
      `Website Language: ${locale}\n` +
      `Requirement: ${message}`;

    const confirmationText =
      `Dear ${name},\n\n` +
      "Thank you for contacting FOREACH. We have received your inquiry.\n" +
      `Reference: ${referenceId}\n` +
      `Product: ${product}\n` +
      `Application: ${application}\n\n` +
      "Our team will contact you as soon as possible.";

    await Promise.all([
      sendResendEmail(env.RESEND_API_KEY, {
        from: env.INQUIRY_FROM_EMAIL,
        to: env.INQUIRY_TO_EMAIL,
        replyTo: email,
        subject: `[FOREACH Website Inquiry] ${company} · ${product}`,
        html: notificationHtml,
        text: notificationText,
        idempotencyKey: `inquiry-notification-${formFingerprint}`,
      }),

      sendResendEmail(env.RESEND_API_KEY, {
        from: env.INQUIRY_FROM_EMAIL,
        to: email,
        subject: `We received your FOREACH inquiry · ${referenceId}`,
        html: confirmationHtml,
        text: confirmationText,
        idempotencyKey: `inquiry-confirmation-${formFingerprint}`,
      }),
    ]);

    await env.INQUIRY_KV.delete(verifiedKey);

    return jsonResponse({
      success: true,
      referenceId,
    });
  } catch (error) {
    return handleInquiryError(error, "提交网站询盘失败：");
  }
};