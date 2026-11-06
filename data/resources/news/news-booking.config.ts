/* =========================================================
   news-booking.config.ts
   恒永达官网｜展会预约表单开关

   一键暂停：把 enabled 改成 false 后部署
   - 文章右侧的预约表单不再显示
   - /api/inquiry/booking 接口同时拒收（返回 booking_closed）

   articleSlugs：哪些新闻显示预约表单（新闻 slug，即网址最后一段）

   注意：这个文件不要引用其他文件，Cloudflare Functions 也会读取它
========================================================= */

export const NEWS_BOOKING_CONFIG = {
  enabled: true,
  articleSlugs: ["medica-2026"],
};

/** 传 slug 时：开关打开且该新闻在名单里才返回 true；不传 slug 只看开关 */
export function isBookingEnabled(slug?: string): boolean {
  if (!NEWS_BOOKING_CONFIG.enabled) return false;
  return slug === undefined || NEWS_BOOKING_CONFIG.articleSlugs.includes(slug);
}
