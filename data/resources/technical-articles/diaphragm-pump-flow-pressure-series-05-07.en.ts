import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const PRESSURE_TERMS_ASSET_BASE =
  "/images/resources/technical-articles/diaphragm-pump-pressure-rating-terms";
const PRESSURE_LEVEL_SELECTION_ASSET_BASE =
  "/images/resources/technical-articles/100-kpa-vs-600-kpa-diaphragm-pump-selection";
const HIGH_BACKPRESSURE_BUDGET_ASSET_BASE =
  "/images/resources/technical-articles/high-backpressure-fluid-path-pressure-budget";

export const diaphragmPumpPressureRatingTermsEnCopy = {
  metadata: {
    title:
      "What Is the Difference Between Rated Working Pressure, Maximum Output Pressure, Proof Pressure, and Burst Pressure for a Miniature Diaphragm Pump?",
    seoTitle:
      "Diaphragm Pump Rated Pressure vs Maximum Output, Proof, and Burst Pressure | FOREACH",
    seoDescription:
      "Rated working pressure, maximum output pressure, proof pressure, and burst pressure are not interchangeable for a miniature diaphragm pump. This guide compares the terms and provides a parameter checklist and specification-review method.",
    coverImage: `${PRESSURE_TERMS_ASSET_BASE}/article-cover.webp`,
    coverAlt:
      "Real-world miniature diaphragm pump and pressure-test footage from the official FOREACH Douyin channel",
  },
  deck:
    "A pressure value has engineering meaning only when it is paired with a term definition, test fluid, inlet condition, corresponding flow rate, duration, and acceptance criteria. Rated working pressure can define an operating boundary; maximum output pressure, proof-test pressure, and burst pressure cannot be treated directly as continuous operating points.",
  leadBlocks: [
    {
      type: "paragraph",
      text:
        "Miniature diaphragm pump literature commonly uses Rated Pressure, Max. Pressure, Output Pressure, Proof Pressure, Pressure Test, and Burst Pressure. Chinese-language pages may group these under generic labels such as 'pressure,' 'maximum pressure,' or 'pressure resistance,' making it easy to compare data that describe fundamentally different boundaries in a single column.",
    },
    {
      type: "paragraph",
      text:
        "A pressure parameter cannot be used for selection based on its numeric value alone. At minimum, confirm the test fluid, temperature, inlet pressure, corresponding flow rate, duration, duty cycle, and acceptance criteria. Even when two values are both listed as 600 kPa, different conditions mean they do not represent the same performance.",
    },
    {
      type: "notice",
      label: "Engineering conclusion:",
      text:
        "Rated working pressure, maximum output pressure, proof-test pressure, and burst pressure define different boundaries. Until a controlled specification and test definition are available, proof or burst data must not be restated as allowable continuous operating pressure.",
    },
  ],
  sections: [
    {
      title: "1. Why the Same 600 kPa Value Can Describe Completely Different Things",
      blocks: [
        {
          type: "paragraph",
          text:
            "Actual working pressure answers how much pressure differential the pump must overcome in operation. Rated working pressure describes the operating range allowed or specified by a controlled specification under defined conditions. Maximum output pressure usually describes a performance endpoint. Proof-test pressure and burst pressure verify a structural boundary and a failure boundary, respectively. These terms answer different questions.",
        },
        {
          type: "figure",
          src: `${PRESSURE_TERMS_ASSET_BASE}/article-figure-en.webp`,
          alt:
            "Five terminology cards explaining actual working pressure, rated pressure, maximum output pressure, proof pressure, and burst pressure for a miniature diaphragm pump",
          width: 2560,
          height: 2040,
          caption:
            "Figure 5. Common miniature diaphragm pump pressure terms cannot be placed in one column and compared directly.",
        },
      ],
    },
    {
      title: "2. What Each of the Five Common Terms Actually Answers",
      blocks: [
        {
          type: "table",
          headers: [
            "Term",
            "Engineering meaning",
            "Can it be used directly as a continuous operating point?",
            "What must be clarified",
          ],
          rows: [
            [
              "Actual working pressure",
              "The real pressure differential between the pump inlet and outlet while the equipment is operating",
              "It is operating data that must be validated",
              "Steady-state or transient condition, flow rate, and inlet condition",
            ],
            [
              "Rated working pressure",
              "The operating pressure range allowed or specified by a controlled specification under defined conditions",
              "It can define a boundary, provided all applicable conditions are observed",
              "Fluid, temperature, duty cycle, and the flow-pressure curve",
            ],
            [
              "Maximum output pressure",
              "A pressure endpoint or output-pressure range that the pump can reach or is guaranteed to meet",
              "Normally not when stated by itself",
              "Whether flow remains at that point and how long the condition may be sustained",
            ],
            [
              "Proof pressure or test pressure",
              "A verification pressure applied to the structure or seals for a specified fluid, duration, and acceptance criteria",
              "No",
              "Test fluid, duration, and leakage or deformation criteria",
            ],
            [
              "Burst pressure",
              "The boundary at which the specimen undergoes permanent damage or functional failure",
              "Never",
              "Specimen condition, pressure ramp rate, and failure criteria",
            ],
          ],
        },
        {
          type: "notice",
          label: "Controlled-specification boundary:",
          text:
            "Public webpages are suitable for preliminary screening and for identifying questions. Final design inputs must come from a valid revision of the controlled specification. If proof or burst data are not disclosed, do not infer them from materials, construction, or similar parameters.",
        },
      ],
    },
    {
      title: "3. Why One Pressure Number Still Does Not Define Operating Capability",
      blocks: [
        {
          type: "paragraph",
          text:
            "Take the FOREACH DPL30H high-pressure liquid diaphragm pump as an example. The website lists a rated pressure of 600 kPa. This value must be interpreted together with the corresponding flow rate, fluid, inlet condition, temperature, duty cycle, and complete flow-pressure curve. It cannot be extended automatically to proof pressure, burst pressure, or continuous delivery capability under arbitrary conditions.",
        },
        {
          type: "paragraph",
          text:
            "When literature lists Rated Pressure, Max. Pressure, Output Pressure, Pressure Test, or Burst Pressure, first confirm the field definition, then review the test conditions and acceptance criteria. Equal values only mean that the unit-converted numbers match; they do not establish equal engineering boundaries.",
        },
        {
          type: "table",
          headers: [
            "Specification field",
            "Minimum information that can be confirmed",
            "What cannot be inferred directly",
          ],
          rows: [
            [
              "Rated Pressure / rated working pressure",
              "The controlled specification defines an operating-pressure boundary under stated conditions",
              "That no-load flow is maintained at this pressure or that the value applies to every fluid",
            ],
            [
              "Max. Pressure / Output Pressure",
              "The literature provides a pressure endpoint or output-pressure range",
              "That the value is allowable for long-term continuous operation",
            ],
            [
              "Pressure Test / Proof Pressure",
              "The structure or seals underwent pressure verification under stated conditions",
              "That the test pressure is the rated working pressure or burst pressure",
            ],
            [
              "Burst Pressure",
              "The specimen's permanent-damage or functional-failure boundary",
              "That the system's allowable working pressure may be increased on this basis",
            ],
          ],
        },
      ],
    },
    {
      title: "4. Clarify at Least Nine Items When Reviewing a Pressure Parameter",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "The term's formal definition in the controlled specification.",
            "Whether the test fluid is water, gas, or another liquid.",
            "Fluid temperature and ambient temperature.",
            "Whether the pump inlet is at atmospheric, negative, or positive pressure.",
            "The flow rate corresponding to the pressure and whether a complete flow-pressure curve is available.",
            "Whether the test is steady-state or transient, and its duration.",
            "Whether the duty cycle is continuous, intermittent, or permits only brief deadheading.",
            "Whether the acceptance criterion is continued delivery, no leakage, no deformation, or no burst.",
            "Whether sample count, power supply, tubing, and connections match the project conditions.",
          ],
        },
      ],
    },
    {
      title: "5. How to Avoid Misuse When the Specification Is Ambiguous",
      blocks: [
        {
          type: "paragraph",
          text:
            "If a public page provides only one pressure value, first mark it as a 'parameter pending confirmation.' Do not classify it on your own as rated pressure, proof pressure, or burst pressure. Retain the controlled specification's exact wording in the project parameter table, and add fields for term definition, corresponding flow rate, duration, duty cycle, and acceptance criteria.",
        },
        {
          type: "paragraph",
          text:
            "FOREACH content follows the same principle: when the controlled specification publishes rated pressure, it is described as rated pressure. Undisclosed proof and burst values are not estimated from construction, materials, or similar parameters. A webpage can explain a selection method, but it cannot replace product-release documentation.",
        },
      ],
    },
    {
      title: "FOREACH Resources and Evidence Boundary",
      blocks: [
        {
          type: "links",
          items: [
            {
              label:
                "FOREACH: DPL30H High-Pressure Liquid Diaphragm Pump Selection Guide",
              href: "/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide",
            },
          ],
        },
        {
          type: "notice",
          label: "Evidence boundary:",
          text:
            "Public FOREACH resources explain pressure terminology and selection methods. Formulas and examples are for preliminary engineering screening only; they do not replace a controlled specification, evaluation with the actual fluid, or full-system prototype validation.",
        },
      ],
    },
  ],
  faqTitle: "FAQ | How Do Diaphragm Pump Pressure Terms Differ?",
  faqItems: [
    {
      question: "Is maximum output pressure the pressure at pump deadhead?",
      answer:
        "Some literature may define it as a performance endpoint near zero flow, but that cannot be assumed universally. Review the controlled specification, flow-pressure curve, and test method for the specific model.",
    },
    {
      question:
        "If proof pressure is higher than rated pressure, can the pump operate continuously at a higher pressure?",
      answer:
        "No. A proof or pressure test normally has a specified fluid, duration, and acceptance criteria. It verifies the relevant structural or sealing boundary, not long-term operating performance or life.",
    },
    {
      question: "Does a higher burst pressure mean a better pump?",
      answer:
        "Not by itself. Burst pressure is a failure boundary. Actual selection depends more on allowable working pressure at the target flow, fluid compatibility, service life, and the safety boundary of the complete fluid path.",
    },
    {
      question: "Are 6 bar and 600 kPa exactly equal?",
      answer:
        "They are equivalent units: 1 bar = 100 kPa. However, terminology, test conditions, and duty cycle can differ between pages. Equal converted values do not mean the performance definitions are the same.",
    },
    {
      question: "How should pressure fields be recorded in a project table?",
      answer:
        "Retain the exact controlled-specification wording and complete model number. Then add normalized fields for rated working pressure, maximum output pressure, proof or test pressure, burst pressure, flow at the target pressure, fluid, temperature, inlet condition, duration, duty cycle, and acceptance criteria.",
    },
  ],
  cta: {
    title: "Need to Verify Pressure Parameters for a Miniature Diaphragm Pump?",
    description:
      "Submit the target flow, inlet and outlet pressures, fluid temperature, duty cycle, and complete fluid-path details. An engineer can review the candidate operating point against the controlled specification and curve.",
    contactLabel: "Contact an Engineer",
    productsLabel: "View Diaphragm Pumps",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const highBackpressureFluidPathPressureBudgetEnCopy = {
  metadata: {
    title:
      "How Do You Build a Pressure Budget for a High-Backpressure Fluid Path? A FOREACH 600 kPa Miniature Diaphragm Pump Selection Example",
    seoTitle:
      "High-Backpressure Fluid-Path Pressure Budget: 600 kPa Miniature Diaphragm Pump Selection | FOREACH",
    seoDescription:
      "Before selecting a pump for a high-backpressure fluid path, include the suction tube, discharge tube, valves, filter, needle, endpoint chamber, and static head in the steady-state budget, then review transient protection and pressure margin separately.",
    coverImage: `${HIGH_BACKPRESSURE_BUDGET_ASSET_BASE}/article-cover.webp`,
    coverAlt:
      "Real-world high-backpressure fluid-path testing of a miniature diaphragm pump from the official FOREACH Douyin channel",
  },
  deck:
    "For a high-backpressure fluid path, do not tell a supplier only that you need 6 bar. Break down steady-state pressure losses at the target flow, establish normal steady-state, worst steady-state, pressure-margin, and transient-protection boundaries separately, and then compare them with the candidate pump's controlled curve.",
  leadBlocks: [
    {
      type: "paragraph",
      text:
        "A high-backpressure fluid path usually includes a reservoir, suction tube, pump, valves, fittings, filter, needle or nozzle, and endpoint chamber. Every component can consume pressure differential. The pump must overcome these steady-state losses at the target flow to complete the delivery task.",
    },
    {
      type: "paragraph",
      text:
        "A pressure budget should not collapse normal conditions, worst conditions, design margin, and valve-switching or blockage peaks into one number. Normal and worst conditions establish operating points. Margin indicates the candidate design's tolerance of variation. Transients define sensing, shutdown, pressure-relief, and component-protection boundaries.",
    },
    {
      type: "notice",
      label: "Engineering conclusion:",
      text:
        "Record normal steady state, worst steady state, pressure margin, and transient protection separately. A transient peak is not a continuous operating point and must not be added mechanically to the steady-state budget as another pressure-drop item.",
    },
  ],
  sections: [
    {
      title: "1. Start the Pressure Budget with the Complete Fluid Path, Not the Pump",
      blocks: [
        {
          type: "formula",
          expression:
            "ΔPsteady(Qtarget) = Poutlet,steady(Qtarget) − Pinlet,steady(Qtarget)",
          note:
            "First standardize gauge pressure, absolute pressure, and sign convention, then calculate inlet and outlet pressure at the same target flow.",
        },
        {
          type: "paragraph",
          text:
            "When the budget is broken down by component, it can include steady suction-side loss, steady discharge-tube loss, local losses through valves and fittings, filter pressure drop, needle or nozzle pressure drop, endpoint chamber pressure, and static-head difference. Only data from the same state and target flow, using a consistent sign convention, may enter one steady-state budget.",
        },
        {
          type: "figure",
          src: `${HIGH_BACKPRESSURE_BUDGET_ASSET_BASE}/article-figure-en.webp`,
          alt:
            "A two-swimlane diagram showing the continuous pressure budget and transient pressure-protection boundary of a high-backpressure fluid path",
          width: 2560,
          height: 2360,
          caption:
            "Figure 7. High-backpressure fluid-path pressure budget: separate every steady-state loss and compare the total with the pump curve; route transient peaks into protection design separately.",
        },
      ],
    },
    {
      title: "2. Provide at Least Twelve Categories of Information for a High-Backpressure Application",
      blocks: [
        {
          type: "table",
          headers: ["Item", "Data to provide", "Data source"],
          rows: [
            [
              "Fluid",
              "Name, concentration, temperature, viscosity, and presence of particles or bubbles",
              "Formulation and process conditions",
            ],
            [
              "Target flow",
              "Minimum, nominal, maximum, and allowable tolerance",
              "Equipment cycle time",
            ],
            [
              "Reservoir conditions",
              "Liquid-level range, vessel pressure, and whether the first start is dry",
              "Equipment layout",
            ],
            [
              "Suction tube",
              "ID, length, material, elbows, and fittings",
              "Drawing or physical assembly",
            ],
            [
              "Discharge tube",
              "ID, length, material, elbows, and fittings",
              "Drawing or physical assembly",
            ],
            [
              "Valves",
              "Complete model number, bore, Cv, or pressure-drop curve",
              "Supplier data",
            ],
            [
              "Filter",
              "Complete model number, new-element pressure drop, and end-of-life pressure drop",
              "Supplier data or measurement",
            ],
            [
              "Needle or nozzle",
              "Complete model number, ID, length, and flow-pressure-drop data",
              "Supplier data or measurement",
            ],
            [
              "Endpoint chamber",
              "Atmospheric, negative, or positive pressure range",
              "System definition",
            ],
            [
              "Duty cycle",
              "Continuous or intermittent operation, start-stop frequency, and duration per cycle",
              "Program cycle",
            ],
            [
              "Transients and abnormal conditions",
              "Valve switching, blockage, start-stop peaks, duration, and protective actions",
              "Dynamic testing",
            ],
            [
              "Power and control",
              "Voltage range, PWM, current limiting, and feedback",
              "Electrical design",
            ],
          ],
        },
      ],
    },
    {
      title: "3. Establish Four Boundaries Separately",
      blocks: [
        {
          type: "subheading",
          title: "1. Normal steady-state operating point",
        },
        {
          type: "formula",
          expression:
            "ΔPnormal steady(Qtarget) = Poutlet,normal steady(Qtarget) − Pinlet,normal steady(Qtarget)",
          note:
            "Use typical liquid level, a new filter, nominal voltage, and fluid at normal temperature to confirm the everyday operating point and control range.",
        },
        {
          type: "subheading",
          title: "2. Worst steady-state operating point",
        },
        {
          type: "formula",
          expression:
            "ΔPworst steady(Qtarget) = Poutlet,worst steady(Qtarget) − Pinlet,worst steady(Qtarget)",
          note:
            "Use minimum liquid level, an end-of-life filter, the fluid-viscosity or temperature boundary, and the highest sustainable endpoint pressure to confirm the worst fluid-path demand.",
        },
        {
          type: "subheading",
          title: "3. Pressure margin",
        },
        {
          type: "formula",
          expression:
            "Mpressure(Qtarget) = ΔPcandidate pump allowable boundary(Qtarget) − ΔPworst steady(Qtarget)",
          note:
            "The candidate-pump boundary must come from a controlled curve or specification for the same fluid, temperature, inlet condition, minimum allowable supply, and duty cycle. The project must define acceptable margin separately.",
        },
        {
          type: "subheading",
          title: "4. Transient and abnormal-condition protection",
        },
        {
          type: "paragraph",
          text:
            "For peaks caused by valve switching, start-stop events, endpoint blockage, valve misoperation, or pinched tubing, record peak pressure, duration, location, and trigger condition. Review the pressure-sensor range, shutdown threshold, pressure-relief path, and transient allowable boundary of each component separately. These are protection-design inputs, not continuous pump-selection operating points.",
        },
        {
          type: "table",
          headers: ["Boundary", "What it should include", "Purpose"],
          rows: [
            [
              "Normal steady state",
              "Typical liquid level, new filter, nominal voltage, and fluid at normal temperature",
              "Confirm the normal operating point and control range",
            ],
            [
              "Worst steady state",
              "Minimum liquid level, end-of-life filter, fluid and endpoint-pressure boundaries; review pump capability at minimum allowable supply separately",
              "Confirm target flow, margin, and long-term usability",
            ],
            [
              "Pressure margin",
              "Candidate pump allowable operating boundary minus worst steady-state demand",
              "Accommodate manufacturing, measurement, aging, and operating-condition variation",
            ],
            [
              "Transient or abnormal-condition protection",
              "Valve switching, blockage, incorrect switching, pinched tubing, and start-stop peaks",
              "Set sensing, shutdown, pressure-relief, and component-protection boundaries",
            ],
          ],
        },
      ],
    },
    {
      title: "4. Illustrative Budget: Add Steady-State Losses, but Treat Transients and Margin Separately",
      blocks: [
        {
          type: "paragraph",
          text:
            "The following demonstrates the method only and does not represent actual customer equipment. Assume a target flow of 220 mL/min. Under the worst sustainable steady-state conditions, measurements or supplier data give a 10 kPa suction-side loss, 18 kPa straight discharge-tube loss, 12 kPa valve loss, 35 kPa end-of-life filter pressure drop, 95 kPa needle pressure drop, and 20 kPa endpoint chamber pressure.",
        },
        {
          type: "formula",
          expression:
            "ΔPworst steady(220 mL/min) ≈ 10 + 18 + 12 + 35 + 95 + 20 = 190 kPa",
          note:
            "These six items may be added because they belong to the same target flow and the same worst steady state.",
        },
        {
          type: "paragraph",
          text:
            "The 190 kPa result means that a standard 100 kPa-class platform normally should not enter the candidate set directly, but it does not prove that any 600 kPa pump will work. Next, read the candidate pump's controlled curve at 220 mL/min, calculate pressure margin, and review fluid, temperature, inlet conditions, connections, power supply, and duty cycle.",
        },
        {
          type: "paragraph",
          text:
            "If valve switching creates a separate short-duration peak, record it as an independent transient event and design protection based on its magnitude, duration, and location. Do not add it to the 190 kPa steady-state operating point, and do not add pressure margin to the steady-state equation as another pressure loss.",
        },
      ],
    },
    {
      title: "5. How the FOREACH DPL30H Enters the Product Shortlist",
      blocks: [
        {
          type: "paragraph",
          text:
            "Published parameters for the FOREACH DPL30H high-pressure liquid diaphragm pump include a 300 mL/min no-load flow, 600 kPa rated pressure, 3 mH₂O self-priming height, and a compression connection for 6 × 4 mm rigid tubing. This makes it a candidate for high-backpressure applications, but selection still centers on the flow available at the target backpressure and whether that point falls within the fluid, temperature, and duty-cycle limits of the controlled specification.",
        },
        {
          type: "paragraph",
          text:
            "If the needle and filter are the main restrictions, obtain their pressure drops with the actual fluid, temperature, and service-life state. If the main issue is negative inlet pressure or inadequate chamber refill, high outlet-pressure capability does not automatically correct the suction-side condition.",
        },
        {
          type: "links",
          items: [
            {
              prefix: "For product selection, see: ",
              label: "DPL30H High-Pressure Liquid Diaphragm Pump Selection Guide",
              href: "/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide",
              suffix: ".",
            },
          ],
        },
      ],
    },
    {
      title: "6. After the Pressure Budget, Review the Lowest Allowable Working Pressure in the Entire Path",
      blocks: [
        {
          type: "paragraph",
          text:
            "A pump rated at 600 kPa does not automatically qualify every 6 × 4 mm rigid tube, fitting, valve, filter, pressure sensor, and chamber for 600 kPa working pressure. The component with the lowest allowable working pressure determines the allowable working pressure of the complete fluid path.",
        },
        {
          type: "list",
          items: [
            "Confirm tubing material, OD tolerance, cut quality, insertion depth, and compression-fitting tightening requirements.",
            "Confirm allowable working pressure and test pressure, with their applicable conditions, separately for valves, filters, sensors, and chambers; do not mix the terminology.",
            "Select sensor range, overpressure shutdown, and the pressure-relief path against the normal steady-state, worst steady-state, and transient-protection boundaries.",
            "Complete pressure-hold, leakage, start-stop, valve-switching, blockage-protection, and life-stage testing.",
          ],
        },
      ],
    },
    {
      title: "7. Operating-Condition Template for Direct Use in an Inquiry",
      blocks: [
        {
          type: "table",
          headers: [
            "Field",
            "Example entry (replace with actual project data)",
          ],
          rows: [
            ["Fluid and temperature", "Purified water, 20–30°C"],
            [
              "Target flow",
              "Nominal 220 mL/min; minimum 200 mL/min",
            ],
            [
              "Inlet condition",
              "Reservoir liquid level is 0.4 m below the pump; tubing contains air at first startup",
            ],
            [
              "Discharge path",
              "2.0 mm ID, 1.2 m long, with two valves, one filter, and an endpoint needle",
            ],
            [
              "Steady-state pressure data",
              "Record normal steady state and worst steady state, including filter end of life, separately",
            ],
            [
              "Transients and protection",
              "Record valve-switching peak, duration, shutdown threshold, and pressure-relief path separately",
            ],
            [
              "Duty cycle",
              "45 s per cycle, 1,200 cycles per day, with the ambient-temperature range",
            ],
            ["Control", "24 V, PWM speed control, FG feedback required"],
            [
              "Validation objectives",
              "Flow, steady-state pressure, transient peak, startup, temperature rise, leakage, and life trend",
            ],
          ],
        },
      ],
    },
    {
      title: "FOREACH Resources and Evidence Boundary",
      blocks: [
        {
          type: "links",
          items: [
            {
              label:
                "FOREACH: DPL30H High-Pressure Liquid Diaphragm Pump Selection Guide",
              href: "/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide",
            },
          ],
        },
        {
          type: "notice",
          label: "Evidence boundary:",
          text:
            "Public FOREACH resources explain terminology only. Final design inputs must come from the controlled specification, evaluation with the actual fluid, dynamic pressure testing, and full-system validation.",
        },
      ],
    },
  ],
  faqTitle: "FAQ | How Do You Build a Pressure Budget for a High-Backpressure Fluid Path?",
  faqItems: [
    {
      question: "Must the pressure budget be precise for every fitting?",
      answer:
        "During preliminary screening, identify the dominant restrictions first. Before design release, review every meaningful reduction and critical component. In a miniature fluid path, even one small-bore fitting can become a major source of pressure drop.",
    },
    {
      question: "What if end-of-life filter data are unavailable?",
      answer:
        "First request the flow-pressure-drop curve for the exact model from the supplier. Then establish a boundary through a loading test or equivalent restriction. Data from a new filter alone cannot represent the full service life.",
    },
    {
      question:
        "Can a transient pressure peak be added directly to steady-state pressure?",
      answer:
        "No. Record a transient peak separately by magnitude, duration, location, and trigger condition. Use it to review sensor range, shutdown, pressure relief, and component transient limits. It is not continuous working pressure and does not enter the steady-state operating point.",
    },
    {
      question:
        "If the pressure budget is below 600 kPa, will any 600 kPa pump work?",
      answer:
        "Not necessarily. Also confirm flow at the target pressure, pressure margin, fluid, temperature, inlet conditions, duty cycle, control, connection method, and the lowest allowable working pressure of the complete fluid path.",
    },
    {
      question:
        "At what project stage is a pressure budget most useful?",
      answer:
        "Make a preliminary estimate during concept design. During prototyping, use sensors to measure normal steady state, worst steady state, and transient peaks separately. Before design freeze, establish controlled operating, margin, and protection boundaries.",
    },
  ],
  cta: {
    title: "Need to Review a High-Backpressure Fluid-Path Pressure Budget?",
    description:
      "Submit the fluid, target flow, inlet conditions, complete fluid path, normal and worst steady-state pressures, transient events, duty cycle, and control requirements. An engineer can help compare the candidate pump curve with the complete fluid-path boundary.",
    contactLabel: "Submit Operating Conditions",
    productsLabel: "View High-Pressure Diaphragm Pumps",
    productsHref:
      "/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const diaphragmPump100KpaVs600KpaSelectionEnCopy = {
  metadata: {
    title:
      "Is 100 kPa Enough? How to Determine Whether a Fluid Path Needs a 600 kPa High-Pressure Miniature Diaphragm Pump",
    seoTitle:
      "100 kPa vs 600 kPa Miniature Diaphragm Pumps: Select by Fluid-Path Pressure Budget | FOREACH",
    seoDescription:
      "Whether 100 kPa is sufficient cannot be decided from the application name alone. Evaluate target flow, tubing, valves, filter, needle, endpoint pressure, and the pump curve to determine whether a 600 kPa high-pressure miniature diaphragm pump is needed.",
    coverImage: `${PRESSURE_LEVEL_SELECTION_ASSET_BASE}/article-cover.webp`,
    coverAlt:
      "Real-world miniature diaphragm pump and fluid-path pressure-test footage from the official FOREACH Douyin channel",
  },
  deck:
    "100 kPa and 600 kPa are not simply a standard version and an upgraded version. First complete a pressure budget for the entire fluid path at the target flow, then read the candidate pump curve. A higher pressure rating has value only when the application truly has high backpressure.",
  leadBlocks: [
    {
      type: "paragraph",
      text:
        "Application labels such as rinsing, sampling, or needle delivery are not enough to determine a pump pressure class. The same application can fall into completely different operating ranges as flow, tubing ID, filter condition, needle size, or endpoint chamber pressure changes.",
    },
    {
      type: "paragraph",
      text:
        "Selection should begin with target flow Qtarget and the worst sustainable steady-state pressure differential between the pump inlet and outlet at that flow. Startup and valve-switching transients must then be reviewed separately as protection boundaries, rather than being hidden inside a vague system-backpressure value.",
    },
    {
      type: "notice",
      label: "Engineering conclusion:",
      text:
        "Calculate or measure fluid-path pressure demand at the target flow first, then read the corresponding flow from the pump curve. Rated pressure is one boundary; it does not prove that the pump maintains no-load flow at the pressure endpoint.",
    },
  ],
  sections: [
    {
      title: "1. Start with the Target Flow Before Selecting a Pressure Class",
      blocks: [
        {
          type: "paragraph",
          text:
            "Fluid-path pressure drop changes with flow. The same tube requires different pressure at 100 mL/min and 300 mL/min, and the same needle changes pressure drop when fluid viscosity changes. Therefore, 'this equipment needs about 100 kPa' is not a complete selection condition unless the corresponding flow is stated.",
        },
        {
          type: "formula",
          expression:
            "ΔPrequired(Qtarget) = Poutlet(Qtarget) − Pinlet(Qtarget)",
          note:
            "The pressure budget must correspond to the target flow. Record the worst steady-state pressure and transient boundaries such as startup, valve switching, or blockage separately.",
        },
        {
          type: "figure",
          src: `${PRESSURE_LEVEL_SELECTION_ASSET_BASE}/article-figure-en.webp`,
          alt:
            "Pressure-class decision workflow that establishes target flow, inventories fluid-path losses, and reads the pump curve",
          width: 2560,
          height: 2160,
          caption:
            "Figure 6. To determine whether 100 kPa is enough, begin with total pressure demand at the target flow.",
        },
      ],
    },
    {
      title: "2. Inventory Every Source of Pressure Demand",
      blocks: [
        {
          type: "table",
          headers: [
            "Pressure item",
            "Typical sources",
            "Why it cannot be omitted",
          ],
          rows: [
            [
              "Suction-side loss",
              "Suction tubing, inlet valve, filter, and low liquid level",
              "Affects inlet absolute pressure and refill of the pump chamber",
            ],
            [
              "Straight-tube discharge loss",
              "Narrow tubing, long tubing, and higher viscosity",
              "Increases as target flow rises",
            ],
            [
              "Local loss",
              "Fittings, elbows, valves, and flow cells",
              "An internal passage may be the narrowest point",
            ],
            [
              "Filter pressure drop",
              "From a new element to end of life",
              "Can rise substantially during long-term operation",
            ],
            [
              "Endpoint resistance",
              "Needle, nozzle, and positive-pressure chamber",
              "Often becomes the main source of high backpressure",
            ],
            [
              "Static and transient pressure",
              "Elevation difference, valve switching, blockage, and start-stop events",
              "Static pressure belongs in the steady-state budget; transients are reviewed as protection boundaries",
            ],
          ],
        },
      ],
    },
    {
      title: "3. Which Fluid Paths Are More Likely to Fall in a Lower Pressure Range?",
      blocks: [
        {
          type: "paragraph",
          text:
            "The following characteristics generally indicate lower pressure demand, although calculation and testing are still required: short tubing, larger ID, few valves, an open outlet, low-viscosity fluid, no high-restriction filter or fine needle, and no meaningful suction vacuum caused by reservoir level.",
        },
        {
          type: "paragraph",
          text:
            "The published rated pressure of both the FOREACH DPL30 and DPL60 standard liquid diaphragm pumps is 100 kPa, with no-load flow classes of 300 mL/min and 600 mL/min, respectively. Their suitability is not tied to a fixed industry label; it depends on whether the target operating point lies within the controlled curve and allowable operating conditions.",
        },
      ],
    },
    {
      title: "4. Which Designs Are More Likely to Enter the High-Backpressure Range?",
      blocks: [
        {
          type: "list",
          items: [
            "Fine needles, capillaries, micro-nozzles, or narrow flow cells.",
            "Long runs of small-ID rigid tubing or multiple abrupt reductions.",
            "High-precision filters, especially when pressure drop rises near end of life.",
            "Delivering liquid into a chamber that is already under positive pressure.",
            "Rapid rinsing or high-velocity jetting that must be completed in a short time.",
            "Multiple valves, fittings, and sensors in series, whose local losses accumulate.",
          ],
        },
        {
          type: "paragraph",
          text:
            "The published no-load flow of the FOREACH DPL30H high-pressure liquid diaphragm pump is 300 mL/min, and its rated pressure is 600 kPa. The 300 mL/min and 600 kPa values do not represent the same operating point. Read a valid revision of the flow-pressure curve to determine how much flow remains at high backpressure.",
        },
      ],
    },
    {
      title: "5. Three Illustrative Conditions: Why Total Pressure Estimates Are Not Enough",
      blocks: [
        {
          type: "table",
          headers: [
            "Illustrative condition (not a customer case)",
            "Target flow",
            "Worst steady-state pressure demand",
            "Preliminary assessment",
          ],
          rows: [
            [
              "Short tubing, open outlet, and few valves",
              "180 mL/min",
              "Approximately 40 kPa",
              "A lower-pressure platform may have margin; continue by reading the curve",
            ],
            [
              "Fine needle, filter, and positive-pressure chamber",
              "250 mL/min",
              "Approximately 95 kPa",
              "Near the 100 kPa boundary; do not rely on rated pressure alone",
            ],
            [
              "Fine needle, long tubing, and high-pressure endpoint",
              "220 mL/min",
              "Approximately 180 kPa",
              "A standard 100 kPa platform normally should not enter the candidate set directly",
            ],
          ],
        },
        {
          type: "paragraph",
          text:
            "The illustrative 95 kPa value does not mean that a 100 kPa pump is guaranteed to work. If 100 kPa is the candidate pump's rated pressure, the target point is already close to the boundary. Flow at that point, filter loading, fluid temperature, sample-to-sample variation, and design margin must also be reviewed. Startup or valve-switching peaks belong in a separate transient-protection review.",
        },
      ],
    },
    {
      title: "6. A High-Pressure Pump Is Not Automatically Better Than a Lower-Pressure Pump",
      blocks: [
        {
          type: "paragraph",
          text:
            "If the fluid path does not require high backpressure, selecting a 600 kPa platform directly can add constraints on connections, material and temperature boundaries, supply power, control strategy, installation space, and cost. For example, published FOREACH data list a self-priming height of 6 mH₂O and a maximum fluid temperature of +80°C for the DPL30. The DPL30H lists a self-priming height of 3 mH₂O, a maximum fluid temperature of +40°C, and a 6 × 4 mm rigid-tube compression connection.",
        },
        {
          type: "paragraph",
          text:
            "Higher pressure is therefore not a universal upgrade. It is a different set of system boundaries intended for high-resistance fluid paths. A high-pressure platform is an effective choice only when the target operating point, fluid, inlet conditions, and duty cycle all match.",
        },
      ],
    },
    {
      title: "7. Four Conditions for Final Release",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Normal and worst steady-state pressure demand at the target flow has been calculated or measured.",
            "The controlled pump curve shows that the target flow is still met at the worst steady-state condition, with pressure and flow margins defined by the project.",
            "Allowable working pressure has been reviewed for the tubing, fittings, valves, filters, sensors, and chambers; test or proof pressure is not used in place of allowable working pressure.",
            "The complete equipment has passed startup, steady-state, valve-switching, blockage-protection, leakage, and long-term operation validation.",
          ],
        },
        {
          type: "notice",
          label: "System boundary:",
          text:
            "The lowest allowable working pressure among all pressure-bearing components determines the allowable pressure of the complete fluid path. Pump rated pressure does not qualify the tubing, fittings, valves, filter elements, sensors, or chambers for that pressure.",
        },
      ],
    },
    {
      title: "FOREACH Resources and Evidence Boundary",
      blocks: [
        {
          type: "links",
          items: [
            {
              prefix: "For a 600 kPa-class product candidate, review the ",
              label: "DPL30H high-pressure liquid diaphragm pump series",
              href: "/products/pumps/miniature-diaphragm-pumps/dpl30h-liquid-diaphragm-pump",
              suffix: " and confirm the required flow at the calculated operating pressure.",
            },
            {
              label:
                "FOREACH: DPL30H High-Pressure Liquid Diaphragm Pump Selection Guide",
              href: "/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide",
            },
            {
              label: "FOREACH: DPL30 Liquid Diaphragm Pump Selection Guide",
              href: "/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide",
            },
            {
              label: "FOREACH: DPL60 Liquid Diaphragm Pump Selection Guide",
              href: "/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide",
            },
          ],
        },
        {
          type: "notice",
          label: "Evidence boundary:",
          text:
            "FOREACH resources, formulas, and examples are for preliminary engineering screening only. They do not replace a controlled specification, complete curves, evaluation with the actual fluid, or full-system prototype validation.",
        },
      ],
    },
  ],
  faqTitle: "FAQ | How Do You Select Between 100 kPa and 600 kPa Miniature Diaphragm Pumps?",
  faqItems: [
    {
      question:
        "If estimated system backpressure is 80 kPa, is a 100 kPa pump sufficient?",
      answer:
        "The two values alone are not enough. Confirm the target flow corresponding to 80 kPa and whether it represents the worst steady-state condition, then read the flow and margin at that point from the controlled pump curve.",
    },
    {
      question: "Can a 600 kPa pump solve every insufficient-flow problem?",
      answer:
        "No. If the cause is a suction leak, valve fault, inadequate power supply, fluid viscosity, or insufficient inlet refill, a higher-pressure platform may not solve it and can introduce new system constraints.",
    },
    {
      question: "Does a fine needle always require 600 kPa?",
      answer:
        "No. Pressure demand depends on the needle ID, effective length, target flow, fluid viscosity, and endpoint pressure. Use supplier pressure-drop data, calculations, or measurements.",
    },
    {
      question:
        "Why can a 100 kPa pump not maintain its no-load flow at 100 kPa?",
      answer:
        "No-load flow and rated pressure are normally different performance endpoints. Flow generally decreases as pressure differential across the pump increases, so the flow corresponding to the target pressure must be read from the curve.",
    },
    {
      question:
        "Why must the lowest allowable working pressure of the complete fluid path be reviewed?",
      answer:
        "The component with the lowest allowable working pressure determines the system's allowable working pressure. Proof or test pressure serves a different verification purpose and cannot replace allowable working pressure for tubing, fittings, valves, filter elements, or chambers.",
    },
  ],
  cta: {
    title: "Need to Determine Whether Your Fluid Path Fits a 100 kPa or 600 kPa Platform?",
    description:
      "Submit the fluid, target flow, inlet conditions, tubing, valves, filter, needle, endpoint pressure, and duty cycle. An engineer can help review the pressure budget and candidate pump curve.",
    contactLabel: "Submit Operating Conditions",
    productsLabel: "View Diaphragm Pumps",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
