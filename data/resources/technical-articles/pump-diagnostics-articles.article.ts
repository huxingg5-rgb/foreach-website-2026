import { pumpDiagnosticsChineseArticles } from "./pump-diagnostics-articles.zh";
import en from "./pump-diagnostics-articles.en.json";
import es from "./pump-diagnostics-articles.es.json";
import fr from "./pump-diagnostics-articles.fr.json";
import ko from "./pump-diagnostics-articles.ko.json";
import ru from "./pump-diagnostics-articles.ru.json";
import { pumpDiagnosticsSlugs, type DiagnosticsDraft, type DiagnosticsUi } from "./pump-diagnostics-articles.types";
import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";

const drafts: Record<Exclude<TechnicalArticleLocale, "zh-CN">, DiagnosticsDraft[]> = { en, es, fr, ko, ru };
const articleHref = (slug: string) => `/resources/technical-articles/${slug}/`;
const piston = "/products/pumps/piston-pump/";
const diaphragm = "/products/pumps/miniature-diaphragm-pumps/";
const accuracy = articleHref("piston-pump-accuracy-repeatability-resolution");
const materials = articleHref("piston-pump-head-material-selection");
const overview = articleHref("miniature-diaphragm-pump-flow-pulsation-reduction");
const curves = articleHref("diaphragm-pump-flow-pressure-curve-guide");
const relatedHrefs = [
  [accuracy, articleHref(pumpDiagnosticsSlugs[1]), "/downloads/resources/datasheets/en/Pumps/ps-120b-2507-00002-001-en-eas-piston-pump.pdf", piston],
  [articleHref("piston-pump-acceleration-deceleration-curves"), materials, articleHref(pumpDiagnosticsSlugs[0]), piston],
  [accuracy, articleHref("precision-piston-pump-backlash-compensation"), materials, articleHref(pumpDiagnosticsSlugs[0])],
  [overview, articleHref(pumpDiagnosticsSlugs[5]), curves, diaphragm],
  [articleHref("suction-vs-discharge-resistance-diaphragm-pump"), articleHref("300-ml-min-micro-liquid-diaphragm-pump-self-priming-loss"), articleHref(pumpDiagnosticsSlugs[3]), curves],
  [articleHref(pumpDiagnosticsSlugs[3]), overview, articleHref("tube-inner-diameter-affects-diaphragm-pump-flow"), diaphragm],
];
const sources = [
  "https://www.hamiltoncompany.com/syringe-pumps/smartsense",
  "https://www.tecan.com/hubfs/HubDB/Te-DocDB/pdf/Tecan_GoodUsageGuidelines_e.pdf",
  "https://knf.com/en/in/stories-events/news-stories/article/flow-pressure-waves-fluid-systems",
  "https://knf.com/en/au/stories-events/news-stories/article/pump-cavitation-detection-and-prevention",
  "https://doi.org/10.1016/j.flowmeasinst.2004.05.001",
  "https://cdn.krohne.com/archive/MA_IFC090_e_72.pdf",
  "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00001_A04_cn_DPL30规格书.pdf",
  "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00002_A02_cn_DPL60规格书.pdf",
  "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2504-00001_A00_cn_DPL30H规格书.pdf",
];
const sourceIds = [[0], [1], [0], [2, 6, 7], [3, 6, 7, 8], [4, 5, 6, 7]];
const formalSpecificationLabel: Record<TechnicalArticleLocale, string> = {
  "zh-CN": "Foreach正式中文规格书",
  en: "Foreach official specification in Chinese",
  es: "Especificación oficial Foreach en chino",
  fr: "Spécification officielle Foreach en chinois",
  ko: "Foreach 공식 중국어 사양서",
  ru: "Официальная спецификация Foreach на китайском",
};
const ui: DiagnosticsUi = {
  "zh-CN": { faq: "常见问题", references: "技术参考", related: "继续阅读与规格核对", cta: "需要核对实际液路条件？", description: "可提供介质、工作体积或流量、压力、管路与控制时序，由恒永达协助确认配置和验证条件。", contact: "技术咨询", products: "查看泵产品", referenceLabels: ["Hamilton：压力与气泡监测原理", "Tecan：液体处理使用指南（平台参数不直接移植）", "KNF：液路中的流量与压力波", "KNF：气蚀的识别与预防", "Berrebi等，2004：脉动流采样误差研究（摘要核验）", "KROHNE IFC090手册（仅适用于对应仪表）"] },
  en: { faq: "Frequently asked questions", references: "Technical references", related: "Related reading and specifications", cta: "Need to review the actual fluid path?", description: "Share the fluid, working volume or flow, pressures, geometry and control sequence with Foreach to review configuration and validation conditions.", contact: "Discuss the application", products: "View pumps", referenceLabels: ["Hamilton: pressure and bubble monitoring", "Tecan: liquid-handling usage guide; platform settings are not transferable", "KNF: flow and pressure waves in fluid systems", "KNF: detecting and preventing cavitation", "Berrebi et al., 2004: pulsating-flow sampling error; abstract verified", "KROHNE IFC090 manual; instrument-specific guidance"] },
  es: { faq: "Preguntas frecuentes", references: "Referencias técnicas", related: "Lecturas y especificaciones relacionadas", cta: "¿Necesita revisar el circuito real?", description: "Facilite líquido, volumen o caudal, presiones, geometría y secuencia de control a Foreach para revisar configuración y condiciones de validación.", contact: "Consulta técnica", products: "Ver bombas", referenceLabels: ["Hamilton: monitorización de presión y burbujas", "Tecan: guía de uso; no trasladar ajustes de plataforma", "KNF: ondas de caudal y presión", "KNF: detección y prevención de cavitación", "Berrebi y colaboradores, 2004: error de muestreo; resumen verificado", "Manual KROHNE IFC090: instrucciones específicas del instrumento"] },
  fr: { faq: "Questions fréquentes", references: "Références techniques", related: "Lectures et spécifications associées", cta: "Besoin d’examiner le circuit réel ?", description: "Transmettez liquide, volume ou débit, pressions, géométrie et séquence de commande à Foreach pour examiner configuration et validation.", contact: "Échange technique", products: "Voir les pompes", referenceLabels: ["Hamilton : suivi de pression et de bulles", "Tecan : guide d’utilisation ; réglages de plateforme non transposables", "KNF : ondes de débit et de pression", "KNF : détection et prévention de la cavitation", "Berrebi et collaborateurs, 2004 : erreur d’échantillonnage ; résumé vérifié", "Manuel KROHNE IFC090 : indications propres à l’instrument"] },
  ko: { faq: "자주 묻는 질문", references: "기술 참고 자료", related: "관련 글과 사양 확인", cta: "실제 유로 조건을 검토해야 하나요?", description: "액체, 작업 체적 또는 유량, 압력, 형상과 제어 순서를 제공하면 Foreach와 구성 및 검증 조건을 검토할 수 있습니다.", contact: "기술 상담", products: "펌프 제품 보기", referenceLabels: ["Hamilton: 압력·기포 모니터링", "Tecan: 사용 지침, 플랫폼 설정 직접 적용 제외", "KNF: 유량과 압력파", "KNF: 캐비테이션 식별과 예방", "Berrebi 외, 2004: 맥동 유량 샘플링 오차, 초록 확인", "KROHNE IFC090 설명서, 해당 계기에 한정"] },
  ru: { faq: "Частые вопросы", references: "Технические источники", related: "Связанные материалы и спецификации", cta: "Нужно проверить реальный жидкостный тракт?", description: "Передайте Foreach данные о жидкости, объёме или расходе, давлениях, геометрии и управлении для проверки конфигурации и условий испытаний.", contact: "Техническая консультация", products: "Посмотреть насосы", referenceLabels: ["Hamilton: контроль давления и пузырьков", "Tecan: руководство; настройки платформы не переносятся напрямую", "KNF: волны расхода и давления", "KNF: обнаружение и предотвращение кавитации", "Berrebi и соавторы, 2004: ошибка выборки; проверена аннотация", "Руководство KROHNE IFC090: только для указанного прибора"] },
};

