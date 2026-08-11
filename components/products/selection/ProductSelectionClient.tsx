"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";
import {
  trackFilterApply,
  trackProductListView,
  trackSearchNoResults,
  trackSiteSearch,
} from "@/lib/analytics/track-event";

import SitePageShell from "@/components/layout/SitePageShell";
import {
  getProductTypeFilterOptionsByCategory,
  getProductTypeHrefByIds,
  getSeriesFilterOptionsByProductType,
  getSeriesHrefByFilterValue,
  hasProductTypeRouteByIds,
} from "@/data/products/selection/product-route-map";
import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
import {
  isPublishedFittingProduct,
} from "@/data/products/selection/fitting-publication.generated";
import {
  selectionFilterLabels as baseSelectionFilterLabels,
  selectionProducts as baseSelectionProducts,
  selectionTaxonomyItems as baseSelectionTaxonomyItems,
} from "@/data/products/selection/product-selection.generated";
import {
  diaphragmPumpSelectionProducts,
  diaphragmPumpTaxonomyItems,
  diaphragmPumpFilterLabels,
} from "@/data/products/selection/diaphragm-pump-selection.generated";
import {
  pipettingPumpSelectionProducts,
  pipettingPumpFilterLabels,
} from "@/data/products/selection/pipetting-pump-selection.generated";
import {
  valvelessPumpSelectionProducts,
  valvelessPumpFilterLabels,
} from "@/data/products/selection/valveless-pump-selection.generated";
import {
  valveSelectionProducts,
  valveFilterLabels,
} from "@/data/products/selection/valve-selection.generated";
import {
  probeSelectionProducts,
  probeFilterLabels,
} from "@/data/products/selection/probe-selection.generated";

import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";

import { tubingSelectionProducts } from "@/data/products/selection/tubing-selection.generated";
import {
  hardTubeFittingFilterLabels,
  hardTubeFittingSelectionProducts,
  hardTubeFittingTaxonomyItems,
} from "@/data/products/selection/hard-tube-fitting-selection.generated";
import {
  localizeProductCardSubtitle,
  localizeProductCardTitle,
} from "@/data/products/selection/card-copy/product-card-copy.intl";
import {
  barbedFittingFilterLabels,
  barbedFittingSelectionProducts,
  barbedFittingTaxonomyItems,
} from "@/data/products/selection/barbed-fitting-selection.generated";
import {
  quickConnectFittingFilterLabels,
  quickConnectFittingSelectionProducts,
  quickConnectFittingTaxonomyItems,
} from "@/data/products/selection/quick-connect-fitting-selection.generated";
import {
  threadToBarbedFittingFilterLabels,
  threadToBarbedFittingSelectionProducts,
  threadToBarbedFittingTaxonomyItems,
} from "@/data/products/selection/thread-to-barbed-fitting-selection.generated";

import {
  luerFittingSelectionFilterLabels,
  luerFittingSelectionProducts,
  luerFittingSelectionTaxonomyItems,
} from "@/data/products/selection/luer-fitting-selection.generated";

/* BULKHEAD_BARBED_GENERATED_IMPORT_START */
import {
  bulkheadBarbedFittingFilterLabels,
  bulkheadBarbedFittingSelectionProducts,
  bulkheadBarbedFittingTaxonomyItems,
} from "@/data/products/selection/bulkhead-barbed-fitting-selection.generated";
/* BULKHEAD_BARBED_GENERATED_IMPORT_END */

import {
  femaleThreadAdapterFilterLabels,
  femaleThreadAdapterSelectionProducts,
  femaleThreadAdapterTaxonomyItems,
} from "@/data/products/selection/female-thread-adapter-selection.generated";


/* FILTER_CHECK_VALVE_GENERATED_IMPORT_START */
import {
  filterCheckValveFilterLabels,
  filterCheckValveSelectionProducts,
  filterCheckValveTaxonomyItems,
} from "@/data/products/selection/filter-check-valve-selection.generated";
/* FILTER_CHECK_VALVE_GENERATED_IMPORT_END */

import {
  threadToBarbedDetailHrefByModel,
  threadToBarbedDetailHrefByProductCode,
} from "@/data/products/selection/thread-to-barbed-detail-route-map.generated";

import ProductCardGrid from "./ProductCardGrid";
import ProductCategoryTabs from "./ProductCategoryTabs";
import ProductEmptyState from "./ProductEmptyState";
import ProductFilterPanel from "./ProductFilterPanel";
import ProductSelectionPagination from "./ProductSelectionPagination";
import ProductSelectionSearchParamsSync from "./ProductSelectionSearchParamsSync";
import ProductSelectionToolbar from "./ProductSelectionToolbar";
import { getLocalizedFilterOptionLabel } from "./filter-option-i18n";
import {
  syringePumpFilterLabels,
  syringePumpSelectionProducts,
} from "@/data/products/selection/syringe-pump-selection.generated";
import { controlModuleSelectionProducts, controlModuleTaxonomyItems, controlModuleFilterLabels } from "@/data/products/selection/control-module-selection.generated";

import type {
  ProductSelectionFilterLabel,
  ProductSelectionProduct,
  SelectionFilterKey,
  SelectionLocale,
} from "@/data/products/selection/product-selection.types";

import type {
  ProductSelectionCategoryItem,
  ProductSelectionFilterGroup,
  ProductSelectionSelectedTag,
} from "./product-selection-ui.types";
import hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";

/* HARD_TUBE_HFL_BEFORE_HF_START */

/*
 * 硬管接头展示顺序：
 *
 * 1. HFL 系列
 * 2. HF 系列
 * 3. 其他硬管接头系列保持原有顺序
 *
 * 不直接修改自动生成的数据文件，
 * 避免以后重新生成产品数据时被覆盖。
 */
function getHardTubeSeriesDisplayRank(product: unknown) {
  const cardTitle = (product as any)?.cardTitle;

  const model = String(
    cardTitle?.zh ||
      cardTitle?.en ||
      ""
  )
    .trim()
    .toUpperCase();

  if (model.startsWith("HFL-")) {
    return 10;
  }

  if (model.startsWith("HF-")) {
    return 20;
  }

  return 100;
}

const hardTubeFittingSelectionProductsForDisplay = [
  ...hardTubeFittingSelectionProducts,
].sort((current, next) => {
  const seriesRankDifference =
    getHardTubeSeriesDisplayRank(current) -
    getHardTubeSeriesDisplayRank(next);

  if (seriesRankDifference !== 0) {
    return seriesRankDifference;
  }

  return (
    Number((current as any)?.sortOrder ?? 0) -
    Number((next as any)?.sortOrder ?? 0)
  );
});

/* HARD_TUBE_HFL_BEFORE_HF_END */

const selectionProducts = [
  /* FILTER_CHECK_VALVE_SELECTION_PRODUCTS_START */
  ...(filterCheckValveSelectionProducts as unknown as typeof baseSelectionProducts),
  /* FILTER_CHECK_VALVE_SELECTION_PRODUCTS_END */
    ...femaleThreadAdapterSelectionProducts,
/* BULKHEAD_BARBED_SELECTION_PRODUCTS_START */
  ...(bulkheadBarbedFittingSelectionProducts as unknown as typeof baseSelectionProducts),
  /* BULKHEAD_BARBED_SELECTION_PRODUCTS_END */
...luerFittingSelectionProducts,
    ...quickConnectFittingSelectionProducts,
  ...threadToBarbedFittingSelectionProducts,
...baseSelectionProducts,
  ...diaphragmPumpSelectionProducts,
  ...pipettingPumpSelectionProducts,
  ...valvelessPumpSelectionProducts,
  ...valveSelectionProducts,
  ...probeSelectionProducts,
  ...tubingSelectionProducts,
  ...hardTubeFittingSelectionProductsForDisplay,
  ...barbedFittingSelectionProducts,
  ...syringePumpSelectionProducts,
  ...controlModuleSelectionProducts,
].filter((product, index, array) => {
  /*
   * FITTING_ONLY_STATUS_MERGE_START
   *
   * hidden 状态合并只允许作用于接头系列。
   * 阀、针、泵、管路、智控等非接头类别保持原来的去重逻辑。
   */
  const isFittingProduct =
    product.categoryId === "fittings";

  if (!isFittingProduct) {
    return (
      index ===
      array.findIndex((item) => {
        return item.productId === product.productId;
      })
    );
  }

  if (!isPublishedFittingProduct(product)) {
    return false;
  }

  const hasHiddenFittingRecord =
    array.some((item) => {
      return (
        item.productId === product.productId &&
        item.categoryId === "fittings" &&
        item.status === "hidden"
      );
    });

  if (hasHiddenFittingRecord) {
    return false;
  }

  if (product.status !== "active") {
    return false;
  }

  return (
    index ===
    array.findIndex((item) => {
      return (
        item.productId === product.productId &&
        item.categoryId === "fittings" &&
        item.status === "active"
      );
    })
  );

  /*
   * FITTING_ONLY_STATUS_MERGE_END
   */
});

const selectionTaxonomyItems = [
  /* FILTER_CHECK_VALVE_TAXONOMY_START */
  ...(filterCheckValveTaxonomyItems as unknown as typeof baseSelectionTaxonomyItems),
  /* FILTER_CHECK_VALVE_TAXONOMY_END */
    ...femaleThreadAdapterTaxonomyItems,
/* BULKHEAD_BARBED_TAXONOMY_START */
  ...(bulkheadBarbedFittingTaxonomyItems as unknown as typeof baseSelectionTaxonomyItems),
  /* BULKHEAD_BARBED_TAXONOMY_END */
...luerFittingSelectionTaxonomyItems,
    ...quickConnectFittingTaxonomyItems,
  ...threadToBarbedFittingTaxonomyItems,
...baseSelectionTaxonomyItems,
  ...hardTubeFittingTaxonomyItems,
  ...barbedFittingTaxonomyItems,
  ...diaphragmPumpTaxonomyItems,
  ...controlModuleTaxonomyItems,
].filter((item, index, array) => {
  return index === array.findIndex((entry) => entry.id === item.id);
});

const selectionFilterLabels = [
  /* FILTER_CHECK_VALVE_FILTER_LABELS_START */
  ...(filterCheckValveFilterLabels as unknown as typeof baseSelectionFilterLabels),
  /* FILTER_CHECK_VALVE_FILTER_LABELS_END */
    ...femaleThreadAdapterFilterLabels,
/* BULKHEAD_BARBED_FILTER_LABELS_START */
  ...(bulkheadBarbedFittingFilterLabels as unknown as typeof baseSelectionFilterLabels),
  /* BULKHEAD_BARBED_FILTER_LABELS_END */
...luerFittingSelectionFilterLabels,
    ...quickConnectFittingFilterLabels,
  ...threadToBarbedFittingFilterLabels,
...baseSelectionFilterLabels,
  ...hardTubeFittingFilterLabels,
  ...barbedFittingFilterLabels,
  ...diaphragmPumpFilterLabels,
  ...pipettingPumpFilterLabels,
  ...valvelessPumpFilterLabels,
  ...valveFilterLabels,
  ...probeFilterLabels,
  ...syringePumpFilterLabels,
  ...controlModuleFilterLabels,
].filter((label, index, array) => {
  return (
    index ===
    array.findIndex((item) => {
      return (
        (item as any).productTypeId === (label as any).productTypeId &&
        (item as any).filterKey === (label as any).filterKey
      );
    })
  );
});

type ProductSelectionClientProps = {
  locale?: SelectionLocale;
  pageData?: unknown;
  initialCategoryId?: string;
  initialProductTypeId?: string;
  initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
};

type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;

const FILTER_KEYS: SelectionFilterKey[] = [
  "filter01",
  "filter02",
  "filter03",
  "filter04",
  "filter05",
  "filter06",
  "filter07",
  "filter08",
  "filter09",
];

const FITTING_PRODUCT_TYPE_ORDER_START = true;

const FITTING_PRODUCT_TYPE_ORDER = [
  "hard-tube-fittings",
  "barbed-fittings",
  "thread-to-barbed-fittings",
  "luer-fittings",
  "quick-connect-fittings",
  "female-thread-adapters",
  "bulkhead-barbed-fittings",
  "filters",
] as const;

const FITTING_PRODUCT_TYPE_ORDER_MAP =
  new Map<string, number>(
    FITTING_PRODUCT_TYPE_ORDER.map(
      (productTypeId, index) => [
        productTypeId,
        index,
      ]
    )
  );

/* FITTING_PRODUCT_TYPE_ORDER_END */

const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
  zh: {
    breadcrumbHome: "首页",
    breadcrumbCurrent: "产品中心",
    searchPlaceholder: "搜索产品名称、系列、量程、材质等关键词",
    searchButton: "搜索",
    mobileCategoryPrefix: "产品大类：",
    productTypeLabel: "产品类型",
    resultPrefix: "已找到 ",
    resultSuffix: " 个基础配置",
    resetFilters: "清除筛选",
    submitRequirement: "提交需求",
    detailButton: "查看详情",
    addToList: "加入清单",
    addedToList: "已加入清单",
    previousPage: "上一页",
    nextPage: "下一页",
    filterEmpty: "当前产品大类暂无可用筛选项。",
    emptyTitle: "暂无匹配配置",
    emptyDescription: "可以减少筛选条件，或提交需求由工程师协助确认。",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Product Center",
    searchPlaceholder: "Search by product name, series, volume, material, or keyword",
    searchButton: "Search",
    mobileCategoryPrefix: "Category: ",
    productTypeLabel: "Product Type",
    resultPrefix: "",
    resultSuffix: " configurations found",
    resetFilters: "Clear Filters",
    submitRequirement: "Submit Request",
    detailButton: "View Details",
    addToList: "Add to List",
    addedToList: "Added",
    previousPage: "Previous",
    nextPage: "Next",
    filterEmpty: "No filters are available for this category.",
    emptyTitle: "No matching configurations",
    emptyDescription: "Try removing some filters or submit your requirements for engineering support.",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Centro de productos",
    searchPlaceholder: "Buscar por producto, serie, volumen, material o palabra clave",
    searchButton: "Buscar",
    mobileCategoryPrefix: "Categoría: ",
    productTypeLabel: "Tipo de producto",
    resultPrefix: "",
    resultSuffix: " configuraciones encontradas",
    resetFilters: "Borrar filtros",
    submitRequirement: "Enviar solicitud",
    detailButton: "Ver detalles",
    addToList: "Añadir",
    addedToList: "Añadido",
    previousPage: "Anterior",
    nextPage: "Siguiente",
    filterEmpty: "No hay filtros disponibles para esta categoría.",
    emptyTitle: "No hay configuraciones coincidentes",
    emptyDescription: "Reduzca los filtros o envíe sus requisitos para recibir soporte técnico.",
  },
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Centre produits",
    searchPlaceholder: "Rechercher par produit, série, volume, matériau ou mot-clé",
    searchButton: "Rechercher",
    mobileCategoryPrefix: "Catégorie : ",
    productTypeLabel: "Type de produit",
    resultPrefix: "",
    resultSuffix: " configurations trouvées",
    resetFilters: "Effacer les filtres",
    submitRequirement: "Envoyer une demande",
    detailButton: "Voir les détails",
    addToList: "Ajouter",
    addedToList: "Ajouté",
    previousPage: "Précédent",
    nextPage: "Suivant",
    filterEmpty: "Aucun filtre disponible pour cette catégorie.",
    emptyTitle: "Aucune configuration correspondante",
    emptyDescription: "Réduisez les filtres ou envoyez vos besoins pour obtenir une assistance technique.",
  },
  ko: {
    breadcrumbHome: "홈",
    breadcrumbCurrent: "제품 센터",
    searchPlaceholder: "제품명, 시리즈, 용량, 재질 또는 키워드로 검색",
    searchButton: "검색",
    mobileCategoryPrefix: "제품 분류: ",
    productTypeLabel: "제품 유형",
    resultPrefix: "",
    resultSuffix: "개 기본 구성을 찾았습니다",
    resetFilters: "필터 초기화",
    submitRequirement: "요청 제출",
    detailButton: "상세 보기",
    addToList: "목록 추가",
    addedToList: "추가됨",
    previousPage: "이전",
    nextPage: "다음",
    filterEmpty: "이 제품 분류에는 사용할 수 있는 필터가 없습니다.",
    emptyTitle: "일치하는 구성이 없습니다",
    emptyDescription: "필터를 줄이거나 요구사항을 제출해 엔지니어 지원을 받아보세요.",
  },
  ru: {
    breadcrumbHome: "Главная",
    breadcrumbCurrent: "Центр продуктов",
    searchPlaceholder: "Поиск по названию, серии, объему, материалу или ключевому слову",
    searchButton: "Поиск",
    mobileCategoryPrefix: "Категория: ",
    productTypeLabel: "Тип продукта",
    resultPrefix: "Найдено ",
    resultSuffix: " конфигураций",
    resetFilters: "Сбросить фильтры",
    submitRequirement: "Отправить запрос",
    detailButton: "Подробнее",
    addToList: "В список",
    addedToList: "Добавлено",
    previousPage: "Назад",
    nextPage: "Далее",
    filterEmpty: "Для этой категории нет доступных фильтров.",
    emptyTitle: "Нет подходящих конфигураций",
    emptyDescription: "Уменьшите количество фильтров или отправьте требования для инженерной поддержки.",
  },
};

