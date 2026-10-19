import type { Metadata } from "next";
import type { InstallationGuideLocale } from "@/data/resources/installation-guide/installation-guide.types";
import { getInstallationGuidePageHref, guidePaginationCopy } from "@/data/resources/installation-guide/installation-guide-pagination";
import { getCanonicalUrl } from "./site-url";

const metadataCopy: Record<InstallationGuideLocale, { title: string; description: string }> = {
  "zh-CN": { title: "使用教程｜Foreach Technology 恒永达", description: "Foreach 产品使用、安装、调试与操作教程。" },
  en: { title: "Installation Guide｜Foreach Technology", description: "View Foreach product installation, setup, calibration and troubleshooting guides." },
  es: { title: "Guías de instalación｜Foreach Technology", description: "Consulte las guías de instalación, configuración, calibración y solución de problemas de los productos Foreach." },
  fr: { title: "Guides d’installation｜Foreach Technology", description: "Consultez les guides d’installation, de configuration, d’étalonnage et de dépannage des produits Foreach." },
  ko: { title: "설치 가이드｜Foreach Technology", description: "Foreach 제품의 설치, 설정, 교정 및 문제 해결 가이드를 확인하세요." },
  ru: { title: "Руководства по монтажу｜Foreach Technology", description: "Руководства по монтажу, настройке, калибровке и устранению неисправностей продукции Foreach." },
};

export function getInstallationGuideMetadata(locale: InstallationGuideLocale, page = 1): Metadata {
  const copy = metadataCopy[locale];
  const pageLabel = guidePaginationCopy[locale].page(page);
  const title = page === 1 ? copy.title : `${copy.title} — ${pageLabel}`;
  const description = page === 1 ? copy.description : `${pageLabel}. ${copy.description}`;
  const canonical = getCanonicalUrl(getInstallationGuidePageHref(locale, page));
  return { title, description, alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" } };
}
