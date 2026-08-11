"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

type ProductSelectionSearchParamsSyncProps = {
  onChange: (categoryId?: string, productTypeId?: string) => void;
};

export default function ProductSelectionSearchParamsSync({
  onChange,
}: ProductSelectionSearchParamsSyncProps) {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") || undefined;
  const productTypeId = searchParams.get("productType") || undefined;

  useEffect(() => {
    onChange(categoryId, productTypeId);
  }, [categoryId, onChange, productTypeId]);

  return null;
}
