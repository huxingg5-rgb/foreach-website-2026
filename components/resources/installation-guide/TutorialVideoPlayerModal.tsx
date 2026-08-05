"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";

import type {
  InstallationGuideCard,
  InstallationGuideLocale,
} from "@/data/resources/installation-guide/installation-guide.types";

import "@/app/resources/installation-guide/installation-guide.css";

export type TutorialPlayerSource =
  | { type: "video"; src: string }
  | { type: "iframe"; src: string }
  | { type: "empty"; src: "" };

const modalText: Record<
  InstallationGuideLocale,
  { close: string; unavailable: string }
> = {
  "zh-CN": {
    close: "关闭视频",
    unavailable: "该教程视频暂未上传，请稍后查看或联系技术支持。",
  },
  en: {
    close: "Close video",
    unavailable:
      "This tutorial video has not been uploaded yet. Please check again later or contact technical support.",
  },
  es: {
    close: "Cerrar vídeo",
    unavailable: "El vídeo de este tutorial todavía no está disponible.",
  },
  fr: {
    close: "Fermer la vidéo",
    unavailable: "La vidéo de ce tutoriel n’est pas encore disponible.",
  },
  ko: {
    close: "동영상 닫기",
    unavailable: "이 튜토리얼 영상은 아직 업로드되지 않았습니다.",
  },
  ru: {
    close: "Закрыть видео",
    unavailable: "Видео для этой инструкции пока не загружено.",
  },
};

function appendUrlParameters(
  value: string,
  parameters: Record<string, string>,
) {
  try {
    const url = new URL(value);

    Object.entries(parameters).forEach(([key, parameterValue]) => {
      url.searchParams.set(key, parameterValue);
    });

    return url.toString();
  } catch {
    const separator = value.includes("?") ? "&" : "?";
    const query = Object.entries(parameters)
      .map(
        ([key, parameterValue]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(parameterValue)}`,
      )
      .join("&");

    return `${value}${separator}${query}`;
  }
}

function getYouTubeEmbedUrl(sourceUrl: string, autoplay: boolean) {
  if (sourceUrl.includes("youtube.com/embed/")) {
    return appendUrlParameters(sourceUrl, {
      autoplay: autoplay ? "1" : "0",
      rel: "0",
    });
  }

  const videoId =
    sourceUrl.match(/[?&]v=([^&]+)/)?.[1] ??
    sourceUrl.match(/youtu\.be\/([^?&/]+)/)?.[1] ??
    sourceUrl.match(/youtube\.com\/shorts\/([^?&/]+)/)?.[1];

  if (!videoId) return sourceUrl;

  return `https://www.youtube.com/embed/${videoId}?autoplay=${
    autoplay ? "1" : "0"
  }&rel=0`;
}

function getBilibiliEmbedUrl(sourceUrl: string, autoplay: boolean) {
  if (sourceUrl.includes("player.bilibili.com/player.html")) {
    return appendUrlParameters(sourceUrl, {
      autoplay: autoplay ? "1" : "0",
      high_quality: "1",
      danmaku: "0",
    });
  }

  const bvid = sourceUrl.match(/(BV[a-zA-Z0-9]+)/)?.[1];

  if (bvid) {
    return (
      `https://player.bilibili.com/player.html?bvid=${bvid}` +
      `&page=1&high_quality=1&danmaku=0&autoplay=${autoplay ? "1" : "0"}`
    );
  }

  const aid =
    sourceUrl.match(/\/video\/av(\d+)/i)?.[1] ??
    sourceUrl.match(/[?&]aid=(\d+)/i)?.[1];

  if (aid) {
    return (
      `https://player.bilibili.com/player.html?aid=${aid}` +
      `&page=1&high_quality=1&danmaku=0&autoplay=${autoplay ? "1" : "0"}`
    );
  }

  return sourceUrl;
}

export function getGuidePlayerSource(
  guide: InstallationGuideCard | null,
  autoplay: boolean,
): TutorialPlayerSource {
  const sourceUrl = String(guide?.videoUrl ?? "").trim();

  if (!sourceUrl) return { type: "empty", src: "" };

  if (guide?.videoPlatform === "youtube") {
    return { type: "iframe", src: getYouTubeEmbedUrl(sourceUrl, autoplay) };
  }

  if (guide?.videoPlatform === "bilibili") {
    return { type: "iframe", src: getBilibiliEmbedUrl(sourceUrl, autoplay) };
  }

  const isDirectVideo =
    sourceUrl.startsWith("/") || /\.(mp4|webm|ogg)(\?.*)?$/i.test(sourceUrl);

  return isDirectVideo
    ? { type: "video", src: sourceUrl }
    : { type: "iframe", src: sourceUrl };
}

type TutorialVideoPlayerModalProps = {
  guide: InstallationGuideCard;
  locale: InstallationGuideLocale;
  playRequestId: number;
  onClose: () => void;
};

export default function TutorialVideoPlayerModal({
  guide,
  locale,
  playRequestId,
  onClose,
}: TutorialVideoPlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const text = modalText[locale] ?? modalText.en;
  const playerSource = useMemo(
    () => getGuidePlayerSource(guide, true),
    [guide],
  );

  const closePlayer = useCallback(() => {
    videoRef.current?.pause();
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (playerSource.type !== "video") return;

    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.load();
    void videoElement.play().catch(() => {
      // The native controls remain available when autoplay is blocked.
    });

    return () => videoElement.pause();
  }, [playerSource, playRequestId]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") closePlayer();
    }

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [closePlayer]);

  return (
    <div className="installation-guide-modal-backdrop" onMouseDown={closePlayer}>
      <section
        className="installation-guide-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`tutorial-video-modal-${guide.id}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="installation-guide-modal-close"
          onClick={closePlayer}
          aria-label={text.close}
        >
          <span aria-hidden="true">×</span>
        </button>

        <div
          className={`installation-guide-modal-stage is-${playerSource.type}`}
        >
          {playerSource.type === "video" ? (
            <video
              key={`${guide.id}-${playRequestId}`}
              ref={videoRef}
              className="installation-guide-modal-video"
              src={playerSource.src}
              controls
              autoPlay
              playsInline
              preload="metadata"
            />
          ) : null}

          {playerSource.type === "iframe" ? (
            <iframe
              key={`${guide.id}-${playRequestId}`}
              className="installation-guide-modal-iframe"
              src={playerSource.src}
              title={guide.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : null}

          {playerSource.type === "empty" ? (
            <div className="installation-guide-modal-empty">
              <span aria-hidden="true">▶</span>
              <strong>{text.unavailable}</strong>
            </div>
          ) : null}
        </div>

        <div className="installation-guide-modal-title">
          <h2 id={`tutorial-video-modal-${guide.id}`}>{guide.title}</h2>
        </div>
      </section>
    </div>
  );
}
