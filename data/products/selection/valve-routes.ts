import type { SelectionLocale } from './product-selection.types';

export const valveSeriesRoutes = [
  {slug: 'rotary-valves', productTypeId: '旋转阀'},
  {slug: 'high-pressure-valves', productTypeId: '高压阀'},
  {slug: 'solenoid-valves', productTypeId: '电磁阀'},
] as const;
export const valveLocales = ['zh','en','es','fr','ko','ru'] as const;
export function normalizeValveLocale(locale: string): SelectionLocale {
  return valveLocales.includes(locale as SelectionLocale) ? locale as SelectionLocale : 'zh';
}
export function getValveSeriesRoute(value: string | undefined) {
  return valveSeriesRoutes.find(route => route.slug === value || route.productTypeId === value);
}
export function getValveSelectionPath(locale: string, value?: string) {
  const prefix = normalizeValveLocale(locale) === 'zh' ? '' : '/' + locale;
  const route = getValveSeriesRoute(value);
  return prefix + '/products/valves/' + (route ? route.slug + '/' : '');
}
export function getHpValveDetailPath(locale: string) {
  return getValveSelectionPath(locale, 'high-pressure-valves') + 'hp/';
}
/** Only call for product-detail references, never for category/list links. */
export function normalizeHpProductHref(href: string) {
  return href.replace(/^(\/(?:en\/|es\/|fr\/|ko\/|ru\/)?products\/valves\/high-pressure-valves)\/?$/, '$1/hp/');
}
export const valveBreadcrumbLabels: Record<SelectionLocale, {category:string; hp:string}> = {
  zh:{category:'阀系列',hp:'HP 高压旋转阀'},
  en:{category:'Valves',hp:'HP High-Pressure Rotary Valve'},
  es:{category:'Válvulas',hp:'Válvula rotativa de alta presión HP'},
  fr:{category:'Vannes',hp:'Vanne rotative haute pression HP'},
  ko:{category:'밸브',hp:'HP 고압 로터리 밸브'},
  ru:{category:'Клапаны',hp:'Роторный клапан высокого давления HP'},
};
