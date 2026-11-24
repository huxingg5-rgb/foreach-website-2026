import type { LocaleCode } from '@/data/languages';
import type { RelatedResourcesData } from '@/components/common/related-resources/related-resources.types';
import type { ApplicationDocument, ApplicationSection } from '@/data/applications/analytical-documents/types';
import { industrialInkjetPrinting } from '@/data/applications/industrial-inkjet-printing';
import { getDiaphragmPumpPrimaryPhoto, getDiaphragmPumpReferenceByProductId } from '@/data/products/detail/diaphragm-pump-reference-models';
import { getDiaphragmPumpPath } from '@/data/products/detail/diaphragm-pump-routes';
import { getTubingAssemblyRelatedProducts } from '@/data/products/tubing-assemblies/related-products';

const [supply, recirculation, cleaning] = industrialInkjetPrinting.scenes;

export const inkjetScenesZh = [
  { id: supply.id, href: supply.href, title: '供墨与补墨', summary: '按补墨量、允许时间和实际管路阻力确定主墨箱到副墨箱的输送工况。' },
  { id: recirculation.id, href: recirculation.href, title: '墨水循环与回墨', summary: '按喷头压力窗口和循环工作流量评估回墨支路，并验证白墨停机后的恢复。' },
  { id: cleaning.id, href: cleaning.href, title: '喷头清洗与废墨排放', summary: '按单次排废量、允许排空时间和墨水与清洗液的混合状态评估维护支路。' },
] as const;

const [supplyZh, recirculationZh, cleaningZh] = inkjetScenesZh;
const connectionGuide = industrialInkjetPrinting.connectionGuide;
const connectionGuideLink = { label: '管组件与接头的应用与选型', href: connectionGuide.href };
const connectionTasks = [
  { label: '固定墨路与管组件', href: connectionGuide.tasks[0].href, description: '按管径、端口和墨水条件选择固定管段及连接方式。' },
  { label: '墨桶更换与维护快接', href: connectionGuide.tasks[1].href, description: '为可拆卸的墨桶和维护模块选择快插接头并验证拆装效果。' },
] as const;
const [fixedInkLines, inkTankQuickDisconnects] = connectionTasks;

const flowControlGuide = industrialInkjetPrinting.flowControlGuide;
const flowControlGuideLink = { label: '过滤、止回与流路控制', href: flowControlGuide.href };
const flowControlTasks = [
  { label: '供墨过滤与止回', href: flowControlGuide.tasks[0].href, description: '按上游过滤位置、工作压降和停泵后的回流风险选型。' },
  { label: '清洗液切换与支路隔离', href: flowControlGuide.tasks[1].href, description: '按清洗、冲洗和排废的阀位及断电状态选择连接方式。' },
] as const;
const [inkFiltration, cleaningFluidSwitching] = flowControlTasks;

export const inkFilter = { id: 'foreach-f-inline-filter', title: 'F-PE-60-32-PP-N 管路过滤器', href: '/en/products/fittings/filters/f-pe-60-32-pp-n/' };
export const inkCheckValve = { id: 'foreach-cv-check-valve', title: 'CV-BE-32-PP-N 膜片式单向阀', href: '/en/products/fittings/check-valves/cv-be-32-pp-n/' };
const inkPressureSensor = { id: 'foreach-pdm5', title: 'PDM5 压力检测模块', href: '/en/products/control/pdm5-pressure-sensor/' };
const inkBubbleDetector = { id: 'foreach-abd', title: 'ABD 气泡检测模块', href: '/en/products/control/air-bubble-detectors/abd/' };
const inkGasLiquidPump = { id: 'foreach-dpgl800', title: 'DPGL800-BS 气液隔膜泵', href: getDiaphragmPumpPath('en', 'dpgl800-bs') };

const printingReferences = [
  { id: 'printing-ink-system', title: 'KNF 与 Megnajet 工业喷墨供墨及循环案例', href: 'https://knf.com/en/us/stories-events/cases/details/megnajet-fluid-management' },
  { id: 'knf-dod-ink-path', title: 'KNF 工业喷墨泵指南（按需喷墨供墨、循环与维护支路）', href: 'https://knf.com/fileadmin/Local_files/Germany/Downloads/KNF_Inkjet_Brochure_EN_05-2024_web.pdf' },
  { id: 'xaar-hydra', title: 'Xaar Hydra 供墨系统规格书（喷嘴弯月面压力、循环压差与温度）', href: 'https://www.xaar.com/media/vnqneaw3/xa-035995-pu-6-xaar-hydra-product-datasheet-english.pdf' },
  { id: 'xaar-tf-recirculation', title: 'Xaar TF Technology 白皮书（喷头内循环与喷嘴压力）', href: 'https://www.xaar.com/media/llun2uey/xa-062576-pu-3-why-tf-technology-ink-recirculation-is-still-the-best-white-paper-english.pdf' },
  { id: 'mimaki-drain-maintenance', title: 'Mimaki 维护站与排墨通道维护说明', href: 'https://mimaki.com/support/faq/maintenance/entry-58548.html' },
  { id: 'mimaki-cap-wash', title: 'Mimaki 维护帽与泵管清洗说明', href: 'https://mimaki.com/support/faq/maintenance/entry-410446.html' },
  { id: 'mimaki-ujf-maintenance', title: 'Mimaki UJF-3042/6042 MkII 系列操作手册，第 4 章（喷嘴与排墨通道清洗）', href: 'https://mimaki.com/product/inkjet/i-flat/ujf-3042mkII/download-manual.html' },
  { id: 'signs101-long-print', title: 'Signs101 操作员记录（长版作业中途单色中断，清洗后暂时恢复）', href: 'https://www.signs101.com/threads/damper-running-out-of-ink-in-the-middle-of-the-print.157811/' },
  { id: 'printing-tubing', title: 'Saint-Gobain 数字印刷管材选型指南', href: 'https://www.ics.saint-gobain.com/sites/hps-mac3-lifesciences-fluid-transfer/files/digital-printing-tubing-selection-guide-saint-gobain.pdf' },
  { id: 'ink-quick-connects', title: 'CPC 与 HP 供墨系统的快插接头案例', href: 'https://www.cpcworldwide.com/Portals/0/Downloadable-Content/COR/Literature/Testimonials/CPC-HP-Ink-Testimonial.pdf' },
  { id: 'inkjet-solenoid-valves', title: 'Bürkert 工业喷墨电磁阀选型资料', href: 'https://www.burkert-usa.com/en/company-career/what-s-new/press/media/technical-reports/buerkert-valves-for-industrial-inkjet-printing' },
];

const flowControlReferences = [
  { id: 'digital-printing-filtration', title: 'Pall 数字印刷系统过滤选型指南', href: 'https://www.pall.com/content/dam/pall/industrial-manufacturing/literature-library/non-gated/Filtration_Selection_Guide_for_Digital_Printing_Systems.pdf' },
  { id: 'inkjet-fluid-management', title: 'Xaar Midas HV HFR 供墨系统规格书', href: 'https://www.xaar.com/media/zpvd3fdr/xa-071840-pu-2-xaar-midas-hv-hfr-product-datasheet-english.pdf' },
  inkFilter,
  inkCheckValve,
  inkPressureSensor,
  inkBubbleDetector,
  inkGasLiquidPump,
  { id: 'foreach-sv10', title: '恒永达 SV10 二通与三通微型电磁阀', href: '/en/resources/installation-guide/sv10-solenoid-valve-overview/' },
  { id: 'foreach-mrv3', title: '恒永达多通道旋转阀选型指南', href: '/en/resources/technical-articles/rotary-valve-selection-guide/' },
];

export const inkjetPumpCandidatesZh = [
  {
    productId: 'diaphragm-dpl30-brushed',
    slug: 'dpl30-db',
    model: 'DPL30-DB',
    title: 'DPL30-DB 微型液体隔膜泵',
    freeFlow: '300 mL/min',
    ratedPressure: '100 kPa',
    task: '评估流量需求较低的供墨、回墨或小型液体排废支路。',
  },
  {
    productId: 'diaphragm-dpl60-brushed',
    slug: 'dpl60-db',
    model: 'DPL60-DB',
    title: 'DPL60-DB 微型液体隔膜泵',
    freeFlow: '600 mL/min',
    ratedPressure: '100 kPa',
    task: '评估工作流量需求较高的供墨或回墨支路。',
  },
  {
    productId: 'diaphragm-dpl30h-brushed',
    slug: 'dpl30h-ds',
    model: 'DPL30H-DS',
    title: 'DPL30H-DS 高压液体隔膜泵',
    freeFlow: '300 mL/min',
    ratedPressure: '600 kPa',
    task: '评估长管路或过滤阻力较大的上游墨水输送段。',
  },
] as const;

export const inkjetArticlesZh = [
  {
    slug: 'ink-circulation-supply-return-pump-diaphragm-pump',
    title: '供墨泵、回墨泵和循环泵有什么区别',
    summary: '从墨路位置、喷头压力和工作流量区分三种泵的任务。',
  },
  {
    slug: '300-vs-600-ml-min-ink-circulation-return-pump-selection',
    title: '如何选择 300 或 600 mL/min 的供墨与回墨泵',
    summary: '结合油墨黏度、管路、过滤器和实际工作点比较两档流量。',
  },
  {
    slug: 'white-ink-circulation-pump-selection-sedimentation',
    title: '白墨循环泵选型与颜料沉降',
    summary: '检查墨箱低流速区域、停机后启动流量和接液材料。',
  },
  {
    slug: 'ink-starvation-inkjet-troubleshooting',
    title: '工业喷墨设备缺墨的排查方法',
    summary: '按墨箱、供墨泵、过滤器、管路和喷头依次检查供墨条件。',
  },
] as const;

export const inkjetContactZh = {
  title: '提交墨路工况',
  description: '请提供喷头型号及允许压力范围、实际油墨与清洗液、工作温度、目标流量、管路和过滤器配置，以及补墨、循环或排废的运行节拍。有墨路图时可一并提交，便于核对候选部件和装机验证条件。',
  button: '提交墨路工况',
} as const;

