export const cvKvMicrofluidicsSlug = "cv-kv-correction-for-microfluidics";

export const germanCvKvMetadata = {
  "title": "Technischer Leitfaden: Cv/Kv-Korrektur für Mikrofluidik und Präzisionsdrosseln",
  "summary": "Herkömmliche Cv/Kv-Berechnungen gehen von turbulenter Strömung aus. Bei sehr kleinen Durchmessern und niedrigen Reynolds-Zahlen kann diese Annahme den Druckverlust erheblich unterschätzen. Dieser Leitfaden beschreibt ein Korrekturverfahren für die Entwicklung von Fluidiksystemen und Geräten.",
  "seoTitle": "Cv/Kv-Korrektur für mikrofluidische Systeme bei niedrigen Reynolds-Zahlen",
  "seoDescription": "Warum herkömmliche Cv/Kv-Berechnungen den Druckverlust in mikrofluidischen Systemen unterschätzen können und wie Reynolds-Korrektur, Churchill-Reibungsbeiwert und Blendenkorrektur angewendet werden."
};

export const germanCvKvPythonText: Readonly<Record<string, string>> = {
  '    # Darcy friction factor; scalar, single-phase pipe-flow example.':
    '    # Darcy-Reibungsbeiwert für ein skalares Beispiel mit einphasiger Rohrströmung.',
  '        raise ValueError("Require Re > 0 and eps_d >= 0")':
    '        raise ValueError("Erforderlich: Re > 0 und eps_d >= 0")',
  '    # Supply the measured calibration Re; do not infer it from diameter.':
    '    # Gemessene Kalibrier-Reynolds-Zahl eingeben. Nicht aus dem Durchmesser ableiten.',
  '        raise ValueError("Require L/d > 0 and local loss >= 0")':
    '        raise ValueError("Erforderlich: L/d > 0 und örtlicher Verlustbeiwert >= 0")',
  '    # Illustrative fit only: determine Re_c from component test data.':
    '    # Beispielhafte Anpassung. Re_c aus Prüfdaten des Bauteils bestimmen.',
  '        raise ValueError("Require Re > 0 and fitted Re_c > 0")':
    '        raise ValueError("Erforderlich: Re > 0 und angepasster Wert Re_c > 0")',
};

