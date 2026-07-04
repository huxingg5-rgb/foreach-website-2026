"use client";

/* =========================================================
   PdfDrawingPreview.tsx
   恒永达官网｜全局 PDF 图纸预览组件

   说明：
   1. 保留接头替换原组件不动
   2. 当前通过包装方式复用原组件的预览逻辑
   3. 产品详情页统一引用本组件
   4. 后续阀、针、传感器等页面也可直接复用
========================================================= */

import FittingReplacementDrawingPreview from "@/components/resources/fitting-replacement/FittingReplacementDrawingPreview";

import styles from "./PdfDrawingPreview.module.css";

type PdfDrawingPreviewText = {
  title: string;
  loadingLabel: string;
  previewButton: string;
  description: string;
};

type PdfDrawingPreviewProps = {
  pdfPreviewUrl: string;
  documentTitle: string;
  text?: Partial<PdfDrawingPreviewText>;
};

export default function PdfDrawingPreview({
  pdfPreviewUrl,
  documentTitle,
  text = {},
}: PdfDrawingPreviewProps) {
  const resolvedText: PdfDrawingPreviewText = {
    title: text.title || "零件图",
    loadingLabel: text.loadingLabel || "图纸加载中",
    previewButton: text.previewButton || "点击预览图纸",
    description:
      text.description ||
      `在线查看 ${documentTitle} 的零件图`,
  };

  return (
    <div className={styles.scope}>
      <FittingReplacementDrawingPreview
        drawingPdfPreviewHref={pdfPreviewUrl}
        productModel={documentTitle}
        text={resolvedText}
      />
    </div>
  );
}