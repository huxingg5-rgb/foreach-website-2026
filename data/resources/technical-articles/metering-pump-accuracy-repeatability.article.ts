import type {
  DiaphragmPumpEngineeringArticleCopy,
  EngineeringArticleBlock,
} from "./diaphragm-pump-engineering-article.types";
import { meteringPumpAccuracyRepeatabilityEn } from "./metering-pump-accuracy-repeatability-locales/en";
import { meteringPumpAccuracyRepeatabilityEs } from "./metering-pump-accuracy-repeatability-locales/es";
import { meteringPumpAccuracyRepeatabilityFr } from "./metering-pump-accuracy-repeatability-locales/fr";
import { meteringPumpAccuracyRepeatabilityKo } from "./metering-pump-accuracy-repeatability-locales/ko";
import { meteringPumpAccuracyRepeatabilityRu } from "./metering-pump-accuracy-repeatability-locales/ru";
import {
  getMeteringPumpAccuracyRepeatabilityArticleHref,
  getMeteringPumpAccuracyRepeatabilityProductHref,
  meteringPumpAccuracyRepeatabilityCoverImage,
} from "./metering-pump-accuracy-repeatability-locales/shared";
import type {
  TechnicalArticleItem,
  TechnicalArticleLocale,
} from "./technical-articles.types";

export const meteringPumpAccuracyRepeatabilitySlug =
  "metering-pump-accuracy-repeatability-reagent-dispensing";

export const meteringPumpAccuracyRepeatabilitySourceHrefs = [] as const;

const articleHref = (slug: string) =>
  getMeteringPumpAccuracyRepeatabilityArticleHref("zh-CN", slug);
const productHref = getMeteringPumpAccuracyRepeatabilityProductHref("zh-CN");

