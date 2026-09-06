/** Generate complete, reviewed translations; never fall back to partial word replacement. */
import fs from "node:fs";
import path from "node:path";
import { EA_PUMP_MODELS, getEaPumpContent } from "../../data/products/detail/applications/ea-pump-content";
import { COMPACT_PUMP_MODELS, getCompactPumpContent } from "../../data/products/detail/applications/compact-pump-content";
import { PLUNGER_PUMP_CARD_HEADING_EN_BY_MODEL } from "../../data/products/selection/card-copy/plunger-pump-card-copy";
import { getPumpSeriesProductDetailAdapter } from "../../services/products/adapters/getPumpSeriesProductDetailAdapter";
import rawCatalog from "../../data/products/detail/applications/piston-pump-translations.json";

type TargetLocale = "es" | "fr" | "ko" | "ru";
type Translation = Record<TargetLocale, string>;
const locales: TargetLocale[] = ["es", "fr", "ko", "ru"];
const catalog = rawCatalog as { atoms: Record<string, Translation>; templates: Record<string, Translation> };
const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const tokenPattern = new RegExp(
  "(?:EA|SM|TM)-\\d+-(?:PMMA|PEEK)|\\d+(?:\\.\\d+)? (?:μL|mL)|" +
  Object.keys(catalog.atoms).map(escapeRegex).sort((a, b) => b.length - a.length).join("|") +
  "|\\d+(?:\\.\\d+)?", "gi",
);

function translateText(text: string, locale: TargetLocale): string {
  const prefix = text.match(/^\d+\. /)?.[0] || "";
  const translated = text.slice(prefix.length).split(/(?<=[.!?])\s+(?=[A-Z])/).map(sentence => {
    const tokens: string[] = [];
    const key = sentence.replace(tokenPattern, token => {
      tokens.push(catalog.atoms[token.toLowerCase()]?.[locale] || token);
      return `{${tokens.length - 1}}`;
    });
    const template = catalog.templates[key]?.[locale];
    if (template === undefined) throw new Error(`Missing ${locale} translation: ${key}`);
    return template.replace(/\{(\d+)\}/g, (_, index) => {
      if (tokens[Number(index)] === undefined) throw new Error(`Unbound placeholder: ${key}`);
      return tokens[Number(index)];
    });
  }).join(" ");
  const result = prefix + translated;
  if (locale === "fr") return result.replace(/à le\b/g, "au").replace(/à les\b/g, "aux").replace(/\bde le\b/g, "du").replace(/\bde les\b/g, "des");
  if (locale === "es") return result.replace(/\ba el\b/g, "al").replace(/\bde el\b/g, "del");
  return result;
}

function translateValue<T>(value: T, locale: TargetLocale): T {
  if (typeof value === "string") return translateText(value, locale) as T;
  if (Array.isArray(value)) return value.map(item => translateValue(item, locale)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateValue(item, locale)])) as T;
  }
  return value;
}

const seoNouns: Translation = {
  es: "Bomba de pistón de precisión", fr: "Pompe à piston de précision",
  ko: "정밀 피스톤 펌프", ru: "Прецизионный поршневой насос",
};
const cta: Record<TargetLocale, { title: string; body: string; button: string }> = {
  es: { title: "Confirme la configuración de", body: "Indique el fluido, volumen por dosis, error permitido, tiempo, temperatura, contrapresión, espacio y requisitos de control. FOREACH le ayudará a seleccionar materiales, puertos y componentes para su aplicación.", button: "Contactar con un ingeniero" },
  fr: { title: "Confirmez la configuration de", body: "Précisez le fluide, le volume par dose, l’erreur admissible, le délai, la température, la contre-pression, l’espace et les besoins de commande. FOREACH vous aide à choisir les matériaux, raccordements et composants adaptés à votre application.", button: "Contacter un ingénieur" },
  ko: { title: "구성 확인:", body: "유체, 단회 주입량, 허용 오차, 소요 시간, 온도, 배압, 설치 공간 및 제어 요구를 알려주십시오. FOREACH가 응용 조건에 맞는 재료, 포트 및 부품 선정을 지원합니다.", button: "엔지니어에게 문의" },
  ru: { title: "Подтвердите конфигурацию", body: "Укажите жидкость, объём дозы, допустимую погрешность, время, температуру, противодавление, пространство и требования к управлению. FOREACH поможет подобрать материалы, порты и компоненты для вашего применения.", button: "Связаться с инженером" },
};

const generated: Record<string, Record<string, unknown>> = {};
const headings: Record<string, Record<string, string>> = {};
const source = {} as Record<string, unknown>;
for (const locale of locales) { generated[locale] = {}; headings[locale] = {}; }
for (const slug of [...EA_PUMP_MODELS, ...COMPACT_PUMP_MODELS]) {
  const content = getEaPumpContent(slug, "en") || getCompactPumpContent(slug, "en");
  const data = getPumpSeriesProductDetailAdapter(slug, "en");
  if (!content || !data) throw new Error(`Missing authoritative source for ${slug}`);
  const extra = data as typeof data & { parameterFootnotes?: string[]; resourceFootnotes?: string[]; pageFootnotes?: string[]; imageCaption?: string; imageFootnotes?: string[]; sectionTitleMap?: Record<string, string> };
  const english = {
    ...content, heading: PLUNGER_PUMP_CARD_HEADING_EN_BY_MODEL[slug.toUpperCase()],
    specs: data.specs, parameterFootnotes: extra.parameterFootnotes, resourceFootnotes: extra.resourceFootnotes,
    pageFootnotes: extra.pageFootnotes, imageCaption: extra.imageCaption, imageFootnotes: extra.imageFootnotes,
    sectionTitleMap: extra.sectionTitleMap,
  };
  source[slug] = english;
  for (const locale of locales) {
    const translated = translateValue(english, locale);
    const model = slug.toUpperCase();
    const [, capacity, material] = slug.split("-");
    const volume = Number(capacity) >= 1000 ? `${Number(capacity) / 1000} mL` : `${capacity} μL`;
    const compactSeo = translated as typeof translated & { seoTitle?: string; metaDescription?: string };
    const seoTitle = compactSeo.seoTitle || `${model} ${volume} ${material.toUpperCase()} ${seoNouns[locale]} | FOREACH`;
    headings[locale][model] = translated.heading;
    generated[locale][slug] = {
      ...translated, seoTitle, metaDescription: compactSeo.metaDescription || translated.description[0],
      bottomCtaTitle: `${cta[locale].title} ${model}`,
      bottomCtaDescription: cta[locale].body, bottomCtaButtonText: cta[locale].button, bottomCtaHref: "/contact/",
    };
  }
}

const outputs = {
  "data/products/detail/applications/piston-pump-locales.generated.json": JSON.stringify(generated, null, 2) + "\n",
  "data/products/selection/card-copy/piston-pump-headings.generated.json": JSON.stringify(headings, null, 2) + "\n",
};
const check = process.argv.includes("--check");
for (const [relative, value] of Object.entries(outputs)) {
  const target = path.join(process.cwd(), relative);
  if (check) {
    if (!fs.existsSync(target) || fs.readFileSync(target, "utf8") !== value) throw new Error(`Stale translated data: ${relative}`);
  } else fs.writeFileSync(target, value);
}
console.log(JSON.stringify({ check, models: Object.keys(source).length, locales, detailPages: Object.keys(source).length * locales.length, outputs: Object.keys(outputs) }));
