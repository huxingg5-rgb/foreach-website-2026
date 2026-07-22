import type {
  IvdApplicationPageData,
  IvdLocale,
} from "./ivd-application.types";
import {
  ivdEsExactText,
  ivdEsReplacements,
  ivdEsTermText,
} from "./ivd-application.es";
import {
  ivdFrExactText,
  ivdFrReplacements,
  ivdFrTermText,
} from "./ivd-application.fr";
import {
  ivdKoExactText,
  ivdKoReplacements,
  ivdKoTermText,
} from "./ivd-application.ko";
import {
  ivdRuExactText,
  ivdRuReplacements,
  ivdRuTermText,
} from "./ivd-application.ru";
import { ivdApplicationZhData } from "./ivd-application.zh";

type TargetLocale = Exclude<IvdLocale, "zh-CN" | "en">;

type LocaleTranslationConfig = {
  exact: Record<string, string>;
  terms: Record<string, string>;
  replacements: ReadonlyArray<readonly [string, string]>;
  comma: string;
  sentenceSeparator: string;
};

const TRANSLATION_CONFIG: Record<TargetLocale, LocaleTranslationConfig> = {
  es: {
    exact: ivdEsExactText,
    terms: ivdEsTermText,
    replacements: ivdEsReplacements,
    comma: ", ",
    sentenceSeparator: ". ",
  },
  fr: {
    exact: ivdFrExactText,
    terms: ivdFrTermText,
    replacements: ivdFrReplacements,
    comma: ", ",
    sentenceSeparator: ". ",
  },
  ko: {
    exact: ivdKoExactText,
    terms: ivdKoTermText,
    replacements: ivdKoReplacements,
    comma: ", ",
    sentenceSeparator: ". ",
  },
  ru: {
    exact: ivdRuExactText,
    terms: ivdRuTermText,
    replacements: ivdRuReplacements,
    comma: ", ",
    sentenceSeparator: ". ",
  },
};

const HERO_PANEL: Record<
  TargetLocale,
  { title: string; items: string[] }
> = {
  es: {
    title: "Cobertura de las etapas fluídicas clave",
    items: [
      "Aspiración de muestras, dispensación de reactivos y manipulación de pequeños volúmenes",
      "Conmutación multicanal y control de rutas",
      "Suministro de lavado, evacuación de residuos y mantenimiento",
      "Monitorización de presión, nivel y burbujas",
    ],
  },
  fr: {
    title: "Couverture des principales étapes fluidiques",
    items: [
      "Aspiration des échantillons, distribution des réactifs et manipulation de petits volumes",
      "Commutation multicanal et commande des voies",
      "Alimentation de lavage, évacuation des déchets et maintenance",
      "Surveillance de la pression, du niveau et des bulles",
    ],
  },
  ko: {
    title: "핵심 유로 공정 지원",
    items: [
      "샘플 흡입, 시약 분주 및 소량 액체 처리",
      "다채널 유로 전환 및 경로 제어",
      "세척액 공급, 폐액 배출 및 유지보수 공정",
      "압력, 액면 및 기포 상태 모니터링",
    ],
  },
  ru: {
    title: "Поддержка ключевых операций жидкостного тракта",
    items: [
      "Аспирация образцов, дозирование реагентов и работа с малыми объёмами",
      "Многоканальное переключение и управление путями",
      "Подача промывки, удаление отходов и обслуживание",
      "Контроль давления, уровня жидкости и пузырьков",
    ],
  },
};

function localizeHref(value: string, locale: TargetLocale) {
  if (value === "/") {
    return `/${locale}`;
  }

  if (value === "/products" || value === "/contact") {
    return `/${locale}${value}`;
  }

  return value;
}

function translateText(value: string, locale: TargetLocale) {
  if (value.startsWith("/")) {
    return localizeHref(value, locale);
  }

  const config = TRANSLATION_CONFIG[locale];
  const exact = config.exact[value] ?? config.terms[value];

  if (exact) {
    return exact;
  }

  const replacements = [
    ...Object.entries(config.terms),
    ...config.replacements,
  ].sort((a, b) => b[0].length - a[0].length);

  let translated = value;

  for (const [source, target] of replacements) {
    translated = translated.replaceAll(source, target);
  }

  return translated
    .replaceAll("、", config.comma)
    .replaceAll("，", config.comma)
    .replaceAll("；", "; ")
    .replaceAll("：", ": ")
    .replaceAll("。", config.sentenceSeparator)
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.;]\s*$/, "");
}

function translateValue<T>(value: T, locale: TargetLocale): T {
  if (typeof value === "string") {
    return translateText(value, locale) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => translateValue(item, locale)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        translateValue(item, locale),
      ]),
    ) as T;
  }

  return value;
}

function createTargetLocaleData(
  locale: TargetLocale,
): IvdApplicationPageData {
  const data = translateValue(ivdApplicationZhData, locale);
  const heroPanel = HERO_PANEL[locale];

  return {
    ...data,
    locale,
    hero: {
      ...data.hero,
      panelTitle: heroPanel.title,
      panelItems: heroPanel.items,
    },
  };
}

function createEnglishPlaceholderData(): IvdApplicationPageData {
  return {
    ...ivdApplicationZhData,
    locale: "en",
    breadcrumb: [
      { label: "Home", href: "/en" },
      { label: "Applications" },
      { label: "IVD" },
    ],
    hero: {
      eyebrow: "IVD APPLICATION",
      title: "IVD Fluidic System",
      highlight: "Solutions",
      description:
        "Fluidic component support for biochemistry, immunoassay, hematology, coagulation, molecular diagnostics and PCR instruments.",
      backgroundImage:
        "/images/applications/ivd/ivd-hero-bg-1920x800-v001.webp",
      panelTitle: "Key Fluidic Tasks",
      panelItems: [
        "Sample aspiration and reagent dispensing",
        "Multi-channel path switching",
        "Washing, drainage and waste handling",
        "Pressure, liquid-level and bubble monitoring",
      ],
    },
    instrumentSection: {
      eyebrow: "INSTRUMENT TYPES",
      title: "Instrument Types",
      description:
        "Select an instrument type to view its fluidic priorities and relevant product capabilities.",
    },
    moduleSection: {
      eyebrow: "FLUIDIC MODULES",
      title: "Fluidic Modules and Product Capabilities",
      description:
        "Select a fluidic module to review related products, parameters, advantages and application considerations.",
    },
    ctaBanner: {
      eyebrow: "ENGINEERING SUPPORT",
      title: "Have a specific IVD fluidic requirement?",
      description:
        "Share the instrument type, fluid, flow range, pressure, tubing dimensions and current issue with the FOREACH engineering team.",
      primaryText: "View Product Series",
      primaryHref: "/en/products",
      secondaryText: "Submit an Application Request",
      secondaryHref: "/en/contact",
    },
  };
}

export const ivdApplicationI18nData: Partial<
  Record<IvdLocale, IvdApplicationPageData>
> = {
  en: createEnglishPlaceholderData(),
  es: createTargetLocaleData("es"),
  fr: createTargetLocaleData("fr"),
  ko: createTargetLocaleData("ko"),
  ru: createTargetLocaleData("ru"),
};
