import en from "./hard-tube-locales/en.json";
import es from "./hard-tube-locales/es.json";
import fr from "./hard-tube-locales/fr.json";
import ko from "./hard-tube-locales/ko.json";
import ru from "./hard-tube-locales/ru.json";
import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";

import { hardTubeFittingsSlug, isTechnicalArticleLocaleAvailable } from "./technical-article-availability";
export { hardTubeFittingsSlug } from "./technical-article-availability";

// Approved general-operating-condition article, verified against FOREACH A02 on 2026-10-10.
// The shared structured copy supplies the body, metadata, list card and search text.
export const hardTubeFittingsCopy: DiaphragmPumpEngineeringArticleCopy = {
  "metadata": {
    "title": "微流体硬管接头选型指南：法兰、卡箍、卡环与管组件",
    "seoTitle": "微流体硬管接头选型指南：法兰、卡箍、卡环与管组件 | FOREACH",
    "seoDescription": "FOREACH 微流体硬管接头技术指南：法兰式、卡箍式和卡环式的密封原理、重复使用限制、压力工况、FEP/PTFE 管材、避光和管路保护，按接口、压力、介质与维护需求筛选，附液路管组件选型示例。",
    "coverImage": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/flanged-fittings.webp",
    "coverAlt": "FOREACH 法兰式硬管接头 HF / HFL 系列"
  },
  "deck": "选型要点：先核对端口结构、管外径和介质，再按压力、维护频率与管端加工条件筛选。法兰式依靠管端翻边贴合平底密封面；卡箍式在旋紧时夹持管体；卡环式由压套与垫圈形成连接组件。螺纹与管径相同，仍不能直接认定兼容。",
  "leadBlocks": [
    {
      "type": "paragraph",
      "text": "选型要点：先核对端口结构、管外径和介质，再按压力、维护频率与管端加工条件筛选。法兰式依靠管端翻边贴合平底密封面；卡箍式在旋紧时夹持管体；卡环式由压套与垫圈形成连接组件。螺纹与管径相同，仍不能直接认定兼容。",
      "lead": "选型要点："
    },
    {
      "type": "paragraph",
      "text": "本文面向设备研发、液路设计与维护人员，从密封结构、接口尺寸、介质、压力和拆接要求出发，逐步建立候选清单，再用一条液路说明管材、遮光和机械保护如何组合选择。"
    },
    {
      "type": "figure",
      "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/hard-tube-fitting-assemblies.png",
      "alt": "不同颜色的硬管接头与管路组成的实物管组件",
      "width": 2901,
      "height": 1585,
      "caption": "硬管接头与管组件实物"
    }
  ],
  "sections": [
    {
      "title": "三种硬管接头分别如何实现密封？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "法兰式、卡箍式和卡环式接头采用不同的管端固定与密封结构。选型时先确认管端如何加工、密封面位于何处，再核对接头与配套零件。"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/flanged-fittings.webp",
          "alt": "FOREACH HF HFL 法兰式硬管接头",
          "width": 458,
          "height": 375,
          "caption": "法兰式：HF / HFL 系列",
          "link": { "href": "/products/fittings/hard-tube-fittings/?structure=flanged", "label": "查看法兰式接头" }
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/ferrule-fittings.webp",
          "alt": "FOREACH HN HNF 卡箍式硬管接头",
          "width": 455,
          "height": 311,
          "caption": "卡箍式：HN / HNF 系列",
          "link": { "href": "/products/fittings/hard-tube-fittings/?structure=ferrule", "label": "查看卡箍式接头" }
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/snap-ring-fittings.webp",
          "alt": "FOREACH HSF6 CL-1 卡环连接件",
          "width": 453,
          "height": 313,
          "caption": "卡环式：HSF6 / CL-1 系列"
        },
        {
          "type": "subheading",
          "title": "法兰式：由管端翻边贴合平底密封面"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/flanged-connection-structure-zh.png",
          "alt": "紧凑平底接头、垫片与法兰翻边的装配及尺寸示意",
          "width": 1562,
          "height": 765,
          "caption": "法兰式：紧凑平底接头装配与图示规格尺寸"
        },
        {
          "type": "paragraph",
          "text": "FEP、PTFE 等适合翻边的管材先加工出管端法兰，再与配套垫片和接头装配。在上述结构中，垫片位于管端翻边与接头基体之间，用于支承翻边并传递压紧力；旋紧接头后，翻边贴合端口平底面形成密封。"
        },
        {
          "type": "subheading",
          "title": "卡箍式：旋紧时夹持管体并形成底面密封"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/ferrule-connection-structure-zh.png",
          "alt": "紧凑卡箍接头与卡箍的装配及尺寸示意",
          "width": 2010,
          "height": 1022,
          "caption": "卡箍式：紧凑卡箍接头装配与图示规格尺寸"
        },
        {
          "type": "paragraph",
          "text": "管端无需翻边。将接头与配套卡箍套入平切的管材，按装配要求定位；旋紧接头时，卡箍受压抱紧管外壁，并与端口密封面配合。安装前应核对卡箍尺寸、方向及适配的接头系列。"
        },
        {
          "type": "subheading",
          "title": "卡环式：压套与垫圈组成管端连接组件"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/snap-ring-connection-structure-zh.png",
          "alt": "卡环式接头、不锈钢卡环套与卡环垫圈的装配示意",
          "width": 1845,
          "height": 982,
          "caption": "卡环式：接头、不锈钢卡环套与卡环垫圈"
        },
        {
          "type": "paragraph",
          "text": "依次套入接头、卡环压套与卡环垫圈，使管端面与垫圈端面平齐，再按相应组件的装配方法压紧。CL-1S 套件由 PEEK 垫圈与不锈钢卡环套组成，配合对应的 HSF6 接头形成端面密封。接驳时接头可相对管体旋转，减少管路随锁紧动作扭转。"
        },
        {
          "type": "paragraph",
          "text": "卡环组件应按对应型号的装配说明安装。预压装步骤及专用工具要求，以具体套件为准。"
        },
        {
          "type": "paragraph",
          "text": "选型提示：卡箍式与卡环式接头虽然都无需管端翻边，但配套零件和装配方式不同。选型时应核对接头、卡箍或卡环组件的配套关系，不能仅凭螺纹和管径相同就直接替换。",
          "lead": "选型提示："
        }
      ]
    },
    {
      "title": "三种结构各有什么优势和重复使用限制？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "已有稳定翻边工艺，可优先评估法兰式；希望免翻边装配，可评估卡箍式；需要预制组件和维护拆接，可评估卡环式。维护时需分别确认完整组件能否重新接驳，以及拆下的密封件能否再次安装。",
          "lead": "已有稳定翻边工艺，可优先评估法兰式；希望免翻边装配，可评估卡箍式；需要预制组件和维护拆接，可评估卡环式。"
        },
        {
          "type": "subheading",
          "title": "法兰式：适合预制管组件，翻边质量决定连接基础"
        },
        {
          "type": "paragraph",
          "text": "完成翻边后，连接位置明确，便于预制和装配。限制在于翻边工艺、端面平整度以及端口底面几何；翻边损伤、过度压紧或不匹配的锥形底孔，都会使原本应贴合的密封面无法可靠接触。重复接驳前，应检查翻边与垫片状态。"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/flat-port-correct-zh.png",
          "alt": "平底端口中管端翻边贴合密封面的剖面示意",
          "width": 555,
          "height": 145,
          "caption": "平底端口：管端翻边可贴合底面形成密封"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/tapered-port-incorrect-zh.png",
          "width": 555,
          "height": 135,
          "alt": "锥形底孔与管端翻边不能贴合的剖面示意",
          "caption": "锥形底孔：管端翻边无法与底面可靠贴合"
        },
        {
          "type": "subheading",
          "title": "卡箍式：首次装配方便，但应遵守单次安装限制"
        },
        {
          "type": "paragraph",
          "text": "平切管端即可装配，省去翻边工序。本文所列卡箍仅适用于单次安装，重复安装可能造成不可逆塑性变形，维护时应准备配套新卡箍。"
        },
        {
          "type": "paragraph",
          "text": "如需保留原管、原卡箍重新接驳，应先取得该具体组合的书面复用说明。接头螺母本体是否可继续使用，应按其状态及装配要求另行判断。"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/ferrule-assembly-zh.png",
          "alt": "中文产品目录中的卡箍接头典型配置图",
          "width": 450,
          "height": 235,
          "caption": "卡箍：压紧方向与配套规格需匹配"
        },
        {
          "type": "subheading",
          "title": "卡环式：支持多次接驳，仍需检查管端组件"
        },
        {
          "type": "paragraph",
          "text": "HSF6 与匹配卡环套件组成的完整管端组件可按要求多次拆装、接驳，适合需要维护的预制液路。每次接驳前应检查组件状态；允许拆接次数和使用寿命需按具体组合与工况确认。若需将旧压套拆下并装到新管上，应另行确认该套件是否允许重新压装。"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/snap-ring-assembly-zh.png",
          "alt": "中文标注的卡环压套、卡环垫圈与接头配置图",
          "width": 595,
          "height": 535,
          "caption": "卡环压套与垫圈需按要求定位和装配"
        },
        {
          "type": "table",
          "headers": [
            "选型维度",
            "法兰式",
            "卡箍式",
            "卡环式"
          ],
          "rows": [
            [
              "首次管端加工",
              "需翻边，配套垫片",
              "平切管端，装配配套卡箍",
              "平切管端，定位压套与垫圈"
            ],
            [
              "拆接安排",
              "翻边及垫片完好，按要求接驳",
              "按单次安装限制安排卡箍更换",
              "完整组件可按要求多次接驳"
            ],
            [
              "主要检查点",
              "翻边平整度、底孔结构",
              "卡箍规格、方向、变形",
              "压装位置、方向与管端齐平"
            ],
            [
              "适合优先评估的需求",
              "已有翻边工艺或委托预制",
              "免翻边装配，维护可更换卡箍",
              "预制管组件、维护拆接"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "配套关系：HN / HN6 对应 CL-0X，HNF / HNF6 对应 CL-0。采购时应分别核对接头系列与卡箍型号。",
          "lead": "配套关系："
        }
      ]
    },
    {
      "title": "根据压力、振动和维护要求，怎样缩小候选范围？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "先核对接口，再筛选介质、温度和压力，最后比较装配与维护成本。三种结构各有适用条件，耐压和使用寿命应按具体型号与连接组合判断。",
          "lead": "先核对接口，再筛选介质、温度和压力，最后比较装配与维护成本。"
        },
        {
          "type": "table",
          "headers": [
            "已知条件",
            "下一步筛选动作"
          ],
          "rows": [
            [
              "端口与管外径已确定",
              "核对螺纹、平底或锥底结构、密封位置及安装深度；排除几何不匹配组合。"
            ],
            [
              "没有翻边工装或稳定工艺",
              "评估免翻边连接，或使用供应商预制的翻边管组件。"
            ],
            [
              "维护时需反复拆接",
              "优先评估允许重复接驳的法兰或卡环组件，并核对复用条件；使用卡箍方案时计入卡箍更换成本。"
            ],
            [
              "有持续压力、温度或脉动要求",
              "索取对应型号、管材和端口组合的适用数据；数据不足的组合先保留为待验证候选。"
            ],
            [
              "管路随机构运动",
              "同时评估走线、活动余量、弯曲半径与应力释放，避免把运动载荷交给接头根部。"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "例如，对于很少拆接的负压吸液段，先核对气密性、管壁抗塌陷和接口匹配；对于需要定期拆接的连接段，应比较完整管端组件的重复接驳条件，以及密封件更换成本；对于靠近运动机构的管段，则另行处理活动余量、导向和应力释放。"
        },
        {
          "type": "subheading",
          "title": "选定候选组合后，验证实际失效风险"
        },
        {
          "type": "table",
          "headers": [
            "实际工况",
            "主要风险",
            "验证项目"
          ],
          "rows": [
            [
              "长期持续压力",
              "材料蠕变、夹持力变化",
              "在拟用介质和最高工作温度条件下，按项目时长保压，检查渗漏、位移与松脱。"
            ],
            [
              "启停、压力脉动",
              "反复载荷引起松动或疲劳",
              "记录压力峰值与循环条件，检查循环前后密封状态。"
            ],
            [
              "负压吸液",
              "微漏气、气泡、管壁变形",
              "检查连接气密性和管壁抗塌陷表现；出现气泡时进一步排查来源。"
            ],
            [
              "振动、设备移动",
              "拉扯与磨损集中在管端",
              "验证固定点、应力释放及振动后的松动、渗漏。"
            ],
            [
              "定期拆接",
              "翻边、垫圈或卡箍损伤",
              "预先规定拆接流程、检查方法和更换条件，再验证维护后的连接。"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "将上述项目作为装机验证计划，并明确测试温度、持续与峰值压力、负压条件、循环次数及允许泄漏指标。具体型号是否满足要求，应以对应规格和测试结果为依据。"
        },
        {
          "type": "paragraph",
          "text": "高压液路需另行选型。产品手册中“最大耐压 34 MPa”对应专用高压接头，不适用于本文普通法兰、卡箍或卡环方案。实际允许压力应以具体型号在相应温度、管材和安装条件下的额定数据为准。"
        }
      ]
    },
    {
      "title": "FEP 与 PTFE 管材如何选？什么时候需要避光？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "管外径决定与接头的尺寸匹配，管内径与管长共同影响流阻和管内容积，材料决定介质与机械工况的适配基础。先确认工作介质和清洗液的组成、浓度、最高温度与接触时间，再选择管材和实际接液的密封材料。",
          "lead": "管外径决定与接头的尺寸匹配，管内径与管长共同影响流阻和管内容积，材料决定介质与机械工况的适配基础。"
        },
        {
          "type": "paragraph",
          "text": "例如，外径 2.5 mm、内径 1.5 mm 的管材，需要适配 2.5 mm 管外径的连接组件。垫片孔径应按接头系列和配套规格选择，并不要求与管外径相同。连接处的额外滞留空间，还取决于管端位置、插入深度和流道衔接。"
        },
        {
          "type": "table",
          "headers": [
            "管材",
            "主要特点",
            "观察与避光",
            "选型重点"
          ],
          "rows": [
            [
              "FEP",
              "本色管较透明，可用于观察液路",
              "便于观察液体状态与气泡；光敏介质需评估额外遮光",
              "核对介质、管壁、压力及弯曲条件。材料抗紫外老化不等于能够阻挡紫外光。"
            ],
            [
              "PTFE",
              "化学惰性较高、摩擦系数低，可加工翻边",
              "有本色、黑色及特定透明规格",
              "颜色和透明度按具体型号确认；黑色管的遮光效果仍需结合波段与壁厚验证。"
            ]
          ]
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/ptfe-tubing-photo.png",
          "alt": "本色及黑色 PTFE 管材实物",
          "width": 1962,
          "height": 1270,
          "caption": "PTFE：本色及黑色管材"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/fep-tubing-photo.png",
          "alt": "透明 FEP 管材实物",
          "width": 2544,
          "height": 1540,
          "caption": "FEP：透明管材"
        },
        {
          "type": "paragraph",
          "text": "FEP 与 PTFE 管材具有一定柔性，布管时均应遵守对应规格的最小弯曲半径。连续运动段还需评估折瘪、磨损和疲劳风险，静态弯曲能力不能直接作为反复弯折的依据。",
          "lead": "FEP 与 PTFE 管材具有一定柔性，布管时均应遵守对应规格的最小弯曲半径。"
        },
        {
          "type": "subheading",
          "title": "外径 2.5 mm 的管材有哪些候选规格？"
        },
        {
          "type": "table",
          "headers": [
            "管材型号",
            "材料 / 颜色",
            "外径 / 内径",
            "选型关注点"
          ],
          "rows": [
            [
              "BFT03008",
              "FEP / 本色",
              "2.5 / 1.5 mm",
              "可列为需要观察气泡的尺寸候选；遮光另行设计。"
            ],
            [
              "TH2-PTFE-B-15-25",
              "PTFE / 黑色",
              "2.5 / 1.5 mm",
              "适合评估黑色管方案；敏感波段的遮光效果需实测确认。"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "表中型号均为外径 2.5 mm、内径 1.5 mm 的候选规格，实际选用还需结合介质、压力和避光要求。另有透明 PTFE 型号 TH2-PTFE-T-20-32，其尺寸与适用条件应单独核对。"
        },
        {
          "type": "subheading",
          "title": "既需要避光，又需要观察气泡怎么办？"
        },
        {
          "type": "paragraph",
          "text": "可评估透明管加完整遮光外套，或在受控位置设置短观察段，并在正常运行时覆盖遮光罩。应把接头附近的裸露段、维护时的开罩暴露和实际照明一起纳入评估。最终依据介质敏感波长、透射率、暴露时间及介质稳定性结果判断。"
        }
      ]
    },
    {
      "title": "磨损、弯折和运动管路应如何保护？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "先调整走线和固定方式，再按受力位置选择保护措施。摩擦需要隔离，接头根部急弯需要缓弯导向，反复运动需要活动余量与应力释放。机械保护应与接头耐压分别评估。",
          "lead": "先调整走线和固定方式，再按受力位置选择保护措施。"
        },
        {
          "type": "table",
          "headers": [
            "风险位置",
            "建议措施",
            "验证重点"
          ],
          "rows": [
            [
              "管路接触金属边缘或支架",
              "改变走线，增加光滑导向或耐磨护套",
              "边缘接触、护套移位，以及固定点是否挤伤管材。"
            ],
            [
              "接头根部急弯",
              "设置缓弯导向；按结构评估限位管或防折弹簧",
              "最小弯曲半径、局部折瘪，以及保护件末端是否形成新的应力集中。"
            ],
            [
              "移动部件周期性位移",
              "预留活动余量，设置导向与应力释放；适用时评估螺旋回弹管",
              "行程、拉力、最大伸长和运动循环寿命。"
            ],
            [
              "振动使接头承受拉力",
              "在合适位置设置固定夹，并避免刚性约束过近",
              "固定点磨损、管端位移、振动后的泄漏与松脱。"
            ],
            [
              "介质需避光",
              "选遮光管材或外套，并覆盖连接附近暴露段",
              "敏感波段透过率和维护后的遮光完整性。"
            ]
          ]
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/prefabricated-tube-assembly-zh.png",
          "alt": "中文标注的法兰翻边、垫片、接头、限位管与管标",
          "width": 1230,
          "height": 394,
          "caption": "预制管组件：翻边、垫片、接头、限位管及管路标识"
        },
        {
          "type": "paragraph",
          "text": "FOREACH 预制管组件可参考图示中的 O 形圈、限位管和管路标识配置。采用耐磨护套、防折弹簧或螺旋回弹管时，应根据空间、行程与受力情况设计，并另行确认具体形式及供应范围。"
        },
        {
          "type": "paragraph",
          "text": "耐磨护套、防折结构与运动余量分别用于减轻摩擦、急弯和拉扯风险，不会提高管路内部的允许工作压力。"
        }
      ]
    },
    {
      "title": "一条液路如何完成硬管接头与管组件选型？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "示例条件：管外径为 2.5 mm，接口螺纹为 M6×1，维护时需要拆接，局部管段靠近运动机构；若介质对光敏感，还需遮光。以下按这些条件筛选连接组件与管材，再列出定型前需要确认的工况。",
          "lead": "示例条件："
        },
        {
          "type": "subheading",
          "title": "先核对端口、工况和维护方式"
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "确认端口。M6×1 只描述螺纹；还要核对平底密封面、孔深、管端位置及所需安装空间。",
            "确认介质与液路。提供工作介质及清洗液组成、温度、目标流量、管长和允许压降，评估内径 1.5 mm 是否适合。",
            "确认维护方式。如果希望维护时保留完整管端组件，可比较法兰与卡环方案；卡箍方案则将新卡箍更换写入维护流程。"
          ]
        },
        {
          "type": "table",
          "headers": [
            "候选方向",
            "型号与配套尺寸",
            "成立条件与待确认项"
          ],
          "rows": [
            [
              "方案一：法兰预制管组件",
              "HFL-M6-25-PV-B：M6×1、外径 2.5 mm、PVDF、黑色；M6 / 2.5 mm 管的 WS 垫片尺寸系列可查 WS-46-26。",
              "需有合格翻边工艺；按具体装配选择垫片材质，并核对端口与完整组件适用压力。"
            ],
            [
              "方案二：卡环预制管组件",
              "HSF6-M6-32-PS-B + CL-1S-25：M6×1 接头配 2.5 mm 卡环套件；套件为 PEEK 垫圈 + 不锈钢卡环套。",
              "该 HSF6 接头规格适配 2.0 / 2.5 / 3.0 / 3.2 mm 管径，本例配套 2.5 mm 卡环套件；按要求定位与压紧。"
            ]
          ]
        },
        {
          "type": "subheading",
          "title": "再确定管材、遮光与运动段保护"
        },
        {
          "type": "paragraph",
          "text": "需要观察气泡时，可评估 BFT03008 本色 FEP 管，并按介质要求配置遮光外套；倾向黑色管时，可评估 TH2-PTFE-B-15-25，并验证实际遮光效果。两者均为外径 2.5 mm、内径 1.5 mm 的候选规格，介质兼容性与允许工作压力需分别确认。运动机构附近的管段还需设置固定、活动余量和导向。"
        },
        {
          "type": "subheading",
          "title": "完成候选清单与定型验证"
        },
        {
          "type": "paragraph",
          "text": "候选清单应记录连接型号、配套零件、管材及保护方式，并补齐持续与峰值压力、负压条件、温度、介质兼容性、允许压降和拆接频率，再进入图纸确认与样件评估。整套组件的允许工作压力和使用寿命，应结合完整组合与实际工况确认。"
        },
        {
          "type": "paragraph",
          "text": "定型前，将密封、负压气密性、拆接、运动磨损和遮光验证分别写入验收计划，记录测试条件与结果，再确定最终物料清单、装配工艺和维护更换规则。"
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/products/fittings/",
              "label": "查看硬管接头系列与型号规格",
              "prefix": ""
            },
            {
              "href": "/products/fittings/hard-tube-fittings/hfl-m6-25-pv-b/",
              "label": "查看 HFL-M6-25-PV-B",
              "prefix": "",
              "suffix": ""
            }
          ]
        }
      ]
    }
  ],
  "faqTitle": "常见问题",
  "faqItems": [
    {
      "question": "接头漏液后，继续拧紧或加螺纹胶就能解决吗？",
      "answer": "先停机、卸压并定位漏点，再检查端口、管端与配套密封件。本文三类连接依靠管端或配套零件形成密封，螺纹主要提供压紧力；继续加力可能压坏翻边、卡箍或垫圈。若螺纹、密封面或管端已损伤，应按对应型号的要求更换并复测。未经装配说明允许，不应自行添加螺纹胶、生料带或防松垫片，以免改变安装深度、材料兼容性或洁净状态。"
    },
    {
      "question": "静态检查不漏，为什么泵运行或管路移动时才漏？",
      "answer": "静态检查只覆盖当时的压力、温度和受力状态。运行时应记录启停与压力脉动，并检查接头根部是否承受拉力、扭转或急弯。先核对管路走向、固定点和活动余量，再按实际介质、温度及运动条件复现问题。比较调整前后的泄漏、管端位移和流量变化；不要仅凭一次静态保压通过就认定整机工况已验证。"
    },
    {
      "question": "换了卡箍接头后流量下降，必须改用法兰式吗？",
      "answer": "不宜仅凭流量下降就判定卡箍式不能使用。先核对管内径与接头通道，检查切口毛刺、插入位置、管路急弯，以及装配后管端是否被过度挤压。用相同介质、温度、管长和泵工况比较更换前后的流量与压差，再决定是否调整装配、规格或连接结构。接管外径相同，并不表示内部流道和流阻相同。"
    },
    {
      "question": "用水测试正常，换成工作液或清洗液后为什么会漏？",
      "answer": "水测试不能代替实际介质的兼容性验证。应列出工作液、清洗液及可能残留的混合液，按成分、浓度、温度和接触时间，逐一核对管材、接头和密封件。若出现溶胀、变硬、开裂或尺寸变化，应查明原因并更换不适配部件，再做装配后的密封与流量验证。不能只根据“耐酸碱”或“耐溶剂”的材料概述作决定。"
    },
    {
      "question": "维护后能否沿用原来的卡箍、卡环套件和接头？",
      "answer": "应区分完整管端组件重新接驳与拆下旧零件后重新压装。本文所列卡箍按单次安装要求准备新件；保留原管和原卡箍重新接驳，需要该具体组合的书面复用说明。卡环组件允许重复接驳，也不代表压套和垫圈可以拆下后装到新管上。接头本体能否继续使用，应另行检查螺纹、外观及装配状态，并在维护后复测。"
    },
    {
      "question": "换成黑色管，就能同时解决避光和管路老化问题吗？",
      "answer": "不能仅凭颜色判断。避光需要结合介质敏感波段、管壁厚度和透过率验证；开裂或寿命问题则应另查介质、温度、压力脉动及反复弯折。黑色管或遮光外套不能代替材料兼容性和运动寿命验证。若还需观察气泡，可评估受控的短观察段或可开启遮光结构，并验证正常运行及维护后的遮光完整性。"
    }
  ],
  "cta": {
    "title": "需要确认硬管接头与管组件的配套？",
    "description": "提供接口图纸、管外径与内径、介质、温度、压力范围和维护要求，便于核对候选组合。",
    "contactLabel": "联系我们",
    "productsLabel": "查看接头与管材",
    "productsHref": "/products/fittings/"
  }
};

