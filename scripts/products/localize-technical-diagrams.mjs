import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import assert from "node:assert/strict";
import sharp from "sharp";

// Edit native SVG text layers only. The wiring/stroke geometry is immutable.
// The DPL30H drawing embeds the original plot pixels; it does not replot data.
const locales = ["en", "es", "fr", "ko", "ru"];
const root = path.resolve("public/images/products/pumps/plunger-pump/ea/selection");
const out = path.join(root, "localized");
const names = ["ea-motor-42-four-wire-original-hd", "ea-motor-a-four-wire-original-hd", "ea-motor-b-four-wire-original-hd", "ea-motor-six-wire-original-hd", "ea-home-sensor-three-wire-original-hd", "ea-home-sensor-four-wire-original-hd", "ea-home-sensor-five-wire-original-hd", "ea-stroke-positions-hd"];
const rows = [
  ["CN1端子线序", "CN1 pin assignment", "Asignación de pines CN1", "Brochage CN1", "CN1 핀 배열", "Назначение контактов CN1"],
  ["【CN1电机接线图 WIRING DIAGRAM】", "CN1 MOTOR WIRING DIAGRAM", "ESQUEMA DE CONEXIÓN DEL MOTOR CN1", "SCHÉMA DE CÂBLAGE DU MOTEUR CN1", "CN1 모터 배선도", "СХЕМА ПОДКЛЮЧЕНИЯ ДВИГАТЕЛЯ CN1"],
  ["引脚连接图", "Pin connections", "Conexión de pines", "Raccordement des broches", "핀 연결도", "Подключение контактов"],
  ["电气原理图", "Electrical schematic", "Esquema eléctrico", "Schéma électrique", "전기 회로도", "Электрическая схема"],
  ["winding drawing", "Winding diagram", "Esquema de devanados", "Schéma des enroulements", "권선도", "Схема обмоток"],
  ["PIN NO.", "PIN NO.", "N.º DE PIN", "N° DE BROCHE", "핀 번호", "№ КОНТАКТА"],
  ["褐色", "Brown", "Marrón", "Marron", "갈색", "Коричневый"],
  ["黑色", "Black", "Negro", "Noir", "검정", "Чёрный"],
  ["白色", "White", "Blanco", "Blanc", "흰색", "Белый"],
  ["蓝色", "Blue", "Azul", "Bleu", "파랑", "Синий"],
  ["黑", "Black", "Negro", "Noir", "검정", "Чёрный"],
  ["白", "White", "Blanco", "Blanc", "흰색", "Белый"],
  ["负载", "Load", "Carga", "Charge", "부하", "Нагрузка"],
  ["输出动作", "Output state", "Estado de salida", "État de sortie", "출력 상태", "Состояние выхода"],
  ["导线颜色", "Wire color", "Color del cable", "Couleur du fil", "전선 색상", "Цвет провода"],
  ["输出1", "Output 1", "Salida 1", "Sortie 1", "출력 1", "Выход 1"],
  ["输出2", "Output 2", "Salida 2", "Sortie 2", "출력 2", "Выход 2"],
  ["入光时ON", "Light-ON", "ON con luz", "ON en présence de lumière", "수광 시 ON", "ON при освещении"],
  ["遮光时ON", "Dark-ON", "ON sin luz", "ON en absence de lumière", "차광 시 ON", "ON при перекрытии света"],
  ["Anode-红", "Anode-Red", "Ánodo-Rojo", "Anode-Rouge", "애노드-빨강", "Анод-Красный"],
  ["Cathode-黑", "Cathode-Black", "Cátodo-Negro", "Cathode-Noir", "캐소드-검정", "Катод-Чёрный"],
  ["Collector-白", "Collector-White", "Colector-Blanco", "Collecteur-Blanc", "컬렉터-흰색", "Коллектор-Белый"],
  ["Emitter-绿", "Emitter-Green", "Emisor-Verde", "Émetteur-Vert", "이미터-초록", "Эмиттер-Зелёный"],
  ["白-VCC", "White-VCC", "Blanco-VCC", "Blanc-VCC", "흰색-VCC", "Белый-VCC"],
  ["蓝-Output", "Blue-Output", "Azul-Salida", "Bleu-Sortie", "파랑-출력", "Синий-Выход"],
  ["绿-Ground", "Green-Ground", "Verde-Tierra", "Vert-Masse", "초록-접지", "Зелёный-Общий"],
  ["REGULATOR", "REGULATOR", "REGULADOR", "RÉGULATEUR", "레귤레이터", "СТАБИЛИЗАТОР"],
  ["AMP", "AMP", "AMP", "AMP", "증폭기", "УСИЛИТЕЛЬ"],
  ["极限上顶点(A)", "Upper mechanical limit (A)", "Límite mecánico superior (A)", "Limite mécanique haute (A)", "상부 기계적 한계점 (A)", "Верхний механический предел (A)"],
  ["光耦信号跳变点(B)", "Optical sensor switching point (B)", "Punto de conmutación del sensor óptico (B)", "Point de commutation du capteur optique (B)", "광센서 신호 전환점 (B)", "Точка переключения оптодатчика (B)"],
  ["全行程整步点(C)", "Full-stroke full-step position (C)", "Posición de paso completo a carrera total (C)", "Position de pas entier en fin de course utile (C)", "전체 스트로크 정수 스텝 위치 (C)", "Полношаговая точка полного хода (C)"],
  ["极限下顶点(D)", "Lower mechanical limit (D)", "Límite mecánico inferior (D)", "Limite mécanique basse (D)", "하부 기계적 한계점 (D)", "Нижний механический предел (D)"],
];
const descriptions = ["Original terminal names, wire colors, circuit symbols and connections are preserved.", "Se conservan los terminales, colores de cables, símbolos y conexiones originales.", "Les bornes, couleurs des fils, symboles et connexions d’origine sont conservés.", "원본의 단자, 전선 색상, 회로 기호 및 연결 관계를 유지합니다.", "Сохранены исходные клеммы, цвета проводов, условные обозначения и соединения."];
const strokeDescriptions = ["A: upper mechanical limit; B: optical sensor switching point; C: full-stroke full-step position; D: lower mechanical limit. AB and CD are red end zones; BC is the blue working zone.", "A: límite mecánico superior; B: conmutación del sensor óptico; C: paso completo a carrera total; D: límite mecánico inferior. AB y CD son zonas rojas; BC es la zona útil azul.", "A : limite mécanique haute ; B : commutation du capteur optique ; C : pas entier en fin de course utile ; D : limite mécanique basse. AB et CD sont les zones rouges ; BC est la zone de travail bleue.", "A: 상부 기계적 한계점, B: 광센서 신호 전환점, C: 전체 스트로크 정수 스텝 위치, D: 하부 기계적 한계점. AB와 CD는 빨간색 끝단 영역이며 BC는 파란색 작동 영역입니다.", "A — верхний механический предел; B — переключение оптодатчика; C — полношаговая точка полного хода; D — нижний механический предел. AB и CD — красные концевые зоны; BC — синяя рабочая зона."];
const titles = ["EA wiring / stroke reference", "Referencia EA de conexión / carrera", "Référence EA de câblage / course", "EA 배선 / 스트로크 참조", "EA: подключение / ход"];
const esc = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const weight = text => [...text].reduce((sum, c) => sum + (/[\u3400-\u9fff\uac00-\ud7af]/.test(c) ? 2 : 1), 0);
const geometry = svg => svg.replace(/<(text|title|desc)\b[^>]*>[\s\S]*?<\/\1>/g, "").replace(/aria-label="[^"]*"/g, "");
await fs.mkdir(out, { recursive: true });
const manifest = [];
for (const name of names) {
  const source = await fs.readFile(path.join(root, `${name}.svg`), "utf8");
  for (const [index, locale] of locales.entries()) {
    let translated = source.replace(/<(text|title|desc)\b([^>]*)>([\s\S]*?)<\/\1>/g, (match, tag, attrs, content) => {
      if (tag === "title") return `<title>${titles[index]}</title>`;
      if (tag === "desc") return `<desc>${esc(name.includes("stroke") ? strokeDescriptions[index] : descriptions[index])}</desc>`;
      const row = rows.find(item => item[0] === content);
      if (!row) { assert.doesNotMatch(content, /[\u3400-\u9fff]/, `Missing SVG text: ${content}`); return match; }
      const label = row[index + 1];
      // Fit longer localized labels inside their original text slots, without
      // moving symbols, pins or wires. Existing textLength constraints remain.
      if (!attrs.includes("textLength=")) attrs = attrs.replace(/font-size="([\d.]+)"/, (_, size) => `font-size="${Number(size) * Math.min(1, weight(content) / weight(label))}"`);
      return `<text${attrs}>${esc(label)}</text>`;
    }).replace(/aria-label="[^"]*"/, `aria-label="${titles[index]}"`);
    assert.equal(geometry(translated), geometry(source), `Geometry changed: ${name}/${locale}`);
    const stem = `${name}-${locale}`;
    if (process.argv.includes("--verify-existing-ea")) {
      assert.equal(await fs.readFile(path.join(out, `${stem}.svg`), "utf8"), translated);
      const dimensions = await sharp(path.join(out, `${stem}.webp`)).metadata();
      assert.equal(dimensions.width, 3000); assert.equal(dimensions.height, 2250);
    } else {
      await fs.writeFile(path.join(out, `${stem}.svg`), translated);
      await sharp(Buffer.from(translated)).webp({ lossless: true, effort: 4 }).toFile(path.join(out, `${stem}.webp`));
    }
    manifest.push({ name, locale, geometryUnchanged: true, sourceSha256: crypto.createHash("sha256").update(source).digest("hex") });
  }
}

