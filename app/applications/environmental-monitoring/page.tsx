/* =========================================================
   page.tsx
   恒永达官网｜环保监测应用领域中文页面入口
========================================================= */

import type { Metadata } from "next";

import EnvironmentalMonitoringApplicationClient from "@/components/applications/environmental-monitoring/EnvironmentalMonitoringApplicationClient";
import { getEnvironmentalMonitoringApplicationPageData } from "@/services/applications/environmental-monitoring/getEnvironmentalMonitoringApplicationPageData";

import "./environmental-monitoring-application.css";

export const metadata: Metadata = {
  title: "环保监测应用领域｜FOREACH 恒永达",
  description:
    "恒永达面向环保监测设备提供泵、阀、接头、管材、传感器及液路系统集成支持。",
};

export default function EnvironmentalMonitoringApplicationPage() {
  const data = getEnvironmentalMonitoringApplicationPageData("zh-CN");

  return <EnvironmentalMonitoringApplicationClient data={data} />;
}