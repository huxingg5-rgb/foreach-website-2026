/* =========================================================
   index.ts
   恒永达官网｜联系与合作模块统一导出文件

   文件路径：
   data/contact-cooperation/index.ts

   作用：
   1. 统一导出联系与合作模块的数据
   2. 统一导出联系与合作模块的数据类型
   3. 让其他页面引用时路径更干净

   使用示例：
   import { contactZhData } from "@/data/contact-cooperation";

   注意：
   1. 当前阶段先只导出中文联系我们数据
   2. contact.intl.ts 和 distributor.intl.ts 后续做多语言和经销商页面时再导出
========================================================= */

/* 导出类型定义 */
export type {
  ContactDefaultLocale,
  ContactIntlLocale,
  ContactLocale,
  ContactSeoData,
  ContactImageData,
  ContactButtonData,
  ContactHeroData,
  ContactSupportItem,
  ContactSupportData,
  ContactTextFieldData,
  ContactEmailVerificationData,
  ContactProductGroup,
  ContactFormData,
  ContactGuideItem,
  ContactGuideData,
  ContactInfoRow,
  ContactInfoData,
  ContactBottomCtaData,
  ContactPageData,
  ContactIntlPageDataMap,
  DistributorPageData,
  DistributorIntlPageDataMap,
} from "./types";

/* 导出中文联系我们页面数据 */
export { contactZhData } from "./contact.zh"; 