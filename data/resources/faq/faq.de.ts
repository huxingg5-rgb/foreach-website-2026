import type { FaqUi } from "./faq.ui";

export const germanFaqTitle = "Häufig gestellte Fragen";

export const germanFaqUi: FaqUi = {
  description: "Antworten zu Pumpen, Ventilen, Sonden, Leitungen, Fittings und Sensorikmodulen: Produktauswahl, Montage, Abdichtung, Prüfung und technische Unterstützung.",
  home: "Startseite", resources: "Ressourcen", breadcrumb: "Brotkrumennavigation",
  all: "Alle Fragen", categories: "Fragenkategorien", products: "Produktfragen", services: "Service und Support",
  searchPlaceholder: "Nach Produkt, Modell oder Frage suchen", search: "Suchen", pagination: "FAQ-Seitennavigation",
  previous: "Zurück", next: "Weiter", emptyTitle: "Keine passenden Fragen gefunden",
  emptyDescription: "Suchen Sie nach einem Produktnamen, einem Modell oder einer kurzen Beschreibung des Problems. Sie können auch die Kategorie und den Suchbegriff zurücksetzen.",
  clear: "Alle Fragen anzeigen", ctaTitle: "Benötigen Sie weitere Hilfe?",
  ctaDescription: "Nennen Sie uns Produktmodell, Medium, Betriebsbedingungen und beobachtete Symptome. So können wir Sie bei der Auswahl oder Fehlersuche unterstützen.",
  contact: "Technischen Support kontaktieren", readMore: "Details ansehen",
};

export const germanFaqCategoryLabels: Record<string, string> = {
  pumps: "Pumpen", piston: "Kolbenpumpen", diaphragm: "Membranpumpen", syringe: "Spritzenpumpen",
  pipetting: "Pipettierpumpen", valveless: "Ventillose Dosierpumpen",
  valves: "Ventile", rotary: "Drehventile", solenoid: "Magnetventile",
  "high-pressure-valve": "Hochdruckventile", "check-valve": "Rückschlagventile",
  probes: "Sonden", "sampling-probe": "Probenahme- und Reagenzsonden",
  "piercing-probe": "Durchstechsonden", "wash-probe": "Waschsonden", stirrer: "Rührsonden und Rührflügel",
  tubing: "Leitungen und Leitungsbaugruppen", "soft-tubing": "Flexible Schläuche",
  "hard-tubing": "Starre Leitungen", "tubing-assembly": "Kundenspezifische Leitungsbaugruppen",
  fittings: "Fluidik-Fittings", flanged: "Bördelanschlüsse", ferrule: "Klemmkonus-Fittings",
  "retaining-ring": "Klemmring-Fittings", "high-pressure-fitting": "Hochdruck-Fittings für Leitungen",
  barbed: "Schlauchtüllen und Schlauchverbinder", "threaded-barb": "Gewinde-Schlauchtüllen",
  luer: "Luer-Anschlüsse", "quick-connect": "Schnellkupplungen",
  "thread-adapter": "Adapter mit Innengewinde", bulkhead: "Schottverschraubungen",
  control: "Sensorik und Steuerung", bubble: "Luftblasenerkennung", pressure: "Druckmessung im Flüssigkeitspfad",
  purchasing: "Auswahl und Beschaffung", selection: "Angaben zur Auswahl",
  samples: "Muster und Prototypen", customization: "Kundenspezifische Ausführungen", quotation: "Angebote und Lieferung",
  quality: "Qualität und Prüfung", inspection: "Maß- und Funktionsprüfung", compliance: "Werkstoff- und Konformitätsunterlagen",
  traceability: "Chargenrückverfolgbarkeit", acceptance: "Abnahmekriterien", support: "Kundendienst",
  troubleshooting: "Fehlermeldung", maintenance: "Wartung", replacement: "Ersatzteile",
  repair: "Reparaturen und Rücksendungen", warranty: "Garantieinformationen",
};

