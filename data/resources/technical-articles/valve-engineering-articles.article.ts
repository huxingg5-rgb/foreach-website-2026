import { rotaryValveArticles } from "./rotary-valve-articles.zh";
import { getRotaryValveArticles } from "./rotary-valve-articles.intl";
import type { DiaphragmPumpEngineeringArticleCopy as ArticleCopy, EngineeringArticleBlock as Block } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";

// Product evidence: MRV3 PS-120C-2507-00003-001 (pp. 3, 9),
// 6010 PS-122A-2507-00001-001 (pp. 3, 8), HP PS-120C-2604-00001-001 (pp. 4, 6).
// Examples below describe proposed instrument workflows, not measured customer systems.
const p = (text: string): Block => ({ type: "paragraph", text });
const heading = (title: string): Block => ({ type: "subheading", title });
const list = (...items: string[]): Block => ({ type: "list", ordered: true, items });
const links = (...items: { href: string; label: string }[]): Block => ({ type: "links", ordered: true, items });
const flow = (alt: string, nodes: [string, string][], caption: string): Block => ({
  type: "figure", src: "", width: 960, height: 150, alt, caption,
  flowNodes: nodes.map(([label, detail]) => ({ label, detail })),
});
const cta: ArticleCopy["cta"] = {
  title: "结合实际液路确认阀的配置",
  description: "提供液体种类、压力范围、接口和动作顺序，便于核对适用配置。",
  contactLabel: "联系 FOREACH", productsLabel: "查看阀系列", productsHref: "/products/valves/",
};

