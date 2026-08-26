import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const ARTICLE_01_ASSET_BASE =
  "/images/resources/technical-articles/300-vs-600-ml-min-diaphragm-pump-selection";
const ARTICLE_02_ASSET_BASE =
  "/images/resources/technical-articles/300-ml-min-diaphragm-pump-flow-margin";

export const diaphragmPump300Vs600SelectionEnCopy = {
  metadata: {
    title:
      "How Do You Choose Between a 300 mL/min and 600 mL/min Miniature Diaphragm Pump? Calculate Task Flow First, Then Check the Actual Operating Point",
    seoTitle:
      "300 vs 600 mL/min Miniature Diaphragm Pump: Task Flow and Operating Point Guide | FOREACH",
    seoDescription:
      "When comparing 300 mL/min and 600 mL/min miniature diaphragm pumps, free-flow rate alone is not enough. This guide builds a selection path around task volume, effective pumping time, system differential pressure, pump curves and prototype validation.",
    coverImage: `${ARTICLE_01_ASSET_BASE}/article-cover.webp`,
    coverAlt:
      "Miniature diaphragm pump product and flow-test footage from an official FOREACH Douyin video",
  },
  deck: "The 300 mL/min and 600 mL/min values are flow classes first, not fixed outputs after installation in an instrument. Selection should begin by converting the liquid-handling task into a minimum average flow rate, then determining the differential pressure required by the actual fluid path, and finally confirming the operating point on the pump curve and in prototype testing.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "For washing, fluid replacement, priming, circulation and waste-drain tasks, an instrument does not really need a catalogue number detached from its conditions. It needs to move the target volume within the specified time and under the specified fluid-path conditions. The 300 mL/min and 600 mL/min pump classes become comparable only when flow and pressure are placed at the same operating point.",
    },
    {
      type: "notice",
      label: "Engineering conclusion:",
      text: "Calculate task flow first, then calculate or measure the system differential pressure at the target flow. Next, read the formal flow-pressure curve and validate the result in the complete prototype fluid path. Do not combine free-flow rate and rated pressure into an operating point that does not exist.",
    },
  ],
  sections: [
    {
      title: "1. Put the ‘300’ and ‘600’ Values Back into Their Test Context",
      blocks: [
        {
          type: "paragraph",
          text: "A 300 mL/min or 600 mL/min miniature diaphragm pump specification usually describes the free-flow rate or maximum flow under a defined fluid, power supply and low differential-pressure condition. Once the pump is installed in an instrument, suction tubing, discharge tubing, valves, fittings, filters, flow cells, needles, liquid-level differences and fluid viscosity all change the differential pressure across the pump, shifting the actual flow to another point on the curve.",
        },
        {
          type: "figure",
          src: `${ARTICLE_01_ASSET_BASE}/article-figure-en.webp`,
          alt: "Miniature diaphragm pump selection process from task flow and system resistance to the actual operating point",
          width: 2560,
          height: 1920,
          caption:
            "Selection path for 300 mL/min and 600 mL/min miniature diaphragm pumps. The curves and values in the diagram illustrate the method and do not represent measured curves for a specific model.",
        },
        {
          type: "table",
          headers: [
            "Quantity to compare",
            "Correct meaning",
            "Incorrect interpretation",
          ],
          rows: [
            [
              "Free-flow rate",
              "Flow endpoint or flow class under a defined low-load condition",
              "The instrument can continuously deliver this flow at any backpressure",
            ],
            [
              "Rated pressure",
              "Permissible pressure capability under defined conditions",
              "The pump still maintains its free-flow rate at this pressure",
            ],
            [
              "Actual operating point",
              "Intersection of the pump curve and the current system curve",
              "Can be determined from the pump model or static outlet pressure alone",
            ],
          ],
        },
      ],
    },
    {
      title:
        "2. Step One: Calculate the Minimum Flow from Task Volume and Effective Pumping Time",
      blocks: [
        {
          type: "formula",
          expression: "Qrequired = Vtask ÷ teffective",
          note: "Vtask is the volume transferred, washed or drained in one task, and teffective is the time actually available for pumping in the program. If V is in mL and t is in min, the result is directly in mL/min. If t is in s, first obtain mL/s and then multiply by 60 to convert to mL/min.",
        },
        {
          type: "paragraph",
          text: "The instrument cycle time is often not the same as effective pumping time. Valve switching, liquid-level detection, soaking, venting and control delays consume part of the cycle, so these non-pumping stages must be deducted from the total cycle time. If the program contains a short, rapid-rinse stage, define the average requirement and the peak-stage requirement separately.",
        },
        {
          type: "table",
          headers: [
            "Illustrative task (not a customer case)",
            "Task volume",
            "Effective pumping time",
            "Minimum average flow",
            "Key follow-up check",
          ],
          rows: [
            [
              "Small-volume priming",
              "120 mL",
              "45 s",
              "160 mL/min",
              "Starting, self-priming and venting",
            ],
            [
              "Rapid washing",
              "400 mL",
              "60 s",
              "400 mL/min",
              "Tubing pressure drop at high flow",
            ],
            [
              "Waste-drain cycle",
              "250 mL",
              "50 s",
              "300 mL/min",
              "Liquid-level change and terminal backpressure",
            ],
          ],
        },
        {
          type: "notice",
          label: "Unit check:",
          text: "For example, 120 mL ÷ 45 s = 2.667 mL/s; after conversion to minutes, the result is 160 mL/min. Failing to use consistent time units is the easiest way to create a 60-fold error in the task-flow calculation.",
        },
      ],
    },
    {
      title:
        "3. Step Two: Write the Fluid-Path Resistance as a Directional Pressure Budget",
      blocks: [
        {
          type: "paragraph",
          text: "First define the direction of flow from the source to the terminal end and consistently use either gauge pressure or absolute pressure. The differential pressure that the system requires the pump to provide at target flow Q can be itemized as follows; both distributed losses and local losses are taken as positive in the direction of flow.",
        },
        {
          type: "formula",
          expression:
            "ΔPrequired(Q) = ΔPdistributed(Q) + ΣΔPlocal(Q) + [Pterminal − Psource] + ρg[zterminal − zsource]",
          note: "zterminal − zsource is a signed elevation difference: it is positive when the terminal end is above the source, meaning the pump must overcome hydrostatic pressure; it is negative when the terminal end is below the source, meaning gravity assists the flow. Pterminal − Psource is also calculated with its sign using the same pressure reference.",
        },
        {
          type: "paragraph",
          text: "This relationship helps prevent omissions; it does not imply that every component can be predicted accurately with one simplified formula. For critical components such as filters, valves, needles and flow cells, use the manufacturer's pressure-drop curve at the corresponding flow or measured data whenever possible. The suction side also requires a separate check of inlet absolute pressure, replenishment and cavitation risk.",
        },
        {
          type: "table",
          headers: ["Resistance source", "Why it changes", "Selection impact"],
          rows: [
            [
              "Tubing",
              "Differences in inner diameter, length, bends and soft-tube deformation",
              "The same pump delivers different flow in different tubing layouts",
            ],
            [
              "Valves and fittings",
              "Differences in internal bore, Cv/Kv and local restrictions",
              "May become the bottleneck in the complete fluid path",
            ],
            [
              "Filter",
              "Different pressure drop when new and after loading",
              "Should cover the condition near the replacement point",
            ],
            [
              "Liquid level and vessel pressure",
              "Changes in source level, terminal elevation or vessel pressure",
              "Changes the hydrostatic term and inlet conditions",
            ],
            [
              "Terminal structure",
              "Resistance from a needle, nozzle, positive-pressure chamber or flow cell",
              "May turn a flow problem into a high-backpressure problem",
            ],
          ],
        },
      ],
    },
    {
      title:
        "4. FOREACH Published Parameters Show Why More Flow Does Not Mean More of Every Capability",
      blocks: [
        {
          type: "paragraph",
          text: "Published FOREACH data for the DPL30 and DPL60 illustrate the different parameter dimensions. Their free-flow classes differ, their published rated pressure is the same at 100 kPa, and their self-priming lifts are 6 mH₂O and 3 mH₂O, respectively. Flow, self-priming and pressure must be checked separately.",
        },
        {
          type: "table",
          headers: [
            "Comparison dimension",
            "Representative DPL30 parameter",
            "Representative DPL60 parameter",
            "Selection meaning",
          ],
          rows: [
            [
              "Published free-flow rate",
              "300 mL/min",
              "600 mL/min",
              "Low-differential-pressure endpoint, not a guaranteed installed value",
            ],
            [
              "Published rated pressure",
              "100 kPa",
              "100 kPa",
              "Read the available flow at the target pressure",
            ],
            [
              "Published self-priming lift",
              "6 mH₂O",
              "3 mH₂O",
              "Higher flow does not mean greater self-priming lift",
            ],
            [
              "Common connection",
              "3.2 mm ID soft tubing",
              "3.2 mm ID soft tubing",
              "The same interface does not mean the same system resistance",
            ],
            [
              "Priority evaluation scenario",
              "Lower task flow or greater emphasis on suction lift",
              "Larger-volume transfer, rapid fluid replacement or washing",
              "The actual operating point remains the final basis",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "If the main restriction comes from a fine needle, narrow tubing, filter or positive-pressure chamber, check the total differential pressure at the target flow first. If a conventional flow platform lacks sufficient capability in this region, evaluate a higher-pressure platform such as the DPL30H instead of simply replacing 300 mL/min with 600 mL/min.",
        },
        {
          type: "links",
          items: [
            {
              prefix: "View the",
              label: "DPL30 liquid diaphragm pump",
              href: "/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump",
              suffix: ".",
            },
            {
              prefix: "View the",
              label: "DPL60 liquid diaphragm pump",
              href: "/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump",
              suffix: ".",
            },
            {
              prefix: "Learn",
              label:
                "how to read a miniature diaphragm pump flow-pressure curve",
              href: "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide",
              suffix: ".",
            },
          ],
        },
      ],
    },
    {
      title: "5. Compare Candidate Pumps at the Same Operating Point",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Document the volume per task, effective pumping time, daily cycle count and whether there is a peak-flow stage.",
            "Draw the complete fluid path from the source to the terminal end, recording tube diameter, tube length, valves, fittings, filters, needles, chambers, vessel pressure and the signed elevation difference.",
            "Calculate or measure inlet losses, outlet losses and the differential pressure across the pump at the target flow.",
            "Align the fluid, temperature, power supply, speed and pressure definition used for each candidate pump curve, then read the available flow near the target differential pressure.",
            "Cover the lowest liquid level, filter loading, lowest permissible voltage, fluid limits and sample variation, and confirm that the task is still met under the worst-case condition.",
            "Then check self-priming, materials, life, noise, temperature rise, control range and installation space, and release the design in the complete prototype.",
          ],
        },
      ],
    },
    {
      title:
        "6. Prototype Validation Should Cover Baseline and Worst-Case Conditions",
      blocks: [
        {
          type: "table",
          headers: [
            "Variable",
            "Baseline condition",
            "Worst-case condition",
            "Recommended record",
          ],
          rows: [
            [
              "Reservoir liquid level",
              "Highest or typical liquid level",
              "Lowest permissible liquid level",
              "Inlet pressure, start time and flow",
            ],
            [
              "Filter",
              "New component",
              "Equivalent pressure drop near the replacement point",
              "Filter differential pressure and pump flow",
            ],
            [
              "Power supply",
              "Rated voltage",
              "Lowest permissible voltage at the pump",
              "Voltage, current, speed and starting",
            ],
            [
              "Fluid",
              "Baseline temperature and viscosity",
              "Permissible limit",
              "Flow, bubbles and valve response",
            ],
            [
              "Pump samples",
              "Multiple initial samples",
              "Low-performance samples or samples at a life stage",
              "Mean, spread, trend and leakage",
            ],
          ],
        },
        {
          type: "notice",
          label: "Evidence boundary:",
          text: "The parameters in this article illustrate a published selection framework, while the formulas and examples support preliminary engineering screening. Final results should be based on controlled specifications, formal curves, the actual fluid and complete-prototype testing.",
        },
      ],
    },
    {
      title:
        "Conclusion: Select the Operating Point That Meets the Task, Not the Larger Catalogue Number",
      blocks: [
        {
          type: "paragraph",
          text: "A 300 mL/min-class pump may be more suitable when task flow is lower and suction lift matters more, while a 600 mL/min-class pump may be more suitable for rapid fluid replacement and larger-volume transfer. Any conclusion, however, must also specify pressure, liquid level, fluid, power supply and fluid-path version. Putting task flow, system differential pressure and the pump curve into the same validation table is the way to avoid undersizing and ineffective oversizing.",
        },
      ],
    },
  ],
  faqTitle:
    "FAQ | Selecting a 300 mL/min or 600 mL/min Miniature Diaphragm Pump",
  faqItems: [
    {
      question:
        "If an instrument requires 300 mL/min, should I select a 600 mL/min pump directly to leave margin?",
      answer:
        "No. First define the differential pressure, liquid level, fluid and effective pumping time associated with the 300 mL/min requirement, then read the candidate pump curve. An oversized platform may also reduce low-speed control resolution and increase noise, pulsation, power consumption and space cost.",
    },
    {
      question:
        "Is a 600 mL/min pump adjusted to 300 mL/min equivalent to a 300 mL/min pump?",
      answer:
        "No. The two product classes may differ in pump chamber, valve response, self-priming, pulsation, motor and low-speed stability. Speed adjustment also changes the pump curve, so testing is required at the target speed and actual backpressure.",
    },
    {
      question:
        "Why are the DPL30 and DPL60 not interchangeable even though both have a rated pressure of 100 kPa?",
      answer:
        "Rated pressure is only one dimension. Differences in free-flow rate, self-priming lift, power, structure, operating curve and control range determine their different usable operating regions in an instrument.",
    },
    {
      question:
        "When should a design move from a conventional flow platform to a high-pressure diaphragm pump?",
      answer:
        "When the total system differential pressure at the target flow approaches or exceeds the usable curve of a conventional pump, and the main resistance comes from a fine needle, narrow tubing, filter, positive-pressure chamber or high-resistance terminal component, evaluate a higher-pressure platform and simultaneously verify the permissible working pressure of the entire fluid path.",
    },
  ],
  cta: {
    title: "Need to Compare 300 mL/min and 600 mL/min Diaphragm Pumps?",
    description:
      "Provide the task volume, effective pumping time, fluid, tube diameter, tube length, liquid level, inlet pressure, outlet backpressure, valves, filters and power-supply conditions so candidate pumps can be evaluated at the actual operating point.",
    contactLabel: "Contact an engineer",
    productsLabel: "View diaphragm pumps",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const diaphragmPump300MlMinFlowMarginEnCopy = {
  metadata: {
    title:
      "How Much Installed Flow Margin Should a 300 mL/min Miniature Diaphragm Pump Have? A FOREACH Example",
    seoTitle:
      "300 mL/min Miniature Diaphragm Pump Flow Margin: Worst-Case Conditions and Acceptance Criteria | FOREACH",
    seoDescription:
      "Installed margin for a 300 mL/min miniature diaphragm pump is not a fixed percentage. Learn how to define credible worst-case scenarios and include backpressure, filter loading, power supply, fluid, sample variation, measurement uncertainty and release criteria in the calculation.",
    coverImage: `${ARTICLE_02_ASSET_BASE}/article-cover.webp`,
    coverAlt:
      "Installed flow testing of a miniature diaphragm pump in an official FOREACH Douyin video",
  },
  deck: "Flow margin is not found by multiplying the target flow by 1.2 or 1.3 in every case. It is determined by comparing the pump's conservative available flow with the instrument's maximum demand within the same credible worst-case scenario. Testing must also define in advance how measurement uncertainty will be handled and what explicit acceptance criteria will apply.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "Different fluid paths consume margin in different ways: filter loading increases pressure drop, the lowest liquid level worsens inlet conditions, and fluid viscosity, power supply, tubing tolerances, pump-sample variation and life stage can also shift the operating point. Subtracting average demand from a free-flow value of 300 mL/min does not yield an installed margin suitable for release.",
    },
    {
      type: "notice",
      label: "Engineering conclusion:",
      text: "Define the instrument's maximum demand first, then determine a conservative available flow for each credible worst-case scenario. Margin is sufficient only when the lower bound of available flow in that same scenario meets the upper bound of demand and the project's specified minimum margin.",
    },
  ],
  sections: [
    {
      title: "1. Why a Universal 20% or 30% Margin Is Not Rigorous Enough",
      blocks: [
        {
          type: "paragraph",
          text: "A 20%–30% margin can serve as a reminder during conceptual design, but it should not automatically become the release standard for every project. Some instruments are governed mainly by the pressure drop of a filter near the end of its life, while others are governed by the lowest liquid level, low-temperature viscosity or voltage at the pump terminals. Because the sources of variation and the acceptable consequences differ, the required margin also differs.",
        },
        {
          type: "figure",
          src: `${ARTICLE_02_ASSET_BASE}/article-figure-en.webp`,
          alt: "Upper demand bound and lower available-flow bound combined to calculate conservative miniature diaphragm pump flow margin and pass two release gates",
          width: 2560,
          height: 2160,
          caption:
            "Flow margin should compare maximum demand with available capability under the worst-case operating condition, not target flow with free-flow rate. The curves in the diagram illustrate the method.",
        },
        {
          type: "paragraph",
          text: "Margin analysis includes both an increase on the demand side and a decrease on the supply side. The demand side must cover the maximum task volume, shortest effective time and permissible tolerances. The supply side must cover actual pressure, power supply, fluid, filter condition, sample variation and life stage.",
        },
      ],
    },
    {
      title: "2. Express Margin as a Verifiable Relationship",
      blocks: [
        {
          type: "formula",
          expression: "M = Qavailable,worst ÷ Qrequired,max − 1",
          note: "Qavailable,worst should come from a curve or measurement at the specified pressure and in the worst-case scenario; the free-flow value of 300 mL/min cannot be used. Qrequired,max should be determined from the maximum task volume, shortest effective pumping time and demand tolerances.",
        },
        {
          type: "paragraph",
          text: "The M produced by this formula belongs only to the defined scenario. If the fluid-path version, filter condition, fluid, pump control or environmental limits change, recalculate or retest. A percentage obtained for one instrument cannot simply be copied to another.",
        },
      ],
    },
    {
      title:
        "3. ‘Worst Conditions Occurring Together’ Must Describe One Credible Scenario",
      blocks: [
        {
          type: "paragraph",
          text: "A worst-case scenario is not a mechanical combination of every extreme value in a table. It should describe a set of conditions that can actually occur together at a particular operating stage, life-cycle state and environmental condition, and it should explain why each condition can coexist. Mutually exclusive limits should be separated into different scenarios for evaluation.",
        },
        {
          type: "table",
          headers: ["Scenario treatment", "Example", "Evaluation method"],
          rows: [
            [
              "Can be combined",
              "The specification permits the instrument to start at low temperature, minimum voltage at the pump terminals, minimum liquid level and with the filter near its replacement point",
              "Test as a substantiated end-of-life, low-temperature starting scenario",
            ],
            [
              "Should be evaluated separately",
              "Low-temperature high viscosity and maximum fluid temperature are mutually exclusive environmental limits",
              "Create separate low-temperature and high-temperature scenarios rather than adding them in one calculation",
            ],
            [
              "More evidence required",
              "Pump-life degradation, the lowest-performing sample and extreme tube-diameter tolerance are all multiplied as point worst cases",
              "Confirm statistical correlation, sample coverage and the source of each tolerance before defining a conservative boundary",
            ],
          ],
        },
        {
          type: "notice",
          label: "Scenario record:",
          text: "Each worst-case scenario should record at least its name, life-cycle stage, fluid-path version, fluid and temperature, power supply, liquid level, filter condition, pump-sample condition and control program. This makes the test reproducible and prevents mutually exclusive extremes from being combined into an instrument state that cannot exist.",
        },
      ],
    },
    {
      title: "4. Which Factors Consume Flow Margin?",
      blocks: [
        {
          type: "table",
          headers: ["Factor", "What to check", "Why it consumes margin"],
          rows: [
            [
              "Maximum instrument demand",
              "Maximum volume, shortest effective time, peak stage and program tolerances",
              "Average demand may underestimate the peak",
            ],
            [
              "System pressure",
              "Inlet pressure, outlet pressure and total differential pressure at the target flow",
              "Flow normally decreases as differential pressure rises",
            ],
            [
              "Filter condition",
              "New-filter condition, loading curve and pressure drop near the replacement point",
              "The operating point shifts toward lower flow as loading increases",
            ],
            [
              "Tubing and assembly",
              "Actual inner diameter, length, bends, fitting bore and batch tolerances",
              "A local restriction may become the dominant resistance",
            ],
            [
              "Fluid and environment",
              "Viscosity, temperature, outgassing, particles and valve response",
              "A published water curve may not represent the actual fluid",
            ],
            [
              "Power supply and control",
              "Minimum voltage at the pump terminals, current limiting, PWM range and harness voltage drop",
              "Speed and starting capability may decrease",
            ],
            [
              "Samples and life",
              "Variation across multiple pumps, run-in, operating hours and performance trend",
              "One initial sample cannot represent production variation and life stages",
            ],
            [
              "Measurement system",
              "Flow method, sampling time, calibration, repeatability and environmental influence",
              "Measurement uncertainty reduces the margin that can be demonstrated",
            ],
          ],
        },
      ],
    },
    {
      title: "5. Include Measurement Uncertainty in the Acceptance Criteria",
      blocks: [
        {
          type: "paragraph",
          text: "The same true flow can produce different results because of flow-meter accuracy, weighing resolution, density conversion, sampling time, pulsation and repeatability. Before testing, the project should define its uncertainty budget, coverage rules and decision rule instead of interpreting them only when a result approaches the limit.",
        },
        {
          type: "formula",
          expression: "Mconservative = Qavailable,lower ÷ Qrequired,upper − 1",
          note: "Qavailable,lower is derived from worst-case scenario test results together with the defined rules for measurement uncertainty, repeatability and sample coverage. Qrequired,upper includes task-volume, effective-time and control tolerances. The statistical confidence or engineering coverage rules for both bounds should be defined by the project in advance.",
        },
        {
          type: "table",
          headers: ["Release item", "Recommended predefined criterion"],
          rows: [
            [
              "Flow capability",
              "Qavailable,lower ≥ Qrequired,upper; if the project also specifies a minimum margin Mminimum, Mconservative ≥ Mminimum must also be satisfied",
            ],
            [
              "Starting and self-priming",
              "Achieve the project-defined success rate and maximum starting time in every specified scenario",
            ],
            [
              "Pressure boundary",
              "Steady-state and permitted transient pressure do not exceed the permissible working boundary of any fluid-path component in the actual fluid and at the actual temperature",
            ],
            [
              "Electrical and temperature rise",
              "Voltage at the pump terminals, current, drive protection and steady-state temperature rise all remain within design limits",
            ],
            [
              "Repeatability and sample coverage",
              "The specified number of samples, repeats and life stages all meet the same criterion",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "If the project uses a decision rule with a guard band, the guard-band size should come from measurement capability and the risk of an incorrect decision. No universal k value or fixed percentage suits every measurement system. The key is to make the rule traceable and reproducible and to freeze it before testing.",
        },
      ],
    },
    {
      title:
        "6. Illustrative Calculation: Raw Margin and Demonstrable Margin Are Different",
      blocks: [
        {
          type: "paragraph",
          text: "The following values only illustrate the method; they are not measurements from a customer instrument or a FOREACH product. Assume maximum demand is 180 mL/min. A candidate pump can provide 260 mL/min at rated voltage and the target backpressure. In one confirmed credible worst-case scenario, the lowest measured available flow is 230 mL/min.",
        },
        {
          type: "formula",
          expression: "Mraw = 230 ÷ 180 − 1 ≈ 27.8%",
          note: "Using the free-flow value of 300 mL/min directly would produce an apparent margin of 66.7%, but that value does not include system pressure or worst-case conditions.",
        },
        {
          type: "paragraph",
          text: "Now assume the project's established uncertainty rule gives an available-flow lower bound of 225 mL/min, while including task-volume and time tolerances gives a demand upper bound of 185 mL/min. The conservative margin is then approximately 21.6%. The project should compare 21.6% with the predefined Mminimum instead of choosing whichever conclusion from 27.8% or 66.7% appears more favorable.",
        },
        {
          type: "formula",
          expression: "Mconservative = 225 ÷ 185 − 1 ≈ 21.6%",
          note: "The 225 mL/min and 185 mL/min values are illustrative bounds. An actual project should use its own measurement capability, task tolerances, sample plan and decision rule.",
        },
      ],
    },
    {
      title:
        "7. For a FOREACH 300 mL/min-Class Pump, Start with Target Backpressure",
      blocks: [
        {
          type: "paragraph",
          text: "Published FOREACH data for the DPL30 list a free-flow rate of 300 mL/min, rated pressure of 100 kPa and self-priming lift of 6 mH₂O. Installed margin cannot be calculated as ‘300 minus target flow.’ Start with the formal curve at the target backpressure, then validate inlet pressure, outlet pressure and actual flow in the final fluid path.",
        },
        {
          type: "paragraph",
          text: "Validation should be divided into three levels: baseline conditions, normal variation and worst-case scenarios. If the instrument must remain close to 300 mL/min at high backpressure, recheck the required pressure platform. Adding a percentage margin does not turn a free-flow endpoint into high-backpressure operating capability.",
        },
        {
          type: "links",
          items: [
            {
              prefix: "View the",
              label: "DPL30 liquid diaphragm pump",
              href: "/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump",
              suffix: ".",
            },
            {
              prefix: "Read the",
              label: "DPL30 liquid diaphragm pump selection guide",
              href: "/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide",
              suffix: ".",
            },
          ],
        },
      ],
    },
    {
      title: "8. Flow-Margin Test Matrix and Data Records",
      blocks: [
        {
          type: "table",
          headers: [
            "Test dimension",
            "Baseline level",
            "Limit or life-stage level",
            "Recommended output",
          ],
          rows: [
            [
              "Power supply",
              "Rated voltage at the pump terminals",
              "Lowest permissible voltage at the pump terminals",
              "Flow, starting time and current",
            ],
            [
              "Filter",
              "New component",
              "Equivalent pressure drop near the replacement point",
              "Filter differential pressure, pressure across the pump and flow",
            ],
            [
              "Liquid level",
              "Typical or highest liquid level",
              "Lowest permissible liquid level",
              "Inlet pressure, first start and stabilization time",
            ],
            [
              "Fluid",
              "Baseline fluid and temperature",
              "Permissible viscosity, temperature and gas-content limits",
              "Flow, bubbles, noise and valve response",
            ],
            [
              "Pump samples",
              "Multiple initial samples",
              "Low-performance samples or samples at a life stage",
              "Mean, spread, trend and failure modes",
            ],
            [
              "Measurement system",
              "Baseline measurement after calibration",
              "Low flow, pulsation and long-duration sampling",
              "Raw data, uncertainty and decision result",
            ],
          ],
        },
        {
          type: "notice",
          label: "Evidence boundary:",
          text: "The formulas and values in this article establish a calculation method; they are not a universal margin guarantee. Formal release should cite the controlled specification, curve version, fluid-path version, actual fluid, scenario definition, raw test data and approved acceptance criteria.",
        },
      ],
    },
    {
      title:
        "Conclusion: Margin Must Be Demonstrated Jointly by Scenarios, Data and Criteria",
      blocks: [
        {
          type: "paragraph",
          text: "A reasonable flow margin is neither ‘the larger the better’ nor a fixed rule-of-thumb percentage. It should answer three questions: how maximum demand was derived, why the worst-case scenario can occur, and how much demonstrable capability remains after measurement uncertainty is considered. Recording these conditions in the test matrix and release rules makes it clear which parts must be revalidated when the filter, tubing, fluid or control version changes.",
        },
      ],
    },
  ],
  faqTitle: "FAQ | Flow Margin for a 300 mL/min Miniature Diaphragm Pump",
  faqItems: [
    {
      question:
        "Does a 300 mL/min pump inherently have 50% margin for a 200 mL/min requirement?",
      answer:
        "No. That calculation may apply only if the pump's conservative available flow is still 300 mL/min at the same target pressure, fluid, power supply and worst-case scenario, while the demand upper bound is 200 mL/min. A free-flow value cannot be used directly as available flow.",
    },
    {
      question:
        "Can a 20%–30% margin be adopted directly as a company standard?",
      answer:
        "It can serve as a design reference that triggers detailed validation, but it should not be the sole release standard. A company standard should also specify principles for combining scenarios, fluid-path version, sample and life-stage coverage, measurement uncertainty, demand upper bound and explicit acceptance criteria.",
    },
    {
      question:
        "Why should the filter be checked in a condition near its replacement point?",
      answer:
        "Filter pressure drop normally rises with loading, so the pump operating point may shift toward lower flow. Testing can use a filter from the actual life stage or reproduce the boundary with a substantiated equivalent pressure drop. A new filter alone cannot represent the long-term condition.",
    },
    {
      question:
        "How can you demonstrate that multiple worst-case conditions can occur together?",
      answer:
        "Place them within one specific instrument state: the same life-cycle stage, environment, liquid level, filter condition, power supply and control program, and confirm that the product specification permits the combination. Mutually exclusive conditions should be separated into different scenarios, and extreme values without evidence of association should not be multiplied mechanically.",
    },
    {
      question:
        "Can a measured flow exactly equal to the minimum requirement be judged acceptable?",
      answer:
        "Usually, equality of the readings alone is not enough. The predefined decision rule must also account for measurement uncertainty, repeatability, sample variation and demand tolerances. If the available-flow lower bound is below the demand upper bound, sufficient margin has not been demonstrated.",
    },
  ],
  cta: {
    title:
      "Need to Calculate Installed Margin for a 300 mL/min Diaphragm Pump?",
    description:
      "Provide the maximum task volume, effective pumping time, fluid-path differential pressure, fluid and temperature, minimum voltage, liquid level, filter life condition, sample plan and current measurement capability to establish reproducible worst-case scenarios and release criteria.",
    contactLabel: "Contact an engineer",
    productsLabel: "View diaphragm pumps",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
