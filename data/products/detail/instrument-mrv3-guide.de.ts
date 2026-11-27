import messages from "./instrument-guide-locales/mrv3.de.json";

const copy: Readonly<Record<string, string>> = messages;

export function getGermanMrv3GuideText(value: string): string {
  const translated = copy[value];
  if (translated === undefined) throw new Error("Missing German MRV3 guide translation: " + value);
  return translated;
}
