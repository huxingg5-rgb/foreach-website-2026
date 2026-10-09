import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HistoryPageContent from "@/components/about/HistoryPageContent";
import { NON_DEFAULT_HISTORY_LOCALES, isSupportedHistoryLocale } from "@/data/historyMilestones";
import { getHistoryMetadata } from "@/lib/seo/history-metadata";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return NON_DEFAULT_HISTORY_LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedHistoryLocale(locale) || locale === "zh-CN") notFound();
  return getHistoryMetadata(locale);
}

export default async function AboutHistoryLocalePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isSupportedHistoryLocale(locale) || locale === "zh-CN") notFound();
  return <HistoryPageContent locale={locale} />;
}
