import { buildContactIntlData, getContactIntlData, type ContactIntlText } from "./contact.intl";
import type { ContactPageData } from "./types";

const requestTypes = {
  quotation: "Produktanfrage und Angebot",
  documents: "Unterlagen und Zeichnungen",
  selection: "Technische Beratung und Produktauswahl",
  sample: "Musterprüfung",
  afterSales: "Kundendienst und Qualitätsrückmeldungen",
  other: "Sonstige Anfrage",
};

const address =
  "13. Etage, Gebäude 2, Yufengda Industrial Park, 1008 Guangqiao Avenue, Bezirk Guangming, Shenzhen, China";

const copy: ContactIntlText = {
  seoTitle: "Kontakt | Foreach Technology",
  seoDescription:
    "Kontaktieren Sie Foreach zur Produktauswahl, technischen Beratung, Musterprüfung, für Zeichnungen, zur Stücklistenprüfung und zur Abstimmung mikrofluidischer Projekte.",

  heroTitleFirstLine: "Kontakt zu Foreach",
  heroTitlePrefix: "für",
  heroHighlightText: "Produktauswahl",
  heroTitleSuffix: "und technische Beratung",
  heroImageAlt: "Technische Beratung und Zusammenarbeit für Mikrofluidikprodukte von Foreach",

  supportTitle: "So unterstützen wir Sie",
  supportDescription:
    "Foreach begleitet Sie von der ersten Bewertung bis zur Projekteinführung. Dazu gehören Produktauswahl, Unterlagen, Musterprüfungen, die Abstimmung von Lösungen, kundenspezifische Anforderungen und Rückmeldungen nach dem Kauf.",
  supportItems: [
    {
      title: "Beratung zur Produktauswahl",
      description:
        "Wir empfehlen geeignete Produkte anhand von Durchfluss, Druck, Medium, Schnittstellen, Lebensdauer, Ansteuerung und Einbauanforderungen.",
      requestType: requestTypes.selection,
    },
    {
      title: requestTypes.documents,
      description:
        "Fordern Sie Datenblätter, Produktkataloge, Einbaumaße und Informationen zu Schnittstellen und zur Produktauswahl an.",
      requestType: requestTypes.documents,
    },
    {
      title: "Unterstützung bei Musterprüfungen",
      description:
        "Wir unterstützen Sie bei der Musterprüfung, der Bestätigung von Parametern und der Auswertung von Anwendungstests, um Risiken bei der frühen Auswahl zu verringern.",
      requestType: requestTypes.sample,
    },
    {
      title: "Abstimmung von Fluidiklösungen",
      description:
        "Besprechen Sie mit uns, wie sich Pumpen, Ventile, Schläuche, Sensoren und weitere Fluidikkomponenten kombinieren lassen.",
      requestType: requestTypes.selection,
    },
    {
      title: "Kundenspezifische Anforderungen",
      description:
        "Klären Sie mit uns die Machbarkeit besonderer Anforderungen an Bauform, Schnittstellen, Werkstoffe oder Ansteuerung.",
      requestType: requestTypes.quotation,
    },
    {
      title: "Kundendienst",
      description:
        "Wir unterstützen Sie bei Einbau und Betrieb, geben Hinweise zur Wartung und nehmen Rückmeldungen zu Störungen und Qualität entgegen.",
      requestType: requestTypes.afterSales,
    },
  ],

  formTitle: "Anfrage senden",
  formDescription: "Geben Sie Ihren Namen, den Firmennamen und Ihre E-Mail-Adresse ein. Alle weiteren Felder sind optional.",
  formPanelTitle: "Anfrageformular",
  fileTip: "Sie können Zeichnungen, PDFs, Stücklisten, Bilder und weitere Dokumente anhängen. Pro Datei sind höchstens 20 MB möglich.",
  submitButton: "Anfrage senden",
  uploadButton: "Dateien hochladen",

  emailLabel: "E-Mail-Adresse",
  emailPlaceholder: "Geben Sie Ihre E-Mail-Adresse ein",
  emailSendButton: "Code senden",
  emailCodePlaceholder: "Bestätigungscode eingeben",
  emailVerifyButton: "Bestätigen",
  emailTip: "Die E-Mail-Adresse muss bestätigt werden.",
  emailCodeSentTip: "Bestätigungscode gesendet. Testcode: ",
  emailInvalidCodeTip: "Der Bestätigungscode ist falsch. Testcode: ",
  emailVerifiedTip: "E-Mail-Adresse bestätigt.",

  nameLabel: "Name",
  namePlaceholder: "Geben Sie Ihren Namen ein",
  companyLabel: "Firmenname",
  companyPlaceholder: "Geben Sie Ihren Firmennamen ein",
  phoneLabel: "Telefon / WhatsApp",
  phonePlaceholder: "Optional für eine schnellere Kontaktaufnahme",
  targetModelLabel: "Modell / Wettbewerbsmodell",
  targetModelPlaceholder: "Gewünschtes Modell oder zu ersetzendes Wettbewerbsmodell",
  messageLabel: "Beschreibung der Anforderungen",
  messagePlaceholder: "Beschreiben Sie bitte Ihre Anwendung, das gewünschte Produkt, die wichtigsten Parameter oder die benötigten Unterlagen.",

  optionalLabel: "(freiwillig)",
  requestTypeLabel: "Art der Anfrage",
  productTypeLabel: "Gewünschtes Produkt / Komponentenart",
  projectStageLabel: "Aktuelle Phase",

  productTypePlaceholder: "Wählen Sie die Hauptproduktart",
  projectStagePlaceholder: "Wählen Sie die aktuelle Phase",

  removeFile: "Entfernen",
  emailVerifiedButton: "Bestätigt",
  resendCountdownSuffix: " s bis zum erneuten Senden",
  retryCountdownSuffix: " s bis zum nächsten Versuch",

  emailRequiredAlert: "Geben Sie zuerst Ihre E-Mail-Adresse ein.",
  invalidEmailAlert: "Geben Sie eine gültige E-Mail-Adresse ein.",
  sendCodeFirstAlert: "Fordern Sie zuerst einen Bestätigungscode an.",
  codeRequiredAlert: "Geben Sie den Bestätigungscode ein.",
  verifyEmailFirstAlert: "Klicken Sie auf „Bestätigen“, um Ihre E-Mail-Adresse vor dem Absenden zu verifizieren.",
  popupBlockedAlert: "Der Browser hat das neue Fenster blockiert. Erlauben Sie Pop-ups und senden Sie das Formular erneut.",
  fileTooLargePrefix: "Die Datei „",
  fileTooLargeSuffix: "“ überschreitet 20 MB. Wählen Sie eine andere Datei.",

  mapLoading: "Karte wird geladen …",
  mapError: "Die Karte ist vorübergehend nicht verfügbar. Prüfen Sie den Kartenschlüssel, die zugelassenen Domains oder die Netzwerkverbindung.",
  openMap: "In Amap öffnen",

  successTitle: "Anfrage erfolgreich gesendet",
  successDescription: "Wir haben Ihre Anfrage erhalten und antworten an Werktagen innerhalb von 24 Stunden.",
  successPdfTip: "Wenn sich die PDF-Vorschau geöffnet hat, können Sie das Anfrageformular über den Browser speichern oder drucken.",
  successCloseButton: "Verstanden",

  pdfDocumentTitle: "Kontaktanfrage",
  pdfDocumentSubtitle: "Bestätigung der Kundenanforderungen",
  pdfRequestNumber: "Anfragenummer",
  pdfCreatedAt: "Erstellt am",
  pdfSource: "Quelle",
  pdfSourceValue: "Kontaktformular der Website",
  pdfCustomerInfo: "1. Kundendaten",
  pdfRequirementInfo: "2. Angaben zur Anfrage",
  pdfRequirementDescription: "3. Beschreibung der Anforderungen",
  pdfAttachmentList: "4. Anlagen",
  pdfNotFilled: "Nicht angegeben",
  pdfNotSelected: "Nicht ausgewählt",
  pdfNoAttachment: "Keine Anlage hochgeladen",
  pdfIndex: "Nr.",
  pdfAttachmentName: "Dateiname",
  pdfAttachmentType: "Typ",
  pdfAttachmentSize: "Größe",
  pdfFooterNote: "Dieses Dokument dient der Abstimmung der Anforderungen sowie der internen Nachverfolgung und Archivierung.",
  pdfPrintTip: "Das Anfrageformular lässt sich als PDF speichern.",

  requestTypes: Object.values(requestTypes),

  productGroups: [
    {
      groupName: "Pumpen",
      options: [
        "Membranpumpe",
        "Spritzenpumpe",
        "Pipettierpumpe",
        "Keramikkolbenpumpe",
      ],
    },
    {
      groupName: "Ventile",
      options: [
        "Magnetventil",
        "Schlauchquetschventil",
        "Drehschaltventil",
        "Hochdruckventil",
      ],
    },
    {
      groupName: "Sensoren und Fluidikkomponenten",
      options: [
        "Drucksensor",
        "Luftblasendetektor",
        "Leitfähigkeits- / TDS-Modul",
        "Schläuche / Fluidik-Fittings / Probenahmesonden",
        "Konfektionierte Schlauch- und Kapillarleitungen",
      ],
    },
    {
      groupName: "Sonstiges",
      options: [
        "Noch offen, Beratung erwünscht",
        "Anderes Produkt oder Sonderanforderung",
      ],
    },
  ],

  projectStages: [
    "Bewertung der Produktauswahl",
    "Musterprüfung",
    "Projektentwicklung",
    "Einführung in die Serienfertigung",
    "Unterlagen anfragen",
    "Rückmeldung zum Kundendienst",
    "Sonstige Phase",
  ],

  guideTitle: "Hinweise zum Ausfüllen",
  guideDescription:
    "Mit den folgenden Angaben können wir schneller einschätzen, welche Produkte und welche Unterstützung für Ihre Anfrage infrage kommen.",
  guideItems: [
    {
      title: "Anwendung",
      description:
        "Zum Beispiel In-vitro-Diagnostik (IVD), Life Sciences, Analysegeräte, Laborautomatisierung oder synthetische Biologie.",
    },
    {
      title: "Gewünschtes Produkt",
      description:
        "Zum Beispiel eine Membranpumpe, Spritzenpumpe, Pipettierpumpe oder Kolbenpumpe, ein Magnet- oder Drehschaltventil oder ein Sensor.",
    },
    {
      title: "Wichtige Parameter",
      description:
        "Zum Beispiel Medium, Durchfluss, Druck, Anschlüsse, Abmessungen, Lebensdauer, Ansteuerung und Einbauraum.",
    },
    {
      title: "Aktuelle Phase",
      description:
        "Zum Beispiel Produktauswahl, Musterprüfung, Projektentwicklung, Einführung in die Serienfertigung, Unterlagenanforderung oder Rückmeldungen zum Kundendienst.",
    },
    {
      title: "Anlagen",
      description:
        "Zeichnungen, technische Daten als PDF, Stücklisten, Fotos der Einbausituation und Angaben zu Wettbewerbsmodellen können Sie zusammen hochladen.",
    },
  ],
  guideNote: "Wenn noch nicht alle Parameter vorliegen, beschreiben Sie zunächst den Einsatzzweck des Geräts und die gewünschte Funktion.",

  contactInfoTitle: "Kontaktdaten",
  contactInfoDescription: "Sie erreichen uns direkt per Telefon oder E-Mail. Für einen Besuch nutzen Sie die untenstehende Anschrift.",
  companyName: "Shenzhen Foreach Technology Co., Ltd.",
  companyPosition: "Anbieter von Mikrofluidikkomponenten und Lösungen für Fluidiksysteme",
  contactRows: [
    { label: "Telefon", value: "0755-8655 3831" },
    { label: "E-Mail", value: "sales@foreachtek.com" },
    { label: "Website", value: "www.foreachtek.com" },
    { label: "Anschrift", value: address },
    { label: "Geschäftszeiten", value: "Montag bis Freitag, 08:30–18:00 Uhr" },
  ],
  mapTitle: "Unternehmensstandort",
  mapAddress: address,

  bottomCtaTitle: "Benötigen Sie Hilfe bei der Produktauswahl oder technische Beratung?",
  bottomCtaDescription: "Senden Sie uns Angaben zu Ihrer Anwendung und Ihren Produktanforderungen. Wir helfen Ihnen, passende Produkte einzugrenzen.",
  bottomCtaFormButton: "Anfrage senden",
  bottomCtaContactButton: "Kontaktdaten ansehen",
};

const germanContactData = buildContactIntlData("de", copy);
const englishForm = getContactIntlData("en").form;

function mapSubmissionValues(labels: readonly string[], values: readonly string[]) {
  return Object.fromEntries(labels.map((label, index) => [label, values[index]]));
}

export const contactDeData: ContactPageData = {
  ...germanContactData,
  form: {
    ...germanContactData.form,
    submissionValues: {
      requestType: mapSubmissionValues(copy.requestTypes, englishForm.requestTypes),
      productType: mapSubmissionValues(
        copy.productGroups.flatMap((group) => group.options),
        englishForm.productGroups.flatMap((group) => group.options),
      ),
      projectStage: mapSubmissionValues(copy.projectStages, englishForm.projectStages),
    },
  },
};
