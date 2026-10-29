import FaqClient from "@/components/resources/faq/FaqClient";
import { getFaqMetadata, getFaqPageData } from "@/data/resources/faq/faq-page";

export const metadata = getFaqMetadata("zh-CN");

export default function FaqPage() {
  return <FaqClient {...getFaqPageData("zh-CN")} />;
}
