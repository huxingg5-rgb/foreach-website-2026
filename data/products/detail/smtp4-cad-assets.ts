const smtp4Models = ["smtp4-100ul", "smtp4-250ul", "smtp4-500ul"] as const;

export function getSmtp4CadAssets(slug: string, locale = "en") {
  if (!smtp4Models.some(model => model === slug)) return undefined;
  const drawingLocale = locale.toLowerCase().split("-")[0] === "zh" ? "zh-cn" : "en";
  return {
    model: slug.toUpperCase().replace("UL", " μL"),
    viewerId: slug,
    model3dUrl: `/models/products/pumps/pipetting-pumps/cad/${slug}.fcad.gz`,
    drawingPdfUrl: `/documents/products/pumps/pipetting-pumps/2d-drawings/${slug}-${drawingLocale}.pdf`,
  };
}
