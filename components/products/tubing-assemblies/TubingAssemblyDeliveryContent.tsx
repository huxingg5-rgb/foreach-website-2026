import type { TubingAssemblyLocale } from "@/data/products/tubing-assemblies/locales";
import type { AssemblyConfiguration, AssemblyFamily } from "@/data/products/detail/tubing-assemblies.review.zh";
import { assemblyFamilyGuides, getAssemblyGuideMaterial } from "@/data/products/tubing-assemblies/detail-content.zh";
import FepFlangedTubingDeliveryContent from "./FepFlangedTubingDeliveryContent";

/** Shared delivery workflow illustrated with flanged-assembly examples. */
export default function TubingAssemblyDeliveryContent({family,configuration,locale="zh-CN"}: {family:AssemblyFamily;configuration?:AssemblyConfiguration;locale?:TubingAssemblyLocale}) {
  const profile=assemblyFamilyGuides[family];
  const material=getAssemblyGuideMaterial(configuration ?? "fep");
  return <FepFlangedTubingDeliveryContent productLabel={`${configuration ? material.name : ""}${profile.name}`} examplePhotos locale={locale} />;
}