const TARGET_LOCALE_A11Y_TEXT: Partial<
  Record<
    SelectionLocale,
    {
      breadcrumbAriaLabel: string;
      productTypeOverviewSuffix: string;
      currentPrefix: string;
      paginationAriaLabel: string;
      barbedPortLabel: string;
    }
  >
> = {
  es: {
    breadcrumbAriaLabel: "Navegación jerárquica",
    productTypeOverviewSuffix: ": descripción general del tipo de producto",
    currentPrefix: "Actual: ",
    paginationAriaLabel: "Paginación de productos",
    barbedPortLabel: "Diámetro interior de espiga",
  },
  fr: {
    breadcrumbAriaLabel: "Fil d’Ariane",
    productTypeOverviewSuffix: " : présentation du type de produit",
    currentPrefix: "Sélection actuelle : ",
    paginationAriaLabel: "Pagination des produits",
    barbedPortLabel: "Diamètre intérieur de cannelure",
  },
  ko: {
    breadcrumbAriaLabel: "이동 경로",
    productTypeOverviewSuffix: " 제품 유형 개요",
    currentPrefix: "현재 선택: ",
    paginationAriaLabel: "제품 페이지 탐색",
    barbedPortLabel: "바브 내경",
  },
  ru: {
    breadcrumbAriaLabel: "Навигационная цепочка",
    productTypeOverviewSuffix: ": обзор типа продукции",
    currentPrefix: "Текущий выбор: ",
    paginationAriaLabel: "Навигация по страницам продукции",
    barbedPortLabel: "Внутренний диаметр штуцера",
  },
};

const DEFAULT_CATEGORIES: ProductSelectionCategoryItem[] = [
  {
    id: "pumps",
    label: "泵系列",
    description: "根据泵类型、系列、量程和核心筛选项选择基础配置。",
    sortOrder: 10,
  },
  {
    id: "valves",
    label: "阀系列",
    description: "根据阀类型、系列、通路、位数和材质选择基础配置。",
    sortOrder: 20,
  },
  {
    id: "needles",
    label: "针系列",
    description: "根据针类型、规格和应用场景选择基础配置。",
    sortOrder: 30,
  },
  {
    id: "fittings",
    label: "接头系列",
    description: "根据接头类型、管径、螺纹和材质选择基础配置。",
    sortOrder: 40,
  },
  {
    id: "tubing",
    label: "管路系列",
    description: "根据管材、外径、内径和应用需求选择基础配置。",
    sortOrder: 50,
  },
  {
    id: "control",
    label: "智控系列",
    description: "根据控制方式、驱动类型和系统接口选择基础配置。",
    sortOrder: 60,
  },
];

const ENGLISH_CATEGORY_DESCRIPTIONS: Record<string, string> = {
  pumps:
    "Select a base configuration by pump type, series, volume range, and key operating requirements.",
  valves:
    "Select a base configuration by valve type, series, flow path, positions, and materials.",
  needles:
    "Select a base configuration by probe or needle type, dimensions, and application.",
  fittings:
    "Select a base configuration by fitting type, tube size, thread, and material.",
  tubing:
    "Select a base configuration by tubing material, outside diameter, inside diameter, and application requirements.",
  control:
    "Select a base configuration by control method, drive type, and system interface.",
};

const TARGET_CATEGORY_DESCRIPTIONS: Record<
  "es" | "fr" | "ko" | "ru",
  Record<string, string>
> = {
  es: {
    pumps: "Seleccione una configuración base según el tipo de bomba, la serie, el rango de volumen y los requisitos operativos principales.",
    valves: "Seleccione una configuración base según el tipo de válvula, la serie, el circuito de flujo, las posiciones y los materiales.",
    needles: "Seleccione una configuración base según el tipo de sonda o aguja, sus dimensiones y la aplicación.",
    fittings: "Seleccione una configuración base según el tipo de racor, el diámetro del tubo, la rosca y el material.",
    tubing: "Seleccione una configuración base según el material del tubo, los diámetros exterior e interior y los requisitos de la aplicación.",
    control: "Seleccione una configuración base según el método de control, el tipo de accionamiento y la interfaz del sistema.",
  },
  fr: {
    pumps: "Sélectionnez une configuration de base selon le type de pompe, la série, la plage de volume et les principales exigences de fonctionnement.",
    valves: "Sélectionnez une configuration de base selon le type de vanne, la série, le circuit d'écoulement, le nombre de positions et les matériaux.",
    needles: "Sélectionnez une configuration de base selon le type de sonde ou d'aiguille, ses dimensions et l'application.",
    fittings: "Sélectionnez une configuration de base selon le type de raccord, le diamètre du tube, le filetage et le matériau.",
    tubing: "Sélectionnez une configuration de base selon le matériau du tube, ses diamètres extérieur et intérieur et les exigences de l'application.",
    control: "Sélectionnez une configuration de base selon le mode de commande, le type d'entraînement et l'interface système.",
  },
  ko: {
    pumps: "펌프 유형, 시리즈, 용량 범위 및 주요 운전 요구 사항에 따라 기본 구성을 선택하십시오.",
    valves: "밸브 유형, 시리즈, 유로, 포지션 수 및 재질에 따라 기본 구성을 선택하십시오.",
    needles: "프로브 또는 니들 유형, 치수 및 적용 분야에 따라 기본 구성을 선택하십시오.",
    fittings: "피팅 유형, 튜브 규격, 나사 및 재질에 따라 기본 구성을 선택하십시오.",
    tubing: "튜빙 재질, 외경, 내경 및 적용 요구 사항에 따라 기본 구성을 선택하십시오.",
    control: "제어 방식, 구동 유형 및 시스템 인터페이스에 따라 기본 구성을 선택하십시오.",
  },
  ru: {
    pumps: "Выберите базовую конфигурацию по типу насоса, серии, диапазону объема и основным рабочим требованиям.",
    valves: "Выберите базовую конфигурацию по типу клапана, серии, схеме потока, числу позиций и материалам.",
    needles: "Выберите базовую конфигурацию по типу зонда или иглы, размерам и области применения.",
    fittings: "Выберите базовую конфигурацию по типу фитинга, размеру трубки, резьбе и материалу.",
    tubing: "Выберите базовую конфигурацию по материалу трубки, наружному и внутреннему диаметрам и требованиям применения.",
    control: "Выберите базовую конфигурацию по способу управления, типу привода и системному интерфейсу.",
  },
};

const TARGET_UI_LABEL_TRANSLATIONS: Record<
  "es" | "fr" | "ko" | "ru",
  Record<string, string>
> = {
  es: {
    "check-valves": "Válvulas antirretorno",
    Pumps: "Bombas",
    Valves: "Válvulas",
    Probes: "Sondas",
    Fittings: "Racores",
    Tubing: "Tubos",
    Control: "Control",
    "Plunger Pump": "Bomba de émbolo",
    "Diaphragm Pump": "Bomba de diafragma",
    "Pipette Pump": "Bomba de pipeteo",
    "Valveless Pump": "Bomba sin válvulas",
    "Syringe Pump": "Bomba de jeringa",
    "EA Standard Plunger Pump": "Bomba de émbolo estándar EA",
    Series: "Serie",
    Volume: "Volumen",
    "Pump Head Material": "Material del cabezal de la bomba",
    "Barbed Fittings": "Racores de espiga",
    Structure: "Estructura",
    "Barb 1 ID": "Diámetro interior de espiga 1",
    "Barb 2 ID": "Diámetro interior de espiga 2",
    "Barb 3 ID": "Diámetro interior de espiga 3",
    "Body Material": "Material del cuerpo",
    Color: "Color",
    "Bulkhead Barbed Fittings": "Racores de espiga pasamuros",
    "Product Structure": "Estructura del producto",
    "Thread Size": "Tamaño de rosca",
    "Tube ID": "Diámetro interior del tubo",
    Material: "Material",
    "Diaphragm Pumps": "Bombas de diafragma",
    "Pump Type": "Tipo de bomba",
    "Motor Type": "Tipo de motor",
    "Flow Rate": "Caudal",
    Pressure: "Presión",
    Thread: "Rosca",
    "Flow Path Diameter": "Diámetro del conducto",
    "Female Thread Adapters": "Adaptadores de rosca hembra",
    "Product Type": "Tipo de producto",
    "Filter Type": "Tipo de filtro",
    "Filter Media": "Medio filtrante",
    "Filtration Rating": "Grado de filtración",
    "Seal Type": "Tipo de sello",
    "Diaphragm Material": "Material del diafragma",
    "Tube ID / Thread": "DI del tubo / rosca",
    "Filters & Check Valves": "Filtros y válvulas de retención",
    "过滤器与单向阀": "Filtros y válvulas de retención",
    "Product Series": "Serie de producto",
    "Tube OD": "Diámetro exterior del tubo",
    "Hard Tube Fittings": "Racores para tubo rígido",
    "Tube Inner Diameter": "Diámetro interior del tubo",
    "Luer Fittings": "Racores Luer",
    "Tube I.D. or Thread": "DI del tubo o rosca",
    "Male / Female": "Macho / hembra",
    Mounting: "Montaje",
    "Valve Configuration": "Configuración de válvula",
    Shape: "Forma",
    "Housing Material": "Material de la carcasa",
    "Quick-connect Fittings": "Racores de conexión rápida",
    "Thread to Barb Fittings": "Racores de rosca a espiga",
    "Connection Structure": "Estructura de conexión",
    "Sealing Method": "Método de sellado",
    "Tubing ID": "Diámetro interior del tubo",
  },
  fr: {
    "check-valves": "Clapets anti-retour",
    Pumps: "Pompes",
    Valves: "Vannes",
    Probes: "Sondes",
    Fittings: "Raccords",
    Tubing: "Tubes",
    Control: "Commande",
    "Plunger Pump": "Pompe à piston",
    "Diaphragm Pump": "Pompe à membrane",
    "Pipette Pump": "Pompe de pipetage",
    "Valveless Pump": "Pompe sans clapet",
    "Syringe Pump": "Pompe à seringue",
    "EA Standard Plunger Pump": "Pompe à piston standard EA",
    Series: "Série",
    Volume: "Volume",
    "Pump Head Material": "Matériau de la tête de pompe",
    "Barbed Fittings": "Raccords cannelés",
    Structure: "Structure",
    "Barb 1 ID": "Diamètre intérieur de cannelure 1",
    "Barb 2 ID": "Diamètre intérieur de cannelure 2",
    "Barb 3 ID": "Diamètre intérieur de cannelure 3",
    "Body Material": "Matériau du corps",
    Color: "Couleur",
    "Bulkhead Barbed Fittings": "Raccords cannelés traversée de cloison",
    "Product Structure": "Structure du produit",
    "Thread Size": "Dimension du filetage",
    "Tube ID": "Diamètre intérieur du tube",
    Material: "Matériau",
    "Diaphragm Pumps": "Pompes à membrane",
    "Pump Type": "Type de pompe",
    "Motor Type": "Type de moteur",
    "Flow Rate": "Débit",
    Pressure: "Pression",
    Thread: "Filetage",
    "Flow Path Diameter": "Diamètre du passage",
    "Female Thread Adapters": "Adaptateurs à filetage femelle",
    "Product Type": "Type de produit",
    "Filter Type": "Type de filtre",
    "Filter Media": "Média filtrant",
    "Filtration Rating": "Seuil de filtration",
    "Seal Type": "Type de joint",
    "Diaphragm Material": "Matériau de la membrane",
    "Tube ID / Thread": "DI du tube / filetage",
    "Filters & Check Valves": "Filtres et clapets anti-retour",
    "过滤器与单向阀": "Filtres et clapets anti-retour",
    "Product Series": "Série de produits",
    "Tube OD": "Diamètre extérieur du tube",
    "Hard Tube Fittings": "Raccords pour tubes rigides",
    "Tube Inner Diameter": "Diamètre intérieur du tube",
    "Luer Fittings": "Raccords Luer",
    "Tube I.D. or Thread": "DI du tube ou filetage",
    "Male / Female": "Mâle / femelle",
    Mounting: "Montage",
    "Valve Configuration": "Configuration de vanne",
    Shape: "Forme",
    "Housing Material": "Matériau du boîtier",
    "Quick-connect Fittings": "Raccords rapides",
    "Thread to Barb Fittings": "Raccords filetés vers cannelure",
    "Connection Structure": "Structure de raccordement",
    "Sealing Method": "Méthode d'étanchéité",
    "Tubing ID": "Diamètre intérieur du tube",
  },
  ko: {
    "check-valves": "체크 밸브",
    Pumps: "펌프",
    Valves: "밸브",
    Probes: "프로브",
    Fittings: "피팅",
    Tubing: "튜빙",
    Control: "제어",
    "Plunger Pump": "플런저 펌프",
    "Diaphragm Pump": "다이어프램 펌프",
    "Pipette Pump": "피펫팅 펌프",
    "Valveless Pump": "밸브리스 펌프",
    "Syringe Pump": "시린지 펌프",
    "EA Standard Plunger Pump": "EA 표준 플런저 펌프",
    Series: "시리즈",
    Volume: "용량",
    "Pump Head Material": "펌프 헤드 재질",
    "Barbed Fittings": "바브 피팅",
    Structure: "구조",
    "Barb 1 ID": "바브 1 내경",
    "Barb 2 ID": "바브 2 내경",
    "Barb 3 ID": "바브 3 내경",
    "Body Material": "본체 재질",
    Color: "색상",
    "Bulkhead Barbed Fittings": "벌크헤드 바브 피팅",
    "Product Structure": "제품 구조",
    "Thread Size": "나사 규격",
    "Tube ID": "튜브 내경",
    Material: "재질",
    "Diaphragm Pumps": "다이어프램 펌프",
    "Pump Type": "펌프 유형",
    "Motor Type": "모터 유형",
    "Flow Rate": "유량",
    Pressure: "압력",
    Thread: "나사",
    "Flow Path Diameter": "유로 직경",
    "Female Thread Adapters": "암나사 어댑터",
    "Product Type": "제품 유형",
    "Filter Type": "필터 유형",
    "Filter Media": "필터 매체",
    "Filtration Rating": "여과 정밀도",
    "Seal Type": "씰 유형",
    "Diaphragm Material": "다이어프램 재질",
    "Tube ID / Thread": "튜브 내경 / 나사",
    "Filters & Check Valves": "필터 및 체크 밸브",
    "过滤器与单向阀": "필터 및 체크 밸브",
    "Product Series": "제품 시리즈",
    "Tube OD": "튜브 외경",
    "Hard Tube Fittings": "경질 튜브 피팅",
    "Tube Inner Diameter": "튜브 내경",
    "Luer Fittings": "루어 피팅",
    "Tube I.D. or Thread": "튜브 내경 또는 나사",
    "Male / Female": "수형 / 암형",
    Mounting: "장착 방식",
    "Valve Configuration": "밸브 구성",
    Shape: "형상",
    "Housing Material": "하우징 재질",
    "Quick-connect Fittings": "퀵 커넥트 피팅",
    "Thread to Barb Fittings": "나사-바브 피팅",
    "Connection Structure": "연결 구조",
    "Sealing Method": "밀봉 방식",
    "Tubing ID": "튜빙 내경",
  },
  ru: {
    "check-valves": "Обратные клапаны",
    Pumps: "Насосы",
    Valves: "Клапаны",
    Probes: "Зонды",
    Fittings: "Фитинги",
    Tubing: "Трубки",
    Control: "Управление",
    "Plunger Pump": "Плунжерный насос",
    "Diaphragm Pump": "Мембранный насос",
    "Pipette Pump": "Пипетирующий насос",
    "Valveless Pump": "Бесклапанный насос",
    "Syringe Pump": "Шприцевой насос",
    "EA Standard Plunger Pump": "Стандартный плунжерный насос EA",
    Series: "Серия",
    Volume: "Объем",
    "Pump Head Material": "Материал головки насоса",
    "Barbed Fittings": "Штуцерные фитинги",
    Structure: "Конструкция",
    "Barb 1 ID": "Внутренний диаметр штуцера 1",
    "Barb 2 ID": "Внутренний диаметр штуцера 2",
    "Barb 3 ID": "Внутренний диаметр штуцера 3",
    "Body Material": "Материал корпуса",
    Color: "Цвет",
    "Bulkhead Barbed Fittings": "Панельные штуцерные фитинги",
    "Product Structure": "Конструкция изделия",
    "Thread Size": "Размер резьбы",
    "Tube ID": "Внутренний диаметр трубки",
    Material: "Материал",
    "Diaphragm Pumps": "Мембранные насосы",
    "Pump Type": "Тип насоса",
    "Motor Type": "Тип двигателя",
    "Flow Rate": "Расход",
    Pressure: "Давление",
    Thread: "Резьба",
    "Flow Path Diameter": "Диаметр проходного канала",
    "Female Thread Adapters": "Переходники с внутренней резьбой",
    "Product Type": "Тип продукции",
    "Filter Type": "Тип фильтра",
    "Filter Media": "Фильтрующий материал",
    "Filtration Rating": "Тонкость фильтрации",
    "Seal Type": "Тип уплотнения",
    "Diaphragm Material": "Материал мембраны",
    "Tube ID / Thread": "ВД трубки / резьба",
    "Filters & Check Valves": "Фильтры и обратные клапаны",
    "过滤器与单向阀": "Фильтры и обратные клапаны",
    "Product Series": "Серия продукции",
    "Tube OD": "Наружный диаметр трубки",
    "Hard Tube Fittings": "Фитинги для жестких трубок",
    "Tube Inner Diameter": "Внутренний диаметр трубки",
    "Luer Fittings": "Фитинги Люэра",
    "Tube I.D. or Thread": "ВД трубки или резьба",
    "Male / Female": "Наружный / внутренний",
    Mounting: "Монтаж",
    "Valve Configuration": "Конфигурация клапана",
    Shape: "Форма",
    "Housing Material": "Материал корпуса",
    "Quick-connect Fittings": "Быстроразъемные фитинги",
    "Thread to Barb Fittings": "Резьбовые штуцерные фитинги",
    "Connection Structure": "Конструкция соединения",
    "Sealing Method": "Способ уплотнения",
    "Tubing ID": "Внутренний диаметр трубки",
  },
};

