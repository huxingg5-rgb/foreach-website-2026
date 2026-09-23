import { valvelessPumpSelectionProducts } from "../selection/valveless-pump-selection.generated";
import type { ProductApplicationsContent } from "./product-detail.types";
import { applyRplP4ChineseDetailCopy } from "./rpl-p4-copy.zh";
import { applyValvelessPumpReviewedChineseCopy } from "./valveless-pump-content.zh";
/** Chinese detail introductions; other locales retain their existing authored copy. */
const descriptions: Record<string, string> = {
  "rpl-p4": "恒永达 RPL-P4 是单圈排量为 12–80 μL/rev 的单头陶瓷柱塞无阀泵，用于小体积液体的定量输送与分配。产品可用于微量试剂加注、滴定加液和小体积液体分装，面向自动化分析仪器、滴定设备和实验室液体处理模块，适合单圈排量需求较小、需要重复定量加液的液路。",
  "rpl-p635": "恒永达 RPL-P6.35 是单圈排量为 50–300 μL/rev 的精密陶瓷柱塞无阀泵，采用 PVDF 泵头与氧化锆陶瓷套件，支持机械排量调节和电机转速调节。产品用于试剂分配、滴定加液、缓冲液添加和定量灌装，可面向自动化分析仪器、实验室加液设备和试剂分装系统选型；配有清洗接口，便于根据介质特性配置柱塞区域的清洗液路。",
  "rpl-p15": "恒永达 RPL-P15 是单圈排量为 300–1200 μL/rev 的精密陶瓷柱塞无阀泵，采用 PVDF 泵头与氧化铝陶瓷套件，支持机械排量调节和电机转速调节。产品用于较大体积的试剂灌装、缓冲液添加和液体定量输送，可面向自动分装设备、实验室配液系统和分析仪器供液模块选型，适合需要较大单圈输出量的加液流程。",
  "drpl-0109": "恒永达 DRPL-0109 是浓缩液与稀释液体积比为 1:9 的双头陶瓷柱塞无阀泵，用于两路液体的比例输送。产品可用于浓缩试剂稀释、缓冲液配制和比例加液，面向自动化分析仪器的稀释模块、实验室配液设备及试剂配制系统，适合按一份浓缩液配九份稀释液进行输送的液路。配液后的均匀性需结合下游混合结构确认。",
  "drpl-0119": "恒永达 DRPL-0119 是浓缩液与稀释液体积比为 1:19 的双头陶瓷柱塞无阀泵，用于两路液体的比例输送。产品可用于浓缩试剂稀释、缓冲液配制和比例加液，面向自动化分析仪器的稀释模块、实验室配液设备及试剂配制系统，适合按一份浓缩液配十九份稀释液进行输送的液路。配液后的均匀性需结合下游混合结构确认。",
};

// Both published RPL-P6.35 datasheets specify zirconia. Keep Chinese spec
// aliases consistent with the introduction without changing other locales.
function correctCeramicMaterial(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(correctCeramicMaterial);
  if (!value || typeof value !== "object") return value;
  const record = value as Record<string, unknown>;
  if (record.label === "陶瓷套件") {
    return { ...record, value: "ZrO₂", ...(record.content !== undefined ? { content: "ZrO₂" } : {}) };
  }
  return Object.fromEntries(Object.entries(record).map(([key, item]) => [key, correctCeramicMaterial(item)]));
}

