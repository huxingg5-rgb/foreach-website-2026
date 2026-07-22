/* =========================================================
   page.tsx
   恒永达官网｜生命科学应用领域中文页面入口

   文件路径：
   app/applications/life-science/page.tsx

   说明：
   1. 中文默认路径：/applications/life-science
   2. 页面样式复用 IVD 应用页 CSS
   3. page.tsx 只负责入口，不直接堆业务数据
========================================================= */

import type { Metadata } from "next";

import LifeScienceApplicationClient from "@/components/applications/life-science/LifeScienceApplicationClient";
import { getLifeScienceApplicationPageData } from "@/services/applications/life-science/getLifeScienceApplicationPageData";

import "./life-science-application.css";

export const metadata: Metadata = {
  title: "生命科学应用领域｜FOREACH 恒永达",
  description:
    "恒永达面向生命科学设备提供泵、阀、接头、管材、传感器及液路系统集成支持。",
};

export default function LifeScienceApplicationPage() {
  const data = getLifeScienceApplicationPageData("zh-CN");

  return <LifeScienceApplicationClient data={data} />;
}