import { Suspense } from "react";

import SiteSearchClient from "@/components/search/SiteSearchClient";

const SEARCH_LOCALES = ["en", "es", "fr", "ko", "ru"];

export function generateStaticParams() {
  return SEARCH_LOCALES.map((locale) => ({ locale }));
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
