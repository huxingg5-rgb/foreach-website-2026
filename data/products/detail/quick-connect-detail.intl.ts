import {
  quickConnectFittingSelectionProducts,
} from "@/data/products/selection/quick-connect-fitting-selection.generated";

type DetailRecord = Record<string, unknown>;
type QuickConnectRow = (typeof quickConnectFittingSelectionProducts)[number];

const byModel = new Map(
  quickConnectFittingSelectionProducts.map((row) => [
    String(row.foreachModel || row.model || "").trim().toUpperCase(),
    row,
  ] as const),
);

const specLabels: Record<string, string> = {
  "型号": "Model",
  "商品编码": "Product code",
  "产品类别": "Product category",
  "产品系列": "Product series",
  "接管内径": "Tubing ID",
  "接管内径或螺纹": "Tubing ID or thread",
  "螺纹规格": "Thread size",
  "公母端": "Male/Female end",
  "安装方式": "Mounting method",
  "阀门配置": "Valve configuration",
  "形状": "Shape",
  "外壳材质": "Housing material",
  "密封圈材质": "Seal material",
  "二维图纸": "2D drawings",
  "三维模型": "3D models",
  "在售型号数量": "Active models",
};

function text(value: unknown) {
  return String(value ?? "").trim();
}

function buildEnglishQuickConnectBreadcrumbs(
  currentLabel?: string,
) {
  const items = [
    { label: "Home", href: "/en/" },
    { label: "Products", href: "/en/products/" },
    { label: "Fitting series", href: "/en/products/fittings/" },
    { label: "Quick-Connect Fittings", href: "/en/products/fittings/quick-connect-fittings/" },
  ];

  return currentLabel
    ? [...items, { label: currentLabel }]
    : items;
}

function objectOf(value: unknown): DetailRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as DetailRecord
    : {};
}

function modelOf(data: DetailRecord) {
  return text(data.model || data.foreachModel).toUpperCase();
}

function seriesOf(data: DetailRecord, row?: QuickConnectRow) {
  const fromRow = text(row?.series || row?.seriesId).toUpperCase();
  if (fromRow) return fromRow;
  const fromData = text(data.seriesName || data.seriesId).toUpperCase();
  if (/^Q(?:20|40|60)$/.test(fromData)) return fromData;
  const match = modelOf(data).match(/^Q(?:20|40|60)/);
  return match?.[0] || "Q20";
}

function gender(value: unknown) {
  const source = text(value);
  return source === "P" || source === "公端" ? "Male" : source === "S" || source === "母端" ? "Female" : source;
}

function panel(value: unknown) {
  const source = text(value);
  return source === "M" || source === "穿板" ? "Panel mount" : source === "N" || source === "非穿板" ? "Non-panel" : source;
}

function valve(value: unknown) {
  const source = text(value);
  return source === "V" || source === "带阀" ? "Valved" : source === "X" || source === "不带阀" ? "Non-valved" : source;
}

function shape(value: unknown) {
  const source = text(value);
  return source === "S" || source === "直通" ? "Straight" : source === "L" || source === "L型" ? "Elbow" : source;
}

function detailRow(data: DetailRecord) {
  const model = modelOf(data);
  return byModel.get(model);
}

function modelDescriptor(data: DetailRecord, row?: QuickConnectRow) {
  const model = modelOf(data);
  const series = seriesOf(data, row);
  const maleFemale = gender(row?.genderCode || row?.gender || "");
  const shapeName = shape(row?.shapeCode || row?.shape || "");
  const valveName = valve(row?.valvedCode || row?.valved || "");
  const mountName = panel(row?.panelCode || row?.panelMount || "");
  const specs = Array.isArray(data.specs) ? data.specs as DetailRecord[] : [];
  const connection = text(row?.tubeOrThread) || text(specs.find((item) => item.label === "接管内径")?.value) || "the specified interface";
  const housing = text(row?.housingMaterial) || "the specified housing";
  const seal = text(row?.sealingRingMaterial) || "the specified seal";
  const connectionText = /mm/i.test(connection)
    ? `tubing with an ID of ${connection}`
    : `${connection} thread/interface`;
  const modelType = [series, maleFemale.toLowerCase(), shapeName.toLowerCase(), valveName.toLowerCase(), "quick-connect fitting"]
    .filter(Boolean)
    .join(" ");

  return {
    model,
    series,
    gender: maleFemale,
    shape: shapeName,
    valve: valveName,
    panel: mountName,
    connection,
    connectionText,
    housing,
    seal,
    modelType,
  };
}

