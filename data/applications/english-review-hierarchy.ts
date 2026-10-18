import type { EnglishApplicationKind } from './application-english';
import { applicationDocumentHref } from './application-routes';
import type { ApplicationBlock, ApplicationDocument, ApplicationDocumentMetadata, ApplicationLink, ApplicationSection } from './analytical-documents/types';
import type { ApplicationGroupContent } from './application-content';
import workflows from './application-workflows.json';
import taskProfiles from './application-task-profiles.json';
import { applicationArticleHref, applicationArticleSlug } from './application-article-links';
import { getReviewTopicEditorial } from './english-review-editorial';
import { reviewTopics } from './english-review-topics';
import { getReviewModuleTask } from './english-review-logic';
import { getTopicProductRoles, productFamilies, type ProductApplicationRole, type ProductRoleKey } from './english-review-product-roles';
import { getReviewFooterPlan, reviewProductCards, reviewProductGates, type ReviewProductCardId } from './english-review-resources';
import { productGuideCopy, type ProductGuideFamilyId } from './english-review-product-guide-copy';
import { reviewGuides } from './english-review-guides';
import { reviewTaskProcedures } from './english-review-task-procedures';

// A domain joins the new article hierarchy after its page and navigation review.
export const hierarchyEnabledKinds: readonly EnglishApplicationKind[] = ['ivd','life-science','lab-automation','analytical-instruments','environmental-monitoring','synthetic-biology'];
const sourceGroups: Record<string, Record<string, ApplicationGroupContent>> = workflows;
const kebab = (value: string) => value.replace(/[A-Z]/g, letter => '-'+letter.toLowerCase());
const p = (text: string): ApplicationBlock => ({type:'paragraph',text});
const links = (items: ApplicationLink[]): ApplicationBlock => ({type:'links',items});
const section = (id: string,title: string,blocks: ApplicationBlock[]): ApplicationSection => ({id,title,blocks});
const unique = <T,>(items: readonly T[]) => [...new Set(items)];

export type ReviewHierarchyEntry = {
  slug: string;
  level: 'product' | 'task';
  topic: string;
  family: ProductGuideFamilyId;
  parentSlug?: string;
  title: string;
  navLabel: string;
  roles: ProductApplicationRole[];
  modules: string[];
};