const zhCopy = {
  metadata: {
    title: "试剂加液量不准或重复性差？计量泵的原因与排查方法",
    seoTitle: "计量泵加液不准怎么办？准确性与重复性排查 | 恒永达",
    seoDescription:
      "根据持续偏差、结果离散、首针异常和运行漂移，排查计量泵加液中的气泡、供液、介质、管路、针头和驱动问题，并介绍10次快速检查方法。",
    coverImage: meteringPumpAccuracyRepeatabilityCoverImage,
    coverAlt: "FOREACH RPL-P4 无阀计量泵",
  },
  deck: "同一程序下加液量仍不稳定时，先根据误差表现判断问题方向，再检查气泡、入口供液、介质、管路、出液端和驱动参数。下面给出一套可直接执行的初步排查方法。",
  leadBlocks: [
    {
      type: "paragraph",
      text: "结论：多次加液结果接近但整体偏离目标，通常属于准确性或系统偏差问题，应先检查校准、排量换算和实际工作点；同一程序下结果忽高忽低，通常属于重复性问题，应先检查气泡、入口供液、管路弹性、针头和驱动一致性；运行一段时间后逐渐漂移，应检查温度、黏度、结晶、污染和磨损。单圈排量不能直接代表最小可靠加液量，最终结果需要在目标介质和完整液路中验证。",
    },
  ],
  sections: [
    {
      title: "先根据加液表现判断问题方向",
      blocks: [
        {
          type: "table",
          headers: ["现场表现", "优先检查", "第一步怎么做"],
          rows: [
            [
              "每次都偏高或偏低，但波动很小",
              "工作点、校准、目标值或称重换算",
              "使用目标试剂重新称重，并核对排量、转数和密度",
            ],
            [
              "同一程序下结果忽高忽低",
              "气泡、供液不足、软管弹性或针头挂液",
              "重新预充液并观察入口、泵头和针尖状态",
            ],
            [
              "前几次不准，随后逐渐稳定",
              "泵头和管路没有完全充液",
              "增加预运行次数，稳定后再开始记录",
            ],
            [
              "运行一段时间后逐渐漂移",
              "温度、黏度、结晶、污染或磨损",
              "固定温度并对比清洗前后的测试结果",
            ],
            [
              "偶发不出液、挂滴或飞溅",
              "入口堵塞、气泡、针头尺寸或启停速度",
              "检查过滤器、接头、针头和电机加减速",
            ],
          ],
        },
      ],
    },
    {
      title: "按这个顺序检查液路和控制",
      blocks: [
        {
          type: "table",
          headers: ["检查项", "如何确认", "处理动作"],
          rows: [
            [
              "泵头与气泡",
              "低速预充时观察泵头和入口管，检查是否有气泡停留、压缩或往复移动",
              "重新预充并排气，确认接头处没有继续吸入空气",
            ],
            [
              "入口供液",
              "暂时降低吸程或缩短入口管后重复测试，观察结果是否改善",
              "降低吸程、缩短入口管路并检查过滤器阻力",
            ],
            [
              "介质与温度",
              "使用同一程序分别测试目标试剂和已知对照液，观察更换介质或温度后结果是否变化",
              "固定介质与温度，并使用目标试剂重新校准和测试",
            ],
            [
              "出口与针头",
              "观察针尖是否挂液、残液或飞溅，以及液滴是否完整进入容器",
              "清洁或更换针头，并固定针头位置、出口条件和启停参数",
            ],
            [
              "管路弹性与接头",
              "保持泵参数不变，更换较短或弹性较小的管路后比较结果",
              "优先使用更短、内径合适且连接可靠的管路",
            ],
            [
              "电机与程序",
              "核对每次运行的转数、转速、启停相位和加减速参数是否一致",
              "固定完整循环和驱动参数后再比较结果",
            ],
          ],
        },
      ],
    },
    {
      title: "做一组10次快速检查",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "清洗并充分预充泵头和管路，排除可见气泡。",
            "固定试剂、温度、储液高度、管路、过滤器、针头和出口位置。",
            "记录泵型号、排量设置、转数、转速以及加减速参数。",
            "在相同程序下连续加液10次，逐次称重，不只记录总量。",
            "根据试剂密度换算体积，计算平均值并与目标值比较。",
            "计算标准差或RSD，判断单次结果是否集中。",
            "改变一个条件后再重复测试，避免同时调整多个变量。",
          ],
        },
        {
          type: "formula",
          expression:
            "平均值相对目标偏差（%） =（平均实测体积 − 目标体积）÷ 目标体积 × 100%",
          note: "结果为正表示平均加液量高于目标，结果为负表示低于目标。平均值持续偏离时，优先检查校准、工作点和换算方法。",
        },
        {
          type: "formula",
          expression: "实测体积 = 净液体质量 ÷ 目标试剂密度",
          note: "质量和密度应使用对应单位。小体积测试还需确认天平分辨率、试剂挥发和称重时间是否足以支持判断。",
        },
        {
          type: "formula",
          expression: "RSD（%） = 样本标准差 ÷ 平均实测体积 × 100%",
          note: "RSD较大时，优先检查气泡、供液、管路、出液端和驱动一致性。",
        },
        {
          type: "table",
          headers: ["10次测试结果", "优先判断", "下一步"],
          rows: [
            [
              "结果很集中，但平均值持续偏高或偏低",
              "校准、排量换算、介质密度或系统背压",
              "使用目标试剂重新校准并核对工作点",
            ],
            [
              "平均值接近目标，但单次结果离散",
              "气泡、入口供液、管路弹性或驱动一致性",
              "排气后逐项固定液路与控制条件",
            ],
            [
              "前几次偏差较大，随后稳定",
              "预充不足或泵腔尚未完全充液",
              "增加预运行和废液排放步骤",
            ],
            [
              "结果随运行时间逐渐变化",
              "温度、黏度、结晶、污染或磨损",
              "固定温度，并比较清洗前后的结果",
            ],
            [
              "更换针头或管路后发生变化",
              "出口阻力或液路容积改变",
              "在新液路条件下重新验证",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "10次记录适合现场初步排查，不能代替正式性能验证。正式验证的样本量、允许偏差和测量设备应按项目要求确定。",
        },
      ],
    },
    {
      title: "这些变化发生后应重新检查",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "更换试剂、浓度、批次或工作温度；",
            "更换管路、过滤器、接头、针头或喷嘴；",
            "改变储液高度、吸程、背压或出口位置；",
            "改变排量、转数、转速、加减速或启停程序；",
            "清洗泵头、更换接液部件或处理结晶后；",
            "发现平均值偏移、数据离散增大或运行结果随时间漂移。",
          ],
        },
        {
          type: "paragraph",
          text: "选型或排查时，建议同时提供目标单次体积或流量、节拍、介质与温度、入口液位、管路尺寸、出口背压、针头以及驱动方式。这些信息比单独询问“精度是多少”更有助于判断实际工作点。",
        },
      ],
    },
    {
      title: "RPL型号只能根据排量范围初步筛选",
      blocks: [
        {
          type: "paragraph",
          text: "RPL的单圈排量范围可以帮助筛选名义工作区间。实际加液结果仍需结合转数、节拍、介质和完整液路进行测试。",
        },
        {
          type: "table",
          headers: ["型号", "单圈排量范围", "可优先评估的任务"],
          rows: [
            ["RPL-P4", "12–80 μL/rev", "小体积试剂加液、滴定剂输送和重复分装"],
            ["RPL-P6.35", "50–300 μL/rev", "试剂分配、滴定加液和定量灌装"],
            [
              "RPL-P15",
              "300–1200 μL/rev",
              "较大体积试剂灌装、缓冲液添加和定量输送",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "单圈排量下限不等于最小可靠加液量。确定型号后，还需要在目标试剂、管路、背压、针头和控制程序下验证。",
        },
      ],
    },
    {
      title: "相关页面",
      blocks: [
        {
          type: "links",
          ordered: true,
          items: [
            {
              href: articleHref("what-is-a-valveless-metering-pump"),
              label: "什么是无阀计量泵？工作原理、应用与选型要点",
            },
            {
              href: articleHref("rpl-valveless-metering-pump-selection-guide"),
              label: "RPL单头无阀计量泵选型指南",
            },
            {
              href: productHref,
              label: "查看RPL与DRPL无阀计量泵",
            },
          ],
        },
      ],
    },
  ],
  faqTitle: "计量泵加液排查常见问题",
  faqItems: [
    {
      question: "多次结果很接近，但一直低于目标值，是什么问题？",
      answer:
        "这种情况说明重复结果较集中，但工作点可能存在持续偏差。应使用目标试剂核对排量、转数、密度换算、背压和校准方法。",
    },
    {
      question: "为什么换了一种试剂后加液量会变化？",
      answer:
        "不同试剂的黏度、密度、表面张力和挥发性不同，会改变泵头充液、管路阻力和针尖落滴。更换试剂后应重新进行预充液和称重检查。",
    },
    {
      question: "单圈排量下限就是最小可靠加液量吗？",
      answer:
        "不是。最小可靠加液量还受驱动定位、完整循环、气泡、管路、针头和测量方法影响，需要在目标液路中验证。",
    },
  ],
  cta: {
    title: "需要排查试剂加液偏差或选择RPL型号？",
    description:
      "请提供目标体积或流量、节拍、介质、管路、背压、针头和驱动方式，由恒永达协助判断工作点与验证条件。",
    contactLabel: "咨询技术选型",
    productsLabel: "查看无阀计量泵",
    productsHref: productHref,
  },
} satisfies DiaphragmPumpEngineeringArticleCopy;