export function applyValvelessPumpChineseCopy<T extends {
  productTypeId?: string;
  slug?: string;
  description?: string;
}>(data: T, locale: string, renderLocale = locale): T {
  if (locale !== "zh" || data.productTypeId !== "valveless-pump") return data;
  const description = descriptions[data.slug || ""];
  if (!description) return data;
  const corrected = data.slug === "rpl-p635" ? correctCeramicMaterial(data) as T : data;
  const applicationDetails = getApplications(data.slug!);
  const card = valvelessPumpSelectionProducts.find((product) => product.detailSlug === data.slug);
  // Foreign routes retain the exact legacy source before localization.
  const title = renderLocale === "zh" ? titles[data.slug!] : titles[data.slug!].replaceAll("采用聚偏二氟乙烯（PVDF）泵头", "采用 PVDF 泵头");
  const legacy = { ...corrected, breadcrumbLabel: card?.cardTitle.zh || data.slug, breadcrumbParentLabel: "无阀泵", breadcrumbParentHref: "/products/pumps/valveless-pumps/", description, model: title, title, name: title, applicationDetails, commonApplications: applicationDetails.items.map((item) => item.title) };
  return applyRplP4ChineseDetailCopy(applyValvelessPumpReviewedChineseCopy(legacy, renderLocale), renderLocale);
}

// Keep detail H1 identical to the corresponding Chinese card H3, with the brand prefix.
const titles: Record<string, string> = Object.fromEntries(
  valvelessPumpSelectionProducts.map((product) => [product.detailSlug, `Foreach ${product.cardSubtitle.zh}`]),
);
// English primary-source references for application tasks and terminology:
// https://ivek.com/applications2.html (diagnostic reagent vial/tube filling)
// https://www.fluidmetering.com/diagnostics-ivd-applications
// https://www.fluidmetering.com/blog/how-can-i-meter-different-fluids-at-different-flow-rates
// https://dienerprecisionpumps.com/metering-pumps/
// https://www.metrohm.com/content/dam/metrohm/shared/documents/manuals/81/810088001EN.pdf
// Sources describe industry workflows; model allocation below is an engineering selection proposal,
// not a claim that FOREACH models have been validated in every listed instrument.

