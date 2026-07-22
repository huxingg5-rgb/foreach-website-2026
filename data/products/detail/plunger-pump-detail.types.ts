/* =========================================================
   plunger-pump-detail.types.ts
   柱塞泵详情页数据类型

   本文件由 scripts/products/build-plunger-pump-detail-data.js 生成。
   如需修改字段结构，请先修改生成脚本。
========================================================= */

export type PlungerPumpSeriesCode = "EA" | "SM" | "TM";

export type PlungerPumpSpecification = {
  label: string;
  value: string;
};

export type PlungerPumpFaq = {
  question: string;
  answer: string;
};

export type PlungerPumpResourceButtons = {
  drawing2d: {
    zh: string;
    en: string;
  };
  model3d: {
    zh: string;
    en: string;
  };
};

export type PlungerPumpResources = {
  drawing2dRequestOnly: boolean;
  model3dRequestOnly: boolean;
  buttons: PlungerPumpResourceButtons;
};

export type PlungerPumpDetail = {
  model: string;
  slug: string;
  title: string;
  categoryCode: string;
  categoryName: string;
  productTypeCode: string;
  productTypeName: string;
  seriesCode: PlungerPumpSeriesCode;
  seriesName: string;
  capacity: string;
  pumpHeadMaterialCode: string;
  pumpHeadMaterial: string;
  description: string;
  specifications: PlungerPumpSpecification[];
  faqs: PlungerPumpFaq[];
  resources: PlungerPumpResources;
};
