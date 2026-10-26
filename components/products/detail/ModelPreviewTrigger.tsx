"use client";

import styles from "@/components/common/PdfDrawingPreview.module.css";

const copy: Record<string, { button: string; description: (model: string) => string }> = {
  zh: { button: "点击预览 3D 模型", description: (model) => `在线查看 ${model} 的 3D 模型` },
  en: { button: "Click to preview 3D model", description: (model) => `View the ${model} 3D model online` },
  es: { button: "Ver modelo 3D", description: (model) => `Explore el modelo 3D de ${model} en línea` },
  fr: { button: "Afficher le modèle 3D", description: (model) => `Consultez le modèle 3D de ${model} en ligne` },
  ko: { button: "3D 모델 미리보기", description: (model) => `${model}의 3D 모델을 온라인으로 확인하세요` },
  ru: { button: "Посмотреть 3D-модель", description: (model) => `Просмотр 3D-модели ${model} онлайн` },
};

/** Use the same frame, icon, typography and hover treatment as the PDF preview. */
export default function ModelPreviewTrigger({ model, locale, onOpen }: {
  model: string;
  locale: string;
  onOpen: () => void;
}) {
  const text = copy[locale] || copy.en;
  return (
    <div className={styles.scope} data-model-preview-trigger="true">
      <div className="frd-drawing-viewer">
        <button type="button" className="frd-drawing-preview-card" onClick={onOpen}>
          <span className="frd-drawing-play-icon" aria-hidden="true" />
          <strong>{text.button}</strong>
          <em>{text.description(model)}</em>
        </button>
      </div>
    </div>
  );
}
