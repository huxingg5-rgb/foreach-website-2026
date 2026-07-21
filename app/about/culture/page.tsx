/* =========================================================
   page.tsx
   恒永达官网｜关于我们 / 恒永达文化中文页面入口

   路径：
   /about/culture

   说明：
   1. 这个文件现在只负责中文页面入口
   2. 页面结构统一放在 components/about/CulturePageContent.tsx
   3. 页面文案和图片路径统一放在 data/about-culture.ts
   4. 后期修改企业文化页面结构，只改 CulturePageContent.tsx
========================================================= */

import type { Metadata } from "next";
import CulturePageContent from "@/components/about/CulturePageContent";
import {
  aboutCultureLinks,
  aboutCulturePageText,
} from "@/data/about-culture";

/* ================================
   中文企业文化页面 SEO
================================ */
export const metadata: Metadata = {
  title: aboutCulturePageText.metadataTitle,
  description: aboutCulturePageText.metadataDescription,
  alternates: {
    canonical: aboutCultureLinks["zh-CN"],
    languages: aboutCultureLinks,
  },
};

/* ================================
   中文企业文化页面
   说明：
   1. 这里只有页面入口
   2. 具体页面内容由 CulturePageContent 统一渲染
================================ */
export default function AboutCulturePage() {
  return <CulturePageContent locale="zh-CN" />;
}  