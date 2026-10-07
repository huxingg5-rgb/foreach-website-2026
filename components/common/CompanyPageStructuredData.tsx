import { HOME_SITE_IDENTITY, SITE_ORGANIZATION_ID, SITE_WEBSITE_ID } from "@/lib/seo/site-identity";
import { getCanonicalUrl } from "@/lib/seo/site-url";

type Props = {
  type: "AboutPage" | "ContactPage";
  path: string;
  name: string;
  description: string;
  locale: string;
};

export default function CompanyPageStructuredData({ type, path, name, description, locale }: Props) {
  const url = getCanonicalUrl(path);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ...HOME_SITE_IDENTITY["@graph"],
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: locale,
        isPartOf: { "@id": SITE_WEBSITE_ID },
        publisher: { "@id": SITE_ORGANIZATION_ID },
        mainEntity: { "@id": SITE_ORGANIZATION_ID },
      },
    ],
  };

  return (
    <script
      id="company-page-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
