"use client";

/* =========================================================
   SelectionCartProvider.tsx
   恒永达官网｜全局选型清单状态 Provider

   文件路径：
   components/selection-cart/SelectionCartProvider.tsx

   作用：
   1. 在全站最高层维护统一选型清单
   2. 首页、详情页、后续产品页都通过 useSelectionCart 使用同一个清单
   3. 清单数据写入 localStorage，刷新页面后仍可保留
   4. 后续统一提交需求、生成资料包、发送邮件都基于这里的数据
========================================================= */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

import { getLocaleFromPathname } from "@/lib/i18n";

import type {
  SelectionCartItem,
  SelectionCartItemInput,
  SelectionCartSourceType,
} from "./selection-cart.types";

/* 新版全局清单缓存 key */
const GLOBAL_CART_STORAGE_KEY = "foreach_global_selection_cart_v1";

/* 旧版接头清单缓存 key
   说明：
   用于兼容之前已经写入浏览器的清单数据。
*/
const LEGACY_FITTING_CART_STORAGE_KEY = "foreach_fitting_replacement_cart_v1";

interface SelectionCartContextValue {
  items: SelectionCartItem[];
  isOpen: boolean;

  openCart: () => void;
  closeCart: () => void;

  addItem: (item: SelectionCartItemInput) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;

  changeQuantity: (id: string, quantity: number) => void;
  toggleDrawingNeed: (id: string, needDrawing: boolean) => void;

  getItem: (
    sourceType: SelectionCartSourceType,
    productCode: string
  ) => SelectionCartItem | undefined;

  copyCartText: () => Promise<void>;
  generatePdfList: () => void;

  printTime: string;
}

const SelectionCartContext = createContext<SelectionCartContextValue | null>(
  null
);

/* =========================================================
   生成清单项 ID
========================================================= */
function buildCartItemId(item: {
  sourceType: SelectionCartSourceType;
  productCode: string;
}) {
  return `${item.sourceType}:${item.productCode}`;
}

/* =========================================================
   兼容旧版接头清单数据

   说明：
   旧版 FittingSelectionCartItem 没有 sourceType、sourceLabel、productName。
   这里做一次兼容转换。
========================================================= */
function normalizeLegacyFittingItems(rawItems: unknown): SelectionCartItem[] {
  if (!Array.isArray(rawItems)) return [];

  return rawItems
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const raw = item as Partial<SelectionCartItem> & {
        productCode?: string;
        foreachModel?: string;
        competitorModels?: string[];
        quantity?: number;
        needDrawing?: boolean;
        imagePath?: string;
      };

      if (!raw.productCode || !raw.foreachModel) return null;

      const normalizedItem: SelectionCartItem = {
        id: buildCartItemId({
          sourceType: "fitting-replacement",
          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),
        imagePath: raw.imagePath,
        detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
      };

      return normalizedItem;
    })
    .filter(Boolean) as SelectionCartItem[];
}

