const imageRoot = "/images/products/fittings/degassing-modules/ef-ag3-b";

export const degassingModuleZh = {
  typeId: "degassing-modules",
  name: "脱气膜组件",
  model: "EF-AG3-B",
  slug: "ef-ag3-b",
  heading: "工业喷墨用中空纤维脱气膜组件",
  modelListHref: "/products/fittings/?productType=degassing-modules",
  title: "EF-AG3-B 工业喷墨用中空纤维脱气膜组件",
  href: "/products/fittings/degassing-modules/ef-ag3-b/",
  drawing2dUrl: "/resources/drawings/fittings/degassing-modules/ef-ag3-b-2d-drawing.pdf",
  description: "EF-AG3-B 用于工业喷墨供墨管路的在线真空脱气。墨水流经中空纤维外侧，溶解气体透过膜后由真空侧抽走，减少供墨过程中液体析气形成的气泡。",
  introduction: "EF-AG3-B 用于工业喷墨供墨管路的在线真空脱气。墨水流经中空纤维外侧，溶解气体透过膜后由真空侧抽走，减少供墨过程中液体析气形成的气泡。两个液体口和一个真空口均为 NPT 1/8 内螺纹。按墨水与清洗剂相容性、供墨流量、液温和真空侧绝对压力验证脱气效果与液侧压降。",
  typeDescription: "用于喷墨供液回路的在线脱气。选型时核对墨水与清洗剂的相容性、工作流量、真空侧压力和接口规格。",
  cardImage: { src: `${imageRoot}/ef-ag3-b-card.webp`, alt: "EF-AG3-B 脱气膜组件及其螺纹接口" },
  gallery: [
    { src: `${imageRoot}/ef-ag3-b-main.webp`, alt: "EF-AG3-B 脱气膜组件正面，显示筒体和侧向液体接口" },
    { src: `${imageRoot}/ef-ag3-b-vertical-view.webp`, alt: "EF-AG3-B 脱气膜组件竖放外观" },
    { src: `${imageRoot}/ef-ag3-b-reverse-angle.webp`, alt: "EF-AG3-B 脱气膜组件另一侧斜视图" },
    { src: `${imageRoot}/ef-ag3-b-port-view.webp`, alt: "EF-AG3-B 脱气膜组件端部与侧向螺纹接口" },
  ],
  specificationGroups: [
    {
      title: "结构与接口",
      rows: [
        ["外形尺寸", "159 mm × Ø42 mm"],
        ["重量", "约 100 g"],
        ["膜面积", "约 0.2 m²"],
        ["初次充液体积", "约 40 mL（EF-AG3 系列参考值）"],
        ["中空纤维膜", "聚（4-甲基-1-戊烯）（PMP）"],
        ["壳体与端盖", "聚丙烯（PP）、不锈钢（SUS）"],
        ["封装树脂", "环氧树脂"],
        ["接口", "两个液体口、一个真空口，均为 NPT 1/8"],
      ],
    },
    {
      title: "使用条件",
      rows: [
        ["液体与工作环境温度", "5–45 °C"],
        ["液体侧最高压力（表压）", "200 kPa"],
        ["水性液体真空侧压力（绝对压力）", "液体在工作温度下的饱和蒸气压至 100 kPa"],
        ["非水性液体真空侧压力（绝对压力）", "1–100 kPa"],
      ],
    },
    {
      title: "水介质测试结果",
      rows: [
        ["水介质测试：处理后溶解氧浓度", "< 1.9 mg/L"],
        ["水介质测试：组件压降", "< 0.1 kPa"],
      ],
    },
  ],
  delivery: {
    introduction: "EF-AG3-B 脱气膜组件按确认的订单安排交付。",
    imageRoot: `${imageRoot}/delivery`,
    groups: [
      {
        title: "内包装",
        paragraphs: [
          "组件防护：使用气泡袋包裹组件，减少搬运时与包装盒的直接接触。",
          "破损反馈：如开箱发现组件破损，请保留内外包装并拍照反馈。",
        ],
        photos: [
          { file: "bubble-wrap.webp", alt: "印有恒永达标识的脱气膜组件气泡袋", caption: "组件气泡袋防护" },
          { file: "inner-packaging.webp", alt: "工作人员从纸盒取出气泡袋包裹的脱气膜组件", caption: "脱气膜组件取出展示" },
        ],
      },
      {
        title: "外包装",
        paragraphs: [
          "缓冲装箱：使用纸盒和缓冲材料保护组件。",
          "箱外标识：收货时可按箱外物料标识核对订单。",
          "随货资料：按订单约定提供。",
        ],
        photos: [
          { file: "open-carton.webp", alt: "打开的脱气膜纸盒及其中的气泡袋、缓冲衬垫", caption: "脱气膜开箱实拍" },
          { file: "carton-label.webp", alt: "脱气膜纸盒外侧的恒永达物料标识卡", caption: "脱气膜外箱物料标识" },
        ],
      },
      {
        title: "发货快递",
        paragraphs: [
          "快递方式：国内订单默认顺丰包邮。",
          "发货前：确认收货信息、交付安排及特殊运输需求。",
          "发货后：提供物流信息。如有物流异常，可凭订单号和运单号联系恒永达查询。",
        ],
        photos: [
          { file: "packing-process.webp", alt: "恒永达工作人员在包装台处理气泵纸箱", caption: "打包流程示例（气泵）" },
          { file: "outbound-process.webp", alt: "恒永达工作人员在包装区整理柱塞泵出库纸箱", caption: "出库流程示例（柱塞泵）" },
        ],
      },
    ],
    warranty: "根据介质相容性试验结果书面约定。",
    support: "售后对接：可通过电话、邮箱或下方表单联系我们，提供型号、订单号或批次、使用介质和异常现象。如需寄回，请先与售后确认。",
  },
} as const;
