import type { SelectionLocale } from "../../selection/product-selection.types";
import type { ProductApplicationAreaLink } from "../product-detail.types";

// Match the sampling, reagent handling and wash-path tasks described for SV10.
const areas = ["ivd", "lab-automation", "analytical-instruments"] as const;
const copy: Record<SelectionLocale, {title: string; labels: [string, string, string]}> = {
  zh: { title: "应用领域：", labels: ["IVD 体外诊断", "实验室自动化", "分析仪器"] },
  en: { title: "Application Areas:", labels: ["IVD", "Laboratory Automation", "Analytical Instruments"] },
  es: { title: "Áreas de aplicación:", labels: ["Diagnóstico in vitro", "Automatización de laboratorio", "Instrumentación analítica"] },
  fr: { title: "Domaines d’application :", labels: ["Diagnostic in vitro", "Automatisation de laboratoire", "Instruments analytiques"] },
  ko: { title: "적용 분야:", labels: ["체외진단", "실험실 자동화", "분석 기기"] },
  ru: { title: "Области применения:", labels: ["Диагностика in vitro", "Лабораторная автоматизация", "Аналитические приборы"] },
};

export function getSolenoidApplicationAreas(locale: SelectionLocale): {applicationAreasTitle: string; applicationAreas: ProductApplicationAreaLink[]} {
  const prefix = locale === "zh" ? "" : `/${locale}`;
  return {
    applicationAreasTitle: copy[locale].title,
    applicationAreas: areas.map((area, i) => ({label: copy[locale].labels[i], href: `${prefix}/applications/${area}/`})),
  };
}
