import { notFound } from "next/navigation";
import FaqClient from "@/components/resources/faq/FaqClient";
import { getFaqMetadata, getFaqPageData } from "@/data/resources/faq/faq-page";
import { isContactIntlLocale, CONTACT_INTL_LOCALES } from "@/data/contact-cooperation/contact.intl";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return CONTACT_INTL_LOCALES.map(locale => ({ locale })); }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isContactIntlLocale(locale)) notFound();
  return getFaqMetadata(locale);
}
export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  if (!isContactIntlLocale(locale)) notFound();
  return <FaqClient {...getFaqPageData(locale)} />;
}
