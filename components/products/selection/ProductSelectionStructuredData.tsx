"use client";

import { usePathname } from "next/navigation";
import { HOME_SITE_IDENTITY } from "@/lib/seo/site-identity";
import { getCanonicalUrl } from "@/lib/seo/site-url";

type Props = {
  locale: string;
  name: string;
  breadcrumbs: { label: string; href?: string }[];
  items: { name: string; href: string }[];
};

/** Describe the same localized breadcrumbs and cards rendered by the selector. */
export default function ProductSelectionStructuredData({
  locale,
  name,
  breadcrumbs,
  items,
}: Props) {
  const pathname = usePathname();
  if (!pathname) return null;

  const url = getCanonicalUrl(pathname);
  const listId = `${url}#product-list`;
  const breadcrumbId = `${url}#breadcrumb`;
  const isProductCenter = /^\/(?:en\/|es\/|fr\/|ko\/|ru\/)?products\/?$/.test(pathname);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      ...HOME_SITE_IDENTITY["@graph"],
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: isProductCenter ? breadcrumbs[1].label : name,
        inLanguage: locale === "zh" ? "zh-CN" : locale,
        isPartOf: { "@id": `${getCanonicalUrl("/")}#website` },
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: { "@id": listId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: item.href ? getCanonicalUrl(item.href) : url,
        })),
      },
      {
        "@type": "ItemList",
        "@id": listId,
        // Only mark up the currently rendered page of cards, including after filtering.
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          url: getCanonicalUrl(item.href),
        })),
      },
    ],
  };

  return (
    <script
      id="product-selection-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
