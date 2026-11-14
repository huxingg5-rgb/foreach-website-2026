"use client";

import { pistonText } from "@/data/products/detail/piston-pump-ui.intl";
import { useMemo } from "react";
import ContactFormSection from "@/components/contact/ContactFormSection";
import { getFittingAfterSalesFormConfig } from "@/data/products/detail/fitting-after-sales.intl";
import "@/app/contact/contact.css";
import styles from "./FittingDeliveryZh.module.css";

export default function EaPumpAfterSalesForm({ productModel, locale = "zh" }: { productModel: string; locale?: string }) {
  const { data, initialValues } = useMemo(() => {
    const config = getFittingAfterSalesFormConfig(locale, productModel);
    const sourceGroups = getFittingAfterSalesFormConfig("zh", productModel).data.form.productGroups;
    const groupIndex = sourceGroups.findIndex(group => group.options.includes("陶瓷柱塞泵"));
    const productIndex = sourceGroups[groupIndex].options.indexOf("陶瓷柱塞泵");
    return {
      data: {
        ...config.data,
        guide: {
          ...config.data.guide,
          items: [
            { number: "01", title: "产品与批次", description: "核对已带入的型号，可补充序列号、批次号或产品标签照片。" },
            { number: "02", title: "加液与运动现象", description: "说明偏量、气泡、渗漏、异响或找零异常，以及出现的时机和频率。" },
            { number: "03", title: "液路与驱动条件", description: "补充介质、目标液量、温度、背压、阀与管路配置，以及驱动电流、细分和速度设置。" },
            { number: "04", title: "照片与测试记录", description: "可附液路图、标签和异常部位照片，以及逐次加液数据与已做过的检查。" },
          ].map(item => ({ ...item, title: pistonText(item.title, locale), description: pistonText(item.description, locale) })),
        },
      },
      initialValues: { ...config.initialValues, productType: config.data.form.productGroups[groupIndex].options[productIndex] },
    };
  }, [productModel, locale]);

  return <div className={`${styles.afterSalesForm} contact-page`} data-ea-pump-after-sales-form>
    <ContactFormSection id="ea-pump-after-sales" data={data} showHeading={false}
      presetRequestType={initialValues.requestType}
      formProps={{ idPrefix: "ea-pump-after-sales", initialValues, variant: "modal", analyticsSourceSection: "ea_pump_after_sales" }} />
  </div>;
}
