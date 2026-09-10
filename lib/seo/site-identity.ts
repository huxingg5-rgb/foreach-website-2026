import { SITE_ORIGIN } from "@/lib/seo/site-url";

export const SITE_NAME = "FOREACH";

// Keep the root IDs aligned with the existing product and article graphs.
// Localized home pages describe this same site, not separate /en/ etc. sites.
const homeUrl = new URL("/", SITE_ORIGIN).href;
const organizationId = homeUrl + "#organization";

export const HOME_SITE_IDENTITY = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "Shenzhen FOREACH Technology Co., Ltd.",
      legalName: "深圳市恒永达科技股份有限公司",
      alternateName: [SITE_NAME, "FOREACH Technology", "恒永达"],
      url: homeUrl,
      logo: new URL("/images/logo/foreach-logo-color.svg", SITE_ORIGIN).href,
    },
    {
      "@type": "WebSite",
      "@id": homeUrl + "#website",
      name: SITE_NAME,
      alternateName: ["FOREACH Technology"],
      url: homeUrl,
      publisher: { "@id": organizationId },
    },
  ],
};
