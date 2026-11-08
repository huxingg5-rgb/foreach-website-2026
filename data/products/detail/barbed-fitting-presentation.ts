export type BarbedDetail = {
  model?: string;
  foreachModel?: string;
  slug?: string;
  name?: string;
  mainImage?: string | null;
  image?: string | null;
  additionalImages?: unknown[];
  specs?: { label?: string; value?: unknown }[];
};

export const barbedStructures: Record<string, { name: string; task: string; use: string; ports: number }> = {
  BA: { name: "直通型", task: "软管直线对接", use: "沿直线连接两段软管；等径型号用于同规格管路对接，异径型号用于管径过渡。", ports: 2 },
  BL: { name: "L 型", task: "转角位置连接", use: "改变出管方向，适应设备内部转角位置；选型时留出接头本体及软管弯曲空间。", ports: 2 },
  BT: { name: "T 型", task: "主路与侧支路连接", use: "连接主通路与侧支路，按图纸确认三个接管端的位置和各端软管尺寸。", ports: 3 },
  BY: { name: "Y 型", task: "Y 形支路布置", use: "按 Y 形走向连接三路软管，结合分支位置和实际流向安排管路。", ports: 3 },
  BX4: { name: "十字型", task: "四向软管连接", use: "连接四个方向的软管，按设备布局预留各端插装、弯曲和支撑空间。", ports: 4 },
  BF4: { name: "π 型", task: "多支路软管连接", use: "通过 π 形本体布置四路软管，按结构图确认每个端口的位置。", ports: 4 },
  BBL: { name: "倒刺堵头", task: "软管端部封堵", use: "插入匹配的软管端部形成封堵，用于需要关闭的管端；该零件没有贯通流道。", ports: 1 },
};

export function getBarbedFittingPresentation(data: BarbedDetail) {
  const model = String(data.model || data.foreachModel || data.slug || "").toUpperCase();
  const segments = model.split("-");
  const family = segments[0];
  const structure = barbedStructures[family];
  const specs = data.specs || [];
  const spec = (label: string) => String(specs.find(item => item.label === label)?.value || "");
  const tubeSpecs = specs.filter(item => /^接管内径\d*$/.test(item.label || ""))
    .sort((a, b) => Number(a.label?.match(/\d+$/)?.[0] || 0) - Number(b.label?.match(/\d+$/)?.[0] || 0));
  const tubeCodes = segments.slice(1, -2);
  const material = spec("材质") || segments.at(-2) || "";
  const color = spec("颜色") || segments.at(-1) || "";
  const isPlug = family === "BBL";
  const isBranch = (structure?.ports || 0) > 2;
  const isReducing = new Set(tubeSpecs.map(item => String(item.value))).size > 1;
  // A02 catalogue p.32 confirms these BX4/BF4 codes omit D. No universal default.
  const catalogueDefaultD = /^(BX4|BF4)-(16|24|32)-PP-N$/.test(model);
  const suffixFor = (code: string) => code.match(/[A-Z]+$/)?.[0] || "";
  const profileFor = (code: string) => {
    const suffix = suffixFor(code);
    return /^[CFDVX]$/.test(suffix) ? suffix : !suffix && catalogueDefaultD ? "D" : "";
  };
  const currentProfiles = [...new Set(tubeCodes.map(profileFor).filter(Boolean))];
  const hasUnspecifiedProfile = tubeCodes.some(code => !suffixFor(code) && !profileFor(code));
  const otherCodes = [...new Set(tubeCodes.filter(code => suffixFor(code) && !profileFor(code)))];
  const tubing = tubeSpecs.length === 1
    ? `${isPlug ? "封堵端" : `${structure?.ports || "各"}个接管端`}适配 ${tubeSpecs[0].value} 内径软管`
    : `各端分别适配 ${tubeSpecs.map(item => item.value).join(" / ")} 内径软管`;
  return { model, segments, family, structure, spec, tubeSpecs, tubeCodes, material, color,
    isPlug, isBranch, isReducing, profileFor, suffixFor, currentProfiles, hasUnspecifiedProfile, otherCodes, tubing };
}
