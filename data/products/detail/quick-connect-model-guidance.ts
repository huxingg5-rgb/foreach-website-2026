import { quickConnectFittingSelectionProducts } from "@/data/products/selection/quick-connect-fitting-selection.generated";
import { isPublishedFittingProduct } from "@/data/products/selection/fitting-publication.generated";
import { copy as pressureCopy } from "@/data/resources/technical-articles/instrument-fluidics/quick-disconnect-coupling-pressure-rating.zh";
import { getQuickConnectDrawingHref } from "./quick-connect-drawing-assets";

export type QuickConnectRow = (typeof quickConnectFittingSelectionProducts)[number];
export type QuickConnectSeries = "Q20" | "Q40" | "Q60";

// Installation evidence: A02 CN, PDF pages 65, 71 and 77 (printed 64, 70, 76).
// Q40 drawings differ from the overview in thread designation and nut flats:
// retain the verified diameter/pitch here; use each model's drawing for hardware.
export const QUICK_CONNECT_SERIES = {
  Q20: { bore: '1/8″', tubeRange: "1.6–6.4 mm", cutout: "D 形孔（单边平面）", diameter: "Ø13（+0/−0.3）mm，即 12.7–13.0 mm", height: "12.1（+0/−0.1）mm，即 12.0–12.1 mm", thread: "1/2-24 UNS", panelMax: { P: 3.3, S: 8.5 }, curveHeight: 1205 },
  Q40: { bore: '1/4″', tubeRange: "6.4–9.5 mm", cutout: "D 形孔（单边平面）", diameter: "Ø18（+0/−0.5）mm，即 17.5–18.0 mm", height: "17（+0/−0.3）mm，即 16.7–17.0 mm", thread: "11/16-24", panelMax: { P: 5.5, S: 11.5 }, curveHeight: 1360 },
  Q60: { bore: '3/8″', tubeRange: "9.5–19.0 mm", cutout: "圆孔", diameter: "Ø31（+0/−0.5）mm，即 30.5–31.0 mm", height: null, thread: "M30×3.5", panelMax: { P: null, S: 7.5 }, curveHeight: 1260 },
} as const;

const publishedRows = quickConnectFittingSelectionProducts.filter(isPublishedFittingProduct);
const ratingTable = pressureCopy.sections[0].blocks.find(block => block.type === "table");
const ratings = ratingTable?.type === "table" ? ratingTable.rows : [];

export function getQuickConnectRow(model: string) {
  return publishedRows.find(row => row.foreachModel === model.trim().toUpperCase());
}

export function getQuickConnectFamilyRows(series: string) {
  return publishedRows.filter(row => row.series === series);
}

export function getQuickConnectModelGuidance(model: string) {
  const row = getQuickConnectRow(model);
  if (!row?.series || !(row.series in QUICK_CONNECT_SERIES)) return undefined;
  const series = row.series as QuickConnectSeries;
  const family = QUICK_CONNECT_SERIES[series];
  const rating = ratings.find(r => r[0] === series && r[1] === `${row.housingMaterial} / ${row.sealingRingMaterial}`);
  const panelMax = row.panelCode === "M" ? family.panelMax[row.genderCode === "P" ? "P" : "S"] : null;
  return {
    row, series, family, panelMax,
    isMale: row.genderCode === "P", isValved: row.valvedCode === "V",
    isPanel: row.panelCode === "M", isElbow: row.shapeCode === "L",
    isThread: /NPT/i.test(row.tubeOrThread),
    mateRole: row.genderCode === "P" ? "母端" : "公端",
    pressure: rating?.[2] || "按本型号确认",
    temperature: rating?.[3] || "按本型号确认",
    drawingHref: getQuickConnectDrawingHref(row.foreachModel),
    cutoutImage: `/images/products/fittings/quick-connect-fittings/${series.toLowerCase()}/${series.toLowerCase()}-panel-cutout-dimensions.webp`,
  };
}

export type QuickConnectGuidance = NonNullable<ReturnType<typeof getQuickConnectModelGuidance>>;

export function describeQuickConnectInterface(row: QuickConnectRow) {
  return /NPT/i.test(row.tubeOrThread) ? `${row.tubeOrThread} 外螺纹` : `${row.tubeOrThread} 内径软管`;
}

export function describeQuickConnectInstallation(row: QuickConnectRow) {
  const g = getQuickConnectModelGuidance(row.foreachModel);
  if (!g) return "按对应零件图确认安装尺寸。";
  if (g.isPanel && g.panelMax !== null) return `${g.series} ${row.gender}穿板：板厚 ≤${g.panelMax} mm，${g.family.cutout}，${g.family.diameter.split("，")[0]}${g.family.height ? `；孔高 ${g.family.height.split("，")[0]}` : ""}。`;
  if (g.isThread) return `${row.tubeOrThread} 为液路连接螺纹，需匹配设备的 NPT 内螺纹接口。`;
  return `非穿板${g.isElbow ? " L 型" : "直通"}：接 ${row.tubeOrThread} 内径软管，预留${g.isElbow ? "转弯与" : ""}插拔空间。`;
}

export function describeQuickConnectValvePair(baseModel: string, mateModel: string) {
  const base = getQuickConnectRow(baseModel), mate = getQuickConnectRow(mateModel);
  if (!base || !mate || base.series !== mate.series || base.genderCode === mate.genderCode) return "";
  const male = base.genderCode === "P" ? base : mate;
  const female = base.genderCode === "S" ? base : mate;
  if (male.valvedCode === "V" && female.valvedCode === "V") return "两端带阀：断开后公端、母端两侧均自动关闭。";
  if (male.valvedCode === "V") return "仅公端带阀：断开后公端侧关闭，母端侧保持敞开。";
  if (female.valvedCode === "V") return "仅母端带阀：断开后母端侧关闭，公端侧保持敞开。";
  return "两端不带阀：断开后两侧流路均保持敞开，需另行控制液体。";
}

// Contrast actual published forms of the same gender, preferring otherwise matching specs.
export function getQuickConnectFormComparisons(row: QuickConnectRow) {
  const keys = ["panelCode", "shapeCode", "tubeCode"] as const;
  const labels = { panelCode: "安装结构对照", shapeCode: "布管方向对照", tubeCode: "管路接口对照" };
  const candidates = getQuickConnectFamilyRows(row.series || "").filter(r => r.genderCode === row.genderCode && r.foreachModel !== row.foreachModel);
  const used = new Set<string>();
  return keys.flatMap(key => {
    const candidate = candidates.filter(r => r[key] !== row[key] && !used.has(r.foreachModel))
      .sort((a, b) => {
        const score = (r: QuickConnectRow) =>
          (r.housingCode === row.housingCode ? 32 : 0) + (r.sealingCode === row.sealingCode ? 16 : 0) +
          (r.valvedCode === row.valvedCode ? 8 : 0) + (r.tubeCode === row.tubeCode ? 4 : 0) +
          (r.panelCode === row.panelCode ? 2 : 0) + (r.shapeCode === row.shapeCode ? 1 : 0);
        return score(b) - score(a) || a.foreachModel.localeCompare(b.foreachModel);
      })[0];
    if (!candidate) return [];
    used.add(candidate.foreachModel);
    return [{ row: candidate, label: labels[key] }];
  }).slice(0, 2);
}
