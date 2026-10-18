import { getLanguageHref } from '@/lib/i18n/language-switch';
import { englishHomeProducts, productGroups } from './home-products.en';
import es from './home-products-locales/es.json';
import fr from './home-products-locales/fr.json';
import ko from './home-products-locales/ko.json';
import ru from './home-products-locales/ru.json';
import type { HomeProductsCopy, HomeProductsLocale, HomeProductsSectionData } from './home-products.types';

const localizedCopy: Record<Exclude<HomeProductsLocale, 'en'>, HomeProductsCopy> = { es, fr, ko, ru };

const englishCopy: HomeProductsSectionData['copy'] = {
  title: 'Our Products',
  categoriesAriaLabel: 'Product categories',
  productCenter: 'Product Center',
  explore: 'Explore {name}',
  discuss: 'Discuss {name}',
  conceptAlt: 'Illustrative tubing assembly concept',
  conceptLabel: 'Illustrative rendering',
  resultCount: '{count} product families shown',
};

// Prepare only the current locale on the server; the client shares one renderer.
export function getHomeProductsSectionData(locale: HomeProductsLocale): HomeProductsSectionData {
  if (locale === 'en') {
    return {
      locale,
      copy: englishCopy,
      groups: productGroups.map(id => ({ id, label: id })),
      products: englishHomeProducts,
      productCenterHref: '/en/products/',
    };
  }

  const { groups, products, ...copy } = localizedCopy[locale];
  return {
    locale,
    copy,
    groups: productGroups.map(id => ({ id, label: groups[id] })),
    products: englishHomeProducts.map(product => {
      const translation = products[product.id];
      if (!translation?.name || !translation.description) {
        throw new Error(`Missing homepage product translation: ${locale}/${product.id}`);
      }
      return {
        ...product,
        ...translation,
        // Some localized categories use selection queries instead of English paths.
        href: getLanguageHref(product.href, locale),
      };
    }),
    productCenterHref: `/${locale}/products/`,
  };
}
