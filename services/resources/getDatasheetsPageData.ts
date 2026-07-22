/* =========================================================
   getDatasheetsPageData.ts
   恒永达官网｜规格书下载页面数据服务层

   文件路径：
   services/resources/getDatasheetsPageData.ts

   说明：
   1. 这个文件是“数据服务层”
   2. page.tsx 不直接读取 data 文件
   3. page.tsx 统一通过这个 service 获取页面数据
   4. 当前阶段这里读取本地静态数据
   5. 后期接后端、CMS、数据库时，只需要主要改这个文件
========================================================= */

import { getDatasheetsStaticPageData } from "@/data/resources/datasheets.i18n";

import type {
  DatasheetLocale,
  DatasheetsPageData,
} from "@/data/resources/datasheets.types";

/* =========================================================
   isDatasheetLocale
   判断当前语言是否是规格书页面支持的语言

   说明：
   1. 中文页面路径是 /resources/datasheets
   2. 外语页面路径是 /en/resources/datasheets 等
   3. 这里统一判断语言，避免每个 page.tsx 重复写
========================================================= */

export function isDatasheetLocale(locale: string): locale is DatasheetLocale {
  return ["zh-CN", "en", "es", "fr", "ko", "ru"].includes(locale);
}

/* =========================================================
   getDatasheetsPageData
   获取规格书页面数据

   当前阶段：
   - 从 data/resources/datasheets.i18n.ts 读取静态多语言数据

   后期接后端：
   - 可以在这里改成 fetch 后端 API
   - app/resources/datasheets/page.tsx 不用改
   - app/[locale]/resources/datasheets/page.tsx 不用改
   - components/resources/DatasheetsClient.tsx 也不用改
========================================================= */

export async function getDatasheetsPageData(
  locale: DatasheetLocale,
): Promise<DatasheetsPageData> {
  /*
     后期接后端时，可以把下面这一行：

     return getDatasheetsStaticPageData(locale);

     替换成类似下面这种接口请求：

     const response = await fetch(
       `${process.env.API_BASE_URL}/resources/datasheets?locale=${locale}`,
       {
         cache: "no-store",
       }
     );

     if (!response.ok) {
       throw new Error("Failed to fetch datasheets page data");
     }

     return response.json();
  */

  return getDatasheetsStaticPageData(locale);
} 