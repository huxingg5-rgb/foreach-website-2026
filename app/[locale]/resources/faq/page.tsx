import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { notFound } from "next/navigation";
import FaqClient from "@/components/resources/faq/FaqClient";
import { getFaqMetadata, getFaqPageData } from "@/data/resources/faq/faq-page";
import { isContactIntlLocale, CONTACT_INTL_LOCALES } from "@/data/contact-cooperation/contact.intl";
import { languageDraftsEnabled } from "@/lib/i18n/draft-languages";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return [...CONTACT_INTL_LOCALES, ...(languageDraftsEnabled ? ["de", "it", "hi"] : [])].map(locale => ({ locale }));
}
function isSupportedLocale(locale: string): locale is (typeof CONTACT_INTL_LOCALES)[number] | "de" | "it" | "hi" {
  return locale === "de" || locale === "it" || locale === "hi" ? languageDraftsEnabled : isContactIntlLocale(locale);
}
async function getPageMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  return getFaqMetadata(locale);
}
export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  return <FaqClient {...getFaqPageData(locale)} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/resources/faq/", getPageMetadata);
