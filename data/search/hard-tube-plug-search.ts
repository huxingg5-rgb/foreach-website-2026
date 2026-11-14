import details from "../products/generated/fittings/hard-tube-fittings/detail/index.json";
import { getPublishedFittingProductByCode } from "../products/selection/fitting-publication.generated";
import { getHardTubePlugPresentation, isHardTubePlug } from "../products/detail/hard-tube-plugs";
import type { SiteSearchItem } from "./site-search.types";

type Detail = Record<string, unknown>;
type CompactItem = {m:string;t:string;h:string;x:string;s?:string;d?:string;i?:string;k?:string;a?:string};
const normalize=(value:string)=>value.toUpperCase().replace(/[\s\-_/.,，。:：;；()（）[\]{}'"“”‘’]+/g,"");
const isPlugHref=(href:string)=>/\/fittings\/hard-tube-fittings\/hbl(?:6x|6)?-(?:m6|u28)-(?:pv|ps)-(?:n|b)\/?$/i.test(href);
const visible=()=> (details as Detail[]).filter(d=>isHardTubePlug(d)&&getPublishedFittingProductByCode(String(d.productCode)));
const actions:Record<string,string>={zh:"查看产品",en:"View product",es:"Ver producto",fr:"Voir le produit",ko:"제품 보기",ru:"Открыть изделие"};

export function replaceHardTubePlugSearchItems(items:SiteSearchItem[]):SiteSearchItem[]{
  return [...items.filter(item=>item.module!=="products"||!isPlugHref(item.href)),...visible().map(d=>{
    const p=getHardTubePlugPresentation(d,"zh");
    return {id:`product:hard-tube-plug:${d.productCode}`,module:"products" as const,title:p.model,
      subtitle:p.name,description:p.description,href:`/products/fittings/hard-tube-fittings/${p.model.toLowerCase()}/`,
      image:String(d.imageCard),model:p.model,productCode:String(d.productCode),actionLabel:actions.zh,
      keywords:[p.model,String(d.productCode),p.name,p.thread,p.material,p.color,p.copy.purpose]};
  })];
}

export function replaceHardTubePlugCompactItems<T extends CompactItem>(items:T[],locale:string):T[]{
  return [...items.filter(item=>item.m!=="products"||!isPlugHref(item.h)),...visible().map(d=>{
    const p=getHardTubePlugPresentation(d,locale);
    const keywords=[p.model,String(d.productCode),p.name,p.thread,p.material,p.color,p.copy.purpose].map(normalize).join("|");
    return {m:"products",t:p.model,s:p.name,d:p.description,h:`/products/fittings/hard-tube-fittings/${p.model.toLowerCase()}/`,
      i:String(d.imageCard),x:`${keywords}|${normalize(p.description)}`,k:keywords,a:actions[p.locale]} as T;
  })];
}
