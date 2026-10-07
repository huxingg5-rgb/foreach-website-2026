import { pvcTubingVariants } from "@/data/products/configurator/pvc-tubing";
import { tpuTubingVariants } from "@/data/products/configurator/tpu-tubing";
import { fepTubingVariants } from "@/data/products/configurator/fep-tubing";
import { ptfeTubingVariants } from "@/data/products/configurator/ptfe-tubing";
import { peekTubingVariants } from "@/data/products/configurator/peek-tubing";
import { pfaTubingVariants } from "@/data/products/configurator/pfa-tubing";

const catalogue = {
  "pvc-tubing": pvcTubingVariants,
  "tpu-tubing": tpuTubingVariants,
  "fep-tubing": fepTubingVariants,
  "ptfe-tubing": ptfeTubingVariants,
  "peek-tubing": peekTubingVariants,
  "pfa-tubing": pfaTubingVariants,
};

// Read the selector's source records directly; keep every listed configuration.
export function getTubingCatalogue(slug: string, locale: string) {
  const variants = catalogue[slug as keyof typeof catalogue] || [];
  return variants.map((variant) => ({
    model: variant.model,
    productCode: variant.productCode,
    innerDiameter: String(variant.attributes.innerDiameter),
    outerDiameter: String(variant.attributes.outerDiameter),
    hardness: String(variant.attributes.hardness || "—"),
    packaging: locale === "en"
      ? String(variant.result?.packaging || "").replace("米/卷", " m/roll")
      : String(variant.result?.packaging || ""),
  }));
}
