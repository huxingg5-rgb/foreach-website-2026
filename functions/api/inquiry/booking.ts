import {
  ensureSameOrigin,
  handleInquiryError,
  jsonResponse,
  sendResendEmail,
  sha256,
  type InquiryPagesHandler,
} from "../../../lib/cloudflare/inquiry";
import {
  assertBookingOpen,
  BOOKING_RATE_LIMIT,
  buildBookingNotification,
  parseBookingBody,
  prepareBookingAttachments,
  readBookingRequest,
} from "../../../lib/cloudflare/booking";

/**
 * POST /api/inquiry/booking
 *
 * 展会快速预约（Cloudflare 生产环境）：
 * 1. 只校验姓名、邮箱格式；附件选填（最多 5 个、合计 20 MB），作为邮件附件发出
 * 2. 不要求公司、不要求邮箱验证码
 * 3. 同一 IP 每小时最多 5 次（KV 计数，近似即可）
 * 4. 暂停开关关闭时返回 403 booking_closed
 * 5. 通过 Resend 发到 INQUIRY_TO_EMAIL，回复直接回给访客
 */
export const onRequestPost: InquiryPagesHandler = async ({ request, env }) => {
  try {
    ensureSameOrigin(request);
    assertBookingOpen();

    /* 字段 + 附件先校验，不合规的请求不占用每小时 5 次的额度 */
    const { body, files } = await readBookingRequest(request);
    const booking = parseBookingBody(body);
    const attachments = await prepareBookingAttachments(files);

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const rateKey = `booking:ip:${await sha256(ip)}`;
    const used = Number((await env.INQUIRY_KV.get(rateKey)) || "0");

    if (used >= BOOKING_RATE_LIMIT.maxPerWindow) {
      return jsonResponse({ success: false, error: "too_many_requests" }, 429);
    }

    await env.INQUIRY_KV.put(rateKey, String(used + 1), {
      expirationTtl: BOOKING_RATE_LIMIT.windowSeconds,
    });

    const email = buildBookingNotification(booking, {
      country: request.headers.get("CF-IPCountry") || "",
      attachments,
    });

    await sendResendEmail(env.RESEND_API_KEY, {
      from: env.INQUIRY_FROM_EMAIL,
      to: env.INQUIRY_TO_EMAIL,
      replyTo: booking.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
      ...(attachments.length > 0
        ? { attachments: attachments.map(({ filename, content }) => ({ filename, content })) }
        : {}),
    });

    return jsonResponse({ success: true });
  } catch (error) {
    return handleInquiryError(error, "[booking] submit failed");
  }
};
