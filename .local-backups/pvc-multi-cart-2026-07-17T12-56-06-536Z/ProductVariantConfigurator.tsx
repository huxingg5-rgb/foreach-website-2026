"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";

import {
  findMatchingConfiguratorVariant,
  formatConfiguratorValue,
  getAllDimensionValues,
  getAvailableDimensionValues,
  getSelectionFromVariant,
  isSameConfiguratorValue,
  normalizeConfiguratorSelection,
  updateConfiguratorSelection,
} from "./product-variant-configurator.engine";

import type {
  ProductConfiguratorSelection,
  ProductVariantConfiguratorProps,
} from "./product-variant-configurator.types";

import styles from "./product-variant-configurator.module.css";

export default function ProductVariantConfigurator({
  open,
  config,
  value,
  onClose,
  onConfirm,
  isVariantSelected,
  onToggleVariant,
}: ProductVariantConfiguratorProps) {
  const [mounted, setMounted] =
    useState(false);

  const [selection, setSelection] =
    useState<ProductConfiguratorSelection>(
      () =>
        normalizeConfiguratorSelection(
          config,
          getSelectionFromVariant(
            config,
            value
          )
        )
    );

  const [copyFeedback, setCopyFeedback] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    setSelection(
      normalizeConfiguratorSelection(
        config,
        getSelectionFromVariant(
          config,
          value
        )
      )
    );

    setCopyFeedback(false);
  }, [config, open, value]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousBodyOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousBodyOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose, open]);

  const matchingVariant = useMemo(
    () =>
      findMatchingConfiguratorVariant(
        config,
        selection
      ),
    [config, selection]
  );

  const matchingVariantIsSelected =
    matchingVariant &&
    isVariantSelected
      ? isVariantSelected(
          matchingVariant
        )
      : false;

  const currentSelectionText = useMemo(
    () =>
      [
        config.productName,
        ...config.dimensions.map(
          (dimension) =>
            formatConfiguratorValue(
              selection[dimension.key],
              dimension.unit,
              dimension.precision
            )
        ),
      ].join(" / "),
    [config, selection]
  );

  async function copyModel() {
    if (!matchingVariant) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        matchingVariant.model
      );
    }
    catch {
      const textarea =
        document.createElement("textarea");

      textarea.value =
        matchingVariant.model;

      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopyFeedback(true);

    window.setTimeout(() => {
      setCopyFeedback(false);
    }, 1000);
  }

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div className={styles.overlay}>
      <section
        className={styles.selector}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${config.id}-title`}
      >
        <header className={styles.header}>
          <div className={styles.headerText}>
            <h2 id={`${config.id}-title`}>
              {config.title}
            </h2>

            {config.description ? (
              <p>{config.description}</p>
            ) : null}
          </div>

          <button
            className={styles.closeButton}
            type="button"
            aria-label="关闭选型"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <div className={styles.main}>
          <aside
            className={styles.summary}
            aria-live="polite"
          >
            <div
              className={styles.summaryTitle}
            >
              <span>当前选型</span>

              <strong>
                {currentSelectionText}
              </strong>
            </div>

            <div
              className={styles.summaryTable}
            >
              <div
                className={styles.summaryRow}
              >
                <span>最终型号</span>
                <b>
                  {matchingVariant?.model ||
                    "—"}
                </b>
              </div>

              <div
                className={styles.summaryRow}
              >
                <span>商品编码</span>
                <b>
                  {matchingVariant?.productCode ||
                    "—"}
                </b>
              </div>

              {config.dimensions.map(
                (dimension) => (
                  <div
                    className={
                      styles.summaryRow
                    }
                    key={dimension.key}
                  >
                    <span>
                      {dimension.label}
                    </span>

                    <b>
                      {formatConfiguratorValue(
                        selection[
                          dimension.key
                        ],
                        dimension.unit,
                        dimension.precision
                      )}
                    </b>
                  </div>
                )
              )}

              {config.fixedSummaryRows?.map(
                (row) => (
                  <div
                    className={
                      styles.summaryRow
                    }
                    key={`${row.label}-${row.value}`}
                  >
                    <span>{row.label}</span>
                    <b>{row.value}</b>
                  </div>
                )
              )}

              {config.resultSummaryRows?.map(
                (row) => (
                  <div
                    className={
                      styles.summaryRow
                    }
                    key={row.key}
                  >
                    <span>{row.label}</span>

                    <b>
                      {formatConfiguratorValue(
                        matchingVariant?.result?.[
                          row.key
                        ],
                        row.unit,
                        row.precision
                      )}
                    </b>
                  </div>
                )
              )}
            </div>
          </aside>

          <section className={styles.config}>
            <div
              className={styles.sectionHead}
            >
              <h3>配置选择</h3>

              <span>
                灰色规格为当前组合下不可选
              </span>
            </div>

            <div className={styles.configBody}>
              <div
                className={styles.groupGrid}
              >
                {config.dimensions.map(
                  (
                    dimension,
                    dimensionIndex
                  ) => {
                    const allValues =
                      getAllDimensionValues(
                        config,
                        dimension
                      );

                    const availableValues =
                      getAvailableDimensionValues(
                        config,
                        selection,
                        dimensionIndex
                      );

                    const columnClass =
                      styles[
                        `columns${
                          dimension.columns ||
                          2
                        }`
                      ];

                    return (
                      <fieldset
                        className={
                          styles.optionGroup
                        }
                        key={dimension.key}
                      >
                        <legend>
                          {dimension.label}
                        </legend>

                        <div
                          className={[
                            styles.optionList,
                            columnClass,
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          {allValues.map(
                            (optionValue) => {
                              const active =
                                isSameConfiguratorValue(
                                  selection[
                                    dimension.key
                                  ],
                                  optionValue
                                );

                              const available =
                                availableValues.some(
                                  (value) =>
                                    isSameConfiguratorValue(
                                      value,
                                      optionValue
                                    )
                                );

                              return (
                                <button
                                  className={[
                                    styles.option,
                                    styles.single,
                                    active
                                      ? styles.active
                                      : "",
                                    !available
                                      ? styles.disabled
                                      : "",
                                  ]
                                    .filter(
                                      Boolean
                                    )
                                    .join(" ")}
                                  type="button"
                                  key={String(
                                    optionValue
                                  )}
                                  disabled={
                                    !available
                                  }
                                  aria-disabled={
                                    !available
                                  }
                                  aria-pressed={
                                    active
                                  }
                                  onClick={() => {
                                    if (
                                      !available
                                    ) {
                                      return;
                                    }

                                    setSelection(
                                      (
                                        current
                                      ) =>
                                        updateConfiguratorSelection(
                                          config,
                                          current,
                                          dimension.key,
                                          optionValue
                                        )
                                    );
                                  }}
                                >
                                  <span
                                    className={
                                      styles.check
                                    }
                                    aria-hidden="true"
                                  />

                                  <span>
                                    {formatConfiguratorValue(
                                      optionValue,
                                      dimension.unit,
                                      dimension.precision
                                    )}
                                  </span>
                                </button>
                              );
                            }
                          )}
                        </div>
                      </fieldset>
                    );
                  }
                )}
              </div>

              <div
                className={styles.modelResult}
              >
                <span>匹配型号</span>

                <strong>
                  {matchingVariant?.model ||
                    "暂无匹配型号"}
                </strong>

                <button
                  className={styles.copyButton}
                  type="button"
                  disabled={!matchingVariant}
                  onClick={copyModel}
                >
                  {copyFeedback
                    ? "已复制"
                    : "复制型号"}
                </button>
              </div>
            </div>
          </section>
        </div>

        <footer className={styles.footer}>
          <div className={styles.notice}>
            <b>
              {config.noticeTitle ||
                "批量定制说明："}
            </b>

            <span>
              {config.notice ||
                "如采购数量较大，可支持特殊规格定制，具体起订量与交期请联系我们确认。"}
            </span>
          </div>

          <div className={styles.actions}>
            <button
              className={
                styles.secondaryButton
              }
              type="button"
              onClick={() => {
                setSelection(
                  normalizeConfiguratorSelection(
                    config,
                    getSelectionFromVariant(
                      config,
                      null
                    )
                  )
                );
              }}
            >
              重置选型
            </button>

            {onToggleVariant ? (
              <button
                className={[
                  styles.listButton,
                  matchingVariantIsSelected
                    ? styles.listButtonActive
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                type="button"
                disabled={!matchingVariant}
                aria-pressed={
                  matchingVariantIsSelected
                }
                onClick={() => {
                  if (!matchingVariant) {
                    return;
                  }

                  onToggleVariant(
                    matchingVariant
                  );
                }}
              >
                {matchingVariantIsSelected
                  ? "当前型号已加入"
                  : "加入当前型号"}
              </button>
            ) : null}

            <button
              className={styles.primaryButton}
              type="button"
              disabled={!matchingVariant}
              onClick={() => {
                if (!matchingVariant) {
                  return;
                }

                onConfirm(matchingVariant);
              }}
            >
              确认并返回
            </button>
          </div>
        </footer>
      </section>
    </div>,
    document.body
  );
}