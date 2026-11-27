// Keep the website locale and the transactional email template language aligned.
export function getInquiryTransportLocale(locale: string): string {
  return /^de(?:[-_]|$)/i.test(locale) ? "de" : locale;
}
