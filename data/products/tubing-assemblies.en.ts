import type { SiteSearchItem } from "@/data/search/site-search.types";

export const tubingAssembliesPath = "/en/products/tubing-assemblies/";
export const tubingAssembliesDescription = "Custom tubing assemblies with flanged ends, retaining ring kits and ferrule kits for instrument fluid paths.";

export const tubingAssemblyTypes = [
  {
    id: "flanged-tubing",
    name: "Flanged Tubing",
    menuDescription: "Single- or double-flanged tube ends",
    description: "Custom tubing with single- or double-flanged ends for matching flat-bottom ports.",
    image: "/images/resources/technical-articles/flanged-tubing-assemblies-selection-guide/flanged-end-detail.png",
    imageAlt: "Flanged tubing ends with matching fittings and supporting washers",
    paragraphs: [
      "The tube end is formed into an outward flange. A matching fitting and washer support the flange and press it against the sealing face of a flat-bottom port.",
      "FEP and PTFE tubing assemblies can be configured with single- or double-flanged ends, selected tube lengths and identification markings. The tube dimensions, fitting thread and port geometry must be specified together.",
    ],
    options: ["Tube material, inner diameter and outer diameter", "Finished tube length", "Single- or double-flanged ends", "Matching fittings, washers and port threads", "Tube identification and assembly drawing"],
    check: "Confirm the port sealing face and fitting clearance. Matching threads alone do not establish a sealed connection; verify the completed assembly under the intended operating conditions.",
  },
  {
    id: "retaining-ring-kits",
    name: "Retaining Ring Kits",
    menuDescription: "Matched retaining sleeves and seals",
    description: "Tubing connection kits with retaining sleeves and sealing rings. Custom configurations available.",
    image: "/images/home/retaining-ring-kit-white-shadow.png",
    imageAlt: "Tubing assembly with a PEEK fitting, retaining sleeve and sealing ring on a white background",
    paragraphs: [
      "A retaining ring connection combines a threaded fitting, retaining sleeve and sealing ring to secure the tube end. These components are selected as a matched assembly for the tube and mating port.",
      "Custom kits can be discussed around the tube dimensions, connection layout and installation requirements. Supply the port drawing and operating conditions so that the fitting, sleeve and seal can be evaluated together.",
    ],
    options: ["Tube material and dimensions", "Fitting thread and mating port", "Matched retaining sleeve and sealing ring", "Tube length and connection layout", "Assembly and identification requirements"],
    check: "Confirm the component sequence, orientation and tube compatibility. Use the specified matching parts and verify retention and sealing with the intended fluid, pressure and temperature.",
  },
  {
    id: "ferrule-kits",
    name: "Ferrule Kits",
    menuDescription: "Tube connections without pre-flanging",
    description: "Fitting and ferrule kits for tubing connections without pre-flanging. Custom configurations available.",
    image: "/images/resources/technical-articles/hard-tube-fittings-selection-guide/ferrule-assembly-en.webp",
    imageAlt: "Threaded fitting and ferrule for a tubing connection without pre-flanging",
    paragraphs: [
      "A ferrule connection uses a matching fitting and ferrule to grip the tubing without forming a flange on the tube end. The tube, ferrule and port must be compatible as a complete connection.",
      "Kit configurations can be discussed for the required tube diameter, fitting thread, material and assembly layout. Share your drawing to define the matching components and any custom tubing requirements.",
    ],
    options: ["Tube outer diameter and material", "Fitting thread and mating port", "Matching ferrule material and geometry", "Tube length and assembly layout", "Installation and identification requirements"],
    check: "Confirm the ferrule orientation and tube insertion depth. Follow the specified assembly method and verify tube retention and sealing rather than assuming compatibility from the thread size alone.",
  },
] as const;

export type TubingAssemblyType = (typeof tubingAssemblyTypes)[number];

export function getTubingAssemblyPath(id?: string) {
  return id ? `${tubingAssembliesPath}${id}/` : tubingAssembliesPath;
}

export function getTubingAssemblyDetailPath(id: TubingAssemblyType["id"], configuration?: string) {
  return `${getTubingAssemblyPath(id)}details/${configuration ? `${configuration}/` : ""}`;
}

export const tubingAssemblySearchItems: SiteSearchItem[] = [
  { id: "tubing-assemblies", module: "products", title: "Tubing Assemblies", description: tubingAssembliesDescription, href: tubingAssembliesPath, image: "/images/home/tubing-assemblies-product-photo.png", keywords: ["custom tubing assemblies", "flanged tubing", "retaining ring kits", "ferrule kits"], actionLabel: "Explore Series" },
  ...tubingAssemblyTypes.map((item): SiteSearchItem => ({
    id: item.id, module: "products", title: item.name, description: item.description,
    href: getTubingAssemblyPath(item.id), image: item.image,
    keywords: [item.name, "custom tubing assemblies", item.description, item.id === "ferrule-kits" ? "clamp kits" : item.id === "retaining-ring-kits" ? "snap ring compression sleeve" : "flanged ends"], actionLabel: "View Details",
  })),
];
