"use client";

import { usePathname } from "next/navigation";
import ApplicationPageSkeleton from "@/components/common/ApplicationPageSkeleton";

export default function LocalizedApplicationsLoading() {
  const pathname = usePathname();
  const isDomainPage = /^\/(?:en|es|fr|ko|ru)\/applications\/(?:ivd|life-science|lab-automation|analytical-instruments|environmental-monitoring|synthetic-biology)(?:\/|$)/.test(pathname);
  return <ApplicationPageSkeleton showBanner={!isDomainPage} />;
}
