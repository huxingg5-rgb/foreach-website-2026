import { assemblyAccessory, getAssemblyFitting, getAssemblyTube } from "./tubing-assembly-catalog";
import { assemblySizeError, endConnection, normalizeFlangedChoice, type FlangedEnd, type FlangedTubingChoice } from "./flanged-tubing";

/** Only engineering fields enter the 3D file; customer/contact data stays in the form. */
export function tubingAssembly3dConfig(value: FlangedTubingChoice) {
  const choice = normalizeFlangedChoice(value), invalid = assemblySizeError(choice);
  if (invalid) throw new Error(invalid);
  const tube = getAssemblyTube(choice.tubeModel)!;
  const end = (e: FlangedEnd) => {
    const fitting = getAssemblyFitting(e.fittingModel)!, accessory = assemblyAccessory(e.fittingModel, e.accessoryCode)!;
    return { ...e, enabled: true, connection: endConnection(e), cadUrl: fitting.cadUrl,
      accessoryCadUrl: accessory.cadUrl, accessoryModel: accessory.model, accessoryColor: accessory.color,
      accessoryMaterial: accessory.material, productCode: fitting.code };
  };
  return {
    mode: choice.mode, tubeModel: tube.model, tubeKey: tube.key, tubeMaterial: tube.material, tubeColor: tube.color,
    inner: tube.inner, outer: tube.outer, length: choice.length, tolerance: choice.tolerance,
    labelA: choice.labelA, labelB: choice.labelB, textA: choice.textA, textB: choice.textB,
    a: end(choice.a), b: choice.mode === "double" ? end(choice.b) : undefined,
  };
}
export type TubingAssembly3dConfig = ReturnType<typeof tubingAssembly3dConfig>;
