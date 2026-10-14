"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { attachArticleSource, useArticleReturnHref } from "./articleNavigation";

export default function ArticleBackLink({ href, className, children }: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const returnHref = useArticleReturnHref(href);
  useEffect(() => attachArticleSource(href), [href]);
  return <Link href={returnHref} scroll={returnHref === href} className={className} data-article-back-link>{children}</Link>;
}
