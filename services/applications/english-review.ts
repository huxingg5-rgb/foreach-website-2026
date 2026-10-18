// Content loader is shared by server pages and the Obsidian export CLI.
import type { EnglishApplicationKind } from '@/data/applications/application-english';
import { getReviewTopic, applyReviewGuide, reviewGroupFromSlug, reviewTopicSlug } from '@/data/applications/english-review';
import { reviewTopics } from '@/data/applications/english-review-topics';
import { analyticalDocuments, isIvdClinicalDocumentSlug } from '@/data/applications/analytical-documents/registry';
import { getEnglishAnalyticalDocument } from './analytical-documents';
import { isLiquidChromatographySlug } from '@/data/applications/analytical-documents/liquid-chromatography';
import { createReviewHierarchyDocument, getReviewHierarchyEntries, getReviewHierarchyEntry } from '@/data/applications/english-review-hierarchy';

/** User-finalized references stay in English and bypass all review rewrites. */
export function isFinalizedEnglishReference(kind: EnglishApplicationKind, slug = '') {
  return kind === 'analytical-instruments' && (slug === '' || isLiquidChromatographySlug(slug));
}

export function reviewSlugs(kind: EnglishApplicationKind) {
  const topics = Object.keys(reviewTopics).filter(key => key.startsWith(kind + '/')).map(key => reviewTopicSlug(kind, key.split('/')[1]));
  const existing = kind === 'analytical-instruments'
    ? analyticalDocuments.filter(item => item.slug).map(item => item.slug)
    : kind === 'ivd' ? analyticalDocuments.filter(item => isIvdClinicalDocumentSlug(item.slug)).map(item => item.slug) : [];
  return [...new Set([...topics, ...existing, ...getReviewHierarchyEntries(kind).map(entry=>entry.slug)])];
}
export async function getReviewDocument(kind: EnglishApplicationKind, slug: string) {
  if (isFinalizedEnglishReference(kind, slug)) return getEnglishAnalyticalDocument(slug);
  const hierarchy=getReviewHierarchyEntry(kind,slug);
  if (hierarchy) {
    const legacy=isIvdClinicalDocumentSlug(slug) ? await getEnglishAnalyticalDocument(slug) : undefined;
    return createReviewHierarchyDocument(kind,hierarchy,legacy ? applyReviewGuide(legacy) : undefined);
  }
  const group = reviewGroupFromSlug(kind, slug);
  if (group) return getReviewTopic(kind, group);
  if (!reviewSlugs(kind).includes(slug)) return undefined;
  const original = await getEnglishAnalyticalDocument(slug);
  return original ? applyReviewGuide(original) : undefined;
}
