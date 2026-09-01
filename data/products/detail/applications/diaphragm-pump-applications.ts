import type { SelectionLocale } from "@/data/products/selection/product-selection.types";
import type {
  ProductApplicationItem,
  ProductApplicationsContent,
} from "@/data/products/detail/product-detail.types";
import type { DiaphragmPumpReferenceCopyKey } from "@/data/products/detail/diaphragm-pump-reference-models";

import applicationDataJson from "./diaphragm-pump-applications.generated.json";
import { ZH_DIAPHRAGM_PUMP_APPLICATIONS } from "./diaphragm-pump-applications.zh";
import { getDiaphragmPumpMotorComparison } from "./diaphragm-pump-motor-comparison";

type ApplicationLocale = SelectionLocale;
type InternationalApplicationLocale = Exclude<ApplicationLocale, "zh">;
type LiquidVariant = "brushed" | "brushless";
type LiquidSeriesKey = "dpl30" | "dpl60" | "dpl30h";
type ApplicationSeriesKey = LiquidSeriesKey | "dpgl800";

type SharedLocaleContent = {
  tabLabel: string;
  title: string;
  items: ProductApplicationItem[];
  linkText: string;
};

type LiquidLocaleContent = SharedLocaleContent & {
  variantIntros: Record<LiquidVariant, string[]>;
  selectionNote: {
    title: string;
    variantParagraphs: Record<LiquidVariant, string[]>;
  };
};

type GasLiquidLocaleContent = SharedLocaleContent & {
  intro: string[];
  selectionNote: {
    title: string;
    paragraphs: string[];
  };
};

type ApplicationDataFile = {
  version: number;
  series: {
    dpl30: {
      articleSlug: string;
      locales: Record<InternationalApplicationLocale, LiquidLocaleContent>;
    };
    dpl60: {
      articleSlug: string;
      locales: Record<InternationalApplicationLocale, LiquidLocaleContent>;
    };
    dpl30h: {
      articleSlug: string;
      locales: Record<InternationalApplicationLocale, LiquidLocaleContent>;
    };
    dpgl800: {
      articleSlug: string;
      locales: Record<InternationalApplicationLocale, GasLiquidLocaleContent>;
    };
  };
};

type ProductApplicationSource =
  | { series: LiquidSeriesKey; variant: LiquidVariant }
  | { series: "dpgl800" };

const APPLICATION_DATA = applicationDataJson as ApplicationDataFile;

const PRODUCT_APPLICATION_SOURCES: Partial<
  Record<DiaphragmPumpReferenceCopyKey, ProductApplicationSource>
> = {
  "dpl30-brushed": { series: "dpl30", variant: "brushed" },
  "dpl30-brushless": { series: "dpl30", variant: "brushless" },
  "dpl60-brushed": { series: "dpl60", variant: "brushed" },
  "dpl60-brushless": { series: "dpl60", variant: "brushless" },
  "dpl30h-brushed": { series: "dpl30h", variant: "brushed" },
  "dpl30h-brushless": { series: "dpl30h", variant: "brushless" },
  "dpgl800-brushless": { series: "dpgl800" },
};

function buildArticleHref(locale: ApplicationLocale, articleSlug: string) {
  const localePrefix = locale === "zh" ? "" : `/${locale}`;

  return `${localePrefix}/resources/technical-articles/${articleSlug}/`;
}

/**
 * 返回已按语言和具体电机版本整理好的 Applications 内容。
 *
 * 只有明确登记的详情页型号才会得到内容；系列页返回 undefined。
 * 通用详情组件不含任何隔膜泵判断。
 */
export function getDiaphragmPumpApplicationDetails(
  copyKey: DiaphragmPumpReferenceCopyKey | null | undefined,
  locale: SelectionLocale,
): ProductApplicationsContent | undefined {
  if (!copyKey) return undefined;

  const source = PRODUCT_APPLICATION_SOURCES[copyKey];

  if (!source) return undefined;

  if (source.series === "dpgl800") {
    const series = APPLICATION_DATA.series.dpgl800;
    const content =
      locale === "zh"
        ? ZH_DIAPHRAGM_PUMP_APPLICATIONS.dpgl800
        : series.locales[locale];

    return {
      tabLabel: content.tabLabel,
      title: content.title,
      intro: [...content.intro],
      items: content.items.map((item) => ({
        title: item.title,
        paragraphs: [...item.paragraphs],
      })),
      selectionNote: {
        title: content.selectionNote.title,
        paragraphs: [...content.selectionNote.paragraphs],
        articleHref: buildArticleHref(locale, series.articleSlug),
        linkText: content.linkText,
      },
    };
  }

  const series = APPLICATION_DATA.series[source.series];
  const content =
    locale === "zh"
      ? ZH_DIAPHRAGM_PUMP_APPLICATIONS[source.series]
      : series.locales[locale];
  const motorComparison = getDiaphragmPumpMotorComparison(copyKey, locale);

  return {
    tabLabel: content.tabLabel,
    title: content.title,
    intro: [...content.variantIntros[source.variant]],
    items: content.items.map((item) => ({
      title: item.title,
      paragraphs: [...item.paragraphs],
    })),
    ...(motorComparison ? { motorComparison } : {}),
    selectionNote: {
      title: content.selectionNote.title,
      paragraphs: [...content.selectionNote.variantParagraphs[source.variant]],
      articleHref: buildArticleHref(locale, series.articleSlug),
      linkText: content.linkText,
    },
  };
}

export const DIAPHRAGM_PUMP_APPLICATION_LOCALES = [
  "zh",
  "en",
  "es",
  "fr",
  "ko",
  "ru",
] as const satisfies readonly ApplicationLocale[];

export const DIAPHRAGM_PUMP_APPLICATION_SERIES = [
  "dpl30",
  "dpl60",
  "dpl30h",
  "dpgl800",
] as const satisfies readonly ApplicationSeriesKey[];
