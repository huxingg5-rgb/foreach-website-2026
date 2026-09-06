import Link from "next/link";

import newsStyles from "../../news/NewsArticleClient.module.css";
import styles from "./DiaphragmPumpEngineeringArticle.module.css";

export const pistonPumpHeadMaterialArticleSlug =
  "piston-pump-head-material-selection" as const;

export const pistonPumpHeadMaterialArticleFaqZh = [
  {
    question: "FOREACH柱塞泵只有PMMA、PCTG和PEEK泵头吗？",
    answer:
      "不是。FOREACH柱塞泵泵头材料可按项目评估PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM和PSU，其他工程材料也可根据介质、结构、加工和项目需求评估。",
  },
  {
    question: "这些泵头材料在所有柱塞泵容量上都有标准型号吗？",
    answer:
      "不一定。网站展示型号用于初步选型和技术沟通，不代表每一种材料与每一种容量都已有标准现货组合。最终配置需要结合容量、介质、接口、阀路、安装空间和项目数量确认。",
  },
  {
    question: "哪种柱塞泵泵头材料的耐腐蚀性最好？",
    answer:
      "没有脱离工况的统一答案。材料兼容性与介质成分、浓度、温度、接触时间、压力、清洗方式和材料牌号有关，还要同时核对柱塞、密封、阀、管路和接头等完整接液路径。",
  },
  {
    question: "使用PEEK泵头后还需要做介质兼容性测试吗？",
    answer:
      "需要。PEEK常用于对耐温、机械强度和化学兼容性要求较高的液路，但具体介质和使用条件仍需核对，并通过样件浸泡、尺寸检查、密封测试和整机运行验证确认。",
  },
  {
    question: "PTFE化学耐受范围较广，为什么不能全部使用PTFE泵头？",
    answer:
      "泵头选材还涉及刚性、尺寸稳定性、螺纹与密封结构、加工方式、压力负载和成本。PTFE是否适合，需要结合泵头结构和真实工况评估，不能仅凭材料名称决定。",
  },
  {
    question: "更换泵头材料会改变柱塞泵的分液性能吗？",
    answer:
      "泵头材料本身不是准确性或重复性的唯一决定因素，但材料的刚性、尺寸稳定性、表面状态及其与密封和阀路的配合会影响整机表现。更换材料或结构后，应在目标工作液量和实际液路中重新验证。",
  },
] as const;

