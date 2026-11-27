"use client";

import type { CadDrawingType } from "@/data/products/detail/drawing-requirements";
import CadRequestModal from "./CadRequestModal";
import { createEaPumpInquiryConfiguration, eaPumpInquiryRows, getEaPumpInquiryDefaults, getPistonInquirySeries } from "@/data/products/configurator/ea-pump-inquiry";
import type { SavedEaPumpConfiguration } from "@/data/products/configurator/ea-pump-inquiry-configurations";
import { getCadRequestCopy } from "@/data/products/detail/cad-request";
import type { ProductDetailResourceCopyLocale, ProductDetailResourceLocale } from "@/data/products/detail/product-detail-resources";

type Props = {
  locale: ProductDetailResourceLocale; copyLocale?: ProductDetailResourceCopyLocale; productSlug: string;
  savedConfigurations: SavedEaPumpConfiguration[]; initialConfigurationId: string | null; onDrawingTypesChange?: (id: string, value: CadDrawingType[]) => void; onClose: () => void;
};
export default function PistonCadRequestModal({ locale, copyLocale = locale, productSlug, savedConfigurations, initialConfigurationId, onDrawingTypesChange, onClose }: Props) {
  const fallback = createEaPumpInquiryConfiguration(getEaPumpInquiryDefaults(productSlug));
  const series = getPistonInquirySeries(fallback.choice);
  const presentationLocale = copyLocale === "de" ? "de" : locale;
  const configurations = savedConfigurations.map(item => ({ id: item.id, drawingTypes: item.drawingTypes,
    model: eaPumpInquiryRows(item.configuration, presentationLocale)[0][1], productSeries: getPistonInquirySeries(item.configuration.choice),
    rows: [...eaPumpInquiryRows(item.configuration, presentationLocale).slice(1), [getCadRequestCopy(copyLocale).quantity, String(item.quantity)] as [string, string]],
  }));
  return <CadRequestModal locale={copyLocale} productName={series} productSeries={series}
    productModel={eaPumpInquiryRows(fallback, presentationLocale)[0][1]}
    referenceConfiguration={{ id: "reference", model: eaPumpInquiryRows(fallback, presentationLocale)[0][1],
      rows: eaPumpInquiryRows(fallback, presentationLocale).slice(1), productSeries: series }}
    configurations={configurations} initialConfigurationId={initialConfigurationId} onDrawingTypesChange={onDrawingTypesChange} onClose={onClose} />;
}
