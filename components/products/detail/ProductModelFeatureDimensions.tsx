"use client";

import { createElement, useEffect, useId, useMemo, useRef, useState, type RefObject } from "react";
import measured from "@/public/models/products/fittings/local-test/443-01-00063-measurements.json";
import styles from "./ProductModelDimensions.module.css";

type Point = readonly [number, number, number];
type ScreenPoint = { x: number; y: number };
type Group = "all" | "overall" | "ports" | "detail";
type Feature = {
  id: string; zh: string; en: string; value: string; group: Exclude<Group, "all">;
  points: Point[]; anchor: number; witnesses: number[][]; dimensions: number[][]; curve?: number[];
  labelAnchors?: number[];
};
export type DimensionModelElement = HTMLElement & {
  queryHotspot(name: string): { canvasPosition: ScreenPoint } | null;
  cameraOrbit: string;
  cameraTarget: string;
  jumpCameraToGoal(): void;
  zoom(keyPresses: number): void;
};
const format = (value: number) => value.toFixed(2);
export const FITTING_DIMENSION_ORBIT = "30deg 35deg 125%";
export const FITTING_DIMENSION_TARGET = "-0.00115m 0.0006m -0.0054m";

function linear(id: string, zh: string, en: string, value: number, a: Point, b: Point, offset: Point): Feature {
  const shifted = (p: Point): Point => [p[0] + offset[0], p[1] + offset[1], p[2] + offset[2]];
  const c = shifted(a); const d = shifted(b);
  return { id, zh, en, value: `${format(value)} mm`, group: "overall", points: [a, b, c, d, [(c[0] + d[0]) / 2, (c[1] + d[1]) / 2, (c[2] + d[2]) / 2]],
    anchor: 4, witnesses: [[0, 2], [1, 3]], dimensions: [[2, 3]] };
}
function diameter(id: string, zh: string, en: string, value: number, z: number): Feature {
  const radius = value / 2;
  const points: Point[] = [[radius, 0, z], [-radius, 0, z]];
  for (let i = 0; i <= 32; ++i) points.push([radius * Math.cos(i * Math.PI / 16), radius * Math.sin(i * Math.PI / 16), z]);
  return { id, zh, en, value: `3× ⌀${format(value)} mm`, group: "ports", points, anchor: 0, witnesses: [], dimensions: [[0, 1]], curve: points.slice(2).map((_, i) => i + 2) };
}
function radius(id: string, zh: string, en: string, value: number, center: Point, sign: number): Feature {
  const points: Point[] = [center];
  for (let i = 0; i <= 16; ++i) {
    const angle = i * Math.PI / 32;
    points.push([center[0] + sign * value * Math.cos(angle), center[1], center[2] + sign * value * Math.sin(angle)]);
  }
  return { id, zh, en, value: `3× R${format(value)} mm`, group: "detail", points, anchor: 9, witnesses: [], dimensions: [[0, 9]], curve: points.slice(1).map((_, i) => i + 1) };
}