const copies = {
  "zh-CN": zhCopy,
  en: meteringPumpAccuracyRepeatabilityEn,
  es: meteringPumpAccuracyRepeatabilityEs,
  fr: meteringPumpAccuracyRepeatabilityFr,
  ko: meteringPumpAccuracyRepeatabilityKo,
  ru: meteringPumpAccuracyRepeatabilityRu,
} satisfies Record<TechnicalArticleLocale, DiaphragmPumpEngineeringArticleCopy>;

const navigationByLocale = {
  "zh-CN": [
    { id: "symptoms", label: "表现判断" },
    { id: "checks", label: "检查顺序" },
    { id: "quick-test", label: "10次检查" },
    { id: "revalidation", label: "重新检查" },
    { id: "rpl-selection", label: "RPL初选" },
    { id: "sources", label: "相关页面" },
  ],
  en: [
    { id: "symptoms", label: "Symptoms" },
    { id: "checks", label: "Check order" },
    { id: "quick-test", label: "10-run check" },
    { id: "revalidation", label: "Recheck" },
    { id: "rpl-selection", label: "RPL screening" },
    { id: "sources", label: "Related pages" },
  ],
  es: [
    { id: "symptoms", label: "Síntomas" },
    { id: "checks", label: "Orden de revisión" },
    { id: "quick-test", label: "Prueba de 10 ciclos" },
    { id: "revalidation", label: "Revalidación" },
    { id: "rpl-selection", label: "Preselección RPL" },
    { id: "sources", label: "Páginas relacionadas" },
  ],
  fr: [
    { id: "symptoms", label: "Symptômes" },
    { id: "checks", label: "Ordre de contrôle" },
    { id: "quick-test", label: "Essai en 10 cycles" },
    { id: "revalidation", label: "Revalidation" },
    { id: "rpl-selection", label: "Présélection RPL" },
    { id: "sources", label: "Pages associées" },
  ],
  ko: [
    { id: "symptoms", label: "증상 판단" },
    { id: "checks", label: "점검 순서" },
    { id: "quick-test", label: "10회 시험" },
    { id: "revalidation", label: "재확인" },
    { id: "rpl-selection", label: "RPL 선별" },
    { id: "sources", label: "관련 페이지" },
  ],
  ru: [
    { id: "symptoms", label: "Симптомы" },
    { id: "checks", label: "Порядок проверки" },
    { id: "quick-test", label: "Тест из 10 циклов" },
    { id: "revalidation", label: "Повторная проверка" },
    { id: "rpl-selection", label: "Выбор RPL" },
    { id: "sources", label: "Связанные страницы" },
  ],
} as const satisfies Record<
  TechnicalArticleLocale,
  readonly { id: string; label: string }[]
