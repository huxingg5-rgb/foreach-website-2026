"use client";

/* =========================================================
   components/home/HomeCompanyStrengthSection.tsx

   首页第三屏 + 第四屏组件

   当前项目接入位置：
   components/home/HomePageContent.tsx

   第三屏：
   - 走进恒永达科技
   - 科研 制造 销售 服务
   - 企业视频位
   - 公司介绍
   - 企业数据动效
   - 企业荣誉轮播

   第四屏：
   - 企业优势横向展开

   注意：
   1. 样式写在 app/globals.css
   2. 不新增 home.css
   3. 不修改 html/body className，避免 page-scrolled 报错
========================================================= */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type HomeCompanyStrengthSectionProps = {
  locale?: string;
};

type CompanyMetric = {
  key: string;
  value: number;
  suffix: string;
  label: string;
};

type HonorItem = {
  key: string;
  title: string;
  image: string;
};

type AdvantageItem = {
  key: string;
  index: string;
  title: string;
  brief: string;
  detail: string;
  className: string;
};

/* 企业数据 */
const companyMetrics: CompanyMetric[] = [
  {
    key: "experience",
    value: 13,
    suffix: "+",
    label: "微流体领域经验",
  },
  {
    key: "ip",
    value: 96,
    suffix: "项",
    label: "知识产权",
  },
  {
    key: "customers",
    value: 2500,
    suffix: "+",
    label: "累计服务客户",
  },
  {
    key: "products",
    value: 5000,
    suffix: "+",
    label: "产品种类",
  },
];

/* 企业荣誉轮播数据 */
const honorItems: HonorItem[] = [
  {
    key: "specialized",
    title: "国家级专精特新“小巨人”企业",
    image: "/images/home/honors/honor-specialized.jpg",
  },
  {
    key: "high-tech",
    title: "国家高新技术企业",
    image: "/images/home/honors/honor-high-tech.jpg",
  },
  {
    key: "gazelle",
    title: "深圳市瞪羚企业",
    image: "/images/home/honors/honor-gazelle.jpg",
  },
  {
    key: "engineering-center",
    title: "广东省工程技术研究中心",
    image: "/images/home/honors/honor-engineering-center.jpg",
  },
  {
    key: "iso",
    title: "ISO 质量管理体系",
    image: "/images/home/honors/honor-iso.jpg",
  },
  {
    key: "standards",
    title: "行业与国家标准参与",
    image: "/images/home/honors/honor-standards.jpg",
  },
];

/* 第四屏企业优势数据 */
const advantageItems: AdvantageItem[] = [
  {
    key: "rd",
    index: "01 / 05",
    title: "研发创新",
    brief:
      "围绕微流体系统核心零部件持续研发，形成泵、阀、传感器、管路与连接件等产品技术积累。",
    detail:
      "持续关注精密输送、流路切换、状态检测和系统集成需求，通过产品研发与应用验证，提升液路系统关键部件的稳定性与适配能力。",
    className: "home-advantage-rd",
  },
  {
    key: "manufacturing",
    index: "02 / 05",
    title: "精密加工",
    brief:
      "具备精密加工与制造能力，为产品一致性、结构可靠性和批量交付提供基础保障。",
    detail:
      "通过加工、装配、测试等制造环节的持续优化，保障泵、阀、连接件、管路组件等产品在批量应用中的尺寸一致性与性能稳定性。",
    className: "home-advantage-manufacturing",
  },
  {
    key: "quality",
    index: "03 / 05",
    title: "质量保障",
    brief:
      "通过体系化质量控制和测试验证流程，保障产品在仪器液路系统中的稳定性与一致性。",
    detail:
      "从来料、加工、装配到出厂检测，围绕产品可靠性和批量一致性建立质量管控流程，满足客户长期应用和批量交付需求。",
    className: "home-advantage-quality",
  },
  {
    key: "custom",
    index: "04 / 05",
    title: "定制开发",
    brief:
      "根据客户应用场景、流量压力需求、结构空间和接口形式，提供贴合整机需求的适配开发。",
    detail:
      "面向不同仪器平台和液路结构，可在材料、接口、尺寸、参数和模块形式上进行适配，帮助客户降低选型和集成难度。",
    className: "home-advantage-custom",
  },
  {
    key: "service",
    index: "05 / 05",
    title: "服务支持",
    brief:
      "从产品选型、样品验证到问题分析与项目跟进，持续提供响应及时的技术与服务支持。",
    detail:
      "不仅提供产品，也关注客户项目导入过程中的实际问题，协助完成选型确认、样品测试、异常分析和批量应用支持。",
    className: "home-advantage-service",
  },
];

/* 数字滚动组件 */
function AnimatedMetricNumber({
  target,
  shouldPlay,
}: {
  target: number;
  shouldPlay: boolean;
}) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!shouldPlay) return;

    const duration = 1200;
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      /* 前快后慢的缓动效果 */
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(target * easedProgress);

      setCurrentValue(nextValue);

      if (progress < 1) {
        window.requestAnimationFrame(update);
      }
    }

    window.requestAnimationFrame(update);
  }, [target, shouldPlay]);

  return (
    <span className="home-metric-number">
      {currentValue.toLocaleString("zh-CN")}
    </span>
  );
}

