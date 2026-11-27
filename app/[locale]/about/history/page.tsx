import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { languageDraftsEnabled } from "@/lib/i18n/draft-languages";
import HistoryPageContent from "@/components/about/HistoryPageContent";
import { NON_DEFAULT_HISTORY_LOCALES, getHistoryPageText, isSupportedHistoryLocale } from "@/data/historyMilestones";
import { getHistoryMetadata } from "@/lib/seo/history-metadata";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [
    ...NON_DEFAULT_HISTORY_LOCALES.map(locale => ({ locale })),
    ...(languageDraftsEnabled ? [{ locale: "de" }, { locale: "it" }, { locale: "hi" }] : []),
  ];
}

async function getPageMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (languageDraftsEnabled && (locale === "de" || locale === "it" || locale === "hi")) return getHistoryMetadata(locale);
  if (!isSupportedHistoryLocale(locale) || locale === "zh-CN") notFound();
  return getHistoryMetadata(locale);
}

export default async function AboutHistoryLocalePage({ params }: PageProps) {
  const { locale } = await params;
  if (languageDraftsEnabled && (locale === "de" || locale === "it" || locale === "hi")) return <HistoryPageContent locale={locale} />;
  if (!isSupportedHistoryLocale(locale) || locale === "zh-CN") notFound();
  return <HistoryPageContent locale={locale} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/about/history/", getPageMetadata);