function getTargetUiLabel(locale: SelectionLocale, value: string) {
  if (locale === "zh" || locale === "en") return value;

  return TARGET_UI_LABEL_TRANSLATIONS[locale]?.[value] || value;
}

function renderProductTypeIntroParagraph(paragraph: string) {
  const legacyEmphasisText = "详情页查看或提交选型需求确认";
  const paragraphWithEmphasis = paragraph.includes("**")
    ? paragraph
    : paragraph.replace(legacyEmphasisText, `**${legacyEmphasisText}**`);

  return paragraphWithEmphasis
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((segment, index) => {
      const isEmphasized = segment.startsWith("**") && segment.endsWith("**");

      if (!isEmphasized) {
        return segment;
      }

      return (
        <strong
          className="product-type-intro-emphasis"
          key={`${index}-${segment}`}
        >
          {segment.slice(2, -2)}
        </strong>
      );
    });
}

function getCategoryDescription(
  locale: SelectionLocale,
  categoryId: string,
  fallback: string
) {
  if (locale === "en") {
    return (
      ENGLISH_CATEGORY_DESCRIPTIONS[categoryId] ||
      "Select a base configuration by product type, series, and key requirements."
    );
  }

  if (locale !== "zh") {
    return (
      TARGET_CATEGORY_DESCRIPTIONS[locale]?.[categoryId] ||
      getTargetUiLabel(locale, fallback)
    );
  }

  return fallback;
}

function getText(
  locale: SelectionLocale,
  value: Partial<Record<SelectionLocale, string>> | undefined,
  fallback = ""
) {
  if (!value) return fallback;

  if (locale === "zh") {
    return value.zh || value.en || fallback;
  }

  const localizedValue = value[locale] || value.en || value.zh || fallback;

  return getTargetUiLabel(locale, localizedValue);
}

function getTaxonomyLabel(locale: SelectionLocale, id: string) {
  const item = selectionTaxonomyItems.find((entry) => entry.id === id);

  return getText(locale, item?.label, id);
}

function getCategoryItems(locale: SelectionLocale) {
  const generatedCategories = selectionTaxonomyItems
    .filter((item) => item.type === "category")
    .map((item) => {
      const fallback = DEFAULT_CATEGORIES.find(
        (category) => category.id === item.id
      );

      return {
        id: item.id,
        label: getText(locale, item.label, fallback?.label || item.id),
        description: getCategoryDescription(
          locale,
          item.id,
          fallback?.description ||
            "根据产品类型、系列和筛选条件选择基础配置。"
        ),
        sortOrder: item.sortOrder,
      };
    });

  const categoryMap = new Map<string, ProductSelectionCategoryItem>();

  DEFAULT_CATEGORIES.forEach((category) => {
    categoryMap.set(category.id, {
      ...category,
      label: getTaxonomyLabel(locale, category.id),
      description: getCategoryDescription(
        locale,
        category.id,
        String(category.description || "")
      ),
    });
  });

  generatedCategories.forEach((category) => {
    categoryMap.set(category.id, category);
  });

  return Array.from(categoryMap.values()).sort(
    (current, next) => current.sortOrder - next.sortOrder
  );
}

function getProductsByCategory(categoryId: string) {
  
  /*
    TUBING_GET_PRODUCTS_BY_CATEGORY_20260707
    管路系列直接返回 6 张材料卡片。
  */
  if (String(arguments[0] || "") === "tubing") {
    return tubingSelectionProducts;
  }

return selectionProducts
    .filter((product) => product.categoryId === categoryId)
    .filter((product, index, array) => {
      return (
        index ===
        array.findIndex((item) => item.productId === product.productId)
      );
    });
}

function getFirstProductTypeId(categoryId: string) {

  /* FITTING_DEFAULT_PRODUCT_TYPE_START */

  if (
    categoryId ===
    "fittings"
  ) {
    return "hard-tube-fittings";
  }

  /* FITTING_DEFAULT_PRODUCT_TYPE_END */
  
  /*
    TUBING_GET_FIRST_PRODUCT_TYPE_20260707
  */
  if (String(arguments[0] || "") === "tubing") {
    return "tubing";
  }

const products = getProductsByCategory(categoryId);
  const first = products[0];

  if (first?.productTypeId) {
    return first.productTypeId;
  }

  return (
    getProductTypeFilterOptionsByCategory(categoryId)[0]?.value || ""
  );
}

function getVisibleFilterLabels(productTypeId: string): ProductSelectionFilterLabel[] {
  return selectionFilterLabels
    .filter((item): item is ProductSelectionFilterLabel => {
      const label = item as any;

      return Boolean(
        label &&
          typeof label === "object" &&
          label.productTypeId === productTypeId &&
          label.visible
      );
    })
    .sort((current, next) => {
      const currentSortOrder = Number((current as any).sortOrder ?? 0);
      const nextSortOrder = Number((next as any).sortOrder ?? 0);

      return currentSortOrder - nextSortOrder;
    });
}

function splitFilterValues(value: unknown): string[] {
  return String(value || "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}
function getFilterOptions(
  products: ProductSelectionProduct[],
  filterKey: SelectionFilterKey,
  selectedFilters: SelectedFilterMap,
  productTypeId: string
) {
  /*
   * 硬管接头的接管外径可能包含多个兼容尺寸。
   *
   * 例如：
   * 1.6 mm|1.8 mm|2.0 mm
   *
   * 左侧筛选必须拆成三个独立选项。
   */
  /*
   * FEMALE_THREAD_MULTI_VALUE_OPTIONS_START
   *
   * 内螺纹互转接头中：
   * PU-U32-U28 同时包含两个液路螺纹。
   *
   * 在生成任意筛选组之前，
   * 先将 filter02 拆成独立产品副本，
   * 确保螺纹选项和其他筛选条件可以正常联动。
   */
  if (
    productTypeId ===
    "female-thread-adapters"
  ) {
    const expandedProducts =
      products.flatMap(
        (product) => {
          const threadValues =
            splitFilterValues(
              (product.filters || {})
                .filter02
            );

          if (
            threadValues.length <= 1
          ) {
            return [product];
          }

          return threadValues.map(
            (threadValue) => ({
              ...product,

              productId:
                `${product.productId}__thread__${threadValue}`,

              filters: {
                ...(product.filters || {}),

                filter02:
                  threadValue,
              },
            })
          );
        }
      );

    return getProductFilterOptions({
      productTypeId,
      products:
        expandedProducts,
      filterKey,
      selectedFilters,
    });
  }

  /* FEMALE_THREAD_MULTI_VALUE_OPTIONS_END */

  if (
    productTypeId === "hard-tube-fittings" &&
    filterKey === "filter03"
  ) {
    const expandedProducts = products.flatMap((product) => {
      const values = splitFilterValues(
        (product.filters || {})[filterKey]
      );

      if (values.length <= 1) {
        return [product];
      }

      return values.map((value) => ({
        ...product,
        productId: `${product.productId}__${value}`,
        filters: {
          ...(product.filters || {}),
          [filterKey]: value,
        },
      }));
    });

    return getProductFilterOptions({
      productTypeId,
      products: expandedProducts,
      filterKey,
      selectedFilters,
    });
  }

  return getProductFilterOptions({
    productTypeId,
    products,
    filterKey,
    selectedFilters,
  });
}
function getDefaultSelectedFilters(
  _categoryId: string,
  _productTypeId: string
): SelectedFilterMap {
  /*
   * 说明：
   * 1. 二级产品类型页只代表“柱塞泵”
   * 2. 不应该默认选中 EA / SM / TM
   * 3. 三级系列页会通过 initialFilters 单独选中对应系列
   */
  return {};
}

function getInitialSelectedFilters(
  categoryId: string,
  productTypeId: string,
  initialFilters?: ProductSelectionClientProps["initialFilters"]
): SelectedFilterMap {
  const selected = getDefaultSelectedFilters(categoryId, productTypeId);

  if (!initialFilters) {
    return selected;
  }

  FILTER_KEYS.forEach((filterKey) => {
    const values = initialFilters[filterKey];

    if (!values || values.length === 0) {
      return;
    }

    selected[filterKey] = new Set(values.filter(Boolean));
  });

  return selected;
}

function getResponsiveProductPageSize() {
  if (typeof window === "undefined") {
    return 12;
  }

  const width = window.innerWidth;

  if (width <= 760) {
    return 6;
  }

  if (width <= 1280) {
    return 9;
  }

  return 12;
}

function getDefaultMobileOpenFilterGroups(productTypeId: string) {
  const openGroups: Record<string, boolean> = {
    productType: false,
  };

  getVisibleFilterLabels(productTypeId).forEach((filter) => {
    openGroups[filter.filterKey] = false;
  });

  return openGroups;
}

function normalizeDetailPathPart(value: unknown) {
  return String(value || "")
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean)
    .pop() || "";
}

function normalizeModelKey(value: unknown) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/μ/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


function getSelectionLocalizedText(value: unknown, locale: "zh" | "en" = "zh"): string {
  if (!value) return "";
  if (typeof value === "string") return value;

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    const current = record[locale];
    const zh = record.zh;
    const en = record.en;

    if (typeof current === "string") return current;
    if (typeof zh === "string") return zh;
    if (typeof en === "string") return en;
  }

  return "";
}

function findPlungerPumpDetailSlug(product: ProductSelectionProduct) {
  const candidates = [
    getSelectionLocalizedText(product.cardTitle, "en"),
    getSelectionLocalizedText(product.cardTitle, "zh"),
    product.productId,
    product.detailSlug,
  ]
    .map(normalizeModelKey)
    .filter(Boolean);

  const matchedDetail = (plungerPumpDetails as any[]).find((detail) => {
    const detailCandidates = [
      detail.model,
      detail.productId,
      detail.slug,
      detail.detailSlug,
    ]
      .map(normalizeModelKey)
      .filter(Boolean);

    return detailCandidates.some((item) => candidates.includes(item));
  });

  return normalizeDetailPathPart(
    matchedDetail?.slug ||
      matchedDetail?.detailSlug ||
      product.detailSlug
  );
}


/* ===== FOREACH plunger pump model detail href helpers START ===== */

function cleanPlungerHrefText(value: unknown) {
  return String(value || "").trim();
}

function normalizePlungerPathPart(value: unknown) {
  const parts = cleanPlungerHrefText(value).split("/").filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : "";
}

