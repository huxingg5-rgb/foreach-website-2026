import { germanInstallationGuideSlugs } from "./german-installation-guide-routes";
import { hindiInstallationGuideSlugs } from "./installation-guide.hi";
import { italianInstallationGuideSlugs } from "./installation-guide.it";
import { languageDraftsEnabled } from "@/lib/i18n/draft-languages";

// Register complete detail-page languages for new video editions. Other locales
// use the localized guide hub/player; existing legacy routes retain their policy.
const detailLocales: Record<string, readonly string[] | undefined> = {
  "youtube-piston-pump-liquid-dispensing": ["en", "es", "fr", "ko", "ru"],
  "youtube-flexible-tubing-laboratory-fluid-lines": ["en", "es", "fr", "ko", "ru"],
  "youtube-quick-connect-sealing-compatibility": ["en", "es", "fr", "ko", "ru"],
};

export const multilingualProductVideoIds = Object.keys(detailLocales);

export function getVideoGuideDetailLocales(slug: string) {
  return detailLocales[slug];
}

export function isVideoGuideLocaleAvailable(locale: string, slug: string) {
  if (locale === "hi") return languageDraftsEnabled && hindiInstallationGuideSlugs.includes(slug);
  if (locale === "it") return languageDraftsEnabled && italianInstallationGuideSlugs.includes(slug);
  if (locale === "de") return languageDraftsEnabled && germanInstallationGuideSlugs.includes(slug);
  if (locale === "zh-CN" && slug.startsWith("youtube-")) return false;
  const locales = detailLocales[slug];
  return !locales || locales.includes(locale);
}