const assemblyTitles: Readonly<Record<string, string>> = {
  'tubing-assembly-fep-flanged': 'FEP 法兰管组件',
  'tubing-assembly-retaining-ring-pfa': 'PFA 卡环管组件',
  'tubing-assembly-ptfe-ferrule': 'PTFE 卡箍管组件',
};

const inkLineAssemblies = getTubingAssemblyRelatedProducts('en', [
  'tubing-assembly-fep-flanged',
  'tubing-assembly-retaining-ring-pfa',
  'tubing-assembly-ptfe-ferrule',
]).map(product => {
  const title = assemblyTitles[product.id] ?? product.title;
  return { ...product, title, imageAlt: title };
});

const barbedFittings = {
  id: 'barbed-fittings',
  title: '倒刺接头',
  href: '/en/products/fittings/barbed-fittings/',
  imageSrc: '/images/products/fittings/barbed-fittings/photos/pp-equal-straight-barbed-fitting-side-view.webp',
  imageAlt: 'PP 等径直通倒刺接头侧面实物图',
};

const quickConnectFittings = {
  id: 'quick-connect-fittings',
  title: '快插接头',
  href: '/en/products/fittings/quick-connect-fittings/',
  imageSrc: '/images/resources/technical-articles/instrument-fluidics/quick-disconnect-couplings-photo.webp',
  imageAlt: '三种不同尾端连接形式的快插接头实物',
};

export const pressureSensorCard = {
  id: 'pdm5-pressure-sensor',
  title: inkPressureSensor.title,
  href: inkPressureSensor.href,
  imageSrc: '/images/products/control/foreach-pdm5-pressure-sensor-front.webp',
  imageAlt: 'PDM5 压力检测模块的接口和外壳实拍',
};

const solenoidValveCard = {
  id: 'sv10-solenoid-valves',
  title: 'SV10 微型电磁阀',
  href: '/en/products/valves/solenoid-valves/',
  imageSrc: '/images/products/valves/solenoid-valves/foreach-sv10-3-way-connection-options-photo.webp',
  imageAlt: 'SV10 三通微型电磁阀的基板式与倒刺式接口实拍',
};

const abdBubbleCard = {
  ...inkBubbleDetector,
  imageSrc: '/images/products/control/foreach-abd-air-bubble-detectors-open-cover-front-view.webp',
};

const sv10ThreeWayBarbed = {
  title: 'SV10-B16-3 三通倒刺电磁阀',
  href: '/en/products/valves/solenoid-valves/3-way-barbed/',
  imageSrc: '/images/products/valves/solenoid-valves/foreach-sv10-b16-3-barbed-ports-closeup.webp',
};

const [dpl30, dpl60, dpl30h] = inkjetPumpCandidatesZh;

function productLink(product: { title: string; href: string } | InkjetPump, description: string) {
  const href = 'href' in product ? product.href : getDiaphragmPumpPath('en', product.slug);
  return { label: product.title, href, description };
}

export const inkjetProductImagesByHref: Readonly<Record<string, string>> = Object.fromEntries([
  ...inkjetPumpCandidatesZh.flatMap(pump => {
    const reference = getDiaphragmPumpReferenceByProductId(pump.productId);
    const photo = reference && getDiaphragmPumpPrimaryPhoto(reference.copyKey);
    return photo && photo.model === pump.model ? [[getDiaphragmPumpPath('en', pump.slug), photo.main]] : [];
  }),
  ...[...inkLineAssemblies, barbedFittings, quickConnectFittings, pressureSensorCard, sv10ThreeWayBarbed, abdBubbleCard]
    .map(product => [product.href, product.imageSrc]),
]);

const referenceDocument: ApplicationDocument = {
  slug: industrialInkjetPrinting.slug,
  kind: 'hub',
  title: '工业喷墨印刷设备用流体部件',
  navLabel: '工业喷墨印刷',
  seoTitle: '工业喷墨印刷设备用流体部件｜恒永达',
  description: '按供墨、循环和维护排废任务，查看工业喷墨设备的隔膜泵、管组件、接头、过滤器、阀和传感器选型。',
  eyebrow: '工业喷墨印刷',
  keywords: ['工业喷墨印刷', '供墨与补墨', '墨水循环', '喷头清洗', '废墨排放', '微型液体隔膜泵'],
  intro: [
    {
      type: 'paragraph',
      text: '在工业按需喷墨设备中，同一种墨水可能走过三条用途不同的管路。主墨箱补给副墨箱，补墨要赶上持续喷印的耗墨；支持内部循环的喷头把未喷出的墨水送回指定墨箱；维护站收集的残墨和清洗液则进入废液桶。先在设备墨路图上标出每条管路的起点和终点，再决定在哪里测量流量、液位或压力。',
      inlineLinks: [{ text: '设备墨路图', href: industrialInkjetPrinting.guide.href }],
      references: ['knf-dod-ink-path', 'mimaki-ujf-maintenance'],
    },
  ],
  sections: [
    {
      ...supplyZh,
      title: '按副墨箱的液位变化计算补墨流量',
      tocLabel: '计算补墨流量',
      blocks: [
        {
          type: 'paragraph',
          text: '在带副墨箱的按需喷墨设备中，液位降至补墨起点时，泵从主墨箱送墨，直到副墨箱恢复工作液位。若设备还有墨水循环与回墨，先在整机墨路图上标出回墨进入哪个箱。回到同一副墨箱的墨水在箱内收支相抵，回到其他箱的净流出量则要计入补墨量。',
          inlineLinks: [
            { text: '整机墨路图', href: industrialInkjetPrinting.guide.href },
            { text: '墨水循环与回墨', href: recirculation.href },
          ],
          references: ['knf-dod-ink-path'],
        },
        {
          type: 'flow',
          caption: '采用副墨箱的一种供墨路径',
          nodes: ['主墨箱', '输送与过滤段', '副墨箱', '喷头供墨段'],
          focusIndex: 1,
        },
        {
          type: 'callout',
          title: '补墨期间仍在喷印，泵每分钟要送多少墨？',
          text: '假设副墨箱需要净增加 30 mL，要求 15 秒内完成，这段时间喷印消耗 5 mL，其他支路的净流出量为零。泵至少要在 15 秒内送入 35 mL，平均工作流量为 35 × 60 ÷ 15 = 140 mL/min。这是该假设工况的需求。若阀门打开或泵建立流量占用了部分时间，计算时应使用实际可输送时间。',
        },
        {
          type: 'paragraph',
          text: '针对上例，先把目标墨水送过量产用的管路和滤芯，在副墨箱入口测 15 秒内实际到达的墨量。若不足 35 mL，记录泵出口压力和滤芯两端压差，再决定比较 DPL30-DB 与 DPL60-DB 的输送流量，还是评估 DPL30H-DS 的上游带压输送能力。喷头处的允许压力以该喷头手册为准。',
          inlineLinks: inkjetPumpCandidatesZh.map(pump => ({ text: pump.model, href: getDiaphragmPumpPath('en', pump.slug) })),
          references: ['ink-flow-guide', 'dpl30-db', 'dpl60-db', 'dpl30h-ds'],
        },
        {
          type: 'links',
          items: [
            productLink(dpl30, '小流量补墨支路可先用此型号试样，在主墨箱最低工作液位下记录补足一轮所需时间。'),
            productLink(dpl60, '连续喷印耗墨较高、现有管路需要更大工作流量时，在同一墨温和滤芯状态下比较两款泵的实际补墨量。'),
            productLink(dpl30h, '长管段需要较高输送压力时，可在主墨箱至副墨箱之间评估。先核对管、阀和滤壳允许的工作压力。'),
          ],
        },
      ],
    },
    {
      ...recirculationZh,
      title: '先确认墨水经过喷头的哪一段',
      tocLabel: '辨认循环路径',
      blocks: [
        {
          type: 'paragraph',
          text: '从喷头型号的端口图找出进墨口、回墨口和回流终点。若只有墨箱搅拌或管路旁通，量到回流只说明那一段在流动。对于支持贯流的喷头，还要确认流量计读到的是经过喷头的流量。主墨箱的耗墨量属于供墨与补墨计算，不能当作喷头的循环流量。',
          inlineLinks: [{ text: '供墨与补墨', href: supply.href }],
          references: ['knf-dod-ink-path', 'xaar-tf-recirculation'],
        },
        {
          type: 'paragraph',
          text: '喷头进出口压差会影响通过喷头的流量，喷嘴处的弯月面压力则影响能否稳定持墨。即使回墨量相同，供墨和回墨两侧的压力同时变化，喷嘴也可能渗墨或吸入空气。调试前向喷头供应商取得该型号的压力基准、允许窗口和循环流量条件，再决定泵和调压装置放在哪里。',
          references: ['xaar-tf-recirculation', 'inkjet-fluid-management'],
        },
      ],
    },
    {
      ...cleaningZh,
      title: '沿维护帽、抽吸管和废墨桶观察一次清洗',
      tocLabel: '辨认维护路径',
      blocks: [
        {
          type: 'paragraph',
          text: '采用维护帽抽吸的设备，先看维护帽是否按程序收到指定清洗液，再看帽内液体能否被抽走，最后看废墨桶实际收到了多少。Mimaki 的维护说明把帽内喷嘴清洗和帽下排墨管路清洗分成两个动作。设备若另有正压清洗程序，其允许压力、时间和液体由该喷头与整机手册规定。',
          references: ['mimaki-ujf-maintenance', 'mimaki-cap-wash', 'knf-dod-ink-path'],
        },
        {
          type: 'paragraph',
          text: '画出清洗液切换与支路隔离所用的阀位，标上哪一段只接触清洗液、哪一段同时接触墨水与废液。喷嘴试印缺线时，若帽内始终没有清洗液，应先查进液和阀位。若帽内已注液却排不走，再从帽的密封边、帽下排墨管和废墨桶入口逐段核对。',
          inlineLinks: [{ text: '清洗液切换与支路隔离', href: cleaningFluidSwitching.href }],
          references: ['mimaki-cap-wash', 'mimaki-drain-maintenance'],
        },
      ],
    },
  ],
  references: [
    { id: 'ink-circuit-guide', title: inkjetArticlesZh[0].title, href: `/en/resources/technical-articles/${inkjetArticlesZh[0].slug}/` },
    { id: 'ink-flow-guide', title: inkjetArticlesZh[1].title, href: `/en/resources/technical-articles/${inkjetArticlesZh[1].slug}/` },
    { id: 'white-ink-guide', title: inkjetArticlesZh[2].title, href: `/en/resources/technical-articles/${inkjetArticlesZh[2].slug}/` },
    ...inkjetPumpCandidatesZh.map(pump => ({ id: pump.slug, title: `${pump.model} 产品规格`, href: getDiaphragmPumpPath('en', pump.slug) })),
  ],
};

