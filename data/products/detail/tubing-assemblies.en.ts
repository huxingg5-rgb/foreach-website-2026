import type { ProductDetailPageData } from "./product-detail.types";
import { getTubingAssemblyPath, getTubingAssemblyDetailPath, type TubingAssemblyType } from "../tubing-assemblies.en";

/** English assembly content adapted to the existing shared product detail template. */
export function getTubingAssemblyDetailData(item: TubingAssemblyType): ProductDetailPageData & Record<string, unknown> {
  return {
    category: "tubing-assemblies",
    categoryId: "tubing-assemblies",
    __locale: "en",
    tubingAuthoredContent: true,
    slug: item.id,
    productId: `tubing-assembly-${item.id}`,
    productCode: `tubing-assembly-${item.id}`,
    productTypeName: "Tubing Assemblies",
    model: item.name,
    name: item.name,
    h1Title: item.name,
    description: item.description,
    tubingIntroductionParagraphs: [...item.paragraphs],
    advantages: [...item.paragraphs],
    commonApplications: ["Instrument fluid paths", "Custom tubing connections"],
    mainImage: item.image,
    imageAlt: item.imageAlt,
    additionalImages: [],
    showConfigurator: false,
    showDatasheetRequest: false,
    showDrawingRequest: true,
    show3DRequest: false,
    cadRequestAvailable: false,
    detailMode: "custom_inquiry",
    specSeriesKey: item.id,
    specs: [
      { label: "Assembly Type", value: item.name },
      { label: "Connection Structure", value: item.menuDescription },
      { label: "Customization Options", value: item.options.join("; ") },
      { label: "Selection & Assembly", value: item.check },
      { label: "Configuration Review", value: "Provide the assembly drawing, mating port, fluid, operating pressure, temperature and required quantity." },
    ],
    detailHref: getTubingAssemblyDetailPath(item.id),
    selectionHref: getTubingAssemblyPath(item.id),
    breadcrumbs: [
      { label: "Home", href: "/en/" },
      { label: "Product Center", href: "/en/products/" },
      { label: "Tubing Assemblies", href: getTubingAssemblyPath() },
      { label: item.name, href: getTubingAssemblyPath(item.id) },
      { label: "Product Details" },
    ],
  };
}
