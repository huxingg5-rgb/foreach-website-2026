import { getCanonicalUrl } from "@/lib/seo/site-url";
import { syringePumpCardsLocales } from "../selection/syringe-pump-cards.locales";
import { italianSyringeSelectionCopy } from "../selection/syringe-pump-selection.it";
import { getSyringeModelPath } from "../selection/syringe-pump-routes";
import { getSyringeSeriesCopy } from "../selection/syringe-pump-series";
import { applySyringePumpDetailCopy } from "./syringe-pump-detail-copy";
import { localizeProductDetailData } from "./product-detail.intl";
import type { GermanProductDetailContent } from "./product-detail-content.de";
import copy from "./syringe-pump-content.it.json";

const productCopy: Readonly<Record<string, string>> = {
  ...copy,
  [getSyringeSeriesCopy("en", 0).paragraphs[1]]: italianSyringeSelectionCopy["syringe-pumps"].paragraphs[1],
  "Applications": "Applicazioni", "Product Series": "Serie", "Stroke": "Corsa", "Number of Channels": "Numero di canali",
  "Full-Stroke Travel Time": "Tempo a corsa completa", "Linear Speed": "Velocità lineare", "Resolution": "Risoluzione",
  "Valve Head Material": "Materiale della testa della valvola", "Standard Port": "Attacco standard",
  "Volume Range (Glass Syringe)": "Intervallo di volume (siringa di vetro)", "Specification": "Specifiche",
  "Valve Configuration (Solenoid Valve)": "Configurazione delle elettrovalvole", "Operating Pressure Range": "Intervallo di pressione di esercizio",
  "Communication Type": "Interfacce di comunicazione", "Installation Dimensions (L × W × H)": "Dimensioni di montaggio (L × P × H)",
  "Valve Switching Time": "Tempo di commutazione della valvola", "Valve Configuration": "Configurazione della valvola",
  "Rotary Valve Pressure Rating": "Pressione nominale della valvola rotativa",
  "HMD3 Solenoid Valve Syringe Pump Series": "Pompe a siringa HMD3 con elettrovalvole",
  "HMD6 Solenoid Valve Syringe Pump Series": "Pompe a siringa HMD6 con elettrovalvole",
  "HLD3 Rotary Valve Syringe Pump Series": "Pompe a siringa HLD3 con valvole rotative",
  "HLD6 / HLD6M Rotary Valve Syringe Pump Series": "Pompe a siringa HLD6 / HLD6M con valvole rotative",
  "1 channel": "1 canale", "1, 2, 3, 4, 6, 8 channels Optional": "A scelta 1, 2, 3, 4, 6, 8 canali",
  "Standard Mode: 3000 increments; Microstep Mode: 24000 increments": "Modalità standard: 3000 incrementi. Modalità a micropassi: 24000 incrementi",
  "Standard Mode: 6000 increments; Microstep Mode: 48000 increments": "Modalità standard: 6000 incrementi. Modalità a micropassi: 48000 incrementi",
  "Repeatability ≤0.05% (250 μL and above); ≤0.1% (100 μL and below)": "Ripetibilità ≤0.05% (da 250 μL in su), ≤0.1% (fino a 100 μL)",
  "2 ports / 3 ports / 3 ports": "2 attacchi / 3 attacchi / 3 attacchi",
  "-75 kPa–0.2 MPa; Distribution Valve Configuration: -75 kPa–0.1 MPa": "-75 kPa–0.2 MPa. Configurazione con valvola di distribuzione: -75 kPa–0.1 MPa",
  "25 μL–25 mL; with more than 1 channel, not supported 10 mL and 25 mL": "25 μL–25 mL. Le siringhe da 10 mL e 25 mL non sono supportate con più di 1 canale",
  "118 × Depends on Channel Count × 254 mm": "118 × in base al numero di canali × 254 mm",
  "Adjacent Ports ≤250 ms": "Attacchi adiacenti ≤250 ms",
  "Planar Rotary Valve / Cylindrical Rotary Valve": "Valvola rotativa piana / Valvola rotativa cilindrica",
  "Planar Rotary Valve: 3-way Distribution Valve; Cylindrical Rotary Valve: 3-way Non-Distribution Valve / 3-way Distribution Valve / 9-way Distribution Valve": "Valvola rotativa piana: valvola di distribuzione a 3 vie. Valvola rotativa cilindrica: valvola a 3 vie senza distribuzione / valvola di distribuzione a 3 vie / valvola di distribuzione a 9 vie",
  "Planar Rotary Valve: 3-way Non-Distribution Valve / 5-way Distribution Valve / 9-way Distribution Valve; Cylindrical Rotary Valve: 3-way Non-Distribution Valve / 9-way Distribution Valve": "Valvola rotativa piana: valvola a 3 vie senza distribuzione / valvola di distribuzione a 5 vie / valvola di distribuzione a 9 vie. Valvola rotativa cilindrica: valvola a 3 vie senza distribuzione / valvola di distribuzione a 9 vie",
  "HMD3 30 mm Solenoid Valve Syringe Pump": "Pompa a siringa HMD3 con elettrovalvole e corsa di 30 mm",
  "HMD6 60 mm Solenoid Valve Syringe Pump": "Pompa a siringa HMD6 con elettrovalvole e corsa di 60 mm",
  "HLD3 30 mm Rotary Valve Syringe Pump": "Pompa a siringa HLD3 con valvola rotativa e corsa di 30 mm",
  "HLD6 60 mm Rotary Valve Syringe Pump": "Pompa a siringa HLD6 con valvola rotativa e corsa di 60 mm",
  "FOREACH HLD3 rotary-valve syringe pump on a white background, showing the rotary valve, metering mechanism and mounting side plate": "Pompa a siringa FOREACH HLD3 su fondo bianco, con valvola rotativa, meccanismo di dosaggio e piastra laterale di montaggio",
  "Syringe Pump": "Pompa a siringa", "Syringe Pumps": "Pompe a siringa",
};

