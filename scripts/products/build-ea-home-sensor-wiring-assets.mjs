import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Original-style redraws of the embedded figures on EA A46 pages 20-22.
// Keep the source wire names, terminal positions, symbols and connections.
// Page 20 has two alternative outputs, not a single four-wire configuration.
// These diagrams are reference illustrations, not a new circuit design.
const root = path.resolve("public/images/products/pumps/plunger-pump/ea/selection");
const esc = value => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const text = (x, y, label, size = 14, extra = "") => `<text x="${x}" y="${y}" font-size="${size}" ${extra}>${esc(label)}</text>`;
const line = (x1, y1, x2, y2, extra = "") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${extra}/>`;
const wire = (d, extra = "") => `<path d="${d}" ${extra}/>`;
const circle = (x, y, radius, extra = "") => `<circle cx="${x}" cy="${y}" r="${radius}" ${extra}/>`;
const node = (x, y, radius = 1.8) => circle(x, y, radius, 'fill="#111" stroke="none"');
const terminal = (x, y, radius = 6.5) => circle(x, y, radius, 'fill="white"');
const shape = points => `<polygon points="${points}" fill="#111" stroke="#111"/>`;
const rect = (x, y, width, height, extra = "") => `<rect x="${x}" y="${y}" width="${width}" height="${height}" ${extra}/>`;

function document(title, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="3000" height="2250" viewBox="0 0 1500 1125">
<title>${esc(title)}</title>
<desc>依照原图布局重绘，保留端子名称、导线颜色、电路符号及接线关系。</desc>
<rect width="1500" height="1125" fill="white"/>
<g fill="none" stroke="#111" stroke-width="1.15" stroke-linecap="butt" stroke-linejoin="miter">
<style>text{font-family:Arial,"Microsoft YaHei",sans-serif;fill:#111;stroke:none;font-weight:400}</style>
${content}
</g></svg>\n`;
}

function threeWire() {
  const drawing = [
    // Sensor housing, mounting holes and cable exit retain their original view.
    wire("M2 63 H124 V124 H2 V104 H41 V82 H2 Z"),
    wire("M54 63 V35 H106 V63 M54 124 V150 H106 V124"),
    line(15, 63, 15, 82, 'stroke="#888"'), line(15, 104, 15, 124, 'stroke="#888"'),
    circle(80, 49, 8.5, 'stroke="#777"'), circle(80, 136, 8.5, 'stroke="#777"'), circle(73, 97, 6.5, 'stroke="#777"'),
    wire("M124 83 H128 Q132 83 132 88 V99 Q132 104 128 104 H124", 'stroke="#666"'),
    rect(132, 88, 28, 11, 'stroke="#666"'),
    wire("M160 88 Q164 92 161 93 Q165 97 160 99", 'stroke="#666"'),
    // Two source load branches meet the brown positive supply.
    wire("M161 93 L228 22 H425 V89 M161 93 L228 69 H294 V57 M161 93 L228 117 H359 V77 M161 93 L228 164 H425 V99", 'stroke="#777"'),
    line(294, 22, 294, 38, 'stroke="#777"'), line(359, 22, 359, 58, 'stroke="#777"'),
    rect(276, 38, 36, 19, 'fill="#e8e8e8"'), rect(341, 58, 36, 19, 'fill="#e8e8e8"'),
    node(294, 22, 1.6), node(359, 22, 1.6),
    line(415, 89, 435, 89), rect(419, 93, 12, 6, 'fill="#111" stroke="none"'),
    text(408, 84, "+", 13), text(408, 110, "−", 13),
    text(231, 18, "褐色", 13), text(231, 64, "黑色", 13), text(231, 112, "白色", 13), text(231, 159, "蓝色", 13),
    text(294, 51.5, "负载", 12, 'text-anchor="middle"'), text(359, 71.5, "负载", 12, 'text-anchor="middle"'),
    text(439, 91, "5～24V DC", 13), text(440, 106, "±10%", 13),
  ].join("\n");
  const table = [
    text(24, 32, "输出动作", 24, 'style="fill:#0065a5"'),
    rect(24, 48, 620, 36, 'fill="#e8e8e8" stroke="none"'),
    rect(24, 84, 207, 74, 'fill="#e8e8e8" stroke="none"'),
    wire("M24 48 H644 M24 84 H644 M24 121 H644 M24 158 H644 M231 48 V158 M438 48 V158 M24 48 L231 84", 'stroke-width="1.2"'),
    text(334.5, 74, "导线颜色", 22, 'text-anchor="middle"'), text(541, 74, "输出动作", 22, 'text-anchor="middle"'),
    text(127.5, 110, "输出1", 22, 'text-anchor="middle"'), text(334.5, 110, "黑", 22, 'text-anchor="middle"'), text(541, 110, "入光时ON", 22, 'text-anchor="middle"'),
    text(127.5, 147, "输出2", 22, 'text-anchor="middle"'), text(334.5, 147, "白", 22, 'text-anchor="middle"'), text(541, 147, "遮光时ON", 22, 'text-anchor="middle"'),
  ].join("\n");
  return document("3 线式光耦接线图", `<g transform="translate(75 210) scale(2.62)">${drawing}</g><g transform="translate(280 675) scale(1.42)">${table}</g>`);
}

