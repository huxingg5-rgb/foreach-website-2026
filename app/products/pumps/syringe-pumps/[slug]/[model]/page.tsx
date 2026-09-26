import { notFound } from "next/navigation";
import SyringePumpDetailPage from "../page";
import { syringeModelRoutes } from "@/data/products/selection/syringe-pump-routes";
import { getSyringeModelMetadata } from "@/services/products/getSyringeModelMetadata";
type Props = {params:Promise<{slug:string;model:string}>};
export const dynamicParams = false;
export function generateStaticParams() { return syringeModelRoutes.map(r=>({slug:r.series,model:r.model})); }
export async function generateMetadata({params}:Props) {const {slug,model}=await params;const r=syringeModelRoutes.find(r=>r.series===slug&&r.model===model);return r?getSyringeModelMetadata("zh",r.legacy):{};}
export default async function Page({params}:Props) {const {slug,model}=await params;const r=syringeModelRoutes.find(r=>r.series===slug&&r.model===model);if(!r)notFound();return SyringePumpDetailPage({params:Promise.resolve({slug:r.legacy})});}