const solenoid: ArticleCopy = {
  metadata: {
    title: "什么是电磁阀？工作原理、两通与三通液路控制",
    seoTitle: "什么是电磁阀？常开常闭、两通三通工作原理 | FOREACH",
    seoDescription: "通过试剂通断与清洗液切换示例，解释电磁阀的工作原理、常开常闭状态和两通三通区别，并说明响应时间、压力、驱动功耗与实际加液量的关系。",
    coverImage: "/images/products/valves/solenoid-valves/foreach-solenoid-valve-main.webp",
    coverAlt: "FOREACH 6010 微型电磁阀产品外观",
  },
  deck: "从通电后液体走哪条路讲起，用试剂加液和清洗切换说明两通、三通电磁阀的作用，以及它们怎样与泵和控制程序配合。",
  leadBlocks: [
    p("电磁阀是利用电磁力改变阀内密封件位置，从而接通、关闭或切换流体路径的部件。控制器改变线圈的通电状态，阀内机构动作，液路状态随之改变。实际让液体流动的压力差通常由泵、加压容器或液位差提供。"),
    p("在自动加液设备中，两通电磁阀可以控制一条支路的通断；三通电磁阀可以让一个公共口在两条支路之间切换。要看懂它们的作用，应同时看电气状态、接口连接和液体流向。"),
  ],
  sections: [
    { title: "通电之后，阀内发生了什么？", blocks: [
      p("线圈通电后产生磁场，驱动衔铁等活动机构，改变密封件与阀座的接触状态。断电后的恢复方式取决于具体结构。不同电磁阀并不都采用同一种直线柱塞机构，例如 6010 采用摆动式机构配合隔膜完成液路控制。"),
      flow("电气指令通过线圈和阀内机构改变液路状态", [["控制器", "输出通断指令"], ["线圈", "产生或撤去磁力"], ["阀内机构", "改变密封位置"], ["液路", "接通、关闭或切换"]], "这是控制动作链；液体是否流动，还取决于压差、液体和外部管路。"),
      p("因此，听到动作声只能说明机构可能发生了动作，不能证明液体已经通过。调试时还要检查接管方向、压力条件、气泡和堵塞，以及出口是否实际出液。"),
    ] },
    { title: "两通常开、两通常闭和三通有什么区别？", blocks: [
      p("“常开”与“常闭”描述的是未通电时的状态，不是设备运行时开得多还是关得多。"),
      { type: "table", headers: ["形式", "断电状态", "通电状态", "液路作用"], rows: [
        ["两通常闭 NC", "两口之间关闭", "两口之间接通", "通电后允许该支路输送"],
        ["两通常开 NO", "两口之间接通", "两口之间关闭", "通电后切断该支路"],
        ["6010 三通", "COM 与 NO 接通", "COM 与 NC 接通", "公共口在两条支路间切换"],
      ] },
      p("常闭阀可用于希望断电后关闭的支路，常开阀可用于希望断电后保留通路的支路。不过，整机的断电安全状态还要考虑其他阀、止回结构、残余压力和液位差，不能只由一个阀的名称决定。"),
      p("三通阀不是把三个接口一直连在一起的三通接头。在上述切换方式中，COM 接通一侧时，另一侧关闭。具体接口编号与允许流向应按对应产品确认。"),
    ] },
    { title: "示例：让同一套泵在试剂与清洗液之间切换", blocks: [
      p("以 6010 三通配置为例，1 口为 NC、2 口为 COM、3 口为 NO。设试剂瓶接 1 口，清洗液瓶接 3 口，2 口连接泵的入口，泵的出口接加液针。这个接管例子让断电状态对应清洗液支路，通电状态对应试剂支路。"),
      heading("第一步：接通试剂，完成加液"),
      p("控制器使阀通电，确认 2—1 通路建立后，再运行泵取液。首次加液前，应先把管路内气体及置换液排到废液位，随后把加液针移到目标容器，执行正式计量。"),
      flow("6010 三通阀通电时，试剂经 1 口与 2 口进入泵，再送至加液针", [["试剂瓶", "连接 1 口 NC"], ["三通阀", "通电：1—2 接通"], ["泵", "由 2 口取液"], ["加液针", "向目标容器加液"]], "该状态下 3 口清洗液支路关闭；液量由计量机构及整条液路的实际表现确定。"),
      heading("第二步：切到清洗液，冲洗共用路径"),
      p("完成加液后先结束泵的计量动作，并使液路处于允许切换的条件；将加液针移到废液位，再使阀断电。2—3 接通后，泵吸入清洗液，冲洗泵及加液针所在的共用路径。清洗结束后，下一次取试剂还要安排试剂置换，防止清洗液稀释第一份试剂。"),
      flow("6010 三通阀断电时，清洗液经 3 口与 2 口进入泵并冲洗至废液", [["清洗液", "连接 3 口 NO"], ["三通阀", "断电：3—2 接通"], ["泵与加液针", "冲洗共用路径"], ["废液容器", "接收清洗液"]], "这里只清洗已接通的路径；未接通的试剂支管需要另行设计清洗或更换方式。"),
    ] },
    { title: "为什么通电 1 秒，不一定得到相同液量？", blocks: [
      p("若阀下游由压差驱动流动，在流量稳定且启闭过渡可忽略时，可用“体积约等于流量乘以开启时间”作估算。但实际流量会随液位、供液压力、出口背压、液体黏度和管路流阻变化，开关瞬间也存在过渡过程。"),
      p("例如，程序每次给阀相同的开启时间，储液瓶液位下降后，出液量仍可能改变。短脉冲加液还会受到驱动响应、软管变形和出口残滴影响。需要稳定微量加液时，应确认适合的计量方式，并用真实液体测量平均液量和重复性。"),
      p("如果系统已使用注射泵或其他计量机构，通常由泵执行目标体积动作，电磁阀负责在正确的时刻建立通路。程序既要防止泵对关闭液路继续动作，也要避免错误支路被接通。"),
    ] },
    { title: "压力、响应时间和功耗，装机时怎样理解？", blocks: [
      p("以下以 6010 的对应配置为例，选型时需核对具体型号。"),
      { type: "table", headers: ["项目", "产品条件", "整机需要检查什么"], rows: [
        ["工作压力", "−75 kPa 至 0.25 MPa", "吸液负压、出口背压和开关瞬间压力是否处于允许范围"],
        ["供电", "DC 12 V 或 24 V，额定电压允许偏差 ±10%", "选择正确额定电压，检查阀端实际电压及接线极性"],
        ["响应时间", "标准配置空载条件下 ≤15 ms", "不能直接当作出口流量稳定时间；需核对温度、介质和压差"],
        ["功耗", "标准配置 2.5 W；带节能电路配置启动 2.5 W、保持 1 W", "启动与保持驱动是否匹配，连续通电时散热是否合适"],
      ] },
      p("响应时间的测试条件注明介质与环境温度 25°C、额定电压，以及空气介质下的最大工作压力和公共口加压等条件。空载动作指标不能替代装入管路后的液体响应；密封材料、温度和驱动方式也需要一并核对。试验耐压同样不等于允许长期运行的工作压力。"),
      p("接液材料要同时适配试剂与清洗液，并考虑浓度、温度和接触时间。选择基座、螺纹或宝塔接口时，还要检查安装密封、管路应力和维修空间。接口形式合适，并不自动代表液体兼容。"),
    ] },
    { title: "相关产品与验证步骤", blocks: [
      list(
        "先画出断电与通电两种状态的液路，核对 COM、NC、NO 与实际接口的对应关系。",
        "用实际驱动电路、液体和压力条件运行，观察开关响应、外漏、内漏及出口残滴。",
        "按整机循环验证首份、连续多份和清洗后首份液量，分别记录平均偏差与重复性。",
        "检查断电、重启、阀卡滞与泵未停止时的处理逻辑，确认液体去向与预期一致。"
      ),
      links(
        { href: "/products/valves/solenoid-valves/", label: "6010 微型电磁阀系列" },
        { href: "/products/valves/solenoid-valves/2-way/", label: "两通电磁阀：支路通断" },
        { href: "/products/valves/solenoid-valves/3-way/", label: "三通电磁阀：公共口切换" },
        { href: "/resources/technical-articles/what-is-a-programmable-syringe-pump/", label: "可编程注射泵怎样配合阀完成计量动作？" }
      ),
    ] },
  ],
  faqTitle: "常见问题",
  faqItems: [
    { question: "电磁阀可以当作泵使用吗？", answer: "电磁阀主要改变液路连接状态，本身不承担持续输送液体的泵送作用。液体仍需要泵、加压容器或液位差等提供压差。" },
    { question: "三通阀能同时混合两种试剂吗？", answer: "本文的 6010 三通切换方式是在 COM 与 NC、NO 两条支路之间选择，不是同时开启两个入口的混合阀。混合任务还需要安排各液体的计量、加入顺序和混合空间。" },
    { question: "阀动作越快，加液就越准确吗？", answer: "动作响应只是影响因素之一。加液准确性还取决于计量方式、流量变化、气泡、管路弹性和残滴。需要在目标液量和实际液路下测量，不能从响应时间单独推导液量误差。" },
  ], cta,
};