const families: Record<ProductGuideFamilyId,{label:string;slug:string;roles:ProductRoleKey[]}> = {
  piston: {label:'柱塞泵',slug:'piston-pumps',roles:['piston']},
  syringe: {label:'注射泵',slug:'syringe-pumps',roles:['syringe']},
  pipetting: {label:'空气置换移液泵',slug:'pipetting-pumps',roles:['pipetting']},
  valveless: {label:'无阀计量泵',slug:'valveless-pumps',roles:['valveless']},
  diaphragm: {label:'隔膜泵',slug:'diaphragm-pumps',roles:['liquidPump','gasLiquidPump']},
  valves: {label:'液路阀',slug:'fluidic-valves',roles:['rotary','solenoid','highPressure','pinch']},
  probes: {label:'采样、清洗与混匀部件',slug:'probes',roles:['probe','washProbe','mixing']},
  monitoring: {label:'气泡与压力检测',slug:'fluid-monitoring',roles:['monitoring']},
  fluidics: {label:'管路连接与保护',slug:'fluidic-connections',roles:['connections','filter','checkValve']},
};
const taskFamilies: Record<string,ProductGuideFamilyId[]> = {
  sample:['piston','syringe','pipetting'], dose:['syringe','piston','pipetting','valveless'],
  timedDose:['syringe','piston'], dilution:['syringe','pipetting','piston'],
  pipette:['pipetting','syringe'], plateDose:['syringe','pipetting','valveless'],
  beadWash:['pipetting','diaphragm','probes'], wash:['diaphragm','probes','pipetting'],
  drain:['diaphragm'], switch:['valves'], connect:['fluidics'], monitor:['monitoring'],
  filter:['fluidics'], protection:['fluidics'], pinch:['valves'], compatibility:['fluidics'],
  feeding:['valveless','syringe'], continuous:['valveless','syringe','diaphragm'],
  repeatDose:['valveless','syringe'], proportion:['valveless','syringe'],
  onlineSample:['syringe','diaphragm'], cellTransfer:['syringe','pipetting'],
  extraction:['pipetting','syringe'], integration:['valves'], drive:['diaphragm','syringe','valveless'],
};
const moduleParents: Record<string,ProductGuideFamilyId> = {
  'ivd/clinical/clinical-sample':'piston', 'ivd/clinical/clinical-reagent':'piston',
  'ivd/immunoassay/immunoassay-beadWash':'diaphragm',
  'ivd/molecular/molecular-lysis':'syringe', 'ivd/molecular/molecular-wash':'pipetting',
  'life-science/genomics/samplePrep':'pipetting', 'life-science/genomics/washElution':'pipetting',
  'lab-automation/samplePrep/washing':'diaphragm', 'lab-automation/pipetting/dispensing':'pipetting',
  'lab-automation/pipetting/needleWash':'probes', 'lab-automation/microplate/plateWash':'diaphragm',
  'analytical-instruments/waterQuality/reagent':'piston',
  'environmental-monitoring/waterQuality/sampling':'diaphragm', 'environmental-monitoring/waterQuality/reagent':'diaphragm',
  'environmental-monitoring/wastewater/sampling':'diaphragm', 'environmental-monitoring/wastewater/drainage':'diaphragm',
  'environmental-monitoring/gasPretreatment/absorption':'diaphragm',
  'environmental-monitoring/samplingPrep/transfer':'pipetting', 'environmental-monitoring/samplingPrep/waste':'fluidics',
  'synthetic-biology/biofoundry/plate':'pipetting',
};
// Cross-branch comparisons remain part of the instrument overview, with links
// to the actual product applications rather than an artificial single parent.
const overviewModules=new Set([
  'life-science/bioProcess/waste',
  'analytical-instruments/labAnalyzer/fluidDrive',
  'environmental-monitoring/systemIntegration/fluidDrive',
  'environmental-monitoring/wastewater/reagent',
  'synthetic-biology/bioProcessIntegration/fluidDrive',
]);
const taskNames: Record<string,string> = {
  'lab-automation/samplePrep/pipetting':'吸头式样本转移',
  'lab-automation/pipetting/pipetting':'一次性吸头单次移液',
  'lab-automation/pipetting/dispensing':'一次吸取后的多次分配',
  'lab-automation/microplate/plateWash':'孔板洗涤与吸液',
  'analytical-instruments/spectroscopy/sampling':'液体样品离散转移与引入条件',
  'analytical-instruments/samplePrep/extraction':'吸头式萃取液与目标相转移',
  'analytical-instruments/waterQuality/reagent':'反应试剂定量加入与计时',
  'environmental-monitoring/waterQuality/reagent':'现场试剂供给与换瓶恢复',
  'environmental-monitoring/gasPretreatment/protection':'样气支路的过滤保护',
  'environmental-monitoring/samplingPrep/transfer':'吸头式环境样品分取与转移',
  'synthetic-biology/biofoundry/reagent':'生物试剂吸取与分配',
  'synthetic-biology/biofoundry/pipetting':'构建样本的吸头式移液',
  'synthetic-biology/biofoundry/plate':'筛选孔板的逐孔交付',
  'synthetic-biology/microBioreactor/waste':'含气废液抽吸与维护恢复',
  'life-science/automation/pipetting':'吸头式实验移液',
  'life-science/cellCulture/media':'培养基重复与持续供给',
  'ivd/clinical/clinical-sample':'样本吸取与转移', 'ivd/clinical/clinical-reagent':'试剂定量加液',
  'ivd/clinical/clinical-switching':'样本、试剂与洗液路径切换', 'ivd/clinical/clinical-cleaning':'针杯清洗供液与排废',
  'ivd/immunoassay/immunoassay-sample':'固定针样本加入', 'ivd/immunoassay/immunoassay-reagent':'多试剂吸取与分配',
  'ivd/immunoassay/immunoassay-beadWash':'磁性固相洗涤的供液与排废', 'ivd/immunoassay/immunoassay-switching':'试剂与洗液路径隔离',
  'ivd/hematology/hematology-sample':'全血取样与交付', 'ivd/hematology/hematology-dilution':'稀释液与反应试剂计量',
  'ivd/hematology/hematology-channel':'检测通道切换与更新', 'ivd/hematology/hematology-cleaning':'血液通道清洗与排废',
  'ivd/coagulation/coagulation-sample':'方法规定的样本交付', 'ivd/coagulation/coagulation-reagent':'试剂到达与反应计时',
  'ivd/coagulation/coagulation-switching':'试剂来源与反应路径切换', 'ivd/coagulation/coagulation-cleaning':'复用路径清洗与首剂恢复',
  'ivd/molecular/molecular-lysis':'固定液路裂解与结合试剂分配', 'ivd/molecular/molecular-wash':'吸头式洗涤与洗脱产物转移',
  'ivd/molecular/molecular-switching':'试剂、产物与废液路径隔离',
};
const legacyTasks: Record<string,string> = {
  'ivd/clinical/clinical-sample':'piston-sample-transfer',
  'ivd/clinical/clinical-reagent':'piston-reagent-dispensing',
};
const taskUrlNames: Record<string,string> = {
  'lab-automation/pipetting/pipetting':'pipetting-single-transfer',
  'lab-automation/reagentDispensing/dispensing':'reagent-dispensing-repeated-filling',
  'synthetic-biology/onlineSampling/sampling':'online-sampling-sample-acquisition',
};
const taskRoleKeys: Record<string,ProductRoleKey[]> = {
  'life-science/protein/buffer':['rotary'],
  'environmental-monitoring/gasPretreatment/absorption':['liquidPump'],
  'environmental-monitoring/gasPretreatment/tubeControl':['pinch'],
  'synthetic-biology/onlineSampling/tubeControl':['pinch'],
  'environmental-monitoring/samplingPrep/waste':['connections'],
  'environmental-monitoring/gasPretreatment/protection':['filter'],
  'synthetic-biology/feedingControl/protection':['checkValve','connections'],
};

