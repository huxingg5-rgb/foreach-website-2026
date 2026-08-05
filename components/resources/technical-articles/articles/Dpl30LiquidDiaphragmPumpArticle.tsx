import Image from "next/image";

import styles from "../../news/NewsArticleClient.module.css";

type SupportedLocale =
  | "zh-CN"
  | "en"
  | "es"
  | "fr"
  | "ko"
  | "ru";

interface Dpl30LiquidDiaphragmPumpArticleProps {
  locale?: SupportedLocale;
}

const ASSET_BASE =
  "/images/resources/technical-articles/dpl30-liquid-diaphragm-pump";

type ArticleFigureProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

function ArticleFigure({
  src,
  alt,
  width,
  height,
  caption,
}: ArticleFigureProps) {
  return (
    <figure
      style={{
        margin: "30px 0",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 760px) 100vw, 1280px"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          objectFit: "contain",
        }}
      />

      <figcaption
        style={{
          marginTop: 12,
          color: "#8b96a8",
          fontSize: 13,
          lineHeight: 1.65,
          textAlign: "center",
        }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h3
      style={{
        margin: "30px 0 14px",
        color: "#173368",
        fontSize: "22px",
        lineHeight: 1.4,
        fontWeight: 800,
      }}
    >
      {children}
    </h3>
  );
}

function WorkingPrincipleDiagram() {
  return (
    <figure
      style={{
        width: "100%",
        maxWidth: 1280,
        margin: "30px auto",
      }}
    >
      <svg
        viewBox="0 0 1120 470"
        role="img"
        aria-label="液体隔膜泵吸液与排液工作原理示意图"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          padding: "24px 0",
          borderTop: "1px solid rgba(23, 51, 104, 0.14)",
          borderBottom: "1px solid rgba(23, 51, 104, 0.14)",
        }}
      >
        <defs>
          <marker
            id="dpl30ArrowBlue"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
          >
            <path
              d="M0 0 L0 6 L9 3 Z"
              fill="#173368"
            />
          </marker>

          <marker
            id="dpl30ArrowGreen"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
          >
            <path
              d="M0 0 L0 6 L9 3 Z"
              fill="#0b9e7d"
            />
          </marker>
        </defs>

        <line
          x1="560"
          y1="24"
          x2="560"
          y2="438"
          stroke="#e3e7ec"
        />

        <text
          x="270"
          y="55"
          textAnchor="middle"
          fontSize="25"
          fontWeight="700"
          fill="#173368"
        >
          吸液过程
        </text>

        <text
          x="850"
          y="55"
          textAnchor="middle"
          fontSize="25"
          fontWeight="700"
          fill="#173368"
        >
          排液过程
        </text>

        <g transform="translate(0,10)">
          <rect
            x="110"
            y="160"
            width="320"
            height="125"
            rx="18"
            fill="#ffffff"
            stroke="#aeb7c2"
            strokeWidth="3"
          />

          <path
            d="M175 160 C215 112 325 112 365 160"
            fill="none"
            stroke="#173368"
            strokeWidth="9"
          />

          <line
            x1="270"
            y1="88"
            x2="270"
            y2="142"
            stroke="#173368"
            strokeWidth="4"
            markerEnd="url(#dpl30ArrowBlue)"
          />

          <line
            x1="58"
            y1="222"
            x2="110"
            y2="222"
            stroke="#0b9e7d"
            strokeWidth="8"
          />

          <line
            x1="430"
            y1="222"
            x2="482"
            y2="222"
            stroke="#a5aeb9"
            strokeWidth="8"
          />

          <path
            d="M68 222 H145"
            stroke="#0b9e7d"
            strokeWidth="4"
            markerEnd="url(#dpl30ArrowGreen)"
          />

          <path
            d="M142 247 C205 275 335 275 398 247"
            fill="none"
            stroke="#74bde7"
            strokeWidth="18"
            opacity="0.5"
          />

          <text
            x="70"
            y="330"
            fontSize="17"
            fill="#0b9e7d"
          >
            进口阀打开
          </text>

          <text
            x="360"
            y="330"
            fontSize="17"
            fill="#7d8691"
          >
            出口阀关闭
          </text>

          <text
            x="270"
            y="375"
            textAnchor="middle"
            fontSize="16"
            fill="#596471"
          >
            泵腔容积增大，液体进入泵腔
          </text>
        </g>

        <g transform="translate(580,10)">
          <rect
            x="110"
            y="160"
            width="320"
            height="125"
            rx="18"
            fill="#ffffff"
            stroke="#aeb7c2"
            strokeWidth="3"
          />

          <path
            d="M175 160 C215 202 325 202 365 160"
            fill="none"
            stroke="#173368"
            strokeWidth="9"
          />

          <line
            x1="270"
            y1="88"
            x2="270"
            y2="142"
            stroke="#173368"
            strokeWidth="4"
            markerEnd="url(#dpl30ArrowBlue)"
          />

          <line
            x1="58"
            y1="222"
            x2="110"
            y2="222"
            stroke="#a5aeb9"
            strokeWidth="8"
          />

          <line
            x1="430"
            y1="222"
            x2="482"
            y2="222"
            stroke="#0b9e7d"
            strokeWidth="8"
          />

          <path
            d="M400 222 H475"
            stroke="#0b9e7d"
            strokeWidth="4"
            markerEnd="url(#dpl30ArrowGreen)"
          />

          <path
            d="M142 247 C205 275 335 275 398 247"
            fill="none"
            stroke="#74bde7"
            strokeWidth="18"
            opacity="0.5"
          />

          <text
            x="70"
            y="330"
            fontSize="17"
            fill="#7d8691"
          >
            进口阀关闭
          </text>

          <text
            x="360"
            y="330"
            fontSize="17"
            fill="#0b9e7d"
          >
            出口阀打开
          </text>

          <text
            x="270"
            y="375"
            textAnchor="middle"
            fontSize="16"
            fill="#596471"
          >
            泵腔容积减小，液体排出泵腔
          </text>
        </g>
      </svg>

      <figcaption
        style={{
          marginTop: 12,
          color: "#8b96a8",
          fontSize: 13,
          lineHeight: 1.65,
          textAlign: "center",
        }}
      >
        液体隔膜泵吸液与排液工作原理示意图
      </figcaption>
    </figure>
  );
}