const hplc: ArticleCopy = {
  metadata: {
    title: "HPLC 六通进样阀如何工作？装样、进样与排气流程",
    seoTitle: "HPLC 六通进样阀工作原理：装样、进样与排气 | FOREACH",
    seoDescription: "用外接定量环示例解释 HPLC 六通进样阀的 Load 与 Inject 流路、泵和进样机构的配合，以及 HP 二位六通带排气高压旋转阀的端口关系、压力与进样量边界。",
    coverImage: "/images/products/valves/high-pressure-valves/foreach-high-pressure-valve-main.webp",
    coverAlt: "FOREACH HP 二位六通带排气高压旋转阀产品外观",
  },
  deck: "用外接定量环说明样品怎样先装入、再被流动相送入色谱柱，并区分 HP 的主工作位、排气通路与真正决定进样量的环节。",
  leadBlocks: [
    p("HPLC 六通进样阀通过切换阀内成对连接的流道，让样品定量环在装样路径与高压分析路径之间切换。装样时，进样机构把样品送入定量环；进样时，HPLC 泵输送的流动相经过定量环，把样品带入色谱柱。"),
    p("这里的高压阀承担的是流路切换。它需要与泵、定量环、进样机构和控制程序配合，才构成完整进样流程。以下以 FOREACH HP 二位六通带排气高压旋转阀为例，把各部分的连接关系展开说明。"),
  ],
  sections: [
    { title: "六个主接口，怎样连接泵、定量环和色谱柱？", blocks: [
      p("先看一个用于理解原理的外接定量环接管示例。定量环是一段已知容积的管路，两端接在阀上；进样机构负责向它装样，HPLC 泵负责输送流动相。下表是教学示例的端口分配，实际接管需结合整机设计核对。"),
      p("本示例的外部接管与作用"),
      { type: "table", headers: ["HP 端口", "本示例连接部件", "作用"], rows: [
        ["1", "HPLC 泵出口", "输入流动相"], ["6", "色谱柱入口", "接收流动相及进样后的样品"],
        ["2 和 5", "外接定量环两端", "存放待进样的样品"], ["3", "样品装载机构", "向阀送入样品"],
        ["4", "废液路径", "接收装样时排出的液体"], ["7", "独立排气路径", "配合排气状态使用"],
      ] },
      p("六通进样阀的关键是不同阀位下“哪些口成对接通”。它与公共口从多个液源中选一路的旋转选择阀不同：进样阀在一次切换中重组多组连接，把定量环接入或移出分析路径。"),
    ] },
    { title: "Load 装样：样品进入定量环，流动相走旁路", blocks: [
      p("HP 在装样位的连接为 1—6、2—3、4—5。按上述接管方式，HPLC 泵通过 1—6 直接向色谱柱供给流动相，定量环暂不处于这条分析路径中。"),
      flow("装样位下，HPLC 泵经 HP 的 1—6 通路向色谱柱输送流动相", [["HPLC 泵", "流动相进入 1 口"], ["装样位", "1—6 接通"], ["色谱柱", "由 6 口供液"]], "装样时的分析路径：泵 → 1—6 → 色谱柱。"),
      p("另一条路径负责装样。进样机构送入的样品从 3 口经 2 口进入定量环，再从 5 口经 4 口排向废液。这样可以在给定量环装样的同时，保持本示例装样位下的泵至色谱柱通路。"),
      flow("装样位下，样品从 3 口经 2 口填充外接定量环，再从 5 口经 4 口排向废液", [["进样机构", "样品进入 3 口"], ["3—2 通路", "样品进入定量环"], ["定量环", "另一端接 5 口"], ["5—4 通路", "排向废液"]], "装样路径：3 → 2 → 定量环 → 5 → 4。样品尚未被切入色谱柱供液路径。"),
      p("首次装样前需要排除路径内的气体，并安排旧样品及清洗液的置换。全环装样不能仅凭进样机构移动了一个名义环体积，就认定环内已完全被目标样品填满；是否充分填充，应通过方法验证确定。"),
    ] },
    { title: "Inject 进样：流动相经过定量环，把样品送入柱内", blocks: [
      p("HP 在进样位的连接改为 1—2、3—4、5—6。HPLC 泵输出的流动相从 1 口经 2 口进入定量环，再通过 5—6 到达色谱柱。原先留在环内的样品随流动相进入分析路径。"),
      flow("进样位下，流动相由 1—2 进入定量环，再经 5—6 把样品带入色谱柱", [["HPLC 泵", "流动相进入 1 口"], ["1—2 通路", "接入定量环"], ["定量环", "流动相带出样品"], ["5—6 通路", "进入色谱柱"]], "进样路径：泵 → 1 → 2 → 定量环 → 5 → 6 → 色谱柱。"),
      p("此时 3—4 接通，样品装载支路与废液路径相连。控制程序要协调装样机构、阀位与数据采集，并确认切换到位和样品输送时间，不能仅以发送了一条切阀指令作为样品已经全部进入色谱柱的依据。"),
      p("进样保持时间取决于定量环、连接管路、流动相流量及分析方法。过早切回可能影响样品输送；每次阀位动作与采集开始之间的时序也应保持可验证的一致性。"),
    ] },
    { title: "“二位六通带排气”中的排气，具体接通哪里？", blocks: [
      p("HP 的 Load 与 Inject 是两种主要工作流路，此外提供 Vent 排气状态，其明确的排气连接为 3—7。因此，描述该产品时，既要说明二位六通的主流路，也要说明额外排气功能。不能把它理解成任意六通阀都具备第七口排气。"),
      flow("HP 排气状态建立 3—7 通路，对接入 3 口的外部支路进行排气路径管理", [["3 口支路", "本例为装样支路"], ["Vent 状态", "3—7 接通"], ["7 口路径", "外接排气或收集路径"]], "排气状态说明的是 3—7 的连通；实际气体和液体怎样排出，还取决于外部连接与压差。"),
      p("这不意味着整个高压系统已经泄压，也不能据此假定排气时泵至色谱柱的路径仍然连通。整机应按该状态的完整液路关系安排泵、进样机构和压力释放步骤，确认压力与液体去向后再操作；不能在带压状态下靠松开接头排气。"),
    ] },
    { title: "定量环、阀内容积和压力，分别限制什么？", blocks: [
      p("几个容易混淆的量，应分别理解。"),
      { type: "table", headers: ["项目", "含义", "不能直接推出的结论"], rows: [
        ["定量环体积", "全环进样时用于建立名义样品体积", "标称 20 μL 的环，不代表任意装样条件下都能保证同一实际进样量"],
        ["HP 内容积 0.8 μL", "阀内部流道的容积指标", "不是一次进样量，也不包含外接定量环和全部管路"],
        ["HP 通径 0.4 mm", "阀内流道尺寸", "不能单独决定整机流量、峰形或分析结果"],
        ["HP 工作压力上限 25 MPa", "该阀允许使用的压力边界", "不是所有高压或 UHPLC 工况都适用，也不是泄压阀设定值"],
      ] },
      p("全环进样需要稳定、充分地填充定量环；部分环进样则更依赖装样机构的计量、气隙安排与样品在管内的分布。阀本身不会自动识别环是否填满，也不能单独保证方法的进样精度。"),
      p("HP 采用 10-32 UNF 接口。选接头和管路时，需要同时核对螺纹、密封形式、管径、耐压和接液材料。整条液路还应按最低额定压力的部件及实际压力波动确定使用边界，不能只看阀的额定值。"),
    ] },
    { title: "怎样验证装样、进样和清洗的配合？", blocks: [
      list(
        "在允许的压力条件下核对端口与阀位，确认装样、进样、排气分别对应预期路径，再建立自动运行程序。",
        "用稳定的标准样品重复进样，比较峰面积重复性及首针与后续针次的差异；同时排查装样量、气泡、阀位时序和检测器稳定性。",
        "在高浓度样品后运行空白样，检查残留，并分别优化进样机构、阀、定量环和连接管路的清洗。",
        "观察切换时的压力变化和外部泄漏；按照目标流量、液体和背压运行完整循环，再确认允许的进样保持时间。"
      ),
      p("上述步骤用于建立整机和分析方法的验证过程。不能把一次阀动作正常，或单个零件通过检查，直接等同于系统进样重复性已经合格。"),
      links(
        { href: "/products/valves/high-pressure-valves/hp/", label: "HP 二位六通带排气高压旋转阀" },
        { href: "/resources/technical-articles/how-does-a-rotary-selector-valve-work/", label: "多通道旋转选择阀：从多个液源中选择一路" },
        { href: "/products/valves/", label: "比较 FOREACH 阀系列的液路任务与配置" }
      ),
    ] },
  ],
  faqTitle: "常见问题",
  faqItems: [
    { question: "六通进样阀与六通选择阀是同一种用法吗？", answer: "不一定。进样阀通常通过成对通路的重组，把定量环在装样路径和分析路径之间切换；选择阀通常让公共口接通多个候选接口中的一个。选型要看各阀位的连接图，不能只数接口。" },
    { question: "有排气口，就能给整个 HPLC 系统泄压吗？", answer: "不能这样推断。HP 排气状态明确建立的是 3—7 通路；整机哪些部分能够卸压，取决于其他通路及外部连接。它不等同于自动调压或安全泄压阀。" },
    { question: "将定量环换大，其他程序可以保持不变吗？", answer: "需要重新检查装样量、置换与清洗量、进样保持时间以及方法适用性。定量环改变后，原有流程不一定仍能充分填充和输送样品，进样量与重复性应重新验证。" },
  ], cta,
};

