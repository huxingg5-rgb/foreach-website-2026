"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export type InstallationGuideSearchParamsSnapshot = {
  relationKey: string;
  guideId: string;
  queryString: string;
};

type InstallationGuideSearchParamsSyncProps = {
  onChange: (snapshot: InstallationGuideSearchParamsSnapshot) => void;
};

export default function InstallationGuideSearchParamsSync({
  onChange,
}: InstallationGuideSearchParamsSyncProps) {
  const searchParams = useSearchParams();
  const relationKey = searchParams.get("relationKey") ?? "";
  const guideId = searchParams.get("guide")?.trim() ?? "";
  const queryString = searchParams.toString();

  useEffect(() => {
    onChange({
      relationKey,
      guideId,
      queryString,
    });
  }, [guideId, onChange, queryString, relationKey]);

  return null;
}
