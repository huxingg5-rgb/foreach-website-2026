import type { TechnicalArticleItem } from "./technical-articles.types";

export interface MotionSection { title: string; paragraphs: string[]; table?: { headers: string[]; rows: string[][] }; figures?: { src: string; alt: string; caption: string }[] }
export interface MotionArticle { slug: string; title: string; summary: string; sections: MotionSection[]; refs: { label: string; href: string }[] }

export const legacyMotionArticles: MotionArticle[] = [
  {
    "slug": "piston-pump-acceleration-deceleration-curves",
    "title": "柱塞泵驱动之加减速曲线",
    "summary": "从步进电机矩频特性出发，理解线性、S型与抛物线加减速曲线，并结合柱塞泵吸排液节拍、负载与失步问题设置运动参数。",
    "sections": [
      {
        "title": "为什么柱塞泵需要加减速控制？",
        "paragraphs": [
          "步进电机不能在任意负载下从静止直接跳到目标高速。柱塞泵启动时，需要同时克服机械摩擦、液路负载和运动部件的惯性；停止时，也需要留出减速行程。通过逐步改变脉冲频率，可以使电机平稳进入和退出工作速度。",
          "加减速曲线应根据电机矩频特性与实际负载确定。对于步进电机，应核对对应驱动电压、电流和细分设置下的运行转矩曲线，而不能只用保持转矩判断高速带载能力。"
        ]
      },
      {
        "title": "失步与振动：先区分原因",
        "paragraphs": [
          "加速度过大时，所需加速转矩可能超过电机在该转速下的可用转矩，从而失步。负载、供电、驱动电流、共振与机械装配也会影响运行。",
          "加速度较小并不必然造成失步。较慢地经过共振区可能延长振动持续时间，因此应结合实际振动区间调整曲线，而不能将“加速度小”直接等同于“电机力矩过大”。"
        ]
      },
      {
        "title": "三种典型曲线如何理解？",
        "paragraphs": [
          "线性速度曲线在加速段保持恒定加速度，实现直观，但加减速切换处的加速度会突变。S型曲线逐步改变加速度，有助于减轻切换冲击。抛物线型属于非线性速度规划，可通过曲线参数调整不同速度区间的加速度。",
          "以下三张示意图用于理解曲线形态，不代表具体泵型可直接使用的运行参数。实际曲线需要同时满足电机转矩、总行程和液路节拍要求。"
        ],
        "figures": [
          {
            "src": "/images/resources/technical-articles/legacy-motion-control/acceleration-curve-1.png",
            "alt": "柱塞泵步进电机线性加减速曲线示意图",
            "caption": "线性加减速曲线示意图"
          },
          {
            "src": "/images/resources/technical-articles/legacy-motion-control/acceleration-curve-2.png",
            "alt": "柱塞泵步进电机S型加减速曲线示意图",
            "caption": "S型加减速曲线示意图"
          },
          {
            "src": "/images/resources/technical-articles/legacy-motion-control/acceleration-curve-3.png",
            "alt": "柱塞泵步进电机抛物线型加减速曲线示意图",
            "caption": "抛物线型加减速曲线示意图"
          }
        ]
      },
      {
        "title": "把电机速度换算成柱塞速度与理论流量",
        "paragraphs": [
          "对于电机直接驱动丝杆的结构，设丝杆导程为 p（mm/rev），电机转速为 n（rev/s），则柱塞线速度 v = p × n（mm/s）。柱塞有效截面积为 A（mm²）时，理论流量 Q = A × v（mm³/s）；1 mm³ = 1 μL。若有减速机构，还需计入传动比。",
          "这些关系用于规划运动指令。实际出液还受到背压、管路阻力、气泡、阀门切换及密封状态影响，不能将理论流量直接作为交付精度。"
        ]
      },
      {
        "title": "柱塞泵程序调试顺序",
        "paragraphs": [
          "先以较低速度确认复位方向、限位和有效行程；再在实际介质、管路及背压下逐步提高吸液与排液速度。吸液、排液可采用不同速度，不必强制对称。",
          "分别记录起始频率、目标频率、加减速时间、细分、阀门延时与停稳时间。短行程可能没有足够距离达到目标速度，应缩短匀速段或降低峰值速度，并检查是否超程。",
          "最后验证单次分液量、重复性、气泡、振动和电机温升。机械运动正常只是第一步，完整液路下的分液结果才是验收依据。"
        ]
      }
    ],
    "refs": [
      {
        "label": "Oriental Motor：步进电机基础",
        "href": "https://www.orientalmotor.com/stepper-motors/technology/stepper-motor-basics.html"
      }
    ]
  },
  {
    "slug": "precision-piston-pump-backlash-compensation",
    "title": "精密柱塞泵应用指南：间隙补偿",
    "summary": "解释柱塞泵反向间隙的形成、测量与补偿时序，区分机械空行程与实际吸排液量，并说明20整步补偿参考的适用边界。",
    "sections": [
      {
        "title": "什么是反向间隙？",
        "paragraphs": [
          "丝杆与螺母等传动配合存在机械间隙时，电机反向转动后可能先经历一段空行程，柱塞才开始反向运动。这会影响短行程分液，尤其是吸液与排液方向切换后的第一段运动。",
          "不同结构、装配状态和使用阶段的间隙可能不同。机械消隙可以减小背隙，软件补偿用于处理经过测量的反向空行程；补偿不能替代气泡排除、阀门维护或泄漏处理。"
        ]
      },
      {
        "title": "如何测量反向间隙？",
        "paragraphs": [
          "柱塞泵反向间隙可通过称量、吸光度或高度测量等方法评估。称量与吸光度法更接近分液结果，但同时受到液路、天平或光学系统等因素影响；位移测量更直接反映机械回差。",
          "高度法应使用足够分辨率的位移测量工具，保持安装、接触力、速度及读数方向一致。先复位并进入有效行程区，再以同一方向消除初始间隙，记录起点位置；执行等量的往返指令，记录返回位置与起点的差值。",
          "一种测试方法是进行20次重复测量：吸入80%行程，排出100整步作为预备消隙，记录起点；随后排出50%行程、吸入50%行程，再记录终点。预备步数和行程比例属于该测试方案的设定值，实际应用须确认不会触及限位，且预备运动足以覆盖该泵的间隙。",
          "设起点、终点读数为 xₛ、xᴅ，本次回差可按统一坐标方向记录，并以 |xᴅ − xₛ| 表示幅值。计算平均值时，同时保留最大值、离散程度及测试条件；必要时分别测量两个换向方向。"
        ]
      },
      {
        "title": "20整步补偿参考如何使用？",
        "paragraphs": [
          "以下参考表对100、250、500、1000、2500及5000 μL量程列出了相同的1%量程、20整步补偿值。这些数值用于说明补偿思路，不能作为所有型号的统一规格或出厂实测值。"
        ],
        "table": {
          "headers": [
            "泵量程（μL）",
            "量程占比",
            "补偿参考（整步）"
          ],
          "rows": [
            [
              "100",
              "1%",
              "20"
            ],
            [
              "250",
              "1%",
              "20"
            ],
            [
              "500",
              "1%",
              "20"
            ],
            [
              "1000",
              "1%",
              "20"
            ],
            [
              "2500",
              "1%",
              "20"
            ],
            [
              "5000",
              "1%",
              "20"
            ]
          ]
        }
      },
      {
        "title": "把测得的空行程换成补偿指令",
        "paragraphs": [
          "若测得的反向空行程为 b（mm），直接驱动丝杆导程为 p（mm/rev），电机每转整步数为 N，则整步补偿估算值为 b × N ÷ p。驱动器细分为 m 时，输入脉冲数还需乘以 m，并按控制器要求取整、标定。",
          "例如，20整步在16细分脉冲输入方式下对应320个输入脉冲，但只有当控制器确实按细分脉冲计数时才成立。部分控制器使用内部位置单位，应先核对通信与运动手册。"
        ]
      },
      {
        "title": "单次吸入X、单次排出X",
        "paragraphs": [
          "一种补偿方案是在复位后先吸入补偿步数，再将采样针浸入试剂并吸入目标量X；移动到反应杯后，排出目标量对应步数加上补偿步数。该思路旨在把换向空行程与有效排液行程分开。",
          "使用前要确认针尖位置、空气段、阀门状态和可用行程。只有在该液路与时序下经过实际验证，才能确定补偿动作不会造成额外吸液、带气或目标量偏差。"
        ]
      },
      {
        "title": "一次吸入、多次排出：X = Y + Z",
        "paragraphs": [
          "对于一次吸入、多次排出，可在吸液前预补偿，吸入X后再额外吸入补偿量，随后反向排出补偿步数，再分别排出Y与Z。与单次方案相比，这一过程可能引入额外吸入量和余液，不能简单认为X必然全部被排出。",
          "分次排液时应分别测量首份、中间份、末份液量和最终残留，并核对各次动作是否发生换向。补偿应对应真实的换向空行程，持续同向排液通常不需要每份都重复补偿。",
          "对于有换向阀、空气隔离段或多路采样的系统，补偿时序必须与阀路一起设计，并在目标液量、实际介质和背压下校准。"
        ]
      }
    ],
    "refs": []
  },
  {
    "slug": "stepper-motor-calculation-selection",
    "title": "精密柱塞泵步进电机计算与选型",
    "summary": "从脉冲频率、细分、传动比和负载转矩入手计算步进电机，并用400 mm往复平台示例核算速度、脉冲当量和动态转矩。",
    "sections": [
      {
        "title": "从运动需求开始选型",
        "paragraphs": [
          "步进电机通过驱动器把脉冲指令转换为离散的转动。脉冲数量用于规划位移，脉冲频率用于规划速度；实际能否跟随指令，还取决于电机、驱动器、负载和加减速设置。",
          "选型前先明确行程、运动周期、停留时间、负载质量、摩擦、外力、定位要求与传动结构。对于柱塞泵，还应计入液压负载及密封摩擦。不能仅凭机座号或保持转矩选定电机。"
        ]
      },
      {
        "title": "保持转矩、运行转矩与细分",
        "paragraphs": [
          "保持转矩描述电机通电静止时抵抗外力矩的能力；运行时应查看对应驱动条件下的矩频或转矩—转速曲线。低速与高速的可用转矩不同，静态参数不能替代动态核算。",
          "细分减小每个输入脉冲对应的理论转角，并可改善运行平顺性。分辨率提高不等于定位精度同比提高，更不代表实际重复定位误差只由脉冲当量决定。应根据驱动器、电机、负载和机械传动验证。"
        ]
      },
      {
        "title": "常用换算公式",
        "paragraphs": [
          "设整步角θ（°），每转整步数 N = 360 ÷ θ；细分数m，输入脉冲频率f（Hz）。电机转速 n = f ÷ (N × m)（rev/s），转速rpm = 60 × n。",
          "设电机转速与负载轴转速之比为G，负载轴每转的直线位移为C（mm），则脉冲当量 δ = C ÷ (G × N × m)（mm/pulse）。丝杆传动可用导程替代C。",
          "负载转矩与惯性转矩都应折算到电机轴。简化形式为 T需求 = T负载折算 + J等效 × α，其中α为电机角加速度；效率、转子和传动件惯量须按实际结构计入，避免重复折算。"
        ]
      },
      {
        "title": "计算示例：400 mm水平往复平台",
        "paragraphs": [
          "以下采用一个水平往复平台示例：平台单程400 mm，往返周期4 s，不计两端停留；运动质量10 kg，同步带传动，单程加速与减速各0.1 s，匀速1.8 s，导轨摩擦系数取0.1。示例用于演示计算，不是实际设备的最终选型结果。",
          "单程2 s。梯形速度曲线下面积等于位移：0.4 = v最大 × (0.1/2 + 1.8 + 0.1/2)，因此v最大约0.2105 m/s，加速度约2.105 m/s²。",
          "摩擦力 f摩擦 = μMg = 9.8 N；加速惯性力约21.05 N；因此平台加速段所需拉力约30.85 N。这里还没有计入带轮惯量、传动损耗等因素。"
        ]
      },
      {
        "title": "传动比、细分与速度核算",
        "paragraphs": [
          "取负载轴带轮直径30 mm，其周长约94.25 mm。直接驱动时，为使理论脉冲当量小于0.05 mm，1.8°电机所需细分数大于9.42。此处只是在比较分辨率，尚不能保证重复定位误差。",
          "若增加3:1减速，即电机转3圈、负载轴转1圈，并采用4细分，则脉冲当量约94.25 ÷ (3 × 200 × 4) = 0.0393 mm/pulse。"
        ],
        "table": {
          "headers": [
            "计算量",
            "本示例结果"
          ],
          "rows": [
            [
              "负载轴最大转速",
              "约2.234 rev/s"
            ],
            [
              "电机最大转速（3:1减速）",
              "约6.70 rev/s，即402 rpm"
            ],
            [
              "电机输入脉冲频率（4细分）",
              "约5361 pulse/s"
            ],
            [
              "理论脉冲当量",
              "约0.0393 mm/pulse"
            ]
          ]
        }
      },
      {
        "title": "动态转矩核算与最终验收",
        "paragraphs": [
          "暂按理想效率忽略旋转惯量，电机轴所需转矩约30.85 × 0.015 ÷ 3 = 0.154 N·m。若暂取2倍裕量，得到约0.309 N·m的初步要求；实际还应加入带轮、转子、传动损耗及外力影响。",
          "应在约402 rpm工作点核对电机与驱动器组合的动态转矩，再验证整个加减速区间。示例中的57HS09仅用于计算说明，不能仅凭0.9 N·m保持转矩确认其满足当前应用。",
          "单位换算时应注意，6.72 r/s约等于403.2 r/min。本示例使用未过早取整的数值，因此得到约402 rpm。",
          "最后测试最不利负载下的失步、温升、振动和往返定位。理论脉冲当量满足要求，只说明指令分辨率足够，实际重复定位仍需测量。"
        ]
      }
    ],
    "refs": [
      {
        "label": "Oriental Motor：步进电机基础",
        "href": "https://www.orientalmotor.com/stepper-motors/technology/stepper-motor-basics.html"
      }
    ]
  },
  {
    "slug": "modbus-protocol-fluid-control",
    "title": "Modbus协议：RTU、ASCII与TCP通信基础",
    "summary": "区分Modbus应用协议与RS-485电气接口，理解RTU、ASCII、TCP报文、串行地址及请求应答机制，并整理流体控制设备联调要点。",
    "sections": [
      {
        "title": "Modbus是什么？",
        "paragraphs": [
          "Modbus是一种应用层消息协议，可用于控制器与设备之间的数据交换。RS-485、RS-232是电气接口，Modbus RTU、ASCII和TCP则涉及相应的报文与传输方式。设备具有RS-485接口，并不意味着它一定支持Modbus。",
          "在流体控制系统中，可用它读取状态或传递控制参数，但具体设备是否支持、支持哪些功能与寄存器，需要以该型号控制器的通信手册为准。本文不构成对全部FOREACH产品接口能力的承诺。"
        ]
      },
      {
        "title": "RTU、ASCII和TCP如何区分？",
        "paragraphs": [
          "三者不能仅按接口插头判断。串行通信需要匹配模式、波特率及帧格式；TCP通信需要匹配网络连接与设备端服务设置。"
        ],
        "table": {
          "headers": [
            "方式",
            "报文特点",
            "核对重点"
          ],
          "rows": [
            [
              "Modbus RTU",
              "地址 + 功能码 + 数据 + CRC",
              "串口参数、设备地址、帧间隔"
            ],
            [
              "Modbus ASCII",
              "ASCII编码，使用LRC校验及相应起止符",
              "串口参数、编码方式、LRC"
            ],
            [
              "Modbus TCP",
              "MBAP头 + 功能码 + 数据，不附加RTU的CRC",
              "IP、端口、事务标识、Unit Identifier"
            ]
          ]
        }
      },
      {
        "title": "串行地址与请求应答",
        "paragraphs": [
          "Modbus串行单播从站地址为1—247；0用于广播，248—255保留。单播通常由主站发起请求、对应从站应答；广播写请求不返回应答。地址字段有8位，并不代表0—255都可配置为普通从站地址。",
          "上述规则用于串行链路。Modbus TCP的MBAP头含Unit Identifier，涉及网关转发时还需按设备实现解释，不能直接把串行地址规则套到所有TCP配置。"
        ]
      },
      {
        "title": "功能码与寄存器表需要一起看",
        "paragraphs": [
          "功能码说明读取或写入哪类数据，数据区包含地址、数量或值。即使两台设备都支持Modbus，也不代表它们使用相同的寄存器定义。",
          "联调前应核对手册中的寄存器编号与报文起始地址是否存在偏移，确认数据宽度、有符号或无符号、比例系数、单位以及多寄存器数据的字序。速度值、位置值和液量值不能互相代用。"
        ],
        "figures": [
          {
            "src": "/images/resources/technical-articles/legacy-motion-control/modbus-request-response.png",
            "alt": "Modbus串行单播请求应答报文与常用功能码表",
            "caption": "串行单播请求应答及常用功能码示意图；广播不返回应答，TCP报文格式见上表。"
          }
        ]
      },
      {
        "title": "流体控制设备联调步骤",
        "paragraphs": [
          "先确认接线与供电，再按手册统一通信设置。开始时读取一个已知状态，核对响应中的设备地址、功能码与数据含义，然后再测试允许的参数写入和运动指令。",
          "把通信成功、指令被接受、运动完成和液量达标分别验证。收到写入应答不等于泵已经完成动作；超时后也不能直接重复执行加液命令，应先查询状态，避免重复加液。",
          "记录请求与响应、异常码和超时条件，结合限位、复位、阀门状态与运行时序定位问题。具体命令、地址和计数单位以对应设备通信手册为准。"
        ]
      }
    ],
    "refs": [
      {
        "label": "Modbus Organization：串行规范V1.02",
        "href": "https://www.modbus.org/file/secure/modbusoverserial.pdf"
      },
      {
        "label": "Modbus Organization：TCP/IP实现指南",
        "href": "https://www.modbus.org/file/secure/messagingimplementationguide.pdf"
      }
    ]
  }
];

