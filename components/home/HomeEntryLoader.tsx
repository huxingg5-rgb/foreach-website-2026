"use client";

/* HOME_ENTRY_LOADER_COMPONENT */

import { useEffect, useState } from "react";

const MIN_VISIBLE_MS = 2400;
const MAX_VISIBLE_MS = 4000;
const FADE_OUT_MS = 450;

/*
 * 首页加载动画版本。
 *
 * 同一浏览器记录该版本已经播放过后，
 * 再次进入中文或外语首页都会直接显示首页内容。
 *
 * 将来需要让所有用户重新播放一次时，
 * 只需要把 v1 改为 v2。
 */
const HOME_LOADER_STORAGE_KEY =
  "foreach-home-loader-v1";

const HOME_LOADER_SEEN_CLASS =
  "foreach-home-loader-seen-v1";

/*
 * 加载动画关键样式直接跟随组件进入首页 HTML。
 *
 * 这样即使 globals.css 尚未加载完成，
 * 白色覆盖层和五根竖条也可以立即显示。
 */
const loaderCriticalCss = `
  html,
  body {
    background-color: #ffffff;
  }

  html.foreach-home-loader-active,
  html.foreach-home-loader-active body {
    overflow: hidden;
  }

  /*
   * 已经播放过当前版本时，
   * 在 React 完成挂载前就隐藏加载层。
   */
  html.${HOME_LOADER_SEEN_CLASS}
    .home-entry-loader {
    display: none !important;
  }

  .home-entry-loader {
    position: fixed;
    inset: 0;
    z-index: 2147483000;

    display: block;

    width: 100%;
    height: 100%;

    background-color: #ffffff;

    opacity: 1;
    visibility: visible;
    pointer-events: auto;

    transition:
      opacity 450ms ease,
      visibility 0s linear 0s;

    will-change: opacity;
  }

  .home-entry-loader.home-entry-loader--leaving {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;

    transition:
      opacity 450ms ease,
      visibility 0s linear 450ms;
  }

  /*
   * PC：
   * 水平居中，垂直位于窗口高度的 80%。
   */
  .home-entry-loader__bars {
    position: absolute;
    left: 50%;
    top: 80%;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 12px;

    height: 92px;

    transform: translate(-50%, -50%);
  }

  /*
   * 初始状态不运行动画。
   *
   * 加载画面完成两帧渲染后，
   * 才会添加 home-entry-loader--running。
   */
  .home-entry-loader__bar {
    display: block;

    flex: 0 0 auto;

    width: 12px;
    height: 42px;

    border-radius: 999px;

    background-color: #09e9b4;

    opacity: 0.46;

    transform: scaleY(0.7);
    transform-origin: center center;

    animation: none;
  }

  /*
   * 加载画面真正进入浏览器后，
   * 动画才从第一帧开始运行。
   */
  .home-entry-loader--running
    .home-entry-loader__bar {
    animation-name:
      foreach-home-loader-bar;

    animation-duration:
      2.1s;

    animation-timing-function:
      ease-in-out;

    animation-iteration-count:
      infinite;

    animation-fill-mode:
      both;
  }

  .home-entry-loader__bar:nth-child(1) {
    animation-delay: 0ms;
  }

  .home-entry-loader__bar:nth-child(2) {
    animation-delay: 210ms;
  }

  .home-entry-loader__bar:nth-child(3) {
    animation-delay: 420ms;
  }

  .home-entry-loader__bar:nth-child(4) {
    animation-delay: 630ms;
  }

  .home-entry-loader__bar:nth-child(5) {
    animation-delay: 840ms;
  }

  /*
   * 手机：
   * 水平和垂直都居中。
   */
  @media (max-width: 768px) {
    .home-entry-loader__bars {
      top: 50%;

      gap: 10px;

      height: 76px;
    }

    .home-entry-loader__bar {
      width: 10px;
      height: 36px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .home-entry-loader--running
      .home-entry-loader__bar {
      animation: none;

      opacity: 1;

      transform: scaleY(1);
    }
  }

  @keyframes foreach-home-loader-bar {
    0%,
    100% {
      opacity: 0.46;

      transform: scaleY(0.7);
    }

    35% {
      opacity: 1;

      transform: scaleY(1.34);
    }

    56% {
      opacity: 0.92;

      transform: scaleY(1.1);
    }
  }
`;

