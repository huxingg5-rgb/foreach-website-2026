import type {
  ProductConfiguratorConfig,
  ProductConfiguratorDimension,
  ProductConfiguratorLocale,
  ProductConfiguratorVariant,
} from "@/components/products/configurator/product-variant-configurator.types";
import dpl30 from "@/data/products/generated/pumps/diaphragm-pumps/detail/dpl30-liquid-diaphragm-pump.json";
import dpl60 from "@/data/products/generated/pumps/diaphragm-pumps/detail/dpl60-liquid-diaphragm-pump.json";
import dpl30h from "@/data/products/generated/pumps/diaphragm-pumps/detail/dpl30h-liquid-diaphragm-pump.json";
import dpgl800 from "@/data/products/generated/pumps/diaphragm-pumps/detail/dpgl800-gas-liquid-diaphragm-pump.json";
import { getDiaphragmPumpReferenceModel } from "@/data/products/detail/diaphragm-pump-reference-models";
import { getDiaphragmPumpConfiguratorCopy } from "./diaphragm-pumps.i18n";

// Reuse the supplied standard ordering tables; do not generate SKUs from coding options.
const seriesCatalogs = {
  "dpl30-liquid-diaphragm-pump": dpl30,
  "dpl60-liquid-diaphragm-pump": dpl60,
  "dpl30h-liquid-diaphragm-pump": dpl30h,
  "dpgl800-gas-liquid-diaphragm-pump": dpgl800,
};
type SeriesSlug = keyof typeof seriesCatalogs;
const locales: readonly string[] = ["zh", "en", "es", "fr", "ko", "ru"];

export function getDiaphragmPumpConfigurator(
  slug: string,
  locale = "zh",
): ProductConfiguratorConfig | undefined {
  const normalizedLocale = locale === "zh-CN" ? "zh" : locale;
  if (!locales.includes(normalizedLocale)) return undefined;
  const language = normalizedLocale as ProductConfiguratorLocale;
  const normalizedSlug = slug.trim().toLowerCase();
  const reference = getDiaphragmPumpReferenceModel(normalizedSlug);
  // Accept only these exact public reference and series slugs, not inferred identities.
  if (reference && reference.slug !== normalizedSlug) return undefined;
  const seriesSlug = reference?.sourceSeriesSlug || normalizedSlug;
  if (!Object.prototype.hasOwnProperty.call(seriesCatalogs, seriesSlug)) return undefined;
  const catalog = seriesCatalogs[seriesSlug as SeriesSlug];
  const isGasLiquid = catalog.seriesId === "DPGL800";
  const text = getDiaphragmPumpConfiguratorCopy(language);
  const rows = reference?.configurationCode
    ? catalog.modelConfigurations.filter(row =>
        new RegExp(`-\\d+${reference.configurationCode}-`).test(row.model),
      )
    : catalog.modelConfigurations;
  if (!rows.length) return undefined;

  const variants: ProductConfiguratorVariant[] = rows.map(row => ({
    id: row.itemCode,
    model: row.model,
    productCode: row.itemCode,
    attributes: {
      motor: row.motorType === "直流无刷电机" ? text.values.brushless : text.values.brushed,
      voltage: Number.parseInt(row.voltage, 10),
      material: row.model.split("-").at(-1) || "",
      direction: row.portDirection === "向下" ? text.values.downward : text.values.upward,
    },
    result: { diaphragm: row.diaphragm, valvePlate: row.valvePlate },
  }));
  const dimensions: ProductConfiguratorDimension[] = [];
  if (!reference && !isGasLiquid) {
    dimensions.push({ key: "motor", label: text.labels.motor, columns: 1, order: [text.values.brushed, text.values.brushless] });
  }
  if (!isGasLiquid) {
    dimensions.push({ key: "voltage", label: text.labels.voltage, unit: "V DC", columns: 1, order: [12, 24] });
  }
  dimensions.push({ key: "material", label: text.labels.material, columns: 1, order: ["EP/PS", "FF/PS"] });
  if (isGasLiquid) {
    dimensions.push({ key: "direction", label: text.labels.direction, columns: 1, order: [text.values.downward, text.values.upward] });
  }

  const productName = reference?.model || catalog.seriesId;
  return {
    id: `diaphragm-${normalizedSlug}`,
    localizedLocale: language,
    title: `${productName} · ${text.title}`,
    description: text.description,
    productName,
    showProductNameInSelection: false,
    showProductCode: true,
    allowListRemoval: false,
    emptyInitialSelection: true,
    autoSelectFollowingDimensions: false,
    emptySelectionText: text.empty,
    dimensions,
    variants,
    compactSummary: {
      rows: [
        {
          label: text.labels.voltage,
          values: isGasLiquid ? [{ value: "24 V DC" }] : [{ selectionKey: "voltage", unit: "V DC" }],
        },
        {
          label: text.labels.motor,
          values: [
            (reference || isGasLiquid)
              ? { value: String(variants[0].attributes.motor).replace(/^[BD] · /, "") }
              : { selectionKey: "motor" },
          ],
        },
        {
          label: text.labels.connection,
          values: [{ value: (isGasLiquid || catalog.seriesId === "DPL30H" ? text.values.threaded : text.values.barbed).replace(/^[BS] · /, "") }],
        },
        {
          label: text.labels.diaphragm,
          values: [{ resultKey: "diaphragm" }],
        },
        {
          label: text.labels.valvePlate,
          values: [{ resultKey: "valvePlate" }],
        },
        {
          label: text.labels.pumpHead,
          values: [{ value: rows[0].pumpHead }],
        },
        ...(isGasLiquid ? [{ label: text.labels.direction, values: [{ selectionKey: "direction" }] }] : []),
        ...(!isGasLiquid ? [
          { label: text.labels.wiring, values: [{ value: text.values.twoWire }] },
          { label: text.labels.direction, values: [{ value: text.values.upward }] },
        ] : []),
      ],
    },
    noticeTitle: text.noticeTitle,
    notice: text.notice,
    uiText: text.ui,
  };
}
