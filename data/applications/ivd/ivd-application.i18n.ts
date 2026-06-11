/* =========================================================
   ivd-application.i18n.ts
   恒永达官网｜IVD 应用领域页外语数据

   说明：
   1. 当前先做外语页面可运行占位
   2. 仪器、液路和产品详细文案暂时复用中文数据
   3. 后续正式翻译时，只需要替换这里的数据
   4. 路径保持 /en、/es、/fr、/ko、/ru，不生成 /zh-CN
========================================================= */

import type { IvdApplicationPageData, IvdLocale } from "./ivd-application.types";
import { ivdApplicationZhData } from "./ivd-application.zh";

function createIntlData(locale: Exclude<IvdLocale, "zh-CN">): IvdApplicationPageData {
  const prefix = `/${locale}`;

  return {
    ...ivdApplicationZhData,
    locale,
    breadcrumb: [
      { label: "Home", href: prefix },
      { label: "Applications" },
      { label: "IVD" },
    ],
    hero: {
      eyebrow: "IVD APPLICATION",
      title: "IVD Fluidic System Solutions",
      description:
        "Fluidic component support for biochemistry, immunoassay, hematology, coagulation, molecular diagnostics and PCR instruments.",
      backgroundImage: "/images/applications/ivd/ivd-hero-bg-1920x800-v001.webp",
    },
    instrumentSection: {
      eyebrow: "INSTRUMENT TYPES",
      title: "Understand fluidic requirements by instrument type",
      description:
        "Select an instrument type to view related fluidic modules and product capabilities. Detailed multilingual technical copy will be refined later.",
    },
    moduleSection: {
      eyebrow: "FLUIDIC MODULES",
      title: "Key fluidic modules and product capabilities",
      description:
        "Select a fluidic module to view related products, parameters, advantages and the problems they help solve.",
    },
    ctaBanner: {
      eyebrow: "ENGINEERING SUPPORT",
      title: "Need support for fluidic component selection?",
      description:
        "Share your instrument type, fluidic position, flow rate, pressure, medium and interface requirements with us.",
      primaryText: "View Products",
      primaryHref: `${prefix}/products`,
      secondaryText: "Contact Engineers",
      secondaryHref: `${prefix}/contact`,
    },
  };
}

export const ivdApplicationI18nData: Partial<Record<IvdLocale, IvdApplicationPageData>> = {
  en: createIntlData("en"),
  es: createIntlData("es"),
  fr: createIntlData("fr"),
  ko: createIntlData("ko"),
  ru: createIntlData("ru"),
};