// Anchors use this verified STEP part's original millimeter coordinates. Values
// and feature provenance come from the CAD measurement extraction, not the SKU.
const angle = measured.barbAngle * Math.PI / 180;
const anglePoints: Point[] = [[1, 0, -9], [1, 0, -9.7], [1 - 0.7 * Math.tan(angle), 0, -9.7]];
for (let i = 0; i <= 16; ++i) anglePoints.push([1 - 0.5 * Math.sin(angle * i / 16), 0, -9 - 0.5 * Math.cos(angle * i / 16)]);
const centerDimension = linear("half", "中心至各端面", "Center to each end", measured.centerToEnd, [0, 0, -5.4], [0, 0, 0], [2.1, 0.9, 0]);
const branchDimension = linear("branch", "", "", measured.branchCenterToEnd, [0, 0, -5.4], [-5.4, 0, -5.4], [0, 0.9, 1.7]);
centerDimension.points.push(...branchDimension.points);
centerDimension.witnesses.push(...branchDimension.witnesses.map(segment => segment.map(i => i + 5)));
centerDimension.dimensions.push(...branchDimension.dimensions.map(segment => segment.map(i => i + 5)));
const FEATURES: Feature[] = [
  linear("length", "两端总长", "Overall length", measured.overallLength, [0, 0, -10.8], [0, 0, 0], [3.1, 0.9, 0]),
  linear("span", "支路外形总长", "Branch span", measured.overallBranchSpan, [-5.4, 0, -5.4], [1.4, 0, -5.4], [0, 0.9, -2.2]),
  centerDimension,
  linear("hose", "端面至根部圆角", "End to root fillet", measured.hoseEndToFillet, [0.9, 0, 0], [0.9, 0, -3.5], [-3, 0.9, 0]),
  diameter("bore", "流道孔径", "Bore diameter", measured.boreDiameter, 0),
  diameter("tip", "端部直管外径", "Tip diameter", measured.tipDiameter, -10.1),
  diameter("barb", "倒刺峰值外径", "Barb diameter", measured.barbDiameter, -9),
  diameter("shank", "接管段外径", "Shank diameter", measured.shankDiameter, -2.6),
  { ...diameter("body", "主体外径", "Body diameter", measured.bodyDiameter, -6.6), value: `⌀${format(measured.bodyDiameter)} mm` },
  radius("root", "根部圆角", "Root fillet", measured.shoulderRadius, [1.4, 0, -3.5], -1),
  radius("lip", "端部圆角", "Tip fillet", measured.lipRadius, [0.7, 0, -0.1], 1),
  { id: "angle", zh: "倒刺锥面半角", en: "Barb taper half-angle", value: `3× ${format(measured.barbAngle)}°`, group: "detail",
    points: anglePoints, anchor: 11, witnesses: [[0, 1], [0, 2]], dimensions: [], curve: anglePoints.slice(3).map((_, i) => i + 3) },
];

// Keep the annotations next to the actual CAD features, in model coordinates.
// The branch has the same verified shank and lip geometry (#1483 / #2306).
const shankFeature = FEATURES.find(feature => feature.id === "shank")!;
shankFeature.points = shankFeature.points.map(point => [-2.8, point[1], measured.centerZ + point[0]]);
const lipFeature = FEATURES.find(feature => feature.id === "lip")!;
lipFeature.points = lipFeature.points.map(point => [-5.4 - point[2], point[1], measured.centerZ + point[0]]);
FEATURES.find(feature => feature.id === "body")!.anchor = 10;
const labelPositions: Record<string, Point> = {
  bore: [1.25, 0.9, -0.3], tip: [1.4, 0.9, -10.1], barb: [1.65, 0.4, -8.8],
  shank: [-2.8, 0.95, -4.1], body: [0, 2, -6.6], root: [1.65, 1, -4.3],
  lip: [-5.6, 0.5, -4.4], angle: [0.2, 1, -9.2],
};
FEATURES.forEach(feature => {
  if (feature.group === "overall") {
    feature.labelAnchors = feature.id === "half" ? [4, 9] : [4];
  } else {
    feature.labelAnchors = [feature.points.length];
    feature.points.push(labelPositions[feature.id]);
  }
});
const labelKey = (feature: Feature, index: number) => `${feature.id}-${index}`;
const displayValue = (feature: Feature) => feature.value.replace(/ mm$/, "").replace(/^3×\s*/, "");

