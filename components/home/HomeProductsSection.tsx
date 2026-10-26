"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HomeProductsSectionData } from "@/data/home-products.types";
import categoryTabStyles from "@/components/common/product-category-tab.module.css";
import styles from "./EnglishHomeSections.module.css";
import HomeSectionMoreLink from "./HomeSectionMoreLink";

export default function HomeProductsSection({ data }: { data: HomeProductsSectionData }) {
  const [activeGroup, setActiveGroup] = useState<string>("Featured");
  const products = data.products.filter((product) =>
    activeGroup === "Featured"
      ? product.featured
      : product.group === activeGroup && !["needle", "tube", "assembly"].includes(product.id),
  );
  const { copy } = data;

  return (
    <section id="products" className={styles.section} aria-labelledby="home-products-title">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div className="home-news-title-wrap">
            <h2 id="home-products-title" className="home-news-main-title">{copy.title}</h2>
          </div>
        </div>
        <div className={styles.productToolbar}>
          <div className={styles.filters} role="group" aria-label={copy.categoriesAriaLabel}>
          {data.groups.map((group) => (
            <button key={group.id} type="button" className={categoryTabStyles.tab}
              aria-pressed={activeGroup === group.id} aria-controls="home-product-grid"
              onClick={() => setActiveGroup(group.id)}>{group.label}</button>
          ))}
          </div>
          <div className={styles.catalogNote}>
            <HomeSectionMoreLink href={data.productCenterHref}>{copy.productCenter}</HomeSectionMoreLink>
          </div>
        </div>
        <div id="home-product-grid" className={styles.productGrid}>
          {products.map((product) => (
            <Link key={product.id} href={product.href} prefetch={false} className={styles.product}
              aria-label={(product.illustrative ? copy.discuss : copy.explore).replace('{name}', product.name)}>
              <div className={`${styles.visual} ${product.id === "assembly" || product.id === "tube" ? styles.visualCover : ""}`}>
                <Image src={product.image} alt={product.illustrative ? copy.conceptAlt : product.imageAlt ?? `${product.name} — FOREACH`}
                  fill sizes="(max-width: 760px) 46vw, (max-width: 1600px) 23vw, 350px" />
                {product.illustrative && <span className={styles.conceptLabel}>{copy.conceptLabel}</span>}
              </div>
              <div className={styles.productText}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className={styles.srOnly} role="status">{copy.resultCount.replace('{count}', String(products.length))}</p>
      </div>
    </section>
  );
}
