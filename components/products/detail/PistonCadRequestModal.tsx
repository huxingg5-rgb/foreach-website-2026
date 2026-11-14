"use client";

import type { CadDrawingType } from "@/data/products/detail/drawing-requirements";
import CadRequestModal from "./CadRequestModal";
import { createEaPumpInquiryConfiguration, eaPumpInquiryRows, getEaPumpInquiryDefaults, getPistonInquirySeries } from "@/data/products/configurator/ea-pump-inquiry";
import type { SavedEaPumpConfiguration } from "@/data/products/configurator/ea-pump-inquiry-configurations";
import { getCadRequestCopy } from "@/data/products/detail/cad-request";
import type { ProductDetailResourceLocale } from "@/data/products/detail/product-detail-resources";

type Props = {
  locale: ProductDetailResourceLocale; productSlug: string;
  savedConfigurations: SavedEaPumpConfiguration[]; initialConfigurationId: string | null; onDrawingTypesChange?: (id: string, value: CadDrawingType[]) => void; onClose: () => void;
};
export default function PistonCadRequestModal({ locale, productSlug, savedConfigurations, initialConfigurationId, onDrawingTypesChange, onClose }: Props) {
  const fallback = createEaPumpInquiryConfiguration(getEaPumpInquiryDefaults(productSlug));
  const series = getPistonInquirySeries(fallback.choice);
  const configurations = savedConfigurations.map(item => ({ id: item.id, drawingTypes: item.drawingTypes,
    model: eaPumpInquiryRows(item.configuration, locale)[0][1], productSeries: getPistonInquirySeries(item.configuration.choice),
    rows: [...eaPumpInquiryRows(item.configuration, locale).slice(1), [getCadRequestCopy(locale).quantity, String(item.quantity)] as [string, string]],
  }));
  return <CadRequestModal locale={locale} productName={series} productSeries={series}
    productModel={eaPumpInquiryRows(fallback, locale)[0][1]}
    referenceConfiguration={{ id: "reference", model: eaPumpInquiryRows(fallback, locale)[0][1],
      rows: eaPumpInquiryRows(fallback, locale).slice(1), productSeries: series }}
    configurations={configurations} initialConfigurationId={initialConfigurationId} onDrawingTypesChange={onDrawingTypesChange} onClose={onClose} />;
}
