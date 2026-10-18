"use client";

import { useMemo, type ReactNode } from "react";
import EnglishReviewQueryBridge from "@/components/applications/EnglishReviewQueryBridge";
import { applicationArticleHref, applicationArticleSection } from "@/data/applications/application-article-links";
import type { EnglishApplicationPageData } from "@/data/applications/application-english";

export default function AnalyticalInstrumentsQueryView({ data, children }: {
  data: EnglishApplicationPageData;
  children: ReactNode;
}) {
  const targets = useMemo(() => Object.fromEntries(data.groups.map(group => [group.key,{
    href:applicationArticleHref('analytical-instruments',group.key),
    modules:Object.fromEntries(group.modules.flatMap(module=>{
      const section=applicationArticleSection('analytical-instruments',group.key,module.key);
      return section ? [[module.key,section]] : [];
    })),
  }])),[data.groups]);
  return <><EnglishReviewQueryBridge targets={targets} />{children}</>;
}
