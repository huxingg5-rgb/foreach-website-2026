import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const LAB_WASTE_ASSET_BASE =
  "/images/resources/technical-articles/lab-liquid-waste-aspiration-troubleshooting";
const IVD_WASTE_ASSET_BASE =
  "/images/resources/technical-articles/ivd-waste-aspiration-pump-selection";
const GAS_LIQUID_PUMP_HREF =
  "/en/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump";

export const labLiquidWasteAspirationTroubleshootingEnCopy = {
  metadata: {
    title:
      "What to Do When a Laboratory Waste Aspiration Pump Loses Suction: Troubleshooting Leaks, Filter Blockage, and Liquid Carryover",
    seoTitle:
      "Laboratory Waste Aspiration Pump Losing Suction? Check Leaks, Filters, and Liquid Carryover",
    seoDescription:
      "What should you do when a laboratory waste aspiration pump loses suction, cannot aspirate liquid, or takes longer to build vacuum? Troubleshoot leaks at bottle caps and tubing, blocked hydrophobic filters, activated overflow protection, clogged tips, and liquid carryover, then verify vacuum level, gas flow, and the complete system.",
    coverImage: `${LAB_WASTE_ASSET_BASE}/waste-aspiration-protection-path-en.webp`,
    coverAlt:
      "Diagram of a vacuum aspiration system comprising a laboratory waste aspiration pump, collection bottle, overflow protection, and hydrophobic filter",
  },
  deck: "A laboratory waste aspiration pump is normally installed downstream of the collection bottle, overflow protection, and hydrophobic filter. It creates vacuum by removing gas from the bottle. When suction declines, first distinguish a change in the pump itself from a leak, blocked filter, activated overflow protection, clogged tip, or liquid carryover.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "Laboratory waste aspiration pumps are also called vacuum aspiration pumps or waste aspiration vacuum pumps. They are commonly used to collect culture media, supernatant, and wash liquid in cell culture, microplate washing, and automated workstations. The pump is not an isolated component; it is the vacuum source for the entire aspiration path.",
    },
    {
      type: "notice",
      label: "Bottom line:",
      text: "The pump removes gas and creates vacuum. The collection bottle, overflow protection, and filter keep waste liquid and foam upstream of the pump. If the pump-side baseline is normal but the complete system slows down after reconnection, inspect the surrounding system first rather than immediately selecting a pump with a deeper maximum vacuum.",
    },
  ],
  sections: [
    {
      title: "1. What Does a Laboratory Waste Aspiration Pump Do in the System?",
      blocks: [
        {
          type: "paragraph",
          text: "A typical path is aspiration tip → aspiration tubing → collection bottle → overflow protection → hydrophobic filter → aspiration pump. Liquid, air, and foam enter at the tip. Under normal conditions, waste liquid remains in the collection bottle, while the pump removes gas from above the liquid to create a pressure differential between the tip and the bottle.",
        },
        {
          type: "figure",
          src: `${LAB_WASTE_ASSET_BASE}/waste-aspiration-protection-path-en.webp`,
          alt: "System-position diagram showing a laboratory waste aspiration pump downstream of the collection bottle, overflow protection, and hydrophobic filter",
          width: 1600,
          height: 900,
          caption:
            "Figure 1 | The pump is the vacuum source; the collection bottle, overflow protection, and filter are upstream safeguards. Liquid and foam passing through the pump must not be treated as a normal flow path.",
        },
        {
          type: "table",
          headers: [
            "Stage",
            "Medium entering the tip",
            "Load seen at the pump",
            "Recommended records",
          ],
          rows: [
            [
              "Tip contacts the liquid",
              "Predominantly liquid",
              "Gas is continuously removed from the collection-bottle headspace",
              "Aspiration time, liquid-column height, residual volume",
            ],
            [
              "Liquid level falls",
              "Alternating liquid and air",
              "Leakage and gas load increase",
              "Pressure waveform, foam height, sound",
            ],
            [
              "Liquid is depleted",
              "Predominantly air",
              "The operating point shifts to gas pumping and vacuum maintenance",
              "Steady pressure, dry-aspiration duration, temperature rise",
            ],
            [
              "Abnormal overfill",
              "Liquid or foam crosses the safeguards",
              "Liquid may reach the pump inlet",
              "Liquid level, interlock response time, filter condition",
            ],
          ],
        },
        {
          type: "notice",
          label: "Terminology:",
          text: "In this article, “liquid carryover” means waste liquid or foam crossing the collection-bottle, overflow-protection, or filtration boundary and entering the tubing upstream of the pump or even the pump chamber. It is not a normal aspiration stage, and the pump's gas–liquid handling capability must not be used as the only safeguard.",
        },
      ],
    },
    {
      title: "2. Maximum Vacuum Alone Does Not Define Aspiration Performance",
      blocks: [
        {
          type: "paragraph",
          text: "Maximum vacuum indicates the vacuum limit a pump can approach. Free gas flow indicates the scale of gas delivery at low differential pressure. They are not the same operating point. Once tubing, filters, bottle caps, and fittings are installed, actual aspiration speed is determined jointly by the pump curve and system resistance.",
        },
        {
          type: "formula",
          expression: "S_eq ≈ (V_g / t_build) × ln(p₀ / p₁)",
          note: "V_g is the actual gas-space volume during the test, and t_build is the time for absolute pressure to fall from p₀ to p₁. The result can compare equivalent vacuum-generation performance in the same system, but it is not the pump's nameplate flow. Moisture, leakage, material outgassing, and temperature variation all affect the result.",
        },
        {
          type: "table",
          headers: [
            "Observed behavior",
            "More consistent with an external-system issue",
            "More consistent with a pump or drive issue",
          ],
          rows: [
            [
              "The clean, short-tube baseline is normal, but the complete system is slow",
              "Filter, leak, tubing, tip, or overflow protection",
              "Less likely",
            ],
            [
              "Both the pump-side baseline and complete system decline gradually",
              "Also check power supply and environmental conditions",
              "Inspect valves, diaphragm, drive, or wear",
            ],
            [
              "The system can build vacuum, but liquid aspiration is still slow",
              "Clogged tip, narrow tubing, lift height, or viscosity",
              "This alone does not prove pump failure",
            ],
            [
              "Pressure rises rapidly after the pump stops",
              "Leak at the bottle cap, fitting, tubing, or check boundary",
              "Isolate the system in sections before judging",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "An engineering selection should include available gas flow at the target vacuum, evacuation time for a defined volume, temperature rise during continuous operation, power conditions, and total system resistance. A description that only says “high suction required” cannot establish the pump's operating point in the actual instrument.",
        },
      ],
    },
    {
      title: "3. Leaks, Filter Blockage, and Liquid Carryover Leave Different Evidence",
      blocks: [
        {
          type: "table",
          headers: [
            "Fault",
            "Typical behavior",
            "Safe verification method",
            "Main corrective focus",
          ],
          rows: [
            [
              "Leak at the bottle cap or fitting",
              "Target vacuum is never reached and the sound of drawing air persists",
              "Isolate sections and compare pressure–time curves",
              "Seals, threads, tubing, and assembly stress",
            ],
            [
              "Wet or blocked hydrophobic filter",
              "Suction weakens gradually and pressure drop across the filter rises",
              "Replace with a qualified filter according to the maintenance procedure, then retest",
              "Continue tracing the source of foam, droplets, or contamination",
            ],
            [
              "Blocked tubing or aspiration tip",
              "One branch is slow while the pump can still build vacuum",
              "Restore the tubing geometry, clean the tip, and retest",
              "Kinks, flattening, crystallization, and protein residue",
            ],
            [
              "Overflow protection has activated",
              "Aspiration stops suddenly or flow falls sharply near a full bottle",
              "Check the liquid level and reset state according to the SOP",
              "Never bypass the safeguard to continue aspiration",
            ],
            [
              "Liquid carryover has occurred",
              "The filter is wet, pump sound changes, or exhaust behavior is abnormal",
              "Shut down, isolate, and assess under the contamination-control procedure",
              "Do not assume normal use can resume after air-drying alone",
            ],
          ],
        },
        {
          type: "subheading",
          title: "Use a Pressure-Rise Test to Confirm System Leakage",
        },
        {
          type: "paragraph",
          text: "With the system clean, dry, at a relatively stable temperature, and within the approved maintenance procedure, evacuate it to the specified absolute pressure, isolate the pump, and record the pressure rise in a known gas-space volume. Repeating the test and retaining a new-unit baseline makes gradual seal deterioration easier to detect than judging by sound alone.",
        },
        {
          type: "formula",
          expression: "q_L = V_gas × (Δp / Δt)",
          note: "q_L is the equivalent gas load obtained from the pressure-rise method. V_gas must be the actual gas-space volume, and Δp must use the change in absolute pressure. Evaporation from a wet bottle, foam collapse, and material outgassing can also raise the result, so first use it for relative comparison under the same conditions rather than applying a universal acceptance limit.",
        },
        {
          type: "notice",
          label: "Diagnostic boundary:",
          text: "Do not remove the collection bottle, filter, or overflow protection for prolonged bypass testing while waste liquid is present. Any pump-side baseline comparison must use a controlled, clean test boundary that complies with the instrument's maintenance procedure.",
        },
      ],
    },
    {
      title: "4. Material Compatibility Must Cover Waste, Vapor, and Abnormal Droplets",
      blocks: [
        {
          type: "paragraph",
          text: "Under normal operation, an aspiration pump primarily contacts gas, but it may still encounter waste vapor, aerosols, and droplets from abnormal carryover. Material assessment must extend beyond the collection bottle and tubing to the pump inlet, wetted pump-chamber materials, diaphragm, valves, and exhaust routing.",
        },
        {
          type: "table",
          headers: [
            "Medium information to specify",
            "Why it matters",
            "What must not be used as a substitute",
          ],
          rows: [
            [
              "Composition, concentration, temperature, and pH",
              "These determine swelling, corrosion, and vapor load",
              "Do not specify only “laboratory waste”",
            ],
            [
              "Foam, protein, particles, and crystallization",
              "These can block tips, valves, and filters",
              "Do not test only with a beaker of clean water",
            ],
            [
              "Disinfectants and cleaning procedure",
              "Contact time and mixing sequence can change risk",
              "Do not assess from material names alone",
            ],
            [
              "Biological hazards and volatility",
              "These determine filtration, exhaust, and maintenance protection",
              "Do not equate gas tightness with biosafety",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Infectious, corrosive, flammable, volatile, or organic-solvent-containing waste must be assessed specifically against the laboratory EHS requirements, waste SOP, and actual medium. The ability to pump gas or handle gas–liquid mixtures does not establish biosafety, explosion protection, or compatibility with every chemical medium.",
        },
      ],
    },
    {
      title: "5. Complete-System Verification Must Combine Normal, Loaded, and Abnormal Conditions",
      blocks: [
        {
          type: "table",
          headers: [
            "Test condition",
            "Controlled input",
            "Record at minimum",
            "Purpose",
          ],
          rows: [
            [
              "Clean aspiration-pump baseline",
              "Fixed gas-space volume, tubing, power supply, and temperature",
              "Evacuation time, pressure, current, temperature rise, noise",
              "Establish a comparison baseline for the pump itself",
            ],
            [
              "Actual waste cycle",
              "Actual liquid, foam, dry-aspiration time, and operating cycle",
              "Aspiration time, residual volume, foam height",
              "Verify task completion",
            ],
            [
              "Filter loading",
              "Defined simulated wetting or contamination condition",
              "Filter pressure drop, evacuation time, alarm",
              "Confirm the maintenance threshold and detectability",
            ],
            [
              "Controlled minor leak",
              "Introduce a repeatable leak at a designated safe position",
              "Pressure rise, alarm time, change in aspiration",
              "Distinguish normal air aspiration from an abnormal seal",
            ],
            [
              "High liquid level and foam",
              "Increase liquid level and foam progressively",
              "Interlock response time and whether liquid reaches downstream",
              "Verify the liquid-protection boundary",
            ],
            [
              "Shutdown and restart",
              "Final installation, post-maintenance condition, and longest shutdown interval",
              "Initial evacuation, recovery time, abnormal-event count",
              "Verify recovery after long-term use",
            ],
          ],
        },
        {
          type: "notice",
          label: "Acceptance method:",
          text: "Do not search for one fixed vacuum, leak-rate, or filter-pressure-drop limit for every laboratory. First define unacceptable outcomes through risk analysis, then convert aspiration time, residual volume, downstream liquid detection, alarm time, and maintenance interval into project-specific limits.",
        },
      ],
    },
    {
      title: "6. Follow These Six Steps When a Laboratory Waste Aspiration Pump Loses Suction",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Stop the system and determine whether an overfill, foam crossover, or liquid carryover has occurred. For hazardous waste, isolate the system according to the SOP first.",
            "Check the liquid level in the collection bottle and whether the overflow protection has activated. Do not force a bypass.",
            "Check whether the hydrophobic filter is wet, contaminated, blocked, or installed in the wrong direction.",
            "Inspect tubing, tips, and upstream branches for kinks, flattening, disconnection, or residue blockage.",
            "Check the bottle cap, seals, and fittings for leakage, then confirm each section against the pressure–time baseline.",
            "Only after external faults have been eliminated should you use the clean baseline to inspect the aspiration pump, power supply, drive, and control logic.",
          ],
        },
        {
          type: "figure",
          src: `${LAB_WASTE_ASSET_BASE}/waste-aspiration-troubleshooting-sequence-en.webp`,
          alt: "Troubleshooting sequence for a laboratory waste aspiration pump that progresses from overfill, filter, tubing, seals, and tip to the pump itself",
          width: 1600,
          height: 900,
          caption:
            "Figure 2 | Inspect the surrounding system before the pump itself. Before disassembly, stop the system, release the vacuum, and follow the laboratory SOP for the applicable waste risk.",
        },
      ],
    },
    {
      title: "7. Engineering Conclusions, References, and Use Boundaries",
      blocks: [
        {
          type: "paragraph",
          text: "A laboratory waste aspiration pump is the vacuum source, not the collection bottle. When suction declines, comparing a clean pump-side baseline with the complete-system curve generally locates the problem faster than simply increasing maximum vacuum. Collection, overflow protection, filtration, leak detection, and alarms determine whether an abnormal condition can be stopped upstream of the pump.",
        },
        {
          type: "links",
          items: [
            {
              prefix: "Related application: ",
              label: "Laboratory automation",
              href: "/en/applications/lab-automation/",
              suffix: ".",
            },
            {
              prefix: "Reference: ",
              label: "KNF overview of fluid aspiration systems for laboratories",
              href: "https://knf.com/en/global/solutions/lab-applications/fluid-aspiration",
              suffix: ".",
            },
            {
              prefix: "Reference: ",
              label: "INTEGRA protection and maintenance information for vacuum waste aspiration systems",
              href: "https://www.integra-biosciences.com/global/en/aspiration-systems/vacusafe",
              suffix: ".",
            },
            {
              prefix: "Reference: ",
              label: "Pressure-rise method and leak-rate calculations for vacuum systems",
              href: "https://www.leybold.com/content/leybold/en-us/knowledge/vacuum-fundamentals/leak-detection/pressure-rise-and-drop-tests.html",
              suffix: ".",
            },
          ],
        },
        {
          type: "notice",
          label: "Use boundary:",
          text: "This article supports general laboratory waste aspiration system selection and troubleshooting. It does not constitute a conclusion on waste hazard classification, material compatibility, biosafety, explosion protection, or medical suitability. The actual medium, installation, risks, and service life must be validated for the project.",
        },
      ],
    },
  ],
  faqTitle: "FAQ | Common Questions About Laboratory Waste Aspiration Pumps",
  faqItems: [
    {
      question: "Where should I check first when a laboratory waste aspiration pump loses suction?",
      answer:
        "Stop the system and first determine whether it is overfilled or whether foam crossover or liquid carryover has occurred. Then check overflow protection, the hydrophobic filter, tubing and tips, and leaks at the bottle cap and fittings. Only after excluding external causes should you inspect the pump against its clean baseline.",
    },
    {
      question: "Why is liquid aspiration still slow even though the pump can build vacuum?",
      answer:
        "Building vacuum only shows that the gas path reached a certain pressure. A clogged tip, narrow tubing, liquid-column height, deformed tubing, waste viscosity, and filtration resistance can still limit the actual liquid aspiration speed.",
    },
    {
      question: "Can a wet or blocked hydrophobic filter reduce suction?",
      answer:
        "Yes. A wet, contaminated, or incorrectly installed filter increases gas-path resistance and commonly lengthens evacuation time and progressively slows aspiration. After replacement, continue tracing the source of foam or droplets.",
    },
    {
      question: "How can I determine whether the bottle cap, fitting, or tubing is leaking?",
      answer:
        "Under controlled clean, dry, and temperature-stable conditions, isolate the system in sections and compare pressure-rise curves for a known gas-space volume. Moisture evaporation and material outgassing also affect the result, so compare against a baseline under the same conditions.",
    },
    {
      question: "Can the aspiration pump continue operating after waste liquid has carried over into it?",
      answer:
        "Do not assume it can resume operation after air-drying alone. Shut down and isolate the system. In accordance with the medium risk, contamination-control procedure, and manufacturer's maintenance requirements, inspect the filter, tubing, and pump chamber and assess materials, performance, and exhaust safety.",
    },
    {
      question: "Is maximum vacuum the only selection criterion for a laboratory waste aspiration pump?",
      answer:
        "No. Also evaluate effective gas flow at the target vacuum, collection-bottle gas-space volume, evacuation time, leakage, filtration resistance, continuous temperature rise, the actual duty cycle, and abnormal-condition safeguards.",
    },
  ],
  cta: {
    title: "Selecting or Troubleshooting a Laboratory Waste Aspiration Pump?",
    description:
      "Provide the waste type, target aspiration time, collection-bottle volume, target vacuum, tubing diameter and length, filter, overflow-protection method, and abnormal conditions. These inputs support further review of the pump operating point, material boundaries, and complete-system validation plan.",
    contactLabel: "Contact an Engineer",
    productsLabel: "View Gas–Liquid Diaphragm Pumps",
    productsHref: GAS_LIQUID_PUMP_HREF,
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const ivdWasteAspirationPumpSelectionEnCopy = {
  metadata: {
    title:
      "IVD Waste Aspiration: Liquid Pump or Vacuum Pump? Direct vs Indirect Aspiration",
    seoTitle:
      "IVD Waste Aspiration: Liquid Pump or Vacuum Pump? Direct vs Indirect Methods",
    seoDescription:
      "Understand direct liquid pumping, indirect vacuum aspiration, and gas–liquid conditions in IVD probe washing and reaction-cup waste removal. Compare medium paths, flow, vacuum, overflow protection, material compatibility, and complete-system validation.",
    coverImage: `${IVD_WASTE_ASSET_BASE}/ivd-direct-vs-vacuum-aspiration-en.webp`,
    coverAlt:
      "Medium-path comparison of direct liquid pumping and indirect vacuum aspiration for IVD waste removal",
  },
  deck: "Probe washing, reaction-cup cleaning, and routine waste removal in IVD instruments are all described as “waste aspiration.” Yet whether waste passes directly through a liquid pump or first enters a collection bottle while a vacuum pump creates negative pressure leads to entirely different selection logic.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "Before selecting a pump, answer four questions: Does waste pass through the pump? Will air continue to enter after the liquid is removed? Does the system require continuous liquid transfer or short-cycle evacuation? Does the waste contain foam, particles, crystallized residue, or corrosive cleaning agents?",
    },
    {
      type: "notice",
      label: "Core distinction:",
      text: "In direct liquid pumping, the pump transfers liquid and directly contacts all waste. In indirect vacuum aspiration, the pump primarily removes gas from above the liquid in the collection bottle, while the waste normally remains in the bottle. Gas–liquid handling is a medium capability, not a third architecture that eliminates the need for safeguards.",
    },
  ],
  sections: [
    {
      title: "1. Map the Waste Path Before Selecting the Pump",
      blocks: [
        {
          type: "figure",
          src: `${IVD_WASTE_ASSET_BASE}/ivd-direct-vs-vacuum-aspiration-en.webp`,
          alt: "Comparison of pump position, collection bottle, and overflow-protection path in direct liquid pumping and indirect vacuum aspiration for IVD waste",
          width: 1600,
          height: 900,
          caption:
            "Figure 1 | Direct pumping sends waste through the pump. Indirect aspiration keeps waste in the collection bottle while the pump creates vacuum on the gas side. Safeguards belong to the system; they are not built-in pump capabilities.",
        },
        {
          type: "table",
          headers: [
            "Concept",
            "Medium primarily contacting the pump",
            "Does waste pass through the pump head?",
            "Core task",
          ],
          rows: [
            [
              "Direct liquid pumping",
              "Waste liquid, possibly with entrained bubbles",
              "Yes",
              "Transfer waste directly into the waste container",
            ],
            [
              "Indirect vacuum aspiration",
              "Air, moisture, and aerosols",
              "Normally no",
              "Create and maintain vacuum in the collection bottle",
            ],
            [
              "Gas–liquid handling capability",
              "Alternating liquid, bubbles, and air",
              "Depends on the architecture",
              "Handle dry aspiration, liquid slugs, or moisture—not precision metering",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Gas–liquid handling may be used in a direct pumping path or as tolerance for an abnormal event on the vacuum side. It does not eliminate the question of which medium the pump primarily handles, nor does it eliminate liquid-level detection, overflow protection, and filtration.",
        },
      ],
    },
    {
      title: "2. IVD Waste Is Rarely a Stable, Single-Phase Liquid",
      blocks: [
        {
          type: "paragraph",
          text: "Waste removal from probes and reaction cups is usually intermittent. Liquid enters when a valve opens, bubbles appear as the level falls, and aspiration may continue after the liquid is gone to reduce residual volume. Surfactants can produce foam, while protein or reagent residue can deposit, crystallize, or block small passages.",
        },
        {
          type: "table",
          headers: [
            "Cycle stage",
            "Medium state",
            "Parameter commonly misinterpreted",
            "What to verify",
          ],
          rows: [
            [
              "Liquid entry",
              "Continuous or intermittent waste liquid",
              "Treating free gas flow as liquid flow",
              "Actual transferred volume, backpressure, viscosity, and residual liquid",
            ],
            [
              "Liquid level falls",
              "Alternating liquid slugs and bubbles",
              "Looking only at average flow",
              "Pressure fluctuation, repriming, and valve timing",
            ],
            [
              "Dry aspiration",
              "Predominantly air",
              "Assuming dry running has no effect",
              "Permitted dry-aspiration duration, temperature rise, noise, and service life",
            ],
            [
              "Idle after cleaning",
              "Residue, deposits, or crystallization",
              "Testing only a new pump with clean water",
              "Restart, cleaning recovery, and long-term sealing",
            ],
          ],
        },
        {
          type: "notice",
          label: "Parameter boundary:",
          text: "Free gas flow, continuous liquid flow, and actual waste aspiration speed are three different metrics. Maximum vacuum also does not mean the pump retains its free-flow rate at that pressure. Final evacuation time must be measured in the actual fluid circuit.",
        },
      ],
    },
    {
      title: "3. Direct Liquid Pumping: A Shorter Path, but the Pump Bears Every Waste Risk",
      blocks: [
        {
          type: "paragraph",
          text: "Direct pumping places the pump in the waste path. It suits systems with fewer branches, continuous liquid-transfer requirements, or a need to control liquid delivery directly. The tradeoff is that cleaning agents, sample residue, foam, crystals, and particles all enter the pump head. The diaphragm, valves, pump chamber, and downstream backpressure therefore all become part of validation.",
        },
        {
          type: "table",
          headers: [
            "Dimension",
            "Advantages of direct pumping",
            "Tradeoffs that must be managed",
          ],
          rows: [
            [
              "Architecture",
              "Short path and relatively few components",
              "The pump directly contacts all waste",
            ],
            [
              "Liquid removal",
              "Can transfer continuously to a waste container",
              "Outlet backpressure and backflow must be controlled",
            ],
            [
              "Multiple branches",
              "Individual branches are easy to debug separately",
              "More pumps or valve controls may be required",
            ],
            [
              "Maintenance",
              "No periodic emptying of a vacuum collection bottle",
              "Pump residue, cleaning, and valve deposits become more important",
            ],
            [
              "Dry aspiration",
              "Can reduce end-of-cycle residual liquid",
              "Confirm the pump tolerates gas–liquid alternation and can reprime",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Direct pumping must be verified for more than whether it can initially draw liquid. Also verify the transition from wet operation to dry aspiration, repriming after drawing air, whether long-term deposits prevent the valves from sealing, and the final residual volume under the worst waste condition.",
        },
      ],
    },
    {
      title: "4. Indirect Vacuum Aspiration: The Pump Is Separated from Bulk Waste, but Safeguards Remain Essential",
      blocks: [
        {
          type: "paragraph",
          text: "Indirect aspiration uses a vacuum pump to reduce gas pressure above the liquid in a collection bottle, drawing waste into the bottle through the pressure differential. One vacuum source can serve multiple branches through a valve manifold, and the pump does not need to contact most of the waste directly. However, the container, liquid-level detection, filtration, overflow protection, venting, and valve timing must work together.",
        },
        {
          type: "table",
          headers: [
            "Protection element",
            "Primary purpose",
            "Typical risk if omitted",
          ],
          rows: [
            [
              "Vacuum-rated collection bottle",
              "Contain waste and withstand the pressure differential",
              "Bottle deformation, leakage, or liquid entering the vacuum line",
            ],
            [
              "Liquid-level detection",
              "Trigger an alarm or shutdown when full",
              "Waste and foam continue moving downstream",
            ],
            [
              "Overflow protection",
              "Stop abnormal liquid from reaching the pump side",
              "Contamination of the pump, filter, and exhaust",
            ],
            [
              "Hydrophobic filtration",
              "Limit downstream movement of droplets and aerosols",
              "Rising resistance or loss of downstream protection",
            ],
            [
              "Venting and pressure release",
              "Release vacuum before maintenance",
              "Splashing when opened or difficulty opening the bottle",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "“The pump does not contact waste” is only the design objective under normal operation. Foam, overfill, liquid-level detection failure, and condensation can still allow droplets to reach the vacuum side. Connecting an ordinary gas pump to an empty bottle therefore does not constitute a complete waste aspiration system.",
        },
      ],
    },
    {
      title: "5. When Should Gas–Liquid Handling Be Included in the Selection Criteria?",
      blocks: [
        {
          type: "table",
          headers: [
            "Condition that can be evaluated",
            "Capability that cannot be inferred directly",
          ],
          rows: [
            [
              "Repeated switching between liquid slugs and air near the end of direct pumping",
              "Does not mean the pump can meter samples or reagents precisely",
            ],
            [
              "Bubbles or foam in probe-wash waste",
              "Does not allow arbitrary foam, particle, or liquid-slug volume",
            ],
            [
              "Periodic line evacuation and short dry-aspiration intervals",
              "Does not mean performance matches continuous pure-liquid transfer",
            ],
            [
              "Possible exposure to moisture or a small amount of condensate at the vacuum end",
              "Does not eliminate the need for collection, overflow protection, and filtration",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "If liquid is designed to pass through the pump, specify the gas–liquid ratio, liquid-slug duration, dry-aspiration time, particles, and foam. If the pump is downstream of the collection bottle, specify the gas-space volume, leakage, filter resistance, and abnormal liquid-exposure boundary. Both architectures require material validation with the actual medium.",
        },
        {
          type: "notice",
          label: "Functional separation:",
          text: "Waste removal and reagent metering have different control objectives. A waste pump or vacuum pump should not also perform precision metering of samples or reagents. The ability to handle a gas–liquid mixture does not establish low-pulsation or high-repeatability dispensing performance.",
        },
      ],
    },
    {
      title: "6. Direct or Indirect Aspiration: Select by Task, Not by One Parameter",
      blocks: [
        {
          type: "figure",
          src: `${IVD_WASTE_ASSET_BASE}/ivd-waste-pump-decision-tree-en.webp`,
          alt: "Decision diagram for IVD waste aspiration based on whether the medium passes through the pump, whether transfer is continuous and metered, and whether gas and liquid alternate",
          width: 1600,
          height: 900,
          caption:
            "Figure 2 | First ask whether waste passes through the pump. Only then determine whether the task is continuous liquid transfer, vacuum generation, or gas–liquid alternation. Free gas flow, waste flow, and maximum vacuum are not interchangeable.",
        },
        {
          type: "table",
          headers: [
            "Selection dimension",
            "Direct liquid pumping",
            "Indirect vacuum aspiration",
          ],
          rows: [
            ["Does waste pass through the pump?", "Yes", "Normally no"],
            [
              "Continuous liquid removal",
              "Relatively straightforward",
              "Collection-bottle emptying must be considered",
            ],
            [
              "Expansion to multiple branches",
              "Add pumps or valve controls",
              "One vacuum source can serve multiple branches by valve timing",
            ],
            [
              "Primary material risk",
              "The pump directly contacts all waste",
              "Moisture, aerosols, and abnormal liquid carryover",
            ],
            [
              "Primary maintenance point",
              "Residue, valves, and diaphragm inside the pump",
              "Collection bottle, filter, liquid level, and seals",
            ],
            [
              "Key acceptance tests",
              "Actual transferred volume, dry aspiration, and repriming",
              "Evacuation time, branch interaction, and overflow protection",
            ],
          ],
        },
        {
          type: "formula",
          expression: "Q_cycle = V_waste / t_cycle",
          note: "Q_cycle describes only the average waste demand per cycle. For direct pumping, also cover instantaneous flow, outlet backpressure, and dry aspiration. For indirect aspiration, also cover collection-bottle gas-space volume, evacuation time, leakage, and pressure recovery after a valve opens.",
        },
      ],
    },
    {
      title: "7. Six Common Selection Mistakes and How to Prevent Them",
      blocks: [
        {
          type: "table",
          headers: ["Common mistake", "Why it fails", "Prevention"],
          rows: [
            [
              "Treating free gas flow as waste-liquid flow",
              "The test medium and resistance are different",
              "Measure evacuation time and residual volume in the actual liquid circuit",
            ],
            [
              "Comparing only maximum vacuum",
              "Actual speed depends on tubing, valves, filters, and leakage",
              "Record the pressure–time curve of the complete system",
            ],
            [
              "Sizing only from the incoming wash-liquid volume",
              "A large amount of air enters after the liquid has been removed",
              "Record liquid volume, dry-aspiration duration, and cycle timing together",
            ],
            [
              "Omitting overflow protection in indirect aspiration",
              "Foam and overfill can reach the vacuum side",
              "Provide liquid-level detection, shutdown, filtration, and secondary protection",
            ],
            [
              "Relying only on material names",
              "Concentration, temperature, and contact time change the outcome",
              "Perform immersion, cycling, cleaning, and life validation",
            ],
            [
              "Using a waste pump for precision metering",
              "Waste removal and metering have different objectives",
              "Design reagent metering and waste aspiration as separate functions",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Meaningful complete-system data is not simply “can aspirate” or “cannot aspirate.” It includes evacuation time per cycle, final residual volume, repriming after dry aspiration, interaction between branches, filter pressure drop, collection-bottle evacuation time, material changes, and full-bottle protection response.",
        },
      ],
    },
    {
      title: "8. Installed-System Validation Checklist, References, and Use Boundaries",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Specify cleaning agents, sample residue, foam, particles, crystallization, and any potentially hazardous volatile substances.",
            "Confirm whether the pump contacts bulk waste or only moisture above the collection bottle.",
            "Test with the actual tubing diameter, tubing length, valves, filters, and worst-case liquid level.",
            "Measure evacuation time per cycle, residual volume, dry-aspiration duration, and repriming capability.",
            "Verify pressure recovery and interaction when multiple branches operate simultaneously or sequentially.",
            "Verify liquid-level alarms, full-bottle shutdown, overflow protection, venting, and maintenance procedures.",
            "Complete material-compatibility, cleaning, deposition, continuous-duty-cycle, and service-life validation.",
          ],
        },
        {
          type: "links",
          items: [
            {
              prefix: "Related application: ",
              label: "IVD instrument fluidics",
              href: "/en/applications/ivd/",
              suffix: ".",
            },
            {
              prefix: "Reference: ",
              label: "KNF comparison of direct liquid transfer and indirect vacuum-over-liquid transfer",
              href: "https://knf.com/en/it/stories-events/news-stories/article/direct-liquid-transfer-vs-vacuum-over-liquid-transfer",
              suffix: ".",
            },
            {
              prefix: "Reference: ",
              label: "KNF explanation of probe-wash waste aspiration under gas–liquid conditions",
              href: "https://knf.com/fileadmin/Local_files/USA/Downloads/OEM_Process_downloads/application_note/Application_Note_needle-washing_KNF_USA.pdf",
              suffix: ".",
            },
            {
              prefix: "Reference: ",
              label: "Iwaki information on gas–liquid transfer and waste collection pumps",
              href: "https://www.iwaki.hk/catalog/products_details.php?cPath=6&id=40&language=en",
              suffix: ".",
            },
          ],
        },
        {
          type: "notice",
          label: "Use boundary:",
          text: "This article discusses a general waste-side fluidic path for IVD instruments and does not apply to precision sample or reagent metering. Before any pump is integrated into an instrument, complete-system risks, materials, service life, medical electrical requirements, and quality-system requirements must be validated. Flammable, toxic, or corrosive media require a dedicated solution.",
        },
      ],
    },
  ],
  faqTitle: "FAQ | Common IVD Waste Aspiration Selection Questions",
  faqItems: [
    {
      question: "Does deeper vacuum always make IVD waste aspiration faster?",
      answer:
        "Not necessarily. Actual speed also depends on tubing diameter and length, valves, filter pressure drop, leakage, collection-bottle volume, and liquid properties. Excessive vacuum may also increase splashing and foam.",
    },
    {
      question: "Can free gas flow be converted directly into waste-liquid flow?",
      answer:
        "No. The medium, pressure, and system resistance are different. Waste-liquid flow must be measured with the actual tubing, valves, liquid level, and backpressure.",
    },
    {
      question: "Can an ordinary liquid pump directly aspirate probe-wash waste?",
      answer:
        "Confirm that the pump tolerates the expected dry aspiration and gas–liquid alternation, can reprime, and has compatible materials. Also validate foam, residue, and long-term deposition.",
    },
    {
      question: "Can indirect vacuum aspiration guarantee that liquid never reaches the vacuum pump?",
      answer:
        "No absolute guarantee is possible. Overfill, foam, condensation, or a safeguard failure can still allow liquid to reach the vacuum side, so liquid-level detection, overflow protection, and filtration are required.",
    },
    {
      question: "Can one vacuum pump serve multiple waste branches at the same time?",
      answer:
        "It can be evaluated, but test the number of simultaneously open branches, valve timing, collection-bottle volume, pressure recovery, and interaction between branches. A leak in one branch may slow the others.",
    },
    {
      question: "How should materials be selected when waste contains hypochlorite, surfactants, or protein residue?",
      answer:
        "Do not rely on material names alone. Use the actual concentration, temperature, contact time, cleaning cycle, and deposits in immersion, cycling, and life tests, and include the pump, tubing, valves, and seals.",
    },
  ],
  cta: {
    title: "Comparing Direct and Indirect Vacuum Aspiration for IVD Waste?",
    description:
      "Provide the waste volume per cycle, dry-aspiration time, number of branches, collection-bottle volume, tubing and valves, actual medium, foam, and full-bottle protection. These inputs support further review of the architecture, operating point, and validation matrix.",
    contactLabel: "Contact an Engineer",
    productsLabel: "View Gas–Liquid Diaphragm Pumps",
    productsHref: GAS_LIQUID_PUMP_HREF,
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
