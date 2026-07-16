"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import type {
  EnglishApplicationGroup,
  EnglishApplicationModule,
  EnglishApplicationPageData,
} from "@/data/applications/application-english";

type ApplicationEnglishClientProps = {
  data: EnglishApplicationPageData;
};

export default function ApplicationEnglishClient({
  data,
}: ApplicationEnglishClientProps) {
  const firstGroup = data.groups[0];
  const [activeGroupKey, setActiveGroupKey] = useState(firstGroup?.key ?? "");
  const [activeModuleKey, setActiveModuleKey] = useState(
    firstGroup?.modules[0]?.key ?? ""
  );
  const [activeProductKey, setActiveProductKey] = useState(
    firstGroup?.modules[0]?.products[0] ?? ""
  );

  useEffect(() => {
    const requestedKey = new URLSearchParams(window.location.search).get(
      data.queryKey
    );

    if (!requestedKey) {
      return;
    }

    const group = data.groups.find((item) => item.key === requestedKey);

    if (!group) {
      return;
    }

    const moduleItem = group.modules[0];

    /* eslint-disable react-hooks/set-state-in-effect -- Synchronize the initial selection with the hydrated URL query. */
    setActiveGroupKey(group.key);
    setActiveModuleKey(moduleItem?.key ?? "");
    setActiveProductKey(moduleItem?.products[0] ?? "");
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [data.groups, data.queryKey]);

  const activeGroup = useMemo<EnglishApplicationGroup>(() => {
    return (
      data.groups.find((group) => group.key === activeGroupKey) ?? data.groups[0]
    );
  }, [activeGroupKey, data.groups]);

  const activeModule = useMemo<EnglishApplicationModule>(() => {
    return (
      activeGroup.modules.find(
        (moduleItem) => moduleItem.key === activeModuleKey
      ) ??
      activeGroup.modules[0]
    );
  }, [activeGroup, activeModuleKey]);

  if (!activeGroup || !activeModule) {
    return null;
  }

  const currentProductKey = activeModule.products.includes(activeProductKey)
    ? activeProductKey
    : activeModule.products[0];

  function handleGroupChange(group: EnglishApplicationGroup) {
    const moduleItem = group.modules[0];
    setActiveGroupKey(group.key);
    setActiveModuleKey(moduleItem?.key ?? "");
    setActiveProductKey(moduleItem?.products[0] ?? "");
  }

  function handleModuleChange(moduleItem: EnglishApplicationModule) {
    setActiveModuleKey(moduleItem.key);
    setActiveProductKey(moduleItem.products[0] ?? "");
  }

  return (
    <main className="ivd-page">
      <section
        className="ivd-hero"
        style={
          data.hero.backgroundImage
            ? { backgroundImage: `url(${data.hero.backgroundImage})` }
            : undefined
        }
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

          <aside className="ivd-hero-panel">
            <h2>{data.hero.panelTitle}</h2>
            <ul>
              {data.hero.panelItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <SiteBreadcrumb
        ariaLabel="Breadcrumb navigation"
        items={data.breadcrumb}
        variant="bar"
      />

      <section className="ivd-section" id="applications">
        <div className="ivd-section-inner">
          <div className="ivd-section-head">
            <h2 className="ivd-section-title">{data.groupSectionTitle}</h2>
            <p className="ivd-section-desc">{data.groupSectionDescription}</p>
          </div>

          <div
            className="ivd-instrument-tabs"
            role="tablist"
            aria-label={data.groupSectionTitle}
          >
            {data.groups.map((group) => {
              const isActive = group.key === activeGroup.key;

              return (
                <button
                  className={`ivd-instrument-btn${isActive ? " active" : ""}`}
                  key={group.key}
                  type="button"
                  onClick={() => handleGroupChange(group)}
                  aria-pressed={isActive}
                >
                  <b>{group.index}</b>
                  <strong>{group.title}</strong>
                  <span>{group.summary}</span>
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
            <h2>{activeGroup.focusTitle}</h2>
            <p>{activeGroup.focusSummary}</p>
          </div>

          <div className="ivd-instrument-focus-grid">
            {activeGroup.focusPoints.map((point, index) => (
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
            <h2 className="ivd-section-title">{data.moduleSectionTitle}</h2>
            <p className="ivd-section-desc">{data.moduleSectionDescription}</p>
          </div>

          <div className="ivd-ability-layout ivd-ability-layout-top">
            <nav
              className="ivd-module-nav ivd-module-nav-top"
              aria-label="Fluidic module navigation"
            >
              <div className="ivd-module-nav-list">
                {activeGroup.modules.map((moduleItem) => {
                  const isActive = moduleItem.key === activeModule.key;

                  return (
                    <button
                      className={`ivd-module-nav-btn${isActive ? " active" : ""}`}
                      key={moduleItem.key}
                      type="button"
                      onClick={() => handleModuleChange(moduleItem)}
                      aria-pressed={isActive}
                    >
                      <span className="ivd-module-nav-index">
                        {moduleItem.index}
                      </span>
                      <span className="ivd-module-nav-text">
                        <span className="ivd-module-nav-label">
                          {moduleItem.navLabel}
                        </span>
                        <span className="ivd-module-nav-subtitle">
                          {moduleItem.navSubtitle}
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
                <div className="ivd-need-tags" aria-label="Relevant components">
                  {activeModule.tags.map((tag) => (
                    <span className="ivd-need-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>

              <div className="ivd-accordion">
                {activeModule.products.map((productKey) => {
                  const product = data.products[productKey];

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
                          <b>Core capability:</b> {product.ability}
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
                            <b>Application advantage</b>
                            <span>{product.advantage}</span>
                          </div>
                          <div className="ivd-detail-box">
                            <b>What it addresses</b>
                            <span>{product.solves}</span>
                          </div>
                        </div>

                        <div className="ivd-product-actions">
                          <Link
                            className="ivd-product-action ivd-product-action-primary"
                            href={product.productHref}
                          >
                            View Product Series
                          </Link>
                          <Link
                            className="ivd-product-action"
                            href={product.contactHref}
                          >
                            Contact an Engineer
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