export function getPumpDiagnosticsArticleCopy(slug: string, locale: TechnicalArticleLocale): DiaphragmPumpEngineeringArticleCopy | null {
  const index = pumpDiagnosticsSlugs.findIndex((value) => value === slug);
  if (index < 0) return null;
  if (locale === "zh-CN") return pumpDiagnosticsChineseArticles[index];
  const draft = drafts[locale][index];
  const labels = ui[locale];
  const src = `/images/resources/technical-articles/pump-diagnostics/${String(index + 1).padStart(2, "0")}.svg`;
  const sections = draft.sections.map((section, sectionIndex) => {
    const blocks: EngineeringArticleBlock[] = section.paragraphs.map((text) => ({ type: "paragraph", text }));
    if (draft.formula.section === sectionIndex) blocks.push({ type: "formula", expression: draft.formula.expression, note: draft.formula.note });
    if (sectionIndex === 0) blocks.push({ type: "figure", src, alt: draft.diagram, caption: draft.diagram, width: 1000, height: 560 });
    if (draft.table.section === sectionIndex) blocks.push({ type: "table", headers: draft.table.headers, rows: draft.table.rows });
    if (sectionIndex === draft.sections.length - 1) {
      blocks.push({ type: "subheading", title: labels.related });
      blocks.push({ type: "links", items: relatedHrefs[index].map((href, linkIndex) => ({ href, label: draft.links[linkIndex] })) });
    }
    return { title: section.title, blocks };
  });
  sections.push({ title: labels.references, blocks: [{ type: "links", items: sourceIds[index].map((id) => ({
    href: sources[id],
    label: id < 6 ? labels.referenceLabels[id] : `${formalSpecificationLabel[locale]} — ${["DPL30 A04", "DPL60 A02", "DPL30H A00"][id - 6]}`,
  })) }] });
  return {
    metadata: { title: draft.title, seoTitle: draft.seo, seoDescription: draft.description, coverImage: src, coverAlt: draft.diagram },
    deck: draft.deck,
    leadBlocks: [{ type: "paragraph", text: draft.deck }],
    sections,
    faqTitle: labels.faq,
    faqItems: draft.faq,
    cta: { title: labels.cta, description: labels.description, contactLabel: labels.contact, productsLabel: labels.products, productsHref: index < 3 ? piston : diaphragm },
  };
}

