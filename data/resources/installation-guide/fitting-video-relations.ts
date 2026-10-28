import { hasSharedRelationKey } from "@/lib/related-resources";

// Connection overviews: relate by the actual fitting or tubing family.
export const fittingOverviewVideoRelations: Record<string, readonly string[]> = {
  "youtube-flexible-tubing-laboratory-fluid-lines": ["category:pvc-tubing", "category:tpu-tubing"],
  "youtube-quick-connect-sealing-compatibility": ["category:quick-connect-fittings", "series:q20", "series:q40", "series:q60"],
  "youtube-quick-connect-coupling-types": ["category:quick-connect-fittings", "series:q20", "series:q40", "series:q60"],
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
