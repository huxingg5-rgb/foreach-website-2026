import DraftLink from "@/components/i18n/DraftLink";
import NativeLink from "next/link";
import { hindiEnglishFallbackSuffix, italianEnglishFallbackSuffix } from "@/lib/i18n/draft-languages";
import type { ReactNode } from "react";
import styles from "./HomeSectionMoreLink.module.css";

export default function HomeSectionMoreLink({ href, children, italian = false, hindi = false }: { href: string; children: ReactNode; italian?: boolean; hindi?: boolean }) {
  const Link = italian || hindi ? NativeLink : DraftLink;
  const englishFallback = (italian || hindi) && href.startsWith("/en/");
  return (
    <Link href={href} hrefLang={englishFallback ? "en" : undefined} prefetch={false} className={styles.link}>
      {children}{englishFallback ? italianEnglishFallbackSuffix : null} <span className={styles.arrow} aria-hidden="true">&gt;&gt;</span>
    </Link>
  );
}