export const hardTubeFittingsNavigation = [
  {
    "id": "structures",
    "label": "密封结构"
  },
  {
    "id": "tradeoffs",
    "label": "优缺点与复用"
  },
  {
    "id": "conditions",
    "label": "工况筛选"
  },
  {
    "id": "tubing",
    "label": "管材与避光"
  },
  {
    "id": "protection",
    "label": "机械保护"
  },
  {
    "id": "selection-example",
    "label": "选型示例"
  }
];

function blockText(block: EngineeringArticleBlock): string {
  switch (block.type) {
    case "paragraph": return block.text;
    case "notice": return [block.label, block.text].filter(Boolean).join(" ");
    case "formula": return [block.expression, block.note].filter(Boolean).join(" ");
    case "table": return [block.headers, ...block.rows].map(row => row.join(" | ")).join("\n");
    case "figure": return [block.alt, block.caption].join(" ");
    case "subheading": return block.title;
    case "list": return block.items.join("\n");
    case "links": return block.items.map(item => [item.prefix, item.label, item.suffix].filter(Boolean).join("")).join("");
  }
}

export function getHardTubeFittingsArticles(locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  if (!isTechnicalArticleLocaleAvailable(hardTubeFittingsSlug, locale)) return [];
  const copy = getHardTubeFittingsCopy(locale);
  return [{
    id: hardTubeFittingsSlug, slug: hardTubeFittingsSlug,
    category: "fittings-tubing", ...copy.metadata,
    summary: copy.deck, date: "2026-10-12",
    relationKeys: ["category:hard-tube-fittings"], relationPriority: 150,
    content: [
      { title: "", content: copy.leadBlocks.map(blockText).join("\n\n") },
      ...copy.sections.map(section => ({ title: section.title, content: section.blocks.map(blockText).join("\n\n") })),
      { title: copy.faqTitle, content: copy.faqItems.map(item => `${item.question}\n${item.answer}`).join("\n\n") },
    ],
  }];
}

