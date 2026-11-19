"use client";

import { abdOrderModels } from "@/data/products/configurator/instrument-inquiry";
import { instrumentInquiryText } from "@/data/products/configurator/instrument-inquiry.intl";
import { getAbdCadAssets, getAbdCadCopy, getAbdDrawingPreview } from "@/data/products/detail/abd-cad-assets";
import FittingResourceViewer from "./FittingResourceViewer";
import type { ProductResourceSelection } from "./ProductResourceSelector";
import styles from "./AbdResourceViewer.module.css";

export default function AbdResourceViewer({ locale, tubeOdCode, onTubeOdChange, active }: {
  locale: string; tubeOdCode: string; onTubeOdChange: (code: string) => void; active: boolean;
}) {
  const copy = getAbdCadCopy(locale);
  const cad = getAbdCadAssets(tubeOdCode), drawingUrl = getAbdDrawingPreview(tubeOdCode, locale);
  const known = abdOrderModels.some(([code]) => code === tubeOdCode);
  const model = known ? `ABD-06M-V${tubeOdCode}` : "ABD";
  const selection: ProductResourceSelection = {
    label: instrumentInquiryText("tubeOd", locale), value: known ? tubeOdCode : "unsure", onChange: onTubeOdChange,
    options: [
      ...(!known ? [{ value: "unsure", label: instrumentInquiryText("unsure", locale), disabled: true }] : []),
      ...abdOrderModels.map(([code, od]) => ({ value: code, label: `${od} mm` })),
    ],
  };
  return <section className={styles.root} data-abd-resources="true" data-abd-model={model} aria-label={copy.preview}>
    <FittingResourceViewer locale={locale} active={active} productLayout productSelection={selection} analyticsProductId={model}
      drawings={[{ role: "abd", label: copy.drawing, model, url: drawingUrl }]}
      drawingUnavailableMessage={copy.missingDrawing}
      modelSource={cad ? { kind: "cad", props: { modelId: cad.viewerId, title: cad.model, locale } } : null} />
  </section>;
}
