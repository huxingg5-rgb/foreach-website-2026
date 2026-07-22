import type { Metadata } from "next";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import ResourceSupportCta from "@/components/resources/ResourceSupportCta";
import FluidResistanceCalculator from "@/components/resources/fluid-resistance/FluidResistanceCalculator";
import calculatorStyles from "@/components/resources/fluid-resistance/FluidResistanceCalculator.module.css";

import "@/app/resources/technical-articles/technical-articles.css";

export const metadata: Metadata = {
  title: "流阻计算器｜恒永达",
  description: "管内流动阻尼计算工具，支持多流体、动态行数、双向计算和低雷诺数自动修正。",
};

export default function FluidResistancePage() {
  return (
    <main className="technicalArticlesPage">
      <section
        className="technicalArticlesHero resource-center-banner"
        style={{
          backgroundImage:
            "url(/images/resources/technical-articles/banner/resources-technical-articles-banner-1920x520-v001.webp)",
        }}
      >
        <div className="technicalArticlesHero__inner resource-center-banner__inner">
          <h1 className={`technicalArticlesHero__title ${calculatorStyles.heroTitle} resource-center-banner__title`}>管内流动阻尼计算工具 V2.1</h1>
          <p className={`technicalArticlesHero__description ${calculatorStyles.heroDescription} resource-center-banner__description`}>
            多流体支持 | 动态行数 | 双向计算 | 低雷诺数自动修正
          </p>
        </div>
      </section>
      <SiteBreadcrumb
        ariaLabel="面包屑导航"
        variant="bar"
        items={[
          { label: "首页", href: "/" },
          { label: "资源中心", href: "/resources/datasheets" },
          { label: "流阻计算器" },
        ]}
      />
      <FluidResistanceCalculator locale="zh-CN" />
      <ResourceSupportCta
        title="需要恒永达协助确认计算结果？"
        description="如需液路参数复核、产品选型或工程应用支持，请联系我们。恒永达可结合介质、流量、压力、管路及元件参数协助您进一步确认。"
        buttonText="联系我们"
        href="/contact"
      />
    </main>
  );
}
