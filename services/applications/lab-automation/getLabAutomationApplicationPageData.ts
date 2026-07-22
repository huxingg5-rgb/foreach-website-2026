/* =========================================================
   getLabAutomationApplicationPageData.ts
   恒永达官网｜实验室自动化应用领域数据服务层

   文件路径：
   services/applications/lab-automation/getLabAutomationApplicationPageData.ts

   说明：
   1. 中文页面返回中文数据
   2. 外语页面暂时返回外语占位数据
   3. 后续如果接 CMS / 数据库 / 后端接口，优先改这个文件
========================================================= */

import { getLabAutomationApplicationIntlData } from "@/data/applications/lab-automation/lab-automation-application.i18n";
import { labAutomationApplicationZhData } from "@/data/applications/lab-automation/lab-automation-application.zh";

import type { LabAutomationApplicationPageData } from "@/data/applications/lab-automation/lab-automation-application.types";

export function getLabAutomationApplicationPageData(locale = "zh-CN"): LabAutomationApplicationPageData {
  if (locale === "zh-CN" || locale === "zh") {
    return labAutomationApplicationZhData;
  }

  return getLabAutomationApplicationIntlData(locale);
}