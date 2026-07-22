/* =========================================================
   page.tsx
   恒永达官网｜合成生物应用领域中文页面入口
========================================================= */

import type { Metadata } from "next";

import SyntheticBiologyApplicationClient from "@/components/applications/synthetic-biology/SyntheticBiologyApplicationClient";
import { getSyntheticBiologyApplicationPageData } from "@/services/applications/synthetic-biology/getSyntheticBiologyApplicationPageData";

import "./synthetic-biology-application.css";

export const metadata: Metadata = {
  title: "合成生物应用领域｜FOREACH 恒永达",
  description:
    "恒永达面向合成生物系统提供泵、阀、接头、管材、传感器及液路系统集成支持。",
};

export default function SyntheticBiologyApplicationPage() {
  const data = getSyntheticBiologyApplicationPageData("zh-CN");

  return <SyntheticBiologyApplicationClient data={data} />;
}