type InkjetPump = (typeof inkjetPumpCandidatesZh)[number];
type InkjetArticle = (typeof inkjetArticlesZh)[number];

export type InkjetApplicationPage = {
  contentLocale?: LocaleCode;
  href: string;
  image: string;
  document: ApplicationDocument;
  pumps: readonly InkjetPump[];
  articles: readonly InkjetArticle[];
  relatedProducts?: RelatedResourcesData['products'];
  contactDescription?: string;
};

const [supplySection, recirculationSection, cleaningSection] = referenceDocument.sections;
const inkjetReferences = [...referenceDocument.references, ...printingReferences, ...flowControlReferences];
const [circuitGuide, flowGuide, whiteInkGuide, starvationGuide] = inkjetArticlesZh;

function pumpSection(pumps: readonly InkjetPump[]): ApplicationSection {
  return {
    id: 'inkjet-pump-candidates',
    title: '微型液体隔膜泵选型参考',
    blocks: [{
      type: 'table',
      caption: '候选型号公开规格与可评估任务',
      headers: ['型号', '自由流量', '额定压力', '可评估的液路任务'],
      rows: pumps.map(pump => [pump.model, pump.freeFlow, pump.ratedPressure, pump.task]),
      inlineLinks: pumps.map(pump => ({ text: pump.model, href: getDiaphragmPumpPath('en', pump.slug) })),
      note: '公开规格的工作介质为纯净水。用目标油墨、清洗液和完整液路确认装机流量及接液材料。',
      references: pumps.map(pump => pump.slug),
    }],
  };
}

function makeInkjetPage({
  href, image, kind, title, navLabel, description, sections,
  pumps = [], articles = [], relatedProducts, contactDescription,
  references = inkjetReferences, keywords = referenceDocument.keywords,
}: Pick<InkjetApplicationPage, 'href' | 'image'>
  & Partial<Pick<InkjetApplicationPage, 'pumps' | 'articles' | 'relatedProducts' | 'contactDescription'>>
  & Pick<ApplicationDocument, 'kind' | 'title' | 'navLabel' | 'description' | 'sections'>
  & Partial<Pick<ApplicationDocument, 'references' | 'keywords'>>): InkjetApplicationPage {
  const citations = new Set(sections.flatMap(section => section.blocks.flatMap(block => block.references ?? [])));
  return {
    href, image, pumps, articles, relatedProducts, contactDescription,
    document: {
      slug: href.slice(0, -1).split('/').at(-1)!,
      kind, title, navLabel, description, sections,
      seoTitle: `${title}｜恒永达`,
      eyebrow: '应用指南',
      keywords,
      intro: [{ type: 'paragraph', text: description }],
      references: references.filter(reference => citations.has(reference.id)),
    },
  };
}

const equipmentLabel = '工业喷墨设备墨路指南';
const inkjetTaskGuidesSectionId = 'inkjet-task-guides';
export const inkjetPumpGuideLinkZh = {
  label: '微型隔膜泵的应用与选型',
  href: `${industrialInkjetPrinting.guide.href}#${inkjetTaskGuidesSectionId}`,
};

export const inkjetOverviewPageZh: InkjetApplicationPage = {
  href: industrialInkjetPrinting.href,
  image: supply.image,
  pumps: [],
  articles: inkjetArticlesZh,
  document: {
    ...referenceDocument,
    references: printingReferences.filter(ref => ['knf-dod-ink-path', 'mimaki-ujf-maintenance', 'xaar-hydra', 'signs101-long-print'].includes(ref.id)),
    sections: [
      {
        id: 'ink-path-overview',
        title: '补墨、回墨和排废分别要达到什么结果',
        tocLabel: '应用场景',
        blocks: [{
          type: 'paragraph',
          text: '做新机设计时，可先按下列三种任务找入口。已有设备发生缺线时，先记下表现出现在高覆盖率打印途中、换桶后第一幅，还是清洗后的喷嘴检查图上。这三个时刻对应的液路动作不同，能帮你确定先测哪个位置。',
        }, {
          type: 'links',
          items: inkjetScenesZh.map(scene => ({
            anchorId: scene.id,
            label: scene.title,
            href: scene.href,
            description: scene.summary,
          })),
        }],
      },
      {
        id: 'inkjet-equipment-guide',
        title: '怎样判断问题出在供墨端还是喷头附近',
        tocLabel: '按现象定位',
        blocks: [{
          type: 'paragraph',
          text: '有操作员记录过长版画面中途某一色停止出墨，清洗后又能继续打印。要判断供墨是否跟得上耗墨，可在带副墨箱的设备上重现同一作业，记录该色中断的时刻、当时的液位，以及补墨启动后液位是否回升。供墨不足排查指南列出了从墨桶到喷头的分段检查顺序。',
          inlineLinks: [{ text: '供墨不足排查指南', href: `/en/resources/technical-articles/${starvationGuide.slug}/` }],
          references: ['signs101-long-print'],
        }, {
          type: 'paragraph',
          text: '如果副墨箱液位按时恢复，仍有滴墨或缺线，查喷头型号和供墨方案。对于流通式喷头，要分别记录维持喷嘴弯月面的压力和驱动墨水穿过喷头的压差。墨水循环与回墨指南说明如何选测点，并把压力和回流量放在同一次打印中比较。',
          inlineLinks: [{ text: '墨水循环与回墨指南', href: recirculation.href }],
          references: ['xaar-hydra'],
        }],
      },
      {
        id: 'inkjet-pump-candidates',
        title: '怎样为现有墨路选泵、管组件和阀',
        tocLabel: '按部件选型',
        blocks: [{
          type: 'paragraph',
          text: '已知每次要补多少墨、可用多少时间，可以从隔膜泵选型开始。设备改管或需要频繁换桶，先区分固定管段与可拆接口。遇到停泵回流、过滤后流量下降或清洗液进入错误支路，再按过滤、止回与阀位选择部件。记录所用墨水和清洗液，两者都会接触到的管壁、密封和阀腔应一起核对。',
          inlineLinks: [
            { text: '隔膜泵选型', href: inkjetPumpGuideLinkZh.href },
            { text: '固定管段与可拆接口', href: connectionGuide.href },
            { text: '过滤、止回与阀位', href: flowControlGuide.href },
          ],
        }, {
          type: 'links',
          items: [
            productLink(dpl30, '主墨箱向副墨箱补墨时，用实际油墨和滤芯测量这款泵达到停止液位所需的时间。'),
            productLink(inkLineAssemblies[0], '固定供墨管若采用平底端口，可按 FEP 翻边端面匹配两端接头，再按流量和允许压降定管径。'),
            productLink(sv10ThreeWayBarbed, '维护站共用一段进液管时，先核对三通阀的公共口与两条支路，再验证切换后的残墨量。'),
          ],
        }],
      },
    ],
  },
};

