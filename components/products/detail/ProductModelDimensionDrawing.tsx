"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./ProductModelDimensions.module.css";

export function getModelDimensionDrawingUrl(modelUrl: string | undefined, locale: "zh" | "en") {
  const file = (modelUrl || "").split(/[?#]/)[0];
  // This local test drawing has been verified against this particular STEP part.
  if (file !== "/models/products/fittings/local-test/443-01-00063.stp") return null;
  return `/models/products/fittings/local-test/443-01-00063-dimensions.${locale}.svg`;
}

export default function ProductModelDimensionDrawing({ source, locale }: { source: string; locale: "zh" | "en" }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [zoom, setZoom] = useState(1);
  const en = locale === "en";
  const alt = en ? "443-01-00063 model dimension drawing: front view, section A-A, port section B-B and interface dimensions" : "443-01-00063 模型尺寸图：主视图、剖视 A-A、接口截面 B-B 及接口尺寸";
  return <div data-model-dimension-drawing="true">
    <div className={styles.drawingControls}>
      <p>{en ? "Front view, center section and port section · mm" : "主视图、中心剖视与接口截面 · mm"}</p>
      <button type="button" className={styles.toggle} onClick={() => { setZoom(1); dialogRef.current?.showModal(); }}>
        {en ? "Enlarge drawing" : "放大尺寸图"}
      </button>
    </div>
    <div className={styles.drawingScroll}>
      <Image className={styles.drawingPreview} src={source} alt={alt} width={1180} height={850} unoptimized />
    </div>
    <p className={styles.drawingNote}>{en ? "Model-derived reference dimensions; manufacturing tolerances are not specified. Scroll horizontally on smaller screens, or enlarge the drawing." : "尺寸来自本模型，未提供制造公差。小屏幕可左右滑动，或放大查看。"}</p>
    <dialog ref={dialogRef} className={styles.drawingDialog} aria-label={en ? "Enlarged fitting dimension drawing" : "放大的接头尺寸图"}>
      <div className={styles.dialogToolbar}>
        <strong>443-01-00063 · {en ? "Dimension drawing" : "尺寸图"}</strong>
        <div className={styles.dialogActions}>
          <button type="button" className={styles.toggle} aria-label={en ? "Zoom out" : "缩小尺寸图"} disabled={zoom <= 0.75} onClick={() => setZoom(value => Math.max(0.75, value - 0.25))}>−</button>
          <span aria-live="polite">{Math.round(zoom * 100)}%</span>
          <button type="button" className={styles.toggle} aria-label={en ? "Zoom in" : "放大尺寸图"} disabled={zoom >= 2} onClick={() => setZoom(value => Math.min(2, value + 0.25))}>+</button>
          <button type="button" className={styles.toggle} onClick={() => dialogRef.current?.close()}>{en ? "Close" : "关闭"}</button>
        </div>
      </div>
      <div className={styles.dialogScroll}>
        <Image className={styles.expandedDrawing} style={{ width: Math.round(1180 * zoom) }} src={source} alt={alt} width={1180} height={850} unoptimized />
      </div>
    </dialog>
  </div>;
}
