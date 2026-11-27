const remainingFittingCopy = new Map<string, string>([
  ["A 2D drawing is available for this model. Check the product code and drawing revision before using it for design or assembly.", "Für dieses Modell ist eine 2D-Zeichnung verfügbar. Prüfen Sie vor der Verwendung für Konstruktion oder Montage die Bestellnummer und den Zeichnungsstand."],
  ["A 2D drawing preview is available on this model's detail page.", "Auf der Detailseite dieses Modells ist eine Vorschau der 2D-Zeichnung verfügbar."],
  ["A locking collar secures the connection by tightening. A one-piece design is more compact. Choose for the available space and how the connection will be used.", "Ein Verriegelungsring sichert die Verbindung beim Festziehen. Eine einteilige Ausführung ist kompakter. Wählen Sie die Bauform passend zum verfügbaren Bauraum und zur vorgesehenen Nutzung."],
  ["A two-port union joins two connections. A tee splits one line into two or combines two lines. Choose according to the fluid-path layout.", "Ein gerader Verbinder mit zwei Anschlüssen verbindet zwei Leitungen. Ein T-Stück verzweigt eine Leitung in zwei oder führt zwei Leitungen zusammen. Wählen Sie die Ausführung passend zur Leitungsführung."],
  ["Add the product to your inquiry list and request a drawing. Our engineers will verify the document revision against the product code and part number.", "Fügen Sie das Produkt Ihrer Anfrageliste hinzu und fordern Sie eine Zeichnung an. Unser technisches Team gleicht den Dokumentstand mit Bestell- und Teilenummer ab."],
  ["Add this model to your inquiry list and request a drawing. Our engineers will verify the product code and document revision before providing it.", "Fügen Sie das Modell Ihrer Anfrageliste hinzu und fordern Sie eine Zeichnung an. Unser technisches Team prüft Bestellnummer und Dokumentstand vor der Bereitstellung."],
  ["Also confirm the mating gender, valve configuration and mounting method when selecting the part.", "Prüfen Sie bei der Auswahl auch die passende Gegenkupplung, die Ventilausführung und die Montageart."],
  ["Are 2D drawings and 3D models available?", "Sind 2D-Zeichnungen und 3D-Modelle verfügbar?"],
  ["Available files appear on the product page. If a model's files are not listed, request them through the drawing option or a note in your inquiry list.", "Verfügbare Dateien werden auf der Produktseite angezeigt. Sind für ein Modell keine Dateien aufgeführt, können Sie diese über die Zeichnungsoption oder einen Hinweis in der Anfrageliste anfordern."],
  ["Available models define the standard colors. Note any other color requirement when submitting your inquiry list.", "Die verfügbaren Modelle legen die Standardfarben fest. Geben Sie abweichende Farbwünsche in der Anfrageliste an."],
  ["Before installation, check the mounting dimensions against the panel thickness and available space.", "Gleichen Sie vor dem Einbau die Einbaumaße mit der Plattenstärke und dem verfügbaren Bauraum ab."],
  ["Can I adapt between different thread types?", "Kann ich unterschiedliche Gewindearten verbinden?"],
  ["Can I request a different color?", "Kann ich eine andere Farbe anfragen?"],
  ["Can I request a {1} drawing for {0}?", "Kann ich eine {1}-Zeichnung für {0} anfordern?"],
  ["Can this {0} be mounted through a panel?", "Ist diese Ausführung für die Schottmontage geeignet ({0})?"],
  ["Choose the Luer gender to match the mating connector, and confirm whether a locking collar is required.", "Wählen Sie Stecker oder Buchse passend zum Gegenanschluss. Prüfen Sie außerdem, ob ein Verriegelungsring benötigt wird."],
  ["Choose the material for fluid compatibility, operating pressure, temperature and mechanical strength.", "Wählen Sie den Werkstoff anhand von Medienverträglichkeit, Betriebsdruck, Temperatur und mechanischer Festigkeit."],
  ["Confirm the filtration requirement, connection size and operating conditions before selecting it.", "Prüfen Sie vor der Auswahl die Anforderungen an die Filtration, die Anschlussgröße und die Betriebsbedingungen."],
  ["Contact an engineer", "Technisches Team kontaktieren"],
  ["Different valve designs can have different opening characteristics, flow performance and fluid compatibility.", "Die Ventilausführungen können sich im Öffnungsverhalten, Durchfluss und in der Medienverträglichkeit unterscheiden."],
  ["Does flow direction matter when installing the check valve?", "Ist beim Einbau die Durchflussrichtung des Rückschlagventils zu beachten?"],
  ["Evaluate the fluid composition, temperature, pressure, cleaning requirements and required service life together.", "Bewerten Sie Zusammensetzung des Mediums, Temperatur, Druck, Reinigungsanforderungen und erforderliche Lebensdauer gemeinsam."],
  ["Evaluate the fluid composition, temperature, pressure, cleaning requirements and service life together. Share your operating conditions if compatibility is uncertain.", "Bewerten Sie Zusammensetzung des Mediums, Temperatur, Druck, Reinigungsanforderungen und Lebensdauer gemeinsam. Teilen Sie uns Ihre Betriebsbedingungen mit, wenn die Verträglichkeit unklar ist."],
  ["Evaluate the fluid, operating temperature, pressure, cleaning requirements and seal material together. If uncertain, share these conditions with our engineers for review.", "Bewerten Sie Medium, Betriebstemperatur, Druck, Reinigungsanforderungen und Dichtungswerkstoff gemeinsam. Bei Unsicherheiten können Sie die Bedingungen von unserem technischen Team prüfen lassen."],
  ["How do I choose a male or female Luer?", "Wie wähle ich zwischen Luer-Stecker und Luer-Buchse?"],
  ["How do I choose between {0}, {1} and {2}?", "Wie wähle ich zwischen {0}, {1} und {2}?"],
  ["How do I choose the material?", "Wie wähle ich den Werkstoff aus?"],
  ["How do I confirm the filter specification for {0}?", "Wie prüfe ich die Filterspezifikation für {0}?"],
  ["How do I confirm the tubing size?", "Wie prüfe ich die Schlauchgröße?"],
  ["How do collar-type and one-piece Luer fittings differ?", "Worin unterscheiden sich Luer-Verbinder mit Verriegelungsring und einteilige Luer-Verbinder?"],
  ["How is a bulkhead barbed fitting mounted?", "Wie wird eine Schottverschraubung mit Schlauchtülle eingebaut?"],
  ["Is a 2D drawing available for {0}?", "Ist für {0} eine 2D-Zeichnung verfügbar?"],
  ["Is the flow bore the same as the thread size?", "Entspricht der Durchgangsdurchmesser der Gewindegröße?"],
  ["Is {0} compatible with my fluid?", "Ist {0} mit meinem Medium verträglich?"],
  ["Is {0} compatible with the intended fluid?", "Ist {0} mit dem vorgesehenen Medium verträglich?"],
  ["Is {0} valved or non-valved?", "Hat {0} ein Absperrventil?"],
  ["It closes a matching female Luer port. Verify the mating dimensions and assembled fit before use.", "Er verschließt eine passende Luer-Buchse. Prüfen Sie vor der Verwendung die Abmessungen der Gegenstücke und den Sitz nach der Montage."],
  ["It fits tubing with an ID of {0}.", "Die Ausführung passt zu Schläuchen mit {0} Innendurchmesser."],
  ["It mounts through an instrument panel, enclosure or partition to connect tubing on both sides.", "Die Schottverschraubung wird durch eine Geräteplatte, Gehäusewand oder Trennwand montiert und verbindet die Schläuche auf beiden Seiten."],
  ["It provides a quick-disconnect point in the equipment fluid path.", "Die Kupplung ermöglicht das schnelle Trennen an einer Stelle im Geräteflüssigkeitsweg."],
  ["It provides a quick-disconnect point in the equipment fluid path; the valve shuts off flow on this side when disconnected.", "Die Kupplung ermöglicht das schnelle Trennen an einer Stelle im Geräteflüssigkeitsweg. Beim Trennen sperrt das Ventil diese Seite ab."],
  ["It restricts reverse flow to reduce backflow in the fluid circuit.", "Das Ventil begrenzt den Durchfluss in Gegenrichtung und verringert dadurch den Rückfluss im Flüssigkeitskreislauf."],
  ["It uses a {0} threaded connection.", "Die Ausführung hat einen Gewindeanschluss der Größe {0}."],
  ["Match the tubing by its inside diameter, then check the material, hardness and actual assembled fit.", "Wählen Sie den Schlauch nach seinem Innendurchmesser aus. Prüfen Sie anschließend Werkstoff, Härte und Sitz im montierten Zustand."],
  ["Need help choosing a bulkhead barbed fitting?", "Benötigen Sie Hilfe bei der Auswahl einer Schottverschraubung mit Schlauchtülle?"],
  ["Need help choosing a check valve?", "Benötigen Sie Hilfe bei der Auswahl eines Rückschlagventils?"],
  ["Need help choosing a quick-disconnect coupling?", "Benötigen Sie Hilfe bei der Auswahl einer Schnellverschlusskupplung?"],
  ["Need help choosing an inline filter?", "Benötigen Sie Hilfe bei der Auswahl eines Inline-Filters?"],
  ["Select it for the actual fluid, flow rate, opening conditions, operating pressure, temperature and installation direction.", "Berücksichtigen Sie bei der Auswahl das tatsächliche Medium, den Durchfluss, die Öffnungsbedingungen, den Betriebsdruck, die Temperatur und die Einbaurichtung."],
  ["Select {0}, {1}, {2} or another listed material for fluid compatibility, temperature, strength and cleanliness requirements.", "Wählen Sie {0}, {1}, {2} oder einen anderen aufgeführten Werkstoff entsprechend den Anforderungen an Medienverträglichkeit, Temperatur, Festigkeit und Sauberkeit."],
  ["Share the connection size, coupling half, valve configuration, mounting method, materials and operating conditions. Our engineers will help identify a standard model.", "Nennen Sie uns Anschlussgröße, Kupplungshälfte, Ventilausführung, Montageart, Werkstoffe und Betriebsbedingungen. Unser technisches Team unterstützt Sie bei der Auswahl eines Standardmodells."],
  ["Share the connection size, fluid, flow rate, pressure, opening conditions and installation direction. Our engineers can help review the suitable product.", "Nennen Sie uns Anschlussgröße, Medium, Durchfluss, Druck, Öffnungsbedingungen und Einbaurichtung. Unser technisches Team prüft die Eignung des Produkts."],
  ["Share the filtration requirement, connection size, flow rate, pressure, fluid and temperature. Our engineers can help review the suitable filter.", "Nennen Sie uns Filtrationsanforderungen, Anschlussgröße, Durchfluss, Druck, Medium und Temperatur. Unser technisches Team prüft, welcher Filter geeignet ist."],
  ["Share the thread, tubing ID, tubing material, fluid and mounting-space requirements. Our engineers will help check the suitable model.", "Nennen Sie uns Gewinde, Schlauchinnendurchmesser, Schlauchwerkstoff, Medium und verfügbaren Einbauraum. Unser technisches Team prüft, welches Modell geeignet ist."],
  ["The body is made from {0}. Check fluid compatibility at the intended temperature and operating conditions.", "Das Gehäuse besteht aus {0}. Prüfen Sie die Medienverträglichkeit bei der vorgesehenen Temperatur und unter den tatsächlichen Betriebsbedingungen."],
  ["The bore describes the internal flow passage. The thread size identifies the connection standard; these are separate dimensions.", "Der Durchgangsdurchmesser beschreibt den inneren Strömungskanal. Die Gewindegröße bezeichnet die Anschlussnorm. Die beiden Maße sind getrennt zu betrachten."],
  ["The catalog lists white {0} and natural {1} versions, both packed in quantities of {2}.", "Der Katalog führt weißes {0} und naturfarbenes {1} auf, jeweils in Verpackungseinheiten zu {2}."],
  ["The filter specification code in the model designation is {0}.", "Der Code für die Filterspezifikation in der Modellbezeichnung lautet {0}."],
  ["The listed connection size is {0}.", "Die angegebene Anschlussgröße beträgt {0}."],
  ["The listed connection size is {0}. Also check the mating tubing dimensions before assembly.", "Die angegebene Anschlussgröße beträgt {0}. Prüfen Sie vor der Montage auch die Maße des anzuschließenden Schlauchs."],
  ["The model has an associated 2D drawing, shown with its available documents. Check the drawing revision before using it for design or assembly.", "Die zugehörige 2D-Zeichnung ist in den verfügbaren Unterlagen aufgeführt. Prüfen Sie den Zeichnungsstand, bevor Sie die Zeichnung für Konstruktion oder Montage verwenden."],
  ["This is a diaphragm check valve.", "Dies ist ein Membran-Rückschlagventil."],
  ["This is a {0}-series inline filter.", "Dies ist ein Inline-Filter der Baureihe {0}."],
  ["This is an inline model, normally used for direct connections within the tubing run.", "Diese Ausführung ist für den direkten Einbau in den Leitungsverlauf vorgesehen."],
  ["This model fits tubing with an ID of {0}. Check the tubing material and dimensional tolerances during assembly.", "Das Modell passt zu Schläuchen mit {0} Innendurchmesser. Prüfen Sie bei der Montage den Schlauchwerkstoff und die Maßtoleranzen."],
  ["This model has a shutoff valve.", "Dieses Modell hat ein Absperrventil."],
  ["This model is non-valved.", "Dieses Modell ist ohne Absperrventil ausgeführt."],
  ["This model supports panel mounting for connections on equipment panels, enclosures or fixed brackets.", "Dieses Modell ist für die Montage in Geräteplatten, Gehäusewänden oder festen Halterungen geeignet."],
  ["This model uses a {0} thread.", "Dieses Modell hat ein Gewinde der Größe {0}."],
  ["Use the port combinations listed for the specific available model. For an unlisted combination, submit a custom inquiry.", "Verwenden Sie die für das jeweilige verfügbare Modell aufgeführten Anschlusskombinationen. Andere Kombinationen können Sie als Sonderausführung anfragen."],
  ["What connection does {0} use?", "Welchen Anschluss hat {0}?"],
  ["What is the body material of {0}?", "Aus welchem Werkstoff besteht das Gehäuse von {0}?"],
  ["What is the connection size of {0}?", "Welche Anschlussgröße hat {0}?"],
  ["What standard materials and pack sizes are listed?", "Welche Standardwerkstoffe und Verpackungseinheiten sind aufgeführt?"],
  ["What thread does {0} use?", "Welches Gewinde hat {0}?"],
  ["What tubing ID fits {0}?", "Welcher Schlauchinnendurchmesser passt zu {0}?"],
  ["What type of check valve is {0}?", "Was für ein Rückschlagventil ist {0}?"],
  ["What type of filter is {0}?", "Was für ein Filter ist {0}?"],
  ["When should I use a union or a tee?", "Wann verwende ich einen geraden Verbinder und wann ein T-Stück?"],
  ["Which port does a male Luer plug close?", "Welchen Anschluss verschließt ein Luer-Steckstopfen?"],
  ["Yes.", "Ja."],
  ["{0} is a bulkhead barbed fitting with a {1} thread, for tubing with an ID of {2}. Body material: {3}.", "{0} ist eine Schottverschraubung mit Schlauchtülle und einem Gewinde der Größe {1} für Schläuche mit {2} Innendurchmesser. Gehäusewerkstoff: {3}."],
  ["{0} is a diaphragm check valve with a {1} connection and a {2} body.", "{0} ist ein Membran-Rückschlagventil mit einem {1}-Anschluss und einem Gehäuse aus {2}."],
  ["{0} is a male Luer plug made from {1}, for closing a matching female Luer port.", "{0} ist ein Luer-Steckstopfen aus {1} zum Verschließen einer passenden Luer-Buchse."],
  ["{0} is a {1} for tubing with an ID of {2}. Made from {3}, it is intended for fluid connections in microfluidic systems, {4} equipment, analytical instruments and laboratory automation.", "{0}: {1} aus {3} für Schläuche mit {2} Innendurchmesser. Vorgesehen für Flüssigkeitsverbindungen in mikrofluidischen Systemen, {4}-Geräten, Analysengeräten und der Laborautomation."],
  ["{0} is a {1} made from {2}, for fluidic assemblies in microfluidic systems, {3} equipment, analytical instruments and laboratory automation.", "{0}: {1} aus {2} für Fluidikbaugruppen in mikrofluidischen Systemen, {3}-Geräten, Analysengeräten und der Laborautomation."],
  ["{0} is a {1} with a {2} thread, for tubing with an ID of {3}. Body material: {4}. It is intended for fluid connections in microfluidic systems, {5} equipment, analytical instruments and laboratory automation.", "{0}: {1} mit einem Gewinde der Größe {2} für Schläuche mit {3} Innendurchmesser. Gehäusewerkstoff: {4}. Vorgesehen für Flüssigkeitsverbindungen in mikrofluidischen Systemen, {5}-Geräten, Analysengeräten und der Laborautomation."],
  ["{0} is a {1} with a {2} thread, made from {3}. It is used in fluidic assemblies for microfluidic systems, {4} equipment, analytical instruments and laboratory automation.", "{0}: {1} aus {3} mit einem Gewinde der Größe {2}. Vorgesehen für Fluidikbaugruppen in mikrofluidischen Systemen, {4}-Geräten, Analysengeräten und der Laborautomation."],
  ["{0} is a {1} with {2} female ports and a {3} flow bore. Made from {4}, it connects fluid paths in microfluidic systems, {5} equipment, analytical instruments and laboratory automation.", "{0}: {1} aus {4} mit Innengewindeanschlüssen der Größe {2} und einem Durchgangsdurchmesser von {3}. Zum Verbinden von Flüssigkeitswegen in mikrofluidischen Systemen, {5}-Geräten, Analysengeräten und der Laborautomation."],
  ["{0} is a {1}-series inline filter with a {2} connection and a {4} body. Filter specification code: {3}.", "{0} ist ein Inline-Filter der Baureihe {1} mit einem {2}-Anschluss und einem Gehäuse aus {4}. Code für die Filterspezifikation: {3}."],
  ["{0} is a {1} for tubing with an ID of {2}.", "{0}: {1} für Schläuche mit {2} Innendurchmesser."],
  ["{0} is a {1} with a {2} threaded connection.", "{0}: {1} mit einem Gewindeanschluss der Größe {2}."],
  ["It has a {0} housing and {1} seals, and mounts through a panel.", "Die Ausführung hat ein Gehäuse aus {0} und Dichtungen aus {1}. Sie ist für die Schottmontage vorgesehen."],
  ["It has a {0} housing and {1} seals, with an inline mounting configuration.", "Die Ausführung hat ein Gehäuse aus {0} und Dichtungen aus {1}. Sie wird direkt in den Leitungsverlauf eingebaut."],
  ["A valved half closes its side of the fluid path when disconnected.", "Eine Kupplungshälfte mit Absperrventil schließt ihre Seite des Flüssigkeitswegs beim Trennen."],
  ["A non-valved half leaves that side open.", "Bei einer Hälfte ohne Absperrventil bleibt diese Seite offen."],
  ["Identify the inlet and outlet using the product marking or drawing.", "Bestimmen Sie Ein- und Auslass anhand der Produktkennzeichnung oder der Zeichnung."],
  ["Installing the valve backwards can prevent the fluid circuit from operating correctly.", "Der Einbau entgegen der vorgesehenen Durchflussrichtung kann die Funktion des Flüssigkeitskreislaufs beeinträchtigen."],
  ["fixed male Luer insert", "Feststehender Luer-Steckeinsatz"],
  ["rotating male Luer insert", "Drehbarer Luer-Steckeinsatz"],
  ["male Luer fitting with rotating locking collar", "Luer-Stecker mit drehbarem Verriegelungsring"],
  ["male Luer fitting with fixed locking collar", "Luer-Stecker mit festem Verriegelungsring"],
  ["one-piece male Luer fitting", "Einteiliger Luer-Stecker"],
  ["female Luer fitting", "Luer-Buchse"],
  ["bulkhead female Luer fitting", "Luer-Schottbuchse"],
  ["Luer identification ring", "Luer-Kennzeichnungsring"],
  ["internally threaded Luer sleeve", "Luer-Innengewindehülse"],
  ["knurled Luer nut", "Gerändelte Luer-Mutter"],
  ["male Luer plug", "Luer-Steckstopfen"],
  ["square-body female-thread union", "Innengewindeverbinder mit Vierkantkörper"],
  ["bulkhead female-thread union", "Schottverbinder mit Innengewinde"],
  ["straight female-thread union", "Gerader Innengewindeverbinder"],
  ["tee female-thread adapter", "T-Adapter mit Innengewinde"],
  ["Y female-thread adapter", "Y-Adapter mit Innengewinde"],
  ["bulkhead barbed fitting", "Schottverschraubung mit Schlauchtülle"],
  ["PE-series inline filter", "Inline-Filter der PE-Baureihe"],
  ["diaphragm check valve", "Membran-Rückschlagventil"],
  ["Before assembly, also check the mating tubing dimensions and connection method.", "Prüfen Sie vor der Montage auch die Maße des anzuschließenden Schlauchs und die Anschlussart."],
  ["Body material: {0}", "Gehäusewerkstoff: {0}"],
  ["Body material: {0}.", "Gehäusewerkstoff: {0}."],
  ["Confirm the fluid, filtration requirement, flow rate, pressure and temperature when selecting the filter.", "Prüfen Sie bei der Filterauswahl Medium, Filtrationsanforderungen, Durchfluss, Druck und Temperatur."],
  ["It captures particles and prefilters instrument fluids to help protect pumps, valves and other components.", "Der Filter hält Partikel zurück und filtert Flüssigkeiten im Gerät vor. Das schützt Pumpen, Ventile und weitere Bauteile."],
  ["It connects tubing on opposite sides of an instrument panel, enclosure or partition.", "Die Schottverschraubung verbindet Schläuche auf beiden Seiten einer Geräteplatte, Gehäusewand oder Trennwand."],
  ["Use the official technical documentation or engineering confirmation for the actual filtration rating and performance.", "Entnehmen Sie die tatsächliche Filterfeinheit und Leistung den offiziellen technischen Unterlagen oder lassen Sie diese vom technischen Team bestätigen."],
  ["{0} is a {1} with a {2} thread, for tubing with an ID of {3}.", "{0}: {1} mit einem Gewinde der Größe {2} für Schläuche mit {3} Innendurchmesser."],
  ["{0} is a {1} with a {2} connection and a {3} body.", "{0}: {1} mit einem {2}-Anschluss und einem Gehäuse aus {3}."],
  ["Filter specification code: {0}.", "Code für die Filterspezifikation: {0}."],
]);

