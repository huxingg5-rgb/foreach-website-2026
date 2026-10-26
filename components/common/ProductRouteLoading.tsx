import { productRouteMap } from "@/data/products/selection/product-route-map";
import { valveSeriesRoutes } from "@/data/products/selection/valve-routes";
import { controlTypesEn, probeTypesEn } from "@/data/products/selection/probe-control-selection.en";
import ProductPageSkeleton from "./ProductPageSkeleton";

// Project existing route definitions on the server. Only paths, never product
// copy/catalogues, are serialized into the loading component's client bundle.
const selectionPaths = [
  ...Object.entries(productRouteMap.productTypes).map(([slug, route]) => `${route.category}/${slug}`),
  ...Object.entries(productRouteMap.series).map(([slug, route]) => `${route.category}/${route.slug}/${slug}`),
  ...valveSeriesRoutes.map(({ slug }) => `valves/${slug}`),
];
const englishSelectionPaths = [
  ...controlTypesEn.map(({ id }) => `control/${id}`),
  ...probeTypesEn.map(({ id }) => `probes/selection/${id}`),
];

export default function ProductRouteLoading() {
  return <ProductPageSkeleton variant="selection" routeSelectionPaths={selectionPaths} englishSelectionPaths={englishSelectionPaths} />;
}
