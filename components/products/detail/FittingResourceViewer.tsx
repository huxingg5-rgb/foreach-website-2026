"use client";

import { trackProductTabSelect, trackResourceView } from "@/lib/analytics/track-event";
import { fittingView } from "@/components/products/detail/fitting-view";
import { fittingText } from "@/data/products/detail/fitting-ui.intl";
import { getProductResourceCopy } from "@/data/products/detail/product-resource-copy";
import { useEffect, useId, useRef, useState, type ComponentProps, type KeyboardEvent, type ReactNode } from "react";
import PdfDrawingPreview from "@/components/common/PdfDrawingPreview";
import ProductCadViewer from "./ProductCadViewer";
import LuerCadViewer from "./LuerCadViewer";
import ProductModelViewer from "./ProductModelViewer";
import ProductResourceSelector, { type ProductResourceSelection } from "./ProductResourceSelector";
import styles from "./FittingResourceViewer.module.css";
import { observeFittingModelActivity, scheduleFittingModelLoad } from "./fitting-model-loading";

export type FittingDrawing = {
  /** Stable assembly role, not SKU: changing the male SKU keeps the male drawing selected. */
  role: string;
  label: string;
  model: string;
  url: string | null | undefined;
};

export type FittingModelSource =
  | { kind: "cad"; props: Omit<ComponentProps<typeof ProductCadViewer>, "active" | "externalResourceTabs"> }
  | { kind: "luer"; parts: { model: string }[] }
  | { kind: "file"; slug: string; model: string; url: string }
  | { kind: "custom"; render: (active: boolean) => ReactNode }
  | null;

function drawingPreviewHref(url: string) {
  const [documentUrl, hash = ""] = url.split("#", 2);
  const options = new URLSearchParams(hash);
  options.set("toolbar", "0");
  options.set("navpanes", "0");
  options.set("scrollbar", "1");
  return `${documentUrl}#${options}`;
}

