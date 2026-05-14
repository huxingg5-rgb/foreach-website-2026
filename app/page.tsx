/**
 * HomePage
 * 官网首页
 *
 * 说明：
 * 1. 当前先做首屏测试，用于查看 Top 栏效果
 * 2. 后续首页内容会拆成 HeroSection、ProductOverviewSection 等组件
 */

import Link from "next/link"; // 引入 Next.js 内置跳转组件，用于页面跳转
export default function HomePage() {
  return (
    <main>
      <section className="home-hero" id="home">
        <div className="home-hero-inner">
          <h1 className="home-hero-title">
            微流体系统核心零部件
            <br />
            液路系统解决方案供应商
          </h1>

          <p className="home-hero-subtitle">
            为 IVD、生命科学、高端分析仪器、合成生物和实验室自动化提供关键流体控制产品与系统级支持
          </p>
          {/* 首页首屏按钮区域 */}
          <div className="home-hero-actions">
            {/* 产品中心按钮 */}
            <Link href="/#products" className="home-hero-btn home-hero-btn-primary">
              产品中心
            </Link>

            {/* 联系我们按钮 */}
            <Link href="/#contact" className="home-hero-btn home-hero-btn-secondary">
              联系我们
            </Link>
          </div>
        </div>

      </section>

      <section className="home-test-section">
        <div className="home-test-inner">
          <h2>滚动测试区域</h2>
          <p>向下滚动页面，Top 栏会从透明状态切换为白色背景。</p>
        </div>
      </section>
    </main>
  );
}