export function hasFittingFeatureDimensions(modelUrl?: string) {
  return (modelUrl || "").split(/[?#]/)[0] === "/models/products/fittings/local-test/443-01-00063.stp";
}
export function fittingFeatureHotspots() {
  return FEATURES.flatMap(feature => feature.points.map((point, i) => createElement("span", {
    key: `${feature.id}-${i}`, slot: `hotspot-feature-${feature.id}-${i}`,
    "data-position": point.map(value => `${value / 1000}m`).join(" "), "data-normal": "0 1 0",
    className: styles.anchor, "aria-hidden": true,
  })));
}

export default function ProductModelFeatureDimensions({ modelRef, locale, isActive }: {
  modelRef: RefObject<DimensionModelElement | null>; locale: "zh" | "en"; isActive: boolean;
}) {
  const [group, setGroup] = useState<Group>("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const labelRefs = useRef(new Map<string, HTMLButtonElement>());
  const geometryRefs = useRef(new Map<string, SVGGElement>());
  const markerId = `feature-${useId().replace(/:/g, "")}`;
  const en = locale === "en";
  const features = useMemo(() => FEATURES.filter(feature => group === "all" || feature.group === group), [group]);

  useEffect(() => {
    const model = modelRef.current;
    if (!model || !isActive || !visible) return;
    let frame = 0; let lastTime = 0; let lastProjection = "";
    const path = (points: ScreenPoint[], indexes: number[]) => indexes.map((index, i) => `${i ? "L" : "M"}${points[index].x.toFixed(1)},${points[index].y.toFixed(1)}`).join("");
    const update = (time: number) => {
      frame = requestAnimationFrame(update);
      if (time - lastTime < 32) return;
      lastTime = time;
      const width = model.clientWidth; const height = model.clientHeight;
      const projected = features.map(feature => ({ feature, points: feature.points.map((_, i) => model.queryHotspot(`hotspot-feature-${feature.id}-${i}`)?.canvasPosition) }))
        .filter(item => item.points.every(point => point && Number.isFinite(point.x) && Number.isFinite(point.y))) as { feature: Feature; points: ScreenPoint[] }[];
      const signature = `${width},${height},${projected.map(item => item.points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(";")).join("|")}`;
      if (!projected.length || signature === lastProjection) return;
      lastProjection = signature;
      svgRef.current?.setAttribute("viewBox", `0 0 ${width} ${height}`);
      const placed: { x: number; y: number; width: number; height: number }[] = [];
      projected.forEach(({ feature, points }) => {
        const geometry = geometryRefs.current.get(feature.id);
        if (!geometry) return;
        geometry.querySelector("[data-witness]")?.setAttribute("d", feature.witnesses.map(indexes => path(points, indexes)).join(""));
        geometry.querySelector("[data-dimension]")?.setAttribute("d", feature.dimensions.map(indexes => path(points, indexes)).join(""));
        if (feature.curve) geometry.querySelector("[data-curve]")?.setAttribute("d", path(points, feature.curve));
        const anchor = points[feature.anchor];
        const dot = geometry.querySelector("circle"); dot?.setAttribute("cx", String(anchor.x)); dot?.setAttribute("cy", String(anchor.y));
        (feature.labelAnchors || []).forEach((pointIndex, labelIndex) => {
          const label = labelRefs.current.get(labelKey(feature, pointIndex));
          if (!label) return;
          const location = points[pointIndex];
          const segment = feature.dimensions[labelIndex];
          let rotation = 0;
          if (feature.group === "overall" && segment) {
            const a = points[segment[0]]; const b = points[segment[1]];
            rotation = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
            if (rotation > 90) rotation -= 180;
            if (rotation < -90) rotation += 180;
          }
          const radians = rotation * Math.PI / 180;
          const boxWidth = Math.abs(label.offsetWidth * Math.cos(radians)) + Math.abs(label.offsetHeight * Math.sin(radians));
          const boxHeight = Math.abs(label.offsetHeight * Math.cos(radians)) + Math.abs(label.offsetWidth * Math.sin(radians));
          // Resolve only local text collisions; never move annotations into rails
          // or sort them into screen-space columns. The maximum nudge is 28 px.
          const candidates = [[0, 0], [0, -18], [0, 18], [-20, 0], [20, 0], [-20, -18], [20, -18], [-20, 18], [20, 18]];
          const scored = candidates.map(([dx, dy]) => {
            const rect = { x: location.x + dx - boxWidth / 2, y: location.y + dy - boxHeight / 2, width: boxWidth, height: boxHeight };
            const overlap = placed.reduce((sum, previous) => sum + Math.max(0, Math.min(rect.x + rect.width + 3, previous.x + previous.width) - Math.max(rect.x - 3, previous.x)) * Math.max(0, Math.min(rect.y + rect.height + 3, previous.y + previous.height) - Math.max(rect.y - 3, previous.y)), 0);
            return { dx, dy, rect, cost: overlap * 100 + Math.hypot(dx, dy) };
          }).sort((a, b) => a.cost - b.cost);
          const chosen = scored[0]; placed.push(chosen.rect);
          const x = location.x + chosen.dx; const y = location.y + chosen.dy;
          label.style.left = `${x}px`; label.style.top = `${y}px`;
          label.style.setProperty("--dimension-angle", `${rotation}deg`);
          label.dataset.projectedX = String(location.x); label.dataset.projectedY = String(location.y);
          if (labelIndex === 0) {
            const dx = anchor.x - x; const dy = anchor.y - y;
            const ratio = Math.max(Math.abs(dx) / (boxWidth / 2 + 2), Math.abs(dy) / (boxHeight / 2 + 2));
            geometry.querySelector("[data-leader]")?.setAttribute("d", ratio > 1 ? `M${anchor.x.toFixed(1)},${anchor.y.toFixed(1)}L${(x + dx / ratio).toFixed(1)},${(y + dy / ratio).toFixed(1)}` : "");
          }
        });
      });
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [modelRef, group, isActive, visible, en, features]);

  return <>
    <div className={styles.featureControls}>
      <div className={styles.featureGroups} role="group" aria-label={en ? "Dimension groups" : "尺寸分组"}>
        {([ ["all", en ? "All dimensions" : "全部尺寸"], ["overall", en ? "Lengths" : "长度"], ["ports", en ? "Diameters" : "孔径 / 外径"], ["detail", en ? "Fillets / angle" : "圆角 / 角度"] ] as [Group, string][]).map(([key, title]) =>
          <button type="button" key={key} aria-pressed={visible && group === key} className={`${styles.featureGroup} ${visible && group === key ? styles.featureGroupSelected : ""}`} onClick={() => { setVisible(true); setGroup(key); setSelected(null); }}>{title}</button>)}
      </div>
      <div className={styles.featureActions}>
        <button type="button" className={styles.featureGroup} aria-label={en ? "Zoom in model" : "放大模型"} onClick={() => modelRef.current?.zoom(2)}>+</button>
        <button type="button" className={styles.featureGroup} aria-label={en ? "Zoom out model" : "缩小模型"} onClick={() => modelRef.current?.zoom(-2)}>−</button>
        <button type="button" className={styles.featureGroup} onClick={() => { const model = modelRef.current; if (model) { model.cameraTarget = FITTING_DIMENSION_TARGET; model.cameraOrbit = FITTING_DIMENSION_ORBIT; model.jumpCameraToGoal(); } }}>{en ? "Reset view" : "重置视角"}</button>
        <button type="button" className={styles.featureGroup} aria-pressed={visible} onClick={() => setVisible(value => !value)}>{visible ? (en ? "Hide" : "隐藏尺寸") : (en ? "Show" : "显示尺寸")}</button>
      </div>
    </div>
    {visible && <>
      <svg ref={svgRef} className={styles.overlay} aria-hidden="true" data-feature-dimension-lines="true">
        <defs><marker id={markerId} viewBox="0 0 6 6" refX="0" refY="3" markerWidth="6" markerHeight="6" orient="auto-start-reverse" markerUnits="userSpaceOnUse"><path d="M0 3L6 0L6 6Z" fill="currentColor" /></marker></defs>
        {features.map(feature => <g key={feature.id} ref={element => { if (element) geometryRefs.current.set(feature.id, element); else geometryRefs.current.delete(feature.id); }} className={`${styles.featureGeometry} ${selected === feature.id ? styles.featureSelected : ""} ${selected && selected !== feature.id ? styles.featureMuted : ""}`}>
          <path data-leader className={styles.featureLeader} />
          <path data-witness className={styles.featureWitness} />
          <path data-dimension className={styles.featureMeasure} markerStart={feature.group === "detail" ? undefined : `url(#${markerId})`} markerEnd={`url(#${markerId})`} />
          {feature.curve && <path data-curve className={feature.group === "detail" || selected === feature.id ? styles.featureCurve : styles.featureCurveHidden} />}
          {feature.group !== "overall" && <circle r={selected === feature.id ? 3 : 1.5} />}
        </g>)}
      </svg>
      {features.flatMap(feature => (feature.labelAnchors || []).map(index => <button key={labelKey(feature, index)} ref={element => { if (element) labelRefs.current.set(labelKey(feature, index), element); else labelRefs.current.delete(labelKey(feature, index)); }} type="button"
        className={`${styles.featureLabel} ${selected === feature.id ? styles.featureLabelSelected : ""}`} data-model-feature={feature.id} aria-pressed={selected === feature.id}
        aria-label={`${en ? feature.en : feature.zh} ${feature.value}`} title={`${en ? feature.en : feature.zh} · ${feature.value}`}
        onClick={() => setSelected(value => value === feature.id ? null : feature.id)}>
        {displayValue(feature)}
      </button>))}
    </>}
    <div className={styles.featureHint}>{en ? "Drag to rotate · scroll to zoom · click a dimension to highlight" : "拖动旋转 · 滚轮缩放 · 点击尺寸高亮对应部位"}</div>
  </>;
}
