import messages from "./instrument-guide-locales/hp.de.json";

const copy: Record<string, string> = messages;

export function getGermanHpGuideText(value: string): string {
  if (!value) return value;
  const translated = copy[value];
  if (translated === undefined) throw new Error("Missing German HP guide translation: " + value);
  return translated;
}