export default function HomeCompanyStrengthSection({
  locale,
}: HomeCompanyStrengthSectionProps) {
  const metricAreaRef = useRef<HTMLDivElement | null>(null);
  const [shouldPlayMetric, setShouldPlayMetric] = useState(false);

  useEffect(() => {
    const metricArea = metricAreaRef.current;

    if (!metricArea) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry?.isIntersecting) {
          setShouldPlayMetric(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(metricArea);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* 适配你现在的多语言路径 */
  const aboutHref = locale ? `/${locale}/about` : "/about";

  /* 复制一组，实现无缝轮播 */
  const duplicatedHonorItems = [...honorItems, ...honorItems];

  return (
    <>
      {/* 第三屏：走进恒永达科技 */}
      <section className="home-company-about-section" id="company-about">
        <div className="home-company-about-shell">
          <div className="home-company-about-main">
            <div className="home-company-about-left">
              <h2 className="home-company-about-title">
                走进恒永达科技
                <span>科研 制造 销售 服务</span>
              </h2>

              <div
                className="home-company-video-wrap"
                aria-label="恒永达企业视频封面"
              >
                {/*
                  这里是企业视频预留位。
                  后面真实视频可以放到：
                  public/videos/company/foreach-company-video.mp4

                  封面图可以放到：
                  public/images/home/company/company-video-cover.jpg
                */}

                {/*
                <video
                  className="home-company-video-media"
                  src="/videos/company/foreach-company-video.mp4"
                  poster="/images/home/company/company-video-cover.jpg"
                  muted
                  loop
                  playsInline
                  controls
                />
                */}

                <button
                  className="home-company-video-play"
                  type="button"
                  aria-label="播放企业视频"
                />
              </div>
            </div>

            <div className="home-company-about-right">
              <h3 className="home-company-intro-title">公司介绍</h3>

              <p className="home-company-intro-desc">
                恒永达科技（股票代码：874030）成立于 2012
                年，作为国家级专精特新“小巨人”企业、深圳市瞪羚企业、国家高新技术企业及广东省工程技术研究中心认定单位，始终以微流体系统领域的创新引领者姿态，深耕于微流体核心部件的研发与制造。公司构建了覆盖自动化分析仪器液路系统全链条的产品矩阵，涵盖泵、阀、采样针、连接件、橡塑管、驱动器、传感器等关键零部件，广泛应用于生命科学、合成生物、高端检测等多个领域，形成了高精度、全场景的微流体解决方案体系。
                <br />
                <br />
                依托强大的自主创新能力，恒永达已累计获得各类知识产权近百项，多项核心技术成果入选政府重大技术攻关项目，并在行业标准化建设中发挥了重要作用，主导制定了
                3 项行业团体标准及 2
                项国家标准，持续推动行业技术规范的建立与完善……
              </p>

              <div
                ref={metricAreaRef}
                className="home-company-metrics-grid"
                aria-label="企业核心数据"
              >
                {companyMetrics.map((metric) => (
                  <div className="home-company-metric-card" key={metric.key}>
                    <strong>
                      <AnimatedMetricNumber
                        target={metric.value}
                        shouldPlay={shouldPlayMetric}
                      />
                      <span className="home-metric-suffix">
                        {metric.suffix}
                      </span>
                    </strong>

                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className="home-company-about-actions">
                <Link className="home-company-primary-btn" href={aboutHref}>
                  了解更多
                </Link>
              </div>
            </div>
          </div>

          <section
            className="home-honor-carousel-section"
            aria-label="企业荣誉轮播"
          >
            <div className="home-honor-carousel-mask">
              <div className="home-honor-track">
                {duplicatedHonorItems.map((honor, index) => (
                  <div
                    className="home-honor-card"
                    key={`${honor.key}-${index}`}
                  >
                    <div
                      className="home-honor-image"
                      style={
                        {
                          "--home-honor-image": `url("${honor.image}")`,
                        } as React.CSSProperties
                      }
                      aria-label={honor.title}
                    />

                    <strong>{honor.title}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* 第四屏：企业优势 */}
      <section
        className="home-company-advantages-section"
        id="company-advantages"
      >
        <div className="home-advantages-head">
          <p className="home-advantages-kicker">企业优势</p>

          <h2 className="home-advantages-title">
            支撑客户项目落地的核心能力
          </h2>

          <p className="home-advantages-desc">
            从产品研发、精密加工、质量验证到定制开发与服务支持，恒永达围绕客户整机液路需求，提供更贴近应用场景的产品与工程协同能力。
          </p>
        </div>

        <div className="home-advantage-panels" aria-label="企业优势列表">
          {advantageItems.map((item) => (
            <article
              className={`home-advantage-panel ${item.className}`}
              key={item.key}
            >
              <div className="home-panel-content">
                <span className="home-panel-index">{item.index}</span>

                <h3 className="home-panel-title">{item.title}</h3>

                <div className="home-panel-line" />

                <p className="home-panel-brief">{item.brief}</p>

                <p className="home-panel-detail">{item.detail}</p>

                <span className="home-panel-arrow">→</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}