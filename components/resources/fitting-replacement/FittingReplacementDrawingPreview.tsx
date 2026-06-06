"use client";

/* =========================================================
   FittingReplacementDrawingPreview.tsx
   恒永达官网｜接头详情页 2D 图纸预览组件

   文件路径：
   components/resources/fitting-replacement/FittingReplacementDrawingPreview.tsx

   作用：
   1. 展示详情页 2D 图纸预览区域
   2. 默认只显示“点击预览图纸”封面
   3. 用户点击后再加载 PDF iframe
   4. 去掉 #toolbar=0 等 PDF hash 参数，避免线上 iframe 加载不稳定
   5. 提供“新窗口打开图纸”兜底入口
   6. 从 FittingReplacementDetail.tsx 中抽离，保持详情页结构清晰

   为什么这样改：
   1. PDF 直链可以打开，说明文件和路径本身没问题
   2. 失败点大概率在 iframe 内嵌 PDF Viewer
   3. 线上部署环境下，内嵌 PDF 预览比直接打开更容易失败
   4. 新窗口打开 PDF 是最稳定的兜底方案

   注意：
   1. 这个文件只控制 2D 图纸预览逻辑
   2. 不修改详情页整体样式
   3. 不修改 CSS
========================================================= */

import { useEffect, useMemo, useState } from "react";

import LoadingProgress from "@/components/common/LoadingProgress";

/* PDF 图纸预览加载遮罩兜底时间 */
const DRAWING_PREVIEW_LOADING_TIME = 1200;

interface FittingReplacementDrawingPreviewProps {
  /* PDF 预览地址，可能带 #toolbar=0 等参数 */
  drawingPdfPreviewHref: string;

  /* 产品型号，用于 iframe title */
  productModel: string;
}

/* =========================================================
   2D 图纸预览组件
========================================================= */
export default function FittingReplacementDrawingPreview({
  drawingPdfPreviewHref,
  productModel,
}: FittingReplacementDrawingPreviewProps) {
  /* 是否显示 PDF 预览 */
  const [isDrawingPreviewVisible, setIsDrawingPreviewVisible] = useState(false);

  /* PDF 加载遮罩 */
  const [isDrawingLoading, setIsDrawingLoading] = useState(false);

  /* =========================================================
     纯 PDF 地址

     说明：
     1. FittingReplacementDetail.tsx 传进来的地址可能是：
        xxx.pdf#toolbar=0&navpanes=0&scrollbar=1
     2. 这里去掉 # 后面的参数
     3. 线上 iframe 直接加载纯 PDF 地址更稳定
  ========================================================= */
  const drawingPdfHref = useMemo(() => {
    return drawingPdfPreviewHref.split("#")[0];
  }, [drawingPdfPreviewHref]);

  /* =========================================================
     点击预览后显示加载遮罩
  ========================================================= */
  useEffect(() => {
    if (!isDrawingPreviewVisible) return;

    setIsDrawingLoading(true);

    const loadingTimer = window.setTimeout(() => {
      setIsDrawingLoading(false);
    }, DRAWING_PREVIEW_LOADING_TIME);

    return () => {
      window.clearTimeout(loadingTimer);
    };
  }, [isDrawingPreviewVisible, drawingPdfHref]);

  return (
    <section className="frd-drawing-section">
      <div className="frd-drawing-head">
        <h2>2D 图纸</h2>
      </div>

      <div className="frd-drawing-viewer">
        <LoadingProgress
          active={isDrawingPreviewVisible && isDrawingLoading}
          label="正在加载 2D 图纸..."
        />

        {!isDrawingPreviewVisible ? (
          <button
            className="frd-drawing-preview-card"
            type="button"
            onClick={() => {
              setIsDrawingPreviewVisible(true);
            }}
          >
            <span className="frd-drawing-play-icon" aria-hidden="true" />

            <strong>点击预览图纸</strong>

            <em>如需下载，请添加至清单列表</em>
          </button>
        ) : (
          <>
            <iframe
              key={drawingPdfHref}
              src={drawingPdfHref}
              className="frd-drawing-object is-visible"
              title={`${productModel} 2D PDF drawing`}
              loading="eager"
              onLoad={() => {
                setIsDrawingLoading(false);
              }}
            />

            {/* 
              兜底链接：
              如果浏览器内嵌 PDF Viewer 失败，客户仍然可以新窗口打开。
            */}
            <div className="frd-drawing-fallback">
              <a
                href={drawingPdfHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                新窗口打开 2D 图纸
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
} 