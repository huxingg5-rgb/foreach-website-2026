import manifest from "./abd-cad-manifest.json";

export function getAbdCadAssets(tubeOdCode: string) {
  return manifest.models.find(item => item.tubeOdCode === tubeOdCode);
}

export function getAbdDrawing(tubeOdCode: string) {
  return manifest.drawings.find(item => item.tubeOdCode === tubeOdCode);
}

const copy = {
  zh: { preview: "图纸与模型", model: "预览型号", missingDrawing: "当前型号暂无对应 2D 原图。已提供的原图为 V16 和 V25，可切换型号查看；其他图纸可通过“申请 CAD”提交需求。", original: "原始图纸", revision: "版本" },
  en: { preview: "Drawings and models", model: "Preview model", missingDrawing: "No original 2D drawing is available for this model. Select V16 or V25 to view the supplied drawings, or request other drawings through Request CAD.", original: "Original drawing", revision: "Revision" },
  es: { preview: "Planos y modelos", model: "Modelo de vista previa", missingDrawing: "No hay un plano 2D original para este modelo. Seleccione V16 o V25 para ver los planos disponibles, o solicite otros mediante Solicitar CAD.", original: "Plano original", revision: "Revisión" },
  fr: { preview: "Plans et modèles", model: "Modèle affiché", missingDrawing: "Aucun plan 2D original n’est disponible pour ce modèle. Sélectionnez V16 ou V25 pour consulter les plans fournis, ou demandez les autres via la demande de CAO.", original: "Plan original", revision: "Révision" },
  ko: { preview: "도면 및 모델", model: "미리보기 모델", missingDrawing: "이 모델의 원본 2D 도면이 없습니다. V16 또는 V25를 선택하면 제공된 도면을 볼 수 있습니다. 다른 도면은 CAD 요청으로 신청하세요.", original: "원본 도면", revision: "개정" },
  ru: { preview: "Чертежи и модели", model: "Модель для просмотра", missingDrawing: "Для этой модели нет исходного 2D-чертежа. Выберите V16 или V25 для просмотра предоставленных чертежей. Другие чертежи можно запросить через «Запросить CAD».", original: "Исходный чертёж", revision: "Редакция" },
};

export function getAbdCadCopy(locale: string) {
  return copy[locale.toLowerCase().split("-")[0] as keyof typeof copy] || copy.en;
}
