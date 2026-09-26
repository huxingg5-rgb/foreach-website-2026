import { getPumpDiagnosticsArticleCopy } from "./pump-diagnostics-articles.article";
import type {
  DiaphragmPumpEngineeringArticleCopy,
  EngineeringArticleSection,
} from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleLocale } from "./technical-articles.types";

export const pistonPumpDriftDiagnosisSlug =
  "piston-pump-dispensing-drift-diagnosis" as const;
export const pistonPumpAcidAlkaliMaterialsSlug =
  "piston-pump-head-material-selection" as const;

export type PistonPumpRplStyleArticleSlug =
  | typeof pistonPumpDriftDiagnosisSlug
  | typeof pistonPumpAcidAlkaliMaterialsSlug;

export type RplStyleSectionNavigationItem = {
  id: string;
  label: string;
};

const driftNavigation: readonly RplStyleSectionNavigationItem[] = [
  { id: "confirm-drift", label: "先确认是不是真实漂移" },
  { id: "control-variables", label: "用趋势和对照缩小范围" },
  { id: "cross-check", label: "泵与液路交叉验证" },
  { id: "component-check", label: "阀、密封和磨损判断" },
  { id: "close-loop", label: "建立基线并关闭问题" },
];

const materialsNavigation: readonly RplStyleSectionNavigationItem[] = [
  { id: "working-conditions", label: "先把酸碱工况说完整" },
  { id: "pump-head", label: "泵头材料怎样初筛" },
  { id: "plunger-seal", label: "柱塞与密封怎样配套" },
  { id: "service-case", label: "裂纹案例说明了什么" },
  { id: "verification", label: "怎样验证材料组合" },
];

function trimSectionNumber(title: string) {
  return title.replace(/^[一二三四五六七八九十]+、/, "");
}

function mergeSections(
  title: string,
  sections: readonly EngineeringArticleSection[],
): EngineeringArticleSection {
  return {
    title,
    blocks: sections.flatMap((section) => [
      { type: "subheading" as const, title: trimSectionNumber(section.title) },
      ...section.blocks,
    ]),
  };
}

function getDriftCopy(): DiaphragmPumpEngineeringArticleCopy | null {
  const copy = getPumpDiagnosticsArticleCopy(
    pistonPumpDriftDiagnosisSlug,
    "zh-CN",
  );

  if (!copy || copy.sections.length < 9) {
    return null;
  }

  return {
    ...copy,
    sections: [
      mergeSections("一、先确认加样量是否真的随时间下降", copy.sections.slice(0, 2)),
      mergeSections("二、用趋势和可逆变量对照缩小范围", copy.sections.slice(2, 4)),
      mergeSections("三、用四个组合判断问题跟随泵还是液路", copy.sections.slice(4, 5)),
      mergeSections("四、再检查阀、密封、间隙与磨损", copy.sections.slice(5, 7)),
      mergeSections("五、回到原触发时长，建立可复用基线", copy.sections.slice(7, 9)),
    ],
  };
}

