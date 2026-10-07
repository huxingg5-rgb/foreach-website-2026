import type { ApplicationDocument } from './analytical-documents/types';
import type { EnglishApplicationKind } from './application-english';
import { reviewTopics } from './english-review-topics';
import { reviewGuideStructures } from './english-review-structure';
import { PISTON_PRODUCT_LINKS } from './analytical-documents/piston-link-network';

// Curated application relationships, not a category-wide automatic fallback.
// A representative card opens the family page so capacity/material remain choices.
export const reviewProductCards = {
  ea: { title: 'EA 常规柱塞泵', href: PISTON_PRODUCT_LINKS.eaSeries, image: '/images/products/pumps/plunger-pump/ea/pump-ea-500ul-pmma.webp', family: 'pistonPump' },
  sm: { title: 'SM 微型柱塞泵', href: PISTON_PRODUCT_LINKS.smSeries, image: '/images/products/pumps/plunger-pump/sm/pump-sm-100ul-pmma.webp', family: 'pistonPump' },
  tm: { title: 'TM 超微型柱塞泵', href: PISTON_PRODUCT_LINKS.tmSeries, image: '/images/products/pumps/plunger-pump/tm/pump-tm-100ul-pmma.webp', family: 'pistonPump' },
  hld: { title: 'HLD 旋转阀注射泵', href: '/en/products/pumps/syringe-pumps/rotary-valve-syringe-pumps/', image: '/images/products/pumps/syringe-pumps/foreach-hld3-rotary-valve-syringe-pump.webp', family: 'syringePump' },
  hmd: { title: 'HMD 电磁阀注射泵', href: '/en/products/pumps/syringe-pumps/solenoid-valve-syringe-pumps/', image: '/images/products/pumps/syringe-pumps/foreach-hmd3-solenoid-valve-syringe-pump.webp', family: 'syringePump' },
  smtp: { title: 'SMTP 空气置换移液泵', href: '/en/products/pumps/pipetting-pumps/', image: '/images/products/pumps/pipetting-pumps/smtp2-1000ul.webp', family: 'pipettingPump' },
  rpl: { title: 'RPL 无阀计量泵', href: '/en/products/pumps/valveless-metering-pump/', image: '/images/products/pumps/valveless-pumps/foreach-rpl-p4-valveless-pump.webp', family: 'valvelessPump' },
  dpl30: { title: 'DPL30 液体隔膜泵', href: '/en/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump/', image: '/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-main.webp', family: 'diaphragmPump' },
  dpl60: { title: 'DPL60 液体隔膜泵', href: '/en/products/pumps/miniature-diaphragm-pumps/dpl60-liquid-diaphragm-pump/', image: '/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushed-liquid-diaphragm-pump-main.webp', family: 'diaphragmPump' },
  dpl30h: { title: 'DPL30H 高背压液体隔膜泵', href: '/en/products/pumps/miniature-diaphragm-pumps/dpl30h-liquid-diaphragm-pump/', image: '/images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushed-liquid-diaphragm-pump-main.webp', family: 'diaphragmPump' },
  dpgl: { title: 'DPGL800 气液混合隔膜泵', href: '/en/products/pumps/miniature-diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/', image: '/images/products/pumps/diaphragm-pumps/dpgl800/images/dpgl800-gas-liquid-diaphragm-pump-main.webp', family: 'gasLiquidPump' },
  mrv: { title: 'MRV3 多通道旋转阀', href: '/en/products/valves/rotary-valves/', image: '/images/products/valves/rotary-valves/foreach-rotary-valve-main.webp', family: 'rotaryValve' },
  hp: { title: 'HP 高压进样阀', href: '/en/products/valves/high-pressure-valves/hp/', image: '/images/products/valves/high-pressure-valves/foreach-high-pressure-valve-main.webp', family: 'highPressureValve' },
  sv: { title: 'SV10 电磁阀', href: '/en/products/valves/solenoid-valves/', image: '/images/products/valves/solenoid-valves/foreach-solenoid-valve-main.webp', family: 'solenoidValve' },
  sampling: { title: '定制采样针', href: '/en/products/probes/sampling-probes/', image: '/images/products/probes/sampling-probes/foreach-sampling-probe-main.webp', family: 'sampleNeedle' },
  washing: { title: '定制清洗针', href: '/en/products/probes/wash-probes/', image: '/images/products/probes/wash-probes/foreach-wash-probe-main.webp', family: 'sampleNeedle' },
  mixing: { title: '定制搅拌桨', href: '/en/products/probes/stirring-paddles/', image: '/images/products/probes/stirring-paddles/foreach-stirring-paddle-main.webp', family: 'sampleNeedle' },
  abd: { title: 'ABD 气泡检测模块', href: '/en/products/control/air-bubble-detectors/abd/', image: '/images/products/control/foreach-abd-air-bubble-detector.webp', family: 'sensors' },
  pdm: { title: 'PDM5 压力检测模块', href: '/en/products/control/pdm5-pressure-sensor/', image: '/images/products/control/foreach-pdm5-pressure-sensor.webp', family: 'sensors' },
  fittings: { title: '硬管接头', href: '/en/products/fittings/hard-tube-fittings/', image: '/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pv-n-main.jpg', family: 'fittings' },
  tubing: { title: '管路材料与尺寸', href: '/en/products/tubing/', image: '/images/products/tubing/peek-tubing/peek-tubing-main.webp', family: 'tubing' },
  filters: { title: 'PE 系列过滤器', href: '/en/products/fittings/filters/f-pe-60-32-pp-n/', image: '/images/products/fittings/filters/products/f-pe-60-32-pp-n-main.jpg', family: 'filters' },
  check: { title: 'G 系列单向阀', href: '/en/products/fittings/filters/', image: '/images/products/fittings/filters/products/g-178-32-pa-v-main.jpg', family: 'checkValve' },
} as const;
export type ReviewProductCardId = keyof typeof reviewProductCards;
export const reviewProductGates: Record<ReviewProductCardId, [string,string]> = {
  ea:['有限行程计量','按常用剂量、循环总位移与接液材料比较配置'],
  sm:['紧凑安装的离散计量','先核对安装空间，再验证工作剂量和实际准确性'],
  tm:['空间受限的离散计量','先核对安装空间与配置，再测真实交付；超微型结构不代表更小的可靠剂量'],
  hld:['带旋转阀的吸取、保持与推出','核对来源和出口的阀位、容量预算与补液时点'],
  hmd:['带电磁阀的吸排计量','核对开闭及断电状态、工作量与补液周期'],
  smtp:['一次性吸头空气置换','吸头密封、液体类别与运动需共同验证'],
  rpl:['适用的重复或连续计量','按排量、速度、真实背压及启停比较；双路比例另外核查'],
  dpl30:['液体供给或辅助循环','按装机阻力、真实洗液或工作液及任务窗口选型'],
  dpl60:['液体供给或辅助循环','由峰值需求与装机工作点判断，不仅比较自由流量'],
  dpl30h:['需要较高背压能力的液体支路','先核算压力预算和真实流量，再确认接口及材料'],
  dpgl:['适用气液混合抽吸或容器真空支路','确认入口介质和排废架构，不用于100%纯液连续输送'],
  mrv:['多来源选择','按10、16、24通与端口图比较；高压适用性另行核查'],
  hp:['受压进样路径切换','按装载、注入及其他状态核对端口压力和定量环'],
  sv:['通断或支路选择','核对常态、压差、流向和通电周期；高压任务需另选适用配置'],
  sampling:['来源容器与液路之间的取样接口','按最低液位、针口间隙和真实样本比较定制几何'],
  washing:['内外针或容器的洗涤接口','确认污染表面、覆盖、吸液高度与峰值排废'],
  mixing:['容器内反应混匀','以均匀性、泡沫和方法响应比较几何及动作'],
  abd:['指定管路的气泡或液体状态识别','按管材、尺寸、介质与动作时间窗验证检出和误报'],
  pdm:['指定液路位置的压力状态监测','量程与接液配置按型号确认，正常基线和异常分别验证'],
  fittings:['管端定位与密封连接','核对管外径、螺纹、密封结构和端口孔底几何'],
  tubing:['连接路径和共享体积','内径、长度、负载及真实配方共同决定选材与尺寸'],
  filters:['方法允许的颗粒截留','卡片为代表配置，实际孔径与滤材按目标物、压降及回收另选'],
  check:['回流限制','卡片为代表配置，实际开启条件、反向泄漏和介质另行确认'],
};
const familyCards: Record<string, ReviewProductCardId[]> = {
  pistonPump: ['ea'], syringePump: ['hld'], pipettingPump: ['smtp'], valvelessPump: ['rpl'],
  diaphragmPump: ['dpl30'], gasLiquidPump: ['dpgl'], rotaryValve: ['mrv'], solenoidValve: ['sv'],
  highPressureValve: ['hp'], sampleNeedle: ['sampling'], sensors: ['abd','pdm'],
  fittings: ['fittings'], fittingsTubing: ['fittings','tubing'], tubing: ['tubing'],
  filters: ['filters'], checkValve: ['check'], checkFilter: ['filters','check'],
  // No published pinch-valve product exists. Never relabel an unrelated valve as one.
  pinchValve: [],
};
const a = {
  piston: 'micro-plunger-pump-selection', accuracy: 'piston-pump-accuracy-repeatability-resolution',
  bubbles: 'piston-pump-air-bubbles-dispensing-error', viscosity: 'piston-pump-viscous-liquid-aspiration-speed',
  material: 'piston-pump-head-material-selection', clinical: 'clinical-chemistry-piston-pump-100-250-500-ul-selection',
  syringe: 'what-is-a-programmable-syringe-pump', pipette: 'what-is-a-programmable-pipetting-pump',
  pipetting: 'what-is-pipetting', rpl: 'rpl-valveless-metering-pump-selection-guide',
  valveless: 'what-is-a-valveless-metering-pump', dosing: 'metering-pump-accuracy-repeatability-reagent-dispensing',
  flow: 'diaphragm-pump-flow-pressure-curve-guide', prime: 'self-priming-miniature-liquid-diaphragm-pump-selection',
  balance: 'diaphragm-pump-multiple-wash-nozzles-flow-balance', wash: 'ivd-cleaning-wash-rinse-pump-diaphragm-pump',
  drain: 'ivd-waste-aspiration-liquid-pump-vs-vacuum-pump', waste: 'lab-liquid-waste-aspiration-troubleshooting',
  backflow: 'miniature-diaphragm-pump-backflow-check-valve', duty: 'micro-diaphragm-pump-continuous-duty-life',
  reservoir: 'diaphragm-pump-flow-drop-reservoir-venting', resistance: 'fluid-resistance-calculator-liquid-path-design-guide',
  tubing: 'tube-inner-diameter-affects-diaphragm-pump-flow', pressure: 'high-backpressure-fluid-path-pressure-budget',
  rotary: 'rotary-valve-selection-guide', rotaryMaterials: 'rotary-valve-wetted-materials-selection',
  hp: 'how-does-an-hplc-injection-valve-work', solenoid: 'what-is-a-solenoid-valve',
} as const;
const guidePlans: Record<string, { products: ReviewProductCardId[]; articles: string[] }> = {
  'piston-pump': { products:['ea','sm','tm'],articles:[a.piston,a.accuracy,a.bubbles] },
  'piston-sample-transfer': { products:['ea','sm','sampling'],articles:[a.clinical,a.bubbles] },
  'piston-reagent-dispensing': { products:['ea','sm','tm'],articles:[a.clinical,a.viscosity,a.accuracy] },
  'piston-dilution': { products:['ea','sm','mrv'],articles:[a.accuracy,a.rotary] },
  'piston-titration': { products:['ea','sm'],articles:[a.accuracy,a.bubbles] },
  'syringe-pump': { products:['hld','hmd'],articles:[a.syringe,a.pipetting] },
  'syringe-sampling': { products:['hld','sampling'],articles:[a.syringe,a.pipetting] },
  'syringe-distribution': { products:['hld','hmd'],articles:[a.syringe,a.pipetting] },
  'syringe-dilution': { products:['hld','mrv'],articles:[a.syringe,a.rotary] },
  'syringe-sequential': { products:['hld','mrv'],articles:[a.syringe,a.rotary] },
  'pipetting-pump': { products:['smtp'],articles:[a.pipette,a.pipetting] },
  'pipette-transfer': { products:['smtp'],articles:[a.pipette,a.pipetting] },
  'pipette-dilution': { products:['smtp'],articles:[a.pipette,a.pipetting] },
  'pipette-preparation': { products:['smtp'],articles:[a.pipette,a.pipetting] },
  'valveless-pump': { products:['rpl'],articles:[a.valveless,a.rpl,a.dosing] },
  'valveless-dispensing': { products:['rpl'],articles:[a.rpl,a.dosing] },
  'valveless-titration': { products:['rpl','ea'],articles:[a.rpl,a.accuracy] },
  'valveless-continuous': { products:['rpl'],articles:[a.rpl,a.valveless] },
  'valveless-proportion': { products:['rpl'],articles:[a.valveless,a.dosing] },
  'diaphragm-pump': { products:['dpl30','dpl60','dpl30h','dpgl'],articles:[a.flow,a.prime,a.drain] },
  'diaphragm-liquid': { products:['dpl30','dpl60','dpl30h'],articles:[a.wash,a.flow,a.balance] },
  'diaphragm-replenishment': { products:['dpl30','dpl60'],articles:[a.reservoir,a.prime,a.backflow] },
  'diaphragm-circulation': { products:['dpl30','dpl60'],articles:[a.flow,a.duty] },
  'diaphragm-gas-liquid': { products:['dpgl'],articles:[a.drain,a.waste] },
  valves: { products:['mrv','hp','sv'],articles:[a.rotary,a.hp,a.solenoid] },
  'valve-multiport': { products:['mrv'],articles:[a.rotary,a.rotaryMaterials] },
  'valve-high-pressure': { products:['hp'],articles:[a.hp] },
  'valve-diversion': { products:['sv','hp'],articles:[a.solenoid,a.hp] },
  'valve-solenoid': { products:['sv'],articles:[a.solenoid] },
  probes: { products:['sampling','washing','mixing'],articles:[a.clinical,a.balance,a.wash] },
  'probe-sampling': { products:['sampling','ea'],articles:[a.clinical,a.bubbles] },
  'probe-washing': { products:['washing','dpl30','dpgl'],articles:[a.wash,a.balance,a.drain] },
  'probe-vessel-washing': { products:['washing','dpl60','dpgl'],articles:[a.balance,a.wash,a.drain] },
  'probe-mixing': { products:['mixing'],articles:[a.clinical,a.dosing] },
  monitoring: { products:['abd','pdm'],articles:[a.bubbles,a.resistance] },
  'monitor-bubble': { products:['abd'],articles:[a.bubbles] },
  'monitor-pressure': { products:['pdm'],articles:[a.resistance,a.pressure] },
  fluidics: { products:['tubing','fittings','filters','check'],articles:[a.resistance,a.tubing,a.backflow] },
  'fluidics-tubing': { products:['tubing'],articles:[a.tubing,a.resistance] },
  'fluidics-fittings': { products:['fittings'],articles:[a.resistance,a.hp] },
  'fluidics-protection': { products:['filters','check'],articles:[a.backflow,a.resistance] },
};
const topicArticles: Record<string, string[]> = {
  'ivd/clinical':[a.clinical,a.balance,a.rotary], 'ivd/immunoassay':[a.syringe,a.wash,a.drain],
  'ivd/hematology':[a.clinical,a.syringe,a.bubbles], 'ivd/coagulation':[a.accuracy,a.syringe,a.wash],
  'ivd/molecular':[a.pipette,a.syringe,a.drain],
  'life-science/genomics':[a.pipette,a.syringe], 'life-science/cellCulture':[a.syringe,a.rpl],
  'life-science/automation':[a.pipette,a.syringe,a.rotary], 'life-science/protein':[a.syringe,a.rotaryMaterials,a.hp],
  'life-science/bioProcess':[a.rpl,a.syringe],
  'lab-automation/samplePrep':[a.pipette,a.syringe,a.rotary], 'lab-automation/pipetting':[a.pipetting,a.pipette,a.syringe],
  'lab-automation/microplate':[a.balance,a.wash,a.drain], 'lab-automation/reagentDispensing':[a.syringe,a.rpl,a.dosing],
  'lab-automation/systemIntegration':[a.syringe,a.rotary,a.bubbles],
  'analytical-instruments/spectroscopy':[a.syringe,a.rotaryMaterials,a.rpl],
  'analytical-instruments/waterQuality':[a.accuracy,a.rotary,a.resistance],
  'analytical-instruments/samplePrep':[a.syringe,a.pipette,a.resistance],
  'analytical-instruments/labAnalyzer':[a.accuracy,a.rpl,a.drain],
  'environmental-monitoring/waterQuality':[a.prime,a.rotary,a.resistance],
  'environmental-monitoring/wastewater':[a.flow,a.rotaryMaterials,a.resistance],
  'environmental-monitoring/gasPretreatment':[a.waste,a.backflow,a.resistance],
  'environmental-monitoring/samplingPrep':[a.syringe,a.pipette,a.resistance],
  'environmental-monitoring/systemIntegration':[a.rotary,a.flow,a.resistance],
  'synthetic-biology/microBioreactor':[a.syringe,a.rpl], 'synthetic-biology/biofoundry':[a.pipette,a.syringe,a.rotary],
  'synthetic-biology/feedingControl':[a.rpl,a.syringe,a.backflow],
  'synthetic-biology/onlineSampling':[a.syringe,a.resistance],
  'synthetic-biology/bioProcessIntegration':[a.rpl,a.syringe,a.resistance],
};
const hubPlans: Record<string, { products: ReviewProductCardId[]; articles: string[]; inputs: string }> = {
  ivd: { products:['ea','hld','dpl30','dpgl'],articles:[a.clinical,a.wash,a.drain],inputs:'仪器类型、样本与试剂剂量、反应和洗涤时序、携带污染或背景目标' },
  'life-science': { products:['smtp','hld','rpl','mrv'],articles:[a.pipette,a.syringe,a.rpl],inputs:'核酸、蛋白或细胞任务，保留与弃液位置、真实配方及回收或细胞状态目标' },
  'lab-automation': { products:['smtp','hld','dpl60','mrv'],articles:[a.pipette,a.syringe,a.balance],inputs:'工位与容器、单次量和批次量、并行资源、清洗或换头策略及异常恢复要求' },
  'environmental-monitoring': { products:['dpl30','mrv','filters','pdm'],articles:[a.prime,a.flow,a.resistance],inputs:'被测组分、实际样品基体、取送样距离与吸扬程、允许预处理、更新时间及维护周期' },
  'synthetic-biology': { products:['hld','rpl','mrv','abd'],articles:[a.syringe,a.rpl,a.backflow],inputs:'反应器体积、补料时间曲线、采样与弃样预算、隔离要求和允许中断' },
};
export function getReviewFooterPlan(kind: EnglishApplicationKind, document: ApplicationDocument) {
  let products: ReviewProductCardId[], articles: string[], inputs: string;
  if (document.kind === 'hub') {
    const hub = hubPlans[kind];
    if (!hub) throw new Error('Finalized hub must bypass review footer: '+kind);
    ({products, articles, inputs} = hub);
  } else if (document.reviewContext) {
    const context=document.reviewContext;
    products=context.products.map(id=>{
      if (!(id in reviewProductCards)) throw new Error('Unknown hierarchy product: '+id);
      return id as ReviewProductCardId;
    });
    const group=kind+'/'+context.topic;
    if (!topicArticles[group]) throw new Error('Missing hierarchy reading: '+group);
    const readingGroup:Record<string,string>={piston:'piston-pump',syringe:'syringe-pump',pipetting:'pipetting-pump',valveless:'valveless-pump',diaphragm:'diaphragm-pump',valves:'valves',probes:'probes',monitoring:'monitoring',fluidics:'fluidics'};
    articles=guidePlans[document.slug]?.articles ?? [...new Set([...(guidePlans[readingGroup[context.family]]?.articles??[]).slice(0,2),topicArticles[group][0]])];
    inputs=products.map(id=>reviewProductGates[id][1]).join('；') || '真实介质、各状态压力、连接条件与本任务的验证要求';
    if (guidePlans[document.slug]) inputs=reviewGuideStructures[document.slug].checks.map(row=>row[1]).join('；');
  } else if (guidePlans[document.slug]) {
    ({products, articles} = guidePlans[document.slug]);
    inputs = reviewGuideStructures[document.slug].checks.map(row => row[1]).join('；');
  } else {
    const group = Object.keys(reviewTopics).find(key => key.startsWith(kind+'/') && reviewTopics[key].title === document.title);
    if (!group || !topicArticles[group]) throw new Error('Missing curated footer: '+kind+'/'+document.slug);
    const copy = reviewTopics[group];
    products = [...new Set(copy.candidates.flatMap(row => {
      if (!familyCards[row[0]]) throw new Error('Unknown product family '+row[0]);
      return familyCards[row[0]];
    }))];
    articles = topicArticles[group];
    inputs = copy.candidates.map(row => row[2]).join('；');
  }
  const subject = document.title.split('：')[0].replace(/液路$/,'');
  return {
    products, articles,
    cta: {
      title: document.reviewContext && !guidePlans[document.slug] ? `讨论${document.reviewContext.hero.highlight}的液路配置` : `讨论你的${subject}液路`,
      description: `提供液路图、真实液体和各状态压力，并说明${inputs}。结合正文的验证目标比较适用配置。`,
      href: '/en/contact/', buttonLabel: '联系工程师',
      backgroundImage: `/images/applications/${kind}/${kind}-cta-bg-1920x520-v001.webp`,
    },
  };
}
