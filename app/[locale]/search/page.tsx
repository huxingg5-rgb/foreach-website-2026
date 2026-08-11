import { Suspense } from "react";

import type { Metadata } from "next";

import SiteSearchClient from "@/components/search/SiteSearchClient";

const SEARCH_LOCALES = ["en", "es", "fr", "ko", "ru"];

export function generateStaticParams() {
  return SEARCH_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!SEARCH_LOCALES.includes(locale)) {
    return {};
  }

  return {
    title: "Search | FOREACH",
    description:
      "Search FOREACH products, applications, technical resources, and company information.",
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function LocaleSearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <SiteSearchClient locale={locale} />
    </Suspense>
  );
}
