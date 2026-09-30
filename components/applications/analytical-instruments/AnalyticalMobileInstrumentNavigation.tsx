"use client";

import Link from "next/link";
import { useState } from "react";

type AnalyticalInstrumentLink = {
  key: string;
  label: string;
  href: string;
};

type AnalyticalMobileInstrumentNavigationProps = {
  items: readonly AnalyticalInstrumentLink[];
};

export default function AnalyticalMobileInstrumentNavigation({
  items,
}: AnalyticalMobileInstrumentNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="analytical-mobile-subnav site-footer__nav-wrap"
      aria-label="Analytical instrument types"
    >
      <div className={`site-footer__column ${isOpen ? "is-open" : ""}`}>
        <button
          className="site-footer__title"
          type="button"
          aria-expanded={isOpen}
          aria-controls="analytical-mobile-instrument-links"
          onClick={() => setIsOpen((current) => !current)}
        >
          Analytical Instruments
        </button>

        <ul className="site-footer__list" id="analytical-mobile-instrument-links">
          {items.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
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
