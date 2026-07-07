# 查看详情点击问题检查

## 1. ProductSelectionCard 实际链接结构


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx Line 10


import type { ProductSelectionProductItem } from "./product-selection-ui.types";
import { getProductCardSpecs } from "@/data/products/selection/card-copy/plunger-pump-card-copy";

type ProductSelectionCardProps = {
  product: ProductSelectionProductItem;
  title: string;
  subtitle: string;
  detailHref: string;
  isAdded: boolean;
  detailButtonText: string;
  addToListText: string;
  addedToListText: string;
  onToggleList: (product: ProductSelectionProductItem) => void;
};

function toDisplayText(value: unknown): string {
  if (value === null || value === undefined) return "";

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(toDisplayText).filter(Boolean).join(" / ");
  }


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx Line 12

import { getProductCardSpecs } from "@/data/products/selection/card-copy/plunger-pump-card-copy";

type ProductSelectionCardProps = {
  product: ProductSelectionProductItem;
  title: string;
  subtitle: string;
  detailHref: string;
  isAdded: boolean;
  detailButtonText: string;
  addToListText: string;
  addedToListText: string;
  onToggleList: (product: ProductSelectionProductItem) => void;
};

function toDisplayText(value: unknown): string {
  if (value === null || value === undefined) return "";

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(toDisplayText).filter(Boolean).join(" / ");
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx Line 58


  return "";
}

export default function ProductSelectionCard({
  product,
  title,
  subtitle,
  detailHref,
  isAdded,
  detailButtonText,
  addToListText,
  addedToListText,
  onToggleList,
}: ProductSelectionCardProps) {
  const safeTitle = toDisplayText(title) || product.productId;
  const safeSubtitle = toDisplayText(subtitle);
  const cardSpecs = getProductCardSpecs(product)
    .map((spec) => toDisplayText(spec))
    .filter(Boolean);

  return (
    <article className="product-card" title={safeTitle}>
      <span className="selected-bar" />

      <div className="product-image" aria-label={safeTitle}>
        {product.imageCard ? (

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx Line 60

}

export default function ProductSelectionCard({
  product,
  title,
  subtitle,
  detailHref,
  isAdded,
  detailButtonText,
  addToListText,
  addedToListText,
  onToggleList,
}: ProductSelectionCardProps) {
  const safeTitle = toDisplayText(title) || product.productId;
  const safeSubtitle = toDisplayText(subtitle);
  const cardSpecs = getProductCardSpecs(product)
    .map((spec) => toDisplayText(spec))
    .filter(Boolean);

  return (
    <article className="product-card" title={safeTitle}>
      <span className="selected-bar" />

      <div className="product-image" aria-label={safeTitle}>
        {product.imageCard ? (
          <img src={product.imageCard} alt={safeTitle} loading="lazy" />
        ) : (

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx Line 72

}: ProductSelectionCardProps) {
  const safeTitle = toDisplayText(title) || product.productId;
  const safeSubtitle = toDisplayText(subtitle);
  const cardSpecs = getProductCardSpecs(product)
    .map((spec) => toDisplayText(spec))
    .filter(Boolean);

  return (
    <article className="product-card" title={safeTitle}>
      <span className="selected-bar" />

      <div className="product-image" aria-label={safeTitle}>
        {product.imageCard ? (
          <img src={product.imageCard} alt={safeTitle} loading="lazy" />
        ) : (
          <div className="product-image-placeholder">暂无图片</div>
        )}
      </div>

      <div className="product-body">
        <h3 className="product-title">{safeTitle}</h3>

        {cardSpecs.length > 0 ? (
          <ul className="product-card-specs" aria-label={`${safeTitle} 关键参数`}>
            {cardSpecs.map((spec, index) => (
              <li key={`${safeTitle}-spec-${index}`}>{spec}</li>
            ))}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx Line 97

              <li key={`${safeTitle}-spec-${index}`}>{spec}</li>
            ))}
          </ul>
        ) : safeSubtitle ? (
          <p className="product-card-summary">{safeSubtitle}</p>
        ) : null}

        <div className="product-actions">
          <a className="product-link" href={detailHref} target="_blank" rel="noopener noreferrer">
            {detailButtonText}
          </a>

          <button
            className={isAdded ? "list-toggle active" : "list-toggle"}
            type="button"
            onClick={() => {
              onToggleList(product);
            }}
          >
            {isAdded ? addedToListText : addToListText}
          </button>
        </div>
      </div>
    </article>
  );
}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx Line 98

            ))}
          </ul>
        ) : safeSubtitle ? (
          <p className="product-card-summary">{safeSubtitle}</p>
        ) : null}

        <div className="product-actions">
          <a className="product-link" href={detailHref} target="_blank" rel="noopener noreferrer">
            {detailButtonText}
          </a>

          <button
            className={isAdded ? "list-toggle active" : "list-toggle"}
            type="button"
            onClick={() => {
              onToggleList(product);
            }}
          >
            {isAdded ? addedToListText : addToListText}
          </button>
        </div>
      </div>
    </article>
  );
}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx Line 101

          <p className="product-card-summary">{safeSubtitle}</p>
        ) : null}

        <div className="product-actions">
          <a className="product-link" href={detailHref} target="_blank" rel="noopener noreferrer">
            {detailButtonText}
          </a>

          <button
            className={isAdded ? "list-toggle active" : "list-toggle"}
            type="button"
            onClick={() => {
              onToggleList(product);
            }}
          >
            {isAdded ? addedToListText : addToListText}
          </button>
        </div>
      </div>
    </article>
  );
}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx Line 103


        <div className="product-actions">
          <a className="product-link" href={detailHref} target="_blank" rel="noopener noreferrer">
            {detailButtonText}
          </a>

          <button
            className={isAdded ? "list-toggle active" : "list-toggle"}
            type="button"
            onClick={() => {
              onToggleList(product);
            }}
          >
            {isAdded ? addedToListText : addToListText}
          </button>
        </div>
      </div>
    </article>
  );
}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx Line 104

        <div className="product-actions">
          <a className="product-link" href={detailHref} target="_blank" rel="noopener noreferrer">
            {detailButtonText}
          </a>

          <button
            className={isAdded ? "list-toggle active" : "list-toggle"}
            type="button"
            onClick={() => {
              onToggleList(product);
            }}
          >
            {isAdded ? addedToListText : addToListText}
          </button>
        </div>
      </div>
    </article>
  );
}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx Line 109

          <button
            className={isAdded ? "list-toggle active" : "list-toggle"}
            type="button"
            onClick={() => {
              onToggleList(product);
            }}
          >
            {isAdded ? addedToListText : addToListText}
          </button>
        </div>
      </div>
    </article>
  );
}