type ValveArticle = {
  date?: string;
  slug: string;
  copy: ArticleCopy;
  navigation: { id: string; label: string }[];
  subject: { about: string[]; mentions: string[] };
  productIds: string[];
  relationKeys: string[];
};

export const valveEngineeringArticles: readonly ValveArticle[] = [
  ...rotaryValveArticles,
  {
    slug: "what-is-a-solenoid-valve", copy: solenoid,
    navigation: [
      { id: "solenoid-principle", label: "电磁阀工作原理" }, { id: "solenoid-states", label: "两通、三通与常开常闭" },
      { id: "solenoid-workflow", label: "试剂与清洗切换示例" }, { id: "solenoid-volume", label: "开启时间与液量" },
      { id: "solenoid-conditions", label: "压力、响应与驱动" }, { id: "solenoid-checks", label: "产品与验证步骤" },
    ],
    subject: { about: ["电磁阀工作原理", "常开常闭", "两通与三通电磁阀"], mentions: ["6010", "试剂与清洗液切换"] },
    productIds: ["6010-solenoid-valve"], relationKeys: ["series:6010", "category:solenoid-valves"],
  },
  {
    slug: "how-does-an-hplc-injection-valve-work", copy: hplc,
    navigation: [
      { id: "hplc-connections", label: "端口与外接定量环" }, { id: "hplc-load", label: "Load 装样流程" },
      { id: "hplc-inject", label: "Inject 进样流程" }, { id: "hplc-vent", label: "Vent 排气路径" },
      { id: "hplc-conditions", label: "体积与压力边界" }, { id: "hplc-checks", label: "验证与相关产品" },
    ],
    subject: { about: ["HPLC 六通进样阀", "装样与进样流路", "定量环"], mentions: ["HP 二位六通带排气高压旋转阀"] },
    productIds: ["hp-3-position-7-port-high-pressure-valve"], relationKeys: ["series:hp", "category:high-pressure-valves"],
  },
];

