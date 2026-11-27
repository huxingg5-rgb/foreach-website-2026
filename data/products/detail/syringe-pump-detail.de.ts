import { getGermanSyringeSelectionCopy } from "@/data/products/selection/syringe-pump-selection.de";
import { syringePumpCardsLocales } from "@/data/products/selection/syringe-pump-cards.locales";
import { getSyringeSeriesCopy } from "@/data/products/selection/syringe-pump-series";
import { applySyringePumpDetailCopy } from "./syringe-pump-detail-copy";
import { localizeProductDetailData } from "./product-detail.intl";
import copy from "./syringe-pump-content.de.json";
import type { GermanProductDetailContent } from "./product-detail-content.de";

const labels: Readonly<Record<string, string>> = {
  "Applications": "Anwendungen", "Product Series": "Baureihe", "Stroke": "Hub", "Number of Channels": "Kanalzahl",
  "Full-Stroke Travel Time": "Verfahrzeit bei vollem Hub", "Linear Speed": "Lineargeschwindigkeit", "Resolution": "Auflösung",
  "Valve Head Material": "Werkstoff des Ventilkopfs", "Standard Port": "Standardanschluss", "Volume Range (Glass Syringe)": "Volumenbereich der Glasspritze",
  "Specification": "Spezifikation", "Valve Configuration (Solenoid Valve)": "Ventilkonfiguration (Magnetventil)",
  "Operating Pressure Range": "Betriebsdruckbereich", "Communication Type": "Kommunikationsschnittstelle",
  "Installation Dimensions (L × W × H)": "Einbaumaße (L × B × H)", "Valve Switching Time": "Ventilschaltzeit",
  "Valve Configuration": "Ventilkonfiguration", "Rotary Valve Pressure Rating": "Nenndruck des Drehschaltventils",
  "HMD3 Solenoid Valve Syringe Pump Series": "HMD3 Spritzenpumpen mit Magnetventilen",
  "HMD6 Solenoid Valve Syringe Pump Series": "HMD6 Spritzenpumpen mit Magnetventilen",
  "HLD3 Rotary Valve Syringe Pump Series": "HLD3 Spritzenpumpen mit Drehschaltventilen",
  "HLD6 / HLD6M Rotary Valve Syringe Pump Series": "HLD6 / HLD6M Spritzenpumpen mit Drehschaltventilen",
  "1 channel": "1 Kanal", "1, 2, 3, 4, 6, 8 channels Optional": "Wahlweise 1, 2, 3, 4, 6, 8 Kanäle",
  "Standard Mode: 3000 increments; Microstep Mode: 24000 increments": "Standardmodus: 3000 Schritte. Mikroschrittmodus: 24000 Schritte",
  "Standard Mode: 6000 increments; Microstep Mode: 48000 increments": "Standardmodus: 6000 Schritte. Mikroschrittmodus: 48000 Schritte",
  "Repeatability ≤0.05% (250 μL and above); ≤0.1% (100 μL and below)": "Wiederholbarkeit ≤0.05% (ab 250 μL), ≤0.1% (bis 100 μL)",
  "2 ports / 3 ports / 3 ports": "2 Anschlüsse / 3 Anschlüsse / 3 Anschlüsse",
  "-75 kPa–0.2 MPa; Distribution Valve Configuration: -75 kPa–0.1 MPa": "-75 kPa–0.2 MPa. Ausführung mit Verteilventil: -75 kPa–0.1 MPa",
  "25 μL–25 mL; with more than 1 channel, not supported 10 mL and 25 mL": "25 μL–25 mL. Bei mehr als 1 Kanal ohne 10 mL und 25 mL",
  "118 × Depends on Channel Count × 254 mm": "118 × abhängig von der Kanalzahl × 254 mm",
  "Adjacent Ports ≤250 ms": "Benachbarte Anschlüsse ≤250 ms",
  "Planar Rotary Valve / Cylindrical Rotary Valve": "Flachbauendes Drehschaltventil / zylindrisches Drehschaltventil",
  "Planar Rotary Valve: 3-way Distribution Valve; Cylindrical Rotary Valve: 3-way Non-Distribution Valve / 3-way Distribution Valve / 9-way Distribution Valve": "Flachbauendes Drehschaltventil: 3-Wege-Verteilventil. Zylindrisches Drehschaltventil: 3-Wege-Ventil ohne Verteilfunktion / 3-Wege-Verteilventil / 9-Wege-Verteilventil",
  "Planar Rotary Valve: 3-way Non-Distribution Valve / 5-way Distribution Valve / 9-way Distribution Valve; Cylindrical Rotary Valve: 3-way Non-Distribution Valve / 9-way Distribution Valve": "Flachbauendes Drehschaltventil: 3-Wege-Ventil ohne Verteilfunktion / 5-Wege-Verteilventil / 9-Wege-Verteilventil. Zylindrisches Drehschaltventil: 3-Wege-Ventil ohne Verteilfunktion / 9-Wege-Verteilventil",
  "HMD3 30 mm Solenoid Valve Syringe Pump": "HMD3, Spritzenpumpe mit Magnetventil und 30 mm Hub",
  "HMD6 60 mm Solenoid Valve Syringe Pump": "HMD6, Spritzenpumpe mit Magnetventil und 60 mm Hub",
  "HLD3 30 mm Rotary Valve Syringe Pump": "HLD3, Spritzenpumpe mit Drehschaltventil und 30 mm Hub",
  "HLD6 60 mm Rotary Valve Syringe Pump": "HLD6, Spritzenpumpe mit Drehschaltventil und 60 mm Hub",
  "FOREACH HLD3 rotary-valve syringe pump on a white background, showing the rotary valve, metering mechanism and mounting side plate": "Spritzenpumpe FOREACH HLD3 auf weißem Hintergrund mit Drehschaltventil, Dosiermechanik und seitlicher Montageplatte",
  "Syringe Pump": "Spritzenpumpe", "Syringe Pumps": "Spritzenpumpen",
};
const german: Readonly<Record<string, string>> = copy;

