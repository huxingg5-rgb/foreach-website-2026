/** Normalize a displayed English pump name, without changing identifiers or URLs. */
export function normalizePistonPumpPublicName(value: string) {
  return value.replace(/\bplunger pumps?\b/gi, match =>
    match.replace(/plunger/i, match[0] === "P" ? "Piston" : "piston"));
}