export const pistonPumpHeadMaterialArticleCtaZh = {
  title: "需要确认柱塞泵泵头与接液材料配置？",
  description:
    "请提供介质名称与成分、浓度、温度、目标液量、压力或背压、清洗方式、接口、阀路、运行节拍和安装空间，以便结合完整接液路径评估泵头、柱塞及液路配置。",
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

export default function PistonPumpHeadMaterialArticle() {
  return (
    <div className={newsStyles.technicalArticleBody}>
      <section className={newsStyles.contentBlock}>
        <p>
          柱塞泵泵头直接参与液体的吸入、计量和排出。材料选得是否合适，会影响介质兼容性、结构稳定性、密封可靠性、清洗方式、使用寿命和项目成本。选型时不能只问“哪种材料更耐腐蚀”，而应把介质、温度、压力、接触时间和完整接液路径放在一起判断。
        </p>
        <p>
          FOREACH柱塞泵泵头可按项目评估PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM和PSU；其他工程材料也可根据项目需求评估。上述范围是配置方向，不代表每一种材料与每一种容量都已有标准型号。最终材料组合需要结合液体特性、泵头结构、加工可行性、安装空间和项目数量确认。
        </p>
        <div className={newsStyles.technicalNotice}>
          <strong>选型原则：</strong>
          先定义真实介质和工况，再确定泵头、柱塞、密封、阀、管路与接头的完整接液材料，不要只看单个泵头材料名称。
        </div>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>一、为什么柱塞泵需要不同的泵头材料？</h2>
        <p>
          同一种柱塞泵可能用于缓冲液、清洗液、标准液、生化试剂或含有机组分的配方。不同液体对塑料的溶胀、应力开裂、渗透、析出和表面吸附影响不同；温度、压力和长期接触又会改变材料表现。
        </p>
        <p>
          泵头同时还是承受螺纹连接、密封预紧和往复压力变化的结构件。因此，材料选择既是化学兼容问题，也是结构、加工、装配和成本问题。某种材料在化学表中表现良好，并不等于它在具体泵头结构中一定适用。
        </p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>二、柱塞泵常用泵头材料对比</h2>
        <ArticleTable
          headers={["材料", "常见选型方向", "选型时重点核对"]}
          rows={[
            [
              "PMMA",
              "介质和工况较常规、没有特殊材料要求，且重视项目成本",
              "有机溶剂、应力开裂、温度和长期接触条件",
            ],
            [
              "PCTG",
              "常规液路、需要一定韧性和加工适配性的项目",
              "具体配方、温度、清洗剂及长期尺寸稳定性",
            ],
            [
              "PPS",
              "对耐温、尺寸稳定性和机械性能有进一步要求",
              "介质兼容性、加工结构、密封面与项目成本",
            ],
            [
              "PVDF",
              "部分酸碱、盐溶液及对化学兼容性要求较高的液路",
              "具体化学品浓度、温度、压力和密封组合",
            ],
            [
              "PP",
              "部分水性、酸碱或通用化学液路，并关注成本",
              "刚性、温度、螺纹与密封结构以及长期负载",
            ],
            [
              "PTFE",
              "化学耐受范围要求较广的接液场景",
              "材料刚性、蠕变、尺寸稳定性和泵头结构可实现性",
            ],
            [
              "PEEK",
              "对耐温、机械强度、尺寸稳定性和化学兼容性要求较高",
              "具体介质、加工结构、完整接液路径和项目成本",
            ],
            [
              "POM",
              "重视机械性能、尺寸稳定性和加工效率的结构方案",
              "酸碱、氧化性介质、温度与长期化学接触条件",
            ],
            [
              "PSU",
              "对刚性、耐温和尺寸稳定性有要求的仪器液路",
              "具体化学品、应力环境、清洗方式和材料牌号",
            ],
          ]}
        />
        <p>
          表格描述的是常见评估方向，不是材料兼容性承诺。即使材料名称相同，不同牌号、加工残余应力和装配结构也可能带来不同结果，应以真实工况验证为准。
        </p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>三、不同泵头材料的选择要点</h2>
        <h3 className={styles.sectionSubtitle}>
          1. PMMA泵头：常规液路与成本平衡的优先选择
        </h3>
        <p>
          PMMA即聚甲基丙烯酸甲酯，是柱塞泵中常用的泵头材料之一。对于介质成分相对常规、工作温度和系统压力适中，并且没有特殊耐腐蚀或耐高温要求的项目，PMMA通常是兼顾液路需求与项目成本的优先选择。
        </p>
        <p>
          PMMA泵头可用于常规水性试剂、缓冲液、稀释液及部分低浓度酸碱溶液的输送，但不能仅凭“水性”或“低浓度”判断兼容。含有机溶剂、酮类、酯类或其他可能引起溶胀和应力开裂的配方时，应先核对具体成分并做样件测试。
        </p>
        <p>
          选择PMMA并不代表降低柱塞泵的计量性能。准确性和重复性取决于柱塞泵结构、容量与行程匹配、传动、阀路、气泡、介质和控制条件。材料确定后，仍需在目标液量和完整液路中验证。
        </p>
        <h3 className={styles.sectionSubtitle}>2. PCTG泵头</h3>
        <p>
          PCTG常用于兼顾韧性、加工和常规液路需求的项目。选型时应核对真实配方、温度、清洗剂和长期接触后的尺寸变化，不能只依据材料类别作结论。
        </p>
        <h3 className={styles.sectionSubtitle}>3. PP泵头</h3>
        <p>
          PP可作为部分水性、酸碱或通用化学液路的候选材料，并可兼顾项目成本。泵头应用还需评估材料刚性、温度、螺纹承载、密封预紧和长期压力循环。
        </p>
        <h3 className={styles.sectionSubtitle}>4. POM泵头</h3>
        <p>
          POM常被用于重视机械性能、尺寸稳定性和加工效率的结构方案。涉及酸碱、氧化性介质或长期化学接触时，应结合材料牌号与工况进行针对性验证。
        </p>
        <h3 className={styles.sectionSubtitle}>5. PPS泵头</h3>
        <p>
          PPS可用于对耐温、刚性或尺寸稳定性有进一步要求的仪器液路。选型时应根据介质、清洗方式、结构负载、密封面和材料牌号进行评估。
        </p>
        <h3 className={styles.sectionSubtitle}>6. PVDF泵头</h3>
        <p>
          PVDF可作为部分酸碱、盐溶液及化学兼容要求较高液路的候选材料。最终能否使用仍取决于具体化学品、浓度、温度、压力、接触时间以及密封和阀路材料。
        </p>
        <h3 className={styles.sectionSubtitle}>7. PTFE泵头</h3>
        <p>
          PTFE通常具有较广的化学耐受范围，但泵头不仅需要耐受介质，还要满足刚性、尺寸稳定性、螺纹、密封和加工结构要求。是否采用PTFE，需要在化学兼容性和结构可实现性之间综合判断。
        </p>
        <h3 className={styles.sectionSubtitle}>8. PEEK泵头</h3>
        <p>
          PEEK适合纳入对耐温、机械强度、尺寸稳定性和化学兼容性要求较高的项目评估。它并不是对所有介质都无需验证的“通用答案”，选型时仍要核对真实配方、运行温度、压力、清洗方式和完整接液路径，同时考虑加工与项目成本。
        </p>
        <h3 className={styles.sectionSubtitle}>9. PSU泵头</h3>
        <p>
          PSU可用于对刚性、耐温和尺寸稳定性有要求的仪器液路。具体应用需要核对化学品、应力环境、清洗方式、材料牌号以及长期接触后的性能变化。
        </p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>四、EA-500-PMMA与EA-500-PEEK：同容量材料配置示例</h2>
        <p>
          FOREACH EA-500-PMMA与EA-500-PEEK可作为同一500 μL容量下不同泵头材料方向的对照。两款页面展示配置都支持1/4-28 UNF或M6接口，满量程为2000步；在规定测试条件下，100%量程的准确性和重复性均为≤0.5%。
        </p>
        <ArticleTable
          headers={["项目", "EA-500-PMMA", "EA-500-PEEK"]}
          rows={[
            ["标称容量", "500 μL", "500 μL"],
            ["展示泵头材料", "PMMA", "PEEK"],
            ["展示柱塞信息", "陶瓷柱塞", "按所选配置确认"],
            ["液路接口", "1/4-28 UNF或M6", "1/4-28 UNF或M6"],
            ["满量程步数", "2000步", "2000步"],
            ["100%量程性能", "准确性、重复性均≤0.5%", "准确性、重复性均≤0.5%"],
            ["主要选型方向", "常规介质、无特殊材料要求并关注成本", "材料要求较高，需结合介质与工况评估"],
          ]}
        />
        <div className={newsStyles.technicalNotice}>
          <strong>参数边界：</strong>
          上述性能数据对应规定测试条件。泵头材料不同，不等于计量性能一定不同；实际项目仍需在目标液量、真实介质、阀路、管路和控制条件下验证。网站展示型号也不代表全部材料与容量组合均为标准现货。
        </div>
        <div className={styles.linkList}>
          <p>
            查看
            <Link href="/products/pumps/piston-pump/ea-500-pmma/">
              EA-500-PMMA柱塞泵
            </Link>
            与
            <Link href="/products/pumps/piston-pump/ea-500-peek/">
              EA-500-PEEK柱塞泵
            </Link>
            的当前展示配置。
          </p>
        </div>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>五、泵头材料不能脱离柱塞和完整接液路径</h2>
        <p>
          柱塞泵的接液系统不只有泵头。FOREACH柱塞材料可按项目评估氧化锆陶瓷、氧化铝陶瓷、PEEK和蓝宝石，并可匹配接口、电机、光耦反馈、阀组件和控制器。具体组合需要结合液体性质、寿命要求、结构空间和控制需求确认。
        </p>
        <p>进行材料选型时，至少应同时检查以下部件：</p>
        <ul>
          <li>泵头与内部流道；</li>
          <li>柱塞及与其配合的密封结构；</li>
          <li>阀体、阀芯、阀片或止回结构；</li>
          <li>管路、接头、过滤器、针头或喷嘴；</li>
          <li>胶黏剂、润滑剂或其他可能接触介质的辅助材料。</li>
        </ul>
        <p>
          如果只更换泵头而忽略其他接液件，系统仍可能出现溶胀、吸附、析出、泄漏、堵塞或寿命不足等问题。
        </p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>六、柱塞泵泵头材料选型需要提供哪些信息？</h2>
        <ol className={newsStyles.technicalRuleList}>
          <li>
            <strong>介质信息：</strong>
            提供液体名称、主要成分、浓度、pH、是否含有机溶剂、颗粒或易结晶组分，必要时提供SDS或配方范围。
          </li>
          <li>
            <strong>温度与接触时间：</strong>
            区分工作、清洗、消毒、停机浸泡和储存温度，并说明介质是间歇接触还是长期驻留。
          </li>
          <li>
            <strong>液量与运行参数：</strong>
            明确单次目标液量、常用行程、运行节拍、吸排液速度、系统压力或背压以及预期寿命。
          </li>
          <li>
            <strong>液路与结构：</strong>
            确认接口标准、阀路形式、管径、密封结构、安装空间和泵头承受的装配载荷。
          </li>
          <li>
            <strong>项目条件：</strong>
            说明样机数量、量产计划、法规或洁净要求以及材料成本边界，避免选择技术上可行但项目上不合适的方案。
          </li>
        </ol>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>七、材料兼容性应该如何验证？</h2>
        <ol className={newsStyles.technicalRuleList}>
          <li>
            <strong>先做资料筛选：</strong>
            根据材料牌号与介质、浓度、温度数据排除明显不适合的候选项。
          </li>
          <li>
            <strong>进行样件浸泡：</strong>
            检查质量、尺寸、外观、硬度、开裂、溶胀、析出或颜色变化，并覆盖实际接触时间。
          </li>
          <li>
            <strong>检查结构与密封：</strong>
            将候选材料加工成代表性零件，验证螺纹、密封面、预紧和压力循环下的稳定性。
          </li>
          <li>
            <strong>完成整机运行测试：</strong>
            使用真实或具有代表性的介质，在目标液量、温度、阀路、管路、背压、清洗和运行节拍下测试准确性、重复性、泄漏与寿命。
          </li>
        </ol>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>FAQ</h2>
        <div className={styles.faqList}>
          {pistonPumpHeadMaterialArticleFaqZh.map((item) => (
            <article className={styles.faqItem} key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>结论：柱塞泵泵头材料没有脱离工况的最优解</h2>
        <p>
          PMMA适合介质与工况较常规、没有特殊材料要求并关注成本的项目；PCTG、PP和POM可覆盖不同的常规工程取向；PPS、PVDF、PTFE、PEEK和PSU则为耐温、机械性能或化学兼容要求更高的液路提供更多评估方向。材料名称只能用于初筛，不能代替真实介质和完整液路验证。
        </p>
        <p>
          确定泵头后，还要同步确认柱塞、密封、阀、管路、接头、接口和控制配置，并在目标工作液量下完成整机测试。这样得到的不是单一材料答案，而是一套与设备工况相匹配的柱塞泵液路方案。
        </p>
        <div className={styles.linkList}>
          <p>
            初次了解柱塞泵，可阅读
            <Link href="/resources/technical-articles/micro-plunger-pump-selection/">
              《精密柱塞泵是什么？工作原理、优势与应用介绍》
            </Link>
            。
          </p>
          <p>
            需要理解参数，可继续阅读
            <Link href="/resources/technical-articles/piston-pump-accuracy-repeatability-resolution/">
              《柱塞泵的准确性、重复性和分辨率有什么区别？》
            </Link>
            。
          </p>
          <p>
            查看
            <Link href="/products/pumps/piston-pump/">
              FOREACH柱塞泵产品与容量配置
            </Link>
            ，再根据真实介质和液路要求确认泵头与接液材料。
          </p>
        </div>
      </section>
    </div>
  );
}
