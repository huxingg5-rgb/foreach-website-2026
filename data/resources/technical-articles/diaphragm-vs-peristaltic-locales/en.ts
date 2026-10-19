import { createComparisonCopy, type ComparisonTranslation } from "./shared";

const translation: ComparisonTranslation = {
  metadata: {
    title: "Miniature Diaphragm vs. Peristaltic Pumps: Pros, Cons and Selection for Instrument Fluidics",
    seoTitle: "Diaphragm vs. Peristaltic Pumps: Pros, Cons & Selection | FOREACH",
    seoDescription: "Compare miniature diaphragm and peristaltic pumps: differences, pros and cons, dosing accuracy, pulsation and maintenance for instrument wash, reagents and waste.",
    coverAlt: "FOREACH DPL30H-BS brushless high-pressure miniature liquid diaphragm pump",
  },
  deck: "Compare miniature liquid diaphragm and peristaltic pumps for analyzers and laboratory equipment. Explore working principles, advantages and disadvantages, dosing accuracy and maintenance costs, then apply the selection criteria to wash-liquid supply, reagent transfer and waste aspiration.",
  lead: "Consider a miniature liquid diaphragm pump for a fixed fluid path that can be cleaned and reused. Consider a peristaltic pump when the wetted path must be replaced between batches or bidirectional transfer is needed. Both must meet the actual fluid, flow, pressure and maintenance requirements; accuracy, pulsation and operating cost depend on the configuration.",
  scopeLabel: "Scope",
  scope: "This comparison covers miniature electrically driven liquid diaphragm pumps and roller peristaltic pumps in instrument fluidics. Large air-operated double-diaphragm pumps and industrial hose pumps have different operating envelopes. A gas diaphragm pump is not automatically suitable for pumping liquid.",
  overview: {
    title: "Miniature diaphragm vs. peristaltic pumps: key differences and comparison table",
    headers: ["Factor", "Miniature liquid diaphragm pump", "Peristaltic pump"],
    rows: [
      ["Main advantages", "Reusable chamber; fewer consumables associated with squeezed pump tubing; convenient fixed-path integration.", "Liquid stays inside the tube, simplifying tube replacement and fluid isolation. Reversible models can transfer in both directions."],
      ["Main limitations", "Chamber and valves require cleaning. Particles or crystals can affect check valves. Output is pulsating.", "Tubing fatigues and needs replacement. Loading and wear can alter flow and dispensing results."],
      ["Changing fluids", "Address residues in the chamber, diaphragm, valves and external tubing.", "Replacing wetted assemblies can simplify changeover, but shared components still need attention."],
      ["Maintenance focus", "Diaphragm, valves, seals and internal cleanliness.", "Tube life, loading, leaks and calibration after tube changes."],
      ["Typical selection priority", "Reusable, cleanable supply, replenishment and circulation circuits.", "Batch-specific wetted paths, single-use assemblies and bidirectional transfer."],
      ["Accuracy and pulsation", "Assess the model, controls and measured result at the point of use.", "Also requires testing, including changes over the tube's service interval."],
    ],
    note: "These advantages depend on the fluid path. Check wetted materials, flow at working pressure, duty cycle and access for maintenance. Pump type alone does not establish better accuracy or lower lifetime cost.",
  },
  principle: {
    title: "How do diaphragm and peristaltic pumps work?",
    paragraphs: [
      "A diaphragm pump changes its chamber volume by moving a flexible diaphragm. Inlet and outlet valves direct suction and discharge. Liquid contacts the chamber, diaphragm and valve components, so compatibility and cleaning must cover the complete wetted assembly.",
      "A peristaltic pump moves rollers along flexible tubing. Compression displaces liquid; the tube recovers behind each roller and refills. During normal operation, liquid remains inside the tube and does not contact the rollers. The tube is both the fluid barrier and a repeatedly deformed working component: its material, dimensions, recovery and condition affect performance.",
    ],
    diaphragmAlt: "Animation of diaphragm displacement and alternating inlet and outlet check-valve operation",
    diaphragmCaption: "During suction, chamber volume increases, the inlet valve opens and the outlet valve closes. During discharge, the sequence reverses.",
    animationLabel: "Open the animation",
    peristalticAlt: "Three rotor positions showing rollers compressing a liquid-filled tube and the direction of transport",
    peristalticCaption: "Rollers form moving occlusions that displace liquid inside the tube. Tube recovery behind the rollers allows further liquid to enter.",
  },
  details: {
    title: "Diaphragm and peristaltic pump pros and cons: accuracy, pulsation and maintenance",
    groups: [
      { title: "How does the wetted path affect cleaning and fluid changes?", paragraphs: [
        "Changing fluids in a diaphragm pump requires cleaning its internal wetted parts; replacing external tubing does not remove chamber or valve residues. A reusable chamber can suit a fixed circuit carrying the same wash liquid when cleaning effectiveness is validated. Check every selected pump-head, diaphragm and valve material against both the process liquid and cleaning agents.",
        "With a peristaltic pump, replacing tubing removes residues from that section and can become part of batch changeover. Shared reservoirs, fittings and downstream components still need cleaning or replacement. Sterility and carryover are properties of the complete fluid path and process. Tubing must withstand the chemicals, temperature, pressure and repeated compression; ordinary transfer tubing is not automatically suitable as pump tubing.",
      ] },
      { title: "What maintenance does each pump need?", paragraphs: [
        "A diaphragm pump avoids the roller-driven tube fatigue of peristaltic pumping, but diaphragms, valves and seals still wear. Deposits, fibres or crystals can prevent valves from closing, causing backflow, slower priming or reduced output. Check cleanliness, sealing and delivered performance, and confirm whether the selected pump head permits field servicing.",
        "Peristaltic tubing repeatedly flexes as it carries the liquid. Fatigue can change recovery and flow; eventual rupture can cause leakage. Inspect and replace tubing for the actual duty, confirm correct loading and recalibrate where required. Easy tube replacement is useful, but tubing, labour and downtime remain recurring costs.",
        "Allow service access for either design. Compare purchase cost, consumables, cleaning, labour, calibration and downtime over the same operating schedule. Neither the pump type nor its purchase price alone determines lifetime cost.",
      ] },
      { title: "What changes when suck-back or bidirectional transfer is required?", paragraphs: [
        "In a conventional liquid diaphragm pump, check valves determine flow direction; reversing the motor usually does not reverse liquid flow. A special pump design or fluid-path switching may be needed. A peristaltic pump that supports reverse operation can change flow direction with rotor rotation, making it a candidate for suck-back or two-way transfer. Confirm the pump head, tubing, drive and controls support the operation, then test residual liquid and dripping after suck-back.",
      ] },
      { title: "Which pump offers better accuracy or lower pulsation?", paragraphs: [
        "There is no answer based on pump type alone. Diaphragm strokes and valve motion, and roller compression and tube recovery, all create periodic output. A stable average flow can hide peaks and intervals of low flow. Reservoir replenishment may mainly depend on accumulated volume, while a flow cell may also need a stable instantaneous flow. Measure at the actual point of use before selecting damping, pump-head arrangements or control compensation.",
        "For dispensing, compare candidates using the same target dose, liquid, inlet level, outlet pressure and cycle. Record mean dose error and the spread of repeated doses, including restart after a stop. For peristaltic pumps, compare new tubing with tubing near its planned replacement point. Keep the conditions with the results; free-flow data cannot establish installed dosing accuracy.",
      ] },
    ],
    linkLabels: ["Measuring and reducing diaphragm-pump flow pulsation", "Accuracy and repeatability in reagent dispensing"],
  },
  selection: {
    title: "Instrument pump selection: when to choose a diaphragm or peristaltic pump",
    intro: "Prioritize a diaphragm pump for a fixed, cleanable circuit carrying the same liquid over time. Prioritize a peristaltic pump for batch replacement of the wetted path or motor-reversed bidirectional transfer. Then select the configuration by flow, backpressure, materials and maintenance.",
    diaphragmTitle: "When is a diaphragm pump a useful starting point?",
    diaphragmParagraphs: [
      "Fixed wash-liquid supply, reservoir replenishment and circulation in analytical instruments are useful starting points. These tasks often use a stable liquid composition and require a specified volume within a time limit or a flow under circuit load. A reusable chamber reduces pump-tube replacement work, provided all wetted materials are compatible, cleaning is effective and diaphragm, valve and seal maintenance is practical.",
      "For narrow tubing, filters or wash nozzles, evaluate flow at the required backpressure. Maximum pressure and free-flow rate are not a combined operating point. Where routine tube changes inside the instrument are difficult, compare maintenance intervals, while still providing access for servicing.",
    ],
    peristalticTitle: "When is a peristaltic pump a useful starting point?",
    peristalticParagraphs: [
      "Consider peristaltic pumping when reagent, sample or culture-medium batches require replacement of wetted assemblies. The removable tube isolates the liquid from the pump mechanism and supports single-use paths. Include shared bottles, fittings, valves and dispensing needles in the changeover plan: replacing only the tube inside the pump head does not remove residues elsewhere. Sterile processes require validation of the full assembly and handling procedure.",
      "For suck-back after forward dispensing or transfer between two vessels in both directions, a reversible peristaltic pump may reduce the need for additional flow-switching components. Confirm tubing compatibility, pressure capability and service interval, and allow access and time for replacement and recalibration.",
    ],
    tableTitle: "Pump selection for wash liquids, reagents and waste",
    headers: ["Task", "First option to assess", "Conditions to check"],
    rows: [
      ["Fixed wash supply or reservoir replenishment", "Miniature liquid diaphragm pump", "Stable liquid composition and a reusable, cleanable circuit; verify completion time using flow under load."],
      ["Fixed circulation with fewer tube changes", "Miniature liquid diaphragm pump", "Continuous or intermittent duty and service intervals for diaphragm, valves and seals."],
      ["Reagent, sample or medium transfer with batch changes", "Peristaltic pump", "Define the full replacement boundary; verify tube compatibility, life and residues in shared fittings."],
      ["Suck-back or two-way transfer in one line", "Reversible peristaltic pump", "Compatible drive and head; test suck-back volume, residual liquid and dripping."],
      ["Known waste liquid in a fixed drain circuit", "A compatible diaphragm pump can be evaluated first", "Particles, crystals, valve blockage and permitted gas–liquid operation. Compare peristaltic designs if replacement tubing is needed for isolation."],
      ["Small doses in short cycles or low-pulsation detector supply", "Decide from point-of-use tests", "Dose error, repeatability or flow waveform; assess damping, controls or a precision metering pump where necessary."],
    ],
    limitsTitle: "When is the pump type insufficient to decide?",
    limits: [
      "Changing waste composition, particles, fibres, crystals or intermittent air require checks of the fluid and flow passages for either design. A peristaltic head has no check valves, but this does not mean any particle can pass without damaging tubing. Distinguish direct waste pumping from applying vacuum to a collection vessel. A gas pump used outside that vessel must be protected from liquid ingress if it is not liquid-rated. Self-priming does not establish permission for indefinite dry running.",
      "For precise dispensing, judge the delivered dose at the outlet. Start-up delay, trapped gas, outlet pressure, tubing elasticity and residual liquid at the needle all affect it. Test the full cycle. If neither candidate meets the tolerance, compare precision piston pumps or syringe-based metering mechanisms.",
    ],
  },
  validation: {
    title: "What should you validate after selecting a pump?",
    steps: [
      "Define the task: transfer, replenishment, waste removal, circulation or dosing, and the required outlet result.",
      "Specify the process liquid and cleaning agents, including concentration, temperature, viscosity, particles and bubbles.",
      "Set working flow or dose, inlet conditions, outlet pressure, start–stop cycle and daily operating hours.",
      "Map the complete wetted path and identify which components will be cleaned or replaced.",
      "Compare model-specific curves, materials, controls, installation space and service access.",
      "Test the installed fluid path across expected conditions and service stages; record flow or dose, leaks, starting behaviour and process acceptance results.",
    ],
    paragraph: "The FOREACH DPL30 and DPL60 product information provides a starting point for model-level diaphragm-pump evaluation. Use the current specifications and flow–pressure curve for the selected configuration. Selecting a model does not itself demonstrate reagent compatibility, dosing accuracy or direct replacement of a peristaltic pump.",
    linkLabels: ["Explore FOREACH liquid diaphragm pumps", "DPL30 liquid-transfer selection guide", "DPL60 liquid-transfer selection guide", "Check suction lift, priming time and restart conditions"],
  },
  faqTitle: "Frequently asked questions",
  faqItems: [
    { question: "Can diaphragm and peristaltic pumps both rated at 300 mL/min be interchanged?", answer: "Not on that value alone. Check the liquid, speed or voltage, inlet conditions and outlet pressure behind each rating. Narrow tubing, filters and dispensing needles can produce different installed outputs. Replacement also changes wetted materials, cleaning, controls and servicing. Compare flow, dose, start–stop behaviour and duty in the original circuit. If it relies on replacing the entire wetted path between batches, a reusable diaphragm chamber also requires a new cleaning assessment." },
    { question: "How often should peristaltic pump tubing be replaced?", answer: "There is no universal interval, and leakage should not be the replacement trigger. Material, dimensions, roller compression, speed, temperature, liquid and inlet/outlet pressures all affect life. Start from the supplier's applicable guidance and establish a preventive interval using actual operating hours, flow trends and tube condition. Persistent flattening, poor recovery, cracks, swelling or a significant delivery drift need investigation. A diaphragm pump avoids squeezed-tube consumables but still needs diaphragm, valve and seal maintenance." },
    { question: "Why does delivery change after fitting new tubing of the same size?", answer: "The same nominal size does not guarantee identical displacement per revolution. Bore and wall tolerances, loading position, tension and initial deformation can alter it. Follow the head's loading and run-in instructions, then recalibrate with the real liquid and circuit. Collect repeated doses and measure volume, or weigh them and convert using the liquid's density. Check mean dose error and repeatability. Recheck after fluid, pipework or backpressure changes instead of retaining the old calibration factor." },
    { question: "The pump is turning but draws no liquid or delivers less. What should I check first?", answer: "Check liquid supply, immersion of the inlet tube and correct port direction, then air leaks, kinks, blocked filters and outlet backpressure. If the external path is sound, inspect tube type, loading, occlusion and recovery on a peristaltic pump; inspect valve contamination, deposits and diaphragm or seal damage on a diaphragm pump. Compare under the same liquid, level and control conditions. Isolate and depressurize before permitted head servicing, following the model's instructions. Increasing speed alone does not diagnose the cause." },
    { question: "Will changing pump type stop dripping or reverse flow after shutdown?", answer: "First distinguish siphoning caused by liquid-level differences, release of downstream pressure and residual liquid falling from the outlet. A diaphragm pump's check valves guide the pumping cycle; do not assume they provide the required system shut-off. A peristaltic pump relies on tube occlusion, which poor loading or wear can compromise, while residual liquid can remain beyond the head. Assess shut-off, anti-siphon measures or validated suck-back for the actual cause, and test the stopped state. A pump change alone cannot guarantee drip-free operation." },
    { question: "When changing reagents, is replacing only the tube inside the peristaltic head enough?", answer: "Only if that section covers the entire wetted path that needs replacement. Reused inlet lines, bottle connections, valves, fittings and needles can retain the previous reagent. Map the path from vessel to outlet, assign replacement or cleaning to every component and check the first dispensed liquid after changeover against residue limits. For a diaphragm pump, include its chamber, diaphragm and check valves. Disposable pump tubing helps changeover but does not alone establish system sterility or absence of carryover." },
  ],
  cta: { title: "Evaluating a diaphragm pump for your fluid path?", description: "Share the liquid, working flow or target dose, inlet and outlet conditions, duty cycle and cleaning requirements to assess candidate configurations and installed-system validation.", contactLabel: "Discuss your application", productsLabel: "Explore diaphragm pumps" },
};

export const diaphragmVsPeristalticEn = createComparisonCopy("en", translation);