function translate(value: unknown): unknown {
  if (typeof value === "string") return german[value] ?? labels[value] ?? value;
  if (Array.isArray(value)) return value.map(translate);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, text]) => [key, translate(text)]));
  return value;
}

const fields = [
  "syringeIntroductionParagraphs", "specs", "specifications", "specList", "technicalSpecifications", "specificationGroups",
  "faqs", "faq", "faqItems", "faqList", "detailFaqs", "commonApplications", "applicationDetails", "imageAlt",
  "mainImageAlt", "imageAltEn", "additionalImageAlts", "productTypeName",
] as const;

export function getGermanSyringeModelHeading(slug: string): string | undefined {
  const heading = syringePumpCardsLocales.en[slug]?.heading;
  return heading && german[heading];
}

export function getGermanSyringeDetail(data: Record<string, any>) {
  const heading = getGermanSyringeModelHeading(data.slug);
  if (!heading) return undefined;
  const english = applySyringePumpDetailCopy(localizeProductDetailData(data), "en");
  const detail = { ...english, __locale: "de" } as Record<string, any>;
  for (const field of fields) if (english[field] !== undefined) detail[field] = translate(english[field]);
  const categoryParagraph = getSyringeSeriesCopy("en", 0).paragraphs[1];
  if (detail.applicationDetails?.selectionNote?.paragraphs[1] === categoryParagraph) {
    detail.applicationDetails.selectionNote.paragraphs[1] = getGermanSyringeSelectionCopy(-1).paragraphs[1];
  }
  const title = "FOREACH " + heading;
  detail.name = title;
  detail.title = title;
  detail.description = detail.syringeIntroductionParagraphs.join("\n\n");
  const presentation: GermanProductDetailContent = {
    title,
    description: detail.description,
    imageAlt: detail.imageAlt,
    faqs: detail.faqs,
    bottomCta: {
      title: "OEM-Spritzenpumpen für Ihr Fluidiksystem",
      description: "Geben Sie Spritzenvolumen, Hub, Kanalzahl, Ventilanordnung, Kommunikationsschnittstelle, Einbauraum und Anforderungen an den Fluidpfad an. Das FOREACH-Engineeringteam unterstützt Sie bei der Auswahl einer passenden Konfiguration.",
      buttonText: "Technische Beratung anfragen",
      href: "/de/contact/",
    },
  };
  return { data: detail, presentation };
}