export const inkjetEquipmentPageZh = makeInkjetPage({
  href: industrialInkjetPrinting.guide.href,
  image: supply.image,
  kind: 'overview',
  title: '工业喷墨设备的墨路与部件选型',
  navLabel: equipmentLabel,
  description: '设计带副墨箱的按需喷墨设备时，先定三个验收点：持续喷印时副墨箱能否按时补足，循环时喷头压力能否保持在允许范围内，维护结束时废液能否排尽并恢复喷印。下面沿墨路说明每项该在哪里测，以及结果会怎样改变部件选择。',
  sections: [
    {
      id: 'ink-path-overview',
      title: '工业喷墨设备的墨路示意',
      tocLabel: '墨路示意',
      blocks: [{
        type: 'flow',
        caption: '带副墨箱的喷墨设备墨路示意',
        label: '供墨与补墨',
        nodes: ['主墨箱', '补墨泵与过滤', '副墨箱', '喷头'],
        focusIndex: 1,
        branches: [
          { label: '墨水循环与回墨', nodes: ['流通式喷头', '回墨管路', '指定墨箱'], focusIndex: 1 },
          { label: '清洗与排废', nodes: ['清洗液桶', '切换阀', '喷头维护站', '废墨容器'], focusIndex: 2 },
        ],
        note: '回墨支路适用于支持墨水循环的喷头。过滤位置、喷头调压方式及维护站的排废方式以设备设计为准。',
        references: ['ink-circuit-guide', 'printing-ink-system'],
      }, {
        type: 'paragraph',
        text: '拿到墨路图，先沿着回流管找起点。只从墨桶抽出又流回同一桶，能说明桶内有循环；只有墨水确实经过喷头指定的循环通道，测得的回流量才反映这段通道的运行状态。普通单入口喷头可直接按供墨支路核算。采用白色颜料墨水时，另外检查停机后颜料在哪一段沉积，详见白墨循环与重启。',
        inlineLinks: [
          { text: '供墨支路', href: supply.href },
          { text: '白墨循环与重启', href: `/en/resources/technical-articles/${whiteInkGuide.slug}/` },
        ],
        references: ['xaar-tf-recirculation'],
      }],
    },
    {
      id: 'inkjet-component-selection',
      title: '按墨路位置选择流体部件',
      tocLabel: '部件安装位置',
      blocks: [{
        type: 'table',
        caption: '墨路位置、候选部件与装机检查项',
        headers: ['安装位置', '候选部件与选型指南', '先核对的装机条件'],
        rows: [
          ['可拆墨桶', 'Q20、Q40 快插接头', '确认公母端规格与关断要求，检查断开残液、复接进气和工作流量。'],
          ['主墨箱至副墨箱', '补墨隔膜泵、固定墨路管组件与接头', '计入喷印期间耗墨和实际管路阻力，验证补墨时间与液位恢复。'],
          ['补墨过滤段', 'F 系列过滤器、CV 系列止回阀、PDM5 压力检测模块', '记录过滤压降和停泵倒流风险。有泵后测压需求时核对测点与量程。'],
          ['副墨箱至喷头', '固定供墨管路、喷头近端末级过滤', '按喷头厂商要求核对进墨压力、过滤要求与允许压降。'],
          ['流通式喷头至指定墨箱', '回墨管路、可选回墨泵', '同时记录循环流量与喷头压力。使用白墨时复测停机后的流量恢复。'],
          ['清洗液桶至维护站', 'SV10 微型电磁阀、ABD 气泡检测模块', '核对阀位和清洗液相容性，在实际透明管上验证进气检测。'],
          ['维护站至废墨容器', '液体排废泵、DPGL800-BS 气液隔膜泵', '按实际废液与夹气状态验证单次排空时间及进气后的抽吸恢复。'],
        ],
        inlineLinks: [
          { text: 'Q20、Q40 快插接头', href: inkTankQuickDisconnects.href },
          { text: '补墨隔膜泵', href: supply.href },
          { text: '固定墨路管组件与接头', href: fixedInkLines.href },
          { text: 'F 系列过滤器、CV 系列止回阀', href: inkFiltration.href },
          { text: 'PDM5 压力检测模块', href: inkPressureSensor.href },
          { text: '固定供墨管路', href: fixedInkLines.href },
          { text: '喷头近端末级过滤', href: `${inkFiltration.href}#inkjet-filter-and-check-valve-selection` },
          { text: '回墨管路、可选回墨泵', href: recirculation.href },
          { text: 'SV10 微型电磁阀', href: cleaningFluidSwitching.href },
          { text: 'ABD 气泡检测模块', href: inkBubbleDetector.href },
          { text: '液体排废泵', href: cleaning.href },
          { text: 'DPGL800-BS 气液隔膜泵', href: inkGasLiquidPump.href },
        ],
        note: '先在图纸上标注测点。例如在泵出口测到的压力包含下游管段、滤芯和阀件的阻力；判断滤芯压降需要同一流量下的滤前、滤后读数。',
        references: ['printing-tubing', 'ink-quick-connects', 'inkjet-solenoid-valves', 'digital-printing-filtration'],
      }, {
        type: 'links',
        items: [
          productLink(dpl60, '高覆盖率喷印时若副墨箱补不足，测 DPL60-DB 在整条补墨管路上的输送量，再与同期耗墨量比较。'),
          productLink(pressureSensorCard, '记录泵出口有压段的绝对压力。评估滤芯压降时，还要取得滤后压力并核对测量误差。'),
          productLink(quickConnectFittings, '可拆墨桶接口应按两端存墨情况选择截止方式，装机时记录断开残液和复接到墨时间。'),
        ],
      }],
    },
    {
      id: 'inkjet-equipment-conditions',
      title: '怎样在样机上验证补墨、循环和维护',
      tocLabel: '样机验证',
      blocks: [{
        type: 'paragraph',
        text: '为每次试验留一份可复测的基准。写下打印图案与覆盖率、墨温、两只墨箱的起始液位、滤芯状态和泵设定。有多个颜色或喷头时，同时记录是哪一路先发生异常。墨路改变后再用相同条件复测，才能判断这次改动有没有解决原问题。',
      }, {
        type: 'table',
        caption: '在同一台打印机上记录三种运行状态',
        headers: ['运行状态', '记录什么', '如何判读'],
        rows: [
          ['持续打印和补墨重叠', '从触发液位起计时，记录补墨期间的耗墨与达到停止液位的时刻。', '液位回升太慢时，先核算所需补墨量，再在相同墨温下比较新滤芯与使用中滤芯的压降。'],
          ['流通式喷头从待机转为喷印', '按喷头厂商规定的测点同步记录供回压力、循环流量与墨温。', '即使回墨量达标，仍要检查启停瞬间喷头是否超出允许压力，以及喷嘴检查图能否恢复。'],
          ['完成一次清洗并恢复生产', '记录供液阀位、维护站是否到液、废液是否到达容器，以及回到打印状态后的首张检查图。', '按机型规定依次验收清洗与排废。废液桶有增量只能说明有液体流入，仍须核对维护帽处的残液和首张检查图。'],
        ],
        inlineLinks: [
          { text: '核算所需补墨量', href: supply.href },
          { text: '滤芯的压降', href: inkFiltration.href },
          { text: '供回压力、循环流量', href: recirculation.href },
          { text: '清洗与排废', href: cleaning.href },
        ],
        references: ['xaar-hydra', 'mimaki-ujf-maintenance'],
      }],
    },
    {
      id: inkjetTaskGuidesSectionId,
      title: '怎样区分补墨泵、循环泵和排废泵的工作点',
      tocLabel: '泵的工作点',
      blocks: [{
        type: 'paragraph',
        text: '补墨泵要在给定时间内补足液位差；循环泵要在整条回路的压降下维持流量，同时让喷头处于允许压力范围内；维护泵则要在短时间内抽走残液，末段还可能吸入空气。比较两个标称流量相近的泵时，应带着实际油墨、管长、滤芯和安装高度测工作点。300 与 600 mL/min 泵型比较解释了自由流量能怎样用于初选。',
        inlineLinks: [
          { text: '补墨泵', href: supply.href },
          { text: '循环泵', href: recirculation.href },
          { text: '维护泵', href: cleaning.href },
          { text: '300 与 600 mL/min 泵型比较', href: `/en/resources/technical-articles/${flowGuide.slug}/` },
        ],
        references: ['knf-dod-ink-path', 'ink-flow-guide'],
      }],
    },
    {
      id: 'inkjet-connection-guides',
      title: '工业喷墨墨路的管组件与接头选型',
      tocLabel: '管组件与接头',
      blocks: [{
        type: 'paragraph',
        text: '机内固定段先按内径、长度和端口确定管组件。换桶处另画一道拆装界面，标明断开后哪一侧还存有液体、复接时空气会进入哪里。若故障总在换桶后出现，可分别记录首段气泡经过的时间和首次补墨所需时间，再按墨桶快接指南检查配对与密封。墨水和清洗液应逐一对照接液材料，并在实际温度、接触时长下验证。',
        inlineLinks: [
          { text: '内径、长度和端口', href: fixedInkLines.href },
          { text: '墨桶快接指南', href: inkTankQuickDisconnects.href },
          { text: '接液材料', href: '/en/resources/material-compatibility/' },
        ],
        references: ['printing-tubing', 'ink-quick-connects'],
      }],
    },
    {
      id: 'inkjet-flow-control-guides',
      title: '过滤、止回与流路控制在墨路中的位置',
      tocLabel: '过滤与流路控制',
      blocks: [{
        type: 'paragraph',
        text: '上游滤芯主要承担截污，喷头附近的末级过滤按喷头要求单独选。若停泵后副墨箱液位持续下降，先确认实际回流路径，再评估止回阀的开启压差会不会拖慢下次补墨。涉及换液时，把打印、清洗与断电三种状态下相通的端口画出来。清洗液切换指南给出了阀位和废液去向的核对方法。',
        inlineLinks: [
          { text: '末级过滤', href: inkFiltration.href },
          { text: '清洗液切换指南', href: cleaningFluidSwitching.href },
        ],
        references: ['digital-printing-filtration', 'inkjet-solenoid-valves'],
      }],
    },
  ],
  pumps: inkjetPumpCandidatesZh,
  articles: [circuitGuide, flowGuide, starvationGuide],
});

const inkjetSupplyPageZh = makeInkjetPage({
  href: supply.href,
  image: supply.image,
  kind: 'task',
  title: '工业喷墨设备的供墨与补墨选型',
  navLabel: supplyZh.title,
  description: '连续喷印时，副墨箱应能在低液位报警前回到工作液位。先按液位差、同期耗墨量和允许时间算出所需流量，再用目标墨水测试最低墨位和滤芯接近更换时的补墨时间。',
  sections: [
    supplySection,
    {
      id: 'ink-supply-validation',
      title: '同一台泵为什么在低墨位或换桶后补得慢？',
      tocLabel: '补墨超时排查',
      blocks: [
        {
          type: 'paragraph',
          text: '保留量产用的固定墨管和接头、滤芯、泵驱动和副墨箱高度。在同一墨温及喷印负荷下，记录泵启动、开始进墨、达到停止液位三个时刻。启动后很久才到墨，和马上到墨但补不满，排查的部位不同。',
          inlineLinks: [{ text: '固定墨管和接头', href: fixedInkLines.href }],
        },
        {
          type: 'table',
          caption: '由液位和时间记录缩小检查范围',
          headers: ['观察到的现象', '先比较什么', '怎样复测'],
          rows: [
            ['只在主墨箱低液位时超时', '吸入口是否一直浸没，主墨箱液面与泵的高度差是否变化', '保留最低允许液位和原管路，在同一喷印负荷下重复计时。'],
            ['每次换桶后第一轮慢，随后恢复', '快接复接时的进气、入口管的液柱和阀的开启状态', '按换桶快接指南重新装接，分别记录首轮和随后几轮到墨时间。'],
            ['连续喷印时液位不断下降', '补墨期间实际净耗墨量、工作流量，以及滤芯前后压差', '保留原墨温和同一打印任务，先测当前滤芯，再换合格滤芯复测。'],
          ],
          inlineLinks: [{ text: '换桶快接指南', href: inkTankQuickDisconnects.href }],
        },
      ],
    },
    {
      id: 'ink-supply-pressure-monitoring',
      title: '如何判定补墨泵和过滤段能否装机',
      tocLabel: '装机验收',
      blocks: [
        {
          type: 'paragraph',
          text: '按供墨过滤与止回指南在滤芯两端取压，并在实际流量和墨温下对比新滤芯与允许使用末期的压差。单个泵出口压力还受墨箱高度、下游管路和阀位影响。若要记录上游有压段，可结合预计的绝对压力、接液方式及所需测量精度评估 PDM5 压力检测模块。',
          inlineLinks: [{ text: '供墨过滤与止回', href: inkFiltration.href }, { text: 'PDM5 压力检测模块', href: inkPressureSensor.href }],
          references: [inkPressureSensor.id, 'digital-printing-filtration'],
        },
        {
          type: 'paragraph',
          text: '用实际墨水验证副墨箱在规定时间内恢复，泵停后液位仍落在允许区间，同时记录补墨启停瞬间的喷头侧压力。若副墨箱液位正常，喷印仍出现断线，可继续按喷墨缺墨排查方法检查副墨箱到喷头的通道。',
          inlineLinks: [{ text: '喷墨缺墨排查方法', href: `/en/resources/technical-articles/${starvationGuide.slug}/` }],
        },
      ],
    },
    pumpSection([dpl30, dpl60, dpl30h]),
  ],
  pumps: [dpl30, dpl60, dpl30h],
  articles: [circuitGuide, flowGuide, starvationGuide],
});