const acidAlkaliMaterialsCopy: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "输送酸碱试剂时，柱塞泵的泵头、柱塞和密封材料怎么选？",
    seoTitle: "酸碱试剂柱塞泵材料怎么选？泵头、柱塞与密封",
    seoDescription:
      "酸碱试剂柱塞泵选材不能只看pH。本文按成分、浓度、温度、接触时间和清洗工况，说明泵头、柱塞、密封及完整接液路径的筛选与验证方法。",
    coverImage:
      "/images/resources/technical-articles/piston-pump/piston-pump-head-material-selection-cover.webp",
    coverAlt: "Foreach柱塞泵泵头、柱塞和密封接液材料选型示意",
  },
  deck:
    "输送酸碱试剂时，材料选择不是查到一个pH范围就结束。泵头要同时承受介质、装配应力和压力循环；柱塞要兼顾化学稳定性、表面状态与耐磨；密封既要耐介质，又要在往复运动中保持回弹和密封。正确做法是先写清化学品、浓度、温度、接触时间和清洗工况，再把泵头、柱塞、密封、阀、管路与接头作为一条完整接液路径验证。",
  leadBlocks: [
    {
      type: "paragraph",
      text: "输送酸碱试剂时，材料选择不是查到一个pH范围就结束。泵头要同时承受介质、装配应力和压力循环；柱塞要兼顾化学稳定性、表面状态与耐磨；密封既要耐介质，又要在往复运动中保持回弹和密封。正确做法是先写清化学品、浓度、温度、接触时间和清洗工况，再把泵头、柱塞、密封、阀、管路与接头作为一条完整接液路径验证。",
    },
    {
      type: "notice",
      label: "先说明边界",
      text: "下面的材料表用于建立候选清单，不是兼容性承诺。相同材料名称下，不同牌号、填充体系、加工残余应力和密封结构都可能得到不同结果；最终配置应以真实介质和代表性零件试验为准。",
    },
  ],
  sections: [
    {
      title: "一、先把酸碱试剂的真实工况说完整",
      blocks: [
        {
          type: "paragraph",
          text: "“酸性”“碱性”或一个pH数值，只能描述溶液的一部分特征。材料是否适用，还与具体化学品、浓度、温度、杂质、有机共溶剂、氧化性、停机驻留和清洗液有关。例如同样是碱性液体，稀释后的水性缓冲体系与高浓度碱液，对塑料和弹性密封的影响可能完全不同。",
        },
        {
          type: "table",
          headers: ["必须确认的信息", "为什么会改变材料结论", "建议提供的记录"],
          rows: [
            ["化学品与配方", "不同酸、碱及添加剂的作用机制不同", "名称、主要成分、SDS或允许披露的配方范围"],
            ["浓度与pH", "pH不能替代浓度，也不能反映全部共存组分", "工作液、原液和清洗液分别记录"],
            ["温度", "温度升高可能加快渗透、溶胀、应力开裂或密封松弛", "工作、清洗、消毒、储存的最高与常用温度"],
            ["接触方式", "间歇输送与停机长期浸泡不是同一暴露条件", "单次时长、每天周期、停机驻留和预期寿命"],
            ["压力与运动", "泵头承受装配和压力循环，密封还承受往复摩擦", "吸排速度、背压、保持压力、运行频次"],
            ["清洗流程", "清洗剂可能比工作试剂更具侵蚀性", "冲洗液、清洗液、顺序、温度和停留时间"],
          ],
        },
        {
          type: "paragraph",
          text: "还要区分正常工作液和异常工况。试剂配错、浓缩液误入、清洗后未充分置换、设备停机后液体长期滞留，都可能使实际暴露条件超出最初选材边界。选型资料里应把这些可预见情况列出来，而不是只描述正常运行的一小段时间。",
        },
      ],
    },
    {
      title: "二、泵头材料怎样从酸碱工况中初筛",
      blocks: [
        {
          type: "paragraph",
          text: "泵头既是接液件，也是结构件。除了化学相容，还要考虑刚性、尺寸稳定性、螺纹与接口承载、密封预紧、加工方式和透明观察需求。某种材料在浸泡表中显示稳定，并不代表加工成泵头后就一定能承受实际装配和压力循环。",
        },
        {
          type: "table",
          headers: ["材料方向", "可优先评估的情形", "酸碱试剂下要重点核对"],
          rows: [
            ["PMMA / PCTG", "介质较常规、需要透明观察或兼顾成本与加工的项目", "强酸强碱、清洗剂、有机共溶剂、长期浸泡与装配应力引起的开裂风险"],
            ["PP", "部分水性酸碱液路及重视成本的项目", "刚性、螺纹和密封预紧、温度及长期压力循环"],
            ["PVDF", "部分酸、碱、盐溶液及化学兼容要求较高的液路", "具体化学品和浓度、温度、加工结构、密封组合"],
            ["PPS / PEEK", "还要求较高刚性、耐温或尺寸稳定性的项目", "强氧化性介质、具体牌号、加工应力、完整接液路径与成本"],
            ["PTFE", "需要较宽化学耐受范围的候选接液方案", "蠕变、回弹、尺寸稳定性、螺纹和密封结构是否可实现"],
            ["POM / PSU", "基于机械性能、加工或耐温需求提出的结构候选", "具体酸碱和氧化条件、应力环境、清洗方式与长期接触"],
          ],
        },
        {
          type: "notice",
          label: "不要按“耐腐蚀最好”直接排序",
          text: "泵头材料没有脱离结构和工况的统一冠军。化学耐受范围较宽的材料，仍可能在刚性、蠕变、加工、密封或成本上不适合当前泵头；透明材料便于观察，也不等于适合所有清洗剂和长期浸泡。",
        },
      ],
    },
    {
      title: "三、柱塞和密封材料为什么必须与泵头一起选",
      blocks: [
        {
          type: "paragraph",
          text: "泵头兼容并不能代表整台泵兼容。柱塞表面与密封形成运动配合，材料组合会同时影响摩擦、颗粒、磨损、回漏和计量稳定性。Foreach柱塞材料可按项目评估氧化锆陶瓷、氧化铝陶瓷、PEEK和蓝宝石；具体组合仍要结合介质、容量、结构、寿命和洁净要求确认。",
        },
        {
          type: "table",
          headers: ["部件或材料方向", "主要作用", "选型时不能忽略"],
          rows: [
            ["氧化锆 / 氧化铝陶瓷柱塞", "提供硬质、尺寸稳定的运动表面候选", "具体酸碱体系、表面质量、颗粒与脆性风险、密封配合"],
            ["蓝宝石柱塞", "用于对硬度、表面和尺寸稳定性有要求的候选配置", "成本、加工尺寸、脆性、密封副与实际介质验证"],
            ["PEEK柱塞", "提供聚合物柱塞的结构候选", "介质、温度、磨损、尺寸变化与运动负载"],
            ["EPDM类密封", "常作为水性及部分酸碱体系的候选弹性体", "油类、有机溶剂、浓度、温度和长期压缩后的变化"],
            ["FKM类密封", "常作为部分化学介质和温度要求下的候选", "强碱、热水性体系和具体配方不能仅凭材料缩写判断"],
            ["FFKM类密封", "用于要求更宽化学适用范围的候选方案", "具体牌号、低温或机械性能、成本与供应条件"],
            ["PTFE类密封或密封元件", "用于化学耐受要求较宽的候选结构", "回弹、冷流、动态密封结构、表面与装配公差"],
          ],
        },
        {
          type: "paragraph",
          text: "表中的密封材料是通用候选方向，不表示每一种都属于现有标准泵的固定配置。实际项目还要核对阀体、阀芯或阀片、管路、接头、过滤器、针头、胶黏剂和可能接触介质的润滑材料。任何一个薄弱点都可能先发生溶胀、开裂、析出、吸附、泄漏或堵塞。",
        },
      ],
    },
    {
      title: "四、一个泵头裂纹案例说明了什么",
      blocks: [
        {
          type: "paragraph",
          text: "在一例内部售后记录中，PCTG泵头使用约两年后出现裂纹。项目最初反馈输送的是中性液体，后续用现场信息复核，实际液路中存在碱性较强的清洗液。这个案例不能推导出所有PCTG泵头都会开裂，也不能只凭试纸结果确定失效机理，但它说明：如果介质描述不完整，最初的材料判断就可能建立在错误边界上。",
        },
        {
          type: "paragraph",
          text: "裂纹也不能只归因于“腐蚀”。应继续检查裂纹起点是否靠近螺纹、紧固或尖角等应力集中位置，确认装配预紧、加工状态、压力循环、清洗温度和停机浸泡时间，并对照未使用样件、同批零件和替代材料。化学暴露与机械应力可能共同作用，单一标签不足以关闭问题。",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "先确认工作液、清洗液和异常液体是否都已纳入介质清单；",
            "记录裂纹位置、方向、首次出现时间和对应运行事件；",
            "复核装配扭矩、密封预紧、接口载荷与压力循环；",
            "用同工况样件对照，避免把一次售后现象扩大成材料通用结论。",
          ],
        },
      ],
    },
    {
      title: "五、从资料筛选到整机循环，怎样验证材料组合",
      blocks: [
        {
          type: "subheading",
          title: "第一步：用正式资料建立候选清单",
        },
        {
          type: "paragraph",
          text: "以具体材料牌号和真实化学品为对象，核对供应商资料、SDS和已有项目记录。无法确认的数据标记为待验证，不把相似介质或相近pH的结论直接移植。",
        },
        {
          type: "subheading",
          title: "第二步：做代表性试片与零件浸泡",
        },
        {
          type: "paragraph",
          text: "覆盖工作液、清洗液、最高允许温度和最长可预见驻留时间。试验前后记录外观、质量、关键尺寸、硬度或弹性变化，并观察开裂、溶胀、软化、脆化、析出和颜色变化。只有外观正常还不够，关键尺寸和装配性能也要复核。",
        },
        {
          type: "subheading",
          title: "第三步：验证代表性结构和密封副",
        },
        {
          type: "paragraph",
          text: "将候选材料放进真实或等效的螺纹、密封面和柱塞运动结构中，检查装配后泄漏、启动力、压力保持和往复磨损。静态试片稳定，不代表动态密封一定稳定。",
        },
        {
          type: "subheading",
          title: "第四步：回到整机计量和清洗周期",
        },
        {
          type: "paragraph",
          text: "在目标液量、实际阀路、管路、背压、温度和运行节拍下，验证准确性、重复性、泄漏、气泡、颗粒和清洗后的恢复状态。验收标准应在试验前由项目定义，并覆盖预计寿命节点，而不是出现结果后再选择有利指标。",
        },
        {
          type: "links",
          items: [
            {
              label: "EA-500-PMMA柱塞泵",
              href: "/products/pumps/piston-pump/ea-500-pmma/",
              prefix: "查看当前网站展示配置：",
              suffix: "；",
            },
            {
              label: "EA-500-PEEK柱塞泵",
              href: "/products/pumps/piston-pump/ea-500-peek/",
              suffix: "。",
            },
            {
              label: "Foreach柱塞泵产品分类",
              href: "/products/pumps/piston-pump/",
              prefix: "更多容量与配置可从",
              suffix: "开始核对。",
            },
          ],
        },
      ],
    },
  ],
  faqTitle: "常见问题",
  faqItems: [
    {
      question: "只知道试剂pH，能不能直接选泵头和密封？",
      answer:
        "不能。至少还要确认具体化学品、浓度、温度、接触时间、清洗液和压力条件。pH不能反映所有共存组分，也不能代替材料牌号与真实结构验证。",
    },
    {
      question: "输送强酸或强碱，是不是直接选PTFE就可以？",
      answer:
        "PTFE可作为化学耐受要求较宽时的候选，但泵头和密封还要满足刚性、蠕变、回弹、尺寸稳定性、加工与装配要求。是否可用取决于具体结构和工况。",
    },
    {
      question: "PEEK泵头配陶瓷柱塞，就一定能输送酸碱试剂吗？",
      answer:
        "不能这样承诺。泵头和柱塞只是接液路径的一部分，还要核对密封、阀、管路、接头与清洗流程；PEEK和陶瓷也应针对具体介质、浓度、温度和寿命做验证。",
    },
    {
      question: "EPDM、FKM和FFKM密封应该怎样选？",
      answer:
        "先根据真实配方和温度排除明显不兼容的候选，再比较回弹、压缩永久变形、动态摩擦、寿命、成本与供应条件。材料缩写不能代替具体牌号和整机往复试验。",
    },
    {
      question: "材料浸泡没有变化，为什么装机后仍会泄漏或开裂？",
      answer:
        "静态试片没有覆盖螺纹载荷、密封预紧、柱塞往复、压力循环和加工残余应力。浸泡合格后仍需做代表性零件、密封副和整机循环验证。",
    },
  ],
  cta: {
    title: "需要核对酸碱试剂的接液材料组合？",
    description:
      "可提供化学品与浓度、温度、接触和清洗方式、目标液量、压力、阀路及寿命要求，由恒永达结合泵头、柱塞、密封和完整液路评估候选配置与验证条件。",
    contactLabel: "联系工程师",
    productsLabel: "查看柱塞泵产品",
    productsHref: "/products/pumps/piston-pump/",
  },
};

export function getPistonPumpRplStyleArticleCopy(
  slug: string,
  locale: TechnicalArticleLocale,
): DiaphragmPumpEngineeringArticleCopy | null {
  if (locale !== "zh-CN") {
    return null;
  }

  if (slug === pistonPumpDriftDiagnosisSlug) {
    return getDriftCopy();
  }

  if (slug === pistonPumpAcidAlkaliMaterialsSlug) {
    return acidAlkaliMaterialsCopy;
  }

  return null;
}

export function getPistonPumpRplStyleNavigation(
  slug: string,
): readonly RplStyleSectionNavigationItem[] {
  return slug === pistonPumpDriftDiagnosisSlug
    ? driftNavigation
    : materialsNavigation;
}
