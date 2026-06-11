/* =========================================================
   ivd-application.types.ts
   恒永达官网｜IVD 应用领域页类型定义

   说明：
   1. 这个文件只定义数据结构，不写具体文案
   2. 后续中文、英文、多语言数据都要符合这里的类型
   3. 这样做可以避免字段写乱，方便后期接 CMS / 后端 / 数据库
========================================================= */

export type IvdLocale = "zh-CN" | "en" | "es" | "fr" | "ko" | "ru";

export type IvdBreadcrumbItem = {
  label: string;
  href?: string;
};

export type IvdHeroData = {
  eyebrow: string;
  title: string;
  description: string;
  backgroundImage: string;
};

export type IvdSectionIntro = {
  eyebrow: string;
  title: string;
  description: string;
};

export type IvdInstrument = {
  key: string;
  index: string;
  title: string;
  summary: string;
  focusTitle: string;
  focusSummary: string;
  focusPoints: string[];
  modules: IvdFluidicModule[];
};

export type IvdFluidicModule = {
  key: string;
  index: string;
  navLabel: string;
  navSubtitle: string;
  title: string;
  description: string;
  tags: string[];
  products: string[];
};

export type IvdProductAbility = {
  key: string;
  name: string;
  ability: string;
  params: string[];
  advantage: string;
  solves: string;
  productHref?: string;
  contactHref?: string;
};

export type IvdCtaBannerData = {
  eyebrow: string;
  title: string;
  description: string;
  primaryText: string;
  primaryHref: string;
  secondaryText: string;
  secondaryHref: string;
};

export type IvdApplicationPageData = {
  locale: IvdLocale;
  breadcrumb: IvdBreadcrumbItem[];
  hero: IvdHeroData;
  instrumentSection: IvdSectionIntro;
  moduleSection: IvdSectionIntro;
  ctaBanner: IvdCtaBannerData;
  instruments: IvdInstrument[];
  productAbilities: Record<string, IvdProductAbility>;
};