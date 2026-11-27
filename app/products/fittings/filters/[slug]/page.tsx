import FittingLocalizedSelectionContent from "@/components/products/detail/FittingLocalizedSelectionContent";
import type { GermanProductDetailContent } from "@/data/products/detail/product-detail-content.de";
import type {
  ComponentProps,
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
import { getFittingModelTopic } from "@/data/products/detail/fitting-product-copy.intl";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";
import {
  connectPublishedFittingProduct,
} from "@/data/products/selection/connectPublishedFittingProduct";
import detailsJson from "@/data/products/generated/fittings/filters/detail/index.json";

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
  germanDetail?: GermanProductDetailContent;
  localizedDetail?: ComponentProps<typeof ProductDetailClient>["localizedDetail"];
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
    germanDetail?: GermanProductDetailContent;
    localizedDetail?: ComponentProps<typeof ProductDetailClient>["localizedDetail"];
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

  const topic = getFittingModelTopic(detail, "zh");
  const topicTitle = topic ? `${detail.model} ${topic.title} | 恒永达` : undefined;
  const description = topic?.description ?? (detail.seo?.description || detail.description);
  return {
    title: topicTitle || detail.seo?.title ||
      `${detail.model} ${detail.name || detail.title || "过滤器"} | Foreach Technology`,
    description,
    ...buildProductSocialMetadata({
      data: detail,
      title: topicTitle || detail.seo?.title || detail.model || detail.title || "Foreach Technology",
      description,
      canonicalUrl: `/products/fittings/filters/${slug}/`,
    }),
  };
}

export default async function FilterDetailPage({
  params,
  renderLocale = "zh-CN",
  germanDetail,
  localizedDetail,
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
      germanDetail={germanDetail}
      localizedDetail={localizedDetail}
      data={renderLocale === "zh-CN" ? withRemainingFittingChineseData({ ...detail, productTypeId: "filters" }) : detail}
      customerCategoryMode="fitting-zh"
      customerCategoryContent={renderLocale === "zh-CN" ? {
        selection: <QuickConnectDetailContent data={{ ...detail, productTypeId: "filters" }} section="selection" variant="standalone-fitting" />,
      } : { selection: <FittingLocalizedSelectionContent data={{ ...detail, productTypeId: "filters" }} locale={renderLocale} germanDraft={!!germanDetail} contentLocale={localizedDetail?.locale} /> }}
    />
  );
}
