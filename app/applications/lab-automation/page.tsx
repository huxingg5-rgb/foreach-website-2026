/* =========================================================
   page.tsx
   恒永达官网｜实验室自动化应用领域中文页面入口

   文件路径：
   app/applications/lab-automation/page.tsx

   说明：
   1. 中文默认路径：/applications/lab-automation
   2. 页面样式复用 IVD 应用页 CSS
   3. page.tsx 只负责入口，不直接堆业务数据
========================================================= */

import type { Metadata } from "next";

import LabAutomationApplicationClient from "@/components/applications/lab-automation/LabAutomationApplicationClient";
import { getLabAutomationApplicationPageData } from "@/services/applications/lab-automation/getLabAutomationApplicationPageData";

import "./lab-automation-application.css";

export const metadata: Metadata = {
  title: "实验室自动化应用领域｜FOREACH 恒永达",
  description:
    "恒永达面向实验室自动化设备提供泵、阀、接头、管材、传感器及液路系统集成支持。",
};

export default function LabAutomationApplicationPage() {
  const data = getLabAutomationApplicationPageData("zh-CN");

  return <LabAutomationApplicationClient data={data} />;
}