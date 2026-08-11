"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

type IvdApplicationSearchParamsSyncProps = {
  onChange: (instrumentKey?: string) => void;
};

export default function IvdApplicationSearchParamsSync({
  onChange,
}: IvdApplicationSearchParamsSyncProps) {
  const searchParams = useSearchParams();
  const instrumentKey = searchParams.get("instrument") || undefined;

  useEffect(() => {
    onChange(instrumentKey);
  }, [instrumentKey, onChange]);

  return null;
}
