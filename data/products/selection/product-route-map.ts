/* =========================================================
   product-route-map.ts
   恒永达官网｜产品中心动态路由映射表

   说明：
   1. 这里统一管理产品中心正式分类 URL
   2. query 链接继续作为临时筛选状态使用
   3. 动态路由用于 SEO / GEO / AI 抓取 / sitemap / canonical
   4. 当前建立：
      泵系列 → 产品类型 → 产品系列
   5. 产品类型先补齐：
      柱塞泵 / 隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵
   6. 柱塞泵下先预留：
      EA 常规柱塞泵 / SM 微型柱塞泵 / TM 超微型柱塞泵
========================================================= */

import type { SelectionFilterKey } from "./product-selection.types";

export type ProductRouteInitialFilters = Partial<
  Record<SelectionFilterKey, string[]>
>;

export type ProductCategoryRouteEntry = {
  categoryId: string;
  label: string;
  title: string;
  description: string;
};

export type ProductTypeRouteEntry = {
  category: string;
  categoryId: string;
  productTypeId: string;
  label: string;
  title: string;
  description: string;
};

export type ProductSeriesRouteEntry = {
  category: string;
  slug: string;
  categoryId: string;
  productTypeId: string;
  filterKey: SelectionFilterKey;
  filterValue: string;
  initialFilters: ProductRouteInitialFilters;
  label: string;
  title: string;
  description: string;
};

