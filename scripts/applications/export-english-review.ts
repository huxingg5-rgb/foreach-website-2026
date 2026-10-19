import { applicationDocumentHref, resolveApplicationHref } from "../../data/applications/application-routes";
import fs from 'node:fs';
import path from 'node:path';
import { REVIEW_KINDS, getReviewHub, getReviewLcOverview, reviewDomains } from '../../data/applications/english-review';
import { getReviewDocument, reviewSlugs, isFinalizedEnglishReference } from '../../services/applications/english-review';
import { reviewGuides } from '../../data/applications/english-review-guides';
import { liquidChromatographyDocuments } from '../../data/applications/analytical-documents/liquid-chromatography';
import { isIvdClinicalDocumentSlug } from '../../data/applications/analytical-documents/registry';
import type { ApplicationBlock, ApplicationDocument } from '../../data/applications/analytical-documents/types';
import { getEnglishReviewResources } from '../../services/applications/english-review-resources';
import { getReviewFooterPlan, reviewProductGates } from '../../data/applications/english-review-resources';

const destination = 'D:/ObsidianVaults/个人工作台/06_数字营销增长/01_SEO/应用中心/全领域分析/英文栏目中文审阅稿';
const cell = (value: string) => value.replaceAll('|', '\\|').replaceAll('\n', '<br>');
function markdown(block: ApplicationBlock): string {
  switch(block.type) {
    case 'paragraph': return block.text;
    case 'subheading': return '### ' + block.title;
    case 'flow': return '**' + block.caption + '**\n\n' + block.nodes.join(' → ') + (block.note ? '\n\n' + block.note : '');
    case 'table': return '**' + block.caption + '**\n\n| ' + block.headers.map(cell).join(' | ') + ' |\n| ' + block.headers.map(() => '---').join(' | ') + ' |\n' + block.rows.map(row => '| ' + row.map(cell).join(' | ') + ' |').join('\n') + (block.note ? '\n\n' + block.note : '');
    case 'list': return block.items.map((item, index) => (block.ordered ? `${index+1}. ` : '- ') + item).join('\n');
    case 'links': return block.items.map(item => `- [${item.label}](${item.href.startsWith('/') ? 'http://127.0.0.1:3000'+resolveApplicationHref(item.href) : item.href})${item.description ? '：' + item.description : ''}`).join('\n');
    case 'callout': return (block.title ? '**' + block.title + '**\n\n' : '') + block.text;
  }
}
function write(kind: typeof REVIEW_KINDS[number], document: ApplicationDocument) {
  const relative = `${reviewDomains[kind].title}/${document.kind === 'hub' ? '00_领域总览' : document.title.replace(/[<>:"/\\|?*]/g,'_')}.md`;
  const file = path.join(destination, relative);
  fs.mkdirSync(path.dirname(file), {recursive: true});
  const url = applicationDocumentHref(kind, document.slug);
  const resources = getEnglishReviewResources(kind,document);
  const plan = getReviewFooterPlan(kind,document);
  const footer = '\n\n## 相关产品\n\n'+resources.products.map((item,index)=>`- [${item.title}](http://127.0.0.1:3000${item.href})：${reviewProductGates[plan.products[index]].join('；')}`).join('\n')
    +'\n\n## 相关技术文章\n\n'+resources.articles.map(item=>`- [${item.title}](http://127.0.0.1:3000/en/resources/technical-articles/${item.slug}/)`).join('\n')
    +'\n\n## '+plan.cta.title+'\n\n'+plan.cta.description+'\n\n[联系工程师](http://127.0.0.1:3000'+plan.cta.href+')\n';
  const source = `---\nstatus: 中文审阅稿-待用户确认\nsite_path: ${url}\ncontent_language: zh-CN\nsite_locale: en\nupdated: 2026-10-06\n---\n\n# ${document.title}\n\n> 本稿用于英文栏目审核，尚未翻译；其他语言官网内容保持原样。\n\n[打开本地审阅页面](http://127.0.0.1:3000${url})\n\n` + document.intro.map(markdown).join('\n\n')+'\n\n' + document.sections.map((section,index) => `## ${String(index+1).padStart(2,'0')} ${section.title}\n\n${section.blocks.map(markdown).join('\n\n')}`).join('\n\n') + (document.references.length ? '\n\n## 参考资料\n\n'+document.references.map(ref => `- [${ref.title}](${ref.href.startsWith('/') ? 'http://127.0.0.1:3000'+resolveApplicationHref(ref.href) : ref.href})`).join('\n') : '') + (document.related?.length ? '\n\n## 相关指南\n\n'+markdown({type:'links',items:document.related}) : '')+'\n';
  fs.writeFileSync(file,source+footer);
  if (!fs.statSync(file).size) throw new Error('Empty review note: '+file);
  return {title: document.title, relative: relative.replace(/\.md$/,''), url};
}
async function main() {
  // Retain withdrawn drafts as vault history, outside the active review collection.
  const archive = path.resolve(destination, '../历史记录/2026-10-06_已撤回的定稿参考页中文改写');
  const withdrawn = ['00_领域总览', getReviewLcOverview().title, ...liquidChromatographyDocuments.filter(doc => doc.slug !== 'liquid-chromatography').map(doc => reviewGuides[doc.slug].title)];
  for (const title of withdrawn) {
    const source = path.resolve(destination, '分析仪器', title.replace(/[<>:"/\\|?*]/g,'_')+'.md');
    const target = path.resolve(archive, path.basename(source));
    if (!source.startsWith(path.resolve(destination)+path.sep) || !target.startsWith(archive+path.sep)) throw new Error('Invalid archive path');
    if (!fs.existsSync(source)) continue;
    if (fs.existsSync(target)) throw new Error('Archive already exists: '+target);
    fs.mkdirSync(archive, {recursive:true});
    fs.renameSync(source,target);
    fs.writeFileSync(target,fs.readFileSync(target,'utf8').replace('status: 中文审阅稿-待用户确认','status: 已撤回-定稿参考页保持原英文')+'\n> 2026-10-06：本中文改写已撤回，仅保留历史；网站已恢复用户定稿英文，不再使用本稿。\n');
  }
  const index: string[] = [];
  let count = 0;
  for (const kind of REVIEW_KINDS) {
    index.push(`## ${reviewDomains[kind].title}\n`);
    const documents = isFinalizedEnglishReference(kind) ? [] : [getReviewHub(kind)];
    for (const slug of reviewSlugs(kind)) {
      if (isFinalizedEnglishReference(kind,slug)) continue;
      if (kind === 'analytical-instruments' && isIvdClinicalDocumentSlug(slug)) continue;
      const doc = await getReviewDocument(kind,slug);
      if (!doc) throw new Error('Missing review body: '+kind+'/'+slug);
      documents.push(doc);
    }
    for (const doc of documents) {
      const item = write(kind,doc);
      index.push(`- [[${item.relative}|${item.title}]] · [本地网页](http://127.0.0.1:3000${item.url})`);
      count++;
    }
    index.push('');
  }
  const finalized = [{title:'分析仪器总览',slug:''},...liquidChromatographyDocuments];
  const referenceLinks = finalized.map(doc=>`- [${doc.title}](http://127.0.0.1:3000${applicationDocumentHref('analytical-instruments',doc.slug)})`).join('\n');
  fs.writeFileSync(path.join(destination,'00_审阅入口.md'),`---\nstatus: 待用户确认-定稿参考页保持原英文\nupdated: 2026-10-06\n---\n\n# 英文栏目中文审阅稿\n\n按定稿参考页的结构补写其他部分，共 ${count} 份有效中文审阅稿：5个领域总览、29个设备/工作站专题、41份元件与任务指南。旧分析路径中的2个生化别名不重复收录。\n\n用户已定稿的分析仪器总览和液相色谱整组10页已恢复原英文，不改写、不翻译。被撤回的10份中文改写移入Obsidian历史记录，不属于有效稿件。范围修正记录：[[13_定稿英文参考页恢复记录]]。\n\n中文、西班牙语、法语、韩语、俄语应用页面保持原样。其余中文审阅稿仅挂在 /en/ 路径，用户确认后再翻译；本轮未发布。页面格式参照定稿长文，补齐流程定位、工作条件、操作、选型比较和验证；正文之后统一使用相关产品卡片、相关技术文章卡片与场景化深色联系横幅。最新检查：[[15_页面一致性与逻辑复查]]；前轮格式记录：[[14_其余页面参考格式补齐记录]]。\n\n## 定稿英文参考页（原样保留）\n\n${referenceLinks}\n\n${index.join('\n')}\n`);
  console.log(JSON.stringify({destination,notes:count,indexBytes:fs.statSync(path.join(destination,'00_审阅入口.md')).size}));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