---

## 2. ProductCardGrid 是否只是传 detailHref


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductCardGrid.tsx Line 3

"use client";

import ProductSelectionCard from "./ProductSelectionCard";
import type { ProductSelectionProductItem } from "./product-selection-ui.types";

type ProductCardGridProps = {
  products: ProductSelectionProductItem[];
  selectedList: ReadonlySet<string>;
  detailButtonText: string;
  addToListText: string;
  addedToListText: string;
  getTitle: (product: ProductSelectionProductItem) => string;
  getSubtitle: (product: ProductSelectionProductItem) => string;
  getDetailHref: (product: ProductSelectionProductItem) => string;
  onToggleList: (product: ProductSelectionProductItem) => void;
};


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductCardGrid.tsx Line 14

  selectedList: ReadonlySet<string>;
  detailButtonText: string;
  addToListText: string;
  addedToListText: string;
  getTitle: (product: ProductSelectionProductItem) => string;
  getSubtitle: (product: ProductSelectionProductItem) => string;
  getDetailHref: (product: ProductSelectionProductItem) => string;
  onToggleList: (product: ProductSelectionProductItem) => void;
};

export default function ProductCardGrid({
  products,
  selectedList,
  detailButtonText,
  addToListText,
  addedToListText,
  getTitle,
  getSubtitle,
  getDetailHref,
  onToggleList,
}: ProductCardGridProps) {

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductCardGrid.tsx Line 26

  selectedList,
  detailButtonText,
  addToListText,
  addedToListText,
  getTitle,
  getSubtitle,
  getDetailHref,
  onToggleList,
}: ProductCardGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => {
        const title = getTitle(product);
        const subtitle = getSubtitle(product);

        return (
          <ProductSelectionCard
            product={product}
            title={title}
            subtitle={subtitle}
            detailHref={getDetailHref(product)}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductCardGrid.tsx Line 36

    <div className="product-grid">
      {products.map((product) => {
        const title = getTitle(product);
        const subtitle = getSubtitle(product);

        return (
          <ProductSelectionCard
            product={product}
            title={title}
            subtitle={subtitle}
            detailHref={getDetailHref(product)}
            isAdded={selectedList.has(product.productId)}
            detailButtonText={detailButtonText}
            addToListText={addToListText}
            addedToListText={addedToListText}
            key={product.productId}
            onToggleList={onToggleList}
          />
        );
      })}
    </div>

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductCardGrid.tsx Line 40


        return (
          <ProductSelectionCard
            product={product}
            title={title}
            subtitle={subtitle}
            detailHref={getDetailHref(product)}
            isAdded={selectedList.has(product.productId)}
            detailButtonText={detailButtonText}
            addToListText={addToListText}
            addedToListText={addedToListText}
            key={product.productId}
            onToggleList={onToggleList}
          />
        );
      })}
    </div>
  );
}

---

## 3. ProductSelectionClient 的 getDetailHref 实际怎么生成


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 33

  diaphragmPumpSelectionProducts,
  diaphragmPumpTaxonomyItems,
  diaphragmPumpFilterLabels,
} from "@/data/products/selection/diaphragm-pump-selection.generated";


import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

import ProductCardGrid from "./ProductCardGrid";
import ProductCategoryTabs from "./ProductCategoryTabs";
import ProductEmptyState from "./ProductEmptyState";
import ProductFilterPanel from "./ProductFilterPanel";
import ProductSelectionPagination from "./ProductSelectionPagination";
import ProductSelectionToolbar from "./ProductSelectionToolbar";

import type {
  ProductSelectionFilterLabel,
  ProductSelectionProduct,
  SelectionFilterKey,
  SelectionLocale,
} from "@/data/products/selection/product-selection.types";

