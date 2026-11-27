import Image from "next/image";
import { hindiEnglishFallbackSuffix } from "@/lib/i18n/draft-languages";
import Link from "next/link";
import { getRelatedResourcesText } from "@/data/resources/related-resources/related-resources.intl";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import type { ArticleRelatedProduct } from "@/services/resources/technical-articles/getArticleRelatedProducts";
import styles from "./ArticleRelatedProducts.module.css";

export default function ArticleRelatedProducts({ products, locale, title }: {
  products: readonly ArticleRelatedProduct[];
  locale: TechnicalArticleLocale | "de" | "it" | "hi";
  title?: string;
}) {
  if (!products.length) return null;
  const ui = getRelatedResourcesText(locale);
  return <aside className={styles.rail} aria-label={title ?? ui.relatedProducts} data-article-products>
    <div className={styles.sticky}>
      <h2 className={styles.heading}>{title ?? ui.relatedProducts}</h2>
      <div className={styles.cards}>
        {products.map(product => <Link className={styles.card} href={product.href} hrefLang={product.destinationLanguage} key={product.id}
          data-analytics-section="article_sidebar_products" data-analytics-product-id={product.id} data-analytics-product-name={product.title}>
          <div className={styles.image} data-fill={product.imageFill || undefined}
            data-natural-ratio={product.imageAspectRatio || undefined}
            style={product.imageAspectRatio ? { aspectRatio: product.imageAspectRatio } : undefined}>
            <Image src={product.imageSrc} alt={product.imageAlt || product.title} fill sizes="240px" />
          </div>
          <div className={styles.details}>
            <h3 className={styles.title} title={product.title}>{product.title}</h3>
            <span className={styles.action}>{product.destinationLanguage
              ? locale === "hi" ? (product.destinationLanguage === "en" ? ui.viewDetails + hindiEnglishFallbackSuffix : ui.viewDetails)
                : locale === "it" ? (product.destinationLanguage === "en" ? ui.viewDetails + " (in inglese)" : ui.viewDetails) : product.destinationLanguage === "en" ? "Produkt auf Englisch ansehen" : "Produkt ansehen"
              : ui.viewDetails}</span>
          </div>
        </Link>)}
      </div>
    </div>
  </aside>;
}
