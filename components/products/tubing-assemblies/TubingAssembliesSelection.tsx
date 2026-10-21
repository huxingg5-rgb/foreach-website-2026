"use client";

import { useId, useState, type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SitePageShell from "@/components/layout/SitePageShell";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
import ProductCategoryTabs from "@/components/products/selection/ProductCategoryTabs";
import ProductFilterPanel from "@/components/products/selection/ProductFilterPanel";
import ProductSelectionToolbar from "@/components/products/selection/ProductSelectionToolbar";
import TubingAssemblyCardGrid from "./TubingAssemblyCardGrid";
import ProductEmptyState from "@/components/products/selection/ProductEmptyState";
import type { ProductSelectionCategoryItem, ProductSelectionFilterGroup, ProductSelectionProductItem } from "@/components/products/selection/product-selection-ui.types";
import { tubingAssemblyTypes, type TubingAssemblyType } from "@/data/products/tubing-assemblies.en";
import type { TubingAssemblySelectionContent } from "@/data/products/tubing-assemblies/localized";
import { getTubingAssemblyLocalePrefix } from "@/data/products/tubing-assemblies/locales";

export default function TubingAssembliesSelection({ initialType = "", content, afterContent }: { initialType?: TubingAssemblyType["id"] | ""; content: TubingAssemblySelectionContent; afterContent?: ReactNode }) {
  const { locale, ui, cards: products, typeNames, overview, intros, introImages } = content;
  const prefix = getTubingAssemblyLocalePrefix(locale);
  const getPath = (id?: string) => `${prefix}/products/tubing-assemblies/${id ? `${id}/` : ""}`;
  const category: ProductSelectionCategoryItem = { id: "tubing-assemblies", label: ui.category, description: overview.paragraphs[0], sortOrder: 100 };
  const categories: ProductSelectionCategoryItem[] = [...(["pumps", "valves", "probes", "fittings", "tubing", "control"] as const).map((id, sortOrder) => ({ id, label: ui[id], sortOrder, description: "", href: id === "control" && locale !== "en" ? `${prefix}/products/?category=control` : `${prefix}/products/${id}/` })), category];
  const filterGroup: ProductSelectionFilterGroup = { key: "productType", title: ui.productType, inputType: "single", layout: "two", options: tubingAssemblyTypes.map(item => ({ value: item.id, label: typeNames[item.id] })) };
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const activeType = initialType;
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const introId = useId();
  const activeTypeData = tubingAssemblyTypes.find(type => type.id === activeType);
  const intro = activeTypeData ? intros[activeTypeData.id] : overview;
  const introImage = activeTypeData ? introImages[activeTypeData.id] : undefined;
  // Match the tubing overview (one paragraph) and type-page preview (two).
  const collapsedParagraphCount = activeTypeData ? 2 : 1;
  const IntroContainer = activeTypeData ? "section" : "header";
  const { items, getItem, addItem, removeItem } = useSelectionCart();
  const selectedList = new Set(items.filter(item => item.sourceType === "pump-selection").map(item => item.productCode));
  const matchedProducts = products.filter(product => {
    if (activeType && product.productTypeId !== activeType) return false;
    const type = tubingAssemblyTypes.find(item => item.id === product.productTypeId)!;
    const text = [type.name, typeNames[type.id], product.cardTitle, product.cardSubtitle, ...product.specs.map(spec => spec.value)].join(" ").toLocaleLowerCase(locale);
    return query.toLowerCase().split(/\s+/).filter(Boolean).every(word => text.includes(word));
  });

  function resetFilters() {
    if (activeType) router.push(getPath(), { scroll: false });
    setExpanded(false);
    setQuery("");
    setSearchInput("");
  }

  function toggleProduct(product: ProductSelectionProductItem) {
    const existing = getItem("pump-selection", product.productId);
    if (existing) { removeItem(existing.id); return; }
    addItem({
      sourceType: "pump-selection", sourceLabel: ui.product, productName: ui.category,
      productCode: product.productId, foreachModel: String(product.cardTitle),
      competitorModels: [], quantity: 1, needDrawing: false,
      imagePath: product.imageCard, detailHref: product.detailHref,
    });
  }

  return <div className="products-selection-page">
    <SitePageShell breadcrumbItems={[
      { label: ui.home, href: `${prefix}/` }, { label: ui.products, href: `${prefix}/products/` },
      { label: ui.category, ...(activeType ? { href: getPath() } : {}) },
      ...(activeType ? [{ label: typeNames[activeType] }] : []),
    ]}>
      <main className="products-main">
        <div className="products-container">
          <ResourceSearchBar
            value={searchInput}
            onChange={value => { setSearchInput(value); if (!value.trim()) setQuery(""); }}
            onSearch={value => { setQuery(value.trim()); }}
            placeholder={ui.searchPlaceholder}
            searchButtonText={ui.search} showRecentKeywords={false} context="product-selection"
          />
          <ProductCategoryTabs categories={categories} activeCategoryId={category.id}
            activeCategoryLabel={category.label} mobileCategoryOpen={mobileCategoryOpen}
            mobileCategoryPrefix={ui.currentCategory}
            onToggleMobileCategory={() => setMobileCategoryOpen(value => !value)}
            onCategoryChange={resetFilters}
          />
          <IntroContainer className={activeTypeData ? "product-type-intro-module tubing-type-intro-module" : "category-overview-heading category-overview-intro"}
            aria-label={intro.title} data-product-type-id={activeType}>
            {activeTypeData && <div className="product-type-intro-image">
              <Image src={introImage?.src ?? activeTypeData.image} alt={introImage?.alt ?? typeNames[activeTypeData.id]} width={430} height={320} />
            </div>}
            <div className={`product-type-intro-copy product-type-intro-copy--collapsible product-type-intro-copy--seo-preserved${expanded ? " is-expanded" : ""}`}>
              <h1 className="product-type-intro-heading">{intro.title}</h1>
              <div className="product-type-intro-paragraphs" id={introId}>
                {intro.paragraphs.map((paragraph, index) => <p key={paragraph}
                  className={index >= collapsedParagraphCount ? "product-type-intro-paragraph--collapsed" : undefined}
                  aria-hidden={index >= collapsedParagraphCount && !expanded ? true : undefined}>{paragraph}</p>)}
              </div>
              <div className="product-type-intro-disclosure-row">
                <button type="button" className="product-type-intro-disclosure" aria-controls={introId} aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>
                  {expanded ? ui.showLess : ui.showMore}<span aria-hidden="true">{expanded ? "<" : ">"}</span>
                </button>
              </div>
            </div>
          </IntroContainer>
          <section className="selection-section">
            <div className="selection-layout">
              <ProductFilterPanel activeCategory={category} activeProductTypeId={activeType}
                productTypeResultCount={matchedProducts.length} filterGroups={[filterGroup]}
                mobileOpenFilterGroups={{ productType: mobileFiltersOpen }}
                onToggleMobileGroup={() => setMobileFiltersOpen(value => !value)}
                isOptionActive={(_, value) => value === activeType}
                onFilterChange={(_, value) => {
                  const nextType = tubingAssemblyTypes.find(type => type.id === value);
                  if (nextType) router.push(getPath(activeType === value ? undefined : nextType.id), { scroll: false });
                }}
                emptyText={ui.noFilters}
              />
              <section className="product-area" id="product-selection-results">
                <ProductSelectionToolbar total={matchedProducts.length} showResultSummary={false}
                  resultPrefix="" resultSuffix="" resetButtonText={ui.clearFilters}
                  selectedTags={activeType ? [{ key: "productType", value: activeType, label: typeNames[activeType] }] : []}
                  onResetFilters={resetFilters}
                />
                {matchedProducts.length ? <TubingAssemblyCardGrid products={matchedProducts} locale={locale} copy={ui}
                  selectedList={selectedList}
                  onToggleList={toggleProduct}
                /> : <ProductEmptyState title={ui.emptyTitle} description={ui.emptyDescription} />}
              </section>
            </div>
          </section>
          {afterContent}
        </div>
      </main>
    </SitePageShell>
  </div>;
}
