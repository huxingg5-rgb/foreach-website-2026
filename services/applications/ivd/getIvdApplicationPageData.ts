/* =========================================================
   getIvdApplicationPageData.ts
   恒永达官网｜IVD 应用领域页数据服务层

   说明：
   1. page.tsx 不直接读取 data 文件
   2. 当前阶段读取本地静态数据
   3. 后期接后端 / CMS / 数据库时，优先改这个文件
   4. 页面组件和 page.tsx 不需要大改
========================================================= */

import type { IvdApplicationPageData, IvdLocale } from "@/data/applications/ivd/ivd-application.types";
import { ivdApplicationZhData } from "@/data/applications/ivd/ivd-application.zh";
import { ivdApplicationI18nData } from "@/data/applications/ivd/ivd-application.i18n";

const SUPPORTED_IVD_LOCALES: IvdLocale[] = ["zh-CN", "en", "es", "fr", "ko", "ru"];

export function normalizeIvdLocale(locale?: string): IvdLocale {
  if (SUPPORTED_IVD_LOCALES.includes(locale as IvdLocale)) {
    return locale as IvdLocale;
  }

  return "zh-CN";
}

export function getIvdApplicationPageData(locale?: string): IvdApplicationPageData {
  const normalizedLocale = normalizeIvdLocale(locale);

  if (normalizedLocale === "zh-CN") {
    return ivdApplicationZhData;
  }

  return ivdApplicationI18nData[normalizedLocale] ?? ivdApplicationZhData;
}