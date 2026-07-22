import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PrivacyPolicyPage from "@/components/privacy/PrivacyPolicyPage";

const PRIVACY_POLICY_LOCALES = [
  "en",
  "es",
  "fr",
  "ko",
  "ru",
] as const;

type PrivacyPolicyLocale =
  (typeof PRIVACY_POLICY_LOCALES)[number];

type LocalePrivacyPolicyPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const metadataMap: Record<
  PrivacyPolicyLocale,
  {
    title: string;
    description: string;
  }
> = {
  en: {
    title: "Privacy Policy | FOREACH Technology",
    description:
      "Learn how FOREACH handles inquiries, cookies, Google Analytics and website usage information.",
  },
  es: {
    title: "Política de privacidad | FOREACH Technology",
    description:
      "Información sobre consultas, cookies, Google Analytics y datos de uso del sitio web de FOREACH.",
  },
  fr: {
    title: "Politique de confidentialité | FOREACH Technology",
    description:
      "Découvrez comment FOREACH traite les demandes, les cookies, Google Analytics et les données d’utilisation.",
  },
  ko: {
    title: "개인정보 처리방침 | FOREACH Technology",
    description:
      "FOREACH의 문의 정보, 쿠키, Google Analytics 및 웹사이트 이용 정보 처리 방식을 확인하십시오.",
  },
  ru: {
    title: "Политика конфиденциальности | FOREACH Technology",
    description:
      "Узнайте, как FOREACH обрабатывает запросы, Cookie, Google Analytics и данные об использовании сайта.",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return PRIVACY_POLICY_LOCALES.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: LocalePrivacyPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isPrivacyPolicyLocale(locale)) {
    return {};
  }

  return metadataMap[locale];
}

export default async function LocalePrivacyPolicyPage({
  params,
}: LocalePrivacyPolicyPageProps) {
  const { locale } = await params;

  if (!isPrivacyPolicyLocale(locale)) {
    notFound();
  }

  return <PrivacyPolicyPage locale={locale} />;
}

function isPrivacyPolicyLocale(
  locale: string,
): locale is PrivacyPolicyLocale {
  return PRIVACY_POLICY_LOCALES.includes(
    locale as PrivacyPolicyLocale,
  );
}