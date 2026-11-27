import en from "./degassing-module-locales/en.json";
import de from "./degassing-module-locales/de.json";
import it from "./degassing-module-locales/it.json";
import hi from "./degassing-module-locales/hi.json";
import es from "./degassing-module-locales/es.json";
import fr from "./degassing-module-locales/fr.json";
import ko from "./degassing-module-locales/ko.json";
import ru from "./degassing-module-locales/ru.json";
import { degassingModuleZh } from "./degassing-module.zh";
import type { ProductDetailPageData } from "./product-detail.types";
import { isLocalizedHindiDraftPath, isLocalizedItalianDraftPath, languageDraftsEnabled } from "@/lib/i18n/draft-languages";

export const degassingModuleLocales = ["en", "es", "fr", "ko", "ru"] as const;
export type DegassingModuleLocale = (typeof degassingModuleLocales)[number] | "de" | "it" | "hi";
export type DegassingModuleCopy = typeof en;

const copies: Record<DegassingModuleLocale, DegassingModuleCopy> = { en, es, fr, ko, ru, de, it, hi };

export function isItalianDegassingModulePublished() {
  return isLocalizedItalianDraftPath("/it" + degassingModuleZh.href);
}

export function isHindiDegassingModulePublished() {
  return isLocalizedHindiDraftPath("/hi" + degassingModuleZh.href);
}

export function isDegassingModuleLocale(locale: string): locale is DegassingModuleLocale {
  return (locale === "it" && isItalianDegassingModulePublished())
    || (locale === "hi" && isHindiDegassingModulePublished())
    || (locale === "de" && languageDraftsEnabled)
    || degassingModuleLocales.includes(locale as (typeof degassingModuleLocales)[number]);
}

export function getDegassingModuleCopy(locale: DegassingModuleLocale): DegassingModuleCopy {
  return copies[locale];
}

export function getDegassingModulePath(locale: string) {
  return `${isDegassingModuleLocale(locale) ? `/${locale}` : ""}${degassingModuleZh.href}`;
}

export function getDegassingModuleLanguageAlternates() {
  return {
    "zh-CN": degassingModuleZh.href,
    ...Object.fromEntries(degassingModuleLocales.map(locale => [locale, getDegassingModulePath(locale)])),
    "x-default": degassingModuleZh.href,
  };
}

/** Localize authored text; model identifiers, physical assets and their paths stay shared. */
export function getDegassingModulePageData(locale: DegassingModuleLocale): ProductDetailPageData & {
  __locale: DegassingModuleLocale;
  degassingDetailContent: true;
  productTypeId: string;
  productTypeName: string;
  detailHref: string;
  imageCard: string;
  h1Title?: string;
  description: string;
  mainImageAlt: string;
  drawing2dUrl: string;
} {
  const copy = getDegassingModuleCopy(locale);
  const [mainImage, ...additionalImages] = degassingModuleZh.gallery;
  const prefix = `/${locale}`;
  return {
    __locale: locale === "it" ? "en" : locale,
    degassingDetailContent: true,
    category: "fittings",
    productTypeId: degassingModuleZh.typeId,
    productTypeName: copy.name,
    detailHref: getDegassingModulePath(locale),
    imageCard: degassingModuleZh.cardImage.src,
    slug: degassingModuleZh.slug,
    model: degassingModuleZh.model,
    h1Title: locale === "en" ? copy.title : undefined,
    name: copy.name,
    description: copy.introduction,
    advantages: [],
    commonApplications: [],
    mainImage: mainImage.src,
    mainImageAlt: copy.galleryAlts[0],
    additionalImages: additionalImages.map(photo => photo.src),
    additionalImageAlts: copy.galleryAlts.slice(1),
    showConfigurator: false,
    showDatasheetRequest: false,
    showDrawingRequest: false,
    show3DRequest: false,
    cadRequestAvailable: true,
    drawing2dUrl: degassingModuleZh.drawing2dUrl,
    specSeriesKey: degassingModuleZh.slug,
    breadcrumbs: [
      { label: copy.breadcrumbs[0], href: `${prefix}/` },
      { label: copy.breadcrumbs[1], href: `${prefix}/products/` },
      { label: copy.breadcrumbs[2], href: `${prefix}/products/fittings/` },
      { label: copy.name, href: `${prefix}${degassingModuleZh.modelListHref}` },
      { label: degassingModuleZh.model },
    ],
    specs: [
      { label: copy.modelLabel, value: degassingModuleZh.model },
      { label: copy.typeLabel, value: copy.name },
      ...copy.specificationGroups.flatMap(group =>
        group.rows.map(([label, value]) => ({ label, value })),
      ),
    ],
  };
}