import type {
  ProductSelectionCategoryItem,
  ProductSelectionFilterGroup,
  ProductSelectionSelectedTag,
} from "./product-selection-ui.types";

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 438

  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/μ/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function findPlungerPumpDetailSlug(product: ProductSelectionProduct) {
  const candidates = [
    product.cardTitle?.en,
    product.cardTitle?.zh,
    product.productId,
    product.detailSlug,
  ]
    .map(normalizeModelKey)
    .filter(Boolean);

  const matchedDetail = (plungerPumpDetails as any[]).find((detail) => {
    const detailCandidates = [
      detail.model,
      detail.productId,
      detail.slug,
      detail.detailSlug,
    ]
      .map(normalizeModelKey)
      .filter(Boolean);

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 443

    .replace(/^-+|-+$/g, "");
}

function findPlungerPumpDetailSlug(product: ProductSelectionProduct) {
  const candidates = [
    product.cardTitle?.en,
    product.cardTitle?.zh,
    product.productId,
    product.detailSlug,
  ]
    .map(normalizeModelKey)
    .filter(Boolean);

  const matchedDetail = (plungerPumpDetails as any[]).find((detail) => {
    const detailCandidates = [
      detail.model,
      detail.productId,
      detail.slug,
      detail.detailSlug,
    ]
      .map(normalizeModelKey)
      .filter(Boolean);

    return detailCandidates.some((item) => candidates.includes(item));
  });

  return normalizeDetailPathPart(

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 453

    .map(normalizeModelKey)
    .filter(Boolean);

  const matchedDetail = (plungerPumpDetails as any[]).find((detail) => {
    const detailCandidates = [
      detail.model,
      detail.productId,
      detail.slug,
      detail.detailSlug,
    ]
      .map(normalizeModelKey)
      .filter(Boolean);

    return detailCandidates.some((item) => candidates.includes(item));
  });

  return normalizeDetailPathPart(
    matchedDetail?.slug ||
      matchedDetail?.detailSlug ||
      product.detailSlug
  );
}


/* ===== FOREACH plunger pump model detail href helpers START ===== */

function cleanPlungerHrefText(value: unknown) {

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 463

      .map(normalizeModelKey)
      .filter(Boolean);

    return detailCandidates.some((item) => candidates.includes(item));
  });

  return normalizeDetailPathPart(
    matchedDetail?.slug ||
      matchedDetail?.detailSlug ||
      product.detailSlug
  );
}


/* ===== FOREACH plunger pump model detail href helpers START ===== */

function cleanPlungerHrefText(value: unknown) {
  return String(value || "").trim();
}

function normalizePlungerPathPart(value: unknown) {
  const parts = cleanPlungerHrefText(value).split("/").filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : "";
}

function normalizePlungerModelSlug(value: unknown) {
  return cleanPlungerHrefText(value)

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 464

      .filter(Boolean);

    return detailCandidates.some((item) => candidates.includes(item));
  });

  return normalizeDetailPathPart(
    matchedDetail?.slug ||
      matchedDetail?.detailSlug ||
      product.detailSlug
  );
}


/* ===== FOREACH plunger pump model detail href helpers START ===== */

function cleanPlungerHrefText(value: unknown) {
  return String(value || "").trim();
}

function normalizePlungerPathPart(value: unknown) {
  const parts = cleanPlungerHrefText(value).split("/").filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : "";
}

