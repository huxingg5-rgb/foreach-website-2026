/* =========================================================
   analytical-instruments-application.i18n.ts
   恒永达官网｜分析仪器应用领域外语数据占位
========================================================= */

import type { AnalyticalInstrumentsApplicationPageData } from "./analytical-instruments-application.types";
import { analyticalInstrumentsApplicationZhData } from "./analytical-instruments-application.zh";

export function getAnalyticalInstrumentsApplicationIntlData(
  _locale: string,
): AnalyticalInstrumentsApplicationPageData {
  return analyticalInstrumentsApplicationZhData;
}