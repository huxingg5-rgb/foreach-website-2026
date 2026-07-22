const fs = require("fs");
const path = require("path");

const outDir = path.join(
  process.cwd(),
  "data/products/generated/pumps/valveless-pumps/detail"
);

const outFile = path.join(outDir, "index.json");

function spec(label, value) {
  return {
    label,
    name: label,
    title: label,
    value,
    content: value,
  };
}

function faq(question, answer) {
  return { question, answer };
}

function media(baseName, alt) {
  return {
    mainImage: `/images/products/pumps/valveless-pumps/${baseName}.webp`,
    image: `/images/products/pumps/valveless-pumps/${baseName}.webp`,
    heroImage: `/images/products/pumps/valveless-pumps/${baseName}.webp`,
    imageCard: `/images/products/pumps/valveless-pumps/${baseName}.webp`,
    additionalImages: [],
    images: [],
    thumbnails: [],
    imageAltEn: alt,
    imageAlt: alt,
    mainImageAlt: alt,
    model3dUrl: `/models/products/pumps/valveless-pumps/${baseName}.glb`,
    drawing2dUrl: `/documents/products/pumps/valveless-pumps/2d-drawings/${baseName}-2d-drawing.pdf`,
    drawingPdfUrl: `/documents/products/pumps/valveless-pumps/2d-drawings/${baseName}-2d-drawing.pdf`,
    resources: {
      model3dUrl: `/models/products/pumps/valveless-pumps/${baseName}.glb`,
      drawing2dUrl: `/documents/products/pumps/valveless-pumps/2d-drawings/${baseName}-2d-drawing.pdf`,
    },
  };
}

function buildDetail(detail) {
  const specs = detail.specs || [];

  return {
    ...detail,
    category: "pumps",
    productTypeId: "valveless-pump",
    productTypeSlug: "valveless-pumps",
    isCustomOnly: true,
    isCustomInquiry: true,
    detailMode: "custom_inquiry",
    productTypeName: "无阀泵",
    showDrawingRequest: true,
    show3DRequest: false,
    showDatasheetRequest: false,
    customInquiryHref: "/contact",
    contactHref: "/contact",
    modelDisplay: "定制配置请联系我们",
    displayModel: "定制配置请联系我们",
    advantages: [],
    specifications: specs,
    specificationGroups: [
      {
        title: "技术参数",
        items: specs,
      },
    ],
    selectionHref: "/products/pumps/valveless-pumps",
    detailHref: `/products/pumps/valveless-pumps/${detail.slug}`,
    href: `/products/pumps/valveless-pumps/${detail.slug}`,
  };
}

