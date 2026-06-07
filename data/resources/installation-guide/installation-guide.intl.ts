/* =========================================================
   installation-guide.intl.ts
   恒永达官网｜外语安装教程页面临时数据

   文件路径：
   data/resources/installation-guide/installation-guide.intl.ts

   说明：
   1. 当前阶段外语页面先复用中文结构
   2. 后期英文、法语、西语、韩语、俄语逐步翻译
   3. 视频平台后期可根据 locale 切换：
      - 中文：Bilibili
      - 外语：YouTube
========================================================= */

import type {
  InstallationGuideLocale,
  InstallationGuidePageData,
} from "./installation-guide.types";
import { installationGuideZhData } from "./installation-guide.zh";

export function getInstallationGuideIntlData(
  locale: InstallationGuideLocale,
): InstallationGuidePageData {
  return {
    ...installationGuideZhData,
    locale,
  };
} 