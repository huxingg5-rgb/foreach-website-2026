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
import { channelVideoCopy, getChannelVideoAdditions, getChineseChannelBackfill } from "@/data/resources/installation-guide/installation-guide.channel-additions";
import { sv10EnglishGuide } from "@/data/resources/installation-guide/installation-guide.sv10.en";

export function getInstallationGuidePageData(
  locale: InstallationGuideLocale = "zh-CN",
): InstallationGuidePageData {
  const base = locale === "zh-CN" ? installationGuideZhData : getInstallationGuideIntlData(locale);
  const additions = [
    ...(locale === "en" ? [sv10EnglishGuide] : []),
    ...getChannelVideoAdditions(locale),
    ...(locale === "zh-CN" ? getChineseChannelBackfill() : []),
  ];
  const ids = new Set(additions.map(guide => guide.id));
  return {
    ...base,
    sidebar: {
      ...base.sidebar,
      tree: [...base.sidebar.tree, {
        id: "company", type: "category", name: channelVideoCopy[locale].companyCategory, children: [],
      }],
    },
    guides: [...additions, ...base.guides.filter(guide => !ids.has(guide.id))],
  };
}
