import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import { getSolenoidConfigurationGallery } from "@/data/products/detail/solenoid-images";
import type { SelectionLocale } from "@/data/products/selection/product-selection.types";

const titles: Record<SelectionLocale, (ways: "2" | "3") => string> = {
  zh: ways => `SV10 ${ways === "2" ? "二通" : "三通"}微型电磁阀`,
  en: ways => `SV10 ${ways}-way Miniature Solenoid Valve`,
  es: ways => `Electroválvula miniatura SV10 de ${ways} vías`,
  fr: ways => `Électrovanne miniature SV10 à ${ways} voies`,
  ko: ways => `SV10 ${ways}방향 소형 솔레노이드 밸브`,
  ru: ways => `Миниатюрный ${ways}-ходовой электромагнитный клапан SV10`,
};

/** Shared configuration cards for the article and video, using selected gallery images. */
export function getSolenoidRelatedProducts(locale: RelatedResourcesData["locale"]): RelatedResourcesData["products"] {
  const selectionLocale = locale === "zh-CN" ? "zh" : locale;
  const prefix = locale === "zh-CN" ? "" : `/${locale}`;
  return (["2-way", "3-way"] as const).map(slug => {
    const gallery = getSolenoidConfigurationGallery(slug, selectionLocale);
    const imageIndex = slug === "3-way"
      ? gallery.additionalImages.findIndex(src => src.endsWith("-connection-options.webp"))
      : 0;
    return {
      id: `sv10-${slug}`,
      title: titles[selectionLocale](slug === "2-way" ? "2" : "3"),
      href: `${prefix}/products/valves/solenoid-valves/${slug}/`,
      imageSrc: gallery.additionalImages[imageIndex],
      imageAlt: gallery.additionalImageAlts[imageIndex],
    };
  });
}
