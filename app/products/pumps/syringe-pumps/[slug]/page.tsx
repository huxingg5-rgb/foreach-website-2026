import { Suspense } from "react";
import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import { getSyringeSeriesIndex, syringeSeriesSlugs, syringeSeriesFilters } from "@/data/products/selection/syringe-pump-series";
import { getSyringeSeriesMetadata } from "@/services/products/getSyringeSeriesMetadata";
import "@/app/products/products.css";
import { getSyringePumpProductDetailData } from "@/services/products/adapters/getSyringePumpProductDetailData";
import { applyInstrumentFluidicsChineseCopy } from "@/data/products/detail/instrument-fluidics-copy.zh";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import syringePumpDetails from "@/data/products/generated/pumps/syringe-pumps/detail/index.json";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";

type Detail = (typeof syringePumpDetails)[number];

export function generateStaticParams() {
  return syringeSeriesSlugs.map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seriesIndex = getSyringeSeriesIndex(slug);
  if (seriesIndex >= 0) return getSyringeSeriesMetadata("zh", seriesIndex);
  const detail = (syringePumpDetails as Detail[]).find(
    (item) => item.slug === slug,
  );

  if (!detail) {
    return {};
  }

  const data = getSyringePumpProductDetailData(detail);
  const title = `${data.title} | Foreach Technology`;

  return {
    title,
    description: data.description,
    ...buildProductSocialMetadata({
      data,
      title,
      description: data.description,
      canonicalUrl: `/products/pumps/syringe-pumps/${slug}/`,
    }),
  };
}

export default async function SyringePumpDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seriesIndex = getSyringeSeriesIndex(slug);
  if (seriesIndex >= 0) return <Suspense fallback={<ProductPageSkeleton variant="selection" />}><ProductSelectionClient locale="zh" initialCategoryId="pumps" initialProductTypeId="syringe-pump" initialFilters={{ filter01: [syringeSeriesFilters[seriesIndex]] }} /></Suspense>;
  const detail = (syringePumpDetails as Detail[]).find((item) => item.slug === slug);

  if (!detail) {
    notFound();
  }

  return <ProductDetailClient data={applyInstrumentFluidicsChineseCopy(getSyringePumpProductDetailData(detail), "zh") as any} />;
}
