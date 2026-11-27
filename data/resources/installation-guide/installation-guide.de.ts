import type { InstallationGuidePageData } from "./installation-guide.types";
import type { VideoGuideDetail, VideoGuideLink } from "./video-guide-detail.types";
import { germanInstallationGuideSlugs } from "./german-installation-guide-routes";
import { germanVideoCopy } from "./video-guide-copy.de";
import { germanVideoSections } from "./video-guide-sections.de";
import { germanVideoIntros } from "./video-guide-intros.de";
import { isLocalizedGermanDraftPath } from "@/lib/i18n/draft-languages";
import { germanFittingDraftPathPattern } from "@/data/products/detail/german-fitting-draft-routes";

const productLinks: Record<string, string> = {
  "2-Way Miniature Solenoid Valves": "2-Wege-Miniatur-Magnetventile",
  "3-Way Miniature Solenoid Valves": "3-Wege-Miniatur-Magnetventile",
  "View the SV10 series →": "Baureihe SV10 ansehen →",
  "Explore piston pump configurations": "Kolbenpumpen-Konfigurationen vergleichen",
  "Browse instrument tubing by material": "Geräteschläuche nach Werkstoff ansehen",
  "Browse quick-connect fittings and mating options": "Schnellkupplungen und passende Gegenstücke ansehen",
  "View all quick-connect fittings": "Alle Schnellkupplungen ansehen",
  "View available filter products": "Verfügbare Filter ansehen",
  "View thread-to-barbed fittings": "Gewinde-Schlauchtüllen ansehen",
  "View rigid tubing fittings": "Fittings für starre Rohre ansehen",
  "HLD6 Rotary Valve Syringe Pump": "Spritzenpumpe HLD6 mit Drehventil",
  "View syringe pumps →": "Spritzenpumpen ansehen →",
  "Quick-Connect Fittings": "Schnellkupplungen",
  "View all quick-connect fittings →": "Alle Schnellkupplungen ansehen →",
  "Female Thread Adapters and Connectors": "Innengewindeadapter und Verbinder",
  "ABD Air Bubble Detection Module": "Luftblasendetektor ABD",
  "Compare miniature liquid diaphragm pumps": "Miniatur-Flüssigkeitsmembranpumpen vergleichen",
  "Explore pumps for gas-liquid handling and waste aspiration": "Pumpen für Gas-Flüssigkeits-Förderung und Abfallabsaugung ansehen",
  "Sampling Probes for Liquid Handling": "Entnahmesonden für die Flüssigkeitshandhabung",
  "SMTP2 Programmable Pipetting Modules": "Programmierbare Pipettiermodule SMTP2",
  "Explore the complete fluid-control product range": "Gesamtes Fluidiksortiment ansehen",
  "Read about FOREACH": "Mehr über FOREACH erfahren",
  "Compare a two-wire brushless pump interface": "Schnittstelle einer bürstenlosen 2-Leiter-Pumpe vergleichen",
  "Review five-wire PWM and feedback functions": "PWM und Rückmeldung bei 5-Leiter-Anschluss ansehen",
  "Review diaphragm pump installation precautions": "Montagehinweise für Membranpumpen lesen",
  "Prevent hose-barb damage during tubing installation": "Schlauchtüllen bei der Montage schützen",
  "Watch the gas-liquid pump vacuum test": "Vakuumtest der Gas-Flüssigkeits-Pumpe ansehen",
  "Choose a pump motor for your duty cycle and controls": "Pumpenmotor nach Arbeitszyklus und Ansteuerung auswählen",
  "Review brush wear, cleanliness and EMI considerations": "Bürstenverschleiß, Sauberkeit und EMV vergleichen",
  "Compare standard- and high-pressure liquid pump selection": "Flüssigkeitspumpen für Standard- und Hochdruck vergleichen",
  "Polyvinyl Chloride (PVC) Tubing": "Schlauch aus Polyvinylchlorid (PVC)",
  "Thermoplastic Polyurethane (TPU) Tubing": "Schlauch aus thermoplastischem Polyurethan (TPU)",
  "Fluorinated Ethylene Propylene (FEP) Tubing": "Schlauch aus Fluorethylenpropylen (FEP)",
  "Polytetrafluoroethylene (PTFE) Tubing": "Schlauch aus Polytetrafluorethylen (PTFE)",
  "Polyether Ether Ketone (PEEK) Tubing": "Schlauch aus Polyetheretherketon (PEEK)",
  "Flanged Tubing Assemblies": "Leitungsbaugruppen mit Bördelanschluss",
  "Ferrule Tubing Assemblies": "Leitungsbaugruppen mit Klemmkonus",
  "HLD3 Rotary Valve Syringe Pump": "Spritzenpumpe HLD3 mit Drehventil",
  "HMD6 Solenoid Valve Syringe Pump": "Spritzenpumpe HMD6 mit Magnetventil",
  "HMD3 Solenoid Valve Syringe Pump": "Spritzenpumpe HMD3 mit Magnetventil",
  "ABD Air Bubble Detector": "Luftblasendetektor ABD",
  "PDM5 Pressure Sensor": "Drucksensor PDM5",
};

