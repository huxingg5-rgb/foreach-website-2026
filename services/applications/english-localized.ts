import { reviewDomains } from '@/data/applications/english-review';
import type { ApplicationBlock, ApplicationDocument } from '@/data/applications/analytical-documents/types';
import type { EnglishApplicationKind } from '@/data/applications/application-english';
import translations from '@/data/applications/english-locales/en.json';
import { refineEnglishGuides } from '@/data/applications/english-locales/refine-guides';
import { refineEnglishTasks } from '@/data/applications/english-locales/refine-tasks';
import { refineEnglishProducts } from '@/data/applications/english-locales/refine-products';
import { refineEnglishDiscovery } from '@/data/applications/english-locales/refine-discovery';
import { refineEnglishIvdProducts } from '@/data/applications/english-locales/refine-ivd-products';
import { refineEnglishSampleGas } from '@/data/applications/english-locales/refine-sample-gas';
import { linkIvdProductMentions } from '@/data/applications/ivd-locales/product-links';
import { PISTON_PRODUCT_LINKS } from '@/data/applications/analytical-documents/piston-link-network';
import { getDiaphragmPumpPath } from '@/data/products/detail/diaphragm-pump-routes';
import { reviewProductCards } from '@/data/applications/english-review-resources';
import { getCanonicalUrl } from '@/lib/seo/site-url';
import type { Metadata } from 'next';

const copy: Readonly<Record<string, string>> = translations;
const han = /[\u3400-\u9fff]/u;

/** English-only adapter. The Chinese review sources and other locale dictionaries stay intact. */
export function translateApplicationEnglish<T>(value: T): T {
  if (typeof value === 'string') {
    if (!han.test(value)) return value;
    const translated = copy[value];
    if (!translated?.trim() || han.test(translated)) throw new Error(`Missing English application translation: ${value}`);
    return translated as T;
  }
  if (Array.isArray(value)) return value.map(item => translateApplicationEnglish(item)) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateApplicationEnglish(item)])) as T;
  return value;
}

const productLinks = [
  ['Piston pumps?', PISTON_PRODUCT_LINKS.category],
  ['Syringe pumps?', '/en/products/pumps/syringe-pumps/'],
  ['Air-displacement pipetting pumps?', '/en/products/pumps/pipetting-pumps/'],
  ['Valveless metering pumps?', '/en/products/pumps/valveless-metering-pump/'],
  ['Liquid diaphragm pumps?', getDiaphragmPumpPath('en', 'liquid-diaphragm-pumps')],
  ['Gas-liquid diaphragm pumps?', getDiaphragmPumpPath('en', 'gas-liquid-diaphragm-pumps')],
  ['RPL', reviewProductCards.rpl.href],
  ['HP', reviewProductCards.hp.href],
] as const;

function linkProducts(block: ApplicationBlock): ApplicationBlock {
  const linked = linkIvdProductMentions(block, 'en');
  if (linked.type !== 'table') return linked;
  const text = linked.rows.flat().join('\n');
  const inlineLinks = [...(linked.inlineLinks ?? [])];
  for (const [name, href] of productLinks) {
    const match = text.match(new RegExp(`(^|[^A-Za-z0-9-])(${name})(?=$|[^A-Za-z0-9])`, 'i'));
    if (match && !inlineLinks.some(link => link.text === match[2])) inlineLinks.push({ text: match[2], href });
  }
  return { ...linked, inlineLinks };
}

