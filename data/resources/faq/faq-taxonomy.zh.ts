import type { FaqCategory } from "./faq.types";

export const faqCategories: FaqCategory[] = [
  { key: "pumps", label: "泵类", section: "产品问题", children: [
    { key: "piston", label: "柱塞泵" }, { key: "diaphragm", label: "隔膜泵" },
    { key: "syringe", label: "注射泵" }, { key: "pipetting", label: "移液泵" },
    { key: "valveless", label: "无阀计量泵" },
  ] },
  { key: "valves", label: "阀类", section: "产品问题", children: [
    { key: "rotary", label: "旋转阀" }, { key: "solenoid", label: "电磁阀" },
    { key: "high-pressure-valve", label: "高压阀" }, { key: "check-valve", label: "单向阀" },
  ] },
  { key: "probes", label: "针类", section: "产品问题", children: [
    { key: "sampling-probe", label: "采样针与试剂针" }, { key: "piercing-probe", label: "穿刺针" },
    { key: "wash-probe", label: "清洗针" }, { key: "stirrer", label: "搅拌针与搅拌桨" },
  ] },
  { key: "tubing", label: "管路与管组件", section: "产品问题", children: [
    { key: "soft-tubing", label: "软管" }, { key: "hard-tubing", label: "硬管" },
    { key: "tubing-assembly", label: "定制管组件" },
  ] },
  { key: "fittings", label: "接头类", section: "产品问题", children: [
    { key: "flanged", label: "翻边接头" }, { key: "ferrule", label: "卡箍接头" },
    { key: "retaining-ring", label: "卡环接头" }, { key: "high-pressure-fitting", label: "高压硬管接头" },
    { key: "barbed", label: "倒刺接头" }, { key: "threaded-barb", label: "螺纹转倒刺接头" },
    { key: "luer", label: "鲁尔接头" }, { key: "quick-connect", label: "快速接头", aliases: ["快插", "快速断开", "快接"] },
    { key: "thread-adapter", label: "内螺纹互转接头" }, { key: "bulkhead", label: "穿板接头" },
  ] },
  { key: "control", label: "检测与控制", section: "产品问题", children: [
    { key: "bubble", label: "气泡检测" }, { key: "pressure", label: "液路压力检测" },
  ] },
  { key: "purchasing", label: "选型与采购", section: "服务支持", children: [
    { key: "selection", label: "选型资料" }, { key: "samples", label: "样品与打样" },
    { key: "customization", label: "非标定制" }, { key: "quotation", label: "询价与交付" },
  ] },
  { key: "quality", label: "质量与检验", section: "服务支持", children: [
    { key: "inspection", label: "尺寸与性能检验" }, { key: "compliance", label: "材料与合规资料" },
    { key: "traceability", label: "批次追溯" }, { key: "acceptance", label: "验收要求" },
  ] },
  { key: "support", label: "售后服务", section: "服务支持", children: [
    { key: "troubleshooting", label: "故障反馈" }, { key: "maintenance", label: "维护保养" },
    { key: "replacement", label: "配件更换" }, { key: "repair", label: "维修与返修" },
    { key: "warranty", label: "质保说明" },
  ] },
];
