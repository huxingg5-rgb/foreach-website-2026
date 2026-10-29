import BottomCtaButton from "@/components/common/BottomCtaButton";
import type { ReactNode } from "react";
import Link from "next/link";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import contentStyles from "../ApplicationContentPage.module.css";
import type { EnglishApplicationPageData } from "@/data/applications/application-english";
import { getEnglishAnalyticalInstrumentLinks } from "@/data/applications/analytical-instruments/navigation";
import AnalyticalMobileInstrumentNavigation from "./AnalyticalMobileInstrumentNavigation";

type AnalyticalInstrumentsLandingShellProps = {
  data: EnglishApplicationPageData;
  children: ReactNode;
  showInstrumentNavigation?: boolean;
};

/**
 * Keeps the established analytical-instruments landing-page chrome while
 * allowing the central content to be replaced by the reusable document system.
 * This is intentionally English-only; the existing Chinese and other locale
 * application pages continue to use their original clients.
 */
export default function AnalyticalInstrumentsLandingShell({
  data,
  children,
  showInstrumentNavigation = true,
}: AnalyticalInstrumentsLandingShellProps) {
  const analyticalInstrumentLinks = getEnglishAnalyticalInstrumentLinks();

  return (
    <div className={`ivd-page analytical-instruments-page ${contentStyles.page}`} data-application-content-page>
      <SiteBreadcrumb
        ariaLabel="Breadcrumb navigation"
        items={data.breadcrumb}
        variant="bar"
      />

      {showInstrumentNavigation && analyticalInstrumentLinks.length > 0 ? (
        <AnalyticalMobileInstrumentNavigation items={analyticalInstrumentLinks} />
      ) : null}

      {children}

      <section className="ivd-cta" id="contact">
        <div className="ivd-cta-inner">
          <div>
            <h2>{data.cta.title}</h2>
            <p>{data.cta.description}</p>
            {data.cta.resourceHref && data.cta.resourceLabel ? (
              <p className="ivd-cta-resource">
                <Link href={data.cta.resourceHref}>{data.cta.resourceLabel}</Link>
              </p>
            ) : null}
          </div>

          <BottomCtaButton className="ivd-btn" href={data.cta.href}>
            {data.cta.buttonLabel}
          </BottomCtaButton>
        </div>
      </section>
    </div>
  );
}
