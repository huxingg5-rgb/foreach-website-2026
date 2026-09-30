import details from "../generated/pumps/valveless-pumps/detail/index.json";
import { en } from "./valveless-locales/en";
import { es } from "./valveless-locales/es";
import { fr } from "./valveless-locales/fr";
import { ko } from "./valveless-locales/ko";
import { ru } from "./valveless-locales/ru";
import type { ValvelessForeignLocale, ValvelessScenario } from "./valveless-locales/types";
import type { ProductApplicationsContent } from "./product-detail.types";

// This module must stay independent of the selection catalog and SEO title helper:
// both use these authored strings. Identity and specifications come from the source records.
const locales = { en, es, fr, ko, ru };
export const valvelessForeignLocales = Object.keys(locales) as ValvelessForeignLocale[];
export function getValvelessLocaleCopy(locale: string) {
  return locales[locale as ValvelessForeignLocale];
}

const scenarios: Record<string, ValvelessScenario[]> = {
  "rpl-p4": ["reagent", "titration", "smallfill"],
  "rpl-p635": ["reagent", "titration", "midfill"],
  "rpl-p15": ["largefill", "buffer", "continuous"],
  "drpl-0109": ["dilution", "preparation", "batch"],
  "drpl-0119": ["dilution", "preparation", "batch"],
};

export function getValvelessForeignContent(slug: string, locale: string) {
  const copy = getValvelessLocaleCopy(locale);
  const source = details.find(item => item.slug === slug);
  if (!copy || !source || !scenarios[slug]) return undefined;
  const dual = slug.startsWith("drpl-");
  const key = dual ? "dual" : slug === "rpl-p4" ? "p4" : slug === "rpl-p635" ? "p635" : "p15";
  const model = source.productCode.replace(/^(DRPL-\d{4})-\d+$/, "$1");
  const value = (label: string) => source.specs.find(item => item.label === label)?.value || "";
  const parts = Number(value("稀释液份数"));
  const params: Record<string, string | number> = {
    model,
    range: value("排量范围"), minimum: value("排量范围").split("–")[0],
    exampleQ: key === "p4" ? 80 : 100, exampleDose: key === "p4" ? 400 : 500,
    ratio: value("稀释比"), parts, factor: parts + 1,
    concentrate: value("浓缩液定量（μL）"), diluent: value("稀释液定量（μL）"), total: value("配液量（mL）"),
    batchConcentrate: parts === 9 ? 10 : 5, batchDiluent: parts === 9 ? 90 : 95,
    reagentSetup: key === "p4" ? copy.reagentSetup.p4 : copy.reagentSetup.p635,
    materialDetails: key === "dual" ? "" : copy.materialDetails[key],
  };
  const fill = (text: string) => text.replace(/\{\{(\w+)\}\}/g, (_, token: string) => {
    if (!(token in params)) throw new Error(`Unknown valveless content token: ${token}`);
    return String(params[token]);
  });
  const items = scenarios[slug].map(id => ({
    title: fill(copy.applications[id].title), paragraphs: copy.applications[id].paragraphs.map(fill),
  }));
  const selection = dual ? copy.selectionDual : copy.selectionSingle;
  const applicationDetails: ProductApplicationsContent = {
    tabLabel: copy.applicationsTab, title: copy.applicationsTitle,
    intro: [fill(copy.intros[key])], items,
    selectionNote: { title: copy.selectionTitle, paragraphs: [fill(selection)] },
  };
  const localizedValue = (raw: string) => {
    if (raw === "PVDF") return copy.materials.pvdf;
    if (raw === "Al₂O₃" || raw === "ZrO₂") return slug === "rpl-p635" ? copy.materials.zirconia : copy.materials.alumina;
    if (raw === "RPL 无阀泵") return copy.singleName;
    if (raw === "DRPL 双头无阀泵") return copy.dualName;
    if (raw === "定制配置") return copy.customConfiguration;
    if (raw === "G1/8（默认带金属快插接头）") return copy.metalFitting;
    return raw.replace(/cycles/g, { en: "cycles", es: "ciclos", fr: "cycles", ko: "사이클", ru: "циклов" }[locale as ValvelessForeignLocale]);
  };
  const specs = source.specs.map(row => {
    const label = copy.specs[row.label];
    if (!label) throw new Error(`Missing ${locale} valveless specification: ${row.label}`);
    const translatedValue = localizedValue(row.value);
    return { ...row, label, name: label, title: label, value: translatedValue, content: translatedValue };
  });
  return {
    model, source, cardSummary: fill(copy.cards[key]),
    description: fill(copy.descriptions[key]),
    metaDescription: fill(dual ? copy.seoDual : copy.seoSingle),
    applicationDetails, commonApplications: items.map(item => item.title),
    faqs: (dual ? copy.faqDual : copy.faqSingle).map(item => ({ question: fill(item.question), answer: fill(item.answer) })),
    specs, imageAlt: `FOREACH ${model} ${dual ? copy.dualName : copy.singleName}`,
    presentation: {
      specNotes: dual ? copy.specNotesDual : copy.specNotesSingle,
      modelUnavailable: fill(copy.modelUnavailable), drawingUnavailable: fill(copy.drawingUnavailable),
      bottomCta: { title: fill(copy.ctaTitle), desc: fill(selection), button: copy.ctaButton, href: `/${locale}/contact` },
    },
  };
}
