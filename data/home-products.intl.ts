import { getLanguageHref } from '@/lib/i18n/language-switch';
import { getGermanDraftLink, getItalianDraftLink, getHindiDraftLink } from '@/lib/i18n/draft-languages';
import { englishHomeProducts, productGroups } from './home-products.en';
import de from './home-products-locales/de';
import it from './home-products-locales/it.json';
import hi from './home-products-locales/hi.json';
import es from './home-products-locales/es.json';
import fr from './home-products-locales/fr.json';
import ko from './home-products-locales/ko.json';
import ru from './home-products-locales/ru.json';
import type { HomeProductsCopy, HomeProductsLocale, HomeProductsSectionData } from './home-products.types';

const localizedCopy: Record<Exclude<HomeProductsLocale, 'en'>, HomeProductsCopy> = { es, fr, ko, ru, de, it, hi };

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
        ...(locale === 'it' ? { imageAlt: translation.imageAlt ?? translation.name } : {}),
        // Some localized categories use selection queries instead of English paths.
        ...(locale === 'de'
          ? getGermanDraftLink(getLanguageHref(product.href, 'en'))
          : locale === 'it' ? getItalianDraftLink(getLanguageHref(product.href, 'en'))
          : locale === 'hi' ? getHindiDraftLink(getLanguageHref(product.href, 'en'))
          : { href: getLanguageHref(product.href, locale) }),
      };
    }),
    productCenterHref: locale === 'hi' ? getHindiDraftLink('/en/products/').href : locale === 'it' ? getItalianDraftLink('/en/products/').href : `/${locale}/products/`,
  };
}
