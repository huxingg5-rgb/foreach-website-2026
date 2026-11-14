"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ProductDatasheet } from "@/data/products/detail/product-detail-resources";
import { getSelectionWorkspaceCopy } from "@/data/products/detail/selection-workspace-copy";
import { getProductResourceDownloads } from "@/data/products/detail/product-resource-downloads";
import { ProductDetailActionButton } from "./ProductDetailActions";
import styles from "./ProductDetailActions.module.css";

export default function ProductResourceDownloads({ datasheet, locale = "en" }: { datasheet: ProductDatasheet | null; locale?: string }) {
  const copy = getSelectionWorkspaceCopy(locale.toLowerCase().split("-")[0]);
  const items = getProductResourceDownloads(datasheet, locale);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const mouseInside = useRef(false);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  if (!items.length) return null;

  return (
    <div
      ref={rootRef}
      className={styles.downloadControl}
      data-product-downloads="true"
      onPointerEnter={(event) => {
        mouseInside.current = event.pointerType === "mouse";
        if (mouseInside.current) setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          mouseInside.current = false;
          setOpen(false);
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <ProductDetailActionButton
        ref={triggerRef}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={(event) => setOpen(value => event.detail > 0 && mouseInside.current ? true : !value)}
      >
        {copy.downloads}
      </ProductDetailActionButton>
      {/* Keep download links in the initial HTML; interaction only changes visibility. */}
      <div
        id={menuId}
        hidden={!open}
        className={styles.downloadMenu}
      >
        {items.map(item => <a
          key={`${item.kind}:${item.id}`}
          className={styles.downloadLink}
          href={item.href}
          download={item.download}
          aria-label={item.label}
          data-product-datasheet-download={item.kind === "datasheet" ? "true" : undefined}
          data-analytics-resource-action="download"
          data-analytics-resource-id={`${item.kind}:${item.id}`}
          data-analytics-resource-type={item.kind}
          data-analytics-section="product_detail_actions"
          onClick={() => setOpen(false)}
        >
          {item.label}
        </a>)}
      </div>
    </div>
  );
}
