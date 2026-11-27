"use client";
import NextLink from "next/link";
import { normalizeSiteHref } from "@/lib/seo/site-url";
import { getProductCardThumbnail } from "@/data/products/selection/product-card-thumbnail";
import { getBarbedFittingCardImageScale } from "@/data/products/selection/barbed-fitting-card-image-scale";
import { getValvelessPumpImageAlt } from "@/data/products/detail/valveless-pump-image-copy";
import { getFittingMainImageAlt, getDescriptiveFittingImageUrl } from "@/data/products/detail/fitting-image-description";
import { hindiPipettingDetailText, hindiSyringeDetailText } from "@/data/products/detail/instrument-pumps.hi";
import { getControlModuleCardCopy } from "@/data/products/selection/control-module-card-copy";
import { probeControlDetailCopyEn } from "@/data/products/selection/probe-control-selection.en";
import { getTubingMaterialCopy } from "@/data/products/tubing/content";
import { getTubingMaterialHeading } from "@/data/products/tubing/headings";
import { getSyringeModelRedirect } from "@/data/products/selection/syringe-pump-routes";
import { getPistonPumpMarketingCopy } from "@/data/products/piston-pump-marketing-copy";
import { italianPistonCardText } from "@/data/products/detail/piston-pump-ui.intl";

import italianSyringeCopy from "@/data/products/detail/syringe-pump-content.it.json";
import { syringePumpCardsLocales } from "@/data/products/selection/syringe-pump-cards.locales";
import { instrumentCardsZh } from "@/data/products/selection/instrument-fluidics-copy.zh";
import { getPipettingCardCopy } from "@/data/products/selection/pipetting-pump-cards.locales";
import { getSmtp2VariantCopy } from "@/data/products/detail/smtp2-variant-content";
import { getValveCardCopy } from "@/data/products/selection/valve-card-copy";
import { getMrv3Content } from "@/data/products/detail/mrv3-content";
import { formatProductHeading } from "@/lib/format-product-heading";
import Link from "@/components/i18n/DraftLink";
import { usePathname } from "next/navigation";
import { hindiProductSelectionLabel } from "@/data/products/selection/product-selection.hi";
import { italianProductSelectionLabel } from "@/data/products/selection/product-selection.it";
import { getHindiDraftLink, hindiEnglishFallbackSuffix, getItalianDraftLink, getGermanDraftLink, isLocalizedGermanDraftPath } from "@/lib/i18n/draft-languages";
import germanPipettingCopy from "@/data/products/detail/pipetting-pump-content.de.json";
import { germanDiaphragmText } from "@/data/products/detail/diaphragm-pump-content.de";
import { getGermanProductCardText } from "@/data/products/selection/card-copy/product-card-copy.de";
import { useContentPathname } from "@/lib/i18n/use-content-pathname";
import { getGermanCardSpec, getGermanFittingCardSubtitle } from "./product-selection-ui.de";

import type { ProductSelectionProductItem } from "./product-selection-ui.types";
import type { SelectionLocale } from "@/data/products/selection/product-selection.types";
import {
  getProductCardHeading,
  getProductCardSpecs,
} from "@/data/products/selection/card-copy/plunger-pump-card-copy";
import { trackProductSelect } from "@/lib/analytics/track-event";

type ProductSelectionCardProps = {
  product: ProductSelectionProductItem;
  title: string;
  subtitle: string;
  detailHref: string;
  germanFittingPathPattern?: string;
  contentLocale?: "it" | "hi";
  isAdded: boolean;
  detailButtonText: string;
  addToListText: string;
  addedToListText: string;
  analyticsListId: string;
  analyticsListName: string;
  analyticsIndex: number;
  showListAction?: boolean;
  onToggleList: (product: ProductSelectionProductItem) => void;
};

const PRODUCT_SELECTION_LOCALES: SelectionLocale[] = [
  "zh",
  "en",
  "es",
  "fr",
  "ko",
  "ru",
];

const QUICK_CONNECT_CARD_IMAGE_SCALE: Record<string, number> = {
  q20: 0.8,
  q40: 0.9,
};

