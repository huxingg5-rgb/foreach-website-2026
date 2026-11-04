import type { DiaphragmPumpEngineeringArticleCopy } from "../diaphragm-pump-engineering-article.types";
import { getDiaphragmPumpCardPhoto } from "@/data/products/detail/diaphragm-pump-reference-models";

// Chinese local article: diaphragm pump overview (pillar page for the diaphragm pump articles).
// Third-party photos are Wikimedia Commons images under CC BY-SA 4.0; keep the attribution in captions.
const imageBase = "/images/resources/technical-articles/instrument-fluidics/what-is-a-diaphragm-pump";
// FOREACH product photos use the same card images as the product category page.
const dpl30Card = getDiaphragmPumpCardPhoto("dpl30-brushless") ?? "/images/products/pumps/diaphragm-pumps/dpl30/images/foreach-dpl30-bb-brushless-labeled-front-card.webp";
const dpgl800Card = getDiaphragmPumpCardPhoto("dpgl800-brushless") ?? "/images/products/pumps/diaphragm-pumps/dpgl800/images/foreach-dpgl800-6l-min-gas-brushless-diaphragm-vacuum-pump.webp";

export const copy = {
  "metadata": {
    "title": "什么是隔膜泵？工作原理、类型、优缺点与选型",
    "seoTitle": "什么是隔膜泵？工作原理、类型、优缺点与选型｜恒永达 FOREACH",
    "seoDescription": "了解隔膜泵的工作原理，气动双隔膜泵、电动隔膜泵、隔膜计量泵、隔膜真空泵和微型隔膜泵的区别，隔膜泵的优点与局限、主要应用，以及按介质、流量、压力和材料选型的要点。",
    "coverImage": dpl30Card,
    "coverAlt": "恒永达 DPL30 微型液体隔膜泵"
  },
  "deck": "隔膜泵是一种容积式泵，靠柔性隔膜往复运动和进、出口单向阀输送液体或气体。本文介绍隔膜泵的工作原理、主要类型、优缺点、应用和选型要点。",
  "leadBlocks": [
    {
      "type": "paragraph",
      "text": "隔膜泵是一种容积式泵。它靠一片柔性隔膜来回运动，配合进、出口两个单向阀，把液体或气体从入口吸进来，再从出口推出去。"
    },
    {
      "type": "paragraph",
      "text": "被输送的介质只接触泵腔、隔膜和阀片，不接触电机、轴承等驱动部件。因为没有动密封，隔膜泵不容易泄漏，适合输送腐蚀性、易污染或需要保持洁净的介质。"
    },
    {
      "type": "paragraph",
      "text": "从化工厂里大流量输送浆料的气动隔膜泵，到仪器里每分钟几毫升到几百毫升的微型隔膜泵，工作原理是一样的。"
    }
  ],
  "sections": [
    {
      "title": "隔膜泵是怎么工作的",
      "tocLabel": "工作原理",
      "blocks": [
        {
          "type": "paragraph",
          "text": "隔膜泵的每个工作周期分为吸入和排出两个冲程，靠泵腔容积的变化和两个单向阀的配合来输送介质。"
        },
        {
          "type": "figure",
          "src": `${imageBase}/diaphragm-pump-working-principle.svg`,
          "alt": "隔膜泵吸入冲程与排出冲程工作原理示意图",
          "width": 1520,
          "height": 640,
          "caption": "隔膜泵工作原理示意：红色竖线表示关闭的单向阀，蓝色箭头表示介质流向。"
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "吸入冲程：隔膜往下拉，泵腔容积变大、压力下降。入口单向阀在压差作用下打开，出口单向阀关闭，介质被吸进泵腔。",
            "排出冲程：隔膜往上推，泵腔容积变小、压力升高。出口单向阀打开，入口单向阀关闭，介质被推出泵腔。"
          ]
        },
        {
          "type": "paragraph",
          "text": "两个冲程不断交替，就形成了连续但带脉动的流动。单腔泵只在排出冲程出液，脉动比较明显；双隔膜或多腔结构让各腔轮流排液，流动会平稳得多。"
        },
        {
          "type": "subheading",
          "title": "关键部件"
        },
        {
          "type": "list",
          "items": [
            "隔膜：把介质和驱动部件隔开，同时反复变形来改变泵腔容积。常用 EPDM、FKM、PTFE 等材料，按介质的腐蚀性和温度来选。",
            "单向阀：只允许介质单向流动。阀片密封是否良好，直接影响自吸能力和实际流量。",
            "泵头：形成泵腔、和介质接触的壳体，常见 PP、PPS、PVDF 等工程塑料，工业泵也有铝合金和不锈钢。",
            "驱动机构：推动隔膜的动力来源，可以是电机加偏心轮或连杆、压缩空气，也可以是电磁铁。驱动方式不同，就形成了不同类型的隔膜泵。"
          ]
        },
        {
          "type": "subheading",
          "title": "流量由什么决定"
        },
        {
          "type": "paragraph",
          "text": "隔膜泵的理论流量等于每次冲程的排量乘以冲程频率。装进设备以后，实际流量还会受吸程、出口背压、管径和介质粘度影响，一般低于样本上的自由流量。"
        },
        {
          "type": "paragraph",
          "text": "所以选型时要看泵的流量—压力曲线，确认在实际管路的压力下还有多少流量，而不是只看最大流量。"
        },
        {
          "type": "paragraph",
          "text": "下面是恒永达 DPL30 微型液体隔膜泵的流量—压力曲线。压力为 0 时流量略高于 300 mL/min；出口背压升到 100 kPa，流量只剩约 160 mL/min，差不多减半。入口负压变大（吸得更高、入口阻力更大）时，流量同样会下降。"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/dpl30-liquid-diaphragm-pump/dpl30-flow-pressure.jpg",
          "alt": "恒永达 DPL30 微型液体隔膜泵流量—压力曲线",
          "width": 2080,
          "height": 668,
          "caption": "DPL30 流量—压力曲线：横轴左侧为入口负压，右侧为出口正压，纵轴为流量。",
          "link": {
            "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
            "label": "详细了解：隔膜泵流量—压力曲线怎么看"
          }
        },
        {
          "type": "links",
          "items": [
            {
              "prefix": "管路会产生多少压降，可以先用",
              "href": "/resources/calculators/fluid-resistance/",
              "label": "流阻计算器",
              "suffix": "按管径、管长和流量估算，再到曲线上读出这个压力下的流量。"
            }
          ]
        }
      ]
    },
    {
      "title": "隔膜泵有哪些类型",
      "tocLabel": "主要类型",
      "blocks": [
        {
          "type": "paragraph",
          "text": "隔膜泵主要按驱动方式和用途来分。工业现场最常见的是气动双隔膜泵，仪器和设备里最常见的是微型电动隔膜泵。"
        },
        {
          "type": "table",
          "headers": ["类型", "驱动方式", "流量量级", "常见用途"],
          "rows": [
            ["气动双隔膜泵（AODD）", "压缩空气推动两片隔膜交替工作", "大，每分钟数十到数百升", "化工、涂料、污水、浆料输送"],
            ["电动隔膜泵", "电机经偏心轮或连杆带动隔膜", "范围很宽，从每分钟几毫升到几十升", "设备内输送、喷雾、净水"],
            ["电磁隔膜泵 / 隔膜计量泵", "电磁铁或电机驱动，可调冲程和频率", "小到中，强调计量精度", "水处理加药、化工投料"],
            ["隔膜真空泵 / 气泵", "电机驱动，输送气体", "按抽气量计", "实验室真空过滤、气体采样、负压吸液"],
            ["微型隔膜泵", "电动隔膜泵的小型版本，直流有刷或无刷电机", "每分钟几毫升到几百毫升（液体）", "分析仪器、实验室自动化、环境监测、打印墨路"]
          ]
        },
        {
          "type": "subheading",
          "title": "气动双隔膜泵（AODD）"
        },
        {
          "type": "paragraph",
          "text": "气动双隔膜泵用压缩空气交替推动两片隔膜，一片吸液的同时另一片排液。它不用电，适合有防爆要求的场合，也能输送含颗粒的浆料和高粘度液体。它的缺点是必须有气源，耗气量大，排气噪声也比较大。"
        },
        {
          "type": "figure",
          "src": `${imageBase}/aodd-tapflo-t50.jpg`,
          "alt": "Tapflo T50 气动双隔膜泵",
          "width": 900,
          "height": 480,
          "caption": "Tapflo T50 气动双隔膜泵。图片：Aleksander Ma，CC BY-SA 4.0，来自 Wikimedia Commons。"
        },
        {
          "type": "subheading",
          "title": "电动隔膜泵"
        },
        {
          "type": "paragraph",
          "text": "电动隔膜泵由电机通过偏心轮或连杆带动隔膜往复运动。流量和电机转速对应，可以通过电压或驱动器调速。大型电动隔膜泵用于工业输送，小型的则装在各种设备里。"
        },
        {
          "type": "subheading",
          "title": "电磁隔膜泵与隔膜计量泵"
        },
        {
          "type": "paragraph",
          "text": "电磁隔膜泵用电磁铁推动隔膜，每收到一个电脉冲就完成一次冲程，通过调节脉冲频率和冲程长度来控制投加量。隔膜计量泵强调计量精度，常用于水处理加药和化工投料。"
        },
        {
          "type": "subheading",
          "title": "隔膜真空泵和气泵"
        },
        {
          "type": "paragraph",
          "text": "这类隔膜泵输送的是气体。泵腔里没有油，抽出的气体不会被油污染，常用于实验室真空过滤、气体采样，以及设备里的负压吸液。"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump/dpgl800-gas-flow-pressure-curve.webp",
          "alt": "恒永达 DPGL800 气液隔膜泵气体流量—压力曲线",
          "width": 2363,
          "height": 1100,
          "caption": "恒永达 DPGL800 气体流量—压力曲线：压力为 0 时单泵头气体流量约 6 L/min；负压越深流量越小，接近 -90 kPa 时趋近于零，这就是它能抽到的极限负压。"
        },
        {
          "type": "subheading",
          "title": "微型隔膜泵"
        },
        {
          "type": "paragraph",
          "text": "微型隔膜泵体积小、功耗低，用直流供电，容易装进仪器和设备内部。选型时主要看三组区别："
        },
        {
          "type": "list",
          "items": [
            "液体泵和气液泵：液体泵用于输送液体，比如清洗、补液、循环。气液泵可以同时抽气体和液体，适合废液抽吸和负压吸液。",
            "有刷电机和无刷电机：无刷电机寿命更长、更安静，适合长时间连续运行；有刷电机结构简单、成本低，适合间歇使用。",
            "标准压力和高压：出口背压大的液路，比如细管、长管路或带喷嘴的，需要选高压型。"
          ]
        },
        {
          "type": "links",
          "items": [
            {
              "prefix": "恒永达的微型隔膜泵也按这三组区别来分：",
              "href": "/products/pumps/miniature-diaphragm-pumps/dpl30-bb/",
              "label": "DPL30",
              "suffix": "（300 mL/min）和 "
            },
            {
              "href": "/products/pumps/miniature-diaphragm-pumps/dpl60-bb/",
              "label": "DPL60",
              "suffix": "（600 mL/min）是标准压力液体泵，额定压力 100 kPa；"
            },
            {
              "href": "/products/pumps/miniature-diaphragm-pumps/dpl30h-bs/",
              "label": "DPL30H",
              "suffix": " 是高压液体泵，额定压力 600 kPa。这三个系列都有有刷和无刷两种电机。"
            },
            {
              "href": "/products/pumps/miniature-diaphragm-pumps/dpgl800-bs/",
              "label": "DPGL800",
              "suffix": " 是 24 V 无刷气液隔膜泵，单泵头空载气体流量 6 L/min，用于废液抽吸和负压吸液，不适合输送纯液体。"
            }
          ]
        },
        {
          "type": "figure",
          "src": dpl30Card,
          "alt": "恒永达 DPL30 微型液体隔膜泵",
          "width": 2000,
          "height": 1500,
          "caption": "恒永达 DPL30 微型液体隔膜泵。"
        },
        {
          "type": "figure",
          "src": dpgl800Card,
          "alt": "恒永达 DPGL800 微型气液隔膜泵",
          "width": 1500,
          "height": 1500,
          "caption": "恒永达 DPGL800 微型气液隔膜泵。"
        }
      ]
    },
    {
      "title": "隔膜泵的优点和局限",
      "tocLabel": "优点与局限",
      "blocks": [
        {
          "type": "paragraph",
          "text": "隔膜泵最大的优势是密封可靠、能自吸，最主要的局限是流量有脉动、会随背压变化。选型前两边都要想清楚。"
        },
        {
          "type": "subheading",
          "title": "优点"
        },
        {
          "type": "list",
          "items": [
            "没有动密封，不易泄漏：介质和驱动部件被隔膜隔开，没有轴封这类容易漏的地方。",
            "能自吸：启动时能先把入口管路里的空气抽掉，再把液体吸上来，不需要提前灌注。但自吸高度有限，微型泵一般只有几米水柱。",
            "多数可以短时干转：管路暂时断液时不容易损坏，具体以产品手册为准。",
            "能输送气体或气液混合物：气液型可以直接用于抽废液和负压吸液。",
            "接液材料可选：隔膜、阀片、泵头都可以按介质选材料，适合酸碱、溶剂和各类试剂。",
            "剪切小：对介质的搅拌和剪切比齿轮泵、离心泵小，适合对剪切敏感的介质。"
          ]
        },
        {
          "type": "subheading",
          "title": "局限"
        },
        {
          "type": "list",
          "items": [
            "流量有脉动：对平稳性要求高的液路，需要加阻尼器或选多腔泵。",
            "流量随背压变化：管路越细越长，实际流量越低。需要精确定量时，柱塞泵或注射泵更合适。",
            "有噪声和振动：安装方式和减振处理会明显影响整机噪声。",
            "隔膜和阀片会磨损：它们是易损件，寿命和工况、电机类型有关。",
            "微型泵对颗粒和高粘度敏感：微型泵的阀片间隙小，含颗粒、高粘度或容易汽化的介质，要提前确认能不能用。"
          ]
        }
      ]
    },
    {
      "title": "隔膜泵用在哪里",
      "tocLabel": "应用领域",
      "blocks": [
        {
          "type": "paragraph",
          "text": "工业里，气动双隔膜泵常用于化工、涂料和污水输送。在仪器和自动化设备里，微型隔膜泵主要负责清洗、补液、循环和废液抽吸："
        },
        {
          "type": "table",
          "headers": ["领域", "隔膜泵在这里做什么"],
          "rows": [
            ["分析仪器", "清洗液供给、补液、循环、废液抽吸；液相色谱洗针"],
            ["环境监测", "水样采集、试剂输送、排水，气体预处理中的冷凝液排出"],
            ["实验室自动化", "洗板机洗板、样品前处理设备清洗"],
            ["生命科学", "细胞培养换液、自动化清洗、废液处理"],
            ["合成生物", "微型生物反应器的输液和废液"],
            ["体外诊断", "生化、血球、免疫、凝血等分析仪的清洗和废液"],
            ["打印与墨路", "供墨和回墨循环，防止白墨等墨水沉淀"]
          ]
        },
        {
          "type": "paragraph",
          "text": "同一台设备里，清洗、补液和废液抽吸对泵的要求常常不同。比如清洗看重流量和压力，废液抽吸看重能不能处理气液混合物，最好按任务分别选型。"
        }
      ]
    },
    {
      "title": "怎么选隔膜泵",
      "tocLabel": "选型要点",
      "blocks": [
        {
          "type": "paragraph",
          "text": "选隔膜泵不要只看样本上的最大流量，要从介质和实际液路出发，按下面的顺序逐项确认："
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "介质是什么：液体、气体还是气液混合；有没有腐蚀性、颗粒，粘度和温度多少。这决定了泵的类型和接液材料。",
            "需要多大流量：按装机后的实际工作点来算，并留出余量，而不是拿样本上的自由流量直接对比。",
            "吸程和背压有多大：入口要吸多高、出口阻力多大，决定了选标准型还是高压型。",
            "接液材料是否兼容：隔膜、阀片、泵头要分别确认，不能只看其中一项。",
            "电机和控制：有刷还是无刷，供电电压多少，是否需要调速和状态反馈。",
            "运行方式和寿命：连续运行还是间歇运行，每天跑多少小时，按实际工况估算寿命。",
            "安装和管路：噪声、振动、脉动、管径，以及储液瓶是否通气。"
          ]
        },
        {
          "type": "subheading",
          "title": "常见接液材料"
        },
        {
          "type": "paragraph",
          "text": "隔膜泵常见接液材料（一般规律，具体介质要按成分、浓度和温度确认）"
        },
        {
          "type": "table",
          "headers": ["材料", "常用部位", "特点", "需要注意"],
          "rows": [
            ["EPDM（三元乙丙橡胶）", "隔膜、阀片", "耐水、稀酸稀碱和醇类，适合水性介质", "不耐矿物油、燃油和烃类溶剂"],
            ["FKM（氟橡胶）", "隔膜、阀片", "耐油、燃料和多数酸", "不耐丙酮等酮类、胺类和强碱"],
            ["FFKM（全氟醚橡胶）", "阀片、密封件", "耐化学性接近 PTFE，同时保留橡胶弹性", "成本高"],
            ["PTFE（聚四氟乙烯）", "隔膜", "化学惰性强，可耐受多数强酸、强碱和有机溶剂", "弹性不如橡胶"],
            ["PPS（聚苯硫醚）", "泵头", "耐高温、耐化学腐蚀，尺寸稳定", "浓盐酸、过氧化氢等只是勉强可耐"],
            ["PP（聚丙烯）", "泵头", "耐酸碱和常见有机溶剂，成本低", "耐温较低，不耐二甲苯、二氯甲烷等溶剂"],
            ["PVDF（聚偏二氟乙烯）", "泵头", "耐化学腐蚀，机械性能好", "丙酮等酮类只是勉强可耐"]
          ]
        },
        {
          "type": "paragraph",
          "text": "恒永达微型液体隔膜泵（DPL30、DPL60、DPL30H）都采用 PPS 泵头，接液部分有两种组合：EPDM 膜片配 EPDM 阀片，或 PTFE 膜片配 FFKM 阀片。输送纯化水可以先从 EPDM 组合评估；试剂和清洗液要按实际成分、浓度和温度分别核查两种组合，清洗时接触的液体也要算进去。"
        },
        {
          "type": "links",
          "items": [
            {
              "prefix": "具体介质可以在",
              "href": "/resources/material-compatibility/",
              "label": "材料兼容性查询",
              "suffix": "里查 PPS、PTFE 等材料的耐受情况；两种组合怎么选，可以参考"
            },
            {
              "href": "/resources/technical-articles/micro-diaphragm-pump-materials-selection/",
              "label": "微型隔膜泵材质选择",
              "suffix": "。"
            }
          ]
        },
        {
          "type": "paragraph",
          "text": "样机阶段最好在真实管路里实测一遍流量和压力，确认没问题再定型。"
        }
      ]
    },
    {
      "title": "总结",
      "tocLabel": "总结",
      "blocks": [
        {
          "type": "paragraph",
          "text": "隔膜泵靠隔膜往复运动和两个单向阀输送介质，密封可靠、能自吸，从工业输送到仪器液路都有广泛应用。选型时先确定介质和实际工作点，再确认材料、电机和安装条件。"
        },
        {
          "type": "paragraph",
          "text": "如果你正在为设备选微型隔膜泵，恒永达提供液体和气液两类微型隔膜泵。把介质、目标流量和管路情况发给我们，工程师会帮你确定工作点和合适的型号。"
        },
        {
          "type": "subheading",
          "title": "延伸阅读"
        },
        {
          "type": "links",
          "ordered": true,
          "items": [
            { "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/", "label": "隔膜泵流量—压力曲线怎么看？装机流量与工作点分析" },
            { "href": "/resources/technical-articles/micro-diaphragm-pump-materials-selection/", "label": "微型隔膜泵材质选择：PPS、EPDM、PTFE 与 FFKM" },
            { "href": "/resources/technical-articles/diaphragm-pump-vs-peristaltic-pump/", "label": "微型隔膜泵与蠕动泵怎么选？" },
            { "href": "/resources/technical-articles/miniature-diaphragm-pump-flow-pulsation-reduction/", "label": "微型隔膜泵流量脉动大怎么办？" },
            { "href": "/resources/technical-articles/self-priming-miniature-liquid-diaphragm-pump-selection/", "label": "自吸式微型液体隔膜泵选型：吸程与启动时间" },
            { "href": "/resources/technical-articles/brushed-vs-brushless-diaphragm-pump-3000h-10000h/", "label": "有刷约 3000 小时、无刷约 10000 小时：隔膜泵电机寿命为什么不同？" }
          ]
        }
      ]
    }
  ],
  "faqTitle": "常见问题",
  "faqItems": [
    {
      "question": "隔膜泵能干转吗？",
      "answer": "多数隔膜泵短时间干转不会损坏，因为它没有靠液体润滑的动密封。但长时间干转会加快隔膜和阀片磨损，具体以产品手册为准。"
    },
    {
      "question": "隔膜泵能自吸吗？",
      "answer": "能。入口管路里有空气时，隔膜泵也能把液体吸上来，但自吸高度有限。以恒永达微型液体隔膜泵为例，DPL30 为 6 mH₂O，DPL60 和 DPL30H 为 3 mH₂O。如果自吸变差，常见原因是入口漏气或阀片磨损。"
    },
    {
      "question": "为什么装上以后流量比标称的小？",
      "answer": "标称流量一般是没有背压时的自由流量。装机后，管径、管长、吸程和背压都会让流量下降；储液瓶不通气、入口漏气也会让流量变小。"
    },
    {
      "question": "隔膜泵和蠕动泵怎么选？",
      "answer": "蠕动泵靠挤压软管输送，流量和转速的对应关系直接，但软管要定期更换。隔膜泵不用换管，自吸好，但流量有脉动。要求定量的场合多用蠕动泵，要求长期免维护的输送、清洗和废液抽吸多用隔膜泵。"
    },
    {
      "question": "气动隔膜泵和电动隔膜泵有什么区别？",
      "answer": "气动隔膜泵用压缩空气驱动，流量大，常用于工业输送。电动隔膜泵用电机驱动，可以做得很小，控制也方便，适合装进仪器和设备。"
    },
    {
      "question": "隔膜泵能用来精确计量吗？",
      "answer": "普通隔膜泵的流量会随背压变化，不适合高精度定量。需要精确计量时，应该选隔膜计量泵、柱塞泵或注射泵。"
    },
    {
      "question": "隔膜泵的寿命有多长？",
      "answer": "主要取决于电机类型和工况。以恒永达微型隔膜泵为例，有刷版本规格寿命约 3000 小时，无刷版本约 10000 小时；连续运行、高背压、高温都会让实际寿命缩短。"
    }
  ],
  "cta": {
    "title": "需要为设备选择微型隔膜泵？",
    "description": "提供介质、目标流量、吸程与背压和管路情况，恒永达工程师可协助确定工作点和合适的型号。",
    "contactLabel": "联系工程师",
    "productsLabel": "查看微型隔膜泵",
    "productsHref": "/products/pumps/miniature-diaphragm-pumps/"
  }
} satisfies DiaphragmPumpEngineeringArticleCopy;
