import TubingAssembliesPage from "@/components/products/tubing-assemblies/TubingAssembliesPage";
import { getLocalizedAssemblyMetadata } from "@/data/products/tubing-assemblies/localized";

export function generateMetadata() {
  return getLocalizedAssemblyMetadata("zh-CN");
}

export default function Page() {
  return <TubingAssembliesPage locale="zh-CN" />;
}
