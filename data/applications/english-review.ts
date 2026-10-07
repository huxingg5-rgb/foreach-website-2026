import workflows from './application-workflows.json';
import { resolveApplicationHref } from './application-routes';
import catalog from './application-product-catalog.json';
import { reviewTopics } from './english-review-topics';
import { reviewGuides, reviewGuideHeadings } from './english-review-guides';
import { reviewGuideStructures } from './english-review-structure';
import { getReviewTaskCopy, getReviewModuleTask, reviewFlowNotes } from './english-review-logic';
import { getReviewFooterPlan, reviewProductCards, reviewProductGates } from './english-review-resources';
import { applicationArticleHref, applicationArticleSlug } from './application-article-links';
import { analyticalDocuments, analyticalDocumentHref, isIvdClinicalDocumentSlug } from './analytical-documents/registry';
import type { ApplicationBlock, ApplicationDocument, ApplicationDocumentMetadata, ApplicationLink, ApplicationSection } from './analytical-documents/types';
import type { ApplicationGroupContent } from './application-content';
import type { EnglishApplicationKind } from './application-english';
import { getReviewTopicEditorial, reviewEditorialDomains, reviseReviewHub, reviseReviewTopic } from './english-review-editorial';
import { addGuideProductRoles, addHubProductRoles, addTopicProductRoles, getProductRoleNavigation } from './english-review-product-roles';
import { arrangeReviewInstrumentOverview, getReviewHierarchyNavigation, getReviewHierarchyTrail, hasReviewHierarchy } from './english-review-hierarchy';

