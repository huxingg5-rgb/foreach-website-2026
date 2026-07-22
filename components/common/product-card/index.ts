/* =========================================================
   index.ts
   恒永达官网｜公共产品卡片统一导出

   文件路径：
   components/common/product-card/index.ts

   作用：
   1. 统一导出 ProductBasicCard
   2. 后续页面引用时不用写很长路径
   3. 方便以后扩展更多公共卡片：
      - ProductCompactCard
      - ProductDownloadCard
      - ProductSelectionCard
========================================================= */

export { default as ProductBasicCard } from "./ProductBasicCard";

export type {
  ProductBasicCardAction,
  ProductBasicCardMetaItem,
  ProductBasicCardProps,
} from "./ProductBasicCard";
