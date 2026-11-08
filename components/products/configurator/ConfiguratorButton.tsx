"use client";

import type { ComponentPropsWithRef } from "react";
import shared from "./product-variant-configurator.module.css";
import styles from "./ConfiguratorButton.module.css";

type Props = ComponentPropsWithRef<"button"> & {
  variant?: "close" | "secondary" | "primary";
  active?: boolean;
};

const variantClasses = {
  close: shared.closeButton,
  secondary: shared.listButton,
  primary: shared.primaryButton,
};

export default function ConfiguratorButton({
  variant = "secondary",
  active = false,
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      type="button"
      {...props}
      className={[
        variantClasses[variant],
        active && !props.disabled && variant === "secondary" ? shared.listButtonActive : "",
        styles.button,
        className,
      ].filter(Boolean).join(" ")}
      data-configurator-button={variant}
    >
      {children ?? (variant === "close" ? "×" : null)}
    </button>
  );
}
