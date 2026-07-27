// 这是关于 components/home/HomeCompanyStrengthSection.tsx 的文件：用于管理首页第三屏公司介绍和第四屏企业优势模块
// 这个文件的作用：负责公司介绍区域、公司视频组件、数据动画、资质轮播和企业优势卡片的整体结构

"use client"; // 这个组件需要数字动画、IntersectionObserver 和浏览器动画帧，所以必须是客户端组件

import Link from "next/link"; // 引入 Next.js 的 Link 组件，用于站内跳转
import { useEffect, useRef, useState } from "react"; // 引入 React Hook，用于 DOM 引用、状态和副作用

import HomeCompanyVideo from "@/components/home/HomeCompanyVideo"; // 引入公司介绍视频组件

import type { LocaleCode } from "@/lib/i18n"; // 官网支持的语言代码类型

import { // 从 data/home-company-strength.ts 中引入公司实力模块数据
  getHomeCompanyText, // 公司实力模块多语言文字读取函数
  homeCompanyStrengthData, // 公司实力模块本地数据
} from "@/data/home-company-strength"; // 公司实力数据文件路径

type HomeCompanyStrengthSectionProps = { // 定义 HomeCompanyStrengthSection 组件接收的参数类型
  locale: LocaleCode; // 当前语言，例如 zh-CN / en / es / fr / ko / ru
}; // 组件参数类型定义结束

/* HOME_HONOR_CERTIFICATE_IMAGE_MAP_START */
const HOME_HONOR_CERTIFICATE_IMAGE_BY_KEY: Record<string, string> = {
  "national-high-tech":
    "/images/home/company-honors-original/national-high-tech.png",
  "engineering-center":
    "/images/home/company-honors-original/engineering-center.png",
  "little-giant":
    "/images/home/company-honors-original/little-giant.png",
  "gazelle-enterprise":
    "/images/home/company-honors-original/gazelle-enterprise.png",
  "iso-13485":
    "/images/home/company-honors-original/iso-13485.png",
  "iso-9001":
    "/images/home/company-honors-original/iso-9001.png",
};
/* HOME_HONOR_CERTIFICATE_IMAGE_MAP_END */

