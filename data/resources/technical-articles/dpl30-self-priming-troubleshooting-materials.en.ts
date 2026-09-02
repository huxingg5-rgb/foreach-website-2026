import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const DPL30_SELF_PRIMING_COVER =
  "/images/resources/technical-articles/dpl30-troubleshooting/300-ml-min-liquid-diaphragm-pump-self-priming-test.webp";
const DPL30_MOTOR_NO_FLOW_COVER =
  "/images/resources/technical-articles/dpl30-troubleshooting/300-ml-min-liquid-diaphragm-pump-motor-power-check.webp";
const DPL30_WATER_REAGENT_COVER =
  "/images/resources/technical-articles/dpl30-troubleshooting/300-ml-min-liquid-diaphragm-pump-water-versus-reagent-flow-test.webp";
const DPL30_WETTED_MATERIALS_COVER =
  "/images/resources/technical-articles/dpl30-troubleshooting/300-ml-min-liquid-diaphragm-pump-wetted-material-inspection.webp";
const DPL30_PRODUCT_HREF =
  "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump";

export const dpl30SelfPrimingDecreaseEnCopy = {
  metadata: {
    title:
      "Why Does a 300 mL/min Micro Liquid Diaphragm Pump Lose Self-Priming Performance Over Time?",
    seoTitle:
      "300 mL/min Micro Liquid Diaphragm Pump Self-Priming Loss | FOREACH",
    seoDescription:
      "Find out why a 300 mL/min micro liquid diaphragm pump loses self-priming, from check-valve or inlet air leaks to suction loss, vapor pressure and material changes.",
    coverImage: DPL30_SELF_PRIMING_COVER,
    coverAlt: "FOREACH DPL30 300 mL/min micro liquid diaphragm pump",
  },
  deck: "A loss of self-priming means that the pump and suction path can no longer create and retain the same low inlet absolute pressure as they did initially. Check-valve leakage, inlet air leaks, higher suction losses, fluid vapor pressure and material changes can produce the same symptom, so motor rotation alone cannot identify the cause.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "Self-priming is not a fixed height independent of conditions. For a micro liquid diaphragm pump, it depends on the lowest inlet absolute pressure the pump can create and on surface pressure, lift height, suction-line losses, fluid temperature and vapor pressure.",
    },
    {
      type: "notice",
      label: "Scope first:",
      text: "This article addresses liquid transfer. The DPL30 value of 300 mL/min is a free-flow rating, while its 6 mH₂O self-priming lift is a pump-performance value under specified test conditions. Neither is an unconditional installed-system guarantee for every fluid path or liquid.",
    },
  ],
  sections: [
    {
      title: "1. Translate Self-Priming Height into a Pressure Balance",
      blocks: [
        {
          type: "paragraph",
          text: "During the suction stroke, diaphragm motion enlarges the chamber and lowers inlet absolute pressure. Liquid enters only when pressure above the source liquid can overcome hydrostatic head and all suction-side losses.",
        },
        {
          type: "formula",
          expression: "ΔP_h = ρgh",
          note: "For water near 20 °C, a 6 m liquid column represents approximately 58.7 kPa of static pressure difference. Tubing, fittings, valves, filters and local contractions add further losses.",
        },
        {
          type: "formula",
          expression:
            "H_available ≈ (P_surface,abs − P_in,min,abs − ΔP_suction loss) / (ρg)",
          note: "This is an engineering model for understanding suction margin, not a DPL30 acceptance equation. A 10 kPa loss in usable vacuum capability is equivalent to about 1.02 m of water column.",
        },
        {
          type: "notice",
          label: "Diagnostic meaning:",
          text: "Any change that raises the minimum inlet pressure or increases suction loss can reduce self-priming lift, lengthen first-prime time or prevent a dry system from restarting.",
        },
      ],
    },
    {
      title: "2. A Check Valve Can Move and Still Fail to Seal",
      blocks: [
        {
          type: "paragraph",
          text: "The inlet and outlet valves must open, close and retain differential pressure during every cycle. Particles, crystallized residue, dried liquid, wear or slight deformation can leave a valve visibly intact while allowing reverse leakage after closure.",
        },
        {
          type: "paragraph",
          text: "Reverse leakage dissipates part of the pressure difference that the diaphragm has just created. Micropump research likewise identifies valve redirection efficiency, static leakage, reactive volume and cavitation as important influences on effective flow and self-priming. That research explains mechanisms; it is not DPL30 performance data.",
        },
        {
          type: "notice",
          label: "What to measure:",
          text: "Check how quickly inlet pressure falls, how quickly it rises after shutdown, and whether cleaning restores suction lift and flow. A visual inspection alone is insufficient.",
        },
      ],
    },
    {
      title: "3. A Suction-Side Air Leak May Never Leak Liquid Outward",
      blocks: [
        {
          type: "paragraph",
          text: "The inlet is normally below atmospheric pressure during priming. An aged hose, loose clamp, scratched fitting face or leaking bottle-cap interface may draw air inward without showing an outward liquid leak, reducing suction lift, pressure or flow.",
        },
        {
          type: "formula",
          expression: "Q_pump = Q_liquid + Q_air leak",
          note: "Air occupying part of each suction stroke reduces the effective volume available to lift liquid. This is a fault-isolation relation, not a complete two-phase-flow model.",
        },
        {
          type: "paragraph",
          text: "This explains why a system may operate after manual wet priming yet struggle after it has fully drained. Dry priming starts with an air-filled path and is more sensitive to valve sealing and inlet airtightness.",
        },
      ],
    },
    {
      title:
        "4. Fluid Temperature, Vapor Pressure and Suction Loss Also Matter",
      blocks: [
        {
          type: "formula",
          expression: "P_in,abs > P_vapour + P_margin",
          note: "Local inlet pressure should stay above vapor pressure with an engineering margin; otherwise outgassing, vapor formation and cavitation can occur.",
        },
        {
          type: "paragraph",
          text: "Long or narrow suction tubing, bends, valves and filters increase inlet losses; higher temperature raises vapor pressure; and higher viscosity raises suction-line pressure loss. The same miniature liquid diaphragm pump may therefore behave differently with 20 °C water, a warm cleaning solution, an alcohol-containing reagent or a surfactant formulation.",
        },
        {
          type: "notice",
          label: "Do not classify every bubble as an air leak:",
          text: "Bubbles may come from external leakage, dissolved-gas release or local vaporization. Record inlet absolute pressure, fluid temperature, the first bubble location and the effect of using a degassed fluid.",
        },
      ],
    },
    {
      title:
        "5. Small Material Changes Can First Appear as Valve-Sealing Changes",
      blocks: [
        {
          type: "paragraph",
          text: "ISO 1817 describes liquid effects on rubber through absorption, extraction of soluble constituents and chemical reaction. Even without visible cracks, changes in volume, mass, hardness or elastic recovery can alter contact between a valve and its seat.",
        },
        {
          type: "formula",
          expression: "ΔV, Δm, ΔH + dynamic sealing performance",
          note: "Immersion data compares material changes, but valves and diaphragms still require complete-pump dynamic validation with the actual fluid, temperature, differential pressure and cycle count.",
        },
        {
          type: "paragraph",
          text: "Formal DPL30 information lists two wetted combinations: an EPDM diaphragm, EPDM valves and PPS head; or a PTFE diaphragm, FFKM valves and PPS head. Material names are screening inputs, not proof of universal reagent compatibility.",
        },
      ],
    },
    {
      title: "6. Use a Baseline Loop to Separate the Pump from the Instrument",
      blocks: [
        {
          type: "paragraph",
          text: "Keep the same pump, power supply and specified test liquid. Replace the inlet with short, large-bore, leak-tight tubing and place the source liquid close to the pump inlet. Do this before opening the pump or replacing the motor.",
        },
        {
          type: "table",
          headers: [
            "Baseline result",
            "Inlet-pressure evidence",
            "Priority checks",
          ],
          rows: [
            [
              "Self-priming recovers",
              "Vacuum builds at the original rate",
              "Instrument suction tubing, bottle vent, filter, valves, fittings and installation height",
            ],
            [
              "Still below the initial state",
              "Minimum pressure is higher or falls more slowly",
              "Pump-head contamination, valve sealing, diaphragm stroke and material changes",
            ],
            [
              "Pressure rises quickly after shutdown",
              "Poor pressure retention",
              "External air leakage or internal back-leakage; isolate sections to distinguish them",
            ],
            [
              "Water works but the process fluid does not",
              "Bubbles or unstable pressure",
              "Vapor pressure, viscosity, outgassing and material compatibility",
            ],
          ],
        },
        {
          type: "list",
          items: [
            "First-prime time and maximum stable suction lift",
            "Minimum inlet absolute pressure and time to reach it",
            "Actual flow, supply voltage, current and fluid temperature",
            "Pressure-rise trend after shutdown",
            "Like-for-like measurements at 0 h, midlife and end-of-life",
          ],
        },
      ],
    },
  ],
  faqTitle:
    "FAQ | Self-Priming Loss in a 300 mL/min Micro Liquid Diaphragm Pump",
  faqItems: [
    {
      question: "Does reduced self-priming always mean motor aging?",
      answer:
        "No. Inlet leakage, contaminated or leaking valves, increased suction resistance, fluid temperature and vapor pressure, or material changes can all appear before a motor problem. Compare the inlet pressure trace and a baseline loop first.",
    },
    {
      question:
        "Why does the pump work after wet priming but fail from a dry start?",
      answer:
        "Dry starting requires the pump to create low pressure through an air-filled path, making it especially sensitive to valve sealing and inlet airtightness. Wet priming reduces that requirement and can temporarily hide a small leak.",
    },
    {
      question: "Can I rule out an inlet leak if no liquid leaks out?",
      answer:
        "No. A sub-atmospheric connection may draw air inward without leaking liquid outward. Use section isolation, pressure retention or a short-tube baseline test.",
    },
    {
      question:
        "Does 6 mH₂O mean the installed DPL30 will always lift liquid by 6 m?",
      answer:
        "No. The rating is tied to defined test conditions. Installed tubing, fittings, valves, filters, fluid properties, power supply and sample variation consume suction margin.",
    },
    {
      question: "What does a fast pressure rise after shutdown indicate?",
      answer:
        "It indicates poor pressure retention, caused by either external inlet leakage or internal back-leakage. Isolate the pump from the external suction path to locate the source.",
    },
  ],
  cta: {
    title: "Troubleshooting Reduced DPL30 Self-Priming Performance?",
    description:
      "Provide initial and current first-prime times, inlet-pressure traces, lift height, tubing dimensions, process fluid, temperature, power supply and operating hours to help separate pump-head, material and installed-fluid-path causes.",
    contactLabel: "Contact an Engineer",
    productsLabel: "View the DPL30 Micro Liquid Diaphragm Pump",
    productsHref: DPL30_PRODUCT_HREF,
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const dpl30MotorRunsNoFlowEnCopy = {
  metadata: {
    title:
      "A 300 mL/min Micro Liquid Diaphragm Pump Motor Runs but No Liquid Flows—What Should You Check First?",
    seoTitle: "Micro Liquid Diaphragm Pump Motor Runs but No Flow | FOREACH",
    seoDescription:
      "Diagnose why a 300 mL/min micro liquid diaphragm pump motor runs without flow by checking inlet leaks, blockages, check valves, backpressure and drive current.",
    coverImage: DPL30_MOTOR_NO_FLOW_COVER,
    coverAlt:
      "FOREACH DPL30 micro liquid diaphragm pump used for fluid-path troubleshooting",
  },
  deck: "Motor rotation confirms drive activity, not effective chamber filling, check-valve rectification or an acceptable discharge load. The fastest diagnosis combines inlet pressure, outlet pressure, flow and motor current instead of relying on sound alone.",
  leadBlocks: [
    {
      type: "formula",
      expression: "Q_net ≈ fV_sη_fillη_valve − Q_leak",
      note: "This diagnostic model separates cycle frequency, effective stroke volume, chamber-filling efficiency, valve efficiency and leakage. It is not a DPL30 product equation.",
    },
    {
      type: "notice",
      label: "Work safely:",
      text: "Disconnect power and release pressure before opening tubing or the pump head. Drain and decontaminate the system according to the actual chemical or biological hazard.",
    },
  ],
  sections: [
    {
      title: "1. A Running Motor Does Not Prove Effective Pumping",
      blocks: [
        {
          type: "paragraph",
          text: "A liquid diaphragm pump needs effective diaphragm stroke, chamber filling, directional inlet and outlet valve action, and enough pressure capability to overcome the system differential. Failure at any point can leave the motor audible while the outlet remains dry.",
        },
        {
          type: "paragraph",
          text: "Convert the symptom into two measurements: does the inlet develop vacuum, and does the outlet develop abnormal pressure? These observations usually narrow the fault faster than immediate disassembly.",
        },
      ],
    },
    {
      title:
        "2. Little or No Inlet Vacuum: Check Leakage, Valves and Effective Stroke",
      blocks: [
        {
          type: "paragraph",
          text: "If inlet pressure barely falls and no liquid enters, check for inlet air leakage, reversed ports, valves that cannot seal, contamination inside the pump head, and diaphragm or transmission motion that does not produce effective displacement.",
        },
        {
          type: "paragraph",
          text: "Non-leak-tight hose connections, particles in the head, a closed system valve or blocked filter, and medium-incompatible head parts are common causes of failure to prime or low performance. Isolate these physical variables one at a time.",
        },
        {
          type: "notice",
          label: "Quick test:",
          text: "Use a short, leak-tight transparent inlet tube, confirm flow direction and source level, and test again. Inspect the pump head only if it still cannot build vacuum.",
        },
      ],
    },
    {
      title:
        "3. Strong Inlet Vacuum but No Liquid: Inspect the Source-to-Pump Path",
      blocks: [
        {
          type: "formula",
          expression: "P_in,abs = P_tank,abs − ρgh − ΔP_tube − ΣΔP_components",
          note: "Inlet pressure depends on tank pressure, lift height, tubing and component losses. A sealed source vessel without make-up air causes P_tank,abs to fall during withdrawal.",
        },
        {
          type: "paragraph",
          text: "A strong vacuum suggests that the pump is creating suction but the supply path is restricted. Check the inlet filter, collapsed or kinked tubing, valve opening, bottle vent, liquid level and lift height.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Vent the source vessel when the process allows it.",
            "Shorten and enlarge the inlet line and reduce unnecessary lift.",
            "Temporarily bypass noncritical filters and valves, then restore them one by one.",
            "Record inlet pressure and first-flow time after every change.",
          ],
        },
      ],
    },
    {
      title:
        "4. Liquid Enters but Does Not Leave: Check Backpressure and Discharge Restrictions",
      blocks: [
        {
          type: "formula",
          expression: "ΔP_pump = P_out − P_in",
          note: "The pump must overcome total inlet-to-outlet differential pressure, not outlet gauge pressure alone.",
        },
        {
          type: "paragraph",
          text: "A blocked outlet, loaded filter, closed valve, fine needle, nozzle or pressurized receiver can raise discharge pressure. Valves, nozzles, tubing and fittings also change backpressure and the actual pump operating point.",
        },
        {
          type: "notice",
          label: "Rating boundary:",
          text: "DPL30's 300 mL/min value is free flow, not guaranteed flow at arbitrary backpressure. A high-resistance fluid path must be evaluated at its target flow and total differential pressure.",
        },
      ],
    },
    {
      title: "5. Use Inlet and Outlet Pressure to Narrow the Fault",
      blocks: [
        {
          type: "table",
          headers: [
            "Symptom",
            "Inlet pressure",
            "Outlet pressure",
            "Priority checks",
          ],
          rows: [
            [
              "Motor runs but cannot prime",
              "Almost no vacuum",
              "Low",
              "Air leak, reversed ports, valve sealing, diaphragm stroke",
            ],
            [
              "Vacuum increases but liquid does not arrive",
              "Clearly lower",
              "Low",
              "Inlet blockage, excessive lift, unvented source",
            ],
            [
              "Liquid enters but outlet flow is low",
              "Near baseline",
              "High",
              "Outlet valve, filter, needle, nozzle or backpressure",
            ],
            [
              "Flow and bubbles fluctuate",
              "Fluctuating",
              "May fluctuate with it",
              "Air leak, outgassing, vaporization or cavitation",
            ],
            [
              "Wet prime works; dry prime fails",
              "Insufficient during dry start",
              "Recovers when wet",
              "Internal or external airtightness and valve closure",
            ],
          ],
        },
      ],
    },
    {
      title: "6. Add Motor Current, but Do Not Use It Alone",
      blocks: [
        {
          type: "formula",
          expression: "Record: P_in(t) + P_out(t) + Q(t) + I(t)",
          note: "Together, these signals help distinguish fluid-path resistance, failed pumping and drive-load changes.",
        },
        {
          type: "paragraph",
          text: "No-load, normal liquid load, high backpressure and mechanical restriction often produce different current traces. Current also depends on power supply, motor version and control strategy, so use it for like-for-like comparison rather than as a stand-alone verdict.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Confirm source liquid, port direction, specified supply voltage and an open outlet.",
            "Build a short-tube water baseline and record all four signals.",
            "Restore inlet components one by one to locate the suction fault.",
            "Restore outlet components one by one to locate the backpressure fault.",
            "Open the pump head only after isolating the external fluid path.",
          ],
        },
      ],
    },
  ],
  faqTitle: "FAQ | Micro Liquid Diaphragm Pump Motor Runs but No Liquid Flows",
  faqItems: [
    {
      question: "Does a normal motor sound prove that the pump is healthy?",
      answer:
        "No. It does not prove effective diaphragm stroke, chamber filling, valve sealing or a permissible system differential pressure.",
    },
    {
      question:
        "Why can strong inlet vacuum suggest that the pump is not the first problem?",
      answer:
        "Strong vacuum shows that the pump is creating suction. An unvented source, blocked inlet, excessive lift or collapsed tubing then becomes a higher-priority check.",
    },
    {
      question: "Should I raise the voltage to force liquid through?",
      answer:
        "No. Confirm that the supply is within specification and locate the restriction or backpressure first. Increasing voltage can overload the motor, transmission or pump head.",
    },
    {
      question: "Why does 300 mL/min disappear when the outlet is restricted?",
      answer:
        "Because 300 mL/min is a free-flow value. Added outlet resistance moves the operating point along the pump curve and reduces actual flow.",
    },
    {
      question: "What is the minimum useful measurement set?",
      answer:
        "Use a reliable supply and current measurement, inlet absolute-pressure or vacuum measurement, outlet pressure measurement, and a flow measurement such as timed volume collection.",
    },
  ],
  cta: {
    title: "DPL30 Motor Running but the Fluid Path Still Has No Flow?",
    description:
      "Provide inlet and outlet pressures, the installed tubing, source height, discharge load, fluid, supply voltage and current, plus the difference between dry and wet priming, to support inlet–pump–outlet fault isolation.",
    contactLabel: "Contact an Engineer",
    productsLabel: "View the DPL30 Micro Liquid Diaphragm Pump",
    productsHref: DPL30_PRODUCT_HREF,
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const dpl30WaterVsReagentEnCopy = {
  metadata: {
    title:
      "Why Does a 300 mL/min Micro Liquid Diaphragm Pump Lose Flow and Self-Priming When Water Is Replaced by a Reagent?",
    seoTitle:
      "Micro Liquid Diaphragm Pump: Water vs. Reagent Performance | FOREACH",
    seoDescription:
      "Learn why a 300 mL/min micro liquid diaphragm pump loses flow or self-priming with reagents due to viscosity, vapor pressure, outgassing or material compatibility.",
    coverImage: DPL30_WATER_REAGENT_COVER,
    coverAlt:
      "FOREACH DPL30 micro liquid diaphragm pump for process-reagent validation",
  },
  deck: "Passing a water test proves performance only at that water temperature, tubing, liquid level, power supply and test duration. A process reagent can change viscosity, density, vapor pressure, surface tension, wetting, outgassing and material condition, moving the operating point of the same pump.",
  leadBlocks: [
    {
      type: "formula",
      expression: "Fluid change: μ, ρ, P_vapour, γ, θ, dissolved gas",
      note: "These variables affect pressure drop, static head, vaporization margin, wetting and bubble behavior. Long-term material contact adds a time-dependent effect.",
    },
    {
      type: "notice",
      label: "DPL30 boundary:",
      text: "The formal DPL30 test medium is purified water; customers must evaluate other liquids under their actual concentration, temperature, contact time and operating conditions. A successful water test is not proof of universal reagent compatibility.",
    },
  ],
  sections: [
    {
      title:
        "1. Start with Viscosity and the Fluid Path, Not Free-Flow Rate Alone",
      blocks: [
        {
          type: "formula",
          expression: "ΔP = 128μLQ / (πD⁴)",
          note: "The Hagen–Poiseuille relation assumes circular, rigid, fully developed, Newtonian laminar flow. It estimates trends and order of magnitude, not an entire installed fluid path.",
        },
        {
          type: "paragraph",
          text: "Within those assumptions, pressure drop is proportional to viscosity and inversely proportional to the fourth power of diameter. A modest viscosity increase or small reduction in actual tubing ID can therefore consume meaningful pump differential pressure.",
        },
        {
          type: "table",
          headers: [
            "Illustrative condition",
            "1.0 mPa·s",
            "3.0 mPa·s",
            "Interpretation",
          ],
          rows: [
            [
              "300 mL/min through 1 m of ideal 3.2 mm-ID tube",
              "About 1.94 kPa",
              "About 5.83 kPa",
              "The ideal straight-tube demand rises by about 3.89 kPa; real fittings, valves, filters and bends add more",
            ],
          ],
        },
        {
          type: "formula",
          expression: "Re = ρvD / μ",
          note: "The water example gives Re near 2000, close to the conventional laminar-transition boundary. Treat the calculation as an illustration and verify the actual reagent and complete path.",
        },
      ],
    },
    {
      title: "2. Higher Vapor Pressure Reduces Available Suction Margin",
      blocks: [
        {
          type: "formula",
          expression: "P_in,abs > P_vapour + P_margin",
          note: "As local inlet pressure approaches saturation vapor pressure, vapor formation, bubbles and cavitation become more likely.",
        },
        {
          type: "paragraph",
          text: "Using NIST Antoine-equation data, saturation vapor pressure near 20 °C is approximately 2.34 kPa for water and 5.85 kPa for ethanol. A real reagent is not pure ethanol, but the comparison shows why similar viscosity does not guarantee similar suction behavior.",
        },
        {
          type: "paragraph",
          text: "Higher temperature raises vapor pressure further. Long narrow suction tubing, high lift, a loaded filter or high viscosity can simultaneously lower local inlet pressure.",
        },
      ],
    },
    {
      title: "3. Bubbles in Clear Tubing Are Not Automatically an Air Leak",
      blocks: [
        {
          type: "table",
          headers: [
            "Bubble source",
            "Typical trigger",
            "How to distinguish it",
          ],
          rows: [
            [
              "External air ingress",
              "Leaking negative-pressure fitting, hose or bottle-cap seal",
              "Section isolation, pressure retention and a short-tube baseline",
            ],
            [
              "Dissolved-gas release",
              "Lower inlet pressure, non-degassed reagent or surfactant",
              "Compare with degassed fluid and observe first bubble location",
            ],
            [
              "Local vaporization or cavitation",
              "High vapor pressure, temperature and suction loss",
              "Reduce temperature, lift and inlet restriction; compare noise and flow recovery",
            ],
          ],
        },
        {
          type: "notice",
          label: "Required evidence:",
          text: "Record inlet absolute pressure, fluid temperature, first bubble location, flow fluctuation and the effect of a degassed-fluid comparison before blaming a ruptured diaphragm.",
        },
      ],
    },
    {
      title:
        "4. Separate Immediate Fluid-Property Effects from Long-Term Material Effects",
      blocks: [
        {
          type: "paragraph",
          text: "An immediate change after switching fluids points first to viscosity, vapor pressure, wetting, outgassing or system resistance. A gradual decline over days or weeks also requires checks for absorption, extraction, swelling, hardness change, deposits and crystallization.",
        },
        {
          type: "paragraph",
          text: "ISO 1817 and ASTM D471 compare rubber mass, volume, hardness and mechanical properties before and after liquid exposure. Both controlled-test frameworks also caution that immersion data does not directly predict the dynamic service life of a finished part.",
        },
        {
          type: "notice",
          label: "Complete wetted chain:",
          text: "Do not validate only a PTFE diaphragm. Include the FFKM valves, PPS head, tubing, fittings and external seals in the actual material combination.",
        },
      ],
    },
    {
      title:
        "5. Upgrade Water Testing to a Comparable Process-Fluid Validation",
      blocks: [
        {
          type: "formula",
          expression: "R_Q = Q_reagent / Q_water ; R_H = H_reagent / H_water",
          note: "RQ and RH compare reagent flow and suction capability with the water baseline. Long-term programs can track RQ(t) and RH(t).",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Keep the same pump, voltage, inlet height, tubing length and tubing ID.",
            "Record temperature, viscosity, density and known composition limits for water and reagent.",
            "Measure inlet pressure, outlet pressure, flow, first-prime time and bubbles.",
            "Compare immediately after the fluid change to isolate operating-point effects.",
            "Run cycling and stopped-contact tests for the target life and track retained performance.",
            "Confirm worst-case concentration, temperature, liquid level, filter loading and tubing tolerance in the installed system.",
          ],
        },
      ],
    },
    {
      title:
        "6. Ask for the Actual Operating Point, Not Just Whether the Pump Can Move the Reagent",
      blocks: [
        {
          type: "paragraph",
          text: "The engineering question is: at the reagent's temperature, viscosity, vapor pressure, material compatibility and real fluid-path resistance, what flow, self-priming and service-life performance can this 300 mL/min-class micro liquid diaphragm pump deliver?",
        },
        {
          type: "paragraph",
          text: "That question combines free flow, pump curves, fluid properties, materials and release criteria in one validation matrix instead of treating a single water test as universal evidence.",
        },
      ],
    },
  ],
  faqTitle:
    "FAQ | Switching a Micro Liquid Diaphragm Pump from Water to Reagent",
  faqItems: [
    {
      question:
        "Why can flow change greatly when reagent viscosity is only slightly higher than water?",
      answer:
        "Tubing diameter, local fitting and filter losses, vapor pressure, outgassing, wetting and material condition may change at the same time. Measure inlet and outlet pressure to see how far the operating point moved.",
    },
    {
      question: "Are bubbles solved simply by tightening the fittings?",
      answer:
        "Not always. Bubbles can also be dissolved gas or vapor. Compare inlet absolute pressure, temperature, bubble location and a degassed-fluid test.",
    },
    {
      question: "Does passing a water test prove material compatibility?",
      answer:
        "No. The target reagent still requires material screening, immersion, dynamic cycling, stopped-contact and complete-pump performance-retention testing.",
    },
    {
      question:
        "Can the Hagen–Poiseuille equation predict installed flow directly?",
      answer:
        "No. It has specific geometry and flow assumptions. Flexible tubing, bends, fittings, valves, filters, entrance effects and non-Newtonian behavior require measured complete-system validation.",
    },
    {
      question: "How should different reagents be compared?",
      answer:
        "Use the same pump, supply, tubing and liquid level; compare flow, self-priming, minimum inlet pressure, first-prime time, bubbles and long-term retention while recording temperature and fluid batch.",
    },
  ],
  cta: {
    title: "Moving DPL30 Validation from Water to a Process Reagent?",
    description:
      "Provide composition limits, concentration, temperature, viscosity, volatility, target flow, lift height, tubing and filters, plus continuous-run and stopped-contact requirements to build an actual-fluid validation matrix.",
    contactLabel: "Contact an Engineer",
    productsLabel: "View the DPL30 Micro Liquid Diaphragm Pump",
    productsHref: DPL30_PRODUCT_HREF,
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const dpl30EpdmPtfeFfkmSelectionEnCopy = {
  metadata: {
    title:
      "How Should You Select EPDM, PTFE and FFKM for a 300 mL/min Micro Liquid Diaphragm Pump?",
    seoTitle:
      "Micro Liquid Diaphragm Pump EPDM, PTFE and FFKM Selection | FOREACH",
    seoDescription:
      "Compare EPDM, PTFE and FFKM for a 300 mL/min micro liquid diaphragm pump by evaluating chemical compatibility, swelling, dynamic sealing and actual-fluid validation.",
    coverImage: DPL30_WETTED_MATERIALS_COVER,
    coverAlt:
      "FOREACH DPL30 micro liquid diaphragm pump with alternative wetted material combinations",
  },
  deck: "EPDM, PTFE and FFKM are not a simple low-to-high material ranking. EPDM and FFKM are elastomers, while PTFE is a fluoropolymer; the diaphragm, valves and pump head perform different mechanical jobs. Selection therefore applies to a complete wetted and dynamically loaded structure, not one material name.",
  leadBlocks: [
    {
      type: "notice",
      label: "Formal DPL30 combinations:",
      text: "EPDM diaphragm / EPDM valves / PPS head, or PTFE diaphragm / FFKM valves / PPS head. Do not rearrange these materials into unlisted commercial configurations.",
    },
    {
      type: "paragraph",
      text: "Valves must deform, recover and reseal quickly; diaphragms must flex repeatedly while isolating the fluid; and the head must retain geometry and sealing interfaces. Broader chemical resistance does not automatically mean better dynamic performance in every component position.",
    },
  ],
  sections: [
    {
      title: "1. Compare Component Functions Before Ranking Materials",
      blocks: [
        {
          type: "table",
          headers: [
            "Material",
            "Material class",
            "Primary pump concerns",
            "Conclusion that cannot be assumed",
          ],
          rows: [
            [
              "EPDM",
              "Crosslinked elastomer",
              "Initial screening for water-based and polar fluids, elastic recovery, swelling and extraction",
              "The EPDM name alone does not prove compatibility with every water-based formulation",
            ],
            [
              "PTFE",
              "Fluoropolymer",
              "Broad chemical resistance, diaphragm construction, flex fatigue and composite design",
              "It is not automatically the best dynamic valve material or compatible with every medium",
            ],
            [
              "FFKM",
              "Perfluoroelastomer family",
              "Broad chemical resistance plus elastic sealing, with compound-specific behavior",
              "One grade's temperature or chemical limit does not apply to all FFKM compounds",
            ],
          ],
        },
      ],
    },
    {
      title:
        "2. Why Is EPDM Often an Initial Candidate for Water-Based Fluids?",
      blocks: [
        {
          type: "paragraph",
          text: "EPDM is commonly used with hot water, steam, many acids, alkalis, cleaning agents and polar fluids, while it is generally unsuitable for petroleum oils and fuels. Actual results still depend on the material formulation, temperature, concentration and stress.",
        },
        {
          type: "formula",
          expression: "δ² = δ_D² + δ_P² + δ_H²",
          note: "Hansen solubility parameters divide interaction into dispersion, polar and hydrogen-bonding components. Research correlates them with swelling trends in EPDM and FKM, but the actual compound still requires testing.",
        },
        {
          type: "paragraph",
          text: "A crosslinked elastomer may not dissolve like an uncrosslinked thermoplastic, yet liquid can diffuse into its network and cause absorption and swelling. The fluid can also extract plasticizers or other soluble constituents, changing mass, hardness and recovery.",
        },
      ],
    },
    {
      title:
        "3. PTFE Is Chemically Stable, but Its Dynamic Construction Still Matters",
      blocks: [
        {
          type: "paragraph",
          text: "PTFE's highly fluorinated structure, strong carbon–fluorine bonds and fluorine shielding around the carbon backbone support its high chemical and thermal stability. Chemours and Chemical Science sources describe this broad resistance.",
        },
        {
          type: "paragraph",
          text: "PTFE is not a rubber elastomer. In a reciprocating diaphragm, validation must cover the actual construction, support or composite layers, permitted deformation, differential pressure, frequency and target cycle count. Asking only whether a diaphragm is PTFE is insufficient.",
        },
        {
          type: "notice",
          label: "Functional boundary:",
          text: "A PTFE diaphragm changes one part of the wetted boundary. It does not replace confirmation of the FFKM valves, PPS head, tubing or fittings.",
        },
      ],
    },
    {
      title: "4. FFKM Retains Elastic Sealing, but Compound Differences Matter",
      blocks: [
        {
          type: "paragraph",
          text: "FFKM denotes a family of perfluoroelastomers that combines broad chemical resistance with elastic sealing. It is not one formulation and should not be reduced to the imprecise label “perfluoroether” or to one universal temperature rating.",
        },
        {
          type: "paragraph",
          text: "Different FFKM grades use different formulations for hot water and steam, acids, amines, high temperature or mechanical performance. Even within the FFKM family, volume change and property retention can differ under the same chemical exposure.",
        },
        {
          type: "notice",
          label: "Correct specification practice:",
          text: "Tie every chemical, concentration and temperature statement to a specific compound or grade and actual part construction, then verify it in the intended duty.",
        },
      ],
    },
    {
      title:
        "5. Stage One: Immerse Material Specimens Without Inventing a Universal Pass Limit",
      blocks: [
        {
          type: "paragraph",
          text: "ISO 1817 and ASTM D471 compare rubber properties before and after liquid exposure, including mass, volume, dimensions, hardness, tensile strength and elongation. Test conditions should cover actual concentration, temperature and contact time, including differences before and after drying where relevant.",
        },
        {
          type: "formula",
          expression:
            "Δm% = (m₁−m₀)/m₀×100% ; ΔV% = (V₁−V₀)/V₀×100% ; ΔH = H₁−H₀",
          note: "Tensile-strength and elongation retention can also be recorded. A standard comparison method does not create a universal ±5% acceptance limit for every valve or diaphragm.",
        },
        {
          type: "paragraph",
          text: "Functional requirements should define the limits: how much thickness, hardness or recovery change can a valve tolerate and still seal? How much property change can a diaphragm tolerate and still meet stroke, pressure and life requirements?",
        },
      ],
    },
    {
      title:
        "6. Stage Two: Complete-Pump Dynamic Validation Answers Whether It Can Be Used",
      blocks: [
        {
          type: "formula",
          expression: "R_Q(t) = Q_t / Q_0 ; R_H(t) = H_t / H_0",
          note: "Track flow and self-priming retention over time together with minimum inlet pressure, leakage, current, noise and teardown findings.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Screen specimens at the actual concentration, temperature and worst fluid batch.",
            "Cycle the real pump-head material combination continuously and through start-stop duty.",
            "Include long stopped contact, wet–dry transitions, cleaning and repriming.",
            "Compare flow, pressure, self-priming and leakage at 0 h, midlife and end-of-life.",
            "Inspect valve seating, diaphragm deformation, deposits, cracks and dimensional change.",
            "Release the pump, tubing, fittings, external valves and seals as one wetted chain.",
          ],
        },
        {
          type: "notice",
          label: "Typical gap:",
          text: "A material coupon passes immersion while the dynamic valve fails life testing. Static chemical compatibility and cyclic fatigue, valve-seat contact and recovery speed are separate validation dimensions.",
        },
      ],
    },
    {
      title:
        "7. How Do the Formal DPL30 Combinations Enter the Selection Process?",
      blocks: [
        {
          type: "table",
          headers: [
            "Formal combination",
            "Candidate role",
            "Still to be confirmed",
          ],
          rows: [
            [
              "EPDM diaphragm + EPDM valves + PPS head",
              "An initial candidate for water-based and compatible polar-fluid duties",
              "Actual formulation, concentration, temperature, stopped contact, dynamic life and all external wetted materials",
            ],
            [
              "PTFE diaphragm + FFKM valves + PPS head",
              "A candidate for evaluation with more chemically complex fluids",
              "Specific FFKM compound, PPS limit, diaphragm construction, tubing and fitting compatibility",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "The table describes candidate paths, not compatibility promises. A final conclusion must include composition, concentration, temperature, pressure, contact time, cleaning method and target service life.",
        },
      ],
    },
  ],
  faqTitle: "FAQ | EPDM, PTFE and FFKM in a Micro Liquid Diaphragm Pump",
  faqItems: [
    {
      question: "Is PTFE always better than EPDM for a liquid-pump diaphragm?",
      answer:
        "No. PTFE often offers broader chemical resistance, but a dynamic diaphragm must also meet construction, flex-fatigue, pressure and cycle-life requirements. Compare finished diaphragm designs, not names alone.",
    },
    {
      question: "Is FFKM compatible with every chemical?",
      answer:
        "No. FFKM is a material family. Compounds differ in chemical response, temperature range, volume change and mechanical retention, so the specific grade and duty must be validated.",
    },
    {
      question:
        "If EPDM works with water, will it work with every water-based reagent?",
      answer:
        "No. A water-based formulation may contain alcohols, surfactants, salts, acids, bases, oxidizers or other additives, and concentration, temperature and contact time change the result.",
    },
    {
      question: "Does low coupon swelling mean the complete pump passes?",
      answer:
        "No. Valve sealing, diaphragm fatigue, deposits, cleaning recovery, wet–dry transitions and cycle life require dynamic complete-pump validation.",
    },
    {
      question: "Which components belong in material-compatibility validation?",
      answer:
        "Include the pump head, diaphragm, inlet and outlet valves, tubing, fittings, external valves, filters and seals. The weakest wetted component sets the system boundary.",
    },
  ],
  cta: {
    title: "Selecting an EPDM or PTFE/FFKM DPL30 Material Combination?",
    description:
      "Provide fluid composition, concentration, temperature, pressure, contact time, cleaning method and target cycle life to build a staged plan from candidate screening and immersion to dynamic complete-pump validation.",
    contactLabel: "Contact an Engineer",
    productsLabel: "View the DPL30 Micro Liquid Diaphragm Pump",
    productsHref: DPL30_PRODUCT_HREF,
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
