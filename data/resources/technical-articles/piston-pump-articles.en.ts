import type {
  PistonPumpArticleCopy,
  PistonPumpArticlePart,
} from "./piston-pump-articles.types";

const p = (text: string): PistonPumpArticlePart => ({ type: "paragraph", text });
const notice = (label: string, text: string): PistonPumpArticlePart => ({
  type: "notice",
  label,
  text,
});
const productsHref = "/products/pumps/piston-pump/";
const contactCta = {
  contactLabel: "Contact an engineer",
  productsLabel: "View piston pumps",
};

export const pistonPumpArticlesEn: readonly PistonPumpArticleCopy[] = [
  {
    slug: "piston-pump-head-material-selection",
    title: "How to Select a Piston Pump Head Material",
    summary:
      "Compare PMMA, PCTG, PPS, PVDF, PP, PTFE, PEEK, POM and PSU pump-head options, and learn how to validate the complete wetted path.",
    seoTitle:
      "Piston Pump Head Materials: PMMA, PEEK and More | FOREACH",
    seoDescription:
      "How should a piston pump head material be selected? Compare PMMA, PCTG, PPS, PVDF, PP, PTFE, PEEK, POM and PSU, then validate the full wetted path.",
    date: "2026-09-06",
    coverImage:
      "/images/resources/technical-articles/piston-pump/piston-pump-head-material-selection-cover.webp",
    coverAlt: "FOREACH EA, SM and TM piston pumps for pump-head material selection",
    intro: [
      p("The pump head directly participates in aspiration, metering and discharge. Its material can affect chemical compatibility, structural stability, sealing, cleaning, service life and project cost. Selection therefore has to consider the actual fluid, temperature, pressure, contact time and the complete wetted path—not only which plastic appears most corrosion resistant."),
      p("FOREACH can evaluate PCTG, PMMA, PPS, PVDF, PP, PTFE, PEEK, POM, PSU and other engineering materials for piston-pump heads. This is a configuration range, not a statement that every material and capacity is a standard stocked model. The final combination depends on fluid properties, head geometry, manufacturability, installation space and project requirements."),
      notice(
        "Selection principle: ",
        "Define the real fluid and operating conditions first, then evaluate the head, piston, seals, valves, tubing and fittings as one wetted system.",
      ),
    ],
    sections: [
      {
        title: "Why piston pumps need different head materials",
        parts: [
          p("A piston pump may handle buffer, wash solution, calibrator, biochemical reagent or a formulation containing organic components. Swelling, stress cracking, permeation, extractables and adsorption differ by fluid, while temperature, pressure and long contact times can change the result."),
          p("The head is also a structural part exposed to threaded connections, seal preload and cyclic pressure. Material selection is therefore a chemical, mechanical, manufacturing and cost decision. A favorable entry in a compatibility chart does not prove that the material will work in a particular pump-head design."),
        ],
      },
      {
        title: "Comparison of common piston-pump head materials",
        parts: [
          {
            type: "table",
            headers: ["Material", "Typical evaluation direction", "Points to verify"],
            rows: [
              ["PMMA", "Conventional media and operating conditions with cost sensitivity", "Organic solvents, stress cracking, temperature and long contact"],
              ["PCTG", "General fluid paths requiring toughness and manufacturability", "Actual formulation, cleaning agents and dimensional stability"],
              ["PPS", "Higher temperature, stiffness or dimensional-stability requirements", "Compatibility, machining, sealing surfaces and cost"],
              ["PVDF", "Selected acids, alkalis and salt solutions", "Chemical concentration, temperature, pressure and seal combination"],
              ["PP", "Selected aqueous, acid/alkali or general chemical paths", "Stiffness, temperature, threads, preload and long-term load"],
              ["PTFE", "Applications requiring broad chemical resistance", "Creep, stiffness, dimensional stability and feasible geometry"],
              ["PEEK", "Higher thermal, mechanical and chemical requirements", "Actual medium, machining, full wetted path and project cost"],
              ["POM", "Structures prioritizing mechanical properties and machining efficiency", "Acids, alkalis, oxidizers, temperature and long exposure"],
              ["PSU", "Instrument fluidics requiring stiffness and heat resistance", "Specific chemicals, stress, cleaning process and material grade"],
            ],
          },
          p("These are screening directions, not compatibility guarantees. Different grades, residual machining stress and assembly structures can produce different outcomes even when the polymer name is the same."),
        ],
      },
      {
        title: "Selection notes for individual materials",
        parts: [
          {
            type: "subsections",
            items: [
              { title: "PMMA heads", paragraphs: ["PMMA is often the cost-effective starting point for conventional media, moderate temperature and pressure, and projects without special corrosion or heat-resistance requirements. Verify formulations containing solvents, ketones or esters by reviewing composition and testing representative parts."] },
              { title: "PCTG heads", paragraphs: ["PCTG can balance toughness, machining and general fluidic requirements. Check the actual formulation, cleaning solution, temperature and dimensional change after long exposure."] },
              { title: "PP heads", paragraphs: ["PP may be evaluated for selected aqueous, acid/alkali and general chemical paths. Head use also requires adequate stiffness, thread loading, seal preload and stability under pressure cycling."] },
              { title: "POM heads", paragraphs: ["POM supports mechanically stable, efficiently machined structures, but acids, alkalis, oxidizing media and long chemical exposure require grade- and condition-specific testing."] },
              { title: "PPS heads", paragraphs: ["PPS can be considered where temperature, stiffness and dimensional stability matter. Evaluate the fluid, cleaning process, structural load, sealing face and material grade together."] },
              { title: "PVDF heads", paragraphs: ["PVDF may suit selected acid, alkali and salt-solution paths. Suitability still depends on chemical identity, concentration, temperature, pressure, contact time, seals and valves."] },
              { title: "PTFE heads", paragraphs: ["PTFE has broad chemical resistance, but a pump head must also satisfy stiffness, creep, thread, seal and manufacturing requirements. Chemical resistance alone is not sufficient."] },
              { title: "PEEK heads", paragraphs: ["PEEK is a candidate for demanding thermal, mechanical, dimensional and chemical conditions. It is not universally compatible; verify the real formulation, temperature, pressure, cleaning method and complete wetted path while considering machining and cost."] },
              { title: "PSU heads", paragraphs: ["PSU can be evaluated for instrument fluidics requiring stiffness, temperature resistance and dimensional stability. Verify chemicals, stress, cleaning method, grade and long-term exposure."] },
            ],
          },
        ],
      },
      {
        title: "EA-500-PMMA and EA-500-PEEK: a same-capacity example",
        parts: [
          p("FOREACH EA-500-PMMA and EA-500-PEEK illustrate two head-material directions at the same nominal 500 μL capacity. The displayed configurations support 1/4-28 UNF or M6 ports and 2,000 full-stroke steps. Under specified test conditions, full-stroke accuracy and repeatability are both ≤0.5%."),
          {
            type: "table",
            headers: ["Item", "EA-500-PMMA", "EA-500-PEEK"],
            rows: [
              ["Nominal capacity", "500 μL", "500 μL"],
              ["Displayed head material", "PMMA", "PEEK"],
              ["Displayed piston", "Ceramic piston", "Confirm selected configuration"],
              ["Fluidic ports", "1/4-28 UNF or M6", "1/4-28 UNF or M6"],
              ["Full-stroke steps", "2,000", "2,000"],
              ["Full-stroke performance", "Accuracy and repeatability ≤0.5%", "Accuracy and repeatability ≤0.5%"],
              ["Typical direction", "Conventional media and project cost", "More demanding material requirements"],
            ],
          },
          notice("Parameter boundary: ", "The performance values apply to the specified test conditions. A different head material does not automatically change metering performance, and displayed models do not mean that every material-capacity combination is standard stock."),
          {
            type: "links",
            items: [
              { prefix: "See the current configurations for ", label: "EA-500-PMMA", href: "/products/pumps/piston-pump/ea-500-pmma/", suffix: " and" },
              { label: "EA-500-PEEK", href: "/products/pumps/piston-pump/ea-500-peek/", suffix: "." },
            ],
          },
        ],
      },
      {
        title: "Evaluate the piston and complete wetted path",
        parts: [
          p("The head is only one part of the wetted system. FOREACH can evaluate zirconia ceramic, alumina ceramic, PEEK and sapphire piston options and match ports, motors, optical feedback, valves and controllers to the project."),
          { type: "bullets", items: ["Pump head and internal flow passages", "Piston and its sealing structure", "Valve body, element, diaphragm or check mechanism", "Tubing, fittings, filters, probes and nozzles", "Adhesives, lubricants and any auxiliary material that may contact the fluid"] },
          p("Changing only the head can leave swelling, adsorption, extractables, leakage, blockage or life problems elsewhere in the path."),
        ],
      },
      {
        title: "Information required for material selection",
        parts: [
          {
            type: "steps",
            items: [
              { label: "Fluid", text: "Name, main components, concentration, pH, solvents, particles or crystallization risk; provide an SDS or formulation range where appropriate." },
              { label: "Temperature and contact time", text: "Separate operating, cleaning, disinfection, soak and storage temperatures, and state whether the fluid remains in the path." },
              { label: "Volume and duty", text: "Target dose, normal stroke, cycle time, aspiration/dispense speed, pressure or backpressure and expected life." },
              { label: "Fluid path and structure", text: "Port standard, valve arrangement, tubing size, seal design, installation space and assembly loads." },
              { label: "Project constraints", text: "Prototype quantity, production plan, regulatory or cleanliness needs and cost boundary." },
            ],
          },
        ],
      },
      {
        title: "How to validate material compatibility",
        parts: [
          {
            type: "steps",
            items: [
              { label: "Screen documentation", text: "Use material-grade data for the actual chemical, concentration and temperature to remove clearly unsuitable candidates." },
              { label: "Soak representative coupons", text: "Inspect mass, dimensions, appearance, hardness, cracking, swelling, extractables and color over a representative contact time." },
              { label: "Check structure and sealing", text: "Machine representative parts and test threads, sealing faces, preload and pressure cycling." },
              { label: "Run the complete system", text: "Use the real or representative fluid at target volumes, temperature, valves, tubing, backpressure, cleaning process and cycle rate; measure accuracy, repeatability, leakage and life." },
            ],
          },
        ],
      },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { question: "Are PMMA, PCTG and PEEK the only FOREACH head materials?", answer: "No. PCTG, PMMA, PPS, PVDF, PP, PTFE, PEEK, POM, PSU and other engineering materials can be evaluated by project." },
      { question: "Is every material available as a standard model at every capacity?", answer: "Not necessarily. Website models support initial selection; the final capacity-material combination must be confirmed against the fluid, ports, valves, space and project volume." },
      { question: "Which head material has the best corrosion resistance?", answer: "There is no condition-free answer. Compatibility depends on composition, concentration, temperature, pressure, contact time, cleaning and the complete wetted path." },
      { question: "Does a PEEK head still require compatibility testing?", answer: "Yes. Verify the exact medium and conditions through data review, soak tests, dimensional and sealing checks, and system operation." },
      { question: "Can a PTFE head be used for every chemical?", answer: "No. A head must also meet stiffness, creep, dimensional, thread, seal, pressure and manufacturing requirements." },
      { question: "Can changing the head material change dispensing performance?", answer: "Material is not the only determinant, but stiffness, dimensional stability, surface condition and interaction with seals and valves can affect system results. Revalidate after a material or geometry change." },
    ],
    conclusion: {
      title: "Conclusion: there is no best head material without operating conditions",
      parts: [
        p("PMMA is often economical for conventional media; PCTG, PP and POM cover different general engineering priorities; PPS, PVDF, PTFE, PEEK and PSU expand the options for more demanding thermal, mechanical or chemical conditions. Material names are only a first screen."),
        p("After selecting the head, confirm the piston, seals, valves, tubing, fittings, ports and controls, then test the complete system at the target working volume."),
        { type: "links", items: [
          { prefix: "For the fundamentals, read ", label: "What Is a Precision Piston Pump?", href: "/resources/technical-articles/micro-plunger-pump-selection/", suffix: "." },
          { prefix: "For performance definitions, read ", label: "Piston Pump Accuracy, Repeatability and Resolution", href: "/resources/technical-articles/piston-pump-accuracy-repeatability-resolution/", suffix: "." },
          { prefix: "Browse ", label: "FOREACH piston-pump configurations", href: productsHref, suffix: "." },
        ] },
      ],
    },
    cta: {
      title: "Need to confirm pump-head and wetted-material options?",
      description: "Share the fluid composition, concentration, temperature, target volume, pressure, cleaning method, ports, valves, duty cycle and installation space for a complete wetted-path review.",
      ...contactCta,
    },
    subject: {
      about: ["piston pump head materials", "wetted-material compatibility", "piston pump material selection"],
      mentions: ["PMMA", "PCTG", "PPS", "PVDF", "PP", "PTFE", "PEEK", "POM", "PSU", "EA-500-PMMA", "EA-500-PEEK"],
    },
  },
  {
    slug: "piston-pump-accuracy-repeatability-resolution",
    title: "Piston Pump Accuracy, Repeatability and Resolution Explained",
    summary: "Learn why theoretical volume per step is not the minimum reliable dose, and how accuracy, repeatability, valves, bubbles and working stroke affect dispensing results.",
    seoTitle: "Piston Pump Accuracy, Repeatability and Resolution | FOREACH",
    seoDescription: "Understand piston-pump accuracy, repeatability and resolution, why motor steps do not define minimum reliable dose, and how to validate small-volume dispensing.",
    date: "2026-09-06",
    coverImage: "/images/resources/technical-articles/piston-pump/piston-pump-accuracy-repeatability-resolution-cover.webp",
    coverAlt: "FOREACH piston pump head and connected fluid tubing",
    intro: [
      p("Piston-pump specifications often list capacity, full-stroke steps, accuracy and repeatability together. These terms all relate to dispensing performance, but they describe different questions."),
      p("A common mistake is to treat more motor steps as automatically higher liquid accuracy, or to call theoretical volume per step the minimum reliable dose. Real delivery also depends on mechanics, valves, tubing, bubbles, fluid properties, motion control and the measurement method."),
    ],
    sections: [
      {
        title: "What is piston-pump resolution?",
        parts: [
          p("Resolution is the smallest theoretical displacement increment commanded by the drive. For a stepper-driven pump, theoretical volume per step can be estimated from nominal capacity and full-stroke steps."),
          { type: "formula", expression: "Theoretical volume per step = nominal capacity ÷ full-stroke steps", note: "For the displayed EA-500-PMMA configuration: 500 μL ÷ 2,000 steps ≈ 0.25 μL/step." },
          p("The 0.25 μL value is a geometric command increment, not proof that 0.25 μL can be dispensed reliably in every liquid and fluid path. Resolution does not state actual error or minimum validated dose."),
        ],
      },
      {
        title: "What is piston-pump accuracy?",
        parts: [
          p("Accuracy expresses how close the delivered result is to the target volume. It must be interpreted with the tested stroke, target volume, fluid and temperature, complete fluid path, measurement method and calculation definition."),
          { type: "bullets", items: ["Full stroke or partial stroke", "Target dispensing volume", "Fluid and temperature", "Valves, tubing, fittings and outlet included in the test", "Gravimetric, photometric or other method", "Mean bias, maximum single error or another definition"] },
        ],
      },
      {
        title: "What is piston-pump repeatability?",
        parts: [
          p("Repeatability describes the spread among repeated results under the same conditions. It may be reported as range, standard deviation, relative standard deviation or coefficient of variation."),
          p("Good repeatability does not guarantee accuracy. Repeated results near 96 μL for a 100 μL target can be tightly grouped but biased. Conversely, a mean close to 100 μL can hide excessive scatter."),
          { type: "table", headers: ["Observed result", "Accuracy", "Repeatability", "Engineering meaning"], rows: [
            ["Mean near target; results concentrated", "Good", "Good", "Stable quantitative performance"],
            ["Mean off target; results concentrated", "Poor", "Good", "Calibration or systematic-bias correction may be needed"],
            ["Mean near target; results scattered", "Apparently good", "Poor", "Random variation is too large"],
            ["Mean off target; results scattered", "Poor", "Poor", "Inspect pump, valves, path, fluid and control"],
          ] },
        ],
      },
      {
        title: "Why more steps do not automatically improve liquid accuracy",
        parts: [
          p("Step count sets command granularity, while fluid travels through a complete system. Fixed and transient effects can separate theoretical piston displacement from delivered volume."),
          { type: "subsections", items: [
            { title: "Mechanical backlash and transmission error", paragraphs: ["Lead screws, nuts, couplings and moving parts can have clearance. After direction reversal, some commanded motion may take up clearance before effective liquid displacement begins."] },
            { title: "Valve response and timing", paragraphs: ["If piston motion and valve switching are not coordinated, backflow, air aspiration, unsettled pressure or retained liquid can occur."] },
            { title: "Bubbles and tubing compliance", paragraphs: ["Compressible gas and expanding tubing absorb displacement and release it later, producing under-delivery, delay and interaction between cycles."] },
            { title: "Fluid and environment", paragraphs: ["Viscosity, surface tension, volatility, dissolved gas, particles, crystallization and temperature affect aspiration, discharge and droplet detachment."] },
            { title: "Motion and dispensing method", paragraphs: ["Aspiration/dispense speed, acceleration, settling time, priming, probe position and contact or non-contact delivery can matter more than added microsteps."] },
          ] },
        ],
      },
      {
        title: "Why full-stroke performance cannot be extrapolated to small doses",
        parts: [
          p("Backlash, valve timing and bubble compression may be small relative to a full stroke but large relative to a short stroke. A pump can therefore show different accuracy and repeatability at different stroke ratios."),
          { type: "table", headers: ["Test point", "Volume", "Accuracy", "Repeatability"], rows: [
            ["100% stroke", "500 μL", "≤0.5%", "≤0.5%"],
            ["2% stroke", "10 μL", "≤2.0%", "≤1.5%"],
          ] },
          notice("Parameter boundary: ", "These EA-500-PMMA values apply to specified test conditions. Do not extrapolate the full-stroke result to 10 μL or infer a minimum reliable dose from the 0.25 μL theoretical step volume."),
        ],
      },
      {
        title: "How to validate accuracy and repeatability",
        parts: [
          { type: "steps", items: [
            { label: "Define critical working volumes", text: "List minimum, normal and maximum doses and identify which one controls assay, ratio or yield." },
            { label: "Define acceptance metrics", text: "Separate mean bias, maximum error, standard deviation, CV and any industry-specific requirement." },
            { label: "Build the actual fluid path", text: "Include production valves, tubing, fittings, filters, probes or nozzles wherever possible." },
            { label: "Use the real or a representative fluid", text: "Match viscosity, surface tension, volatility and particles, and record temperature, backpressure, speed and priming." },
            { label: "Choose a suitable method", text: "Control balance resolution, density, evaporation and environmental effects for gravimetry; use appropriate photometric methods for very small volumes." },
            { label: "Report each working point", text: "Publish mean, bias and dispersion separately at minimum, normal and maximum volumes." },
          ] },
        ],
      },
      {
        title: "How to read FOREACH EA, SM and TM specifications",
        parts: [
          { type: "table", headers: ["Series", "Current information", "Selection focus"], rows: [
            ["EA precision piston pump", "2,000 full-stroke steps in base configurations; full-stroke and 2% stroke data under specified conditions", "Choose capacity around the critical working volumes"],
            ["SM miniature piston pump", "2,000 full-stroke steps; full-stroke repeatability ≤0.5% under specified conditions; confirm accuracy by configuration", "Balance space, volume, fluidic components and system validation"],
            ["TM ultra-compact piston pump", "Displayed configurations use 2,540 full-stroke steps; confirm accuracy and repeatability by configuration", "Do not infer dispensing performance from step count alone"],
          ] },
          p("Step counts cannot be compared without capacity, piston diameter, transmission and test conditions. The largest pump that covers the maximum dose is not automatically the best choice for the smallest critical dose."),
          { type: "links", items: [
            { prefix: "Review the fundamentals in ", label: "What Is a Precision Piston Pump?", href: "/resources/technical-articles/micro-plunger-pump-selection/", suffix: "." },
            { prefix: "Browse ", label: "FOREACH piston-pump configurations", href: productsHref, suffix: "." },
          ] },
        ],
      },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { question: "Is theoretical volume per step the minimum dispensing volume?", answer: "No. It is a theoretical displacement increment. Minimum reliable dose must be tested with the actual fluid, valves, tubing, backpressure and controls." },
      { question: "Are more motor steps always better?", answer: "They improve command granularity but do not independently guarantee accuracy or repeatability." },
      { question: "Why can a repeatable result still be inaccurate?", answer: "A fixed systematic bias can produce tightly grouped results that are all offset from the target." },
      { question: "Can full-stroke accuracy predict performance at 10% or 2% stroke?", answer: "Not directly. Fixed errors and transients can occupy a larger proportion of a short stroke." },
      { question: "How can small-volume performance be improved?", answer: "Select an appropriate capacity, prime and degas, optimize tubing and speeds, coordinate valves, stabilize temperature and calibrate with the target fluid." },
    ],
    conclusion: {
      title: "Conclusion: define the working volume before comparing pumps",
      parts: [
        p("Resolution, accuracy and repeatability answer different questions. Resolution is a theoretical command increment; accuracy is closeness to target; repeatability is consistency among repeated results."),
        p("Define minimum, normal and maximum working volumes first, then verify accuracy and repeatability at those strokes. Motor step count supports motion design but cannot establish minimum reliable dose or complete-system performance."),
      ],
    },
    cta: {
      title: "Need to validate piston-pump accuracy and repeatability?",
      description: "Share the target volume, permitted error, repeatability requirement, fluid, temperature, backpressure, valves, tubing, cycle time and installation space for an EA, SM or TM evaluation.",
      ...contactCta,
    },
    subject: { about: ["piston pump accuracy", "piston pump repeatability", "piston pump resolution"], mentions: ["EA piston pump", "SM piston pump", "TM piston pump", "minimum reliable dose", "liquid-handling validation"] },
  },
  {
    slug: "micro-plunger-pump-selection",
    title: "What Is a Precision Piston Pump? Working Principle, Benefits and Applications",
    summary: "Learn how precision piston pumps work, where they are used and how to select capacity, performance, materials, valves and controls for an OEM fluidic system.",
    seoTitle: "What Is a Precision Piston Pump? Principle and Selection | FOREACH",
    seoDescription: "An introductory guide to precision piston-pump operation, advantages, applications and selection, including FOREACH EA, SM and TM platforms.",
    date: "2026-06-19",
    coverImage: "/images/resources/technical-articles/piston-pump/micro-plunger-pump-selection-cover.webp",
    coverAlt: "FOREACH EA, SM and TM precision piston-pump platforms",
    intro: [
      p("A precision piston pump is a positive-displacement pump that aspirates, meters and dispenses liquid by controlled reciprocating piston motion. A motor and transmission convert rotation into linear travel so that aspiration and discharge can be programmed."),
      p("Unlike a transfer pump whose main task is moving liquid between locations, a precision piston pump focuses on single-dose volume, accuracy, repeatability and long-term automated operation. It is widely integrated into IVD, life-science, laboratory automation and analytical instruments."),
    ],
    sections: [
      {
        title: "How does a precision piston pump work?",
        parts: [
          p("A typical assembly contains a motor, transmission, piston, pump chamber and fluidic ports. The transmission converts motor rotation into piston travel."),
          { type: "steps", items: [
            { label: "Aspiration", text: "The piston retracts, increasing chamber volume and drawing liquid into the path." },
            { label: "Dispensing", text: "The piston advances, reducing chamber volume and pushing liquid toward the outlet." },
          ] },
          p("Solenoid, check or rotary valves direct the flow, while control logic coordinates piston motion and valve switching. Commanded motor steps define piston travel and therefore the theoretical displaced volume."),
          notice("Engineering boundary: ", "Theoretical displacement is not the delivered volume at the destination. Backlash, valve response, bubbles, tubing compliance, viscosity, pressure and outlet geometry can all affect the result."),
        ],
      },
      {
        title: "Piston pump versus plunger pump terminology",
        parts: [
          p("In precision liquid handling, “piston pump” and “plunger pump” are often used for similar OEM products. Other terms include micro piston pump, precision plunger pump, variable-volume pump and precision dispense pump."),
          p("This article covers compact OEM pumps for precise aspiration, metering and dispensing. It does not cover axial-piston hydraulic machines, industrial high-pressure cleaning pumps or the high-pressure primary pumps used in liquid chromatography."),
        ],
      },
      {
        title: "Main advantages of precision piston pumps",
        parts: [
          { type: "bullets", items: [
            "Positive-displacement metering for reagent dosing, sample transfer, dispensing and dilution",
            "Repeatable automated aspiration and discharge sequences",
            "Capacity options from microliter to milliliter ranges",
            "Integration with valves, tubing, fittings, sensors and controllers",
            "Project-specific evaluation of heads, pistons, seals and other wetted materials",
          ] },
          p("These advantages do not mean that one configuration suits every liquid. Final performance belongs to the complete fluidic system and must be validated under real conditions."),
        ],
      },
      {
        title: "Factors that affect dispensing performance",
        parts: [
          { type: "table", headers: ["Concept", "Meaning", "Selection caution"], rows: [
            ["Resolution", "Theoretical displacement or volume per command increment", "More steps do not guarantee accurate liquid delivery"],
            ["Accuracy", "Closeness of delivered volume to target", "Measure at the actual working volume and complete path"],
            ["Repeatability", "Consistency of repeated results", "Does not replace accuracy and cannot be extrapolated to any short stroke"],
          ] },
          { type: "bullets", items: ["Stroke ratio and backlash at direction reversal", "Valve response, switching sequence and path resistance", "Bubbles, dissolved gas, tubing length, diameter and compliance", "Viscosity, temperature, motor speed, acceleration and cycle frequency"] },
        ],
      },
      {
        title: "Typical applications",
        parts: [
          { type: "subsections", items: [
            { title: "IVD and clinical analyzers", paragraphs: ["Sample aspiration, reagent addition, dispensing, dilution, calibrator handling and trigger-solution addition, coordinated with valves, probes, tubing and wash routines."] },
            { title: "Life-science instruments", paragraphs: ["Sample and reagent transfer, reaction setup, buffer addition and other automated liquid-handling steps, with process-specific capacity, materials and cleaning."] },
            { title: "Laboratory automation", paragraphs: ["A programmable liquid actuator integrated with motion, valves, sensors and controls for quantitative transfer."] },
            { title: "Analytical and environmental instruments", paragraphs: ["Standard addition, reagent dosing, calibration, titration, sampling and metered transfer. Continuous high-flow transfer, rapid washing, waste aspiration or high-pressure chromatography usually calls for a different pump type."] },
          ] },
        ],
      },
      {
        title: "FOREACH EA, SM and TM piston-pump platforms",
        parts: [
          { type: "table", headers: ["Series", "Currently confirmed range", "Positioning", "Selection boundary"], rows: [
            ["EA precision piston pump", "50 μL–20 mL", "Microliter-to-milliliter metering and dispensing", "Full-stroke accuracy and repeatability ≤0.5% under specified conditions; 1/4-28 UNF or M6 ports; materials and controls by configuration"],
            ["SM miniature piston pump", "Displayed: 50, 100, 250, 500 μL and 1 mL", "Microliter dosing in compact equipment", "2,000 full-stroke steps in base configurations; full-stroke repeatability ≤0.5% under specified conditions; confirm accuracy at working volume"],
            ["TM ultra-compact piston pump", "Displayed: 50, 100, 250 and 500 μL", "Space-constrained OEM analytical modules", "Displayed 6-40 UNF and 2,540-step configurations; validate accuracy, repeatability, pressure and life by configuration"],
          ] },
          p("The expected five-million-cycle life for EA and SM corresponds to specified conditions including pure water, room temperature and 50 kPa backpressure. Actual life depends on fluid, pressure, speed, stroke, temperature, cleaning and cycle rate."),
          { type: "links", items: [{ prefix: "Browse ", label: "FOREACH piston-pump capacities and configurations", href: productsHref, suffix: "." }] },
        ],
      },
      {
        title: "How to make an initial selection",
        parts: [
          { type: "steps", items: [
            { label: "Define working volumes", text: "List minimum, normal and maximum single doses and identify the accuracy-critical point." },
            { label: "Separate performance metrics", text: "State permitted error and whether the requirement is accuracy, repeatability, CV or another metric." },
            { label: "Provide the actual fluid", text: "Include composition, concentration, viscosity, temperature, particles, crystallization risk, cleaning fluid and storage method." },
            { label: "Evaluate pressure and speed", text: "Include resistance from tubing, filters, valves, nozzles, viscosity and aspiration speed." },
            { label: "Confirm ports and installation", text: "Review valve type, tubing, threads, orientation, service space, priming and venting." },
            { label: "Define control needs", text: "Include homing, acceleration, speed, reversal, valve timing, feedback, alarms and power-loss recovery." },
          ] },
        ],
      },
      {
        title: "How piston pumps differ from other liquid pumps",
        parts: [
          { type: "table", headers: ["Pump type", "Typical task", "Main considerations"], rows: [
            ["Precision piston pump", "Programmed aspiration and positive-displacement dosing", "Finite stroke, refill, valves, bubbles, backlash and wetted materials"],
            ["Syringe pump", "Aspiration, dispensing and path switching with syringes and valves", "Syringe capacity, maintenance, space and minimum working volume"],
            ["Diaphragm pump", "Transfer, washing, circulation, priming and waste handling", "Flow depends on system resistance; task differs from fixed-volume piston dosing"],
            ["Peristaltic pump", "Transfer where liquid contacts replaceable tubing only", "Tubing fatigue, calibration drift, pulsation and tube compatibility"],
          ] },
          p("No pump type fits every task. One instrument may use a piston pump for precise dispensing and a diaphragm or other pump for washing, circulation and waste."),
        ],
      },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { question: "Is resolution the same as dispensing accuracy?", answer: "No. Resolution is a theoretical command increment; actual delivery also depends on mechanics, valves, bubbles, pressure, tubing and control." },
      { question: "Should I choose the largest capacity that covers my requirement?", answer: "Not necessarily. Consider how much of the stroke the smallest critical volume uses as well as maximum volume and cycle time." },
      { question: "Why do bubbles affect piston-pump dispensing?", answer: "Gas is compressible and absorbs part of the displacement, then releases it later, causing under-delivery, delay or cycle-to-cycle interaction." },
      { question: "Can one piston pump handle every reagent?", answer: "No. Wetted materials must be evaluated against the actual fluid, concentration, temperature, pressure, cleaning and contact time." },
    ],
    conclusion: {
      title: "Conclusion: start with working volume and the complete fluid path",
      parts: [
        p("Do not select a precision piston pump by nominal capacity and motor steps alone. Define working volumes, accuracy and repeatability targets, then evaluate fluid, pressure, valves, tubing, space, controls and cycle time under one validation plan."),
        p("FOREACH EA, SM and TM address wide-range, compact and ultra-compact liquid-handling needs. Confirm the final series, capacity, materials, ports and controls against current technical files and real operating conditions."),
      ],
    },
    cta: {
      title: "Need to confirm piston-pump capacity, materials and control?",
      description: "Share the dose volume, accuracy and repeatability target, fluid, backpressure, tubing, cycle time and installation space to evaluate an EA, SM or TM configuration.",
      ...contactCta,
    },
    subject: { about: ["precision piston pump", "EA piston pump", "SM piston pump", "TM piston pump"], mentions: ["piston pump working principle", "positive-displacement dispensing", "IVD", "laboratory automation", "liquid handling"] },
  },
  {
    slug: "piston-pump-acceleration-deceleration-curves",
    title: "Acceleration and Deceleration Curves for Piston-Pump Drives",
    summary: "Use stepper-motor torque-speed behavior to select linear, S-curve or parabolic motion profiles and prevent missed steps in piston-pump aspiration and dispensing.",
    seoTitle: "Piston Pump Acceleration and Deceleration Curves | FOREACH",
    seoDescription: "Understand linear, S-curve and parabolic motion profiles, stepper torque-speed limits, missed steps and piston-pump commissioning.",
    date: "2026-09-06",
    coverImage: "/images/resources/technical-articles/legacy-motion-control/acceleration-curve-2.png",
    coverAlt: "S-curve acceleration and deceleration profile for a piston-pump stepper motor",
    intro: [p("A stepper motor cannot jump from standstill to any target speed under any load. A piston-pump drive must overcome mechanical friction, hydraulic load and moving inertia at startup, then reserve travel for controlled deceleration. A motion profile changes pulse frequency progressively so the motor can enter and leave its operating speed reliably.")],
    sections: [
      { title: "Why piston pumps need acceleration control", parts: [p("Select the profile against the motor torque-speed curve at the actual drive voltage, current and microstep setting. Holding torque alone does not describe available high-speed running torque.")] },
      { title: "Separate missed steps from vibration", parts: [p("Excessive acceleration can demand more torque than the motor can produce at that speed, causing missed steps. Load, supply, current setting, resonance and assembly also matter. Low acceleration is not itself a missed-step cause, although moving slowly through a resonance band can prolong vibration."), { type: "links", items: [{ prefix: "For pulse frequency, load torque and transmission ratio, see ", label: "Precision Piston Pump Stepper Motor Calculation and Selection", href: "/resources/technical-articles/stepper-motor-calculation-selection/", suffix: "." }] }] },
      { title: "Linear, S-curve and parabolic profiles", parts: [p("A linear velocity ramp uses constant acceleration but changes acceleration abruptly at transitions. An S-curve changes acceleration progressively to reduce shock. A parabolic profile is another nonlinear plan whose parameters redistribute acceleration across speed ranges."), p("The diagrams explain profile shapes; they are not operating parameters for a specific pump."), { type: "figures", items: [
        { src: "/images/resources/technical-articles/legacy-motion-control/acceleration-curve-1.png", alt: "Linear acceleration and deceleration curve for piston-pump stepper drive", caption: "Linear acceleration/deceleration profile", width: 1381, height: 510 },
        { src: "/images/resources/technical-articles/legacy-motion-control/acceleration-curve-2.png", alt: "S-curve acceleration and deceleration for piston-pump stepper drive", caption: "S-curve acceleration/deceleration profile", width: 1373, height: 494 },
        { src: "/images/resources/technical-articles/legacy-motion-control/acceleration-curve-3.png", alt: "Parabolic acceleration and deceleration curve for piston-pump stepper drive", caption: "Parabolic acceleration/deceleration profile", width: 1378, height: 499 },
      ] }] },
      { title: "Convert motor speed to piston speed and theoretical flow", parts: [p("For a motor directly driving a lead screw, let lead p be in mm/rev and speed n in rev/s. Piston speed is v = p × n. With effective piston area A in mm², theoretical flow is Q = A × v in mm³/s, and 1 mm³ = 1 μL. Include any transmission ratio."), { type: "formula", expression: "v = p × n; Q = A × v", note: "A motion-planning relation only. Backpressure, resistance, bubbles, valve timing and seals affect delivered liquid." }, { type: "links", items: [{ prefix: "For reversal lost motion, see ", label: "Precision Piston Pump Backlash Compensation", href: "/resources/technical-articles/precision-piston-pump-backlash-compensation/", suffix: "." }] }] },
      { title: "Commissioning sequence for a piston-pump program", parts: [{ type: "steps", items: [
        { label: "Verify mechanics", text: "At low speed, confirm homing direction, limits and usable stroke." },
        { label: "Tune under real load", text: "Increase aspiration and dispense speeds gradually with the actual fluid, tubing and backpressure; the two directions need not use identical speeds." },
        { label: "Record motion and valve timing", text: "Capture start and target frequency, ramp time, microsteps, valve delay and settling time. Short strokes may never reach peak speed." },
        { label: "Validate the fluid result", text: "Measure dose, repeatability, bubbles, vibration and motor temperature. Correct mechanics alone is not final acceptance." },
      ] }] },
    ],
    conclusion: { title: "Conclusion", parts: [p("Choose the profile from the actual motor, driver, load, stroke and fluidic timing. Validate both motion integrity and delivered liquid at the shortest and most demanding operating cycles.")] },
    referencesTitle: "References",
    references: [{ label: "Oriental Motor: Stepper Motor Basics", href: "https://www.orientalmotor.com/stepper-motors/technology/stepper-motor-basics.html" }],
    cta: { title: "Need help defining piston-pump motion parameters?", description: "Share the pump series, stroke, target cycle time, fluid, backpressure, driver and valve timing for an engineering review.", ...contactCta },
    subject: { about: ["piston pump acceleration", "stepper motor motion profile"], mentions: ["linear ramp", "S-curve", "parabolic profile", "missed steps", "torque-speed curve"] },
  },
  {
    slug: "precision-piston-pump-backlash-compensation",
    title: "Precision Piston Pump Backlash Compensation Guide",
    summary: "Understand reversal backlash, measurement methods and compensation timing, and distinguish mechanical lost motion from actual aspirated or dispensed volume.",
    seoTitle: "Precision Piston Pump Backlash Compensation | FOREACH",
    seoDescription: "Measure piston-pump reversal backlash, convert lost motion into full-step or pulse compensation and validate single or split dispensing sequences.",
    date: "2026-09-06",
    coverImage: "/images/resources/technical-articles/piston-pump/precision-piston-pump-backlash-compensation-cover.webp",
    coverAlt: "FOREACH precision piston-pump drive and fluidic system",
    intro: [p("Clearance in lead-screw, nut and transmission interfaces can create lost motion after motor reversal before the piston moves in the new direction. This matters most in short-stroke dispensing and the first move after switching between aspiration and discharge.")],
    sections: [
      { title: "What is reversal backlash?", parts: [p("Backlash differs with design, assembly and wear. Mechanical preload can reduce it; software compensation addresses measured reversal lost motion. Compensation cannot replace bubble removal, valve maintenance or leak correction.")] },
      { title: "How to measure backlash", parts: [p("Gravimetric and photometric methods reflect delivered liquid but include fluid-path and instrument effects. Displacement measurement more directly isolates mechanical reversal error."), p("For a height or displacement method, use adequate resolution and control mounting, contact force, speed and reading direction. Home the mechanism, enter the usable stroke, take up initial clearance in one direction, record the start, command equal outbound and return motion, then record the difference."), notice("Example procedure: ", "Repeat 20 times: aspirate 80% stroke, dispense 100 full steps as preliminary take-up, record the start, dispense 50% stroke, aspirate 50% stroke and record the end. Confirm that the chosen pre-move and stroke ratios do not hit limits and actually cover the pump's backlash."), { type: "formula", expression: "Backlash magnitude = |x₂ − x₁|", note: "Retain the mean, maximum, dispersion, direction and complete test conditions." }] },
      { title: "How to use the 20-full-step reference", parts: [p("The following values explain a compensation concept; they are not universal specifications or factory measurements for every model."), { type: "table", headers: ["Pump capacity (μL)", "Stroke ratio", "Reference compensation (full steps)"], rows: [["100", "1%", "20"], ["250", "1%", "20"], ["500", "1%", "20"], ["1,000", "1%", "20"], ["2,500", "1%", "20"], ["5,000", "1%", "20"]] }] },
      { title: "Convert measured lost motion into a command", parts: [p("For measured lost travel b in mm, direct-drive lead p in mm/rev and N full steps per revolution, estimated full-step compensation is b × N ÷ p. With microstep factor m, input pulses are b × N × m ÷ p, rounded and calibrated to the controller's position units."), { type: "formula", expression: "full steps ≈ b × N ÷ p; pulses ≈ b × N × m ÷ p", note: "Twenty full steps equal 320 input pulses at 16 microsteps only when the controller counts microstep pulses." }, { type: "links", items: [{ prefix: "For unit conversion, see ", label: "Precision Piston Pump Stepper Motor Calculation and Selection", href: "/resources/technical-articles/stepper-motor-calculation-selection/", suffix: "." }] }] },
      { title: "Single aspiration X and single dispense X", parts: [p("One sequence first aspirates the compensation steps after homing, then aspirates target X with the probe in the reagent. At the destination it commands the target dispense plus the compensation travel, separating reversal take-up from effective discharge."), p("Confirm probe position, air gaps, valves and available stroke. Only fluid-path testing can show whether the pre-move causes unintended aspiration, air intake or dose bias."), { type: "links", items: [{ prefix: "For smooth motion after compensation, see ", label: "Piston-Pump Acceleration and Deceleration Curves", href: "/resources/technical-articles/piston-pump-acceleration-deceleration-curves/", suffix: "." }] }] },
      { title: "One aspiration and multiple dispenses: X = Y + Z", parts: [p("A split-dispense sequence may precompensate before aspiration, aspirate X plus an added compensation amount, reverse through compensation, then dispense Y and Z. The extra aspiration and residual volume mean that X cannot simply be assumed to leave the system completely."), p("Measure the first, intermediate and final aliquots and the remaining volume. Compensation corresponds to a real direction reversal; continuous dispensing in one direction normally does not require compensation for every aliquot. Coordinate the sequence with valves, air gaps, medium and backpressure.")] },
    ],
    conclusion: { title: "Conclusion", parts: [p("Measure backlash on the actual mechanism, convert it using the real transmission and controller units, then calibrate the complete aspiration/dispense sequence at the target volumes. Treat 20 full steps as an example, not a universal value.")] },
    cta: { title: "Need to validate piston-pump backlash compensation?", description: "Share the transmission, controller units, working stroke, valve sequence, fluid, target volume and measurement method for a configuration review.", ...contactCta },
    subject: { about: ["piston pump backlash compensation", "reversal lost motion"], mentions: ["lead screw", "full step", "microstep", "split dispensing", "liquid-handling calibration"] },
  },
  {
    slug: "stepper-motor-calculation-selection",
    title: "Precision Piston Pump Stepper Motor Calculation and Selection",
    summary: "Calculate pulse frequency, microstepping, transmission ratio and load torque, then verify speed and dynamic torque with a 400 mm reciprocating-platform example.",
    seoTitle: "Precision Piston Pump Stepper Motor Calculation Guide | FOREACH",
    seoDescription: "A practical guide to stepper pulse frequency, microsteps, transmission ratio, pulse equivalent, load torque and dynamic torque verification.",
    date: "2026-09-06",
    coverImage: "/images/resources/technical-articles/piston-pump/precision-piston-pump-stepper-motor-selection-cover.webp",
    coverAlt: "Stepper motor calculation for a precision fluidic motion system",
    intro: [p("A stepper driver converts pulse commands into discrete rotation. Pulse count plans displacement and pulse frequency plans speed, but command following still depends on the motor, driver, load and acceleration profile.")],
    sections: [
      { title: "Start from the motion requirement", parts: [p("Define stroke, cycle time, dwell, moving mass, friction, external force, positioning requirement and transmission. For a piston pump, include hydraulic load and seal friction. Do not select by frame size or holding torque alone.")] },
      { title: "Holding torque, running torque and microstepping", parts: [p("Holding torque describes resistance to external torque while energized and stationary. Running selection must use the torque-speed curve at the intended voltage, current and driver settings."), p("Microstepping reduces theoretical angle per input pulse and can improve smoothness. Higher command resolution does not produce equal gains in positioning accuracy or repeatability; verify the motor, load and mechanics.")] },
      { title: "Common conversion formulas", parts: [p("For full-step angle θ, full steps per revolution N = 360 ÷ θ. With microstep factor m and input frequency f, motor speed n = f ÷ (N × m) rev/s and rpm = 60 × n."), { type: "formula", expression: "N = 360 ÷ θ; n = f ÷ (N × m); rpm = 60 × n", note: "θ in degrees and f in hertz." }, p("If motor-to-load speed ratio is G and linear travel per load-axis revolution is C, pulse equivalent δ = C ÷ (G × N × m). Use lead for C in a screw drive."), { type: "formula", expression: "δ = C ÷ (G × N × m)", note: "Load and inertia torque must also be reflected to the motor shaft with real efficiency and inertia." }] },
      { title: "Example: 400 mm horizontal reciprocating platform", parts: [p("Assume 400 mm one-way travel, a 4 s round trip with no end dwell, 10 kg moving mass, belt drive, 0.1 s acceleration and 0.1 s deceleration per direction, 1.8 s constant speed and friction coefficient 0.1. This is a calculation example, not a final equipment selection."), p("The one-way time is 2 s. From the trapezoidal velocity-profile area, 0.4 = vmax × (0.1/2 + 1.8 + 0.1/2), so vmax ≈ 0.2105 m/s and acceleration ≈ 2.105 m/s². Friction is approximately 9.8 N and acceleration force 21.05 N, giving about 30.85 N before pulley inertia and losses."), { type: "formula", expression: "vmax = 0.4 ÷ (0.1/2 + 1.8 + 0.1/2) ≈ 0.2105 m/s", note: "One-way travel is 2 s: 0.1 s acceleration, 1.8 s constant speed and 0.1 s deceleration." }] },
      { title: "Transmission ratio, microsteps and speed", parts: [p("With a 30 mm load pulley, circumference is about 94.25 mm. Direct drive with a 1.8° motor requires more than 9.42 microsteps for theoretical pulse equivalent below 0.05 mm; this only compares command resolution."), p("With 3:1 reduction—three motor revolutions per load-axis revolution—and four microsteps, pulse equivalent is about 94.25 ÷ (3 × 200 × 4) = 0.0393 mm/pulse."), { type: "table", headers: ["Calculated item", "Example result"], rows: [["Maximum load-axis speed", "≈2.234 rev/s"], ["Maximum motor speed at 3:1", "≈6.70 rev/s or 402 rpm"], ["Input pulse frequency at 4 microsteps", "≈5,361 pulse/s"], ["Theoretical pulse equivalent", "≈0.0393 mm/pulse"]] }, { type: "links", items: [{ prefix: "For reversal lost motion beyond command resolution, see ", label: "Precision Piston Pump Backlash Compensation", href: "/resources/technical-articles/precision-piston-pump-backlash-compensation/", suffix: "." }] }] },
      { title: "Dynamic-torque check and final acceptance", parts: [p("Ignoring rotational inertia and losses temporarily, required motor-shaft torque is about 30.85 × 0.015 ÷ 3 = 0.154 N·m. A preliminary 2× margin gives 0.309 N·m, but pulley and rotor inertia, efficiency, transmission losses and external force must still be added."), p("Check the motor-driver dynamic torque near 402 rpm and throughout acceleration. The example 57HS09 motor cannot be accepted from its 0.9 N·m holding torque alone. Finally test missed steps, temperature rise, vibration and reciprocating position at the worst load."), { type: "links", items: [{ prefix: "For selecting the acceleration profile, see ", label: "Piston-Pump Acceleration and Deceleration Curves", href: "/resources/technical-articles/piston-pump-acceleration-deceleration-curves/", suffix: "." }] }] },
    ],
    conclusion: { title: "Conclusion", parts: [p("Pulse equivalent proves command resolution only. Final selection requires the torque-speed curve at the actual driver settings and verification of acceleration, temperature, vibration, missed steps and positioning under the most demanding load.")] },
    referencesTitle: "References",
    references: [{ label: "Oriental Motor: Stepper Motor Basics", href: "https://www.orientalmotor.com/stepper-motors/technology/stepper-motor-basics.html" }],
    cta: { title: "Need help checking a stepper-motor operating point?", description: "Share stroke, cycle time, load, transmission, driver voltage/current, microsteps and target speed for an engineering calculation.", ...contactCta },
    subject: { about: ["stepper motor calculation", "stepper motor selection"], mentions: ["pulse frequency", "microstepping", "transmission ratio", "pulse equivalent", "dynamic torque"] },
  },
] as const;
