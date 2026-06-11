"use client";

/* =========================================================
   AnalyticalInstrumentsApplicationClient.tsx
   恒永达官网｜分析仪器应用领域交互组件
========================================================= */

import Link from "next/link";
import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import { useEffect, useMemo, useState } from "react";

import type {
  AnalyticalInstrumentsApplicationPageData,
  AnalyticalInstrumentsApplicationType,
  AnalyticalInstrumentsFluidicModule,
} from "@/data/applications/analytical-instruments/analytical-instruments-application.types";

type AnalyticalInstrumentsApplicationClientProps = {
  data: AnalyticalInstrumentsApplicationPageData;
};

function getApplicationKeyFromUrl() {
  if (typeof window === "undefined") {
    return "";
  }

  return new URLSearchParams(window.location.search).get("application") ?? "";
}

export default function AnalyticalInstrumentsApplicationClient({
  data,
}: AnalyticalInstrumentsApplicationClientProps) {
  const firstApplication = data.applications[0];

  const [activeApplicationKey, setActiveApplicationKey] = useState(firstApplication?.key ?? "");
  const [activeModuleKey, setActiveModuleKey] = useState(firstApplication?.modules[0]?.key ?? "");
  const [activeProductKey, setActiveProductKey] = useState(
    firstApplication?.modules[0]?.products[0] ?? "",
  );

  useEffect(() => {
    const requestedApplicationKey = getApplicationKeyFromUrl();

    if (!requestedApplicationKey) {
      return;
    }

    const matchedApplication = data.applications.find(
      (application) => application.key === requestedApplicationKey,
    );

    if (!matchedApplication) {
      return;
    }

    const firstModule = matchedApplication.modules[0];

    setActiveApplicationKey(matchedApplication.key);
    setActiveModuleKey(firstModule?.key ?? "");
    setActiveProductKey(firstModule?.products[0] ?? "");
  }, [data.applications]);

  const activeApplication = useMemo<AnalyticalInstrumentsApplicationType>(() => {
    return (
      data.applications.find((application) => application.key === activeApplicationKey) ??
      data.applications[0]
    );
  }, [activeApplicationKey, data.applications]);

  const activeModule = useMemo<AnalyticalInstrumentsFluidicModule>(() => {
    return (
      activeApplication.modules.find((item) => item.key === activeModuleKey) ??
      activeApplication.modules[0]
    );
  }, [activeApplication, activeModuleKey]);

  const visibleProductKeys = activeModule.products;

  const currentProductKey = visibleProductKeys.includes(activeProductKey)
    ? activeProductKey
    : visibleProductKeys[0];

  function handleApplicationChange(application: AnalyticalInstrumentsApplicationType) {
    const firstModule = application.modules[0];
    const firstProduct = firstModule?.products[0] ?? "";

    setActiveApplicationKey(application.key);
    setActiveModuleKey(firstModule?.key ?? "");
    setActiveProductKey(firstProduct);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("application", application.key);
      window.history.replaceState(null, "", url.toString());
    }
  }

  function handleModuleChange(module: AnalyticalInstrumentsFluidicModule) {
    setActiveModuleKey(module.key);
    setActiveProductKey(module.products[0] ?? "");
  }

  return (
    <main className="ivd-page analytical-instruments-page">
      <section className="ivd-hero">
        <div className="ivd-hero-inner">
          <div>
            <h1>
              {data.hero.title}
              <br />
              <span>{data.hero.highlight}</span>
            </h1>

            <p>{data.hero.description}</p>
          </div>

          <aside className="ivd-hero-panel" aria-hidden="true">
            <h2>{data.hero.panelTitle}</h2>
            <ul>
              {data.hero.panelItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <SiteBreadcrumb ariaLabel="面包屑导航" items={data.breadcrumb} variant="bar" />

      <section className="ivd-section" id="applications">
        <div className="ivd-section-inner">
          <div className="ivd-section-head">
            <h2 className="ivd-section-title">{data.applicationSection.title}</h2>
            <p className="ivd-section-desc">{data.applicationSection.description}</p>
          </div>

          <div className="ivd-instrument-tabs" role="tablist" aria-label="分析仪器类型">
            {data.applications.map((application) => {
              const isActive = application.key === activeApplication.key;

              return (
                <button
                  className={`ivd-instrument-btn${isActive ? " active" : ""}`}
                  key={application.key}
                  type="button"
                  onClick={() => handleApplicationChange(application)}
                  aria-pressed={isActive}
                >
                  <b>{application.index}</b>
                  <strong>{application.title}</strong>
                  <span>{application.summary}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ivd-instrument-focus-section">
        <div className="ivd-instrument-focus-bg" aria-hidden="true"></div>
        <div className="ivd-instrument-focus-overlay" aria-hidden="true"></div>

        <div className="ivd-instrument-focus-inner">
          <div className="ivd-instrument-focus-copy">
            <span className="ivd-instrument-focus-kicker">{data.focusKicker}</span>
            <h2>{activeApplication.focusTitle}</h2>
            <p>{activeApplication.focusSummary}</p>
          </div>

          <div className="ivd-instrument-focus-grid">
            {activeApplication.focusPoints.map((point, index) => (
              <article className="ivd-instrument-focus-item" key={point}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <span>{point}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ivd-section ivd-section-light">
        <div className="ivd-section-inner">
          <div className="ivd-section-head">
            <h2 className="ivd-section-title">{data.moduleSection.title}</h2>
            <p className="ivd-section-desc">{data.moduleSection.description}</p>
          </div>

          <div className="ivd-ability-layout ivd-ability-layout-top">
            <nav className="ivd-module-nav ivd-module-nav-top" aria-label="液路部位导航">
              <div className="ivd-module-nav-list">
                {activeApplication.modules.map((module) => {
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

                <div className="ivd-need-tags">
                  {activeModule.tags.map((tag) => (
                    <span className="ivd-need-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>

              <div className="ivd-accordion">
                {visibleProductKeys.map((productKey) => {
                  const product = data.products[productKey];

                  if (!product) {
                    return null;
                  }

                  const isActive = productKey === currentProductKey;

                  return (
                    <article className={`ivd-product-item${isActive ? " active" : ""}`} key={productKey}>
                      <button
                        className="ivd-product-summary"
                        type="button"
                        onClick={() => setActiveProductKey(productKey)}
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
                          <Link className="ivd-product-action" href={data.productHref}>
                            查看产品系列
                          </Link>

                          <Link className="ivd-product-action" href={data.contactHref}>
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

      <section className="ivd-cta" id="contact">
        <div className="ivd-cta-inner">
          <div>
            <h2>{data.cta.title}</h2>
            <p>{data.cta.description}</p>
          </div>

          <Link className="ivd-btn" href={data.cta.href}>
            {data.cta.buttonLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}