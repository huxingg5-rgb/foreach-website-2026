import { getSiteIdentity } from "@/lib/seo/site-identity";
import { SITE_ORIGIN } from "@/lib/seo/site-url";

function getHomeIdentity(locale: string) {
  const identity = getSiteIdentity(locale === "de" ? "en" : locale);
  if (locale !== "de") return identity;

  return {
    ...identity,
    "@graph": identity["@graph"].map((entity) => entity["@type"] === "Organization" && entity.contactPoint ? {
      ...entity,
      description: "FOREACH entwickelt Kernkomponenten und Lösungen für Flüssigkeitskreisläufe in der Mikrofluidik für die IVD, die Life Sciences, die Analytik, die synthetische Biologie und die Laborautomation.",
      contactPoint: {
        ...entity.contactPoint,
        name: "Produktanfragen und Beratung zur Produktauswahl",
        url: new URL("/de/contact/", SITE_ORIGIN).href,
      },
    } : entity),
  };
}

// Render only on home pages: inner pages already provide their own graphs.
export default function HomeStructuredData({ locale = "zh-CN" }: { locale?: string }) {
  return (
    <script
      id="foreach-home-site-identity"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getHomeIdentity(locale)).replace(/</g, "\\u003c"),
      }}
    />
  );
}