function blockText(block: EngineeringArticleBlock): string {
  switch (block.type) {
    case "paragraph": return block.text;
    case "notice": return [block.label, block.text].filter(Boolean).join(" ");
    case "formula": return [block.expression, block.note].filter(Boolean).join(" ");
    case "table": return [block.headers, ...block.rows].map((row) => row.join(" | ")).join("\n");
    case "figure": return block.caption;
    case "subheading": return block.title;
    case "list": return block.items.join("\n");
    case "links": return block.items.map((item) => `${item.prefix ?? ""}${item.label}${item.suffix ?? ""}`).join("\n");
  }
}

export function getPumpDiagnosticsArticles(locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  return pumpDiagnosticsSlugs.map((slug, index) => {
    const copy = getPumpDiagnosticsArticleCopy(slug, locale)!;
    return {
      id: slug, slug, category: "pumps-valves", ...copy.metadata,
      summary: copy.deck, date: "2026-09-10",
      relationKeys: index < 3 ? ["series:ea", "series:sm", "series:tm"] : ["series:dpl30", "series:dpl60"],
      relationPriority: 135 - index,
      content: [
        { title: "", content: copy.deck },
        ...copy.sections.map((section) => ({ title: section.title, content: section.blocks.map(blockText).join("\n") })),
        { title: copy.faqTitle, content: copy.faqItems.map((item) => `${item.question}\n${item.answer}`).join("\n\n") },
      ],
    };
  });
}