export const productRouteMap: {
  categories: Record<string, ProductCategoryRouteEntry>;
  productTypes: Record<string, ProductTypeRouteEntry>;
  series: Record<string, ProductSeriesRouteEntry>;
} = {
  categories: {
    pumps: {
      categoryId: "pumps",
      label: "泵系列",
      title: "泵系列 | FOREACH",
      description:
        "恒永达泵系列产品覆盖自动化分析仪器、IVD、生命科学与实验室自动化设备中的精密液体处理需求。",
    },

    valves: {
      categoryId: "valves",
      label: "阀系列",
      title: "阀系列 | FOREACH",
      description:
        "恒永达阀系列产品覆盖旋转阀、高压阀、电磁阀等自动化仪器液路控制需求。",
    },

    tubing: {
      categoryId: "tubing",
      label: "管路系列",
      title: "管路系列 | FOREACH",
      description:
        "恒永达管路系列产品覆盖 FEP、PFA、PTFE、PEEK、PVC、TPU 等仪器液路连接需求。",
    },

    probes: {
      categoryId: "needles",
      label: "针系列",
      title: "针系列 | FOREACH",
      description:
        "恒永达针系列产品覆盖采样针、穿刺针、清洗针和搅拌桨等自动化仪器定制需求。",
    },

    fittings: {
      categoryId: "fittings",
      label: "接头系列",
      title: "接头系列 | FOREACH",
      description:
        "恒永达接头产品覆盖硬管接头、软管接头、鲁尔接头、快插接头、内螺纹互转接头，以及过滤器与单向阀。",
    },  },

  productTypes: {
    "piston-pump": {
      category: "pumps",
      categoryId: "pumps",
      productTypeId: "plunger-pump",
      label: "柱塞泵",
      title: "精密柱塞泵｜微量至毫升级液体定量、吸取与分配 | FOREACH",
      description:
        "FOREACH 精密柱塞泵包括 EA、SM、TM 系列，用于微量至毫升级液体的精密吸取、定量、分配和加注。EA 系列覆盖 50 μL–20 mL，可选择多种柱塞及泵头材料、避光配置，以及 1/4-28UNF、M6 流体接口。",
    },

    "miniature-diaphragm-pumps": {
      category: "pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      label: "隔膜泵",
      title: "微型隔膜泵：液体与气液混合处理｜恒永达",
      description:
        "探索FOREACH微型隔膜泵，包括用于液体输送、清洗和循环的液体隔膜泵，以及用于废液抽吸、真空处理和气液混合介质的气液混合隔膜泵。",
    },

    "pipetting-pumps": {
      category: "pumps",
      categoryId: "pumps",
      productTypeId: "pipette-pump",
      label: "移液泵",
      title: "移液泵 | FOREACH",
      description:
        "移液泵适用于自动化移液、加样、分液和微量液体处理场景。",
    },

    "syringe-pumps": {
      category: "pumps",
      categoryId: "pumps",
      productTypeId: "syringe-pump",
      label: "注射泵",
      title: "注射泵 | FOREACH",
      description:
        "注射泵适用于高精度进样、注液、梯度控制和稳定流量输出场景。",
    },

    "valveless-pumps": {
      category: "pumps",
      categoryId: "pumps",
      productTypeId: "valveless-pump",
      label: "无阀泵",
      title: "无阀泵 | FOREACH",
      description:
        "无阀泵适用于简化液路结构、降低阀件依赖和提高系统集成度的精密液体处理场景。",
  
    },

        "hard-tube-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "hard-tube-fittings",
      label: "硬管接头",
      title: "硬管接头 | FOREACH",
      description:
        "硬管接头适用于PTFE、FEP、PFA和PEEK等硬管连接，可根据密封结构、接口螺纹、接管外径、材质和颜色进行选型。",
    },

    "barbed-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "barbed-fittings",
      label: "倒刺接头",
      title: "倒刺接头 | FOREACH",
      description:
        "倒刺接头用于软管之间的直通、转向、分流和汇流连接，可根据产品结构、接管内径、材质和颜色进行选型。",
    },

    "thread-to-barbed-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "thread-to-barbed-fittings",
      label: "螺纹转倒刺接头",
      title: "螺纹转倒刺接头 | FOREACH",
      description:
        "螺纹转倒刺接头用于设备螺纹接口与软管液路之间的转接，可根据连接结构、密封方式、螺纹规格、接管内径、材质和颜色进行选型。",
    },

    "luer-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "luer-fittings",
      label: "鲁尔接头",
      title: "鲁尔接头 | FOREACH",
      description:
        "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
    },

    "quick-connect-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "quick-connect-fittings",
      label: "快插接头",
      title: "快插接头 | FOREACH",
      description:
        "快插接头覆盖Q20、Q40和Q60系列，可根据管径、端口形式、阀门配置和安装结构进行选型。",
    },

    "female-thread-adapters": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "female-thread-adapters",
      label: "内螺纹互转接头",
      title: "内螺纹互转接头 | FOREACH",
      description:
        "内螺纹互转接头覆盖二通、三通、标准型、方型、穿板型、T型和Y型结构。",
    },

    "bulkhead-barbed-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "bulkhead-barbed-fittings",
      label: "穿板倒刺接头",
      title: "穿板倒刺接头 | FOREACH",
      description:
        "穿板倒刺接头系列包含PMB穿板倒刺接头和PMBSN六角螺母，可根据产品结构、螺纹规格、接管内径、材质和颜色进行选型。",
    },

    "filters": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "filters",
      label: "过滤器与单向阀",
      title: "过滤器与单向阀 | FOREACH",
      description:
        "过滤器用于液路中的颗粒拦截与流体净化，单向阀用于控制流体单向流动并降低回流风险。",
    },


  },

  series: {
    "standard-piston-pump": {
      category: "pumps",
      slug: "piston-pump",
      categoryId: "pumps",
      productTypeId: "plunger-pump",
      filterKey: "filter01",
      filterValue: "EA 常规柱塞泵",
      initialFilters: {
        filter01: ["EA 常规柱塞泵"],
      },
      label: "EA 常规柱塞泵",
      title: "50 μL至20 mL精密柱塞泵用于液体定量与分配 | FOREACH",
      description:
        "FOREACH EA 精密柱塞泵覆盖 50 μL–20 mL 多种容量，用于样本吸取、试剂加注、精密分液和定量加液。100%量程准确性和重复性 <0.5%，支持多种接液材料以及 1/4-28UNF、M6 流体接口。",
    },

    "miniature-piston-pump": {
      category: "pumps",
      slug: "piston-pump",
      categoryId: "pumps",
      productTypeId: "plunger-pump",
      filterKey: "filter01",
      filterValue: "SM 微型柱塞泵",
      initialFilters: {
        filter01: ["SM 微型柱塞泵"],
      },
      label: "SM 微型柱塞泵",
      title: "50 μL至1 mL微型柱塞泵用于微量液体处理 | FOREACH",
      description:
        "FOREACH SM 微型柱塞泵覆盖 50 μL、100 μL、250 μL、500 μL 和 1 mL，适用于紧凑型自动化设备中的微量吸液、分液、试剂加注和液体处理，可选择多种柱塞、泵头材料及 1/4-28UNF、M6 流体接口。",
    },

    "ultra-compact-piston-pump": {
      category: "pumps",
      slug: "piston-pump",
      categoryId: "pumps",
      productTypeId: "plunger-pump",
      filterKey: "filter01",
      filterValue: "TM 超微型柱塞泵",
      initialFilters: {
        filter01: ["TM 超微型柱塞泵"],
      },
      label: "TM 超微型柱塞泵",
      title: "超微型柱塞泵用于超紧凑液路精密液体处理 | FOREACH",
      description:
        "FOREACH TM 超微型柱塞泵面向安装空间受限的小型自动化设备和高集成液路模块，可用于微量液体吸取、定量分配和加注，适合进一步小型化的液体处理系统设计。",
    },
  
    "liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "miniature-diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "液体隔膜泵",
      initialFilters: {
        filter01: ["液体隔膜泵"],
      },
      label: "液泵",
      title: "最高 600 mL/min 微型液体隔膜泵｜恒永达",
      description:
        "FOREACH微型液体隔膜泵适用于约0–600 mL/min的液体处理、清洗、循环和仪器液路，并提供标准压力与最高600 kPa高压选项。",
    },

    "gas-liquid-diaphragm-pumps": {
      category: "pumps",
      slug: "miniature-diaphragm-pumps",
      categoryId: "pumps",
      productTypeId: "diaphragm-pump",
      filterKey: "filter01",
      filterValue: "气液混合隔膜泵",
      initialFilters: {
        filter01: ["气液混合隔膜泵"],
      },
      label: "气液混合泵",
      title: "废液抽吸微型气液混合隔膜泵｜恒永达",
      description:
        "FOREACH微型气液混合隔膜泵适用于废液抽吸、真空处理和气液混合介质；DPGL800单头空载气体流量6 L/min，最大负压小于-90 kPa。",
    },
},


};

