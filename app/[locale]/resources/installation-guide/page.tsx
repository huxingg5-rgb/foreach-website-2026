/* =========================================================
   page.tsx
   恒永达官网｜多语言安装教程页面入口

   文件路径：
   app/[locale]/resources/installation-guide/page.tsx

   作用：
   1. 负责多语言安装教程页面：
      /en/resources/installation-guide
      /es/resources/installation-guide
      /fr/resources/installation-guide
      /ko/resources/installation-guide
      /ru/resources/installation-guide
   2. 当前阶段先复用安装教程中文页面结构
   3. 搜索栏复用接头替代查询 frp-* 样式
   4. 安装教程页面自己的布局样式继续使用 installation-guide.css
   5. 后期再逐步替换外语文案和 YouTube 视频链接

   注意：
   1. 中文页面不走这里
   2. 中文路径是 /resources/installation-guide
   3. 外语路径才是 /en/resources/installation-guide 等
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import InstallationGuideClient from "@/components/resources/installation-guide/InstallationGuideClient";
import { getInstallationGuidePageData } from "@/services/resources/installation-guide/getInstallationGuidePageData";
import type { InstallationGuideLocale } from "@/data/resources/installation-guide/installation-guide.types";

/* =========================================================
   样式引入
   说明：
   1. fitting-replacement.css 提供 frp-* 搜索栏样式
   2. installation-guide.css 提供安装教程页面布局、卡片、侧边栏、弹窗样式
   3. 顺序不能反：先引入接头替代样式，再引入安装教程自己的样式覆盖细节
========================================================= */
import "@/app/resources/selection-support/fitting-replacement/fitting-replacement.css";
import "@/app/resources/installation-guide/installation-guide.css";

const INSTALLATION_GUIDE_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type InstallationGuideLocaleParam = (typeof INSTALLATION_GUIDE_LOCALES)[number];

type InstallationGuideIntlPageProps = {
  params: Promise<{
    locale: InstallationGuideLocaleParam;
  }>;
};

/* =========================================================
   静态导出路径
   说明：
   如果项目使用 output: "export"，动态多语言路由必须提供静态参数。
========================================================= */
export function generateStaticParams() {
  return INSTALLATION_GUIDE_LOCALES.map((locale) => ({
    locale,
  }));
}

const INSTALLATION_METADATA: Record<
  Exclude<InstallationGuideLocaleParam, "en">,
  { title: string; description: string }
> = {
  es: { title: "Guías de instalación｜FOREACH", description: "Consulte las guías de instalación, configuración, calibración y solución de problemas de los productos FOREACH." },
  fr: { title: "Guides d’installation｜FOREACH", description: "Consultez les guides d’installation, de configuration, d’étalonnage et de dépannage des produits FOREACH." },
  ko: { title: "설치 가이드｜FOREACH", description: "FOREACH 제품의 설치, 설정, 교정 및 문제 해결 가이드를 확인하세요." },
  ru: { title: "Руководства по монтажу｜FOREACH", description: "Руководства по монтажу, настройке, калибровке и устранению неисправностей продукции FOREACH." },
};

export async function generateMetadata({
  params,
}: InstallationGuideIntlPageProps): Promise<Metadata> {
  const { locale } = await params;
  const metadata = locale === "en"
    ? {
        title: "Installation Guide｜FOREACH",
        description: "View FOREACH product installation, setup, calibration and troubleshooting guides.",
      }
    : INSTALLATION_METADATA[locale];

  return locale === "en" ? metadata : { ...metadata, openGraph: metadata };
}

export default async function InstallationGuideIntlPage({
  params,
}: InstallationGuideIntlPageProps) {
  const { locale } = await params;

  if (!INSTALLATION_GUIDE_LOCALES.includes(locale)) {
    notFound();
  }

  const pageData = getInstallationGuidePageData(
    locale as InstallationGuideLocale,
  );

  return (
    <>
      <section className="installation-guide-hero">
        <div className="installation-guide-hero-inner">
          <div className="installation-guide-hero-content">
            <h1>{pageData.hero.title}</h1>
            <p>{pageData.hero.description}</p>
          </div>
        </div>
      </section>

      <InstallationGuideClient pageData={pageData} />
    </>
  );
}
