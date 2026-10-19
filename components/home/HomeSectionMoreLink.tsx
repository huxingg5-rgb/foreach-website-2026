import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./HomeSectionMoreLink.module.css";

export default function HomeSectionMoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} prefetch={false} className={styles.link}>
      {children} <span className={styles.arrow} aria-hidden="true">&gt;&gt;</span>
    </Link>
  );
}