/** One activation lifecycle for every fitting detail, regardless of CAD renderer. */
export default function FittingResourceViewer({ locale = "zh", drawings, modelSource, active, preview = false, drawingOnly = false, productLayout = false, productSelection, controls, drawingPreview, drawingUnavailableMessage, analyticsProductId }: {
  locale?: string;
  drawings: FittingDrawing[];
  modelSource: FittingModelSource;
  active: boolean;
  preview?: boolean;
  drawingOnly?: boolean;
  productLayout?: boolean;
  productSelection?: ProductResourceSelection;
  controls?: ReactNode;
  drawingPreview?: ReactNode;
  drawingUnavailableMessage?: string;
  analyticsProductId?: string;
}) {
  const id = useId();
  const copy = getProductResourceCopy(locale);
  const startWithDrawing = drawingOnly || (productLayout && !modelSource && drawings.some(item => item.url));
  const [view, setView] = useState<"2d" | "3d" | null>(startWithDrawing ? "2d" : null);
  const [opened, setOpened] = useState({ "2d": startWithDrawing, "3d": false });
  const [drawingRole, setDrawingRole] = useState(drawings[0]?.role || "base");
  const resource = useRef<HTMLElement>(null);
  const pendingSelectionFocus = useRef<string | null>(null);
  const modelPanel = useRef<HTMLDivElement>(null);
  const manualChoice = useRef(false);
  const autoStarted = useRef(false);
  const cancelAutomatic = useRef<(() => void) | null>(null);
  const [visible, setVisible] = useState(false);
  const hasModel = Boolean(modelSource);
  const drawing = drawings.find(item => item.role === drawingRole) || drawings[0];
  const viewerSelection = productSelection && {
    ...productSelection,
    onChange: (value: string) => {
      pendingSelectionFocus.current = value;
      productSelection.onChange(value);
    },
  };
  useEffect(() => {
    const root = resource.current, value = pendingSelectionFocus.current;
    if (!root || !value || value !== productSelection?.value) return;
    // A different STEP model remounts the iframe. Keep keyboard navigation on
    // the chosen option, including when a variant has no public model.
    const restoreFocus = () => {
      if (pendingSelectionFocus.current !== value) return;
      const panel = root.querySelector<HTMLElement>('[role="tabpanel"]:not([hidden])');
      const frame = panel?.querySelector<HTMLIFrameElement>('[data-cad-model-status] iframe');
      if (frame && !panel?.querySelector('[data-cad-model-status="ready"]')) return;
      const scope = frame ? frame.contentDocument : panel;
      const choices = scope?.querySelectorAll<HTMLElement>('[data-product-resource-selection] [role="radio"][aria-checked="true"], select[data-product-resource-selection]');
      const target = Array.from(choices || []).find(element => element.getClientRects().length &&
        (element.dataset.productResourceValue || (element as HTMLSelectElement).value) === value);
      if (!target) return;
      target.focus({ preventScroll: true });
      if (target.matches('[role="radio"]') && target.parentElement) {
        const list = target.parentElement, item = target.getBoundingClientRect(), bounds = list.getBoundingClientRect();
        if (item.top < bounds.top) list.scrollTop += item.top - bounds.top;
        else if (item.bottom > bounds.bottom) list.scrollTop += item.bottom - bounds.bottom;
      }
      pendingSelectionFocus.current = null;
    };
    const cancel = () => { pendingSelectionFocus.current = null; };
    const observer = new MutationObserver(restoreFocus);
    observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-cad-model-status", "inert"] });
    document.addEventListener("pointerdown", cancel, true);
    document.addEventListener("keydown", cancel, true);
    restoreFocus();
    return () => {
      observer.disconnect();
      document.removeEventListener("pointerdown", cancel, true);
      document.removeEventListener("keydown", cancel, true);
    };
  }, [productSelection?.value, view]);
  useEffect(() => {
    if (!resource.current) return;
    return observeFittingModelActivity(resource.current, setVisible);
  }, []);
  useEffect(() => {
    // Product-data resources auto-load; the image-based hero and selection
    // previews retain their existing explicit activation.
    if (drawingOnly || preview || !active || !hasModel || manualChoice.current || autoStarted.current) return;
    const cancel = scheduleFittingModelLoad(() => {
      if (manualChoice.current) return;
      autoStarted.current = true;
      setView(current => current ?? "3d");
      setOpened(current => current["3d"] ? current : { ...current, "3d": true });
    });
    cancelAutomatic.current = cancel;
    return () => { cancel(); cancelAutomatic.current = null; };
  }, [active, hasModel, preview, drawingOnly]);
  const activate = (next: "2d" | "3d") => {
    manualChoice.current = true;
    cancelAutomatic.current?.();
    if (analyticsProductId && next !== view) {
      trackProductTabSelect({ locale, tabName: next, productId: analyticsProductId });
      const available = next === "2d" ? Boolean(drawing?.url || drawingPreview) : hasModel;
      if (available) {
        trackResourceView({
          locale, sourceSection: "product_resource_viewer", productId: analyticsProductId,
          resourceId: [analyticsProductId, next, next === "2d" ? drawing?.role : undefined].filter(Boolean).join(":"),
          resourceType: next === "2d" ? "2d_drawing" : "3d_model",
          fileType: next === "2d" ? drawing?.url?.split(/[?#]/, 1)[0].split(".").at(-1) || "unknown" : "unknown",
        });
      }
    }
    setView(next);
    setOpened(current => current[next] ? current : { ...current, [next]: true });
  };
  const navigateTabs = (event: KeyboardEvent<HTMLButtonElement>, current: "2d" | "3d") => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = drawingOnly || event.key === "Home" ? "2d" : event.key === "End" ? "3d" : current === "2d" ? "3d" : "2d";
    document.getElementById(`${id}-${next}-tab`)?.focus();
    activate(next);
  };
  const modelActive = active && view === "3d" && visible;

  useEffect(() => {
    if (preview || view !== "3d") return;
    const tabs = resource.current?.querySelector<HTMLElement>('[role="tablist"]');
    const panel = modelPanel.current;
    if (!tabs || !panel) return;
    // Both CAD renderers share the toolbar CSS. Reserve exactly the space
    // occupied by the localized React tabs, including after a frame retry.
    const alignTools = () => {
      const frame = panel.querySelector("iframe");
      if (!frame || !frame.getBoundingClientRect().width) return;
      const inset = Math.ceil(tabs.getBoundingClientRect().right - frame.getBoundingClientRect().left) + 8;
      try {
        // A newly loading PDF can have no documentElement; Chrome's native PDF
        // renderer can also use a separate origin. Neither affects 3D alignment.
        frame.contentDocument?.documentElement?.style.setProperty("--resource-tools-left", `${inset}px`);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "SecurityError")) throw error;
      }
    };
    const observer = new ResizeObserver(alignTools);
    observer.observe(tabs);
    observer.observe(panel);
    panel.addEventListener("load", alignTools, true);
    alignTools();
    return () => { observer.disconnect(); panel.removeEventListener("load", alignTools, true); };
  }, [view, locale, preview]);

  return fittingView(<section ref={resource} className={`${styles.resource} ${preview ? styles.preview : ""} ${drawingOnly ? styles.drawingOnly : ""} ${productLayout ? styles.productLayout : ""}`} data-fitting-resources={preview ? undefined : "true"}
    data-product-resource-layout={productLayout ? "q2001" : undefined}
    data-fitting-preview={preview ? "true" : undefined} data-resource-view={view || "idle"}
    data-drawing-only={drawingOnly ? "true" : undefined}
    data-model-active={String(modelActive)}
    data-opened-2d={opened["2d"]} data-opened-3d={opened["3d"]} aria-label={drawingOnly ? "2D 图纸" : "2D 图纸与 3D 模型"}>
    {controls}
    <div className={styles.viewport}>
      {!preview && <div className={styles.tabs} role="tablist" aria-label={drawingOnly ? "2D 图纸" : "2D/3D资源切换"}>
        {(drawingOnly ? ["2d"] as const : ["2d", "3d"] as const).map(tab => <button key={tab} type="button" role="tab"
          id={`${id}-${tab}-tab`} aria-controls={`${id}-${tab}-panel`} aria-selected={view === tab}
          tabIndex={view === tab || (!view && tab === "2d") ? 0 : -1}
          onKeyDown={event => navigateTabs(event, tab)} onClick={() => activate(tab)}>
          {tab === "2d" ? "2D 图纸" : "3D 模型"}
        </button>)}
      </div>}
      {!view && <div className={styles.empty}>
        {preview ? <button className={styles.previewButton} type="button" onClick={() => activate("3d")}>点击查看 3D 组合预览</button>
          : <p>{hasModel ? "3D 模型准备中" : "点击上方“2D 图纸”或“3D 模型”开始查看"}</p>}
      </div>}
      <div id={`${id}-2d-panel`} role="tabpanel" aria-labelledby={`${id}-2d-tab`} hidden={view !== "2d"}>
        {opened["2d"] && <div className={`${styles.drawing} ${productLayout ? styles.productDrawing : ""}`}>
          {productSelection && <ProductResourceSelector selection={viewerSelection!} layout="select"
            className={`${styles.drawingSelect} ${styles.desktopProductSelect}`} />}
          {productLayout && <aside className={styles.drawingSummary} aria-label={copy.view}>
            <h3>{productSelection?.label || copy.view}</h3>
            {productSelection ? <ProductResourceSelector selection={viewerSelection!} className={styles.specSelector} />
              : <div className={styles.drawingSelected}>{copy.drawing}</div>}
            <div className={styles.drawingModel}><span>{copy.model}</span><strong>{drawing?.model}</strong></div>
            <p>{copy.drawingReference}</p>
          </aside>}
          <div className={styles.drawingContent}>
          {drawings.length > 1 && <select className={styles.drawingSelect} aria-label="选择零件图纸"
            value={drawing?.role || ""} onChange={event => setDrawingRole(event.target.value)}>
            {drawings.map(item => <option key={item.role} value={item.role}>{item.label} · {item.model}</option>)}
          </select>}
          {drawing?.url ? drawingPreview ?? <PdfDrawingPreview
            productDrawing pdfPreviewUrl={drawingPreviewHref(drawing.url)} documentTitle={drawing.model} autoOpen deferDesktopUntilOpen
            showPreviewDescription={false} text={{ title: fittingText("2D 图纸", locale), loadingLabel: fittingText("2D 图纸加载中", locale), previewButton: fittingText("点击预览图纸",locale), description: "", errorLabel: fittingText("图纸加载失败，请刷新页面后重试",locale), pageLabel: fittingText("页",locale), retryLabel: fittingText("重新加载",locale) }}
            previousPageLabel={fittingText("上一页",locale)} nextPageLabel={fittingText("下一页",locale)}
            previousPageVisibleLabel={fittingText("上一页",locale)} nextPageVisibleLabel={fittingText("下一页",locale)}
          /> : <div className={styles.empty} role="status">{drawingUnavailableMessage || "当前零件暂无公开 2D 图纸，可通过“添加图纸”提交需求。"}</div>}
          </div>
        </div>}
      </div>
      {!drawingOnly && <div ref={modelPanel} id={`${id}-3d-panel`} className={preview ? undefined : styles.modelPanel} role={preview ? undefined : "tabpanel"} aria-labelledby={preview ? undefined : `${id}-3d-tab`} hidden={view !== "3d"}>
        {opened["3d"] && (modelSource?.kind === "cad"
          ? <ProductCadViewer {...modelSource.props} productSelection={viewerSelection} active={modelActive} externalResourceTabs />
          : modelSource?.kind === "luer"
            ? <LuerCadViewer locale={locale} parts={modelSource.parts} active={modelActive} externalResourceTabs preview={preview} />
            : modelSource?.kind === "file"
              ? <ProductModelViewer slug={modelSource.slug} modelName={modelSource.model} modelUrl={modelSource.url} isActive={modelActive} locale={locale as "zh" | "en"} />
              : modelSource?.kind === "custom"
                ? modelSource.render(modelActive)
              : productSelection ? <div className={styles.drawing}>
                  <aside className={styles.drawingSummary} aria-label={productSelection.label}>
                    <h3>{productSelection.label}</h3>
                    <ProductResourceSelector selection={viewerSelection!} className={styles.specSelector} />
                    <div className={styles.drawingModel}><span>{copy.model}</span><strong>{drawing?.model}</strong></div>
                  </aside>
                  <div className={styles.empty} role="status">当前型号暂无公开 3D 模型，请以对应图纸核对结构与尺寸。</div>
                </div>
              : <div className={styles.empty} role="status">当前型号暂无公开 3D 模型，请以对应图纸核对结构与尺寸。</div>)}
      </div>}
    </div>
  </section>, locale);
}
