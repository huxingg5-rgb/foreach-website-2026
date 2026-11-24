import type { LocaleCode } from '@/data/languages';
import { getLocalizedSiteHref } from '@/lib/seo/site-url';
import en from './inkjet-filtration-locales/en.json';
import es from './inkjet-filtration-locales/es.json';
import fr from './inkjet-filtration-locales/fr.json';
import ko from './inkjet-filtration-locales/ko.json';
import ru from './inkjet-filtration-locales/ru.json';
import zh from './inkjet-filtration-locales/zh-CN.json';
import { industrialInkjetPrinting } from './industrial-inkjet-printing';
import { getInkjetFiltrationHref } from './industrial-inkjet-filtration-route';
import { inkCheckValve, inkFilter, pressureSensorCard, type InkjetApplicationPage } from './industrial-inkjet-printing.zh';

export { getInkjetFiltrationHref };
export type InkjetFiltrationLocale = LocaleCode;

const translations = { en, es, fr, ko, ru, 'zh-CN': zh } satisfies Record<LocaleCode, typeof en>;
const starvationGuide = '/resources/technical-articles/ink-starvation-inkjet-troubleshooting/';

export function getInkjetFiltrationPage(locale: InkjetFiltrationLocale): InkjetApplicationPage {
  const copy = translations[locale];
  const filterHref = getLocalizedSiteHref(inkFilter.href, locale);
  const valveHref = getLocalizedSiteHref(inkCheckValve.href, locale);
  const sensor = {
    ...pressureSensorCard,
    href: getLocalizedSiteHref(pressureSensorCard.href, locale),
    title: copy.sensorTitle,
    imageAlt: copy.sensorAlt,
  };
  return {
    contentLocale: locale,
    href: getInkjetFiltrationHref(locale),
    image: industrialInkjetPrinting.scenes[0].image,
    pumps: [],
    articles: [],
    relatedProducts: [sensor],
    contactDescription: copy.contactDescription,
    document: {
      slug: 'ink-filtration-and-check-valves',
      kind: 'task',
      title: copy.title,
      navLabel: copy.title,
      seoTitle: locale === 'zh-CN' ? copy.title + '｜恒永达' : copy.title + ' | FOREACH',
      description: copy.description,
      eyebrow: copy.eyebrow,
      keywords: copy.keywords,
      intro: [{ type: 'paragraph', text: copy.intro }],
      sections: [
        {
          id: 'inkjet-filter-and-check-valve-selection',
          title: copy.location.title,
          tocLabel: copy.location.toc,
          blocks: [
            { type: 'table', ...copy.location.table, references: ['imagexpert', 'pall'] },
            {
              type: 'paragraph',
              text: copy.location.coarse,
              inlineLinks: [{ text: copy.location.filterLink, href: filterHref }],
              references: [inkFilter.id, 'imagexpert'],
            },
          ],
        },
        {
          id: 'inkjet-filter-pressure-verification',
          title: copy.pressure.title,
          tocLabel: copy.pressure.toc,
          blocks: [
            { type: 'paragraph', text: copy.pressure.measurement, references: ['imagexpert'] },
            {
              type: 'paragraph',
              text: copy.pressure.sensors,
              inlineLinks: [{ text: copy.pressure.sensorLink, href: sensor.href }],
              references: ['pdm5'],
            },
            {
              type: 'links',
              items: [{ label: sensor.title, href: sensor.href, description: copy.pressure.sensorCard }],
            },
            { type: 'table', ...copy.pressure.table },
            {
              type: 'paragraph',
              text: copy.pressure.diagnosis,
              inlineLinks: [{ text: copy.pressure.diagnosisLink, href: getLocalizedSiteHref(starvationGuide, locale) }],
            },
          ],
        },
        {
          id: 'inkjet-stop-and-restart-check',
          title: copy.backflow.title,
          tocLabel: copy.backflow.toc,
          blocks: [
            {
              type: 'paragraph',
              text: copy.backflow.valve,
              inlineLinks: [{ text: copy.backflow.valveLink, href: valveHref }],
              references: [inkCheckValve.id],
            },
            { type: 'paragraph', text: copy.backflow.restart, references: ['check-valve-drawing'] },
          ],
        },
        {
          id: 'inkjet-filter-ink-validation',
          title: copy.validation.title,
          tocLabel: copy.validation.toc,
          blocks: [{ type: 'list', ordered: true, items: copy.validation.steps }],
        },
      ],
      references: [
        { id: 'imagexpert', title: copy.sources.imagexpert, href: 'https://imagexpert.com/all-about-ink-filtration/' },
        { id: 'pall', title: copy.sources.pall, href: 'https://www.pall.com/en/microelectronics/graphic-arts/ink-filtration.html' },
        { id: inkFilter.id, title: copy.sources.filter, href: filterHref },
        { id: 'pdm5', title: copy.sources.sensor, href: sensor.href },
        { id: inkCheckValve.id, title: copy.sources.valve, href: valveHref },
        { id: 'check-valve-drawing', title: copy.sources.drawing, href: '/downloads/products/fittings/check-valves/cv-be-32-pp-n.pdf' },
      ],
    },
  };
}
