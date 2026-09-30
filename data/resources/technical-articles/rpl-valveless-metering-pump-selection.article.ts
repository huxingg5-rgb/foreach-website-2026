import type {
  DiaphragmPumpEngineeringArticleCopy as EngineeringArticleCopy,
  EngineeringArticleBlock,
} from "./diaphragm-pump-engineering-article.types";
import type {
  TechnicalArticleItem,
  TechnicalArticleLocale,
} from "./technical-articles.types";
import { getValvelessPumpPath } from "@/data/products/selection/valveless-pump-routes";
import { rplSelectionEn } from "./rpl-selection-locales/en";
import { rplSelectionEs } from "./rpl-selection-locales/es";
import { rplSelectionFr } from "./rpl-selection-locales/fr";
import { rplSelectionKo } from "./rpl-selection-locales/ko";
import { rplSelectionRu } from "./rpl-selection-locales/ru";
import { rplArticleUi } from "./rpl-selection-locales/ui";
import { rplSelectionArticleSlug } from "./rpl-selection-links";
import { getRplSelectionSourceHrefs } from "./rpl-selection-sources";

const sourceHrefs = getRplSelectionSourceHrefs("zh-CN");

// Approved article and its translations. Only this article opts into the isolated RPL template.
export { rplSelectionArticleSlug } from "./rpl-selection-links";

export const rplSelectionProducts = [
  {
    name: "RPL-P4",
    href: getValvelessPumpPath("zh-CN", "rpl-p4"),
    image: "/images/products/pumps/valveless-pumps/foreach-rpl-p4-valveless-pump.webp",
    alt: "RPL-P4 单头无阀计量泵外观",
  },
  {
    name: "RPL-P6.35",
    href: getValvelessPumpPath("zh-CN", "rpl-p635"),
    image: "/images/products/pumps/valveless-pumps/foreach-rpl-p635-valveless-pump.webp",
    alt: "RPL-P6.35 单头无阀计量泵外观",
  },
  {
    name: "RPL-P15",
    href: getValvelessPumpPath("zh-CN", "rpl-p15"),
    image: "/images/products/pumps/valveless-pumps/foreach-rpl-p15-valveless-pump.webp",
    alt: "RPL-P15 单头无阀计量泵外观",
  },
] as const;

export function getRplSelectionProducts(locale: TechnicalArticleLocale) {
  const modelSlugs = ["rpl-p4", "rpl-p635", "rpl-p15"] as const;
  return rplSelectionProducts.map((product, index) => ({
    ...product,
    href: getValvelessPumpPath(locale, modelSlugs[index]),
    alt: `${product.name} ${rplArticleUi[locale].productAlt}`,
  }));
}

export const rplSelectionFaqItems = [
  {
    "question": "降低转速，就能减小每次加液量吗？",
    "answer": "如果排量和完整运行圈数不变，降低转速主要延长加液时间，名义加液量不变。如果按固定时间启停，转速变化会影响累计圈数和输送量，需要重新校准。"
  },
  {
    "question": "单圈排量下限就是最小加液量吗？",
    "answer": "不是。单圈排量下限是完整转动周期的名义输出参数。最小可靠加液量还与驱动定位、液体、管路及针尖状态有关，应按目标工况测量。"
  },
  {
    "question": "泵头采用聚偏二氟乙烯，是否就能适配所有试剂？",
    "answer": "不能只看泵头。需要逐一确认陶瓷件、接头、管路及其他接液部件，并结合试剂与清洗液的成分、浓度、温度和接触时间判断兼容性。"
  },
  {
    "question": "无阀结构是否意味着设备中完全不需要阀？",
    "answer": "不是。RPL 的无阀结构通过陶瓷柱塞的旋转与往复配合完成吸排液；整机是否需要切换阀、隔离阀或其他液路部件，取决于供液、清洗及安全控制方案。"
  },
  {
    "question": "两种液体按比例配液，能直接用一台 RPL 单头泵吗？",
    "answer": "不能仅凭一台单头泵独立控制两条液路的体积比。应另行评估第二液路、控制方式或 DRPL 双头配置，同时确认下游汇流与混合要求。"
  }
] as const;