export default function Dpl30LiquidDiaphragmPumpArticle({
  locale = "zh-CN",
}: Dpl30LiquidDiaphragmPumpArticleProps) {
  if (locale !== "zh-CN") {
    return null;
  }

  return (
    <div className={styles.technicalArticleBody}>
      <section className={styles.contentBlock}>
        <h2>一、液体隔膜泵如何完成吸液和排液？</h2>

        <p>
          液体隔膜泵是一种依靠柔性膜片往复运动完成液体输送的容积式泵。其主要结构包括泵腔、膜片、进口阀、出口阀以及驱动机构。
        </p>

        <p>
          电机通过偏心机构带动膜片往复运动，使泵腔容积周期性变化。当膜片向远离泵腔的一侧运动时，泵腔容积增大、内部压力降低，进口阀打开，液体进入泵腔；当膜片向泵腔方向运动时，泵腔容积减小、内部压力升高，进口阀关闭、出口阀打开，液体进入下游管路。
        </p>

        <WorkingPrincipleDiagram />

        <p>
          膜片同时在输送介质和驱动机构之间形成隔离。液体主要与泵头、膜片和阀片接触，因此可以通过选择不同接液材料组合，对不同液体介质进行兼容性评估。
        </p>

        <p>
          隔膜泵的往复运动会带来一定的流量和压力脉动。脉动大小会受到泵腔结构、转速、膜片行程、阀片响应、管路弹性、系统背压和缓冲结构影响。对流量稳定性要求较高的设备，需要结合完整液路进行验证。
        </p>
      </section>

      <section className={styles.contentBlock}>
        <h2>二、选择液体隔膜泵时真正需要确认什么？</h2>

        <p>
          只看到“300 mL/min”并不能完成隔膜泵选型。可靠的选型需要同时确认输送介质、流量测试条件、系统压力、自吸高度、接液材料、电机类型、运行时间和管路阻力。
        </p>

        <div className={styles.technicalTableWrap}>
          <table className={styles.technicalTable}>
            <thead>
              <tr>
                <th>选型项目</th>
                <th>需要确认的问题</th>
                <th>常见误区</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>输送介质</td>
                <td>
                  液体名称、浓度、温度、黏度、颗粒情况和连续接触时间
                </td>
                <td>
                  只看到PTFE或FFKM，就认为可以输送所有化学液体
                </td>
              </tr>

              <tr>
                <td>流量</td>
                <td>
                  标注的是空载流量、额定流量、最大流量，还是某一压力下的工作流量
                </td>
                <td>
                  把空载流量直接当成设备端实际工作流量
                </td>
              </tr>

              <tr>
                <td>压力</td>
                <td>
                  下游过滤器、软管、接头、阀、喷嘴和液位高度会产生多大阻力
                </td>
                <td>
                  只看最大压力，不看目标压力下对应的实际流量
                </td>
              </tr>

              <tr>
                <td>自吸能力</td>
                <td>
                  液面与泵入口的高度差，以及启动时管路中是否已有液体
                </td>
                <td>
                  将规格书自吸高度直接等同于所有工况下的稳定吸液能力
                </td>
              </tr>

              <tr>
                <td>接液材料</td>
                <td>
                  泵头、膜片和阀片分别采用什么材料
                </td>
                <td>
                  只确认膜片材料，忽略阀片和泵头
                </td>
              </tr>

              <tr>
                <td>电机与寿命</td>
                <td>
                  使用12V还是24V，每天运行多久，连续运行还是间歇运行
                </td>
                <td>
                  只看寿命数字，不看寿命测试条件
                </td>
              </tr>

              <tr>
                <td>管路条件</td>
                <td>
                  软管内径、长度、弯头、过滤器和接头数量
                </td>
                <td>
                  忽略管路阻力对实际流量的影响
                </td>
              </tr>

              <tr>
                <td>脉动与噪声</td>
                <td>
                  系统是否对流量稳定性、振动和声音有明确要求
                </td>
                <td>
                  将隔膜泵描述为绝对无脉动或绝对静音
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.contentBlock}>
        <h2>三、为什么不能只根据300 mL/min选择DPL30？</h2>

        <p>
          隔膜泵参数中的“300 mL/min”必须结合测试条件理解。它可能表示空载流量、最大流量、额定流量，或者某一压力下的实际工作流量。
        </p>

        <div className={styles.technicalNotice}>
          <strong>
            DPL30规格书中的300 mL/min为空载流量。
          </strong>
          <br />
          额定压力为100 kPa，两项参数不是同一个工作点，不能理解为DPL30在100 kPa压力下仍能保持300 mL/min。
        </div>

        <p>
          隔膜泵安装到设备内部后，软管、过滤器、接头、阀、喷嘴和液位高度都会形成液路阻力。随着入口负压或出口正压增加，泵的实际流量会发生变化。
        </p>

        <p>
          因此，“需要一款空载流量约300 mL/min的泵”和“设备在实际工作压力下必须达到300 mL/min”是两种不同需求。后一种情况需要先确认系统工作压力，再结合流量—压力曲线和装机测试确定实际工作点。
        </p>
      </section>

      <section className={styles.contentBlock}>
        <h2>四、DPL30完整技术参数</h2>

        <p>
          DPL30提供12V与24V、有刷与无刷等基础版本。以下参数按照DPL30现行规格书整理。
        </p>

        <div className={styles.technicalTableWrap}>
          <table className={styles.technicalTable}>
            <thead>
              <tr>
                <th>参数</th>
                <th>有刷版本</th>
                <th>无刷版本</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>产品名称</td>
                <td colSpan={2}>DPL30液体隔膜泵</td>
              </tr>

              <tr>
                <td>基础型号</td>
                <td>DPL30-24DB、DPL30-12DB</td>
                <td>DPL30-24BB、DPL30-12BB</td>
              </tr>

              <tr>
                <td>电机类型</td>
                <td>直流有刷电机</td>
                <td>直流无刷电机</td>
              </tr>

              <tr>
                <td>额定电压</td>
                <td colSpan={2}>
                  DC 12V ±10%或DC 24V ±10%
                </td>
              </tr>

              <tr>
                <td>额定功率</td>
                <td colSpan={2}>≤8W</td>
              </tr>

              <tr>
                <td>空载流量</td>
                <td colSpan={2}>300 mL/min</td>
              </tr>

              <tr>
                <td>额定压力</td>
                <td colSpan={2}>100 kPa</td>
              </tr>

              <tr>
                <td>自吸高度</td>
                <td colSpan={2}>6 mH₂O</td>
              </tr>

              <tr>
                <td>工作介质</td>
                <td colSpan={2}>
                  纯化水；其他液体介质由客户结合实际工况评估
                </td>
              </tr>

              <tr>
                <td>介质温度</td>
                <td colSpan={2}>+5℃～+80℃</td>
              </tr>

              <tr>
                <td>接管规格</td>
                <td colSpan={2}>
                  可接内径3.2 mm软管
                </td>
              </tr>

              <tr>
                <td>泵头材料</td>
                <td colSpan={2}>PPS</td>
              </tr>

              <tr>
                <td>膜片材料</td>
                <td colSpan={2}>EPDM或PTFE</td>
              </tr>

              <tr>
                <td>阀片材料</td>
                <td colSpan={2}>EPDM或FFKM</td>
              </tr>

              <tr>
                <td>重量</td>
                <td>约160 g</td>
                <td>约185 g</td>
              </tr>

              <tr>
                <td>寿命</td>
                <td>
                  3000 h，额定电压、连续运行
                </td>
                <td>
                  10000 h，额定电压、连续运行
                </td>
              </tr>

              <tr>
                <td>噪声</td>
                <td colSpan={2}>≤80 dB</td>
              </tr>

              <tr>
                <td>工作环境温度</td>
                <td colSpan={2}>+5℃～+40℃</td>
              </tr>

              <tr>
                <td>工作环境相对湿度</td>
                <td colSpan={2}>
                  30%～85% RH，无冷凝
                </td>
              </tr>

              <tr>
                <td>存储环境温度</td>
                <td colSpan={2}>-10℃～+40℃</td>
              </tr>

              <tr>
                <td>存储环境相对湿度</td>
                <td colSpan={2}>
                  10%～90% RH，无冷凝
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.contentBlock}>
        <h2>五、DPL30流量—压力曲线怎么看？</h2>

        <p>
          流量—压力曲线用于观察入口负压和出口正压变化时，DPL30流量的变化趋势。横轴左侧表示入口负压，右侧表示出口正压，纵轴表示流量。
        </p>

        <ArticleFigure
          src={`${ASSET_BASE}/dpl30-flow-pressure.jpg`}
          alt="DPL30液体隔膜泵流量压力曲线"
          width={750}
          height={610}
          caption="DPL30流量—压力曲线"
        />

        <p>
          在接近空载的条件下，DPL30流量约为300 mL/min；随着出口正压增加，实际流量逐步下降；当入口负压增大、吸液难度提高时，实际流量也会下降。
        </p>

        <div className={styles.technicalNotice}>
          流量—压力曲线用于辅助选型。实际工作点还会受到液体黏度、软管规格、过滤器、阀、接头、安装方式和液位高度影响，最终应通过实际液路测试确认。
        </div>
      </section>

      <section className={styles.contentBlock}>
        <h2>六、DPL30接液材料怎么选？</h2>

        <p>
          DPL30的主要接液部件包括泵头、膜片和阀片。材料兼容性需要按照完整接液组合进行判断。
        </p>

        <div className={styles.technicalTableWrap}>
          <table className={styles.technicalTable}>
            <thead>
              <tr>
                <th>接液部件</th>
                <th>可选材料</th>
                <th>型号代码对应关系</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>泵头</td>
                <td>PPS</td>
                <td>PS</td>
              </tr>

              <tr>
                <td>膜片</td>
                <td>EPDM或PTFE</td>
                <td>
                  EP/PS中的EPDM；FF/PS中的PTFE
                </td>
              </tr>

              <tr>
                <td>阀片</td>
                <td>EPDM或FFKM</td>
                <td>
                  EP/PS中的EPDM；FF/PS中的FFKM
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <SectionTitle>EP/PS材料组合</SectionTitle>

        <p>
          EP/PS表示EPDM膜片、EPDM阀片和PPS泵头，可作为纯化水及部分常规液体工况的基础评估配置。
        </p>

        <SectionTitle>FF/PS材料组合</SectionTitle>

        <p>
          FF/PS表示PTFE膜片、FFKM阀片和PPS泵头，可用于材料兼容性要求更高的工况评估。
        </p>

        <div className={styles.technicalNotice}>
          <strong>
            材料名称不能直接等同于整泵兼容性。
          </strong>
          <br />
          选型前仍需提供液体名称、配方、浓度、温度、连续接触时间、清洗方式和运行条件，并按照整套接液路径进行评估。
        </div>
      </section>

      <section className={styles.contentBlock}>
        <h2>七、有刷和无刷版本怎么选？</h2>

        <p>
          有刷版本和无刷版本采用不同电机，因此产品寿命、重量、整体长度和接线方式存在差异。
        </p>

        <div className={styles.technicalTableWrap}>
          <table className={styles.technicalTable}>
            <thead>
              <tr>
                <th>对比项目</th>
                <th>有刷版本</th>
                <th>无刷版本</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>电机类型</td>
                <td>直流有刷电机</td>
                <td>直流无刷电机</td>
              </tr>

              <tr>
                <td>规格寿命</td>
                <td>
                  3000 h，额定电压、连续运行
                </td>
                <td>
                  10000 h，额定电压、连续运行
                </td>
              </tr>

              <tr>
                <td>适用方向</td>
                <td>
                  运行时间有限、成本敏感的设备
                </td>
                <td>
                  运行时间较长、整机寿命要求较高的设备
                </td>
              </tr>

              <tr>
                <td>重量</td>
                <td>约160 g</td>
                <td>约185 g</td>
              </tr>

              <tr>
                <td>控制方式</td>
                <td>基础正负极供电</td>
                <td>
                  可根据配置提供PWM、方向控制或转速反馈
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          寿命数据不能脱离测试条件单独使用。系统背压、电源波动、环境温度、频繁启停、安装散热和液体状态都可能影响实际使用寿命。
        </p>

        <SectionTitle>有刷版本外形尺寸</SectionTitle>

        <ArticleFigure
          src={`${ASSET_BASE}/dpl30-brushed-dimensions.webp`}
          alt="DPL30有刷液体隔膜泵外形尺寸图"
          width={1250}
          height={1120}
          caption="DPL30有刷版本外形尺寸图"
        />

        <p>
          有刷版本整体长度约83.2 mm，整体高度约57.3 mm，主体最大宽度约30 mm，泵头主体宽度约26 mm。倒刺外径约φ4.5 mm，可接内径3.2 mm软管。精确安装孔位、尺寸和接口方向应以正式尺寸图为准。
        </p>

        <SectionTitle>无刷版本外形尺寸</SectionTitle>

        <ArticleFigure
          src={`${ASSET_BASE}/dpl30-brushless-dimensions.webp`}
          alt="DPL30无刷液体隔膜泵外形尺寸图"
          width={1270}
          height={1050}
          caption="DPL30无刷版本外形尺寸图"
        />

        <p>
          无刷版本配套电机包含A、B两种等效物料，二者电气参数和输出性能一致，主要区别为外形安装尺寸。主体长度约70 mm或68 mm，整体高度约57.3 mm，主体最大宽度约30 mm。
        </p>
      </section>

      <section className={styles.contentBlock}>
        <h2>八、DPL30型号解析与可选配置</h2>

        <p>
          DPL30完整型号由产品系列、工作电压、电机类型、出线方式、连接方式、连接口方向、膜阀片与泵头材料以及特殊定制代码组成。
        </p>

        <div className={styles.technicalNotice}>
          <strong>
            DPL30 - 24 - D - 2 - B - C - EP/PS - X
          </strong>
          <br />
          产品系列 · 工作电压 · 电机类型 · 出线方式 · 连接方式 ·
          接口方向 · 接液材料 · 特殊定制
        </div>

        <div className={styles.technicalTableWrap}>
          <table className={styles.technicalTable}>
            <thead>
              <tr>
                <th>字段</th>
                <th>代码</th>
                <th>含义</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>产品系列</td>
                <td>DPL30</td>
                <td>DPL30系列液体隔膜泵</td>
              </tr>

              <tr>
                <td>工作电压</td>
                <td>24 / 12</td>
                <td>DC 24V / DC 12V</td>
              </tr>

              <tr>
                <td>电机类型</td>
                <td>D / B / C / BP</td>
                <td>
                  D：直流有刷电机；B：直流无刷电机；C：空心杯电机；BP：直流无刷电机，外接PWM
                </td>
              </tr>

              <tr>
                <td>出线方式</td>
                <td>2 / 3 / 5</td>
                <td>
                  2线、3线或5线；2线为默认配置时可省略
                </td>
              </tr>

              <tr>
                <td>连接方式</td>
                <td>B / S</td>
                <td>B：倒刺端口；S：螺纹端口</td>
              </tr>

              <tr>
                <td>连接口方向</td>
                <td>3 / 6 / 9 / C</td>
                <td>
                  3：向右；6：向下；9：向左；C：向上，默认时可省略
                </td>
              </tr>

              <tr>
                <td>膜阀片 / 泵头材料</td>
                <td>EP/PS / FF/PS</td>
                <td>
                  EP/PS：EPDM膜片与阀片、PPS泵头；FF/PS：PTFE膜片、FFKM阀片、PPS泵头
                </td>
              </tr>

              <tr>
                <td>特殊定制</td>
                <td>X</td>
                <td>
                  自定义代号，最终以项目确认文件为准
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <SectionTitle>
          型号示例：DPL30-24DB-EP/PS
        </SectionTitle>

        <p>
          该型号可以展开理解为DPL30-24-D-2-B-C-EP/PS：DPL30系列、DC 24V、直流有刷电机、2线、倒刺端口、接口向上、EPDM膜片与阀片、PPS泵头。
        </p>

        <div className={styles.technicalNotice}>
          型号中的“DB”不是一个整体代码。D表示直流有刷电机，B表示倒刺端口。同理，DPL30-24BB-EP/PS中的第一个B表示无刷电机，第二个B表示倒刺端口。
        </div>
      </section>

      <section className={styles.contentBlock}>
        <h2>九、DPL30完整选型步骤</h2>

        <ol className={styles.technicalRuleList}>
          <li>
            <strong>确认目标流量</strong>
            <p>
              先区分需要的是空载流量约300 mL/min，还是在实际系统压力下仍要达到某一工作流量。
            </p>
          </li>

          <li>
            <strong>确认系统压力</strong>
            <p>
              统计过滤器、软管、接头、阀、喷嘴和液位高度产生的阻力，并结合流量—压力曲线判断。
            </p>
          </li>

          <li>
            <strong>确认液体介质</strong>
            <p>
              提供液体名称、配方、浓度、温度、黏度、颗粒情况和连续接触时间。
            </p>
          </li>

          <li>
            <strong>选择工作电压</strong>
            <p>
              根据设备供电系统选择DC 12V或DC 24V。
            </p>
          </li>

          <li>
            <strong>选择电机类型</strong>
            <p>
              运行时间有限、成本敏感时可评估有刷版本；寿命要求较高或运行时间较长时可优先评估无刷版本。
            </p>
          </li>

          <li>
            <strong>确认出线与控制方式</strong>
            <p>
              根据设备控制需求确认2线、3线或5线，以及是否需要PWM、DIR和FG功能。
            </p>
          </li>

          <li>
            <strong>确认液路连接方式</strong>
            <p>
              根据软管和液路结构选择倒刺端口或螺纹端口。
            </p>
          </li>

          <li>
            <strong>确认连接口方向</strong>
            <p>
              结合安装空间、软管走向、弯折半径和维护方式选择向上、向右、向下或向左。
            </p>
          </li>

          <li>
            <strong>确认接液材料</strong>
            <p>
              根据介质兼容性选择EP/PS或FF/PS，并完成整套接液路径评估。
            </p>
          </li>

          <li>
            <strong>完成装机验证</strong>
            <p>
              根据尺寸图确认安装空间，并通过实际液路测试验证流量、压力、噪声、寿命和运行稳定性。
            </p>
          </li>
        </ol>
      </section>

      <section className={styles.contentBlock}>
        <h2>十、应用方向与使用边界</h2>

        <p>
          DPL30可面向IVD仪器、实验室分析设备及医疗设备内部液路的液体输送需求进行选型评估，例如纯化水输送、清洗液路、冲洗液路和废液转移等。
        </p>

        <div className={styles.technicalTableWrap}>
          <table className={styles.technicalTable}>
            <thead>
              <tr>
                <th>项目</th>
                <th>说明</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>可用于设备选型评估</td>
                <td>
                  是否适用于具体设备，需要结合介质、流量、压力、运行时间和整机要求完成验证。
                </td>
              </tr>

              <tr>
                <td>不等于医疗器械认证</td>
                <td>
                  用于医疗设备内部选型，并不代表产品已经取得医疗器械整机认证。
                </td>
              </tr>

              <tr>
                <td>其他液体需要评估</td>
                <td>
                  规格书明确的工作介质为纯化水，其他介质应结合材料兼容性和样品测试确认。
                </td>
              </tr>

              <tr>
                <td>不能自行宣传长期干转</td>
                <td>
                  现有规格参数未给出DPL30长期干转的明确保证，存在干转需求时需要专项确认。
                </td>
              </tr>

              <tr>
                <td>寿命需要保留测试条件</td>
                <td>
                  3000 h和10000 h均为额定电压、连续运行条件，实际寿命还会受到负载、温度和启停频率影响。
                </td>
              </tr>

              <tr>
                <td>最终以整机验证为准</td>
                <td>
                  曲线、尺寸和材料数据用于辅助选型，最终仍需在实际液路和整机条件下验证。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.contentBlock}>
        <h2>结语</h2>

        <p>
          选择DPL30时，不能只看“300 mL/min”一个参数。正确的选型顺序应当是先确认目标工作流量和系统压力，再结合液体介质、接液材料、供电方式、电机寿命、接口形式、安装方向和设备空间完成配置确认。
        </p>

        <p>
          选型前建议准备目标工作流量、正常工作压力、液体名称与浓度、介质温度、每天运行时间、电源电压、软管内径与长度、过滤器和阀配置、安装空间及接口方向，以便进一步确认适合的DPL30配置。
        </p>
      </section>
    </div>
  );
}