const details = [
  buildDetail({
    slug: "rpl-p4",
    productId: "valveless-rpl-p4",
    productCode: "RPL-P4",
    foreachModel: "RPL-P4",
    seriesId: "rpl-p4",
    seriesSlug: "rpl-p4-valveless-pump",

    model: "RPL-P4 12–80 μL/rev 小量程无阀泵",
    name: "RPL-P4 12–80 μL/rev 小量程无阀泵",
    title: "RPL-P4 12–80 μL/rev 小量程无阀泵",

    description:
      "RPL-P4 12–80 μL/rev 小量程无阀泵是一款用于微量加样、滴定和小体积定量输送的陶瓷柱塞无阀泵，适用于自动化分析仪器、IVD 设备和紧凑型液路模块。\n\n产品通过陶瓷柱塞旋转位移完成吸液与排液，可减少外置电磁阀使用，降低液路复杂度、阀件维护和残留风险；具体排量、接口和安装方式可根据项目需求确认。",

    commonApplications: [
      "微量试剂加样",
      "小体积滴定",
      "定量输送",
      "校准液加注",
      "微量反应液分配",
      "紧凑型分析仪器液路模块",
    ],

    ...media(
      "foreach-rpl-p4-valveless-pump",
      "FOREACH RPL-P4 12–80 μL/rev valveless ceramic piston pump for micro dispensing and titration"
    ),

    specs: [
      spec("产品类型", "RPL 无阀泵"),
      spec("排量范围", "12–80 μL/rev"),
      spec("转速", "5–300 rpm"),
      spec("准确度", "<2%"),
      spec("重复性", "<0.5%"),
      spec("耐压", "Max 150 kPa"),
      spec("寿命", "20,000,000 cycles"),
      spec("泵头材质", "PVDF"),
      spec("陶瓷套件", "AL2O3"),
      spec("工作液路接口", "1/4-28 UNF-2B"),
      spec("整体尺寸", "57 × 57 × 115 mm"),
      spec("重量", "500 g"),
      spec("配置方式", "定制配置"),
    ],

    faqs: [
      faq(
        "RPL-P4 无阀泵适合哪些应用场景？",
        "RPL-P4 适合微量试剂加样、小体积滴定、定量输送和校准液加注等场景，常用于自动化分析仪器和紧凑型液路模块。"
      ),
      faq(
        "RPL-P4 是标准品还是定制品？",
        "RPL-P4 按项目需求进行配置确认，不作为固定标准品直接选购。具体排量、接口和安装方式需要结合客户设备结构确认。"
      ),
      faq(
        "为什么选择无阀泵结构？",
        "无阀泵可减少外置电磁阀使用，降低液路复杂度，并减少阀件堵塞、卡滞和维护风险。"
      ),
      faq(
        "RPL-P4 是否适合小体积液体处理？",
        "适合。RPL-P4 覆盖 12–80 μL/rev 小量程输送需求，适用于微量液体处理和紧凑空间集成。"
      ),
      faq(
        "RPL-P4 的接口可以定制吗？",
        "可以根据项目需求确认具体接口形式、安装方式和液路连接方式。"
      ),
    ],

    seo: {
      title: "RPL-P4 12–80 μL/rev 小量程无阀泵 | FOREACH",
      description:
        "RPL-P4 小量程无阀泵适用于微量加样、滴定和定量输送，采用陶瓷柱塞无阀结构，支持定制排量、接口和安装方式。",
      keywords: [
        "RPL-P4 无阀泵",
        "12–80 μL/rev 无阀泵",
        "陶瓷柱塞泵",
        "旋转柱塞泵",
        "微量加样泵",
        "滴定泵",
        "定量输送泵",
        "IVD 液路模块",
      ],
    },
  }),

  buildDetail({
    slug: "rpl-p635",
    productId: "valveless-rpl-p635",
    productCode: "RPL-P6.35",
    foreachModel: "RPL-P6.35",
    seriesId: "rpl-p635",
    seriesSlug: "rpl-p635-valveless-pump",

    model: "RPL-P6.35 50–300 μL/rev 中小量程无阀泵",
    name: "RPL-P6.35 50–300 μL/rev 中小量程无阀泵",
    title: "RPL-P6.35 50–300 μL/rev 中小量程无阀泵",

    description:
      "RPL-P6.35 50–300 μL/rev 中小量程无阀泵面向试剂加样、滴定、灌装和定量输送场景，适合自动化分析仪器中的中小体积液体处理模块。\n\n产品采用高精密陶瓷柱塞与无阀液路结构，可减少外置阀件依赖，并支持清洗口、液路接口、安装方向和具体排量配置，适合对稳定输送、化学兼容性和结构集成有要求的设备。",

    commonApplications: [
      "试剂加样",
      "滴定分析",
      "定量灌装",
      "缓冲液输送",
      "清洗液分配",
      "自动化分析仪器液路集成",
    ],

    ...media(
      "foreach-rpl-p635-valveless-pump",
      "FOREACH RPL-P6.35 50–300 μL/rev valveless ceramic piston pump for reagent dispensing and filling"
    ),

    specs: [
      spec("产品类型", "RPL 无阀泵"),
      spec("排量范围", "50–300 μL/rev"),
      spec("转速", "5–300 rpm"),
      spec("准确度", "<2%"),
      spec("重复性", "<0.5%"),
      spec("耐压", "Max 150 kPa"),
      spec("寿命", "20,000,000 cycles"),
      spec("泵头材质", "PVDF"),
      spec("堵头材质", "PVDF"),
      spec("陶瓷套件", "ZrO2"),
      spec("工作液路接口", "1/4-28 UNF-2B"),
      spec("清洗液路接口", "1/4-28 UNF-2B"),
      spec("整体尺寸", "78 × 78 × 145 mm"),
      spec("重量", "750 g"),
      spec("配置方式", "定制配置"),
    ],

    faqs: [
      faq(
        "RPL-P6.35 无阀泵适合哪些场景？",
        "RPL-P6.35 适合试剂加样、滴定、灌装、缓冲液输送和中小体积定量输送场景。"
      ),
      faq(
        "RPL-P6.35 与 RPL-P4 的区别是什么？",
        "RPL-P6.35 面向 50–300 μL/rev 中小量程输送，排量范围高于 RPL-P4，更适合中小体积试剂加样和灌装。"
      ),
      faq(
        "清洗口有什么作用？",
        "在高腐蚀性或易结晶液体场景下，清洗口可用于对柱塞区域进行清洗，有助于降低残留和维护风险。"
      ),
      faq(
        "RPL-P6.35 可以定制排量吗？",
        "可以。具体排量、清洗口、接口形式和安装方向可根据客户液路方案确认。"
      ),
      faq(
        "RPL-P6.35 是否适合自动化仪器集成？",
        "适合。该系列结构紧凑，适用于自动化分析仪器、IVD 设备和实验室自动化设备中的液路模块集成。"
      ),
    ],

    seo: {
      title: "RPL-P6.35 50–300 μL/rev 中小量程无阀泵 | FOREACH",
      description:
        "RPL-P6.35 中小量程无阀泵适用于试剂加样、滴定、灌装和定量输送，支持清洗口、接口和排量定制。",
      keywords: [
        "RPL-P6.35 无阀泵",
        "50–300 μL/rev 无阀泵",
        "陶瓷柱塞无阀泵",
        "试剂加样泵",
        "灌装泵",
        "滴定泵",
        "自动化分析仪器液路",
      ],
    },
  }),

  buildDetail({
    slug: "rpl-p15",
    productId: "valveless-rpl-p15",
    productCode: "RPL-P15",
    foreachModel: "RPL-P15",
    seriesId: "rpl-p15",
    seriesSlug: "rpl-p15-valveless-pump",

    model: "RPL-P15 300–1200 μL/rev 中大量程无阀泵",
    name: "RPL-P15 300–1200 μL/rev 中大量程无阀泵",
    title: "RPL-P15 300–1200 μL/rev 中大量程无阀泵",

    description:
      "RPL-P15 300–1200 μL/rev 中大量程无阀泵适用于较大体积加液、试剂灌装、液体转移和定量输送场景，可用于自动化分析仪器和实验室自动化设备。\n\n陶瓷柱塞与无阀液路结构有助于提升输送稳定性，并减少传统阀件带来的堵塞、卡滞和维护问题；工作接口、清洗口、安装方向和排量可按项目需求确认。",

    commonApplications: [
      "较大体积加液",
      "试剂灌装",
      "液体转移",
      "定量输送",
      "稀释液补液",
      "实验室自动化设备液路模块",
    ],

    ...media(
      "foreach-rpl-p15-valveless-pump",
      "FOREACH RPL-P15 300–1200 μL/rev valveless ceramic piston pump for larger-volume dispensing and filling"
    ),

    specs: [
      spec("产品类型", "RPL 无阀泵"),
      spec("排量范围", "300–1200 μL/rev"),
      spec("转速", "5–500 rpm"),
      spec("准确度", "<2%"),
      spec("重复性", "<0.5%"),
      spec("耐压", "Max 150 kPa"),
      spec("寿命", "20,000,000 cycles"),
      spec("泵头材质", "PVDF"),
      spec("堵头材质", "PVDF"),
      spec("陶瓷套件", "AL2O3"),
      spec("工作液路接口", "G1/8"),
      spec("清洗液路接口", "1/4-28 UNF-2B"),
      spec("整体尺寸", "78 × 78 × 160 mm"),
      spec("重量", "900 g"),
      spec("配置方式", "定制配置"),
    ],

    faqs: [
      faq(
        "RPL-P15 无阀泵适合哪些场景？",
        "RPL-P15 适合较大体积加液、试剂灌装、液体转移、稀释液补液和中大量程定量输送。"
      ),
      faq(
        "RPL-P15 与 RPL-P6.35 的区别是什么？",
        "RPL-P15 面向 300–1200 μL/rev 中大量程输送，适合更大体积的加液和灌装；RPL-P6.35 更适合中小量程试剂加样。"
      ),
      faq(
        "RPL-P15 的工作接口是什么？",
        "RPL-P15 工作液路接口为 G1/8，清洗液路接口为 1/4-28 UNF-2B，具体接口形式可根据项目进一步确认。"
      ),
      faq(
        "RPL-P15 可以用于连续输送吗？",
        "可用于液体转移和定量输送场景，但具体连续运行条件、目标流量和压力要求需要结合工况确认。"
      ),
      faq(
        "RPL-P15 是否支持定制？",
        "支持。排量、接口、清洗口、安装方向和液路结构可根据设备项目需求确认。"
      ),
    ],

    seo: {
      title: "RPL-P15 300–1200 μL/rev 中大量程无阀泵 | FOREACH",
      description:
        "RPL-P15 中大量程无阀泵适用于较大体积加液、试剂灌装、液体转移和定量输送，支持接口、清洗口和排量定制。",
      keywords: [
        "RPL-P15 无阀泵",
        "300–1200 μL/rev 无阀泵",
        "中大量程陶瓷柱塞泵",
        "试剂灌装泵",
        "液体转移泵",
        "定量输送泵",
      ],
    },
  }),

  buildDetail({
    slug: "drpl",
    productId: "valveless-drpl",
    productCode: "DRPL",
    foreachModel: "DRPL",
    seriesId: "drpl",
    seriesSlug: "drpl-dual-head-valveless-pump",

    model: "DRPL 1:9–1:19 双头比例输送无阀泵",
    name: "DRPL 1:9–1:19 双头比例输送无阀泵",
    title: "DRPL 1:9–1:19 双头比例输送无阀泵",

    description:
      "DRPL 1:9–1:19 双头比例输送无阀泵是一款用于稀释、配液和双液路比例加液的陶瓷柱塞无阀泵，适合浓缩液与稀释液按固定比例输送的自动化仪器液路模块。\n\n产品采用双头结构实现两路液体同步定量输送，支持 1:9 和 1:19 配比配置，可根据配比、流量、接口和安装方式进行项目确认。",

    commonApplications: [
      "浓缩液稀释",
      "双液路配液",
      "比例加液",
      "稀释液与试剂同步输送",
      "自动化配比模块",
      "喷涂和稀释系统",
    ],

    ...media(
      "foreach-drpl-dual-head-valveless-pump",
      "FOREACH DRPL 1:9 to 1:19 dual-head valveless ceramic piston pump for proportional dispensing and dilution"
    ),

    specs: [
      spec("产品类型", "DRPL 双头无阀泵"),
      spec("配比范围", "1:9 / 1:19"),
      spec("1:9 配比配置", "DRPL-0109-0100｜浓缩液 100 μL｜稀释液 900 μL｜配液量 1 mL｜QMin 60 mL/min｜QMax 300 mL/min"),
      spec("1:19 配比配置", "DRPL-0119-0060｜浓缩液 60 μL｜稀释液 1140 μL｜配液量 1.2 mL｜QMin 72 mL/min｜QMax 360 mL/min"),
      spec("转速", "60–300 RPM"),
      spec("准确度", "<2%"),
      spec("重复性", "<0.5%"),
      spec("试剂 A 端耐压", "Max 150 kPa"),
      spec("试剂 B 端耐压", "Max 150 kPa"),
      spec("寿命", "20,000,000 cycles"),
      spec("试剂 A 工作液路接口", "1/4-28 UNF-2B"),
      spec("试剂 B 工作液路接口", "G1/8"),
      spec("试剂 A 清洗液路接口", "1/4-28 UNF-2B"),
      spec("试剂 B 清洗液路接口", "1/4-28 UNF-2B"),
      spec("尺寸", "L180 × W83.7 × H75 mm"),
      spec("重量", "1536 g"),
      spec("配置方式", "定制配置"),
    ],

    specificationGroups: [
      {
        title: "技术参数",
        items: [
          spec("产品类型", "DRPL 双头无阀泵"),
          spec("配比范围", "1:9 / 1:19"),
          spec("转速", "60–300 RPM"),
          spec("准确度", "<2%"),
          spec("重复性", "<0.5%"),
          spec("耐压", "Max 150 kPa"),
          spec("寿命", "20,000,000 cycles"),
          spec("尺寸", "L180 × W83.7 × H75 mm"),
          spec("重量", "1536 g"),
          spec("配置方式", "定制配置"),
        ],
      },
      {
        title: "配比配置",
        items: [
          spec("DRPL-0109-0100", "1:9｜浓缩液 100 μL｜稀释液 900 μL｜配液量 1 mL｜QMin 60 mL/min｜QMax 300 mL/min"),
          spec("DRPL-0119-0060", "1:19｜浓缩液 60 μL｜稀释液 1140 μL｜配液量 1.2 mL｜QMin 72 mL/min｜QMax 360 mL/min"),
        ],
      },
      {
        title: "接口配置",
        items: [
          spec("试剂 A 工作液路接口", "1/4-28 UNF-2B"),
          spec("试剂 B 工作液路接口", "G1/8"),
          spec("试剂 A 清洗液路接口", "1/4-28 UNF-2B"),
          spec("试剂 B 清洗液路接口", "1/4-28 UNF-2B"),
        ],
      },
    ],

    faqs: [
      faq(
        "DRPL 双头无阀泵适合哪些场景？",
        "DRPL 适合浓缩液稀释、双液路配液、比例加液和自动化配比模块，尤其适用于浓缩液与稀释液按固定比例输送的场景。"
      ),
      faq(
        "DRPL 和 RPL 的区别是什么？",
        "RPL 是单头无阀泵，主要用于定量输送；DRPL 是双头结构，主要用于双液路比例输送、稀释和配液。"
      ),
      faq(
        "DRPL 支持哪些配比？",
        "当前配置包含 1:9 和 1:19 两种配比。其他配比、流量和接口需求需要根据项目进一步评估。"
      ),
      faq(
        "DRPL 是否可以定制？",
        "可以。DRPL 按项目需求确认具体配比、目标流量、接口形式、安装方式和液路结构。"
      ),
      faq(
        "DRPL 的两路接口是否相同？",
        "规格书中试剂 A 工作液路接口为 1/4-28 UNF-2B，试剂 B 工作液路接口为 G1/8；清洗液路接口均为 1/4-28 UNF-2B。"
      ),
    ],

    seo: {
      title: "DRPL 1:9–1:19 双头比例输送无阀泵 | FOREACH",
      description:
        "DRPL 双头无阀泵适用于稀释、配液和双液路比例加液，支持 1:9 和 1:19 配比配置，可按项目需求确认接口、流量和安装方式。",
      keywords: [
        "DRPL 双头无阀泵",
        "1:9 比例输送泵",
        "1:19 比例输送泵",
        "双头陶瓷柱塞泵",
        "稀释泵",
        "配液泵",
        "比例加液泵",
      ],
    },
  }),
];

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(details, null, 2), "utf8");

console.log(`Generated ${details.length} valveless pump detail records.`);
console.log(outFile);