// FAQ is included at its approved position in sections. Do not render it a second time.
const rplSelectionCopy: EngineeringArticleCopy = {
  "metadata": {
    "title": "无阀计量泵选型指南：恒永达型号对比与应用要点",
    "seoTitle": "无阀计量泵选型指南：恒永达型号对比与应用要点",
    "seoDescription": "从单次加液量、允许时间、接液材料与液路条件出发，对比 RPL-P4、RPL-P6.35 和 RPL-P15 无阀计量泵，了解试剂分配、滴定加液、定量灌装的选型与验证方法。",
    "coverImage": "/images/products/pumps/valveless-pumps/foreach-rpl-p635-valveless-pump.webp",
    "coverAlt": "FOREACH RPL-P6.35 单头无阀计量泵"
  },
  "deck": "无阀计量泵选型应先明确单次加液量和允许加液时间，再核对单圈排量、驱动转速、接液材料、背压及接口，最后通过实际液路测试确认输出表现。不能仅凭“流量够不够”或“是不是计量泵”决定型号。",
  "leadBlocks": [
    {
      "type": "paragraph",
      "text": "无阀计量泵选型应先明确单次加液量和允许加液时间，再核对单圈排量、驱动转速、接液材料、背压及接口，最后通过实际液路测试确认输出表现。不能仅凭“流量够不够”或“是不是计量泵”决定型号。"
    },
    {
      "type": "paragraph",
      "text": "本文以 FOREACH RPL-P4、RPL-P6.35 和 RPL-P15 单头无阀计量泵为例，说明如何把设备中的试剂分配、滴定加液和定量分装要求，转化为可比较、可验证的选型条件。"
    }
  ],
  "sections": [
    {
      "title": "无阀计量泵选型要看哪些参数？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "先把“每次需要多少液体”和“留给泵多少时间”写清楚，再查型号参数。相同的单次加液量，在连续分装、间歇加液和滴定增量控制中，对驱动及液路的要求并不相同。"
        },
        {
          "type": "subheading",
          "title": "区分单圈排量、单次加液量和平均流量"
        },
        {
          "type": "paragraph",
          "text": "三个参数分别回答不同的问题"
        },
        {
          "type": "table",
          "headers": [
            "参数",
            "含义与单位",
            "用于核对什么"
          ],
          "rows": [
            [
              "单圈排量",
              "当前排量设置下，一个完整转动周期的名义输出体积，单位 μL/rev。",
              "每圈输出多少，如何搭配运行圈数。"
            ],
            [
              "单次加液量",
              "一次操作需要加入容器的体积，单位 μL 或 mL。",
              "设备每次需要加入多少液体。"
            ],
            [
              "平均流量",
              "单位时间内的平均输送体积，单位 μL/min 或 mL/min。",
              "能否在分配给泵的时间内完成任务。"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "在排量固定、完整周期输出的名义估算中，加液量由单圈排量与运行圈数共同决定；转速主要影响完成这些周期需要的时间。平均流量也不表示每个瞬间的流量完全相同。"
        },
        {
          "type": "formula",
          "expression": "单次加液量 = 单圈排量 × 运行圈数"
        },
        {
          "type": "formula",
          "expression": "平均流量 = 单圈排量 × 转速"
        },
        {
          "type": "paragraph",
          "text": "两式须统一体积单位。这里用于完整周期的名义估算，不代表任意小角度输出已经验证。"
        },
        {
          "type": "subheading",
          "title": "例：2 秒加入 1 mL，需要多大流量？"
        },
        {
          "type": "paragraph",
          "text": "如果留给泵的净加液时间为 2 秒，目标为 1 mL，则加液阶段所需平均流量为："
        },
        {
          "type": "formula",
          "expression": "1 mL ÷ 2 s × 60 s/min = 30 mL/min"
        },
        {
          "type": "paragraph",
          "text": "这只是设备需求的换算，不是某个型号的实测能力。如果整机每 2 秒完成一个工位，其中还有换瓶、针头升降或检测等待，泵实际可用的时间会更短，应扣除这些时间后重新计算。"
        },
        {
          "type": "subheading",
          "title": "核对接液材料、接口和清洗方式"
        },
        {
          "type": "paragraph",
          "text": "先列出工作液体和清洗液的成分、浓度及温度，再核对泵头、陶瓷件、接头、管路等全部接液部件。仅知道泵头材料，不能判断整套液路是否兼容；容易结晶或留下残留的液体，还应明确停机后的冲洗方式。"
        },
        {
          "type": "paragraph",
          "text": "接口除了螺纹规格，还要核对连接形式、管径和安装空间。工作端口与清洗端口用途不同，应按配置图纸接管，不能只看螺纹相同就互换。"
        },
        {
          "type": "subheading",
          "title": "把背压、入口条件和驱动纳入选型"
        },
        {
          "type": "paragraph",
          "text": "记录入口液位、吸液高度、管路长度与内径，以及针头、过滤器等出口阻力。驱动侧应确认可用转速、起停过程和定位方式；泵能否达到所需平均流量，还要结合这些条件验证。"
        },
        {
          "type": "paragraph",
          "text": "耐压参数与准确度测试条件不是同一回事。例如，RPL-P6.35 与 RPL-P15 现有英文规格书的性能测试采用纯水，所列液体压力条件为不超过 50 kPa，测试转速分别为 100 rpm 与 300 rpm。不能将规格表中的结果直接当作任意试剂和背压下的输出保证。"
        }
      ]
    },
    {
      "title": "RPL-P4、RPL-P6.35 和 RPL-P15 怎么选？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "三个型号首先按单圈排量区分，再结合加液时间、材料与接口缩小范围。排量较大不等于适合所有小剂量任务；同一个目标体积，也可能由不同排量和圈数组合完成。"
        },
        {
          "type": "paragraph",
          "text": "RPL 单头系列基础参数对比"
        },
        {
          "type": "table",
          "headers": [
            "对比项目",
            "RPL-P4",
            "RPL-P6.35",
            "RPL-P15"
          ],
          "rows": [
            [
              "单圈排量",
              "12–80 μL/rev",
              "50–300 μL/rev",
              "300–1200 μL/rev"
            ],
            [
              "转速范围",
              "5–300 rpm",
              "5–300 rpm",
              "5–300 rpm"
            ],
            [
              "泵头材料",
              "聚偏二氟乙烯（PVDF）",
              "聚偏二氟乙烯（PVDF）",
              "聚偏二氟乙烯（PVDF）"
            ],
            [
              "工作液路接口",
              "1/4-28 UNF-2B",
              "1/4-28 UNF-2B",
              "G1/8"
            ]
          ]
        },
        {
          "type": "links",
          "items": [
            { "prefix": "数据来源：RPL-P4 为", "label": "产品资料", "href": sourceHrefs.product, "suffix": "；RPL-P6.35 与 RPL-P15 为" },
            { "label": "现有英文规格书", "href": sourceHrefs.datasheet, "suffix": "。表中范围用于初步筛选，具体排量设置和连接配置需对应到所选产品。" }
          ]
        },
        {
          "type": "subheading",
          "title": "小剂量任务先核对目标体积，不直接按排量下限判断"
        },
        {
          "type": "paragraph",
          "text": "RPL-P4 的单圈排量范围较小，可以从小体积试剂加入、滴定增量或重复分装任务出发评估。但 12 μL/rev 表示单圈排量范围下限，并不是已验证的最小可靠剂量。目标量越小，越需要关注驱动定位、管路弹性、气泡和针尖残液对实际交付体积的影响。"
        },
        {
          "type": "subheading",
          "title": "较大加液量要同时比较圈数和完成时间"
        },
        {
          "type": "paragraph",
          "text": "RPL-P6.35 与 RPL-P15 覆盖不同的单圈排量范围。对于同一个目标加液量，可以先按可用排量和转速核算名义运行时间，再比较实际起停和液滴进入容器的过程。不要仅因为一个型号每圈输出更多，就直接认定它的整机分装节拍更快。"
        },
        {
          "type": "paragraph",
          "text": "现有规格书列出的 RPL-P6.35 标准排量包括 50、100、200、300 μL；RPL-P15 包括 400、800、1000、1200 μL，并说明可在各自范围内提供非标准配置。因此，表中一个数值落在范围内，并不等于当前供货配置已设置为该排量。"
        },
        {
          "type": "subheading",
          "title": "材料与端口也可能决定最终型号"
        },
        {
          "type": "paragraph",
          "text": "RPL-P6.35 的陶瓷件为氧化锆（ZrO₂），RPL-P15 为氧化铝（Al₂O₃）；两者的工作接口分别为 1/4-28 UNF-2B 和 G1/8，清洗接口均列为 1/4-28 UNF-2B。即使加液量与时间都能匹配，也要继续核对试剂兼容性、清洗安排和接管方式。"
        }
      ]
    },
    {
      "title": "试剂分配、滴定和灌装，选型重点有什么不同？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "“无阀计量泵”描述泵的结构与功能，而“试剂分配泵”“滴定加液泵”“定量灌装泵”描述设备中的任务。同一结构可以承担不同任务，同一种任务也可能采用其他泵结构。FMI 对分配与计量的说明，以及易威奇 VMP 的产品命名，均体现了按用途描述产品的方式。"
        },
        {
          "type": "paragraph",
          "text": "先按设备任务沟通，再匹配泵的结构与配置"
        },
        {
          "type": "table",
          "headers": [
            "行业或设备场景",
            "可能使用的名称",
            "优先确认"
          ],
          "rows": [
            [
              "自动化分析仪器、样品前处理设备",
              "试剂分配泵、试剂加液泵",
              "每次试剂加入量、允许时间、停顿后首剂。"
            ],
            [
              "自动滴定仪、实验室滴定装置",
              "滴定加液泵、滴定剂加注泵",
              "最小目标增量、加液间隔、混合与读数等待。"
            ],
            [
              "试剂分装设备、小容器灌装工位",
              "试剂灌装泵、定量分装泵",
              "每瓶装量、装量一致性、换瓶与收滴时间。"
            ],
            [
              "仪器连续供液模块",
              "液体计量泵、定量供液泵",
              "工作流量、运行时长、背压与流量波动要求。"
            ]
          ]
        },
        {
          "type": "subheading",
          "title": "试剂分配：关注真正进入反应容器的量"
        },
        {
          "type": "paragraph",
          "text": "反应杯加液应同时规定目标体积和时间窗口。如果设备间歇运行，还要分别测试连续加液和停顿后的第一剂。验证时在实际针头出口接液，保持正常安装高度与液路阻力，避免只测泵口输出而漏掉针尖余滴、挂壁或气泡造成的差异。"
        },
        {
          "type": "subheading",
          "title": "滴定加液：关注增量、响应与读数时序"
        },
        {
          "type": "paragraph",
          "text": "滴定过程接近终点时，设备可能需要减小每次加入的体积。应先列出粗加液与精加液阶段的目标增量，再测试每次指令对应的实际输出、起停响应和液滴脱离情况。混合稳定与检测读数要单独安排；泵负责输送，终点判断由仪器的检测与控制系统完成。"
        },
        {
          "type": "subheading",
          "title": "定量灌装：关注完整周期，而不只是泵运行时间"
        },
        {
          "type": "paragraph",
          "text": "每瓶装量确定后，还需把容器换位、针头动作、液滴脱离及必要等待放入节拍表。对易起泡或挂壁液体，除称量结果外，还应观察液体是否完整进入容器。验收装量一致性时，应固定出口位置和收液方式，并覆盖实际运行中的暂停与重启。"
        },
        {
          "type": "subheading",
          "title": "连续供液：关注一段时间内的累计量和波动要求"
        },
        {
          "type": "paragraph",
          "text": "连续供液不仅要核对平均流量，还要明确下游能接受多大的流量波动。测试应覆盖预期运行时长、入口液位变化和出口阻力变化；如果工艺对瞬时流量敏感，应把该要求单独交给供应商评估，不能用平均流量替代。"
        }
      ]
    },
    {
      "title": "怎样验证无阀计量泵的实际加液表现？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "验证目标应是“在实际液路和节拍下，液体是否按要求进入目标容器”。参数计算用于缩小候选范围，样机测试用于确认具体配置。建议按以下顺序记录，避免只看某一次接液结果。"
        },
        {
          "type": "subheading",
          "title": "固定液体与液路条件，完成预充排气"
        },
        {
          "type": "paragraph",
          "text": "记录液体成分、浓度、温度、入口液位、管路长度与内径、针头规格、出口背压、排量设置和驱动程序。检查接头密封，用实际液体预充到出口后，再开始计量。"
        },
        {
          "type": "subheading",
          "title": "分别计算平均偏差和重复性"
        },
        {
          "type": "paragraph",
          "text": "在同一设置下做多次独立接液，记录每次结果。平均偏差反映平均输出与目标量的距离；重复性反映多次输出是否集中。平均值接近目标，并不表示每次都接近目标。"
        },
        {
          "type": "paragraph",
          "text": "采用称重法时，先扣除容器质量，再按测试温度下的液体密度换算体积；同时检查天平分辨率、蒸发和操作时间是否会明显影响结果。"
        },
        {
          "type": "subheading",
          "title": "单独记录暂停后的第一剂"
        },
        {
          "type": "paragraph",
          "text": "按设备实际停顿时间恢复加液，将首剂与后续连续剂量分别记录。这样能发现只在暂停后出现的回缩、余滴、气泡或首剂偏差，而不是让连续运行平均值掩盖问题。"
        },
        {
          "type": "subheading",
          "title": "在完整节拍和边界条件下复测"
        },
        {
          "type": "paragraph",
          "text": "把换瓶、针头动作、混合及检测等待加回流程，并覆盖预期的入口液位、温度和出口阻力变化。记录实际到液时间和完整周期，确认装量与节拍能同时满足要求。"
        },
        {
          "type": "paragraph",
          "text": "三类常见现象的排查入口"
        },
        {
          "type": "table",
          "headers": [
            "观察现象",
            "优先检查",
            "下一步"
          ],
          "rows": [
            [
              "多次结果偏差方向相近",
              "设定值、单位换算、排量校准、液体密度。",
              "核对后重新测量平均输出。"
            ],
            [
              "单次输出波动较大",
              "气泡、供液状态、接头密封、针尖液滴。",
              "固定条件，逐项排查并复测。"
            ],
            [
              "连续正常，暂停后首剂异常",
              "停机回缩、残液、余滴、暂停时长。",
              "复现停顿，独立记录首剂。"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "这些现象用于安排检查顺序，不能仅凭一项现象确定故障原因。样本数量、允许偏差和重复性指标应在测试前约定。"
        }
      ]
    },
    {
      "title": "无阀计量泵选型常见问题",
      "blocks": [
        {
          "type": "subheading",
          "title": "降低转速，就能减小每次加液量吗？"
        },
        {
          "type": "paragraph",
          "text": "如果排量和完整运行圈数不变，降低转速主要延长加液时间，名义加液量不变。如果按固定时间启停，转速变化会影响累计圈数和输送量，需要重新校准。"
        },
        {
          "type": "subheading",
          "title": "单圈排量下限就是最小加液量吗？"
        },
        {
          "type": "paragraph",
          "text": "不是。单圈排量下限是完整转动周期的名义输出参数。最小可靠加液量还与驱动定位、液体、管路及针尖状态有关，应按目标工况测量。"
        },
        {
          "type": "subheading",
          "title": "泵头采用聚偏二氟乙烯，是否就能适配所有试剂？"
        },
        {
          "type": "paragraph",
          "text": "不能只看泵头。需要逐一确认陶瓷件、接头、管路及其他接液部件，并结合试剂与清洗液的成分、浓度、温度和接触时间判断兼容性。"
        },
        {
          "type": "subheading",
          "title": "无阀结构是否意味着设备中完全不需要阀？"
        },
        {
          "type": "paragraph",
          "text": "不是。RPL 的无阀结构通过陶瓷柱塞的旋转与往复配合完成吸排液；整机是否需要切换阀、隔离阀或其他液路部件，取决于供液、清洗及安全控制方案。"
        },
        {
          "type": "subheading",
          "title": "两种液体按比例配液，能直接用一台 RPL 单头泵吗？"
        },
        {
          "type": "paragraph",
          "text": "不能仅凭一台单头泵独立控制两条液路的体积比。应另行评估第二液路、控制方式或 DRPL 双头配置，同时确认下游汇流与混合要求。"
        }
      ]
    }
  ],
  "faqTitle": "无阀计量泵选型常见问题",
  "faqItems": [],
  "cta": {
    "title": "需要进一步确认产品选型或应用条件？",
    "description": "您可以提交具体介质、压力、管路尺寸、应用场景或图纸信息，由恒永达协助进行产品匹配与技术确认。",
    "contactLabel": "联系我们",
    "productsLabel": "查看产品"
  }
};

