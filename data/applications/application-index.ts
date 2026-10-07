import type { EnglishApplicationKind } from './application-english';
import { applicationArticleHref } from './application-article-links';

export const applicationIndexPath = '/en/applications/';

type ApplicationArea = {
  kind: EnglishApplicationKind;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  topics: { label: string; href: string }[];
};

const topic = (kind: EnglishApplicationKind, group: string, label: string) => ({
  label,
  href: applicationArticleHref(kind, group),
});

export const applicationAreas: readonly ApplicationArea[] = [
  {
    kind: 'ivd', title: '体外诊断 IVD',
    description: '了解诊断仪器中样本与试剂计量、清洗和废液处理的液路应用。',
    image: '/images/applications/application-ivd-960.webp', imageAlt: '体外诊断仪器应用场景',
    topics: [topic('ivd','clinical','生化分析'),topic('ivd','immunoassay','免疫分析'),topic('ivd','hematology','血液分析'),topic('ivd','coagulation','凝血分析'),topic('ivd','molecular','分子诊断')],
  },
  {
    kind: 'life-science', title: '生命科学',
    description: '围绕核酸、细胞与蛋白的处理，了解液体转移、产物回收和污染控制。',
    image: '/images/applications/application-life-science-960.webp', imageAlt: '生命科学实验与样本处理场景',
    topics: [topic('life-science','genomics','核酸处理'),topic('life-science','cellCulture','细胞培养'),topic('life-science','protein','蛋白与抗体处理')],
  },
  {
    kind: 'lab-automation', title: '实验室自动化',
    description: '从移液、孔板与分装平台出发，了解工位供排液、任务衔接和异常恢复。',
    image: '/images/applications/application-lab-automation-960.webp', imageAlt: '实验室自动化液体处理平台场景',
    topics: [topic('lab-automation','pipetting','移液工作站'),topic('lab-automation','microplate','孔板操作'),topic('lab-automation','reagentDispensing','试剂分装'),topic('lab-automation','samplePrep','样本准备')],
  },
  {
    kind: 'analytical-instruments', title: '分析仪器',
    description: '了解分析单元中的样品引入、试剂计量和路径切换，以及对应的方法验证。',
    image: '/images/applications/application-analytical-instruments-960.webp', imageAlt: '分析仪器与样品分析实验室场景',
    topics: [topic('analytical-instruments','chromatography','液相色谱'),topic('analytical-instruments','spectroscopy','光谱与元素分析'),topic('analytical-instruments','waterQuality','水质分析'),topic('analytical-instruments','samplePrep','分析前处理')],
  },
  {
    kind: 'environmental-monitoring', title: '环保监测',
    description: '关注现场取送样、预处理和长期维护，连接样品来源与分析接口。',
    image: '/images/application-center/water-quality-online-monitoring.webp', imageAlt: '在线水质监测设备应用场景',
    topics: [topic('environmental-monitoring','waterQuality','在线水质'),topic('environmental-monitoring','wastewater','工业废水'),topic('environmental-monitoring','gasPretreatment','样气处理'),topic('environmental-monitoring','samplingPrep','环境样品准备')],
  },
  {
    kind: 'synthetic-biology', title: '合成生物',
    description: '围绕构建筛选、培养补料和在线采样，了解过程中的液体操作与物料记录。',
    image: '/images/applications/application-synthetic-biology-960.webp', imageAlt: '合成生物与培养过程应用场景',
    topics: [topic('synthetic-biology','microBioreactor','微型反应器'),topic('synthetic-biology','biofoundry','Biofoundry'),topic('synthetic-biology','feedingControl','连续补料'),topic('synthetic-biology','onlineSampling','在线采样')],
  },
];

export const applicationChoices = [
  { title: '水质项目', routes: [
    { label: '现场采样、输送与维护', kind: 'environmental-monitoring', domain: '环保监测' },
    { label: '分析单元内的计量与反应', kind: 'analytical-instruments', domain: '分析仪器' },
  ] },
  { title: '核酸与细胞项目', routes: [
    { label: '用于诊断仪器的检测流程', kind: 'ivd', domain: '体外诊断' },
    { label: '研究样本的处理与回收', kind: 'life-science', domain: '生命科学' },
  ] },
  { title: '自动化与培养项目', routes: [
    { label: '移液、孔板与平台任务执行', kind: 'lab-automation', domain: '实验室自动化' },
    { label: '构建筛选、补料与过程采样', kind: 'synthetic-biology', domain: '合成生物' },
  ] },
] as const;