const inkjetRecirculationPageZh = makeInkjetPage({
  href: recirculation.href,
  image: recirculation.image,
  kind: 'task',
  title: '工业喷墨设备的墨水循环与回墨选型',
  navLabel: recirculationZh.title,
  description: '流通式喷头既要有足够的循环流量，也要在待机、喷印和重启时维持喷嘴允许的弯月面压力。选回墨泵前，先确认回路经过的位置，再把喷头两端压力、回流量和喷嘴检查图样放在同一份记录上。',
  sections: [
    recirculationSection,
    {
      id: 'ink-recirculation-validation',
      title: '在喷印和待机之间切换，怎样判断循环是否合适',
      tocLabel: '循环流量与压力',
      blocks: [
        {
          type: 'flow',
          caption: '采用流通式喷头的回墨路径示意',
          nodes: ['供墨段', '流通式喷头', '回墨支路', '指定墨箱'],
          focusIndex: 2,
          note: '是否由独立回墨泵输送，取决于设备的回路架构。',
          references: ['ink-circuit-guide'],
        },
        {
          type: 'paragraph',
          text: '在同一墨温和墨箱液位下，记录待机、开始喷印、目标喷印负荷和停止喷印时的回流量与喷头进出口压力。使用与喷头手册一致的表压或绝压基准，保留开停瞬间的压力变化。即使平均值符合要求，泵的脉动或阀切换仍可能让喷嘴短时越过允许窗口。',
          references: ['printing-ink-system', 'xaar-tf-recirculation'],
        },
        {
          type: 'paragraph',
          text: '仅在回路有独立液体输送段时比较 DPL30-DB 与 DPL60-DB。例如，回墨箱到供墨箱的转移泵，可以在该管段比较实际回流量。若泵直接推动墨水通过喷头，还要测喷头端的压力波动，并按图样验收。规格表中的自由流量不能证明喷头端压力满足要求。',
          inlineLinks: [dpl30, dpl60].map(pump => ({ text: pump.model, href: getDiaphragmPumpPath('en', pump.slug) })),
          references: ['knf-dod-ink-path', 'dpl30-db', 'dpl60-db'],
        },
        {
          type: 'links',
          items: [
            productLink(dpl30, '独立回墨支路目标流量较小时，装上实际回墨管，在待机与喷印两种状态下测量回到墨箱的流量。'),
            productLink(dpl60, '回墨需求较高时，可与 DPL30-DB 在同一条支路上比较实际回流量，同时记录各自启停时喷头两端的压力变化。'),
          ],
        },
      ],
    },
    {
      id: 'ink-recirculation-pressure-monitoring',
      title: '回墨量下降或白墨重启缺线，先查哪里',
      tocLabel: '回流异常与白墨重启',
      blocks: [
        {
          type: 'paragraph',
          text: '若回流量比原来低，先把墨温和阀位恢复到建立基线时的条件，再测滤芯压差并检查回墨管的折弯和通径。若流量正常但停止喷印后渗墨，或启动瞬间出现气泡、缺线，先对照喷头进出口压力与喷嘴状态。PDM5 可在其量程、精度和接液条件合适的有压管段测量绝压，喷嘴微负压测点需要按喷头窗口另行选择仪表。',
          inlineLinks: [{ text: '滤芯压差', href: inkFiltration.href }, { text: '回墨管的折弯和通径', href: fixedInkLines.href }, { text: 'PDM5', href: inkPressureSensor.href }],
          references: [inkPressureSensor.id, 'xaar-tf-recirculation'],
        },
        {
          type: 'paragraph',
          text: '白墨验证应覆盖设备实际的停机时长和原厂规定的待机动作。先留一张连续喷印时的喷嘴检查图，再记录重启到流量恢复所需时间、第一张检查图和稳定后的图样。若回流已经恢复而首张仍缺线或白色覆盖不匀，沿白墨循环与颜料沉降指南分别检查墨箱底部、旁支和喷头近端，再决定是否调整循环。',
          inlineLinks: [{ text: '白墨循环与颜料沉降指南', href: `/en/resources/technical-articles/${whiteInkGuide.slug}/` }],
          references: ['white-ink-guide', 'xaar-tf-recirculation'],
        },
      ],
    },
    pumpSection([dpl30, dpl60]),
  ],
  pumps: [dpl30, dpl60],
  articles: [circuitGuide, flowGuide, whiteInkGuide],
});

const inkjetCleaningPageZh = makeInkjetPage({
  href: cleaning.href,
  image: cleaning.image,
  kind: 'task',
  title: '工业喷墨设备的喷头清洗与废墨排放',
  navLabel: cleaningZh.title,
  description: '喷头清洗后仍有缺线，可以沿维护站分别确认清洗液是否到达、维护帽是否抽空、废液是否到桶。设计排废支路时，按进泵的是连续液体、夹气废液还是废墨瓶上方的空气选择泵，再验证一次维护周期。',
  sections: [
    cleaningSection,
    {
      id: 'ink-waste-validation',
      title: '一次维护周期怎样验收排废量和复喷效果',
      tocLabel: '排空与复喷验收',
      blocks: [
        {
          type: 'flow',
          caption: '喷头维护后的排废路径示意',
          nodes: ['喷头维护站', '排废支路', '废墨容器'],
          focusIndex: 1,
        },
        {
          type: 'table',
          caption: '在同一维护程序下保存三处观察结果',
          headers: ['观察位置', '记录方法', '异常时先检查'],
          rows: [
            ['维护帽或集液盘', '记录开始抽排至达到设备规定残液状态的时间，同时观察是否吸入空气。', '帽口密封、排液入口的位置，以及清洗模式对应的阀位。'],
            ['废墨桶', '记录单次清洗前后的废液净增质量。需用体积判定时测量该次混合废液密度，或在允许的收集点直接量取。', '排废软管折扁、接口积墨、废墨桶剩余容量及该设备要求的通气或密封状态。'],
            ['恢复喷印的第一张图样', '按该机型程序打印喷嘴检查图，对比清洗前、复喷首张与稳定后的图样。', '排废量已达标仍缺线时，区分帽口维护、进墨侧缺墨与喷嘴本身的问题。'],
          ],
          inlineLinks: [{ text: '进墨侧缺墨', href: `/en/resources/technical-articles/${starvationGuide.slug}/` }],
          references: ['mimaki-cap-wash', 'mimaki-drain-maintenance'],
        },
        {
          type: 'paragraph',
          text: '换废墨桶后，检查可拆接口是否完全复接。按设备允许的维护程序覆盖正常排液、排液末段夹气、下一周期再次来液三种状态。一次维护要同时满足规定的排空时间和复喷图样要求，两项记录分开保存，便于追溯故障。',
          inlineLinks: [{ text: '可拆接口', href: inkTankQuickDisconnects.href }],
        },
      ],
    },
    {
      id: 'ink-waste-gas-liquid-aspiration',
      title: '按泵实际吸到的介质选择排废方案',
      tocLabel: '液体、气液与气侧抽吸',
      blocks: [
        {
          type: 'paragraph',
          text: '若泵从集液盘持续抽取液体，可从 DPL30-DB 液体隔膜泵开始比较，把墨水与原厂指定清洗液的混合液用于接液材料和装机流量试验。若维护帽时断时续地送来液柱和空气，可评估 DPGL800-BS 气液隔膜泵。其 6 L/min 是单个泵头的空载空气流量；每次能抽走多少废墨，要在该维护节拍下实际收集。',
          inlineLinks: [
            { text: 'DPL30-DB 液体隔膜泵', href: getDiaphragmPumpPath('en', dpl30.slug) },
            { text: 'DPGL800-BS 气液隔膜泵', href: inkGasLiquidPump.href },
          ],
          references: ['dpl30-db', inkGasLiquidPump.id],
        },
        {
          type: 'paragraph',
          text: '另一种结构是在专门设计的密闭废墨瓶气侧抽气，由瓶内负压把废液吸入。此时按废墨瓶和喷头维护系统允许的负压、有效气体容积，以及从启动到建立负压的时间选泵。联调时检查瓶盖密封、满瓶保护和气路防进液措施，分别记录建立负压和实际进液用时。',
          references: [inkGasLiquidPump.id],
        },
        {
          type: 'paragraph',
          text: '若还需自动识别换清洗液桶后的液柱中断，可在合适的供液管段评估 ABD 气泡检测模块。按实际管径、管材、清洗液和要识别的气泡做样机测试；维护帽密封和废液是否到桶另用上表的方法确认。',
          inlineLinks: [{ text: 'ABD 气泡检测模块', href: inkBubbleDetector.href }],
          references: [inkBubbleDetector.id],
        },
        {
          type: 'links',
          items: [
            productLink(dpl30, '集液盘中有连续液体可抽时，用目标废墨与清洗液的混合物，测一轮维护能抽走多少、盘底还剩多少。'),
            productLink(abdBubbleCard, '需要知道换桶后清洗液何时重新到达时，可在供液管上评估检测位置，对照实际液柱与模块信号确认是否能识别中断。'),
          ],
        },
      ],
    },
    pumpSection([dpl30]),
  ],
  pumps: [dpl30],
  articles: [circuitGuide, starvationGuide],
});

const connectionReferences = [
  ...printingReferences,
  { id: 'assembly-range', title: '恒永达管组件的管材、端接和定制选项', href: '/en/products/tubing-assemblies/' },
  { id: 'barbed-selection', title: '恒永达倒刺接头的管径与结构选型', href: '/en/resources/technical-articles/what-is-a-barbed-fitting/' },
  { id: 'quick-connect-range', title: '恒永达快插接头的密封与公母端配对', href: '/en/resources/installation-guide/youtube-quick-connect-sealing-compatibility/' },
];