function fourWire() {
  const drawing = [
    line(59, 36, 59, 84), shape("43,84 75,84 59,109"), line(43, 109, 75, 109), line(59, 109, 59, 164),
    // The phototransistor and zigzag optical arrow follow the source orientation.
    wire("M176 36 V70 L145 88 M145 77 V119 M145 107 L176 124 V164"),
    shape("157,109 176,124 151,118"),
    wire("M85 104 L105 87 L102 106 L128 92", 'stroke-width="0.85"'), shape("128,92 111,96 117,105"),
    ...[[59, 36], [59, 164], [176, 36], [176, 164]].map(([x, y]) => node(x, y, 4)),
    text(19, 18, "Anode-红", 13), text(132, 18, "Collector-白", 13),
    text(12, 190, "Cathode-黑", 13), text(137, 190, "Emitter-绿", 13),
  ].join("\n");
  return document("4 线式光耦接线图", `<g transform="translate(240 150) scale(4.1)">${drawing}</g>`);
}

function fiveWire() {
  const drawing = [
    // LED input is separate from the logic supply, as shown in the source.
    wire("M113 26 H130 V181 M130 198 V230 H113"),
    shape("118,181 142,181 130,198"), line(119, 198, 141, 198),
    wire("M146 176 L154 180 L151 184 L165 189", 'stroke-width="1"'), shape("165,189 156,187 159,183"),
    // Regulator, its ground and the two logic rails.
    rect(195, 10, 89, 58), text(239.5, 44, "REGULATOR", 10.5, 'text-anchor="middle" font-stretch="condensed"'),
    wire("M195 39 H170 V57 M164 57 H176 M166 60 H174 M168 63 H172"),
    wire("M284 26 H459 M284 51 H323 V147 M182 230 H459"),
    // Photodiode and amplifier feedback loop.
    wire("M182 230 V198 M182 182 V100 H202 L205 94 L209 106 L214 94 L219 106 L224 94 L229 106 L234 94 L239 100 H284 V164"),
    line(171, 182, 193, 182), shape("171,198 193,198 182,182"),
    wire("M182 164 H218 M218 132 L272 164 L218 196 Z M272 164 H298"),
    text(237, 170, "AMP", 12, 'text-anchor="middle"'),
    wire("M239 144 V120 H323 M240 183 V230"),
    // Schmitt trigger, output inversion and push-pull output transistors.
    wire("M298 132 L351 164 L298 196 Z M323 181 V230"),
    wire("M305 176 H313 L320 154 H325 M309 176 L316 154 H324", 'stroke-width="1"'),
    terminal(358, 164, 7), wire("M365 164 H409 M378 164 V143"),
    wire("M363 143 H393 L378 121 Z M378 110 V98 H409"), terminal(378, 116, 5.5),
    wire("M430 26 V33 L426 36 L434 40 L426 44 L434 48 L426 52 L434 56 L426 60 L434 64 L430 68 V78 L409 89 M409 83 V111 M409 106 L433 117 V142 L409 154 M409 147 V177 M409 170 L433 183 V230 M433 128 H459"),
    shape("421,108 433,117 422,116"), shape("421,175 433,183 422,182"),
    ...[[182, 164], [240, 230], [323, 120], [323, 230], [284, 164], [378, 164], [430, 26], [433, 230]].map(([x, y]) => node(x, y, 2)),
    ...[[106.5, 26], [106.5, 230], [466, 26], [466, 128], [466, 230]].map(([x, y]) => terminal(x, y)),
    text(91, 32, "Anode-红", 15, 'text-anchor="end"'), text(91, 236, "Cathode-黑", 15, 'text-anchor="end"'),
    text(484, 32, "白-VCC", 15), text(484, 134, "蓝-Output", 15), text(484, 236, "绿-Ground", 15),
  ].join("\n");
  return document("5 线式光耦接线图", `<g transform="translate(55 275) scale(2.35)">${drawing}</g>`);
}

const drawings = [
  ["ea-home-sensor-three-wire-original-hd", threeWire()],
  ["ea-home-sensor-four-wire-original-hd", fourWire()],
  ["ea-home-sensor-five-wire-original-hd", fiveWire()],
];

await fs.mkdir(root, { recursive: true });
for (const [name, svg] of drawings) {
  await fs.writeFile(path.join(root, `${name}.svg`), svg);
  await sharp(Buffer.from(svg)).webp({ lossless: true, effort: 6 }).toFile(path.join(root, `${name}.webp`));
  const metadata = await sharp(path.join(root, `${name}.webp`)).metadata();
  console.log(JSON.stringify({ file: name, format: metadata.format, width: metadata.width, height: metadata.height }));
}
