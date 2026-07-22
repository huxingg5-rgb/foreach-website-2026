const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "data/products/selection/product-selection.types.ts",
  "data/products/selection/types.ts",
];

const productTypeBlock = `export type LocalizedText =
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

export type ProductSelectionProduct = {
  productId: string;

  categoryId?: string;
  category?: string;
  categorySlug?: string;
  categoryName?: string;
  categoryLabel?: string;

  productTypeId?: string;
  productType?: string;
  productTypeSlug?: string;
  productTypeName?: string;
  productTypeLabel?: string;

  seriesId?: string;
  series?: string;
  seriesSlug?: string;
  seriesName?: string;

  detailSlug?: string;
  routeSlug?: string;
  reservedConfigSlug?: string;
  slug?: string;

  href?: string;
  detailHref?: string;
  productDetailHref?: string;
  selectionHref?: string;

  model?: string;
  title?: string;
  name?: string;
  productName?: string;
  subtitle?: string;
  summary?: string;
  description?: string;
  code?: string;
  productCode?: string;

  cardTitle?: LocalizedText;
  cardSubtitle?: LocalizedText;
  cardDescription?: LocalizedText;

  image?: string;
  imageCard?: string;
  cardImage?: string;
  imagePath?: string;
  imageUrl?: string;
  imageAlt?: string;

  status?: string;
  enabled?: boolean;
  visible?: boolean;
  sort?: number;
  sortOrder?: number;
  order?: number;
  level?: number;
  parentId?: string;
  id?: string;

  filter01?: string;
  filter02?: string;
  filter03?: string;
  filter04?: string;
  filter05?: string;
  filter06?: string;
  filterKey?: string;
  inputType?: string;
  label?: LocalizedText;

  filters?: Record<string, string | number | boolean | null | undefined>;

  searchKeywords?: LocalizedText;

  tags?: string[];
  badges?: string[];
  specs?: any[];

  source?: string;
  sourceType?: string;

  needDrawing?: boolean;
  needModel3d?: boolean;

  flowRate?: string;
  pressure?: string;
  motorType?: string;
  serviceLife?: string;

  content?: Record<string, any>;

  [key: string]: any;
};`;

function findBlock(text, name) {
  const typeIndex = text.search(new RegExp(`export\\s+type\\s+${name}\\s*=`));
  const interfaceIndex = text.search(new RegExp(`export\\s+interface\\s+${name}\\s*`));

  let start = -1;
  let kind = "";

  if (typeIndex >= 0 && (interfaceIndex < 0 || typeIndex < interfaceIndex)) {
    start = typeIndex;
    kind = "type";
  } else if (interfaceIndex >= 0) {
    start = interfaceIndex;
    kind = "interface";
  }

  if (start < 0) return null;

  const braceStart = text.indexOf("{", start);
  if (braceStart < 0) return null;

  let depth = 0;
  let end = -1;

  for (let i = braceStart; i < text.length; i++) {
    const ch = text[i];

    if (ch === "{") depth++;
    if (ch === "}") depth--;

    if (depth === 0) {
      end = i + 1;

      if (kind === "type") {
        while (end < text.length && /[\s;]/.test(text[end])) {
          if (text[end] === ";") {
            end++;
            break;
          }
          end++;
        }
      }

      break;
    }
  }

  if (end < 0) return null;

  return { start, end };
}

function removeExistingLocalizedText(text) {
  const block = findBlock(text, "LocalizedText");

  if (!block) return text;

  return text.slice(0, block.start).trimEnd() + "\n\n" + text.slice(block.end).trimStart();
}

function replaceProductSelectionProduct(text) {
  text = removeExistingLocalizedText(text);

  const block = findBlock(text, "ProductSelectionProduct");

  if (!block) {
    return text.trimEnd() + "\n\n" + productTypeBlock + "\n";
  }

  return (
    text.slice(0, block.start).trimEnd() +
    "\n\n" +
    productTypeBlock +
    "\n\n" +
    text.slice(block.end).trimStart()
  );
}

for (const relPath of files) {
  const file = path.join(root, relPath);

  if (!fs.existsSync(file)) {
    console.log("跳过，文件不存在：" + relPath);
    continue;
  }

  const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  fs.copyFileSync(file, `${file}.bak_unify_product_selection_product_${stamp}`);

  const oldText = fs.readFileSync(file, "utf8");
  const newText = replaceProductSelectionProduct(oldText);

  fs.writeFileSync(file, newText, "utf8");

  console.log("已统一类型：" + relPath);
}

console.log("");
console.log("完成：已统一 ProductSelectionProduct 类型。");
console.log("这一步只改类型文件，不改 generated 数据、不改页面。");