function normalizePlungerModelSlug(value: unknown) {
  return cleanPlungerHrefText(value)
    .toLowerCase()

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 488

function normalizePlungerModelSlug(value: unknown) {
  return cleanPlungerHrefText(value)
    .toLowerCase()
    .replace(/μ/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getPlungerPumpModelSlugForDetailHref(product: ProductSelectionProduct) {
  const existingSlug = normalizePlungerPathPart(product.detailSlug);

  if (/^(ea|sm|tm)-\d+-(pmma|peek)$/i.test(existingSlug)) {
    return existingSlug.toLowerCase();
  }

  const text = [
    product.cardTitle?.en,
    product.cardTitle?.zh,
    product.productId,
    product.detailSlug,
    product.seriesId,
    product.filters?.filter01,
    product.filters?.filter02,
    product.filters?.filter03,
    product.searchKeywords?.en,
    product.searchKeywords?.zh,
  ]

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 489

  return cleanPlungerHrefText(value)
    .toLowerCase()
    .replace(/μ/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getPlungerPumpModelSlugForDetailHref(product: ProductSelectionProduct) {
  const existingSlug = normalizePlungerPathPart(product.detailSlug);

  if (/^(ea|sm|tm)-\d+-(pmma|peek)$/i.test(existingSlug)) {
    return existingSlug.toLowerCase();
  }

  const text = [
    product.cardTitle?.en,
    product.cardTitle?.zh,
    product.productId,
    product.detailSlug,
    product.seriesId,
    product.filters?.filter01,
    product.filters?.filter02,
    product.filters?.filter03,
    product.searchKeywords?.en,
    product.searchKeywords?.zh,
  ]
    .map(cleanPlungerHrefText)

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 499

  if (/^(ea|sm|tm)-\d+-(pmma|peek)$/i.test(existingSlug)) {
    return existingSlug.toLowerCase();
  }

  const text = [
    product.cardTitle?.en,
    product.cardTitle?.zh,
    product.productId,
    product.detailSlug,
    product.seriesId,
    product.filters?.filter01,
    product.filters?.filter02,
    product.filters?.filter03,
    product.searchKeywords?.en,
    product.searchKeywords?.zh,
  ]
    .map(cleanPlungerHrefText)
    .filter(Boolean)
    .join(" ");

  const directModel = text.match(/\b(EA|SM|TM)[\s_-]*(\d{2,5})(?:\s*(?:UL|U|μL|uL))?[\s_-]*(PMMA|PEEK)\b/i);

  if (directModel) {
    return [
      directModel[1].toLowerCase(),
      String(Number(directModel[2])),
      directModel[3].toLowerCase(),

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 533

  if (seriesMatch && capacityMatch && materialMatch) {
    return [
      seriesMatch[1].toLowerCase(),
      String(Number(capacityMatch[1])),
      materialMatch[1].toLowerCase(),
    ].join("-");
  }

  return normalizePlungerModelSlug(product.cardTitle?.en || product.cardTitle?.zh || product.productId || product.detailSlug);
}

/* ===== FOREACH plunger pump model detail href helpers END ===== */


function makeDetailHref(product: ProductSelectionProduct) {
  const isDiaphragmPump =
    product.categoryId === "pumps" &&
    ["diaphragm-pump", "diaphragm-pumps"].includes(product.productTypeId);

  if (isDiaphragmPump) {
    const rawSlug =
      (product as any).detailSlug ||
      (product as any).seriesSlug ||
      (product as any).seriesId ||
      product.productId;

    const slug = String(rawSlug || "")

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 539

  }

  return normalizePlungerModelSlug(product.cardTitle?.en || product.cardTitle?.zh || product.productId || product.detailSlug);
}

/* ===== FOREACH plunger pump model detail href helpers END ===== */


function makeDetailHref(product: ProductSelectionProduct) {
  const isDiaphragmPump =
    product.categoryId === "pumps" &&
    ["diaphragm-pump", "diaphragm-pumps"].includes(product.productTypeId);

  if (isDiaphragmPump) {
    const rawSlug =
      (product as any).detailSlug ||
      (product as any).seriesSlug ||
      (product as any).seriesId ||
      product.productId;

    const slug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

    return slug
      ? `/products/pumps/diaphragm-pumps/${slug}`

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 546


function makeDetailHref(product: ProductSelectionProduct) {
  const isDiaphragmPump =
    product.categoryId === "pumps" &&
    ["diaphragm-pump", "diaphragm-pumps"].includes(product.productTypeId);

  if (isDiaphragmPump) {
    const rawSlug =
      (product as any).detailSlug ||
      (product as any).seriesSlug ||
      (product as any).seriesId ||
      product.productId;

    const slug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

    return slug
      ? `/products/pumps/diaphragm-pumps/${slug}`
      : "/products/pumps/diaphragm-pumps";
  }


  const isPlungerPump =
    product.categoryId === "pumps" &&
    ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 547

function makeDetailHref(product: ProductSelectionProduct) {
  const isDiaphragmPump =
    product.categoryId === "pumps" &&
    ["diaphragm-pump", "diaphragm-pumps"].includes(product.productTypeId);

  if (isDiaphragmPump) {
    const rawSlug =
      (product as any).detailSlug ||
      (product as any).seriesSlug ||
      (product as any).seriesId ||
      product.productId;

    const slug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

    return slug
      ? `/products/pumps/diaphragm-pumps/${slug}`
      : "/products/pumps/diaphragm-pumps";
  }


  const isPlungerPump =
    product.categoryId === "pumps" &&
    ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 567

  }


  const isPlungerPump =
    product.categoryId === "pumps" &&
    ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);

  if (isPlungerPump) {
    const slug = getPlungerPumpModelSlugForDetailHref(product);

    return slug
      ? `/products/pumps/plunger-pumps/${slug}`
      : "/products/pumps/plunger-pumps";
  }

  return `/products/${product.categoryId}/${product.detailSlug}`;
}

export default function ProductSelectionClient({
  locale = "zh",
  initialCategoryId,
  initialProductTypeId,
  initialFilters,
}: ProductSelectionClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedCategoryId = searchParams.get("category");

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 574

  if (isPlungerPump) {
    const slug = getPlungerPumpModelSlugForDetailHref(product);

    return slug
      ? `/products/pumps/plunger-pumps/${slug}`
      : "/products/pumps/plunger-pumps";
  }

  return `/products/${product.categoryId}/${product.detailSlug}`;
}

export default function ProductSelectionClient({
  locale = "zh",
  initialCategoryId,
  initialProductTypeId,
  initialFilters,
}: ProductSelectionClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedCategoryId = searchParams.get("category");
  const requestedProductTypeId = searchParams.get("productType");

  const pageText =
    PRODUCT_SELECTION_PAGE_TEXT[locale] || PRODUCT_SELECTION_PAGE_TEXT.zh;

  const categoryItems = useMemo(() => getCategoryItems(locale), [locale]);


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 776

        return true;
      }

      const searchText = [
        product.productId,
        product.categoryId,
        product.productTypeId,
        product.seriesId,
        product.detailSlug,
        product.cardTitle.zh,
        product.cardTitle.en,
        product.cardSubtitle.zh,
        product.cardSubtitle.en,
        product.searchKeywords.zh,
        product.searchKeywords.en,
        ...Object.values(product.filters),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchText.includes(keyword);
    });
  }, [activeProductTypeId, categoryProducts, searchKeyword, selectedFilters]);

  /*
   * 当前产品种类介绍数据

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 1268

      sourceLabel: "产品中心",
      productName: getTaxonomyLabel(locale, product.productTypeId),
      productCode: product.productId,
      foreachModel: title,
      competitorModels: [],
      quantity: 1,
      needDrawing: false,
      imagePath: product.imageCard,
      detailHref: makeDetailHref(product),
    };
  }

  function toggleProductInList(product: ProductSelectionProduct) {
    const currentItem = getItem("pump-selection", product.productId);

    if (currentItem) {
      removeItem(currentItem.id);
      return;
    }

    addItem(createProductCartItem(product));
  }

  return (
    <div className="products-selection-page">
<SitePageShell
        breadcrumbAriaLabel={locale === "zh" ? "面包屑导航" : "Breadcrumb"}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 1381

                resetButtonText={pageText.resetFilters}
                selectedTags={selectedTagItems}
                onRemoveTag={removeSelectedTag}
                onResetFilters={resetCurrentFilters}
              />

              {matchedProducts.length > 0 ? (
                <>
                  <ProductCardGrid
                    products={pagedProducts}
                    selectedList={selectedList}
                    detailButtonText={pageText.detailButton}
                    addToListText={pageText.addToList}
                    addedToListText={pageText.addedToList}
                    getTitle={(product) =>
                      getText(locale, product.cardTitle, product.productId)
                    }
                    getSubtitle={(product) =>
                      getText(locale, product.cardSubtitle, "")
                    }
                    getDetailHref={makeDetailHref}
                    onToggleList={toggleProductInList}
                  />

                  <ProductSelectionPagination
                    currentPage={safeCurrentProductPage}
                    totalPages={totalProductPages}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx Line 1393

                    addToListText={pageText.addToList}
                    addedToListText={pageText.addedToList}
                    getTitle={(product) =>
                      getText(locale, product.cardTitle, product.productId)
                    }
                    getSubtitle={(product) =>
                      getText(locale, product.cardSubtitle, "")
                    }
                    getDetailHref={makeDetailHref}
                    onToggleList={toggleProductInList}
                  />

                  <ProductSelectionPagination
                    currentPage={safeCurrentProductPage}
                    totalPages={totalProductPages}
                    previousText={pageText.previousPage}
                    nextText={pageText.nextPage}
                    onPageChange={setCurrentProductPage}
                  />
                </>
              ) : (
                <ProductEmptyState
                  title={pageText.emptyTitle}
                  description={pageText.emptyDescription}
                />
              )}
            </section>

---

## 4. 8 张隔膜泵卡片 detailSlug 是否仍然正确


### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 13

    "productTypeSlug": "diaphragm-pumps",
    "seriesId": "dpl30-liquid-diaphragm-pump",
    "seriesSlug": "dpl30-liquid-diaphragm-pump",
    "detailSlug": "dpl30-24db-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30-24DB-EP/PS",
      "en": "DPL30-24DB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n300 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n300 mL/min\nService life 3000 h"
    },

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 15

    "seriesSlug": "dpl30-liquid-diaphragm-pump",
    "detailSlug": "dpl30-24db-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30-24DB-EP/PS",
      "en": "DPL30-24DB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n300 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n300 mL/min\nService life 3000 h"
    },
    "imageCard": "",
    "imageAlt": {

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 16

    "detailSlug": "dpl30-24db-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30-24DB-EP/PS",
      "en": "DPL30-24DB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n300 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n300 mL/min\nService life 3000 h"
    },
    "imageCard": "",
    "imageAlt": {
      "zh": "DPL30 brushed liquid diaphragm pump, 300 mL/min, 100 kPa",

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 79

    "productTypeSlug": "diaphragm-pumps",
    "seriesId": "dpl30-liquid-diaphragm-pump",
    "seriesSlug": "dpl30-liquid-diaphragm-pump",
    "detailSlug": "dpl30-24bb-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30-24BB-EP/PS",
      "en": "DPL30-24BB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n300 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n300 mL/min\nService life 10000 h"
    },

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 81

    "seriesSlug": "dpl30-liquid-diaphragm-pump",
    "detailSlug": "dpl30-24bb-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30-24BB-EP/PS",
      "en": "DPL30-24BB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n300 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n300 mL/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 82

    "detailSlug": "dpl30-24bb-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30-24BB-EP/PS",
      "en": "DPL30-24BB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n300 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n300 mL/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {
      "zh": "DPL30 brushless liquid diaphragm pump, 300 mL/min, 100 kPa",

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 145

    "productTypeSlug": "diaphragm-pumps",
    "seriesId": "dpl60-liquid-diaphragm-pump",
    "seriesSlug": "dpl60-liquid-diaphragm-pump",
    "detailSlug": "dpl60-24db-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL60-24DB-EP/PS",
      "en": "DPL60-24DB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n600 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n600 mL/min\nService life 3000 h"
    },

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 147

    "seriesSlug": "dpl60-liquid-diaphragm-pump",
    "detailSlug": "dpl60-24db-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL60-24DB-EP/PS",
      "en": "DPL60-24DB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n600 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n600 mL/min\nService life 3000 h"
    },
    "imageCard": "",
    "imageAlt": {

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 148

    "detailSlug": "dpl60-24db-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL60-24DB-EP/PS",
      "en": "DPL60-24DB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n600 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n600 mL/min\nService life 3000 h"
    },
    "imageCard": "",
    "imageAlt": {
      "zh": "DPL60 brushed liquid diaphragm pump, 600 mL/min, 100 kPa",

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 211

    "productTypeSlug": "diaphragm-pumps",
    "seriesId": "dpl60-liquid-diaphragm-pump",
    "seriesSlug": "dpl60-liquid-diaphragm-pump",
    "detailSlug": "dpl60-24bb-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL60-24BB-EP/PS",
      "en": "DPL60-24BB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n600 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n600 mL/min\nService life 10000 h"
    },

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 213

    "seriesSlug": "dpl60-liquid-diaphragm-pump",
    "detailSlug": "dpl60-24bb-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL60-24BB-EP/PS",
      "en": "DPL60-24BB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n600 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n600 mL/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 214

    "detailSlug": "dpl60-24bb-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL60-24BB-EP/PS",
      "en": "DPL60-24BB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n600 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n600 mL/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {
      "zh": "DPL60 brushless liquid diaphragm pump, 600 mL/min, 100 kPa",

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 277

    "productTypeSlug": "diaphragm-pumps",
    "seriesId": "dpl30h-liquid-diaphragm-pump",
    "seriesSlug": "dpl30h-liquid-diaphragm-pump",
    "detailSlug": "dpl30h-24ds-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30H-24DS-EP/PS",
      "en": "DPL30H-24DS-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n300 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n300 mL/min\nService life 3000 h"
    },

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 279

    "seriesSlug": "dpl30h-liquid-diaphragm-pump",
    "detailSlug": "dpl30h-24ds-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30H-24DS-EP/PS",
      "en": "DPL30H-24DS-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n300 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n300 mL/min\nService life 3000 h"
    },
    "imageCard": "",
    "imageAlt": {

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 280

    "detailSlug": "dpl30h-24ds-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30H-24DS-EP/PS",
      "en": "DPL30H-24DS-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n300 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n300 mL/min\nService life 3000 h"
    },
    "imageCard": "",
    "imageAlt": {
      "zh": "DPL30H brushed liquid diaphragm pump, 300 mL/min, 600 kPa",

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 343

    "productTypeSlug": "diaphragm-pumps",
    "seriesId": "dpl30h-liquid-diaphragm-pump",
    "seriesSlug": "dpl30h-liquid-diaphragm-pump",
    "detailSlug": "dpl30h-24bs-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30H-24BS-EP/PS",
      "en": "DPL30H-24BS-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n300 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n300 mL/min\nService life 10000 h"
    },

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 345

    "seriesSlug": "dpl30h-liquid-diaphragm-pump",
    "detailSlug": "dpl30h-24bs-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30H-24BS-EP/PS",
      "en": "DPL30H-24BS-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n300 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n300 mL/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 346

    "detailSlug": "dpl30h-24bs-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30H-24BS-EP/PS",
      "en": "DPL30H-24BS-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n300 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n300 mL/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {
      "zh": "DPL30H brushless liquid diaphragm pump, 300 mL/min, 600 kPa",

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 409

    "productTypeSlug": "diaphragm-pumps",
    "seriesId": "dpgl800-gas-liquid-diaphragm-pump",
    "seriesSlug": "dpgl800-gas-liquid-diaphragm-pump",
    "detailSlug": "dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPGL800-24BS6-EP/PS",
      "en": "DPGL800-24BS6-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n6 L/min\n寿命 10000 h",
      "en": "Brushless motor\n6 L/min\nService life 10000 h"
    },

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 411

    "seriesSlug": "dpgl800-gas-liquid-diaphragm-pump",
    "detailSlug": "dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPGL800-24BS6-EP/PS",
      "en": "DPGL800-24BS6-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n6 L/min\n寿命 10000 h",
      "en": "Brushless motor\n6 L/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 412

    "detailSlug": "dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPGL800-24BS6-EP/PS",
      "en": "DPGL800-24BS6-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n6 L/min\n寿命 10000 h",
      "en": "Brushless motor\n6 L/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {
      "zh": "DPGL800 brushless gas liquid diaphragm pump, 6 L/min, +30 kPa and below -90 kPa",

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 475

    "productTypeSlug": "diaphragm-pumps",
    "seriesId": "dpgl800-gas-liquid-diaphragm-pump",
    "seriesSlug": "dpgl800-gas-liquid-diaphragm-pump",
    "detailSlug": "dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPGL800-24BS6-FF/PS",
      "en": "DPGL800-24BS6-FF/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n6 L/min\n寿命 10000 h",
      "en": "Brushless motor\n6 L/min\nService life 10000 h"
    },

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 477

    "seriesSlug": "dpgl800-gas-liquid-diaphragm-pump",
    "detailSlug": "dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPGL800-24BS6-FF/PS",
      "en": "DPGL800-24BS6-FF/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n6 L/min\n寿命 10000 h",
      "en": "Brushless motor\n6 L/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 478

    "detailSlug": "dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPGL800-24BS6-FF/PS",
      "en": "DPGL800-24BS6-FF/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n6 L/min\n寿命 10000 h",
      "en": "Brushless motor\n6 L/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {
      "zh": "DPGL800 brushless gas liquid diaphragm pump, 6 L/min, +30 kPa and below -90 kPa",

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 543

      "zh": "隔膜泵",
      "en": "Diaphragm Pumps"
    },
    "href": "/products/pumps/diaphragm-pumps",
    "enabled": true,
    "order": 20
  }
] as any[];

export const diaphragmPumpFilterLabels = [
  {
    "productTypeId": "diaphragm-pump",

---

## 5. 当前详情页是否仍是 8 个配置级页面

count: 8
dpl30-24db-ep-ps-liquid-diaphragm-pump => DPL30-24DB-EP/PS => 鍨嬪彿閫夋嫨
dpl30-24bb-ep-ps-liquid-diaphragm-pump => DPL30-24BB-EP/PS => 鍨嬪彿閫夋嫨
dpl60-24db-ep-ps-liquid-diaphragm-pump => DPL60-24DB-EP/PS => 鍨嬪彿閫夋嫨
dpl60-24bb-ep-ps-liquid-diaphragm-pump => DPL60-24BB-EP/PS => 鍨嬪彿閫夋嫨
dpl30h-24ds-ep-ps-liquid-diaphragm-pump => DPL30H-24DS-EP/PS => 鍨嬪彿閫夋嫨
dpl30h-24bs-ep-ps-liquid-diaphragm-pump => DPL30H-24BS-EP/PS => 鍨嬪彿閫夋嫨
dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump => DPGL800-24BS6-EP/PS => 鍨嬪彿閫夋嫨
dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump => DPGL800-24BS6-FF/PS => 鍨嬪彿閫夋嫨

---

## 6. build 快速检查


> foreach-website-2026@0.1.0 build
> next build

鈻?Next.js 16.2.6 (Turbopack)
- Environments: .env.local

  Creating an optimized production build ...
鉁?Compiled successfully in 6.0s
  Running TypeScript ...
  Finished TypeScript in 4.4s ...
  Collecting page data using 23 workers ...
  Generating static pages using 23 workers (0/577) ...
  Generating static pages using 23 workers (144/577) 
  Generating static pages using 23 workers (288/577) 
  Generating static pages using 23 workers (432/577) 
鉁?Generating static pages using 23 workers (577/577) in 1897ms
  Finalizing page optimization ...

Route (app)
鈹?鈼?/
鈹?鈼?/_not-found
鈹?鈼?/[locale]
鈹?鈹?/en
鈹?鈹?/es
鈹?鈹?/fr
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/culture
鈹?鈹?/en/about/culture
鈹?鈹?/es/about/culture
鈹?鈹?/fr/about/culture
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/foreach
鈹?鈹?/en/about/foreach
鈹?鈹?/es/about/foreach
鈹?鈹?/fr/about/foreach
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/history
鈹?鈹?/en/about/history
鈹?鈹?/es/about/history
鈹?鈹?/fr/about/history
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/quality
鈹?鈹?/en/about/quality
鈹?鈹?/es/about/quality
鈹?鈹?/fr/about/quality
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/research-manufacturing
鈹?鈹?/en/about/research-manufacturing
鈹?鈹?/es/about/research-manufacturing
鈹?鈹?/fr/about/research-manufacturing
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/analytical-instruments
鈹?鈹?/en/applications/analytical-instruments
鈹?鈹?/es/applications/analytical-instruments
鈹?鈹?/fr/applications/analytical-instruments
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/environmental-monitoring
鈹?鈹?/en/applications/environmental-monitoring
鈹?鈹?/es/applications/environmental-monitoring
鈹?鈹?/fr/applications/environmental-monitoring
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/ivd
鈹?鈹?/en/applications/ivd
鈹?鈹?/es/applications/ivd
鈹?鈹?/fr/applications/ivd
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/lab-automation
鈹?鈹?/en/applications/lab-automation
鈹?鈹?/es/applications/lab-automation
鈹?鈹?/fr/applications/lab-automation
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/life-science
鈹?鈹?/en/applications/life-science
鈹?鈹?/es/applications/life-science
鈹?鈹?/fr/applications/life-science
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/synthetic-biology
鈹?鈹?/en/applications/synthetic-biology
鈹?鈹?/es/applications/synthetic-biology
鈹?鈹?/fr/applications/synthetic-biology
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/contact
鈹?鈹?/en/contact
鈹?鈹?/es/contact
鈹?鈹?/fr/contact
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/contact/distributor
鈹?鈹?/en/contact/distributor
鈹?鈹?/es/contact/distributor
鈹?鈹?/fr/contact/distributor
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/products
鈹?鈹?/en/products
鈹?鈹?/es/products
鈹?鈹?/fr/products
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources
鈹?鈹?/en/resources
鈹?鈹?/es/resources
鈹?鈹?/fr/resources
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/datasheets
鈹?鈹?/en/resources/datasheets
鈹?鈹?/es/resources/datasheets
鈹?鈹?/fr/resources/datasheets
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/installation-guide
鈹?鈹?/en/resources/installation-guide
鈹?鈹?/es/resources/installation-guide
鈹?鈹?/fr/resources/installation-guide
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/installation-guide/[slug]
鈹?鈹?/en/resources/installation-guide/hard-tube-fitting-guide
鈹?鈹?/en/resources/installation-guide/plunger-pump-install-guide
鈹?鈹?/en/resources/installation-guide/diaphragm-pump-guide
鈹?鈹?[+22 more paths]
鈹?鈼?/[locale]/resources/material-compatibility
鈹?鈹?/en/resources/material-compatibility
鈹?鈹?/es/resources/material-compatibility
鈹?鈹?/fr/resources/material-compatibility
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/news
鈹?鈹?/en/resources/news
鈹?鈹?/es/resources/news
鈹?鈹?/fr/resources/news
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/news/[slug]
鈹?鈹?/en/resources/news/adlm-2026
鈹?鈹?/en/resources/news/whx-labs-dubai-2026
鈹?鈹?/en/resources/news/gazelle-enterprise-2025
鈹?鈹?[+47 more paths]
鈹?鈼?/[locale]/resources/selection-support/fitting-replacement
鈹?鈹?/en/resources/selection-support/fitting-replacement
鈹?鈹?/es/resources/selection-support/fitting-replacement
鈹?鈹?/fr/resources/selection-support/fitting-replacement
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/selection-support/fitting-replacement/q20/[productCode]
鈹?鈹?/en/resources/selection-support/fitting-replacement/q20/839041
鈹?鈹?/en/resources/selection-support/fitting-replacement/q20/839130
鈹?鈹?/en/resources/selection-support/fitting-replacement/q20/839019
鈹?鈹?[+172 more paths]
鈹?鈼?/[locale]/resources/technical-articles
鈹?鈹?/en/resources/technical-articles
鈹?鈹?/es/resources/technical-articles
鈹?鈹?/fr/resources/technical-articles
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/technical-articles/[slug]
鈹?鈹?/en/resources/technical-articles/selecting-microfluidic-fittings
鈹?鈹?/en/resources/technical-articles/peek-ptfe-pfa-material-differences
鈹?鈹?/en/resources/technical-articles/low-pressure-vs-high-pressure-fittings
鈹?鈹?[+57 more paths]
鈹?鈼?/about/culture
鈹?鈼?/about/foreach
鈹?鈼?/about/history
鈹?鈼?/about/quality
鈹?鈼?/about/research-manufacturing
鈹?鈼?/applications/analytical-instruments
鈹?鈼?/applications/environmental-monitoring
鈹?鈼?/applications/ivd
鈹?鈼?/applications/lab-automation
鈹?鈼?/applications/life-science
鈹?鈼?/applications/synthetic-biology
鈹?鈼?/contact
鈹?鈼?/contact/distributor
鈹?鈼?/products
鈹?鈼?/products/[category]
鈹?鈹?/products/pumps
鈹?鈼?/products/[category]/[slug]
鈹?鈹?/products/pumps/plunger-pumps
鈹?鈹?/products/pumps/diaphragm-pumps
鈹?鈹?/products/pumps/pipetting-pumps
鈹?鈹?[+17 more paths]
鈹?鈼?/products/[category]/[slug]/[seriesSlug]
鈹?鈹?/products/pumps/plunger-pumps/ea-standard-piston-pumps
鈹?鈹?/products/pumps/plunger-pumps/sm-miniature-piston-pumps
鈹?鈹?/products/pumps/plunger-pumps/tm-ultra-compact-piston-pumps
鈹?鈹?[+3 more paths]
鈹?鈼?/products/pumps/diaphragm-pumps/[slug]
鈹?鈹?/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump
鈹?鈹?/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump
鈹?鈹?/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump
鈹?鈹?[+9 more paths]
鈹?鈼?/products/pumps/plunger-pumps/[slug]
鈹?鈹?/products/pumps/plunger-pumps/ea-100-pmma
鈹?鈹?/products/pumps/plunger-pumps/ea-100-peek
鈹?鈹?/products/pumps/plunger-pumps/ea-250-pmma
鈹?鈹?[+30 more paths]
鈹?鈼?/resources
鈹?鈼?/resources/datasheets
鈹?鈼?/resources/installation-guide
鈹?鈼?/resources/installation-guide/[slug]
鈹?鈹?/resources/installation-guide/hard-tube-fitting-guide
鈹?鈹?/resources/installation-guide/plunger-pump-install-guide
鈹?鈹?/resources/installation-guide/diaphragm-pump-guide
鈹?鈹?[+2 more paths]
鈹?鈼?/resources/material-compatibility
鈹?鈼?/resources/news
鈹?鈼?/resources/news/[slug]
鈹?鈹?/resources/news/adlm-2026
鈹?鈹?/resources/news/whx-labs-dubai-2026
鈹?鈹?/resources/news/gazelle-enterprise-2025
鈹?鈹?[+7 more paths]
鈹?鈼?/resources/selection-support/fitting-replacement
鈹?鈼?/resources/selection-support/fitting-replacement/q20/[productCode]
鈹?鈹?/resources/selection-support/fitting-replacement/q20/839041
鈹?鈹?/resources/selection-support/fitting-replacement/q20/839130
鈹?鈹?/resources/selection-support/fitting-replacement/q20/839019
鈹?鈹?[+32 more paths]
鈹?鈼?/resources/technical-articles
鈹?鈼?/resources/technical-articles/[slug]
  鈹?/resources/technical-articles/selecting-microfluidic-fittings
  鈹?/resources/technical-articles/peek-ptfe-pfa-material-differences
  鈹?/resources/technical-articles/low-pressure-vs-high-pressure-fittings
  鈹?[+9 more paths]


鈼? (Static)  prerendered as static content
鈼? (SSG)     prerendered as static HTML (uses generateStaticParams)

