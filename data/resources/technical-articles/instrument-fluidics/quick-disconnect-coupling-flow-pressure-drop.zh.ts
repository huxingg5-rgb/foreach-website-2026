import type { DiaphragmPumpEngineeringArticleCopy } from "../diaphragm-pump-engineering-article.types";

// Source: user-supplied DOCX, 2026-10-26. Curve readings and Kv/Cv values are estimates.
// Curve provenance: A02 catalog printed pages 62/70/76, PDF pages 63/71/77.
// Source curves do not fully specify medium, temperature, or mating/valve configurations.
// These data are for preliminary calculation, not SKU-specific ratings or acceptance limits.
export const copy = {
  "metadata": {
    "title": "快速接头流量怎么算？流量—压降曲线与 Kv/Cv 计算方法",
    "seoTitle": "快速接头流量怎么算？流量—压降曲线与 Kv/Cv 计算方法｜恒永达 FOREACH",
    "seoDescription": "快速接头流量怎么算？结合 Q20、Q40、Q60 流量—压降曲线与 Kv/Cv 估算值，说明目标流量下的压降计算、允许压降下的流量估算，以及阀门配置、泵吸液侧和多支路供液的选型方法。",
    "coverImage": "/images/resources/technical-articles/instrument-fluidics/quick-disconnect-coupling-flow-pressure-drop-cover.webp",
    "coverAlt": "Q60 快速接头连接与分离状态，灰色接头白底产品图"
  },
  "deck": "快速接头的流量与允许压降、接管尺寸、阀门配置及介质性质有关。选型时，先确定目标流量，再用流量—压降曲线或 Kv/Cv 系数估算接头的压力损失，判断是否在液路的压差预算内。本文以公母端可快速分离的 Q20、Q40、Q60 快速接头为例，说明曲线读法、流量与压降计算，以及泵吸液侧、多支路供液的选型和验证方法。",
  "leadBlocks": [
    {
      "type": "paragraph",
      "text": "快速接头的流量与允许压降、接管尺寸、阀门配置及介质性质有关。选型时，先确定目标流量，再用流量—压降曲线或 Kv/Cv 系数估算接头的压力损失，判断是否在液路的压差预算内。本文以公母端可快速分离的 Q20、Q40、Q60 快速接头为例，说明曲线读法、流量与压降计算，以及泵吸液侧、多支路供液的选型和验证方法。"
    },
    {
      "type": "paragraph",
      "text": "对于黏度接近水、处于湍流区的液体，可用 ΔP ≈ SG ×（Q ÷ Kv）² 估算压降，或用 Q ≈ Kv × √（ΔP ÷ SG）估算允许压降下的流量。其中 Q 的单位为 m³/h，ΔP 的单位为 bar，SG 为液体比重。下文给出曲线近似读数、Kv/Cv 估算值和计算示例，并解释阀门、介质黏度及安装位置对选型的影响。"
    }
  ],
  "sections": [
    {
      "title": "快速接头的流量由哪些因素决定？",
      "blocks": [
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/quick-disconnect-couplings-photo.webp",
          "alt": "三种快速接头实物，展示不同外形及直通、弯头和螺纹尾端",
          "caption": "快速接头实物：不同外形与尾端连接方式。",
          "width": 2000,
          "height": 2000
        },
        {
          "type": "paragraph",
          "text": "接头本身不产生流量，流量来自泵或压力源。接头的作用是消耗一部分压差：流量越大，接头前后的压降越大。在常见的湍流工况下，压降大致与流量的平方成正比。以 Q40 的 3/8″ 曲线为例，10 L/min 时压降约 0.23 bar；流量翻倍到 20 L/min 时约 0.95 bar，接近原来的 4 倍。"
        },
        {
          "type": "paragraph",
          "text": "在同一流量下，接头压降主要取决于以下几项："
        },
        {
          "type": "list",
          "items": [
            "接管尺寸：同一系列内，接管从 1/8″ 换到 1/4″，同流量下压降可降低一个数量级以上。",
            "阀门配置：不带阀的直通流道阻力最低；带阀型号的阀芯和弹簧会占用一部分流道。",
            "尾端形式：直通、弯头和螺纹尾端的内部流道不同。",
            "介质：比重越大、黏度越高，同流量下压降越大。"
          ]
        },
        {
          "type": "paragraph",
          "text": "接管内径描述的是适配软管的内径，不等于接头内部的最小通径，详见《什么是快插接头》第 04 节。"
        }
      ]
    },
    {
      "title": "快速接头流量—压降曲线怎么看？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "曲线的横轴是流量（液体为 L/min，气体为 Nm³/min），纵轴是接头前后的压降（bar），每条曲线对应一种接管尺寸。曲线有两种读法："
        },
        {
          "type": "list",
          "items": [
            "已知流量求压降：从目标流量向上找到对应曲线，再向左读出压降。",
            "已知允许压降求流量：从允许的压降向右找到曲线，再向下读出可以通过的流量。"
          ]
        },
        {
          "type": "table",
          "headers": [
            "曲线上的数字",
            "表示什么",
            "不表示什么"
          ],
          "rows": [
            [
              "纵轴的压降",
              "接头前后的压力损失",
              "泵的出口压力，或接头允许的工作压力"
            ],
            [
              "横轴最大刻度",
              "这张图的绘图范围",
              "接头的额定流量"
            ],
            [
              "气体曲线",
              "气体在标准状态下的体积流量",
              "可以换算成液体流量的依据"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "读图时注意单位换算：0.69 bar 约为 10 psi，1.9 L/min 约为 0.5 gpm（美制加仑/分钟），4.83 bar 约为 70 psi。"
        }
      ]
    },
    {
      "title": "Q20、Q40、Q60 流量—压降速查表",
      "blocks": [
        {
          "type": "paragraph",
          "text": "下表为液体流量—压降曲线的近似读数，用于初步筛选和同一系列内的接管尺寸比较。Kv、Cv 为曲线反算的估算值，用于适用工况内的初步计算；曲线读数与系数计算结果不要求逐点相等，产品验收以完整连接的实测数据为准。"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/q20-series-white.webp",
          "alt": "Q20 系列快速接头的连接与分离状态",
          "caption": "Q20 系列",
          "width": 1500,
          "height": 1500
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/q40-series-white.webp",
          "alt": "Q40 系列快速接头的连接与分离状态",
          "caption": "Q40 系列",
          "width": 1500,
          "height": 1500
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/q60-series-white.webp",
          "alt": "Q60 系列快速接头的连接与分离状态",
          "caption": "Q60 系列",
          "width": 1500,
          "height": 1500
        },
        {
          "type": "subheading",
          "title": "Q20 系列（接管内径 1.6–6.4 mm）"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/q20-catalog-flow-curves.webp",
          "alt": "Q20 快速接头气体与液体流量—压降曲线",
          "caption": "图 1｜Q20 流量—压降曲线。上图为气体 Nm³/min，下图为液体 L/min；纵轴均为压降 bar。",
          "width": 835,
          "height": 1205
        },
        {
          "type": "paragraph",
          "text": "Q20 液体流量与压降（压降单位：bar）"
        },
        {
          "type": "table",
          "headers": [
            "流量（L/min）",
            "1/16″（1.6 mm）",
            "1/8″（3.2 mm）",
            "1/4″（6.4 mm）"
          ],
          "rows": [
            [
              "0.2",
              "≈1.9",
              "<0.1",
              "<0.05"
            ],
            [
              "0.5",
              "≈4.3",
              "<0.1",
              "<0.05"
            ],
            [
              "1",
              "超出曲线",
              "≈0.2",
              "<0.05"
            ],
            [
              "2",
              "超出曲线",
              "≈1.0",
              "≈0.07"
            ],
            [
              "4",
              "超出曲线",
              "≈4.0",
              "≈0.3"
            ],
            [
              "8",
              "超出曲线",
              "超出曲线",
              "≈1.3"
            ],
            [
              "12",
              "超出曲线",
              "超出曲线",
              "≈2.8"
            ],
            [
              "压降 1 bar 时的流量（L/min）",
              "≈0.1",
              "≈2.0",
              "≈7.1"
            ],
            [
              "估算 Kv / Cv",
              "曲线过陡，不估算",
              "0.12 / 0.14",
              "0.43 / 0.49"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "\"超出曲线\"表示该流量下压降已高于图表上限 4.83 bar。"
        },
        {
          "type": "paragraph",
          "text": "Q20 的 1/16″ 接管只适合很小的流量：约 0.1 L/min 时压降已达 1 bar，0.5 L/min 时超过 4 bar。储液瓶供液、清洗供液这类每分钟一升以上的液路，优先评估 1/8″ 或 1/4″ 接管。"
        },
        {
          "type": "subheading",
          "title": "Q40 系列（接管内径 6.4–9.5 mm）"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/q40-catalog-flow-curves.webp",
          "alt": "Q40 快速接头气体与液体流量—压降曲线",
          "caption": "图 2｜Q40 流量—压降曲线。上图为气体 Nm³/min，下图为液体 L/min；纵轴均为压降 bar。",
          "width": 835,
          "height": 1360
        },
        {
          "type": "paragraph",
          "text": "Q40 液体流量与压降（压降单位：bar）"
        },
        {
          "type": "table",
          "headers": [
            "流量（L/min）",
            "1/4″（6.4 mm）",
            "3/8″（9.5 mm）"
          ],
          "rows": [
            [
              "2",
              "≈0.3",
              "<0.05"
            ],
            [
              "4",
              "≈0.7",
              "<0.05"
            ],
            [
              "8",
              "≈1.9",
              "≈0.14"
            ],
            [
              "12",
              "≈4.3",
              "≈0.33"
            ],
            [
              "20",
              "超出曲线",
              "≈1.0"
            ],
            [
              "30",
              "超出曲线",
              "≈2.2"
            ],
            [
              "40",
              "超出曲线",
              "≈3.9"
            ],
            [
              "压降 1 bar 时的流量（L/min）",
              "≈5.4",
              "≈20"
            ],
            [
              "估算 Kv / Cv",
              "0.35 / 0.40",
              "1.22 / 1.41"
            ]
          ]
        },
        {
          "type": "subheading",
          "title": "Q60 系列（接管内径 9.5–19.0 mm）"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/q60-catalog-flow-curves.webp",
          "alt": "Q60 快速接头气体与液体流量—压降曲线",
          "caption": "图 3｜Q60 流量—压降曲线。上图为气体 Nm³/min，下图为液体 L/min；纵轴均为压降 bar。",
          "width": 835,
          "height": 1260
        },
        {
          "type": "paragraph",
          "text": "Q60 液体流量与压降（压降单位：bar）"
        },
        {
          "type": "table",
          "headers": [
            "流量（L/min）",
            "3/8″（9.5 mm）",
            "1/2″（12.7 mm）"
          ],
          "rows": [
            [
              "5",
              "≈0.3",
              "<0.05"
            ],
            [
              "10",
              "≈0.65",
              "<0.05"
            ],
            [
              "20",
              "≈2.0",
              "≈0.10"
            ],
            [
              "30",
              "≈4.4 *",
              "≈0.27"
            ],
            [
              "50",
              "超出曲线",
              "≈0.8"
            ],
            [
              "80",
              "超出曲线",
              "≈2.0"
            ],
            [
              "100",
              "超出曲线",
              "≈3.2"
            ],
            [
              "压降 1 bar 时的流量（L/min）",
              "≈13",
              "≈56"
            ],
            [
              "估算 Kv / Cv",
              "0.85 / 0.98",
              "3.4 / 3.9"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "* 该压降已高于 Q60-PP 的工作压力 4.2 bar，只能用来看趋势。"
        },
        {
          "type": "paragraph",
          "text": "本节曲线适用于 Q60 的 3/8″ 和 1/2″ 接管，不能按管径比例外推至 3/4″（19.0 mm）接管。另外，Q60-PP 的工作压力为 4.2 bar，在下游为常压或正压的液路中，曲线上压降高于这个值的区段不可作为使用工况。"
        }
      ]
    },
    {
      "title": "快速接头流量怎么算？用 Kv 或 Cv 估算压降",
      "blocks": [
        {
          "type": "paragraph",
          "text": "在曲线覆盖范围和适用工况内，可用流量系数估算流量与压降；不应向图外工况外推。Kv 表示压降 1 bar 时每小时通过的水量（m³/h）；Cv 表示压降 1 psi 时每分钟通过的美制加仑数。两者的换算为 Cv ≈ 1.156 × Kv。"
        },
        {
          "type": "formula",
          "expression": "已知流量求压降：ΔP = SG ×（Q ÷ Kv）²"
        },
        {
          "type": "formula",
          "expression": "已知允许压降求流量：Q = Kv × √（ΔP ÷ SG）"
        },
        {
          "type": "paragraph",
          "text": "式中 Q 的单位为 m³/h（1 m³/h ≈ 16.7 L/min），ΔP 的单位为 bar，SG 为液体比重（水为 1）。"
        },
        {
          "type": "paragraph",
          "text": "例 1：清洗液路需要 12 L/min，选用 Q40 的 3/8″ 接管（Kv ≈ 1.22），清洗液比重按 1.0 计。12 L/min = 0.72 m³/h，ΔP = 1.0 ×（0.72 ÷ 1.22）² ≈ 0.35 bar，与速查表读数 0.33 bar 基本一致。"
        },
        {
          "type": "paragraph",
          "text": "例 2：某支路留给接头的压降只有 0.5 bar，选用 Q20 的 1/4″ 接管（Kv ≈ 0.43）。Q = 0.43 × √0.5 ≈ 0.30 m³/h，约 5 L/min。"
        },
        {
          "type": "paragraph",
          "text": "例 3：一条液路上串联两对相同的快速接头，总压降是单对的 2 倍，等效 Kv 为单对的 1/√2。串联不同元件时，等效 Kv 按 1/Kv总² = 1/Kv₁² + 1/Kv₂² + … 计算。"
        },
        {
          "type": "paragraph",
          "text": "也可以把 Cv 填入恒永达流阻计算器的 Cv 行，与软管、阀门一起计算整条液路的压降，方法见《流阻计算器有什么用？》。"
        },
        {
          "type": "paragraph",
          "text": "这组公式适用于黏度接近水、处于湍流区的液体。流量很小或介质黏度较高时，流动接近层流，压降更接近随流量线性变化，平方公式会产生偏差，需要用实际介质测试。本文的 Kv、Cv 由流量—压降曲线反算，用于初步计算。"
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/resources/calculators/fluid-resistance/",
              "label": "打开流阻计算器"
            }
          ]
        }
      ]
    },
    {
      "title": "带阀和不带阀的快速接头，压降差多少？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "带阀快速接头在公母分离时自动关闭通道，代价是阀芯和弹簧留在流道里，接合后的压降高于不带阀的直通型号。两侧都带阀时流道里有两个阀芯，压降通常最高。"
        },
        {
          "type": "paragraph",
          "text": "流量紧张的液路可以这样取舍："
        },
        {
          "type": "list",
          "items": [
            "只在断开后确实需要截止的一侧选带阀型号，另一侧选不带阀型号。",
            "两侧都需要截止、流量又紧张时，优先放大接管尺寸，而不是去掉阀门。",
            "公母端没有完全接合时，阀门可能没有完全打开，流量会明显下降。流量异常时先确认接合到位。"
          ],
          "ordered": true
        },
        {
          "type": "links",
          "items": [
            {
              "prefix": "断开后的残液和漏液问题，见",
              "label": "《什么是快插接头》",
              "href": "/resources/technical-articles/what-is-a-quick-disconnect-fitting/",
              "suffix": "。"
            }
          ]
        }
      ]
    },
    {
      "title": "快插接头型号里的数字怎么对应曲线？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "倒刺尾端的型号中，系列号后面的两位数字对应接管内径。用这张表可以把产品页上的型号和曲线图例对应起来："
        },
        {
          "type": "table",
          "headers": [
            "型号代码",
            "接管内径",
            "曲线图例",
            "所属系列"
          ],
          "rows": [
            [
              "01",
              "1.6 mm",
              "1/16″",
              "Q20"
            ],
            [
              "02",
              "3.2 mm",
              "1/8″",
              "Q20"
            ],
            [
              "03",
              "4.8 mm",
              "3/16″（不适用本节曲线）",
              "Q20"
            ],
            [
              "04",
              "6.4 mm",
              "1/4″",
              "Q20、Q40"
            ],
            [
              "06",
              "9.5 mm",
              "3/8″",
              "Q40、Q60"
            ],
            [
              "08",
              "12.7 mm",
              "1/2″",
              "Q60"
            ],
            [
              "12",
              "19.0 mm",
              "3/4″（不适用本节曲线）",
              "Q60"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "以 Q2004-PNV-SPPE 为例：Q20 为系列，04 对应 6.4 mm（1/4″）接管，P 为公端，N 为非穿板，V 为带阀，S、PP、E 分别表示直通、PP 外壳和 EPDM 密封圈。螺纹尾端型号使用另一套代码（例如 Q4005 为螺纹接口），请按完整型号确认。"
        }
      ]
    },
    {
      "title": "快速接头装在泵吸液侧，压降为什么要更保守？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "对开口储液瓶来说，吸液侧能利用的压差上限约为一个大气压（约 1 bar），再加上储液瓶液面高于泵入口的液位差。扣除泵自身需要的入口压力、软管和过滤器的损失后，留给接头的往往只有零点几 bar。吸液侧压降过大时，泵的实际流量会低于空载流量，液体中溶解的气体也更容易析出成气泡。"
        },
        {
          "type": "paragraph",
          "text": "所以吸液侧的接头要按更低的压降来选。同样是 2 L/min，Q20 的 1/8″ 接管约消耗 1.0 bar，已接近吸液侧的上限；换成 1/4″ 接管约为 0.07 bar。"
        },
        {
          "type": "paragraph",
          "text": "吸液侧还要检查接头在负压下是否密封。重接后进入的空气和排气所需的时间，也会影响首次动作的供液量。间歇清洗要按动作期间的瞬时流量评估，而不是每分钟的平均耗液量。"
        }
      ]
    },
    {
      "title": "多条支路共用一个快速接头，按多大流量选？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "位于共同入口的快速接头，承担所有同时工作支路的流量之和："
        },
        {
          "type": "formula",
          "expression": "Q共同入口 = Q支路1 + Q支路2 + …（只累加同时开启的支路）"
        },
        {
          "type": "paragraph",
          "text": "例如三条清洗支路各需 0.5 L/min 且同时供液，共同入口约需 1.5 L/min。按 Kv 估算，Q20 的 1/8″ 接管在 1.5 L/min 时压降约 0.56 bar，1/4″ 接管约 0.04 bar。如果这个接头位于吸液侧，应优先评估 1/4″，并用完整连接验证入口余量。"
        },
        {
          "type": "paragraph",
          "text": "支路依次动作时，入口按单次最大需求计算。共同入口流量足够，不代表各支路分配均匀：软管长度、阀门和针孔尺寸会造成支路阻力差异，需要分别测量各支路末端的出液量。"
        }
      ]
    },
    {
      "title": "气体曲线能用于液体吗？介质黏度怎么修正？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "不能。气体曲线的流量是标准状态下的体积流量，气体可压缩，实际通过量还和入口压力有关。液体曲线与气体曲线对应不同的流动规律，不能通过单位换算互用。"
        },
        {
          "type": "paragraph",
          "text": "液体的比重修正已经包含在第 04 节的公式中。黏度的影响更难估算：含甘油、蛋白或高浓度盐的试剂黏度明显高于水，温度降低也会让黏度上升，同流量下的压降会高于速查表。这类介质请用实际液体、在实际温度下测试完整连接。"
        }
      ]
    },
    {
      "title": "装机后怎样验证快速接头的流量和压降？",
      "blocks": [
        {
          "type": "table",
          "headers": [
            "验证项目",
            "记录内容",
            "用途"
          ],
          "rows": [
            [
              "完整配置",
              "公母端完整型号、阀门组合、软管内径与长度",
              "保证比较的是同一组连接"
            ],
            [
              "接头压降",
              "目标流量下接头前后的压力，或接入前后的末端流量对比",
              "判断是否在压差预算内"
            ],
            [
              "单支路运行",
              "末端流量、启动延迟、重复动作的一致性",
              "判断能否满足动作需求"
            ],
            [
              "多支路同时运行",
              "总流量、各支路分配、共同入口压降",
              "判断分配是否均匀"
            ],
            [
              "吸液侧",
              "入口压力、气泡、低液位时的供液",
              "判断负压进气和供液余量"
            ],
            [
              "过滤器使用一段时间后",
              "末端流量的变化",
              "判断长期余量"
            ],
            [
              "拆装后重启",
              "接合处密封、进气量、排气恢复时间",
              "判断维护对后续动作的影响"
            ]
          ]
        }
      ]
    },
    {
      "title": "快速接头选型延伸阅读",
      "blocks": [
        {
          "type": "links",
          "items": [
            {
              "href": "/resources/technical-articles/what-is-a-quick-disconnect-fitting/",
              "label": "什么是快插接头？公母配对、带阀结构与仪器液路选型"
            },
            {
              "href": "/resources/technical-articles/fitting-material-selection-guide/",
              "label": "接头材质怎么选？PP、PA、POM、PVDF 与 PEEK 的应用区别"
            },
            {
              "href": "/resources/technical-articles/fluid-resistance-calculator-liquid-path-design-guide/",
              "label": "流阻计算器有什么用？液路压降、流量与阻力分析"
            }
          ],
          "ordered": true
        }
      ]
    }
  ],
  "faqTitle": "快速接头流量与压降常见问题",
  "faqItems": [
    {
      "question": "快速接头流量怎么算？",
      "answer": "先确定允许的压降，再按 Q = Kv × √（ΔP ÷ SG）计算，Q 的单位为 m³/h，ΔP 的单位为 bar。也可以直接在流量—压降曲线上，从允许压降向右找到曲线，再向下读出流量。"
    },
    {
      "question": "快速接头的压降多大算正常？",
      "answer": "没有统一的合格值，要看液路的压差预算。出液侧按泵在目标流量下的可用压力分配；吸液侧的可用压差很有限（开口储液瓶约为一个大气压加液位差），接头压降要尽量小。"
    },
    {
      "question": "接管越大，流量就一定越大吗？",
      "answer": "在同一系列、同一阀门配置下，接管加大后压降明显下降。例如 Q20 在 2 L/min 时，1/8″ 接管约 1.0 bar，1/4″ 接管约 0.07 bar。但整条液路的流量还受软管、阀门、针孔等其他部件限制，放大接头的收益要放在整条液路里评估。"
    },
    {
      "question": "大流量快速接头怎么选？",
      "answer": "先确定目标流量、允许压降和系统最高压力，再选择公母端、接管尺寸及阀门组合。在对应的液体曲线上读取目标流量下的压降，判断是否满足液路预算，同时核对工作压力和温度范围。多支路共用入口时，按同时开启支路的总流量选型，装机后测量接头压降和各支路末端流量。"
    },
    {
      "question": "曲线上的气体流量能用于清洗液选型吗？",
      "answer": "不能。气体与液体对应不同的流动规律。清洗液请看液体曲线，或用 Kv 估算后再实测。"
    }
  ],
  "cta": {
    "title": "结合实际液路确认快速接头配置",
    "description": "提供目标流量、介质与温度、安装位置（吸液侧或出液侧）以及允许的压降，恒永达工程师可以协助核对 Q20、Q40、Q60 的公母端组合、接管尺寸和阀门配置。",
    "contactLabel": "沟通快速接头选型",
    "productsLabel": "查看快速接头型号",
    "productsHref": "/products/fittings/quick-connect-fittings/"
  }
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
