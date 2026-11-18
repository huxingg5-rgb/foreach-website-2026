import type { InstrumentProductGuide } from "./instrument-product-guides.zh";
import { getSmtp2CadAssets } from "./smtp2-cad-assets";
import { getSmtp2Variant } from "./smtp2-variant-content";
import { getSmtp4CadAssets } from "./smtp4-cad-assets";

// Ordering codes: PS-130A-2507-00001-001 p16–17. PS-130A-003_002_cn p5
// gives conflicting identifiers for the 250 μL configuration.
export const smtp4SelectionModels = [
  { slug: "smtp4-100ul", capacityCode: "2", capacityUl: 100, orderModel: "SMTP4-200", resolution: "0.05 μL/步", heightMm: 153.1, preview: "smtp4-100ul-mounting.webp" },
  { slug: "smtp4-250ul", capacityCode: "3", capacityUl: 250, orderModel: null, resolution: null, heightMm: 153.1, preview: "smtp4-100ul-mounting.webp" },
  { slug: "smtp4-500ul", capacityCode: "4", capacityUl: 500, orderModel: "SMTP4-400", resolution: "0.25 μL/步", heightMm: 154.9, preview: "smtp4-500ul-mounting.webp" },
] as const;

const modelPriorities: Readonly<Record<string, string>> = {
  "smtp2-500": "适合优先控制装机高度的工位。用 8 mm 适配器配合实际吸头，先核对最低液面能否触达，再检查取头和脱头位置。",
  "smtp2-510": "用 45 mm 适配器核对样本管或试剂容器的取液位置。既要验证最低液面能否触达，也要留足吸头退出和转移空间。",
  "smtp2-520": "用 72 mm 适配器评估深管取液。重点检查吸头能否穿过管口、接近最低液面，并在运动和取液时避开容器底部。",
  "smtp4-100ul": "用于评估小体积样本转移。先测常用量和最小量，观察目标孔收到的液量、吸头挂滴和重复性。",
  "smtp4-250ul": "用于评估多步试剂加入。逐步列出各试剂的目标量、加液顺序和换头时机，分别验证每一步的交付液量。",
  "smtp4-500ul": "用于评估较大单次转移或样本分装。一次吸液分多份时，核算分装总量和流程余量，并检查首份、中间份与末份。",
};

