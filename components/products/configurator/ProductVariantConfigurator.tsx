"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";

import {
  findMatchingConfiguratorVariants,
  formatConfiguratorValue,
  getAllDimensionValues,
  getAvailableDimensionValues,
  getSelectionFromVariant,
  isSameConfiguratorValue,
  normalizeConfiguratorSelection,
  updateConfiguratorSelection,
} from "./product-variant-configurator.engine";
import {
  localizeProductConfiguratorConfig,
  localizeProductConfiguratorValue,
} from "./product-variant-configurator.i18n";

import type {
  ProductConfiguratorSelection,
  ProductVariantConfiguratorProps,
} from "./product-variant-configurator.types";

import styles from "./product-variant-configurator.module.css";

const DEFAULT_UI_TEXT = {
  closeAriaLabel: "关闭选型",
  currentSelection: "当前选型",
  finalModel: "最终型号",
  productCode: "商品编码",
  configuration: "配置选择",
  selectionHint:
    "可调整规格组合，并将不同型号分别加入清单",
  matchedModel: "匹配型号",
  noMatchedModel: "暂无匹配型号",
  copyModel: "复制型号",
  copied: "已复制",
  addToList: "加入清单",
  addedToList: "已加入清单",
  confirmAndReturn: "确认并返回",
  defaultNoticeTitle: "批量定制说明：",
  defaultNotice:
    "如采购数量较大，可支持特殊规格定制，具体起订量与交期请联系我们确认。",
};

