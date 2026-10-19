import type { InstallationGuideLocale } from "./installation-guide.types";

export const INSTALLATION_GUIDE_PAGE_SIZE = 6;
export const INSTALLATION_GUIDE_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

export function getInstallationGuidePageHref(locale: InstallationGuideLocale, page = 1) {
  const base = `${locale === "zh-CN" ? "" : `/${locale}`}/resources/installation-guide/`;
  return page === 1 ? base : `${base}page/${page}/`;
}

export const guidePaginationCopy: Record<InstallationGuideLocale, {
  pagination: string; previous: string; next: string; page: (page: number) => string;
}> = {
  "zh-CN": { pagination: "使用教程分页", previous: "上一页", next: "下一页", page: (n) => `第 ${n} 页` },
  en: { pagination: "Usage guide pagination", previous: "Previous", next: "Next", page: (n) => `Page ${n}` },
  es: { pagination: "Paginación de guías", previous: "Anterior", next: "Siguiente", page: (n) => `Página ${n}` },
  fr: { pagination: "Pagination des guides", previous: "Précédente", next: "Suivante", page: (n) => `Page ${n}` },
  ko: { pagination: "사용 가이드 페이지", previous: "이전", next: "다음", page: (n) => `${n}페이지` },
  ru: { pagination: "Страницы руководств", previous: "Назад", next: "Далее", page: (n) => `Страница ${n}` },
};
