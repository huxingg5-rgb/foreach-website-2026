"use client";

﻿
import { useEffect, useRef, useState, type CSSProperties } from "react";
// 杩欐槸鍏充簬 components/home/HomeHeroSection.tsx 鐨勬枃浠讹細鐢ㄤ簬绠＄悊棣栭〉绗竴灞?Hero 棣栧睆鍐呭
// 杩欎釜鏂囦欢鐨勪綔鐢細鎶婇椤甸灞忎粠 HomePageContent.tsx 涓媶鍑烘潵锛屾柟渚垮悗缁淮鎶?

import Link from "next/link";

import {
  getLocaleAnchorPath,
  homeI18n,
  type LocaleCode,
} from "@/lib/i18n";

type HomeHeroSectionProps = {
  locale: LocaleCode;
};

export default function HomeHeroSection({
  locale,
}: HomeHeroSectionProps) {
  const homeText = homeI18n[locale];

  const productsHref = locale === "zh-CN" ? "/products" : `/${locale}/products`;
  const contactHref = locale === "zh-CN" ? "/contact" : `/${locale}/contact`;

  
  /* HOME_DESKTOP_SCROLL_HERO_COMPONENT_START */
  const scrollShellRef = useRef<HTMLDivElement>(null);
  const [desktopScrollProgress, setDesktopScrollProgress] = useState(0);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 1001px)");
    let frameId = 0;

    function updateProgress() {
      window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        if (!desktopMedia.matches) {
          setDesktopScrollProgress(0);
          return;
        }

        const shell = scrollShellRef.current;

        if (!shell) {
          return;
        }

        const rect = shell.getBoundingClientRect();
        const distance = Math.max(
          shell.offsetHeight - window.innerHeight,
          1
        );

        const progress = Math.min(
          Math.max(-rect.top / distance, 0),
          1
        );

        setDesktopScrollProgress(progress);
      });
    }

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);
    desktopMedia.addEventListener("change", updateProgress);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      desktopMedia.removeEventListener("change", updateProgress);
    };
  }, []);

  function rangeProgress(
    progress: number,
    start: number,
    end: number
  ) {
    if (progress <= start) {
      return 0;
    }

    if (progress >= end) {
      return 1;
    }

    const value = (progress - start) / (end - start);
    return value * value * (3 - 2 * value);
  }

  const titleProgress = rangeProgress(
    desktopScrollProgress,
    0.16,
    0.38
  );

  const subtitleProgress = rangeProgress(
    desktopScrollProgress,
    0.27,
    0.49
  );

  const actionProgress = rangeProgress(
    desktopScrollProgress,
    0.38,
    0.58
  );

  const staticProgress = rangeProgress(
    desktopScrollProgress,
    0.58,
    0.84
  );

  const overlayProgress = rangeProgress(
    desktopScrollProgress,
    0.08,
    0.58
  );

  const heroStyle = {
    "--home-hero-title-opacity": String(titleProgress),
    "--home-hero-subtitle-opacity": String(subtitleProgress),
    "--home-hero-actions-opacity": String(actionProgress),
    "--home-hero-static-opacity": String(staticProgress),
    "--home-hero-video-opacity": String(1 - staticProgress),
    "--home-hero-overlay-opacity": String(
      0.08 + overlayProgress * 0.52
    ),
    "--home-hero-video-scale": String(
      1 + desktopScrollProgress * 0.035
    ),
    "--home-hero-title-shift": `${(1 - titleProgress) * 32}px`,
    "--home-hero-subtitle-shift": `${(1 - subtitleProgress) * 28}px`,
    "--home-hero-actions-shift": `${(1 - actionProgress) * 24}px`,
  } as CSSProperties;
  /* HOME_DESKTOP_SCROLL_HERO_COMPONENT_END */

return (
    <div ref={scrollShellRef} className="home-hero-scroll-shell">
      <section
      className="home-hero"
      id="home"
    
        style={heroStyle}>
      <video
        className="home-hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
      >
        <source
          src="/images/home/home-banner-desktop.mp4?v=20260613"
          type="video/mp4"
        />
      </video>

        <img
          className="home-hero-static-image"
          src="/images/home/eas-home-scroll-static.webp"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
        />

      <div
        className="home-hero-overlay"
        aria-hidden="true"
      />

      <div className="home-hero-inner">
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
    </section>
    </div>
  );
}