export default function ProductVariantConfigurator({
  open,
  config: sourceConfig,
  locale = "zh",
  value,
  onClose,
  onConfirm,
  isVariantSelected,
  onToggleVariant,
}: ProductVariantConfiguratorProps) {
  const config = useMemo(
    () =>
      localizeProductConfiguratorConfig(
        sourceConfig,
        locale
      ),
    [locale, sourceConfig]
  );

  const uiText = {
    ...DEFAULT_UI_TEXT,
    ...config.uiText,
  };

  const [mounted, setMounted] =
    useState(false);

  const [selection, setSelection] =
    useState<ProductConfiguratorSelection>(
      () => {
        const initialSelection =
          getSelectionFromVariant(
            config,
            value
          );

        return config
          .autoSelectFollowingDimensions ===
          false
          ? initialSelection
          : normalizeConfiguratorSelection(
              config,
              initialSelection
            );
      }
    );

  const [copyFeedback, setCopyFeedback] =
    useState(false);

  const [
    selectedMatchingVariantId,
    setSelectedMatchingVariantId,
  ] = useState(
    value?.id || ""
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const initialSelection =
      getSelectionFromVariant(
        config,
        value
      );

    setSelection(
      config.autoSelectFollowingDimensions ===
        false
        ? initialSelection
        : normalizeConfiguratorSelection(
            config,
            initialSelection
          )
    );

    setSelectedMatchingVariantId(
      value?.id || ""
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

  /*
   * 普通规格只有一个匹配型号，直接返回。
   *
   * 相同规格对应多个型号时，
   * 需要继续选择具体型号。
   */
  const matchingVariants = useMemo(
    () =>
      findMatchingConfiguratorVariants(
        config,
        selection
      ),
    [config, selection]
  );

  const matchingVariant = useMemo(
    () => {
      if (
        matchingVariants.length === 1
      ) {
        return matchingVariants[0];
      }

      if (
        matchingVariants.length > 1 &&
        selectedMatchingVariantId
      ) {
        return matchingVariants.find(
          (variant) =>
            variant.id ===
            selectedMatchingVariantId
        );
      }

      return undefined;
    },
    [
      matchingVariants,
      selectedMatchingVariantId,
    ]
  );

  const matchingVariantIsSelected =
    matchingVariant &&
    isVariantSelected
      ? isVariantSelected(
          matchingVariant
        )
      : false;

  const hasAnySelection =
    config.dimensions.some(
      (dimension) =>
        selection[dimension.key] !==
        undefined
    );

  const currentSelectionText = useMemo(
    () => {
      if (!hasAnySelection) {
        return (
          config.emptySelectionText ||
          "未选中状态"
        );
      }

      return [
        config.showProductNameInSelection ===
        false
          ? ""
          : config.productName,
        ...config.dimensions.map(
          (dimension) =>
            localizeProductConfiguratorValue(
              formatConfiguratorValue(
                selection[dimension.key],
                dimension.unit,
                dimension.precision
              ),
              locale
            )
        ),
      ]
        .filter(Boolean)
        .join(" / ");
    },
    [
      config,
      selection,
      hasAnySelection,
      locale,
    ]
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
            aria-label={uiText.closeAriaLabel}
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
              <span>{uiText.currentSelection}</span>

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
                <span>{uiText.finalModel}</span>
                <b>
                  {matchingVariant?.model ||
                    "—"}
                </b>
              </div>

              <div
                className={styles.summaryRow}
              >
                <span>{uiText.productCode}</span>
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
                      {localizeProductConfiguratorValue(
                        formatConfiguratorValue(
                          selection[
                            dimension.key
                          ],
                          dimension.unit,
                          dimension.precision
                        ),
                        locale
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
                      {localizeProductConfiguratorValue(
                        formatConfiguratorValue(
                          matchingVariant?.result?.[
                            row.key
                          ],
                          row.unit,
                          row.precision
                        ),
                        locale
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
              <h3>{uiText.configuration}</h3>

              <span>
                {uiText.selectionHint}
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

                                    setSelectedMatchingVariantId(
                                      ""
                                    );

                                    setCopyFeedback(
                                      false
                                    );

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
                                    {localizeProductConfiguratorValue(
                                      formatConfiguratorValue(
                                        optionValue,
                                        dimension.unit,
                                        dimension.precision
                                      ),
                                      locale
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

              {/* TPU_SIMPLIFIED_DUPLICATE_SELECTION_START */}
              {matchingVariants.length > 1 ? (
                <fieldset
                  className={
                    styles.optionGroup
                  }
                >
                  <legend>
                    {config.variantChoiceLabel ||
                      "请选择具体型号"}
                  </legend>

                  {config.variantChoiceHint ? (
                    <div
                      className={
                        styles.sectionHead
                      }
                    >
                      <span>
                        {config.variantChoiceHint}
                      </span>
                    </div>
                  ) : null}

                  <div
                    className={[
                      styles.optionList,
                      styles.columns2,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {matchingVariants.map(
                      (variant) => {
                        const active =
                          selectedMatchingVariantId ===
                          variant.id;

                        return (
                          <button
                            className={[
                              styles.option,
                              styles.single,
                              active
                                ? styles.active
                                : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            type="button"
                            key={variant.id}
                            aria-pressed={
                              active
                            }
                            onClick={() => {
                              setSelectedMatchingVariantId(
                                variant.id
                              );

                              setCopyFeedback(
                                false
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
                              {variant.model}
                              {" / "}
                              {variant.productCode}
                            </span>
                          </button>
                        );
                      }
                    )}
                  </div>
                </fieldset>
              ) : null}
              {/* TPU_SIMPLIFIED_DUPLICATE_SELECTION_END */}

              <div
                className={styles.modelResult}
              >
                <span>{uiText.matchedModel}</span>

                <strong>
                  {matchingVariant?.model ||
                    uiText.noMatchedModel}
                </strong>

                <button
                  className={styles.copyButton}
                  type="button"
                  disabled={!matchingVariant}
                  onClick={copyModel}
                >
                  {copyFeedback
                    ? uiText.copied
                    : uiText.copyModel}
                </button>
              </div>
            </div>
          </section>
        </div>

        <footer className={styles.footer}>
          <div className={styles.notice}>
            <b>
              {config.noticeTitle ||
                uiText.defaultNoticeTitle}
            </b>

            <span>
              {config.notice ||
                uiText.defaultNotice}
            </span>
          </div>

          <div className={styles.actions}>
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
                  ? uiText.addedToList
                  : uiText.addToList}
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
              {uiText.confirmAndReturn}
            </button>
          </div>
        </footer>
      </section>
    </div>,
    document.body
  );
}
