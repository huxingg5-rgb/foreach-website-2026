"use client";

import { useMemo } from "react";
import ContactFormSection from "@/components/contact/ContactFormSection";
import { getFittingAfterSalesFormConfig } from "@/data/products/detail/fitting-after-sales.intl";
import { getDiaphragmPumpGuideCopy } from "@/data/products/detail/diaphragm-pump-guide.intl";
import "@/app/contact/contact.css";
import styles from "@/components/products/detail/FittingDeliveryZh.module.css";

export default function DiaphragmPumpAfterSalesForm({ locale, productModel }: { locale: string; productModel: string }) {
  const { data, initialValues } = useMemo(() => {
    const config = getFittingAfterSalesFormConfig(locale, productModel);
    const sourceGroups = getFittingAfterSalesFormConfig("zh", productModel).data.form.productGroups;
    const groupIndex = sourceGroups.findIndex(group => group.options.includes("隔膜泵"));
    const productIndex = sourceGroups[groupIndex].options.indexOf("隔膜泵");
    return {
      data: { ...config.data, guide: { ...config.data.guide, items: getDiaphragmPumpGuideCopy(locale).formGuide.map(([title, description], index) => ({ number: String(index + 1).padStart(2, "0"), title, description })) } },
      initialValues: { ...config.initialValues, productType: config.data.form.productGroups[groupIndex].options[productIndex] },
    };
  }, [locale, productModel]);
  return <div className={`${styles.afterSalesForm} contact-page`} data-diaphragm-after-sales-form>
    <ContactFormSection id="diaphragm-pump-after-sales" data={data} showHeading={false} presetRequestType={initialValues.requestType}
      formProps={{ idPrefix: "diaphragm-pump-after-sales", initialValues, variant: "modal", analyticsSourceSection: "diaphragm_pump_after_sales" }} />
  </div>;
}
