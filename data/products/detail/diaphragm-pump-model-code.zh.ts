import type { DiaphragmPumpGuide } from "./diaphragm-pump-guide";

type CodeOption = readonly [string, string];
export type DiaphragmModelCodeField = {
  label: string;
  code: string;
  separatorBefore?: boolean;
  options: readonly CodeOption[];
  note?: string;
};

/** Model selection/coding tables, p.6 of DPL30 CN A04, DPL60 CN A02,
 * DPL30H CN A00 and DPGL800 EN PS-150B-2608-00005 A00.
 * Coding options are distinct from the standard models in the selection table.
 * H material combinations follow the component-level selection rows, not the
 * abbreviated FF/PS legend. H/DPGL coding does not contain a wire-count field.
 */
export function getDiaphragmPumpModelCodeZh(guide: DiaphragmPumpGuide) {
  const withWireCode = guide.series === "DPL30" || guide.series === "DPL60";
  const motor = guide.motor === "brushless" ? "B" : "D";
  const connection = withWireCode ? "B" : "S";
  const direction = guide.gasLiquid ? "6" : "C";
  const example = `${guide.series}-24${motor}${connection}${guide.gasLiquid ? direction : ""}-EP/PS`;
  const fields: DiaphragmModelCodeField[] = [
    { label: "产品系列", code: guide.series, options: [[guide.series, guide.gasLiquid ? "气液混合隔膜泵" : guide.highPressure ? "高压液体隔膜泵" : "液体隔膜泵"]] },
    { label: "工作电压", code: "24", separatorBefore: true, options: [["24", "DC 24 V"], ["12", "DC 12 V"]], note: guide.gasLiquid ? "当前标准选型为 24 V 无刷配置；编码中的其他电压不代表已有对应标准型号。" : "12 V 与 24 V 分别对应不同供电配置。" },
    { label: "电机类型", code: motor, options: [
      ["D", "直流有刷电机"], ["B", "直流无刷电机"], ["C", "空心杯电机"],
      ...(withWireCode ? [["BP", "直流无刷电机（外接 PWM）"] as const] : []),
    ], note: guide.gasLiquid ? "当前标准选型采用 B；其他电机代码的供货配置另行确认。" : "当前标准选型包含 D、B；其他电机代码的供货配置另行确认。" },
    ...(withWireCode ? [{ label: "出线方式", code: "2", options: [["3", "3 线"], ["5", "5 线"], ["2", "2 线，默认省略"]] as const, note: "线数与每根线的功能分别核对，接线定义见下方电机与控制说明。" }] : []),
    { label: "连接方式", code: connection, options: [["B", "倒刺端口"], ["S", "螺纹端口"]], note: guide.highPressure ? "当前 DPL30H 标准型号使用 S，配套卡套接头连接 6×4 mm（外径×内径）硬管。" : guide.gasLiquid ? "当前 DPGL800 标准型号使用 S，接口为 G1/8 内螺纹。" : `当前 ${guide.series} 标准型号使用 B，接内径 3.2 mm 软管。` },
    { label: "连接口方向", code: direction, options: [["3", "向右"], ["6", "向下"], ["9", "向左"], ["C", "向上，默认可省略"]], note: "方向代码按所选型号图纸识别；已有完整型号中保留的方向标识仍应一并核对。" },
    { label: "膜阀片／泵头材质", code: "EP/PS", separatorBefore: true, options: [["EP/PS", "EPDM 膜片＋EPDM 阀片＋PPS 泵头"], ["FF/PS", "PTFE 膜片＋FFKM 阀片＋PPS 泵头"]], note: "材料组合分别对应膜片、阀片和泵头，不把 FF/PS 理解为整泵均采用同一种材料。" },
    { label: "特殊定制", code: "X", separatorBefore: true, options: [["X", "自定义代号"]], note: "有特殊定制时按确认代号追加；示意中的 X 不直接作为标准型号后缀填写。" },
  ];
  const description = `${guide.series}，DC 24 V，${motor === "B" ? "直流无刷" : "直流有刷"}电机，${withWireCode ? "两线供电、倒刺端口朝上" : guide.gasLiquid ? "螺纹端口朝下" : "S 型连接、接口朝上"}，EPDM 膜片＋EPDM 阀片＋PPS 泵头。`;
  const omitted = withWireCode ? "出线方式 2 和连接口方向 C 为默认项，可在完整型号中省略；因此示意中的电机、出线和接口字段在实际型号里可能连续书写。" : "该系列编码不单列出线数量；连接口方向 C 为向上默认项，可省略，具体线束和控制功能另行确定。";
  return { fields, example, description, omitted };
}
