import { getHindiInstrumentPumpDetail } from "@/data/products/detail/instrument-pumps.hi";
import { Suspense, type ComponentProps } from "react";
import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import { getSyringeSeriesIndex, syringeSeriesSlugs, syringeSeriesFilters } from "@/data/products/selection/syringe-pump-series";
import { getSyringeSeriesMetadata } from "@/services/products/getSyringeSeriesMetadata";
import "@/app/products/products.css";
import { getSyringePumpProductDetailData } from "@/services/products/adapters/getSyringePumpProductDetailData";
import { getItalianSyringeDetail } from "@/data/products/detail/syringe-pump-detail.it";
import { getGermanSyringeDetail } from "@/data/products/detail/syringe-pump-detail.de";
import { applyInstrumentFluidicsChineseCopy } from "@/data/products/detail/instrument-fluidics-copy.zh";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import { getInstrumentProductSections } from "@/components/products/detail/InstrumentProductSections";
import syringePumpDetails from "@/data/products/generated/pumps/syringe-pumps/detail/index.json";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";
import RelatedResources from "@/components/common/related-resources/RelatedResources";
import type { RelatedResourcesLocale } from "@/data/resources/related-resources/related-resources.intl";
import { syringeModelRoutes } from "@/data/products/selection/syringe-pump-routes";

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
  renderLocale = "zh-CN",
  germanDraft = false,
  italianDraft = false,
  hindiDraft = false,
}: {
  params: Promise<{ slug: string }>;
  renderLocale?: RelatedResourcesLocale;
  germanDraft?: boolean;
  italianDraft?: boolean;
  hindiDraft?: boolean;
}) {
  const { slug } = await params;
  const seriesIndex = getSyringeSeriesIndex(slug);
  if (seriesIndex >= 0) return <Suspense fallback={<ProductPageSkeleton variant="selection" />}><ProductSelectionClient locale="zh" initialCategoryId="pumps" initialProductTypeId="syringe-pump" initialFilters={{ filter01: [syringeSeriesFilters[seriesIndex]] }} /></Suspense>;
  const detail = (syringePumpDetails as Detail[]).find((item) => item.slug === slug);

  if (!detail) {
    notFound();
  }

  const sourceData = applyInstrumentFluidicsChineseCopy(getSyringePumpProductDetailData(detail), "zh");
  const german = germanDraft ? getGermanSyringeDetail(sourceData) : undefined;
  const italian = italianDraft ? getItalianSyringeDetail(sourceData) : undefined;
  const hindi = hindiDraft ? getHindiInstrumentPumpDetail(sourceData, "syringe") : undefined;
  const modelRoute = syringeModelRoutes.find(route => route.legacy === slug);
  const relationKeys = [
    ...(modelRoute ? [`series:${modelRoute.model}`] : []),
    "category:syringe-pumps",
  ];

  return (
    <ProductDetailClient
      data={(german?.data ?? italian?.data ?? hindi?.data ?? sourceData) as ComponentProps<typeof ProductDetailClient>["data"]}
      germanDetail={german?.presentation}
      localizedDetail={italian ? { locale: "it", copy: italian.presentation } : hindi ? { locale: "hi", copy: hindi.presentation } : undefined}
      {...getInstrumentProductSections(detail.slug, german ? "de" : italian ? "it" : hindi ? "hi" : renderLocale)}
      afterContent={
        <RelatedResources
          sourceType="product"
          sourceSlug={slug}
          relationKeys={relationKeys}
          locale={renderLocale}
          uiLocale={german ? "de" : italian ? "it" : hindi ? "hi" : undefined}
        />
      }
    />
  );
}
