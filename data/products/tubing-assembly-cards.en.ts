import type { ProductSelectionProductItem } from "@/components/products/selection/product-selection-ui.types";
import { getTubingAssemblyDetailPath } from "./tubing-assemblies.en";

export type TubingAssemblyCard = ProductSelectionProductItem & {
  cardTitle: string;
  cardSubtitle: string;
  imageCaption: string;
  imageWidth?: number;
  imageHeight?: number;
  specs: { label: string; value: string }[];
};

// Materials are customization entry points, not finished
// assembly SKUs. The shared image illustrates only the connection structure.
const configurations = [
  { id: "fep-flanged", title: "FEP Flanged Tubing Assemblies", description: "Natural FEP tubing with reference IDs of 0.3–2.0 mm across matched tube sizes. Single- or double-flanged ends, tube length and A/B connections can be customized." },
  { id: "ptfe-flanged", title: "PTFE Flanged Tubing Assemblies", description: "Natural PTFE tubing with reference IDs of 0.5–2.0 mm across matched tube sizes. Single- or double-flanged ends, tube length and A/B connections can be customized." },
  { id: "pfa-flanged", title: "PFA Flanged Tubing Assemblies", description: "Reference PFA tubing: 1.6 mm OD with 0.5, 0.8 or 1.0 mm ID. Length and end connections are customizable; flange and port compatibility are confirmed against your drawing." },
  { id: "black-ptfe-flanged", title: "Black PTFE Flanged Tubing Assemblies", description: "Black PTFE tubing with reference IDs of 0.8–2.0 mm and custom length and end connections. Light-shielding configurations are assessed against reagent sensitivity and wavelength requirements." },
] as const;

// Tubing-material entry points share the existing ferrule family detail route.
// PFA assembly sizes and ferrule combinations require drawing review.
const ferruleConfigurations = [
  { id: "fep-ferrule", title: "FEP Tubing Assemblies with Ferrule Fittings", description: "FEP tubing with ferrule connections, requiring no pre-flanging, in 1.6, 2.0, 2.5, 3.0 or 3.2 mm OD. Tube ID, length and A/B connections are customizable." },
  { id: "ptfe-ferrule", title: "PTFE Tubing Assemblies with Ferrule Fittings", description: "Natural PTFE tubing with ferrule connections in 1.6, 2.0, 2.5, 3.0 or 3.2 mm OD. Customize tube ID, length and end connections, selecting materials for the working and cleaning fluids." },
  { id: "pfa-ferrule", title: "PFA Tubing Assemblies with Ferrule Fittings", description: "PFA tubing with ferrule connections, requiring no pre-flanging, with custom length and end connections. Tube dimensions, ferrules and ports are confirmed against the drawing and operating conditions." },
  { id: "black-ptfe-ferrule", title: "Black PTFE Tubing Assemblies with Ferrule Fittings", description: "Black PTFE tubing with ferrule connections and customizable dimensions, length, end connections and labels. Light-shielding configurations are assessed against reagent sensitivity and wavelength requirements." },
] as const;

// Retaining-ring cards group tubing materials across fitting configurations.
const retainingRingConfigurations = [
  { id: "fep", title: "FEP Retaining Ring Tubing Assemblies", description: "Natural FEP tubing with retaining sleeves and sealing rings. Tube ID, OD, length and A/B end connections can be customized." },
  { id: "ptfe", title: "PTFE Retaining Ring Tubing Assemblies", description: "Natural PTFE tubing with retaining sleeves and sealing rings. Tube ID, OD, length and A/B end connections can be customized." },
  { id: "pfa", title: "PFA Retaining Ring Tubing Assemblies", description: "PFA tubing with retaining sleeves and sealing rings. Tube dimensions, length and end connections can be customized; tube and port combinations are confirmed against your drawing." },
  { id: "black-ptfe", title: "Black PTFE Retaining Ring Tubing Assemblies", description: "Black PTFE tubing with retaining ring connections and custom dimensions, length and end connections. Light shielding is assessed against reagent sensitivity and wavelength requirements." },
] as const;

export const tubingAssemblyCards: TubingAssemblyCard[] = [
  ...configurations.map((item): TubingAssemblyCard => ({
    productId: `tubing-assembly-${item.id}`,
    categoryId: "tubing-assemblies", productTypeId: "flanged-tubing",
    cardTitle: item.title,
    cardSubtitle: item.description,
    imageCard: "/images/products/tubing-assemblies/flanged-tubing-white-shadow-intro.png",
    imageAlt: "Flanged tubing connection reference; material and optional accessories vary by configuration",
    imageCaption: "Connection reference",
    detailHref: getTubingAssemblyDetailPath("flanged-tubing", item.id.replace(/-flanged$/, "")),
    specs: [],
  })),
  ...retainingRingConfigurations.map((item): TubingAssemblyCard => ({
    productId: `tubing-assembly-retaining-ring-${item.id}`,
    categoryId: "tubing-assemblies", productTypeId: "retaining-ring-kits",
    cardTitle: item.title,
    cardSubtitle: item.description,
    imageCard: "/images/products/tubing-assemblies/retaining-ring-pair-white-shadow-intro.png",
    imageAlt: "Retaining ring connection reference; tube material and accessories vary by configuration",
    imageCaption: "",
    detailHref: getTubingAssemblyDetailPath("retaining-ring-kits", item.id),
    specs: [],
  })),
  ...ferruleConfigurations.map((item): TubingAssemblyCard => ({
    productId: `tubing-assembly-${item.id}`,
    categoryId: "tubing-assemblies", productTypeId: "ferrule-kits",
    cardTitle: item.title,
    cardSubtitle: item.description,
    imageCard: "/images/products/tubing-assemblies/ferrule-tubing-black-intro.png",
    imageAlt: "Ferrule tubing connection reference; tubing material and dimensions vary by configuration",
    imageCaption: "Connection reference",
    detailHref: getTubingAssemblyDetailPath("ferrule-kits", item.id.replace(/-ferrule$/, "")),
    specs: [],
  })),
];
