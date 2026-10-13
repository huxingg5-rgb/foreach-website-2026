import en from "./compression-ring-fitting-locales/en.json";
import es from "./compression-ring-fitting-locales/es.json";
import fr from "./compression-ring-fitting-locales/fr.json";
import ko from "./compression-ring-fitting-locales/ko.json";
import ru from "./compression-ring-fitting-locales/ru.json";
import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";
import { compressionRingFittingSlug } from "./technical-article-availability";
export { compressionRingFittingSlug } from "./technical-article-availability";

// Facts checked against the FOREACH fittings catalogue A02, pp.21–23.
// The explicit SKU rows take precedence over the generic code-example typography.
// HSF6/CL-1 products are not in FITTING_PUBLISHED_PRODUCTS: do not invent detail URLs.
// This article intentionally covers the A02 HSF6/CL-1S configurations, not every
// retained HSF/HSF6 record in selection data (including the separate 1.8 mm SKU).
// A02 p.21 labels 10.5 mm on the front section; do not equate it with installed
// depth or effective thread engagement. No common pressure rating is given.
// Installation torque: FRGD-140D-2609-0001_001_cn, 推荐扭矩!O1:R8,
// plastic fittings: M6x1 / 1/4-28 UNF 0.25–0.30 N·m; U40 0.08–0.15 N·m.
// These thread-installation recommendations are not kit preassembly force values.
// The annotated product photograph identifies components, not dimensions or ratings.
export const compressionRingFittingCopy: DiaphragmPumpEngineeringArticleCopy = {
  "metadata": {
    "title": "什么是卡环接头？结构原理、型号区别与选型方法",
    "seoTitle": "什么是卡环接头？结构原理、型号区别与选型方法 | FOREACH",
    "seoDescription": "了解卡环接头的压套与垫圈密封结构，查看恒永达 HSF6、CL-1S、CL-1X 的螺纹、管径、材料和尺寸，掌握预装、锁紧、耐压确认及重复接驳要点。",
    "coverImage": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/compression-ring-fitting-cover-photo.png",
    "coverAlt": "恒永达卡环接头实拍：管材、不锈钢压套与密封垫圈"
  },
  "deck": "卡环接头由螺纹接头、卡环压套和密封垫圈组成，无需预先翻边管端。本文以恒永达 HSF6 与 CL-1S 为例，介绍 M6×1、1/4-28 UNF 接口、1.6–3.2 mm 管外径配置、PPS／PEEK 本体及不锈钢压套与 PEEK 垫圈，并说明预制管路、安装和维护接驳的选择方法。",
  "leadBlocks": [
    {
      "type": "paragraph",
      "text": "卡环接头是一种用于仪器微流体管路的免翻边螺纹式接头，由接头本体、卡环压套和密封垫圈组成。管端平切后，通过配套压套与垫圈形成管端组件，再由螺纹接头压紧，与接收端口配合密封。它可用于分析仪器和实验室自动化设备中的试剂输送、样本处理及清洗液路，连接管路与泵、阀或液路模块。"
    },
    {
      "type": "paragraph",
      "text": "恒永达（FOREACH）HSF6 紧凑卡环接头提供 M6×1、1/4-28 UNF 螺纹配置，本文所列方案适配 1.6、2.0、2.5、3.0、3.2 mm 管外径。本体材料包括 PPS、PEEK；配套 CL-1S 由不锈钢压套和 PEEK 垫圈组成。HSF6 图示头部外径为 6.0 mm、总长为 20.0 mm，可结合端口间距与轴向空间评估安装位置。不同螺纹、管径和材料的组合见下文型号表。"
    },
    {
      "type": "paragraph",
      "text": "这种连接既可用于现场装配，也适合预制管组件：管长、两端接头和管标可按液路配置确定，维护时可按要求拆下并重新接驳完整管端组件。本文重点说明 HSF6／CL-1S 配套，并单独介绍用于 6-40 UNF 小规格连接的 CL-1X-16；其他系列及管径配置需按各自图纸选择。"
    },
    {
      "type": "figure",
      "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/snap-ring-fittings.webp",
      "alt": "恒永达卡环接头本体、压套与垫圈套件及管端组件",
      "width": 453,
      "height": 313,
      "caption": "接头本体负责连接端口，压套与垫圈组成管端套件。选择时应分别确定本体和套件型号。"
    }
  ],
  "sections": [
    {
      "title": "什么是卡环接头？先分清接头、压套与垫圈",
      "blocks": [
        {
          "type": "paragraph",
          "text": "本文所说的“卡环接头”，指采用压套与密封垫圈的微流体管端连接结构，也可称为卡环式接头。它属于免翻边连接的一种；“免翻边”描述管端无需翻边，并不意味着所有免翻边接头都采用相同零件。这里的卡环也不是机械轴槽中用于限位的弹性挡圈。"
        },
        {
          "type": "table",
          "headers": [
            "组成部分",
            "在连接中的作用",
            "选型关键"
          ],
          "rows": [
            [
              "螺纹接头本体",
              "旋入设备端口，向管端套件传递轴向压紧力",
              "螺纹、管材通过空间、本体材料与外形尺寸"
            ],
            [
              "卡环压套",
              "套在垫圈配合部位，参与压紧和固定管端组件",
              "与垫圈成套选择，确认方向和预装要求"
            ],
            [
              "卡环密封垫圈",
              "与管材和端口配合，构成前端密封部位",
              "适配管外径、材料、端面及定位状态"
            ],
            [
              "管材与接收端口",
              "形成流道，并提供连接的密封配合面",
              "管材内外径、切口、端口底面与装配深度"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "以 CL-1S 为例，压套为 SUS 不锈钢，垫圈为 PEEK。接头本体、金属压套和密封垫圈是不同零件；本体采用 PEEK 或 PPS，不代表整个连接的接液表面均为该材料。"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/snap-ring-connection-structure-zh.png",
          "alt": "卡环接头、不锈钢压套与 PEEK 密封垫圈的相对位置",
          "width": 1845,
          "height": 982,
          "caption": "卡环连接的三个主要零件：接头本体、不锈钢压套和密封垫圈。管材依次穿过这些零件。"
        }
      ]
    },
    {
      "title": "卡环接头怎样密封，为什么适合预制管路？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "接头旋入平底接收端口时，将轴向力传给压套和垫圈；套件在规定位置受压，使管端组件与端口密封面贴合。装配中既要控制压套与垫圈的配合，也要控制管端的位置。螺纹提供连接与压紧力，端面是否正确贴合才是密封检查的重点。"
        },
        {
          "type": "subheading",
          "title": "管端面与垫圈端面平齐，是直接可检查的装配位置"
        },
        {
          "type": "table",
          "headers": [
            "管端状态",
            "可能产生的影响",
            "装配检查"
          ],
          "rows": [
            [
              "与垫圈端面平齐",
              "为规定的管端定位提供基础",
              "切口平整、无残屑，压装后位置保持一致"
            ],
            [
              "缩在垫圈内部",
              "连接处可能留下额外间隙",
              "检查切管长度和预装时是否发生回缩"
            ],
            [
              "突出或切口倾斜",
              "可能提前接触端口，影响端面贴合",
              "重新检查管端处理和组件定位"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "下图为卡环管端组件实拍，标出接头本体、管材、不锈钢卡环压套和卡环密封垫圈的位置，便于观察各零件的配合关系。"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/compression-ring-components-annotated-zh.png",
          "alt": "卡环管端组件实拍，右侧引线标注卡环密封垫圈、不锈钢卡环压套、管材和接头本体",
          "width": 1584,
          "height": 993,
          "caption": "卡环管端组件：卡环密封垫圈、不锈钢卡环压套、管材与接头本体。"
        },
        {
          "type": "subheading",
          "title": "先完成管端组件，再接入设备"
        },
        {
          "type": "paragraph",
          "text": "预制时可以先确定管材、长度、两端零件和管标，完成管端组件后再接入设备，便于批量装配和流路识别。接驳过程中，接头可相对管体转动，减少旋紧动作带来的管路扭转；这不等同于运行中连续旋转的动态密封接头。"
        },
        {
          "type": "paragraph",
          "text": "维护拆接时可以保留符合要求的完整管端组件，但仍需检查垫圈端面、压套位置和管材状态。应把“完整组件重新接驳”与“拆下旧压套并装到另一根管上”分开处理。"
        }
      ]
    },
    {
      "title": "HSF6 有哪些螺纹、管径、材料和安装尺寸？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "HSF6 是接头本体系列，CL-1S、CL-1X 是卡环套件系列。先根据设备端口选择接头，再根据实际管外径选择套件；不能把三个系列作为可互换的接头型号比较。下表列出本文讨论的 HSF6 配置，并非所有卡环系列的规格全集。"
        },
        {
          "type": "table",
          "headers": [
            "接头完整型号",
            "螺纹",
            "适配管外径",
            "本体材料"
          ],
          "rows": [
            [
              "HSF6-M6-16-PS-B",
              "M6×1",
              "1.6 mm",
              "PPS"
            ],
            [
              "HSF6-M6-32-PS-B",
              "M6×1",
              "2.0、2.5、3.0、3.2 mm",
              "PPS"
            ],
            [
              "HSF6-U28-16-PK-N",
              "1/4-28 UNF",
              "1.6 mm",
              "PEEK"
            ],
            [
              "HSF6-U28-16-PS-B",
              "1/4-28 UNF",
              "1.6 mm",
              "PPS"
            ],
            [
              "HSF6-U28-32-PK-N",
              "1/4-28 UNF",
              "2.0、2.5、3.0、3.2 mm",
              "PEEK"
            ],
            [
              "HSF6-U28-32-PS-B",
              "1/4-28 UNF",
              "2.0、2.5、3.0、3.2 mm",
              "PPS"
            ]
          ]
        },
        {
          "type": "subheading",
          "title": "同一个本体档位，仍要按管外径选择不同套件"
        },
        {
          "type": "table",
          "headers": [
            "实际管外径",
            "HSF6 本体档位",
            "卡环套件",
            "套件材料"
          ],
          "rows": [
            [
              "1.6 mm",
              "M6／U28 的 16 档",
              "CL-1S-16",
              "SUS 压套＋PEEK 垫圈"
            ],
            [
              "2.0 mm",
              "M6／U28 的 32 档",
              "CL-1S-20",
              "SUS 压套＋PEEK 垫圈"
            ],
            [
              "2.5 mm",
              "M6／U28 的 32 档",
              "CL-1S-25",
              "SUS 压套＋PEEK 垫圈"
            ],
            [
              "3.0 mm",
              "M6／U28 的 32 档",
              "CL-1S-30",
              "SUS 压套＋PEEK 垫圈"
            ],
            [
              "3.2 mm",
              "M6／U28 的 32 档",
              "CL-1S-32",
              "SUS 压套＋PEEK 垫圈"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "例如，2.5 mm 外径管材配 M6 平底端口时，可从 HSF6-M6-32-PS-B 与 CL-1S-25 组合开始核对。“32”是这一组接头本体的规格档位，套件仍应选 2.5 mm 对应的“25”，不能跟着本体型号选 CL-1S-32。"
        },
        {
          "type": "subheading",
          "title": "CL-1X-16 是另一种小规格配套"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/compression-ring-tube-ends-photo.png",
          "alt": "黑色与本色卡环接头管端实拍，展示金属压套、密封垫圈及管端位置",
          "width": 2459,
          "height": 1492,
          "caption": "卡环管端组件实拍：金属压套、密封垫圈与管端的相对位置。具体型号与配套尺寸需按对应规格确认。"
        },
        {
          "type": "paragraph",
          "text": "CL-1X-16 适配 1.6 mm 管外径，采用 SUS 压套与 PEEK 垫圈，其配套接头为 HFL6-U40-16，螺纹为 6-40 UNF。它与 CL-1S-16 的适配管径相同，但端口、套件外形及配套接头不同，不能直接互换。"
        },
        {
          "type": "subheading",
          "title": "外形尺寸用于判断空间，装入深度还要看端口"
        },
        {
          "type": "table",
          "headers": [
            "HSF6 图示尺寸",
            "数值",
            "安装时怎样使用"
          ],
          "rows": [
            [
              "头部外径",
              "6.0 mm",
              "检查相邻接头之间的距离和旋拧空间"
            ],
            [
              "本体总长",
              "20.0 mm",
              "结合装入深度，计算安装后的外露空间"
            ],
            [
              "前端轴向尺寸",
              "10.5 mm",
              "与端口深度、套件位置共同核对；不是有效螺纹啮合长度或实际装入深度"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "上述尺寸对应本文 HSF6 示意外形，不能套用到 HSF、HFL6 或其他配置。实际安装需要让卡环组件到达正确的密封位置，同时保留足够的螺纹啮合。如果本体先顶住设备表面，而垫圈尚未贴合，继续加大锁紧力不能解决尺寸不匹配。"
        }
      ]
    },
    {
      "title": "卡环、卡箍与翻边接头怎样选择？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "三种连接首先要比较管端怎样准备、用什么零件建立密封，再结合生产装配和维护方式选择。卡环与卡箍都可省去翻边工序，但前者使用压套与垫圈，后者使用匹配卡箍夹持管材并参与密封。"
        },
        {
          "type": "table",
          "headers": [
            "比较项目",
            "卡环连接",
            "卡箍连接",
            "翻边连接"
          ],
          "rows": [
            [
              "管端处理",
              "平切后安装压套和垫圈",
              "平切后装配卡箍",
              "预先形成管端翻边"
            ],
            [
              "主要配套零件",
              "接头、压套、密封垫圈",
              "接头与卡箍",
              "接头、管端翻边及配套垫片"
            ],
            [
              "装配重点",
              "使用专用安装钳预装，检查套件方向、管端平齐与压装状态",
              "卡箍配套、方向、管端就位",
              "翻边成型质量和端面贴合"
            ],
            [
              "维护安排",
              "检查完整管端组件后按要求重新接驳",
              "前篇所列卡箍按单次安装要求准备更换件",
              "检查翻边、垫片及端口后接驳"
            ],
            [
              "适合优先评估的情况",
              "预制管路、保留管端组件的维护拆接",
              "免翻边装配、方便更换配套卡箍",
              "已有稳定翻边工艺或预制翻边组件"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "这些是装配方式的区别，不是耐压高低的排名。需要频繁维护时，应比较拆接后组件的检查和更换方法；端口密集时，应比较接头头部尺寸与操作空间，而不是只根据连接名称决定。"
        },
        {
          "type": "links",
          "ordered": true,
          "items": [
            {
              "href": "/resources/technical-articles/what-is-a-ferrule-fitting/",
              "label": "卡箍接头：结构原理、型号区别与选型方法"
            },
            {
              "href": "/resources/technical-articles/flanged-tubing-assemblies-selection-guide/",
              "label": "翻边管组件：密封结构、接口匹配与选型"
            }
          ]
        }
      ]
    },
    {
      "title": "哪些液路适合卡环管组件？怎样确定配置？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "评估卡环连接时，可先从管路的装配与维护任务入手。下列场景用于说明选型思路，具体适用性还取决于介质、温度和压力条件。"
        },
        {
          "type": "table",
          "headers": [
            "液路场景",
            "采用管组件的目的",
            "配置重点"
          ],
          "rows": [
            [
              "分析仪器的试剂输送",
              "预先完成管路连接与长度配置，便于装机",
              "两端接口、接液材料、管内径和管长"
            ],
            [
              "样本处理与清洗液路",
              "控制管端定位，方便识别和维护流路",
              "端部间隙、清洗条件、残留要求和管标"
            ],
            [
              "泵、阀与液路模块之间",
              "统一管路装配和备件形式",
              "端口间距、出管方向、压力脉动与固定方式"
            ],
            [
              "需要拆下维护的模块",
              "保留完整管端组件并重新接驳",
              "预计拆接频率、密封面检查和更换规则"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "恒永达卡环管组件可配置 FEP、PTFE 管材，管长和管标按需求确定。管外径用于匹配接头与套件；管内径和管长影响流阻与内部容积。相同外径的管材若内径不同，流量表现和压装后的管壁状态也可能不同。"
        },
        {
          "type": "paragraph",
          "text": "询型时建议给出：两端端口图纸、管材内外径、成品管长及测量基准、介质与清洗条件、温度、持续及峰值压力，以及维护拆接需求。两端设备接口不同，应分别确定接头和套件。管路上的 O 圈或限位管用于限制接头滑动，不应当作设备端口密封圈。"
        }
      ]
    },
    {
      "title": "卡环接头怎样安装？耐压与锁紧要求如何确认？",
      "blocks": [
        {
          "type": "subheading",
          "title": "把首次预装和接入端口分成两步"
        },
        {
          "type": "paragraph",
          "text": "首次装配卡环套件需要使用配套的专用安装钳，将卡环压套与密封垫圈压装到位，形成定位正确的管端组件。仅靠手工推压很难完成正确装配，不能用旋紧接头或增加端口锁紧扭矩代替预装。维护时重新接驳已装好的管端组件，则应先检查组件状态，再接入端口。"
        },
        {
          "type": "paragraph",
          "text": "恒永达卡环套件安装钳型号为 T-SF-4-SS，商品编码为 959016。准备自行装配管路时，应同时准备与所选套件及管径匹配的专用工具，并确认装夹位置与操作要求。"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/compression-ring-installation-pliers-t-sf-4-ss.png",
          "alt": "恒永达卡环套件专用安装钳 T-SF-4-SS，商品编码 959016",
          "width": 898,
          "height": 763,
          "caption": "卡环套件安装钳 T-SF-4-SS（商品编码：959016），用于卡环套件预装。"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/snap-ring-assembly-zh.png",
          "alt": "卡环接头、压套、垫圈的安装顺序和管端平齐位置",
          "width": 595,
          "height": 535,
          "caption": "依次套入接头、压套和垫圈，核对零件方向，将管端面调整至与垫圈端面平齐。"
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "平切管端：使用适合管材的切管工具，清除残屑，检查管口有无压扁、毛刺或裂纹。",
            "核对方向：依次套入接头、压套和垫圈，按所选套件图示确认正反方向。",
            "定位并预装：使管端与垫圈端面平齐，使用配套专用卡环套件安装钳完成压装，复查压套是否到位、管端是否回缩或突出。",
            "接入端口：清洁并检查端口密封面，保持管端组件就位，按相应要求旋紧接头。",
            "检查连接：完成布管固定，在规定介质、温度和压力下检查泄漏、进气及管端位移。"
          ]
        },
        {
          "type": "subheading",
          "title": "卡环接头耐压多少？"
        },
        {
          "type": "paragraph",
          "text": "耐压应对应完整的“接头＋套件＋管材＋端口”组合，并注明温度和使用条件。本文不对 HSF6／CL-1S 给出统一的耐压数值；选型时应取得具体组合的允许工作压力。正压、负压及启停峰值需分别确认，不宜仅凭 PEEK 本体或金属压套判断承压能力。"
        },
        {
          "type": "subheading",
          "title": "安装需要多大扭矩？"
        },
        {
          "type": "paragraph",
          "text": "恒永达塑料硬管接头采用 M6×1 或 1/4-28 UNF 螺纹时，推荐安装扭矩为 0.25～0.30 N·m；采用 6-40 UNF 螺纹的 U40 卡环接头，推荐安装扭矩为 0.08～0.15 N·m。选用时应按接头的螺纹规格和本体材料对应下表。"
        },
        {
          "type": "table",
          "headers": ["螺纹规格", "适用接头", "推荐安装扭矩"],
          "rows": [
            ["M6×1", "塑料硬管接头", "0.25～0.30 N·m"],
            ["1/4-28 UNF", "塑料硬管接头", "0.25～0.30 N·m"],
            ["6-40 UNF", "塑料 U40 卡环接头", "0.08～0.15 N·m"]
          ]
        },
        {
          "type": "paragraph",
          "text": "上述数值用于接头旋入端口时的螺纹安装锁紧，不是卡环套件预装所需的压紧力。先完成压套与垫圈的正确预装，再按对应扭矩锁紧接头，并检查连接密封性和管端位置。"
        },
        {
          "type": "subheading",
          "title": "重复接驳与故障检查"
        },
        {
          "type": "table",
          "headers": [
            "现象",
            "先检查什么",
            "怎样处理"
          ],
          "rows": [
            [
              "首次接入后泄漏",
              "零件配套、压装方向、管端平齐及端口底面",
              "停机卸压后检查，处理定位或零件问题再复测"
            ],
            [
              "维护拆接后泄漏",
              "垫圈端面污染或损伤、压套位移、管端变形",
              "区分清洁、重新定位和更换组件的需求"
            ],
            [
              "更换组件后流量下降",
              "管内径、管长、切屑、端部挤压及急弯",
              "保持介质与泵工况一致，比较流量和压差"
            ],
            [
              "静态正常、运行异常",
              "启停峰值、温度变化、振动和外部拉扯",
              "检查固定与活动余量，在实际节拍下验证"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "完整组件可按要求重复接驳，不代表无限次或免维护。需要频繁拆接时，应确定试验次数、运行条件和允许泄漏指标，记录各轮后的密封、管端位置与流量变化；发现端面磨损、裂纹或压套松移时，应按组件要求处理。"
        }
      ]
    }
  ],
  "faqTitle": "常见问题",
  "faqItems": [
    {
      "question": "卡环接头也属于免翻边接头吗？",
      "answer": "本文所述压套与垫圈组成的卡环方案使用平切管端，无需预先翻边，因此属于免翻边连接的一种。卡箍连接也可免翻边，但零件组成和装配方式不同，不能只按名称互换。"
    },
    {
      "question": "HSF6 型号带 32，卡环套件也必须选 32 吗？",
      "answer": "不是。本文所列 HSF6 的 32 档覆盖 2.0、2.5、3.0、3.2 mm 管外径，而 CL-1S 按实际外径分别选择。例如 2.5 mm 管使用 CL-1S-25；本体档位与套件管径不是同一个选型步骤。"
    },
    {
      "question": "CL-1S-16 与 CL-1X-16 可以直接互换吗？",
      "answer": "不能。两者都适配 1.6 mm 管外径，但 CL-1S 对应本文 HSF6 的 M6／U28 配套，CL-1X-16 则对应 HFL6-U40-16 的 6-40 UNF 连接。需要同时核对接头、端口和套件外形。"
    },
    {
      "question": "卡环接头需要专用安装工具吗？",
      "answer": "需要。卡环套件首次预装需要配套的专用安装钳，恒永达工具型号为 T-SF-4-SS，商品编码为 959016。仅靠手工推压很难将压套与垫圈正确装配到位，也不能用加大接头锁紧扭矩代替预装。安装前应确认工具与套件、管径的匹配关系；已装好的完整管端组件重新接驳时，应先检查组件状态。"
    },
    {
      "question": "卡环接头安装需要多大扭矩？",
      "answer": "恒永达塑料硬管接头采用 M6×1 或 1/4-28 UNF 螺纹时，推荐安装扭矩为 0.25～0.30 N·m；6-40 UNF 螺纹的塑料 U40 卡环接头为 0.08～0.15 N·m。这些数值用于接头在端口中的螺纹锁紧，不代表卡环套件预装压紧力。"
    },
    {
      "question": "可重复接驳是否意味着旧压套可以换管继续使用？",
      "answer": "不能直接这样理解。完整管端组件重新连接前，需要检查密封面、压套定位和管材状态；将旧压套拆下后装到另一根管上是另一种操作，是否允许应按具体套件要求判断。"
    },
    {
      "question": "管端平齐就能保证零死体积吗？",
      "answer": "不能。平整切口和管端正确定位有助于控制连接处的间隙，残留体积还受端口流道、管内径和装配状态影响。样本或清洗液路应结合残留和清洗要求评估。"
    }
  ],
  "cta": {
    "title": "需要确定卡环接头或预制管组件？",
    "description": "提供两端端口、管材内外径、成品长度、介质、温度、压力及维护需求，确认接头与套件配套、安装方法和样件验证方案。",
    "contactLabel": "联系技术支持",
    "productsLabel": "查看硬管接头系列",
    "productsHref": "/products/fittings/hard-tube-fittings/"
  }
};

export const compressionRingFittingNavigation = [
  { id: "definition", label: "什么是卡环接头" },
  { id: "sealing", label: "结构与密封原理" },
  { id: "series", label: "型号、材料与尺寸" },
  { id: "comparison", label: "三种连接的区别" },
  { id: "selection", label: "应用与组件选型" },
  { id: "installation", label: "安装、耐压与维护" },
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
    case "links": return block.items.map(item => [item.prefix, item.label, item.suffix].filter(Boolean).join("")).join(" ");
  }
}

export function getCompressionRingFittingArticles(locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  const copy = getCompressionRingFittingCopy(locale);
  return [{
    id: compressionRingFittingSlug, slug: compressionRingFittingSlug, category: "fittings-tubing",
    ...copy.metadata, summary: copy.deck, date: "2026-10-13",
    relationKeys: ["series:hsf6", "series:cl-1s", "series:cl-1x"], relationPriority: 150,
    content: [
      { title: "", content: copy.leadBlocks.map(blockText).join("\n\n") },
      ...copy.sections.map(section => ({ title: section.title, content: section.blocks.map(blockText).join("\n\n") })),
      { title: copy.faqTitle, content: copy.faqItems.map(item => `${item.question}\n${item.answer}`).join("\n\n") },
    ],
  }];
}

const translations = { en, es, fr, ko, ru };

export function getCompressionRingFittingCopy(locale: TechnicalArticleLocale): DiaphragmPumpEngineeringArticleCopy {
  return locale === "zh-CN" ? compressionRingFittingCopy : translations[locale] as DiaphragmPumpEngineeringArticleCopy;
}

export function getCompressionRingFittingNavigation(locale: TechnicalArticleLocale) {
  return compressionRingFittingNavigation.map((item, index) => ({
    ...item,
    label: locale === "zh-CN" ? item.label : translations[locale].navigationLabels[index],
  }));
}
