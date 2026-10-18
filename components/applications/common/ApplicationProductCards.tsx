import Image from "next/image";
import Link from "next/link";
import styles from "./ApplicationProductCards.module.css";

export type ApplicationProductCard = {
  title: string;
  href: string;
  imageSrc: string;
  imageAlt?: string;
  imageScale?: number;
  description?: string;
};

/** Shared product cards for application pages; content and translations belong to the caller. */
export default function ApplicationProductCards({ products, viewDetails }: {
  products: readonly ApplicationProductCard[];
  viewDetails: string;
}) {
  if (!products.length) return null;
  return <div className={styles.productLinks} data-application-product-cards>
    <ul className={styles.cards}>
      {products.map(product => <li key={`${product.href}-${product.title}`}>
        <Link className={styles.card} href={product.href} prefetch={false}>
          <div className={styles.image} data-application-product-image>
            <div className={styles.imageInner}>
              <Image src={product.imageSrc} alt={product.imageAlt || product.title} fill sizes="(max-width: 600px) 100vw, 280px" style={product.imageScale ? { transform: `scale(${product.imageScale})` } : undefined} />
            </div>
          </div>
          <div className={styles.details}>
            <h3 className={styles.title} title={product.title}>{product.title}</h3>
            {product.description ? <p className={styles.description}>{product.description}</p> : null}
            <span className={styles.action}>{viewDetails}</span>
          </div>
        </Link>
      </li>)}
    </ul>
  </div>;
}
