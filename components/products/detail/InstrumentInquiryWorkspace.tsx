"use client";

import { useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import smtp2Catalog from "@/data/products/detail/smtp2-configurations.json";
import { getPipettingModelPath } from "@/data/products/selection/pipetting-pump-routes";
import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
import { useInstrumentInquiries, type SavedInstrumentInquiry } from "@/data/products/configurator/instrument-inquiry-configurations";
import { getInstrumentInquiryDefaults, instrumentInquiryCartId, instrumentInquiryProductName, instrumentInquiryRows, resolveInstrumentInquiry, type InstrumentInquiryConfiguration, type InstrumentInquiryFamily } from "@/data/products/configurator/instrument-inquiry";
import { instrumentInquiryQuantityLabel, instrumentInquiryText as text } from "@/data/products/configurator/instrument-inquiry.intl";
import { isSyringePumpInquiryFamily } from "@/data/products/configurator/syringe-pump-inquiry";
import { getSelectionWorkspaceCopy } from "@/data/products/detail/selection-workspace-copy";
import { getProductDetailResourceCopy, type ProductDetailResourceCopyLocale } from "@/data/products/detail/product-detail-resources";
import { normalizeDrawingTypes, type CadDrawingType } from "@/data/products/detail/drawing-requirements";
import DetailSelectionWorkspace from "./DetailSelectionWorkspace";
import { ProductDetailActions, ProductDetailActionButton } from "./ProductDetailActions";

const Configurator = dynamic(() => import("../configurator/InstrumentInquiryConfigurator"), { ssr: false });
const CadRequest = dynamic(() => import("./CadRequestModal"), { ssr: false });
type Props = { slug: string; family: InstrumentInquiryFamily; locale: ProductDetailResourceCopyLocale; detailHref: string; imagePath: string; resourceDownloads?: ReactNode; onConfigurationSelect?: (configuration: InstrumentInquiryConfiguration) => void };

/** Reuse the EA configuration presentation, with instrument-specific selection rules. */
export default function InstrumentInquiryWorkspace({ slug, family, locale, detailHref, imagePath, resourceDownloads, onConfigurationSelect }: Props) {
  const [collection, update] = useInstrumentInquiries(family);
  const [editor, setEditor] = useState<{ id: string | null } | null>(null);
  const [cadId, setCadId] = useState<string | null>(null);
  const router = useRouter();
  const { items, addItem, changeQuantity, setDrawingTypes, openCart } = useSelectionCart();
  const copy = getSelectionWorkspaceCopy(locale), productName = instrumentInquiryProductName(family, locale);
  const title = isSyringePumpInquiryFamily(family) ? `${family} · ${text("syringeConfigure", locale)}` : copy.heading(family);
  const selected = collection.configurations.find(item => item.id === editor?.id) || null;
  function findCartItem(configuration: InstrumentInquiryConfiguration) {
    const id = instrumentInquiryCartId(configuration), { model } = resolveInstrumentInquiry(configuration);
    return items.find(item => item.instrumentConfiguration && item.foreachModel === model && instrumentInquiryCartId(item.instrumentConfiguration) === id);
  }
  function target(configuration: InstrumentInquiryConfiguration) {
    const { model } = resolveInstrumentInquiry(configuration);
    const smtp2 = family === "SMTP2" ? smtp2Catalog.variants.find(item => item.model === model) : undefined;
    const modelSlug = smtp2?.model.toLowerCase() || (family === "SMTP4" && model !== family ? `smtp4-${configuration.choice.capacity}ul` : undefined);
    return { detailHref: modelSlug ? getPipettingModelPath(locale, modelSlug) : undefined, imagePath: smtp2?.image || imagePath };
  }
  function add(saved: SavedInstrumentInquiry) {
    const id = instrumentInquiryCartId(saved.configuration), existing = findCartItem(saved.configuration);
    if (existing) { changeQuantity(existing.id, saved.quantity); setDrawingTypes(existing.id, saved.drawingTypes); }
    else {
      const { model, productCode } = resolveInstrumentInquiry(saved.configuration);
      const destination = target(saved.configuration);
      addItem({ id, sourceType: "pump-selection", sourceLabel: copy.heading(productName), productName, productCode,
        foreachModel: model, competitorModels: [], quantity: saved.quantity, needDrawing: saved.drawingTypes.length > 0,
        drawingTypes: saved.drawingTypes, inquiryMode: "product", detailHref: destination.detailHref || detailHref,
        imagePath: destination.imagePath, instrumentConfiguration: saved.configuration });
    }
    openCart();
  }
  function confirm(configuration: InstrumentInquiryConfiguration, quantity: number, drawingTypes: CadDrawingType[], addToList: boolean) {
    const saved: SavedInstrumentInquiry = { id: selected?.id || `${family}-config-${collection.nextNumber}`, configuration, quantity, drawingTypes: normalizeDrawingTypes(drawingTypes) };
    update(current => ({ ...current, nextNumber: selected ? current.nextNumber : current.nextNumber + 1,
      configurations: selected ? current.configurations.map(item => item.id === selected.id ? saved : item) : [...current.configurations, saved] }));
    setEditor(null);
    onConfigurationSelect?.(configuration);
    if (addToList) add(saved);
    else {
      const href = target(configuration).detailHref;
      if (href && href !== detailHref) router.push(href);
    }
  }
  const configurations = collection.configurations.map(saved => ({ id: saved.id, model: resolveInstrumentInquiry(saved.configuration).model,
    rows: [...instrumentInquiryRows(saved.configuration, locale), [instrumentInquiryQuantityLabel(locale), String(saved.quantity)] as [string, string]],
    productType: productName, productSeries: family, drawingTypes: saved.drawingTypes }));
  const reference = getInstrumentInquiryDefaults(slug);
  return <div data-instrument-inquiry-workspace={family}>
    <DetailSelectionWorkspace locale={locale} title={title} configurations={configurations}
      helperText={!configurations.length ? text("description", locale) : undefined}
      onSelect={id => { const saved = collection.configurations.find(item => item.id === id); if (saved) onConfigurationSelect?.(saved.configuration); }}
      onNew={() => setEditor({ id: null })} onEdit={id => setEditor({ id })}
      onDelete={id => update(current => ({ ...current, configurations: current.configurations.filter(item => item.id !== id) }))}
      onAdd={id => { const item = collection.configurations.find(item => item.id === id); if (!item) return;
        const existing = findCartItem(item.configuration);
        if (existing) { setDrawingTypes(existing.id, item.drawingTypes); openCart(); } else add(item); }}
      isAdded={id => { const saved = collection.configurations.find(item => item.id === id); return Boolean(saved && findCartItem(saved.configuration)); }}
      onDrawing={id => setCadId(id)} drawingLabel={getProductDetailResourceCopy(locale).requestCad} />
    {!configurations.length || resourceDownloads ? <div style={{ marginTop: 28 }}>
      <ProductDetailActions>
        {!configurations.length ? <ProductDetailActionButton aria-haspopup="dialog" onClick={() => setCadId("reference")}>
          {getProductDetailResourceCopy(locale).requestCad}
        </ProductDetailActionButton> : null}
        {resourceDownloads}
      </ProductDetailActions>
    </div> : null}
    {editor ? <Configurator slug={slug} locale={locale} initial={selected}
      label={selected ? copy.configuration(collection.configurations.indexOf(selected) + 1) : `${copy.add} ${collection.configurations.length + 1}`}
      onClose={() => setEditor(null)} onConfirm={confirm} /> : null}
    {cadId ? <CadRequest locale={locale} productName={productName} productSeries={family} productModel={configurations.find(item => item.id === cadId)?.model || family}
      productType={productName} configurations={configurations} initialConfigurationId={cadId}
      referenceConfiguration={{ id: "reference", model: resolveInstrumentInquiry(reference).model, rows: instrumentInquiryRows(reference, locale), drawingTypes: ["2d", "3d"], productType: productName, productSeries: family }}
      onDrawingTypesChange={(id, drawingTypes) => update(current => ({ ...current, configurations: current.configurations.map(item => item.id === id ? { ...item, drawingTypes } : item) }))}
      onClose={() => setCadId(null)} /> : null}
  </div>;
}
