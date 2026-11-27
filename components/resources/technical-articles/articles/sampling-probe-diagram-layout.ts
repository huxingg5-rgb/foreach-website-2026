export type SamplingProbeDiagramKind = "dimensions" | "tips";

export type SamplingProbeLabelBox = readonly [
  x: number,
  y: number,
  width: number,
  height: number,
  fontSize: number,
  tone?: "title" | "muted" | "accent" | "strong",
  align?: "left" | "center" | "right",
  background?: string,
];

const dimensions = {
  assemblyTitle: [125, 100, 1112, 62, 42, "title"],
  notToScale: [125, 173, 1100, 45, 30, "muted"],
  holder: [729, 280, 500, 47, 31, "muted"],
  datum: [756, 341, 478, 43, 30, "title"],
  highLevel: [808, 515, 432, 41, 30],
  workingLength: [102, 818, 253, 55, 31, "strong", "right"],
  liquid: [70, 1053, 272, 55, 29, "muted", "right"],
  lowLevel: [808, 1133, 430, 43, 30],
  port: [808, 1216, 440, 44, 28, "accent"],
  clearance: [808, 1372, 430, 44, 30, "accent"],
  bottom: [808, 1425, 430, 43, 30, "muted"],
  crossSection: [1326, 100, 1120, 63, 39, "title"],
  bore: [1620, 450, 176, 50, 26, undefined, "center", "#fcfdff"],
  outside: [1518, 707, 381, 48, 30, "muted", "center"],
  wallFormula: [1998, 373, 410, 42, 28, "accent", "left", "#fff7f2"],
  wallRole: [1998, 424, 414, 53, 26, undefined, "left", "#fff7f2"],
  enlargement: [1998, 479, 414, 39, 25, "muted", "left", "#fff7f2"],
  segmentsTitle: [1326, 942, 1120, 62, 39, "title"],
  deltaSegment: [1548, 1059, 738, 59, 28, undefined, "left", "#e4eef8"],
  sideSegment: [1548, 1170, 738, 59, 28, undefined, "left", "#dce9f9"],
  bottomSegment: [1548, 1281, 738, 63, 27, undefined, "left", "#d3e2f5"],
  lengthFormula: [1470, 1424, 897, 80, 40, "title", "center", "#f3f6fb"],
  overall: [1326, 1558, 1120, 48, 27, "muted"],
} as const satisfies Record<string, SamplingProbeLabelBox>;

const tips = {
  pointed: [156, 22, 540, 62, 40, "title", "center"],
  flat: [731, 22, 540, 62, 40, "title", "center"],
  vNotched: [1307, 22, 540, 62, 40, "title", "center"],
  sidePort: [1884, 22, 540, 62, 40, "title", "center"],
  bottom: [125, 1008, 500, 36, 27, "muted"],
  pointedUse: [156, 1038, 540, 65, 28, "strong", "center"],
  flatUse: [731, 1038, 540, 65, 28, "strong", "center"],
  vNotchedUse: [1307, 1038, 540, 65, 28, "strong", "center"],
  sidePortUse: [1884, 1038, 540, 65, 28, "strong", "center"],
  pointedNote: [156, 1103, 540, 62, 27, "muted", "center"],
  flatNote: [731, 1103, 540, 62, 27, "muted", "center"],
  vNotchedNote: [1307, 1103, 540, 62, 27, "muted", "center"],
  sidePortNote: [1884, 1103, 540, 62, 27, "muted", "center"],
  geometryNote: [125, 1258, 2285, 60, 29, "muted"],
  comparisonNote: [125, 1321, 2285, 47, 29, "muted"],
} as const satisfies Record<string, SamplingProbeLabelBox>;

export const samplingProbeLabelLayouts = { dimensions, tips };
