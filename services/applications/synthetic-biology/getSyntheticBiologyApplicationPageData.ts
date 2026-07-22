/* =========================================================
   getSyntheticBiologyApplicationPageData.ts
   恒永达官网｜合成生物应用领域数据服务层
========================================================= */

import { getSyntheticBiologyApplicationIntlData } from "@/data/applications/synthetic-biology/synthetic-biology-application.i18n";
import { syntheticBiologyApplicationZhData } from "@/data/applications/synthetic-biology/synthetic-biology-application.zh";

import type { SyntheticBiologyApplicationPageData } from "@/data/applications/synthetic-biology/synthetic-biology-application.types";

export function getSyntheticBiologyApplicationPageData(
  locale = "zh-CN",
): SyntheticBiologyApplicationPageData {
  if (locale === "zh-CN" || locale === "zh") {
    return syntheticBiologyApplicationZhData;
  }

  return getSyntheticBiologyApplicationIntlData(locale);
}