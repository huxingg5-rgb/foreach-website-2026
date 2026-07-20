/* =========================================================
   installation-guide.types.ts
   恒永达官网｜安装教程页面数据类型

   文件路径：
   data/resources/installation-guide/installation-guide.types.ts

   作用：
   1. 统一安装教程页面的数据结构
   2. 给 zh.ts、intl.ts、service、client 组件提供类型
   3. 解决 TypeScript 找不到 InstallationGuidePageData 等类型的问题
========================================================= */

export type InstallationGuideLocale =
  | "zh-CN"
  | "en"
  | "es"
  | "fr"
  | "ko"
  | "ru";

export type InstallationGuideFilterType = "all" | "category" | "series";

export type InstallationGuideTreeChild = {
  id: string;
  name: string;
};

export type InstallationGuideTreeItem = {
  id: string;
  type: InstallationGuideFilterType;
  name: string;
  children: InstallationGuideTreeChild[];
};

export type InstallationGuideStep = {
  title: string;
  description: string;
};

export type InstallationGuideCard = {
  id: string;
  title: string;
  category: string;
  series: string;
  tags: string[];
  description: string;
  thumbnail?: string;
  videoPlatform?: "bilibili" | "youtube" | "none";
  videoUrl?: string;
  pdfUrl?: string;
  keywords: string[];
  steps: InstallationGuideStep[];
};

export type InstallationGuidePageData = {
  locale: InstallationGuideLocale;

  ui?: {
    breadcrumbAriaLabel: string;
    breadcrumbHome: string;
    breadcrumbResources: string;
    breadcrumbCurrent: string;
    productCategory: string;
    tags: string;
    emptyTitle: string;
    emptyDescription: string;
  };

  hero: {
    kicker: string;
    title: string;
    description: string;
  };

  search: {
    placeholder: string;
    buttonText: string;
    recentLabel: string;
    recentKeywords: string[];
  };

  sidebar: {
    title: string;
    tree: InstallationGuideTreeItem[];
  };

  support: {
    title: string;
    description: string;
    buttonText: string;
    href: string;
  };

  guides: InstallationGuideCard[];
};
