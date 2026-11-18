import manifest from "./abd-cad-manifest.json";

export function getAbdCadAssets(tubeOdCode: string) {
  return manifest.models.find(item => item.tubeOdCode === tubeOdCode);
}

export function getAbdDrawing(tubeOdCode: string) {
  return manifest.drawings.find(item => item.tubeOdCode === tubeOdCode);
}

export function getAbdDrawingPreview(tubeOdCode: string, locale: string) {
  const language = locale.toLowerCase().split("-")[0] === "zh" ? "zh-cn" : "en";
  // Both datasheets identify V40 as sharing the ABD-06M outline and pinout.
  if (tubeOdCode === "40") return `/documents/products/control/abd/abd-06m-v40-${language}.pdf`;
  const model = getAbdCadAssets(tubeOdCode);
  if (!model) return undefined;
  return `/documents/products/control/abd/${model.viewerId}-${language}.pdf`;
}

const copy = {
  zh: { preview: "图纸与模型", model: "预览型号", drawing: "2D 图纸", missingDrawing: "当前型号暂无 2D 图纸，可通过“申请 CAD”提交需求。" },
  en: { preview: "Drawings and models", model: "Preview model", drawing: "2D drawing", missingDrawing: "No 2D drawing is available for this model. Use Request CAD to ask for one." },
  es: { preview: "Planos y modelos", model: "Modelo de vista previa", drawing: "Plano 2D", missingDrawing: "No hay un plano 2D disponible para este modelo. Puede pedirlo mediante Solicitar CAD." },
  fr: { preview: "Plans et modèles", model: "Modèle affiché", drawing: "Plan 2D", missingDrawing: "Le plan 2D de ce modèle est disponible sur demande via la demande de CAO." },
  ko: { preview: "도면 및 모델", model: "미리보기 모델", drawing: "2D 도면", missingDrawing: "이 모델의 2D 도면은 CAD 요청을 통해 문의할 수 있습니다." },
  ru: { preview: "Чертежи и модели", model: "Модель для просмотра", drawing: "Чертёж 2D", missingDrawing: "Чтобы получить чертёж этой модели, воспользуйтесь функцией «Запросить CAD»." },
};

export function getAbdCadCopy(locale: string) {
  return copy[locale.toLowerCase().split("-")[0] as keyof typeof copy] || copy.en;
}
