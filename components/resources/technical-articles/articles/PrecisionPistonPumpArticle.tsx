import Link from "next/link";

import newsStyles from "../../news/NewsArticleClient.module.css";
import styles from "./DiaphragmPumpEngineeringArticle.module.css";

export const precisionPistonPumpArticleSlug =
  "micro-plunger-pump-selection" as const;

export const precisionPistonPumpArticleFaqZh = [
  {
    question: "柱塞泵的分辨率是否等于分液准确性？",
    answer:
      "不等于。分辨率描述电机单步对应的理论位移或体积增量，实际分液还会受到柱塞、密封、阀门、机械背隙、压力、管路、气泡和控制程序影响。",
  },
  {
    question: "是否应该选择能够覆盖需求的最大容量？",
    answer:
      "不一定。容量越大并不代表所有体积下的表现越好。应同时考虑最小关键体积的行程利用率、最大体积、运行效率和补液时间。",
  },
  {
    question: "为什么气泡会影响柱塞泵分液？",
    answer:
      "气体可以被压缩。气泡会吸收一部分柱塞运动产生的体积变化，并在之后释放，造成分液不足、响应延迟或一致性下降，因此需要合理设计预充、排气、吸液速度和管路密封。",
  },
  {
    question: "一台柱塞泵能否处理所有试剂？",
    answer:
      "不能。需要根据实际介质、浓度、温度、压力、清洗方式和接触时间选择接液材料。缺少完整兼容性数据时，应使用实际介质进行验证。",
  },
] as const;

export const precisionPistonPumpArticleCtaZh = {
  title: "需要确认精密柱塞泵的容量、材料和控制配置？",
  description:
    "可提供单次加液量、准确性与重复性要求、介质、背压、管路、运行节拍和安装空间，便于评估 EA、SM、TM 系列及相应配置。",
  contactLabel: "联系工程师",
  productsLabel: "查看柱塞泵产品",
  productsHref: "/products/pumps/piston-pump/",
} as const;

