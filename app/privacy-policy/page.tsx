import type { Metadata } from "next";

import PrivacyPolicyPage from "@/components/privacy/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "隐私政策｜FOREACH 恒永达",
  description:
    "了解 FOREACH 恒永达官网如何处理询盘信息、Cookie、Google Analytics 和网站使用数据。",
};

export default function ChinesePrivacyPolicyPage() {
  return <PrivacyPolicyPage locale="zh-CN" />;
}