function normalizePlungerModelSlug(value: unknown) {
  return cleanPlungerHrefText(value)
    .toLowerCase()
    .replace(/μ/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getPlungerPumpModelSlugForDetailHref(product: ProductSelectionProduct) {
  const existingSlug = normalizePlungerPathPart(product.detailSlug);

  if (/^(ea|sm|tm)-\d+-(pmma|peek)$/i.test(existingSlug)) {
    return existingSlug.toLowerCase();
  }

  const text = [
    getSelectionLocalizedText(product.cardTitle, "en"),
    getSelectionLocalizedText(product.cardTitle, "zh"),
    product.productId,
    product.detailSlug,
    product.seriesId,
    product.filters?.filter01,
    product.filters?.filter02,
    product.filters?.filter03,
    getSelectionLocalizedText(product.searchKeywords, "en"),
    getSelectionLocalizedText(product.searchKeywords, "zh"),
  ]
    .map(cleanPlungerHrefText)
    .filter(Boolean)
    .join(" ");

  const directModel = text.match(/\b(EA|SM|TM)[\s_-]*(\d{2,5})(?:\s*(?:UL|U|μL|uL))?[\s_-]*(PMMA|PEEK)\b/i);

  if (directModel) {
    return [
      directModel[1].toLowerCase(),
      String(Number(directModel[2])),
      directModel[3].toLowerCase(),
    ].join("-");
  }

  const seriesMatch = text.match(/\b(EA|SM|TM)\b/i);
  const capacityMatch = text.match(/(\d{2,5})\s*(?:μL|uL|UL|U)/i);
  const materialMatch = text.match(/\b(PMMA|PEEK)\b/i);

  if (seriesMatch && capacityMatch && materialMatch) {
    return [
      seriesMatch[1].toLowerCase(),
      String(Number(capacityMatch[1])),
      materialMatch[1].toLowerCase(),
    ].join("-");
  }

  return normalizePlungerModelSlug(getSelectionLocalizedText(product.cardTitle, "en") || getSelectionLocalizedText(product.cardTitle, "zh") || product.productId || product.detailSlug);
}

/* ===== FOREACH plunger pump model detail href helpers END ===== */



/*
  FORCE_FIX_PLUNGER_WRONG_PROBE_HREF_20260707

  最终详情链接出口保护：
  防止柱塞泵 EA / SM / TM 被错误跳到 /products/probes/[slug]。
  只纠正 EA / SM / TM 柱塞泵型号，不影响真正的针系列页面。
*/
function normalizeFinalProductDetailHref(
  product: ProductSelectionProduct,
  href: string
): string {
  const rawHref = String(href || "").trim();

  const hrefSlug = rawHref
    .split("/")
    .filter(Boolean)
    .pop()
    ?.toLowerCase();

  const rawSlug = String(
    (product as any).detailSlug ||
      (product as any).slug ||
      (product as any).productId ||
      hrefSlug ||
      ""
  )
    .split("/")
    .filter(Boolean)
    .pop()
    ?.toLowerCase();

  if (rawSlug && /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(rawSlug)) {
    return `/products/pumps/plunger-pumps/${rawSlug}`;
  }

  if (
    rawHref.includes("/products/probes/") &&
    hrefSlug &&
    /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(hrefSlug)
  ) {
    return `/products/pumps/plunger-pumps/${hrefSlug}`;
  }

  return rawHref;
}


function makeDetailHref(product: ProductSelectionProduct) {
  /* FEMALE_THREAD_ADAPTER_DETAIL_HREF_START */
  /*
   * 内螺纹互转接头详情地址：
   *
   * /products/fittings/female-thread-adapters/[detailSlug]
   *
   * 避免错误回退为：
   * /products/fittings/[detailSlug]
   */
  if (
    String(
      (product as any)?.categoryId ||
      ""
    ).trim() === "fittings" &&
    String(
      (product as any)?.productTypeId ||
      ""
    ).trim() === "female-thread-adapters"
  ) {
    const existingHref = String(
      (product as any)?.detailHref ||
      (product as any)?.href ||
      ""
    ).trim();

    if (
      existingHref.includes(
        "/products/fittings/female-thread-adapters/"
      )
    ) {
      return existingHref;
    }

    const rawSlug = String(
      (product as any)?.detailSlug ||
      (product as any)?.routeSlug ||
      (product as any)?.slug ||
      ""
    ).trim();

    const detailSlug =
      rawSlug
        .split("/")
        .filter(Boolean)
        .pop()
        ?.trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") ||
      "";

    return detailSlug
      ? `/products/fittings/female-thread-adapters/${detailSlug}`
      : "/products/fittings/female-thread-adapters";
  }
  /* FEMALE_THREAD_ADAPTER_DETAIL_HREF_END */


  /* FILTER_CHECK_VALVE_DETAIL_HREF_START */

  {
    const rawProductTypeId =
      String(
        (product as any)?.productTypeId ||
        ""
      ).trim();

    const rawExistingHref =
      String(
        (product as any)?.detailHref ||
        (product as any)?.href ||
        ""
      ).trim();

    const isFilterOrCheckValve =
      rawProductTypeId ===
        "filters" ||
      rawProductTypeId ===
        "check-valves" ||
      rawExistingHref.includes(
        "/products/fittings/filters/"
      ) ||
      rawExistingHref.includes(
        "/products/fittings/check-valves/"
      );

    if (isFilterOrCheckValve) {
      /*
       * 生成数据已经带有正式详情地址时，
       * 直接使用，不再进入其它接头或针阀分支。
       */
      if (
        /^\/products\/fittings\/(filters|check-valves)\/[^/]+\/?$/.test(
          rawExistingHref
        )
      ) {
        return rawExistingHref.replace(
          /\/$/,
          ""
        );
      }

      const routeType =
        rawProductTypeId ===
          "check-valves" ||
        rawExistingHref.includes(
          "/products/fittings/check-valves/"
        )
          ? "check-valves"
          : "filters";

      const slugFromHref =
        rawExistingHref
          .split("/")
          .filter(Boolean)
          .pop();

      const rawSlug =
        String(
          (product as any)?.detailSlug ||
          (product as any)?.slug ||
          slugFromHref ||
          ""
        )
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

      if (rawSlug) {
        return `/products/fittings/${routeType}/${rawSlug}`;
      }

      return "/products/fittings/filters";
    }
  }

  /* FILTER_CHECK_VALVE_DETAIL_HREF_END */

  /* HARD_TUBE_DETAIL_HREF_START */

  if (
    String(
      (product as any)?.productTypeId ||
      ""
    ).trim() ===
      "hard-tube-fittings"
  ) {
    /*
     * filter03 多值展开后，
     * productId 可能变成：
     *
     * 809746__1.6 mm
     *
     * 匹配详情前先恢复真实商品ID。
     */
    const rawProductId =
      String(
        (product as any)?.productId ||
        ""
      )
        .split("__")[0]
        .trim();

    const productCandidates = [
      rawProductId,

      getSelectionLocalizedText(
        product.cardTitle,
        "zh"
      ),

      getSelectionLocalizedText(
        product.cardTitle,
        "en"
      ),
    ]
      .map(
        normalizeModelKey
      )
      .filter(Boolean);

    const matchedDetail =
      (
        hardTubeDetailsJson as any[]
      ).find((detail) => {
        const detailCandidates = [
          detail?.productId,
          detail?.model,
          detail?.slug,
          detail?.displayModel,
          detail?.foreachModel,
          detail?.modelDisplay,
        ]
          .map(
            normalizeModelKey
          )
          .filter(Boolean);

        return detailCandidates.some(
          (value) =>
            productCandidates.includes(
              value
            )
        );
      });

    const matchedHref =
      String(
        matchedDetail?.detailHref ||
        ""
      ).trim();

    if (matchedHref) {
      return matchedHref;
    }

    const matchedSlug =
      normalizeDetailPathPart(
        matchedDetail?.slug ||
        matchedDetail?.detailSlug ||
        ""
      );

    if (matchedSlug) {
      return `/products/fittings/hard-tube-fittings/${matchedSlug}`;
    }

    /*
     * 152张选型卡中只有147条正式详情。
     * 没匹配到详情的5条保持回到硬管筛选页，
     * 不生成错误的三级详情地址。
     */
    return "/products/fittings/hard-tube-fittings";
  }

  /* HARD_TUBE_DETAIL_HREF_END */

  /*
    QUICK_CONNECT_DETAIL_HREF_PRIORITY_20260712

    快插接头卡片优先使用生成数据中的真实详情链接：
    /products/fittings/quick-connect-fittings/q20#商品编码

    避免后续通用逻辑把链接改回产品类型筛选页。
  */
  {
    const rawProductTypeId =
      String(
        (product as any)?.productTypeId ||
        ""
      ).trim();

    const rawSourceType =
      String(
        (product as any)?.sourceType ||
        ""
      ).trim();

    const rawExistingHref =
      String(
        (product as any)?.detailHref ||
        (product as any)?.href ||
        ""
      ).trim();

    const rawProductText =
      JSON.stringify(
        product || {}
      );

    const isQuickConnect =
      rawProductTypeId ===
        "quick-connect-fittings" ||
      rawSourceType ===
        "quick-connect-selection" ||
      rawExistingHref.includes(
        "/products/fittings/quick-connect-fittings/"
      ) ||
      rawProductText.includes(
        "快插接头"
      );

    if (isQuickConnect) {

      /*
        QUICK_CONNECT_MODEL_DETAIL_HREF_20260712

        快插接头进入具体型号详情页，
        不再进入Q20/Q40/Q60系列汇总页。
      */
      {
        const rawCardTitle =
          (product as any)?.cardTitle;

        const cardTitleText =
          typeof rawCardTitle ===
          "string"
            ? rawCardTitle
            : String(
                rawCardTitle?.zh ||
                rawCardTitle?.["zh-CN"] ||
                rawCardTitle?.en ||
                ""
              ).trim();

        const modelCandidates = [
          (product as any)?.foreachModel,
          (product as any)?.model,
          (product as any)?.modelCode,
          (product as any)?.modelDisplay,
          (product as any)?.displayModel,
          cardTitleText,
          JSON.stringify(
            (product as any)?.searchKeywords ||
            {}
          ),
          JSON.stringify(
            product ||
            {}
          ),
        ]
          .map(
            (value) =>
              String(
                value ||
                ""
              )
          )
          .join(
            " "
          );

        const modelMatch =
          modelCandidates.match(
            /\bQ(?:20|40|60)[A-Z0-9]*-[A-Z0-9]+-[A-Z0-9]+\b/i
          );

        if (
          modelMatch
        ) {
          const modelSlug =
            modelMatch[0]
              .toLowerCase()
              .replace(
                /[^a-z0-9]+/g,
                "-"
              )
              .replace(
                /^-+|-+$/g,
                ""
              );

          return (
            "/products/fittings/quick-connect-fittings/" +
            modelSlug
          );
        }
      }

      if (
        /^\/products\/fittings\/quick-connect-fittings\/(q20|q40|q60)(?:#.*)?$/i.test(
          rawExistingHref
        )
      ) {
        return rawExistingHref;
      }

      const seriesMatch =
        rawProductText.match(
          /\bQ(?:20|40|60)\b/i
        );

      const productCode =
        String(
          (product as any)?.productCode ||
          (product as any)?.productId ||
          ""
        ).trim();

      if (seriesMatch) {
        const seriesSlug =
          seriesMatch[0]
            .toLowerCase();

        return (
          "/products/fittings/quick-connect-fittings/" +
          seriesSlug +
          (
            productCode
              ? "#" +
                encodeURIComponent(
                  productCode
                )
              : ""
          )
        );
      }

      return rawExistingHref ||
        "/products/fittings/quick-connect-fittings";
    }
  }
  /* THREAD_TO_BARBED_DETAIL_HREF_START */

  /*
   * 螺纹转倒刺接头具体型号详情链接。
   *
   * 优先按商品编码匹配，
   * 避免相同基础型号、不同 O 圈配置产生重复地址。
   */
  {
    const rawProductTypeId =
      String(
        (product as any)
          ?.productTypeId ||
        ""
      ).trim();

    const rawExistingHref =
      String(
        (product as any)
          ?.detailHref ||
        (product as any)
          ?.href ||
        ""
      ).trim();

    const isThreadToBarbed =
      rawProductTypeId ===
        "thread-to-barbed-fittings" ||
      rawExistingHref.includes(
        "/products/fittings/thread-to-barbed-fittings"
      );

    if (isThreadToBarbed) {
      const productCode =
        String(
          (product as any)
            ?.productCode ||
          (product as any)
            ?.productId ||
          ""
        ).trim();

      const rawCardTitle =
        (product as any)
          ?.cardTitle;

      const cardTitleText =
        typeof rawCardTitle ===
        "string"
          ? rawCardTitle
          : String(
              rawCardTitle?.zh ||
              rawCardTitle?.["zh-CN"] ||
              rawCardTitle?.en ||
              ""
            ).trim();

      const model =
        String(
          (product as any)?.model ||
          (product as any)
            ?.foreachModel ||
          (product as any)
            ?.modelCode ||
          (product as any)
            ?.modelDisplay ||
          (product as any)
            ?.displayModel ||
          cardTitleText ||
          ""
        ).trim();

      const matchedHref =
        threadToBarbedDetailHrefByProductCode[
          productCode
        ] ||
        threadToBarbedDetailHrefByModel[
          model
        ];

      if (matchedHref) {
        return matchedHref;
      }

      return (
        rawExistingHref ||
        "/products/fittings/thread-to-barbed-fittings"
      );
    }
  }

  /* THREAD_TO_BARBED_DETAIL_HREF_END */

  
    /* LUER_FITTING_DETAIL_HREF_START */

    /*
     * 鲁尔接头详情链接：
     *
     * 正确结构：
     * /products/fittings/luer-fittings/[detailSlug]
     *
     * 不允许回退成：
     * /products/fittings/[detailSlug]
     */
    {
      const rawProductTypeId =
        String(
          (product as any)
            ?.productTypeId ||
          ""
        ).trim();

      const rawExistingHref =
        String(
          (product as any)
            ?.detailHref ||
          (product as any)
            ?.href ||
          ""
        ).trim();

      const isLuerFitting =
        rawProductTypeId ===
          "luer-fittings" ||
        rawExistingHref.includes(
          "/products/fittings/luer-fittings"
        );

      if (isLuerFitting) {
        if (
          rawExistingHref.includes(
            "/products/fittings/luer-fittings/"
          )
        ) {
          return rawExistingHref;
        }

        const rawDetailSlug =
          String(
            (product as any)
              ?.detailSlug ||
            (product as any)
              ?.routeSlug ||
            (product as any)
              ?.slug ||
            ""
          )
            .trim()
            .toLowerCase()
            .replace(
              /[^a-z0-9]+/g,
              "-"
            )
            .replace(
              /^-+|-+$/g,
              ""
            );

        return rawDetailSlug
          ? "/products/fittings/luer-fittings/" +
              rawDetailSlug
          : "/products/fittings/luer-fittings";
      }
    }

    /* LUER_FITTING_DETAIL_HREF_END */

/* BULKHEAD_BARBED_DETAIL_HREF_START */

  /*
   * 穿板倒刺接头与六角螺母具体型号详情链接。
   *
   * 选型卡片不能回退到通用动态页面
   * /products/[category]/[slug]，
   * 必须进入本系列的具体型号详情路由。
   */
  {
    const rawProductTypeId =
      String(
        (product as any)?.productTypeId ||
        ""
      ).trim();

    const rawSourceType =
      String(
        (product as any)?.sourceType ||
        ""
      ).trim();

    const rawExistingHref =
      String(
        (product as any)?.detailHref ||
        (product as any)?.productHref ||
        (product as any)?.detailUrl ||
        (product as any)?.href ||
        ""
      ).trim();

    const isBulkheadBarbed =
      rawProductTypeId ===
        "bulkhead-barbed-fittings" ||
      rawSourceType ===
        "bulkhead-barbed-selection" ||
      rawExistingHref.includes(
        "/products/fittings/bulkhead-barbed-fittings/"
      );

    if (isBulkheadBarbed) {
      /*
       * 数据中已经存在完整具体型号链接时，
       * 直接使用，不再经过通用路由推导。
       */
      if (
        /^\/products\/fittings\/bulkhead-barbed-fittings\/[a-z0-9-]+(?:[?#].*)?$/i.test(
          rawExistingHref
        )
      ) {
        return rawExistingHref;
      }

      const rawCardTitle =
        (product as any)?.cardTitle;

      const cardTitleText =
        typeof rawCardTitle ===
        "string"
          ? rawCardTitle
          : String(
              rawCardTitle?.zh ||
              rawCardTitle?.["zh-CN"] ||
              rawCardTitle?.en ||
              ""
            ).trim();

      const rawSlug =
        String(
          (product as any)?.detailSlug ||
          (product as any)?.slug ||
          (product as any)?.productSlug ||
          (product as any)?.model ||
          (product as any)?.displayModel ||
          (product as any)?.modelDisplay ||
          cardTitleText ||
          ""
        )
          .trim()
          .split("/")
          .filter(Boolean)
          .pop() ||
        "";

      const modelSlug =
        rawSlug
          .toLowerCase()
          .replace(/μ/g, "u")
          .replace(
            /[^a-z0-9]+/g,
            "-"
          )
          .replace(
            /^-+|-+$/g,
            ""
          );

      return modelSlug
        ? "/products/fittings/bulkhead-barbed-fittings/" +
            modelSlug
        : "/products/fittings/bulkhead-barbed-fittings";
    }
  }

  /* BULKHEAD_BARBED_DETAIL_HREF_END */

  /* BARBED_FITTING_DETAIL_HREF_START */

  /*
   * 倒刺接头标准型号详情链接。
   * 页面结构继续复用 ProductDetailClient，
   * 这里只负责把卡片导向具体型号。
   */
  {
    const rawProductTypeId =
      String(
        (product as any)?.productTypeId ||
        ""
      ).trim();

    const rawExistingHref =
      String(
        (product as any)?.detailHref ||
        (product as any)?.href ||
        ""
      ).trim();

    const isBarbedFitting =
      rawProductTypeId ===
        "barbed-fittings" ||
      rawExistingHref.includes(
        "/products/fittings/barbed-fittings"
      );

    if (isBarbedFitting) {
      const rawCardTitle =
        (product as any)?.cardTitle;

      const cardTitleText =
        typeof rawCardTitle ===
        "string"
          ? rawCardTitle
          : String(
              rawCardTitle?.zh ||
              rawCardTitle?.["zh-CN"] ||
              rawCardTitle?.en ||
              ""
            ).trim();

      const model =
        String(
          (product as any)?.model ||
          (product as any)?.modelCode ||
          (product as any)?.modelDisplay ||
          cardTitleText ||
          (product as any)?.productId ||
          ""
        ).trim();

      const modelSlug =
        model
          .toLowerCase()
          .replace(/μ/g, "u")
          .replace(
            /[^a-z0-9]+/g,
            "-"
          )
          .replace(
            /^-+|-+$/g,
            ""
          );

      return modelSlug
        ? "/products/fittings/barbed-fittings/" + modelSlug
        : "/products/fittings/barbed-fittings";
    }
  }

  /* BARBED_FITTING_DETAIL_HREF_END */

  /*
    CONTROL_MODULE_DETAIL_HREF_20260708

    说明：
    1. 智控模块属于 control 分类；
    2. 卡片详情页不走 /products/control-modules 这种孤立页面；
    3. 统一走现有通用路由 /products/control/[slug]；
    4. slug 来自 control-module-selection.generated.ts 里的 detailSlug。
  */
  if (String(product.categoryId || "") === "control") {
    const controlSlug = String(
      (product as any).detailSlug ||
        (product as any).slug ||
        (product as any).productSlug ||
        ""
    ).trim();

    return controlSlug ? `/products/control/${controlSlug}` : "/products";
  }
  /*
    CONTROL_MODULE_DETAIL_HREF_PATCH_20260708
    智控系列选型卡片强制跳转到正式详情页。
  */
  if (
    (product as any)?.categoryId === "control" ||
    (product as any)?.category === "control" ||
    (product as any)?.productTypeId === "control-module" ||
    (product as any)?.productTypeLabel === "智控模块"
  ) {
    const rawHref = String(
      (product as any).detailHref ||
        (product as any).href ||
        ""
    ).trim();

    if (rawHref.includes("/products/control-modules/")) {
      return rawHref;
    }

    const rawSlug = String(
      (product as any).detailSlug ||
        (product as any).slug ||
        (product as any).productId ||
        ""
    )
      .split("/")
      .filter(Boolean)
      .pop();

    if (rawSlug === "abd-air-bubble-detector" || rawSlug === "control-abd-air-bubble-detector") {
      return "/products/control/abd-air-bubble-detector";
    }

    if (rawSlug === "pdm5-pressure-sensor" || rawSlug === "control-pdm5-pressure-sensor") {
      return "/products/control/pdm5-pressure-sensor";
    }

    return "/products/control";
  }


  /*
    PLUNGER_DETAIL_HREF_PRIORITY_FIX_20260707

    柱塞泵详情链接优先处理。
    防止 EA / SM / TM 型号被后面的 probes 分支错误导向 /products/probes/[slug]。
  */
  {
    const rawHref = String(
      (product as any).detailHref ||
        (product as any).productDetailHref ||
        (product as any).href ||
        ""
    ).trim();

    if (rawHref.includes("/products/pumps/plunger-pumps/")) {
      return rawHref;
    }

    const rawSlug = String(
      (product as any).detailSlug ||
        (product as any).slug ||
        (product as any).productId ||
        ""
    )
      .split("/")
      .filter(Boolean)
      .pop()
      ?.toLowerCase();

    if (rawSlug && /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(rawSlug)) {
      return `/products/pumps/plunger-pumps/${rawSlug}`;
    }

    const textForModel = [
      (product as any).productId,
      (product as any).detailSlug,
      (product as any).slug,
      (product as any).cardTitle?.zh,
      (product as any).cardTitle?.en,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const modelMatch = textForModel.match(/\b(ea|sm|tm)[-_\s]*(\d{2,5})[-_\s]*(pmma|peek)\b/i);

    if (modelMatch) {
      return `/products/pumps/plunger-pumps/${modelMatch[1].toLowerCase()}-${modelMatch[2]}-${modelMatch[3].toLowerCase()}`;
    }
  }

/*
    TUBING_MAKE_DETAIL_HREF_20260707
    管路卡片优先使用 detailHref / href。
  */
  {
    const rawHref = String(
      (product as any).detailHref ||
        (product as any).productDetailHref ||
        (product as any).href ||
        ""
    ).trim();

    if (rawHref.includes("/products/tubing/")) {
      return rawHref;
    }

    const rawSlug = String(
      (product as any).detailSlug ||
        (product as any).slug ||
        (product as any).productId ||
        ""
    )
      .split("/")
      .filter(Boolean)
      .pop()
      ?.toLowerCase();

    if (
      rawSlug === "pvc-tubing" ||
      rawSlug === "tpu-tubing" ||
      rawSlug === "fep-tubing" ||
      rawSlug === "ptfe-tubing" ||
      rawSlug === "peek-tubing" ||
      rawSlug === "pfa-tubing"
    ) {
      return `/products/tubing/${rawSlug}`;
    }
  }

/*
    TUBING_SELECTION_DETAIL_HREF_PATCH_20260707

    管路系列详情链接分支。
    只影响 PVC / TPU / FEP / PTFE / PEEK / PFA 管路卡片。
    其它产品仍走原来的针、阀、泵逻辑。
  */
  {
    const rawHref = String(
      (product as any).detailHref ||
        (product as any).productDetailHref ||
        (product as any).href ||
        (product as any).url ||
        (product as any).path ||
        ""
    ).trim();

    if (rawHref.includes("/products/tubing/")) {
      return rawHref;
    }

    const rawText = JSON.stringify(product || {}).toLowerCase();

    const isTubingProduct =
      rawText.includes("tubing") ||
      rawText.includes("管路") ||
      rawText.includes("pvc 管") ||
      rawText.includes("tpu 管") ||
      rawText.includes("fep 管") ||
      rawText.includes("ptfe 管") ||
      rawText.includes("peek 管") ||
      rawText.includes("pfa 管") ||
      rawText.includes("pvc-tubing") ||
      rawText.includes("tpu-tubing") ||
      rawText.includes("fep-tubing") ||
      rawText.includes("ptfe-tubing") ||
      rawText.includes("peek-tubing") ||
      rawText.includes("pfa-tubing");

    if (isTubingProduct) {
      const rawSlug = String(
        (product as any).detailSlug ||
          (product as any).routeSlug ||
          (product as any).slug ||
          (product as any).seriesSlug ||
          (product as any).productId ||
          ""
      )
        .split("/")
        .filter(Boolean)
        .pop()
        ?.toLowerCase();

      if (
        rawSlug === "pvc-tubing" ||
        rawSlug === "tpu-tubing" ||
        rawSlug === "fep-tubing" ||
        rawSlug === "ptfe-tubing" ||
        rawSlug === "peek-tubing" ||
        rawSlug === "pfa-tubing"
      ) {
        return `/products/tubing/${rawSlug}`;
      }

      if (rawText.includes("pvc")) return "/products/tubing/pvc-tubing";
      if (rawText.includes("tpu")) return "/products/tubing/tpu-tubing";
      if (rawText.includes("fep")) return "/products/tubing/fep-tubing";
      if (rawText.includes("ptfe")) return "/products/tubing/ptfe-tubing";
      if (rawText.includes("peek")) return "/products/tubing/peek-tubing";
      if (rawText.includes("pfa")) return "/products/tubing/pfa-tubing";

      return "/products";
    }
  }


  /*
    PROBE_DETAIL_HREF_PATCH_FORCE_NEEDLES

    产品中心针系列 categoryId 使用 needles。
    详情页路由使用 /products/probes/[slug]。
    避免生成 /products/probes/undefined。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.categoryId === "needles" ||
    (product as any)?.category === "needles" ||
    (product as any)?.categoryLabel === "针系列"
  ) {
    const rawHref = String(
      (product as any).detailHref ||
        (product as any).href ||
        ""
    );

    const slugFromHref = rawHref
      .split("/")
      .filter(Boolean)
      .pop();

    const rawSlug =
      (product as any).productTypeSlug ||
      (product as any).detailSlug ||
      (product as any).routeSlug ||
      (product as any).slug ||
      (product as any).seriesSlug ||
      slugFromHref;

    const probeSlug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

    if (
      probeSlug &&
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;
    }

    return "/products";
  }

  /*
    PROBE_DETAIL_HREF_PATCH_20260709

    针系列在产品中心中使用中文 productTypeId 显示筛选项，
    详情路由不能依赖 productTypeId。
    这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.category === "probes" ||
    (product as any)?.categoryLabel === "针系列"
  ) {
    const rawHref = String(
      (product as any).detailHref ||
        (product as any).href ||
        ""
    );

    const slugFromHref = rawHref
      .split("/")
      .filter(Boolean)
      .pop();

    const rawSlug =
      (product as any).productTypeSlug ||
      (product as any).detailSlug ||
      (product as any).routeSlug ||
      (product as any).slug ||
      (product as any).seriesSlug ||
      slugFromHref;

    const probeSlug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

    if (
      probeSlug &&
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;
    }

    return "/products";
  }

  /*
    PROBE_DETAIL_HREF_PATCH_20260708

    针系列产品类型使用中文显示，详情路径不能依赖 productTypeId。
    这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
    避免生成 /products/probes/undefined。
  */
  if (
    (product as any)?.sourceType === "probe-selection" ||
    (product as any)?.category === "probes" ||
    (product as any)?.categoryLabel === "针系列"
  ) {
    const rawHref = String(
      (product as any).detailHref ||
        (product as any).href ||
        ""
    );

    const slugFromHref = rawHref
      .split("/")
      .filter(Boolean)
      .pop();

    const rawSlug =
      (product as any).productTypeSlug ||
      (product as any).detailSlug ||
      (product as any).routeSlug ||
      (product as any).slug ||
      (product as any).seriesSlug ||
      slugFromHref;

    const probeSlug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

    if (
      probeSlug &&
      probeSlug !== "undefined" &&
      probeSlug !== "null"
    ) {
      return `/products/probes/${probeSlug}`;
    }

    return "/products";
  }

  /*
    VALVE_DETAIL_HREF_PATCH_20260707

    阀系列产品类型为了中文显示，productTypeId 可能是“旋转阀 / 高压阀 / 电磁阀”。
    因此详情链接不能只依赖 productTypeId。
    这里优先读取 detailHref / href / detailSlug / routeSlug / slug / seriesSlug。
    避免生成 /products/valves/undefined/。
  */
  if ((product as any)?.categoryId === "valves") {
    const rawHref = String(
      (product as any).detailHref ||
        (product as any).href ||
        ""
    );

    const slugFromHref = rawHref
      .split("/")
      .filter(Boolean)
      .pop();

    const rawSlug =
      (product as any).detailSlug ||
      (product as any).routeSlug ||
      (product as any).slug ||
      (product as any).seriesSlug ||
      (product as any).seriesId ||
      slugFromHref;

    const valveSlug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

    if (
      valveSlug &&
      valveSlug !== "undefined" &&
      valveSlug !== "null"
    ) {
      return `/products/valves/${valveSlug}`;
    }

    return "/products";
  }

  
  const isValveProduct =
    product.categoryId === "valves" &&
    ["rotary-valves", "high-pressure-valves", "solenoid-valves"].includes(String(product.productTypeId || ""));

  if (isValveProduct) {
    return (
      (product as any).detailHref ||
      (product as any).href ||
      `/products/valves/${product.productTypeId}`
    );
  }

  const isValvelessPump =
    product.categoryId === "pumps" &&
    ["valveless-pump", "valveless-pumps"].includes(String(product.productTypeId || ""));

  const isSyringePump =
    product.categoryId === "pumps" &&
    ["syringe-pump", "syringe-pumps"].includes(String(product.productTypeId || ""));

  if (isValvelessPump) {
    const rawSlug =
      (product as any).detailSlug ||
      (product as any).seriesSlug ||
      (product as any).seriesId ||
      product.productId;

    const slug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

    return slug
      ? `/products/pumps/valveless-pumps/${slug}`
      : "/products/pumps/valveless-pumps";
  }

  if (isSyringePump) {
    const rawSlug =
      (product as any).detailSlug ||
      (product as any).seriesSlug ||
      (product as any).seriesId ||
      product.productId;

    const slug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

    return slug
      ? `/products/pumps/syringe-pumps/${slug}`
      : "/products/pumps/syringe-pumps";
  }
const isDiaphragmPump =
    product.categoryId === "pumps" &&
    ["diaphragm-pump", "diaphragm-pumps"].includes(String(product.productTypeId || ""));

  if (isDiaphragmPump) {
    const rawSlug =
      (product as any).detailSlug ||
      (product as any).seriesSlug ||
      (product as any).seriesId ||
      product.productId;

    const slug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

    return slug
      ? `/products/pumps/diaphragm-pumps/${slug}`
      : "/products/pumps/diaphragm-pumps";
  }  const isPipettingPump =
    product.categoryId === "pumps" &&
    ["pipette-pump", "pipetting-pump", "pipetting-pumps"].includes(String(product.productTypeId || ""));

  if (isPipettingPump) {
    const rawSlug =
      (product as any).detailSlug ||
      (product as any).seriesSlug ||
      (product as any).seriesId ||
      product.productId;

    const slug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

    return slug
      ? `/products/pumps/pipetting-pumps/${slug}`
      : "/products/pumps/pipetting-pumps";
  }




  const isPlungerPump =
    product.categoryId === "pumps" &&
    ["plunger-pump", "plunger-pumps"].includes(String(product.productTypeId || ""));

  if (isPlungerPump) {
    const slug = getPlungerPumpModelSlugForDetailHref(product);

    return slug
      ? `/products/pumps/plunger-pumps/${slug}`
      : "/products/pumps/plunger-pumps";
  }

  return `/products/${product.categoryId}/${product.detailSlug}`;
}

/*
 * 硬管接头接管外径筛选排序
 *
 * 仅作用于：
 * productTypeId = hard-tube-fittings
 * filter03 = 接管外径
 */
function sortHardTubeFilterOptionsForDisplay(
  productTypeId: string,
  filterKey: SelectionFilterKey,
  options: Array<{
    value: string;
    label: string;
  }>
) {
  /* QUICK_CONNECT_FILTER02_SORT_START */

  /*
   * 快插接头的“接管内径或螺纹”排序：
   *
   * 1. 软管内径按照毫米数值从小到大；
   * 2. 螺纹规格放在所有软管尺寸之后；
   * 3. 不改变硬管接头和其他产品筛选。
   */
  if (
    productTypeId === "quick-connect-fittings" &&
    filterKey === "filter02"
  ) {
    const diameterOrder = [
      "1.6 mm",
      "3.2 mm",
      "4.8 mm",
      "6.4 mm",
      "7.9 mm",
      "9.5 mm",
      "12.7 mm",
      "16.0 mm",
      "19.0 mm",
    ];

    const threadOrder = [
      "1/8\"-27 NPT",
      "1/4\"-18 NPT",
      "3/8\"-18 NPT",
      "1/2\"-14 NPT",
      "R1/8（BSPT）",
      "1/4\"-28 UNF",
    ];

    function getQuickConnectOptionOrder(
      value: string
    ) {
      const diameterIndex =
        diameterOrder.indexOf(value);

      if (diameterIndex >= 0) {
        return diameterIndex;
      }

      const threadIndex =
        threadOrder.indexOf(value);

      if (threadIndex >= 0) {
        return (
          diameterOrder.length +
          threadIndex
        );
      }

      return 999;
    }

    return [...options].sort(
      (
        current,
        next
      ) => {
        const currentValue =
          String(
            current.value ||
            current.label ||
            ""
          ).trim();

        const nextValue =
          String(
            next.value ||
            next.label ||
            ""
          ).trim();

        const orderDifference =
          getQuickConnectOptionOrder(
            currentValue
          ) -
          getQuickConnectOptionOrder(
            nextValue
          );

        if (orderDifference !== 0) {
          return orderDifference;
        }

        return currentValue.localeCompare(
          nextValue,
          "zh-CN",
          {
            numeric: true,
          }
        );
      }
    );
  }

  /* QUICK_CONNECT_FILTER02_SORT_END */




  if (
    productTypeId !== "hard-tube-fittings" ||
    filterKey !== "filter03"
  ) {
    return options;
  }

  const tubeOdOrder = new Map<string, number>([
    ["1.6 mm", 10],
    ["1.8 mm", 20],
    ["2.0 mm", 30],
    ["2.5 mm", 40],
    ["3.0 mm", 50],
    ["3.2 mm", 60],
  ]);

  return [...options].sort((current, next) => {
    const currentNumber = Number.parseFloat(current.value);
    const nextNumber = Number.parseFloat(next.value);

    const currentOrder =
      tubeOdOrder.get(current.value) ??
      (Number.isFinite(currentNumber) ? currentNumber : 999);

    const nextOrder =
      tubeOdOrder.get(next.value) ??
      (Number.isFinite(nextNumber) ? nextNumber : 999);

    return currentOrder - nextOrder;
  });
}


/*
 * THREAD_TO_BARBED_FINAL_FILTER_LAYOUT
 *
 * 螺纹转倒刺接头：
 * filter02 = 密封方式，每项独占一行
 * filter01 = 连接结构，两个一排
 */
function getProductFilterGroupLayout(
  productTypeId: string,
  filterKey: SelectionFilterKey
): ProductSelectionFilterGroup["layout"] | undefined {
  /* FEMALE_THREAD_ADAPTER_STRUCTURE_TWO_COLUMN_START */
  /*
   * Female Thread Adapters：
   * Structure 中的 2-Way / 3-Way 两个一排。
   */
  if (
    productTypeId ===
      "female-thread-adapters" &&
    filterKey ===
      "filter01"
  ) {
    return "two";
  }
  /* FEMALE_THREAD_ADAPTER_STRUCTURE_TWO_COLUMN_END */


  /* QUICK_CONNECT_SERIES_TWO_COLUMN_START */
/*
 * 快插接头两列布局：
 *
 * filter01 = Product Series
 * Q20 / Q40 / Q60 两个一排
 *
 * filter04 = Mounting
 * Panel Mount / Non-Panel Mount 两个一排
 */
if (
  productTypeId ===
    "quick-connect-fittings" &&
  (
    filterKey ===
      "filter01" ||
    filterKey ===
      "filter04"
  )
) {
  return "two";
}
/* QUICK_CONNECT_SERIES_TWO_COLUMN_END */


        /* BARBED_FITTING_TWO_COLUMN_LAYOUT_START */
      /*
       * 倒刺接头：
       * filter05 = Body Material
       * filter06 = Color
       * 两组筛选均显示为两个一排。
       */
      if (
        productTypeId === "barbed-fittings" &&
        (
          filterKey === "filter05" ||
          filterKey === "filter06"
        )
      ) {
        return "two";
      }
      /* BARBED_FITTING_TWO_COLUMN_LAYOUT_END */

      /* BULKHEAD_BARBED_TWO_COLUMN_LAYOUT_START */
  if (productTypeId === "bulkhead-barbed-fittings") {
    return "two";
  }
  /* BULKHEAD_BARBED_TWO_COLUMN_LAYOUT_END */

  /*
   * 过滤器与单向阀筛选页：
   * 从“产品类型”开始，所有筛选选项统一两个一排。
   *
   * 包括：
   * filter01 产品类型
   * filter02 过滤器类型
   * filter03 滤网材质
   * filter04 过滤精度
   * filter05 密封类型
   * filter06 膜片材质
   * filter07 接管内径 / 螺纹类型
   * filter08 材质
   * filter09 颜色
   */
  if (
    productTypeId ===
    "filters"
  ) {
    return "two";
  }

  /*
   * 保留螺纹转倒刺接头原有布局。
   */
  if (
    productTypeId !==
    "thread-to-barbed-fittings"
  ) {
    return undefined;
  }

  if (
    filterKey === "filter01" ||
    filterKey === "filter02"
  ) {
    return "two";
  }

  return undefined;
}

/* =========================================================
   FITTING_FILTER_CHECK_VALVE_MERGE_HELPER_START

   左侧只显示 filters 一个入口，
   但该入口同时匹配：
   - filters
   - check-valves
   ========================================================= */

const FITTING_FILTER_AND_CHECK_VALVE_TYPE_ID =
  "filters";

const FITTING_CHECK_VALVE_SOURCE_TYPE_ID =
  "check-valves";

function matchesActiveProductType(
  categoryId: string,
  activeProductTypeId: string,
  productTypeId: string
) {
  if (!activeProductTypeId) {
    return true;
  }

  /*
   * 阀系列是统一产品类别，
   * 同时匹配旋转阀、高压阀和电磁阀。
   */
  if (
    categoryId === "valves" &&
    activeProductTypeId ===
      "valve-series"
  ) {
    return true;
  }

  if (
    categoryId ===
      "fittings" &&
    activeProductTypeId ===
      FITTING_FILTER_AND_CHECK_VALVE_TYPE_ID
  ) {
    return (
      productTypeId ===
        FITTING_FILTER_AND_CHECK_VALVE_TYPE_ID ||
      productTypeId ===
        FITTING_CHECK_VALVE_SOURCE_TYPE_ID
    );
  }

  return (
    productTypeId ===
    activeProductTypeId
  );
}

/* FITTING_FILTER_CHECK_VALVE_MERGE_HELPER_END */


function getCategoryDefaultProductTypeId(
  categoryId: string
) {
  return categoryId === "valves"
    ? "valve-series"
    : getFirstProductTypeId(categoryId);
}

export default function ProductSelectionClient({
  locale = "zh",
  initialCategoryId,
  initialProductTypeId,
  initialFilters,
}: ProductSelectionClientProps) {
  const router = useRouter();
  const [querySelection, setQuerySelection] = useState<{
    categoryId?: string;
    productTypeId?: string;
  }>({});
  const requestedCategoryId = querySelection.categoryId;
  const requestedProductTypeId = querySelection.productTypeId;

  const handleSearchParamsChange = useCallback(
    (categoryId?: string, productTypeId?: string) => {
      setQuerySelection((current) => {
        if (
          current.categoryId === categoryId &&
          current.productTypeId === productTypeId
        ) {
          return current;
        }

        return { categoryId, productTypeId };
      });
    },
    [],
  );

  const pageText =
    PRODUCT_SELECTION_PAGE_TEXT[locale] || PRODUCT_SELECTION_PAGE_TEXT.zh;
  const targetLocaleA11yText = TARGET_LOCALE_A11Y_TEXT[locale];

  const categoryItems = useMemo(() => getCategoryItems(locale), [locale]);

  const isTargetProductLocale = Boolean(targetLocaleA11yText);
  const requestedInitialCategoryId =
    isTargetProductLocale &&
    requestedCategoryId &&
    categoryItems.some((category) => category.id === requestedCategoryId)
      ? requestedCategoryId
      : undefined;
  const resolvedInitialCategoryId =
    requestedInitialCategoryId ||
    initialCategoryId ||
    categoryItems[0]?.id ||
    "pumps";

  const [activeCategoryId, setActiveCategoryId] = useState(() => {
    return resolvedInitialCategoryId;
  });

  const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
    return initialProductTypeId ||
        getCategoryDefaultProductTypeId(resolvedInitialCategoryId);
  });

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
    () => {
      const initialActiveProductTypeId =
        initialProductTypeId ||
        getCategoryDefaultProductTypeId(resolvedInitialCategoryId);

      return getInitialSelectedFilters(
        resolvedInitialCategoryId,
        initialActiveProductTypeId,
        initialFilters
      );
    }
  );
  const {
    items: selectionCartItems,
    addItem,
    removeItem,
    getItem,
  } = useSelectionCart();

  const selectedList = useMemo(() => {
    return new Set(
      selectionCartItems
        .filter((item) => item.sourceType === "pump-selection")
        .map((item) => item.productCode)
    );
  }, [selectionCartItems]);
  const [searchInputValue, setSearchInputValue] =
    useState("");
  const [searchKeyword, setSearchKeyword] =
    useState("");
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [mobileOpenFilterGroups, setMobileOpenFilterGroups] = useState<
    Record<string, boolean>
  >(() => {
    const initialActiveProductTypeId =
      initialProductTypeId ||
        getCategoryDefaultProductTypeId(resolvedInitialCategoryId);

    return getDefaultMobileOpenFilterGroups(initialActiveProductTypeId);
  });
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [productsPageSize, setProductsPageSize] = useState(12);
  const lastProductListSignatureRef = useRef("");
  const productListViewTimerRef = useRef<number | null>(null);
  const pendingSearchRef = useRef<string | null>(null);
  const pendingFilterRef = useRef<{
    filterCategory: string;
    filterName: string;
    filterValue: string | string[];
  } | null>(null);

  function handleSearchInputChange(
    value: string
  ) {
    setSearchInputValue(value);

    if (!value.trim()) {
      setSearchKeyword("");
      setCurrentProductPage(1);
    }
  }

  function handleProductSearch(
    value: string
  ) {
    const normalizedValue =
      value.trim();

    if (normalizedValue && normalizedValue === searchKeyword) {
      trackSiteSearch({
        searchTerm: normalizedValue,
        searchLocation: "product_selection",
        locale,
        resultCount: matchedProducts.length,
      });

      if (matchedProducts.length === 0) {
        trackSearchNoResults({
          searchTerm: normalizedValue,
          searchLocation: "product_selection",
          locale,
        });
      }
      return;
    }

    pendingSearchRef.current = normalizedValue || null;

    /*
     * 产品系列搜索逻辑：
     * 1. 非空搜索从当前产品大系列的全部产品开始
     * 2. 清空此前选择的产品类型和普通筛选条件
     * 3. 搜索后仍可重新选择筛选条件缩小范围
     * 4. 空关键词只清除搜索，不清除后来选择的筛选
     */
    if (normalizedValue) {
      setActiveProductTypeId("");
      setSelectedFilters({});
      setMobileOpenFilterGroups(
        getDefaultMobileOpenFilterGroups("")
      );
    }

    setSearchInputValue(
      normalizedValue
    );
    setSearchKeyword(
      normalizedValue
    );
    setCurrentProductPage(1);
  }

  const activeCategory = useMemo(() => {
    return (
      categoryItems.find((category) => category.id === activeCategoryId) ||
      categoryItems[0] ||
      DEFAULT_CATEGORIES[0]
    );
  }, [activeCategoryId, categoryItems]);

  const categoryProducts = useMemo(() => {
    return getProductsByCategory(activeCategoryId);
  }, [activeCategoryId]);

  const productTypeOptions = useMemo(() => {
    const optionMap = new Map<string, { value: string; label: string }>();

    /*
     * 说明：
     * 1. 先读取已有产品数据中的产品类型
     * 2. 这部分用于已经有产品卡片的数据，例如 EA 柱塞泵
     */
    categoryProducts.forEach((product) => {
      if (!product.productTypeId) return;

      if (!optionMap.has(product.productTypeId)) {
        optionMap.set(product.productTypeId, {
          value: product.productTypeId,
          label: getTaxonomyLabel(locale, String(product.productTypeId || "")),
        });
      }
    });

    /*
     * 说明：
     * 1. 再从 product-route-map.ts 补充正式产品类型入口
     * 2. 这样即使隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵暂时没有产品数据
     * 3. 左侧“产品类型”里也会先显示对应入口
     */
    getProductTypeFilterOptionsByCategory(activeCategoryId).forEach((option) => {
      if (!optionMap.has(option.value)) {
        optionMap.set(option.value, {
          value: option.value,
          label: getLocalizedFilterOptionLabel(option.label, locale),
        });
      }
    });

    /* FITTING_FILTER_CHECK_VALVE_OPTIONS_START */

    if (
      activeCategoryId ===
      "fittings"
    ) {
      /*
       * 顶层不再显示堵头。
       */
      optionMap.delete(
        "plugs"
      );

      /*
       * 单向阀不再独立显示，
       * 后续由 filters 合并入口承接。
       */
      optionMap.delete(
        "check-valves"
      );

      const filterOption =
        optionMap.get(
          "filters"
        );

      if (filterOption) {
        optionMap.set(
          "filters",
          {
            ...filterOption,

            label:
              locale === "zh"
                ? "过滤器与单向阀"
                : locale === "en"
                  ? "Filters & Check Valves"
                  : getLocalizedFilterOptionLabel(
                      "过滤器与单向阀",
                      locale
                    ),
          }
        );
      }
    }

    /* FITTING_FILTER_CHECK_VALVE_OPTIONS_END */

    /* FITTING_PRODUCT_TYPE_OPTIONS_SORT_START */

    const options =
      Array.from(
        optionMap.values()
      );

    /* VALVE_SINGLE_CATEGORY_FINAL_START */

    /*
     * 阀系列左侧不再显示旋转阀、高压阀、电磁阀三个选项。
     * 产品类别下只保留一个阀系列。
     */
    if (
      activeCategoryId ===
      "valves"
    ) {
      return [
        {
          value: "valve-series",
          label:
            locale === "zh"
              ? "阀系列"
              : locale === "en"
                ? "Valve Series"
                : getLocalizedFilterOptionLabel(
                    "阀系列",
                    locale
                  ),
        },
      ];
    }

    /* VALVE_SINGLE_CATEGORY_FINAL_END */

    if (
      activeCategoryId ===
      "fittings"
    ) {
      options.sort(
        (current, next) => {
          const currentOrder =
            FITTING_PRODUCT_TYPE_ORDER_MAP.get(
              String(
                current.value ||
                ""
              )
            ) ??
            999;

          const nextOrder =
            FITTING_PRODUCT_TYPE_ORDER_MAP.get(
              String(
                next.value ||
                ""
              )
            ) ??
            999;

          return (
            currentOrder -
            nextOrder
          );
        }
      );
    }

    return options.map((option) => ({
      ...option,
      label: getLocalizedFilterOptionLabel(
        option.label || option.value,
        locale
      ),
    }));

    /* FITTING_PRODUCT_TYPE_OPTIONS_SORT_END */
  }, [activeCategoryId, categoryProducts, locale]);

  const currentTypeProducts = useMemo(() => {
    if (!activeProductTypeId) {
      return categoryProducts;
    }

    return categoryProducts.filter(
      (product) =>
        matchesActiveProductType(
          activeCategoryId,
          activeProductTypeId,
          String(
            product.productTypeId ||
            ""
          )
        )
    );
  }, [activeProductTypeId, categoryProducts]);

  const activeFilterLabels = useMemo(() => {
    return getVisibleFilterLabels(activeProductTypeId);
  }, [activeProductTypeId]);

  const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
    const groups: ProductSelectionFilterGroup[] = [];

    if (productTypeOptions.length > 0) {
      groups.push({
        key: "productType",
        title:
          activeCategoryId === "valves" && locale === "zh"
            ? "产品类别"
            : activeCategoryId === "fittings" && locale === "zh"
              ? "产品种类"
              : pageText.productTypeLabel,
        inputType: "single",
        options: productTypeOptions,
      });
    }

    activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
      /* FILTER_CHECK_VALVE_DYNAMIC_GROUPS_START */

      /*
       * 过滤器与单向阀共用一个顶层入口，
       * 但筛选字段按实际型号结构动态显示。
       *
       * 未选择产品类型：
       * - 产品类型
       * - 接管内径 / 螺纹类型
       * - 材质
       * - 颜色
       *
       * 选择过滤器：
       * - 增加过滤器类型、滤网材质、过滤精度
       *
       * 选择单向阀：
       * - 增加密封类型、膜片材质
       */
      if (
        activeCategoryId ===
          "fittings" &&
        activeProductTypeId ===
          "filters"
      ) {
        const currentFilterKey =
          String(
            (label as any)
              .filterKey ||
            ""
          );

        const selectedTypeValues =
          selectedFilters.filter01;

        const selectedMergedType =
          selectedTypeValues &&
          selectedTypeValues.size === 1
            ? Array.from(
                selectedTypeValues
              )[0]
            : "";

        const commonKeys =
          new Set([
            "filter01",
            "filter07",
            "filter08",
            "filter09",
          ]);

        const filterKeys =
          new Set([
            ...commonKeys,
            "filter02",
            "filter03",
            "filter04",
          ]);

        const checkValveKeys =
          new Set([
            ...commonKeys,
            "filter05",
            "filter06",
          ]);

        const allowedKeys =
          selectedMergedType ===
            "过滤器"
            ? filterKeys
            : selectedMergedType ===
                "单向阀"
              ? checkValveKeys
              : commonKeys;

        if (
          !allowedKeys.has(
            currentFilterKey
          )
        ) {
          return;
        }
      }

      /* FILTER_CHECK_VALVE_DYNAMIC_GROUPS_END */
      const options = getFilterOptions(
        currentTypeProducts as any,

        (label as any).filterKey,
        selectedFilters,
        activeProductTypeId
      );

      if (options.length === 0) return;

      groups.push({
        key: (label as any).filterKey,
        /* HARD_TUBE_FILTER03_SIZE_LABEL_START */
        title:
          activeProductTypeId ===
            "hard-tube-fittings" &&
          (label as any).filterKey ===
            "filter03"
            ? (
                {
                  zh: "尺寸（OD / ID）",
                  en: "Size (OD / ID)",
                  es: "Tamaño (OD / ID)",
                  fr: "Dimension (OD / ID)",
                  ko: "치수 (OD / ID)",
                  ru: "Размер (OD / ID)",
                } as Record<string, string>
              )[locale] ||
              "Size (OD / ID)"
            : getText(
                locale,
                label.label,
                (label as any).filterKey
              ),
        /* HARD_TUBE_FILTER03_SIZE_LABEL_END */
        inputType: label.inputType,
        layout: getProductFilterGroupLayout(
          activeProductTypeId,
          (label as any).filterKey as SelectionFilterKey
        ),
        options: sortHardTubeFilterOptionsForDisplay(
          activeProductTypeId,
          (label as any).filterKey,
          options.map((option) => ({
            ...option,
            label: getLocalizedFilterOptionLabel(
              option.label || option.value,
              locale
            ),
          }))
        ),
      });
    });

    return groups;
  }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);

  const matchedProducts = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return categoryProducts.filter((product) => {
      if (
        !matchesActiveProductType(
          activeCategoryId,
          activeProductTypeId,
          String(
            product.productTypeId ||
            ""
          )
        )
      ) {
        return false;
      }

      const filterMatched = FILTER_KEYS.every((filterKey) => {
        const selectedValues = selectedFilters[filterKey];

        if (!selectedValues || selectedValues.size === 0) {
          return true;
        }

        const value = (product.filters || {})[filterKey];
        const productValues = splitFilterValues(value);

        return productValues.some((item) =>
          selectedValues.has(item)
        );
      });

      if (!filterMatched) {
        return false;
      }

      if (!keyword) {
        return true;
      }

      const searchText = [
        product.productId,
        product.categoryId,
        product.productTypeId,
        product.seriesId,
        product.detailSlug,
        ((product.cardTitle as any)?.zh || ""),
        ((product.cardTitle as any)?.en || ""),
        ((product.cardSubtitle as any)?.zh || ""),
        ((product.cardSubtitle as any)?.en || ""),
        ((product.searchKeywords as any)?.zh || ""),
        ((product.searchKeywords as any)?.en || ""),
        ...Object.values(product.filters || {}),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchText.includes(keyword);
    });
  }, [activeProductTypeId, categoryProducts, searchKeyword, selectedFilters]);

  /*
   * 当前产品种类介绍数据
   * 说明：
   * 1. 根据当前产品大类和产品类型匹配介绍内容
   * 2. 例如 pumps + plunger-pump 会显示柱塞泵系列介绍
   * 3. 找不到时不显示横幅
   */
  const activeProductTypeIntro = getProductTypeIntroByIds(
    activeCategoryId,
    activeProductTypeId,
    locale
  );
  const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {
    const tags: ProductSelectionSelectedTag[] = [];

    if (activeProductTypeId) {
      tags.push({
        key: "productType",
        value: activeProductTypeId,
        label: getTargetUiLabel(
          locale,
          productTypeOptions.find(
            (option) => option.value === activeProductTypeId
          )?.label || getTaxonomyLabel(locale, activeProductTypeId),
        ),
      });
    }

    FILTER_KEYS.forEach((filterKey) => {
      const values = selectedFilters[filterKey];

      if (!values || values.size === 0) return;

      values.forEach((value) => {
        tags.push({
          key: filterKey,
          value,
          label: getLocalizedFilterOptionLabel(value, locale),
        });
      });
    });

    return tags;
  }, [activeProductTypeId, locale, productTypeOptions, selectedFilters]);

  const totalProductPages = Math.max(
    1,
    Math.ceil(matchedProducts.length / productsPageSize)
  );

  const safeCurrentProductPage = Math.min(
    currentProductPage,
    totalProductPages
  );

  const pagedProducts = matchedProducts.slice(
    (safeCurrentProductPage - 1) * productsPageSize,
    safeCurrentProductPage * productsPageSize
  );

  const analyticsListId = [
    "product_selection",
    activeCategoryId,
    activeProductTypeId || "all",
    `page_${safeCurrentProductPage}`,
  ].join(":");

  useEffect(() => {
    if (pagedProducts.length === 0) return;

    const signature = `${analyticsListId}|${pagedProducts
      .map((product) => product.productId)
      .join("|")}`;

    if (lastProductListSignatureRef.current === signature) return;

    if (productListViewTimerRef.current !== null) {
      window.clearTimeout(productListViewTimerRef.current);
    }

    productListViewTimerRef.current = window.setTimeout(() => {
      productListViewTimerRef.current = null;

      if (lastProductListSignatureRef.current === signature) return;
      lastProductListSignatureRef.current = signature;

      trackProductListView({
        listId: analyticsListId,
        listName: "product_selection_results",
        locale,
        products: pagedProducts.map((product, index) => ({
          productId: product.productId,
          productName: getText(locale, product.cardTitle, product.productId),
          category: product.categoryId || product.category,
          subcategory: product.productTypeId || product.productType,
          series: product.seriesId || product.series,
          listId: analyticsListId,
          listName: "product_selection_results",
          index: (safeCurrentProductPage - 1) * productsPageSize + index,
          locale,
        })),
      });
    }, 150);

    return () => {
      if (productListViewTimerRef.current !== null) {
        window.clearTimeout(productListViewTimerRef.current);
        productListViewTimerRef.current = null;
      }
    };
  }, [analyticsListId, locale, pagedProducts, productsPageSize, safeCurrentProductPage]);

  useEffect(() => {
    const pendingSearch = pendingSearchRef.current;
    if (!pendingSearch || pendingSearch !== searchKeyword.trim()) return;

    trackSiteSearch({
      searchTerm: pendingSearch,
      searchLocation: "product_selection",
      locale,
      resultCount: matchedProducts.length,
    });

    if (matchedProducts.length === 0) {
      trackSearchNoResults({
        searchTerm: pendingSearch,
        searchLocation: "product_selection",
        locale,
      });
    }

    pendingSearchRef.current = null;
  }, [locale, matchedProducts.length, searchKeyword]);

  useEffect(() => {
    const pendingFilter = pendingFilterRef.current;
    if (!pendingFilter) return;

    trackFilterApply({
      ...pendingFilter,
      resultCount: matchedProducts.length,
      sourceSection: "product_selection",
      locale,
    });

    pendingFilterRef.current = null;
  }, [locale, matchedProducts]);

  useEffect(() => {
    function updateProductsPageSize() {
      setProductsPageSize(getResponsiveProductPageSize());
    }

    updateProductsPageSize();

    window.addEventListener("resize", updateProductsPageSize);

    return () => {
      window.removeEventListener("resize", updateProductsPageSize);
    };
  }, []);

  useEffect(() => {
    const fallbackCategoryId = categoryItems[0]?.id || "pumps";
    const preferredCategoryId = requestedCategoryId || initialCategoryId;

    const nextCategoryId =
      preferredCategoryId &&
      categoryItems.some((category) => category.id === preferredCategoryId)
        ? preferredCategoryId
        : fallbackCategoryId;

    const categoryProductsForUrl = getProductsByCategory(nextCategoryId);
    const preferredProductTypeId =
      requestedProductTypeId || initialProductTypeId;

    const productTypeExistsInProducts = Boolean(
      preferredProductTypeId &&
        categoryProductsForUrl.some(
          (product) => product.productTypeId === preferredProductTypeId
        )
    );

    const productTypeExistsInRouteMap = Boolean(
      preferredProductTypeId &&
        hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
    );

    const nextProductTypeId =
      preferredProductTypeId &&
      (productTypeExistsInProducts || productTypeExistsInRouteMap)
        ? preferredProductTypeId
        : getCategoryDefaultProductTypeId(nextCategoryId);

    const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);

    setActiveCategoryId(nextCategoryId);
    setActiveProductTypeId(nextProductTypeId);
    setSelectedFilters(
      hasQuerySelection
        ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
        : getInitialSelectedFilters(
            nextCategoryId,
            nextProductTypeId,
            initialFilters
          )
    );
    setSearchInputValue("");
    setSearchKeyword("");
    setMobileCategoryOpen(false);
    setMobileOpenFilterGroups(
      getDefaultMobileOpenFilterGroups(nextProductTypeId)
    );
  }, [
    categoryItems,
    requestedCategoryId,
    requestedProductTypeId,
    initialCategoryId,
    initialProductTypeId,
    initialFilters,
  ]);

  useEffect(() => {
    setCurrentProductPage(1);
  }, [
    activeCategoryId,
    activeProductTypeId,
    selectedFilters,
    searchKeyword,
    productsPageSize,
  ]);
  /*
   * 筛选项联动后的自动清理：
   * 1. 当用户切换产品系列后，量程 / 材质可能不再属于当前系列
   * 2. 这里根据当前可见 filterGroups 自动移除无效筛选值
   * 3. 例如从 EA 切到 SM 后，自动清除 5000μL / 10000μL 等无效量程
   */
  useEffect(() => {
    const allowedValuesByFilterKey = new Map<SelectionFilterKey, Set<string>>();

    filterGroups.forEach((group) => {
      if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
        return;
      }

      const filterKey = group.key as SelectionFilterKey;
      allowedValuesByFilterKey.set(
        filterKey,
        new Set(group.options.map((option) => option.value))
      );
    });

    setSelectedFilters((current) => {
      let changed = false;
      const next: SelectedFilterMap = {
        ...current,
      };

      FILTER_KEYS.forEach((filterKey) => {
        const currentValues = next[filterKey];

        if (!currentValues || currentValues.size === 0) {
          return;
        }

        const allowedValues = allowedValuesByFilterKey.get(filterKey);

        if (!allowedValues || allowedValues.size === 0) {
          delete next[filterKey];
          changed = true;
          return;
        }

        const validValues = Array.from(currentValues).filter((value) =>
          allowedValues.has(value)
        );

        if (validValues.length !== currentValues.size) {
          if (validValues.length > 0) {
            next[filterKey] = new Set(validValues);
          } else {
            delete next[filterKey];
          }

          changed = true;
        }
      });

      return changed ? next : current;
    });
  }, [filterGroups]);

  function handleCategoryChange(categoryId: string) {
    const firstProductTypeId =
      getCategoryDefaultProductTypeId(categoryId);

    pendingFilterRef.current = {
      filterCategory: "product_category",
      filterName: "category_id",
      filterValue: categoryId,
    };

    setActiveCategoryId(categoryId);
    setActiveProductTypeId(firstProductTypeId);
    setSelectedFilters(getDefaultSelectedFilters(categoryId, firstProductTypeId));
    setSearchInputValue("");
    setSearchKeyword("");
    setMobileCategoryOpen(false);
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
  }

  function toggleMobileFilterGroup(key: ProductSelectionFilterGroup["key"]) {
    setMobileOpenFilterGroups((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function handleProductTypeChange(productTypeId: string) {
    /*
     * 搜索结果中的产品类型筛选：
     * 1. 保留当前搜索关键词
     * 2. 不跳转产品类型页面
     * 3. 在搜索结果中继续缩小范围
     * 4. 清除上一个产品类型遗留的普通筛选条件
     */
    if (searchKeyword.trim()) {
      pendingFilterRef.current = {
        filterCategory: activeCategoryId,
        filterName: "product_type_id",
        filterValue: productTypeId || "all",
      };
      setActiveProductTypeId(productTypeId);
      setSelectedFilters({});
      setMobileOpenFilterGroups(
        getDefaultMobileOpenFilterGroups(productTypeId)
      );
      setCurrentProductPage(1);
      return;
    }

    /*
     * 阀系列是统一产品类别。
     * 点击后保持阀系列选中，并显示全部三张阀卡片。
     */
    if (
      activeCategoryId ===
      "valves"
    ) {
      pendingFilterRef.current = {
        filterCategory: activeCategoryId,
        filterName: "product_type_id",
        filterValue: "valve-series",
      };
      setActiveProductTypeId(
        "valve-series"
      );

      setSelectedFilters(
        {}
      );

      setSearchInputValue(
        ""
      );

      setSearchKeyword(
        ""
      );

      setMobileOpenFilterGroups(
        getDefaultMobileOpenFilterGroups(
          "valve-series"
        )
      );

      return;
    }

    /*
     * 说明：
     * 1. 点击产品类型时，优先跳转正式 URL
     * 2. 柱塞泵会跳到 /products/pumps/plunger-pumps/
     * 3. 没配置正式 URL 的类型，才走原来的前端筛选逻辑
     */
    const productTypeHref = getProductTypeHrefByIds(
      activeCategoryId,
      productTypeId
    );

    if (productTypeHref) {
      trackFilterApply({
        filterCategory: activeCategoryId,
        filterName: "product_type_id",
        filterValue: productTypeId,
        resultCount: categoryProducts.filter((product) =>
          matchesActiveProductType(
            activeCategoryId,
            productTypeId,
            String(product.productTypeId || ""),
          ),
        ).length,
        sourceSection: "product_selection",
        locale,
      });
      router.push(
        localizeProductDetailHref(productTypeHref)
      );
      return;
    }

    pendingFilterRef.current = {
      filterCategory: activeCategoryId,
      filterName: "product_type_id",
      filterValue: productTypeId || "all",
    };
    setActiveProductTypeId(productTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, productTypeId));
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(productTypeId));
  }

  function handleFilterChange(
    group: ProductSelectionFilterGroup,
    value: string
  ) {
    /*
     * 说明：
     * 1. 产品类型筛选项，例如“柱塞泵”，仍然走 handleProductTypeChange
     * 2. 产品系列筛选项，例如 EA / SM / TM，不再使用 router.push
     * 3. 系列点击改为：
     *    - 原地更新 selectedFilters
     *    - 用 window.history.pushState 同步地址栏
     *    - 不触发 Next.js 页面重新跳转，避免页面明显跳动
     * 4. 普通筛选项，例如容量、材质，继续保留原地筛选逻辑
     */
    if (group.key === "productType") {
      handleProductTypeChange(value);
      return;
    }

    if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
      return;
    }

    const filterKey = group.key as SelectionFilterKey;
    const nextFilterValues = new Set(selectedFilters[filterKey] || []);

    if (group.inputType === "single") {
      const isRemovingOnlyValue =
        nextFilterValues.size === 1 && nextFilterValues.has(value);
      nextFilterValues.clear();
      if (!isRemovingOnlyValue) nextFilterValues.add(value);
    } else if (nextFilterValues.has(value)) {
      nextFilterValues.delete(value);
    } else {
      nextFilterValues.add(value);
    }

    pendingFilterRef.current = {
      filterCategory: activeCategoryId,
      filterName: filterKey,
      filterValue:
        nextFilterValues.size > 0 ? Array.from(nextFilterValues) : "none",
    };

    /*
     * 说明：
     * 1. 先判断当前筛选项是否命中正式系列路由
     * 2. EA / SM / TM 会命中 product-route-map.ts 里的三级 URL
     * 3. 命中后不 router.push，而是原地切换状态并同步地址栏
     */
    const seriesHref = getSeriesHrefByFilterValue(
      activeCategoryId,
      activeProductTypeId,
      group.key,
      value
    );

    if (seriesHref) {
      const isAlreadySelected = selectedFilters[filterKey]?.has(value) || false;
      const productTypeHref = getProductTypeHrefByIds(
        activeCategoryId,
        activeProductTypeId
      );

      setSelectedFilters((current) => {
        const next: SelectedFilterMap = {
          ...current,
        };

        /*
         * 说明：
         * 系列筛选属于单选逻辑：
         * - 选择 EA 时，不再同时保留 SM / TM
         * - 选择 SM 时，不再同时保留 EA / TM
         * - 再次点击已选中的系列，则取消选择
         */
        if (isAlreadySelected) {
          delete next[filterKey];
        } else {
          next[filterKey] = new Set([value]);
        }

        return next;
      });

      /*
       * 说明：
       * 1. 选中系列时，同步到三级 URL
       * 2. 取消系列时，回到二级产品类型 URL
       * 3. 使用 pushState 不触发 Next 路由跳转，页面不会明显跳动
       */
      const nextHref = isAlreadySelected
        ? productTypeHref
          ? localizeProductDetailHref(productTypeHref)
          : productTypeHref
        : localizeProductDetailHref(seriesHref);

      if (nextHref) {
        const normalizedHref = nextHref.endsWith("/")
          ? nextHref
          : `${nextHref}/`;

        window.history.pushState(null, "", normalizedHref);
      }

      return;
    }

    /*
     * 说明：
     * 普通筛选项仍然走前端筛选，不改 URL。
     */
    setSelectedFilters((current) => {
      const next: SelectedFilterMap = {
        ...current,
      };

      const values = new Set(next[filterKey] || []);
      const shouldSelect = !values.has(value);

      if (group.inputType === "single") {
        values.clear();
      }

      if (shouldSelect) {
        values.add(value);
      } else {
        values.delete(value);
      }

      if (values.size === 0) {
        delete next[filterKey];
      } else {
        next[filterKey] = values;
      }

      return next;
    });
  }

