import { getInstrumentProductGuide, type GuideFigure, type InstrumentProductGuide } from "./instrument-product-guides.zh";
import { fittingText } from "./fitting-ui.intl";
import { getInstrumentGuideSectionSource } from "./instrument-detail-content.zh";
import hpHindi from "./instrument-guide-locales/hp.hi.json";
import hpItalian from "./instrument-guide-locales/hp.it.json";
import sv10Hindi from "./instrument-guide-locales/sv10.hi.json";
import sv10Italian from "./instrument-guide-locales/sv10.it.json";
import abdHindi from "./instrument-guide-locales/abd.hi.json";
import pdm5Hindi from "./instrument-guide-locales/pdm5.hi.json";
import mrv3Hindi from "./instrument-guide-locales/mrv3.hi.json";
import mrv3Italian from "./instrument-guide-locales/mrv3.it.json";
import drplHindi from "./instrument-guide-locales/drpl.hi.json";
import drplItalian from "./instrument-guide-locales/drpl.it.json";
import drplGerman from "./instrument-guide-locales/drpl.de.json";
import drpl from "./instrument-guide-locales/drpl.json";
import pipettingHindi from "./instrument-guide-locales/pipetting.hi.json";
import syringeHindi from "./instrument-guide-locales/syringe.hi.json";
import pipettingItalian from "./instrument-guide-locales/pipetting.it.json";
import pipettingGerman from "./instrument-guide-locales/pipetting.de.json";
import smtp2 from "./instrument-guide-locales/smtp2.json";
import smtp4 from "./instrument-guide-locales/smtp4.json";
import syringeItalian from "./instrument-guide-locales/syringe.it.json";
import syringeGerman from "./instrument-guide-locales/syringe.de.json";
import syringe from "./instrument-guide-locales/syringe.json";
import sv10 from "./instrument-guide-locales/sv10.json";
import mrv3 from "./instrument-guide-locales/mrv3.json";
import hp from "./instrument-guide-locales/hp.json";
import abdItalian from "./instrument-guide-locales/abd.it.json";
import pdm5Italian from "./instrument-guide-locales/pdm5.it.json";
import abd from "./instrument-guide-locales/abd.json";
import pdm5 from "./instrument-guide-locales/pdm5.json";
import { getInstrumentFigureLegend } from "./instrument-guide-locales/figures";
import { getGermanHpGuideText } from "./instrument-hp-guide.de";
import { getGermanSv10GuideText } from "./instrument-sv10-guide.de";
import { getGermanMrv3GuideText } from "./instrument-mrv3-guide.de";
import { getGermanControlGuideText } from "./instrument-control-guide.de";
import { germanEnglishFallbackSuffix, getGermanDraftLink, getHindiDraftLink, getItalianDraftLink, hindiEnglishFallbackSuffix, italianEnglishFallbackSuffix } from "@/lib/i18n/draft-languages";

export const instrumentGuideLocales = ["en", "es", "fr", "ko", "ru"] as const;
export type InstrumentGuideLocale = (typeof instrumentGuideLocales)[number];
const messages = new Map([...drpl, ...smtp2, ...smtp4, ...syringe, ...sv10, ...mrv3, ...hp, ...abd, ...pdm5]
  .map(row => [row[0], row.slice(1)] as const));

/** Keep SKU, dimensions, electrical values and formulas from the approved source. */
export function instrumentGuideText(source: string, locale: string): string {
  const language = instrumentGuideLocales.indexOf(locale as InstrumentGuideLocale);
  if (language < 0 || !/[\u3400-\u9fff]/.test(source)) return source;
  const numbers: string[] = [];
  const key = source.replace(/\d+(?:\.\d+)?/g, value => `{${numbers.push(value) - 1}}`);
  const template = messages.get(key)?.[language];
  if (template) return template.replace(/\{(\d+)\}/g, (_, index: string) => numbers[Number(index)]);
  // Reuse established site terminology for shared labels already translated.
  const shared = fittingText(source, locale);
  if (!/[\u3400-\u9fff]/.test(shared)) return shared;
  throw new Error(`Missing ${locale} instrument guide translation: ${source}`);
}

type GuideFamilyTranslations<T> = Record<Exclude<InstrumentProductGuide["family"], "rpl">, T>;
type GuideTextDictionary = Readonly<Record<string, string>>;
type GuideTextTranslator = (value: string) => string;