const templates = [...remainingFittingCopy]
  .filter(([english]) => english.includes("{0}"))
  .sort(([first], [second]) => second.replace(/\{\d+\}/g, "").length - first.replace(/\{\d+\}/g, "").length)
  .map(([english, german]) => {
    const slots: string[] = [];
    const pattern = english.split(/(\{\d+\})/).map(part => {
      if (/^\{\d+\}$/.test(part)) {
        slots.push(part);
        return "(.+?)";
      }
      return part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("");
    return { german, slots, pattern: new RegExp("^" + pattern + "$") };
  });

export function getGermanRemainingFittingText(english: string): string {
  const exact = remainingFittingCopy.get(english);
  if (exact) return exact;

  const quickConnectName = /^(Q20|Q40|Q60) (straight|elbow) (valved|non-valved) coupling (insert|body)$/.exec(english);
  if (quickConnectName) {
    const [, series, shape, valve, half] = quickConnectName;
    const part = half === "insert" ? "Schnellkupplungsstecker" : "Schnellkupplungsbuchse";
    return `${part} ${series}, ${shape === "straight" ? "gerade" : "gewinkelt"}, ${valve === "valved" ? "mit" : "ohne"} Absperrventil`;
  }

  for (const { german, slots, pattern } of templates) {
    const match = pattern.exec(english);
    if (!match || match.slice(1).some(value => /[.!?]\s+(?=[A-Z])/.test(value))) continue;
    const values = new Map(slots.map((slot, index) => [slot, getGermanRemainingFittingText(match[index + 1])]));
    return german.replace(/\{\d+\}/g, slot => values.get(slot) ?? slot);
  }

  const sentences = english.split(/(?<=[.!?])\s+(?=[A-Z])/g);
  return sentences.length > 1 ? sentences.map(getGermanRemainingFittingText).join(" ") : english;
}
