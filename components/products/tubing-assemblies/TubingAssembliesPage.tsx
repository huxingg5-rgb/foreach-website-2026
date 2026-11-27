import type { TubingAssemblyType } from "@/data/products/tubing-assemblies.en";
import { getGermanTubingAssemblySelectionContent } from "@/data/products/tubing-assemblies/selection.de";
import { getTubingAssemblySelectionContent } from "@/data/products/tubing-assemblies/localized";
import { getTubingAssemblyLocalePrefix, type TubingAssemblySelectionLocale } from "@/data/products/tubing-assemblies/locales";
import { getGermanDraftLink, getHindiDraftLink } from "@/lib/i18n/draft-languages";
import { getCanonicalUrl } from "@/lib/seo/site-url";

import TubingAssembliesSelection from "./TubingAssembliesSelection";

export default function TubingAssembliesPage({ item, locale, germanDraft = false }: { item?: TubingAssemblyType; locale: TubingAssemblySelectionLocale; germanDraft?: boolean }) {
  const content = germanDraft ? getGermanTubingAssemblySelectionContent() : getTubingAssemblySelectionContent(locale);
  const intro = item ? content.intros[item.id] : content.overview;
  const prefix = germanDraft ? "/de" : getTubingAssemblyLocalePrefix(locale);
  const path = (id?: string) => `${prefix}/products/tubing-assemblies/${id ? `${id}/` : ""}`;
  const breadcrumbs = [
    { label: content.ui.home, href: `${prefix}/` }, { label: content.ui.products, href: `${prefix}/products/` },
    { label: content.ui.category, ...(item ? { href: path() } : {}) },
    ...(item ? [{ label: content.typeNames[item.id] }] : []),
  ];
  const url = getCanonicalUrl(path(item?.id));
  const cards = content.cards.filter(card => !item || card.productTypeId === item.id);
  const destination = (href?: string) => href && locale === "hi" ? getHindiDraftLink(href).href : germanDraft && href ? getGermanDraftLink(href).href : href;
  const schema = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "CollectionPage", "@id": url, url, name: intro.title, description: intro.paragraphs[0], inLanguage: germanDraft ? "de-DE" : locale === "hi" ? "hi-IN" : locale === "it" ? "it-IT" : locale, mainEntity: { "@type": "ItemList", itemListElement: cards.map((card, index) => ({ "@type": "ListItem", position: index + 1, name: card.cardTitle, url: getCanonicalUrl(destination(card.detailHref) ?? path(card.productTypeId)) })) } },
      { "@type": "BreadcrumbList", itemListElement: breadcrumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, name: crumb.label, item: crumb.href ? getCanonicalUrl(crumb.href) : url })) },
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <TubingAssembliesSelection key={`${locale}-${item?.id ?? "all"}`} initialType={item?.id} content={content} germanDraft={germanDraft} />
  </>;
}
