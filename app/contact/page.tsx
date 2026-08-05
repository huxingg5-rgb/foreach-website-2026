/* =========================================================
   page.tsx
   恒永达官网｜中文联系我们页面入口

   文件路径：
   app/contact/page.tsx

   页面访问地址：
   /contact

   作用：
   1. 定义中文联系我们页面 SEO
   2. 引入当前页面专属样式 contact.css
   3. 读取 data/contact-cooperation/contact.zh.ts 中的数据
   4. 渲染 components/contact/ContactPageContent.tsx 页面主体组件

   规范说明：
   1. app/contact/page.tsx 只做页面入口
   2. 页面结构与交互放在 components/contact/ContactPageContent.tsx
   3. 页面文案与图片路径放在 data/contact-cooperation/contact.zh.ts
   4. 页面样式放在 app/contact/contact.css
========================================================= */

import type { Metadata } from "next";

import ContactPageContent from "@/components/contact/ContactPageContent";
import { contactZhData } from "@/data/contact-cooperation";

import "./contact.css";

/* =========================================================
   页面 SEO 信息
   说明：
   1. title 会显示在浏览器标签页和搜索结果标题中
   2. description 用于搜索引擎理解页面内容
   3. 当前 SEO 数据来自 contact.zh.ts
========================================================= */

export const metadata: Metadata = {
  title: contactZhData.seo.title,
  description: contactZhData.seo.description,
};

/* =========================================================
   ContactPage
   中文联系我们页面

   说明：
   1. 中文页面访问路径为 /contact
   2. 中文不需要 /zh/contact
   3. 后续英文页面会单独建立 app/[locale]/contact/page.tsx
========================================================= */

export default function ContactPage() {
  return <ContactPageContent data={contactZhData} locale="zh-CN" />;
}
