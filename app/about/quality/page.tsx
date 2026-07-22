import type { Metadata } from "next";
import QualityPageContent from "@/components/about/QualityPageContent";
import {
  aboutQualityContent,
  aboutQualityLinks,
} from "@/data/about-quality";

/* ================================
   中文质量体系与合规认证页面
   路由：
   /about/quality

   说明：
   1. 这个文件现在只作为中文页面入口
   2. 页面结构统一放在 components/about/QualityPageContent.tsx
   3. 页面文案统一放在 data/about-quality.ts
   4. 后期改结构，不需要再分别改中英文两个页面
================================ */

const pageData = aboutQualityContent["zh-CN"];

/* ================================
   页面 SEO 信息
   说明：
   1. 中文页面 canonical 指向 /about/quality
   2. alternates.languages 用于告诉搜索引擎多语言版本对应关系
================================ */
export const metadata: Metadata = {
  title: pageData.metadataTitle,
  description: pageData.metadataDescription,
  alternates: {
    canonical: aboutQualityLinks["zh-CN"],
    languages: aboutQualityLinks,
  },
};

/* ================================
   中文质量页面
   说明：
   1. 这里只传入当前语言 zh-CN
   2. 具体页面内容由 QualityPageContent 统一渲染
================================ */
export default function QualityPage() {
  return <QualityPageContent locale="zh-CN" />;
} 