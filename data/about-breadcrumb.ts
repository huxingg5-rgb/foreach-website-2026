import type { LocaleCode } from "@/lib/i18n";

type AboutBreadcrumbLocale = LocaleCode | "de" | "it" | "hi";

const labels: Record<AboutBreadcrumbLocale, { home: string; about: string; aria: string }> = {
  "zh-CN": { home: "首页", about: "关于我们", aria: "面包屑导航" },
  en: { home: "Home", about: "About Us", aria: "Breadcrumb" },
  hi: { home: "होम", about: "हमारे बारे में", aria: "पेज का रास्ता" },
  it: { home: "Home", about: "Chi siamo", aria: "Percorso di navigazione" },
  de: { home: "Startseite", about: "Über uns", aria: "Brotkrümelnavigation" },
  es: { home: "Inicio", about: "Quiénes somos", aria: "Ruta de navegación" },
  fr: { home: "Accueil", about: "À propos", aria: "Fil d’Ariane" },
  ko: { home: "홈", about: "회사 소개", aria: "이동 경로" },
  ru: { home: "Главная", about: "О компании", aria: "Навигационная цепочка" },
};

export function getAboutBreadcrumb(locale: AboutBreadcrumbLocale, current: string) {
  const prefix = locale === "zh-CN" ? "" : `/${locale}`;
  return {
    ariaLabel: labels[locale].aria,
    items: [
      { label: labels[locale].home, href: `${prefix}/` },
      { label: labels[locale].about, href: `${prefix}/about/foreach` },
      { label: current },
    ],
  };
}
