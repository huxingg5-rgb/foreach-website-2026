import { applicationAreas } from "@/data/applications/application-index";
import { getApplicationIndexData } from "@/data/applications/application-index-locales";
import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleLocale } from "./technical-articles.types";

const contexts = {
  "what-is-a-quick-disconnect-fitting": { section: 6, kinds: ["ivd", "lab-automation"], reason: 0 },
  "threaded-hose-barb-fittings-selection-guide": { section: 4, kinds: ["ivd", "analytical-instruments"], reason: 1 },
  "barbed-fitting-expansion-ratio": { section: 6, kinds: ["ivd", "lab-automation"], reason: 2 },
  "fitting-material-selection-guide": { section: 2, kinds: ["analytical-instruments", "environmental-monitoring"], reason: 3 },
} as const;
const copy: Record<TechnicalArticleLocale, { reasons: string[]; material: string; related: string }> = {
  "zh-CN": { reasons: [
    "储液瓶更换和模块维护可结合以下应用领域的供液、清洗与维护任务阅读；接头是否适用仍按实际液路验证。",
    "上述 M6 选型方法可用于梳理仪器的试剂与清洗液连接需求，相关液路任务见以下应用领域。",
    "试剂供液和孔板清洗中的软管连接，可按以下应用任务确定介质、启停和保持性验证条件。",
    "材料相容性应覆盖样品、试剂及清洗液。以下应用领域可帮助补全分析单元与现场监测的介质、清洗和维护条件。",
  ], material: "接头材质选择：本体、密封件与介质条件", related: "继续阅读：" },
  en: { reasons: [
    "For reservoir replacement and module service, review the supply, washing and maintenance tasks in these applications. Validate fitting suitability in the actual fluid path.",
    "Use the M6 selection process above to define reagent and wash-line connections. These application guides explain the associated fluidic tasks.",
    "For reagent supply and microplate washing, use these application tasks to define fluid exposure, start/stop and tubing-retention tests.",
    "Compatibility must cover samples, reagents and cleaners. These application guides help identify analytical and field-monitoring fluid, cleaning and maintenance conditions.",
  ], material: "Fitting materials: body, seals and fluid compatibility", related: "Further reading: " },
  es: { reasons: [
    "Para cambiar depósitos y mantener módulos, consulte tareas de suministro, lavado y mantenimiento. Valide el racor en el circuito real.",
    "Use el proceso M6 para definir conexiones de reactivos y lavado. Estas aplicaciones explican las tareas del circuito.",
    "En suministro de reactivos y lavado de microplacas, estas tareas ayudan a definir fluido, arranques/paradas y ensayos de retención.",
    "La compatibilidad debe cubrir muestras, reactivos y limpiadores. Estas aplicaciones ayudan a definir condiciones analíticas y de monitorización en campo.",
  ], material: "Materiales del racor: cuerpo, juntas y compatibilidad", related: "Lectura relacionada: " },
  fr: { reasons: [
    "Pour le remplacement de réservoirs et la maintenance des modules, consultez les tâches d'alimentation et de lavage de ces applications. Validez le raccord dans le circuit réel.",
    "Utilisez la démarche M6 pour définir les liaisons de réactifs et de lavage. Ces applications expliquent les tâches fluidiques associées.",
    "Pour l'alimentation en réactifs et le lavage de microplaques, ces tâches aident à définir fluides, démarrages/arrêts et essais de maintien.",
    "La compatibilité couvre échantillons, réactifs et nettoyants. Ces applications précisent les conditions analytiques et de surveillance sur site.",
  ], material: "Matériaux du raccord : corps, joints et compatibilité", related: "À lire également : " },
  ko: { reasons: [
    "저장 용기 교체와 모듈 유지보수는 아래 적용 분야의 공급·세척·정비 작업과 함께 검토합니다. 피팅 적합성은 실제 유로에서 검증합니다.",
    "위 M6 선정 절차로 시약·세척액 연결 조건을 정리할 수 있습니다. 관련 유로 작업은 아래 적용 분야를 참고하세요.",
    "시약 공급과 마이크로플레이트 세척 작업을 바탕으로 유체 노출, 기동·정지와 튜브 유지력 시험 조건을 정합니다.",
    "재료 적합성은 시료·시약·세정제를 모두 포함합니다. 아래 적용 분야에서 분석 장비와 현장 모니터링의 유체·세척·유지보수 조건을 확인할 수 있습니다.",
  ], material: "피팅 재료: 본체·씰·유체 적합성", related: "관련 내용: " },
  ru: { reasons: [
    "Для замены ёмкостей и обслуживания модулей рассмотрите задачи подачи, промывки и обслуживания в этих применениях. Проверяйте фитинг в реальном тракте.",
    "Используйте пример M6 для определения соединений реагентных и промывочных линий. Эти разделы описывают соответствующие задачи.",
    "Для подачи реагентов и промывки микропланшетов определите по этим задачам среды, пуски/остановки и испытания удержания трубки.",
    "Совместимость охватывает пробы, реагенты и очистители. Эти применения помогают определить условия аналитики и полевого мониторинга.",
  ], material: "Материалы фитинга: корпус, уплотнения и совместимость", related: "Дополнительно: " },
};

export function addFittingContextLinks(source: DiaphragmPumpEngineeringArticleCopy, slug: string, locale: TechnicalArticleLocale): DiaphragmPumpEngineeringArticleCopy {
  const context = contexts[slug as keyof typeof contexts];
  if (!context) return source;
  const prefix = locale === "zh-CN" ? "" : `/${locale}`;
  const ui = copy[locale];
  // Consume the website's actual localized area names, rather than translating
  // navigation labels independently inside each article.
  const areas = locale === "zh-CN" ? applicationAreas : getApplicationIndexData(locale).areas;
  const appLinks: EngineeringArticleBlock = { type: "links", items: context.kinds.map((kind, index) => ({
    href: `${prefix}/applications/${kind}/`,
    label: areas.find(area => area.kind === kind)!.title,
    prefix: index === 0 ? "" : " · ",
  })) };
  const materialHref = `${prefix}/resources/technical-articles/fitting-material-selection-guide/`;
  return { ...source, sections: source.sections.map((section, index) => {
    const blocks = [...section.blocks];
    // Chinese already has this link. Add the missing counterpart to the five
    // existing quick-disconnect translations in the materials/conditions section.
    if (slug === "what-is-a-quick-disconnect-fitting" && index === 5
      && !blocks.some(block => block.type === "links" && block.items.some(item => item.href === materialHref))) {
      blocks.push({ type: "links", items: [{ href: materialHref, label: ui.material, prefix: ui.related }] });
    }
    if (index === context.section) blocks.push({ type: "paragraph", text: ui.reasons[context.reason] }, appLinks);
    return { ...section, blocks };
  }) };
}
