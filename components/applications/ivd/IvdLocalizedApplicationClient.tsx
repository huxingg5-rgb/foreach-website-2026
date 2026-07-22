"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import type {
  IvdApplicationPageData,
  IvdFluidicModule,
  IvdInstrument,
  IvdLocale,
} from "@/data/applications/ivd/ivd-application.types";

type TargetLocale = Exclude<IvdLocale, "zh-CN" | "en">;

type IvdLocalizedApplicationClientProps = {
  data: IvdApplicationPageData;
};

const UI_TEXT: Record<
  TargetLocale,
  {
    breadcrumbAria: string;
    instrumentTabsAria: string;
    focusKicker: string;
    moduleNavAria: string;
    moduleTagsAria: string;
    coreCapability: string;
    advantage: string;
    solves: string;
    viewProducts: string;
    contactEngineer: string;
  }
> = {
  es: {
    breadcrumbAria: "Ruta de navegación",
    instrumentTabsAria: "Tipos de instrumentos IVD",
    focusKicker: "Prioridades del instrumento seleccionado",
    moduleNavAria: "Navegación por módulos fluídicos",
    moduleTagsAria: "Aspectos clave del circuito fluídico",
    coreCapability: "Capacidad principal:",
    advantage: "Ventajas de aplicación",
    solves: "Problemas que ayuda a resolver",
    viewProducts: "Ver series de productos",
    contactEngineer: "Consultar a un ingeniero",
  },
  fr: {
    breadcrumbAria: "Fil d’Ariane",
    instrumentTabsAria: "Types d’instruments IVD",
    focusKicker: "Priorités de l’instrument sélectionné",
    moduleNavAria: "Navigation des modules fluidiques",
    moduleTagsAria: "Points clés du circuit fluidique",
    coreCapability: "Fonction principale :",
    advantage: "Avantages d’application",
    solves: "Problèmes traités",
    viewProducts: "Voir les gammes de produits",
    contactEngineer: "Consulter un ingénieur",
  },
  ko: {
    breadcrumbAria: "경로 탐색",
    instrumentTabsAria: "IVD 장비 유형",
    focusKicker: "선택 장비의 주요 고려사항",
    moduleNavAria: "유로 모듈 탐색",
    moduleTagsAria: "유로 핵심 항목",
    coreCapability: "핵심 기능:",
    advantage: "적용 장점",
    solves: "해결 과제",
    viewProducts: "제품 시리즈 보기",
    contactEngineer: "엔지니어 문의",
  },
  ru: {
    breadcrumbAria: "Навигационная цепочка",
    instrumentTabsAria: "Типы приборов IVD",
    focusKicker: "Ключевые требования выбранного прибора",
    moduleNavAria: "Навигация по жидкостным модулям",
    moduleTagsAria: "Ключевые параметры жидкостного тракта",
    coreCapability: "Основная функция:",
    advantage: "Преимущества применения",
    solves: "Решаемые задачи",
    viewProducts: "Смотреть серии продукции",
    contactEngineer: "Связаться с инженером",
  },
};

function isTargetLocale(locale: IvdLocale): locale is TargetLocale {
  return locale === "es" || locale === "fr" || locale === "ko" || locale === "ru";
}