export function getValveEngineeringArticle(slug: string, locale: TechnicalArticleLocale) {
  const articles = locale === "zh-CN" ? valveEngineeringArticles : getRotaryValveArticles(locale);
  return articles.find(article => article.slug === slug) ?? null;
}

function blockText(block: Block): string {
  switch (block.type) {
    case "paragraph": return block.text;
    case "notice": return [block.label, block.text].filter(Boolean).join(" ");
    case "formula": return [block.expression, block.note].filter(Boolean).join(" ");
    case "table": return [block.headers, ...block.rows].map(row => row.join(" | ")).join("\n");
    case "figure": return [block.alt, ...(block.flowNodes?.map(node => `${node.label}：${node.detail}`) ?? []), block.caption].join("\n");
    case "subheading": return block.title;
    case "list": return block.items.join("\n");
    case "links": return block.items.map(item => `${item.prefix ?? ""}${item.label}${item.suffix ?? ""}`).join("\n");
  }
}

export function getValveEngineeringArticles(locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  const articles = locale === "zh-CN" ? valveEngineeringArticles : getRotaryValveArticles(locale);
  return articles.map(({ slug, copy, relationKeys, date }) => ({
    id: slug, slug, category: "pumps-valves", ...copy.metadata, summary: copy.deck,
    date: date ?? "2026-09-29", relationKeys, relationPriority: 160,
    content: [
      { title: "", content: copy.leadBlocks.map(blockText).join("\n\n") },
      ...copy.sections.map(section => ({ title: section.title, content: section.blocks.map(blockText).join("\n\n") })),
      { title: copy.faqTitle, content: copy.faqItems.map(item => `${item.question}\n${item.answer}`).join("\n\n") },
    ],
  }));
}
