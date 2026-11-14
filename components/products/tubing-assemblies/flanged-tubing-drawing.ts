import { assemblyCompatibilityWarnings, describeFlangedEnd, endConnection, flangedTubingBom, normalizeFlangedChoice, validateFlangedChoice, type FlangedEnd, type FlangedTubingChoice } from "@/data/products/configurator/flanged-tubing";
import { assemblyAccessory, getAssemblyFitting, getAssemblyTube } from "@/data/products/configurator/tubing-assembly-catalog";
import { assemblyOriginalPdfView, assemblyVectorPaths, assemblyVectorStrokes, getAssemblyAccessoryVector, getAssemblyFittingVector, type AssemblyVectorPart } from "@/data/products/configurator/tubing-assembly-vectors";
import type { FlangedConfiguration } from "@/data/products/configurator/flanged-tubing-configurations";
import { assemblyText, assemblyHtmlLocale } from "@/data/products/configurator/tubing-assembly.intl";
import { protectAssemblyUserText } from "@/data/products/configurator/tubing-assembly-presentation";
import sourceParts from "@/data/products/configurator/flanged-vector-parts.json";

/** Original selection-sheet layout with exact HFL/HFL6 catalog part vectors. */
export type FlangedTemplateKey = "fl-double" | "fl-single" | "fl6-double" | "fl6-single" | "mixed-double" | "assembly";
function legacyDrawing(value: FlangedTubingChoice) {
  const v = normalizeFlangedChoice(value);
  return ["FEP", "PTFE", "PFA"].includes(getAssemblyTube(v.tubeModel)?.material || "") && [v.a, ...(v.mode === "double" ? [v.b] : [])].every(end => endConnection(end)==="翻边" && ["HFL", "HFL6"].includes(end.series));
}
const sourceKey = (end: FlangedEnd) => end.series === "HFL6" || end.series === "FL6" ? "FL6" : "FL";
export function getFlangedDrawingTemplate(choice: FlangedTubingChoice) {
  choice = normalizeFlangedChoice(choice);
  const single = choice.mode === "single";
  if (!legacyDrawing(choice)) return { key: "assembly" as FlangedTemplateKey, label: `${getAssemblyTube(choice.tubeModel)?.material} 管组件 · ${single ? "单端" : "双端"} · ${endConnection(choice.a)}${single ? "" : ` + ${endConnection(choice.b)}`}`, width: 1511, height: 1143, pageWidth: 776.88, pageHeight: 587.76 };
  const key: FlangedTemplateKey = single ? choice.a.series === "HFL6" ? "fl6-single" : "fl-single" : choice.a.series !== choice.b.series ? "mixed-double" : choice.a.series === "HFL6" ? "fl6-double" : "fl-double";
  const label = single ? `${choice.a.series} 系列管组件-单头` : choice.a.series === choice.b.series ? `${choice.a.series} 系列管组件-双头` : `${choice.a.series} & ${choice.b.series} 系列管组件-双头`;
  return { key, label, width: 1511, height: 1143, pageWidth: single ? 781.44 : 776.88, pageHeight: 587.76 };
}
const escape = (v: unknown) => String(v ?? "").replace(/[<>&"']/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[c]!);
const num = (v: number) => Number(v.toFixed(3));
function drawingRenderer(locale: string, restore: (text: string) => string) {
  type LocalizedText = { localizedText: string };
  const tr = (value: unknown) => {
    if (value && typeof value === "object" && "localizedText" in value) return String(value.localizedText);
    return restore(assemblyText(String(value ?? ""), locale));
  };
const textWidth = (v: string, size: number) => [...v].reduce((n, c) => n + size * (/\p{Script=Han}|\p{Script=Hangul}/u.test(c) ? 1 : .58), 0);
const measure = (v: string, size: number) => textWidth(tr(v), size);
const line = (x1: number, y1: number, x2: number, y2: number, w = 1) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#111" stroke-width="${w}"/>`;
const rect = (x: number, y: number, w: number, h: number, fill = "none", stroke = "#111", sw = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const path = (d: string, fill = "none", stroke = "#111", w = 1) => `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${w}"/>`;
const circle = (x: number, y: number, r: number, fill = "none") => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="#111" stroke-width="1"/>`;
function text(x: number, y: number, v: unknown, size = 14, anchor = "start", maxWidth?: number, fill = "#111", rotation = 0) {
  const value = tr(v), fontSize = maxWidth ? Math.min(size, maxWidth / Math.max(textWidth(value, 1), .001)) : size;
  return `<text x="${x}" y="${y}" font-family="Noto Sans CJK SC,Microsoft YaHei,Malgun Gothic,Arial,sans-serif" font-size="${fontSize}" text-anchor="${anchor}" fill="${fill}"${maxWidth ? ` data-max-width="${maxWidth}"` : ""}${rotation ? ` transform="rotate(${rotation} ${x} ${y})"` : ""}>${escape(value)}</text>`;
}
function fitted(x: number, y: number, value: string, width: number, size = 14, minSize = 10) {
  value = tr(value);
  let display = value;
  const fs = Math.max(minSize, Math.min(size, width / Math.max(textWidth(value, size), 1) * size));
  while (textWidth(display, fs) > width && display.length > 1) display = display.slice(0, -1);
  if (display !== value) display = `${display.slice(0, -1)}…`;
  return text(x, y, { localizedText: display }, fs, "start", width);
}
function wrap(value: string, width: number, size: number): LocalizedText[] {
  value = tr(value);
  const result: string[] = []; let current = "";
  const tokens = locale === "zh" ? [...value] : value.match(/[^\s]+[ \t]*|\n|[ \t]+/gu) || [];
  for (const token of tokens) {
    if (token === "\n" || textWidth(current + token, size) > width) { if (current) result.push(current.trimEnd()); current = ""; if (token === "\n") continue; }
    for (const char of token) { if (textWidth(current + char, size) > width) { result.push(current.trimEnd()); current = ""; } current += char; }
  }
  if (current) result.push(current); return result.map(localizedText => ({ localizedText }));
}
function checkbox(x: number, y: number, label: string, selected: boolean, size = 15) {
  return rect(x, y - 15, 20, 20, "#fff") + (selected ? path(`M${x + 3} ${y - 5}l5 6l10 -13`, "none", "#111", 1.8) : "") + text(x + 29, y + 1, label, size);
}
function radio(x: number, y: number, label: string, selected: boolean, size = 14) {
  return circle(x, y - 5, 7) + (selected ? circle(x, y - 5, 2.7, "#111") : "") + text(x + 13, y, label, size);
}
function part(n: number, x: number, y: number, leader: string, body: string) {
  return `<g data-callout-part="${n}">` + path(leader) + circle(x, y, 11.5, "#111") + text(x, y + 4, n, 13, "middle", undefined, "#fff") + body + "</g>";
}
/** Preview and PDF export use the same original side-view paths and strokes. */
function sourceView(source: AssemblyVectorPart, cx: number, cy: number, width: number, height: number, mirror: boolean, attributes: string, opaque = false) {
  const scale = Math.min(width / source.width, height / source.height), original = assemblyOriginalPdfView(source);
  const x = cx - source.width * scale / 2, y = cy - source.axisY * scale;
  const native = original ? ` data-original-pdf="${escape(original.url)}" data-source-bounds="${original.sourceBox.join(" ")}" data-original-bounds="${original.box.join(" ")}" data-original-placement="${[x - original.padding * scale, y - original.padding * scale, (source.width + original.padding * 2) * scale, (source.height + original.padding * 2) * scale].map(num).join(" ")}" data-original-mirror="${mirror}" data-original-opaque="${opaque}"` : "";
  const weights = assemblyVectorStrokes(source, width, height);
  return `<g ${attributes} data-source-file="${escape(source.source)}" data-source-kind="${source.source.endsWith(".pdf") ? "original-pdf-vector" : "exact-cad-projection"}"${native}>` +
    (opaque ? rect(x, y, source.width * scale, source.height * scale, "#fff", "none", 0) : "") +
    assemblyVectorPaths(source, cx, cy, width, height, mirror).map((d, i) => path(d, "none", "#111", weights[i])).join("") + "</g>";
}
/** Source aspect ratio and common tube axis are preserved. A is mirrored. */
function fitting(end: FlangedEnd, side: "a" | "b", axis: number) {
  const bounds = sourceParts[sourceKey(end)], origin = side === "a" ? 154 : 1200, direction = side === "a" ? 1 : -1;
  const source = getAssemblyFittingVector(end.fittingModel), cx = origin + direction * bounds.width / 2;
  if (!source) return text(cx, axis - 30, "该型号外形资料待补充", 14, "middle");
  return sourceView(source, cx, axis, bounds.width, bounds.height, side === "a", `data-assembly-part="${side === "a" ? 4 : 8}" data-source-series="${end.series}" data-source-model="${escape(end.fittingModel)}"`, true);
}
function fittingWasher(end: FlangedEnd, x: number, y: number, n: number, mirror: boolean) {
  const source = getAssemblyAccessoryVector(end.fittingModel, end.accessoryCode), accessory = assemblyAccessory(end.fittingModel, end.accessoryCode);
  return source ? sourceView(source, x, y, 22, 36, mirror, `data-assembly-part="${n}" data-accessory-model="${escape(accessory?.model)}"`) : "";
}
function washer(x: number, y: number, n: number) {
  return `<g data-assembly-part="${n}">` + rect(x - 3, y - 18, 6, 36, "#fff", "#111", 1.2) + line(x - 1, y - 18, x - 1, y + 18, .5) + "</g>";
}
function stop(x: number, y: number, kind: string, n: number) {
  if (kind === "无") return "";
  return `<g data-assembly-part="${n}">` + (kind === "O 型圈" ? rect(x - 3, y - 15, 6, 30, "#111") : rect(x - 9, y - 12, 18, 24, "#fff") + line(x - 6, y - 12, x - 6, y + 12, .5)) + "</g>";
}
function pipeLabel(x: number, y: number, label: string, n: number) {
  return `<g data-assembly-part="${n}">` + rect(x, y - 15, 86, 30, "#fff") + fitted(x + 5, y + 5, label, 76, 13, 9) + "</g>";
}
function assembly(v: FlangedTubingChoice) {
  const y = 540, single = v.mode === "single";
  let s = `<g data-assembly-part="1">` + rect(105, y - 7, 1140, 14, "#fff") + rect(103, y - 17, 4, 34, "#fff") + (single ? "" : rect(1243, y - 17, 4, 34, "#fff")) + "</g>";
  s += fittingWasher(v.a, 125, y, 2, true) + fitting(v.a, "a", y) + stop(315, y, v.a.stop, 3);
  if (v.labelA) s += pipeLabel(360, y, v.textA, 5);
  if (v.labelB) s += pipeLabel(895, y, v.textB, single ? 5 : 9);
  if (!single) s += fittingWasher(v.b, 1225, y, 6, false) + fitting(v.b, "b", y) + stop(1025, y, v.b.stop, 7);
  return `<g data-vector-assembly="true" data-mode="${v.mode}">${s}</g>`;
}
function fixedBom(v: FlangedTubingChoice) {
  const accessoryCode = (end: FlangedEnd) => {
    const accessory = assemblyAccessory(end.fittingModel, end.accessoryCode);
    return accessory?.productCodePending ? "" : accessory?.productCode || "";
  };
  if (!legacyDrawing(v)) return flangedTubingBom(v).map((r, i) => ({ n: i + 1, code: i === 0 ? getAssemblyTube(v.tubeModel)?.code || "" : r.part === "A 端接头" ? getAssemblyFitting(v.a.fittingModel)?.code || "" : r.part === "B 端接头" ? getAssemblyFitting(v.b.fittingModel)?.code || "" : r.part.startsWith("A 端") ? accessoryCode(v.a) : r.part.startsWith("B 端") ? accessoryCode(v.b) : "", specification: `${r.part}：${r.specification} ×${r.quantity}` }));
  const tube = getAssemblyTube(v.tubeModel)!;
  const fit = (e: FlangedEnd) => `${describeFlangedEnd(e)} ×1件`;
  const rows = [
    { n: 1, code: tube.code, specification: `${tube.material} 管 ID ${tube.inner} × OD ${tube.outer} · L ${v.length} ±${v.tolerance} mm ×1根` },
    { n: 2, code: v.a.accessoryCode || "", specification: `A 端 ${v.a.washer} 支撑垫片 ×1件` },
    { n: 3, code: "", specification: v.a.stop !== "无" ? `A 侧 ${v.a.stop} 限位 ×1件` : "" },
    { n: 4, code: getAssemblyFitting(v.a.fittingModel)?.code || "", specification: `A 端 ${fit(v.a)}` },
    { n: 5, code: "", specification: v.mode === "single" ? [v.labelA ? `A：${v.textA}` : "", v.labelB ? `B：${v.textB}` : ""].filter(Boolean).join("；") : v.labelA ? `A 侧管标：${v.textA}` : "" },
  ];
  if (v.mode === "double") rows.push(
    { n: 6, code: v.b.accessoryCode || "", specification: `B 端 ${v.b.washer} 支撑垫片 ×1件` },
    { n: 7, code: "", specification: v.b.stop !== "无" ? `B 侧 ${v.b.stop} 限位 ×1件` : "" },
    { n: 8, code: getAssemblyFitting(v.b.fittingModel)?.code || "", specification: `B 端 ${fit(v.b)}` },
    { n: 9, code: "", specification: v.labelB ? `B 侧管标：${v.textB}` : "" },
  );
  return rows;
}
function endCallouts(v: FlangedTubingChoice, side: "a" | "b") {
  const a = side === "a", e = v[side], wx = a ? 148 : locale === "zh" ? 1195 : 1160, wy = a ? 390 : 388;
  const source = sourceParts[sourceKey(e)], fittingBottom = 540 + source.height - source.axisY;
  let s = part(a ? 2 : 6, wx, wy, a ? "M148 402V453L125 502V518" : `M${wx} 400V459L1225 504V518`,
    checkbox(wx + 19, wy + 4, "垫片", true) + text(a ? 220 : 1045, wy + 37, `材质：${e.washer}`, 14));
  const sx = a ? 315 : 1010, sy = a ? 625 : 640;
  s += part(a ? 3 : 7, sx, sy, a ? "M315 613V558" : "M1010 628L1025 590V558",
    checkbox(sx + 19, sy + 4, "O 型圈", e.stop === "O 型圈") + checkbox(sx + 19, sy + 36, "硅胶管", e.stop === "硅胶管"));
  const fx = a ? 250 : 950, fy = a ? 722 : 758;
  s += part(a ? 4 : 8, fx, fy, a ? `M250 710V${fittingBottom + 3}` : `M950 746V704H1170V${fittingBottom + 20}L1100 ${fittingBottom + 3}`,
    checkbox(fx + 19, fy + 4, "接头：", true) + text(fx + 122, fy + 4, e.thread, 14) + text(fx + 49, fy + 36, `${a ? "A" : "B"} 端 ${e.series}`, 14));
  s += text(fx + 49, fy + 66, `材质：${e.material}`, 14) + text(fx + 49, fy + 96, `颜色：${e.color}`, 14);
  const enabled = a ? v.labelA : v.labelB, tx = a ? 420 : 850, ty = a ? 455 : 448;
  s += part(a ? 5 : 9, tx, ty, a ? "M420 467V504L403 522" : "M850 460V500L937 521",
    checkbox(tx + 20, ty + 4, "管标", enabled) + fitted(tx + 47, ty + 34, `文本：${enabled ? a ? v.textA : v.textB : ""}`, 187, 14));
  return `<g data-end="${side}" data-series="${e.series}">${s}</g>`;
}
function frame(record: FlangedConfiguration, page: number, total: number) {
  const v = record.choice, t = getFlangedDrawingTemplate(v), rows = fixedBom(v);
  let s = text(755, 65, "恒永达管组件选型表", 34, "middle") + rect(20, 102, 1470, 1023, "#fff", "#111", 1.5) + line(78, 102, 78, 1125) + line(1290, 102, 1290, 1125) + line(1410, 102, 1410, 1125);
  const international = locale !== "zh";
  const companyX = international ? 280 : 177, contactX = international ? 280 : 205, applicationX = international ? 1010 : 906;
  s += text(105, 145, "公司：", international ? 19 : 22) + line(companyX - 4, 150, 622, 150) + fitted(companyX, 143, v.company || "", 617 - companyX, 18);
  s += text(105, 193, "联系人：", international ? 19 : 22) + line(contactX - 4, 198, international ? 622 : 436, 198) + fitted(contactX, 191, v.contact || "", international ? 337 : 225, 18);
  s += text(780, 145, "应用机型：", international ? 19 : 22, "start", international ? 218 : undefined) + line(applicationX - 4, 150, 1260, 150) + fitted(applicationX, 143, v.application, 1253 - applicationX, 18);
  s += text(105, 240, page === 1 ? "请选择您需要的部件" : "配置补充说明", 23);
  s += text(1340, 590, locale === "zh" ? t.label.replaceAll(" ", "") : t.label, 26, "middle", 760, "#111", 90) + line(1290, 985, 1410, 985);
  const number = { "fl-double": "1-1", "fl-single": "1-2", "fl6-single": "1-3", "fl6-double": "1-4", "mixed-double": "1-5", assembly: "TA-01" }[t.key];
  s += text(1340, 1065, number, 28, "middle");
  const y = 880, h = 245, header = 27, rh = (h - header) / rows.length;
  s += rect(90, y, 610, h) + line(150, y, 150, y + h) + line(310, y, 310, y + h) + line(90, y + header, 700, y + header);
  s += text(120, y + 19, "序号#", 14, "middle") + text(230, y + 19, "物料编码", 14, "middle") + text(505, y + 19, "物料名称及规格", 14, "middle");
  rows.forEach((r, i) => {
    const top = y + header + i * rh, lines = legacyDrawing(v) ? null : wrap(r.specification, 374, 10).slice(0, 2);
    const specification = lines ? lines.map((value, j) => text(318, top + rh / 2 + (j - (lines.length - 1) / 2) * 11 + 3, value, 10)).join("") : fitted(318, top + rh / 2 + 4, r.specification, 374, 12, 9);
    s += `<g data-bom-part="${r.n}">` + line(90, top + rh, 700, top + rh) + text(120, top + rh / 2 + 4, r.n, 13, "middle") + fitted(158, top + rh / 2 + 4, r.code, 145, 12) + specification + "</g>";
  });
  s += rect(700, 907, 590, 218) + line(920, 907, 920, 1125) + line(770, 907, 770, 1082) + line(850, 907, 850, 1082);
  ["选型", "制图", "审核", "工程", "批准"].forEach((role, i) => { const top = 907 + i * 35; s += text(708, top + 22, role, 13, "start", 58) + line(700, top + 35, 920, top + 35); if (i === 0) s += fitted(777, top + 22, v.contact || "", 66, 12) + text(854, top + 12, "日期", 9) + fitted(854, top + 27, record.updatedAt.slice(0, 10), 62, 10); });
  s += text(708, 1110, `版本  R${record.revision}`, 15);
  s += text(930, 928, "Foreach 组件编码#", 13) + line(920, 966, 1290, 966) + text(930, 985, "组件名称", 13) + fitted(937, 1013, `${record.name} · ${getAssemblyTube(v.tubeModel)?.material} 管组件`, 340, 18);
  s += line(920, 1028, 1290, 1028) + text(930, 1047, "客户零件号#", 13) + fitted(937, 1073, v.customerPart || "", 338, 16) + line(920, 1088, 1290, 1088);
  s += text(930, 1112, "SCALE", 11) + text(1025, 1112, "NONE", 11) + line(1130, 1088, 1130, 1125) + text(1144, 1112, `SHEET ${page} OF ${total}`, 11);
  return s;
}
function buildSheets(record: FlangedConfiguration): string[] {
  record = { ...record, choice: normalizeFlangedChoice(record.choice) };
  const invalid = validateFlangedChoice(record.choice);
  if (invalid) throw new Error(invalid);
  if (!legacyDrawing(record.choice)) return buildAssemblySheets(record);
  const v = normalizeFlangedChoice(record.choice), current = { ...record, choice: v }, t = getFlangedDrawingTemplate(v);
  const tube = getAssemblyTube(v.tubeModel)!, single = v.mode === "single";
  let s = line(105, 280, 650, 280) + line(1075, 280, 1245, 280) + path("M105 280l10 -3v6Z M1245 280l-10 -3v6Z", "#111", "none", 0) + line(105, 260, 105, 515) + line(1245, 260, 1245, 515);
  s += part(1, 684, 281, "M684 296V530", radio(725, 251, "FEP 管", tube.material === "FEP", 17) + radio(970, 251, "PFA 管", tube.material === "PFA", 17) + radio(725, 283, "PTFE 管", tube.material === "PTFE", 17) + fitted(900, 283, `长度 L：${v.length} ±${v.tolerance} mm`, 340, 16));
  s += text(790, 321, `尺寸：ID ${tube.inner} × OD ${tube.outer} mm`, 17) + text(790, 356, "颜色：", 16) + radio(865, 356, "本色", tube.color !== "黑色", 16) + radio(locale === "zh" ? 959 : 1040, 356, "黑色", tube.color === "黑色", 16);
  s += assembly(v) + endCallouts(v, "a");
  if (!single) s += endCallouts(v, "b");
  else {
    s += part(5, 915, 448, "M915 460V502L937 521", checkbox(935, 452, "管标", v.labelB) + fitted(962, 482, `文本：${v.labelB ? v.textB : ""}`, 187, 14));
    s += path("M1230 550V620L1170 655") + text(1050, 677, "客户应用", 20);
    ["卡箍", "针", "其他"].forEach((label, i) => { s += checkbox(1070, 716 + i * 35, label, v.freeEnd === label); });
  }
  const details = [
    `配置名称：${record.name}   配置版本：R${record.revision}`, v.company ? `公司：${v.company}` : "", v.contact ? `联系人：${v.contact}` : "", v.application ? `应用机型：${v.application}` : "", v.customerPart ? `客户零件号：${v.customerPart}` : "",
    ...fixedBom(v).filter(row => row.specification).map(row => `部件 ${row.n}：${row.specification}`),
    single ? `B 端客户应用：${v.freeEnd}${v.freeEndNote ? `；${v.freeEndNote}` : ""}` : "", v.notes ? `特殊要求：${v.notes}` : "",
  ].filter(Boolean).flatMap(value => wrap(value, 1120, 16));
  const more = Boolean(fixedBom(v).some(row => measure(row.specification, 9) > 374) || v.notes || (single && v.freeEndNote) || measure(v.company || "", 16) > 440 || measure(v.contact || "", 16) > 225 || measure(v.application, 16) > 347 || measure(v.customerPart || "", 14) > 338 || measure(record.name, 16) > 260 || (v.labelA && measure(v.textA, 12) > 76) || (v.labelB && measure(v.textB, 12) > 76));
  const continuation = more ? Array.from({ length: Math.ceil(details.length / 23) }, (_, i) => details.slice(i * 23, (i + 1) * 23)) : [];
  const total = 1 + continuation.length;
  const shell = (content: string, page: number) => `<svg xmlns="http://www.w3.org/2000/svg" width="${t.pageWidth}pt" height="${t.pageHeight}pt" viewBox="0 0 1511 1143" role="img" lang="${assemblyHtmlLocale(locale)}" aria-label="${escape(tr(t.label))}" data-template-key="${t.key}" data-vector-drawing="true"><metadata>FOREACH HFL/HFL6 selection-sheet layout. FL/FL6 are customer-confirmed abbreviated series names. Exact catalog fitting and accessory vectors; installation lengths are diagrammatic.</metadata>${rect(0, 0, 1511, 1143, "#fff", "none", 0)}${frame(current, page, total)}${content}</svg>`;
  return [shell(s, 1), ...continuation.map((values, i) => shell(values.map((value, j) => text(110, 282 + j * 24, value, 16)).join(""), i + 2))];
}
/** Generic mixed-end selection sheet. Fitting paths come from each exact bore/
 * thread drawing; tube length is diagrammatic and its specified L is authoritative. */
function buildAssemblySheets(record: FlangedConfiguration): string[] {
  const v = normalizeFlangedChoice(record.choice), current = { ...record, choice: v }, tube = getAssemblyTube(v.tubeModel)!, rows = flangedTubingBom(v);
  const number = (partName: string) => rows.findIndex(r => r.part === partName) + 1;
  const y = 520;
  let s = line(105, 282, 1245, 282) + path("M105 282l10 -4v8Z M1245 282l-10 -4v8Z", "#111", "none", 0) + line(105, 260, 105, 500) + line(1245, 260, 1245, 500);
  s += rect(535, 259, 300, 39, "#fff", "none", 0) + text(685, 285, `L = ${v.length} ±${v.tolerance} mm`, 22, "middle");
  s += text(685, 334, `${tube.material} · ${tube.color} · ID ${tube.inner} × OD ${tube.outer} mm`, 21, "middle") + text(685, 364, `${tube.model}${tube.hardness ? ` · ${tube.hardness}` : ""}`, 16, "middle");
  s += part(1, 685, 392, "M685 404V505", "");
  s += `<g data-vector-assembly="true" data-mode="${v.mode}">` + rect(105, y - 6, 1140, 12, "#fff") + "</g>";
  const ends = v.mode === "double" ? [["a", v.a], ["b", v.b]] as const : [["a", v.a]] as const;
  for (const [side, e] of ends) {
    const a = side === "a", prefix = a ? "A" : "B", cx = a ? 280 : 1080, f = getAssemblyFitting(e.fittingModel), source = getAssemblyFittingVector(e.fittingModel);
    // Ring fittings and their CAD-projected kits use millimetres, so preserve
    // one common display scale instead of fitting each part to a separate box.
    const partScale=f?.preferCadVector?9.4:undefined;
    if (!e.fittingModel) s += fitting(e, side, y);
    else if (source) {
      s += sourceView(source, cx, y, partScale ? source.width * partScale : 188, partScale ? source.height * partScale : 82, a, `data-source-model="${escape(e.fittingModel)}"`, true);
    } else s += text(cx, y - 22, "该型号外形资料待补充", 16, "middle");
    const fittingNumber = number(`${prefix} 端接头`);
    s += part(fittingNumber, cx, 680, `M${cx} 668V${y + 46}`, text(cx - 90, 716, `${prefix} 端 · ${endConnection(e)}`, 20) + fitted(cx - 90, 744, e.fittingModel || `${e.series} · ${e.thread}`, 330, 17) + text(cx - 90, 772, [f?.material || (e.series === "FL6" ? e.material : ""), e.color].filter(Boolean).join(" · "), 16));
    const accessory = assemblyAccessory(e.fittingModel, e.accessoryCode), ax = a ? 140 : 1210, an = number(`${prefix} 端${endConnection(e) === "翻边" ? "垫片" : endConnection(e) === "卡箍" ? "卡箍" : "卡环组件"}`);
    const accessoryVector = getAssemblyAccessoryVector(e.fittingModel, e.accessoryCode);
    if (accessoryVector) s += sourceView(accessoryVector, ax, y, partScale ? accessoryVector.width * partScale : 22, partScale ? accessoryVector.height * partScale : 36, a, `data-accessory-model="${escape(accessory!.model)}"`);
    if (endConnection(e) === "翻边") {
      s += rect(a ? 103 : 1243, y - 15, 4, 30, "#fff");
      if (!e.fittingModel) s += washer(ax, y, an);
    }
    // Missing exact accessory geometry stays explicitly unillustrated; a clamp
    // or ring is never fabricated by modifying a flange washer drawing.
    s += part(an, a ? 150 : 1120, 408, `M${a ? 150 : 1120} 420L${ax} ${y - 22}`, fitted(a ? 180 : 830, 410, endConnection(e) === "卡环" ? `${prefix} 端 ${accessory?.model || "套件待补充"} · SUS 压套 + PEEK 垫圈` : `${prefix} 端 ${accessory?.model || e.washer || "配套件待确认"}`, 350, 15));
    const stopNumber = number(`${prefix} 侧限位件`), sx = a ? 420 : 940;
    if (e.stop !== "无") s += stop(sx, y, e.stop, stopNumber) + part(stopNumber, sx, 610, `M${sx} 598V${y + 18}`, text(sx + 22, 615, e.stop, 16));
  }
  if (v.mode === "single") s += text(1165, 580, "B 端 · 自由管端", 19, "middle");
  for (const [enabled, x, value, side] of [[v.labelA, 510, v.textA, "A"], [v.labelB, 785, v.textB, "B"]] as const) {
    if (enabled) s += pipeLabel(x, y, value, number(`${side} 侧管标`)) + part(number(`${side} 侧管标`), x + 43, 460, `M${x + 43} 472V${y - 18}`, fitted(x - 25, 443, `${side} 管标：${value}`, 220, 15));
  }
  const warnings = assemblyCompatibilityWarnings(v);
  s += text(105, 827, "图示不按比例；连接结构、配套、长度测量基准及签核按工程确认。", 15);
  if (warnings.length) s += fitted(105, 853, `配套待确认：${warnings.join(" ")}`, 1165, 14);
  const detailLines = [
    `${record.name} · R${record.revision}`, ...rows.map((r, i) => `${i + 1}. ${r.part}：${r.specification} · ${r.quantity}`), ...warnings,
    ...ends.map(([side, e]) => `${side.toUpperCase()} 端图形来源：${getAssemblyFittingVector(e.fittingModel)?.source || (e.fittingModel ? "缺少对应正式图纸" : `客户提供 ${e.series} 选型图`)}`),
    v.notes ? `特殊要求：${v.notes}` : "", v.freeEndNote && v.mode === "single" ? `自由端说明：${v.freeEndNote}` : "",
  ].filter(Boolean).flatMap(value => wrap(value, 1120, 16));
  const continuation = Array.from({ length: Math.ceil(detailLines.length / 23) }, (_, i) => detailLines.slice(i * 23, (i + 1) * 23));
  const shell = (body: string, page: number) => `<svg xmlns="http://www.w3.org/2000/svg" width="776.88pt" height="587.76pt" viewBox="0 0 1511 1143" role="img" lang="${assemblyHtmlLocale(locale)}" data-template-key="assembly" data-vector-drawing="true"><metadata>Exact original fitting PDF paths. Parametric tube and optional installation positions are diagrammatic, not inferred manufacturing dimensions.</metadata>${rect(0, 0, 1511, 1143, "#fff", "none", 0)}${frame(current, page, continuation.length + 1)}${body}</svg>`;
  return [shell(s, 1), ...continuation.map((values, i) => shell(values.map((value, j) => text(110, 282 + j * 24, value, 16)).join(""), i + 2))];
}
  return { buildSheets };
}
export function buildFlangedDrawingSheets(record: FlangedConfiguration, locale = "zh"): string[] {
  const masked = protectAssemblyUserText(record);
  return drawingRenderer(locale, masked.restore).buildSheets(masked.record);
}
export function downloadDrawingFile(blob: Blob, name: string) {
  const href = URL.createObjectURL(blob), link = document.createElement("a");
  link.href = href; link.download = name; link.click(); setTimeout(() => URL.revokeObjectURL(href), 60_000);
}
type GlyphPosition = { xAdvance: number; xOffset: number; yOffset: number };
type GlyphRun = { glyphs: { path: { toSVG(): string } }[]; positions: GlyphPosition[] };
type VectorFont = { unitsPerEm: number; layout(value: string): GlyphRun };
type VectorFontKit = { create(bytes: Uint8Array): VectorFont };
let fontPromise: Promise<{ kit: VectorFontKit; bytes: Uint8Array; font: VectorFont }> | undefined;
async function vectorFont() {
  if (!fontPromise) fontPromise = (async () => {
    const url = "/vendor/flanged-drawing/fontkit-1.1.1.mjs?v=standalone", loaded = await import(/* webpackIgnore: true */ url), kit = (loaded.default || loaded) as VectorFontKit;
    const response = await fetch("/vendor/flanged-drawing/NotoSansCJKsc-Regular.otf");
    if (!response.ok) throw new Error("图纸字体未能加载。");
    const bytes = new Uint8Array(await response.arrayBuffer()); return { kit, bytes, font: kit.create(bytes) };
  })().catch(error => { fontPromise = undefined; throw error; });
  return fontPromise;
}
function parsed(svg: string) {
  const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
  if (doc.querySelector("parsererror, image, foreignObject, script")) throw new Error("Invalid vector drawing.");
  return doc;
}
function textLayout(el: Element, font: VectorFont) {
  const value = el.textContent || "", run = font.layout(value);
  let size = Number(el.getAttribute("font-size") || 14);
  const width = run.positions.reduce((sum, p) => sum + p.xAdvance, 0) / font.unitsPerEm, maxWidth = Number(el.getAttribute("data-max-width"));
  if (maxWidth) size = Math.min(size, maxWidth / Math.max(width, .001));
  let x = Number(el.getAttribute("x")); const y = Number(el.getAttribute("y")), anchor = el.getAttribute("text-anchor");
  if (anchor === "middle") x -= width * size / 2;
  if (anchor === "end") x -= width * size;
  return { value, run, size, x, y, rotation: el.getAttribute("transform")?.startsWith("rotate(90") ? 90 : 0 };
}
/** Outline text too, making exported SVG independent of installed fonts. */
export async function portableFlangedDrawingSvg(svg: string) {
  const { font } = await vectorFont(), doc = parsed(svg);
  for (const el of Array.from(doc.querySelectorAll("text"))) {
    const t = textLayout(el, font), group = doc.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("aria-label", t.value); group.setAttribute("fill", el.getAttribute("fill") || "#111");
    if (t.rotation) group.setAttribute("transform", el.getAttribute("transform")!);
    let pen = 0;
    t.run.glyphs.forEach((glyph, i) => {
      const p = t.run.positions[i], shape = doc.createElementNS("http://www.w3.org/2000/svg", "path"), scale = t.size / font.unitsPerEm;
      shape.setAttribute("d", glyph.path.toSVG()); shape.setAttribute("transform", `translate(${num(t.x + (pen + p.xOffset) * scale)} ${num(t.y - p.yOffset * scale)}) scale(${scale} ${-scale})`);
      group.appendChild(shape); pen += p.xAdvance;
    });
    el.replaceWith(group);
  }
  return new XMLSerializer().serializeToString(doc.documentElement);
}
/** Keep approved part PDFs as native PDF content, including their line weights. */
export async function createFlangedDrawingPdf(sheets: string[], title: string): Promise<Uint8Array> {
  const url = "/vendor/flanged-drawing/pdf-lib-1.17.1.mjs", { PDFDocument, rgb, pushGraphicsState, popGraphicsState, translate, rotateDegrees, scale } = await import(/* webpackIgnore: true */ url);
  const source = await vectorFont(), pdf = await PDFDocument.create();
  pdf.setTitle(title); pdf.setSubject("FOREACH tubing assembly drawing with original part PDF views"); pdf.setCreator("FOREACH tubing assembly configurator");
  const originalDocuments = new Map<string, Promise<Awaited<ReturnType<typeof PDFDocument.load>>>>();
  const originalDocument = (url: string) => {
    if (!/^\/assets\/products\/tubing-assemblies\/part-drawing-views\/[\w-]+\.json$/.test(url)) throw new Error("Invalid original drawing source.");
    if (!originalDocuments.has(url)) originalDocuments.set(url, fetch(url).then(async response => {
      if (!response.ok) throw new Error("原始零件图纸未能加载。");
      const asset = await response.json() as { pdf?: string };
      if (!asset.pdf || typeof asset.pdf !== "string") throw new Error("Invalid original drawing content.");
      const bytes = Uint8Array.from(atob(asset.pdf), char => char.charCodeAt(0));
      if (String.fromCharCode(...bytes.subarray(0, 5)) !== "%PDF-") throw new Error("Invalid original drawing PDF.");
      return PDFDocument.load(bytes);
    }));
    return originalDocuments.get(url)!;
  };
  const color = (v: string | null) => !v || v === "none" ? undefined : v === "#fff" || v === "white" ? rgb(1, 1, 1) : rgb(.067, .067, .067);
  for (const svg of sheets) {
    const root = parsed(svg).documentElement, pw = parseFloat(root.getAttribute("width")!), ph = parseFloat(root.getAttribute("height")!), sx = ph / 1143, sy = sx, ox = (pw - 1511 * sx) / 2, page = pdf.addPage([pw, ph]);
    for (const el of Array.from(root.querySelectorAll("g[data-original-pdf],line,rect,circle,path,text"))) {
      // The preview paths belong to the same source view. Do not draw them on
      // top of its embedded PDF, which would make threads appear heavy again.
      if (el.parentElement?.closest("[data-original-pdf]")) continue;
      const n = (name: string) => Number(el.getAttribute(name) || 0), fill = color(el.getAttribute("fill")), stroke = color(el.getAttribute("stroke")), borderWidth = n("stroke-width") * sx;
      if (el.tagName === "g") {
        const box = (el.getAttribute("data-original-bounds") || "").split(" ").map(Number), target = (el.getAttribute("data-original-placement") || "").split(" ").map(Number);
        if (box.length !== 4 || target.length !== 4 || ![...box, ...target].every(Number.isFinite) || box[2] <= box[0] || box[3] <= box[1] || target[2] <= 0 || target[3] <= 0) throw new Error("Invalid original drawing crop.");
        const doc = await originalDocument(el.getAttribute("data-original-pdf")!), original = doc.getPage(0), originalHeight = original.getHeight();
        const view = await pdf.embedPage(original, { left: box[0], right: box[2], bottom: originalHeight - box[3], top: originalHeight - box[1] });
        const [x, y, width, height] = target, mirror = el.getAttribute("data-original-mirror") === "true";
        if (el.getAttribute("data-original-opaque") === "true") page.drawRectangle({ x: ox + x * sx, y: ph - (y + height) * sy, width: width * sx, height: height * sy, color: rgb(1, 1, 1) });
        page.drawPage(view, { x: ox + (x + (mirror ? width : 0)) * sx, y: ph - (y + height) * sy, xScale: (mirror ? -1 : 1) * width * sx / view.width, yScale: height * sy / view.height });
      }
      else if (el.tagName === "line") page.drawLine({ start: { x: ox + n("x1") * sx, y: ph - n("y1") * sy }, end: { x: ox + n("x2") * sx, y: ph - n("y2") * sy }, color: stroke, thickness: borderWidth });
      else if (el.tagName === "rect") page.drawRectangle({ x: ox + n("x") * sx, y: ph - (n("y") + n("height")) * sy, width: n("width") * sx, height: n("height") * sy, color: fill, borderColor: stroke, borderWidth });
      else if (el.tagName === "circle") page.drawEllipse({ x: ox + n("cx") * sx, y: ph - n("cy") * sy, xScale: n("r") * sx, yScale: n("r") * sy, color: fill, borderColor: stroke, borderWidth });
      else if (el.tagName === "path") page.drawSvgPath(el.getAttribute("d")!, { x: ox, y: ph, scale: sx, color: fill, borderColor: stroke, borderWidth });
      else {
        const t = textLayout(el, source.font); let x = t.x, y = t.y;
        if (t.rotation) { const cx = n("x"), cy = n("y"); x = cx - (t.y - cy); y = cy + (t.x - cx); }
        page.pushOperators(pushGraphicsState(), translate(ox + x * sx, ph - y * sy), rotateDegrees(-t.rotation), scale(1, -1));
        let pen = 0;
        const glyphScale = t.size * sx / source.font.unitsPerEm;
        t.run.glyphs.forEach((glyph, index) => {
          const position = t.run.positions[index], d = glyph.path.toSVG();
          if (d) page.drawSvgPath(d, { x: (pen + position.xOffset) * glyphScale, y: -position.yOffset * glyphScale, scale: glyphScale, color: fill || rgb(.067, .067, .067) });
          pen += position.xAdvance;
        });
        page.pushOperators(popGraphicsState());
      }
    }
  }
  return pdf.save();
}
