/* =========================================================
   synthetic-biology-application.i18n.ts
   恒永达官网｜合成生物应用领域外语数据占位
========================================================= */

import type { SyntheticBiologyApplicationPageData } from "./synthetic-biology-application.types";
import { syntheticBiologyApplicationZhData } from "./synthetic-biology-application.zh";

export function getSyntheticBiologyApplicationIntlData(
  _locale: string,
): SyntheticBiologyApplicationPageData {
  return syntheticBiologyApplicationZhData;
}