export type LuerRole = "male" | "female" | "core" | "collar" | "ring" | "nut" | "plug";
export function getLuerRole(family: string): LuerRole {
  if (["LPS", "LPR", "LP"].includes(family)) return "male";
  if (["LS", "PMLS"].includes(family)) return "female";
  if (["LSL", "LRL"].includes(family)) return "core";
  return ({LPT: "collar", LCR: "ring", LNS: "nut", LPBL: "plug"} as Record<string, LuerRole>)[family];
}

/** Mechanical roles are independent of each end's hose ID and colour. */
export function isLuerCombination(parts: { model: string; family: string }[]): boolean {
  if (!parts.length || parts.length > 5 || new Set(parts.map(p => p.model)).size !== parts.length) return false;
  if (parts.some(p => !getLuerRole(p.family))) return false;
  if (parts.length === 1) return true;
  const count = (role: LuerRole) => parts.filter(p => getLuerRole(p.family) === role).length;
  // A separate core and its locking collar form a complete male assembly.
  if (parts.length === 2 && count("core") === 1 && count("collar") === 1) return true;
  if (count("male") + count("core") + count("plug") !== 1 || count("female") !== 1) return false;
  if (count("collar") !== count("core") || count("ring") > 1 || count("nut") > 1) return false;
  if (parts.some(p => p.family === "LS") && (count("ring") || count("nut"))) return false;
  return true;
}
