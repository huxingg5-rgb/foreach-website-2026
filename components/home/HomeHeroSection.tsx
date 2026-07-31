"use client";

﻿
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
// 杩欐槸鍏充簬 components/home/HomeHeroSection.tsx 鐨勬枃浠讹細鐢ㄤ簬绠＄悊棣栭〉绗竴灞?Hero 棣栧睆鍐呭
// 杩欎釜鏂囦欢鐨勪綔鐢細鎶婇椤甸灞忎粠 HomePageContent.tsx 涓媶鍑烘潵锛屾柟渚垮悗缁淮鎶?

import Image from "next/image";
import Link from "next/link";

import {
  homeI18n,
  type LocaleCode,
} from "@/lib/i18n";

type HomeHeroSectionProps = {
  locale: LocaleCode;
};

type FluidResistanceSlideCopy = {
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryButton: string;
};

const HOME_BANNER_REVEAL_MS = 2000;
const HOME_BANNER_INTERVAL_MS = 5000;
const HOME_BANNER_SLIDE_MS = 1150;
const HOME_BANNER_SLIDE_EASING =
  "cubic-bezier(0.76, 0, 0.24, 1)";

const fluidResistanceSlideCopy: Record<
  LocaleCode,
  FluidResistanceSlideCopy
> = {
  "zh-CN": {
    titleLine1: "流阻计算器",
    titleLine2: "让液路设计更有依据",
    description:
      "支持多流体、多段管路以及阀、接头等阻力元件，可由流量计算压降，也可由压降反算流量，帮助您快速验证液路方案并识别主要阻力来源。",
    primaryButton: "立即开始计算",
  },
  en: {
    titleLine1: "Flow Resistance",
    titleLine2: "Calculator",
    description:
      "Calculate pressure drop or flow for tubing, valves, and fittings.",
    primaryButton: "Calculate Now",
  },
  es: {
    titleLine1: "Calculadora de",
    titleLine2: "resistencia al flujo",
    description:
      "Calcule la pérdida de presión o el caudal en tubos, válvulas y conectores.",
    primaryButton: "Calcular",
  },
  fr: {
    titleLine1: "Calculateur de",
    titleLine2: "perte de charge",
    description:
      "Calculez la perte de charge ou le débit des tubes, vannes et raccords.",
    primaryButton: "Calculer",
  },
  ko: {
    titleLine1: "유체 저항 계산기",
    titleLine2: "",
    description:
      "튜빙, 밸브와 피팅의 압력 강하 또는 유량을 계산합니다.",
    primaryButton: "계산하기",
  },
  ru: {
    titleLine1: "Калькулятор",
    titleLine2: "гидросопротивления",
    description:
      "Рассчитайте перепад давления или расход для трубок, клапанов и фитингов.",
    primaryButton: "Рассчитать",
  },
};