function translateSpecValue(label: string, value: unknown, data: DetailRecord) {
  const source = text(value);
  if (!source) return source;
  if (label === "公母端") return source.split(/[、,]/).map(gender).join(", ");
  if (label === "安装方式") return source.split(/[、,]/).map(panel).join(", ");
  if (label === "阀门配置") return source.split(/[、,]/).map(valve).join(", ");
  if (label === "形状") return source.split(/[、,]/).map(shape).join(", ");
  if (label === "产品类别") return "Quick-Connect Fitting";
  if (label === "产品系列") return source.toUpperCase();
  if (label === "接管内径或螺纹") return source.replace(/、/g, ", ");
  if (label === "在售型号数量") return source.replace(/个$/, "");
  if (label === "二维图纸" || label === "三维模型") return source.replace(/个型号已配置$/, " configured");
  if (label === "型号" || label === "商品编码" || label === "接管内径" || label === "外壳材质" || label === "密封圈材质") return source;
  return text(data.__locale) === "en" ? source : source;
}

function localizeSpecs(specs: unknown, data: DetailRecord) {
  if (!Array.isArray(specs)) return specs;
  return specs.map((item) => {
    const record = item as DetailRecord;
    const sourceLabel = text(record.label);
    return {
      ...record,
      label: specLabels[sourceLabel] || sourceLabel,
      value: translateSpecValue(sourceLabel, record.value, data),
    };
  });
}

function localizeSpecGroups(groups: unknown, data: DetailRecord) {
  if (!Array.isArray(groups)) return groups;
  return groups.map((group) => {
    const record = group as DetailRecord;
    return {
      ...record,
      title: specLabels[text(record.title)] || "Specifications",
      items: localizeSpecs(record.items, data),
    };
  });
}

function localizeModelRows(rows: unknown) {
  if (!Array.isArray(rows)) return rows;
  return rows.map((item) => {
    const row = item as DetailRecord;
    return {
      ...row,
      gender: gender(row.gender),
      panelMount: panel(row.panelMount),
      valved: valve(row.valved),
      shape: shape(row.shape),
      connection: text(row.connection).replace(/、/g, ", "),
    };
  });
}

