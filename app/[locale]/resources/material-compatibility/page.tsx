import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { buildInternationalPageMetadata } from "@/lib/seo/international-page-metadata";
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
import { getHindiDraftLink, hindiEnglishFallbackSuffix, languageDraftsEnabled } from "@/lib/i18n/draft-languages";
import { germanChemicalNames } from "@/data/resources/material-compatibility/material-compatibility.de";
import { hindiChemicalNames } from "@/data/resources/material-compatibility/material-compatibility.hi";
import { italianChemicalNames } from "@/data/resources/material-compatibility/material-compatibility.it";

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
    (typeof MATERIAL_COMPATIBILITY_LOCALES)[number] | "de" | "it" | "hi";

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
    return [...MATERIAL_COMPATIBILITY_LOCALES, ...(languageDraftsEnabled ? ["de", "it", "hi"] : [])].map((locale) => ({
        locale,
    }));
}

/* =========================================================
   SEO 元信息

   说明：
   这里先统一使用英文 SEO。
   后续如果要做每种语言单独 SEO，可改成 generateMetadata。
========================================================= */
const materialCompatibilityMetadata = {
    es: {
        title: "Compatibilidad de materiales | Foreach Technology",
        description:
            "Consulte la compatibilidad entre medios químicos y plásticos de ingeniería, sus propiedades y la documentación de conformidad disponible.",
    },
    fr: {
        title: "Compatibilité des matériaux | Foreach Technology",
        description:
            "Consultez la compatibilité entre milieux chimiques et plastiques techniques, leurs propriétés et les documents de conformité disponibles.",
    },
    ko: {
        title: "재료 적합성 | Foreach Technology",
        description:
            "화학 매질과 엔지니어링 플라스틱의 적합성, 주요 재료 특성 및 제공 가능한 인증 자료를 확인하세요.",
    },
    ru: {
        title: "Совместимость материалов | Foreach Technology",
        description:
            "Справочник по совместимости химических сред и инженерных пластиков, свойствам материалов и доступным документам соответствия.",
    },
} as const;

async function getPageMetadata({
    params,
}: MaterialCompatibilityIntlPageProps): Promise<Metadata> {
    const { locale } = await params;

    if (!isSupportedLocale(locale)) return {};

    if (locale === "de") {
        const title = "Werkstoffbeständigkeit | FOREACH";
        const description = "Prüfen Sie die Verträglichkeit chemischer Medien mit technischen Kunststoffen, Werkstoffeigenschaften und verfügbare Konformitätsunterlagen.";
        const url = "/de/resources/material-compatibility/";
        return { title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false }, openGraph: { title, description, url, locale: "de_DE" } };
    }

    if (locale === "it") {
        const title = "Compatibilità dei materiali | FOREACH";
        const description = "Consulta la compatibilità fra prodotti chimici e tecnopolimeri, le proprietà dei materiali e la documentazione di conformità disponibile.";
        const url = "/it/resources/material-compatibility/";
        return { title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false }, openGraph: { title, description, url, locale: "it_IT" } };
    }

    if (locale === "hi") {
        const title = "सामग्री की संगतता | FOREACH";
        const description = "रासायनिक माध्यम, इंजीनियरिंग प्लास्टिक, सामग्री गुण और अनुपालन दस्तावेज़ों के लिए FOREACH की सामग्री संगतता जानकारी देखें।";
        const url = "/hi/resources/material-compatibility/";
        return { title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false }, openGraph: { title, description, url, locale: "hi_IN" } };
    }

    if (locale === "en") {
        return buildInternationalPageMetadata({ locale, path: "/resources/material-compatibility/",
            title: "Material Compatibility | FOREACH",
            description:
                "Foreach material compatibility reference for chemical media, engineering plastics, material properties, and compliance documentation.",
        });
    }

    const localizedMetadata = materialCompatibilityMetadata[locale];
    return buildInternationalPageMetadata({ locale, path: "/resources/material-compatibility/", ...localizedMetadata });
}

/* =========================================================
   判断 locale 是否有效
========================================================= */
function isSupportedLocale(
    locale: string,
): locale is MaterialCompatibilityLocale {
    return locale === "de" || locale === "it" || locale === "hi" ? languageDraftsEnabled : MATERIAL_COMPATIBILITY_LOCALES.includes(
        locale as (typeof MATERIAL_COMPATIBILITY_LOCALES)[number],
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
    const contact = locale === "hi" ? getHindiDraftLink("/en/contact/") : undefined;
    const draftLocale = locale === "de" || locale === "it" || locale === "hi" ? locale : undefined;
    const names = draftLocale === "hi" ? hindiChemicalNames : draftLocale === "it" ? italianChemicalNames : germanChemicalNames;

    /*
      外语数据理论上一定有 ui。
      这里仍然做兜底，避免数据缺失时报错。
    */
    const supportCta = pageData.ui?.supportCta ?? {
        kicker: "SELECTION SUPPORT",
        title: "Need help confirming material compatibility?",
        description:
            "Submit the medium name, concentration, temperature, pressure, and contact time. The Foreach technical team can help confirm material selection for your application.",
        buttonText: "Contact Technical Support",
    };

    return (
        <main className="material-compatibility-page">
            {/* Banner 区域 */}
            <section className="material-compatibility-banner resource-center-banner">
                <div className="material-compatibility-banner__inner resource-center-banner__inner">
                    <div className="material-compatibility-banner__content resource-center-banner__content">
                        {pageData.banner.eyebrow ? (
                            <p className="material-compatibility-banner__eyebrow resource-center-banner__eyebrow">
                                {pageData.banner.eyebrow}
                            </p>
                        ) : null}

                        <h1 className="resource-center-banner__title">
                            {pageData.banner.title}
                            {pageData.banner.highlight ? (
                                <span>{pageData.banner.highlight}</span>
                            ) : null}
                        </h1>

                        <p className="material-compatibility-banner__desc resource-center-banner__description">
                            {pageData.banner.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* 主体内容 */}
            <MaterialCompatibilityClient
                data={pageData}
                localeOverride={draftLocale}
                chemicalNames={draftLocale ? names : undefined}
            />

            {/* 底部支持区域 */}
            <ResourceSupportCta
                title={supportCta.title}
                description={supportCta.description}
                buttonText={supportCta.buttonText + (contact?.hrefLang === "en" ? hindiEnglishFallbackSuffix : "")}
                href={contact?.href ?? `/${locale}/contact`}
            />
        </main>
    );
}

export const generateMetadata = withPublishedTranslationMetadata("/resources/material-compatibility/", getPageMetadata);
