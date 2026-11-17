import { getInstrumentProductGuide, type GuideFigure, type InstrumentProductGuide } from "./instrument-product-guides.zh";
import { fittingText } from "./fitting-ui.intl";
import drpl from "./instrument-guide-locales/drpl.json";
import smtp2 from "./instrument-guide-locales/smtp2.json";
import smtp4 from "./instrument-guide-locales/smtp4.json";
import syringe from "./instrument-guide-locales/syringe.json";
import sv10 from "./instrument-guide-locales/sv10.json";
import mrv3 from "./instrument-guide-locales/mrv3.json";
import hp from "./instrument-guide-locales/hp.json";
import abd from "./instrument-guide-locales/abd.json";
import pdm5 from "./instrument-guide-locales/pdm5.json";
import { getInstrumentFigureLegend } from "./instrument-guide-locales/figures";

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

/** RPL has an existing authored localization and remains owned by its adapter. */
export function getLocalizedInstrumentGuide(slug: string, locale: string): InstrumentProductGuide | undefined {
  if (!instrumentGuideLocales.includes(locale as InstrumentGuideLocale)) return undefined;
  const source = getInstrumentProductGuide(slug);
  if (!source || source.family === "rpl") return undefined;
  const t = (value: string) => instrumentGuideText(value, locale);
  const figure = (value: GuideFigure): GuideFigure => ({ ...value, alt: t(value.alt), caption: t(value.caption),
    legend: [...(value.legend?.map(t) ?? []), ...(getInstrumentFigureLegend(value.file, locale as InstrumentGuideLocale) ?? [])] });
  return {
    ...source,
    // productType is an internal form-option key, localized by the shared form.
    lead: t(source.lead),
    features: source.features.map(([title, body]) => [t(title), t(body)]),
    documents: source.documents.map(([title, body]) => [t(title), t(body)]),
    sections: source.sections.map(section => ({ ...section, title: t(section.title), intro: t(section.intro),
      ...(section.note ? { note: t(section.note) } : {}),
      ...(section.rows ? { rows: section.rows.map(([label, value, explanation]) => [t(label), t(value), t(explanation)] as const) } : {}),
      ...(section.steps ? { steps: section.steps.map(([title, body]) => [t(title), t(body)] as const) } : {}),
      ...(section.figure ? { figure: figure(section.figure) } : {}),
      ...(section.figures ? { figures: section.figures.map(figure) } : {}),
      ...(section.links ? { links: section.links.map(link => ({ href: `/${locale}${link.href}`, label: t(link.label) })) } : {}),
    })),
  };
}