export function getCategoryRouteParams() {
  return Object.keys(productRouteMap.categories).map((category) => ({
    category,
  }));
}

export function getProductTypeRouteParams() {
  return Object.entries(productRouteMap.productTypes).map(([slug, route]) => ({
    category: route.category,
    slug,
  }));
}

export function getSeriesRouteParams() {
  return Object.entries(productRouteMap.series).map(([seriesSlug, route]) => ({
    category: route.category,
    slug: route.slug,
    seriesSlug,
  }));
}

export function resolveCategoryRoute(category: string) {
  return productRouteMap.categories[category] || null;
}

export function resolveProductTypeRoute(category: string, slug: string) {
  const route = productRouteMap.productTypes[slug];

  if (!route || route.category !== category) {
    return null;
  }

  return route;
}

export function resolveSeriesRoute(
  category: string,
  slug: string,
  seriesSlug: string
) {
  const route = productRouteMap.series[seriesSlug];

  if (!route || route.category !== category || route.slug !== slug) {
    return null;
  }

  return route;
}

export function hasProductTypeRouteByIds(
  categoryId: string,
  productTypeId: string
) {
  return Object.values(productRouteMap.productTypes).some((route) => {
    return (
      route.categoryId === categoryId &&
      route.productTypeId === productTypeId
    );
  });
}

export function getProductTypeHrefByIds(
  categoryId: string,
  productTypeId: string
) {
  const matchedRoute = Object.entries(productRouteMap.productTypes).find(
    ([, route]) => {
      return (
        route.categoryId === categoryId &&
        route.productTypeId === productTypeId
      );
    }
  );

  if (!matchedRoute) {
    return null;
  }

  const [slug, route] = matchedRoute;

  return `/products/${route.category}/${slug}`;
}

