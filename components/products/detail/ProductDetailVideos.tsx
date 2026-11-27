"use client";

import { getProductDetailVideos, isProductVideoLocale, productVideoUi, type ProductVideoIdentity } from "@/data/products/detail/product-detail-videos";
import { italianDiaphragmText } from "@/data/products/detail/diaphragm-pump-content.it";
import { hindiProductDetailText } from "@/data/products/detail/product-detail.hi";
import { italianProductDetailText } from "@/data/products/detail/product-detail.it";
import { getHindiDraftLink, getItalianDraftLink } from "@/lib/i18n/draft-languages";
import { getHindiVideoGuideTitle } from "@/data/resources/installation-guide/installation-guide.hi";
import { getItalianVideoGuideTitle } from "@/data/resources/installation-guide/installation-guide.it";
import { germanVideoCopy } from "@/data/resources/installation-guide/video-guide-copy.de";
import QuickConnectVideoShowcase from "./QuickConnectVideoShowcase";
import { trackResourceView } from "@/lib/analytics/track-event";

const germanVideoUi = {
  title: "Videos",
  product: "Produktvideos",
  factory: "Unternehmensvideo",
  company: "Einblicke bei FOREACH",
  empty: "Für dieses Produkt ist noch kein Video verfügbar.",
  contact: "Technischen Support kontaktieren",
  play: "Video abspielen",
  select: "Video auswählen",
  carousel: "Ziehen Sie oder verwenden Sie die Pfeiltasten, um das Video zu wechseln.",
  previous: "Vorheriges Video",
  next: "Nächstes Video",
};

const italianVideoUi = {
  title: "Video", product: "Video del prodotto", factory: "Video dello stabilimento", company: "Scopri FOREACH",
  empty: "Non è ancora disponibile un video per questo prodotto.", contact: "Contatta l'assistenza tecnica",
  play: "Riproduci il video", select: "Seleziona un video", carousel: "Trascina o usa le frecce per cambiare video.",
  previous: "Video precedente", next: "Video successivo",
};

const hindiVideoUi = {
  title: "वीडियो", product: "उत्पाद वीडियो", factory: "फ़ैक्टरी का वीडियो", company: "FOREACH को जानें",
  empty: "इस उत्पाद का वीडियो अभी उपलब्ध नहीं है।", contact: "तकनीकी सहायता से संपर्क करें",
  play: "वीडियो चलाएँ", select: "वीडियो चुनें", carousel: "वीडियो बदलने के लिए खींचें या तीर वाली कुंजियाँ दबाएँ।",
  previous: "पिछला वीडियो", next: "अगला वीडियो",
};

export default function ProductDetailVideos({ locale, identity, pathname, germanDraft = false, contentLocale }: {
  locale: string;
  identity: ProductVideoIdentity;
  pathname: string;
  germanDraft?: boolean;
  contentLocale?: "it" | "hi";
}) {
  if (!isProductVideoLocale(locale)) return null;
  const ui = germanDraft ? germanVideoUi : contentLocale === "it" ? italianVideoUi : contentLocale === "hi" ? hindiVideoUi : productVideoUi[locale];
  const productVideos = getProductDetailVideos(locale, identity, pathname).map(video => {
    const title = germanDraft ? germanVideoCopy[video.id]?.title : contentLocale === "it" ? getItalianVideoGuideTitle(video.id) ?? (pathname.includes("/miniature-diaphragm-pumps/") ? italianDiaphragmText(video.title) : italianProductDetailText(video.title)) : contentLocale === "hi" ? (pathname.includes("/miniature-diaphragm-pumps/") ? getHindiVideoGuideTitle(video.id) : undefined) ?? hindiProductDetailText(video.title) : undefined;
    return title ? { ...video, title } : video;
  });
  return <QuickConnectVideoShowcase
    title={ui.title}
    labels={ui}
    onPlay={video => trackResourceView({
      resourceId: `${video.kind === "file" ? "company_video" : "installation_guide"}:${video.id}`,
      resourceType: video.kind === "file" ? "company_video" : "installation_guide",
      fileType: video.kind === "file" ? "mp4" : "youtube",
      sourceSection: "product_detail_videos", locale,
    })}
    groups={[
      { key: "product", label: ui.product, videos: productVideos,
        emptyText: ui.empty, emptyLink: { href: contentLocale === "it" ? getItalianDraftLink("/en/contact/").href : contentLocale === "hi" ? getHindiDraftLink("/en/contact/").href : `/${germanDraft ? "de" : locale}/contact/`, label: ui.contact } },
      { key: "factory", label: ui.factory, videos: [{ id: "foreach-company-intro", title: ui.company,
        cover: "/images/home/tv-foreach-1280.webp", kind: "file", src: "/images/home/foreach-company-intro.mp4" }] },
    ]}
  />;
}