export default function IvdLocalizedApplicationClient({
  data,
}: IvdLocalizedApplicationClientProps) {
  const firstInstrument = data.instruments[0];
  const searchParams = useSearchParams();
  const requestedInstrumentKey = searchParams.get("instrument") ?? "";
  const initialInstrument =
    data.instruments.find(
      (instrument) => instrument.key === requestedInstrumentKey,
    ) ?? firstInstrument;

  const [activeInstrumentKey, setActiveInstrumentKey] = useState(
    initialInstrument?.key ?? "",
  );
  const [activeModuleKey, setActiveModuleKey] = useState(
    initialInstrument?.modules[0]?.key ?? "",
  );
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

    /* eslint-disable react-hooks/set-state-in-effect -- Synchronize the initial selection with the hydrated URL query. */
    setActiveInstrumentKey(matchedInstrument.key);
    setActiveModuleKey(firstModule?.key ?? "");
    setActiveProductKey(firstModule?.products[0] ?? "");
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [data.instruments, searchParams]);

  const activeInstrument = useMemo<IvdInstrument>(() => {
    return (
      data.instruments.find(
        (instrument) => instrument.key === activeInstrumentKey,
      ) ?? data.instruments[0]
    );
  }, [activeInstrumentKey, data.instruments]);

  const activeModule = useMemo<IvdFluidicModule>(() => {
    return (
      activeInstrument.modules.find((item) => item.key === activeModuleKey) ??
      activeInstrument.modules[0]
    );
  }, [activeInstrument, activeModuleKey]);

  if (!isTargetLocale(data.locale) || !activeInstrument || !activeModule) {
    return null;
  }

  const ui = UI_TEXT[data.locale];
  const visibleProductKeys = activeModule.products;
  const currentProductKey = visibleProductKeys.includes(activeProductKey)
    ? activeProductKey
    : visibleProductKeys[0];

  function handleInstrumentChange(instrument: IvdInstrument) {
    const firstModule = instrument.modules[0];

    setActiveInstrumentKey(instrument.key);
    setActiveModuleKey(firstModule?.key ?? "");
    setActiveProductKey(firstModule?.products[0] ?? "");
  }

  function handleModuleChange(module: IvdFluidicModule) {
    setActiveModuleKey(module.key);
    setActiveProductKey(module.products[0] ?? "");
  }

  return (
    <main className="ivd-page">
      <section
        className="ivd-hero"
        style={{ backgroundImage: `url(${data.hero.backgroundImage})` }}
      >
        <div className="ivd-hero-inner">
          <div>
            <h1>
              {data.hero.title}
              <br />
              <span>{data.hero.highlight}</span>
            </h1>
            <p>{data.hero.description}</p>
          </div>

          {data.hero.panelTitle && data.hero.panelItems?.length ? (
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

      <section className="ivd-section" id="instruments">
        <div className="ivd-section-inner">
          <div className="ivd-section-head">
            <h2 className="ivd-section-title">{data.instrumentSection.title}</h2>
            <p className="ivd-section-desc">
              {data.instrumentSection.description}
            </p>
          </div>

          <div
            className="ivd-instrument-tabs"
            role="tablist"
            aria-label={ui.instrumentTabsAria}
          >
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

      <section className="ivd-instrument-focus-section">
        <div className="ivd-instrument-focus-bg" aria-hidden="true" />
        <div className="ivd-instrument-focus-overlay" aria-hidden="true" />

        <div className="ivd-instrument-focus-inner">
          <div className="ivd-instrument-focus-copy">
            <span className="ivd-instrument-focus-kicker">{ui.focusKicker}</span>
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

      <section className="ivd-section ivd-section-light">
        <div className="ivd-section-inner">
          <div className="ivd-section-head">
            <h2 className="ivd-section-title">{data.moduleSection.title}</h2>
            <p className="ivd-section-desc">{data.moduleSection.description}</p>
          </div>

          <div className="ivd-ability-layout ivd-ability-layout-top">
            <nav
              className="ivd-module-nav ivd-module-nav-top"
              aria-label={ui.moduleNavAria}
            >
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

                <div className="ivd-need-tags" aria-label={ui.moduleTagsAria}>
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
                    <article
                      className={`ivd-product-item${isActive ? " active" : ""}`}
                      key={product.key}
                    >
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
                          <b>{ui.coreCapability}</b> {product.ability}
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
                            <b>{ui.advantage}</b>
                            <span>{product.advantage}</span>
                          </div>

                          <div className="ivd-detail-box">
                            <b>{ui.solves}</b>
                            <span>{product.solves}</span>
                          </div>
                        </div>

                        <div className="ivd-product-actions">
                          <Link
                            className="ivd-product-action ivd-product-action-primary"
                            href={
                              product.productHref ??
                              `/${data.locale}/products`
                            }
                          >
                            {ui.viewProducts}
                          </Link>
                          <Link
                            className="ivd-product-action"
                            href={
                              product.contactHref ?? `/${data.locale}/contact`
                            }
                          >
                            {ui.contactEngineer}
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
            <h2>{data.ctaBanner.title}</h2>
            <p>{data.ctaBanner.description}</p>
          </div>

          <Link className="ivd-btn" href={data.ctaBanner.secondaryHref}>
            {data.ctaBanner.secondaryText}
          </Link>
        </div>
      </section>
    </main>
  );
}
