/* =========================================================
   app/[locale]/contact/distributor/page.tsx
   多语言经销商合作页面入口

   页面访问路径：
   /en/contact/distributor
   /es/contact/distributor
   /fr/contact/distributor
   /ko/contact/distributor
   /ru/contact/distributor

   中文特殊处理：
   /zh-CN/contact/distributor 不直接 404
   而是显示一个中文友好提示，引导用户返回联系与合作页面
========================================================= */

import Link from "next/link";
import { notFound } from "next/navigation";
import DistributorPageContent from "@/components/contact/DistributorPageContent";
import {
  getDistributorPageData,
  type DistributorLocale,
} from "@/data/contact-cooperation/distributor.intl";

/* =========================================================
   可生成的语言路径

   说明：
   1. en / es / fr / ko / ru 正常显示经销商合作页面
   2. zh-CN 只作为友好提示页存在，不显示经销商合作内容
   3. 因为 output: export 静态导出，动态路由必须提前声明
========================================================= */

const DISTRIBUTOR_LOCALES: DistributorLocale[] = ["en", "es", "fr", "ko", "ru"];

const GENERATED_LOCALES = ["zh-CN", ...DISTRIBUTOR_LOCALES] as const;

export function generateStaticParams() {
  return GENERATED_LOCALES.map((locale) => ({
    locale,
  }));
}

/* 不允许未声明语言继续生成页面 */
export const dynamicParams = false;

/* =========================================================
   中文友好提示页

   说明：
   - 中文站目前不开放经销商合作页面
   - 但不直接 404，避免用户体验突兀
   - 后续如果中文也要开放，只需要改这里
========================================================= */

function ChineseDistributorFallback() {
  return (
    <main className="distributor-page">
      <section className="distributor-unavailable">
        <div className="distributor-section-inner">
          <div className="distributor-unavailable-card">
            <p className="distributor-unavailable-label">Contact & Partnership</p>

            <h1>经销商合作页面暂未开放中文版本</h1>

            <p>
              当前经销商合作页面主要面向海外合作伙伴开放。您可以返回“联系与合作”页面，
              通过询盘表单、联系方式或销售支持入口与我们联系。
            </p>

            <div className="distributor-unavailable-actions">
              <Link href="/contact" className="distributor-btn distributor-btn-main">
                返回联系与合作
              </Link>

              <Link
                href="/en/contact/distributor"
                className="distributor-btn distributor-btn-ghost-dark"
              >
                查看英文经销商页面
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   页面组件
========================================================= */

export default async function DistributorPage({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  /* 中文路径不 404，显示友好提示 */
  if (locale === "zh-CN") {
    return <ChineseDistributorFallback />;
  }

  /* 其他未声明语言仍然 404 */
  if (!DISTRIBUTOR_LOCALES.includes(locale as DistributorLocale)) {
    notFound();
  }

  const content = getDistributorPageData(locale);

  return <DistributorPageContent content={content} />;
}  