>;

const subjectByLocale = {
  "zh-CN": {
    about: ["计量泵准确性", "计量泵重复性", "试剂加液验证"],
    mentions: ["RPL-P4", "RPL-P6.35", "RPL-P15", "平均相对偏差", "相对标准差"],
  },
  en: {
    about: [
      "metering pump accuracy",
      "metering pump repeatability",
      "reagent dispensing validation",
    ],
    mentions: [
      "RPL-P4",
      "RPL-P6.35",
      "RPL-P15",
      "mean deviation from target",
      "relative standard deviation",
    ],
  },
  es: {
    about: [
      "exactitud de la bomba dosificadora",
      "repetibilidad de la bomba dosificadora",
      "validación de dosificación de reactivos",
    ],
    mentions: [
      "RPL-P4",
      "RPL-P6.35",
      "RPL-P15",
      "desviación respecto al objetivo",
      "desviación estándar relativa",
    ],
  },
  fr: {
    about: [
      "exactitude de la pompe doseuse",
      "répétabilité de la pompe doseuse",
      "validation du dosage de réactifs",
    ],
    mentions: [
      "RPL-P4",
      "RPL-P6.35",
      "RPL-P15",
      "écart par rapport à la cible",
      "écart-type relatif",
    ],
  },
  ko: {
    about: ["정량펌프 정확도", "정량펌프 반복성", "시약 주입 검증"],
    mentions: [
      "RPL-P4",
      "RPL-P6.35",
      "RPL-P15",
      "목표값 대비 평균 편차",
      "상대표준편차",
    ],
  },
  ru: {
    about: [
      "точность дозирующего насоса",
      "повторяемость дозирующего насоса",
      "валидация дозирования реагентов",
    ],
    mentions: [
      "RPL-P4",
      "RPL-P6.35",
      "RPL-P15",
      "отклонение от целевого значения",
      "относительное стандартное отклонение",
    ],
  },
} as const satisfies Record<
  TechnicalArticleLocale,
  { about: readonly string[]; mentions: readonly string[] }
>;

export function getMeteringPumpAccuracyRepeatabilityNavigation(
  locale: TechnicalArticleLocale,
) {
  return navigationByLocale[locale];
}

export function getMeteringPumpAccuracyRepeatabilitySubject(
  locale: TechnicalArticleLocale,
) {
  return subjectByLocale[locale];
}

export function getMeteringPumpAccuracyRepeatabilityCopy(
  slug: string,
  locale: TechnicalArticleLocale,
) {
  if (slug !== meteringPumpAccuracyRepeatabilitySlug) return null;
  return copies[locale];
}

function blockText(block: EngineeringArticleBlock): string {
  switch (block.type) {
    case "paragraph":
      return block.text;
    case "notice":
      return [block.label, block.text].filter(Boolean).join(" ");
    case "formula":
      return [block.expression, block.note].filter(Boolean).join(" ");
    case "table":
      return [block.headers, ...block.rows]
        .map((row) => row.join(" | "))
        .join("\n");
    case "figure":
      return block.caption;
    case "subheading":
      return block.title;
    case "list":
      return block.items.join("\n");
    case "links":
      return block.items.map((item) => item.label).join("\n");
  }
}

export function getMeteringPumpAccuracyRepeatabilityArticles(
  locale: TechnicalArticleLocale,
): TechnicalArticleItem[] {
  const copy = copies[locale];

  return [
    {
      id: meteringPumpAccuracyRepeatabilitySlug,
      slug: meteringPumpAccuracyRepeatabilitySlug,
      category: "pumps-valves",
      ...copy.metadata,
      summary: copy.deck,
      date: "2026-09-24",
      relationKeys: ["series:rpl"],
      relationPriority: 165,
      content: [
        {
          title: "",
          content: copy.leadBlocks.map(blockText).join("\n\n"),
        },
        ...copy.sections.map((section) => ({
          title: section.title,
          content: section.blocks.map(blockText).join("\n"),
        })),
        {
          title: copy.faqTitle,
          content: copy.faqItems
            .map((item) => `${item.question}\n${item.answer}`)
            .join("\n\n"),
        },
      ],
    },
  ];
}