const hardTubeTranslations = { en, es, fr, ko, ru };
export function getHardTubeFittingsCopy(locale: TechnicalArticleLocale): DiaphragmPumpEngineeringArticleCopy {
  return locale === "zh-CN" ? hardTubeFittingsCopy : hardTubeTranslations[locale] as DiaphragmPumpEngineeringArticleCopy;
}
const navigationLabels = {
 en: ["Sealing structures", "Benefits and reuse", "Operating conditions", "Tubing and light shielding", "Mechanical protection", "Selection example"],
 es: ["Estructuras de sellado", "Ventajas y reutilización", "Condiciones de uso", "Tubos y protección de la luz", "Protección mecánica", "Ejemplo de selección"],
 fr: ["Structures d’étanchéité", "Atouts et réutilisation", "Conditions de service", "Tubes et protection lumineuse", "Protection mécanique", "Exemple de sélection"],
 ko: ["밀봉 구조", "장점과 재사용", "운전 조건", "튜브 및 차광", "기계적 보호", "선정 예시"],
 ru: ["Уплотнение", "Преимущества и повторное использование", "Рабочие условия", "Трубки и светозащита", "Механическая защита", "Пример выбора"],
};
export function getHardTubeFittingsNavigation(locale: TechnicalArticleLocale) {
 return hardTubeFittingsNavigation.map((item, i) => ({ ...item, label: locale === "zh-CN" ? item.label : navigationLabels[locale][i] }));
}
