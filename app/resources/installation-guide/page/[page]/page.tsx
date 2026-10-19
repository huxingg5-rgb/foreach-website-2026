import { notFound } from "next/navigation";
import InstallationGuideListingPage from "@/components/resources/installation-guide/InstallationGuideListingPage";
import { INSTALLATION_GUIDE_PAGE_SIZE } from "@/data/resources/installation-guide/installation-guide-pagination";
import { getInstallationGuidePageData } from "@/services/resources/installation-guide/getInstallationGuidePageData";
import { getInstallationGuideMetadata } from "@/lib/seo/installation-guide-metadata";

export const dynamicParams = false;
type Props = { params: Promise<{ page: string }> };

export function generateStaticParams() {
  const count = Math.ceil(getInstallationGuidePageData("zh-CN").guides.length / INSTALLATION_GUIDE_PAGE_SIZE);
  return Array.from({ length: Math.max(0, count - 1) }, (_, i) => ({ page: String(i + 2) }));
}

function resolvePage(page: string) {
  if (!generateStaticParams().some((item) => item.page === page)) notFound();
  return Number(page);
}

export async function generateMetadata({ params }: Props) {
  return getInstallationGuideMetadata("zh-CN", resolvePage((await params).page));
}

export default async function Page({ params }: Props) {
  return <InstallationGuideListingPage locale="zh-CN" page={resolvePage((await params).page)} />;
}
