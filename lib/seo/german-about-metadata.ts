import type { Metadata } from "next";
import type { DraftLocale } from "@/lib/i18n/draft-language-identifiers";
import { buildDraftPageMetadata } from "./international-page-metadata";

export function draftAboutMetadata(locale: DraftLocale, path: string, title: string, description: string): Metadata {
  return {
    ...buildDraftPageMetadata({ locale, canonical: `/${locale}${path}`, title, description }),
    robots: { index: false, follow: true },
  };
}