/* BARBED_PORT_OPTION_DISABLED_START */


function isBarbedPortOptionDisabled(

  group: ProductSelectionFilterGroup,

  value: string

) {

  if (

    activeProductTypeId !==

    "barbed-fittings"

  ) {

    return false;

  }


  if (

    group.key !== "filter02" &&

    group.key !== "filter03" &&

    group.key !== "filter04"

  ) {

    return false;

  }


  const candidateKey =

    group.key as SelectionFilterKey;


  /*

   * 当前已经选中的值不能禁用，

   * 保留再次点击取消的能力。

   */

  if (

    selectedFilters[

      candidateKey

    ]?.has(value)

  ) {

    return false;

  }


  /*

   * 顺序联动：

   *

   * 内径1不受内径2、3反向影响；

   * 内径2受内径1影响；

   * 内径3受内径1、2影响。

   */

  const dependencyMap: Record<

    "filter02" |

    "filter03" |

    "filter04",

    SelectionFilterKey[]

  > = {

    filter02: [

      "filter01",

      "filter05",

      "filter06",

    ],


    filter03: [

      "filter01",

      "filter02",

      "filter05",

      "filter06",

    ],


    filter04: [

      "filter01",

      "filter02",

      "filter03",

      "filter05",

      "filter06",

    ],

  };


  const dependencies =

    dependencyMap[

      candidateKey as

        | "filter02"

        | "filter03"

        | "filter04"

    ];


  const hasMatchingProduct =

    currentTypeProducts.some(

      (product) => {

        const candidateValues =

          splitFilterValues(

            (product.filters || {})[

              candidateKey

            ]

          );


        if (

          !candidateValues.includes(

            value

          )

        ) {

          return false;

        }


        return dependencies.every(

          (dependencyKey) => {

            const selectedValues =

              selectedFilters[

                dependencyKey

              ];


            if (

              !selectedValues ||

              selectedValues.size === 0

            ) {

              return true;

            }


            const productValues =

              splitFilterValues(

                (product.filters || {})[

                  dependencyKey

                ]

              );


            return productValues.some(

              (productValue) =>

                selectedValues.has(

                  productValue

                )

            );

          }

        );

      }

    );


  return !hasMatchingProduct;

}


