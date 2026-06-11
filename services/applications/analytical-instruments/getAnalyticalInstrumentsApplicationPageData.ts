/* =========================================================
   getAnalyticalInstrumentsApplicationPageData.ts
   恒永达官网｜分析仪器应用领域数据服务层
========================================================= */

import { getAnalyticalInstrumentsApplicationIntlData } from "@/data/applications/analytical-instruments/analytical-instruments-application.i18n";
import { analyticalInstrumentsApplicationZhData } from "@/data/applications/analytical-instruments/analytical-instruments-application.zh";

import type { AnalyticalInstrumentsApplicationPageData } from "@/data/applications/analytical-instruments/analytical-instruments-application.types";

export function getAnalyticalInstrumentsApplicationPageData(
  locale = "zh-CN",
): AnalyticalInstrumentsApplicationPageData {
  if (locale === "zh-CN" || locale === "zh") {
    return analyticalInstrumentsApplicationZhData;
  }

  return getAnalyticalInstrumentsApplicationIntlData(locale);
}