const connectionKeywords = ['工业喷墨', '墨路管组件', '墨路接头', '快插接头'];

export const inkjetConnectionGuidePageZh = makeInkjetPage({
  href: connectionGuideLink.href,
  image: supply.image,
  kind: 'overview',
  title: '工业喷墨墨路的管组件与接头选型',
  navLabel: connectionGuideLink.label,
  description: '把设备画在正常打印与更换墨桶两种状态下。前一张图用来确定供墨、回墨和排废管的长度与通径；后一张图用来确定哪一端会离开设备、哪一端仍存有墨水。这样可以在同一条墨路上分别选好固定管组件和可拆接头。',
  sections: [
    {
      id: 'inkjet-connection-positions',
      title: '管组件与接头在供墨、回墨和维护支路中的位置',
      tocLabel: '连接件的位置',
      blocks: [
        {
          type: 'paragraph',
          text: '从下游能看到的结果倒推管路。带副墨箱的设备，看供墨与补墨能否赶上打印耗墨；流通式喷头看回墨能否在指定压力下回到墨箱；维护站则看清洗结束后废液是否排尽。把实际使用的支路标在墨路图上，再为每一段指定验收位置。',
          inlineLinks: [{ text: '供墨与补墨', href: supplyZh.href }, { text: '流通式喷头', href: recirculationZh.href }, { text: '维护站', href: cleaningZh.href }],
        },
        {
          type: 'table',
          caption: '三种墨路的连接位置和观察点',
          headers: ['墨路位置', '连接件怎么布置', '在哪里判断结果'],
          rows: [
            ['主墨桶至副墨箱', '长期装在机架内的泵与过滤器用固定管相连；需要搬走的墨桶在更换位置设置可拆接口。', '最低工作液位时，记录副墨箱从补墨触发到恢复液位的时间。'],
            ['喷头歧管至指定回墨箱', '保留维护抽出模块所需的长度，沿机架安排支撑，避免打开检修门时牵拉歧管。', '在规定打印工况下核对喷头压力和回墨流量，停机后检查重新启动时的回墨。'],
            ['清洗液桶、维护站和废墨桶', '分别标出清洗液入口和废墨出口，标记同时放在桶侧和固定侧。', '模拟一次换桶和清洗，确认新液进入维护站，废液进入对应容器。'],
          ],
        },
      ],
    },
    {
      id: 'inkjet-connection-selection',
      title: '按固定配管和维护拆装选择喷墨墨路连接',
      tocLabel: '按连接任务选型',
      blocks: [
        {
          type: 'paragraph',
          text: '泵出口到过滤器的固定管段，若两端都是配套的平底密封端口，可按端口图比较恒永达 FEP 法兰管组件的翻边与螺纹；若滤器自带倒刺，则按软管内径和倒刺尺寸配管。固定墨路与管组件指南给出了两端接口的记录方法。经常拆下的墨桶，可按墨桶更换与维护快接指南选截止方式。CPC 与 HP 在调压组件至喷头的可拆连接上分别考察了断开溢墨和复接进气，换桶接口也应分开测这两项。',
          inlineLinks: [{ text: fixedInkLines.label, href: fixedInkLines.href }, { text: inkTankQuickDisconnects.label, href: inkTankQuickDisconnects.href }],
          references: ['assembly-range', 'barbed-selection', 'ink-quick-connects'],
        },
        {
          type: 'links',
          items: [
            productLink(inkLineAssemblies[0], '用于端口配套的固定输墨段，按两端螺纹、密封面和成品长度配置。'),
            productLink(barbedFittings, '连接柔性墨管，按软管内径配倒刺，并验证吸入侧密封或承压侧抗拔。'),
            productLink(quickConnectFittings, '用于拆卸墨桶或维护模块，按断开后仍存墨的一侧选择截止端。'),
          ],
        },
      ],
    },
    {
      id: 'inkjet-connection-materials',
      title: '一条管路先后接触油墨和清洗液，材料怎样确认',
      tocLabel: '两种介质与接液件',
      blocks: [
        {
          type: 'paragraph',
          text: '取实际墨水和指定清洗液的材料资料，分别列出两者会接触的管内壁、接头、阀件和密封圈。Saint-Gobain 的印刷选管表把输送管与泵管分开，还按具体稀释剂评价管材。这种区分在机器上同样有用：即使墨水长期留在管内没有异常，维护时换入另一种清洗液，仍可能使密封件尺寸变化。可先用材料相容性查询缩小候选，再以实际介质、温度和停留时间做接触试验，随后装回管路检查流量与密封。',
          inlineLinks: [{ text: '材料相容性查询', href: '/en/resources/material-compatibility/' }],
          references: ['printing-tubing'],
        },
      ],
    },
  ],
  relatedProducts: [...inkLineAssemblies.slice(0, 1), barbedFittings, quickConnectFittings],
  references: connectionReferences,
  keywords: connectionKeywords,
});

const inkjetFixedInkLinesPageZh = makeInkjetPage({
  href: fixedInkLines.href,
  image: recirculation.image,
  kind: 'task',
  title: '工业喷墨固定墨路的管组件选型',
  navLabel: fixedInkLines.label,
  description: '更换固定供墨管，先量泵端和过滤器端的接口，再记录旧管的内径、外径与成品长度。外径合适说明有机会装入接头；内径和长度才决定这一段可储存多少墨、在目标流量下要克服多少阻力。',
  sections: [
    {
      id: 'inkjet-fixed-line-connections',
      title: '固定墨路的管材与两端接口怎么匹配',
      tocLabel: '管材与端口',
      blocks: [
        {
          type: 'paragraph',
          text: '把泵出口记作 A 端、过滤器入口记作 B 端，分别抄录螺纹制式、密封面和端口图号。相同螺纹可以旋入，密封端面和压紧位置仍可能不同。平底端口按设备图评估翻边管组件；卡箍或卡环端接按各自配套的接头、压紧件与管外径选。若一端是软管倒刺接口，按软管内径配倒刺，并核对软管壁厚、硬度和装配后的抗拔表现。',
          inlineLinks: [{ text: '翻边管组件', href: '/en/resources/technical-articles/flanged-tubing-assemblies-selection-guide/' }, { text: '软管倒刺接口', href: barbedFittings.href }],
          references: ['assembly-range', 'barbed-selection'],
        },
        {
          type: 'links',
          items: [
            productLink(inkLineAssemblies[0], '端口靠翻边端面密封时，按螺纹和密封面图核对 FEP 管端。'),
            productLink(inkLineAssemblies[1], '采用卡环式端口时，按 PFA 管外径与配套卡环选尺寸，核对接头夹持位置。'),
            productLink(inkLineAssemblies[2], '原机采用卡箍端接时，用 PTFE 管外径、压紧件和端口图核对装配。'),
          ],
        },
        {
          type: 'paragraph',
          text: '在机架上沿实际走管路径量长度，给检修抽拉和管端留出空间，检查最小弯曲位置有无压扁或拉住接口。需要两端不同螺纹时，可在管组件配置器里分别指定 A/B 端，把成品长度和两端结构存入同一张图纸，供装机和下一次更换复核。',
          inlineLinks: [{ text: '管组件配置器', href: '/en/products/tubing-assemblies/flanged-tubing/details/' }],
        },
      ],
    },
    {
      id: 'inkjet-fixed-line-volume',
      title: '加大管内径如何影响补墨和换色',
      tocLabel: '存墨量与流阻',
      blocks: [
        {
          type: 'paragraph',
          text: '以一段长 1 m 的圆直管为例，按截面积乘以管长计算，内径 2 mm 时存墨约 3.14 mL，改为 3 mm 后约 7.07 mL。较粗的管段通常能降低同一流量下的沿程压降，却多存约 3.93 mL 墨。若它属于共用换色段，首批流出的液体仍可能与旧墨混合。这个算例只含直管几何体积，实际置换量还取决于接头、阀腔和出口允许的残色。',
        },
        {
          type: 'paragraph',
          text: '补墨慢时，先用流阻计算器比较现有内径、长度和油墨工作黏度，再核对接头最窄处、过滤器及墨箱高度差。若供墨过滤器两端的压差随使用时间升高，单纯加粗直管对该处阻力帮助有限。更换后的判据是副墨箱能否在设备允许时间内恢复液位。',
          inlineLinks: [{ text: '流阻计算器', href: '/en/resources/calculators/fluid-resistance/' }, { text: '供墨过滤器', href: inkFiltration.href }],
        },
      ],
    },
    {
      id: 'inkjet-fixed-line-verification',
      title: '固定墨路如何验证装机流量与接头密封',
      tocLabel: '流量与密封验证',
      blocks: [
        {
          type: 'paragraph',
          text: '用相同油墨、温度、液位和泵设定比较更换前后的接收端流量。对吸入侧接头，同时观察运行时是否反复进气；对承压段，检查接头密封面及管端有无渗墨。对白墨循环支路，在实际待机时长后复测回墨流量，观察新增弯段或低位积墨处。若问题只在清洗后出现，按实际清洗液和接触时长复核管端、压紧件和密封圈，再复测同一工作点。',
          inlineLinks: [{ text: '白墨循环支路', href: recirculationZh.href }],
          references: ['printing-tubing'],
        },
      ],
    },
  ],
  relatedProducts: [...inkLineAssemblies, barbedFittings],
  references: connectionReferences,
  keywords: connectionKeywords,
});

