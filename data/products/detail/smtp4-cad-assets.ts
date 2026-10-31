const smtp4Models = ["smtp4-100ul", "smtp4-250ul", "smtp4-500ul"] as const;

export function getSmtp4CadAssets(slug: string) {
  if (!smtp4Models.some(model => model === slug)) return undefined;
  return {
    model: slug.toUpperCase().replace("UL", " μL"),
    viewerId: slug,
    model3dUrl: `/models/products/pumps/pipetting-pumps/cad/${slug}.fcad.gz`,
  };
}
