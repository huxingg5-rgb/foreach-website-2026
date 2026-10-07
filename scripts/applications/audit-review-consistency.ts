import { applicationDocumentHref, resolveApplicationHref } from "../../data/applications/application-routes";
import fs from 'node:fs';
import { REVIEW_KINDS,getReviewHub } from '../../data/applications/english-review';
import { getReviewDocument,reviewSlugs,isFinalizedEnglishReference } from '../../services/applications/english-review';
import { getReviewFooterPlan,reviewProductCards,reviewProductGates } from '../../data/applications/english-review-resources';
import { getEnglishReviewResources } from '../../services/applications/english-review-resources';
import { isIvdClinicalDocumentSlug } from '../../data/applications/analytical-documents/registry';
import { getReviewModuleTask,getReviewTaskCopy,reviewModuleOverrides } from '../../data/applications/english-review-logic';
import workflows from '../../data/applications/application-workflows.json';
import { reviewGuideStructures } from '../../data/applications/english-review-structure';
import type { ApplicationDocument,ApplicationBlock } from '../../data/applications/analytical-documents/types';

function linkTargets(block: ApplicationBlock): string[] {
  return [...(block.type==='links' ? block.items.map(item=>item.href) : []),...('inlineLinks' in block ? block.inlineLinks?.map(item=>item.href) ?? [] : [])];
}
async function main() {
  let taskBranches=0;
  const workflowMap=workflows as Record<string,Record<string,{modules:Record<string,{task:string}>}>>;
  for(const [kind,groups] of Object.entries(workflowMap)) for(const [group,source] of Object.entries(groups)) {
    if(kind==='analytical-instruments'&&group==='chromatography') continue;
    for(const [key,module] of Object.entries(source.modules)) {
      const copy=getReviewModuleTask(kind,group,key,module.task);
      if(!Object.values(copy).every(value=>typeof value==='string'&&value.length>3)) throw new Error('Incomplete task context '+kind+'/'+group+'/'+key);
      taskBranches++;
    }
  }
  if(taskBranches!==112) throw new Error('Wrong review branch count '+taskBranches);
  for(const [slug,structure] of Object.entries(reviewGuideStructures)) {
    if(slug.startsWith('lc-')) continue;
    getReviewTaskCopy(structure.task);
    if(structure.flow.length<3||structure.checks.length<3||structure.tests.length<2) throw new Error('Incomplete guide logic '+slug);
  }
  for(const key of Object.keys(reviewModuleOverrides)) {
    const [kind,group,module]=key.split('/');
    const source=workflows as Record<string,Record<string,{modules:Record<string,unknown>}>>;
    if(!source[kind]?.[group]?.modules[module]) throw new Error('Unused task correction '+key);
  }
  const records: {kind:string;path:string;title:string;sections:number;products:string[];articles:string[];contact:string}[]=[];
  const urls = new Set<string>();
  const applicationLinks: {href:string;source:string}[]=[];
  for(const kind of REVIEW_KINDS) {
    const documents: ApplicationDocument[]=isFinalizedEnglishReference(kind) ? []:[getReviewHub(kind)];
    for(const slug of reviewSlugs(kind)) {
      if(isFinalizedEnglishReference(kind,slug)||(kind==='analytical-instruments' && isIvdClinicalDocumentSlug(slug))) continue;
      const document=await getReviewDocument(kind,slug);
      if(!document) throw new Error('Missing document '+kind+'/'+slug);
      documents.push(document);
    }
    for(const document of documents) {
      const route=applicationDocumentHref(kind,document.slug);
      const footer=getReviewFooterPlan(kind,document);
      const resources=getEnglishReviewResources(kind,document);
      if(!resources.products.length||!resources.articles.length) throw new Error('Missing resource group '+route);
      if(resources.locale!=='en'||resources.uiLocale!=='zh-CN'||/液路液路/.test(footer.cta.title)) throw new Error('Review language/contact mismatch '+route);
      if(!document.sections.some(section=>section.id==='candidate-selection')) throw new Error('No selection context '+route);
      const ids=new Set(document.sections.map(section=>section.id));
      if(ids.size!==document.sections.length) throw new Error('Duplicate outline anchor '+route);
      for(const item of resources.products){
        if(!fs.existsSync('public'+item.imageSrc)||fs.statSync('public'+item.imageSrc).size===0) throw new Error('Missing image '+item.imageSrc);
        urls.add(item.href);
      }
      if(!fs.existsSync('public'+footer.cta.backgroundImage)) throw new Error('Missing CTA background '+route);
      for(const article of resources.articles) urls.add('/en/resources/technical-articles/'+article.slug+'/');
      for(const key of footer.products) if(!reviewProductGates[key]?.every(Boolean)) throw new Error('No product task boundary '+key);
      const links=[...document.intro.flatMap(linkTargets),...document.sections.flatMap(section=>section.blocks.flatMap(linkTargets)),...document.references.map(ref=>ref.href),...(document.related?.map(link=>link.href)??[])];
      for(const rawHref of links) {
        const href=resolveApplicationHref(rawHref);
        if(href.startsWith('/')) {
          if(!href.startsWith('/en/')&&!href.startsWith('/downloads/')) throw new Error('Review link changes locale '+route+' -> '+href);
          urls.add(href);
          if(href.includes('/applications/')) applicationLinks.push({href,source:route});
        }
        if(href.startsWith('#')&&!ids.has(href.slice(1))) throw new Error('Unresolved in-page link '+route+href);
      }
      records.push({kind,path:route,title:document.title,sections:document.sections.length,products:footer.products.map(key=>reviewProductCards[key].title),articles:resources.articles.map(article=>article.title),contact:footer.cta.title});
    }
  }
  if(records.length!==75) throw new Error('Wrong unique document count '+records.length);
  // Regression cases where the old generic profile contradicted the visible task.
  if(!getReviewModuleTask('ivd','hematology','hematology-channel','switch').validation.includes('检测通道')) throw new Error('Detection task regressed');
  if(!getReviewTaskCopy('onlineSample').validation.includes('更新时间')) throw new Error('Sample update regressed');
  if(!getReviewTaskCopy('mixing').validation.includes('均匀性')) throw new Error('Mixing task regressed');
  if(!getReviewTaskCopy('drive').validation.includes('排废')) throw new Error('Drive categories regressed');
  if(!getReviewTaskCopy('titration').validation.includes('终点')) throw new Error('Titration task regressed');
  if(!getReviewTaskCopy('replenishment').validation.includes('液位')) throw new Error('Replenishment task regressed');
  if(!getReviewTaskCopy('proportion').validation.includes('瞬时组成')) throw new Error('Proportion task regressed');
  const routeBodies = new Map<string,string>();
  let cursor=0; const targets=[...urls];
  await Promise.all(Array.from({length:3},async()=>{
    while(cursor<targets.length){
      const href=targets[cursor++];
      const response=await fetch('http://127.0.0.1:3000'+href);
      if(response.status!==200) throw new Error('Broken review target '+response.status+' '+href);
      if(href.startsWith('/en/')&&!new URL(response.url).pathname.startsWith('/en/')) throw new Error('Target redirected out of English '+href);
      if(href.includes('/applications/')) routeBodies.set(href,await response.text());
    }
  }));
  for(const {href,source} of applicationLinks){
    const hash=new URL(href,'http://127.0.0.1:3000').hash.slice(1);
    if(hash && !routeBodies.get(href)?.includes('id="'+hash+'"')) throw new Error('Broken cross-page anchor '+source+' -> '+href);
  }
  fs.mkdirSync('node_modules/.cache/foreach-english-review',{recursive:true});
  fs.writeFileSync('node_modules/.cache/foreach-english-review/consistency-results.json',JSON.stringify({checkedPages:records.length,taskBranches,uniqueInternalTargets:targets.length,records},null,2));
  console.log(JSON.stringify({checkedPages:records.length,taskBranches,curatedProductCards:Object.keys(reviewProductCards).length,internalTargets:targets.length,selectionAndFooter:'passed',taskRegressions:'passed',relatedAnchors:'passed'}));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
