/* =========================================================
   life-science-application.types.ts
   恒永达官网｜生命科学应用领域数据类型

   文件路径：
   data/applications/life-science/life-science-application.types.ts

   说明：
   1. 生命科学页面独立维护数据结构
   2. 结构与 IVD 应用页保持一致，便于复用样式与交互
========================================================= */

export type LifeScienceBreadcrumbItem = {
  label: string;
  href?: string;
};

export type LifeScienceHero = {
  title: string;
  highlight: string;
  description: string;
  panelTitle: string;
  panelItems: string[];
};

export type LifeScienceProductAbility = {
  name: string;
  ability: string;
  params: string[];
  advantage: string;
  solves: string;
};

export type LifeScienceFluidicModule = {
  key: string;
  index: string;
  navLabel: string;
  navSubtitle: string;
  title: string;
  description: string;
  tags: string[];
  products: string[];
};

export type LifeScienceApplicationType = {
  key: string;
  index: string;
  title: string;
  summary: string;
  focusTitle: string;
  focusSummary: string;
  focusPoints: string[];
  modules: LifeScienceFluidicModule[];
};

export type LifeScienceCta = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
};

export type LifeScienceApplicationPageData = {
  breadcrumb: LifeScienceBreadcrumbItem[];
  hero: LifeScienceHero;
  applicationSection: {
    title: string;
    description: string;
  };
  focusKicker: string;
  moduleSection: {
    title: string;
    description: string;
  };
  cta: LifeScienceCta;
  productHref: string;
  contactHref: string;
  products: Record<string, LifeScienceProductAbility>;
  applications: LifeScienceApplicationType[];
};