// Stable FAQ IDs keep search results, category filters and deep links aligned with the English page.
export const germanFaqCopy: Record<string, readonly [string, ...string[]]> = {
  "piston-accuracy": [
    "EA: Gelten die Grenzwerte von jeweils 0,5 % für Sollwertabweichung und Wiederholabweichung bei jeder Dosiermenge?",
    "Nein. Bei 100 % Hub betragen die Abweichung vom Sollwert und die Wiederholabweichung unter den angegebenen Prüfbedingungen jeweils höchstens 0,5 %. Bei 2 % Hub beträgt die Abweichung vom Sollwert höchstens 2,0 % und die Wiederholabweichung höchstens 1,5 %. Diese Werte beruhen auf der Prüfung des Kolbenhubs. Validieren Sie die tatsächliche Dosierung mit dem vorgesehenen Reagenz und unter den Einsatzbedingungen.",
  ],
  "piston-crystallization": [
    "EA: Was ist bei Salzlösungen oder kristallisationsanfälligen Reagenzien zu beachten?",
    "Prüfen Sie alle medienberührten Werkstoffe hinsichtlich Zusammensetzung, Konzentration und Temperatur. Planen Sie die Spülung beim Abschalten und den Umgang mit Restflüssigkeit ein. Eine Dichtungsspülung ist als EA-Option aufgeführt. Die erwartete Lebensdauer von fünf Millionen Zyklen bezieht sich auf Reinwasser bei Raumtemperatur und 50 kPa Gegendruck. Für andere Reagenzien ist damit keine allgemeine Lebensdauer zugesichert.",
  ],
  "diaphragm-free-flow": [
    "Was bedeutet der Volumenstrom von 300 mL/min bei der DPL30?",
    "300 mL/min ist der im aktuellen Datenblatt der DPL30 angegebene Volumenstrom ohne Gegendruck unter den definierten Prüfbedingungen. Tatsächliche Werte hängen von Gegendruck, Saughöhe, Leitungen und Medium ab. Ermitteln Sie den Volumenstrom aus dem Strömungswiderstand, der Druck-Volumenstrom-Kennlinie und dem Betriebspunkt.",
  ],
  "diaphragm-working-point": [
    "Fördert die DPL30 auch bei 100 kPa noch 300 mL/min?",
    "Nein. 300 mL/min ist der Volumenstrom ohne Gegendruck. 100 kPa ist der Nenndruck. Die beiden Leistungswerte beziehen sich auf unterschiedliche Bedingungen. Prüfen Sie den Volumenstrom unter Druck anhand der Druck-Volumenstrom-Kennlinie und des tatsächlichen Flüssigkeitskreises.",
  ],
  "syringe-capacity": [
    "Wie werden Spritzenvolumen und Arbeitshub ausgewählt?",
    "Legen Sie Mindest- und Höchstdosiervolumen, Gesamtmenge pro Charge und zulässige Nachfüllzeit fest. Wählen Sie anschließend eine kompatible Spritze. Aus dem Spritzenvolumen lässt sich die kleinste zuverlässig dosierbare Menge nicht ableiten. Ermitteln Sie diese Menge anhand von Tests mit der vorgesehenen Flüssigkeit, Nadel, Leitung und dem tatsächlichen Gegendruck.",
  ],
  "syringe-bottle-change": [
    "Was ist zu prüfen, wenn die erste Dosierung nach einem Flaschenwechsel zu klein ausfällt?",
    "Prüfen Sie, ob die Ansaugleitung in die Flüssigkeit eintaucht und die Anschlüsse dicht sind. Füllen und entlüften Sie anschließend Spritze und Leitungen. Leiten Sie die zum Entlüften verwendete Flüssigkeit in einen geeigneten Abfallpfad, bevor Sie das abgegebene Volumen messen. Prüfen Sie bei anhaltender Blasenbildung Ansauggeschwindigkeit, Lufteintritt und Zustand der Flüssigkeit.",
  ],
  "syringe-accuracy": [
    "Wie lassen sich Genauigkeit und Wiederholbarkeit bewerten?",
    "Die Genauigkeit beschreibt die Abweichung vom Sollvolumen, die Wiederholbarkeit die Streuung zwischen wiederholten Dosierungen. Die Auflösung des Antriebs ersetzt keine dieser Kenngrößen. Führen Sie Wiederholmessungen mit Zielvolumen, Medium, Geschwindigkeit und Gegendruck der Anwendung durch. Geben Sie bei Spezifikationen die verwendete Spritze und die Prüfbedingungen an.",
  ],
  "syringe-continuity": [
    "Kann die Pumpe einen unterbrechungsfreien Volumenstrom liefern?",
    "Eine einzelne Spritze muss nachgefüllt werden. Ein vollständiger Zyklus umfasst daher Dosieren, Ventilumschaltung und Ansaugen. Prüfen Sie bei Bedarf an unterbrechungsfreier Förderung einen Wechselbetrieb mit mehreren Pumpen oder einen Pufferspeicher und messen Sie die Volumenstromschwankungen. Eine größere Spritze kann bei bestimmten Aufgaben die Nachfüllhäufigkeit senken, garantiert aber keinen kontinuierlichen Volumenstrom.",
  ],
  "pipetting-level": [
    "Worin unterscheiden sich pLLD, cLLD und hLLD und wie wird das Verfahren ausgewählt?",
    "pLLD steht für druckbasierte, cLLD für kapazitive und hLLD für hybride Flüssigkeitsstandserkennung. Die SMTP2-Spezifikation umfasst alle drei Verfahren. Prüfen Sie für die Auswahl Flüssigkeitseigenschaften, Spitzengeometrie, Geräteerdung und Achsbewegung. Validieren Sie Erkennungsposition und Auslösebedingungen mit der vorgesehenen Flüssigkeit. Das geeignete Verfahren hängt von der Anwendung ab.",
  ],
  "pipetting-multiple": [
    "Kann SMTP2 nach einmaligem Ansaugen in mehrere Gefäße dosieren?",
    "Das Datenblatt enthält Leistungsangaben zur Mehrfachdosierung. Damit lässt sich ein einmaliges Ansaugen mit anschließender Mehrfachabgabe beurteilen. Das Gerät muss die erforderlichen Befehle und Bewegungen unterstützen. Prüfen Sie die geplante Gesamtmenge einschließlich methodenbedingter Reserven anhand der Kapazitäten von Pumpe und Spitze. Validieren Sie erste, mittlere und letzte Teilmengen separat. Die Nennkapazität allein lässt keine feste Anzahl von Teilmengen ableiten.",
  ],
  "valveless-speed": [
    "RPL: Verringert eine niedrigere Drehzahl das Volumen je Dosierung?",
    "Bei unverändertem Verdrängungsvolumen und gleicher Anzahl vollständiger Umdrehungen verlängert die niedrigere Drehzahl hauptsächlich die Dosierzeit. Das nominelle Dosiervolumen bleibt gleich. Bei zeitgesteuertem Betrieb ändert die Drehzahl die Anzahl der Umdrehungen im vorgegebenen Zeitintervall und damit das abgegebene Volumen. Kalibrieren Sie in diesem Fall erneut.",
  ],
  "valveless-system": [
    "Kommt das gesamte Gerät bei einer ventillosen Bauweise ohne Ventile aus?",
    "Nein. RPL kombiniert Dreh- und Hubbewegung eines Keramikkolbens, um Flüssigkeit ohne Ventile im Pumpenmechanismus anzusaugen und abzugeben. Ob das Gerät Umschaltventile, Absperrventile oder weitere Komponenten im Flüssigkeitspfad benötigt, hängt von Versorgung, Reinigung und Sicherheitssteuerung ab.",
  ],
  "rotary-metering": [
    "Kann ein Drehventil das abgegebene Volumen je Dosierung direkt steuern?",
    "Ein Drehventil schaltet hauptsächlich Anschlüsse um. Das Dosiervolumen wird üblicherweise durch die Pumpendosierung, die Bedingungen der Flüssigkeit und den eingebauten Flüssigkeitspfad bestimmt. Weder das Innenvolumen des Ventils noch die Zahl der Schaltvorgänge kann das Dosiervolumen ersetzen.",
  ],
  "rotary-solenoid": [
    "Worin unterscheiden sich Drehventil und Magnetventil?",
    "Ein typisches elektrisches Drehventil schaltet Anschlüsse durch Drehen eines Rotors um. Ein Magnetventil öffnet, schließt oder wechselt Strömungswege durch elektromagnetische Betätigung. Die Funktion hängt auch von den internen Pfaden ab. Kanalauswahl, unabhängiges Absperren und gleichzeitiger Betrieb sind unterschiedliche Anforderungen. Die Betätigungsart allein entscheidet nicht über die Eignung.",
  ],
  "rotary-reset": [
    "Kann die zuletzt gespeicherte Kanalnummer nach einem Stromausfall wiederverwendet werden?",
    "Ermitteln Sie die tatsächliche Position nach der für das Modell vorgesehenen Referenzfahrt und Positionsprüfung. Eine gespeicherte Kanalnummer belegt keine unveränderte physische Position. Bestätigen Sie die Position vor Inbetriebnahme der Pumpe.",
  ],
  "solenoid-sequence": [
    "Wie sollten die Umschaltung des Magnetventils und die Bewegung der Spritze abgestimmt werden?",
    "Stellen Sie vor der Spritzenbewegung den vorgesehenen Ansaug- oder Abgabepfad her. Bestätigen Sie Ventilstellung oder Schaltzeit entsprechend dem Steuerprotokoll. Vermeiden Sie einen Spritzenhub gegen einen geschlossenen Pfad. Berücksichtigen Sie Entlüften, Nachfüllen und Spülen in der Betriebssequenz.",
  ],
  "probe-drawing": [
    "Sind vor der kundenspezifischen Auslegung einer Probenahmesonde Zeichnungen erforderlich?",
    "Stellen Sie möglichst eine 2D-Zeichnung, eine 3D-Datei oder ein physisches Muster bereit. Liegen vollständige Zeichnungen noch nicht vor, teilen Sie den Bauraum im Gerät, die vorgesehene Flüssigkeit, das Ansaugvolumen, die Sondenlänge und die Schnittstellenanforderungen mit. FOREACH kann daraufhin die zuerst zu klärenden Punkte eingrenzen.",
  ],
  "probe-carryover": [
    "Wie lassen sich Flüssigkeitsrückstände und Kreuzkontamination bei Probenahmesonden verringern?",
    "Bewerten Sie Spitzengeometrie, Innenpolitur, Außenbeschichtung, Reinigungsverfahren und Flüssigkeitseigenschaften im Zusammenhang. Achten Sie bei Proben oder Reagenzien mit hohem Rückstandsrisiko besonders auf die Innenrauheit, flüssigkeitsabweisende Außenbehandlungen und die Eignung für die Waschstation.",
  ],
  "piercing-difference": [
    "Worin unterscheiden sich Durchstechsonden und Probenahmesonden?",
    "Probenahmesonden dienen vor allem zum Ansaugen und Abgeben von Flüssigkeit. Durchstechsonden ermöglichen den Flüssigkeitszugang durch Siegelfolien, Stopfen oder verschlossene Verbrauchsartikel. Prüfen Sie in der Regel Spitzenfestigkeit, Durchstechwinkel und Entlüftungsgeometrie.",
  ],
  "stirrer-dimensions": [
    "Warum muss ein Rührflügel auf die Reaktionsküvette abgestimmt werden?",
    "Blattform, Durchmesser, Länge und Befestigungsgeometrie hängen von den Küvettenabmessungen, dem Flüssigkeitsvolumen und dem verfügbaren Mischraum ab. Eine Standardmodellbezeichnung allein reicht für die Auswahl nicht aus.",
  ],
  "pvc-reagent": [
    "Sind PVC-Schläuche mit jedem Reagenz verträglich?",
    "Die Beständigkeit hängt von der PVC-Rezeptur, der Reagenzzusammensetzung und -konzentration, der Temperatur und der Kontaktzeit ab. Prüfen Sie bei empfindlichen Probenpfaden auch Adsorption, extrahierbare Stoffe und Verschleppung.",
  ],
  "tubing-wall": [
    "Warum gibt es zum gleichen Innendurchmesser verschiedene Außendurchmesser?",
    "Ein unterschiedlicher Außendurchmesser ergibt eine andere Nennwandstärke und beeinflusst die Leitungsführung und die Passung zum Fitting. Wählen Sie den Innen- und Außendurchmesser als Kombination aus.",
  ],
  "pvc-peristaltic": [
    "Kann dieser PVC-Schlauch in einer Schlauchpumpe eingesetzt werden?",
    "Prüfen Sie zunächst Rezeptur, Pumpenkopfgröße, Dauerfestigkeit und Medienverträglichkeit. Ein Anschlussschlauch ist nicht automatisch als Pumpenschlauch für eine Schlauchpumpe qualifiziert.",
  ],
  "ptfe-transparency": [
    "Sind alle PTFE-Leitungen transparent?",
    "Typisches PTFE ist blickdicht oder durchscheinend. Muss die Flüssigkeit oder müssen Luftblasen erkennbar sein, prüfen Sie das tatsächliche Leitungsmuster und vergleichen Sie Alternativen wie FEP.",
  ],
  "barb-tube-size": [
    "Werden Schlauchtüllen nach dem Innen- oder Außendurchmesser des Schlauchs ausgewählt?",
    "Wählen Sie den Anschluss zuerst nach dem Schlauchinnendurchmesser. Prüfen Sie danach Außendurchmesser, Wandstärke, Toleranzen, Werkstoff und Härte. Bei BA-32F-PP-N beziehen sich die 3,2 mm auf den Innendurchmesser des passenden Schlauchs. Den größten Außendurchmesser der Tülle entnehmen Sie der Zeichnung. Der Schlauchaußendurchmesser beeinflusst Klemmung und Bauraum. Vergleichen Sie bei unterschiedlichen Tüllenprofilen für denselben Innendurchmesser die Zeichnungen und prüfen Sie Aufschieben, Dichtheit und Haltekraft mit dem tatsächlichen Schlauch.",
  ],
  "barb-clamp": [
    "Ist bei einer Schlauchtülle immer eine Schlauchschelle erforderlich?",
    "Das hängt von der Passung zwischen Tülle und Schlauch und von den Betriebsbedingungen ab. Bewerten Sie Schlauchwerkstoff und -härte, Temperatur, Druckspitzen, Vibrationen sowie äußere Zuglasten und prüfen Sie Dichtheit und Haltekraft nach den Montageanforderungen. Stimmen Sie eine benötigte Schelle auf den Außendurchmesser des montierten Schlauchs und auf die wirksame Klemmstelle ab. Schlauch und Fitting dürfen dabei nicht beschädigt werden. Eine Schelle kann eine falsche Schlauchgröße nicht ausgleichen.",
  ],
  "barb-reducer": [
    "Wie wähle ich die beiden Enden eines Schlauchreduzierverbinders aus?",
    "Erfassen Sie Innen- und Außendurchmesser sowie Werkstoff beider Schläuche. Wählen Sie dann das passende Reduziermodell. BA-24F-32F-PP-N verbindet Schläuche mit 2,4 mm und 3,2 mm Innendurchmesser. Prüfen Sie zusätzlich Tüllencode, Zeichnungsmaße und Mindestdurchlass. Entnehmen Sie bei reduzierenden T- oder Y-Verbindern die Zuordnung der Größen zu den Anschlusspositionen der Zeichnung. Die Reihenfolge der Zahlen legt die Abzweigrichtung nicht fest.",
  ],
  "quick-valves": [
    "Worin unterscheiden sich Schnellkupplungen mit und ohne Absperrventil?",
    "Beim Trennen schließt eine mit Ventil ausgestattete Kupplungshälfte ihren eigenen Durchlass automatisch. Eine Hälfte ohne Ventil bleibt offen. Wenn beide Seiten absperren sollen, wählen Sie ein Ventil sowohl im Stecker als auch in der Kupplungsdose. Ein Ventil garantiert kein tropfenfreies Trennen.",
  ],
  "quick-push-in": [
    "Wodurch unterscheidet sich eine Schnellkupplung von einer Steckverschraubung?",
    "Bei einer Schnellkupplung werden Stecker und Kupplungsdose voneinander getrennt. Bei einer Steckverschraubung wird die Leitung aus dem Fitting gelöst. Q20, Q40 und Q60 arbeiten mit zusammenpassenden Kupplungshälften. Beim üblichen Trennen bleibt die Leitung am rückseitigen Anschluss.",
  ],
  "quick-interchange": [
    "Lassen sich Schnellkupplungen verschiedener Hersteller miteinander verbinden?",
    "Prüfen Sie die Einsteckmaße, die Verriegelung und die Dichtposition. Stellen Sie bei Ausführungen mit Ventil außerdem sicher, dass es nach dem Kuppeln vollständig öffnet. Aussehen, Schlauchgröße und eine Serienvergleichsliste reichen zur Freigabe der tatsächlichen Kombination nicht aus.",
  ],
  "luer-pressure": [
    "Hält ein Luer-Lock-Anschluss grundsätzlich mehr Druck aus als ein Luer-Slip-Anschluss?",
    "Die Verriegelung verbessert den mechanischen Halt. Der zulässige Betriebsdruck hängt weiterhin von der konkreten Paarung aus Stecker und Gegenstück, der Leitung, den Werkstoffen, der Temperatur und dem Montagezustand ab. Ein Verriegelungsring allein begründet keine Druckfreigabe. Die Werte anderer Hersteller sind auf diese Kombination nicht übertragbar. Prüfen Sie die Spezifikationen der vollständigen Verbindung unter ihren Betriebsbedingungen.",
  ],
  "luer-shutoff": [
    "Sperrt ein Luer-Anschluss beim Trennen automatisch den Flüssigkeitsstrom?",
    "Die hier beschriebenen Luer-Anschlüsse mit offenem Durchgang haben keine automatische Absperrfunktion. Ein selbstschließender Anschluss benötigt die entsprechende Ventilkonstruktion. Wählen Sie für Flüssigkeitspfade, die beim Trennen absperren müssen, einen Verbinder oder ein Steuerventil mit genau dieser Funktion.",
  ],
  "ferrule-tools": [
    "Sind bördellose Fittings immer ohne Werkzeug montierbar?",
    "Nein. Handmontage, Spezialaufsatz und drehmomentkontrolliertes Werkzeug hängen von der Ausführung ab. Bördellos bedeutet, dass am Leitungsende kein Bördel vorgeformt wird. Das allein gibt eine Montage nach Gefühl nicht für jedes Modell frei.",
  ],
  "ferrule-pairing": [
    "Sind CL-0 und CL-0X bei gleichem Leitungsaußendurchmesser austauschbar?",
    "Der Außendurchmesser allein reicht zur Beurteilung nicht aus. Die Geometrien unterscheiden sich und müssen zu Mutter und Anschluss passen. Prüfen Sie die vollständigen Teilenummern und die freigegebene Kombination. Probeweises oder stärkeres Anziehen belegt keine Kompatibilität.",
  ],
  "ring-flangeless": [
    "Ist ein Klemmring-Fitting ebenfalls bördellos?",
    "Ja. Bei der beschriebenen Ausführung mit Ring und Konus wird die Leitung rechtwinklig abgeschnitten und ohne vorgeformten Bördel montiert. Herkömmliche Klemmkonus-Fittings können ebenfalls bördellos sein. Ihre Teile und Montage unterscheiden sich jedoch. Aus der gemeinsamen Bezeichnung ergibt sich keine Austauschbarkeit.",
  ],
  "ring-tools": [
    "Ist ein spezielles Montagewerkzeug erforderlich?",
    "Ja. Für die Erstmontage des Satzes ist die kompatible Spezialzange FOREACH T-SF-4-SS mit Artikelnummer 959016 erforderlich. Handdruck reicht in der Regel nicht aus, um Ring und Konus korrekt zu setzen. Ein höheres Anziehdrehmoment an der Mutter ersetzt die Vormontage nicht. Prüfen Sie, ob das Werkzeug zum Satz und zur Leitungsgröße passt, und kontrollieren Sie bereits montierte Leitungsenden vor dem Wiederanschluss.",
  ],
  "thread-unf-npt": [
    "Sind 1/4-28 UNF und 1/4 NPT austauschbar?",
    "Nein. 1/4-28 UNF ist zylindrisch mit 28 Gewindegängen pro Zoll. SA-1/4NPT hat ein kegeliges 1/4-18-NPT-Gewinde mit 18 Gewindegängen pro Zoll. Abmessungen, Steigung und Form unterscheiden sich. Dasselbe Dichtmittel macht die Gewinde nicht austauschbar.",
  ],
  "thread-seal-tape": [
    "Brauchen alle Gewinde-Schlauchtüllen PTFE-Dichtband?",
    "Nein. FOREACH SA/SAL werden mit PTFE-Dichtband oder einem geeigneten Gewindedichtmittel eingesetzt. SB/SBS/SBR dichten durch Kontakt am flachen Anschlussgrund ab. PTFE-Dichtband und Gewindedichtmittel sind für sie nicht vorgesehen. Bei SC-Innengewinden gelten die Anforderungen des Gegenstücks für die starre Leitung und seiner Dichtkomponenten.",
  ],
  "adapter-leak": [
    "Hilft bei einem undichten Innengewinde PTFE-Dichtband oder stärkeres Anziehen?",
    "Halten Sie die Anlage zuerst an und machen Sie sie drucklos. Prüfen Sie den Leitungssitz, die Dichtkomponenten und den Dichtsitz. Bei einer Stirnflächenabdichtung am flachen Anschlussgrund kann Dichtband eine undichte Stirnfläche nicht abdichten. Stärkeres Anziehen kann den Kunststoffkörper beschädigen. Korrigieren Sie die Kombination, ersetzen Sie beschädigte Teile und ziehen Sie die Verbindung nach Montageanleitung an. Prüfen Sie sie danach auf Dichtheit.",
  ],
  "bulkhead-leak": [
    "Stoppt stärkeres Anziehen der Schottmutter eine Undichtigkeit am Schlauchende?",
    "Die PMBSN-Mutter klemmt die Platte. Der Schlauch dichtet durch Kontakt mit der Tülle. Halten Sie die Anlage an und machen Sie sie drucklos. Prüfen Sie Schlauchmaße, Aufschubtiefe, Beschädigungen am Ende und Werkstoffveränderungen. Wiederholen Sie die Dichtheitsprüfung nach der Reparatur. Mehr Drehmoment an der Schottmutter behebt keine falsche Passung zwischen Schlauch und Tülle.",
  ],
  "bulkhead-tank": [
    "Dichtet diese Schott-Schlauchtülle eine Tankwanddurchführung direkt ab?",
    "Die beschriebene PMB-Ausführung befestigt eine Durchführung in einer Platte und verbindet flexible Schläuche. Eine Tankwanddurchführung benötigt zusätzlich eine dafür ausgelegte und geprüfte Dichtung zwischen Fitting und Wand. Wählen Sie die vollständige Dichtungsbaugruppe passend zu Tank, Medium und Druck aus.",
  ],
  "abd-contact": [
    "Kommt der Luftblasendetektor ABD mit der Flüssigkeit in Berührung?",
    "Das Modul umschließt zur Erkennung einen transparenten Schlauch und berührt die Flüssigkeit nicht direkt. Das kann das Kontaminationsrisiko und zusätzlichen Strömungswiderstand verringern.",
  ],
  "abd-small-bubbles": [
    "Kann ABD sehr kleine Mikroblasen erkennen?",
    "Das hängt von der tatsächlichen Blasengröße ab. Die erkennbare Breite der Blase oder des Flüssigkeitssegments beträgt > 0,8 mm. Kleinere Blasen oder Flüssigkeitssegmente können unter Umständen nicht zuverlässig erkannt werden.",
  ],
  "pdm5-interface": [
    "Welche Kommunikationsschnittstelle nutzt PDM5?",
    "PDM5 kommuniziert über I2C. Die standardmäßige 7-Bit-I2C-Adresse lautet 0x6D.",
  ],
  "assembly-inputs": [
    "Welche Maße und Schnittstellenangaben sind für eine kundenspezifische Leitungsbaugruppe erforderlich?",
    "Geben Sie Leitungswerkstoff, Innen- und Außendurchmesser, Länge und Toleranzen, Zeichnungen beider Anschlüsse, Anforderungen an Fittings und Dichtungen, Bauraum und Kennzeichnung an. Bestätigen Sie die passenden Komponenten je Anschlussart, etwa Bördel-, Klemmring- oder Klemmkonus-Fittings. Identische Gewinde allein begründen keine Austauschbarkeit.",
    "Nennen Sie außerdem Prozess- und Reinigungsmedien, Konzentration, Temperatur, Druck oder Vakuum, Zielvolumenstrom und Betriebszyklus. So lässt sich das Muster unter realen Einbau- und Betriebsbedingungen prüfen.",
  ],
  "selection-inputs": [
    "Welche Angaben werden zur Auswahl von Fittings oder Leitungen benötigt?",
    "Beginnen Sie mit einem Flüssigkeitsplan, Zeichnungen der Gewinde und Dichtflächen jedes Anschlusses sowie Innen- und Außendurchmesser und Werkstoff der Leitung. Ergänzen Sie Medium, Konzentration, Druck, Temperatur, Volumenstrom und Bauraum. Geben Sie für vorhandene Teile die vollständige Modellnummer, Fotos oder Angaben zu einem Muster an.",
    "Legen Sie bei Schnellkupplungen fest, welche Hälfte beim Trennen absperren muss. Geben Sie bei Schottverschraubungen Plattenstärke und Bohrungsgeometrie an. Kennzeichnen Sie zwingende Anforderungen und Bedingungen, die angepasst werden können.",
  ],
  "sample-validation": [
    "Was sollte nach der Freigabe von Fitting-Mustern vor der Serienbeschaffung festgelegt werden?",
    "Dokumentieren Sie das vollständige Modell, die Werkstoffkonfiguration, den Zeichnungsstand, die tatsächliche Leitungsspezifikation und die freigegebene Montage. Vereinbaren Sie Abnahmeprüfungen und benötigte Werkstoff- und Qualitätsunterlagen. Validieren Sie Einbau, Abdichtung, Zugbelastung und die tatsächlichen Start-Stopp-Bedingungen. Prüfen Sie saugseitige Abschnitte unter Vakuum auf Lufteintritt.",
    "Bewerten Sie bei Änderungen an Fittings oder Leitungen, ob die ursprüngliche Validierung weiter gilt. Ähnliches Aussehen reicht für die Übernahme einer Musterfreigabe nicht aus.",
  ],
  "material-documents": [
    "Belegen RoHS-, REACH- oder SDS-Unterlagen die Verträglichkeit mit Reagenzien?",
    "Nein. RoHS- und REACH-Unterlagen informieren über die Stoffkonformität im angegebenen Geltungsbereich. Ein Sicherheitsdatenblatt (SDS) enthält Angaben zu Sicherheit, Handhabung und Lagerung. Daraus lässt sich allein weder die Langzeitbeständigkeit gegenüber einem bestimmten Reagenz noch eine dichte Verbindung ableiten.",
    "Prüfen Sie den abgedeckten Werkstoff oder das Modell, den Revisionsstand und den Geltungsbereich. Validieren Sie anschließend Beständigkeit und Dichtheit anhand von Reagenzzusammensetzung, Konzentration, Temperatur, Kontaktzeit und der tatsächlich montierten Verbindung.",
  ],
  "batch-traceability": [
    "Welche Unterlagen sind zu prüfen, wenn sich Aufschubkraft oder Dichtheit zwischen Fitting-Chargen ändern?",
    "Vergleichen Sie die aktuelle Charge mit den freigegebenen Mustern. Prüfen Sie vollständiges Modell, Werkstoffkonfiguration, Zeichnungsstand, Leitungsmaße und -werkstoff, Montageverfahren und Lieferunterlagen. Kontrollieren Sie Tüllenprofil, kritische Abmessungen und Durchlass sowie Grate, Schäden und die Modell- und Werkstoffkennzeichnung.",
    "Bewerten und validieren Sie die betroffenen Merkmale erneut, wenn sich Leitungen, Fitting-Werkstoffe oder Montagebedingungen ändern. Stichprobenumfang, Prüfpunkte und bereitgestellte Unterlagen richten sich nach den vereinbarten Qualitätsanforderungen des Projekts.",
  ],
  "support-leak-report": [
    "Welche Angaben helfen bei der Diagnose von Undichtigkeiten oder Lufteintritt?",
    "Halten Sie das Gerät zuerst entsprechend seiner Betriebsanleitung an und machen Sie es drucklos. Notieren Sie, ob die Undichtigkeit am Gewindeanschluss, Schlauchende oder an der Kupplung auftritt. Dokumentieren Sie, ob sie bei Förderung unter Überdruck, beim Ansaugen, im Start-Stopp-Betrieb oder nach einem Temperaturanstieg auftritt.",
    "Geben Sie das vollständige Fitting-Modell, Leitungswerkstoff und -maße, Anschlussfotos oder -zeichnungen, Medium, Druck, Temperatur sowie kürzlich erfolgte Wechsel oder Demontagen an. Undichtigkeiten am Schlauchende oder der Stirnfläche und Passungsprobleme an der Kupplung erfordern eigene Prüfungen. Stärkeres Anziehen ist keine allgemeine Abhilfe.",
  ],
  "support-replacement": [
    "Reicht der Leitungsdurchmesser aus, um Ersatzdichtungen oder Klemmringsätze auszuwählen?",
    "Nein. Prüfen Sie auch den Fitting-Körper, die Dichtgeometrie am Anschluss und das vollständige Modell der Dichtung oder des Satzes. Auch bei identischem Leitungsaußendurchmesser können Baureihen unterschiedliche Geometrien und passende Gegenstücke erfordern.",
    "CL-1S-16 und CL-1X-16 passen beispielsweise beide zu Leitungen mit 1,6 mm Außendurchmesser, verwenden aber unterschiedliche Fittings und Anschlüsse. Prüfen Sie vor dem Austausch die Unterlagen zu passenden Teilen und den Zustand des Leitungsendes. Montieren Sie nach Vorgabe und prüfen Sie anschließend auf Dichtheit.",
  ],
};
