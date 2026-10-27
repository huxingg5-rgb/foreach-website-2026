import { hasSharedRelationKey } from "@/lib/related-resources";

// Overview videos: relate by the actual connection family, not all fitting products.
export const fittingOverviewVideoRelations: Record<string, readonly string[]> = {
  "youtube-thread-to-barb-fittings": ["category:thread-to-barbed-fittings"],
  "youtube-rigid-tubing-fittings": [
    "category:hard-tube-fittings",
    "series:hf", "series:hf6", "series:hfl", "series:hfl6",
    "series:hn", "series:hn6", "series:hnf", "series:hnf6", "series:hsf", "series:hsf6",
  ],
};

export function isFittingOverviewVideo(id: string) {
  return Object.hasOwn(fittingOverviewVideoRelations, id);
}

export function hasFittingOverviewVideo(relationKeys: readonly string[] = []) {
  return Object.values(fittingOverviewVideoRelations)
    .some(keys => hasSharedRelationKey(keys, relationKeys));
}
