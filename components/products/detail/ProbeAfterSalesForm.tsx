"use client";

import { useMemo } from "react";
import ContactFormSection from "@/components/contact/ContactFormSection";
import { getFittingAfterSalesFormConfig } from "@/data/products/detail/fitting-after-sales.intl";
import { probeText } from "@/data/products/detail/probe-guide.intl";
import "@/app/contact/contact.css";
import formStyles from "./FittingDeliveryZh.module.css";

export default function ProbeAfterSalesForm({ productName, locale = "zh" }: { productName: string; locale?: string }) {
  const { data, initialValues } = useMemo(() => {
    const config = getFittingAfterSalesFormConfig(locale, productName);
    const t = (text: string) => probeText(text, locale);
    return {
      ...config,
      data: {
        ...config.data,
        guide: {
          ...config.data.guide,
          items: [
            { number: "01", title: t("产品与图纸版本"), description: t("已带入当前产品类型，可补充实际料号、图纸版本、订单号、批次或包装标签照片。") },
            { number: "02", title: t("异常现象"), description: t("说明发生异常的部位、动作和频率，如吸液异常、穿刺阻力、清洗残留、桨体摆动或表面损伤。") },
            { number: "03", title: t("使用与清洗条件"), description: t("补充实际介质、清洗液、容器或耗材、安装方式及相关运动参数。") },
            { number: "04", title: t("照片与测试记录"), description: t("可附产品标签、安装全貌、异常部位照片，以及已做过的检查和对照测试。") },
          ],
          note: t("先描述主要现象，其他资料可在后续对接中补充；寄回产品前请先联系售后。"),
        },
      },
    };
  }, [productName, locale]);

  return <div className={`${formStyles.afterSalesForm} contact-page`} data-probe-after-sales-form>
    <ContactFormSection id="probe-after-sales" data={data} showHeading={false}
      presetRequestType={initialValues.requestType}
      formProps={{ idPrefix: "probe-after-sales", initialValues, variant: "modal", analyticsSourceSection: "probe_after_sales" }} />
  </div>;
}
