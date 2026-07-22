/* =========================================================
   installation-guide.types.ts
   恒永达官网｜安装教程页面数据类型

   文件路径：
   data/resources/installation-guide/installation-guide.types.ts

   作用：
   1. 统一安装教程页面的数据结构
   2. 约束产品分类、教程卡片、步骤、页面文案
   3. 后期接后端 / CMS 时，也按这个结构返回数据
========================================================= */

export type InstallationGuideLocale = "zh-CN" | "en" | "es" | "fr" | "ko" | "ru";

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