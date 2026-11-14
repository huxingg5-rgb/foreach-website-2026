import type { FlangedTubingChoice } from "./flanged-tubing";
import { getAssemblyTube, type AssemblyConnection } from "./tubing-assembly-catalog";

const familyConnections = {
  "flanged-tubing": "翻边",
  "ferrule-kits": "卡箍",
  "retaining-ring-kits": "卡环",
} as const satisfies Record<string, AssemblyConnection>;

const materialPresets = {
  fep: { material: "FEP", color: "透明" },
  ptfe: { material: "PTFE", color: "本色" },
  pfa: { material: "PFA", color: "透明" },
  "black-ptfe": { material: "PTFE", color: "黑色" },
} as const;

/** One exact entry contract for the series pages and their published material pages. */
export function getAssemblyEntryPreset(slug: string) {
  for (const [family, connection] of Object.entries(familyConnections)) {
    if (slug === family) return { family, connection, configuration: undefined, ...materialPresets.fep };
    for (const configuration of Object.keys(materialPresets) as (keyof typeof materialPresets)[]) {
      if (slug === `${family}-${configuration}`) return { family, connection, configuration, ...materialPresets[configuration] };
    }
  }
  return null;
}

/** A page-level drawing action must not pick an unrelated globally active record. */
export function assemblyChoiceMatchesEntry(choice: FlangedTubingChoice, slug: string) {
  const preset = getAssemblyEntryPreset(slug), tube = getAssemblyTube(choice.tubeModel);
  if (!preset || !tube) return false;
  if (preset.configuration && (tube.material !== preset.material || tube.color !== preset.color)) return false;
  return (choice.mode === "double" ? [choice.a, choice.b] : [choice.a])
    .every(end => (end.connection || "翻边") === preset.connection);
}
