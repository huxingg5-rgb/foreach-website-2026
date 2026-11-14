// Preserve the approved compact FAQ source independently of the selection guide UI.
// Product details use the expanded guide; the resource-center FAQ keeps these answers.
export const pvcTubingFaqsZh = [
  { question: "PVC 管可以直接用于所有试剂吗？", answer: "不能仅根据 PVC 名称判断。需核对实际配方、试剂成分与浓度、温度和接触时间；敏感样本路径还应验证吸附、析出和残留。" },
  { question: "55A 与 65A 如何选择？", answer: "当前选型器有这两种硬度。结合布管柔性、倒刺装配、固定方式和壁厚选择；不能仅根据硬度推导压力能力。" },
  { question: "相同内径为什么有不同外径？", answer: "不同外径对应不同名义壁厚，会影响弯曲和接口匹配。应按实际尺寸组合选择，而不是只确认内径。" },
  { question: "PVC 管能作蠕动泵管吗？", answer: "只有具体配方和尺寸经泵头匹配、疲劳寿命及介质测试后才可确认。仪器连接管不能自动视为蠕动泵管。" },
  { question: "包装长度和特殊规格如何确认？", answer: "以选中型号的包装为准。特殊硬度、尺寸或卷长应按项目需求确认可行性、起订量与交期。" },
] as const;
