export type RelatedResourceIdentity = {
  id?: string;
  slug?: string;
};

export type RelatedResourceItem = RelatedResourceIdentity & {
  relationKeys?: readonly string[];
  relationPriority?: number;
  date?: string;
  publishedAt?: string;
};

export type RelatedResourceQuery = RelatedResourceIdentity & {
  relationKeys?: readonly string[];
};

export function normalizeRelationKey(value: string) {
  return value.trim().toLowerCase();
}

export function hasSharedRelationKey(
  sourceKeys: readonly string[] = [],
  targetKeys: readonly string[] = [],
) {
  const sourceSet = new Set(
    sourceKeys.map(normalizeRelationKey).filter(Boolean),
  );

  return targetKeys
    .map(normalizeRelationKey)
    .filter(Boolean)
    .some((key) => sourceSet.has(key));
}

function getPublishedTimestamp(item: RelatedResourceItem) {
  const value = item.publishedAt ?? item.date;

  if (!value) return 0;

  const timestamp = Date.parse(value);

  return Number.isFinite(timestamp) ? timestamp : 0;
}

export function sortRelatedResources<T extends RelatedResourceItem>(
  first: T,
  second: T,
) {
  const priorityDifference =
    (second.relationPriority ?? 0) - (first.relationPriority ?? 0);

  if (priorityDifference !== 0) {
    return priorityDifference;
  }

  return getPublishedTimestamp(second) - getPublishedTimestamp(first);
}

function isCurrentResource(
  item: RelatedResourceItem,
  query: RelatedResourceQuery,
) {
  const itemId = String(item.id ?? "").trim();
  const itemSlug = String(item.slug ?? "").trim();
  const sourceId = String(query.id ?? "").trim();
  const sourceSlug = String(query.slug ?? "").trim();

  return Boolean(
    (sourceId && itemId && sourceId === itemId) ||
      (sourceSlug && itemSlug && sourceSlug === itemSlug),
  );
}

function getRelatedResources<T extends RelatedResourceItem>(
  items: readonly T[],
  query: RelatedResourceQuery,
) {
  if (!query.relationKeys?.length) {
    return [];
  }

  return items
    .map((item, originalIndex) => ({ item, originalIndex }))
    .filter(({ item }) => {
      return (
        !isCurrentResource(item, query) &&
        hasSharedRelationKey(query.relationKeys, item.relationKeys)
      );
    })
    .sort((first, second) => {
      return (
        sortRelatedResources(first.item, second.item) ||
        first.originalIndex - second.originalIndex
      );
    })
    .map(({ item }) => item);
}

export function getRelatedVideos<T extends RelatedResourceItem>(
  videos: readonly T[],
  query: RelatedResourceQuery,
) {
  return getRelatedResources(videos, query);
}

export function getRelatedProducts<T extends RelatedResourceItem>(
  products: readonly T[],
  query: RelatedResourceQuery,
) {
  return getRelatedResources(products, query);
}

export function getRelatedArticles<T extends RelatedResourceItem>(
  articles: readonly T[],
  query: RelatedResourceQuery,
) {
  return getRelatedResources(articles, query);
}
