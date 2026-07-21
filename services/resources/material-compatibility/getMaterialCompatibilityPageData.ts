/* =========================================================
   getMaterialCompatibilityPageData.ts
   恒永达官网｜材料兼容页面数据服务层

   文件路径：
   services/resources/material-compatibility/getMaterialCompatibilityPageData.ts

   说明：
   1. 中文页面读取中文数据
   2. 外语页面当前统一读取英文技术数据
   3. 后期如果接后端 / CMS / 数据库，优先改这个文件
   4. page.tsx 和 Client 组件不需要大改
========================================================= */

import { materialCompatibilityZhData } from "@/data/resources/material-compatibility/material-compatibility.zh";
import { getMaterialCompatibilityIntlData } from "@/data/resources/material-compatibility/material-compatibility.intl";

import type { MaterialCompatibilityPageData } from "@/data/resources/material-compatibility/material-compatibility.types";

/* =========================================================
   判断是否为中文页面
========================================================= */
function isChineseLocale(locale?: string) {
  return !locale || locale === "zh-CN" || locale === "zh";
}

/* =========================================================
   获取材料兼容页面数据
========================================================= */
export async function getMaterialCompatibilityPageData(
  locale = "zh-CN",
): Promise<MaterialCompatibilityPageData> {
  /*
    后端接口预留位置：
    后期如果材料兼容数据进入 CMS / 数据库，只需要优先改这里。
  */

  if (isChineseLocale(locale)) {
    return materialCompatibilityZhData;
  }

  return getMaterialCompatibilityIntlData(locale);
} 