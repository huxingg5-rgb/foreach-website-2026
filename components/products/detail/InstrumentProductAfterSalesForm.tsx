"use client";

import { useMemo } from "react";
import ContactFormSection from "@/components/contact/ContactFormSection";
import { getFittingAfterSalesFormConfig } from "@/data/products/detail/fitting-after-sales.intl";
import "@/app/contact/contact.css";
import styles from "./FittingDeliveryZh.module.css";

export default function InstrumentProductAfterSalesForm({ productModel, productType, locale = "zh" }: { productModel: string; productType: string; locale?: string }) {
  const config = useMemo(() => {
    const current = getFittingAfterSalesFormConfig(locale, productModel);
    const groups = getFittingAfterSalesFormConfig("zh", productModel).data.form.productGroups;
    const groupIndex = groups.findIndex(group => group.options.includes(productType));
    const productIndex = groupIndex < 0 ? -1 : groups[groupIndex].options.indexOf(productType);
    const localizedType = productIndex < 0 ? productType : current.data.form.productGroups[groupIndex].options[productIndex];
    return { ...current, initialValues: { ...current.initialValues, productType: localizedType } };
  }, [productModel, productType, locale]);
  return <div className={`${styles.afterSalesForm} contact-page`} data-instrument-after-sales-form>
    <ContactFormSection id="instrument-product-after-sales" data={config.data} showHeading={false}
      presetRequestType={config.initialValues.requestType}
      formProps={{ idPrefix: "instrument-product-after-sales", initialValues: config.initialValues, variant: "modal", analyticsSourceSection: "instrument_product_after_sales" }} />
  </div>;
}
