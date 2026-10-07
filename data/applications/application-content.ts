import workflows from "./application-workflows.json";
import profiles from "./application-task-profiles.json";
import catalog from "./application-product-catalog.json";

export type ApplicationContentLocale = "zh" | "en";
type Text = { zh: string; en: string };
type Related = { label: Text; href: string };
export type ApplicationModuleContent = { task: string; title: string; description: Text };
export type ApplicationGroupContent = {
  title: string; summary: Text; conditions: Text[]; outcome: Text; boundary: Text;
  related: Related[]; modules: Record<string, ApplicationModuleContent>;
};
type ProductCopy = {
  name: Text; ability: Text; params: Text[]; advantage: Text; solves: Text; path: string;
};
type TaskProfile = { label: Text; input: Text; steps: Text[]; validation: Text[]; faults: Text[] };
const groupContent: Record<string, Record<string, ApplicationGroupContent>> = workflows;
const productContent: Record<string, ProductCopy> = catalog;
const taskProfiles: Record<string, TaskProfile> = profiles;
export const applicationProductKeys = Object.keys(productContent);

export function getApplicationGroupContent(kind: string, group: string) {
  return groupContent[kind]?.[group];
}
export function getApplicationModuleContent(kind: string, group: string, module: string) {
  return getApplicationGroupContent(kind, group)?.modules[module];
}
export function localizeApplicationHref(href: string, locale: ApplicationContentLocale) {
  return locale === "en" && href.startsWith("/") && !href.startsWith("/en/")
    ? "/en" + href : href;
}
export function getApplicationProductHref(key: string, locale: ApplicationContentLocale = "zh") {
  if (key === "sensors" && locale === "en") return "/en/products/control/";
  return localizeApplicationHref(productContent[key]?.path ?? "/products/", locale);
}
export function getApplicationProductCopy(key: string, locale: ApplicationContentLocale) {
  const copy = productContent[key];
  if (!copy) return undefined;
  return {
    name: copy.name[locale], ability: copy.ability[locale],
    params: copy.params.map(item => item[locale]), advantage: copy.advantage[locale],
    solves: copy.solves[locale], productHref: getApplicationProductHref(key, locale),
    contactHref: localizeApplicationHref("/contact/", locale),
  };
}
export function getModuleProductKeys(kind: string, group: string, module: string, original: string[]) {
  const task = getApplicationModuleContent(kind, group, module)?.task;
  const keys = [...original];
  if (task === "pipette") keys.push("pipettingPump");
  if (task === "continuous" || task === "repeatDose") keys.push("valvelessPump");
  if (task === "wash" || task === "beadWash" || task === "drain") keys.push("gasLiquidPump");
  if (kind === "analytical-instruments" && group === "chromatography" &&
      ["injection", "solvent"].includes(module)) keys.push("highPressureValve");
  return [...new Set(keys)].filter(key => productContent[key]);
}
export function getApplicationWorkflow(kind: string, group: string, module: string, locale: ApplicationContentLocale) {
  const category = getApplicationGroupContent(kind, group);
  const entry = category?.modules[module];
  const profile = entry && taskProfiles[entry.task];
  if (!category || !entry || !profile) return undefined;
  return {
    inputs: [...category.conditions.map(item => item[locale]), profile.input[locale]],
    steps: profile.steps.map(item => item[locale]),
    validation: [...profile.validation.map(item => item[locale]), category.outcome[locale]],
    faults: profile.faults.map(item => item[locale]),
    boundary: category.boundary[locale],
    related: category.related.map(item => ({
      label: item.label[locale], href: localizeApplicationHref(item.href, locale),
    })),
  };
}
type ProductSource = { name: string; ability: string; params: string[]; advantage: string; solves: string; key?: string };
type ModuleSource = { key: string; description: string; products: string[] };
type GroupSource = { key: string; summary: string; focusSummary: string; focusPoints: string[]; modules: ModuleSource[] };
type SourcePage = {
  hero: { description: string };
  products?: Record<string, ProductSource>; productAbilities?: Record<string, ProductSource>;
  applications?: GroupSource[]; instruments?: GroupSource[];
  cta?: { description: string }; ctaBanner?: { description: string };
};
const intros: Record<string, string> = {
  ivd: "面向生化、免疫、血液、凝血与分子诊断，按检测方法组织样本、试剂、清洗和废液液路。",
  "life-science": "面向核酸、细胞与蛋白处理，将液体交付连接到产物回收、细胞状态和实验污染控制。",
  "lab-automation": "面向移液、样本制备、孔板与分装平台，协调液体类别、多工位、并发节拍和异常恢复。",
  "analytical-instruments": "面向色谱、元素分析、水质与前处理，区分计量、进样、辅助供液和排废，按分析方法验证。",
  "environmental-monitoring": "面向现场水样、废水和气体预处理，关注取样代表性、输送更新、介质状态与长期维护。",
  "synthetic-biology": "面向微型反应器、构建筛选与在线采样，协调补料、体积平衡、污染边界和过程恢复。",
};
const projectInputs = "请提供设备与方法、液体配方、工作体积或流量、实际压力/温度、容器与管路、运行节拍及验收目标，以便评估候选配置、接液材料与验证计划。";
export function enrichChineseApplicationData<T extends SourcePage>(kind: string, source: T): T {
  const productField = source.productAbilities ? "productAbilities" : "products";
  const groupField = source.instruments ? "instruments" : "applications";
  const sourceProducts = source[productField] ?? {};
  const products = Object.fromEntries(applicationProductKeys.map(key => [
    key, { ...sourceProducts[key], key, ...getApplicationProductCopy(key, "zh") },
  ]));
  const groups = (source[groupField] ?? []).map(group => {
    const copy = getApplicationGroupContent(kind, group.key);
    return {
      ...group,
      ...(copy ? { summary: copy.summary.zh, focusSummary: copy.summary.zh,
        focusPoints: [...copy.conditions.map(item => item.zh), copy.outcome.zh, copy.boundary.zh] } : {}),
      modules: group.modules.map(module => ({
        ...module,
        description: getApplicationModuleContent(kind, group.key, module.key)?.description.zh ?? module.description,
        products: getModuleProductKeys(kind, group.key, module.key, module.products),
      })),
    };
  });
  return {
    ...source, hero: { ...source.hero, description: intros[kind] ?? source.hero.description },
    [productField]: products, [groupField]: groups,
    ...(source.cta ? { cta: { ...source.cta, description: projectInputs } } : {}),
    ...(source.ctaBanner ? { ctaBanner: { ...source.ctaBanner, description: projectInputs } } : {}),
  } as T;
}
