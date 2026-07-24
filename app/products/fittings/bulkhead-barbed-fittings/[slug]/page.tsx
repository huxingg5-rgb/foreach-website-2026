import type { ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
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
  params: Promise<{ slug: string }>;
};

const details =
  (detailsJson as DetailRecord[]).flatMap((detail) => {
    const connected =
      connectPublishedFittingProduct(detail);
    return connected ? [connected] : [];
  });

const ProductDetailView =
  ProductDetailClient as unknown as ComponentType<{ data: any }>;

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
      `${detail.model} ${detail.name || detail.title || "穿板倒刺接头"} | FOREACH`,
    description:
      detail.seo?.description ||
      detail.description,
  };
}

export default async function BulkheadBarbedFittingDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const detail = findDetail(slug);

  if (!detail) {
    notFound();
  }

  return <ProductDetailView data={detail} />;
}
