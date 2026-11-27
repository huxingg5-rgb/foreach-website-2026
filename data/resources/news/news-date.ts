const italianDate = new Intl.DateTimeFormat("it-IT", { dateStyle: "short", timeZone: "UTC" });

const hindiDate = new Intl.DateTimeFormat("hi-IN", { dateStyle: "medium", timeZone: "UTC" });

export function formatNewsDate(date: string, locale?: string) {
  if (locale === "hi" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return hindiDate.format(new Date(date + "T00:00:00Z"));
  }
  return locale === "it" && /^d{4}-d{2}-d{2}$/.test(date)
    ? italianDate.format(new Date(date + "T00:00:00Z"))
    : date;
}