function ArticleTable({
  headers,
  rows,
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
}) {
  return (
    <div className={newsStyles.technicalTableWrap}>
      <table className={newsStyles.technicalTable}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`}>
                  {cellIndex === 0 ? <strong>{cell}</strong> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrecisionPistonPumpArticle() {
  return (
    <div className={newsStyles.technicalArticleBody}>
      <section className={newsStyles.contentBlock}>
        <p>
          精密柱塞泵是一种利用柱塞往复运动吸取、计量和分配液体的容积式泵。它将电机的旋转运动转换为受控的直线位移，使柱塞按照设定行程运动，从而完成可编程的吸液和排液。
        </p>
        <p>
          与只负责把液体从一个位置输送到另一个位置的普通液泵不同，精密柱塞泵更关注单次分液体积、准确性、重复性以及长期自动运行能力。因此，它常用于体外诊断、生命科学仪器、实验室自动化、分析仪器和其他自动液体处理设备。
        </p>
        <p>
          本文介绍精密柱塞泵的工作原理、主要特点、典型应用和基础选型方法，并说明 FOREACH EA、SM 和 TM 三个柱塞泵系列的定位与参数边界。
        </p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>一、精密柱塞泵如何工作？</h2>
        <p>
          一套典型的电机驱动柱塞泵通常包括电机、传动机构、柱塞、泵腔和液路接口。传动机构将电机的旋转运动转换为柱塞的直线运动。
        </p>
        <ol className={newsStyles.technicalRuleList}>
          <li>
            <strong>吸液阶段：</strong>柱塞向后运动，泵腔容积增大，液体被吸入液路。
          </li>
          <li>
            <strong>排液阶段：</strong>柱塞向前运动，泵腔容积减小，液体被推向出口。
          </li>
        </ol>
        <p>
          电磁阀、止回阀或旋转阀负责控制液体流向，控制程序负责协调柱塞运动和阀门切换。通过控制电机步数，可以控制柱塞的运动行程，从而实现不同体积的吸取与分配。
        </p>
        <div className={newsStyles.technicalNotice}>
          <strong>工程边界：</strong>
          理论排量并不等于最终到达目标位置的实际液量。机械背隙、阀门响应、气泡、管路弹性、液体黏度、系统压力和出液口结构都可能影响结果。
        </div>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>二、Piston Pump 和 Plunger Pump 有什么区别？</h2>
        <p>
          在精密液体处理领域，Piston Pump 和 Plunger Pump 经常被用于描述相近的产品。不同厂商还可能使用 Micro Piston Pump、Precision Plunger Pump、Variable Volume Pump 或 Precision Dispense Pump 等名称。
        </p>
        <p>
          本文所说的精密柱塞泵，是指用于自动化设备中精密吸液、定量和分液的紧凑型 OEM 泵，不包括液压设备中的轴向柱塞泵、工业高压清洗泵或液相色谱高压主泵。
        </p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>三、精密柱塞泵有哪些主要优势？</h2>
        <ul>
          <li>
            <strong>容积式定量：</strong>柱塞运动行程对应一定的理论排量，适合试剂加注、样本转移、分液和稀释等任务。
          </li>
          <li>
            <strong>自动化重复运行：</strong>电机和控制程序可重复执行设定的吸液、排液动作，便于集成到自动检测流程。
          </li>
          <li>
            <strong>容量可按任务选择：</strong>不同柱塞直径和行程可以形成微升至毫升级容量，应让常用工作体积充分利用柱塞行程。
          </li>
          <li>
            <strong>便于液路集成：</strong>可与阀、管路、接头、传感器和控制器组合，构成完整的液体处理单元。
          </li>
          <li>
            <strong>接液材料可评估：</strong>可根据介质特性匹配泵头、柱塞、密封、阀件、接头和管路材料。
          </li>
        </ul>
        <p>
          这些优势不代表一套配置能够适用于所有液体。最终性能取决于介质和完整液路系统，需要在真实工况下验证。
        </p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>四、哪些因素会影响柱塞泵的分液表现？</h2>
        <ArticleTable
          headers={["性能概念", "含义", "选型时需要注意"]}
          rows={[
            [
              "分辨率",
              "电机单步对应的理论位移或体积增量",
              "步数多不等于液路中的实际分液一定准确",
            ],
            [
              "准确性",
              "实际分配体积与目标体积的接近程度",
              "需要在实际工作液量和完整液路中测量",
            ],
            [
              "重复性",
              "多次执行相同操作时结果的一致程度",
              "不能代替准确性，也不能直接外推到任意小行程",
            ],
          ]}
        />
        <p>除泵本体外，以下因素也会改变最终分液结果：</p>
        <ul>
          <li>单次分液使用的行程比例以及换向时的机械背隙；</li>
          <li>阀门响应速度、切换时序和入口、出口管路阻力；</li>
          <li>管路中的气泡、溶解气体以及管路长度、内径和弹性；</li>
          <li>液体黏度、工作温度、电机速度、加减速和运行频率。</li>
        </ul>
        <p>
          因此，选型不能只看标称容量或理论分辨率。关键小体积分液应在实际行程、实际液体和完整液路中验证。
        </p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>五、精密柱塞泵的典型应用</h2>
        <h3 className={styles.sectionSubtitle}>1. 体外诊断和临床分析设备</h3>
        <p>
          柱塞泵可用于样本吸取、试剂加注、分液、稀释、校准液处理和触发液添加。泵需要与阀、采样针、管路和清洗程序共同设计。
        </p>
        <h3 className={styles.sectionSubtitle}>2. 生命科学仪器</h3>
        <p>
          可用于样本与试剂转移、反应体系配置、缓冲液添加和其他自动液体处理步骤。容量、接液材料和清洗方式应与具体流程匹配。
        </p>
        <h3 className={styles.sectionSubtitle}>3. 实验室自动化</h3>
        <p>
          在自动化工作站中，柱塞泵可作为液体执行部件，与运动机构、阀、传感器和控制系统配合完成程序化定量转移。
        </p>
        <h3 className={styles.sectionSubtitle}>4. 分析仪器和环境监测设备</h3>
        <p>
          常见任务包括标准液加注、试剂添加、校准、滴定、取样和定量输送。如果任务主要是连续大流量输送、快速清洗、废液抽吸或高压色谱输液，应评估其他泵型。
        </p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>六、FOREACH EA、SM、TM 柱塞泵系列介绍</h2>
        <p>
          FOREACH 目前提供 EA、SM 和 TM 三个柱塞泵平台，用于不同体积范围和安装空间的液体处理任务。
        </p>
        <ArticleTable
          headers={["系列", "当前确认范围", "主要定位", "参数与选型边界"]}
          rows={[
            [
              "EA 精密柱塞泵",
              "50 μL–20 mL",
              "微量至毫升级定量与分配",
              "规定条件下满行程准确性、重复性均≤0.5%；支持1/4-28 UNF或M6接口；材料与控制按项目确认",
            ],
            [
              "SM 微型柱塞泵",
              "当前展示50 μL、100 μL、250 μL、500 μL和1 mL",
              "紧凑设备中的微量加样与分配",
              "基础配置满行程2000步；规定条件下满行程重复性≤0.5%；准确性需按实际工作液量确认；支持1/4-28 UNF或M6接口",
            ],
            [
              "TM 超微型柱塞泵",
              "当前展示50 μL、100 μL、250 μL和500 μL",
              "空间受限的OEM分析模块",
              "展示配置采用6-40 UNF接口和2540步满行程；准确性、重复性、压力与寿命按所选配置和实际工况验证",
            ],
          ]}
        />
        <p>
          EA 与 SM 的预期 500 万次寿命均对应纯水、室温和 50 kPa 背压等规定条件。实际寿命会受到介质、压力、速度、行程、温度、清洗程序和运行频率影响，不能脱离条件作为无条件承诺。
        </p>
        <div className={styles.linkList}>
          <p>
            查看
            <Link href="/products/pumps/piston-pump/">FOREACH 柱塞泵产品与容量配置</Link>
            ，并以最新规格书和项目液路要求完成正式选型。
          </p>
        </div>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>七、如何初步选择精密柱塞泵？</h2>
        <ol className={newsStyles.technicalRuleList}>
          <li>
            <strong>明确实际分液体积：</strong>分别列出最小、常用和最大分液体积，并确定哪个体积对准确性最关键。
          </li>
          <li>
            <strong>区分性能要求：</strong>说明允许误差，并确认要求指准确性、重复性、变异系数还是其他计算方法。
          </li>
          <li>
            <strong>提供真实液体信息：</strong>包括介质、配方、浓度、黏度、温度、颗粒、结晶风险、清洗液和停机保存方式。
          </li>
          <li>
            <strong>评估压力与速度：</strong>把管路、过滤器、阀门、喷嘴、黏度和吸液速度造成的阻力计入完整液路。
          </li>
          <li>
            <strong>确认接口与安装：</strong>核对阀门类型、管路尺寸、接头螺纹、安装方向、维护空间以及预充和排气程序。
          </li>
          <li>
            <strong>明确控制需求：</strong>包括复位、加减速、运行速度、换向、阀门时序、位置反馈、异常报警和断电恢复逻辑。
          </li>
        </ol>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>八、柱塞泵与其他液泵有什么区别？</h2>
        <ArticleTable
          headers={["泵类型", "常见任务", "需要注意的因素"]}
          rows={[
            [
              "精密柱塞泵",
              "程序化吸液和容积式分液",
              "有限行程、补液周期、阀路、气泡、背隙和接液材料",
            ],
            [
              "注射泵",
              "配合不同注射器和阀完成吸液、分液与多通道切换",
              "注射器容量、维护、安装空间和最小工作体积",
            ],
            [
              "隔膜泵",
              "液体输送、清洗、循环、预充和废液处理",
              "实际流量受系统阻力影响，与柱塞式定容分液承担的任务不同",
            ],
            [
              "蠕动泵",
              "液体只接触可更换管路的输送任务",
              "管路疲劳、流量校准变化、脉动和管材兼容性",
            ],
          ]}
        />
        <p>
          没有一种泵适合所有液路任务。同一台设备可以用柱塞泵完成精密分液，再用隔膜泵或其他泵完成清洗、循环和废液处理。
        </p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>常见问题</h2>
        <div className={styles.faqList}>
          {precisionPistonPumpArticleFaqZh.map((item) => (
            <article className={styles.faqItem} key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>结论：先从工作液量和完整液路开始选型</h2>
        <p>
          精密柱塞泵选型不应只比较标称容量和电机步数。更可靠的方法是先定义工作液量、准确性和重复性目标，再把介质、压力、阀门、管路、安装空间、控制和运行节拍放进同一套验证条件中。
        </p>
        <p>
          FOREACH EA、SM 和 TM 分别覆盖宽量程、紧凑型和超紧凑型液体处理需求。最终系列、容量、材料、接口和控制配置，应以最新规格书、对应型号图纸和真实工况验证为准。
        </p>
      </section>
    </div>
  );
}
