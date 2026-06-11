/* =========================================================
   lab-automation-application.i18n.ts
   恒永达官网｜实验室自动化应用领域外语数据占位

   文件路径：
   data/applications/lab-automation/lab-automation-application.i18n.ts

   说明：
   1. 第一阶段为了先跑通页面结构，外语页面暂时复用中文数据
   2. 后续需要严谨翻译时，再替换为英文 / 西语 / 法语 / 韩语 / 俄语数据
========================================================= */

import type { LabAutomationApplicationPageData } from "./lab-automation-application.types";
import { labAutomationApplicationZhData } from "./lab-automation-application.zh";

export function getLabAutomationApplicationIntlData(_locale: string): LabAutomationApplicationPageData {
  return labAutomationApplicationZhData;
}