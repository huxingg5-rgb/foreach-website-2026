"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { getLocaleFromPathname, isInternationalLocale, type LocaleCode } from "@/lib/i18n";
import { openCookieSettings } from "@/lib/privacy/cookie-consent";
import { companySocialLinks as englishSocialLinks } from "@/data/company-social-links";
import { getTubingAssemblyLocalePrefix, isTubingAssemblyLocale, tubingAssemblyNavigation } from "@/data/products/tubing-assemblies/locales";

import {
  getSiteFooterHref,
  getSiteFooterText,
  siteFooterData,
} from "@/data/site-footer";

import { getInkjetNav } from "@/data/applications/inkjet-guide-navigation";
import inkjetRoutes from "@/data/applications/industrial-inkjet-routes.json";
import { getLocalizedSiteHref } from "@/lib/seo/site-url";
import { getGermanNavigationText } from "@/data/navigation.de";
import { getItalianNavigationText } from "@/data/navigation.it";
import { getHindiNavigationText } from "@/data/navigation.hi";
import { getHindiDraftLink, hindiEnglishFallbackSuffix, isLocalizedHindiDraftPath, germanEnglishFallbackSuffix, getDraftHrefForEnglish, getDraftLinkLocaleFromPath, getGermanDraftLink, getItalianDraftLink, isLocalizedGermanDraftPath, isLocalizedItalianDraftPath, italianEnglishFallbackSuffix } from "@/lib/i18n/draft-languages";
import styles from "./SiteFooterSocial.module.css";

type SiteFooterProps = {
  locale?: LocaleCode;
  fittingPathPattern?: string;
};

const footerLegalCopy: Record<
  LocaleCode | "de" | "it" | "hi",
  {
    socialMedia: string;
    visitSocial: (platform: string) => string;
    privacyPolicy: string;
    cookieSettings: string;
  }
> = {
  "zh-CN": {
    socialMedia: "Foreach 社交媒体",
    visitSocial: (platform) => `访问 Foreach 的 ${platform} 主页`,
    privacyPolicy: "隐私政策",
    cookieSettings: "Cookie 设置",
  },
  en: {
    socialMedia: "Foreach social media",
    visitSocial: (platform) => `Visit Foreach on ${platform}`,
    privacyPolicy: "Privacy Policy",
    cookieSettings: "Cookie settings",
  },
  de: {
    socialMedia: "FOREACH in sozialen Medien",
    visitSocial: (platform) => "FOREACH auf " + platform,
    privacyPolicy: "Datenschutzerklärung",
    cookieSettings: "Cookie-Einstellungen",
  },
  hi: {
    socialMedia: "सोशल मीडिया पर FOREACH",
    visitSocial: (platform) => platform + " पर FOREACH देखें",
    privacyPolicy: "गोपनीयता नीति",
    cookieSettings: "कुकी सेटिंग",
  },
  it: {
    socialMedia: "FOREACH sui social media",
    visitSocial: (platform) => "Visita FOREACH su " + platform,
    privacyPolicy: "Informativa sulla privacy",
    cookieSettings: "Impostazioni dei cookie",
  },
  es: {
    socialMedia: "Redes sociales de Foreach",
    visitSocial: (platform) => `Visitar Foreach en ${platform}`,
    privacyPolicy: "Política de privacidad",
    cookieSettings: "Configuración de cookies",
  },
  fr: {
    socialMedia: "Réseaux sociaux de Foreach",
    visitSocial: (platform) => `Consulter Foreach sur ${platform}`,
    privacyPolicy: "Politique de confidentialité",
    cookieSettings: "Paramètres des cookies",
  },
  ko: {
    socialMedia: "Foreach 소셜 미디어",
    visitSocial: (platform) => `${platform}에서 Foreach 방문`,
    privacyPolicy: "개인정보 처리방침",
    cookieSettings: "쿠키 설정",
  },
  ru: {
    socialMedia: "Социальные сети Foreach",
    visitSocial: (platform) => `Посетить Foreach в ${platform}`,
    privacyPolicy: "Политика конфиденциальности",
    cookieSettings: "Настройки Cookie",
  },
};