export default function HomeEntryLoader() {
  /*
   * 服务端输出首页 HTML 时加载层就已经存在。
   */
  const [shouldRender, setShouldRender] =
    useState(true);

  /*
   * 初始为 false：
   * 第一帧只显示加载画面，不播放动画。
   */
  const [isRunning, setIsRunning] =
    useState(false);

  const [isLeaving, setIsLeaving] =
    useState(false);

  useEffect(() => {
    const rootElement =
      document.documentElement;

    const searchParams =
      new URLSearchParams(
        window.location.search,
      );

    const isPreviewMode =
      searchParams.get("loaderPreview") === "1";

    let hasShownLoader = false;

    if (!isPreviewMode) {
      try {
        hasShownLoader =
          window.localStorage.getItem(
            HOME_LOADER_STORAGE_KEY,
          ) === "shown";
      } catch {
        hasShownLoader = false;
      }
    }

    /*
     * 已经播放过当前版本：
     * 不启动动画、不等待视频，直接显示首页。
     */
    if (hasShownLoader) {
      rootElement.classList.remove(
        "foreach-home-loader-active",
      );

      rootElement.classList.add(
        HOME_LOADER_SEEN_CLASS,
      );

      setShouldRender(false);
      return;
    }

    /*
     * 第一次访问或强制预览时才启动加载画面。
     */
    rootElement.classList.remove(
      HOME_LOADER_SEEN_CLASS,
    );

    rootElement.classList.add(
      "foreach-home-loader-active",
    );

    let firstFrameId = 0;
    let secondFrameId = 0;

    let minimumTimer = 0;
    let maximumTimer = 0;
    let removeTimer = 0;

    let animationStarted = false;
    let animationStartedAt = 0;

    let heroResourceReady = false;
    let hasFinished = false;

    const heroVideo =
      document.querySelector<HTMLVideoElement>(
        ".home-hero-video",
      );

    const finishLoader = () => {
      if (hasFinished || isPreviewMode) {
        return;
      }

      hasFinished = true;

      setIsLeaving(true);

      removeTimer = window.setTimeout(() => {
        rootElement.classList.remove(
          "foreach-home-loader-active",
        );

        /*
         * 正常动画结束后记录当前版本已经播放。
         * 预览模式不会进入 finishLoader。
         */
        try {
          window.localStorage.setItem(
            HOME_LOADER_STORAGE_KEY,
            "shown",
          );
        } catch {
          // localStorage 不可用时不阻止首页显示。
        }

        rootElement.classList.add(
          HOME_LOADER_SEEN_CLASS,
        );

        setShouldRender(false);
      }, FADE_OUT_MS);
    };

    /*
     * 最短显示时间从动画真正开始时计算，
     * 不再从组件创建或页面请求时计算。
     */
    const tryFinish = () => {
      if (
        hasFinished ||
        isPreviewMode ||
        !animationStarted ||
        !heroResourceReady
      ) {
        return;
      }

      const elapsed =
        performance.now() -
        animationStartedAt;

      if (elapsed >= MIN_VISIBLE_MS) {
        finishLoader();
      }
    };

    const markHeroReady = () => {
      heroResourceReady = true;

      tryFinish();
    };

    /*
     * 连续两次 requestAnimationFrame：
     *
     * 第一次：
     * 浏览器准备显示白色加载层和静止竖条。
     *
     * 第二次：
     * 确认加载画面已经进入可见渲染流程，
     * 再添加运行 class，让动画从头开始。
     */
    const startLoaderAnimation = () => {
      if (animationStarted) {
        return;
      }

      animationStarted = true;
      animationStartedAt =
        performance.now();

      setIsRunning(true);

      /*
       * 预览模式永久显示，
       * 不创建退出计时器。
       */
      if (isPreviewMode) {
        return;
      }

      minimumTimer = window.setTimeout(
        tryFinish,
        MIN_VISIBLE_MS,
      );

      maximumTimer = window.setTimeout(
        finishLoader,
        MAX_VISIBLE_MS,
      );

      tryFinish();
    };

    /*
     * 先监听首页首屏资源。
     */
    if (heroVideo) {
      if (heroVideo.readyState >= 2) {
        markHeroReady();
      } else {
        heroVideo.addEventListener(
          "loadeddata",
          markHeroReady,
          { once: true },
        );

        heroVideo.addEventListener(
          "canplay",
          markHeroReady,
          { once: true },
        );

        /*
         * 视频失败时也允许继续进入首页。
         */
        heroVideo.addEventListener(
          "error",
          markHeroReady,
          { once: true },
        );
      }
    } else if (
      document.readyState === "complete"
    ) {
      markHeroReady();
    } else {
      window.addEventListener(
        "load",
        markHeroReady,
        { once: true },
      );
    }

    /*
     * 白色加载层先显示，
     * 动画下一阶段再开始。
     */
    firstFrameId =
      window.requestAnimationFrame(() => {
        secondFrameId =
          window.requestAnimationFrame(
            startLoaderAnimation,
          );
      });

    return () => {
      window.cancelAnimationFrame(
        firstFrameId,
      );

      window.cancelAnimationFrame(
        secondFrameId,
      );

      window.clearTimeout(
        minimumTimer,
      );

      window.clearTimeout(
        maximumTimer,
      );

      window.clearTimeout(
        removeTimer,
      );

      window.removeEventListener(
        "load",
        markHeroReady,
      );

      if (heroVideo) {
        heroVideo.removeEventListener(
          "loadeddata",
          markHeroReady,
        );

        heroVideo.removeEventListener(
          "canplay",
          markHeroReady,
        );

        heroVideo.removeEventListener(
          "error",
          markHeroReady,
        );
      }

      rootElement.classList.remove(
        "foreach-home-loader-active",
      );
    };
  }, []);

  if (!shouldRender) {
    return null;
  }

  const loaderClassName = [
    "home-entry-loader",
    isRunning
      ? "home-entry-loader--running"
      : "",
    isLeaving
      ? "home-entry-loader--leaving"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>

      <style
        dangerouslySetInnerHTML={{
          __html: loaderCriticalCss,
        }}
      />

      <div
        className={loaderClassName}
        role="status"
        aria-live="polite"
        aria-label="页面加载中"
      >
        <div
          className="home-entry-loader__bars"
          aria-hidden="true"
        >
          <span className="home-entry-loader__bar" />
          <span className="home-entry-loader__bar" />
          <span className="home-entry-loader__bar" />
          <span className="home-entry-loader__bar" />
          <span className="home-entry-loader__bar" />
        </div>
      </div>
    </>
  );
}