const legacyMotionArticleCovers: Record<
  string,
  { src: string; alt: string }
> = {
  "piston-pump-acceleration-deceleration-curves": {
    src: "/images/resources/technical-articles/legacy-motion-control/acceleration-curve-2.png",
    alt: "柱塞泵步进电机S型加减速曲线",
  },
  "precision-piston-pump-backlash-compensation": {
    src: "/images/resources/technical-articles/piston-pump/precision-piston-pump-backlash-compensation-cover.webp",
    alt: "FOREACH精密柱塞泵透明泵头与传动结构",
  },
  "stepper-motor-calculation-selection": {
    src: "/images/resources/technical-articles/piston-pump/precision-piston-pump-stepper-motor-selection-cover.webp",
    alt: "FOREACH精密柱塞泵步进电机与驱动结构特写",
  },
  "modbus-protocol-fluid-control": {
    src: "/images/resources/technical-articles/covers/pressure-flow-material-compatibility.webp",
    alt: "FOREACH精密流体系统泵与连接管路",
  },
};

export const legacyMotionArticleItems: TechnicalArticleItem[] =
  legacyMotionArticles.map((article) => {
    const cover = legacyMotionArticleCovers[article.slug];

    return {
      id: article.slug,
      slug: article.slug,
      relationKeys: ["topic:piston-motion-control"],
      category: "pumps-valves",
      title: article.title,
      summary: article.summary,
      date: "2026-09-06",
      coverImage: cover.src,
      coverAlt: cover.alt,
      content: article.sections.map((section) => ({
        title: section.title,
        content: [
          ...section.paragraphs,
          ...(section.table?.rows.map((row) => row.join("：")) ?? []),
        ].join("\n\n"),
      })),
      seoTitle: `${article.title} | FOREACH`,
      seoDescription: article.summary,
    };
  });
