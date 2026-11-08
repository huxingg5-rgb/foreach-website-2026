import copy from "./fitting-detail-copy.intl.json";
import { fittingText } from "./fitting-ui.intl";

/** Translations of the current Chinese product-detail presentation, not article
 * content. ASCII model codes, numbers and units are substituted unchanged.
 * {Rn} slots retain the original React links and emphasis. Server import only. */
export type FittingDetailCopyRow = readonly [string,string,string,string,string,string];
const dictionary:Readonly<Record<string,readonly string[]>>=copy;
export const fittingDetailCopyRows: FittingDetailCopyRow[]=Object.entries(dictionary).map(([key,values])=>[key,values[0],values[1],values[2],values[3],values[4]]);
const languageIndex: Record<string,number>={en:0,es:1,fr:2,ko:3,ru:4};

export function canonicalFittingDetailText(value:string) {
  const tokens:string[]=[];
  const key=value.trim().replace(/\s+/g," ").replace(/(\{R\d+\})|[A-Za-z0-9][A-Za-z0-9_.%/+−–—\-×÷=<>≤≥°μ³"'()]*/g,(token,richSlot:string|undefined)=>richSlot||`{${tokens.push(token)-1}}`);
  return {key,tokens};
}
export function fittingDetailText(value:string,locale:string):string {
  const index=languageIndex[locale];
  if(index===undefined||!/[\u3400-\u9fff]/.test(value))return value;
  const {key,tokens}=canonicalFittingDetailText(value),translation=dictionary[key]?.[index];
  if(!translation)return fittingText(value,locale);
  const leading=value.match(/^\s*/)?.[0]||"",trailing=value.match(/\s*$/)?.[0]||"";
  return leading+translation.replace(/\{(\d+)\}/g,(_,i:string)=>tokens[Number(i)])+trailing;
}
