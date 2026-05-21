import Image from "next/image";
import {
  aboutQualityImages,
  getAboutQualityContent,
  type AboutQualityLocale,
} from "@/data/about-quality";

/* ================================
   QualityPageContent.tsx
   质量体系与合规认证页面统一内容组件

   作用：
   1. 中文页面 /about/quality 调用这个组件
   2. 多语言页面 /en/about/quality 等也调用这个组件
   3. 页面结构只写一份，后期加模块、加背景、改布局只改这里
   4. 文案和图片路径来自 data/about-quality.ts
================================ */

type QualityPageContentProps = {
  /* 当前语言，例如：
     zh-CN / en / es / fr / ko / ru */
  locale: AboutQualityLocale;
};

export default function QualityPageContent({
  locale,
}: QualityPageContentProps) {
  /* 根据当前语言获取页面内容
     说明：
     1. 中文取 zh-CN
     2. 英文取 en
     3. 其他语言如果暂时没填完整，会先回退到英文 */
  const content = getAboutQualityContent(locale);

  return (
    <main className="quality-page">
      {/* ================================
          第一屏：质量方针 Banner
          图片：
          public/images/about/quality-banner.webp
      ================================ */}
      <section className="quality-policy-hero" aria-label={content.heroTitle}>
        <Image
          className="quality-policy-hero-image"
          src={aboutQualityImages.heroBanner}
          alt={content.heroTitle}
          fill
          priority
          sizes="100vw"
        />

        <div className="quality-policy-hero-overlay" aria-hidden="true" />

        <div className="quality-policy-hero-inner">
          <div className="quality-policy-text">
            <p>{content.heroTitle}</p>
            <p>{content.heroSubtitle}</p>
          </div>
        </div>
      </section>

      {/* ================================
          第二屏：质量生命线介绍
          图片：
          public/images/about/quality-management.webp
      ================================ */}
      <section className="quality-life-section" aria-labelledby="qualityLifeTitle">
        <div className="quality-life-inner">
          <div className="quality-life-image-wrap">
            <Image
              className="quality-life-image"
              src={aboutQualityImages.qualityManagement}
              alt={content.lifeTitle}
              fill
              sizes="(max-width: 1200px) 100vw, 800px"
            />
          </div>

          <div className="quality-life-content">
            <h2 className="quality-life-title" id="qualityLifeTitle">
              {content.lifeTitle}
            </h2>

            <p className="quality-life-text">
              {content.lifeTextBeforeStrong}
              <strong>{content.lifeTextStrong}</strong>
              {content.lifeTextAfterStrong}
            </p>

            <div className="quality-life-line" aria-hidden="true" />

            <p className="quality-life-subtext">{content.lifeSubtext}</p>
          </div>
        </div>
      </section>

      {/* ================================
          第三屏：全生命周期质量路径
          背景图：
          public/images/about/quality-path-bg.webp
      ================================ */}
      <section className="quality-path-section" aria-labelledby="qualityPathTitle">
        {/* 背景图层
           说明：
           1. 不直接写 CSS background-image
           2. 统一由 Next Image 管理
           3. 中英文、多语言页面都共用这一处结构 */}
        <div className="quality-path-bg" aria-hidden="true">
          <Image
            className="quality-path-bg-image"
            src={aboutQualityImages.qualityPathBg}
            alt=""
            fill
            sizes="100vw"
          />
        </div>

        <div className="quality-path-inner">
          <div className="quality-path-heading">
            <h2 className="quality-path-title" id="qualityPathTitle">
              {content.pathTitle}
            </h2>

            <p className="quality-path-summary">{content.pathSummary}</p>
          </div>

          <div className="quality-path-timeline" aria-label={content.pathTitle}>
            <svg
              className="quality-path-line"
              viewBox="0 0 1600 536"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className="quality-path-line-base"
                d="M 7 7 H 1518 Q 1593 7 1593 82 V 238 Q 1593 313 1518 313 H 7"
              />
              <path
                className="quality-path-line-flow"
                d="M 7 7 H 1518 Q 1593 7 1593 82 V 238 Q 1593 313 1518 313 H 7"
              />
            </svg>

            {content.pathSteps.map((step) => (
              <article className="quality-path-step" key={step.index}>
                <span className="quality-path-index">{step.index}</span>
                <h3 className="quality-path-step-title">{step.title}</h3>
                <p className="quality-path-step-desc">{step.description}</p>
              </article>
            ))}
          </div>

          <div className="quality-path-loop" aria-label={content.loopTitle}>
            <h3 className="quality-path-loop-title">{content.loopTitle}</h3>
            <p className="quality-path-loop-text">{content.loopText}</p>
          </div>
        </div>
      </section>

      {/* ================================
          第四屏：检测设备与质量验证能力
          图片目录：
          public/images/about/quality-equipment/
      ================================ */}
      <section
        className="quality-equipment-section"
        aria-labelledby="qualityEquipmentTitle"
      >
        <div className="quality-equipment-inner">
          <div className="quality-equipment-heading">
            <h2 className="quality-equipment-title" id="qualityEquipmentTitle">
              {content.equipmentTitle}
            </h2>

            <div className="quality-equipment-intro">
              {content.equipmentIntro.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>

          <div
            className="quality-equipment-grid"
            aria-label={content.equipmentTitle}
          >
            {content.equipmentItems.map((item) => (
              <article className="quality-equipment-item" key={item.name}>
                <div className="quality-equipment-image-wrap">
                  <Image
                    className="quality-equipment-image"
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>

                <h3 className="quality-equipment-name">{item.name}</h3>

                <p className="quality-equipment-desc">{item.description}</p>

                <div className="quality-equipment-data">
                  <div className="quality-equipment-data-title">
                    {item.parametersTitle}
                  </div>

                  <ul className="quality-equipment-data-list">
                    {item.parameters.map((parameter) => (
                      <li key={parameter}>{parameter}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <p className="quality-equipment-note">{content.equipmentNote}</p>
        </div>
      </section>

      {/* ================================
          第五屏：质量体系与合规认证
          背景图：
          public/images/about/quality-cert-bg.webp

          证书图片：
          public/images/about/quality-certificates/
      ================================ */}
      <section className="quality-cert-section" aria-labelledby="qualityCertTitle">
        {/* 背景图层
           说明：
           1. 证书模块背景也统一放在组件结构里
           2. 后期替换图片只改 public 里的同名图片即可 */}
        <div className="quality-cert-bg" aria-hidden="true">
          <Image
            className="quality-cert-bg-image"
            src={aboutQualityImages.qualityCertBg}
            alt=""
            fill
            sizes="100vw"
          />
        </div>

        <div className="quality-cert-inner">
          <div className="quality-cert-heading">
            <h2 className="quality-cert-title" id="qualityCertTitle">
              {content.certTitle}
            </h2>

            <p className="quality-cert-summary">{content.certSummary}</p>
          </div>

          <div className="quality-cert-layout">
            <div className="quality-cert-grid" aria-label={content.certTitle}>
              {content.certItems.map((item) => (
                <article className="quality-cert-card" key={item.name}>
                  <div className="quality-cert-image-wrap">
                    <Image
                      className="quality-cert-image"
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="300px"
                    />
                  </div>

                  <h3 className="quality-cert-name">{item.name}</h3>

                  <p className="quality-cert-desc">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}  