const curveRoot = path.resolve("public/images/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump");
const original = await fs.readFile(path.join(curveRoot, "dpl30h-flow-pressure-curve.webp"));
// librsvg does not decode embedded WebP. PNG preserves the decoded source
// pixels exactly and is supported by the SVG renderer used for the exports.
const plotRaster = await sharp(original).png().toBuffer();
const plot = { left: 889, top: 57, width: 836, height: 408 };
const plotPixels = await sharp(original).extract(plot).removeAlpha().raw().toBuffer();
const curveLabels = [
  ["Flow rate", "Vacuum", "Positive pressure"], ["Caudal", "Presión negativa", "Presión positiva"],
  ["Débit", "Pression négative", "Pression positive"], ["유량", "부압", "양압"], ["Расход", "Разрежение", "Избыточное давление"],
];
for (const [index, locale] of locales.entries()) {
  const [flow, vacuum, pressure] = curveLabels[index];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2354" height="715" viewBox="0 0 2354 715">
<title>DPL30H — ${esc(flow)} / ${esc(pressure)}</title>
<rect width="2354" height="715" fill="white"/>
<defs><clipPath id="original-plot"><rect x="889" y="57" width="836" height="408"/></clipPath></defs>
<image href="data:image/png;base64,${plotRaster.toString("base64")}" x="0" y="0" width="2354" height="715" clip-path="url(#original-plot)"/>
<g font-family="Arial,Malgun Gothic,Microsoft YaHei,sans-serif" fill="#000" font-size="48" font-weight="700">
${[400, 300, 200, 100, 0].map((n, i) => `<text x="858" y="${75 + i * 100.5}" text-anchor="end">${n}</text>`).join("\n")}
${[-30, -20, -10, 0, 100, 200, 300, 400, 500, 600].map((n, i) => `<text transform="translate(${892 + i * 92.25} 535) rotate(-90)" text-anchor="middle">${n}</text>`).join("\n")}
<text transform="translate(710 261) rotate(-90)" text-anchor="middle" font-size="42">${esc(flow)} [mL/min]</text>
<text x="1308" y="638" text-anchor="middle" font-size="36">${esc(vacuum)} [kPa] ◀ | ▶ ${esc(pressure)} [kPa]</text>
</g></svg>`;
  const stem = `dpl30h-flow-pressure-curve-${locale}`;
  await fs.writeFile(path.join(curveRoot, `${stem}.svg`), svg);
  const file = path.join(curveRoot, `${stem}.webp`);
  await sharp(Buffer.from(svg)).webp({ lossless: true, effort: 4 }).toFile(file);
  const resultPixels = await sharp(file).extract(plot).removeAlpha().raw().toBuffer();
  assert.ok(resultPixels.equals(plotPixels), `DPL30H plot pixels changed: ${locale}`);
  manifest.push({ name: "dpl30h-flow-pressure-curve", locale, plotPixelsUnchanged: true, ticks: [-30, -20, -10, 0, 100, 200, 300, 400, 500, 600], sourceSha256: crypto.createHash("sha256").update(original).digest("hex") });
}
await fs.writeFile(path.join(out, "localization-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`Verified ${names.length * locales.length} geometry-preserving EA diagrams and ${locales.length} pixel-preserving DPL30H curves.`);