const CARD_TEXT: Record<
  SelectionLocale,
  {
    imagePlaceholder: string;
    specsAriaSuffix: string;
  }
> = {
  zh: {
    imagePlaceholder: "\u6682\u65e0\u56fe\u7247",
    specsAriaSuffix: "\u5173\u952e\u53c2\u6570",
  },
  en: {
    imagePlaceholder: "No image",
    specsAriaSuffix: "key specifications",
  },
  es: {
    imagePlaceholder: "Imagen no disponible",
    specsAriaSuffix: "especificaciones principales",
  },
  fr: {
    imagePlaceholder: "Image non disponible",
    specsAriaSuffix: "caractéristiques principales",
  },
  ko: {
    imagePlaceholder: "이미지 없음",
    specsAriaSuffix: "주요 사양",
  },
  ru: {
    imagePlaceholder: "Изображение отсутствует",
    specsAriaSuffix: "основные характеристики",
  },
};

function getLocaleFromPathname(pathname: string | null): SelectionLocale {
  const firstSegment = String(pathname || "")
    .split("/")
    .filter(Boolean)[0];

  return PRODUCT_SELECTION_LOCALES.includes(firstSegment as SelectionLocale)
    ? (firstSegment as SelectionLocale)
    : "zh";
}

function toDisplayText(value: unknown): string {
  if (value === null || value === undefined) return "";

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(toDisplayText).filter(Boolean).join(" / ");
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    const candidates = [
      record.label,
      record.zh,
      record.en,
      record.value,
      record.name,
      record.text,
      record.title,
    ];

    for (const candidate of candidates) {
      const text = toDisplayText(candidate);
      if (text) return text;
    }

    const firstValue = Object.values(record).map(toDisplayText).find(Boolean);
    return firstValue || "";
  }

  return "";
}


/*
  FINAL_CARD_HREF_GUARD_20260707

  卡片最终 href 出口保护：
  如果 EA / SM / TM 柱塞泵被错误传成 /products/probes/[slug]，
  在最终 <a> 前强制改回 /products/pumps/piston-pump/[slug]。
*/
function normalizeCardDetailHref(product: ProductSelectionProductItem, href: string): string {
  const rawHref = String(href || "").trim();

  const hrefSlug = rawHref
    .split("/")
    .filter(Boolean)
    .pop()
    ?.toLowerCase();

  const rawSlug = String(
    (product as any).detailSlug ||
      (product as any).slug ||
      (product as any).productId ||
      hrefSlug ||
      ""
  )
    .split("/")
    .filter(Boolean)
    .pop()
    ?.toLowerCase();

  if (rawSlug && /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(rawSlug)) {
    return `/products/pumps/piston-pump/${rawSlug}`;
  }

  if (
    rawHref.includes("/products/probes/") &&
    hrefSlug &&
    /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(hrefSlug)
  ) {
    return `/products/pumps/piston-pump/${hrefSlug}`;
  }

  return getSyringeModelRedirect(rawHref) || rawHref || "/products";
}

function localizeCardDetailHref(
  href: string,
  locale: SelectionLocale,
  product: ProductSelectionProductItem,
): string {
  const detailLocale = product.detailLocale ?? locale;
  if (
    detailLocale === "zh" ||
    !href.startsWith("/") ||
    /^\/(?:en|es|fr|ko|ru)(?:\/|$)/.test(href)
  ) {
    return href;
  }

  if (["es", "fr", "ko", "ru"].includes(detailLocale)) {
    return `/${detailLocale}${href}`;
  }

  return `/en${href}`;
}


