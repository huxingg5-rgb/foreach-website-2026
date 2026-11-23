import { getDocumentLocale, type LocaleCode } from "@/lib/i18n";

export function getIsoCertificateImage(
  standard: "13485" | "9001",
  locale: LocaleCode,
  placement: "home" | "about" = "about",
) {
  const suffix = getDocumentLocale(locale) === "en" ? "-en" : "";
  return placement === "home"
    ? `/images/home/company-honors/iso-${standard}${suffix}.webp`
    : `/images/about/foreach/honors/honor-row2-iso${standard}${suffix}.webp`;
}
