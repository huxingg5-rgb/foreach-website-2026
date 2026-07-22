/* =========================================================
   synthetic-biology-application.types.ts
   恒永达官网｜合成生物应用领域数据类型
========================================================= */

export type SyntheticBiologyBreadcrumbItem = {
  label: string;
  href?: string;
};

export type SyntheticBiologyHero = {
  title: string;
  highlight: string;
  description: string;
  panelTitle: string;
  panelItems: string[];
};

export type SyntheticBiologyProductAbility = {
  name: string;
  ability: string;
  params: string[];
  advantage: string;
  solves: string;
};

export type SyntheticBiologyFluidicModule = {
  key: string;
  index: string;
  navLabel: string;
  navSubtitle: string;
  title: string;
  description: string;
  tags: string[];
  products: string[];
};

export type SyntheticBiologyApplicationType = {
  key: string;
  index: string;
  title: string;
  summary: string;
  focusTitle: string;
  focusSummary: string;
  focusPoints: string[];
  modules: SyntheticBiologyFluidicModule[];
};

export type SyntheticBiologyCta = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
};

export type SyntheticBiologyApplicationPageData = {
  breadcrumb: SyntheticBiologyBreadcrumbItem[];
  hero: SyntheticBiologyHero;
  applicationSection: {
    title: string;
    description: string;
  };
  focusKicker: string;
  moduleSection: {
    title: string;
    description: string;
  };
  cta: SyntheticBiologyCta;
  productHref: string;
  contactHref: string;
  products: Record<string, SyntheticBiologyProductAbility>;
  applications: SyntheticBiologyApplicationType[];
};