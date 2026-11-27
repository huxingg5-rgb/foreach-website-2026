import type { CompactSearchItem, SearchModule } from "@/components/search/global-search-index";
import { germanChemicalNames, germanMaterialFeatures } from "@/data/resources/material-compatibility/material-compatibility.de";
import { getInstallationGuidePageData } from "@/services/resources/installation-guide/getInstallationGuidePageData";
import { getNewsPageData } from "@/services/resources/news/getNewsPageData";
import { getGermanTechnicalArticlesPageData } from "@/services/resources/technical-articles/getGermanTechnicalArticlesPageData";
import { getGermanDatasheetSearchItems } from "./getGermanDatasheetSearchItems";

const pages = [
  ["/resources/", "Ressourcen", "Datenblätter, Auswahlhilfen, Anleitungen, Fachartikel und Nachrichten von FOREACH.", "Resources Resource Center"],
  ["/resources/datasheets/", "Datenblätter", "Technische Daten und Dokumente zu FOREACH-Produkten.", "Datasheets data sheets Spezifikationen Spezifikationsblätter Datenblaetter"],
  ["/resources/faq/", "Häufig gestellte Fragen", "Antworten zu Produkten, Modellen und typischen Anwendungen.", "FAQ Frequently Asked Questions Fragen und Antworten"],
  ["/resources/calculators/fluid-resistance/", "Druckverlustrechner", "Strömungswiderstand, Druckverlust und Volumenstrom im Flüssigkeitskreislauf berechnen.", "Fluid Resistance Calculator Strömungswiderstand Durchfluss"],
  ["/resources/selection-support/fitting-replacement/", "Vergleich von Fluidik-Fittings", "Anschlussmodelle und passende Alternativen für die Produktauswahl finden.", "Fitting Replacement Ersatz Suche Schnellkupplungen"],
  ["/resources/installation-guide/", "Installationsanleitungen", "Anleitungen zur Installation, Inbetriebnahme, Bedienung und Fehlersuche.", "Installation Guides Usage Guides Video Montage"],
  ["/resources/material-compatibility/", "Werkstoffverträglichkeit", "Informationen über chemische Beständigkeit, Werkstoffeigenschaften und Konformität.", "Material Compatibility Materialverträglichkeit"],
  ["/resources/technical-articles/", "Fachartikel", "Technische Beiträge zu Mikrofluidik, Produktauswahl und Anwendungen.", "Technical Articles technische Artikel"],
  ["/resources/news/", "Unternehmensnachrichten", "Messen, Unternehmensmeldungen und wichtige Mitteilungen von FOREACH.", "Company News Nachrichten"],
  ["/privacy-policy/", "Datenschutzerklärung", "Informationen über Anfragen, Cookies und die Verwendung von Nutzungsdaten.", "Privacy Policy Cookie-Einstellungen"],
] as const;

function indexItem(
  module: SearchModule,
  href: string,
  title: string,
  description: string,
  keywords: readonly string[] = [],
  image?: string,
): CompactSearchItem {
  return {
    m: module,
    h: href,
    t: title,
    d: description,
    i: image,
    x: [title, description, ...keywords].join(" "),
    k: keywords.join(" "),
    g: true,
  };
}

export function getGermanResourceSearchOverlay(): CompactSearchItem[] {
  const articles = getGermanTechnicalArticlesPageData().articles;
  const guides = getInstallationGuidePageData("de").guides;
  const news = getNewsPageData("de").articles;
  const compatibilityPath = "/resources/material-compatibility";
  return [
    ...pages.map(([href, title, description, keywords]) => indexItem("pages", href, title, description, [keywords])),
    ...getGermanDatasheetSearchItems().map(item => indexItem(
      "datasheets", item.href, item.title, item.description ?? "", item.keywords, item.image,
    )),
    indexItem("material-compatibility", compatibilityPath, "Werkstoffverträglichkeit", "Referenzdaten zu chemischer Beständigkeit und Werkstoffen.", ["Material Compatibility"]),
    ...Object.entries(germanMaterialFeatures).map(([code, copy]) => indexItem(
      "material-compatibility", compatibilityPath + "?tab=features&q=" + encodeURIComponent(code),
      code + " – " + copy.name, copy.feature, [code, copy.application, "Werkstoffverträglichkeit"],
    )),
    ...Object.entries(germanChemicalNames).map(([english, german]) => indexItem(
      "material-compatibility", compatibilityPath + "?tab=compatibility&q=" + encodeURIComponent(english),
      german, "Beständigkeit der verfügbaren Werkstoffe gegenüber diesem Medium prüfen.", [english, "Werkstoffverträglichkeit"],
    )),
    ...articles.map(article => indexItem(
      "technical-articles", "/resources/technical-articles/" + article.slug + "/",
      article.title, article.summary, article.tags, article.coverImage,
    )),
    ...guides.flatMap(guide => guide.detailHref ? [indexItem(
      "installation-guides", guide.detailHref, guide.title, guide.description, guide.keywords, guide.thumbnail,
    )] : []),
    ...news.map(article => indexItem(
      "news", "/resources/news/" + article.slug + "/", article.title, article.summary, [article.date], article.coverImage,
    )),
  ];
}