export function hasReviewHierarchy(kind: EnglishApplicationKind) { return hierarchyEnabledKinds.includes(kind); }
function topicLabel(kind: EnglishApplicationKind,topic: string) {
  return getReviewTopicEditorial(kind,topic)?.label ?? reviewTopics[`${kind}/${topic}`].title.split('：')[0];
}
function familyLabel(roles: readonly ProductApplicationRole[],family: ProductGuideFamilyId) {
  if (family==='probes') return roles.map(role=>productFamilies[role.key].label).join('与');
  if (family==='valves' && roles.length===1) return productFamilies[roles[0].key].label;
  if (family==='fluidics' && roles.length===1) return productFamilies[roles[0].key].label;
  return families[family].label;
}
function moduleIndex(kind: EnglishApplicationKind,topic: string,moduleKey: string) {
  return Object.keys(sourceGroups[kind][topic].modules).indexOf(moduleKey);
}
function moduleName(kind: EnglishApplicationKind,topic: string,moduleKey: string) {
  return taskNames[`${kind}/${topic}/${moduleKey}`] ?? reviewTopics[`${kind}/${topic}`].modules[moduleIndex(kind,topic,moduleKey)][0].split('：')[0];
}
function taskSlug(kind: EnglishApplicationKind,topic: string,moduleKey: string) {
  return legacyTasks[`${kind}/${topic}/${moduleKey}`] ?? taskUrlNames[`${kind}/${topic}/${moduleKey}`] ?? `${kebab(topic)}-${kebab(moduleKey.replace(new RegExp('^'+topic+'-'),''))}`;
}
function moduleParent(kind: EnglishApplicationKind,topic: string,moduleKey: string,available: ProductGuideFamilyId[]) {
  const key=`${kind}/${topic}/${moduleKey}`;
  const task=sourceGroups[kind][topic].modules[moduleKey].task;
  const parent=moduleParents[key] ?? taskFamilies[task]?.find(family=>available.includes(family));
  if (!parent || !available.includes(parent)) throw new Error(`Missing application task parent: ${key} (${task})`);
  return parent;
}
function integratedModule(kind: EnglishApplicationKind,topic: string,moduleKey: string) {
  return ['monitor','connect','compatibility'].includes(sourceGroups[kind][topic].modules[moduleKey].task);
}
const entryCache = new Map<EnglishApplicationKind,ReviewHierarchyEntry[]>();
export function getReviewHierarchyEntries(kind: EnglishApplicationKind): ReviewHierarchyEntry[] {
  if (!hasReviewHierarchy(kind)) return [];
  const cached=entryCache.get(kind); if (cached) return cached;
  const result: ReviewHierarchyEntry[]=[];
  for (const topic of Object.keys(sourceGroups[kind])) {
    const roles=getTopicProductRoles(kind,topic);
    if (!roles.length) continue; // Finalized LC keeps its existing registry and document bodies.
    const available=(Object.keys(families) as ProductGuideFamilyId[]).filter(family=>roles.some(role=>families[family].roles.includes(role.key)));
    const parents=available.map((family):ReviewHierarchyEntry=>{
      const selected=roles.filter(role=>families[family].roles.includes(role.key));
      const label=`${familyLabel(selected,family)}在${topicLabel(kind,topic)}中的应用`;
      const slug=topic==='pipetting' && family==='pipetting' ? 'pipetting-air-displacement-pumps' : `${kebab(topic)}-${families[family].slug}`;
      return {slug,level:'product',topic,family,title:label,navLabel:label,roles:selected,modules:[]};
    });
    result.push(...parents);
    for (const moduleKey of Object.keys(sourceGroups[kind][topic].modules)) {
      if (overviewModules.has(`${kind}/${topic}/${moduleKey}`)) continue;
      const parent=parents.find(entry=>entry.family===moduleParent(kind,topic,moduleKey,available))!;
      parent.modules.push(moduleKey);
      if (integratedModule(kind,topic,moduleKey)) continue;
      const name=moduleName(kind,topic,moduleKey);
      const slug=taskSlug(kind,topic,moduleKey);
      const roleKeys=taskRoleKeys[`${kind}/${topic}/${moduleKey}`] ?? (sourceGroups[kind][topic].modules[moduleKey].task==='filter' ? ['filter','connections'] : undefined);
      const taskRoles=roleKeys ? parent.roles.filter(role=>roleKeys.includes(role.key)) : parent.roles;
      result.push({slug,level:'task',topic,family:parent.family,parentSlug:parent.slug,title:legacyTasks[`${kind}/${topic}/${moduleKey}`] ? reviewGuides[slug].title : `${topicLabel(kind,topic)}：${name}`,navLabel:name,roles:taskRoles,modules:[moduleKey]});
    }
  }
  if (unique(result.map(entry=>entry.slug)).length!==result.length) throw new Error(`Duplicate hierarchy slug: ${kind}`);
  entryCache.set(kind,result);
  return result;
}
export function getReviewHierarchyEntry(kind: EnglishApplicationKind,slug: string) {
  return getReviewHierarchyEntries(kind).find(entry=>entry.slug===slug);
}
export function getReviewHierarchyTopic(kind: EnglishApplicationKind,document: ApplicationDocumentMetadata) {
  if (!hasReviewHierarchy(kind)) return undefined;
  return document.reviewContext?.topic ?? Object.keys(sourceGroups[kind]).find(topic=>applicationArticleSlug(kind,topic)===document.slug);
}
function moduleTarget(kind: EnglishApplicationKind,topic: string,moduleKey: string) {
  const entries=getReviewHierarchyEntries(kind);
  return entries.find(entry=>entry.topic===topic && entry.level==='task' && entry.modules.includes(moduleKey))
    ?? entries.find(entry=>entry.topic===topic && entry.level==='product' && entry.modules.includes(moduleKey));
}
function entryLink(kind: EnglishApplicationKind,entry: ReviewHierarchyEntry): ApplicationLink {
  return {label:entry.navLabel,href:applicationDocumentHref(kind,entry.slug)};
}
function roleProducts(roles: readonly ProductApplicationRole[]) {
  return unique(roles.flatMap(role=>role.products ?? productFamilies[role.key].products)) as ReviewProductCardId[];
}
function context(kind: EnglishApplicationKind,entry: ReviewHierarchyEntry) {
  const copy=reviewTopics[`${kind}/${entry.topic}`];
  return {topic:entry.topic,level:entry.level,family:entry.family,parentSlug:entry.parentSlug,products:roleProducts(entry.roles),hero:{highlight:copy.title.split('：')[0],description:sourceGroups[kind][entry.topic].summary.zh}};
}
function scopedFamilyCopy(entry: ReviewHierarchyEntry) {
  const copy=productGuideCopy[entry.family];
  const keys=entry.roles.map(role=>role.key);
  if (entry.topic==='gasPretreatment' && entry.family==='fluidics') return {...copy,sections:[
    {title:'分别标明样气与液体支路',text:'把样气主路、冷凝排液和吸收液路径分别列出，记录每段介质、负压或压力、连接体积与去向。材料和密封需要覆盖真实介质及维护条件，不能用液体连接的验证结果直接判断样气适配。'},
    {title:'把过滤保护与目标气体组成一起验证',text:'在方法允许的位置比较颗粒或液滴保护方案，核对气密、实际流量、新增压降和目标组成。冷凝或吸附可能改变待测组分；具体滤材与结构需按样气条件确认，现有液体过滤型号不能直接认定适用。'},
  ],checks:[['支路与介质','分别提供样气、冷凝液和吸收液的组成、温度及各状态压力。'],['保护位置','标明颗粒或液滴负荷、允许处理、新增体积和压降。'],['系统结果','比较气密、流量、目标组成以及维护后的样品更新时间。']] as [string,string][],question:'液体过滤器可以直接用于样气保护吗？',answer:'需要按实际气体、湿度、温度、负压及分析目标核对滤材和结构，并验证气密、压降和组成变化。具体配置需结合项目确认。'};
  if (entry.family==='valves' && keys.every(key=>key==='pinch')) return {...copy,sections:[
    {title:'把夹闭位置与软管状态对应',text:'按实际软管材料、内外径、壁厚及运行压力确认夹闭与松开条件。标出需要隔断的位置和允许通流的状态，检查驱动动作与软管恢复是否相配合。'},
    {title:'核对夹闭密封与更换后的恢复',text:'分别测量夹闭时的泄漏和松开后的通流，在实际循环及维护后复核。更换软管后重新确认定位、密封和恢复，整段路径的洁净要求需结合连接、装配和清洁程序验证。'},
  ],checks:[['软管条件','确认材料、内外径、壁厚及实际压力。'],['夹闭与失电状态','核对夹闭位置、动作时序以及失电后的允许状态。'],['维护恢复','检查夹闭泄漏、松开通流和更换软管后的重复表现。']] as [string,string][],question:'夹闭软管是否就证明无菌隔离？',answer:'需评价整段软管、接头、装配和清洁或灭菌程序，夹闭动作只说明特定位置的通断。'};
  if (entry.family==='valves') return {...copy,sections:[
    {title:'以本仪器的端口状态图定义连接',text:`本页涉及${entry.roles.map(role=>productFamilies[role.key].label).join('、')}。分别标出各端口、当前来源、接收去向和需要隔离的支路，在吸取、交付、清洗、维护及失电状态下检查连通。阀的选择动作需要与驱动允许条件对应。`},
    {title:'把切换后的共享段更新纳入程序',text:'来源切换后，共用管段内仍可能保留上一组成。记录从新来源到接收端的体积与到达延迟，按实际最差切换组合测量残留和恢复；端口到位与新液体到达分别确认。'},
  ]};
  if (entry.family==='probes') return {...copy,sections:[
    {title:'把部件几何与真实容器对应',text:`本页的${entry.roles.map(role=>productFamilies[role.key].label).join('、')}需要与容器开口、底部、最低液位和运动行程配合。先记录实际接触表面及允许位置，再确定端部、接口和动作空间，避免仅凭外形选择。`},
    {title:'用接收或清洗结果评价接口',text:'在来源端检查可达位置和低余量，在接收端检查实际液量、挂液或允许残液。将接液表面的维护和下一容器恢复放入连续操作中测试，更换针、管长或容器后重新确认位置和交付。'},
  ]};
  if (entry.family==='fluidics' && keys.includes('filter') && !keys.includes('checkValve')) return {...copy,sections:[copy.sections[0],
    {title:'在保护元件时检查目标物保留',text:'过滤器承担方法允许的颗粒截留或元件保护。按真实样品和滤材检查吸附、空白、压降及负载累积后的流量变化，同时测量目标物回收；滤后液体是否仍适合分析，应由具体方法验证。'},
  ],checks:[copy.checks[0],copy.checks[1],['过滤与方法','确认滤材和孔径，比较目标物回收、空白及堵塞前后的压降，记录更换后的恢复。']] as [string,string][]};
  if (entry.family==='fluidics' && keys.includes('checkValve') && !keys.includes('filter')) return {...copy,sections:[copy.sections[0],
    {title:'将止回开启负载和关闭密封分别验证',text:'按允许流向确认单向阀的位置，将开启压差和新增阻力计入真实供液负载。分别测正常交付、停泵反向泄漏和维护后的恢复；整段路径的虹吸及污染边界仍需单独评价。'},
  ],checks:[copy.checks[0],copy.checks[1],['止回与负载','核对开启压差、实际供液量、反向泄漏及更换后的密封恢复。']] as [string,string][]};
  if (entry.family==='fluidics' && !keys.includes('filter') && !keys.includes('checkValve')) return {...copy,sections:[copy.sections[0],
    {title:'核算连接体积与维护后的恢复',text:'共享段体积影响液体到达和置换，接口空隙也可能保留上一组成。记录管路长度、实际内径及管端插入位置，拆装后重新预充并检查密封；随后比较首轮交付、空白或产物回收，确认真实路径已经恢复。'},
  ],checks:[copy.checks[0],copy.checks[1],['维护恢复','记录拆装位置和新增体积，复核预充、密封及首轮接收结果。']] as [string,string][]};
  if (entry.family==='diaphragm' && !keys.includes('liquidPump')) return {...copy,sections:[
    {title:'先确认含气抽排的实际连接方式',text:'直接抽排时，适用的气液混合介质经过泵；容器真空架构中，液体先进入废液容器，泵连接其气相支路。按具体配置确认入口介质、菌体或泡沫状态、负压与排出去向。'},
    {title:'把抽排与容器保护组成完整循环',text:'按峰值来液、允许积液和有效抽吸窗口检查真实排空，同时核对满液、泡沫、泄漏及堵塞后的互锁。维护后确认密封和隔离，再恢复下一次操作；纯液连续输送及洗液供给另选适用配置。'},
  ],question:'含气抽吸的配置能否按纯液流量选型？',answer:'需按实际入口相态、负压和运行周期核对具体配置，再测装机抽排及容器状态。气体或气液抽吸参数不能直接作为纯液连续输送能力。'};
  if (entry.family==='diaphragm' && !keys.includes('gasLiquidPump')) return {...copy,sections:[
    {title:'把液体供给安排在明确的使用支路',text:'本页比较液体隔膜泵在适用供液路径中的配置。说明液源、使用端、工作液和循环时间，按真实负载测量使用位置的来液。清洗是否有效还取决于配方、覆盖和接触时间。'},
    {title:'协调供液窗口和下游接收状态',text:'管路、阀及使用端阻力会改变装机流量。供液需要与容器允许液位或清洗来液相配合；下游排液由其实际抽排架构承担，应单独核对介质和容器保护，不能由供液泵能力推定。'},
  ]};
  return copy;
}
function moduleBlocks(kind: EnglishApplicationKind,topic: string,moduleKey: string): ApplicationBlock[] {
  const sourceTask=sourceGroups[kind][topic].modules[moduleKey].task;
  const tipTask=['sample','pipette'].includes(sourceTask) && getReviewHierarchyEntries(kind).some(entry=>entry.level==='task' && entry.topic===topic && entry.family==='pipetting' && entry.modules.includes(moduleKey));
  if (tipTask) return [
    p(`本任务讨论${topicLabel(kind,topic)}中的一次性吸头空气置换操作。移液泵驱动吸头内的液体，平台配合来源、接收位置和耗材动作；先核对取头密封、真实液体及样本身份，再设置吸排与移动程序。`),
    p(reviewTopics[`${kind}/${topic}`].modules[moduleIndex(kind,topic,moduleKey)][1]),
    ...getReviewHierarchyEntries(kind).filter(entry=>entry.topic===topic && entry.level==='product' && entry.family==='syringe').map(entry=>links([{label:'固定接液路径另见注射泵应用专题',href:applicationDocumentHref(kind,entry.slug)}])),
  ];
  if (`${kind}/${topic}/${moduleKey}`==='synthetic-biology/microBioreactor/waste') return [
    p('本任务聚焦配置允许的含气废液抽吸或容器真空排废。先记录入口的菌体、细胞团、泡沫和空气状态，再确认直接抽排或连接容器气相的实际路径。'),
    p('按来液峰值、允许积液及维护计划检查抽排、满液保护、密封和隔离。纯液连续排放与清洗供液按各自介质另选配置，不能用含气抽吸参数代替。'),
  ];
  if (kind==='synthetic-biology' && topic==='biofoundry' && ['pipetting','plate'].includes(moduleKey)) return [
    p(moduleKey==='pipetting' ? '本任务采用一次性吸头空气置换，配合平台完成构建样本、酶液或配方的吸取与转移。构建或菌株身份、试剂源、目标孔位和耗材状态共同进入操作记录。固定接液分配另见注射泵专题。' : '本任务讨论吸头式筛选孔板交付。按实际板型、孔位身份和液体类别组织逐孔操作，将每孔已交付量与培养或筛选步骤关联；公共洗站及辅助供排液另按隔膜泵专题配置。'),
    p(reviewTopics[`${kind}/${topic}`].modules[moduleIndex(kind,topic,moduleKey)][1]),
  ];
  if (`${kind}/${topic}/${moduleKey}`==='environmental-monitoring/waterQuality/reagent') return [
    p('本任务仅讨论设备实际设有的试剂储存、转供或补充支路。液体隔膜泵在具体配方和负载允许时将试剂送到使用接口，配合空源识别、换瓶和预充恢复。没有该支路时，应直接按分析单元的实际计量架构配置。'),
    p('单次反应的定量加液与计时在分析单元内独立验证，不能从转供流量推定。换瓶后确认组成更新、无气泡和使用端供液，再允许分析单元继续取液。'),
    links([{label:'分析单元的反应试剂定量加入与计时',href:'/en/applications/analytical-instruments/water-quality-reagent/'}]),
  ];
  if (`${kind}/${topic}/${moduleKey}`==='environmental-monitoring/samplingPrep/waste') return [
    p('本页的管材与接头形成样品、清洗液和弃液的实际连接，明确去向、共享段和可维护位置。抽排动力由实际配置的驱动承担，连接元件本身不产生吸力。'),
    p('区分保留样品、清洗弃液和最终废液的容器，核对装配、密封与滞留体积。维护后测实际排液及下一样本空白，再恢复自动转移。'),
  ];
  if (`${kind}/${topic}/${moduleKey}`==='life-science/genomics/samplePrep') return [
    p('本任务采用一次性吸头空气置换架构，完成核酸样本和提取试剂的逐孔转移。先确认来源、孔位、吸头密封和实际液体类别，再把吸取与交付程序对应到样本身份。固定液路试剂分配另见本仪器的注射泵应用专题。'),
    p(reviewTopics[`${kind}/${topic}`].modules[moduleIndex(kind,topic,moduleKey)][1]),
  ];
  if (`${kind}/${topic}/${moduleKey}`==='ivd/immunoassay/immunoassay-sample') return [
    p('本任务讨论固定采样针架构中的样本加入。柱塞计量驱动配合针位、阀路和接收杯完成吸取与交付；先区分样本直接接液与系统液隔离驱动，再核对样本的真实接触路径。'),
    p('样本吸取、交付和针内外清洗分别设定程序，覆盖低余量、首剂和高低浓度切换。采用一次性吸头的设备应按空气置换移液专题确认吸头密封、换头和孔位规则。'),
  ];
  const editorial=getReviewTopicEditorial(kind,topic);
  const corrected=editorial?.sectionBlocks?.[`task-${moduleKey}`];
  if (corrected) return corrected;
  return [p(sourceGroups[kind][topic].modules[moduleKey].description.zh),p(reviewTopics[`${kind}/${topic}`].modules[moduleIndex(kind,topic,moduleKey)][1])];
}
function moduleConditions(kind: EnglishApplicationKind,topic: string,moduleKey: string) {
  const sourceTask=sourceGroups[kind][topic].modules[moduleKey].task;
  const conditions=getReviewModuleTask(kind,topic,moduleKey,sourceTask);
  if (['sample','pipette'].includes(sourceTask) && getReviewHierarchyEntries(kind).some(entry=>entry.level==='task' && entry.topic===topic && entry.family==='pipetting' && entry.modules.includes(moduleKey))) return {...conditions,label:'吸头式移液与接收',input:'一次性吸头规格与取头密封、真实液体类别、来源余量、浸入深度、工作量及接收位置',validation:'测目标容器实际接收量，覆盖低余量、取弃头和样本序列污染，并核对样本或孔位身份与后续方法结果',fault:'吸头漏气、空吸、挂液、浸入偏位或换头遗漏可能改变交付及污染状态',recovery:'先核对已经交付的液量和目标容器，再按实验程序处理吸头及受影响样本，复核后恢复下一次操作'};
  if (['environmental-monitoring/gasPretreatment/protection','synthetic-biology/feedingControl/protection'].includes(`${kind}/${topic}/${moduleKey}`)) return conditions;
  if (`${kind}/${topic}/${moduleKey}`==='environmental-monitoring/waterQuality/reagent') return {...conditions,label:'现场试剂供给',input:'实际转供支路、试剂配方、储量、使用端需求、背压、换瓶和预充去向',validation:'测使用端真实来液、空源互锁、换瓶后组成更新与首轮恢复；反应计量由分析单元另行验证',fault:'缺液、气泡、旧试剂残留或转供负载过高可能造成使用端断供',recovery:'确认新来源、预充去向及实际供液恢复后，再允许分析单元取液'};
  if (sourceTask==='filter') return {...conditions,label:'过滤与样品保留',input:'分析目标、滤材孔径、过滤位置、新增体积、实际压降与允许维护',validation:'比较过滤前后目标物、回收和空白，检查负载累积后的压降、实际流量及更换后首样',fault:'堵塞、吸附、泄漏或过滤组件新增体积可能改变样品和到达时间',recovery:'确认过滤路径与密封，复核实际流量、样品更新及方法结果后再恢复'};
  if (`${kind}/${topic}/${moduleKey}`==='analytical-instruments/waterQuality/protection') return {...conditions,label:'分析单元的过滤保护',input:'被测组分、方法允许的预处理、过滤位置、滤材孔径、压降和维护窗口',validation:'比较目标物回收、空白、实际流量和更换后的首样，再检查反应方法结果',fault:'吸附、堵塞或维护污染可能改变样品与空白',recovery:'确认密封、预充和新样更新，按方法检查后再恢复分析'};
  return conditions;
}
function configurationSection(entry: ReviewHierarchyEntry): ApplicationSection {
  const products=roleProducts(entry.roles);
  return section('candidate-selection','按本页职责比较产品配置',products.length ? [
    {type:'table',caption:'与本页产品职责对应的配置入口',headers:['产品','配置方向','需要核对的条件'],rows:products.map(id=>[reviewProductCards[id].title,...reviewProductGates[id]])},
    links(products.map(id=>({label:reviewProductCards[id].title,href:reviewProductCards[id].href}))),
  ] : [p(`本页的${familyLabel(entry.roles,entry.family)}需要结合真实介质、压力、连接及工作程序确认。当前仅提供应用职责与验证条件，具体产品配置需结合项目讨论。`),links([{label:'讨论本任务的配置与验证要求',href:'/en/contact/'}])]);
}
function relatedTaskEntries(kind: EnglishApplicationKind,entry: ReviewHierarchyEntry) {
  const entries=getReviewHierarchyEntries(kind).filter(item=>item.topic===entry.topic && item.level==='task');
  const own=entries.filter(item=>item.parentSlug===entry.slug);
  if (own.length) return own;
  const relevant: Partial<Record<ProductGuideFamilyId,string[]>> = {probes:['sample','wash','beadWash','dose','timedDose'],syringe:['sample','dose','dilution','timedDose'],pipetting:['dose','sample','beadWash'],fluidics:['sample','dose','wash','beadWash'],monitoring:['sample','dose','beadWash']};
  return entries.filter(item=>(relevant[entry.family]??[]).includes(sourceGroups[kind][entry.topic].modules[item.modules[0]].task)).slice(0,3);
}
function productSections(kind: EnglishApplicationKind,entry: ReviewHierarchyEntry): ApplicationSection[] {
  const familyCopy=scopedFamilyCopy(entry);
  const topic=sourceGroups[kind][entry.topic];
  const tasks=relatedTaskEntries(kind,entry);
  const relevantModules=entry.modules.length ? entry.modules : tasks.flatMap(task=>task.modules);
  const result=[
    section('product-position','这些产品在本仪器中负责什么',entry.roles.flatMap(role=>[
      {type:'subheading',title:`${productFamilies[role.key].label}：${role.duty}`} as ApplicationBlock,
      p(role.detail),p(productFamilies[role.key].explanation),
    ])),
    ...familyCopy.sections.map((copy,index)=>section(`configuration-${index+1}`,copy.title,[p(copy.text)])),
    section('working-conditions','将实际支路条件转为配置要求',[
      {type:'table',caption:`${topicLabel(kind,entry.topic)}中的${familyLabel(entry.roles,entry.family)}配置条件`,headers:['条件','需要确认'],rows:familyCopy.checks},
      ...(relevantModules.length ? [{type:'table',caption:'本仪器中参与的操作',headers:['操作','具体工作条件'],rows:relevantModules.map(moduleKey=>[moduleName(kind,entry.topic,moduleKey),moduleConditions(kind,entry.topic,moduleKey).input])} as ApplicationBlock] : []),
    ]),
    ...entry.modules.filter(moduleKey=>integratedModule(kind,entry.topic,moduleKey)).map(moduleKey=>section(`operation-${kebab(moduleKey)}`,moduleName(kind,entry.topic,moduleKey),[
      ...moduleBlocks(kind,entry.topic,moduleKey),p(moduleConditions(kind,entry.topic,moduleKey).validation),p(moduleConditions(kind,entry.topic,moduleKey).fault+'。'+moduleConditions(kind,entry.topic,moduleKey).recovery+'。'),
    ])),
    configurationSection(entry),
    ...(tasks.length ? [section('task-guides',tasks.every(task=>task.parentSlug===entry.slug)?'进入具体操作与验证任务':'相关操作与架构比较',tasks.flatMap(task=>[
      {type:'subheading',title:task.navLabel} as ApplicationBlock,p(reviewTopics[`${kind}/${entry.topic}`].modules[moduleIndex(kind,entry.topic,task.modules[0])][1]),links([entryLink(kind,task)]),
    ]))] : []),
    section('acceptance','在实际操作中确认产品作用',[
      ...(relevantModules.length ? [{type:'table',caption:'工作点验证与异常定位',headers:['操作','测量与观察','优先排查'],rows:relevantModules.map(moduleKey=>{const task=moduleConditions(kind,entry.topic,moduleKey);return [moduleName(kind,entry.topic,moduleKey),task.validation,task.fault];})} as ApplicationBlock] : []),
      p(topic.outcome.zh),
    ]),
    section('configuration-question',familyCopy.question,[p(familyCopy.answer),p(topic.boundary.zh)]),
  ];
  return result;
}
function taskSections(kind: EnglishApplicationKind,entry: ReviewHierarchyEntry): ApplicationSection[] {
  const moduleKey=entry.modules[0];
  const source=sourceGroups[kind][entry.topic];
  const task=moduleConditions(kind,entry.topic,moduleKey);
  const profile=(taskProfiles as Record<string,typeof taskProfiles.sample>)[source.modules[moduleKey].task];
  const contribution:Record<ProductGuideFamilyId,string>={
    piston:'柱塞驱动产生受控位移，配合阀位和接收端完成本次液量交付。工作行程和实际接收量分别核对。',
    syringe:'注射驱动与阀位共同组织吸取、保持和推出；本次工作量、剩余储量及补液时点按操作程序记录。',
    pipetting:'空气置换泵驱动吸头内的液体，平台负责吸头、孔位与移动；液体去向和耗材状态与每次操作对应。',
    valveless:'无阀计量驱动按实际启停或连续程序输出液体，喷嘴、背压及来源状态共同影响任务中的实际到达。',
    diaphragm:'隔膜泵承担本任务中适用的液体供给或含气抽吸。泵的入口相态、所在支路和出口去向先分别确认，再核对各支路的工作点。',
    valves:'阀控制当前来源或去向，计量或输送由配合驱动完成。端口连接、实际到位及共享段更新需要与本次操作对应。',
    probes:'针或容器接口把计量、供液与吸液动作落实到实际位置。针端几何、运动和清洗条件与本次容器一起确认。',
    monitoring:'检测模块提供特定测点的状态信号，控制程序将其与当前动作和受影响容器关联。',
    fluidics:'管材、接头及本页涉及的保护件形成实际路径；材料、通径、连接体积和维护状态与本次操作一起验证。',
  };
  const procedures=reviewTaskProcedures[`${kind}/${entry.topic}/${moduleKey}`] ?? profile.steps.map(step=>step.zh);
  return [
    section('task-position',`${entry.navLabel}在仪器中的位置`,moduleBlocks(kind,entry.topic,moduleKey)),
    section('component-roles','完成这项操作时的产品分工',[
      p(contribution[entry.family]),
      ...(entry.family==='diaphragm' ? entry.roles.map(role=>p(productFamilies[role.key].explanation)) : []),
      p(`本任务在${topicLabel(kind,entry.topic)}中需要确认：${task.input}。`),
    ]),
    section('operating-sequence','按实际架构组织操作顺序',[
      {type:'list',ordered:true,items:procedures},
    ]),
    section('working-conditions','确定本任务的工作条件',[
      {type:'table',caption:'本次操作的条件、结果与异常记录',headers:['需要确定','具体内容'],rows:[['实际工作条件',task.input],['验收目标',task.validation],['异常定位',task.fault]]},
    ]),
    configurationSection(entry),
    section('acceptance','在接收位置验证操作结果',[
      p(task.validation+'。'),p(source.outcome.zh),
    ]),
    section('fault-recovery','异常定位与下一次操作恢复',[
      p(task.fault+'。'),p(task.recovery+'。'),p(source.boundary.zh),
    ]),
  ];
}
export function createReviewHierarchyDocument(kind: EnglishApplicationKind,entry: ReviewHierarchyEntry,legacy?: ApplicationDocument): ApplicationDocument {
  const reviewContext=context(kind,entry);
  if (legacy) reviewContext.products=getReviewFooterPlan(kind,legacy).products;
  if (legacy) return {...legacy,navLabel:entry.navLabel,group:entry.parentSlug,reviewContext:{...reviewContext,hero:{highlight:legacy.title.split('：')[0],description:legacy.description}},related:[
    {label:`返回${topicLabel(kind,entry.topic)}液路总览`,href:applicationArticleHref(kind,entry.topic)},
    ...getReviewHierarchyEntries(kind).filter(item=>item.slug===entry.parentSlug || (item.level==='task' && item.parentSlug===entry.parentSlug && item.slug!==entry.slug)).map(item=>entryLink(kind,item)),
  ]};
  const editorial=getReviewTopicEditorial(kind,entry.topic);
  const products=roleProducts(entry.roles);
  const task=entry.level==='task' ? moduleConditions(kind,entry.topic,entry.modules[0]) : undefined;
  return {
    slug:entry.slug,kind:entry.level==='task'?'task':'overview',group:entry.parentSlug ?? entry.slug,title:entry.title,navLabel:entry.navLabel,
    seoTitle:`${entry.title} | FOREACH`,description:task ? `${entry.navLabel}：${task.input}。` : `${entry.roles.map(role=>role.duty).join('；')}。结合${topicLabel(kind,entry.topic)}的工作路径确认配置。`,
    eyebrow:`${topicLabel(kind,entry.topic)} · ${entry.level==='product'?'产品应用':'操作任务'} · 中文审阅稿`,keywords:[],reviewContext,
    intro:[p(entry.level==='product' ? `本页围绕${topicLabel(kind,entry.topic)}中的${entry.roles.map(role=>role.duty).join('、')}，说明${familyLabel(entry.roles,entry.family)}的工作位置、配合关系和配置条件，并连接相应的操作与验证任务。` : `${entry.navLabel}属于${topicLabel(kind,entry.topic)}的具体液体操作。本页说明该步骤的产品分工、动作顺序、实际工作条件与恢复要求；先明确使用的架构，再比较相应配置。`),
      ...(editorial?.scope ? [{type:'callout',title:'适用架构',text:editorial.scope,references:editorial.references?.map(reference=>reference.id)} as ApplicationBlock] : []),
    ],
    sections:entry.level==='product'?productSections(kind,entry):taskSections(kind,entry),
    references:[...products.map(id=>({id:`product-${id}`,title:`FOREACH ${reviewProductCards[id].title}：产品配置与参数`,href:reviewProductCards[id].href})),...(editorial?.references??[])],
    related:[{label:`返回${topicLabel(kind,entry.topic)}液路总览`,href:applicationArticleHref(kind,entry.topic)},
      ...(entry.parentSlug ? [entryLink(kind,getReviewHierarchyEntry(kind,entry.parentSlug)!)] : []),
      ...getReviewHierarchyEntries(kind).filter(item=>item.level==='task' && item.parentSlug===(entry.parentSlug??entry.slug) && item.slug!==entry.slug).map(item=>entryLink(kind,item)),
    ],
  };
}

