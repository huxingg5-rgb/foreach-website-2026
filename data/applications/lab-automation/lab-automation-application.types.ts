/* =========================================================
   lab-automation-application.types.ts
   恒永达官网｜实验室自动化应用领域数据类型

   文件路径：
   data/applications/lab-automation/lab-automation-application.types.ts

   说明：
   1. 实验室自动化页面独立维护数据结构
   2. 结构与 IVD / 生命科学应用页保持一致，便于复用样式与交互
========================================================= */

export type LabAutomationBreadcrumbItem = {
  label: string;
  href?: string;
};

export type LabAutomationHero = {
  title: string;
  highlight: string;
  description: string;
  panelTitle: string;
  panelItems: string[];
};

export type LabAutomationProductAbility = {
  name: string;
  ability: string;
  params: string[];
  advantage: string;
  solves: string;
};

export type LabAutomationFluidicModule = {
  key: string;
  index: string;
  navLabel: string;
  navSubtitle: string;
  title: string;
  description: string;
  tags: string[];
  products: string[];
};

export type LabAutomationApplicationType = {
  key: string;
  index: string;
  title: string;
  summary: string;
  focusTitle: string;
  focusSummary: string;
  focusPoints: string[];
  modules: LabAutomationFluidicModule[];
};

export type LabAutomationCta = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
};

export type LabAutomationApplicationPageData = {
  breadcrumb: LabAutomationBreadcrumbItem[];
  hero: LabAutomationHero;
  applicationSection: {
    title: string;
    description: string;
  };
  focusKicker: string;
  moduleSection: {
    title: string;
    description: string;
  };
  cta: LabAutomationCta;
  productHref: string;
  contactHref: string;
  products: Record<string, LabAutomationProductAbility>;
  applications: LabAutomationApplicationType[];
};