export default function SiteFooter({ locale, fittingPathPattern }: SiteFooterProps) {
  const pathname = usePathname();
  const activeLocale = locale ?? getLocaleFromPathname(pathname);
  const draftLocale = getDraftLinkLocaleFromPath(pathname);
  const isGermanPage = isLocalizedGermanDraftPath(pathname, fittingPathPattern);
  const isItalianPage = isLocalizedItalianDraftPath(pathname);
  const isHindiPage = isLocalizedHindiDraftPath(pathname);
  const footerLanguage = isGermanPage ? "de" : isItalianPage ? "it" : isHindiPage ? "hi" : undefined;
  const translateFooterText = isGermanPage
    ? getGermanNavigationText
    : isItalianPage ? getItalianNavigationText : isHindiPage ? getHindiNavigationText : (text: string) => text;
  const fallbackSuffix = isHindiPage ? hindiEnglishFallbackSuffix : isItalianPage ? italianEnglishFallbackSuffix : germanEnglishFallbackSuffix;
  const showEnglishSocialLinks = isInternationalLocale(activeLocale);

  function getFooterText(value: Parameters<typeof getSiteFooterText>[0], locale: LocaleCode) {
    const text = getSiteFooterText(value, locale);
    return translateFooterText(text);
  }

  function getNavigationHref(value: Parameters<typeof getSiteFooterHref>[0]) {
    const href = getSiteFooterHref(value, activeLocale);
    return isHindiPage ? getHindiDraftLink(href).href : isItalianPage ? getItalianDraftLink(href).href : getDraftHrefForEnglish(href, draftLocale);
  }
  const [openColumn, setOpenColumn] = useState("");

  const mapHref = getSiteFooterHref(siteFooterData.mapHref, activeLocale);
  const emailHref = getSiteFooterHref(siteFooterData.emailHref, activeLocale);
  const phoneHref = getSiteFooterHref(siteFooterData.phoneHref, activeLocale);
  const icpText = getFooterText(siteFooterData.icp, activeLocale);
  const icpHref = getSiteFooterHref(siteFooterData.icpHref, activeLocale);
  const labelSeparator = activeLocale === "zh-CN" ? "：" : ": ";
  const legalCopy = footerLegalCopy[footerLanguage ?? activeLocale];
  const privacyPolicyLink = isHindiPage ? getHindiDraftLink(getSiteFooterHref("/privacy-policy", "en"))
    : isItalianPage
    ? getItalianDraftLink(getSiteFooterHref("/privacy-policy", "en"))
    : { href: getNavigationHref("/privacy-policy") };

  return (
    <footer
      lang={isGermanPage ? "de-DE" : isItalianPage ? "it-IT" : isHindiPage ? "hi-IN" : undefined}
      className={
        activeLocale === "zh-CN"
          ? `site-footer ${styles.chineseFooter}`
          : "site-footer"
      }
    >
      <div className="site-footer__main">
        <div className="site-footer__inner">
          <div className="site-footer__nav-wrap">
            {siteFooterData.columns.map((column) => {
              const isOpen = openColumn === column.key;
              const columnTitle = getFooterText(column.title, activeLocale);

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
                    {isInternationalLocale(activeLocale) && column.key === "applications" ? (
                      <li><Link href={getNavigationHref("/applications/")} prefetch={false}>{getFooterText({ global: "All applications" }, activeLocale)}</Link></li>
                    ) : null}
                    {column.links.map((link) => {
                      const linkProps = isHindiPage ? getHindiDraftLink(getSiteFooterHref(link.href, "en"))
                        : isItalianPage ? getItalianDraftLink(getSiteFooterHref(link.href, "en")) : isGermanPage
                        ? getGermanDraftLink(getSiteFooterHref(link.href, "en"), fittingPathPattern)
                        : { href: getNavigationHref(link.href) };
                      return (
                        <li key={link.key}>
                          <Link {...linkProps} prefetch={false}>
                            {getFooterText(link.label, activeLocale)}
                            {linkProps.hrefLang === "en" ? fallbackSuffix : null}
                          </Link>
                        </li>
                      );
                    })}
                    {activeLocale !== "zh-CN" && column.key === "applications" && (() => {
                      const linkProps = isHindiPage ? getHindiDraftLink(inkjetRoutes.hub)
                        : isItalianPage ? getItalianDraftLink(inkjetRoutes.hub) : isGermanPage
                        ? getGermanDraftLink(inkjetRoutes.hub)
                        : { href: getLocalizedSiteHref(inkjetRoutes.hub, activeLocale) };
                      const label = getInkjetNav(activeLocale).labels.hub;
                      return (
                        <li>
                          <Link {...linkProps} prefetch={false}>
                            {translateFooterText(label)}
                            {linkProps.hrefLang === "en" ? fallbackSuffix : null}
                          </Link>
                        </li>
                      );
                    })()}
                    {isTubingAssemblyLocale(activeLocale) && column.key === "products" && (() => {
                      const href = `${getTubingAssemblyLocalePrefix(activeLocale)}/products/tubing-assemblies/`;
                      const linkProps = isHindiPage ? getHindiDraftLink(href) : isItalianPage ? getItalianDraftLink(href) : isGermanPage ? getGermanDraftLink(href, fittingPathPattern) : { href };
                      const label = tubingAssemblyNavigation[activeLocale].title;
                      return (
                        <li>
                          <Link {...linkProps} prefetch={false}>
                            {translateFooterText(label)}
                            {linkProps.hrefLang === "en" ? fallbackSuffix : null}
                          </Link>
                        </li>
                      );
                    })()}
                  </ul>
                </nav>
              );
            })}
          </div>

          <div className="site-footer__right">
            <div className="site-footer__contact">
              <p className="site-footer__company">
                {getFooterText(siteFooterData.companyName, activeLocale)}
              </p>

              <p className="site-footer__contact-text">
                {getFooterText(siteFooterData.addressLabel, activeLocale)}
                {labelSeparator}
                {getFooterText(siteFooterData.address, activeLocale)}
                <a
                  className="site-footer__map-link"
                  href={mapHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {getFooterText(siteFooterData.mapLabel, activeLocale)}
                </a>
              </p>

              <p className="site-footer__contact-text">
                {getFooterText(siteFooterData.emailLabel, activeLocale)}
                {labelSeparator}
                <a className="site-footer__contact-link" href={emailHref}>
                  {getFooterText(siteFooterData.email, activeLocale)}
                </a>
              </p>

              <p className="site-footer__contact-text">
                {getFooterText(siteFooterData.phoneLabel, activeLocale)}
                {labelSeparator}
                <a className="site-footer__contact-link" href={phoneHref}>
                  {getFooterText(siteFooterData.phone, activeLocale)}
                </a>
              </p>
            </div>

            {showEnglishSocialLinks ? (
              <div
                className={"site-footer__qrcode-area " + styles.socialArea}
              >
                <div
                  className={styles.socialRow}
                  aria-label={legalCopy.socialMedia}
                >
                  {englishSocialLinks.map((item) => (
                    <a
                      className={styles.socialLink}
                      href={item.href}
                      key={item.key}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={legalCopy.visitSocial(item.label)}
                      title={item.label}
                    >
                      <img
                        className={styles.socialIcon}
                        src={item.icon}
                        alt={item.label}
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
                    const label = getFooterText(item.label, activeLocale);
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
                              {getFooterText(siteFooterData.qrCodePlaceholder, activeLocale)}
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

            <p>{getFooterText(siteFooterData.copyright, activeLocale).replace(
              "All rights reserved.",
              isGermanPage ? "Alle Rechte vorbehalten." : isItalianPage ? "Tutti i diritti riservati." : isHindiPage ? "सभी अधिकार सुरक्षित हैं।" : "All rights reserved.",
            )}</p>

            <p className="site-footer__legal-links">
              <Link
                className="site-footer__legal-link"
                {...privacyPolicyLink}
                prefetch={false}
              >
                {legalCopy.privacyPolicy}
              </Link>

              <span
                className="site-footer__legal-separator"
                aria-hidden="true"
              >
                ·
              </span>

              <button
                className="site-footer__cookie-button"
                type="button"
                onClick={openCookieSettings}
              >
                {legalCopy.cookieSettings}
              </button>
              {activeLocale !== "zh-CN" && (
                <>
                  <span className="site-footer__legal-separator" aria-hidden="true">·</span>
                  <a
                    className="site-footer__legal-link"
                    href="/images/applications/industrial-inkjet-printing/menu/photo-credits.txt"
                  >
                    {translateFooterText(getInkjetNav(activeLocale).photoCredits)}
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