const integrationFocus: Partial<Record<EnglishApplicationKind, { slug: string; text: string }>> = {
  'lab-automation': { slug: 'guide-system-integration', text: 'For a workstation, coordinate shared pumps, wash stations and waste paths with the active container and step. Test interrupted operations separately before delivery, during partial delivery and after completion; the controller must establish the actual state before retrying.' },
  'analytical-instruments': { slug: 'guide-lab-analyzer', text: 'For an analytical system, coordinate source selection and sample arrival with the measurement window. Verify carryover, blank recovery, delivered volume and detector response after switching or maintenance; a completed valve or pump command does not establish a valid analysis.' },
  'environmental-monitoring': { slug: 'guide-system-integration', text: 'For an online monitor, define the sample transit time, refresh volume and maintenance bypass. Check sample arrival and the first valid measurement after flushing or service. Instrument software must associate alarms and maintenance periods with data records; fluid-path signals alone cannot validate the reported concentration.' },
  'synthetic-biology': { slug: 'guide-bio-process-integration', text: 'For a bioprocess, account for feed additions, withdrawals and sample-line discard over the operating period. Associate each action with the actual vessel and measured, estimated or unknown delivered volume. Review interrupted feeds before restarting, and validate the complete contamination-control boundary separately from valve closure.' },
};

const environmentalTaskFocus: Record<string, { conditions: string; acceptance: string; fault: string }> = {
  'sampling-prep-dilution': {
    conditions: 'Collection and preparation times, preservation state, settling between aliquots, aliquot order, actual sample and diluent volumes, and mixing before resampling',
    acceptance: 'Measure the sample and diluent delivered to the receiving vessel and verify mixing. Compare successive aliquots for settling bias, then assess blanks and method-appropriate spike recovery for the preserved sample matrix.',
    fault: 'Settling, storage changes or shared-path residue can alter the aliquot composition even when the volume ratio is correct. Review the affected aliquot and its preparation history before repeating the dilution.',
  },
  'sampling-prep-filtration': {
    conditions: 'The method-defined analyte fraction, whether particles must be retained in the sample, filter material and pore size, filter location, added volume, pressure drop and replacement conditions',
    acceptance: 'Confirm that filtration preserves the fraction required by the method. Compare blanks and analyte recovery, check flow and pressure drop as solids accumulate, and verify the first sample after filter replacement.',
    fault: 'An unsuitable filter can remove the fraction being measured; adsorption, clogging or leakage can change composition and sample arrival. Verify the filter, seals, sample refresh and method response before accepting the next result.',
  },
};

/** Shared English refinements; other IVD locales never enter this content layer. */
export function refineEnglishApplicationCopy(document: ApplicationDocument, kind: EnglishApplicationKind): ApplicationDocument {
  const products = refineEnglishIvdProducts(refineEnglishProducts(refineEnglishGuides(document, kind), kind), kind);
  return refineEnglishDiscovery(refineEnglishSampleGas(refineEnglishTasks(products, kind), kind), kind);
}

