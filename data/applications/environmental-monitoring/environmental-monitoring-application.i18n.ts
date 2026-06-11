/* =========================================================
   environmental-monitoring-application.i18n.ts
   恒永达官网｜环保监测应用领域外语数据占位
========================================================= */

import type { EnvironmentalMonitoringApplicationPageData } from "./environmental-monitoring-application.types";
import { environmentalMonitoringApplicationZhData } from "./environmental-monitoring-application.zh";

export function getEnvironmentalMonitoringApplicationIntlData(
  _locale: string,
): EnvironmentalMonitoringApplicationPageData {
  return environmentalMonitoringApplicationZhData;
}