const support = {
  title: "Anforderungen an Ihren Flüssigkeitskreislauf besprechen",
  description: "Teilen Sie uns Flüssigkeit, erforderlichen Volumenstrom und Druck, Arbeitszyklus, Anschlüsse und Steuerschnittstelle mit. Wir prüfen eine geeignete Konfiguration.",
};

const specificSupport: Record<string, typeof support> = {
  "sv10-solenoid-valve-overview": {
    title: "Suchen Sie ein Ventil für Ihren Flüssigkeitskreislauf?",
    description: "Nennen Sie uns Medium, Arbeitsdruck, Temperatur, gewünschte Anschlüsse und Versorgungsspannung, damit wir eine passende SV10-Ausführung prüfen können.",
  },
  "youtube-syringe-installation": {
    title: "Benötigen Sie Hilfe beim Einbau der Spritze?",
    description: "Teilen Sie uns Pumpenmodell, Spritzengröße und Einbausituation mit, damit wir die passende Montageanleitung bestätigen können.",
  },
  "youtube-q60-quick-fitting": {
    title: "Suchen Sie ein passendes Schnellkupplungspaar?",
    description: "Nennen Sie uns Schlauchmaße, Medium, Betriebsdruck, Einbausituation und gewünschte Absperrfunktion.",
  },
  "youtube-female-thread-conversion": {
    title: "Möchten Sie zwei Flüssigkeitsanschlüsse verbinden?",
    description: "Teilen Sie uns beide Gewindespezifikationen, Dichtgeometrien, Werkstoffanforderungen und den verfügbaren Einbauraum mit.",
  },
  "youtube-bubble-detection-module": {
    title: "Integrieren Sie eine Luftblasenerkennung in Ihr Gerät?",
    description: "Nennen Sie uns Schlauchwerkstoff und -maße, Flüssigkeit, erwartete Blasen und die benötigte Steuerungsschnittstelle.",
  },
};

