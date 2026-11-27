import messages from "./instrument-guide-locales/sv10.de.json";

const copy: Readonly<Record<string, string>> = messages;

export function getGermanSv10GuideText(value: string): string {
  const translated = copy[value];
  if (translated === undefined) throw new Error("Missing German SV10 guide translation: " + value);
  return translated;
}
