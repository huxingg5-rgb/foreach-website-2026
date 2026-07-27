"use client";

import { useEffect, useState, type ReactNode } from "react";

import styles from "./product-detail.module.css";

type PumpFileAvailability = "checking" | "available" | "missing";

type PumpUploadedFileGuardProps = {
  children: ReactNode;
  fileUrl: string;
  loadingFallback: ReactNode;
  missingFallback: ReactNode;
};

type FileNotUploadedDisplayProps = {
  locale: "zh" | "en";
};

function getFileCheckUrl(fileUrl: string): string {
  return fileUrl.trim().split("#", 1)[0];
}

export function PumpUploadedFileGuard({
  children,
  fileUrl,
  loadingFallback,
  missingFallback,
}: PumpUploadedFileGuardProps) {
  const checkUrl = getFileCheckUrl(fileUrl);
  const [availability, setAvailability] = useState<PumpFileAvailability>(
    checkUrl ? "checking" : "missing",
  );

  useEffect(() => {
    if (!checkUrl) {
      return;
    }

    const controller = new AbortController();

    void fetch(checkUrl, {
      method: "HEAD",
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => {
        if (response.status === 404 || response.status === 410) {
          setAvailability("missing");
          return;
        }

        setAvailability("available");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        // 网络或服务器不支持 HEAD 时保留原预览，避免误判已上传文件。
        setAvailability("available");
      });

    return () => {
      controller.abort();
    };
  }, [checkUrl]);

  if (availability === "missing") {
    return missingFallback;
  }

  if (availability === "checking") {
    return loadingFallback;
  }

  return children;
}

// 组件名称：2D 没上传文件显示
export function TwoDFileNotUploadedDisplay({
  locale,
}: FileNotUploadedDisplayProps) {
  return (
    <div
      className={[styles.panelBox, styles.noDrawingState].join(" ")}
      data-pump-2d-file-not-uploaded="true"
      data-product-drawing-empty-state="true"
    >
      <div className={styles.noDrawingContent}>
        <h3 className={styles.noDrawingTitle}>
          {locale === "en"
            ? "2D Drawing Not Available Yet"
            : "2D 图纸暂未上传"}
        </h3>
        <p className={styles.noDrawingDescription}>
          {locale === "en"
            ? "To request a 2D drawing for this product, please click “Add Drawing” above."
            : "如需该产品的 2D 图纸，请点击上方“添加图纸”按钮提交需求。"}
        </p>
      </div>
    </div>
  );
}

// 组件名称：3D 没上传文件显示
export function ThreeDFileNotUploadedDisplay({
  locale,
}: FileNotUploadedDisplayProps) {
  return (
    <div
      className={styles.modelViewerFallback}
      data-pump-3d-file-not-uploaded="true"
    >
      {locale === "en"
        ? "No public 3D model is available for this product."
        : "暂未配置 3D 模型文件"}
    </div>
  );
}

export function Pump2DFileCheckingDisplay({
  locale,
}: FileNotUploadedDisplayProps) {
  return (
    <div className={[styles.panelBox, styles.noDrawingState].join(" ")}>
      <div className={styles.noDrawingContent}>
        <h3 className={styles.noDrawingTitle}>
          {locale === "en" ? "Loading drawing..." : "图纸加载中..."}
        </h3>
      </div>
    </div>
  );
}

export function Pump3DFileCheckingDisplay({
  locale,
}: FileNotUploadedDisplayProps) {
  return (
    <div className={styles.modelViewerFallback}>
      {locale === "en" ? "Loading 3D model..." : "3D 模型加载中..."}
    </div>
  );
}
