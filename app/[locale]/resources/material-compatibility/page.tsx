/* =========================================================
   page.tsx
   恒永达官网｜多语言材料兼容页面入口

   文件路径：
   app/[locale]/resources/material-compatibility/page.tsx

   说明：
   1. 中文页面路径：
      /resources/material-compatibility

   2. 外语页面路径：
      /en/resources/material-compatibility
      /es/resources/material-compatibility
      /fr/resources/material-compatibility
      /ko/resources/material-compatibility
      /ru/resources/material-compatibility

   3. 当前外语页面：
      - UI 文案按语言切换
      - 技术表格统一使用英文技术数据
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import MaterialCompatibilityClient from "@/components/resources/material-compatibility/MaterialCompatibilityClient";
import ResourceSupportCta from "@/components/resources/ResourceSupportCta";
import { getMaterialCompatibilityPageData } from "@/services/resources/material-compatibility/getMaterialCompatibilityPageData";

/*
  引入已有接头替代查询页面中的 ResourceSearchBar 样式。
  ResourceSearchBar 默认使用 frp-* class。
*/
import "@/app/resources/selection-support/fitting-replacement/fitting-replacement.css";

/*
  材料兼容页面自己的专用样式。
*/
import "@/app/resources/material-compatibility/material-compatibility.css";

/* =========================================================
   官网当前支持的外语语言
========================================================= */
const MATERIAL_COMPATIBILITY_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type MaterialCompatibilityLocale =
    (typeof MATERIAL_COMPATIBILITY_LOCALES)[number];

/* =========================================================
   页面参数类型

   说明：
   Next.js 15 / 16 中 params 按 Promise 处理更稳。
========================================================= */
type MaterialCompatibilityIntlPageProps = {
    params: Promise<{
        locale: string;
    }>;
};

/* =========================================================
   静态导出路径
========================================================= */
export function generateStaticParams() {
    return MATERIAL_COMPATIBILITY_LOCALES.map((locale) => ({
        locale,
    }));
}

/* =========================================================
   SEO 元信息

   说明：
   这里先统一使用英文 SEO。
   后续如果要做每种语言单独 SEO，可改成 generateMetadata。
========================================================= */
export const metadata: Metadata = {
    title: "Material Compatibility｜FOREACH",
    description:
        "FOREACH material compatibility reference for chemical media, engineering plastics, material properties, and compliance documentation.",
};

/* =========================================================
   判断 locale 是否有效
========================================================= */
function isSupportedLocale(
    locale: string,
): locale is MaterialCompatibilityLocale {
    return MATERIAL_COMPATIBILITY_LOCALES.includes(
        locale as MaterialCompatibilityLocale,
    );
}

/* =========================================================
   多语言材料兼容页面
========================================================= */
export default async function MaterialCompatibilityIntlPage({
    params,
}: MaterialCompatibilityIntlPageProps) {
    const { locale } = await params;

    if (!isSupportedLocale(locale)) {
        notFound();
    }

    const pageData = await getMaterialCompatibilityPageData(locale);

    /*
      外语数据理论上一定有 ui。
      这里仍然做兜底，避免数据缺失时报错。
    */
    const supportCta = pageData.ui?.supportCta ?? {
        kicker: "SELECTION SUPPORT",
        title: "Need help confirming material compatibility?",
        description:
            "Submit the medium name, concentration, temperature, pressure, and contact time. The FOREACH technical team can help confirm material selection for your application.",
        buttonText: "Contact Technical Support",
    };

    return (
        <main className="material-compatibility-page">
            {/* Banner 区域 */}
            <section className="material-compatibility-banner">
                <div className="material-compatibility-banner__inner">
                    <div className="material-compatibility-banner__content">
                        {pageData.banner.eyebrow ? (
                            <p className="material-compatibility-banner__eyebrow">
                                {pageData.banner.eyebrow}
                            </p>
                        ) : null}

                        <h1>
                            {pageData.banner.title}
                            {pageData.banner.highlight ? (
                                <span>{pageData.banner.highlight}</span>
                            ) : null}
                        </h1>

                        <p className="material-compatibility-banner__desc">
                            {pageData.banner.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* 主体内容 */}
            <MaterialCompatibilityClient data={pageData} />

            {/* 底部支持区域 */}
            <ResourceSupportCta
                title={supportCta.title}
                description={supportCta.description}
                buttonText={supportCta.buttonText}
                href={`/${locale}/contact`}
            />
        </main>
    );
} 