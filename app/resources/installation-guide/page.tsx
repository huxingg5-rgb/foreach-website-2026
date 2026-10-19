import InstallationGuideListingPage from "@/components/resources/installation-guide/InstallationGuideListingPage";
import { getInstallationGuideMetadata } from "@/lib/seo/installation-guide-metadata";

export const metadata = getInstallationGuideMetadata("zh-CN");

export default function InstallationGuidePage() {
  return <InstallationGuideListingPage locale="zh-CN" />;
}
