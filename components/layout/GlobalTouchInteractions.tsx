"use client";

import { useEffect } from "react";

const TOUCH_CONTROL_SELECTOR = [
  "button:not(:disabled)",
  'input[type="button"]:not(:disabled)',
  'input[type="submit"]:not(:disabled)',
  'input[type="reset"]:not(:disabled)',
  '[role="button"]:not([aria-disabled="true"])',
  "summary",
  'label[class*="button" i]',
  'label[class*="btn" i]',
  'a[class*="button" i]',
  'a[class*="btn" i]',
  'a[class*="cta" i]',
  'a[class*="action" i]',
].join(",");

const TOUCH_PRESS_EXCLUSION_SELECTOR = [
  ".site-footer",
  ".products-selection-page",
  '[data-touch-feedback="neutral"]',
  '[class*="backdrop" i]',
].join(",");

const TOUCH_PRESSED_STYLES = {
  background: "#09e9b4",
  "border-color": "#09e9b4",
  color: "#173368",
  "outline-color": "#09e9b4",
  "box-shadow": "none",
  transform: "translateY(1px) scale(0.99)",
  "transition-duration": "0ms",
} as const;

type SavedInlineStyle = {
  property: string;
  value: string;
  priority: string;
};

function getTouchControl(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest<HTMLElement>(TOUCH_CONTROL_SELECTOR);
}

export default function GlobalTouchInteractions() {
  useEffect(() => {
    const touchDevice =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches;

    if (!touchDevice) {
      return;
    }

    document.documentElement.dataset.globalTouchDevice = "true";

    let pressedControl: HTMLElement | null = null;
    const savedInlineStyles = new WeakMap<HTMLElement, SavedInlineStyle[]>();

    function isTouchPointer(event: PointerEvent) {
      return event.pointerType === "touch" || event.pointerType === "pen";
    }

    function clearPressedControl() {
      if (!pressedControl) {
        return;
      }

      const savedStyles = savedInlineStyles.get(pressedControl) ?? [];

      savedStyles.forEach(({ property, value, priority }) => {
        if (value) {
          pressedControl?.style.setProperty(property, value, priority);
          return;
        }

        pressedControl?.style.removeProperty(property);
      });

      savedInlineStyles.delete(pressedControl);
      delete pressedControl.dataset.globalTouchPressed;
      pressedControl = null;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!isTouchPointer(event)) {
        return;
      }

      clearPressedControl();

      const control = getTouchControl(event.target);

      if (!control) {
        return;
      }

      if (control.closest(TOUCH_PRESS_EXCLUSION_SELECTOR)) {
        control.blur();
        return;
      }

      pressedControl = control;
      savedInlineStyles.set(
        control,
        Object.keys(TOUCH_PRESSED_STYLES).map((property) => {
          const typedProperty =
            property as keyof typeof TOUCH_PRESSED_STYLES;

          return {
            property: typedProperty,
            value: control.style.getPropertyValue(typedProperty),
            priority: control.style.getPropertyPriority(typedProperty),
          };
        }),
      );

      Object.entries(TOUCH_PRESSED_STYLES).forEach(
        ([property, value]) => {
          control.style.setProperty(property, value, "important");
        },
      );
      control.dataset.globalTouchPressed = "true";
    }

    function handlePointerEnd(event: PointerEvent) {
      if (!isTouchPointer(event)) {
        return;
      }

      const control = getTouchControl(event.target) || pressedControl;

      clearPressedControl();

      if (!control) {
        return;
      }

      control.blur();

      /*
       * click 会在 pointerup 后触发，因此延迟到下一个任务再短暂关闭命中。
       * 这样既不阻断按钮功能，又能让移动浏览器清除残留的 :hover。
       */
      window.setTimeout(() => {
        if (control.isConnected) {
          control.blur();
        }
      }, 0);
    }

    function handleTouchEnd() {
      const control = pressedControl;

      clearPressedControl();
      control?.blur();
    }

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("pointerup", handlePointerEnd, true);
    document.addEventListener("pointercancel", handlePointerEnd, true);
    document.addEventListener("touchend", handleTouchEnd, true);
    document.addEventListener("touchcancel", handleTouchEnd, true);
    window.addEventListener("blur", clearPressedControl);

    return () => {
      clearPressedControl();
      delete document.documentElement.dataset.globalTouchDevice;
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("pointerup", handlePointerEnd, true);
      document.removeEventListener("pointercancel", handlePointerEnd, true);
      document.removeEventListener("touchend", handleTouchEnd, true);
      document.removeEventListener("touchcancel", handleTouchEnd, true);
      window.removeEventListener("blur", clearPressedControl);
    };
  }, []);

  return null;
}