const videoCaptions: Record<string, string> = {
  "sv10-solenoid-valve-overview": "Produktüberblick zur Baureihe SV10",
  "youtube-piston-pump-liquid-dispensing": "Kolbenpumpen EA und Einsatz in der Flüssigkeitshandhabung",
  "youtube-flexible-tubing-laboratory-fluid-lines": "Transparente Schläuche, Schlauchenden und Biegeprobe",
  "youtube-quick-connect-sealing-compatibility": "Schnellkupplungshälften und manuelles Verbinden",
  "youtube-quick-connect-coupling-types": "Schnellkupplungen mit Nennweiten von 1/8, 1/4 und 3/8 Zoll",
  "youtube-f-ss-water-circulation-filter": "Wasserfilter F-SS für Umwälzkreisläufe",
  "youtube-thread-to-barb-fittings": "Gewinde-Schlauchtüllen für flexible Schläuche und Gewindeanschlüsse",
  "youtube-rigid-tubing-fittings": "Fittings für starre Rohre in Fluidsystemen",
  "youtube-syringe-installation": "Montage einer Spritze in der HLD6",
  "youtube-q60-quick-fitting": "Schnellkupplungen Q60 im Überblick",
  "youtube-female-thread-conversion": "Innengewindeadapter im Überblick",
  "youtube-bubble-detection-module": "Luftblasendetektor ABD im Überblick",
  "youtube-dpl30-vs-dpl30h": "Flüssigkeits-Membranpumpen DPL30 und DPL30H im Vergleich",
  "youtube-dpgl800-vacuum-test": "Vakuumprüfung mit der Doppelpumpe DPGL800",
  "youtube-dpl-series-introduction": "Flüssigkeits-Membranpumpen der Baureihe DPL",
  "youtube-lld-liquid-level-detection": "Flüssigkeitsstanderkennung (LLD) beim automatisierten Pipettieren",
  "youtube-about-foreach": "FOREACH und Fluidikkomponenten im Überblick",
  "youtube-dpl60-brushed-pressure-test": "Druckprüfung der DPL60 mit Bürstenmotor",
  "youtube-dpl60-brushed-flow-rate-test": "Flüssigkeitsförderung der DPL60 mit Bürstenmotor",
  "youtube-dpl60-brushless-flow-rate-test": "Flüssigkeitsförderung der bürstenlosen DPL60",
  "youtube-dpl30-brushed-pressure-test": "Druckprüfung der DPL30 mit Bürstenmotor",
  "youtube-dpl30-brushless-pressure-test": "Druckprüfung der bürstenlosen DPL30",
  "youtube-dpl30-brushless-flow-rate-test": "Flüssigkeitsförderung der bürstenlosen DPL30",
  "youtube-dpl30-brushed-flow-rate-test": "Flüssigkeitsförderung der DPL30 mit Bürstenmotor",
  "youtube-five-wire-brushless-control-wires": "Steuerfunktionen der bürstenlosen DPL60 mit 5 Leitungen",
  "youtube-two-wire-brushless-diaphragm-pump": "Bürstenlose DPL60 mit 2 Leitungen",
  "youtube-diaphragm-pump-hose-barb-protection": "Schlauchmontage und Schutz der Schlauchtülle",
  "youtube-diaphragm-pump-placement-stability": "Vorsprung am Motorgehäuse und vorgesehene Pumpenmontage",
  "youtube-diaphragm-installation": "Einbauvarianten und Montagehinweise für Membranpumpen",
  "youtube-800-series-gas-liquid": "Gas-Flüssigkeits-Membranpumpe DPGL800 im Überblick",
  "youtube-brushed-vs-brushless-lifespan": "Motorverschleiß, Sauberkeit und elektrische Integration",
  "youtube-60-series-pressure": "Druckprüfung der Baureihe DPL60",
  "youtube-motor-selection": "Motorauswahl für Membranpumpen",
  "youtube-30h-series-pressure": "Druckprüfung der Baureihe DPL30H",
  "youtube-diaphragm-selection": "Auswahl von Miniatur-Membranpumpen",
};