export function getProductTypeFilterOptionsByCategory(categoryId: string) {
  return Object.values(productRouteMap.productTypes)
    .filter((route) => route.categoryId === categoryId)
    .map((route) => ({
      value: route.productTypeId,
      label: route.label,
      href: getProductTypeHrefByIds(route.categoryId, route.productTypeId),
    }));
}

export function getSeriesHrefByFilterValue(
  categoryId: string,
  productTypeId: string,
  filterKey: string,
  filterValue: string
) {
  const matchedRoute = Object.entries(productRouteMap.series).find(
    ([, route]) => {
      return (
        route.categoryId === categoryId &&
        route.productTypeId === productTypeId &&
        route.filterKey === filterKey &&
        route.filterValue === filterValue
      );
    }
  );

  if (!matchedRoute) {
    return null;
  }

  const [seriesSlug, route] = matchedRoute;

  return `/products/${route.category}/${route.slug}/${seriesSlug}`;
}

export function getSeriesFilterOptionsByProductType(
  categoryId: string,
  productTypeId: string,
  filterKey: string
) {
  return Object.entries(productRouteMap.series)
    .filter(([, route]) => {
      return (
        route.categoryId === categoryId &&
        route.productTypeId === productTypeId &&
        route.filterKey === filterKey
      );
    })
    .map(([seriesSlug, route]) => ({
      value: route.filterValue,
      label: route.label,
      href: `/products/${route.category}/${route.slug}/${seriesSlug}`,
    }));
}

/* =========================================================
   productTypeIntroMap
   恒永达官网｜产品类型介绍模块数据

   说明：
   1. 这里专门管理产品类型介绍横幅的数据
   2. 每个产品类型都有独立标题、段落、图片路径和 alt
   3. 图片当前使用 WebP 占位文件，后续直接同名替换真实图片即可
   4. 该模块用于 SEO / GEO，让搜索引擎和 AI 明确识别每个产品类型页面
========================================================= */

export type ProductTypeIntroEntry = {
  categoryId: string;
  productTypeId: string;
  title: string;
  paragraphs: string[];
  image: {
    src: string;
    alt: string;
  };
};