export default function HomeHeroSection({
  locale,
}: HomeHeroSectionProps) {
  const homeText = homeI18n[locale];
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const productsHref = locale === "zh-CN" ? "/products" : `/${locale}/products`;
  const contactHref = locale === "zh-CN" ? "/contact" : `/${locale}/contact`;
  const fluidResistanceHref =
    locale === "zh-CN"
      ? "/resources/calculators/fluid-resistance"
      : `/${locale}/resources/calculators/fluid-resistance`;
  const fluidResistanceText = fluidResistanceSlideCopy[locale];

  
  /* HOME_DESKTOP_FINAL_BANNER_COMPONENT_START */
  const [
    desktopHeroActive,
    setDesktopHeroActive,
  ] = useState(false);
  const desktopHeroActiveRef =
    useRef(false);
  const [
    activeBannerIndex,
    setActiveBannerIndex,
  ] = useState(0);
  const [
    productSlideOffset,
    setProductSlideOffset,
  ] = useState(0);
  const [
    fluidSlideOffset,
    setFluidSlideOffset,
  ] = useState(100);
  const [
    bannerTransitioning,
    setBannerTransitioning,
  ] = useState(false);
  const [
    bannerTransitionEnabled,
    setBannerTransitionEnabled,
  ] = useState(true);
  const firstBannerCycleRef =
    useRef(true);
  const bannerTransitionHandledRef =
    useRef(false);

  useEffect(() => {
    const desktopMedia =
      window.matchMedia(
        "(min-width: 1001px)"
      );
    const reducedMotionMedia =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );
    let viewportFrame = 0;

    function activateDesktopBanner() {
      desktopHeroActiveRef.current =
        true;
      setDesktopHeroActive(true);
    }

    function resumeVideo(
      video: HTMLVideoElement,
      fallbackToDesktopBanner: boolean
    ) {
      const playAttempt =
        video.play();

      if (playAttempt) {
        void playAttempt.catch(() => {
          if (
            fallbackToDesktopBanner &&
            desktopMedia.matches
          ) {
            activateDesktopBanner();
          }
        });
      }
    }

    function handleMediaChange() {
      const video =
        heroVideoRef.current;

      if (desktopMedia.matches) {
        if (video) {
          video.loop = false;
        }

        if (reducedMotionMedia.matches) {
          video?.pause();
          activateDesktopBanner();
          return;
        }

        if (
          desktopHeroActiveRef.current
        ) {
          return;
        }

        if (!video) {
          activateDesktopBanner();
          return;
        }

        if (video.ended) {
          video.currentTime = 0;
        }

        resumeVideo(video, true);
        return;
      }

      desktopHeroActiveRef.current =
        false;
      setDesktopHeroActive(false);
      setActiveBannerIndex(0);
      setProductSlideOffset(0);
      setFluidSlideOffset(100);
      setBannerTransitioning(false);
      setBannerTransitionEnabled(true);
      firstBannerCycleRef.current =
        true;

      if (video) {
        video.loop = true;

        if (video.ended) {
          video.currentTime = 0;
        }

        resumeVideo(video, false);
      }
    }

    function repairVideoAfterViewportChange() {
      window.cancelAnimationFrame(
        viewportFrame
      );

      viewportFrame =
        window.requestAnimationFrame(
          () => {
            if (
              document.visibilityState !==
                "visible" ||
              reducedMotionMedia.matches
            ) {
              return;
            }

            const video =
              heroVideoRef.current;

            if (
              !video ||
              (desktopMedia.matches &&
                desktopHeroActiveRef.current)
            ) {
              return;
            }

            video.loop =
              !desktopMedia.matches;

            if (video.ended) {
              video.currentTime = 0;
            }

            resumeVideo(
              video,
              desktopMedia.matches
            );
          }
        );
    }

    handleMediaChange();

    desktopMedia.addEventListener(
      "change",
      handleMediaChange
    );
    reducedMotionMedia.addEventListener(
      "change",
      handleMediaChange
    );
    window.addEventListener(
      "resize",
      repairVideoAfterViewportChange,
      { passive: true }
    );
    document.addEventListener(
      "fullscreenchange",
      repairVideoAfterViewportChange
    );
    document.addEventListener(
      "visibilitychange",
      repairVideoAfterViewportChange
    );

    return () => {
      window.cancelAnimationFrame(
        viewportFrame
      );
      desktopMedia.removeEventListener(
        "change",
        handleMediaChange
      );
      reducedMotionMedia.removeEventListener(
        "change",
        handleMediaChange
      );
      window.removeEventListener(
        "resize",
        repairVideoAfterViewportChange
      );
      document.removeEventListener(
        "fullscreenchange",
        repairVideoAfterViewportChange
      );
      document.removeEventListener(
        "visibilitychange",
        repairVideoAfterViewportChange
      );
    };
  }, []);

  useEffect(() => {
    if (
      !desktopHeroActive ||
      bannerTransitioning
    ) {
      return;
    }

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    const slideTimer =
      window.setTimeout(() => {
        firstBannerCycleRef.current =
          false;
        bannerTransitionHandledRef.current =
          false;
        setBannerTransitioning(true);

        if (
          activeBannerIndex === 0
        ) {
          setProductSlideOffset(-100);
          setFluidSlideOffset(0);
          return;
        }

        setFluidSlideOffset(-100);
        setProductSlideOffset(0);
      },
      firstBannerCycleRef.current
        ? HOME_BANNER_REVEAL_MS +
            HOME_BANNER_INTERVAL_MS
        : HOME_BANNER_INTERVAL_MS
      );

    return () => {
      window.clearTimeout(
        slideTimer
      );
    };
  }, [
    activeBannerIndex,
    bannerTransitioning,
    desktopHeroActive,
  ]);

  const handleVideoPlaying = (
    event: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    const video = event.currentTarget;
    const revealVideo = () => {
      setVideoVisible(true);
    };

    if ("requestVideoFrameCallback" in video) {
      video.requestVideoFrameCallback(() => {
        revealVideo();
      });
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        revealVideo();
      });
    });
  };

  useEffect(() => {
    const video = heroVideoRef.current;

    if (
      video &&
      video.readyState >= 2
    ) {
      setVideoVisible(true);
    }
  }, []);

  const handleVideoError = () => {
    setVideoVisible(false);
    setVideoFailed(true);

    if (
      window.matchMedia(
        "(min-width: 1001px)"
      ).matches
    ) {
      desktopHeroActiveRef.current =
        true;
      setDesktopHeroActive(true);
    }
  };

  const handleVideoEnded = (
    event: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    if (
      window.matchMedia(
      "(min-width: 1001px)"
      ).matches
    ) {
      event.currentTarget.loop = false;
      desktopHeroActiveRef.current =
        true;
      setDesktopHeroActive(true);
      return;
    }

    const video = event.currentTarget;
    video.currentTime = 0;
    void video.play();
  };

  const startBannerTransition = (
    targetBannerIndex: number
  ) => {
    if (
      !desktopHeroActive ||
      bannerTransitioning ||
      targetBannerIndex ===
        activeBannerIndex
    ) {
      return;
    }

    firstBannerCycleRef.current =
      false;
    bannerTransitionHandledRef.current =
      false;
    setBannerTransitioning(true);

    if (activeBannerIndex === 0) {
      setProductSlideOffset(-100);
      setFluidSlideOffset(0);
      return;
    }

    setFluidSlideOffset(-100);
    setProductSlideOffset(0);
  };

  const handleBannerTransitionEnd = (
    event: React.TransitionEvent<HTMLElement>
  ) => {
    if (
      event.propertyName !==
        "transform" ||
      !bannerTransitioning ||
      bannerTransitionHandledRef.current
    ) {
      return;
    }

    bannerTransitionHandledRef.current =
      true;

    const nextBannerIndex =
      activeBannerIndex === 0
        ? 1
        : 0;

    setBannerTransitionEnabled(false);
    setActiveBannerIndex(
      nextBannerIndex
    );
    setBannerTransitioning(false);

    if (nextBannerIndex === 1) {
      setProductSlideOffset(100);
      setFluidSlideOffset(0);
    } else {
      setProductSlideOffset(0);
      setFluidSlideOffset(100);
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setBannerTransitionEnabled(true);
      });
    });
  };

  const heroStyle = {
    "--home-hero-title-opacity":
      desktopHeroActive
        ? "1"
        : "0",

    "--home-hero-subtitle-opacity":
      desktopHeroActive
        ? "1"
        : "0",

    "--home-hero-actions-opacity":
      desktopHeroActive
        ? "1"
        : "0",

    "--home-hero-static-opacity":
      desktopHeroActive
        ? "1"
        : "0",

    "--home-hero-carousel-opacity":
      desktopHeroActive
        ? "1"
        : "0",

    "--home-hero-video-opacity":
      desktopHeroActive ||
      videoFailed
        ? "0"
        : "1",

    "--home-hero-overlay-opacity":
      desktopHeroActive
        ? "0.42"
        : "0.08",

    "--home-hero-video-scale":
      "1",

    "--home-hero-title-shift":
      desktopHeroActive
        ? "0px"
        : "24px",

    "--home-hero-subtitle-shift":
      desktopHeroActive
        ? "0px"
        : "24px",

    "--home-hero-actions-shift":
      desktopHeroActive
        ? "0px"
        : "24px",

    "--home-hero-content-pointer-events":
      desktopHeroActive
        ? "auto"
        : "none",
  } as CSSProperties;
  /* HOME_DESKTOP_FINAL_BANNER_COMPONENT_END */

