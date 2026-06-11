/* =========================================================
   life-science-application.i18n.ts
   恒永达官网｜生命科学应用领域外语数据占位

   文件路径：
   data/applications/life-science/life-science-application.i18n.ts

   说明：
   1. 第一阶段为了先跑通页面结构，外语页面暂时复用中文数据
   2. 后续需要严谨翻译时，再替换为英文 / 西语 / 法语 / 韩语 / 俄语数据
========================================================= */

import type { LifeScienceApplicationPageData } from "./life-science-application.types";
import { lifeScienceApplicationZhData } from "./life-science-application.zh";

export function getLifeScienceApplicationIntlData(_locale: string): LifeScienceApplicationPageData {
  return lifeScienceApplicationZhData;
}