export default function HomeCompanyStrengthSection({ // 定义并导出首页公司实力组件
  locale, // 接收当前语言
}: HomeCompanyStrengthSectionProps) { // 组件参数定义结束
  const aboutData = homeCompanyStrengthData.about; // 读取公司介绍区域数据
  const companyVideoData = aboutData.video; // 读取公司介绍视频数据，后期可由后端接口返回
  const metrics = homeCompanyStrengthData.metrics; // 读取公司数据卡片数据
  const honors = homeCompanyStrengthData.honors; // 读取公司能力与资质轮播数据
  const advantagesSection = homeCompanyStrengthData.advantagesSection; // 读取企业优势标题区数据
  const advantages = homeCompanyStrengthData.advantages; // 读取企业优势卡片数据

  const metricsGridRef = useRef<HTMLDivElement | null>(null); // 数据卡片区域 DOM 引用，用于判断是否进入视口
  const animationFrameRef = useRef<number | null>(null); // requestAnimationFrame 的 id，用于组件卸载时取消动画

  const [shouldAnimateMetrics, setShouldAnimateMetrics] = useState(false); // 是否开始数字计数动画
  const [animatedMetricValues, setAnimatedMetricValues] = useState(() => // 当前动画中的数字值
    metrics.map(() => 0), // 初始时每个数字都从 0 开始
  ); // animatedMetricValues 状态定义结束

  const aboutForeachHref =
    locale === "zh-CN"
      ? "/about/foreach"
      : `/${locale}/about/foreach`;

  useEffect(() => { // 监听数据卡片是否进入视口的副作用开始
    const metricsGrid = metricsGridRef.current; // 获取数据卡片区域 DOM

    if (!metricsGrid) { // 如果数据卡片区域还没有渲染出来
      return; // 直接结束，不继续创建 observer
    } // DOM 存在判断结束

    const observer = new IntersectionObserver( // 创建 IntersectionObserver，用于监听元素是否进入视口
      (entries) => { // observer 回调函数开始
        if (entries.some((entry) => entry.isIntersecting)) { // 如果任意一个监听元素进入视口
          setShouldAnimateMetrics(true); // 启动数据卡片数字动画
          observer.disconnect(); // 动画只需要触发一次，触发后断开监听
        } // 是否进入视口判断结束
      }, // observer 回调函数结束
      { // observer 配置开始
        threshold: 0.28, // 元素进入约 28% 时触发
      }, // observer 配置结束
    ); // IntersectionObserver 创建结束

    observer.observe(metricsGrid); // 开始监听数据卡片区域

    return () => { // 组件卸载时执行清理函数
      observer.disconnect(); // 断开 IntersectionObserver，避免内存泄漏
    }; // 清理函数结束
  }, []); // 只在组件首次挂载时执行一次

  useEffect(() => { // 数据卡片数字动画副作用开始
    if (!shouldAnimateMetrics) { // 如果还没有触发动画
      return; // 直接返回，不启动动画
    } // 动画触发判断结束

    const startedAt = performance.now(); // 记录动画开始时间
    const duration = 1200; // 设置动画总时长，单位毫秒

    function easeOutCubic(progress: number) { // 定义缓动函数，让数字变化更自然
      return 1 - Math.pow(1 - progress, 3); // 返回 easeOutCubic 计算结果
    } // easeOutCubic 函数结束

    function updateMetricValues(now: number) { // 定义每一帧更新数字的函数
      const progress = Math.min((now - startedAt) / duration, 1); // 计算当前动画进度，并限制最大为 1
      const easedProgress = easeOutCubic(progress); // 使用缓动函数处理动画进度

      setAnimatedMetricValues( // 更新当前显示的数据值
        metrics.map((metric) => Math.round(metric.value * easedProgress)), // 根据动画进度计算每个数据卡片的当前数字
      ); // setAnimatedMetricValues 更新结束

      if (progress < 1) { // 如果动画还没结束
        animationFrameRef.current = // 保存当前动画帧 id
          window.requestAnimationFrame(updateMetricValues); // 请求下一帧继续更新数字
      } // 动画是否结束判断结束
    } // updateMetricValues 函数结束

    animationFrameRef.current = window.requestAnimationFrame(updateMetricValues); // 启动第一帧数字动画

    return () => { // 组件卸载或依赖变化时执行清理函数
      if (animationFrameRef.current !== null) { // 如果存在未取消的动画帧
        window.cancelAnimationFrame(animationFrameRef.current); // 取消动画帧，避免组件卸载后继续更新状态
      } // animationFrameRef 判断结束
    }; // 清理函数结束
  }, [shouldAnimateMetrics, metrics]); // 当 shouldAnimateMetrics 或 metrics 变化时重新执行

  return ( // 返回首页第三屏和第四屏结构
    <> {/* Fragment 外层，不额外生成 DOM */}
      <section className="home-company-about-section" id={aboutData.sectionId}> {/* 第三屏：公司介绍区域 */}
        <div className="home-company-about-shell"> {/* 公司介绍区域内容外壳 */}
          <div className="home-company-about-main"> {/* 公司介绍主要内容布局 */}
            <div className="home-company-about-left"> {/* 左侧：标题 + 公司视频 */}
              <h2 className="home-company-about-title"> {/* 公司介绍大标题 */}
                {getHomeCompanyText(aboutData.title, locale)} {/* 公司介绍标题多语言文字 */}

                <span>{getHomeCompanyText(aboutData.subtitle, locale)}</span> {/* 公司介绍副标题多语言文字 */}
              </h2> {/* 公司介绍大标题结束 */}

<HomeCompanyVideo
  videoSrc={companyVideoData.src} // 传入公司介绍视频地址，现在从 data/home-company-strength.ts 读取
  posterSrc={companyVideoData.posterSrc} // 传入公司介绍视频封面地址，现在从 data/home-company-strength.ts 读取
  videoAriaLabel={getHomeCompanyText(aboutData.videoAriaLabel, locale)} // 传入视频区域无障碍说明
  videoPlayAriaLabel={getHomeCompanyText(aboutData.videoPlayAriaLabel, locale)} // 传入播放按钮无障碍说明
  posterAlt={getHomeCompanyText(companyVideoData.posterAlt, locale)} // 传入视频封面 alt 文案，现在从 video.posterAlt 读取
  fallbackText={
    locale === "zh-CN"
      ? "当前浏览器不支持视频播放。"
      : "Your browser does not support video playback."
  }
/>
            </div> {/* 左侧：标题 + 公司视频结束 */}

            <div className="home-company-about-right"> {/* 右侧：公司介绍 + 数据卡片 + 联系按钮 */}
              <h3 className="home-company-intro-title"> {/* 公司介绍小标题 */}
                {getHomeCompanyText(aboutData.introTitle, locale)} {/* 公司介绍小标题多语言文字 */}
              </h3> {/* 公司介绍小标题结束 */}
              <p className="home-company-intro-copy">
                {getHomeCompanyText(homeCompanyStrengthData.about.introDescription, locale) ||
                  (locale === "zh-CN"
                    ? "恒永达科技长期专注于微流体系统核心部件与液路解决方案，围绕泵、阀、针、管路连接、传感器与智控模块，为 IVD、生命科学、实验室自动化和分析仪器客户提供稳定、可追溯、可集成的产品与技术支持。"
                    : "FOREACH focuses on core microfluidic components and fluidic system solutions, covering pumps, valves, probes, tubing connections, sensors, and control modules for IVD, life sciences, laboratory automation, and analytical instruments.")}
              </p> {/* 公司介绍描述结束 */}

              <div // 数据卡片网格开始
                ref={metricsGridRef} // 绑定数据卡片 DOM 引用
                className={ // 根据是否正在计数决定 class
                  shouldAnimateMetrics // 判断数字动画是否开始
                    ? "home-company-metrics-grid is-counting" // 动画开始时增加 is-counting
                    : "home-company-metrics-grid" // 默认数据卡片网格 class
                } // className 判断结束
              > {/* 数据卡片网格开始标签结束 */}
                {metrics.map((metric, index) => ( // 遍历公司数据卡片 */}
                  <div className="home-company-metric-card" key={metric.key}> {/* 单个数据卡片 */}
                    <strong> {/* 数据数字区域 */}
                      <span className="home-metric-number"> {/* 数字本体 */}
                        {animatedMetricValues[index]} {/* 当前动画数字 */}
                      </span> {/* 数字本体结束 */}

                      <span className="home-metric-suffix"> {/* 数字后缀 */}
                        {getHomeCompanyText(metric.suffix, locale)} {/* 数字后缀多语言文字 */}
                      </span> {/* 数字后缀结束 */}
                    </strong> {/* 数据数字区域结束 */}

                    <span>{getHomeCompanyText(metric.label, locale)}</span> {/* 数据说明文字 */}
                  </div> // 单个数据卡片结束
                ))} {/* 公司数据卡片遍历结束 */}
              </div> {/* 数据卡片网格结束 */}

              <div className="home-company-about-actions"> {/* 公司介绍按钮区域 */}
                <Link className="home-company-primary-btn brand-navy-button-motion" href={aboutForeachHref}> {/* 查看更多按钮 */}
                  {getHomeCompanyText(aboutData.contactButton, locale)} {/* 联系我们按钮多语言文字 */}
                </Link> {/* 联系我们按钮结束 */}
              </div> {/* 公司介绍按钮区域结束 */}
            </div> {/* 右侧：公司介绍 + 数据卡片 + 联系按钮结束 */}
          </div> {/* 公司介绍主要内容布局结束 */}

          <div // 公司能力与资质轮播区域开始
            className="home-honor-carousel-section" // 公司能力与资质轮播区域 class
            aria-label={getHomeCompanyText( // 公司能力与资质轮播无障碍说明
              homeCompanyStrengthData.honorsAriaLabel, // 读取轮播无障碍文案
              locale, // 当前语言
            )} // aria-label 结束
          > {/* 公司能力与资质轮播区域开始标签结束 */}
            <div className="home-honor-carousel-mask"> {/* 轮播遮罩容器 */}
              <div className="home-honor-track"> {/* 轮播轨道 */}
                {[...honors, ...honors].map((honor, index) => ( // 复制两份 honors，形成无缝轮播 */}
                  <div // 单个资质卡片开始
                    className="home-honor-card" // 资质卡片 class
                    key={`${honor.key}-${index}`} // React 列表 key
                  > {/* 单个资质卡片开始标签结束 */}
                    <div className="home-honor-image">
                      <img
                        src={
                          HOME_HONOR_CERTIFICATE_IMAGE_BY_KEY[honor.key] ??
                          "/images/about/foreach/honors/honor-main-certificate.webp"
                        }
                        alt={getHomeCompanyText(honor.title, locale)}
                        loading="lazy"
                        decoding="async"
                      />
                    </div> {/* 资质卡片图片占位 */}

                    <strong>{getHomeCompanyText(honor.title, locale)}</strong> {/* 资质卡片标题 */}
                  </div> // 单个资质卡片结束
                ))} {/* 资质卡片遍历结束 */}
              </div> {/* 轮播轨道结束 */}
            </div> {/* 轮播遮罩容器结束 */}
          </div> {/* 公司能力与资质轮播区域结束 */}
        </div> {/* 公司介绍区域内容外壳结束 */}
      </section> {/* 第三屏：公司介绍区域结束 */}

      <section // 第四屏：企业优势区域开始
        className="home-company-advantages-section" // 企业优势区域 class
        aria-labelledby="advantages-title" // 绑定标题 id，提升无障碍语义
      > {/* 第四屏：企业优势区域开始标签结束 */}
        <div className="home-advantages-head"> {/* 企业优势标题区域 */}
          <p className="home-advantages-kicker"> {/* 企业优势小标签 */}
            {getHomeCompanyText(advantagesSection.kicker, locale)} {/* 企业优势小标签多语言文字 */}
          </p> {/* 企业优势小标签结束 */}

          <h2 className="home-advantages-title" id="advantages-title"> {/* 企业优势主标题 */}
            {getHomeCompanyText(advantagesSection.title, locale)} {/* 企业优势主标题多语言文字 */}
          </h2> {/* 企业优势主标题结束 */}

          <p className="home-advantages-desc"> {/* 企业优势描述 */}
            {getHomeCompanyText(advantagesSection.description, locale)} {/* 企业优势描述多语言文字 */}
          </p> {/* 企业优势描述结束 */}
        </div> {/* 企业优势标题区域结束 */}

        <div className="home-advantage-panels"> {/* 企业优势卡片区域 */}
          {advantages.map((advantage) => ( // 遍历企业优势卡片
            <article // 单个企业优势卡片开始
              className={`home-advantage-panel ${advantage.className}`} // 拼接企业优势卡片 class
              key={advantage.key} // React 列表 key
            > {/* 单个企业优势卡片开始标签结束 */}
              <div className="home-panel-content"> {/* 企业优势卡片内容容器 */}
                <span className="home-panel-index">{advantage.index}</span> {/* 企业优势编号 */}

                <h3 className="home-panel-title"> {/* 企业优势标题 */}
                  {getHomeCompanyText(advantage.title, locale)} {/* 企业优势标题多语言文字 */}
                </h3> {/* 企业优势标题结束 */}

                <span className="home-panel-line" /> {/* 企业优势卡片装饰线 */}

                <div className="home-panel-copy-group"> {/* 企业优势两段正文独立容器 */}
                  <p className="home-panel-brief"> {/* 企业优势简短说明 */}
                    {getHomeCompanyText(advantage.brief, locale)} {/* 企业优势简短说明多语言文字 */}
                  </p> {/* 企业优势简短说明结束 */}

                  <p className="home-panel-detail"> {/* 企业优势详细说明 */}
                    {getHomeCompanyText(advantage.detail, locale)} {/* 企业优势详细说明多语言文字 */}
                  </p> {/* 企业优势详细说明结束 */}
                </div> {/* 企业优势两段正文独立容器结束 */}

                <span className="home-panel-arrow" aria-hidden="true"> {/* 企业优势卡片箭头 */}
                  → {/* 箭头符号 */}
                </span> {/* 企业优势卡片箭头结束 */}
              </div> {/* 企业优势卡片内容容器结束 */}
            </article> // 单个企业优势卡片结束
          ))} {/* 企业优势卡片遍历结束 */}
        </div> {/* 企业优势卡片区域结束 */}
      </section> {/* 第四屏：企业优势区域结束 */}
    </> // Fragment 外层结束
  ); // 返回首页第三屏和第四屏结构结束
} // HomeCompanyStrengthSection 组件结束
