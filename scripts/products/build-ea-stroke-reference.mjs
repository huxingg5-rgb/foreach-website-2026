import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// EA A46 p. 9: preserve A/B/C/D order, the red end zones and blue working zone.
// The source explanation is rendered as readable HTML beside this figure.
const root = path.resolve("public/images/products/pumps/plunger-pump/ea/selection");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="3000" height="2250" viewBox="0 0 1500 1125">
<title>EA 柱塞泵行程位置示意</title>
<desc>依次标出极限上顶点 A、光耦信号跳变点 B、全行程整步点 C 和极限下顶点 D。AB、CD 为红色端部区，BC 为蓝色工作区。</desc>
<rect width="1500" height="1125" fill="white"/>
<rect x="290" y="130" width="38" height="75" fill="#f00000"/>
<rect x="290" y="205" width="38" height="670" fill="#082962"/>
<rect x="290" y="875" width="38" height="75" fill="#f00000"/>
<g fill="none" stroke="#111" stroke-width="3">
<path d="M328 130H1250 M328 205H1250 M328 875H1250 M328 950H1250"/>
</g>
<g font-family="Arial,Microsoft YaHei,sans-serif" font-size="44" fill="#111" font-weight="400">
<text x="440" y="106">极限上顶点(A)</text>
<text x="440" y="184">光耦信号跳变点(B)</text>
<text x="440" y="852">全行程整步点(C)</text>
<text x="440" y="1020">极限下顶点(D)</text>
</g>
</svg>\n`;
await fs.mkdir(root, { recursive: true });
await fs.writeFile(path.join(root, "ea-stroke-positions-hd.svg"), svg);
await sharp(Buffer.from(svg)).webp({ lossless: true, effort: 6 }).toFile(path.join(root, "ea-stroke-positions-hd.webp"));
const metadata = await sharp(path.join(root, "ea-stroke-positions-hd.webp")).metadata();
if (metadata.format !== "webp" || metadata.width !== 3000 || metadata.height !== 2250) throw new Error("Invalid EA stroke diagram");
console.log(JSON.stringify({ file: "ea-stroke-positions-hd.webp", width: metadata.width, height: metadata.height }));
