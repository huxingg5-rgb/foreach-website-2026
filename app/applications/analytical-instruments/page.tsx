/* =========================================================
   page.tsx
   恒永达官网｜分析仪器应用领域中文页面入口
========================================================= */

import type { Metadata } from "next";

import AnalyticalInstrumentsApplicationClient from "@/components/applications/analytical-instruments/AnalyticalInstrumentsApplicationClient";
import { getAnalyticalInstrumentsApplicationPageData } from "@/services/applications/analytical-instruments/getAnalyticalInstrumentsApplicationPageData";

import "./analytical-instruments-application.css";

export const metadata: Metadata = {
  title: "分析仪器应用领域｜FOREACH 恒永达",
  description:
    "恒永达面向分析检测设备提供泵、阀、接头、管材、传感器及液路系统集成支持。",
};

export default function AnalyticalInstrumentsApplicationPage() {
  const data = getAnalyticalInstrumentsApplicationPageData("zh-CN");

  return <AnalyticalInstrumentsApplicationClient data={data} />;
}