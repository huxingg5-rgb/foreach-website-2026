import type { Metadata } from "next";
import { SITE_ORIGIN } from "@/lib/seo/site-url";
import { getFittingMainImageAlt, getDescriptiveFittingImageUrl } from "@/data/products/detail/fitting-image-description";

type ProductMetadataSource = Record<string, unknown>;

function toAbsoluteUrl(value: unknown) {
  const url = String(value || "").trim();

  if (!url) {
    return "";
  }

  return new URL(url, SITE_ORIGIN).toString();
}

function firstImageFromList(value: unknown) {
  if (!Array.isArray(value)) {
    return "";
  }

  for (const item of value) {
    const image =
      typeof item === "string"
        ? item
        : item && typeof item === "object"
          ? (item as Record<string, unknown>).src ||
            (item as Record<string, unknown>).url ||
            (item as Record<string, unknown>).image
          : "";

    if (String(image || "").trim()) {
      return String(image).trim();
    }
  }

  return "";
}

export function getProductSocialImage(data: ProductMetadataSource) {
  const directImage = [
    "mainImage",
    "image",
    "heroImage",
    "imageCard",
    "imagePath",
    "imageUrl",
    "coverImage",
  ]
    .map((key) => data[key])
    .find((value) => String(value || "").trim());
  const image =
    directImage ||
    firstImageFromList(data.additionalImages) ||
    firstImageFromList(data.images) ||
    firstImageFromList(data.galleryImages);

  return toAbsoluteUrl(getDescriptiveFittingImageUrl(String(image || "")));
}

export function buildProductSocialMetadata({
  data,
  title,
  description,
  canonicalUrl,
}: {
  data: ProductMetadataSource;
  title: string;
  description?: string;
  canonicalUrl?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const image = getProductSocialImage(data);

  if (!image) {
    return {};
  }

  const locale = new URL(canonicalUrl || "/", SITE_ORIGIN).pathname.match(/^\/(en|es|fr|ko|ru)(?:\/|$)/)?.[1] || "zh";
  const imageAlt = String(
    getFittingMainImageAlt(data, locale) ||
      data.imageAltEn ||
      data.mainImageAlt ||
      data.imageAlt ||
      data.alt ||
      title,
  ).trim();

  return {
    openGraph: {
      type: "website",
      title,
      ...(description ? { description } : {}),
      ...(canonicalUrl ? { url: toAbsoluteUrl(canonicalUrl) } : {}),
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      ...(description ? { description } : {}),
      images: [image],
    },
  };
}