const applicationItems = {
  "filling": {
    "title": "诊断试剂生产：试剂瓶与样品管定量分装",
    "paragraphs": [
      "在诊断试剂的分装工位，液体从储液容器经泵送到灌装针，按生产节拍分配到试剂瓶或样品管。这里需要控制的是每个容器的装量一致性，同时减少换瓶时的滴液、挂液和试剂损耗。按生产工序，这一任务称为定量灌装（volumetric filling）或液体分装（dispensing）；按泵的作用，则称为试剂灌装泵或定量分配泵。",
      "RPL-P15 的 300–1200 μL/rev 单圈排量可用于评估毫升级分装液路，通过排量设置与运行转数匹配目标装量。灌装节拍应连同针头流阻、起停响应和液滴脱离一起确认；涉及蛋白类试剂或含表面活性剂的液体，还应检查起泡与残留。"
    ]
  },
  "reagent": {
    "title": "自动化分析：反应容器中的试剂定量加入",
    "paragraphs": [
      "在自动化分析及样品前处理模块中，泵将试剂从储液瓶送入反应杯、反应管或混合容器，使各次反应获得一致的液体加入量。一次输出规定体积通常称为试剂分配（reagent dispensing），按分析步骤加入规定剂量也称为试剂加液（reagent dosing）；两者强调的分别是分配动作与加入剂量。",
      "这一液路的需求是单次加液重复性和动作时序，而不只是每分钟流量。泵启动前的管路预充（priming）、气泡排除、加液口位置及停止后的余滴都会影响最终进入容器的体积。RPL 单头系列可按目标加液量与节拍评估，试剂加入与样本吸取应分别定义。"
    ]
  },
  "buffer": {
    "title": "实验室配液：缓冲液分配与储液容器补液",
    "paragraphs": [
      "在实验室配液工作站或分析仪器的供液模块中，同一份已配好的缓冲液可能被重复加入多个容器，也可能按消耗量补充到中间储液容器。前者称为缓冲液分配（buffer dispensing），后者称为补液（replenishment）；如果控制目标是单位时间输送量，则属于定量供液（metering）。这些名称对应不同控制任务，并不是不同的泵结构。",
      "RPL-P15 可面向较大体积的缓冲液添加及定量供液需求选型。重复分配关注每次输出量，补液关注启停与液位信号的配合，连续计量则关注工作流量和流量波动。含盐缓冲液还需安排停机冲洗，减少干燥后盐析结晶对柱塞区域的影响。"
    ]
  },
  "titration": {
    "title": "自动滴定：滴定剂增量加液与终点控制",
    "paragraphs": [
      "在自动电位滴定液路中，泵按控制指令向滴定杯加入滴定剂，仪器同步采集电位或 pH 信号。固定体积逐次加入称为等量增量加液；动态滴定则随曲线变化调整加液增量，在接近当量点时减小加入量。因此，同一滴定工位会使用滴定剂加液（titrant dosing）、增量加液（incremental dosing）和滴定液输送等任务名称。",
      "这类需求需要同时匹配较快的前段加液和较小的终点附近增量。RPL-P4 或 RPL-P6.35 是否适合，应依据实际最小增量、驱动分辨率、起停余量及电极响应验证；滴定终点判断属于仪器控制系统功能。"
    ]
  },
  "smallfill": {
    "title": "小体积分装：试剂管中的重复定量加液",
    "paragraphs": [
      "在小体积试剂包装或实验室分装工位，同一储液瓶中的试剂需连续分到多个小容器。任务可称为试剂分装（reagent dispensing）或小体积灌装（small-volume filling）。与仪器内的反应加液相比，这里更关注容器间装量一致性、换位节拍及针尖余滴。",
      "RPL-P4 可作为单圈排量需求较小的候选配置。实际最小装量取决于泵与驱动、针头和液体的组合，不能直接把 12 μL/rev 当成最小可靠灌装量。对于易起泡或容易挂壁的试剂，应将液滴完整进入容器作为验证的一部分。"
    ]
  },
  "midfill": {
    "title": "试剂分装：微升级至毫升级加液工位",
    "paragraphs": [
      "在试剂瓶、试剂管的重复分装中，设备需要按设定体积完成一次加液，再切换到下一个容器。这一工序称为定量灌装（volumetric filling），也常从液体处理角度称为分配（dispensing）；当泵安装在生产设备中时，则可按用途称为试剂灌装泵。",
      "RPL-P6.35 的 50–300 μL/rev 单圈排量可结合运行转数匹配目标装量。评估时应把加液时间、管路预充、换瓶余滴和针头背压纳入同一周期；氧化锆陶瓷套件与 PVDF 泵头的兼容性需连同密封和接管材料一起核对。"
    ]
  },
  "concentrate": {
    "title": "分析仪器：浓缩试剂按比例稀释",
    "paragraphs": [
      "当仪器使用浓缩试剂并在机内配成工作液时，一路输送浓缩液，另一路输送稀释液，两路在混合位置汇合后送往工作液容器或后续液路。这一流程称为试剂稀释（reagent dilution）；从泵的作用看，则是比例计量（proportioning）或双路定量输送（dual-channel metering）。",
      "这类需求首先是保持两路实际输出的体积关系，并避免某一路缺液、吸入气泡或背压变化造成浓度偏差。DRPL 双头配置可面向固定体积比的配液模块选型，两路入口供液与出口阻力需要分别评估。"
    ]
  },
  "dualbuffer": {
    "title": "缓冲液配制：浓缩液与稀释液配成工作液",
    "paragraphs": [
      "在缓冲液配制工位，浓缩缓冲液与稀释液按配方体积比进入混合容器；若两路边输送边在管路中混合，则属于在线稀释（inline dilution）。同一缓冲液应用中，配制阶段称为缓冲液稀释泵或配液泵，配好后再送往使用点的泵则承担缓冲液分配或供液任务。",
      "DRPL 负责两路比例输送，混合容器或下游混合器负责实现混合。配液效果需要检查启动及停机阶段的比例、混合后的均匀性，并按工艺需要检测浓度、pH 或电导率；固定比例输送本身不代表具有自动浓度闭环控制。"
    ]
  },
  "batch": {
    "title": "实验室配液：固定配方的双液路定量加入",
    "paragraphs": [
      "在重复配制同一配方的小批量工作液时，两种液体需要按规定体积关系加入容器。设备说明中可称为比例加液（proportional dosing）、双组分分配（two-component dispensing）或批量配液（batch preparation）。这些名称分别强调配比、组分数量和生产组织方式。",
      "固定比例配液需要先核对配方是否与 DRPL 的两路体积比相符，再核对总输出量和批次节拍。若配方要求两路独立变速、不同时间加入或频繁改变比例，应进一步确认驱动与液路方案，不能仅凭“双头”判断能够满足。"
    ]
  }
};
const applicationProfiles: Record<string, { intro: string; keys: (keyof typeof applicationItems)[] }> = {
  "rpl-p4": {
    "intro": "RPL-P4 可面向小体积试剂加入、滴定剂增量加液和小容器分装进行选型。这些任务同属实验室液体处理，但试剂分配关注一次加入量，滴定加液关注可控增量，分装关注容器间一致性；应按实际任务确定控制方式。",
    "keys": [
      "reagent",
      "titration",
      "smallfill"
    ]
  },
  "rpl-p635": {
    "intro": "RPL-P6.35 可面向自动化分析仪器的试剂加液、滴定模块和试剂分装设备进行选型。相同的陶瓷柱塞无阀结构，在不同液路中可承担 dispensing、dosing 或 metering 任务；选择时需要明确控制对象是一次体积、逐次加液增量还是单位时间流量。",
    "keys": [
      "reagent",
      "titration",
      "midfill"
    ]
  },
  "rpl-p15": {
    "intro": "RPL-P15 可面向试剂生产中的容器分装，以及实验室和分析仪器中的缓冲液添加、定量供液流程选型。它的 300–1200 μL/rev 单圈排量面向较大单圈输出需求；同一设备里的灌装、试剂加入和补液，需要分别确定装量、节拍或流量控制目标。",
    "keys": [
      "filling",
      "buffer",
      "reagent"
    ]
  },
  "drpl-0109": {
    "intro": "DRPL-0109 面向浓缩液与稀释液体积比为 1:9 的双液路配液，即一份浓缩液配九份稀释液。按体积相加计算，这对应十份最终混合液，不能把“1:9 两路体积比”与“最终体积为原液的九倍”混为一谈。",
    "keys": [
      "concentrate",
      "dualbuffer",
      "batch"
    ]
  },
  "drpl-0119": {
    "intro": "DRPL-0119 面向浓缩液与稀释液体积比为 1:19 的双液路配液，即一份浓缩液配十九份稀释液。按体积相加计算，这对应二十份最终混合液。它与 1:9 配置的选择依据是配方比例，而不是用于不同的行业。",
    "keys": [
      "concentrate",
      "dualbuffer",
      "batch"
    ]
  }
};

function getApplications(slug: string): ProductApplicationsContent {
  const profile = applicationProfiles[slug];
  return {
    tabLabel: "应用", title: "典型应用", intro: [profile.intro],
    items: profile.keys.map((key) => applicationItems[key]),
    selectionNote: { title: "从液路任务确定配置", paragraphs: [slug.startsWith("drpl-")
      ? "请说明配制什么工作液、两路液体分别是什么、目标体积比及每批总量，并提供两路供液条件、背压和混合方式。这些信息用于确认比例输送、配液节拍与混合结构的配合。"
      : "请说明液体从哪里送到哪里、一次加入多少、允许用多长时间，以及是间歇加液还是连续供液。再结合介质、针头和管路条件，确认排量、转速与控制方式；应用方向不等于该型号已在所有列举设备中完成验证。"] }
  };
}