/* =========================================================
   生成复制文本
========================================================= */
function buildCartText(
  items: SelectionCartItem[],
  isEnglish: boolean,
) {
  if (items.length === 0) {
    return isEnglish
      ? "No products selected"
      : "暂无选型产品";
  }

  const lines = items.map((item, index) => {
    const isPumpSelection = item.sourceType === "pump-selection";
    const sourceLabel = isEnglish
      ? isPumpSelection
        ? "Products"
        : "Fitting Replacement Search"
      : item.sourceLabel;

    if (isPumpSelection) {
      return [
        `#${index + 1}`,
        `${isEnglish ? "Source" : "来源"}: ${sourceLabel}`,
        `${isEnglish ? "Product Type" : "产品类型"}: ${item.productName}`,
        `${isEnglish ? "Product Model" : "产品型号"}: ${item.foreachModel}`,
        `${isEnglish ? "Quantity" : "数量"}: ${item.quantity}`,
        `${isEnglish ? "2D Drawing" : "2D 图纸"}: ${
          item.needDrawing
            ? isEnglish ? "Required" : "需要"
            : isEnglish ? "Not Required" : "暂不需要"
        }`,
      ].join("\n");
    }

    return [
      `#${index + 1}`,
      `${isEnglish ? "Source" : "来源"}: ${sourceLabel}`,
      `${isEnglish ? "Product" : "产品"}: ${item.productName}`,
      `${isEnglish ? "Product Code" : "商品编码"}: ${item.productCode}`,
      `${isEnglish ? "FOREACH Model" : "恒永达型号"}: ${item.foreachModel}`,
      `${isEnglish ? "Compatible Models" : "兼容编码"}: ${item.competitorModels.join(" / ") || "-"}`,
      `${isEnglish ? "Quantity" : "数量"}: ${item.quantity}`,
      `${isEnglish ? "2D Drawing" : "2D 图纸"}: ${
        item.needDrawing
          ? isEnglish ? "Required" : "需要"
          : isEnglish ? "Not Required" : "暂不需要"
      }`,
    ].join("\n");
  });

  return lines.join("\n\n");
}
export function SelectionCartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isEnglish = getLocaleFromPathname(pathname) === "en";

  const [items, setItems] = useState<SelectionCartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [printTime, setPrintTime] = useState("");

  /* 读取本地缓存 */
  useEffect(() => {
    try {
      const rawGlobalCart = window.localStorage.getItem(GLOBAL_CART_STORAGE_KEY);

      if (rawGlobalCart) {
        let parsedGlobalCart: SelectionCartItem[] = [];

      try {
        parsedGlobalCart = JSON.parse(rawGlobalCart) as SelectionCartItem[];
      } catch {
        parsedGlobalCart = [];
      }

        setItems(
          parsedGlobalCart.map((item) => {
            return {
              ...item,
              quantity: Math.max(1, Number(item.quantity || 1)),
              needDrawing: Boolean(item.needDrawing),
            };
          })
        );

        setHasMounted(true);
        return;
      }

      /* 兼容旧版接头清单 */
      const rawLegacyCart = window.localStorage.getItem(
        LEGACY_FITTING_CART_STORAGE_KEY
      );

      if (rawLegacyCart) {
        let parsedLegacyCart: any = [];

      try {
        parsedLegacyCart = JSON.parse(rawLegacyCart);
      } catch {
        parsedLegacyCart = [];
      }
        const migratedItems = normalizeLegacyFittingItems(parsedLegacyCart);

        setItems(migratedItems);
      }
    } catch {
      setItems([]);
    }

    setHasMounted(true);
  }, []);

  /* 写入本地缓存 */
  useEffect(() => {
    if (!hasMounted) return;

    window.localStorage.setItem(GLOBAL_CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, hasMounted]);

  function openCart() {
    setIsOpen(true);
  }

  function closeCart() {
    setIsOpen(false);
  }

  function addItem(input: SelectionCartItemInput) {
    const id =
      input.id ||
      buildCartItemId({
        sourceType: input.sourceType,
        productCode: input.productCode,
      });

    const quantity = Math.max(1, Number(input.quantity || 1));

    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === id);

      if (existingItem) {
        return prev.map((item) => {
          if (item.id !== id) return item;

          return {
            ...item,
            quantity: item.quantity + quantity,
            needDrawing: Boolean(item.needDrawing || input.needDrawing),
          };
        });
      }

      return [
        ...prev,
        {
          ...input,
          id,
          quantity,
          needDrawing: Boolean(input.needDrawing),
        },
      ];
    });
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    const confirmed = window.confirm(
      isEnglish
        ? "Clear the current product selection list?"
        : "确认清空当前选型清单？",
    );

    if (!confirmed) return;

    setItems([]);
  }

  function changeQuantity(id: string, quantity: number) {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          quantity: Math.max(1, Number(quantity || 1)),
        };
      });
    });
  }

  function toggleDrawingNeed(id: string, needDrawing: boolean) {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          needDrawing,
        };
      });
    });
  }

  function getItem(sourceType: SelectionCartSourceType, productCode: string) {
    const id = buildCartItemId({
      sourceType,
      productCode,
    });

    return items.find((item) => item.id === id);
  }

  async function copyCartText() {
    const text = buildCartText(items, isEnglish);

    try {
      await window.navigator.clipboard.writeText(text);
      window.alert(
        isEnglish
          ? "Selection list copied"
          : "清单已复制",
      );
    } catch {
      window.alert(text);
    }
  }

  function generatePdfList() {
    if (items.length === 0) {
      window.alert(
        isEnglish
          ? "The selection list is empty. Add a product first."
          : "当前清单为空，请先加入产品。",
      );
      return;
    }

    setPrintTime(
      new Date().toLocaleString(isEnglish ? "en-US" : "zh-CN"),
    );

    window.setTimeout(() => {
      window.print();
    }, 80);
  }

  const contextValue = useMemo<SelectionCartContextValue>(() => {
    return {
      items,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      clearCart,
      changeQuantity,
      toggleDrawingNeed,
      getItem,
      copyCartText,
      generatePdfList,
      printTime,
    };
  }, [isEnglish, items, isOpen, printTime]);

  return (
    <SelectionCartContext.Provider value={contextValue}>
      {children}
    </SelectionCartContext.Provider>
  );
}

/* =========================================================
   useSelectionCart
========================================================= */
export function useSelectionCart() {
  const context = useContext(SelectionCartContext);

  if (!context) {
    throw new Error(
      "useSelectionCart must be used inside SelectionCartProvider."
    );
  }

  return context;
}