export const productTypeIntroMap: Record<string, ProductTypeIntroEntry> = {
  "pumps:plunger-pump": {
    categoryId: "pumps",
    productTypeId: "plunger-pump",
    title: "柱塞泵系列",
    paragraphs: [
      "恒永达柱塞泵系列专为自动化分析仪器中的精密液体处理而设计，适用于体外诊断、生命科学、实验室自动化及分析检测设备中的试剂加注、样本分配、定量输送和微量液体控制场景。",
      "产品覆盖 EA 常规柱塞泵、SM 微型柱塞泵和 TM 超微型柱塞泵等平台，可根据仪器空间、加液量程、泵头材质、接口方式和系统集成需求进行选型，并支持与电磁阀、控制器、光耦反馈及泵阀一体化方案组合使用。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
    ],
    image: {
      src: "/images/products/pumps/product-types/plunger-pumps/foreach-plunger-pumps-product-type-intro.webp",
      alt: "FOREACH 柱塞泵系列产品图，用于IVD、生命科学和实验室自动化设备中的精密液体处理"
    }
  },

  "pumps:diaphragm-pump": {
    categoryId: "pumps",
    productTypeId: "diaphragm-pump",
    title: "隔膜泵系列",
    paragraphs: [
      "恒永达隔膜泵涵盖液体及气液混合类型，适用于液体输送、气体抽吸、真空建立、清洗循环、废液排放及气液混合物处理等场景。",
      "选型时可根据输送介质、目标流量、工作压力或真空度、自吸高度、电机类型、接液材质、接口形式及安装空间进行筛选。隔膜泵包括 DPL30 300 mL/min、DPL60 600 mL/min，以及 DPGL800 双头微型气液混合隔膜泵（单泵头空载气体流量为 6 L/min）等型号，可面向 IVD、实验室分析及医疗设备液路进行选型。",
      "产品卡片展示常用配置，完整参数、尺寸图及规格书请进入产品详情页查看；如无法确定型号，可提交实际工况获取选型建议。",
    ],
    image: {
      src: "/images/products/pumps/product-types/diaphragm-pumps/foreach-diaphragm-pumps-product-type-intro.webp",
      alt: "FOREACH 隔膜泵系列产品图，用于清洗、废液和试剂输送液路"
    }
  },

  "pumps:pipette-pump": {
    categoryId: "pumps",
    productTypeId: "pipette-pump",
    title: "移液泵系列",
    paragraphs: [
      "恒永达移液泵系列面向自动化移液、加样、分液和样本处理场景，可用于体外诊断、生命科学、实验室自动化和分析仪器中的微量液体操作。",
      "产品可结合液面检测、压力监测、堵针识别和控制模块，实现更稳定的吸液、排液和移液过程，适合对重复性、稳定性和系统集成度要求较高的仪器平台。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
    ],
    image: {
      src: "/images/products/pumps/product-types/pipetting-pumps/foreach-pipetting-pumps-product-type-intro.webp",
      alt: "FOREACH 移液泵系列产品图，用于自动化移液、加样和样本处理"
    }
  },

  "pumps:syringe-pump": {
    categoryId: "pumps",
    productTypeId: "syringe-pump",
    title: "注射泵系列",
    paragraphs: [
      "恒永达注射泵系列适用于高精度进样、注液、梯度控制和稳定流量输出，可应用于分析仪器、实验室自动化、生命科学和精密液体处理系统。",
      "注射泵可根据注射器规格、行程分辨率、速度范围、控制方式和系统安装空间进行选型，适合需要稳定体积控制和精密注液的设备平台。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
    ],
    image: {
      src: "/images/products/pumps/product-types/syringe-pumps/foreach-syringe-pumps-product-type-intro.webp",
      alt: "FOREACH 注射泵系列产品图，用于高精度进样、注液和稳定流量输出"
    }
  },

  "pumps:valveless-pump": {
    categoryId: "pumps",
    productTypeId: "valveless-pump",
    title: "无阀泵系列",
    paragraphs: [
      "恒永达无阀泵系列适用于需要简化液路结构、减少阀件依赖和提高系统集成度的精密液体处理场景，可用于紧凑型分析仪器和自动化设备。",
      "无阀泵通过结构设计减少传统阀件带来的维护和集成复杂度，适合对紧凑空间、低维护需求和稳定输送性能有要求的仪器液路。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
    ],
    image: {
      src: "/images/products/pumps/product-types/valveless-pumps/foreach-valveless-pumps-product-type-intro.webp",
      alt: "FOREACH 无阀泵系列产品图，用于紧凑型仪器中的精密液体处理"
    }
  },

  "pumps:high-pressure-pump": {
    categoryId: "pumps",
    productTypeId: "high-pressure-pump",
    title: "高压泵系列",
    paragraphs: [
      "恒永达高压泵系列适用于对压力稳定性、耐压能力和连续输送性能要求较高的分析仪器液路场景。",
      "该系列可用于需要稳定压力输出、精密流量控制和高可靠性液体输送的仪器平台，并可根据压力范围、流量需求、材料兼容性和系统接口进行配置。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
    ],
    image: {
      src: "/images/products/pumps/product-types/high-pressure-pumps/foreach-high-pressure-pumps-product-type-intro.webp",
      alt: "FOREACH 高压泵系列产品图，用于高压力稳定输送和分析仪器液路"
    }
  }
};

export function getProductTypeIntroByIds(
  categoryId: string,
  productTypeId: string
) {
  return productTypeIntroMap[`${categoryId}:${productTypeId}`] || null;
}



export const tubingProductRouteMap = {
  "pvc-tubing": "/products/tubing/pvc-tubing",
  "tpu-tubing": "/products/tubing/tpu-tubing",
  "fep-tubing": "/products/tubing/fep-tubing",
  "ptfe-tubing": "/products/tubing/ptfe-tubing",
  "peek-tubing": "/products/tubing/peek-tubing",
  "pfa-tubing": "/products/tubing/pfa-tubing",
};