export function germanGuideLink(link: { title: string; href: string }, title = productLinks[link.title] ?? link.title) {
  const candidate = link.href.replace(/^\/en(?=\/|[?#]|$)/, "/de");
  const path = candidate.split(/[?#]/, 1)[0];
  const guideSlug = path.match(/^\/de\/resources\/installation-guide\/([^/]+)\/?$/)?.[1];
  const localized = Boolean(guideSlug && germanInstallationGuideSlugs.includes(guideSlug)) ||
    isLocalizedGermanDraftPath(path, germanFittingDraftPathPattern);
  return { title: localized || !candidate.startsWith("/de/") ? title : title + " (Englisch)", href: localized ? candidate : link.href };
}

function germanGuideSectionLink(source: VideoGuideLink, title?: string): VideoGuideLink {
  const link = germanGuideLink(source, title);
  if (!source.href.startsWith("/en/resources/technical-articles/")) return link;
  return { ...link, hrefLang: link.href.startsWith("/de/") ? "de" : "en" };
}

function germanYouTubeEmbedUrl(url: string) {
  const embed = new URL(url);
  embed.searchParams.set("hl", "de");
  embed.searchParams.set("cc_lang_pref", "de");
  return embed.href;
}

export function getGermanVideoGuideDetail(base: VideoGuideDetail | undefined): VideoGuideDetail | undefined {
  if (!base) return undefined;
  const copy = germanVideoCopy[base.id];
  if (!copy) return undefined;
  const extra = germanVideoSections[base.id];
  const intro = germanVideoIntros[base.id];
  const duration = base.duration.match(/^PT(?:(\d+)M)?(?:(\d+)S)?$/);
  const minutes = Number(duration?.[1] ?? 0);
  const seconds = Number(duration?.[2] ?? 0);
  const durationLabel = [minutes ? minutes + (minutes === 1 ? " Minute" : " Minuten") : "",
    seconds ? seconds + (seconds === 1 ? " Sekunde" : " Sekunden") : ""].filter(Boolean).join(" ");
  return {
    ...base,
    locale: "de",
    title: copy.title,
    seoTitle: copy.title + " | FOREACH",
    description: copy.description,
    detailHref: base.detailHref.replace(/^\/en\//, "/de/"),
    embedUrl: germanYouTubeEmbedUrl(base.embedUrl),
    breadcrumbLabel: copy.title,
    durationLabel,
    lead: undefined,
    leadParagraphs: extra?.leadParagraphs,
    media: extra?.media,
    watchHeading: "Video ansehen",
    caption: videoCaptions[base.id] + (extra ? " · Sprechertext auf Englisch" : " · Originalvideo"),
    highlightsHeading: "Wichtige Punkte aus dem Video",
    highlightsIntroduction: extra?.highlightsIntroduction ?? intro?.[0] ?? copy.description,
    highlights: base.highlights.map((item, index) => ({
      ...item, title: copy.highlights[index][0], description: copy.highlights[index][1],
    })),
    sections: extra?.sections.map((section, index) => ({
      id: base.sections![index].id,
      title: section.title,
      paragraphs: section.paragraphs,
      links: base.sections![index].links?.map(link => germanGuideSectionLink(link, section.linkTitle)),
    })),
    keywords: [copy.title, ...copy.highlights.map(([title]) => title)],
    productHeading: extra?.productHeading ?? "Passende Produkte und weiterführende Informationen",
    productIntroduction: intro?.[1] ?? "Vergleichen Sie die verfügbaren Ausführungen anhand der technischen Daten und der Anforderungen Ihrer Anwendung.",
    products: base.products.map(link => germanGuideLink(link)),
    seriesLink: base.seriesLink ? germanGuideLink(base.seriesLink) : undefined,
    support: extra?.support ?? specificSupport[base.id] ?? support,
  };
}

const treeNames: Record<string, string> = {
  all: "Alle Anleitungen", fittings: "Fittings und Leitungsanschlüsse", pumps: "Pumpen",
  "plunger-pump": "Kolbenpumpen", "diaphragm-pump": "Membranpumpen", "valveless-pump": "Ventillose Dosierpumpen",
  "syringe-pump": "Spritzenpumpen", "high-pressure-pump": "Hochdruckpumpen",
  valves: "Ventile", "rotary-valve": "Drehventile", "solenoid-valve": "Magnetventile",
  "high-pressure-valve": "Hochdruckventile", "pinch-valve": "Quetschventile", sensors: "Sensoren",
  "quality-control": "Qualitätskontrolle", needles: "Sonden und Nadeln", company: "Über FOREACH",
};

const tags: Record<string, string> = {
  "Solenoid valves": "Magnetventile", "Product overview": "Produktüberblick", "Piston pump dispensing": "Dosieren mit Kolbenpumpen",
  "Laboratory tubing": "Laborschläuche", "Quick-connect sealing": "Abdichtung von Schnellkupplungen",
  "Quick-connect fitting sizes": "Schnellkupplungsgrößen", "Water filtration": "Wasserfiltration",
  "Thread-to-barb fittings": "Gewinde-Schlauchtüllen", "Rigid tubing fittings": "Fittings für starre Rohre",
  "Syringe installation": "Spritzenmontage", "Quick fittings": "Schnellkupplungen", "Thread adapters": "Gewindeadapter",
  "Bubble detection": "Luftblasenerkennung", "Pump selection": "Pumpenauswahl", "Pump Selection": "Pumpenauswahl", "Vacuum test": "Vakuumtest",
  "Liquid level detection": "Flüssigkeitsstanderkennung", "Company overview": "Unternehmensüberblick",
  "Brushed Motor": "Bürstenmotor", "Brushless Motor": "Bürstenloser Motor", "Pressure Test": "Druckprüfung",
  "Flow Rate Test": "Volumenstromprüfung", "Flow Performance": "Förderleistung",
  "5-Wire Motor": "5-Leiter-Motor", "2-Wire Motor": "2-Leiter-Motor", "Control Wires": "Steuerleitungen", "Hose Barb": "Schlauchtülle",
  "Installation": "Installation", "Diaphragm Pump": "Membranpumpe", "Mounting": "Montage", "Stability": "Stabilität",
  "Precautions": "Sicherheitshinweise", "800 Series": "Serie 800", "Gas-Liquid Pump": "Gas-Flüssigkeits-Pumpe",
  "Service Life": "Lebensdauer", "60 Series": "Serie 60", "Motor Selection": "Motorauswahl",
  "30H Series": "Serie 30H", "Pressure Resistance": "Druckfestigkeit", "Application": "Anwendung",
};

export function getGermanInstallationGuidePageData(english: InstallationGuidePageData): InstallationGuidePageData {
  return {
    ...english,
    locale: "de",
    ui: {
      breadcrumbAriaLabel: "Brotkrümelnavigation", breadcrumbHome: "Startseite", breadcrumbResources: "Ressourcen",
      breadcrumbCurrent: "Installationsanleitungen", productCategory: "Produktkategorie", tags: "Schlagwörter",
      emptyTitle: "Keine passenden Anleitungen", emptyDescription: "Ändern Sie den Suchbegriff oder wählen Sie eine andere Kategorie.",
    },
    hero: {
      kicker: "INSTALLATIONSANLEITUNGEN",
      title: "Anleitungen zur Installation und Bedienung",
      description: "Hier finden Sie Montageanleitungen, Hinweise zur Einrichtung, Kalibrierverfahren und Hilfe bei Störungen für mikrofluidische Produkte von FOREACH.",
    },
    search: {
      placeholder: "Produktname oder Modell eingeben", buttonText: "Suchen", recentLabel: "Letzte Suchanfragen",
      recentKeywords: ["Kolbenpumpe", "Q20", "Magnetventil", "Hochdruckventil", "Drucksensor"],
    },
    sidebar: {
      title: "Produktbaureihen",
      tree: english.sidebar.tree.map(item => ({
        ...item, name: treeNames[item.id],
        children: item.children.map(child => ({ ...child, name: treeNames[child.id] })),
      })),
    },
    support: {
      title: "Benötigen Sie eine weitere Anleitung?",
      description: "Nennen Sie uns Produktmodell, Anwendung oder Problem. Das technische Team von FOREACH hilft Ihnen bei Installation, Inbetriebnahme und Parametereinstellung.",
      buttonText: "Anleitung anfragen", href: "/de/contact/",
    },
    guides: english.guides.filter(guide => germanVideoCopy[guide.id]).map(guide => {
      const copy = germanVideoCopy[guide.id];
      const guideTags = guide.tags.map(tag => tags[tag] ?? tag);
      return {
        ...guide,
        title: copy.title,
        description: copy.description,
        tags: guideTags,
        keywords: [...new Set([copy.title, ...guideTags, ...copy.highlights.map(([title]) => title), ...guide.keywords])],
        detailHref: guide.detailHref?.replace(/^\/en\//, "/de/"),
        videoUrl: guide.videoUrl?.startsWith("https://www.youtube.com/embed/")
          ? germanYouTubeEmbedUrl(guide.videoUrl) : guide.videoUrl,
      };
    }),
  };
}
