/* =========================================================
   getInstallationGuidePageData.ts
   恒永达官网｜安装教程页面数据服务层

   文件路径：
   services/resources/installation-guide/getInstallationGuidePageData.ts

   作用：
   1. 当前阶段读取本地静态数据
   2. 后期接后端 / CMS / 数据库时，优先改这个文件
   3. page.tsx 和 Client 组件不需要大改
========================================================= */

import type {
  InstallationGuideLocale,
  InstallationGuidePageData,
} from "@/data/resources/installation-guide/installation-guide.types";
import { installationGuideZhData } from "@/data/resources/installation-guide/installation-guide.zh";
import { getInstallationGuideIntlData } from "@/data/resources/installation-guide/installation-guide.intl";

export function getInstallationGuidePageData(
  locale: InstallationGuideLocale = "zh-CN",
): InstallationGuidePageData {
  if (locale === "zh-CN") {
    return installationGuideZhData;
  }

  return getInstallationGuideIntlData(locale);
} 