/** Apply scenario-specific review corrections without changing the shared source documents. */
export function getEnglishApplicationDocument(source: ApplicationDocument, kind: EnglishApplicationKind): ApplicationDocument {
  const translated = translateApplicationEnglish(source);
  const introParagraphs = new Set(translated.intro.flatMap(block => block.type === 'paragraph' ? [block.text] : []));
  const focus = kind ? integrationFocus[kind] : undefined;
  const environmentalPrep = kind === 'environmental-monitoring' && source.slug === 'guide-sampling-prep';
  const environmentalTask = kind === 'environmental-monitoring' ? environmentalTaskFocus[source.slug] : undefined;
  const sections = translated.sections.map((section, sectionIndex) => {
    const originalSection = source.sections[sectionIndex];
    const blocks = section.blocks.flatMap((block, blockIndex): ApplicationBlock[] => {
      const original = originalSection.blocks[blockIndex];
      if (section.id === 'boundaries' && block.type === 'paragraph' && introParagraphs.has(block.text)) return [];
      // Domain links need destinations, not five repeated introductions to neighboring domains.
      if (section.id === 'boundaries' && block.type === 'links') return [{ ...block, items: block.items.map(({ label, href }) => ({ label, href })) }];
      // The flow caption and diagram already explain the branch structure.
      if (block.type === 'paragraph' && original.type === 'paragraph' && original.text.startsWith('保留常用工作点、边界条件')) return [];
      if (environmentalTask) {
        if (section.id === 'working-conditions' && block.type === 'table' && original.type === 'table') {
          const values: Record<string, string> = { '实际工作条件': environmentalTask.conditions, '验收目标': environmentalTask.acceptance, '异常定位': environmentalTask.fault };
          return [{ ...block, rows: block.rows.map((row, index) => values[original.rows[index][0]] ? [row[0], values[original.rows[index][0]]] : row) }];
        }
        if (block.type === 'paragraph' && blockIndex === 0 && section.id === 'acceptance') return [{ ...block, text: environmentalTask.acceptance }];
        if (block.type === 'paragraph' && blockIndex === 0 && section.id === 'fault-recovery') return [{ ...block, text: environmentalTask.fault }];
        if (source.slug === 'sampling-prep-filtration' && block.type === 'paragraph' && original.type === 'paragraph' && original.text === '稀释计量可共用工程方法，但现场保存、颗粒与目标物损失需单独核查。') return [{ ...block, text: 'Filter selection and pressure-drop checks must be evaluated alongside field preservation, particle distribution and possible loss of the analyte fraction required by the method.' }];
      }
      if (environmentalPrep && block.type === 'table' && original.type === 'table') {
        return [{ ...block, rows: block.rows.map((row, index) => {
          const raw = original.rows[index][0];
          if (section.id === 'working-conditions' && raw.startsWith('稀释')) return [row[0], row[1], 'Collection time, preservation state, particle distribution, aliquot order, actual sample and diluent volumes, mixing and time to analysis'];
          if (section.id === 'working-conditions' && raw.startsWith('过滤')) return [row[0], row[1], 'The method-defined analyte fraction, filter location, pore size and material, retained particles, pressure drop and first sample after replacement'];
          if (section.id === 'validation' && raw.startsWith('稀释')) return [row[0], 'Measure sample and diluent volumes, then check the mixed sample, blanks and method-appropriate spike recovery; compare successive aliquots for settling bias.', 'Settling, storage changes, shared-path residue or incomplete mixing can alter the aliquot composition even when its volume is correct.'];
          if (section.id === 'validation' && raw.startsWith('过滤')) return [row[0], 'Compare the target fraction before and after the method-specified filtration; check blanks, analyte loss, pressure drop and the first sample after filter replacement.', 'An unsuitable filter or sampling location can remove the fraction being measured; clogging and adsorption can change both composition and flow.'];
          return row;
        }) }];
      }
      return [block];
    });
    if (focus && source.slug === focus.slug && section.id === 'validation') blocks.unshift({ type: 'paragraph', text: focus.text });
    return { ...section, blocks: blocks.map(linkProducts) };
  });
  const refined = refineEnglishApplicationCopy({ ...translated, eyebrow: 'Application guide', intro: translated.intro, sections }, kind);
  return { ...refined, intro: refined.intro.map(linkProducts), sections: refined.sections.map(section => ({ ...section, blocks: section.blocks.map(linkProducts) })) };
}

export function getEnglishApplicationMetadata(source: ApplicationDocument, kind: EnglishApplicationKind): Metadata {
  const document = getEnglishApplicationDocument(source, kind);
  const image = { url: reviewDomains[kind].image, width: 1920, height: 800, alt: document.title };
  return {
    title: document.seoTitle, description: document.description,
    robots: { index: true, follow: true },
    openGraph: { title: document.seoTitle, description: document.description, type: 'website', locale: 'en_US', siteName: 'FOREACH', images: [image] },
    twitter: { card: 'summary_large_image', title: document.seoTitle, description: document.description, images: [image] },
  };
}

export function getEnglishApplicationSchema(document: ApplicationDocument, href: string, breadcrumbs: readonly { label: string; href?: string }[]) {
  return { '@context': 'https://schema.org', '@graph': [
    { '@type': document.kind === 'hub' ? 'CollectionPage' : 'TechArticle', '@id': getCanonicalUrl(href), url: getCanonicalUrl(href), name: document.title, headline: document.title, description: document.description, inLanguage: 'en' },
    { '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.label, item: getCanonicalUrl(item.href ?? href) })) },
  ] };
}