return (
    <div className="home-hero-scroll-shell">
      <section
      className="home-hero"
      id="home"
    
        style={heroStyle}
        data-desktop-hero-active={
          desktopHeroActive
            ? "true"
            : "false"
        }
        data-video-ready={
          videoVisible && !videoFailed
            ? "true"
            : "false"
        }>
      <video
        ref={heroVideoRef}
        className="home-hero-video"
        autoPlay
        muted
        playsInline
        preload="auto"
        onPlaying={handleVideoPlaying}
        onEnded={handleVideoEnded}
        onError={handleVideoError}
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
      >
        <source
          src="/images/home/home-banner-desktop.mp4?v=20260613"
          type="video/mp4"
        />
      </video>

      <div
        className="home-hero-mobile-overlay"
        aria-hidden="true"
      />

      <div className="home-hero-inner home-hero-mobile-copy">
        <h1 className="home-hero-title">
          {homeText.heroTitleLine1}

          <br />

          {homeText.heroTitleLine2}
        </h1>

        <p className="home-hero-subtitle">
          {homeText.heroSubtitle}
        </p>

        <div className="home-hero-actions">
          <Link
            href={productsHref}
            className="home-hero-btn home-hero-btn-primary"
          >
            {homeText.productButton}
          </Link>

          <Link
            href={contactHref}
            className="home-hero-btn home-hero-btn-secondary"
          >
            {homeText.contactButton}
          </Link>
        </div>
      </div>

      <div
        className="home-hero-carousel"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "block",
          overflow: "hidden",
          opacity:
            desktopHeroActive
              ? 1
              : 0,
          pointerEvents:
            desktopHeroActive
              ? "auto"
              : "none",
          transition: `opacity ${HOME_BANNER_REVEAL_MS}ms ease`,
        }}
        role="region"
        aria-roledescription={
          locale === "zh-CN"
            ? "轮播图"
            : "carousel"
        }
        aria-label={
          locale === "zh-CN"
            ? "首页轮播图"
            : "Homepage banners"
        }
        aria-hidden={!desktopHeroActive}
      >
        <div
          className="home-hero-carousel-track"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <article
            className="home-hero-slide home-hero-product-slide"
            aria-hidden={
              activeBannerIndex !== 0 &&
              !bannerTransitioning
            }
            onTransitionEnd={
              handleBannerTransitionEnd
            }
            style={{
              position: "absolute",
              inset: 0,
              isolation: "isolate",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              opacity:
                productSlideOffset === 0
                  ? 1
                  : 0.96,
              transform: `translate3d(${productSlideOffset}%, 0, 0)`,
              transition:
                bannerTransitionEnabled
                  ? `transform ${HOME_BANNER_SLIDE_MS}ms ${HOME_BANNER_SLIDE_EASING}, opacity ${HOME_BANNER_SLIDE_MS}ms ease`
                  : "none",
            }}
          >
            <Image
              className="home-hero-static-image"
              src="/images/home/home-hero-final-banner.webp"
              alt=""
              fill
              sizes="100vw"
              priority
              aria-hidden="true"
            />

            <div className="home-hero-inner">
              <h1 className="home-hero-title" data-home-hero-title="true">
                {homeText.heroTitleLine1}

                <br />

                {homeText.heroTitleLine2}
              </h1>

              <p className="home-hero-subtitle" data-home-hero-subtitle="true">
                {homeText.heroSubtitle}
              </p>

              <div className="home-hero-actions">
                <Link
                  href={productsHref}
                  className="home-hero-btn home-hero-btn-primary"
                  tabIndex={
                    desktopHeroActive &&
                    activeBannerIndex === 0
                      ? undefined
                      : -1
                  }
                >
                  {homeText.productButton}
                </Link>

                <Link
                  href={contactHref}
                  className="home-hero-btn home-hero-btn-secondary"
                  tabIndex={
                    desktopHeroActive &&
                    activeBannerIndex === 0
                      ? undefined
                      : -1
                  }
                >
                  {homeText.contactButton}
                </Link>
              </div>
            </div>
          </article>

          <article
            className="home-hero-slide home-hero-fluid-resistance-slide"
            aria-hidden={
              activeBannerIndex !== 1 &&
              !bannerTransitioning
            }
            onTransitionEnd={
              handleBannerTransitionEnd
            }
            style={{
              position: "absolute",
              inset: 0,
              isolation: "isolate",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              opacity:
                fluidSlideOffset === 0
                  ? 1
                  : 0.96,
              transform: `translate3d(${fluidSlideOffset}%, 0, 0)`,
              transition:
                bannerTransitionEnabled
                  ? `transform ${HOME_BANNER_SLIDE_MS}ms ${HOME_BANNER_SLIDE_EASING}, opacity ${HOME_BANNER_SLIDE_MS}ms ease`
                  : "none",
            }}
          >
            <Image
              className="home-hero-static-image"
              src="/images/home/eas-home-scroll-static.webp"
              alt=""
              fill
              sizes="100vw"
              priority
              aria-hidden="true"
            />

            <div className="home-hero-inner">
              <h2 className="home-hero-title" data-home-hero-title="true">
                {fluidResistanceText.titleLine1}

                {fluidResistanceText.titleLine2 ? (
                  <>
                    <br />

                    {fluidResistanceText.titleLine2}
                  </>
                ) : null}
              </h2>

              <p className="home-hero-subtitle" data-home-hero-subtitle="true">
                {fluidResistanceText.description}
              </p>

              <div className="home-hero-actions">
                <Link
                  href={fluidResistanceHref}
                  className="home-hero-btn home-hero-btn-primary"
                  tabIndex={
                    desktopHeroActive &&
                    activeBannerIndex === 1
                      ? undefined
                      : -1
                  }
                >
                  {fluidResistanceText.primaryButton}
                </Link>

                <Link
                  href={contactHref}
                  className="home-hero-btn home-hero-btn-secondary"
                  tabIndex={
                    desktopHeroActive &&
                    activeBannerIndex === 1
                      ? undefined
                      : -1
                  }
                >
                  {homeText.contactButton}
                </Link>
              </div>
            </div>
          </article>
        </div>

        <div
          className="home-hero-carousel-pagination"
          aria-label={
            locale === "zh-CN"
              ? "切换首页轮播图"
              : "Choose a homepage banner"
          }
        >
          {[0, 1].map((bannerIndex) => (
            <button
              key={bannerIndex}
              type="button"
              className="home-hero-carousel-dot"
              data-active={
                activeBannerIndex ===
                bannerIndex
                  ? "true"
                  : "false"
              }
              aria-label={
                locale === "zh-CN"
                  ? `显示第 ${bannerIndex + 1} 张轮播图`
                  : `Show banner ${bannerIndex + 1}`
              }
              aria-current={
                activeBannerIndex ===
                bannerIndex
                  ? "true"
                  : undefined
              }
              tabIndex={
                desktopHeroActive
                  ? 0
                  : -1
              }
              onClick={() => {
                startBannerTransition(
                  bannerIndex
                );
              }}
            />
          ))}
        </div>
      </div>
</section>
    </div>
  );
}
