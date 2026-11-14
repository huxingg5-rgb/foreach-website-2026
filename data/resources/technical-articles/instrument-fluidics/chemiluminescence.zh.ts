import type { DiaphragmPumpEngineeringArticleCopy } from "../diaphragm-pump-engineering-article.types";

// Chinese local article. Sources and data boundaries are kept with the visible content.
export const copy = {
  "metadata": {
    "title": "化学发光分析仪清洗与排废用隔膜泵，需要具备哪些条件？",
    "seoTitle": "化学发光分析仪清洗与排废用隔膜泵，需要具备哪些条件？｜恒永达 FOREACH",
    "seoDescription": "结合化学发光分析仪液路图，分析清洗供液、吸废液和排空对隔膜泵工作流量、气液混合、接液材料、启停节拍与噪音的要求。",
    "coverImage": "/images/resources/technical-articles/instrument-fluidics/chemiluminescence-task-map.svg",
    "coverAlt": "化学发光分析仪清洗供液和吸废液任务示意"
  },
  "deck": "从图中的清洗液支路和吸废液针出发，分别建立供液与排废的选型条件，不用一组参数覆盖全部液路。",
  "leadBlocks": [
    {
      "type": "paragraph",
      "text": "化学发光分析仪中的隔膜泵应按液路位置选择。清洗供液需要在规定时间内送出所需液量，排废支路则要及时移除液体，并评估空气进入后的抽吸表现。两类任务的选型重点不同。"
    },
    {
      "type": "paragraph",
      "text": "本例液路图在清洗液及清洗支路附近标出隔膜泵，右侧还画出了吸废液针与隔膜泵的连接。EA 泵、切换阀、针和汇流块承担其他配合任务；图中没有给出具体隔膜泵型号或完整控制时序。"
    }
  ],
  "sections": [
    {
      "title": "化学发光分析仪液路图中的隔膜泵承担哪些任务？",
      "blocks": [
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/chemiluminescence-task-map.svg",
          "alt": "根据液路图归纳的清洗供液、吸废液与其他计量支路任务关系",
          "caption": "图 1｜按所提供液路图归纳的任务示意；只用于区分选型职责，不替代原图的接线、阀口和动作时序。",
          "width": 1440,
          "height": 820
        },
        {
          "type": "paragraph",
          "text": "下面的原始液路图保留了部件与连线。可点击图注查看原尺寸图，再沿清洗液和吸废液支路核对隔膜泵所在位置。"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/chemiluminescence-fluid-path.webp",
          "alt": "化学发光分析仪原始液路图，包含清洗液、隔膜泵、EA 泵、切换阀、清洗针与吸废液针",
          "caption": "图 2｜展厅液路图第 1 页的液路区域。图中无具体隔膜泵型号、运行流量和控制时序，不能据此认定已完成某型号装机验证。",
          "captionHref": "/images/resources/technical-articles/instrument-fluidics/chemiluminescence-fluid-path.webp",
          "width": 2382,
          "height": 1484
        },
        {
          "type": "paragraph",
          "text": "选型应先追踪介质从哪里进入、经过哪些部件、最后流向哪里。清洗供液与吸废液是本篇的主要范围；图中的定量加样和加液不能全部归给隔膜泵。"
        }
      ]
    },
    {
      "title": "清洗供液用隔膜泵为什么要按实际阻力验证？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "清洗液从容器到使用端可能经过过滤器、单向阀、快插接头、软管和切换阀。每个环节都可能影响工作点，因此空载流量不等于清洗针处的流量。"
        },
        {
          "type": "paragraph",
          "text": "先确定单次清洗液量、供液时间和同时工作的支路数量，再检查实际管路下的末端出液。间歇动作还要考虑启动延迟、排气以及低液位时的恢复供液。"
        },
        {
          "type": "paragraph",
          "text": "液路图未提供动作时序，不能由静态连线推出多个泵同时启动，也不能据此计算整机总耗液量。应由设备的清洗程序补足这些条件。"
        }
      ]
    },
    {
      "title": "吸废液用隔膜泵为什么要考核气液交替？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "吸废液针抽取液体时，液面下降或入口露出可能使入口从液体转为空气，或出现气液交替。排废任务应核对泵是否适用于这种介质状态，并检查夹气后的抽吸连续性和重新吸液能力。"
        },
        {
          "type": "paragraph",
          "text": "能够建立负压，不代表能在规定时间排完实际废液。应测量真实管路中的排空时间、残液状态和重复动作表现，并核对允许干运行条件。"
        },
        {
          "type": "paragraph",
          "text": "直接抽废液与抽吸密闭废液容器内气体，是不同的系统方案。前者需核对所有接液材料，后者还要评估液体进入气路的防护；本图不能用来证明所有设备采用同一种路线。"
        }
      ]
    },
    {
      "title": "化学发光清洗与排废如何核对接液材料？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "泵头、膜片、阀片、密封件及其他接液零件需要分别评价。图中的“清洗液 A”和“清洗液 B”没有说明化学成分，必须补充介质名称、浓度、温度和接触时间，才能确定材料配置。"
        },
        {
          "type": "paragraph",
          "text": "排废端还要考虑混合介质、停机残留及维护冲洗。如果介质可能形成沉积或结晶，应检查多次循环后的阀口、泵腔和流量变化，不能仅凭一次清水运行判断长期适用性。"
        }
      ]
    },
    {
      "title": "隔膜泵的启停、噪音与控制需要满足哪些整机条件？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "启动响应、单次运行时长、每天启停次数及多泵同时工作情况，都应进入选型输入。单泵稳态噪音只能作为部件依据，实际机壳、阀门动作和多泵协同后的声音需要装机复核。"
        },
        {
          "type": "paragraph",
          "text": "停机回流、残压和废液容器状态，需要由泵、阀门、管路布局及控制共同管理。不能把停机密封或防虹吸任务全部交给内部阀片。"
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/resources/technical-articles/diaphragm-pump-noise-test-conditions/",
              "label": "隔膜泵噪音来源、测试布置与结果解读"
            }
          ]
        }
      ]
    },
    {
      "title": "怎样为恒永达隔膜泵建立样机验证条件？",
      "blocks": [
        {
          "type": "table",
          "headers": [
            "任务",
            "选型输入",
            "样机验证"
          ],
          "rows": [
            [
              "清洗供液",
              "单次液量、时间、液位、出口阻力、介质",
              "实际出液量、启动响应、分支状态和材料相容性"
            ],
            [
              "吸废液与排空",
              "废液量、允许时间、吸入高度、夹气与背压",
              "排空时间、气液交替、恢复能力和残液"
            ],
            [
              "整机集成",
              "安装、供电、控制、工作制与噪音目标",
              "启停循环、温升、噪音、回流及维护恢复"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "可根据任务分别评估恒永达 DPL30、DPL60 液体隔膜泵和 DPGL800 气液混合隔膜泵等候选系列。候选关联不表示这些型号已安装在图中设备，也不表示不同介质状态下可以互换。具体型号应在实际介质、管路和时序下验证。"
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/resources/technical-articles/ivd-waste-liquid-pump-liquid-vs-gas-liquid-diaphragm-pump/",
              "label": "IVD 排废：液体泵与气液混合泵如何选择"
            },
            {
              "href": "/applications/ivd/",
              "label": "IVD 仪器液路应用"
            },
            {
              "href": "https://knf.com/en/uk/solutions/industries/pumps-clinical-diagnostics",
              "label": "技术参考：临床诊断仪器的清洗与废液处理"
            }
          ]
        }
      ]
    }
  ],
  "faqTitle": "常见问题",
  "faqItems": [],
  "cta": {
    "title": "按设备任务确定隔膜泵配置",
    "description": "提供介质、入口与出口条件、动作节拍和噪音目标，评估候选泵并制定样机验证条件。",
    "contactLabel": "沟通选型条件",
    "productsLabel": "查看微型隔膜泵",
    "productsHref": "/products/pumps/miniature-diaphragm-pumps/"
  }
} satisfies DiaphragmPumpEngineeringArticleCopy;
