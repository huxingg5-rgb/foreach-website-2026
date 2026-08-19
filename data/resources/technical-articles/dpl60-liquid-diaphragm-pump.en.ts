import type { Dpl60ArticleCopy } from "./dpl60-liquid-diaphragm-pump.types";

export const dpl60ArticleEnCopy = {
  metadata: {
    title: "How to Select a 600 mL/min Liquid Diaphragm Pump: DPL60 Flow, Pressure and Model Guide",
    seoTitle: "600 mL/min Liquid Diaphragm Pump Selection: DPL60 Operating Point and Models",
    seoDescription:
      "Select a FOREACH DPL60 miniature liquid diaphragm pump by no-load flow, 100 kPa rated pressure, flow-pressure curve, motor, wetted materials, model coding, configuration logic and selection method.",
  },
  diagram: {
    ariaLabel: "DPL60 liquid diaphragm pump operating-point explanation",
    suctionTitle: "Inlet condition",
    dischargeTitle: "Outlet condition",
    inletOpen: "Inlet vacuum",
    outletClosed: "Circuit resistance",
    suctionDescription: "Suction conditions change the delivered flow",
    inletClosed: "Outlet back pressure",
    outletOpen: "Delivered flow",
    dischargeDescription: "The pump and system curves define the operating point",
    caption: "DPL60 operating-point explanation",
  },
  section1: {
    title: "1. What problem does a 600 mL/min DPL60 solve?",
    paragraphs: [
      "The DPL60 is FOREACH's miniature liquid diaphragm pump for higher-flow instrument circuits. It is intended for washing, flushing, circulation, larger-volume transfer and waste-liquid removal where liquid exchange must be faster than in a 300 mL/min-class circuit.",
      "Its 600 mL/min value is the no-load flow reference. Rated pressure is 100 kPa, self-priming height is 3 mH₂O, and standard choices include DC 12 V or 24 V, brushed or brushless motors, and EP/PS or FF/PS wetted-material sets.",
      "Like other miniature liquid diaphragm pumps, it uses reciprocating diaphragm motion and check valves. The central DPL60 question, however, is not the generic pumping principle but the operating point after the pump is installed in a real fluidic circuit.",
      "If the required duty is mainly around 300 mL/min, compare the DPL30. If back pressure rather than flow is the limiting factor, evaluate a higher-pressure pump instead of selecting only by the no-load flow number.",
    ],
  },
  section2: {
    title: "2. What must be confirmed before selecting a 600 mL/min pump?",
    intro:
      "The flow class alone is not a selection specification. Define the operating point, fluid, suction condition, wetted materials, motor, duty cycle and total circuit resistance together.",
    headers: ["Selection item", "What to confirm", "Common mistake"],
    rows: [
      ["Target flow", "No-load flow or required flow at a stated pressure", "Treating 600 mL/min as a fixed installed flow"],
      ["System pressure", "Losses across filters, valves, fittings, narrow tubing, nozzles and the endpoint", "Reading 100 kPa without checking flow at the target pressure"],
      ["Suction condition", "Liquid-level difference, suction-line length, airtightness and first start", "Assuming 3 mH₂O is guaranteed in every installation"],
      ["Wetted materials", "Pump head, diaphragm, valves and the full fluid condition", "Inferring whole-pump compatibility from PTFE or FFKM alone"],
      ["Motor and supply", "12 V or 24 V, brushed or brushless, and required control signals", "Selecting only by price or nominal life"],
      ["Circuit layout", "Length, bends and components used with 3.2 mm ID tubing", "Ignoring resistance and leakage in the assembled circuit"],
      ["Duty cycle", "Continuous or intermittent duty, daily hours, starts and thermal conditions", "Comparing life figures without their test condition"],
    ],
  },
  section3: {
    title: "3. Why is 600 mL/min not a fixed in-system flow?",
    paragraphs: [
      "The DPL60's 600 mL/min is a no-load reference near the low-pressure-difference region. The 100 kPa rating is a separate pressure specification, not the same operating point.",
      "Once installed, inlet vacuum and outlet pressure are created by tubing, filters, valves, fittings, restrictions, liquid-level differences and fluid properties. As differential pressure changes, delivered flow follows the official flow-pressure curve.",
      "If an instrument must sustain approximately 600 mL/min, determine the system pressure at that flow, check the available margin on the curve, and then test the complete circuit.",
    ],
    noticeStrong: "The DPL60 is a 600 mL/min-class pump, not a constant-flow 600 mL/min pump.",
    noticeText:
      "Do not combine “600 mL/min no-load flow” and “100 kPa rated pressure” into a claim of 600 mL/min at 100 kPa.",
  },
  section4: {
    title: "4. Complete DPL60 technical specifications",
    intro:
      "The following values come from the current DPL60 specification. Brushed and brushless versions share the same performance class but differ in mass and specified service life.",
    headers: ["Parameter", "Brushed version", "Brushless version"],
    rows: [
      { label: "Product", value: "DPL60 liquid diaphragm pump" },
      { label: "Model examples", brushed: "DPL60-24DB, DPL60-12DB", brushless: "DPL60-24BB, DPL60-12BB" },
      { label: "Motor", brushed: "DC brushed motor", brushless: "DC brushless motor" },
      { label: "Rated voltage", value: "DC 12 V ±10% or DC 24 V ±10%" },
      { label: "Rated power", value: "≤8.4 W" },
      { label: "No-load flow", value: "600 mL/min" },
      { label: "Rated pressure", value: "100 kPa" },
      { label: "Self-priming height", value: "3 mH₂O" },
      { label: "Specified medium", value: "Purified water; other liquids require application assessment" },
      { label: "Medium temperature", value: "+5°C to +80°C" },
      { label: "Tubing", value: "3.2 mm inner diameter" },
      { label: "Pump head", value: "PPS" },
      { label: "Diaphragm", value: "EPDM or PTFE, depending on model" },
      { label: "Valve", value: "EPDM or FFKM, depending on model" },
      { label: "Mass", brushed: "Approx. 170 g", brushless: "Approx. 195 g" },
      { label: "Specified life", brushed: "3,000 h, rated voltage, continuous operation", brushless: "10,000 h, rated voltage, continuous operation" },
    ],
  },
  section5: {
    title: "5. How should the DPL60 flow-pressure curve be read?",
    paragraphs: [
      "The official curve shows the flow trend as inlet vacuum or positive outlet pressure changes. Flow is highest near zero differential pressure and changes as suction becomes more difficult or outlet back pressure rises.",
      "Use the curve to find the flow available at the target pressure—not merely to restate the 600 mL/min label. Circuits with filters, small-bore valves, long narrow tubing or pressurized chambers need a pressure-loss estimate or measurement first.",
    ],
    figureAlt: "Official DPL60 liquid diaphragm pump flow-pressure curve",
    figureCaption: "DPL60 flow-pressure curve; 600 mL/min is the no-load flow reference",
    notice:
      "The curve is one input to selection. Viscosity, tubing layout, fittings, valves, filters, mounting and liquid level can shift the actual operating point; verify the completed circuit.",
  },
  section6: {
    title: "6. How should DPL60 wetted materials be selected?",
    intro:
      "The principal wetted parts are the PPS pump head, diaphragm and valves. Compatibility must be assessed for the complete material set and actual fluid conditions.",
    headers: ["Material set", "Diaphragm / valve", "Pump head and assessment"],
    rows: [
      ["EP/PS", "EPDM diaphragm + EPDM valve", "PPS head; confirm fluid, concentration, temperature and contact time"],
      ["FF/PS", "PTFE diaphragm + FFKM valve", "PPS head; confirm fluid, concentration, temperature and contact time"],
    ],
    epTitle: "EP/PS material set",
    epText:
      "EP/PS means an EPDM diaphragm, EPDM valves and a PPS pump head. It is a starting configuration for purified water and selected conventional liquids subject to assessment.",
    ffTitle: "FF/PS material set",
    ffText:
      "FF/PS means a PTFE diaphragm, FFKM valves and a PPS pump head. It can be evaluated for more demanding compatibility needs, but it does not make the entire pump universally chemical-resistant.",
    noticeStrong: "The specified working medium is purified water.",
    noticeText:
      "For another liquid, provide its identity, composition, concentration, temperature, continuous contact time and cleaning process, then assess the complete wetted path and validate a sample.",
  },
  section7: {
    title: "7. Brushed or brushless DPL60?",
    intro:
      "The versions differ not only in specified life but also in mass, motor envelope, wiring and control. Reserve installation space from the applicable formal drawing.",
    headers: ["Comparison", "Brushed", "Brushless"],
    rows: [
      ["Motor", "DC brushed", "DC brushless"],
      ["Specified life", "3,000 h", "10,000 h"],
      ["Life condition", "Rated voltage, continuous operation", "Rated voltage, continuous operation"],
      ["Typical fit", "Limited run time, simple control, cost-sensitive equipment", "Long duty, higher equipment-life targets or control and feedback"],
      ["Mass", "Approx. 170 g", "Approx. 195 g"],
      ["Control", "Basic power / start-stop", "Configuration-dependent PWM, DIR and FG functions"],
    ],
    afterTable:
      "Service life must retain its test condition. Back pressure, supply variation, ambient temperature, start frequency, cooling and fluid state can all change field life.",
    brushedTitle: "Brushed-version dimensions",
    brushedAlt: "Cropped DPL60 brushed liquid diaphragm pump dimension drawing",
    brushedCaption: "DPL60 brushed drawing body; use the official 2D drawing for installation dimensions",
    brushedText:
      "Check overall length, pump head, mounting holes, hose barb and tubing direction on the brushed drawing. Do not allocate space from the DPL30 or brushless envelope.",
    brushlessTitle: "Brushless-version dimensions",
    brushlessAlt: "Cropped DPL60 brushless liquid diaphragm pump dimension drawing",
    brushlessCaption: "DPL60 brushless drawing body; use the official 2D drawing for installation dimensions",
    brushlessText:
      "The brushless motor body, overall length and harness differ from the brushed version. Equivalent motor materials listed in formal documentation may have local mounting differences, so confirm the production version before release.",
  },
  section8: {
    title: "8. DPL60 model coding and interpretation",
    intro:
      "A full DPL60 code identifies the series, voltage, motor, lead configuration, connection, port orientation, diaphragm/valve/head materials and any special customization.",
    noticeStrong: "DPL60 - 24 - D - 2 - B - C - EP/PS - X",
    noticeText:
      "Series · voltage · motor · lead configuration · connection · port orientation · wetted materials · customization",
    headers: ["Field", "Code", "Meaning"],
    rows: [
      ["Series", "DPL60", "600 mL/min-class DPL60 liquid diaphragm pump"],
      ["Voltage", "24 / 12", "DC 24 V / DC 12 V"],
      ["Motor", "D / B / C / BP", "D: brushed DC; B: brushless DC; C: coreless; BP: brushless DC with external PWM"],
      ["Leads", "2 / 3 / 5", "2, 3 or 5 leads; default fields may be omitted from standard names"],
      ["Connection", "B / S", "B: hose barb; S: threaded port"],
      ["Port orientation", "3 / 6 / 9 / C", "3: right; 6: down; 9: left; C: up and may be omitted when default"],
      ["Wetted materials", "EP/PS / FF/PS", "EPDM + EPDM + PPS / PTFE + FFKM + PPS"],
      ["Customization", "X", "Project-specific code; absent when no special customization applies"],
    ],
    exampleTitle: "Example: DPL60-24DB-EP/PS",
    exampleText:
      "Expand this standard model as DPL60-24-D-2-B-C-EP/PS; the default two-lead and upward-port fields are omitted.",
    exampleHeaders: ["Field", "Interpretation"],
    exampleRows: [
      ["DPL60", "Product series, 600 mL/min-class liquid diaphragm pump"],
      ["24", "DC 24 V"],
      ["D", "DC brushed motor"],
      ["2 (default, omitted)", "Two leads"],
      ["B", "Hose-barb port"],
      ["C (default, omitted)", "Upward port orientation"],
      ["EP/PS", "EPDM diaphragm + EPDM valve + PPS pump head"],
    ],
    notice:
      "“DB” is not one indivisible code: D is the brushed motor and B is the hose-barb port. In DPL60-24BB-EP/PS, the first B is the brushless motor and the second B is the hose-barb port.",
    standardModelsTitle: "Eight current DPL60 standard models",
    standardModelsIntro:
      "The formal selection table covers 12 V / 24 V × brushed / brushless × EP/PS / FF/PS. Every model and item code below is rendered as searchable HTML text.",
    standardModelHeaders: ["No.", "Item code", "Standard model", "Voltage", "Motor", "Diaphragm", "Valve", "Head"],
    standardModelRows: [
      ["1", "459003", "DPL60-24DB-EP/PS", "24 V", "Brushed", "EPDM", "EPDM", "PPS"],
      ["2", "459004", "DPL60-24BB-EP/PS", "24 V", "Brushless", "EPDM", "EPDM", "PPS"],
      ["3", "459015", "DPL60-12DB-EP/PS", "12 V", "Brushed", "EPDM", "EPDM", "PPS"],
      ["4", "459016", "DPL60-12BB-EP/PS", "12 V", "Brushless", "EPDM", "EPDM", "PPS"],
      ["5", "459030", "DPL60-24DB-FF/PS", "24 V", "Brushed", "PTFE", "FFKM", "PPS"],
      ["6", "459031", "DPL60-24BB-FF/PS", "24 V", "Brushless", "PTFE", "FFKM", "PPS"],
      ["7", "459032", "DPL60-12DB-FF/PS", "12 V", "Brushed", "PTFE", "FFKM", "PPS"],
      ["8", "459033", "DPL60-12BB-FF/PS", "12 V", "Brushless", "PTFE", "FFKM", "PPS"],
    ],
  },
  section9: {
    title: "9. Complete DPL60 selection sequence",
    steps: [
      ["Define required working flow", "Separate a near-no-load 600 mL/min target from the flow required at a stated system pressure."],
      ["Determine system pressure", "Account for tubing, fittings, filters, valves, restrictions, liquid-level differences and endpoint pressure."],
      ["Read the official curve", "Locate the target operating point and confirm adequate performance margin."],
      ["Define the liquid", "Provide identity, composition, concentration, temperature, viscosity, particles and contact time."],
      ["Define suction conditions", "Record lift, suction-line length and diameter, airtightness and the first-start state."],
      ["Choose voltage and motor", "Select 12 V or 24 V and brushed or brushless from the supply, duty, life and control requirements."],
      ["Choose wetted materials", "Assess EP/PS or FF/PS against the complete fluid condition."],
      ["Check installation and ports", "Verify 3.2 mm ID tubing, drawing dimensions, port direction, harness and maintenance access."],
      ["Validate in the instrument", "Test flow, priming, noise, temperature rise, stability and long-term operation in the real circuit."],
    ],
  },
  section10: {
    title: "10. Suitable duties and application limits",
    intro:
      "The DPL60 can be evaluated for higher-flow liquid handling inside IVD, laboratory-automation and analytical instruments, including wash-liquid delivery, line flushing, circulation, larger-volume transfer and waste handling.",
    headers: ["Topic", "Boundary"],
    rows: [
      ["600 mL/min", "A no-load flow reference, not a fixed flow in every installed condition."],
      ["100 kPa", "A rated-pressure specification separate from no-load flow; read the curve at the target pressure."],
      ["Other liquids", "Purified water is the specified medium; other liquids need compatibility assessment and sample testing."],
      ["Self-priming", "3 mH₂O is a specified-condition value; actual start-up depends on the complete suction path."],
      ["Service life", "3,000 h brushed and 10,000 h brushless both retain the rated-voltage, continuous-operation condition."],
      ["Final validation", "Specifications, curves, drawings and materials support selection; confirm performance in the real instrument."],
    ],
  },
  section11: {
    title: "Conclusion",
    paragraphs: [
      "Select the DPL60 by separating “600 mL/min-class pump” from actual in-system flow, then combine the 100 kPa rating, official curve, fluid, suction condition, materials, supply, motor life and installation envelope to define the configuration.",
      "If the equipment must remain near 600 mL/min under meaningful back pressure, use the curve value at that target pressure and a complete-circuit test—not the no-load flow—as the performance basis.",
    ],
  },
  internalLinks: {
    dpl30Prefix: "For the full diaphragm/check-valve pumping sequence or a 300 mL/min-class comparison, read the",
    dpl30Label: "DPL30 liquid diaphragm pump selection guide",
    dpl30Suffix: ".",
    productPrefix: "For available configurations, drawings and downloads, open the",
    productLabel: "DPL60 liquid diaphragm pump product page",
    productSuffix: ".",
    categoryPrefix: "To compare other flow and pressure classes, return to the",
    categoryLabel: "liquid diaphragm pump category",
    categorySuffix: ".",
  },
} as const satisfies Dpl60ArticleCopy;
