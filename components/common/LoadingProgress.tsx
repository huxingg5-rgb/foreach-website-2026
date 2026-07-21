"use client";

/* =========================================================
   LoadingProgress.tsx
   恒永达官网｜通用加载进度条组件

   文件路径：
   components/common/LoadingProgress.tsx

   作用：
   1. 用于 PDF 预览加载
   2. 后续可用于资料包生成、表单提交、文件上传等状态
   3. 这是视觉进度条，不依赖真实下载百分比
========================================================= */

import styles from "./LoadingProgress.module.css";

interface LoadingProgressProps {
  active: boolean;
  label?: string;
}

export default function LoadingProgress({
  active,
  label = "正在加载，请稍候...",
}: LoadingProgressProps) {
  if (!active) return null;

  return (
    <div className={styles.loadingProgress} aria-live="polite">
      <div className={styles.loadingProgressInner}>
        <span>{label}</span>

        <div className={styles.loadingTrack}>
          <div className={styles.loadingBar} />
        </div>
      </div>
    </div>
  );
} 