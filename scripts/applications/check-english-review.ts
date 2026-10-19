import { resolveApplicationHref } from "../../data/applications/application-routes";
import { REVIEW_KINDS, getReviewHub, getReviewTopic, reviewTopicSlug, getReviewNav, reviewProductLink, getReviewQueryLinks } from '../../data/applications/english-review';
import {applicationArticleGroups,resolveEnglishApplicationArticleHref} from '../../data/applications/application-article-links';
import {getVisibleNavigationItems,getLocalizedHref} from '../../data/navigation';
import { reviewTopics } from '../../data/applications/english-review-topics';
import { reviewGuides } from '../../data/applications/english-review-guides';
import { analyticalDocuments } from '../../data/applications/analytical-documents/registry';
import type { ApplicationDocument } from '../../data/applications/analytical-documents/types';
import fs from 'node:fs';
import { isFinalizedEnglishReference } from '../../services/applications/english-review';
import { reviewGuideStructures } from '../../data/applications/english-review-structure';
import { applyReviewGuide } from '../../data/applications/english-review';

const generated: ApplicationDocument[] = [];
for (const kind of REVIEW_KINDS) {
  if (!isFinalizedEnglishReference(kind)) generated.push(getReviewHub(kind));
  for (const key of Object.keys(reviewTopics).filter(key => key.startsWith(kind + '/'))) {
    const group = key.split('/')[1];
    const doc = getReviewTopic(kind, group);
    if (isFinalizedEnglishReference(kind,doc.slug)) continue;
    if (doc.slug !== reviewTopicSlug(kind, group)) throw new Error('Wrong topic slug: ' + key);
    generated.push(doc);
  }
  for (const branch of getReviewNav(kind)) {
    if (!branch.overview.href.startsWith('/en/')) throw new Error('Non-English navigation path');
    for (const child of branch.children) if (!child.href.startsWith('/en/')) throw new Error('Non-English task path');
  }
}
for (const item of analyticalDocuments) {
  if (item.slug && item.slug !== 'liquid-chromatography' && !reviewGuides[item.slug]) throw new Error('Missing Chinese guide: ' + item.slug);
  if (item.slug && !isFinalizedEnglishReference('analytical-instruments',item.slug)) {
    if(!reviewGuideStructures[item.slug]) throw new Error('Missing article structure: '+item.slug);
    const doc=applyReviewGuide({...item,intro:[],sections:[],references:[]});
    if(doc.sections.length<6||!doc.sections.some(section=>section.blocks.some(block=>block.type==='flow'))||doc.sections.filter(section=>section.blocks.some(block=>block.type==='table')).length<2) throw new Error('Incomplete reference-style guide '+item.slug);
    generated.push(doc);
  }
}
for (const doc of generated) {
  if (!/[\u4e00-\u9fff]/.test(doc.title)) throw new Error('Non-Chinese review title: ' + doc.slug);
  const ids = new Set<string>();
  for (const section of doc.sections) {
    if (ids.has(section.id)) throw new Error('Duplicate section: ' + doc.slug + '/' + section.id);
    ids.add(section.id);
    for (const block of section.blocks) {
      if (block.type === 'table' && block.rows.some(row => row.length !== block.headers.length)) throw new Error('Broken comparison table');
      for (const id of block.references ?? []) if (!doc.references.some(ref => ref.id === id)) throw new Error('Missing reference');
    }
  }
}
for (const topic of Object.values(reviewTopics)) for (const row of topic.candidates) reviewProductLink(row[0]);
const moduleSections = generated.reduce((sum, doc) => sum + doc.sections.filter(section => section.id.startsWith('task-') && section.id !== 'task-guides').length, 0);
if (moduleSections !== 112) throw new Error(`Expected 112 active review task sections outside the finalized LC reference; found ${moduleSections}`);
const protectedFiles = JSON.parse(fs.readFileSync('node_modules/.cache/foreach-english-review/language-baseline.json', 'utf8')) as {path: string; hash: string}[];
let legacyTopics=0,legacyModules=0,directMenuArticles=0;
for(const kind of REVIEW_KINDS) {
  const targets=getReviewQueryLinks(kind);
  if(JSON.stringify(Object.keys(targets))!==JSON.stringify(applicationArticleGroups[kind])) throw new Error('Legacy topic map differs '+kind);
  for(const [group,target] of Object.entries(targets)) {
    const oldHref=`/en/applications/${kind}/?application=${group}`;
    if(resolveEnglishApplicationArticleHref(oldHref)!==target.href) throw new Error('Broken legacy topic '+oldHref);
    legacyTopics++;
    for(const [moduleKey,id] of Object.entries(target.modules)) {
      if(resolveEnglishApplicationArticleHref(oldHref+'&module='+moduleKey)!==target.href+'#'+id) throw new Error('Broken legacy task '+oldHref+moduleKey);
      legacyModules++;
    }
  }
}
const applications=getVisibleNavigationItems('en').find(item=>item.key==='applications');
for(const card of applications?.megaDropdown?.cards??[]) for(const image of card.images??[]) {
  if(!image.href) continue;
  const href=getLocalizedHref(image.href,'en');
  if(href.includes('/applications/')&&/application=|instrument=/.test(href)) throw new Error('Legacy English menu link '+href);
  if(href.includes('/applications/')&&href.split('/').filter(Boolean).length>=4) {
    if(resolveApplicationHref(href)!==href) throw new Error('Noncanonical English menu link '+href);
    directMenuArticles++;
  }
  for(const locale of ['zh-CN','es','fr','ko','ru']) if(getLocalizedHref(image.href,locale)!==(image.href[locale]??image.href.en??image.href['zh-CN']??'/')) throw new Error('Changed other-language menu '+locale);
}
if(legacyTopics!==30||legacyModules!==116||directMenuArticles!==30) throw new Error('Incomplete legacy migration');
for(const file of ['ApplicationEnglishClient.tsx','ApplicationTaskGuide.tsx','ApplicationSearchParamsSync.tsx']) if(fs.existsSync('components/applications/'+file)) throw new Error('Retired renderer remains '+file);
console.log(JSON.stringify({legacyTopics,legacyModules,directMenuArticles,oldRenderer:'removed',otherLocaleNavigation:'unchanged'}));
console.log(JSON.stringify({ activeReviewHubs: 5, activeReviewTopics: 29, activeReviewGuides: Object.keys(reviewGuides).filter(slug=>!isFinalizedEnglishReference('analytical-instruments',slug)).length, finalizedEnglishReferences: 10, taskSections: moduleSections, finalizedLcModuleRequirements:4, protectedBaselineFiles: protectedFiles.length }));
