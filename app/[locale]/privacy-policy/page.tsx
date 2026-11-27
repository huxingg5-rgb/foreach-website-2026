import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PrivacyPolicyPage from "@/components/privacy/PrivacyPolicyPage";
import { languageDraftsEnabled } from "@/lib/i18n/draft-languages";
import { buildDraftPageMetadata } from "@/lib/seo/international-page-metadata";

const PRIVACY_POLICY_LOCALES = [
  "en",
  "es",
  "fr",
  "ko",
  "ru",
] as const;

type PrivacyPolicyLocale =
  (typeof PRIVACY_POLICY_LOCALES)[number] | "de" | "it" | "hi";

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
  hi: {
    title: "गोपनीयता नीति | FOREACH",
    description: "जानें कि FOREACH वेबसाइट के इस्तेमाल पर जानकारी कैसे जुटाती, इस्तेमाल करती, रखती और सुरक्षित करती है।",
  },
  it: {
    title: "Informativa sulla privacy | FOREACH",
    description: "Scopri come Foreach tratta le richieste, i cookie, i dati di Google Analytics e le informazioni sull’uso del sito.",
  },
  de: {
    title: "Datenschutzerklärung | FOREACH",
    description:
      "Erfahren Sie, wie FOREACH Anfragen, Cookies, Google Analytics und Nutzungsinformationen der Website verarbeitet.",
  },
  en: {
    title: "Privacy Policy | Foreach Technology",
    description:
      "Learn how Foreach handles inquiries, cookies, Google Analytics and website usage information.",
  },
  es: {
    title: "Política de privacidad | Foreach Technology",
    description:
      "Información sobre consultas, cookies, Google Analytics y datos de uso del sitio web de Foreach.",
  },
  fr: {
    title: "Politique de confidentialité | Foreach Technology",
    description:
      "Découvrez comment Foreach traite les demandes, les cookies, Google Analytics et les données d’utilisation.",
  },
  ko: {
    title: "개인정보 처리방침 | Foreach Technology",
    description:
      "Foreach의 문의 정보, 쿠키, Google Analytics 및 웹사이트 이용 정보 처리 방식을 확인하십시오.",
  },
  ru: {
    title: "Политика конфиденциальности | Foreach Technology",
    description:
      "Узнайте, как Foreach обрабатывает запросы, Cookie, Google Analytics и данные об использовании сайта.",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [...PRIVACY_POLICY_LOCALES, ...(languageDraftsEnabled ? ["de", "it", "hi"] : [])].map((locale) => ({
    locale,
  }));
}

async function getPageMetadata({
  params,
}: LocalePrivacyPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isPrivacyPolicyLocale(locale)) {
    return {};
  }

  if (locale === "de" || locale === "it" || locale === "hi") {
    return buildDraftPageMetadata({ locale, canonical: `/${locale}/privacy-policy/`, ...metadataMap[locale] });
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
  if (locale === "de" || locale === "it" || locale === "hi") return languageDraftsEnabled;
  return PRIVACY_POLICY_LOCALES.includes(
    locale as (typeof PRIVACY_POLICY_LOCALES)[number],
  );
}

export const generateMetadata = withPublishedTranslationMetadata("/privacy-policy/", getPageMetadata);
