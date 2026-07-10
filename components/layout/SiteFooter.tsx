"use client";

import Link from "next/link";
import { useState } from "react";

import type { LocaleCode } from "@/lib/i18n";

import {
  getSiteFooterHref,
  getSiteFooterText,
  siteFooterData,
} from "@/data/site-footer";

type SiteFooterProps = {
  locale: LocaleCode;
};

export default function SiteFooter({ locale }: SiteFooterProps) {
  const [openColumn, setOpenColumn] = useState("");

  const mapHref = getSiteFooterHref(siteFooterData.mapHref, locale);
  const emailHref = getSiteFooterHref(siteFooterData.emailHref, locale);
  const phoneHref = getSiteFooterHref(siteFooterData.phoneHref, locale);
  const icpText = getSiteFooterText(siteFooterData.icp, locale);
  const icpHref = getSiteFooterHref(siteFooterData.icpHref, locale);

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__inner">
          <div className="site-footer__nav-wrap">
            {siteFooterData.columns.map((column) => {
              const isOpen = openColumn === column.key;
              const columnTitle = getSiteFooterText(column.title, locale);

              return (
                <nav
                  key={column.key}
                  className={`site-footer__column ${isOpen ? "is-open" : ""}`}
                  aria-label={columnTitle}
                >
                  <button
                    className="site-footer__title"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenColumn(isOpen ? "" : column.key)}
                  >
                    {columnTitle}
                  </button>

                  <ul className="site-footer__list">
                    {column.links.map((link) => (
                      <li key={link.key}>
                        <Link href={getSiteFooterHref(link.href, locale)}>
                          {getSiteFooterText(link.label, locale)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              );
            })}
          </div>

          <div className="site-footer__right">
            <div className="site-footer__contact">
              <p className="site-footer__company">
                {getSiteFooterText(siteFooterData.companyName, locale)}
              </p>

              <p className="site-footer__contact-text">
                {getSiteFooterText(siteFooterData.addressLabel, locale)}：
                {getSiteFooterText(siteFooterData.address, locale)}
                <a
                  className="site-footer__map-link"
                  href={mapHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {getSiteFooterText(siteFooterData.mapLabel, locale)}
                </a>
              </p>

              <p className="site-footer__contact-text">
                {getSiteFooterText(siteFooterData.emailLabel, locale)}：
                <a className="site-footer__contact-link" href={emailHref}>
                  {getSiteFooterText(siteFooterData.email, locale)}
                </a>
              </p>

              <p className="site-footer__contact-text">
                {getSiteFooterText(siteFooterData.phoneLabel, locale)}：
                <a className="site-footer__contact-link" href={phoneHref}>
                  {getSiteFooterText(siteFooterData.phone, locale)}
                </a>
              </p>
            </div>

            <div className="site-footer__qrcode-area">
              <div className="site-footer__qr-row">
                {siteFooterData.qrCodes.map((item) => {
                  const label = getSiteFooterText(item.label, locale);
                  const imageSrc = item.image ? getSiteFooterHref(item.image, locale) : "";

                  return (
                    <div className="site-footer__qrcode-item" key={item.key}>
                      <div className="site-footer__qrcode-box">
                        {imageSrc ? (
                          <img src={imageSrc} alt={`${label}二维码`} loading="lazy" />
                        ) : (
                          <>
                            {label}
                            <br />
                            {getSiteFooterText(siteFooterData.qrCodePlaceholder, locale)}
                          </>
                        )}
                      </div>

                      <span className="site-footer__qrcode-label">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <div className="site-footer__bottom-left">
            {icpText ? (
              <p>
                <a
                  className="site-footer__icp-link"
                  href={icpHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {icpText}
                </a>
              </p>
            ) : null}

            <p>{getSiteFooterText(siteFooterData.copyright, locale)}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
