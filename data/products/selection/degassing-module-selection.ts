import { degassingModuleZh } from "../detail/degassing-module.zh";
import { getDegassingModuleCopy } from "../detail/degassing-module-locales";
import type { ProductSelectionProduct, SelectionI18nText } from "./product-selection.types";

export const degassingModuleTypeLabels: SelectionI18nText = {
  zh: degassingModuleZh.name,
  en: getDegassingModuleCopy("en").navName,
  es: getDegassingModuleCopy("es").navName,
  fr: getDegassingModuleCopy("fr").navName,
  ko: getDegassingModuleCopy("ko").navName,
  ru: getDegassingModuleCopy("ru").navName,
};

const cardSubtitle: SelectionI18nText = {
  zh: "接口螺纹：NPT 1/8\n液体侧最高压力：200 kPa（表压）\n外形尺寸：159 mm × Ø42 mm",
  en: "Port thread: NPT 1/8\nMax. liquid pressure: 200 kPa (gauge)\nDimensions: 159 mm × Ø42 mm",
  es: "Rosca de conexión: NPT 1/8\nPresión máx. del líquido: 200 kPa (manométrica)\nDimensiones: 159 mm × Ø42 mm",
  fr: "Filetage des orifices : NPT 1/8\nPression max. côté liquide : 200 kPa (relative)\nDimensions : 159 mm × Ø42 mm",
  ko: "포트 나사: NPT 1/8\n액체 측 최대 압력: 200 kPa(게이지압)\n외형 치수: 159 mm × Ø42 mm",
  ru: "Резьба портов: NPT 1/8\nМакс. давление жидкости: 200 кПа (изб.)\nГабариты: 159 мм × Ø42 мм",
};

export const degassingModuleSelectionProduct = {
  productId: degassingModuleZh.slug,
  categoryId: "fittings",
  productTypeId: degassingModuleZh.typeId,
  productTypeLabel: degassingModuleZh.name,
  model: degassingModuleZh.model,
  detailSlug: degassingModuleZh.slug,
  detailHref: degassingModuleZh.href,
  openDetailInSameTab: true,
  status: "active",
  cardTitle: { zh: degassingModuleZh.model, en: degassingModuleZh.model },
  cardSubtitle,
  searchKeywords: {
    zh: "脱气膜组件 脱气膜 在线真空脱气 喷墨",
    en: getDegassingModuleCopy("en").searchKeywords,
    es: getDegassingModuleCopy("es").searchKeywords,
    fr: getDegassingModuleCopy("fr").searchKeywords,
    ko: getDegassingModuleCopy("ko").searchKeywords,
    ru: getDegassingModuleCopy("ru").searchKeywords,
  },
  imageCard: degassingModuleZh.cardImage.src,
  imageAlt: degassingModuleZh.cardImage.alt,
} satisfies ProductSelectionProduct;