export const germanCvKvCopy = {
  "intro": {
    "title": "Warum herkömmliche Cv/Kv-Berechnungen in der Mikrofluidik versagen können",
    "paragraphs": [
      "Cv und Kv werden häufig verwendet, um die Durchflusskapazität von Ventilen, Drosseln und anderen Fluidikkomponenten zu vergleichen.",
      "Mikrofluidische Geräte verwenden häufig Durchlässe von 0,1 bis 0,5 mm. Am Arbeitspunkt kann laminare Strömung oder Übergangsströmung vorliegen.",
      "Wird der veröffentlichte Durchflusskoeffizient unter diesen Bedingungen als konstant angesetzt, kann der Druckverlust unterschätzt werden. Dadurch können Bauteile oder Pumpen falsch ausgelegt werden."
    ],
    "notice": "Die Gleichung gilt innerhalb des Strömungsbereichs, in dem der veröffentlichte Koeffizient bestimmt wurde. Außerhalb dieses Bereichs steigt das Risiko eines fehlerhaften Ergebnisses."
  },
  "assumptions": {
    "title": "Technische Annahmen gängiger Cv/Kv-Verfahren",
    "paragraphs": [
      "Übliche diagrammbasierte Auswahlverfahren vereinfachen die Gleichung für den Durchflusskoeffizienten von Flüssigkeiten.",
      "Die grundlegende Annahme lautet, dass der Druckverlust proportional zum Quadrat des Volumenstroms bleibt. Die angegebenen Grenzen für Viskosität und kritischen Druck bestimmen den praktischen Geltungsbereich."
    ],
    "cards": [
      {
        "label": "Zusammenhang im Auswahldiagramm",
        "value": "Kv = Q ÷ (Fgm × Fsg)",
        "description": "Volumenstrom geteilt durch die Faktoren für Druckverlust und relative Dichte."
      },
      {
        "label": "Druckfaktor",
        "value": "Fgm = √Δp",
        "description": "Der Druckverlust geht unter der Quadratwurzel ein."
      },
      {
        "label": "Relative Dichte",
        "value": "Fsg = 1 ÷ √SG",
        "description": "SG bezeichnet die relative Dichte der Flüssigkeit."
      },
      {
        "label": "Gleichwertige Gleichung",
        "value": "Kv = Q × √(SG ÷ Δp)",
        "description": "Setzen Sie Q in m³/h, Δp in bar und SG als Dichteverhältnis zu Wasser ein. Werte in mL/min und kPa müssen zuerst umgerechnet werden."
      }
    ]
  },
  "correction": {
    "title": "Reynolds-Korrektur für tatsächliche Betriebsbedingungen",
    "paragraphs": [
      "Der Reynolds-Korrekturfaktor Fᵣ beschreibt, wie die wirksame Durchflusskapazität abnimmt, wenn der Arbeitspunkt von der Kalibrierbedingung abweicht.",
      "Das Verfahren verbindet den veröffentlichten Koeffizienten mit dem zu erwartenden Widerstand des tatsächlichen Durchlasses."
    ],
    "cards": [
      {
        "label": "Wirksamer Durchflusskoeffizient",
        "value": "Cv(Re) = Cv₀ × Fᵣ(Re)",
        "description": "Rechnet den veröffentlichten Koeffizienten auf die Betriebsbedingungen um."
      },
      {
        "label": "Korrigierter Druckverlust",
        "value": "ΔPactual = ΔPcalc ÷ Fᵣ²",
        "description": "Bereits ein mäßiger Rückgang von Fᵣ kann zu einem deutlich höheren Druckverlust führen."
      },
      {
        "label": "Grundlage der Widerstandsberechnung",
        "value": "Fᵣ(Re) = √[K₀ ÷ K(Re)]",
        "description": "Vergleicht den Gesamtwiderstand unter Kalibrier- und Betriebsbedingungen."
      }
    ]
  },
  "channel": {
    "title": "Lange Mikrokanäle und Kapillaren: Ansatz nach Churchill",
    "paragraphs": [
      "Bei Durchlässen mit einem hohen Verhältnis L/d dominiert meist die über die Länge wirkende Wandreibung.",
      "Die Churchill-Korrelation liefert eine durchgängige Gleichung für laminare, Übergangs- und turbulente Strömung. Verwenden Sie bei glatten Mikrokanälen eine physikalisch erreichbare Reynolds-Zahl für die Kalibrierung.",
      "Die tabellierten Recal-Werte sind ausgewählte Rechenbeispiele. Der Durchmesser allein bestimmt keine physikalische Obergrenze. Die f₀-Werte wurden mit der Churchill-Korrelation für den Darcy-Reibungsbeiwert eines glatten Rundrohrs ohne relative Rauheit neu berechnet. Bestätigen Sie den tatsächlichen Kalibrierpunkt durch Messung."
    ],
    "card": {
      "label": "Korrektur für lange Kanäle",
      "value": "Fᵣ = √[(f₀·L/d + ζlocal) ÷ (f(Re)·L/d + ζlocal)]",
      "description": "f₀ ist der Reibungsbeiwert bei der Kalibrierung und f(Re) der Wert im Betrieb."
    },
    "tableHeaders": [
      "Durchmesser",
      "Beispiel für Recal (zu prüfen)",
      "Referenzwert f₀",
      "Technische Einordnung"
    ],
    "assessments": [
      {
        "assessment": "Laminares Beispiel. Es liefert keine garantiert konservative Abschätzung."
      },
      {
        "assessment": "Typische Kalibrierbedingung für einen Mikrokanal"
      },
      {
        "assessment": "Übergang aus dem laminaren Strömungsbereich"
      },
      {
        "assessment": "Turbulentes Beispiel. Rauheit prüfen."
      },
      {
        "assessment": "Beispiel mit hoher Reynolds-Zahl. Vollraue Strömung liegt nicht zwangsläufig vor."
      }
    ],
    "notice": "Wird der Reibungsbeiwert eines größeren Rohrs bei hoher Reynolds-Zahl auf einen glatten Durchlass von 0,1 mm übertragen, kann sein tatsächlicher Widerstand erheblich unterschätzt werden."
  },
  "orifice": {
    "title": "Dünne Blenden und kurze Drosseln: Korrektur örtlicher Verluste",
    "paragraphs": [
      "Bei dünnen Blenden und kurzen Drosseln überwiegen häufig die örtlichen Verluste gegenüber der über die Länge wirkenden Wandreibung.",
      "Einlaufform, Kantenradius, Fase und Länge des Durchlasses können die charakteristische Reynolds-Zahl verschieben."
    ],
    "cards": [
      {
        "label": "Blendenkorrektur",
        "value": "Fᵣ(Re) = 1 ÷ √(1 + Rec ÷ Re)",
        "description": "Dies ist ein vereinfachtes Modell für die Anpassung an Messdaten. Bestimmen Sie Rec experimentell für die tatsächliche Geometrie und Flüssigkeit. Ein allgemeingültiger Wert Rec = 30 ist nicht vorgegeben."
      },
      {
        "label": "Abhängigkeit von der Geometrie",
        "value": "Fasen und verrundete Einläufe verändern Rec",
        "description": "Radien und Fasen verändern das Ausflussverhalten. Aus der Einlaufform allein lässt sich Rec = 200–400 nicht ableiten."
      }
    ]
  },
  "rules": {
    "title": "Fünf technische Prüfungen vor der Verwendung eines veröffentlichten Cv/Kv-Werts",
    "items": [
      {
        "title": "Das quadratische Gesetz bei niedrigen Reynolds-Zahlen gesondert prüfen",
        "description": "Bei laminarer und Übergangsströmung verändert sich der Widerstand mit der Reynolds-Zahl."
      },
      {
        "title": "Für glatte Mikrokanäle eigene Vergleichswerte bestimmen",
        "description": "Die erreichbaren Kalibrierbedingungen unterscheiden sich grundsätzlich von denen großer Rohre."
      },
      {
        "title": "Im Übergangsbereich ein robustes numerisches Lösungsverfahren verwenden",
        "description": "Im Bereich von etwa 2000–4000 kann der Verlauf nicht monoton sein."
      },
      {
        "title": "Örtliche Verlustbeiwerte an die tatsächliche Geometrie anpassen",
        "description": "Eine gerade Verbindung mit gleichem Durchmesser unterscheidet sich von einem Behältereinlauf."
      },
      {
        "title": "Verluste externer Leitungen vom Cv/Kv-Wert des Bauteils abziehen",
        "description": "Die Widerstände von Prüfschläuchen und Fittings müssen getrennt vom Bauteilwiderstand bestimmt werden."
      }
    ]
  },
  "conclusion": {
    "title": "Fazit für die Auslegung",
    "paragraphs": [
      "Veröffentlichte Cv/Kv-Werte sind kalibrierte Parameter für festgelegte Bedingungen.",
      "Bestimmen Sie den Strömungsbereich, berücksichtigen Sie die tatsächliche Geometrie und prüfen Sie das korrigierte Ergebnis anhand von Messdaten.",
      "Dadurch sinkt das Risiko einer falschen Pumpenauslegung. Zugleich lässt sich das Verhalten von Ventilen und vollständigen Fluidiknetzen besser vorhersagen."
    ]
  },
  "code": {
    "title": "Python-Beispiel für die technische Auswertung",
    "introduction": "Das Beispiel berechnet den Darcy-Reibungsbeiwert und vergleicht den Widerstand langer Kanäle anhand einer ausdrücklich angegebenen, gemessenen Kalibrier-Reynolds-Zahl. Für das Blendenmodell ist ein separat an Messdaten angepasster Wert für Rec erforderlich.",
    "note": "Verwenden Sie das Verfahren für einphasige, inkompressible Newtonsche Strömung unter den beschriebenen geometrischen Annahmen. Fᵣ bezieht sich auf den gewählten Kalibrierpunkt. Das Verfahren liefert keine universelle Gleichung zur Ventilauslegung. Recal, Rauheit und örtlicher Druckverlust müssen dasselbe Bauteil und denselben Prüfaufbau beschreiben."
  }
};
