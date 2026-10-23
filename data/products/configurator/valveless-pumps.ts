import type { ProductConfiguratorConfig, ProductConfiguratorVariant } from "@/components/products/configurator/product-variant-configurator.types";
import { localizeValvelessPumpConfigurator } from "./valveless-pumps.i18n";

// PS-121B-2507-00001_001_en, p.13, Table 6: assigned ordering codes.
const singleHeadOptions = {
  "rpl-p635": {
    model: "RPL-P6.35", ceramic: "氧化锆（ZrO₂）", connection: "1/4-28 UNF-2B",
    options: [
      { displacement: 50, model: "RPL-P6.35-0050", productCode: "499002" },
      { displacement: 100, model: "RPL-P6.35-0100", productCode: "499003" },
      { displacement: 200, model: "RPL-P6.35-0200", productCode: "499004" },
      { displacement: 300, model: "RPL-P6.35-0300", productCode: "499005" },
    ],
  },
  "rpl-p15": {
    model: "RPL-P15", ceramic: "氧化铝（Al₂O₃）", connection: "G1/8",
    options: [
      { displacement: 400, model: "RPL-P15-0400", productCode: "499018" },
      { displacement: 800, model: "RPL-P15-0800", productCode: "499019" },
      { displacement: 1000, model: "RPL-P15-1000", productCode: "499017" },
      { displacement: 1200, model: "RPL-P15-1200", productCode: "499020" },
    ],
  },
};

const baseConfig = {
  localizedLocale: "zh" as const,
  showProductNameInSelection: false,
  emptyInitialSelection: true,
  autoSelectFollowingDimensions: false,
  emptySelectionText: "请选择配置",
  allowListRemoval: false,
  noticeTitle: "选型提示：",
  notice: "可将不同配置分别加入清单。其他排量、接口或安装需求请在询盘中说明，具体配置另行确认。",
  uiText: { selectionHint: "仅显示本款配置，可将不同型号分别加入清单", noMatchedModel: "请选择配置" },
};

export function getValvelessPumpConfigurator(slug: string, locale = "zh"): ProductConfiguratorConfig | undefined {
  const config = getChineseValvelessPumpConfigurator(slug);
  return config ? localizeValvelessPumpConfigurator(config, locale) : undefined;
}

function getChineseValvelessPumpConfigurator(slug: string): ProductConfiguratorConfig | undefined {
  const single = singleHeadOptions[slug as keyof typeof singleHeadOptions];
  if (single) {
    const variants: ProductConfiguratorVariant[] = single.options.map(option => ({
      id: option.productCode, model: option.model, productCode: option.productCode,
      attributes: { displacement: option.displacement },
    }));
    return {
      ...baseConfig,
      id: `valveless-${slug}`, title: `${single.model} 型号选型`, productName: single.model,
      description: "选择单圈排量，查看对应完整型号及商品编码。",
      dimensions: [{ key: "displacement", label: "单圈排量", unit: "μL/rev", columns: 1, order: single.options.map(option => option.displacement) }],
      variants,
      fixedSummaryRows: [
        { label: "泵头材料", value: "聚偏二氟乙烯（PVDF）" },
        { label: "陶瓷套件", value: single.ceramic },
        { label: "工作液路接口", value: single.connection },
        { label: "清洗液路接口", value: "1/4-28 UNF-2B" },
      ],
    };
  }

  // Existing catalog configurations; no numeric SKU or P4 displacement suffix is supplied.
  // Use the known model only as the cart identity, and hide the SKU row.
  if (slug === "rpl-p4") {
    return {
      ...baseConfig,
      id: `valveless-${slug}`, title: "RPL-P4 配置查看", productName: "RPL-P4",
      description: "查看当前系列配置，可加入清单并提交具体排量与驱动需求。",
      showProductCode: false,
      emptySelectionText: "当前配置",
      dimensions: [],
      variants: [{ id: "RPL-P4", model: "RPL-P4", productCode: "RPL-P4", attributes: {} }],
      fixedSummaryRows: [
        { label: "单圈排量范围", value: "12–80 μL/rev" },
        { label: "泵头材料", value: "聚偏二氟乙烯（PVDF）" },
        { label: "陶瓷套件", value: "氧化铝（Al₂O₃）" },
        { label: "工作液路接口", value: "1/4-28 UNF-2B" },
      ],
      uiText: { ...baseConfig.uiText, finalModel: "配置系列", selectionHint: "具体排量与完整订货型号按设备需求确认" },
    };
  }

  if (slug === "drpl-0109" || slug === "drpl-0119") {
    const isNine = slug === "drpl-0109";
    const model = isNine ? "DRPL-0109-0100" : "DRPL-0119-0060";
    return {
      ...baseConfig,
      id: `valveless-${slug}`, title: `${slug.toUpperCase()} 配置查看`, productName: slug.toUpperCase(),
      description: "查看本款双头泵的配比配置，确认后可加入选型清单。",
      showProductCode: false,
      emptySelectionText: "当前配置",
      dimensions: [],
      variants: [{ id: model, model, productCode: model, attributes: {} }],
      fixedSummaryRows: [
        { label: "浓缩液与稀释液体积比", value: isNine ? "1:9" : "1:19" },
        { label: "浓缩液名义量", value: isNine ? "100 μL" : "60 μL" },
        { label: "稀释液名义量", value: isNine ? "900 μL" : "1140 μL" },
        { label: "试剂 A 工作液路接口", value: "1/4-28 UNF-2B" },
        { label: "试剂 B 工作液路接口", value: "G1/8" },
        { label: "两路清洗液路接口", value: "1/4-28 UNF-2B" },
      ],
    };
  }
  return undefined;
}
