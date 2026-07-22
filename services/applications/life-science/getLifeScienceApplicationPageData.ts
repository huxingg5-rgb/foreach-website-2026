/* =========================================================
   getLifeScienceApplicationPageData.ts
   恒永达官网｜生命科学应用领域数据服务层

   文件路径：
   services/applications/life-science/getLifeScienceApplicationPageData.ts

   说明：
   1. 中文页面返回中文数据
   2. 外语页面暂时返回外语占位数据
   3. 后续如果接 CMS / 数据库 / 后端接口，优先改这个文件
========================================================= */

import { getLifeScienceApplicationIntlData } from "@/data/applications/life-science/life-science-application.i18n";
import { lifeScienceApplicationZhData } from "@/data/applications/life-science/life-science-application.zh";

import type { LifeScienceApplicationPageData } from "@/data/applications/life-science/life-science-application.types";

export function getLifeScienceApplicationPageData(locale = "zh-CN"): LifeScienceApplicationPageData {
  if (locale === "zh-CN" || locale === "zh") {
    return lifeScienceApplicationZhData;
  }

  return getLifeScienceApplicationIntlData(locale);
}