function localizeModelDetail(data: DetailRecord) {
  const row = detailRow(data);
  const descriptor = modelDescriptor(data, row);
  const { model, series, valve: valveName, panel: panelName, connectionText, housing, seal, modelType } = descriptor;
  const disconnectSentence = valveName === "Valved"
    ? "The fluidic path can be shut off when the fitting is disconnected."
    : "The fluidic path remains open when the fitting is disconnected.";
  const mountingPhrase = panelName === "Panel mount" ? "panel mounting" : panelName === "Non-panel" ? "non-panel mounting" : panelName.toLowerCase();
  const description = `${model} is a ${modelType} for ${connectionText}. It uses a ${housing} housing and ${seal} seals. It supports ${mountingPhrase} and is intended for quick-disconnect fluidic connections in equipment. ${disconnectSentence}`;
  const advantages = [
    `For ${connectionText}`,
    valveName,
    panelName,
    `${housing} housing`,
  ];
  const commonApplications = [
    "IVD equipment fluidic paths",
    "analytical-instrument fluidic modules",
    "equipment panel interfaces",
    "quick-disconnect service points",
  ];
  const faqs = [
    {
      question: `What interface does ${model} use?`,
      answer: `${model} is specified for ${connectionText}. Confirm the end type, valve configuration and mounting method during selection.`,
    },
    {
      question: `Does ${model} use a valved or non-valved design?`,
      answer: `This model is ${valveName.toLowerCase()}. ${disconnectSentence}`,
    },
    {
      question: `Does this ${series} fitting support ${mountingPhrase}?`,
      answer: `This model uses ${mountingPhrase} for equipment panels, housings or fixed brackets.`,
    },
    {
      question: `Are ${housing} and ${seal} compatible with the target fluid?`,
      answer: `Confirm compatibility using the fluid, operating temperature, pressure, cleaning requirements and seal material before release.`,
    },
    {
      question: `Can I request a 2D drawing for ${model}?`,
      answer: "Open the model resource when a published drawing is available, or add the model to the inquiry list for document verification.",
    },
  ];

  const localized: DetailRecord = {
    ...data,
    __locale: "en",
    categoryLabel: "Fittings",
    productTypeName: modelType,
    productTypeLabel: "Quick-Connect Fitting",
    seriesName: series,
    model,
    name: modelType,
    title: modelType,
    displayName: modelType,
    productName: modelType,
    modelDisplay: model,
    displayModel: model,
    foreachModel: model,
    description,
    shortDescription: description,
    heroDescription: description,
    advantages,
    commonApplications,
    imageAlt: `${model} ${modelType}`,
    mainImageAlt: `${model} ${modelType}`,
    specs: localizeSpecs(data.specs, data),
    specifications: localizeSpecs(data.specifications, data),
    specGroups: localizeSpecGroups(data.specGroups, data),
    faqs,
    faq: faqs,
    bottomCta: {
      title: "Need help confirming a quick-connect fitting model?",
      description: "Share the interface, end type, valve configuration, mounting method, materials and operating conditions for engineering review.",
      buttonText: "Contact an engineer",
      href: "/en/contact",
    },
    seo: {
      ...objectOf(data.seo),
      title: `${model} ${modelType} | Foreach Technology`,
      description,
    },
    sectionTitleMap: {
      specification: "Specifications",
      applications: "Common applications",
      faq: "Frequently asked questions",
    },
    breadcrumbs: buildEnglishQuickConnectBreadcrumbs(model),
  };

  return localized;
}

function unique(values: unknown[]) {
  return Array.from(new Set(values.map(text).filter(Boolean)));
}

