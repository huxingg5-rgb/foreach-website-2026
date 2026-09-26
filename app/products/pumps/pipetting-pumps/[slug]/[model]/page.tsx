import { notFound } from "next/navigation";
import PipettingPumpDetailPage from "../page";
import { pipettingModelSlugs, getPipettingModelPath, isPipettingModelRoute } from "@/data/products/selection/pipetting-pump-routes";
import { getPipettingModelMetadata } from "@/services/products/getPipettingModelMetadata";
type Props = {params:Promise<{slug:string;model:string}>};
export const dynamicParams = false;
export function generateStaticParams() {return pipettingModelSlugs.map(model => ({slug:getPipettingModelPath("zh",model)!.split("/").at(-3)!,model}));}
export async function generateMetadata({params}:Props) {const {slug,model}=await params;return isPipettingModelRoute(["pumps","pipetting-pumps",slug,model])?getPipettingModelMetadata("zh",model):{};}
export default async function Page({params}:Props) {const {slug,model}=await params;if(!isPipettingModelRoute(["pumps","pipetting-pumps",slug,model]))notFound();return PipettingPumpDetailPage({params:Promise.resolve({slug:model})});}
