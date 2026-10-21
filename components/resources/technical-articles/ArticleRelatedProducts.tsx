import Image from "next/image";
import Link from "next/link";
import { getRelatedResourcesText } from "@/data/resources/related-resources/related-resources.intl";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import type { ArticleRelatedProduct } from "@/services/resources/technical-articles/getArticleRelatedProducts";
import styles from "./ArticleRelatedProducts.module.css";

export default function ArticleRelatedProducts({ products, locale, title }: {
  products: readonly ArticleRelatedProduct[];
  locale: TechnicalArticleLocale;
  title?: string;
}) {
  if (!products.length) return null;
  const ui = getRelatedResourcesText(locale);
  return <aside className={styles.rail} aria-label={title ?? ui.relatedProducts} data-article-products>
    <div className={styles.sticky}>
      <h2 className={styles.heading}>{title ?? ui.relatedProducts}</h2>
      <div className={styles.cards}>
        {products.map(product => <Link className={styles.card} href={product.href} key={product.id}>
          <div className={styles.image} data-fill={product.imageFill || undefined}
            data-natural-ratio={product.imageAspectRatio || undefined}
            style={product.imageAspectRatio ? { aspectRatio: product.imageAspectRatio } : undefined}>
            <Image src={product.imageSrc} alt={product.imageAlt || product.title} fill sizes="240px" />
          </div>
          <div className={styles.details}>
            <h3 className={styles.title} title={product.title}>{product.title}</h3>
            <span className={styles.action}>{ui.viewDetails}</span>
          </div>
        </Link>)}
      </div>
    </div>
  </aside>;
}
