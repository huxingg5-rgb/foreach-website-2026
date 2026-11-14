import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// The SVG masters retain the original EA A46 pages 16-19 layout and geometry.
// They were traced from the original embedded figures, without the PDF watermark,
// with the original labels re-typeset at their source positions. Do not replace
// these masters with a newly designed connector or winding diagram.
const root = path.resolve("public/images/products/pumps/plunger-pump/ea/selection");
const masters = [
  "ea-motor-42-four-wire-original-hd",
  "ea-motor-a-four-wire-original-hd",
  "ea-motor-b-four-wire-original-hd",
  "ea-motor-six-wire-original-hd",
];

for (const name of masters) {
  const svg = await fs.readFile(path.join(root, `${name}.svg`));
  await sharp(svg).resize(3000, 2250, { fit: "contain", background: "white" })
    .webp({ lossless: true, effort: 6 }).toFile(path.join(root, `${name}.webp`));
  const metadata = await sharp(path.join(root, `${name}.webp`)).metadata();
  console.log(JSON.stringify({ file: name, format: metadata.format, width: metadata.width, height: metadata.height }));
}
