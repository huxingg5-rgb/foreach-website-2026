import type { TechnicalArticleLocale } from "../technical-articles.types";

export const representativeModelsTitle: Record<TechnicalArticleLocale, string> = {
  "zh-CN": "代表型号", en: "Representative models", es: "Modelos representativos",
  fr: "Modèles représentatifs", ko: "대표 모델", ru: "Примеры моделей",
};

export const panelFittingCards = {
  en: {
    female: ["US square union · 1.0 mm bore", "U standard union · 2.0 mm bore", "UT tee · 1.5 mm bore", "UY wye · 1.5 mm bore", "PMU bulkhead union · 2.0 mm bore"],
    femaleSidebar: ["UT-U28-15-PP-N · Female-thread tee", "PMU female-thread bulkhead union"],
    bulkhead: ["1.6 mm PP bulkhead barb", "2.4 mm PP bulkhead barb", "2.4 mm PA bulkhead barb", "3.2 mm PP bulkhead barb"],
    photo: "FOREACH product photograph",
    familyPhoto: "FOREACH series reference photograph",
  },
  es: {
    female: ["Unión cuadrada US · paso de 1,0 mm", "Unión estándar U · paso de 2,0 mm", "T UT · paso de 1,5 mm", "Y UY · paso de 1,5 mm", "Unión pasamuros PMU · paso de 2,0 mm"],
    femaleSidebar: ["UT-U28-15-PP-N · T de rosca hembra", "Unión pasamuros PMU de rosca hembra"],
    bulkhead: ["Espiga pasamuros PP de 1,6 mm", "Espiga pasamuros PP de 2,4 mm", "Espiga pasamuros PA de 2,4 mm", "Espiga pasamuros PP de 3,2 mm"],
    photo: "Fotografía del producto FOREACH",
    familyPhoto: "Fotografía de referencia de la serie FOREACH",
  },
  fr: {
    female: ["Union carrée US · passage de 1,0 mm", "Union standard U · passage de 2,0 mm", "Té UT · passage de 1,5 mm", "Y UY · passage de 1,5 mm", "Union traversante PMU · passage de 2,0 mm"],
    femaleSidebar: ["UT-U28-15-PP-N · Té à filetage femelle", "Union traversante PMU à filetage femelle"],
    bulkhead: ["Raccord cannelé traversant PP de 1,6 mm", "Raccord cannelé traversant PP de 2,4 mm", "Raccord cannelé traversant PA de 2,4 mm", "Raccord cannelé traversant PP de 3,2 mm"],
    photo: "Photographie du produit FOREACH",
    familyPhoto: "Photographie de référence de la série FOREACH",
  },
  ko: {
    female: ["US 사각 유니온 · 통경 1.0 mm", "U 표준 유니온 · 통경 2.0 mm", "UT T형 · 통경 1.5 mm", "UY Y형 · 통경 1.5 mm", "PMU 벌크헤드 유니온 · 통경 2.0 mm"],
    femaleSidebar: ["UT-U28-15-PP-N · 암나사 T형", "PMU 암나사 벌크헤드 유니온"],
    bulkhead: ["1.6 mm PP 벌크헤드 바브", "2.4 mm PP 벌크헤드 바브", "2.4 mm PA 벌크헤드 바브", "3.2 mm PP 벌크헤드 바브"],
    photo: "FOREACH 제품 사진",
    familyPhoto: "FOREACH 제품군 참고 사진",
  },
  ru: {
    female: ["Квадратная муфта US · проход 1,0 мм", "Стандартная муфта U · проход 2,0 мм", "Тройник UT · проход 1,5 мм", "Y-тройник UY · проход 1,5 мм", "Переборочная муфта PMU · проход 2,0 мм"],
    femaleSidebar: ["UT-U28-15-PP-N · Тройник с внутренней резьбой", "Переборочная муфта PMU с внутренней резьбой"],
    bulkhead: ["Переборочная ёлочка PP 1,6 мм", "Переборочная ёлочка PP 2,4 мм", "Переборочная ёлочка PA 2,4 мм", "Переборочная ёлочка PP 3,2 мм"],
    photo: "Фотография изделия FOREACH",
    familyPhoto: "Справочная фотография серии FOREACH",
  },
};
