import Link from "next/link";

import newsStyles from "../../news/NewsArticleClient.module.css";
import styles from "./DiaphragmPumpEngineeringArticle.module.css";

export const pistonPumpAccuracyArticleSlug =
  "piston-pump-accuracy-repeatability-resolution" as const;

export const pistonPumpAccuracyArticleFaqZh = [
  {
    question: "柱塞泵的理论每步液量就是最小分液量吗？",
    answer:
      "不是。理论每步液量由标称容量和满量程步数计算得到，只表示理论位移增量。最小可靠分液量需要在实际介质、阀路、管路、背压和控制条件下测试。",
  },
  {
    question: "柱塞泵步数越多越好吗？",
    answer:
      "步数更多可以提高理论控制颗粒度，但不能单独保证准确性和重复性。还需要考虑机械背隙、阀门响应、气泡、液体性质以及控制程序。",
  },
  {
    question: "重复性很好，为什么实际液量仍然不准？",
    answer:
      "重复性反映多次结果的一致程度。如果系统存在固定偏差，多次结果可能都很接近，但整体偏离目标值。此时需要检查校准、有效行程、阀路、管路和测量方法。",
  },
  {
    question: "能否用满量程准确性判断10%或2%行程的表现？",
    answer:
      "不能直接判断。短行程下，背隙、阀门响应和气泡等因素占目标液量的比例可能更大，应查看相应工作点数据或进行实际验证。",
  },
  {
    question: "如何改善柱塞泵的小体积分液表现？",
    answer:
      "可以从合理选择泵容量、充分预充排气、缩短并优化管路、控制吸排液速度、调整阀门时序、保持温度稳定以及针对目标液体校准等方面入手。最终效果需要通过完整液路测试确认。",
  },
] as const;

