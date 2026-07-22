"use client";

/* =========================================================
   IvdApplicationClient.tsx
   恒永达官网｜IVD 应用领域页客户端组件

   说明：
   1. 视觉结构严格参考 H5 最终预览版
   2. Banner 内保留面包屑
   3. 仪器类型使用 5 栏连体 Tab
   4. 当前仪器关注重点使用深蓝氛围区
   5. 第四块使用顶部液路导航 + 工程说明 + 产品手风琴
   6. 底部 CTA 使用单按钮
========================================================= */

import Link from "next/link";
import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import type {
  IvdApplicationPageData,
  IvdFluidicModule,
  IvdInstrument,
} from "@/data/applications/ivd/ivd-application.types";

type IvdApplicationClientProps = {
  data: IvdApplicationPageData;
};

export default function IvdApplicationClient({ data }: IvdApplicationClientProps) {
  const firstInstrument = data.instruments[0];

  const searchParams = useSearchParams();
  const requestedInstrumentKey = searchParams.get("instrument") ?? "";

  const initialInstrument =
    data.instruments.find((instrument) => instrument.key === requestedInstrumentKey) ??
    firstInstrument;

  const [activeInstrumentKey, setActiveInstrumentKey] = useState(initialInstrument?.key ?? "");
  const [activeModuleKey, setActiveModuleKey] = useState(initialInstrument?.modules[0]?.key ?? "");
  const [activeProductKey, setActiveProductKey] = useState(
    initialInstrument?.modules[0]?.products[0] ?? "",
  );

  useEffect(() => {
    const queryInstrumentKey = searchParams.get("instrument") ?? "";

    if (!queryInstrumentKey) {
      return;
    }

    const matchedInstrument = data.instruments.find(
      (instrument) => instrument.key === queryInstrumentKey,
    );

    if (!matchedInstrument) {
      return;
    }

    const firstModule = matchedInstrument.modules[0];

    setActiveInstrumentKey(matchedInstrument.key);
    setActiveModuleKey(firstModule?.key ?? "");
    setActiveProductKey(firstModule?.products[0] ?? "");
  }, [data.instruments, searchParams]);

  const activeInstrument = useMemo<IvdInstrument>(() => {
    return data.instruments.find((instrument) => instrument.key === activeInstrumentKey) ?? data.instruments[0];
  }, [activeInstrumentKey, data.instruments]);

  const activeModule = useMemo<IvdFluidicModule>(() => {
    return activeInstrument.modules.find((item) => item.key === activeModuleKey) ?? activeInstrument.modules[0];
  }, [activeInstrument, activeModuleKey]);

  const visibleProductKeys = activeModule.products;

  const currentProductKey = visibleProductKeys.includes(activeProductKey)
    ? activeProductKey
    : visibleProductKeys[0];

  function handleInstrumentChange(instrument: IvdInstrument) {
    const firstModule = instrument.modules[0];
    const firstProduct = firstModule?.products[0] ?? "";

    setActiveInstrumentKey(instrument.key);
    setActiveModuleKey(firstModule?.key ?? "");
    setActiveProductKey(firstProduct);
  }

  function handleModuleChange(module: IvdFluidicModule) {
    setActiveModuleKey(module.key);
    setActiveProductKey(module.products[0] ?? "");
  }

  return (
    <main className="ivd-page">
      {/* =====================================================
          Banner
          说明：
          1. 面包屑放在 Banner 内
          2. 右侧保留“覆盖关键液路环节”信息面板
      ===================================================== */}
      <section className="ivd-hero">
        <div className="ivd-hero-inner">
          <div>
<h1>
              微流体零部件及
              <br />
              <span>系统方案提供商</span>
            </h1>

            <p>
              面向 IVD 体外诊断设备，提供泵、阀、接头、管材、传感器及液路系统集成支持。
            </p>
          </div>

          <aside className="ivd-hero-panel">
            <h2>覆盖关键液路环节</h2>
            <ul>
              <li>样本吸取、试剂分配与微量液体处理</li>
              <li>多通道液路切换与路径控制</li>
              <li>清洗液输送、废液排放与维护流程</li>
              <li>压力、液位、气泡等液路状态监测</li>
            </ul>
          </aside>
        </div>
      </section>
      <SiteBreadcrumb
        ariaLabel="面包屑导航"
        items={data.breadcrumb}
        variant="bar"
      />

{/* =====================================================
          仪器类型
          说明：
          1. 使用 H5 原版连体 Tab
          2. 选中后深蓝底 + 荧光色主题字
      ===================================================== */}
      <section className="ivd-section" id="instruments">
        <div className="ivd-section-inner">
          <div className="ivd-section-head">
            <h2 className="ivd-section-title">仪器类型</h2>
            <p className="ivd-section-desc">
              选择具体 IVD 仪器后，下方内容会同步展示该仪器的关注重点与液路产品能力。
            </p>
          </div>

          <div className="ivd-instrument-tabs" role="tablist" aria-label="IVD 仪器类型">
            {data.instruments.map((instrument) => {
              const isActive = instrument.key === activeInstrument.key;

              return (
                <button
                  className={`ivd-instrument-btn${isActive ? " active" : ""}`}
                  key={instrument.key}
                  type="button"
                  onClick={() => handleInstrumentChange(instrument)}
                  aria-pressed={isActive}
                >
                  <b>{instrument.index}</b>
                  <strong>{instrument.title}</strong>
                  <span>{instrument.summary}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          当前仪器关注重点
          说明：
          1. 深蓝氛围背景区
          2. 左侧标题说明，右侧 2 × 2 重点卡
      ===================================================== */}
      <section className="ivd-instrument-focus-section">
        <div className="ivd-instrument-focus-bg" aria-hidden="true"></div>
        <div className="ivd-instrument-focus-overlay" aria-hidden="true"></div>

        <div className="ivd-instrument-focus-inner">
          <div className="ivd-instrument-focus-copy">
            <span className="ivd-instrument-focus-kicker">当前仪器关注重点</span>
            <h2>{activeInstrument.focusTitle}</h2>
            <p>{activeInstrument.focusSummary}</p>
          </div>

          <div className="ivd-instrument-focus-grid">
            {activeInstrument.focusPoints.map((point, index) => (
              <article className="ivd-instrument-focus-item" key={point}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <span>{point}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          关键液路部位与产品能力
          说明：
          1. 顶部液路导航
          2. 当前部位工程说明
          3. 产品能力手风琴
      ===================================================== */}
      <section className="ivd-section ivd-section-light">
        <div className="ivd-section-inner">
          <div className="ivd-section-head">
            <h2 className="ivd-section-title">关键液路部位与产品能力</h2>
            <p className="ivd-section-desc">
              选择液路部位后，只展示该部位相关产品。点击产品可展开参数、优势和解决问题。
            </p>
          </div>

          <div className="ivd-ability-layout ivd-ability-layout-top">
            <nav className="ivd-module-nav ivd-module-nav-top" aria-label="液路部位导航">
              <div className="ivd-module-nav-list">
                {activeInstrument.modules.map((module) => {
                  const isActive = module.key === activeModule.key;

                  return (
                    <button
                      className={`ivd-module-nav-btn${isActive ? " active" : ""}`}
                      key={module.key}
                      type="button"
                      onClick={() => handleModuleChange(module)}
                      aria-pressed={isActive}
                    >
                      <span className="ivd-module-nav-index">{module.index}</span>
                      <span className="ivd-module-nav-text">
                        <span className="ivd-module-nav-label">{module.navLabel}</span>
                        <span className="ivd-module-nav-subtitle">{module.navSubtitle}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </nav>

            <section className="ivd-ability-main">
              <article className="ivd-module-summary">
                <h3>{activeModule.title}</h3>
                <p>{activeModule.description}</p>

                <div className="ivd-need-tags" aria-label="液路关键词">
                  {activeModule.tags.map((tag) => (
                    <span className="ivd-need-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>

              <div className="ivd-accordion">
                {visibleProductKeys.map((productKey) => {
                  const product = data.productAbilities[productKey];

                  if (!product) {
                    return null;
                  }

                  const isActive = product.key === currentProductKey;

                  return (
                    <article className={`ivd-product-item${isActive ? " active" : ""}`} key={product.key}>
                      <button
                        className="ivd-product-summary"
                        type="button"
                        onClick={() => setActiveProductKey(product.key)}
                        aria-expanded={isActive}
                      >
                        <div className="ivd-product-title">
                          <h4>{product.name}</h4>
                          <p>{product.ability}</p>
                        </div>
                      </button>

                      <div className="ivd-product-detail">
                        <p className="ivd-detail-head">
                          <b>核心能力：</b>
                          {product.ability}
                        </p>

                        <div className="ivd-param-row">
                          {product.params.map((param) => (
                            <span className="ivd-param" key={param}>
                              {param}
                            </span>
                          ))}
                        </div>

                        <div className="ivd-detail-grid">
                          <div className="ivd-detail-box">
                            <b>适用优势</b>
                            <span>{product.advantage}</span>
                          </div>

                          <div className="ivd-detail-box">
                            <b>解决问题</b>
                            <span>{product.solves}</span>
                          </div>
                        </div>

                        <div className="ivd-product-actions">
                          <Link className="ivd-product-action ivd-product-action-primary" href={product.productHref ?? "/products"}>
                            查看产品系列
                          </Link>
                          <Link className="ivd-product-action" href={product.contactHref ?? "/contact"}>
                            咨询工程师
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* =====================================================
          底部联系 Banner
          说明：
          1. 保留 H5 原版单按钮
          2. 后期按钮可跳转到联系页或需求表单
      ===================================================== */}
      <section className="ivd-cta" id="contact">
        <div className="ivd-cta-inner">
          <div>
            <h2>有具体仪器液路需求？</h2>
            <p>
              可提交仪器类型、液体介质、流量范围、压力要求、管路尺寸和当前问题，
              由恒永达工程团队协助评估产品组合与液路方案。
            </p>
          </div>

          <Link className="ivd-btn" href={data.ctaBanner.secondaryHref || "/contact"}>
            提交应用需求
          </Link>
        </div>
      </section>
    </main>
  );
}