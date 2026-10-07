import { SITE_ORIGIN } from "@/lib/seo/site-url";
import { siteFooterData } from "@/data/site-footer";
import { companySocialLinks } from "@/data/company-social-links";

export const SITE_NAME = "Foreach Technology";

// Keep the root IDs aligned with the existing product and article graphs.
// Localized home pages describe this same site, not separate /en/ etc. sites.
const homeUrl = new URL("/", SITE_ORIGIN).href;
const organizationId = homeUrl + "#organization";
export const SITE_ORGANIZATION_ID = organizationId;
export const SITE_WEBSITE_ID = homeUrl + "#website";
const contactUrl = new URL("/contact/", SITE_ORIGIN).href;
const telephone = siteFooterData.phoneHref.global.replace(/^tel:/, "");

export const HOME_SITE_IDENTITY = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: SITE_NAME,
      legalName: siteFooterData.companyName.china,
      alternateName: [
        "Foreach",
        "FOREACH",
        "恒永达",
        "恒永达科技",
        siteFooterData.companyName.global,
      ],
      description:
        "恒永达专注于微流体系统核心零部件与液路系统解决方案，服务 IVD、生命科学、高端分析仪器、合成生物和实验室自动化领域。",
      url: homeUrl,
      logo: new URL("/images/logo/foreach-logo-color.svg", SITE_ORIGIN).href,
      email: siteFooterData.email.global,
      telephone,
      address: {
        "@type": "PostalAddress",
        addressCountry: "CN",
        addressRegion: "广东省",
        addressLocality: "深圳市",
        streetAddress:
          "光明区玉塘街道玉律社区光侨大道1008号裕丰达工业园2栋1301",
        postalCode: "518132",
      },
      contactPoint: {
        "@type": "ContactPoint",
        "@id": homeUrl + "#sales-contact",
        contactType: "sales",
        name: "产品咨询与选型支持",
        telephone,
        email: siteFooterData.email.global,
        url: contactUrl,
      },
      sameAs: companySocialLinks.map(({ href }) => href),
    },
    {
      "@type": "WebSite",
      "@id": SITE_WEBSITE_ID,
      name: SITE_NAME,
      alternateName: ["Foreach"],
      url: homeUrl,
      publisher: { "@id": organizationId },
    },
  ],
};