export function arrangeReviewInstrumentOverview(kind: EnglishApplicationKind,topic: string,document: ApplicationDocument): ApplicationDocument {
  if (!hasReviewHierarchy(kind) || !getTopicProductRoles(kind,topic).length) return document;
  const parents=getReviewHierarchyEntries(kind).filter(entry=>entry.topic===topic && entry.level==='product');
  const directory=section('product-roles','常用产品的作用与应用专题',[
    {type:'table',caption:'由本仪器的具体职责进入产品应用',headers:['产品类别','在本仪器中承担的作用'],rows:parents.map(entry=>[familyLabel(entry.roles,entry.family),entry.roles.map(role=>role.duty).join('；')])},
    links(parents.map(entry=>entryLink(kind,entry))),
  ]);
  return {...document,sections:document.sections.flatMap(current=>{
    if (current.id==='fluid-path') return [current,directory];
    if (current.id.startsWith('task-')) {
      const moduleKey=current.id.slice(5); const target=moduleTarget(kind,topic,moduleKey);
      if (target) return [{...current,blocks:[p(reviewTopics[`${kind}/${topic}`].modules[moduleIndex(kind,topic,moduleKey)][1]),links([entryLink(kind,target)])]}];
      if (`${kind}/${topic}/${moduleKey}`==='life-science/bioProcess/waste') return [{...current,blocks:[...current.blocks,links([
        {label:'生命科学自动化中的清洗供液与含气抽排',href:applicationDocumentHref(kind,'automation-diaphragm-pumps')},
        ...parents.filter(entry=>entry.family==='fluidics').map(entry=>entryLink(kind,entry)),
      ])]}];
      if (`${kind}/${topic}/${moduleKey}`==='environmental-monitoring/wastewater/reagent') return [{...current,blocks:[...current.blocks,links([
        {label:'分析单元的反应试剂定量加入与计时',href:'/en/applications/analytical-instruments/water-quality-reagent/'},
      ])]}];
      if (overviewModules.has(`${kind}/${topic}/${moduleKey}`)) return [{...current,blocks:[...current.blocks,links(parents.filter(entry=>['piston','syringe','valveless','diaphragm','fluidics'].includes(entry.family)).map(entry=>entryLink(kind,entry)))]}];
    }
    if (current.id==='candidate-selection') return [{...current,title:'按产品应用专题进入具体配置',blocks:[links(parents.map(entry=>entryLink(kind,entry)))]}];
    return [current];
  })};
}
export function getReviewHierarchyNavigation(kind: EnglishApplicationKind,document: ApplicationDocumentMetadata) {
  const topic=getReviewHierarchyTopic(kind,document);
  if (!topic || !getTopicProductRoles(kind,topic).length) return undefined;
  const entries=getReviewHierarchyEntries(kind);
  return {
    overview:{label:`${topicLabel(kind,topic)}液路总览`,href:applicationArticleHref(kind,topic)},
    groups:entries.filter(entry=>entry.topic===topic && entry.level==='product').map(parent=>({
      id:parent.slug,label:parent.navLabel,overview:entryLink(kind,parent),
      children:entries.filter(entry=>entry.level==='task' && entry.parentSlug===parent.slug).map(entry=>entryLink(kind,entry)),
    })),
    title:`${topicLabel(kind,topic)}应用指南`,
  };
}
export function getReviewHierarchyTrail(kind: EnglishApplicationKind,document: ApplicationDocumentMetadata) {
  const entry=getReviewHierarchyEntry(kind,document.slug);
  if (!entry) return undefined;
  return [
    {label:topicLabel(kind,entry.topic),href:applicationArticleHref(kind,entry.topic)},
    ...(entry.parentSlug ? [{label:getReviewHierarchyEntry(kind,entry.parentSlug)!.navLabel,href:applicationDocumentHref(kind,entry.parentSlug)}] : []),
    {label:entry.navLabel},
  ];
}
