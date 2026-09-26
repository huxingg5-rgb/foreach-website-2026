"use client";

import { useEffect, useState, type ReactNode } from "react";
import ApplicationEnglishClient from "@/components/applications/ApplicationEnglishClient";
import type { EnglishApplicationPageData } from "@/data/applications/application-english";

export default function AnalyticalInstrumentsQueryView({ data, children }: {
  data: EnglishApplicationPageData;
  children: ReactNode;
}) {
  const [showSelection, setShowSelection] = useState(false);
  useEffect(() => {
    const update = () => {
      const key = new URLSearchParams(window.location.search).get(data.queryKey);
      setShowSelection(data.groups.some((group) => group.key === key));
    };
    update();
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, [data]);
  return showSelection ? <ApplicationEnglishClient data={data} /> : children;
}
