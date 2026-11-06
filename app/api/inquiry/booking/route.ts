import {
  ensureSameOrigin,
  handleInquiryError,
  jsonResponse,
  sendResendEmail,
  sha256,
} from "@/lib/cloudflare/inquiry";
import {
  assertBookingOpen,
  BOOKING_RATE_LIMIT,
  buildBookingNotification,
  parseBookingBody,
  prepareBookingAttachments,
  readBookingRequest,
} from "@/lib/cloudflare/booking";
import {
  getInquiryEmailConfig,
  getInquiryRedis,
} from "@/lib/vercel/inquiry-runtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/inquiry/booking/
 *
 * 展会快速预约（本地开发 / Vercel）。
 * 逻辑与 functions/api/inquiry/booking.ts 一致，计数改用 Upstash Redis。
 * Cloudflare 构建时 app/api 会被临时移出，生产环境走 functions/api。
 */
export async function POST(request: Request): Promise<Response> {
  try {
    ensureSameOrigin(request);
    assertBookingOpen();

    /* 字段 + 附件先校验，不合规的请求不占用每小时 5 次的额度 */
    const { body, files } = await readBookingRequest(request);
    const booking = parseBookingBody(body);
    const attachments = await prepareBookingAttachments(files);

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const redis = getInquiryRedis();
    const rateKey = `booking:ip:${await sha256(ip)}`;
    const used = await redis.incr(rateKey);

    if (used === 1) {
      await redis.expire(rateKey, BOOKING_RATE_LIMIT.windowSeconds);
    }

    if (used > BOOKING_RATE_LIMIT.maxPerWindow) {
      return jsonResponse({ success: false, error: "too_many_requests" }, 429);
    }

    const { apiKey, from, recipients } = getInquiryEmailConfig();
    const email = buildBookingNotification(booking, {
      country: request.headers.get("x-vercel-ip-country") || "",
      attachments,
    });

    await sendResendEmail(apiKey, {
      from,
      to: recipients,
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
}
