/* =========================================================
   page.tsx
   恒永达官网｜关于我们 / 发展历程中文页面入口

   路径：
   /about/history

   说明：
   1. 这个文件现在只负责中文页面入口
   2. 页面结构统一放在 components/about/HistoryPageContent.tsx
   3. 页面数据仍然来自 data/historyMilestones.ts
   4. 后期修改历史页面结构，只改 HistoryPageContent.tsx
========================================================= */

import type { Metadata } from "next";
import HistoryPageContent from "@/components/about/HistoryPageContent";
import {
  DEFAULT_HISTORY_LOCALE,
} from "@/data/historyMilestones";
import { getHistoryMetadata } from "@/lib/seo/history-metadata";

/* ================================
   页面 SEO 信息
================================ */
export const metadata: Metadata = getHistoryMetadata(DEFAULT_HISTORY_LOCALE);

/* ================================
   中文发展历程页面
   说明：
   页面内容由统一组件 HistoryPageContent 渲染
================================ */
export default function AboutHistoryPage() {
  return <HistoryPageContent locale={DEFAULT_HISTORY_LOCALE} />;
}
