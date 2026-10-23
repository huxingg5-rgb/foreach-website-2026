import type {
  ProductConfiguratorConfig,
  ProductConfiguratorVariant,
} from "@/components/products/configurator/product-variant-configurator.types";
import { getSolenoidConfiguration, type SolenoidConfiguration } from "@/data/products/detail/solenoid-configurations";
import { isSolenoidLocale } from "@/data/products/detail/solenoid-content";
import { localizeSolenoidConfigurator } from "./solenoid-valves.i18n";

// Supplied ordering table 4.1-1: these are the only assigned numeric SKU codes.
export const solenoidOrderOptions = [
  { slug: "3-way-base", model: "SV10-P-3-24-EP/PK", productCode: "609024", connection: "P", energySaving: false },
  { slug: "2-way-no-base", model: "SV10-P-2NO-24-EP/PK", productCode: "609025", connection: "P", energySaving: false },
  { slug: "2-way-nc-base", model: "SV10-P-2NC-24-EP/PK", productCode: "609026", connection: "P", energySaving: false },
  { slug: "3-way-base", model: "SV10-P-3-24Y-EP/PK", productCode: "609028", connection: "P", energySaving: true },
  { slug: "2-way-no-threaded", model: "SV10-U28-2NO-24-EP/PK-1", productCode: "609029", connection: "U28", energySaving: false },
  { slug: "2-way-nc-threaded", model: "SV10-U28-2NC-24-EP/PK-1", productCode: "609030", connection: "U28", energySaving: false },
  { slug: "3-way-threaded", model: "SV10-U28-3-24-EP/PK-1", productCode: "609031", connection: "U28", energySaving: false },
  { slug: "2-way-no-threaded", model: "SV10-M6-2NO-24-EP/PK-1", productCode: "609032", connection: "M6", energySaving: false },
  { slug: "2-way-nc-threaded", model: "SV10-M6-2NC-24-EP/PK-1", productCode: "609033", connection: "M6", energySaving: false },
  { slug: "3-way-threaded", model: "SV10-M6-3-24-EP/PK-1", productCode: "609034", connection: "M6", energySaving: false },
] as const;

const interfaceLabels = { P: "基板型", M6: "M6 × 1", U28: "1/4-28 UNF（U28）" };
const standard = "标准型（无节能回路）";
const energySaving = "带节能回路（Y）";
const listNotice = {
  noticeTitle: "清单提示：",
  notice: "可多次选型并加入清单，每次请选择不同配置；同一配置无需重复添加。",
  allowListRemoval: false,
};

function getBarbedConfigurator(page: SolenoidConfiguration): ProductConfiguratorConfig {
  const valveType = page.key === "three" ? "3" : page.state === "no" ? "2NO" : "2NC";
  const valveForm = valveType === "3" ? "三通" : valveType === "2NO" ? "二通常开" : "二通常闭";
  // Configuration codes follow the supplied model-coding chart. No barbed SKU
  // was supplied; the model is only the internal cart identity, never a displayed SKU.
  const variants = [12, 24].flatMap(voltage =>
    Object.entries({ EP: "EPDM", FK: "FKM", FF: "FFKM" }).flatMap(([diaphragmCode, diaphragm]) =>
      Object.entries({ PK: "PEEK", PF: "PFA" }).flatMap(([baseCode, baseMaterial]) =>
        [false, true].map(withSaving => {
          const model = `SV10-B16-${valveType}-${voltage}${withSaving ? "Y" : ""}-${diaphragmCode}/${baseCode}`;
          return {
            id: model, model, productCode: model,
            attributes: { voltage, diaphragm, baseMaterial, energySaving: withSaving ? energySaving : standard },
          };
        }),
      ),
    ),
  );
  return {
    id: `sv10-${page.slug}`,
    title: `${page.model} 型号选型`,
    description: `倒刺型${valveForm}微型隔膜电磁阀，选择电压、材质及节能回路，生成完整配置型号。`,
    productName: page.model,
    showProductNameInSelection: false,
    showProductCode: false,
    emptyInitialSelection: true,
    autoSelectFollowingDimensions: false,
    emptySelectionText: "请选择配置",
    dimensions: [
      { key: "voltage", label: "使用电压", unit: "V DC", columns: 1, order: [12, 24] },
      { key: "diaphragm", label: "膜片材质", columns: 1, order: ["EPDM", "FKM", "FFKM"] },
      { key: "baseMaterial", label: "底板材质", columns: 1, order: ["PEEK", "PFA"] },
      { key: "energySaving", label: "节能回路", columns: 1, order: [standard, energySaving] },
    ],
    variants,
    fixedSummaryRows: [
      { label: "接口类型", value: "B16 · 倒刺（宝塔）" },
      { label: "通道数", value: page.key === "three" ? "3" : "2" },
      { label: "阀形式", value: valveForm },
      { label: "通径", value: "1.4 mm" },
    ],
    ...listNotice,
    uiText: { finalModel: "配置型号", selectionHint: "仅显示本款配置，可将不同型号分别加入清单", noMatchedModel: "请选择配置" },
  };
}

