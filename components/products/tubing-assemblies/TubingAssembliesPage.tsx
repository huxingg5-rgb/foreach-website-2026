import type { TubingAssemblyType } from "@/data/products/tubing-assemblies.en";
import { getTubingAssemblySelectionContent } from "@/data/products/tubing-assemblies/localized";
import type { TubingAssemblyLocale } from "@/data/products/tubing-assemblies/locales";
import { getCanonicalUrl } from "@/lib/seo/site-url";

import TubingAssembliesSelection from "./TubingAssembliesSelection";

export default function TubingAssembliesPage({ item, locale }: { item?: TubingAssemblyType; locale: TubingAssemblyLocale }) {
  const content = getTubingAssemblySelectionContent(locale);
  const intro = item ? content.intros[item.id] : content.overview;
  const path = (id?: string) => `/${locale}/products/tubing-assemblies/${id ? `${id}/` : ""}`;
  const breadcrumbs = [
    { label: content.ui.home, href: `/${locale}/` }, { label: content.ui.products, href: `/${locale}/products/` },
    { label: content.ui.category, ...(item ? { href: path() } : {}) },
    ...(item ? [{ label: content.typeNames[item.id] }] : []),
  ];
  const url = getCanonicalUrl(path(item?.id));
  const cards = content.cards.filter(card => !item || card.productTypeId === item.id);
  const schema = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "CollectionPage", "@id": url, url, name: intro.title, description: intro.paragraphs[0], inLanguage: locale, mainEntity: { "@type": "ItemList", itemListElement: cards.map((card, index) => ({ "@type": "ListItem", position: index + 1, name: card.cardTitle, url: getCanonicalUrl(card.detailHref ?? path(card.productTypeId)) })) } },
      { "@type": "BreadcrumbList", itemListElement: breadcrumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, name: crumb.label, item: crumb.href ? getCanonicalUrl(crumb.href) : url })) },
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <TubingAssembliesSelection key={`${locale}-${item?.id ?? "all"}`} initialType={item?.id} content={content} />
  </>;
}