const inkjetQuickDisconnectsPageZh = makeInkjetPage({
  href: inkTankQuickDisconnects.href,
  image: cleaning.image,
  kind: 'task',
  title: '工业喷墨墨桶更换与维护快插接头选型',
  navLabel: inkTankQuickDisconnects.label,
  description: '换墨桶有两个容易漏看的时刻：拔开时，桶口或机器端是否继续出墨；插回时，供墨管里是否带入空气。把这两个动作和恢复打印的允许时间定下来，才能选公母端、截止方式和安装位置。',
  sections: [
    {
      id: 'inkjet-coupling-selection',
      title: '墨桶快插接头如何选管径和截止方式',
      tocLabel: '管径与截止',
      blocks: [
        {
          type: 'paragraph',
          text: '先看拆开后的两段管子。桶端还有墨柱、机器端由现有阀可靠隔离时，可以评估只在桶侧截止。若机器侧也会因液位差滴墨，或拔开后需要保留已预充的墨柱，应评估两端各带截止阀。双侧关闭后，两端接合面之间仍可能留有液滴，允许残液量要在实际换桶操作中测定。',
          references: ['ink-quick-connects', 'quick-connect-range'],
        },
        {
          type: 'paragraph',
          text: '以 1.6 mm 内径软管的穿板连接为例，可配对评估 Q2001-PNV-SPPE 直通带阀公端和 Q2001-SMV-SPPE 穿板带阀母端。两款均为 PP 本体、EPDM 密封。先核对实际墨水和清洗液，再核对机板厚度、开孔和拔插空间。若目标管径不同，可在快插接头选型页重新筛选同一系列的一对公母端。',
          inlineLinks: [
            { text: 'Q2001-PNV-SPPE', href: '/en/products/fittings/quick-connect-fittings/q2001-pnv-sppe/' },
            { text: 'Q2001-SMV-SPPE', href: '/en/products/fittings/quick-connect-fittings/q2001-smv-sppe/' },
            { text: '快插接头选型页', href: quickConnectFittings.href },
          ],
        },
        {
          type: 'links',
          items: [
            productLink(quickConnectFittings, '按换桶位置比较尾端连接形式，再按软管内径、安装方式和两侧截止要求配对公母端。'),
          ],
        },
        {
          type: 'paragraph',
          text: '1.6 mm 指示例软管的内径。带阀公母端串联后，阀内通道也会产生阻力。用相同介质和温度，在目标流量下读取整对快插接头的压降；装在泵入口时，再以墨桶最低工作液位测补墨时间。这样能在订样前明确，是管径、阀组合还是安装空间决定下一档候选。',
          inlineLinks: [{ text: '快插接头的压降', href: '/en/resources/technical-articles/quick-disconnect-coupling-flow-pressure-drop/' }],
        },
      ],
    },
    {
      id: 'inkjet-coupling-verification',
      title: '墨桶快插接头如何验证更换和恢复供墨',
      tocLabel: '更换与恢复',
      blocks: [
        {
          type: 'table',
          caption: '用一次完整换桶确定接口是否合适',
          headers: ['操作阶段', '现场记录', '观察结果怎么用'],
          rows: [
            ['断开', '按设备维护程序停泵、隔离并释放该段压力，分别收集桶侧与机器侧滴出的墨。', '一次性的端面液滴与持续出墨分开记录。持续出墨时检查对应侧的截止配置与阀口是否闭合。'],
            ['复接与预充', '确认锁扣到位，按设备规定预充，在允许观察的管段或检测点记录气泡出现的时间和持续情况。', '复接瞬间出现的气段可与启动后仍反复进入的气泡区分；后者应沿吸入端逐段检查密封和软管受力。'],
            ['恢复打印', '用相同墨水和打印程序记录达到稳定供墨所需的时间，比较首次和持续打印后的喷嘴检查图。', '首次测试恢复后仍反复缺线时，记录液位、补墨动作和气泡出现顺序，便于区分管路与其他故障。'],
          ],
        },
        {
          type: 'paragraph',
          text: '把换桶记录与供墨与补墨指南中的副墨箱恢复时间对照。如果恢复慢只发生在安装新接头之后，优先比较这对接头前后的工作流量；若发生在清洗后，沿清洗液切换与支路隔离的路径检查阀位和废墨去向。',
          inlineLinks: [{ text: '供墨与补墨指南', href: supplyZh.href }, { text: '清洗液切换与支路隔离', href: cleaningFluidSwitching.href }],
        },
      ],
    },
  ],
  relatedProducts: [quickConnectFittings],
  references: connectionReferences,
  keywords: connectionKeywords,
});

export const inkjetConnectionTaskPagesZh = [inkjetFixedInkLinesPageZh, inkjetQuickDisconnectsPageZh] as const;

const flowControlPageOptions = {
  keywords: ['工业喷墨', '供墨过滤', '墨路止回', '清洗液切换', '流路隔离'],
  contactDescription: '请提供墨路图、喷头允许压力、实际油墨和清洗液、工作流量、压差与停泵条件。并列支路请注明阀位、断电状态和废液去向，便于核对相关部件。',
};

export const inkjetFlowControlPageZh = makeInkjetPage({
  ...flowControlPageOptions,
  href: flowControlGuideLink.href,
  image: supply.image,
  kind: 'overview',
  title: '工业喷墨墨路的过滤、止回与流路控制',
  navLabel: flowControlGuideLink.label,
  description: '副墨箱补墨慢、停机后墨水倒流、清洗液进入了错误支路，分别要看阻力、流动方向和阀位。沿发生问题的这段管路找部件，才能判断要改滤器、加止回阀，还是改变清洗路径。',
  sections: [
    {
      id: 'inkjet-flow-control-positions',
      title: '从墨箱到维护站，哪里需要过滤或控制流向',
      tocLabel: '部件安装位置',
      blocks: [
        {
          type: 'paragraph',
          text: '在设备墨路图上标出主墨箱、副墨箱、喷头和维护站。打印时顺着供墨方向画一遍，停泵后再按两端液位和压力判断墨水可能往哪里走。带回墨的设备还要单独画出正常回墨方向，避免把设计需要的循环当成倒流。',
          inlineLinks: [
            { text: '设备墨路图', href: industrialInkjetPrinting.guide.href },
            { text: '正常回墨方向', href: recirculationZh.href },
          ],
        },
        {
          type: 'table',
          caption: '同一台设备中的三种控制任务',
          headers: ['出现问题的位置', '部件承担的任务', '选型前先取得的条件'],
          rows: [
            ['主墨箱到副墨箱途中带入颗粒', '采用 3.2 mm 内径软管时，可评估 F-PE-60-32-PP-N 作上游粗滤。喷头入口的末级过滤另按喷头要求选取。', '油墨体系、需要截留的颗粒、目标流量和允许压降'],
            ['停泵后，两只墨箱之间出现逆流', 'CV-BE-32-PP-N 膜片式单向阀可用于评估补墨管的逆流控制。加阀后还要测正向补墨用时。', '正常流向、两端液位差、最小正向驱动力、允许倒流量'],
            ['维护液需要在两条支路之间切换', 'SV10-B16-3 三通倒刺阀可在公共口与两个支口之间换路。先在端口图上确认失电时仍连通的一路。', '液源、公共口、废液口、正常动作及失电阀位'],
          ],
          inlineLinks: [
            { text: 'F-PE-60-32-PP-N', href: inkFilter.href },
            { text: 'CV-BE-32-PP-N', href: inkCheckValve.href },
            { text: 'SV10-B16-3', href: sv10ThreeWayBarbed.href },
          ],
          references: ['digital-printing-filtration', inkFilter.id, inkCheckValve.id, 'foreach-sv10'],
        },
        {
          type: 'links',
          items: [
            productLink(pressureSensorCard, '做滤器压降试验时，按滤前、滤后两个测点的绝对压力及所需精度选择量程。'),
            productLink(sv10ThreeWayBarbed, '清洗支路采用软管时，对照三个倒刺端口安排走管，并核对断电后的液体去向。'),
          ],
        },
      ],
    },
    {
      id: 'inkjet-flow-control-tasks',
      title: '按症状确定先查哪一段',
      tocLabel: '供墨与维护排查',
      blocks: [
        {
          type: 'paragraph',
          text: '若补墨超时只出现在持续打印期间，可先在相同墨温和流量下比较新旧滤器的前后压差。若停泵后液位下降，重新启动又需要很久才出墨，应同时观察停机期间墨水流向哪里。供墨过滤与止回给出两种试验的测点和判读方法。',
          inlineLinks: [{ text: inkFiltration.label, href: inkFiltration.href }],
        },
        {
          type: 'paragraph',
          text: '如果维护指令已完成，废液瓶却没有收液，先观察清洗液是否到达维护站。已经到液，沿喷头清洗与废墨排放检查帽站至废液容器的抽排；始终没有到液，按清洗液切换与支路隔离逐个核对端口。这样可把同一次清洗周期里的供液故障和排废故障分开。',
          inlineLinks: [
            { text: cleaningZh.title, href: cleaningZh.href },
            { text: cleaningFluidSwitching.label, href: cleaningFluidSwitching.href },
          ],
          references: ['mimaki-ujf-maintenance'],
        },
      ],
    },
    {
      id: 'inkjet-flow-control-commissioning',
      title: '改动一个部件后，怎样确认整条支路仍能工作',
      tocLabel: '改动后的验收',
      blocks: [
        {
          type: 'paragraph',
          text: '用同一批墨水、同一温度和墨箱高度，分别保留改动前后的记录。供墨支路比较规定时间内实际补入的墨量、停泵后的反向流动和重启到墨时间。改变软管内径或接头通径也会改变阻力，调整固定墨路与管组件时，把相应尺寸一并记下。',
          inlineLinks: [
            { text: '实际补入的墨量', href: supplyZh.href },
            { text: fixedInkLines.label, href: fixedInkLines.href },
          ],
        },
        {
          type: 'paragraph',
          text: '清洗支路分别记录入口耗液量、到达维护站的时间和废液瓶的收集量。清洗帽浸泡与排废可能处在不同阶段，先与本机时序对齐，再判断哪个位置的量异常。把阀位、液量和第一次恢复打印的结果留在同一份记录里，便于维护后复查。',
        },
      ],
    },
  ],
  relatedProducts: [solenoidValveCard, pressureSensorCard],
});