export const italianSyringeDetailText = (english: string) => productCopy[english] ?? english;

function translate(value: unknown): unknown {
  if (typeof value === "string") return italianSyringeDetailText(value);
  if (Array.isArray(value)) return value.map(translate);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, text]) => [key, translate(text)]));
  return value;
}

const fields = [
  "syringeIntroductionParagraphs", "specs", "specifications", "specList", "technicalSpecifications", "specificationGroups",
  "faqs", "faq", "faqItems", "faqList", "detailFaqs", "commonApplications", "applicationDetails", "imageAlt",
  "mainImageAlt", "imageAltEn", "additionalImageAlts", "productTypeName",
] as const;

export function getItalianSyringeModelHeading(slug: string): string | undefined {
  const heading = syringePumpCardsLocales.en[slug]?.heading;
  return heading && productCopy[heading];
}

export function getItalianSyringeDetail(data: Record<string, any>) {
  const heading = getItalianSyringeModelHeading(data.slug);
  if (!heading) return undefined;
  const english = applySyringePumpDetailCopy(localizeProductDetailData(data), "en");
  const detail: Record<string, any> = { ...english, __locale: "it" };
  for (const field of fields) if (english[field] !== undefined) detail[field] = translate(english[field]);
  detail.description = detail.syringeIntroductionParagraphs.join("\n\n");
  detail.summary = detail.description;
  detail.overview = detail.description;
  const presentation: GermanProductDetailContent = {
    title: heading.replace("Pompa a siringa", "Pompa a siringa FOREACH"),
    description: detail.description,
    imageAlt: detail.imageAlt,
    faqs: detail.faqs,
    bottomCta: {
      title: "Pompe a siringa configurate per il vostro circuito fluidico",
      description: "Indicate capacità della siringa, corsa, numero di canali, configurazione delle valvole, interfaccia di comunicazione, spazio di montaggio e requisiti del circuito fluidico. Il team tecnico FOREACH vi aiuterà a scegliere una configurazione adatta.",
      buttonText: "Invia una richiesta di personalizzazione",
      href: "/it/contact/",
    },
  };
  return { data: detail, presentation };
}

export function getItalianSyringeModelMetadata(slug: string, model: string) {
  const heading = getItalianSyringeModelHeading(slug);
  const path = getSyringeModelPath("it", slug);
  if (!heading || !path) return {};
  const title = model.toUpperCase() + " | " + heading + " | FOREACH";
  const url = getCanonicalUrl(path);
  return {
    title: { absolute: title }, description: heading, alternates: { canonical: url },
    robots: { index: false, follow: true },
    openGraph: { type: "website" as const, locale: "it_IT", url, title, description: heading },
    twitter: { card: "summary" as const, title, description: heading },
  };
}
