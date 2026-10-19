import { applicationDocumentHref } from "../../data/applications/application-routes";
import fs from 'node:fs';
import crypto from 'node:crypto';
import { REVIEW_KINDS, getReviewHub, reviewBase, getReviewQueryLinks } from '../../data/applications/english-review';
import { getReviewDocument, reviewSlugs, isFinalizedEnglishReference } from '../../services/applications/english-review';
import type { ApplicationDocument } from '../../data/applications/analytical-documents/types';
import { getReviewFooterPlan } from '../../data/applications/english-review-resources';
import type { EnglishApplicationKind } from '../../data/applications/application-english';

async function main() {
  const routes: {path: string; document?: ApplicationDocument; finalized?: boolean}[] = [];
  for (const kind of REVIEW_KINDS) {
    routes.push({path:reviewBase(kind),document:isFinalizedEnglishReference(kind) ? await getReviewDocument(kind,'') : getReviewHub(kind),finalized:isFinalizedEnglishReference(kind)});
    for(const slug of reviewSlugs(kind)) routes.push({path:applicationDocumentHref(kind,slug),document:await getReviewDocument(kind,slug),finalized:isFinalizedEnglishReference(kind,slug)});
    for(const target of Object.values(getReviewQueryLinks(kind))) {
      const slug=target.href.split('/').filter(Boolean).at(-1)!;
      const document=await getReviewDocument(kind,slug);
      for(const id of Object.values(target.modules)) if(!document?.sections.some(section=>section.id===id)) throw new Error(`Broken query anchor ${target.href}#${id}`);
    }
    routes.push({path:'/applications/'+kind+'/'});
    for(const locale of ['es','fr','ko','ru']) routes.push({path:`/${locale}/applications/${kind}/`});
  }
  let cursor=0;
  let english=0,protectedLocales=0,finalizedEnglish=0;
  await Promise.all(Array.from({length:3},async()=>{
    while(cursor<routes.length){
      const route=routes[cursor++];
      const response=await fetch('http://127.0.0.1:3000'+route.path);
      if(response.status!==200) throw new Error(`${response.status} ${route.path}`);
      const html=await response.text();
      const review=html.includes('data-review-locale="en"');
      if(route.document){
        if(!html.includes(route.document.title)) throw new Error('Wrong document title '+route.path);
        if(route.finalized) {
          if(review||html.includes('中文审阅稿')||!html.includes('ON THIS PAGE')) throw new Error('Finalized reference overwritten '+route.path);
          finalizedEnglish++;
        } else {
          if(!review||!html.includes('lang="zh-CN"')) throw new Error('Wrong review content '+route.path);
          const kind=route.path.split('/')[3] as EnglishApplicationKind;
          const footer=getReviewFooterPlan(kind,route.document);
          if(!html.includes('aria-label="相关产品, 相关技术文章"')||!html.includes('data-review-contact')||!html.includes(footer.cta.title)) throw new Error('Incomplete reference-style footer '+route.path);
        }
        for(const section of route.document.sections) if(!html.includes(`id="${section.id}"`)) throw new Error('Missing section '+route.path+'#'+section.id);
        english++;
      }else{
        if(review||html.includes('中文审阅稿')) throw new Error('Changed protected locale '+route.path);
        protectedLocales++;
      }
    }
  }));
  const baseline = JSON.parse(fs.readFileSync('node_modules/.cache/foreach-english-review/language-baseline.json','utf8')) as {path: string;hash:string}[];
  const sourceHash=(path:string)=>fs.existsSync(path) ? crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex').toUpperCase() : 'REMOVED';
  const changed=baseline.filter(item=>sourceHash(item.path)!==item.hash);
  const allowed=['components/applications/analytical-documents/AnalyticalApplicationDocument.tsx'];
  // User authorized retiring query selection, while the finalized article text stays protected.
  const retiredQueryEntryHashes: Record<string,string> = {
    'components/applications/ApplicationEnglishClient.tsx':'REMOVED',
    'components/applications/analytical-instruments/AnalyticalInstrumentsLandingShell.tsx':'FCEB6A4DD11511C61DBA66BBF919E3C8124E157F9EE5B4E9EEAFF37BF08C7112',
    'components/applications/analytical-instruments/AnalyticalInstrumentsQueryView.tsx':'72598961EBC1620A7877CFD722841DB581DF55280B189647385898475735232A',
  };
  if(changed.some(item=>!allowed.includes(item.path)&&sourceHash(item.path)!==retiredQueryEntryHashes[item.path])) throw new Error('Protected source changed: '+JSON.stringify(changed));
  console.log(JSON.stringify({englishRoutes:english,finalizedEnglishRoutes:finalizedEnglish,chineseReviewRoutes:english-finalizedEnglish,protectedLocaleRoutes:protectedLocales,sourceHashChanges:changed.map(item=>item.path),oldModuleAnchors:'passed'}));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
