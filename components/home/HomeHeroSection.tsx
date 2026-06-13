// 这是关于 components/home/HomeHeroSection.tsx 的文件：用于管理首页第一屏 Hero 首屏内容
// 这个文件的作用：把首页首屏从 HomePageContent.tsx 中拆出来，方便后续维护

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

  const productsHref = getLocaleAnchorPath(
    locale,
    "products",
  );

  const contactHref = getLocaleAnchorPath(
    locale,
    "contact",
  );

  return (
    <section
      className="home-hero"
      id="home"
    >
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
  );
}
