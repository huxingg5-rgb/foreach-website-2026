import type { DiaphragmPumpEngineeringArticleCopy } from "../diaphragm-pump-engineering-article.types";

// Chinese local article. Sources and data boundaries are kept with the visible content.
export const copy = {
  "metadata": {
    "title": "微型隔膜泵噪音来自哪里？恒永达隔膜泵测试条件与结果解读",
    "seoTitle": "微型隔膜泵噪音来自哪里？恒永达隔膜泵测试条件与结果解读｜恒永达 FOREACH",
    "seoDescription": "解释隔膜泵电机、膜片、阀片、流体脉动与安装结构的噪音来源，展示测试布置示意和实测记录方法；具体型号、分贝结果及视频待补。",
    "coverImage": "/images/resources/technical-articles/instrument-fluidics/noise-test-setup.svg",
    "coverAlt": "隔膜泵噪音测试布置示意，实测数据与视频待补"
  },
  "deck": "把噪音来源、测试工况与测量结果放在一起判断；达到设备所需流量和节拍，是比较噪音的前提。",
  "leadBlocks": [
    {
      "type": "paragraph",
      "text": "微型隔膜泵的声音通常来自多个环节：电机和传动机构产生振动，膜片与阀片周期性动作产生声音，流体脉动还可能通过管路、支架及机壳传递。判断是否安静，需要同时看泵本身、工作负载和安装方式。"
    },
    {
      "type": "notice",
      "label": "实测资料状态",
      "text": "当前展示的是测试布置示意，不是实测现场或视频。具体测试型号、测量条件和分贝结果待补；本文暂不作“最低噪音”或竞品差值结论。"
    }
  ],
  "sections": [
    {
      "title": "微型隔膜泵自身的声音主要来自哪里？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "电机驱动机构带动膜片往复运动，泵腔容积随之变化，阀片配合吸入与排出过程开启、关闭。电机转动、轴承运动以及膜片、阀片动作都可能成为声音来源。"
        },
        {
          "type": "paragraph",
          "text": "转速与负载变化也会改变声音大小及频率特征。不能仅凭采用无刷电机，就认定整台泵在全部工况下更安静；泵头、驱动和结构匹配也需要一起评价。"
        },
        {
          "type": "paragraph",
          "text": "在液体泵入口条件不足时，还需排查供液中断、吸入空气或气蚀等因素；听到异常声并不能直接确定是哪一种原因，应结合压力、流量及介质状态检查。"
        }
      ]
    },
    {
      "title": "隔膜泵装进仪器后，为什么可能比台架上更响？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "振动传到薄面板或外壳后，可能激发附加声音。软管贴着机壳或其他零件时，也可能因振动发生碰撞；泵负载随阀门动作变化，声音可能随之改变。"
        },
        {
          "type": "paragraph",
          "text": "降噪需要检查安装隔振、软管支撑和结构共振。加隔音材料时，应同步检查电机散热；调整管长或管径时，应复测流量与压力损失。降低声音不应以无法完成液路任务为代价。"
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/resources/technical-articles/miniature-diaphragm-pump-noise-vibration-reduction/",
              "label": "进一步阅读：隔膜泵噪声排查与减振措施"
            }
          ]
        }
      ]
    },
    {
      "title": "恒永达隔膜泵噪音测试应怎样布置？",
      "blocks": [
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/noise-test-setup.svg",
          "alt": "隔膜泵固定于隔振支撑，连接实际负载，声级计保持固定位置与距离的测试布置示意",
          "caption": "图 1｜测试布置示例，不按比例。测量距离、负载及仪表设置应按实际测试记录填写；本图不展示任何实测分贝值，也不是可播放视频。",
          "width": 1440,
          "height": 900
        },
        {
          "type": "paragraph",
          "text": "测试前固定完整型号、供电及控制设置，记录介质、入口和出口压力、实际流量及安装方式。声级计测点的位置和距离应保持一致，并记录背景噪音与测量时段。"
        },
        {
          "type": "paragraph",
          "text": "需要比较两个方案时，应在完成相同液路任务的前提下使用一致的方法。低转速空载状态与高负载状态的数据，不适合直接作为产品优劣比较。"
        }
      ]
    },
    {
      "title": "恒永达隔膜泵噪音有多低？实测结果需要哪些信息？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "具体噪音水平应由对应型号的测量结果回答。目前实测记录尚未补齐，下表列出后续结果必须同时提供的信息，避免只展示一个没有工况的分贝数字。"
        },
        {
          "type": "table",
          "headers": [
            "结果字段",
            "当前状态"
          ],
          "rows": [
            [
              "完整型号、样本与测试日期",
              "待实测记录补充"
            ],
            [
              "供电、转速或控制设置",
              "待实测记录补充"
            ],
            [
              "介质、入口与出口压力、实际流量",
              "待实测记录补充"
            ],
            [
              "安装、测点位置与距离",
              "待实测记录补充"
            ],
            [
              "仪表、计权与统计指标、测量时段",
              "待实测记录补充"
            ],
            [
              "背景噪音与运行测量结果",
              "待实测记录补充"
            ],
            [
              "对应实测视频",
              "当前为测试布置示意图"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "测试采用 A 计权时，再根据记录标注 dB(A)；不能把其他资料中的 dB 自动改写为 dB(A)。单台样机一次测量也不应直接变成所有型号、所有装机状态的保证值。"
        }
      ]
    },
    {
      "title": "噪音实测视频应怎样与设备工况对应？",
      "blocks": [
        {
          "type": "paragraph",
          "text": "视频应展示型号、安装、管路连接、测量距离与仪表读数，并保留停泵背景、启动和稳定运行阶段。对于间歇排废或气液交替工况，还应呈现这些运行阶段的变化。"
        },
        {
          "type": "paragraph",
          "text": "录音设备增益、降噪处理和用户播放音量会影响听感，所以视频声音用于观察变化，测量结果用于说明数值。最终还要在实际机壳、多泵及阀门共同运行时评价整机表现。"
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/resources/technical-articles/chemiluminescence-analyzer-diaphragm-pump-wash-waste/",
              "label": "化学发光分析仪清洗与排废的隔膜泵条件"
            },
            {
              "href": "https://knf.com/en/global/stories-events/news-stories/article/quiet-diaphragm-pump-systems",
              "label": "技术参考：KNF 系统安装与隔膜泵降噪"
            },
            {
              "href": "https://knf.com/en/global/stories-events/news-stories/article/pump-cavitation-detection-and-prevention",
              "label": "技术参考：KNF 液体泵气蚀与入口条件"
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
