"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { getDraftHrefForEnglish, getDraftLinkLocaleFromPath } from "@/lib/i18n/draft-languages";

export default function DraftLink({ href, ...props }: ComponentProps<typeof Link>) {
  const draftLocale = getDraftLinkLocaleFromPath(usePathname());
  const targetLocale = draftLocale === "de" && props.hrefLang === "en" ? undefined : draftLocale;
  return <Link {...props} href={typeof href === "string" ? getDraftHrefForEnglish(href, targetLocale) : href} />;
}