export function getRplSelectionArticleCopy(
  slug: string,
  locale: TechnicalArticleLocale,
): EngineeringArticleCopy | null {
  return slug === rplSelectionArticleSlug
    ? rplSelectionCopies[locale]
    : null;
}

const rplSelectionCopies: Record<TechnicalArticleLocale, EngineeringArticleCopy> = {
  "zh-CN": rplSelectionCopy,
  en: rplSelectionEn,
  es: rplSelectionEs,
  fr: rplSelectionFr,
  ko: rplSelectionKo,
  ru: rplSelectionRu,
};

// Structured FAQ and visible FAQ always come from the same localized paragraphs.
export function getRplSelectionFaqItems(locale: TechnicalArticleLocale) {
  const blocks = rplSelectionCopies[locale].sections[4].blocks;
  return blocks.flatMap((block, index) => {
    const answer = blocks[index + 1];
    return block.type === "subheading" && answer?.type === "paragraph"
      ? [{ question: block.title, answer: answer.text }]
      : [];
  });
}

function blockText(block: EngineeringArticleBlock): string {
  switch (block.type) {
    case "paragraph": return block.text;
    case "notice": return [block.label, block.text].filter(Boolean).join(" ");
    case "formula": return [block.expression, block.note].filter(Boolean).join(" ");
    case "table": return [block.headers, ...block.rows].map(row => row.join(" | ")).join("\n");
    case "figure": return [block.alt, block.caption].join(" ");
    case "subheading": return block.title;
    case "list": return block.items.join("\n");
    case "links": return block.items.map(item => `${item.prefix ?? ""}${item.label}${item.suffix ?? ""}`).join("");
  }
}

export function getRplSelectionArticles(locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  const copy = rplSelectionCopies[locale];

  return [{
    id: rplSelectionArticleSlug,
    slug: rplSelectionArticleSlug,
    category: "pumps-valves",
    ...copy.metadata,
    summary: copy.deck,
    date: "2026-09-16",
    content: [
      { title: "", content: copy.leadBlocks.map(blockText).join("\n\n") },
      ...copy.sections.map(section => ({
        title: section.title,
        content: section.blocks.map(blockText).join("\n\n"),
      })),
    ],
  }];
}
