"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

type ProductSelectionSearchParamsSyncProps = {
  onChange: (categoryId?: string, productTypeId?: string, fittingStructure?: string) => void;
};

export default function ProductSelectionSearchParamsSync({
  onChange,
}: ProductSelectionSearchParamsSyncProps) {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") || undefined;
  const productTypeId = searchParams.get("productType") || undefined;
  const fittingStructure = searchParams.get("structure") || undefined;

  useEffect(() => {
    onChange(categoryId, productTypeId, fittingStructure);
  }, [categoryId, onChange, productTypeId, fittingStructure]);

  return null;
}
