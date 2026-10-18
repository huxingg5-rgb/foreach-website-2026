import { reviewProductCards } from '../english-review-resources';
import type { ApplicationBlock, ApplicationInlineLink } from '../analytical-documents/types';
import { getPipettingSeriesSlug } from '@/data/products/selection/pipetting-pump-routes';
import { getSyringeModelPath, syringeModelRoutes } from '@/data/products/selection/syringe-pump-routes';
import { localizeIvdHref, type IvdLocale } from './routes';
import { ivdProductLabel } from './ui';

export function getIvdProductInlineLinks(locale: IvdLocale): ApplicationInlineLink[] {
  const keys = ['ea', 'sm', 'tm', 'hld', 'hmd', 'smtp', 'dpl30', 'dpl60', 'dpl30h', 'dpgl', 'mrv', 'sv', 'abd', 'pdm'] as const;
  const model: Record<string, string> = { dpgl: 'DPGL800', mrv: 'MRV3', sv: 'SV10', pdm: 'PDM5' };
  return [
    ...keys.map(key => ({ text: model[key] ?? key.toUpperCase(), href: localizeIvdHref(reviewProductCards[key].href, locale), title: ivdProductLabel(locale, key) })),
    ...syringeModelRoutes.map(route => ({ text: route.model.toUpperCase(), href: getSyringeModelPath(locale, route.legacy)! })),
    ...(['smtp2', 'smtp4'] as const).map(key => ({ text: key.toUpperCase(), href: `/${locale}/products/pumps/pipetting-pumps/${getPipettingSeriesSlug(key)}/` })),
  ];
}
export function linkIvdProductMentions(block: ApplicationBlock, locale: IvdLocale): ApplicationBlock {
  const text = block.type === 'paragraph' || block.type === 'callout' ? block.text
    : block.type === 'table' ? block.rows.flat().join('\n')
    : block.type === 'list' ? block.items.join('\n') : '';
  const links = getIvdProductInlineLinks(locale).filter(link => new RegExp(`(^|[^A-Za-z0-9])${link.text}(?![A-Za-z0-9])`).test(text));
  if (!links.length) return block;
  const existing = block.inlineLinks ?? [];
  return { ...block, inlineLinks: [...existing, ...links.filter(link => !existing.some(item => item.text === link.text))] };
}