export const REVIEW_KINDS = ['ivd', 'life-science', 'lab-automation', 'analytical-instruments', 'environmental-monitoring', 'synthetic-biology'] as const;
export const reviewDomains: Record<EnglishApplicationKind, { title: string; intro: string; distinction: string; image: string }> = {
  ivd: { title: '体外诊断', intro: '体外诊断液路把样本、试剂、清洗和废液连接到检测方法。生化、免疫、血液、凝血与分子诊断具有不同的反应顺序和污染来源，应先选仪器类型，再理解计量、切换与恢复任务。', distinction: '本领域从检测方法的样本、试剂与结果要求出发。通用孔板或机器人调度连接实验室自动化；核酸回收等实验任务连接生命科学。元件能力支持液路操作，具体检测性能需要整机方法验证。', image: '/images/applications/ivd/ivd-hero-bg-1920x800-v001.webp' },
  'life-science': { title: '生命科学', intro: '生命科学液体操作围绕核酸、细胞与蛋白的处理结果组织。实际交付量之外，目标物回收、细胞状态、表面吸附和实验污染都需要评价。先明确保留与弃液，再比较驱动和连接。', distinction: '本领域解释实验样本和产物要求，平台节拍与资源调度连接实验室自动化，长周期补料及生物过程集成连接合成生物。不同领域可以使用相同元件，但验收结果不应混用。', image: '/images/applications/life-science/life-science-hero-bg-1920x800-v001.webp' },
  'lab-automation': { title: '实验室自动化', intro: '实验室自动化用工位、容器、液体类别与任务调度连接泵阀。移液、孔板、分装和样本准备分别有工作剂量与节拍，共享资源的占用和异常恢复需要与样本身份一并记录。', distinction: '本领域负责平台架构与操作执行，具体分析、核酸或细胞结果回到对应方法领域。一次性吸头与固定针的工作程序不同，多来源选择也不等于独立并行供液。', image: '/images/applications/lab-automation/lab-automation-hero-bg-1920x800-v001.webp' },
  'analytical-instruments': { title: '分析仪器', intro: '分析仪器的液路把样本准备、引入、反应与检测连接起来。色谱、元素分析、水质和前处理具有不同压力与信号条件，选型前应先定位任务，区分离散计量、辅助连续供液、清洗与排废。', distinction: '本领域关注分析单元与方法结果。现场取样、输送更新和无人值守维护连接环保监测，生化和分子诊断任务归入体外诊断。辅助液路配置不能直接作为高压分析主泵替代方案。', image: '/images/applications/analytical-instruments/analytical-instruments-hero-bg-1920x800-v001.webp' },
  'environmental-monitoring': { title: '环保监测', intro: '环保监测先保证有代表性的现场样品到达分析单元，再组织清洗、排废与长期维护。水样、复杂废水和气体预处理需要不同的介质与保护条件，样品更新时间与数据有效状态应明确记录。', distinction: '本领域负责现场采样链路和运行维护，分析单元内的试剂反应与计量连接分析仪器。过滤、吸附和滞留可能改变样品，机械保护不能自动替代方法允许性。', image: '/images/applications/environmental-monitoring/environmental-monitoring-hero-bg-1920x800-v001.webp' },
  'synthetic-biology': { title: '合成生物', intro: '合成生物液路围绕微型反应器、构建筛选、补料和在线采样组织。单次液量之外，还要管理累计物料、体积扰动、样本身份与污染边界，长周期中断和恢复需要可追溯。', distinction: '本领域解释生物任务和长周期过程要求，通用机器人或孔板供排液连接实验室自动化。防回流、软管夹断与无菌隔离分别验证，过程反馈需要相应传感与控制程序。', image: '/images/applications/synthetic-biology/synthetic-biology-hero-bg-1920x800-v001.webp' },
};
const allWorkflows: Record<string, Record<string, ApplicationGroupContent>> = workflows;
const products: Record<string, typeof catalog.syringePump> = catalog;
const aliases: Record<string, string> = { fittings: 'fittingsTubing', filters: 'checkFilter', checkValve: 'checkFilter' };
export const paragraph = (text: string): ApplicationBlock => ({ type: 'paragraph', text });
const section = (id: string, title: string, blocks: ApplicationBlock[]): ApplicationSection => ({ id, title, blocks });
export const reviewBase = (kind: string) => `/en/applications/${kind}/`;
export const reviewTopicSlug = applicationArticleSlug;
export const reviewTopicHref = applicationArticleHref;
function reviewRelatedHref(href: string) {
  if (!href.startsWith('/')) return href;
  const localized = href.startsWith('/en/') ? href : '/en'+href;
  const target = new URL(localized,'http://127.0.0.1:3000');
  const kind = REVIEW_KINDS.find(item=>target.pathname.replace(/\/$/,'')===reviewBase(item).replace(/\/$/,''));
  const group = target.searchParams.get('application') ?? target.searchParams.get('instrument');
  if (kind && group && allWorkflows[kind]?.[group]) return reviewTopicHref(kind,group);
  return resolveApplicationHref(localized);
}
export function reviewGroupFromSlug(kind: string, slug: string) {
  return Object.keys(allWorkflows[kind] ?? {}).find(group => reviewTopicSlug(kind, group) === slug);
}
export function reviewProductLink(key: string): ApplicationLink {
  const explicit: Record<string, ApplicationLink> = {
    fittings: {label:'接头',href:'/en/products/fittings/'},
    tubing: {label:'管材',href:'/en/products/tubing/'},
    filters: {label:'过滤器',href:'/en/products/fittings/filters/'},
    checkValve: {label:'单向阀',href:'/en/products/fittings/filters/'},
    checkFilter: {label:'过滤器与单向阀',href:'/en/products/fittings/filters/'},
    fittingsTubing: {label:'接头与管材',href:'/en/products/fittings/'},
    sensors: {label:'气泡 / 压力检测',href:'/en/products/control/'},
    pinchValve: {label:'软管夹闭方案（按项目讨论）',href:'/en/contact/'},
  };
  if (explicit[key]) return explicit[key];
  const productKey = aliases[key] ?? key;
  const product = products[productKey];
  if (!product) throw new Error(`Unknown review product ${key}`);
  return { label: product.name.zh, href: '/en' + product.path };
}
function candidateBlocks(kind: EnglishApplicationKind, document: ApplicationDocumentMetadata): ApplicationBlock[] {
  const plan = getReviewFooterPlan(kind,{...document,intro:[],sections:[],references:[]});
  return [paragraph('以下为与本页职责对应的候选方向。先用正文的工作条件比较，再进入产品页核对容量、材料和接口。卡片图为代表配置，适用性仍由真实工作点与应用结果确认。'),
    {type:'table',caption:'从任务条件进入产品配置',headers:['产品方向','对应职责','选择前需要确认'],rows:plan.products.map(key=>[reviewProductCards[key].title,...reviewProductGates[key]])},
    {type:'links',items:plan.products.map(key=>({label:reviewProductCards[key].title,href:reviewProductCards[key].href}))}];
}
function getLcLinks() {
  return analyticalDocuments.filter(item => item.slug.startsWith('lc-')).map(item => ({ label: reviewGuides[item.slug]?.title ?? item.navLabel, href: analyticalDocumentHref(item.slug) }));
}
function topicLinks(kind: string): ApplicationLink[] {
  return Object.keys(allWorkflows[kind]).map(group => ({ label: reviewTopics[`${kind}/${group}`].title, href: reviewTopicHref(kind, group), description: allWorkflows[kind][group].summary.zh }));
}
function documentMeta(slug: string, title: string, kind: ApplicationDocumentMetadata['kind'], description: string): ApplicationDocumentMetadata {
  return { slug, title, navLabel: title, kind, seoTitle: `${title} | FOREACH`, description, eyebrow: '应用指南 · 中文审阅稿', keywords: [] };
}
export function getReviewHub(kind: EnglishApplicationKind): ApplicationDocument {
  const domain = reviewDomains[kind];
  const meta = documentMeta('', `${domain.title}液路：按任务理解元件与验证`, 'hub', domain.intro);
  return addHubProductRoles(kind, reviseReviewHub(kind, {
    ...meta,
    intro: [paragraph(domain.intro), paragraph(domain.distinction)],
    sections: [
      section('topic-guides', '从设备或工作站类型进入专题', topicLinks(kind).flatMap(item => {
        const group = reviewGroupFromSlug(kind,item.href.split('/').filter(Boolean).at(-1)!);
        const topic = group && reviewTopics[`${kind}/${group}`];
        return [{type:'subheading',title:item.label} as ApplicationBlock, paragraph(topic ? topic.opening : item.description ?? ''), {type:'links',items:[{label:'阅读这个设备或工作站的液路专题',href:item.href}]} as ApplicationBlock];
      })),
      section('selection-order', '把仪器目标转为液路工作条件', [paragraph('先在液路图上标明来源、接收位置和废液去向，再说明这项操作要交付一次液量、连续流量，还是完成清洗与恢复。按任务给出实际液体、剂量或流量、入口与出口状态、可用时间和允许中断。泵容量、阀端口数与自由流量分别用于初筛，不能互相替代。'), { type: 'flow', caption: '从任务进入元件配置的讨论顺序', nodes: ['仪器或方法目标', '液体路径与状态', '工作量和节拍', '候选配置', '接收与方法验证'] }]),
      ...(!('analytical-instruments' === kind) ? [section('candidate-selection','从本领域任务进入候选元件',candidateBlocks(kind,meta))] : []),
      section('evidence', '分别验证元件工作点与应用结果', [paragraph('首先在真实管路、材料、压力和介质下验证交付、流量、切换或排空，再评价该领域真正需要的结果：检测空白与响应、产物回收、细胞状态、逐孔差异、样品代表性或累计物料。测试覆盖常用、边界、换液、待机和维护恢复，示例计算只帮助说明逻辑。')]),
      section('boundaries', '按任务连接其他应用领域', [paragraph(domain.distinction), { type: 'links', items: REVIEW_KINDS.filter(item => item !== kind).map(item => ({ label: reviewDomains[item].title, href: reviewBase(item), description: reviewDomains[item].intro })) }]),
      section('project-inputs', '开始配置讨论需要哪些信息', [paragraph('提供液路示意图、具体设备或方法、真实配方、工作剂量或流量、各状态压力与温度、容器和安装空间、运行节拍以及可检验的验收目标。已有原机时补充接口、控制与状态图，替换或新设计都需完整路径验证。'), { type: 'links', items: [{ label: '联系工程师讨论液路', href: '/en/contact/' }] }]),
    ], references: [],
  }));
}
export function getReviewTopic(kind: EnglishApplicationKind, group: string): ApplicationDocument {
  const copy = reviewTopics[`${kind}/${group}`];
  const source = allWorkflows[kind]?.[group];
  if (!copy || !source) throw new Error(`Missing review topic ${kind}/${group}`);
  const entries = Object.entries(source.modules);
  if (copy.modules.length !== entries.length) throw new Error(`Review module count mismatch ${kind}/${group}: ${copy.modules.length}/${entries.length}`);
  const productLinks = [...new Set(copy.candidates.map(row => row[0]))].map(reviewProductLink);
  const moduleTasks = entries.map(([key,value])=>getReviewModuleTask(kind,group,key,value.task));
  const flowBlocks: ApplicationBlock[] = kind === 'environmental-monitoring' && group === 'gasPretreatment'
    ? [{type:'flow',caption:'样气主路径',nodes:['样气入口','方法允许的预处理','样气分析接口']}, {type:'flow',caption:'独立冷凝液支路',nodes:['冷凝液收集位置','受控排液与隔离','废液去向'],note:'排液支路与样气主路有介质与压力联系，但冷凝液不串联进入样气分析接口。'}]
    : [{type:'flow',caption:'任务顺序示意；取样、清洗、排废及监测支路按设备图纸分别确认',nodes:copy.flow,note:'箭头用于说明任务关系，不代表所有元件在同一根管中串联。阀位、泵接液范围与运行状态仍需逐支路核对。'}];
  const arrange=hasReviewHierarchy(kind) ? arrangeReviewInstrumentOverview : addTopicProductRoles;
  return arrange(kind, group, reviseReviewTopic(kind, group, {
    ...documentMeta(reviewTopicSlug(kind, group), copy.title, 'overview', source.summary.zh),
    intro: [paragraph(copy.opening)],
    sections: [
      section('fluid-path', '先定位任务在液路中的位置', [...flowBlocks, paragraph(copy.decision)]),
      section('working-conditions', '不同环节需要不同的工作条件', [{type:'table',caption:'先区分液路职责，再进入具体操作',headers:['环节','任务类别','需要明确的工作条件'],rows:moduleTasks.map((task,index)=>[copy.modules[index][0],task.label,task.input])}]),
      ...entries.map(([key, value], index) => section(`task-${key}`, copy.modules[index][0], [paragraph(value.description.zh), paragraph(copy.modules[index][1])])),
      section('candidate-selection', '按职责比较候选元件', [paragraph('以下元件用于配置讨论。选择依据是上文任务的实际介质、工作量、负载与时序，再核对具体型号；同一系列不自动覆盖所有支路。'), { type: 'table', caption: '任务、候选与选择门槛', headers: ['液路职责', '候选元件', '优先核查'], rows: copy.candidates.map(([key, duty, gate]) => [duty, reviewProductLink(key).label, gate]) }, { type: 'links', items: productLinks }]),
      section('validation', '用应用结果检验整个循环', [paragraph(source.outcome.zh), {type:'table',caption:'按环节安排工作点验证和异常定位',headers:['要验证的环节','实际测量或观察','优先排查的异常'],rows:moduleTasks.map((task,index)=>[copy.modules[index][0],task.validation,task.fault])}, paragraph(source.boundary.zh), paragraph('保留常用工作点、边界条件、换液与待机后的记录。分别检查实际液体接收、污染或目标物变化，以及异常后的恢复；先定位发生变化的阶段，再调整容量、速度、置换量或清洗程序。')]),
      section('questions', '选型前先解决这些问题', [{ type: 'subheading', title: '只给仪器名称，可以直接推荐型号吗？' }, paragraph(copy.decision), { type: 'subheading', title: '运行中断后能否重做同一动作？' }, paragraph('先确认来源、目标容器、已交付量和当前液体状态。尚未交付、部分交付与全部交付需要不同处理；重试、续做或弃样规则由具体方法与控制程序定义。')]),
    ], references: productLinks.map((item, index) => ({ id: `product-${index}`, title: `FOREACH ${item.label}：具体配置与参数`, href: item.href })),
    related: group === 'chromatography' && kind === 'analytical-instruments' ? getLcLinks() : source.related.map(item => ({ label: item.label.zh.replace('（英文）', ''), href: reviewRelatedHref(item.href) })),
  }));
}
export function getReviewLcOverview(): ApplicationDocument {
  const document = getReviewTopic('analytical-instruments', 'chromatography');
  const copy = reviewTopics['analytical-instruments/chromatography'];
  return { ...document, sections: [
    section('system-position', '先定位元件在液相色谱液路中的位置', [
      { type: 'flow', caption: '主分析流路；针洗、洗站排废与柱后加液属于独立支路', nodes: copy.flow },
      paragraph(copy.decision),
    ]),
    section('duties', '不同位置对应不同名称与职责', [{ type: 'table', caption: '按位置理解元件，而不是将所有泵视为可互换', headers: ['位置', '常见名称', '职责与工作边界'], rows: [
      ['流动相输送', '溶剂输送泵、二元或四元泵', '承受色谱柱背压并服务梯度，属于核心高压分析流路。'],
      ['自动进样器', '计量装置、样本注射器或计量泵', '为吸样与转移建立位移，是否承受系统压力按进样架构确认。'],
      ['针洗支路', '针洗泵或冲洗供液泵', '向清洗位置送洗液，清洗配方、覆盖和时间共同决定恢复。'],
      ['洗站排废', '排液泵或废液抽吸泵', '去除清洗来液，间歇吸入空气时另行确认气液适用性。'],
      ['柱后试剂支路', '衍生化试剂泵或柱后计量泵', '方法需要时在检测前加入试剂，验证流量、混合及方法信号。'],
    ] }, paragraph('来源选择阀与高压进样阀同样需要分开。MRV3按官网10、16、24通比较来源、通径、接口和内容积；高压切换根据实际端口图和各状态压力另选适用配置。')]),
    section('candidate-selection', '从具体任务选择产品方向', [document.sections.find(item => item.id === 'candidate-selection')!.blocks[0], document.sections.find(item => item.id === 'candidate-selection')!.blocks[1], document.sections.find(item => item.id === 'candidate-selection')!.blocks[2]]),
    section('task-guides', '进入泵组与任务详解', [{ type: 'links', items: getLcLinks() }]),
    section('selection-start', '从仪器必须实现的结果开始', [{ type: 'table', caption: '配置讨论中的结果与优先检查', headers: ['要求', '优先检查', '相应任务'], rows: [
      ['每次进样量一致', '工作量、受压状态、针端和气泡', '样本吸取与计量'],
      ['减少样本消耗', '环与针体积、装环模式、低余量', '定量环装载'],
      ['浓样后空白更快恢复', '残留位置、洗液、接触与排废', '针洗供液'],
      ['洗站不积液', '峰值来液、允许残液、提升与容器状态', '废液抽吸'],
      ['柱后响应稳定', '真实背压、流量比例、反应路径和基线', '连续试剂计量'],
    ] }]),
    section('selection-questions', '选型前解决压力、替换与验证问题', [
      { type: 'subheading', title: '自动进样器计量端是否一定低压？' }, paragraph('并非如此。检查吸取、阀切换、注入和清洗各状态，有的结构隔离计量装置，有的结构使它接触流动相压力。先确定架构再选择配置。'),
      { type: 'subheading', title: '能否直接替换原机元件？' }, paragraph('需要原型号、接口、控制方式、液路图、介质、各状态压力与验收目标。安装空间和接口是初步条件，阀时序、固件行为及完整方法结果仍需验证。'),
      { type: 'subheading', title: '先提供哪些资料？' }, paragraph('提供实际进样模式、剂量或流量、入口与出口条件、动作时间以及安装空间。排废补充气液状态，柱后计量补充反应和基线要求。'),
    ]),
  ] };
}
export function getReviewLcNav() {
  return ['lc-autosampler-piston-pumps', 'lc-needle-wash-diaphragm-pumps', 'lc-post-column-valveless-pumps'].map(slug => ({
    id: slug, label: reviewGuides[slug].title,
    overview: { label: reviewGuides[slug].title, href: analyticalDocumentHref(slug) },
    children: analyticalDocuments.filter(item => item.kind === 'task' && item.group === slug).map(item => ({ label: reviewGuides[item.slug].title, href: analyticalDocumentHref(item.slug) })),
  }));
}
export function applyReviewGuide(original: ApplicationDocument): ApplicationDocument {
  const copy = reviewGuides[original.slug];
  if (!copy) throw new Error(`Missing Chinese review copy for ${original.slug}`);
  const headings = reviewGuideHeadings[original.slug];
  const structure = reviewGuideStructures[original.slug];
  if (!structure) throw new Error(`Missing task-specific article structure: ${original.slug}`);
  const task = getReviewTaskCopy(structure.task);
  const kind = isIvdClinicalDocumentSlug(original.slug) ? 'ivd' : 'analytical-instruments';
  const taskLinks = analyticalDocuments.filter(item => item.kind !== 'hub' && item.slug !== original.slug
    && (kind === 'ivd' ? isIvdClinicalDocumentSlug(item.slug) : item.group === original.group && (!reviewEditorialDomains[kind] || !isIvdClinicalDocumentSlug(item.slug)))
    && reviewGuides[item.slug]).map(item => ({ label: reviewGuides[item.slug].title, href: analyticalDocumentHref(item.slug) }));
  const attachRoles=hasReviewHierarchy(kind) ? (_kind: EnglishApplicationKind,document: ApplicationDocument)=>document : addGuideProductRoles;
  return attachRoles(kind, {
    ...original, title: copy.title, navLabel: reviewEditorialDomains[kind] ? copy.title.split('：')[0] : copy.title, seoTitle: `${copy.title} | FOREACH`, description: copy.position, eyebrow: '应用指南 · 中文审阅稿',
    intro: [paragraph(copy.position)],
    sections: [
      section('system-position','定位本任务的来源、驱动和接收位置',[{type:'flow',caption:'功能或操作顺序示意；各状态连接与支路按设备确认',nodes:structure.flow,note:reviewFlowNotes[original.slug]},paragraph('这项任务需要明确的输入为：'+task.input+'。沿图中位置逐段确认液体接触、压力和去向，再判断驱动与连接的职责。')]),
      section('sizing', headings[0], [paragraph(copy.sizing), {type:'table',caption:'按实际任务比较配置条件',headers:['要比较的条件','需要提供的信息','会改变哪项选择'],rows:structure.checks}]),
      section('candidate-selection','从任务要求比较产品方向',candidateBlocks(kind,{...original,title:copy.title})),
      section('operating-cycle', headings[1], [paragraph(copy.operation), paragraph('动作记录应把命令、阀位或接口状态与实际接收结果对应起来。原料、容器或样本身份改变时，重新确认共享路径和下一步允许执行的条件；单独完成驱动动作不能替代本任务的验收。')]),
      section('acceptance', headings[2], [paragraph(copy.validation),{type:'table',caption:'将工作点测试连接到可解释的结果',headers:['验证场景','测量或观察','如何解释及处理'],rows:structure.tests}, paragraph('记录测试介质、配置、安装路径和工作程序，常用工作点与边界结果分别呈现。计算关系用于设计讨论，元件资料用于核对型号，装机测量用于确认实际任务。')]),
      section('questions', '发生异常或维护后，先确认哪一段需要恢复', [paragraph(task.fault+'。'+task.recovery+'。'), paragraph('保留当前来源、容器身份、已执行动作、阀位或接口状态以及实际接收信息。按上表定位变化阶段，再决定重试、继续或重新开始；恢复后先复核对应工作点，避免将状态不明的动作直接接回自动循环。'), { type: 'links', items: [{ label: '带上液路图和工作点记录，讨论配置', href: '/en/contact/' }] }]),
      ...(taskLinks.length ? [section('task-guides', '继续阅读同一支路的任务', [{ type: 'links', items: taskLinks }])] : []),
    ],
    related: kind === 'ivd' ? [
      { label: '返回生化分析仪液路专题', href: reviewTopicHref('ivd','clinical') },
      ...taskLinks,
    ] : (original.related ?? []).map(item => {
      const linked = analyticalDocuments.find(doc => analyticalDocumentHref(doc.slug) === item.href);
      return { ...item, label: linked ? reviewGuides[linked.slug]?.title ?? '液相色谱液路总览' : item.label, description: undefined };
    }),
  });
}
export function getReviewNav(kind: EnglishApplicationKind, document?: ApplicationDocumentMetadata) {
  if (document) {
    const hierarchy=getReviewHierarchyNavigation(kind,document);
    if (hierarchy) return hierarchy.groups;
  }
  const topicGroups = Object.keys(allWorkflows[kind]).map(group => ({
    id: group, label: getReviewTopicEditorial(kind,group)?.label ?? reviewTopics[`${kind}/${group}`].title,
    overview: { label: getReviewTopicEditorial(kind,group)?.label ?? reviewTopics[`${kind}/${group}`].title, href: reviewTopicHref(kind, group), description:getReviewTopicEditorial(kind,group)?.summary ?? allWorkflows[kind][group].summary.zh },
    children: hasReviewHierarchy(kind) ? [] : [
      ...getProductRoleNavigation(kind,group),
      ...(kind === 'analytical-instruments' && group === 'chromatography' ? getLcLinks() : group === 'clinical' && kind === 'ivd' ? ['piston-sample-transfer', 'piston-reagent-dispensing'].map(slug => ({ label: reviewGuides[slug].title.split('：')[0], href: analyticalDocumentHref(slug) })) : []),
    ],
  }));
  if (kind === 'analytical-instruments' && (!hasReviewHierarchy(kind) || (document && document.kind!=='hub'))) {
    const componentGroups = analyticalDocuments.filter(item => item.kind === 'overview' && reviewGuides[item.slug] && !item.slug.startsWith('lc-')).map(item => ({
      id: item.slug, label: reviewEditorialDomains[kind] ? reviewGuides[item.slug].title.split('：')[0] : reviewGuides[item.slug].title,
      overview: { label: reviewEditorialDomains[kind] ? reviewGuides[item.slug].title.split('：')[0] : reviewGuides[item.slug].title, href: analyticalDocumentHref(item.slug), description:reviewGuides[item.slug].position },
      children: [
        ...analyticalDocuments.filter(child => child.kind === 'task' && child.group === item.slug && !isIvdClinicalDocumentSlug(child.slug)).map(child => ({ label: reviewEditorialDomains[kind] ? reviewGuides[child.slug].title.split('：')[0] : reviewGuides[child.slug].title, href: analyticalDocumentHref(child.slug) })),
      ],
    }));
    topicGroups.push(...componentGroups);
  }
  return topicGroups;
}
export function getReviewBreadcrumb(kind: EnglishApplicationKind, document: ApplicationDocument, currentHref: string) {
  const hierarchy=getReviewHierarchyTrail(kind,document);
  if (hierarchy) return [
    {label:'首页',href:'/en/'},{label:'应用领域',href:'/en/applications/'},
    {label:reviewDomains[kind].title,href:reviewBase(kind)},...hierarchy,
  ];
  const isHub = document.kind === 'hub';
  const parent = reviewEditorialDomains[kind] && document.kind === 'task'
    ? getReviewNav(kind,document).find(group => group.children.some(item => item.href === currentHref))
    : undefined;
  return [
    { label: '首页', href: '/en/' },
    { label: '应用领域', href: '/en/applications/' },
    { label: reviewDomains[kind].title, href: isHub ? undefined : reviewBase(kind) },
    ...(parent ? [{ label: parent.label, href: parent.overview.href }] : []),
    ...(!isHub ? [{ label: document.navLabel }] : []),
  ];
}
export function getReviewQueryLinks(kind: EnglishApplicationKind) {
  return Object.fromEntries(Object.entries(allWorkflows[kind]).map(([group, source]) => [group, {
    href: reviewTopicHref(kind, group),
    modules: kind === 'analytical-instruments' && group === 'chromatography'
      ? { injection: 'pump-names', solvent: 'pump-names', wash: 'product-direction', connection: 'selection-start' }
      : Object.fromEntries(Object.keys(source.modules).map(key => [key, `task-${key}`])),
  }]));
}
