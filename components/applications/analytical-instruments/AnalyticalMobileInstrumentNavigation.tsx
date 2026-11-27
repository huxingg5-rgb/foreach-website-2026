"use client";

import Link from "next/link";
import { useState } from "react";

type AnalyticalInstrumentLink = {
  key: string;
  label: string;
  href: string;
  hrefLang?: "de" | "en" | "hi";
};

type AnalyticalMobileInstrumentNavigationProps = {
  items: readonly AnalyticalInstrumentLink[];
  heading?: string;
  ariaLabel?: string;
};

export default function AnalyticalMobileInstrumentNavigation({
  items,
  heading = "Analytical Instruments",
  ariaLabel = "Analytical instrument types",
}: AnalyticalMobileInstrumentNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="analytical-mobile-subnav site-footer__nav-wrap"
      aria-label={ariaLabel}
    >
      <div className={`site-footer__column ${isOpen ? "is-open" : ""}`}>
        <button
          className="site-footer__title"
          type="button"
          aria-expanded={isOpen}
          aria-controls="analytical-mobile-instrument-links"
          onClick={() => setIsOpen((current) => !current)}
        >
          {heading}
        </button>

        <ul className="site-footer__list" id="analytical-mobile-instrument-links">
          {items.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                hrefLang={item.hrefLang}
                prefetch={false}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
