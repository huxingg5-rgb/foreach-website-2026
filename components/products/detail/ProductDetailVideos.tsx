"use client";

import { getProductDetailVideos, isProductVideoLocale, productVideoUi, type ProductVideoIdentity } from "@/data/products/detail/product-detail-videos";
import QuickConnectVideoShowcase from "./QuickConnectVideoShowcase";
import { trackResourceView } from "@/lib/analytics/track-event";

export default function ProductDetailVideos({ locale, identity, pathname }: {
  locale: string;
  identity: ProductVideoIdentity;
  pathname: string;
}) {
  if (!isProductVideoLocale(locale)) return null;
  const ui = productVideoUi[locale];
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
      { key: "product", label: ui.product, videos: getProductDetailVideos(locale, identity, pathname),
        emptyText: ui.empty, emptyLink: { href: `/${locale}/contact/`, label: ui.contact } },
      { key: "factory", label: ui.factory, videos: [{ id: "foreach-company-intro", title: ui.company,
        cover: "/images/home/tv-foreach-1280.webp", kind: "file", src: "/images/home/foreach-company-intro.mp4" }] },
    ]}
  />;
}
