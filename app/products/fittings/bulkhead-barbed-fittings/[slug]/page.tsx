import type { ComponentType, ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import FittingRelatedResources from "@/components/products/detail/FittingRelatedResources";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";
import {
  connectPublishedFittingProduct,
} from "@/data/products/selection/connectPublishedFittingProduct";
import detailsJson from "@/data/products/generated/fittings/bulkhead-barbed-fittings/detail/index.json";

import "../../../products.css";

type DetailRecord = {
  slug: string;
  model: string;
  name?: string;
  title?: string;
  description?: string;
  seo?: {
    title?: string;
    description?: string;
  };
  [key: string]: unknown;
};

type PageProps = {
  renderLocale?: TechnicalArticleLocale;
  params: Promise<{ slug: string }>;
};

const details =
  (detailsJson as DetailRecord[]).flatMap((detail) => {
    const connected =
      connectPublishedFittingProduct(detail);
    return connected ? [connected] : [];
  });

const ProductDetailView =
  ProductDetailClient as unknown as ComponentType<{ data: Record<string, unknown>; afterContent?: ReactNode }>;

export const dynamicParams = false;

function findDetail(slug: string) {
  const target = String(slug || "").trim().toLowerCase();

  return details.find(
    (item) =>
      String(item.slug || "").trim().toLowerCase() === target
  );
}

export function generateStaticParams() {
  return details.map((detail) => ({ slug: detail.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = findDetail(slug);

  if (!detail) {
    return {};
  }

  return {
    title:
      detail.seo?.title ||
      `${detail.model} ${detail.name || detail.title || "穿板倒刺接头"} | Foreach Technology`,
    description:
      detail.seo?.description ||
      detail.description,
    ...buildProductSocialMetadata({
      data: detail,
      title: detail.seo?.title || detail.model || detail.title || "Foreach Technology",
      description: detail.seo?.description || detail.description,
      canonicalUrl: `/products/fittings/bulkhead-barbed-fittings/${slug}/`,
    }),
  };
}

export default async function BulkheadBarbedFittingDetailPage({
  params,
  renderLocale = "zh-CN",
}: PageProps) {
  const { slug } = await params;
  const detail = findDetail(slug);

  if (!detail) {
    notFound();
  }

  return <ProductDetailView data={detail}
    afterContent={<FittingRelatedResources productTypeId="bulkhead-barbed-fittings" model={detail.model} locale={renderLocale} />} />;
}
