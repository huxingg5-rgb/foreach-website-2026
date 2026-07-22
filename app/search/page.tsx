import type { Metadata } from "next";
import { Suspense } from "react";

import SiteSearchClient from "@/components/search/SiteSearchClient";

export const metadata: Metadata = {
  title: "全站搜索｜FOREACH 恒永达",
  description:
    "搜索 FOREACH 恒永达产品、型号、兼容型号和产品规格书。",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <SiteSearchClient locale="zh-CN" />
    </Suspense>
  );
}
