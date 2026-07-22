/* =========================================================
   analytical-instruments-application.types.ts
   恒永达官网｜分析仪器应用领域数据类型
========================================================= */

export type AnalyticalInstrumentsBreadcrumbItem = {
  label: string;
  href?: string;
};

export type AnalyticalInstrumentsHero = {
  title: string;
  highlight: string;
  description: string;
  panelTitle: string;
  panelItems: string[];
};

export type AnalyticalInstrumentsProductAbility = {
  name: string;
  ability: string;
  params: string[];
  advantage: string;
  solves: string;
};

export type AnalyticalInstrumentsFluidicModule = {
  key: string;
  index: string;
  navLabel: string;
  navSubtitle: string;
  title: string;
  description: string;
  tags: string[];
  products: string[];
};

export type AnalyticalInstrumentsApplicationType = {
  key: string;
  index: string;
  title: string;
  summary: string;
  focusTitle: string;
  focusSummary: string;
  focusPoints: string[];
  modules: AnalyticalInstrumentsFluidicModule[];
};

export type AnalyticalInstrumentsCta = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
};

export type AnalyticalInstrumentsApplicationPageData = {
  breadcrumb: AnalyticalInstrumentsBreadcrumbItem[];
  hero: AnalyticalInstrumentsHero;
  applicationSection: {
    title: string;
    description: string;
  };
  focusKicker: string;
  moduleSection: {
    title: string;
    description: string;
  };
  cta: AnalyticalInstrumentsCta;
  productHref: string;
  contactHref: string;
  products: Record<string, AnalyticalInstrumentsProductAbility>;
  applications: AnalyticalInstrumentsApplicationType[];
};