export function getProductSelectionCardName(
  product: ProductSelectionProductItem,
  locale: SelectionLocale,
  title: string,
) {
  const tubingCopy = product.categoryId === "tubing" ? getTubingMaterialCopy(String(product.detailSlug || product.slug || product.productId), locale) : undefined;
  if (tubingCopy) return tubingCopy.cardTitle;
  const valveCard = getValveCardCopy(product, locale);
  if (valveCard) return valveCard.model;
  if (product.seriesId === "MRV3" && /^mrv3-d(?:10|16|24)$/.test(product.productId)) {
    return product.productId.toUpperCase();
  }
  const slug = String(product.detailSlug || product.slug || "");
  const controlCard = product.categoryId === "control"
    ? getControlModuleCardCopy(locale, slug) : undefined;
  if (controlCard) return controlCard.model;
  const probeControlCopy = locale === "en" && ["needles", "control"].includes(String(product.categoryId))
    ? probeControlDetailCopyEn[slug] : undefined;
  if (probeControlCopy) return probeControlCopy.cardTitle;
  const authoredCard = getPipettingCardCopy(locale, slug) || (locale === "zh" ? instrumentCardsZh : syringePumpCardsLocales[locale])?.[slug];
  return authoredCard?.model || toDisplayText(title) || product.productId;
}

