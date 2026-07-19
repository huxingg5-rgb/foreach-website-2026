"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { getLocaleFromPathname, type LocaleCode } from "@/lib/i18n";

import {
  getSiteFooterHref,
  getSiteFooterText,
  siteFooterData,
} from "@/data/site-footer";

import styles from "./SiteFooterSocial.module.css";

type SiteFooterProps = {
  locale?: LocaleCode;
};

const englishSocialLinks = [
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/102748876/",
    icon: "/images/social-media/international/linkedin.svg",
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@ForeachFluid",
    icon: "/images/social-media/international/youtube.svg",
  },
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/people/Foreach-Technology/61586049132811/",
    icon: "/images/social-media/international/facebook.svg",
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/foreachtechnology/",
    icon: "/images/social-media/international/instagram.svg",
  },
  {
    key: "x",
    label: "X",
    href: "https://x.com/ForeachFluid",
    icon: "/images/social-media/international/x.svg",
  },
] as const;

export default function SiteFooter({ locale }: SiteFooterProps) {
  const pathname = usePathname();
  const activeLocale = locale ?? getLocaleFromPathname(pathname);
  const showEnglishSocialLinks = activeLocale === "en";
  const [openColumn, setOpenColumn] = useState("");

  const mapHref = getSiteFooterHref(siteFooterData.mapHref, activeLocale);
  const emailHref = getSiteFooterHref(siteFooterData.emailHref, activeLocale);
  const phoneHref = getSiteFooterHref(siteFooterData.phoneHref, activeLocale);
  const icpText = getSiteFooterText(siteFooterData.icp, activeLocale);
  const icpHref = getSiteFooterHref(siteFooterData.icpHref, activeLocale);
  const labelSeparator = activeLocale === "zh-CN" ? "：" : ": ";

  // Footer 不再显示独立首页栏目，只保留 5 个业务栏目。
  const visibleColumns = siteFooterData.columns.filter(
    (column) => column.key !== "home",
  );

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__inner">
          <div className="site-footer__nav-wrap">
            {visibleColumns.map((column) => {
              const isOpen = openColumn === column.key;
              const columnTitle = getSiteFooterText(column.title, activeLocale);

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
                        <Link href={getSiteFooterHref(link.href, activeLocale)}>
                          {getSiteFooterText(link.label, activeLocale)}
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
                {getSiteFooterText(siteFooterData.companyName, activeLocale)}
              </p>

              <p className="site-footer__contact-text">
                {getSiteFooterText(siteFooterData.addressLabel, activeLocale)}
                {labelSeparator}
                {getSiteFooterText(siteFooterData.address, activeLocale)}
                <a
                  className="site-footer__map-link"
                  href={mapHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {getSiteFooterText(siteFooterData.mapLabel, activeLocale)}
                </a>
              </p>

              <p className="site-footer__contact-text">
                {getSiteFooterText(siteFooterData.emailLabel, activeLocale)}
                {labelSeparator}
                <a className="site-footer__contact-link" href={emailHref}>
                  {getSiteFooterText(siteFooterData.email, activeLocale)}
                </a>
              </p>

              <p className="site-footer__contact-text">
                {getSiteFooterText(siteFooterData.phoneLabel, activeLocale)}
                {labelSeparator}
                <a className="site-footer__contact-link" href={phoneHref}>
                  {getSiteFooterText(siteFooterData.phone, activeLocale)}
                </a>
              </p>
            </div>

            {showEnglishSocialLinks ? (
              <div
                className={"site-footer__qrcode-area " + styles.socialArea}
              >
                <div
                  className={styles.socialRow}
                  aria-label="FOREACH social media"
                >
                  {englishSocialLinks.map((item) => (
                    <a
                      className={styles.socialLink}
                      href={item.href}
                      key={item.key}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={"Visit FOREACH on " + item.label}
                      title={item.label}
                    >
                      <img
                        className={styles.socialIcon}
                        src={item.icon}
                        alt=""
                        loading="lazy"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="site-footer__qrcode-area">
                <div className="site-footer__qr-row">
                  {siteFooterData.qrCodes.map((item) => {
                    const label = getSiteFooterText(item.label, activeLocale);
                    const imageSrc = item.image ? getSiteFooterHref(item.image, activeLocale) : "";

                    return (
                      <div className="site-footer__qrcode-item" key={item.key}>
                        <div className="site-footer__qrcode-box">
                          {imageSrc ? (
                            <img
                              src={imageSrc}
                              alt={
                                activeLocale === "zh-CN"
                                  ? `${label}二维码`
                                  : `${label} QR code`
                              }
                              loading="lazy"
                            />
                          ) : (
                            <>
                              {label}
                              <br />
                              {getSiteFooterText(siteFooterData.qrCodePlaceholder, activeLocale)}
                            </>
                          )}
                        </div>

                        <span className="site-footer__qrcode-label">{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
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

            <p>{getSiteFooterText(siteFooterData.copyright, activeLocale)}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
