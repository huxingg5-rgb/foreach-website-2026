/** Display finishes, not measured color standards or manufacturing dimensions. */
export function assemblyMaterialAppearance(material: string, color: string) {
  const steel = material === "SUS";
  const transparent = color === "透明";
  const natural = steel ? 0xb7c3cc : material === "PEEK" ? 0xc5b28b : 0xd7dcda;
  const colors: Record<string, number> = { 本色: natural, 透明: 0xbfd5dc, 黑色: 0x30343a, 蓝色: 0x2467b4, 红色: 0xb92f34, 黄色: 0xc7a237 };
  const outlines: Record<string, string> = { 黑色: "#252a30", 蓝色: "#22578c", 红色: "#94262b", 黄色: "#8d711e" };
  return { color: colors[color] ?? natural, metalness: steel ? .68 : 0, roughness: steel ? .25 : .36,
    transparent, opacity: transparent ? .58 : 1, outline: outlines[color] ?? "#344054" };
}
