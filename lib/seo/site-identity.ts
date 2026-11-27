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

const ORGANIZATION_COPY: Record<string, { description: string; contactName: string }> = {
  en: {
    description: "FOREACH develops core components and fluid-path solutions for microfluidic systems used in IVD, life science, analytical instruments, synthetic biology and laboratory automation.",
    contactName: "Product inquiries and selection support",
  },
  de: {
    description: "FOREACH entwickelt Kernkomponenten und Lösungen für Flüssigkeitskreisläufe in mikrofluidischen Systemen für die In-vitro-Diagnostik, Life Sciences, Analysengeräte, synthetische Biologie und Laborautomation.",
    contactName: "Produktanfragen und Unterstützung bei der Auswahl",
  },
  hi: {
    description: "FOREACH IVD, जीवन विज्ञान, विश्लेषणात्मक उपकरणों, सिंथेटिक बायोलॉजी और प्रयोगशाला ऑटोमेशन के लिए मुख्य माइक्रोफ्लुइडिक घटक और फ्लुइड पाथ समाधान विकसित करती है।",
    contactName: "उत्पाद की पूछताछ और चयन में सहायता",
  },
  it: {
    description: "FOREACH sviluppa componenti chiave e soluzioni per circuiti microfluidici nella diagnostica in vitro, nelle scienze della vita, nella strumentazione analitica, nella biologia sintetica e nell’automazione di laboratorio.",
    contactName: "Richieste sui prodotti e assistenza nella scelta",
  },
  es: {
    description: "FOREACH desarrolla componentes y soluciones para circuitos microfluídicos utilizados en diagnóstico in vitro, ciencias de la vida, instrumentación analítica, biología sintética y automatización de laboratorio.",
    contactName: "Consultas de productos y asistencia en la selección",
  },
  fr: {
    description: "FOREACH développe des composants et des solutions de circuits microfluidiques pour le diagnostic in vitro, les sciences de la vie, les instruments d’analyse, la biologie synthétique et l’automatisation de laboratoire.",
    contactName: "Renseignements produits et aide à la sélection",
  },
  ko: {
    description: "FOREACH는 체외진단, 생명과학, 분석기기, 합성생물학 및 실험실 자동화에 사용되는 미세유체 시스템의 핵심 부품과 유로 솔루션을 개발합니다.",
    contactName: "제품 문의 및 선정 지원",
  },
  ru: {
    description: "FOREACH разрабатывает компоненты и решения для микрофлюидных систем в диагностике in vitro, науках о жизни, аналитическом приборостроении, синтетической биологии и автоматизации лабораторий.",
    contactName: "Консультации по продукции и помощь в подборе",
  },
};

export function getSiteIdentity(locale: string) {
  const language = locale === "en-US" ? "en" : locale === "de-DE" ? "de" : locale === "it-IT" ? "it" : locale === "hi-IN" ? "hi" : locale;
  const copy = ORGANIZATION_COPY[language];
  if (!copy) return HOME_SITE_IDENTITY;
  return {
    ...HOME_SITE_IDENTITY,
    "@graph": HOME_SITE_IDENTITY["@graph"].map((entity) => entity["@type"] === "Organization" ? {
      ...entity,
      description: copy.description,
      contactPoint: {
        ...entity.contactPoint,
        name: copy.contactName,
        url: new URL(`/${language}/contact/`, SITE_ORIGIN).href,
      },
    } : entity),
  };
}
