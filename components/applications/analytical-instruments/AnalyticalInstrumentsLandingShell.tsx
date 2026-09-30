import type { ReactNode } from "react";
import Link from "next/link";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
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
    <div className="ivd-page analytical-instruments-page">
      <section
        className="ivd-hero"
        style={
          data.hero.backgroundImage
            ? { backgroundImage: `url(${data.hero.backgroundImage})` }
            : undefined
        }
      >
        <div className="ivd-hero-inner">
          <div>
            <div className="ivd-hero-title">
              {data.hero.title}
              <br />
              <span>{data.hero.highlight}</span>
            </div>
            <p>{data.hero.description}</p>
          </div>

          <aside className="ivd-hero-panel" aria-hidden="true">
            <h2>{data.hero.panelTitle}</h2>
            <ul>
              {data.hero.panelItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

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

          <Link className="ivd-btn" href={data.cta.href}>
            {data.cta.buttonLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