/* BARBED_PORT_OPTION_DISABLED_END */

/* UNIFIED_PRODUCT_FILTER_LINKAGE_START */

/*
 * 产品中心统一真实型号组合联动：
 *
 * 1. 所有产品类型共用同一套判断；
 * 2. 当前候选项必须至少对应一个真实可显示产品；
 * 3. 候选产品必须满足其他所有已选筛选组；
 * 4. 同一筛选组采用 OR，不同筛选组采用 AND；
 * 5. 搜索关键词参与候选产品池判断；
 * 6. 无对应型号的选项保留显示，但变灰且不可点击；
 * 7. 已选中的选项始终保留取消能力；
 * 8. 倒刺接头端口数量限制继续作为特殊补充规则。
 */
function isProductFilterOptionDisabled(
  group: ProductSelectionFilterGroup,
  value: string
) {
  /*
   * 已选中的项目始终保持可点击，
   * 用户需要能够再次点击取消。
   */
  if (
    group.key === "productType"
  ) {
    if (
      activeProductTypeId === value
    ) {
      return false;
    }
  } else if (
    FILTER_KEYS.includes(
      group.key as SelectionFilterKey
    )
  ) {
    const activeFilterKey =
      group.key as SelectionFilterKey;

    if (
      selectedFilters[
        activeFilterKey
      ]?.has(value)
    ) {
      return false;
    }
  }

  const normalizedKeyword =
    searchKeyword
      .trim()
      .toLowerCase();

  /*
   * 与产品结果列表使用相同的搜索字段。
   */
  function matchesCurrentSearch(
    product: ProductSelectionProduct
  ) {
    if (!normalizedKeyword) {
      return true;
    }

    const searchText = [
      product.productId,
      product.categoryId,
      product.productTypeId,
      product.seriesId,
      product.detailSlug,
      (
        (product.cardTitle as any)
          ?.zh || ""
      ),
      (
        (product.cardTitle as any)
          ?.en || ""
      ),
      (
        (product.cardSubtitle as any)
          ?.zh || ""
      ),
      (
        (product.cardSubtitle as any)
          ?.en || ""
      ),
      (
        (product.searchKeywords as any)
          ?.zh || ""
      ),
      (
        (product.searchKeywords as any)
          ?.en || ""
      ),
      ...Object.values(
        product.filters || {}
      ),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchText.includes(
      normalizedKeyword
    );
  }

  /*
   * 产品种类：
   *
   * 无搜索关键词时允许正常切换；
   * 有搜索关键词时，只有该产品种类中存在
   * 搜索结果才允许选择。
   */
  if (
    group.key === "productType"
  ) {
    if (!normalizedKeyword) {
      return false;
    }

    const hasMatchingProductType =
      categoryProducts.some(
        (product) => {
          return (
            matchesActiveProductType(
              activeCategoryId,
              value,
              String(
                product.productTypeId ||
                ""
              )
            ) &&
            matchesCurrentSearch(product)
          );
        }
      );

    return !hasMatchingProductType;
  }

  if (
    !FILTER_KEYS.includes(
      group.key as SelectionFilterKey
    )
  ) {
    return false;
  }

  /*
   * 倒刺接头额外保留：
   * - 结构对应的端口数量；
   * - 不存在的端口整列不可选。
   *
   * 其余真实型号组合仍由下面的公共判断处理。
   */
  if (
    isBarbedPortOptionDisabled(
      group,
      value
    )
  ) {
    return true;
  }

  const candidateKey =
    group.key as SelectionFilterKey;

  /*
   * 当前产品种类 + 当前搜索词，
   * 形成统一候选产品池。
   */
  const candidateProducts =
    currentTypeProducts.filter(
      matchesCurrentSearch
    );

  const hasMatchingProduct =
    candidateProducts.some(
      (product) => {
        const candidateValues =
          splitFilterValues(
            (product.filters || {})[
              candidateKey
            ]
          );

        if (
          !candidateValues.includes(
            value
          )
        ) {
          return false;
        }

        /*
         * 检查其他所有已选筛选组。
         *
         * 当前候选组不使用自己已有的选择限制，
         * 因此同组多选仍然保持 OR。
         */
        return FILTER_KEYS.every(
          (dependencyKey) => {
            if (
              dependencyKey ===
              candidateKey
            ) {
              return true;
            }

            const selectedValues =
              selectedFilters[
                dependencyKey
              ];

            if (
              !selectedValues ||
              selectedValues.size === 0
            ) {
              return true;
            }

            const productValues =
              splitFilterValues(
                (product.filters || {})[
                  dependencyKey
                ]
              );

            return productValues.some(
              (productValue) =>
                selectedValues.has(
                  productValue
                )
            );
          }
        );
      }
    );

  return !hasMatchingProduct;
}

/* UNIFIED_PRODUCT_FILTER_LINKAGE_END */


function isFilterOptionActive(
    group: ProductSelectionFilterGroup,
    value: string
  ) {
    /*
     * 说明：
     * 1. 这个函数用于告诉筛选面板：当前选项是否处于选中状态
     * 2. productType 是产品类型，例如“柱塞泵”
     * 3. filter01 / filter02 / filter03 是普通筛选项，例如产品系列、量程、材质
     * 4. 这里必须先判断 FILTER_KEYS，避免 TypeScript 认为 string 不能索引 selectedFilters
     */
    if (group.key === "productType") {
      return activeProductTypeId === value;
    }

    if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
      return false;
    }

    const filterKey = group.key as SelectionFilterKey;

    return selectedFilters[filterKey]?.has(value) || false;
  }
  function removeSelectedTag(
    key: string,
    value: string
  ) {
    /*
     * 说明：
     * 1. 这个函数用于移除顶部“已选筛选标签”
     * 2. productType 是产品类型，例如“柱塞泵”
     * 3. filter01 是产品系列，例如 EA / SM / TM
     * 4. 在三级系列页清除 EA / SM / TM 时，应回到二级柱塞泵页面
     */

    if (key === "productType") {
      pendingFilterRef.current = {
        filterCategory: activeCategoryId,
        filterName: "product_type_id",
        filterValue: "all",
      };
      setActiveProductTypeId("");
      setSelectedFilters({});
      return;
    }

    /*
     * 说明：
     * 1. 判断当前清除的标签是否命中正式系列路由
     * 2. 例如 EA 常规柱塞泵命中：
     *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
     * 3. 清除后跳回产品类型页：
     *    /products/pumps/plunger-pumps/
     */
    const seriesHref = getSeriesHrefByFilterValue(
      activeCategoryId,
      activeProductTypeId,
      key,
      value
    );

    if (seriesHref) {
      const productTypeHref = getProductTypeHrefByIds(
        activeCategoryId,
        activeProductTypeId
      );

      if (productTypeHref) {
        router.push(
          localizeProductDetailHref(productTypeHref)
        );
        return;
      }
    }

    /*
     * 说明：
     * selectedFilters 的 key 只能是 SelectionFilterKey。
     * removeSelectedTag 传进来的 key 是 string，
     * 所以这里必须先判断 key 是否属于 FILTER_KEYS，再转换类型。
     */
    if (!FILTER_KEYS.includes(key as SelectionFilterKey)) {
      return;
    }

    const filterKey = key as SelectionFilterKey;

    const remainingValues = new Set(selectedFilters[filterKey] || []);
    remainingValues.delete(value);
    pendingFilterRef.current = {
      filterCategory: activeCategoryId,
      filterName: filterKey,
      filterValue:
        remainingValues.size > 0 ? Array.from(remainingValues) : "none",
    };

    setSelectedFilters((current) => {
      const next = {
        ...current,
      };

      const values = new Set(next[filterKey] || []);
      values.delete(value);

      if (values.size === 0) {
        delete next[filterKey];
      } else {
        next[filterKey] = values;
      }

      return next;
    });
  }
  function resetCurrentFilters() {
    const firstProductTypeId =
      getCategoryDefaultProductTypeId(activeCategoryId);

    pendingFilterRef.current = {
      filterCategory: activeCategoryId,
      filterName: "all_filters",
      filterValue: "default",
    };
    setActiveProductTypeId(firstProductTypeId);
    setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));
    setSearchInputValue("");
    setSearchKeyword("");
    setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
  }

  function localizeProductDetailHref(
    href: string,
    product?: ProductSelectionProduct,
  ) {
    if (
      locale === "zh" ||
      !href.startsWith("/") ||
      /^\/(?:en|es|fr|ko|ru)(?:\/|$)/.test(href)
    ) {
      return href;
    }

    if (["es", "fr", "ko", "ru"].includes(locale)) {
      return `/${locale}${href}`;
    }

    return `/en${href}`;
  }

  function createProductCartItem(
    product: ProductSelectionProduct
  ): SelectionCartItemInput {
    const title = getText(locale, product.cardTitle, product.productId);

    return {
      sourceType: "pump-selection",
      sourceLabel: locale === "zh" ? "产品中心" : "Products",
      productName: getTaxonomyLabel(locale, String(product.productTypeId || "")),
      productCode: product.productId,
      foreachModel: title,
      competitorModels: [],
      quantity: 1,
      needDrawing: false,
      imagePath:
      product.imageCard ||
      (() => {
        const text = Object.values(product as Record<string, unknown>).join(" ");

        if (/DPGL800/i.test(text)) {
          return "/images/products/pumps/diaphragm-pumps/dpgl800/images/dpgl800-gas-liquid-diaphragm-pump-main.webp";
        }

        if (/DPL30H/i.test(text)) {
          return /(BB|brushless|无刷)/i.test(text)
            ? "/images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushless-liquid-diaphragm-pump-main.webp"
            : "/images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushed-liquid-diaphragm-pump-main.webp";
        }

        if (/DPL60/i.test(text)) {
          return /(BB|brushless|无刷)/i.test(text)
            ? "/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushless-liquid-diaphragm-pump-main.webp"
            : "/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushed-liquid-diaphragm-pump-main.webp";
        }

        if (/DPL30/i.test(text)) {
          return /(BB|brushless|无刷)/i.test(text)
            ? "/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushless-liquid-diaphragm-pump-main.webp"
            : "/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-main.webp";
        }

        if (/(diaphragm|隔膜泵)/i.test(text)) {
          return "/images/products/pumps/diaphragm-pump.jpg";
        }

        return undefined;
      })(),
      detailHref: localizeProductDetailHref(makeDetailHref(product)),
    };
  }

  function toggleProductInList(product: ProductSelectionProduct) {
    const currentItem = getItem("pump-selection", product.productId);

    if (currentItem) {
      removeItem(currentItem.id);
      return;
    }

    addItem(createProductCartItem(product));
  }

  return (
    <div className="products-selection-page">
      <Suspense fallback={null}>
        <ProductSelectionSearchParamsSync onChange={handleSearchParamsChange} />
      </Suspense>
<SitePageShell
        breadcrumbAriaLabel={
          locale === "zh"
            ? "面包屑导航"
            : targetLocaleA11yText?.breadcrumbAriaLabel || "Breadcrumb"
        }
        breadcrumbItems={[
          {
            label: pageText.breadcrumbHome,
            href: locale === "zh" ? "/" : `/${locale}`,
          },
          {
            label: pageText.breadcrumbCurrent,
          },
        ]}
      >
        <main className="products-main">
          <div className="products-container">
            <ResourceSearchBar
              value={searchInputValue}
              onChange={handleSearchInputChange}
              onSearch={handleProductSearch}
              placeholder={pageText.searchPlaceholder}
              searchButtonText={pageText.searchButton}
              showRecentKeywords={false}
              context="product-selection"
            />

            <ProductCategoryTabs
              categories={categoryItems}
              activeCategoryId={activeCategoryId}
              activeCategoryLabel={activeCategory.label}
              mobileCategoryOpen={mobileCategoryOpen}
              mobileCategoryPrefix={pageText.mobileCategoryPrefix}
              onToggleMobileCategory={() =>
                setMobileCategoryOpen((current) => !current)
              }
              onCategoryChange={handleCategoryChange}
            />

            {activeProductTypeIntro ? (
              <section
                className="product-type-intro-module"
                data-product-type-id={activeProductTypeId || ""}
                aria-label={
                  locale === "zh"
                    ? `${activeProductTypeIntro.title}产品种类说明`
                    : `${activeProductTypeIntro.title}${
                        targetLocaleA11yText?.productTypeOverviewSuffix ||
                        " product type overview"
                      }`
                }
              >
                <div className="product-type-intro-image">
                  <img
                    src={activeProductTypeIntro.image.src}
                    alt={activeProductTypeIntro.image.alt}
                    loading="lazy"
                  />
                </div>

                <div className="product-type-intro-copy">
                  <h2>{activeProductTypeIntro.title}</h2>
                  {activeProductTypeIntro.paragraphs.map((paragraph) => (
                    <p key={paragraph}>
                      {renderProductTypeIntroParagraph(paragraph)}
                    </p>
                  ))}
                </div>
              </section>
            ) : null}
        <section className="selection-section">
          <div className="selection-layout">
            <ProductFilterPanel
              activeCategory={{
                ...activeCategory,
                description:
                  typeof activeCategory.description === "string"
                    ? activeCategory.description
                    : getText(locale, activeCategory.description as any, ""),
              }}
              activeProductTypeId={activeProductTypeId}
              filterGroups={filterGroups}
              mobileOpenFilterGroups={mobileOpenFilterGroups}
              currentPrefix={targetLocaleA11yText?.currentPrefix}
              barbedPortLabel={targetLocaleA11yText?.barbedPortLabel}
              onToggleMobileGroup={toggleMobileFilterGroup}
              isOptionActive={isFilterOptionActive}
              isOptionDisabled={isProductFilterOptionDisabled}
              onFilterChange={handleFilterChange}
              emptyText={pageText.filterEmpty}
            />

            <section className="product-area">
              <ProductSelectionToolbar
                total={matchedProducts.length}
                resultPrefix={pageText.resultPrefix}
                resultSuffix={
                  activeCategoryId === "valves" &&
                  locale === "zh"
                    ? " 个阀系列"
                    : pageText.resultSuffix
                }
                resetButtonText={pageText.resetFilters}
                selectedTags={selectedTagItems}
                onRemoveTag={removeSelectedTag}
                onResetFilters={resetCurrentFilters}
              />

              {matchedProducts.length > 0 ? (
                <>
                  <ProductCardGrid
                    products={pagedProducts as any}
                    selectedList={selectedList}
                    detailButtonText={pageText.detailButton}
                    addToListText={pageText.addToList}
                    addedToListText={pageText.addedToList}
                    getTitle={(product) =>
                      localizeProductCardTitle(
                        product,
                        locale,
                        getText(locale, product.cardTitle, product.productId),
                      )
                    }
                    getSubtitle={(product) =>
                      localizeProductCardSubtitle(
                        product,
                        locale,
                        getText(locale, product.cardSubtitle, ""),
                      )
                    }
                    getDetailHref={(product) =>
                      localizeProductDetailHref(
                        normalizeFinalProductDetailHref(
                          product,
                          makeDetailHref(product)
                        ),
                        product,
                      )
                    }
                    analyticsListId={analyticsListId}
                    analyticsListName="product_selection_results"
                    analyticsStartIndex={
                      (safeCurrentProductPage - 1) * productsPageSize
                    }
                    onToggleList={toggleProductInList}
                  />

                  <ProductSelectionPagination
                    currentPage={safeCurrentProductPage}
                    totalPages={totalProductPages}
                    previousText={pageText.previousPage}
                    nextText={pageText.nextPage}
                    ariaLabel={targetLocaleA11yText?.paginationAriaLabel}
                    onPageChange={setCurrentProductPage}
                  />
                </>
              ) : (
                <ProductEmptyState
                  title={pageText.emptyTitle}
                  description={pageText.emptyDescription}
                />
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
    </SitePageShell>
</div>
  );
}