const inkjetFiltrationPageZh = makeInkjetPage({
  ...flowControlPageOptions,
  href: inkFiltration.href,
  image: supply.image,
  kind: 'task',
  title: '工业喷墨设备的供墨过滤与止回选型',
  navLabel: inkFiltration.label,
  description: '从主墨箱向副墨箱补墨时，先测油墨通过滤器后的实际流量。若停泵后液位下降，再检查墨水的流向和两端液位差。把运行与停机时的记录对照起来，就能判断该查滤器阻力，还是该在回流位置评估单向阀。',
  sections: [
    {
      id: 'inkjet-filter-and-check-valve-selection',
      title: '上游过滤与喷头入口过滤怎样分工',
      tocLabel: '滤器位置与规格',
      blocks: [
        {
          type: 'paragraph',
          text: '先向喷头和油墨供应方取得允许的过滤配置。上游滤器承接系统带入的杂质，喷头近端的末级滤器保护其后很短的一段墨路；两者的容污量和截留要求可以不同。比较滤器时，连同截留效率、测试条件和滤材一起看。仅凭微米数无法判断两种滤器是否等效。',
          references: ['digital-printing-filtration'],
        },
        {
          type: 'paragraph',
          text: '恒永达 F-PE-60-32-PP-N 使用 HDPE 滤材和 PP 壳体，标示过滤精度为 40–60 μm，接 3.2 mm 内径软管。可把它列入上游粗滤候选，再核对目标粒径的实际截留效果。喷头入口仍应遵循图纸指定的型号、过滤效率或粒径要求。对颜料墨，还要与油墨供应方确认要保留的颜料分散体和要截留的团聚物。',
          inlineLinks: [{ text: 'F-PE-60-32-PP-N', href: inkFilter.href }],
          references: [inkFilter.id, 'digital-printing-filtration'],
        },
      ],
    },
    {
      id: 'inkjet-filter-pressure-verification',
      title: '补墨变慢，怎样确定阻力是否来自滤器',
      tocLabel: '滤器压降与补墨',
      blocks: [
        {
          type: 'paragraph',
          text: '在滤器紧邻的上游和下游各取压力，前者减后者就是该段压降。新滤器装机时记录油墨温度、实际流量、两端压力和补墨时间。后续对比应保持测点、温度和流量一致；只看泵出口的一个数，会把管路、接头和阀的阻力也算进去。使用 PDM5 压力检测模块时，按测点绝对压力和要区分的最小压差核对量程与误差。',
          inlineLinks: [{ text: inkPressureSensor.title, href: inkPressureSensor.href }],
          references: [inkPressureSensor.id, 'digital-printing-filtration'],
        },
        {
          type: 'links',
          items: [productLink(pressureSensorCard, '滤前、滤后分别测得绝对压力后再求差。选量程时要核对两个测点的误差能否分辨预期的压降变化。')],
        },
        {
          type: 'table',
          caption: '在同一工况下比较测点和补墨结果',
          headers: ['实测现象', '优先复核', '复核后的判断'],
          rows: [
            ['相同流量下滤器压降升高', '按设备规定换入同配置洁净滤器复测压降，再用原补墨程序计时。', '若压降和补墨时间都回到基线，滤器负载可能是本次超时的原因。结合多次记录确定维护时机。'],
            ['滤器压降接近基线，补墨仍慢', '检查墨箱通气、吸入段折弯、接头进气、阀位和高度差。', '按供墨与补墨复测实际补墨量，再决定是否需要调整泵。'],
          ],
          inlineLinks: [{ text: supplyZh.title, href: supplyZh.href }],
        },
      ],
    },
    {
      id: 'inkjet-stop-and-restart-check',
      title: '停泵后液位下降，要不要加单向阀',
      tocLabel: '倒流与重启试验',
      blocks: [
        {
          type: 'paragraph',
          text: '有副墨箱的机器，先查液体实际回到了哪里，同时排除继续耗墨和外漏。确认沿补墨管逆流后，可评估 CV-BE-32-PP-N。该型号采用 EPDM 膜片与 PP 壳体，接 3.2 mm 内径软管。按实物流向安装，向供应方核对开启压差和允许反压，再用目标油墨及清洗液复核密封与通流。',
          inlineLinks: [{ text: 'CV-BE-32-PP-N', href: inkCheckValve.href }],
          references: [inkCheckValve.id],
        },
        {
          type: 'paragraph',
          text: '先在设备允许的最不利反向液位差下停泵，记录静置时长和实际倒回量。再在正向驱动力最小的工况重启，记录副墨箱首滴到达时间和补墨时间。两项都满足设计目标，才可接受这只阀。若要求在停机时同时阻断两个方向，可按清洗液切换与支路隔离的阀位方法核对主动关断。',
          inlineLinks: [{ text: cleaningFluidSwitching.label, href: cleaningFluidSwitching.href }],
        },
      ],
    },
  ],
  relatedProducts: [pressureSensorCard],
});

const inkjetCleaningFluidSwitchingPageZh = makeInkjetPage({
  ...flowControlPageOptions,
  href: cleaningFluidSwitching.href,
  image: cleaning.image,
  kind: 'task',
  title: '工业喷墨清洗液切换与支路隔离选型',
  navLabel: cleaningFluidSwitching.label,
  description: '维护站需要把清洗液送到指定位置，并在程序要求的时刻把废液送入废液瓶。选阀前先弄清每一步哪两个端口相通，以及突然断电时哪一条支路仍可能有液体流动。',
  sections: [
    {
      id: 'inkjet-cleaning-solenoid-selection',
      title: '先画维护阀位，再选二通或三通',
      tocLabel: '阀位与端口',
      blocks: [
        {
          type: 'paragraph',
          text: '以带清洗帽的维护站为例，清洗液到达帽位、喷嘴面浸洗和帽下管路排废可以是不同动作。Mimaki UJF MkII 系列手册就分别设置了喷嘴清洗和排墨通道清洗。画本机时序时，把液源选择和废液去向分作两栏，注明哪一段由阀控制、哪一段靠泵抽吸。',
          references: ['mimaki-ujf-maintenance'],
        },
        {
          type: 'table',
          caption: '按端口功能选择恒永达 SV10 配置',
          headers: ['通路需求', '选型方向', '在安装图上标出的状态'],
          rows: [
            ['失电时切断清洗液供给', 'SV10-P-2NC 二通常闭基板阀', '从基板进液口沿通道查到清洗帽。在最高工作液位差下断电，观察下游是否仍有液体进入。'],
            ['失电时指定支路需要保持连通', 'SV10-P-2NO 二通常开基板阀', '标明失电后连通的两端，核对两侧液位差会把液体送往何处。'],
            ['两个支路与同一个公共口交替连通', 'SV10-B16-3 三通倒刺阀', '核对公共口、允许流向和压差。若停机要求同时关断两个支路，还要安排独立隔离。'],
          ],
          inlineLinks: [
            { text: 'SV10-P-2NC', href: '/en/products/valves/solenoid-valves/2-way-nc-base/' },
            { text: 'SV10-P-2NO', href: '/en/products/valves/solenoid-valves/2-way-no-base/' },
            { text: 'SV10-B16-3', href: sv10ThreeWayBarbed.href },
          ],
          references: ['foreach-sv10'],
        },
        {
          type: 'links',
          items: [productLink(sv10ThreeWayBarbed, '现场用软管接入维护站时，先按端口图标记公共口及两个支口，再分别验证通电、断电的到液位置。')],
        },
        {
          type: 'paragraph',
          text: '按 SV10 阀型与连接说明核对基板或管接端、端口方向和膜片配置。把实际油墨、维护液、两者混合后的接触时间与温度列在同一张材料清单上。阀装在泵吸入侧还是排出侧，会改变阀口承受的压力，选定后用完整接管测一次供液时间。',
          inlineLinks: [{ text: 'SV10 阀型与连接说明', href: '/en/resources/installation-guide/sv10-solenoid-valve-overview/' }],
          references: ['foreach-sv10', 'inkjet-solenoid-valves'],
        },
      ],
    },
    {
      id: 'inkjet-cleaning-multiport-valves',
      title: '两种液体共用管路，切换后还要排出多少',
      tocLabel: '共用管段与残液',
      blocks: [
        {
          type: 'paragraph',
          text: '多个液瓶依次供给同一维护口时，可评估 MRV3 多通道旋转阀。把公共口到接收位置之间的阀腔、接头和固定管段列出来，按实际内径与长度估算存液量。例如内径 2 mm、长 0.5 m 的直管约存液 1.57 mL，尚未计入阀腔和接头。这个数可用于安排首次取样，最终置换量要由出口残留测定。',
          inlineLinks: [
            { text: 'MRV3 多通道旋转阀', href: '/en/products/valves/rotary-valves/' },
            { text: '固定管段', href: fixedInkLines.href },
          ],
          references: ['foreach-mrv3'],
        },
        {
          type: 'paragraph',
          text: '在允许取样的维护出口或测试台分段收集切换后的液体，记录每段体积。对有色残墨可按经校准的颜色或吸光度判据比较；两种无色液体则选用能区分配方的指标。若在允许的耗液量内仍达不到残留要求，可缩短公共段，或让相互影响的液源各走独立支路。',
        },
      ],
    },
    {
      id: 'inkjet-cleaning-valve-verification',
      title: '从维护到恢复打印，怎样确认液路已切换到位',
      tocLabel: '断电与恢复验证',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            '供液时在维护站确认到液量和到达时间，同时观察未选支路。阀有动作而帽位无液时，先按端口图核对液源、公共口和泵的方向。',
            '排废时到废液瓶确认收集量与完成时间；帽位已到液但排不净，沿喷头清洗与废墨排放检查帽下接管、抽排泵和废液容器。',
            '在台架上分别复现计划停机和失电，保留实际液位差，记录各口去向与可能的串液。按设备复位程序重新供墨，检查第一张喷嘴测试图和维护后首批打印是否达到项目验收要求。',
          ],
          inlineLinks: [{ text: cleaningZh.title, href: cleaningZh.href }],
        },
      ],
    },
  ],
  relatedProducts: [solenoidValveCard],
});

export const inkjetFlowControlTaskPagesZh = [inkjetFiltrationPageZh, inkjetCleaningFluidSwitchingPageZh] as const;

export const inkjetChildPagesZh = [
  inkjetEquipmentPageZh,
  inkjetSupplyPageZh,
  inkjetRecirculationPageZh,
  inkjetCleaningPageZh,
  inkjetConnectionGuidePageZh,
  ...inkjetConnectionTaskPagesZh,
  inkjetFlowControlPageZh,
  ...inkjetFlowControlTaskPagesZh,
] as const;