const hindiGuideTexts: GuideFamilyTranslations<GuideTextDictionary> = {
  abd: abdHindi,
  drpl: drplHindi,
  hp: hpHindi,
  mrv3: mrv3Hindi,
  pdm5: pdm5Hindi,
  smtp2: pipettingHindi,
  smtp4: pipettingHindi,
  sv10: sv10Hindi,
  syringe: syringeHindi,
};

const italianGuideTexts: GuideFamilyTranslations<GuideTextDictionary> = {
  abd: abdItalian,
  drpl: drplItalian,
  hp: hpItalian,
  mrv3: mrv3Italian,
  pdm5: pdm5Italian,
  smtp2: pipettingItalian,
  smtp4: pipettingItalian,
  sv10: sv10Italian,
  syringe: syringeItalian,
};

const dictionaryTranslator = (dictionary: GuideTextDictionary): GuideTextTranslator => value => dictionary[value] ?? value;
const germanGuideTranslators: GuideFamilyTranslations<GuideTextTranslator> = {
  abd: getGermanControlGuideText,
  drpl: dictionaryTranslator(drplGerman),
  hp: getGermanHpGuideText,
  mrv3: getGermanMrv3GuideText,
  pdm5: getGermanControlGuideText,
  smtp2: dictionaryTranslator(pipettingGerman),
  smtp4: dictionaryTranslator(pipettingGerman),
  sv10: getGermanSv10GuideText,
  syringe: dictionaryTranslator(syringeGerman),
};

/** RPL has an existing authored localization and remains owned by its adapter. */
export function getLocalizedInstrumentGuide(slug: string, locale: string): InstrumentProductGuide | undefined {
  const englishSource = locale === "de" || locale === "it" || locale === "hi";
  const sourceLocale = englishSource ? "en" : locale;
  if (!instrumentGuideLocales.includes(sourceLocale as InstrumentGuideLocale)) return undefined;
  const source = getInstrumentProductGuide(slug);
  if (!source || source.family === "rpl") return undefined;

  const translateEnglish = locale === "hi" ? dictionaryTranslator(hindiGuideTexts[source.family])
    : locale === "it" ? dictionaryTranslator(italianGuideTexts[source.family])
    : locale === "de" ? germanGuideTranslators[source.family] : (value: string) => value;
  const fallbackSuffix = locale === "hi" ? hindiEnglishFallbackSuffix : locale === "it" ? italianEnglishFallbackSuffix : germanEnglishFallbackSuffix;
  const t = (value: string) => translateEnglish(instrumentGuideText(value, sourceLocale));
  const figure = (value: GuideFigure): GuideFigure => ({ ...value, alt: t(value.alt), caption: t(value.caption),
    legend: [...(value.legend?.map(t) ?? []), ...(getInstrumentFigureLegend(value.file, sourceLocale as InstrumentGuideLocale)?.map(translateEnglish) ?? [])] });
  return {
    ...source,
    // productType is an internal form-option key, localized by the shared form.
    lead: t(source.lead),
    features: source.features.map(([title, body]) => [t(title), t(body)]),
    documents: source.documents.map(([title, body]) => [t(title), t(body)]),
    sections: source.sections.map(section => getInstrumentGuideSectionSource(source, section, sourceLocale)).map(section => ({ ...section, title: t(section.title), intro: t(section.intro),
      ...(section.note ? { note: t(section.note) } : {}),
      ...(section.rows ? { rows: section.rows.map(([label, value, explanation]) => [t(label), t(value), t(explanation)] as const) } : {}),
      ...(section.steps ? { steps: section.steps.map(([title, body]) => [t(title), t(body)] as const) } : {}),
      ...(section.figure ? { figure: figure(section.figure) } : {}),
      ...(section.figures ? { figures: section.figures.map(figure) } : {}),
      ...(section.links ? { links: section.links.map(link => {
        if (link.href.startsWith("/documents/")) return { href: link.href,
          label: t(link.label) + (englishSource && /-en\.pdf$/i.test(link.href) ? fallbackSuffix : "") };
        const href = `/${sourceLocale}${link.href}`;
        const localized = locale === "hi" ? getHindiDraftLink(href) : locale === "it" ? getItalianDraftLink(href) : locale === "de" ? getGermanDraftLink(href) : { href };
        return {
          href: localized.href,
          label: t(link.label) + ("hrefLang" in localized && localized.hrefLang === "en" ? fallbackSuffix : ""),
        };
      }) } : {}),
    })),
  };
}