function localizeSeriesDetail(data: DetailRecord) {
  const series = seriesOf(data);
  const rows = Array.isArray(data.modelRows) ? data.modelRows as DetailRecord[] : [];
  const count = rows.length;
  const connections = unique(rows.map(row => row.connection)).join(", ");
  const genders = unique(rows.map(row => gender(row.gender))).join(", ");
  const valves = unique(rows.map(row => valve(row.valved))).join(", ");
  const materials = unique(rows.map(row => row.housingMaterial)).join(", ");
  const seals = unique(rows.map(row => row.sealingRingMaterial)).join(", ");
  const nominalBore = series === "Q20" ? "1/8" : series === "Q40" ? "1/4" : "3/8";
  const introduction = [
    `The FOREACH ${series} quick-connect fitting series includes ${genders || "male and female"} ends with ${valves || "valved and non-valved"} options for equipment fluidic paths that require quick connection, replacement and service. Select a model by shape and mounting method.`,
    `The ${series} nominal bore is ${nominalBore} in. Available tubing or threaded interfaces include ${connections || "the specified interface"}. Nominal bore is not a flow-rate rating; confirm mating ends, sealing, pressure, fluid and valve configuration for the operating conditions.`,
    `Housing materials include ${materials || "the specified materials"}, with seal materials including ${seals || "the specified seal"}. Confirm compatibility with the reagent, wash fluid, concentration and temperature, then check tubing, panel mounting and disconnect frequency.`,
  ];
  const faqs = [
    {
      question: `How many active models are in the ${series} series?`,
      answer: `The current list includes ${count} active ${series} quick-connect fitting models. Filter by interface, end type, mounting, valve configuration, shape and housing material.`,
    },
    {
      question: `How should I select male and female ends for ${series}?`,
      answer: "Male and female ends are mating parts. Confirm the equipment and tubing side first, then select the interface size, valve configuration and mounting method.",
    },
    {
      question: "What is the difference between valved and non-valved fittings?",
      answer: "Valved fittings can close the fluidic path when disconnected. Non-valved fittings keep the path open, so the disconnect method and fluidic requirement determine the selection.",
    },
    {
      question: "When should I use a panel-mount fitting?",
      answer: "Panel-mount fittings are intended for equipment panels, housings and fixed brackets; non-panel fittings are generally used directly in tubing runs.",
    },
    {
      question: `How do I obtain a 2D drawing for a ${series} model?`,
      answer: "Select a model to open its detail page. A published 2D file is linked when an exact web-readable asset is available; otherwise submit the model and product code for document verification.",
    },
  ];

  const localized: DetailRecord = {
    ...data,
    __locale: "en",
    categoryLabel: "Fitting series",
    productTypeName: "Quick-Connect Fittings",
    productTypeLabel: "Quick-Connect Fittings",
    seriesName: series,
    model: `${series} Quick-Connect Fitting Series`,
    name: `${series} Quick-Connect Fittings`,
    title: `${series} Quick-Connect Fitting Series`,
    modelDisplay: `${series} Series | ${count} active models`,
    displayModel: `${series} Series | ${count} active models`,
    foreachModel: series,
    description: `The ${series} quick-connect fitting series includes ${count} active models with tubing or threaded interfaces, male or female ends, valved or non-valved options, panel-mount or non-panel configurations, and multiple shapes and housing materials. Users can select a model based on the fluidic interface, installation space and disconnect requirements.`,
    quickConnectIntroductionParagraphsZh: undefined,
    quickConnectIntroductionParagraphsEn: introduction,
    advantages: [
      `${count} active models`,
      "Male and female ends",
      "Valved and non-valved options",
      "Multiple mounting configurations",
    ],
    commonApplications: [
      "Microfluidic paths",
      "IVD equipment",
      "Analytical instruments",
      "Laboratory automation",
    ],
    imageAlt: `${series} quick-connect fitting series`,
    mainImageAlt: `${series} quick-connect fitting series`,
    specs: localizeSpecs(data.specs, data),
    specifications: localizeSpecs(data.specifications, data),
    modelRows: localizeModelRows(data.modelRows),
    faqs,
    faq: faqs,
    modelTableTitle: `${series} complete model list`,
    modelTableDescription: `There are ${count} active models. Click a model to choose by specification and open its detail page.`,
    seo: {
      ...objectOf(data.seo),
      title: `${series} Quick-Connect Fitting Series | Foreach Technology`,
      description: `Explore ${count} active ${series} quick-connect fitting models with multiple interfaces, end types, valve configurations, mounting methods, shapes and housing materials.`,
    },
    sectionTitleMap: {
      spec: `${series} selection range`,
      faq: `${series} quick-connect fitting FAQs`,
    },
    breadcrumbs: buildEnglishQuickConnectBreadcrumbs(`${series} Series`),
  };

  return localized;
}

/** Explicit English contract for all quick-connect series and model pages. */
export function localizeQuickConnectDetailData<T extends DetailRecord>(data: T): T {
  if (data.productTypeId !== "quick-connect-fittings" || data.__locale === "en") return data;
  const localized = Array.isArray(data.modelRows)
    ? localizeSeriesDetail(data)
    : localizeModelDetail(data);
  return localized as T;
}
