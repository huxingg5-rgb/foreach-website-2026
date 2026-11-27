import { germanBarbedFittingSlugs } from "./barbed-fitting-detail.de";
import { germanHardTubeFittingSlugs } from "./hard-tube-fitting-detail.de";
import { germanThreadToBarbedFittingSlugs } from "./thread-to-barbed-fitting-detail.de";
import { FITTING_PUBLISHED_PRODUCTS } from "../selection/fitting-publication.generated";

const remainingFamilies = [
  "quick-connect-fittings",
  "luer-fittings",
  "female-thread-adapters",
  "bulkhead-barbed-fittings",
  "filters",
  "check-valves",
] as const;

// Next loads this registry from next.config.ts. Keep it independent of page adapters.
const germanRemainingFittingDraftFamilies = remainingFamilies.map(family => {
  const prefix = `/products/fittings/${family}/`;
  return {
    family,
    modelSlugs: FITTING_PUBLISHED_PRODUCTS
      .filter(product => product.productTypeId === family && product.detailHref.startsWith(prefix))
      .map(product => product.detailHref.slice(prefix.length).replace(/\/+$/, "")),
  };
});

// Group the first two model segments to stay below Next's custom-route regex
// limit. The resulting patterns still match only the reviewed model slugs.
function modelSlugPattern(slugs: readonly string[]) {
  const suffixesByPrefix = new Map<string, string[]>();
  for (const slug of slugs) {
    const splitAt = slug.indexOf("-", slug.indexOf("-") + 1) + 1;
    const prefix = slug.slice(0, splitAt);
    const suffixes = suffixesByPrefix.get(prefix) ?? [];
    suffixes.push(slug.slice(splitAt));
    suffixesByPrefix.set(prefix, suffixes);
  }
  return Array.from(suffixesByPrefix, ([prefix, suffixes]) =>
    prefix + (suffixes.length === 1 ? suffixes[0] : "(?:" + suffixes.join("|") + ")")
  ).join("|");
}

export const germanFittingDraftFamilies = [
  { family: "hard-tube-fittings", modelSlugs: germanHardTubeFittingSlugs },
  { family: "barbed-fittings", modelSlugs: germanBarbedFittingSlugs },
  { family: "thread-to-barbed-fittings", modelSlugs: germanThreadToBarbedFittingSlugs },
  ...germanRemainingFittingDraftFamilies,
].map(family => ({ ...family, modelPattern: modelSlugPattern(family.modelSlugs) }));

export const germanFittingDraftPathPattern =
  "products/fittings/(?:" + germanFittingDraftFamilies.map(
    ({ family, modelPattern }) => family + "/(?:" + modelPattern + ")",
  ).join("|") + ")";
