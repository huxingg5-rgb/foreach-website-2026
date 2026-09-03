import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import DiaphragmPumpDetailRoute, {
  getDiaphragmPumpMetadata,
  getDiaphragmPumpStaticParams,
} from "@/components/products/diaphragm-pumps/DiaphragmPumpDetailRoute";
import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
import { getDiaphragmPumpCategoryCopy } from "@/data/products/detail/diaphragm-pump-reference-models";
import {
  getDiaphragmPumpLanguageAlternates,
  getDiaphragmPumpPath,
} from "@/data/products/detail/diaphragm-pump-routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

const CATEGORY_FILTERS = {
  "liquid-diaphragm-pumps": "液体隔膜泵",
  "gas-liquid-diaphragm-pumps": "气液混合隔膜泵",
} as const;

function getCategoryFilter(slug: string) {
  return CATEGORY_FILTERS[slug as keyof typeof CATEGORY_FILTERS] || null;
}

export function generateStaticParams() {
  return [
    ...getDiaphragmPumpStaticParams(),
    ...Object.keys(CATEGORY_FILTERS).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug === "gas-diaphragm-pumps") {
    notFound();
  }

  const categoryFilter = getCategoryFilter(slug);

  if (categoryFilter) {
    const copy = getDiaphragmPumpCategoryCopy("zh");
    const isLiquidCategory = slug === "liquid-diaphragm-pumps";
    const heading = isLiquidCategory ? copy.liquid : copy.gasLiquid;
    const title = isLiquidCategory
      ? copy.liquidSeoTitle
      : copy.gasLiquidSeoTitle;
    const description = isLiquidCategory
      ? copy.liquidSeoDescription || copy.seoDescription
      : copy.gasLiquidSeoDescription || copy.seoDescription;
    const canonicalPath = getDiaphragmPumpPath("zh", slug);

    return {
      title,
      description,
      keywords: [heading, "FOREACH", "微型隔膜泵"],
      alternates: {
        canonical: canonicalPath,
        languages: getDiaphragmPumpLanguageAlternates(slug),
      },
      robots: { index: true, follow: true },
      openGraph: {
        type: "website",
        locale: "zh_CN",
        url: canonicalPath,
        siteName: "FOREACH",
        title,
        description,
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
    };
  }

  return getDiaphragmPumpMetadata({ params, locale: "zh-CN" });
}

export default async function MiniatureDiaphragmPumpDetailPage({
  params,
}: PageProps) {
  const resolvedParams = await params;
  const categoryFilter = getCategoryFilter(resolvedParams.slug);

  if (categoryFilter) {
    return (
      <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
        <ProductSelectionClient
          locale="zh"
          initialCategoryId="pumps"
          initialProductTypeId="diaphragm-pump"
          initialFilters={{ filter01: [categoryFilter] }}
        />
      </Suspense>
    );
  }

  return (
    <DiaphragmPumpDetailRoute
      params={Promise.resolve(resolvedParams)}
      locale="zh-CN"
    />
  );
}
