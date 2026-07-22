"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";

type SpanishIndustryProduct = {
  name: string;
  ability: string;
  params: string[];
  advantage: string;
  solves: string;
};

type SpanishIndustryModule = {
  key: string;
  index: string;
  navLabel: string;
  navSubtitle: string;
  title: string;
  description: string;
  tags: string[];
  products: string[];
};

type SpanishIndustryApplication = {
  key: string;
  index: string;
  title: string;
  summary: string;
  focusTitle: string;
  focusSummary: string;
  focusPoints: string[];
  modules: SpanishIndustryModule[];
};

export type SpanishIndustryApplicationData = {
  breadcrumb: Array<{ label: string; href?: string }>;
  hero: {
    title: string;
    highlight: string;
    description: string;
    panelTitle: string;
    panelItems: string[];
  };
  applicationSection: {
    title: string;
    description: string;
  };
  focusKicker: string;
  moduleSection: {
    title: string;
    description: string;
  };
  cta: {
    title: string;
    description: string;
    buttonLabel: string;
    href: string;
  };
  productHref: string;
  contactHref: string;
  products: Record<string, SpanishIndustryProduct>;
  applications: SpanishIndustryApplication[];
};

type SpanishIndustryApplicationClientProps = {
  data: SpanishIndustryApplicationData;
  pageClassName: string;
  applicationTabsAria: string;
  uiText?: Partial<IndustryUiText>;
};

type IndustryUiText = {
  breadcrumbAria: string;
  moduleNavigationAria: string;
  primaryCapability: string;
  applicationAdvantages: string;
  problemsSolved: string;
  viewProductSeries: string;
  consultEngineer: string;
};

const SPANISH_UI_TEXT: IndustryUiText = {
  breadcrumbAria: "Ruta de navegación",
  moduleNavigationAria: "Navegación por módulos fluídicos",
  primaryCapability: "Capacidad principal:",
  applicationAdvantages: "Ventajas de aplicación",
  problemsSolved: "Problemas que ayuda a resolver",
  viewProductSeries: "Ver series de productos",
  consultEngineer: "Consultar a un ingeniero",
};

export const KOREAN_INDUSTRY_UI_TEXT: IndustryUiText = {
  breadcrumbAria: "이동 경로",
  moduleNavigationAria: "유로 모듈 탐색",
  primaryCapability: "핵심 기능:",
  applicationAdvantages: "적용 장점",
  problemsSolved: "해결 가능한 문제",
  viewProductSeries: "제품 시리즈 보기",
  consultEngineer: "엔지니어에게 문의",
};

function getApplicationKeyFromUrl() {
  if (typeof window === "undefined") {
    return "";
  }

  return new URLSearchParams(window.location.search).get("application") ?? "";
}

export default function SpanishIndustryApplicationClient({
  data,
  pageClassName,
  applicationTabsAria,
  uiText,
}: SpanishIndustryApplicationClientProps) {
  const ui = { ...SPANISH_UI_TEXT, ...uiText };
  const firstApplication = data.applications[0];
  const [activeApplicationKey, setActiveApplicationKey] = useState(
    firstApplication?.key ?? "",
  );
  const [activeModuleKey, setActiveModuleKey] = useState(
    firstApplication?.modules[0]?.key ?? "",
  );
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

    /* eslint-disable react-hooks/set-state-in-effect -- Synchronize the initial selection with the hydrated URL query. */
    setActiveApplicationKey(matchedApplication.key);
    setActiveModuleKey(firstModule?.key ?? "");
    setActiveProductKey(firstModule?.products[0] ?? "");
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [data.applications]);

  const activeApplication = useMemo(() => {
    return (
      data.applications.find(
        (application) => application.key === activeApplicationKey,
      ) ?? data.applications[0]
    );
  }, [activeApplicationKey, data.applications]);

  const activeModule = useMemo(() => {
    return (
      activeApplication.modules.find((item) => item.key === activeModuleKey) ??
      activeApplication.modules[0]
    );
  }, [activeApplication, activeModuleKey]);

  if (!activeApplication || !activeModule) {
    return null;
  }

  const visibleProductKeys = activeModule.products;
  const currentProductKey = visibleProductKeys.includes(activeProductKey)
    ? activeProductKey
    : visibleProductKeys[0];

  function handleApplicationChange(application: SpanishIndustryApplication) {
    const firstModule = application.modules[0];

    setActiveApplicationKey(application.key);
    setActiveModuleKey(firstModule?.key ?? "");
    setActiveProductKey(firstModule?.products[0] ?? "");

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("application", application.key);
      window.history.replaceState(null, "", url.toString());
    }
  }

  function handleModuleChange(module: SpanishIndustryModule) {
    setActiveModuleKey(module.key);
    setActiveProductKey(module.products[0] ?? "");
  }

  return (
    <main className={`ivd-page ${pageClassName}`}>
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

          {data.hero.panelTitle || data.hero.panelItems.length ? (
            <aside className="ivd-hero-panel">
              <h2>{data.hero.panelTitle}</h2>
              <ul>
                {data.hero.panelItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </section>

      <SiteBreadcrumb
        ariaLabel={ui.breadcrumbAria}
        items={data.breadcrumb}
        variant="bar"
      />

      <section className="ivd-section" id="applications">
        <div className="ivd-section-inner">
          <div className="ivd-section-head">
            <h2 className="ivd-section-title">{data.applicationSection.title}</h2>
            <p className="ivd-section-desc">
              {data.applicationSection.description}
            </p>
          </div>

          <div
            className="ivd-instrument-tabs"
            role="tablist"
            aria-label={applicationTabsAria}
          >
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
        <div className="ivd-instrument-focus-bg" aria-hidden="true" />
        <div className="ivd-instrument-focus-overlay" aria-hidden="true" />

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
            <nav
              className="ivd-module-nav ivd-module-nav-top"
              aria-label={ui.moduleNavigationAria}
            >
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
                        <span className="ivd-module-nav-label">
                          {module.navLabel}
                        </span>
                        <span className="ivd-module-nav-subtitle">
                          {module.navSubtitle}
                        </span>
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
                    <article
                      className={`ivd-product-item${isActive ? " active" : ""}`}
                      key={productKey}
                    >
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
                          <b>{ui.primaryCapability}</b> {product.ability}
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
                            <b>{ui.applicationAdvantages}</b>
                            <span>{product.advantage}</span>
                          </div>

                          <div className="ivd-detail-box">
                            <b>{ui.problemsSolved}</b>
                            <span>{product.solves}</span>
                          </div>
                        </div>

                        <div className="ivd-product-actions">
                          <Link
                            className="ivd-product-action"
                            href={data.productHref}
                          >
                            {ui.viewProductSeries}
                          </Link>
                          <Link
                            className="ivd-product-action"
                            href={data.contactHref}
                          >
                            {ui.consultEngineer}
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
