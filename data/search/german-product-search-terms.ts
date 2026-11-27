const termsByFamily = new Map<string, readonly string[]>([
  ["piston-pump", ["Kolbenpumpe", "Kolbenpumpen", "Präzisionskolbenpumpe", "Keramikkolbenpumpe"]],
  ["miniature-diaphragm-pumps", ["Membranpumpe", "Membranpumpen", "Miniatur-Membranpumpe"]],
  ["pipetting-pumps", ["Pipettierpumpe", "Pipettierpumpen", "Pipettiermodul", "Pipettiermodule"]],
  ["syringe-pumps", ["Spritzenpumpe", "Spritzenpumpen", "OEM-Spritzenpumpe"]],
  ["valveless-metering-pump", ["Ventillose Dosierpumpe", "Ventillose Dosierpumpen", "Ventillose Kolbendosierpumpe"]],
  ["solenoid-valves", ["Magnetventil", "Magnetventile", "Membranmagnetventil"]],
  ["rotary-valves", ["Drehschaltventil", "Drehschaltventile", "Drehwahlventil", "Drehwahlventile"]],
  ["high-pressure-valves", ["Hochdruckventil", "Hochdruckventile", "Hochdruck-Drehschaltventil"]],
  ["sampling-probes", ["Probenahmesonde", "Probenahmesonden"]],
  ["piercing-probes", ["Einstechsonde", "Einstechsonden"]],
  ["wash-probes", ["Spülsonde", "Spülsonden", "Spuelsonde"]],
  ["stirring-paddles", ["Rührpaddel", "Ruehrpaddel"]],
  ["hard-tube-fittings", ["Fittings für starre Kapillaren und Rohre", "Kapillarfitting", "Flachboden-Fitting"]],
  ["barbed-fittings", ["Schlauchtülle", "Schlauchtüllen", "Schlauchtuelle", "Schlauchverbinder"]],
  ["thread-to-barbed-fittings", ["Gewinde-Schlauchtülle", "Gewinde-Schlauchtüllen"]],
  ["luer-fittings", ["Luer-Verbinder", "Luer-Anschluss"]],
  ["quick-connect-fittings", ["Schnellverschlusskupplung", "Schnellverschlusskupplungen", "Schnellkupplung"]],
  ["female-thread-adapters", ["Innengewindeadapter", "Adapter mit Innengewinde"]],
  ["bulkhead-barbed-fittings", ["Schottverschraubung", "Schottverschraubungen", "Schlauchtülle"]],
  ["filters", ["Inline-Filter", "Filter für Flüssigkeitsleitungen"]],
  ["check-valves", ["Rückschlagventil", "Rückschlagventile", "Rueckschlagventil"]],
  ["degassing-modules", ["Membranentgasung", "Membran-Entgasungsmodul"]],
  ["air-bubble-detectors", ["Luftblasendetektor", "Luftblasendetektoren"]],
  ["pressure-sensors", ["Drucksensor", "Drucksensoren", "Drucksensormodul"]],
  ["pvc-tubing", ["PVC-Schlauch", "PVC-Schläuche", "PVC Schlauch"]],
  ["tpu-tubing", ["TPU-Schlauch", "TPU-Schläuche", "TPU Schlauch"]],
  ["fep-tubing", ["FEP-Schlauch", "FEP-Schläuche", "FEP Schlauch"]],
  ["ptfe-tubing", ["PTFE-Schlauch", "PTFE-Schläuche", "PTFE Schlauch"]],
  ["peek-tubing", ["PEEK-Kapillare", "PEEK-Kapillaren", "PEEK-Schlauch"]],
  ["pfa-tubing", ["PFA-Schlauch", "PFA-Schläuche", "PFA Schlauch"]],
]);

export function getGermanProductSearchTerms(href: string): readonly string[] {
  const match = href.match(/^\/(?:en\/|de\/)?products\/[^/?#]+\/(?:selection\/)?([^/?#]+)/);
  return match ? termsByFamily.get(match[1]) ?? [] : [];
}
