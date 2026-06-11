/* =========================================================
   environmental-monitoring-application.types.ts
   恒永达官网｜环保监测应用领域数据类型
========================================================= */

export type EnvironmentalMonitoringBreadcrumbItem = {
  label: string;
  href?: string;
};

export type EnvironmentalMonitoringHero = {
  title: string;
  highlight: string;
  description: string;
  panelTitle: string;
  panelItems: string[];
};

export type EnvironmentalMonitoringProductAbility = {
  name: string;
  ability: string;
  params: string[];
  advantage: string;
  solves: string;
};

export type EnvironmentalMonitoringFluidicModule = {
  key: string;
  index: string;
  navLabel: string;
  navSubtitle: string;
  title: string;
  description: string;
  tags: string[];
  products: string[];
};

export type EnvironmentalMonitoringApplicationType = {
  key: string;
  index: string;
  title: string;
  summary: string;
  focusTitle: string;
  focusSummary: string;
  focusPoints: string[];
  modules: EnvironmentalMonitoringFluidicModule[];
};

export type EnvironmentalMonitoringCta = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
};

export type EnvironmentalMonitoringApplicationPageData = {
  breadcrumb: EnvironmentalMonitoringBreadcrumbItem[];
  hero: EnvironmentalMonitoringHero;
  applicationSection: {
    title: string;
    description: string;
  };
  focusKicker: string;
  moduleSection: {
    title: string;
    description: string;
  };
  cta: EnvironmentalMonitoringCta;
  productHref: string;
  contactHref: string;
  products: Record<string, EnvironmentalMonitoringProductAbility>;
  applications: EnvironmentalMonitoringApplicationType[];
};