export const pistonPumpAccuracyArticleCtaZh = {
  title: "需要验证柱塞泵的准确性和重复性？",
  description:
    "请提供目标液量、允许偏差、重复性要求、介质、温度、背压、阀路、管路、运行节拍和安装空间，以便按真实工况评估EA、SM或TM系列及相应配置。",
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

export default function PistonPumpAccuracyArticle() {
  return (
    <div className={newsStyles.technicalArticleBody}>
      <section className={newsStyles.contentBlock}>
        <p>
          在精密液体处理设备中，柱塞泵的参数表经常同时出现容量、满量程步数、准确性和重复性。由于这些指标都与“分得准不准”有关，选型时很容易把它们混为一谈。
        </p>
        <p>
          最常见的误区是：电机步数越多，柱塞泵的分液准确性就一定越高；或者把“理论每步液量”直接当成“最小可靠分液量”。实际上，分辨率只说明驱动系统可以把柱塞行程划分得多细，最终液量还会受到机械传动、阀门、管路、气泡、介质性质、控制程序和测试方法影响。
        </p>
        <p>
          因此，评估柱塞泵时，需要分别理解分辨率、准确性和重复性，并在真实工作液量和完整液路条件下验证。
        </p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>一、柱塞泵分辨率是什么？</h2>
        <p>
          柱塞泵分辨率通常表示驱动系统能够控制的最小理论位移增量。对于步进电机驱动的柱塞泵，可以根据标称容量和满量程步数估算理论每步液量。
        </p>
        <div className={newsStyles.technicalNotice}>
          <strong>理论每步液量 = 标称容量 ÷ 满量程步数</strong>
        </div>
        <p>
          以FOREACH EA-500-PMMA展示配置为例，其标称容量为500 μL，满量程为2000步。按理论计算，每步对应约0.25 μL。
        </p>
        <p>
          但0.25 μL只是柱塞位移换算得到的理论体积增量，并不代表该泵能够在任意液体、任意液路中稳定、准确地分配0.25 μL。电机完成一步运动，不等于相同体积的液体一定从出液端完整排出。
        </p>
        <p>
          分辨率主要回答的是：驱动系统可以把一次满行程划分成多少个控制增量。它不能单独回答实际分液偏差有多大，也不能代替最小可靠分液量的测试。
        </p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>二、柱塞泵准确性是什么？</h2>
        <p>
          准确性表示实际分配结果与目标体积的接近程度。例如，设定分配100 μL液体，如果多次测量后的平均结果接近100 μL，说明该测试条件下的准确性较好。
        </p>
        <p>准确性通常需要结合以下信息理解：</p>
        <ul>
          <li>测试的是满行程还是部分行程；</li>
          <li>目标分液体积是多少；</li>
          <li>使用什么液体以及液体温度；</li>
          <li>是否包含阀、管路、接头和出液端；</li>
          <li>采用称重法、比色法还是其他测试方法；</li>
          <li>指标是平均值偏差、单次最大偏差还是其他定义。</li>
        </ul>
        <p>
          不同厂商或项目可能采用不同计算方法，因此比较参数前，应先核对指标定义和测试条件，不能只比较百分比数字。
        </p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>三、柱塞泵重复性是什么？</h2>
        <p>
          重复性表示柱塞泵在相同条件下多次执行同一动作时，结果彼此接近的程度。常见表达方式包括极差、标准差、相对标准差或变异系数（CV）。
        </p>
        <p>
          重复性好，并不一定代表结果准确。例如，目标体积是100 μL，连续多次都分配到96 μL，各次结果很接近，说明重复性可能较好；但平均结果与目标值仍存在偏差，因此准确性不足。
        </p>
        <p>
          反过来，多次结果的平均值虽然接近100 μL，如果各次结果波动很大，也不能说明重复性良好。
        </p>
        <ArticleTable
          headers={["表现", "准确性", "重复性", "工程含义"]}
          rows={[
            ["平均值接近目标，各次结果也集中", "较好", "较好", "具备较稳定的定量表现"],
            ["平均值偏离目标，但各次结果集中", "较差", "较好", "可能需要校准或修正系统偏差"],
            ["平均值接近目标，但各次结果分散", "表面较好", "较差", "偶然误差较大，运行一致性不足"],
            ["平均值偏离目标，各次结果也分散", "较差", "较差", "应排查泵、阀、管路、介质和控制条件"],
          ]}
        />
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>四、为什么柱塞泵步数多，不等于分液一定更准确？</h2>
        <p>
          步数决定理论控制颗粒度，但液体从泵腔到目标位置需要经过一套完整系统。下面这些因素都会使理论位移与实际分液结果产生差异。
        </p>
        <h3 className={styles.sectionSubtitle}>1. 机械背隙与传动误差</h3>
        <p>
          丝杆、螺母、联轴器和运动部件之间可能存在间隙。柱塞改变运动方向时，部分电机位移可能先用于消除间隙，而不是立即转化为有效排液。行程越短，背隙等固定影响所占比例通常越值得关注。
        </p>
        <h3 className={styles.sectionSubtitle}>2. 阀门响应与切换时序</h3>
        <p>
          柱塞泵往往需要配合电磁阀、旋转阀或止回阀控制液体方向。如果柱塞动作与阀门开闭不同步，可能出现回流、吸空、压力未稳定或部分液体滞留。阀的内部容积和流阻也会影响瞬态响应。
        </p>
        <h3 className={styles.sectionSubtitle}>3. 气泡与管路弹性</h3>
        <p>
          液体基本不可压缩，但气体可以被压缩。管路中的气泡会吸收部分柱塞位移，并在压力变化后释放，造成分液不足、响应延迟或连续几次分液相互影响。软管膨胀、接头松动和密封不良也可能产生类似问题。
        </p>
        <h3 className={styles.sectionSubtitle}>4. 液体性质与环境条件</h3>
        <p>
          黏度、表面张力、挥发性、溶解气体、颗粒和结晶都会影响吸液、排液和液滴脱离。温度变化还可能改变液体密度与黏度，因此用水得到的测试结果不能直接代表所有试剂。
        </p>
        <h3 className={styles.sectionSubtitle}>5. 运动参数和出液方式</h3>
        <p>
          吸液速度、排液速度、加减速、等待时间、预充程序、针头位置以及接触式或非接触式分液，都会影响最终结果。仅增加微步细分，而不优化这些条件，不一定能改善实际分液性能。
        </p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>五、为什么满量程指标不能直接代表小体积分液？</h2>
        <p>
          固定机械误差、阀门响应和气泡压缩等因素，在大行程中所占比例可能较小；当工作行程缩短后，这些因素占目标液量的比例可能增大。因此，同一台柱塞泵在满行程和小比例行程下，准确性与重复性可能不同。
        </p>
        <p>以FOREACH EA-500-PMMA展示配置为例：</p>
        <ArticleTable
          headers={["测试位置", "对应体积", "准确性", "重复性"]}
          rows={[
            ["100%量程", "500 μL", "≤0.5%", "≤0.5%"],
            ["2%量程", "10 μL", "≤2.0%", "≤1.5%"],
          ]}
        />
        <div className={newsStyles.technicalNotice}>
          <strong>参数边界：</strong>
          以上为规定测试条件下的产品参数。不能把满量程的≤0.5%直接外推到10 μL，更不能仅根据0.25 μL的理论每步液量推定最小可靠分液体积。
        </div>
        <p>
          实际项目还应根据介质、阀路、背压、安装方式和控制程序进行整机验证。
        </p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>六、如何验证柱塞泵的准确性和重复性？</h2>
        <ol className={newsStyles.technicalRuleList}>
          <li>
            <strong>定义真正关键的工作体积：</strong>
            分别列出最小、常用和最大单次分液体积，并说明哪一个体积对检测结果、配比或生产良率最关键。
          </li>
          <li>
            <strong>明确验收指标：</strong>
            确定项目要求的是平均体积偏差、单次最大偏差、标准差、CV，还是其他行业或企业标准。准确性和重复性应分别设定。
          </li>
          <li>
            <strong>按实际液路搭建测试：</strong>
            测试应尽可能包含正式使用的泵、阀、管路、接头、过滤器、针头或喷嘴。仅测试裸泵，无法完整代表设备中的最终分液结果。
          </li>
          <li>
            <strong>使用真实介质或代表性介质：</strong>
            如不能直接使用正式试剂，应选择在黏度、表面张力、挥发性和颗粒特征上具有代表性的替代液体，并记录温度、背压、速度和预充条件。
          </li>
          <li>
            <strong>选择合适的测量方法：</strong>
            称重法可通过液体质量和密度换算体积，但需要控制天平分辨率、蒸发和环境扰动。对于非常小的体积，可结合适用的比色或其他验证方法。
          </li>
          <li>
            <strong>分别报告各工作点：</strong>
            最小、常用和最大工作体积应分别报告平均值、偏差和离散程度，不要只给出一个满量程结果。
          </li>
        </ol>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>七、FOREACH EA、SM和TM系列应如何看这些指标？</h2>
        <ArticleTable
          headers={["系列", "当前性能信息", "选型时的重点"]}
          rows={[
            [
              "EA精密柱塞泵",
              "基础配置满量程2000步；规定条件下提供满量程及2%量程性能数据",
              "适合从微量到毫升级的定量与分配，应根据关键工作体积选择容量",
            ],
            [
              "SM微型柱塞泵",
              "基础配置满量程2000步；规定满量程条件下重复性≤0.5%，准确性按所选配置与实际工作液量确认",
              "重点平衡安装空间、实际液量、液路组件和整机验证要求",
            ],
            [
              "TM超微型柱塞泵",
              "展示配置满量程2540步，准确性和重复性按所选配置与实际工作液量确认",
              "重点解决紧凑集成，不能从步数直接推定分液性能",
            ],
          ]}
        />
        <p>
          不同系列的步数不能脱离容量、柱塞直径、传动结构和测试条件直接横向比较。选择容量时，也不建议简单采用能够覆盖需求的最大型号。让常用工作体积占用更合理的柱塞行程，通常更有利于后续校准和系统验证。
        </p>
        <div className={styles.linkList}>
          <p>
            需要先了解基础概念，可阅读
            <Link href="/resources/technical-articles/micro-plunger-pump-selection/">
              《精密柱塞泵是什么？工作原理、优势与应用介绍》
            </Link>
            。
          </p>
          <p>
            查看
            <Link href="/products/pumps/piston-pump/">
              FOREACH柱塞泵产品与容量配置
            </Link>
            ，再结合实际工作液量、介质和液路要求确定系列及配置。
          </p>
        </div>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>常见问题</h2>
        <div className={styles.faqList}>
          {pistonPumpAccuracyArticleFaqZh.map((item) => (
            <article className={styles.faqItem} key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>结论：先定义工作液量，再比较柱塞泵性能</h2>
        <p>
          柱塞泵分辨率、准确性和重复性描述的是不同问题。分辨率表示理论控制增量，准确性表示结果与目标值的接近程度，重复性表示多次结果的一致程度，三者不能互相替代。
        </p>
        <p>
          在柱塞泵选型中，应先确定最小、常用和最大工作液量，再核对对应行程下的准确性与重复性。电机步数可以帮助理解控制结构，但不能直接作为最小可靠分液量或整机性能的结论。
        </p>
        <p>
          如需评估FOREACH柱塞泵，请提供目标液量、允许偏差、重复性要求、液体类型、温度、背压、阀路、管路、运行节拍和安装空间，以便按照真实工况匹配EA、SM或TM系列及相应配置。
        </p>
      </section>
    </div>
  );
}
