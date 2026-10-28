// Register complete detail-page languages for new video editions. Other locales
// use the localized guide hub/player; existing legacy routes retain their policy.
const detailLocales: Record<string, readonly string[] | undefined> = {
  "youtube-piston-pump-liquid-dispensing": ["zh-CN", "en", "es", "fr", "ko", "ru"],
  "youtube-flexible-tubing-laboratory-fluid-lines": ["zh-CN", "en", "es", "fr", "ko", "ru"],
  "youtube-quick-connect-sealing-compatibility": ["zh-CN", "en", "es", "fr", "ko", "ru"],
};

export const multilingualProductVideoIds = Object.keys(detailLocales);

export function getVideoGuideDetailLocales(slug: string) {
  return detailLocales[slug];
}

export function isVideoGuideLocaleAvailable(locale: string, slug: string) {
  const locales = detailLocales[slug];
  return !locales || locales.includes(locale);
}