export default function ProductSelectionCard({
  product,
  title,
  subtitle,
  detailHref,
  germanFittingPathPattern,
  contentLocale,
  isAdded,
  detailButtonText,
  addToListText,
  addedToListText,
  analyticsListId,
  analyticsListName,
  analyticsIndex,
  showListAction = true,
  onToggleList,
}: ProductSelectionCardProps) {
  const pathname = useContentPathname();
  const publicPathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const isGermanDraft = locale === "en" && isLocalizedGermanDraftPath(publicPathname);
  const cardText = isGermanDraft ? { imagePlaceholder: "Kein Bild", specsAriaSuffix: "Technische Daten" } : contentLocale === "it" ? { imagePlaceholder: "Immagine non disponibile", specsAriaSuffix: "Dati tecnici" } : contentLocale === "hi" ? { imagePlaceholder: "चित्र उपलब्ध नहीं है", specsAriaSuffix: "तकनीकी विनिर्देश" } : CARD_TEXT[locale];
  const controlCard = product.categoryId === "control"
    ? getControlModuleCardCopy(contentLocale ?? locale, String(product.detailSlug || product.slug || "")) : undefined;
  const valveCard = contentLocale === "it" && product.seriesId === "MRV3" ? undefined : getValveCardCopy(product, isGermanDraft ? "de" : contentLocale === "it" ? "it" : locale);
  const slug = String(product.detailSlug || product.slug || "");
  const authoredCard = getPipettingCardCopy(locale, slug) || (locale === "zh" ? instrumentCardsZh : syringePumpCardsLocales[locale])?.[slug];
  const isDiaphragmPumpCard =
    product.productTypeId === "diaphragm-pump" ||
    product.productTypeSlug === "diaphragm-pumps";
  const localizeCardCopy = (text: string) => {
    if (contentLocale === "hi") {
      const translated = product.productTypeId === "syringe-pump" ? hindiSyringeDetailText(text)
        : product.productTypeId === "pipette-pump" ? hindiPipettingDetailText(text) : text;
      return hindiProductSelectionLabel(translated);
    }
    if (contentLocale === "it") {
      const italian = product.productTypeId === "syringe-pump" ? (italianSyringeCopy as Readonly<Record<string, string>>)[text] ?? text : text;
      return italianProductSelectionLabel(italian);
    }
    if (!isGermanDraft) return text;
    const pipettingCopy: Readonly<Record<string, string>> = germanPipettingCopy;
    const localized = isDiaphragmPumpCard ? germanDiaphragmText(text) : product.productTypeId === "pipette-pump" ? pipettingCopy[text] ?? text : text;
    return getGermanProductCardText(localized);
  };
  const localizedTubingCopy = product.categoryId === "tubing" && (isGermanDraft || contentLocale === "it" || contentLocale === "hi")
    ? getTubingMaterialCopy(slug, isGermanDraft ? "de" : contentLocale ?? "en") : undefined;
  const safeTitle = formatProductHeading(localizedTubingCopy?.cardTitle ?? localizeCardCopy(getProductSelectionCardName(product, locale, title)));
  const tubingHeading = product.categoryId === "tubing" ? getTubingMaterialHeading(slug, locale) : undefined;
  const localizedTubingHeading = tubingHeading && (contentLocale === "it" || contentLocale === "hi") ? localizedTubingCopy?.cardHeading : undefined;
  const safeSubtitle = isDiaphragmPumpCard
    ? toDisplayText(subtitle)
        .split(/\s*\n+\s*/)
        .filter(Boolean)
        .join(" · ")
    : isGermanDraft && product.categoryId === "fittings"
      ? getGermanFittingCardSubtitle(toDisplayText(subtitle))
      : contentLocale === "hi" ? hindiProductSelectionLabel(toDisplayText(subtitle)) : toDisplayText(subtitle);
  const localizedDetailHref = localizeCardDetailHref(
    normalizeCardDetailHref(product, detailHref),
    locale,
    product,
  );
  const localizedDetailLink = isGermanDraft ? getGermanDraftLink(localizedDetailHref, germanFittingPathPattern) : contentLocale === "it" ? getItalianDraftLink(localizedDetailHref) : contentLocale === "hi" ? getHindiDraftLink(localizedDetailHref) : undefined;
  const DetailLink = product.openDetailInSameTab ? (isGermanDraft || contentLocale ? NextLink : Link) : "a";
  const safeDetailHref = locale === "zh" ? localizedDetailHref : normalizeSiteHref(localizedDetailLink?.href ?? localizedDetailHref);
  const cardSpecs = getProductCardSpecs(product, locale)
    .map((spec) => toDisplayText(spec))
    .filter(Boolean)
    .map((spec) => isGermanDraft ? localizeCardCopy(getGermanCardSpec(spec)) : localizeCardCopy(spec));
  const pistonHeading = getProductCardHeading(product, locale);
  const plungerCardHeading = contentLocale === "it" ? italianPistonCardText(pistonHeading) : contentLocale === "hi" ? hindiProductSelectionLabel(pistonHeading) : pistonHeading;
  const isMrv3Configuration = product.seriesId === "MRV3" && /^mrv3-d(?:10|16|24)$/.test(product.productId);
  const isSolenoidConfiguration = product.seriesId === "6010" && /^(?:2|3)-way$/.test(product.productId);
  const pistonAlt = product.productTypeId === "plunger-pump" ? getPistonPumpMarketingCopy(product.detailSlug || product.productId, locale)?.imageAlt : undefined;
  const pistonImageAlt = contentLocale === "it" && pistonAlt ? italianPistonCardText(pistonAlt) : pistonAlt;
  const localizedMrv3Alt = isMrv3Configuration && (isGermanDraft || contentLocale === "hi")
    ? getMrv3Content(product.productId, isGermanDraft ? "de" : "hi")?.imageAlt : undefined;
  const imageAlt = localizedTubingCopy?.imageAlt || localizedMrv3Alt || getSmtp2VariantCopy(product.detailSlug || "", locale)?.imageAlt || pistonImageAlt || getValvelessPumpImageAlt(product.imageCard || "", contentLocale ?? locale) || getFittingMainImageAlt(product, isGermanDraft ? "de" : locale) || ((isMrv3Configuration || isSolenoidConfiguration) && typeof product.imageAlt === "string" && product.imageAlt.trim()
    ? product.imageAlt
    : controlCard ? `FOREACH ${controlCard.model} ${controlCard.name}` : valveCard ? `FOREACH ${valveCard.model} ${valveCard.name}` : safeTitle);
  const valveHeading = contentLocale === "hi" && valveCard ? formatProductHeading(localizeCardCopy(valveCard.heading)) : valveCard?.heading;
  const descriptionHeading = controlCard?.heading || valveHeading || ((isMrv3Configuration || product.seriesId === "6010") ? safeSubtitle : (authoredCard?.heading ? localizeCardCopy(authoredCard.heading) : undefined) || ((isDiaphragmPumpCard || product.productTypeId === "valveless-pump")
    ? safeSubtitle
    : plungerCardHeading));
  const usesDescriptionHeading = Boolean(descriptionHeading);
  const DescriptionHeading = product.categoryId === "valves" ? "h2" : "h3";
  const cardImage = getDescriptiveFittingImageUrl(product.imageCard || "");
  const thumbnail = getProductCardThumbnail(cardImage, locale);
  const usesSquareImage = product.seriesId === "6010" || product.productTypeId === "valveless-pump";
  const cardImageScale = product.productTypeId === "quick-connect-fittings"
    ? QUICK_CONNECT_CARD_IMAGE_SCALE[product.seriesId || ""]
    : getBarbedFittingCardImageScale(product);

  return (
    <article
      className={`product-card${tubingHeading ? " tubing-material-card" : ""}${product.seriesId === "6010" ? " solenoid-configuration-card" : ""}${usesSquareImage ? " square-image-card" : ""}`}
      data-product-type-id={product.productTypeId || undefined}
      title={valveCard ? contentLocale === "hi" ? localizeCardCopy(`${safeTitle} ${valveCard.name}`) : `${safeTitle} ${valveCard.name}` : safeTitle}
    >
      <span className="selected-bar" />

      <div className="product-image" aria-label={localizeCardCopy(imageAlt)}>
        {product.imageCard ? (
          <img src={thumbnail?.src ?? cardImage} alt={localizeCardCopy(imageAlt)} loading="lazy"
            width={thumbnail?.width} height={thumbnail?.height}
            style={cardImageScale ? { scale: cardImageScale } : undefined} />
        ) : (
          <div className="product-image-placeholder">{cardText.imagePlaceholder}</div>
        )}
      </div>

      <div className="product-body">
        {tubingHeading ? (
          <p className="product-title">{contentLocale === "it" || contentLocale === "hi" ? localizedTubingCopy?.cardLabel ?? tubingHeading.label : tubingHeading.label}</p>
        ) : usesDescriptionHeading ? (
          <p className="product-title">{safeTitle}</p>
        ) : (
          <h3 className="product-title">{safeTitle}</h3>
        )}

        {tubingHeading ? (
          <h3 className="product-card-summary product-card-description-heading">
            {formatProductHeading(localizedTubingHeading ?? localizeCardCopy(tubingHeading.description))}
          </h3>
        ) : usesDescriptionHeading ? (
          <DescriptionHeading className="product-card-summary product-card-description-heading">
            {formatProductHeading(localizeCardCopy(descriptionHeading || ""))}
          </DescriptionHeading>
        ) : cardSpecs.length > 0 ? (
          <ul className="product-card-specs" aria-label={`${safeTitle} ${cardText.specsAriaSuffix}`}>
            {cardSpecs.map((spec, index) => (
              <li key={`${safeTitle}-spec-${index}`}>{spec}</li>
            ))}
          </ul>
        ) : safeSubtitle ? (
          <p className="product-card-summary">{formatProductHeading(localizeCardCopy(safeSubtitle))}</p>
        ) : null}

        <div className="product-actions">
          <DetailLink
            className="product-link"
            href={safeDetailHref}
            hrefLang={localizedDetailLink?.hrefLang ?? (product.detailLocale === "zh" ? "zh-CN" : product.detailLocale)}
            title={localizedDetailLink?.title}
            {...(product.openDetailInSameTab ? { prefetch: false } : { target: "_blank", rel: "noopener noreferrer" })}
            onClick={() => {
              trackProductSelect({
                productId: product.productId,
                productName: safeTitle,
                category: product.categoryId || product.category,
                subcategory: product.productTypeId || product.productType,
                series: product.seriesId || product.series,
                listId: analyticsListId,
                listName: analyticsListName,
                index: analyticsIndex,
                locale,
              });
            }}
          >
            {localizedDetailLink?.hrefLang === "en" ? (contentLocale === "it" ? "Dettagli (in inglese)" : contentLocale === "hi" ? detailButtonText + hindiEnglishFallbackSuffix : "Details (Englisch)") : detailButtonText}
          </DetailLink>

          {showListAction ? (
            <button
              className={isAdded ? "list-toggle active" : "list-toggle"}
              type="button"
              onClick={() => {
                onToggleList(product);
              }}
            >
              {isAdded ? addedToListText : addToListText}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
