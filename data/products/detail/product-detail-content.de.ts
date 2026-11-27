import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/seo/site-url";
import { getGermanBarbedFittingContent } from "./barbed-fitting-detail.de";
import { getGermanHardTubeFittingContent } from "./hard-tube-fitting-detail.de";
import { getGermanThreadToBarbedFittingContent } from "./thread-to-barbed-fitting-detail.de";
import { getGermanRemainingFittingContent } from "./remaining-fitting-detail.de";

export type GermanProductDetailContent = {
  title: string;
  description: string;
  faqs: readonly { question: string; answer: string; drawingPreviewAnswer?: string }[];
  imageAlt?: string;
  bottomCta?: { title: string; description: string; buttonText: string; href: string };
};

const details: Partial<Record<string, GermanProductDetailContent>> = {
  "/en/products/fittings/barbed-fittings/ba-16f-pp-n": {
    title: "Gerader Schlauchverbinder mit Tüllen für gleiche Schlauchgrößen",
    description: "BA-16F-PP-N verbindet oder verlängert Schläuche gleicher Größe in einem geraden Leitungsverlauf. Beide Enden passen zu Schläuchen mit 1.6 mm Innendurchmesser. Der Verbinder eignet sich für gerade Schlauchstrecken in Geräten. Er besteht aus PP in Naturfarbe. Prüfen Sie bei der Auswahl den Schlauchwerkstoff, die Härte, die Maßtoleranzen und die Eignung unter den vorgesehenen Montagebedingungen.",
    faqs: [
      { question: "Welche Schlauchgröße passt zu BA-16F-PP-N?", answer: "Der Verbinder passt zu Schläuchen mit 1.6 mm Innendurchmesser. Prüfen Sie bei der Auswahl den tatsächlichen Innendurchmesser und den Sitz unter den vorgesehenen Montagebedingungen." },
      { question: "Wie unterscheiden sich gleich dimensionierte und reduzierende Schlauchverbinder?", answer: "Bei gleich dimensionierten Verbindern passen alle Schlauchanschlüsse zum selben Innendurchmesser. Reduzierverbinder verbinden Schläuche mit unterschiedlichen Innendurchmessern." },
      { question: "Bezieht sich die Tüllengröße auf den Innen- oder Außendurchmesser des Schlauchs?", answer: "Die Schlauchmaße auf dieser Seite beziehen sich auf den passenden Innendurchmesser. Prüfen Sie vor der Montage auch den Schlauchwerkstoff, die Härte und die Maßtoleranzen." },
      { question: "Ist PP mit dem vorgesehenen Medium verträglich?", answer: "Prüfen Sie das Fördermedium, die Betriebstemperatur, den Druck und die Reinigungsanforderungen. Bei unklarer Verträglichkeit können Sie die Betriebsbedingungen zur technischen Prüfung einreichen." },
      { question: "Kann ich eine 2D-Zeichnung für BA-16F-PP-N anfordern?", answer: "Fügen Sie das Modell Ihrer Merkliste hinzu und fordern Sie eine Zeichnung an. Unser technisches Team prüft die passende Ausführung und stellt Ihnen die Zeichnung bereit." },
    ],
  },
  "/en/products/fittings/hard-tube-fittings/hfl-m6-16-pv-n": {
    title: "Gerändeltes Flachboden-Fitting in Standardbaugröße",
    description: "HFL-M6-16-PV-N ist ein gerändeltes Flachboden-Fitting in Standardbaugröße für starre Leitungen mit 1.6 mm Außendurchmesser. Es hat ein M6×1-Gewinde und einen Grundkörper aus PVDF. Eine Flanschdichtung dichtet am Anschlussboden ab. Das Fitting eignet sich für starre Leitungen in mikrofluidischen Systemen, IVD-Geräten, Analysegeräten und der Laborautomatisierung.",
    faqs: [
      { question: "Für welchen Leitungsaußendurchmesser ist HFL-M6-16-PV-N ausgelegt?", answer: "Das Modell ist für starre Leitungen mit 1.6 mm Außendurchmesser ausgelegt. Prüfen Sie bei der Auswahl auch die Toleranz des Außendurchmessers und die Aufbereitung des Leitungsendes." },
      { question: "Welches Gewinde hat HFL-M6-16-PV-N?", answer: "Das Modell verwendet ein M6×1-Gewinde. Prüfen Sie vor der Montage, ob Gewinde und Dichtgeometrie des Geräteanschlusses zum Fitting passen." },
      { question: "Wie lässt sich die Medienverträglichkeit von PVDF prüfen?", answer: "Prüfen Sie die Verträglichkeit von PVDF anhand des Mediums, seiner Konzentration, der Temperatur, der Kontaktzeit und des Reinigungsverfahrens." },
      { question: "Was ist bei der Montage des gerändelten Flachboden-Fittings zu beachten?", answer: "Prüfen Sie vor der Montage, ob Leitungsstirnfläche, Gewinde, Dichtung und Anschlussfläche sauber und unbeschädigt sind. Ziehen Sie das Fitting nicht zu fest an." },
      { question: "Kann ich eine 2D-Zeichnung für HFL-M6-16-PV-N anfordern?", answer: "Fügen Sie das Modell Ihrer Merkliste hinzu und fordern Sie eine Zeichnung an. Unser technisches Team prüft die passende Ausführung und stellt Ihnen die Zeichnung bereit." },
    ],
  },
};

const modelTranslations = new Map<string, (slug: string) => GermanProductDetailContent | undefined>([
  ["hard-tube-fittings", getGermanHardTubeFittingContent],
  ["barbed-fittings", getGermanBarbedFittingContent],
  ["thread-to-barbed-fittings", getGermanThreadToBarbedFittingContent],
]);

export function getGermanProductDetailContent(pathname: string) {
  const path = pathname.replace(/\/+$/, "");
  const match = /^\/en\/products\/fittings\/([a-z0-9-]+)\/([a-z0-9-]+)$/.exec(path);
  if (!match) return;
  const [, family, slug] = match;
  const translation = modelTranslations.get(family)?.(slug) ?? getGermanRemainingFittingContent(family, slug);
  return translation ? { ...translation, ...details[path] } : undefined;
}
export function getGermanProductDetailMetadata(path: string, model: string): Metadata | undefined {
  const content = getGermanProductDetailContent("/en" + path);
  if (!content) return;
  const url = getCanonicalUrl("/de" + path);
  const title = model + " – " + content.title + " | FOREACH";
  return {
    title: { absolute: title },
    description: content.description,
    alternates: { canonical: url },
    robots: { index: false, follow: true },
    openGraph: { title, description: content.description, url, type: "website", locale: "de_DE" },
  };
}
