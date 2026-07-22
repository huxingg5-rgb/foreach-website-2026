const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "data/products/selection/types.ts");

if (fs.existsSync(file)) {
  const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  fs.copyFileSync(file, `${file}.bak_selection_types_${stamp}`);
}

const content = `/*
  产品中心选型页通用类型
  ---------------------------------------------------------
  说明：
  1. 供 data/products/selection/*.generated.ts 使用
  2. 这些 generated 数据来源不完全统一，因此类型需要保持兼容
  3. 这里只定义数据结构，不影响页面样式和业务逻辑
*/

export type LocalizedText =
  | string
  | {
      zh?: string;
      en?: string;
      es?: string;
      fr?: string;
      ko?: string;
      ru?: string;
      [key: string]: string | undefined;
    };

export type ProductSelectionFilterLabel = {
  id?: string;
  key?: string;
  label?: LocalizedText;
  title?: LocalizedText;
  name?: LocalizedText;
  value?: string;
  options?: Array<{
    id?: string;
    key?: string;
    value?: string;
    label?: LocalizedText;
    title?: LocalizedText;
    [key: string]: any;
  }>;
  [key: string]: any;
};

export type ProductSelectionProduct = {
  productId: string;

  categoryId?: string;
  category?: string;
  categoryLabel?: string;

  productTypeId?: string;
  productTypeSlug?: string;
  productTypeName?: string;
  productTypeLabel?: string;

  model?: string;
  title?: string;
  name?: string;
  productName?: string;
  subtitle?: string;
  description?: string;

  cardTitle?: LocalizedText;
  cardSubtitle?: LocalizedText;
  cardDescription?: LocalizedText;

  image?: string;
  imagePath?: string;
  imageUrl?: string;
  cardImage?: string;

  href?: string;
  detailHref?: string;
  selectionHref?: string;
  detailSlug?: string;
  slug?: string;
  routeSlug?: string;
  seriesSlug?: string;
  seriesId?: string;

  sourceType?: string;

  badges?: string[];
  tags?: string[];
  specs?: any[];

  filter01?: string;
  filter02?: string;
  filter03?: string;
  filter04?: string;
  filter05?: string;
  filter06?: string;

  filters?: Record<string, string | number | boolean | null | undefined>;

  sort?: number;

  content?: Record<string, any>;

  [key: string]: any;
};
`;

fs.mkdirSync(path.dirname(file), { recursive: true });
fs.writeFileSync(file, content, "utf8");

console.log("已创建/更新：data/products/selection/types.ts");