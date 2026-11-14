"use client";

import { type CadDrawingType } from "@/data/products/detail/drawing-requirements";
import type { ProductConfiguratorConfig, ProductConfiguratorVariant } from "@/components/products/configurator/product-variant-configurator.types";
import { getSelectionWorkspaceCopy, getSelectionWorkspacePresentation } from "@/data/products/detail/selection-workspace-copy";
import { variantCadConfiguration } from "@/data/products/detail/cad-request";
import DetailSelectionWorkspace from "./DetailSelectionWorkspace";

type Props = {
  locale: string; drawingTypes?: Record<string, CadDrawingType[]>; config: ProductConfiguratorConfig; savedIds: string[]; activeId: string | null;
  canRequestCad: boolean;
  onSelect: (id: string) => void; onNew: () => void; onEdit: (variant: ProductConfiguratorVariant) => void;
  onDelete: (id: string) => void; onAdd: (variant: ProductConfiguratorVariant) => void;
  isAdded: (variant: ProductConfiguratorVariant) => boolean;
  onDrawing?: (variant: ProductConfiguratorVariant) => void; drawingLabel?: string;
};

export default function ProductConfigurationWorkspace({ locale, drawingTypes, config, savedIds, canRequestCad, onSelect, onNew, onEdit, onDelete, onAdd, isAdded, onDrawing, drawingLabel }: Props) {
  const copy = getSelectionWorkspaceCopy(locale), fixed = config.variants.length === 1;
  const variant = (id: string) => config.variants.find(item => item.id === id)!;
  const saved = savedIds.map(id => config.variants.find(item => item.id === id)).filter((item): item is ProductConfiguratorVariant => Boolean(item));
  const configurations = saved.map(item => ({ ...variantCadConfiguration(config, item, locale), drawingTypes: drawingTypes?.[item.id] || [] }));
  const parameters = config.dimensions.filter(dimension => new Set(config.variants.map(item => item.attributes[dimension.key])).size > 1).map(dimension => dimension.label);
  const presentation = getSelectionWorkspacePresentation(locale, fixed ? canRequestCad ? "support" : "model" : "configuration", config.productName, parameters);
  return <DetailSelectionWorkspace locale={locale} title={presentation.title} configurations={configurations}
    helperText={!saved.length || fixed ? presentation.description : undefined}
    fixed={fixed} onSelect={onSelect} onNew={!fixed || !saved.length ? onNew : undefined} newLabel={fixed ? copy.view : copy.add}
    onEdit={id => onEdit(variant(id))} onDelete={onDelete} onAdd={id => onAdd(variant(id))}
    isAdded={id => isAdded(variant(id))} onDrawing={onDrawing ? id => onDrawing(variant(id)) : undefined} drawingLabel={drawingLabel} />;
}
