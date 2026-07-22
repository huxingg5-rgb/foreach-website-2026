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

const TARGET_CART_TEXT: Record<
  "es" | "fr" | "ko" | "ru",
  Record<string, string>
> = {
  es: {
    "No products selected": "No hay productos seleccionados",
    Products: "Productos",
    "Fitting Replacement Search": "Búsqueda de racores equivalentes",
    Source: "Origen",
    "Product Type": "Tipo de producto",
    "Product Model": "Modelo de producto",
    Quantity: "Cantidad",
    "2D Drawing": "Plano 2D",
    Required: "Requerido",
    "Not Required": "No requerido",
    Product: "Producto",
    "Product Code": "Código de producto",
    "FOREACH Model": "Modelo FOREACH",
    "Compatible Models": "Modelos compatibles",
    "Clear the current product selection list?": "¿Desea vaciar la lista de selección de productos actual?",
    "Selection list copied": "Lista de selección copiada",
    "The selection list is empty. Add a product first.": "La lista de selección está vacía. Añada primero un producto.",
  },
  fr: {
    "No products selected": "Aucun produit sélectionné",
    Products: "Produits",
    "Fitting Replacement Search": "Recherche de raccords équivalents",
    Source: "Source",
    "Product Type": "Type de produit",
    "Product Model": "Modèle de produit",
    Quantity: "Quantité",
    "2D Drawing": "Plan 2D",
    Required: "Requis",
    "Not Required": "Non requis",
    Product: "Produit",
    "Product Code": "Code produit",
    "FOREACH Model": "Modèle FOREACH",
    "Compatible Models": "Modèles compatibles",
    "Clear the current product selection list?": "Vider la liste de sélection de produits actuelle ?",
    "Selection list copied": "Liste de sélection copiée",
    "The selection list is empty. Add a product first.": "La liste de sélection est vide. Ajoutez d'abord un produit.",
  },
  ko: {
    "No products selected": "선택한 제품이 없습니다",
    Products: "제품",
    "Fitting Replacement Search": "피팅 대체품 검색",
    Source: "출처",
    "Product Type": "제품 유형",
    "Product Model": "제품 모델",
    Quantity: "수량",
    "2D Drawing": "2D 도면",
    Required: "필요",
    "Not Required": "불필요",
    Product: "제품",
    "Product Code": "제품 코드",
    "FOREACH Model": "FOREACH 모델",
    "Compatible Models": "호환 모델",
    "Clear the current product selection list?": "현재 제품 선정 목록을 비우시겠습니까?",
    "Selection list copied": "제품 선정 목록을 복사했습니다",
    "The selection list is empty. Add a product first.": "제품 선정 목록이 비어 있습니다. 먼저 제품을 추가하십시오.",
  },
  ru: {
    "No products selected": "Продукция не выбрана",
    Products: "Продукция",
    "Fitting Replacement Search": "Поиск аналогов фитингов",
    Source: "Источник",
    "Product Type": "Тип продукции",
    "Product Model": "Модель продукции",
    Quantity: "Количество",
    "2D Drawing": "2D-чертеж",
    Required: "Требуется",
    "Not Required": "Не требуется",
    Product: "Продукция",
    "Product Code": "Код продукции",
    "FOREACH Model": "Модель FOREACH",
    "Compatible Models": "Совместимые модели",
    "Clear the current product selection list?": "Очистить текущий список выбранной продукции?",
    "Selection list copied": "Список выбранной продукции скопирован",
    "The selection list is empty. Add a product first.": "Список выбранной продукции пуст. Сначала добавьте продукцию.",
  },
};

function getCartText(locale: string, english: string, chinese: string) {
  if (locale === "en") return english;
  if (locale === "zh-CN") return chinese;

  return TARGET_CART_TEXT[locale as "es" | "fr" | "ko" | "ru"]?.[english] || english;
}

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

  /*
   * 批量设置当前清单中所有产品的图纸需求状态。
   *
   * 点击“申请图纸”时统一设置为 true；
   * 提交成功后统一恢复为 false。
   */
  setAllDrawingNeeds: (needDrawing: boolean) => void;

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
  locale: string,
) {
  if (items.length === 0) {
    return getCartText(locale, "No products selected", "暂无选型产品");
  }

  const lines = items.map((item, index) => {
    const isPumpSelection = item.sourceType === "pump-selection";
    const sourceLabel = getCartText(
      locale,
      isPumpSelection ? "Products" : "Fitting Replacement Search",
      item.sourceLabel,
    );

    if (isPumpSelection) {
      return [
        `#${index + 1}`,
        `${getCartText(locale, "Source", "来源")}: ${sourceLabel}`,
        `${getCartText(locale, "Product Type", "产品类型")}: ${item.productName}`,
        `${getCartText(locale, "Product Model", "产品型号")}: ${item.foreachModel}`,
        `${getCartText(locale, "Quantity", "数量")}: ${item.quantity}`,
        `${getCartText(locale, "2D Drawing", "2D 图纸")}: ${
          item.needDrawing
            ? getCartText(locale, "Required", "需要")
            : getCartText(locale, "Not Required", "暂不需要")
        }`,
      ].join("\n");
    }

    return [
      `#${index + 1}`,
      `${getCartText(locale, "Source", "来源")}: ${sourceLabel}`,
      `${getCartText(locale, "Product", "产品")}: ${item.productName}`,
      `${getCartText(locale, "Product Code", "商品编码")}: ${item.productCode}`,
      `${getCartText(locale, "FOREACH Model", "恒永达型号")}: ${item.foreachModel}`,
      `${getCartText(locale, "Compatible Models", "兼容编码")}: ${item.competitorModels.join(" / ") || "-"}`,
      `${getCartText(locale, "Quantity", "数量")}: ${item.quantity}`,
      `${getCartText(locale, "2D Drawing", "2D 图纸")}: ${
        item.needDrawing
          ? getCartText(locale, "Required", "需要")
          : getCartText(locale, "Not Required", "暂不需要")
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
  const locale = getLocaleFromPathname(pathname);

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
      getCartText(
        locale,
        "Clear the current product selection list?",
        "确认清空当前选型清单？",
      ),
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

  /*
   * 批量设置当前选型清单中全部产品的图纸需求。
   *
   * 已经是目标状态的项目直接保留，
   * 只有状态不一致的项目才创建新对象。
   */
  function setAllDrawingNeeds(needDrawing: boolean) {
    setItems((prev) => {
      return prev.map((item) => {
        if (Boolean(item.needDrawing) === needDrawing) {
          return item;
        }

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
    const text = buildCartText(items, locale);

    try {
      await window.navigator.clipboard.writeText(text);
      window.alert(
        getCartText(locale, "Selection list copied", "清单已复制"),
      );
    } catch {
      window.alert(text);
    }
  }

  function generatePdfList() {
    if (items.length === 0) {
      window.alert(
        getCartText(
          locale,
          "The selection list is empty. Add a product first.",
          "当前清单为空，请先加入产品。",
        ),
      );
      return;
    }

    setPrintTime(
      new Date().toLocaleString(
        locale === "zh-CN"
          ? "zh-CN"
          : locale === "en"
            ? "en-US"
            : locale === "ko"
              ? "ko-KR"
              : locale,
      ),
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
      setAllDrawingNeeds,
      getItem,
      copyCartText,
      generatePdfList,
      printTime,
    };
  }, [items, isOpen, locale, printTime]);

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





