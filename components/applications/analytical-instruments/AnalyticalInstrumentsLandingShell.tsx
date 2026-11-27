import BottomCtaButton from "@/components/common/BottomCtaButton";
import type { ReactNode } from "react";
import Link from "next/link";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import contentStyles from "../ApplicationContentPage.module.css";
import type { EnglishApplicationPageData } from "@/data/applications/application-english";
import { getEnglishAnalyticalInstrumentLinks } from "@/data/applications/analytical-instruments/navigation";
import { translateGermanApplication, type GermanApplicationCopy } from "@/services/applications/german-review";
import { translateItalianApplication, type ItalianApplicationCopy } from "@/services/applications/italian-review";
import { getHindiApplicationTranslation, translateHindiApplication, type HindiApplicationCopy } from "@/services/applications/hindi-application";
import AnalyticalMobileInstrumentNavigation from "./AnalyticalMobileInstrumentNavigation";

type AnalyticalInstrumentsLandingShellProps = {
  data: EnglishApplicationPageData;
  children: ReactNode;
  lang?: string;
  showInstrumentNavigation?: boolean;
  breadcrumbAriaLabel?: string;
  germanCopy?: GermanApplicationCopy;
  italianCopy?: ItalianApplicationCopy;
  hindiCopy?: HindiApplicationCopy;
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
  lang,
  showInstrumentNavigation = true,
  breadcrumbAriaLabel = "Breadcrumb navigation",
  germanCopy,
  italianCopy,
  hindiCopy,
}: AnalyticalInstrumentsLandingShellProps) {
  const englishInstrumentLinks = getEnglishAnalyticalInstrumentLinks();
  const analyticalInstrumentLinks = germanCopy ? translateGermanApplication(englishInstrumentLinks, germanCopy)
    : italianCopy ? translateItalianApplication(englishInstrumentLinks, italianCopy)
      : hindiCopy ? translateHindiApplication(englishInstrumentLinks, text => getHindiApplicationTranslation(hindiCopy, text, "analytical-instrument links"))
        : englishInstrumentLinks;

  return (
    <div className={`ivd-page analytical-instruments-page ${contentStyles.page}`} data-application-content-page lang={lang}>
      <SiteBreadcrumb
        ariaLabel={breadcrumbAriaLabel}
        items={data.breadcrumb}
        variant="bar"
      />

      {showInstrumentNavigation && analyticalInstrumentLinks.length > 0 ? (
        <AnalyticalMobileInstrumentNavigation items={analyticalInstrumentLinks}
          heading={germanCopy ? "Analysengeräte" : italianCopy ? "Strumenti analitici" : hindiCopy ? "विश्लेषणात्मक उपकरण" : undefined}
          ariaLabel={germanCopy ? "Kategorien von Analysengeräten" : italianCopy ? "Categorie degli strumenti analitici" : hindiCopy ? "विश्लेषणात्मक उपकरणों की श्रेणियाँ" : undefined} />
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
