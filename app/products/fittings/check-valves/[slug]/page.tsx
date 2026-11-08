import FittingLocalizedSelectionContent from "@/components/products/detail/FittingLocalizedSelectionContent";
import type {
  ComponentType,
  ReactNode,
} from "react";

import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import QuickConnectDetailContent from "@/components/products/detail/QuickConnectDetailContent";
import { withRemainingFittingChineseData } from "@/data/products/detail/remaining-fitting-detail.zh";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";
import {
  connectPublishedFittingProduct,
} from "@/data/products/selection/connectPublishedFittingProduct";
import detailsJson from "@/data/products/generated/fittings/check-valves/detail/index.json";

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
  params: Promise<{
    slug: string;
  }>;
};

const details =
  (detailsJson as DetailRecord[]).flatMap((detail) => {
    const connected =
      connectPublishedFittingProduct(detail);
    return connected ? [connected] : [];
  });

const ProductDetailView =
  ProductDetailClient as unknown as ComponentType<{
    data: any;
    customerCategoryMode?: "fitting-zh";
    customerCategoryContent?: Partial<Record<"selection" | "delivery", ReactNode>>;
  }>;

export const dynamicParams =
  false;

function normalizeSegment(
  value: string
) {
  return String(
    value || ""
  )
    .trim()
    .toLowerCase();
}

function findDetail(
  slug: string
) {
  const target =
    normalizeSegment(
      slug
    );

  return details.find(
    (item) =>
      normalizeSegment(
        item.slug
      ) === target
  );
}

export function generateStaticParams() {
  return details.map(
    (detail) => ({
      slug:
        detail.slug,
    })
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {
    slug,
  } = await params;

  const detail =
    findDetail(
      slug
    );

  if (!detail) {
    return {};
  }

  return {
    title:
      detail.seo?.title ||
      `${detail.model} ${detail.name || detail.title || "单向阀"} | Foreach Technology`,

    description:
      detail.seo?.description ||
      detail.description,
    ...buildProductSocialMetadata({
      data: detail,
      title: detail.seo?.title || detail.model || detail.title || "Foreach Technology",
      description: detail.seo?.description || detail.description,
      canonicalUrl: `/products/fittings/check-valves/${slug}/`,
    }),
  };
}

export default async function CheckValveDetailPage({
  params,
  renderLocale = "zh-CN",
}: PageProps) {
  const {
    slug,
  } = await params;

  const detail =
    findDetail(
      slug
    );

  if (!detail) {
    notFound();
  }

  return (
    <ProductDetailView
      data={renderLocale === "zh-CN" ? withRemainingFittingChineseData({ ...detail, productTypeId: "check-valves" }) : detail}
      customerCategoryMode="fitting-zh"
      customerCategoryContent={renderLocale === "zh-CN" ? {
        selection: <QuickConnectDetailContent data={{ ...detail, productTypeId: "check-valves" }} section="selection" variant="standalone-fitting" />,
      } : { selection: <FittingLocalizedSelectionContent data={{ ...detail, productTypeId: "check-valves" }} locale={renderLocale} /> }}
    />
  );
}
