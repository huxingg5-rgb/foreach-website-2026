"use client";

/* =========================================================
   ProductModelViewer.tsx
   恒永达官网｜产品 3D 模型预览组件

   说明：
   1. @google/model-viewer 是浏览器端 Web Component
   2. 不能在文件顶部直接 import，否则构建时可能报 self is not defined
   3. 这里改为 useEffect 内动态 import，只在浏览器端加载
   4. 同时兼容现有 ProductDetailClient.tsx 传入的 slug / modelName / modelUrl
========================================================= */

import { createElement, useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";

type ProductModelViewerProps = {
  /* 当前产品 slug，旧详情页组件会传入 */
  slug?: string;

  /* 当前产品型号名称，旧详情页组件会传入 */
  modelName?: string;

  /* 兼容新组件可能使用的产品名称字段 */
  productModel?: string;

  /* 3D 模型文件路径 */
  modelUrl?: string;
};

export default function ProductModelViewer({
  slug,
  modelName,
  productModel,
  modelUrl,
}: ProductModelViewerProps) {
  const [isModelViewerReady, setIsModelViewerReady] = useState(false);

  const finalProductName = productModel || modelName || slug || "Product";

  useEffect(() => {
    let isMounted = true;

    async function loadModelViewer() {
      try {
        /*
          @google/model-viewer 只能在浏览器端加载。
          动态 import 可以避免 Next.js 在服务端预渲染时执行浏览器库。
        */
        await import("@google/model-viewer");

        if (isMounted) {
          setIsModelViewerReady(true);
        }
      } catch (error) {
        console.error("3D 模型预览组件加载失败：", error);

        if (isMounted) {
          setIsModelViewerReady(false);
        }
      }
    }

    loadModelViewer();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!modelUrl) {
    return (
      <div className={styles.modelViewerFallback}>
        暂未配置 3D 模型文件
      </div>
    );
  }

  if (!isModelViewerReady) {
    return (
      <div className={styles.modelViewerFallback}>
        3D 模型加载中...
      </div>
    );
  }

  return (
    <div className={styles.modelViewerCanvasWrap}>
      {createElement("model-viewer", {
        src: modelUrl,
        alt: `${finalProductName} 3D model`,
        cameraControls: true,
        autoRotate: true,
        shadowIntensity: "0.35",
        exposure: "0.9",
        ar: false,
        loading: "lazy",
        className: styles.modelViewerCanvas,
      })}
    </div>
  );
}
