import InstallationGuideClient from "./InstallationGuideClient";
import type { InstallationGuideLocale } from "@/data/resources/installation-guide/installation-guide.types";
import { getInstallationGuidePageData } from "@/services/resources/installation-guide/getInstallationGuidePageData";
import "@/app/resources/selection-support/fitting-replacement/fitting-replacement.css";
import "@/app/resources/installation-guide/installation-guide.css";

export default function InstallationGuideListingPage({ locale, page = 1 }: {
  locale: InstallationGuideLocale; page?: number;
}) {
  const pageData = getInstallationGuidePageData(locale);
  return <>
    <section className="installation-guide-hero resource-center-banner">
      <div className="installation-guide-hero-inner resource-center-banner__inner">
        <div className="installation-guide-hero-content resource-center-banner__content">
          <h1 className="resource-center-banner__title">{pageData.hero.title}</h1>
          <p className="resource-center-banner__description">{pageData.hero.description}</p>
        </div>
      </div>
    </section>
    <InstallationGuideClient key={`${locale}-${page}`} pageData={pageData} initialPage={page} />
  </>;
}
