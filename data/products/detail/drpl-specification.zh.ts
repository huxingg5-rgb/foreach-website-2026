/** Chinese DRPL standards verified against RD-121B-0048_001_cn, pp. 5–9. */
export const drplElectrical = {
  motorCurrent: "1.68 A/相",
  motorType: "两相四线式步进电机",
  stepAngle: "1.8°/整步",
  phaseResistance: "1.65 Ω ±15%/相（20 ℃）",
  staticAngleError: "±0.09° Max（不含磁滞误差）",
  motorConnector: "JST S6B-PH-K-S",
  optocouplerSupply: "5–24 VDC ±10%",
  outputSinkCurrent: "<50 mA",
  outputAppliedVoltage: "<30 V",
  sensorCurrent: "≤15 mA",
} as const;

const profiles = {
  "drpl-0109": { orderModel: "DRPL-0109-0100", itemCode: "499027", parts: 9, concentrate: 100, diluent: 900, totalMl: 1, flowMin: 60, flowMax: 300 },
  "drpl-0119": { orderModel: "DRPL-0119-0060", itemCode: "499028", parts: 19, concentrate: 60, diluent: 1140, totalMl: 1.2, flowMin: 72, flowMax: 360 },
} as const;

export function getDrplSpecification(slug: string) {
  return profiles[slug as keyof typeof profiles];
}

export function applyDrplChineseSpecification<T extends { slug?: string }>(data: T): T {
  const profile = getDrplSpecification(data.slug || "");
  if (!profile) return data;
  const entries: readonly (readonly [string, string])[] = [
    ["订货型号", profile.orderModel],
    ["商品编码", profile.itemCode],
    ["浓缩液与稀释液体积比", `1:${profile.parts}`],
    ["浓缩液份数", "1"],
    ["稀释液份数", String(profile.parts)],
    ["浓缩液定量（μL）", String(profile.concentrate)],
    ["稀释液定量（μL）", String(profile.diluent)],
    ["配液量（mL）", String(profile.totalMl)],
    ["转速", "60–300 rpm"],
    ["流量 QMin，mL/min", String(profile.flowMin)],
    ["流量 QMax，mL/min", String(profile.flowMax)],
    ["试剂A 工作液路接口", "1/4-28 UNF-2B"],
    ["试剂B 工作液路接口", "G1/8（默认带金属快插接头）"],
    ["试剂A 清洗液路接口", "1/4-28 UNF-2B"],
    ["试剂B 清洗液路接口", "1/4-28 UNF-2B"],
    ["试剂A 端耐压", "Max 150 kPa"],
    ["试剂B 端耐压", "Max 150 kPa"],
    ["尺寸/mm", "180 × 83.7 × 75 mm"],
    ["重量", "1536 g"],
    ["准确性", "<2%"],
    ["重复性", "<0.5%"],
    ["寿命", "20,000,000 cycles"],
  ];
  const specs = entries.map(([label, value]) => ({ label, name: label, title: label, value, content: value }));
  return { ...data, specs, specifications: specs, specificationGroups: [{ title: "规格参数", items: specs }] };
}
