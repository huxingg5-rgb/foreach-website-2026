import "server-only";

import { getRelatedResourcesData } from "@/services/resources/getRelatedResourcesData";
import RelatedResourcesLoader from "./RelatedResourcesLoader";
import type { RelatedResourcesProps } from "./related-resources.types";

export type { RelatedResourceSourceType } from "./related-resources.types";

export default function RelatedResources(props: RelatedResourcesProps) {
  const data = getRelatedResourcesData(props);
  if (!data.videos.length && !data.products.length && !data.articles.length) return null;
  return <RelatedResourcesLoader key={`${props.locale}:${props.sourceType}:${props.sourceId || props.sourceSlug}`} {...data} />;
}