export function getChinesePipettingSelectionGuide(guide: InstrumentProductGuide): InstrumentProductGuide {
  const priority = modelPriorities[guide.slug];
  const variant = getSmtp2Variant(guide.slug);
  const smtp4 = smtp4SelectionModels.find(model => model.slug === guide.slug);
  const capacity = variant ? 1000 : smtp4?.capacityUl;
  if (!priority || !capacity) return guide;

  const drawing = variant ? getSmtp2CadAssets(guide.slug, "zh") : getSmtp4CadAssets(guide.slug, "zh");
  const resolution = variant
    ? "标准模式下，全量程为 3143 步，定量分辨率为 0.319 μL/步"
    : smtp4?.resolution
      ? `全量程为 2000 步，定量分辨率为 ${smtp4.resolution}`
      : "按供货配置确认满量程步数和定量分辨率";

  return {
    ...guide,
    lead: "先定设备需要的状态反馈和驱动方式，再按实际工作液量、耗材和容器空间选型号。装机后的验收以目标容器实际收到的液量为准。",
    features: [
      ["需要模块提供移液状态反馈，优先评估 SMTP2", "SMTP2 集成驱动控制及液面、堵塞、吸头有无检测。设备方负责 Z 轴定位，并根据检测信号安排停机、报警或复核。"],
      ["由设备方配置驱动和流程，评估 SMTP4", "SMTP4 配备四线双极步进电机和自动脱吸头机构。设备方配置驱动器、光耦采集和动作程序，按流程需求配置液面或堵塞检测。"],
      [variant ? `${variant.model} · 1000 μL · ${variant.adapter}（${variant.lengthMm} mm）` : `${guide.model} · 步进电机与自动脱吸头`, priority],
    ],
    sections: [
      {
        id: "volume",
        title: "按实际工作液量选择容量",
        intro: variant
          ? "三款 SMTP2 的标称容量均为 1000 μL。根据目标液量、分配次数和吸头可用容量核对工作液量。"
          : `当前型号的标称容量为 ${capacity} μL。按最小、常用和最大目标液量筛选容量，再结合吸头的可用容量和分配方式验证。`,
        rows: [
          ["单次移液", "列出最小、常用和最大液量", "逐项对照吸头的可用容量及设备要求的偏差、重复性和节拍。用最小工作液量验证小量移液表现。"],
          ["一次吸液多次分装", "核算各份目标量及方法余量", "吸液总量需落在模块与吸头的可用容量内。分别验证首份、中间份和末份，记录每份实际液量。"],
          ["驱动分辨率", resolution, "按对应驱动配置将目标液量换算为指令。最低可靠液量、准确度和精密度以实际液体、吸头和分配方式的试验结果为准。"],
        ],
        note: variant
          ? "规格书示例：用 1000 μL 导电吸头分配 100 μL，单次的准确度为 ≤2%、精密度为 0.75%，多次分配为 ≤3% 和 2%。该表采用含 0.1% NaCl 的去离子水，在 25 ± 2 ℃、相对湿度 50% ± 5% 条件下称重。验证其他配置时，按对应吸头、液体和分配方式取数。"
          : "阅读性能表时，把吸头容量、测试液量和分配方式放在一起看。按当前容量和项目使用的吸头、液体与分配方式验证准确度和精密度。",
        links: [
          { href: "/products/pumps/pipetting-pumps/", label: "比较 SMTP2 与 SMTP4 型号" },
          { href: "/resources/technical-articles/what-is-a-programmable-pipetting-pump/", label: "了解气体置换原理与移液参数" },
        ],
      },
      {
        id: "tips",
        title: "用实际吸头和容器核对装机空间",
        figure: variant ? {
          file: "smtp2-adapter.webp",
          alt: "LTE045 适配器与吸头装配示意，标出适配器伸出长度、吸头长度和总长",
          caption: "图　SMTP2 适配器与吸头装配。图示为 45 mm 的 LTE045，当前型号的尺寸以本页 2D 图纸为准。",
        } : undefined,
        intro: variant
          ? `当前型号使用 ${variant.adapter} 适配器，伸出长度为 ${variant.lengthMm} mm。安装基准、吸头有效长度、容器口和 Z 轴行程共同决定取液可达性。`
          : "根据供货配置核对吸头料号、接口和容量。装机前将吸头架、来源容器、接收容器和废吸头位一起放入设备布局。",
        rows: [
          ["装头", "核对吸头料号、拾取高度和装头力", "使用实际耗材检查吸头密封、倾斜、松脱及重复装头时的一致性。"],
          ["取液与退出", "核对最低液面、容器口及底部间隙", "吸头应能进入容器并在取液时保持所需浸入深度。空载验证进入、退出和横移的避让。"],
          ["脱头", "核对脱头位置、行程和废吸头接收空间", "在整机上确认吸头能完整脱落，并检查脱头后能否顺利进入下一个装头周期。"],
        ],
        links: drawing ? [{ href: drawing.drawingPdfUrl, label: `查看 ${guide.model} 中文 2D 图纸` }] : undefined,
      },
      {
        id: "control",
        title: variant ? "接入 SMTP2 的通信与检测" : "接入 SMTP4 的步进驱动与光耦",
        intro: variant
          ? "先按供货配置核对供电、J1 端子、通信方式和地址。验证单台初始化及状态读取后，再将检测信号接入整机动作。"
          : "按当前型号的图纸核对电机绕组、驱动器以及位置和脱头光耦的线序。低速确认回零、移液行程和脱头动作。",
        rows: variant ? [
          ["液面检测", "按实际吸头和液体选检测方式", "压力式检测与泵的吸取或分配动作配合。电容式和混合式检测需要导电吸头，触发位置和干扰需在整机上验证。"],
          ["Z 轴联动", "确认触液后的停位和浸入深度", "由设备方根据容器、液面变化和吸液速度控制 Z 轴，验证取液过程中吸头的浸入位置。"],
          ["异常反馈", "验证未装头、缺液和堵塞的识别", "记录正常和异常动作的状态。确认设备接到反馈后如何停止本次移液、处理吸头并恢复流程。"],
        ] : [
          ["步进驱动", "设置当前型号的步数、速度和限位", "按实际电机与驱动器配置核对绕组和电流设置，低速检查方向、回零及行程。"],
          ["光耦采集", "确认位置与脱头信号的触发点和极性", "按本型号 2D 图纸核对端子线序，按控制器允许的电平设计上拉。"],
          ["整机异常处理", "验证回零异常、失步和脱头失败", "在设备程序中规定停止、报警、复位和继续条件。需要液面或堵塞检测的工位另行安排传感与控制方案。"],
        ],
      },
      {
        id: "commissioning",
        title: "装机后怎样验证移液结果",
        intro: "在实际吸头、液体和容器条件下验收。先确认动作与位置，再验证目标容器收到的液量及整机节拍。",
        steps: [
          ["空载回零与避让", "低速运行整个路径，检查吸头架、来源容器、接收容器及废吸头位。"],
          ["确认吸头密封", "用实际吸头验证拾取、密封和脱头，确认吸头在移液过程中固定可靠。"],
          ["建立吸排液参数", "按液体性质设定吸排液速度、浸入深度、等待时间和排液位置，观察气泡、挂滴和残液。"],
          ["测量实际交付液量", "在最小、常用和最大工作液量处重复测量。多次分装分别记录首份、中间份和末份，并与设备验收要求比较。"],
          ["验证停机和恢复", variant
            ? "验证未装头、缺液、堵塞或通信异常时的反馈与整机动作。暂停恢复后复测首份液量。"
            : "验证回零、位置光耦或脱头动作异常时的处理。复位并恢复流程后，重新确认首份液量。"],
        ],
        note: "准备选型或送样时，提供液体与温度、目标液量与允许偏差、吸头料号、容器尺寸、分装方式、目标节拍及设备驱动条件。",
      },
      ...guide.sections.filter(section => section.id === "care"),
    ],
  };
}