function buildSolenoidConfigurator(slug: string): ProductConfiguratorConfig | undefined {
  const page = getSolenoidConfiguration(slug);
  if (!page) return undefined;
  if (page.key === "two" && !page.state) {
    // Retained 2-way URLs allow NC/NO within the same connection family only.
    const closed = buildSolenoidConfigurator(`2-way-nc-${page.connection}`)!;
    const opened = buildSolenoidConfigurator(`2-way-no-${page.connection}`)!;
    return {
      ...closed,
      id: `sv10-${slug}`,
      title: `${page.model} 型号选型`,
      productName: page.model,
      description: "选择二通常闭或常开及对应配置，生成完整型号。",
      dimensions: [{ key: "valveForm", label: "阀形式", columns: 1, order: ["二通常闭", "二通常开"] }, ...closed.dimensions],
      variants: [
        ...closed.variants.map(variant => ({ ...variant, attributes: { ...variant.attributes, valveForm: "二通常闭" } })),
        ...opened.variants.map(variant => ({ ...variant, attributes: { ...variant.attributes, valveForm: "二通常开" } })),
      ],
      fixedSummaryRows: closed.fixedSummaryRows?.filter(row => row.label !== "阀形式"),
    };
  }
  if (page.connection === "barbed") return getBarbedConfigurator(page);
  const options = solenoidOrderOptions.filter(option => option.slug === slug);
  if (!options.length) return undefined;

  const threaded = page.connection === "threaded";
  const valveForm = page.key === "three" ? "三通" : page.state === "no" ? "二通常开" : "二通常闭";
  const variants = options.map<ProductConfiguratorVariant>(option => ({
    id: option.productCode,
    model: option.model,
    productCode: option.productCode,
    attributes: {
      [threaded ? "connection" : "energySaving"]: threaded
        ? interfaceLabels[option.connection]
        : option.energySaving ? energySaving : standard,
    },
  }));

  return {
    id: `sv10-${slug}`,
    title: `${page.model} 型号选型`,
    description: `${threaded ? "螺纹型" : "基板型"}${valveForm}微型隔膜电磁阀，选择配置后查看完整型号及商品编码。`,
    productName: page.model,
    showProductNameInSelection: false,
    emptyInitialSelection: true,
    autoSelectFollowingDimensions: false,
    emptySelectionText: "请选择配置",
    dimensions: threaded
      ? [{ key: "connection", label: "螺纹接口", columns: 1, order: [interfaceLabels.M6, interfaceLabels.U28] }]
      : [{ key: "energySaving", label: "节能回路", columns: 1, order: [standard, energySaving] }],
    variants,
    fixedSummaryRows: [
      ...(!threaded ? [{ label: "接口类型", value: "P · 基板型" }] : []),
      { label: "通道数", value: page.key === "three" ? "3" : "2" },
      { label: "阀形式", value: valveForm },
      { label: "通径", value: "1.4 mm" },
      { label: "膜片材质", value: "EPDM" },
      { label: "使用电压", value: "DC 24 V" },
      { label: "底板材质", value: "PEEK" },
      ...(threaded ? [
        { label: "阀座材质", value: "POM" },
        { label: "节能回路", value: "无" },
      ] : []),
    ],
    ...listNotice,
    uiText: {
      selectionHint: "仅显示本款配置，可将不同型号分别加入清单",
      noMatchedModel: "请选择配置",
    },
  };
}

export function getSolenoidConfigurator(slug: string, locale: string = "zh"): ProductConfiguratorConfig | undefined {
  if (!isSolenoidLocale(locale)) return undefined;
  const config = buildSolenoidConfigurator(slug);
  return config ? localizeSolenoidConfigurator(config, locale) : undefined;
}
