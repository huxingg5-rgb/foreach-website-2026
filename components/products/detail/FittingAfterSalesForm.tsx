"use client";

import { useMemo } from "react";
import ContactFormSection from "@/components/contact/ContactFormSection";
import { getFittingAfterSalesFormConfig } from "@/data/products/detail/fitting-after-sales.intl";
import "@/app/contact/contact.css";
import styles from "./FittingDeliveryZh.module.css";

export default function FittingAfterSalesForm({ productModel, locale = "zh" }: { productModel: string; locale?: string }) {
  const { data, initialValues } = useMemo(() => getFittingAfterSalesFormConfig(locale, productModel), [locale, productModel]);
  return (
    <div className={`${styles.afterSalesForm} contact-page`} data-fitting-after-sales-form>
      <ContactFormSection
        id="fitting-after-sales"
        data={data}
        showHeading={false}
        presetRequestType={initialValues.requestType}
        formProps={{
          idPrefix: "fitting-after-sales",
          initialValues,
          variant: "modal",
          analyticsSourceSection: "fitting_after_sales",
        }}
      />
    </div>
  );
}
