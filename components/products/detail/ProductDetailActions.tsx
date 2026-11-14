"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
import ConfiguratorButton from "@/components/products/configurator/ConfiguratorButton";
import styles from "./ProductDetailActions.module.css";

/** Shared EA-style resource actions for every product detail template. */
export function ProductDetailActions({ children }: { children: ReactNode }) {
  return <div className={styles.actions} data-product-action-grid="true">{children}</div>;
}

export function ProductDetailActionButton({ className, ...props }: ComponentPropsWithRef<"button">) {
  return (
    <ConfiguratorButton
      {...props}
      className={[styles.actionButton, className].filter(Boolean).join(" ")}
      data-product-detail-action="true"
    />
  );
}
