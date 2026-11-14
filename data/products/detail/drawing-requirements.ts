export type CadDrawingType = "2d" | "3d";
export type DrawingRequirement = { drawingTypes?: CadDrawingType[]; needDrawing?: boolean };

/** A drawing request is metadata, never part of a model or combination identity. */
export function normalizeDrawingTypes(value: unknown, legacyNeedDrawing = false): CadDrawingType[] {
  if (!Array.isArray(value)) return legacyNeedDrawing ? ["2d"] : [];
  return (["2d", "3d"] as const).filter(type => value.includes(type));
}
export function getDrawingTypes(value: DrawingRequirement): CadDrawingType[] {
  return normalizeDrawingTypes(value.drawingTypes, value.needDrawing);
}

const COPY = {
  zh: { title: "图纸需求", optional: "选填，可多选", required: "可选一项或两项", twoD: "2D 尺寸图", threeD: "3D CAD 模型", none: "暂不需要", update: "更新图纸需求" },
  en: { title: "Drawing requirements", optional: "optional; select one or both", required: "select one or both", twoD: "2D dimension drawing", threeD: "3D CAD model", none: "Not requested", update: "Update drawing requirements" },
  es: { title: "Documentación técnica solicitada", optional: "opcional; puede seleccionar ambas", required: "seleccione una o ambas opciones", twoD: "Plano acotado 2D", threeD: "Modelo CAD 3D", none: "No solicitada", update: "Actualizar documentación solicitada" },
  fr: { title: "Plans et modèles souhaités", optional: "facultatif ; choix multiple", required: "une ou deux options possibles", twoD: "Plan coté 2D", threeD: "Modèle CAO 3D", none: "Aucune demande", update: "Modifier les documents souhaités" },
  ko: { title: "도면 요청", optional: "선택 사항 · 복수 선택 가능", required: "한 가지 또는 두 가지 모두 선택", twoD: "2D 치수 도면", threeD: "3D CAD 모델", none: "요청하지 않음", update: "도면 요청 변경" },
  ru: { title: "Запрашиваемая документация", optional: "необязательно; можно выбрать оба варианта", required: "можно выбрать один или оба варианта", twoD: "2D-чертёж с размерами", threeD: "3D-модель CAD", none: "Не запрашивается", update: "Изменить запрос документации" },
};
export function getDrawingRequirementsCopy(locale: string) {
  return COPY[locale as keyof typeof COPY] || COPY.zh;
}
export function drawingRequirementsText(types: unknown, locale: string) {
  const copy = getDrawingRequirementsCopy(locale);
  return normalizeDrawingTypes(types).map(type => type === "2d" ? copy.twoD : copy.threeD).join(" + ") || copy.none;
}
export function drawingRequirementsLine(value: DrawingRequirement, locale: string) {
  return `${getDrawingRequirementsCopy(locale).title}: ${drawingRequirementsText(getDrawingTypes(value), locale)}`;
}
