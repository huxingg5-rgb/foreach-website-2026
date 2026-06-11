/* =========================================================
   getEnvironmentalMonitoringApplicationPageData.ts
   恒永达官网｜环保监测应用领域数据服务层
========================================================= */

import { getEnvironmentalMonitoringApplicationIntlData } from "@/data/applications/environmental-monitoring/environmental-monitoring-application.i18n";
import { environmentalMonitoringApplicationZhData } from "@/data/applications/environmental-monitoring/environmental-monitoring-application.zh";

import type { EnvironmentalMonitoringApplicationPageData } from "@/data/applications/environmental-monitoring/environmental-monitoring-application.types";

export function getEnvironmentalMonitoringApplicationPageData(
  locale = "zh-CN",
): EnvironmentalMonitoringApplicationPageData {
  if (locale === "zh-CN" || locale === "zh") {
    return environmentalMonitoringApplicationZhData;
  }

  return getEnvironmentalMonitoringApplicationIntlData(locale);
}