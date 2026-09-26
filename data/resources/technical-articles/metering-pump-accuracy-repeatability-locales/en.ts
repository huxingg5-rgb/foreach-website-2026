import type { DiaphragmPumpEngineeringArticleCopy } from "../diaphragm-pump-engineering-article.types";
import {
  getMeteringPumpAccuracyRepeatabilityArticleHref,
  getMeteringPumpAccuracyRepeatabilityProductHref,
  meteringPumpAccuracyRepeatabilityCoverImage,
} from "./shared";

const locale = "en" as const;
const articleHref = (slug: string) =>
  getMeteringPumpAccuracyRepeatabilityArticleHref(locale, slug);
const productHref = getMeteringPumpAccuracyRepeatabilityProductHref(locale);

export const meteringPumpAccuracyRepeatabilityEn = {
  metadata: {
    title:
      "Metering Pump Dosing Inaccurate or Inconsistent? Causes and Troubleshooting",
    seoTitle:
      "Metering Pump Accuracy & Repeatability Troubleshooting | FOREACH",
    seoDescription:
      "Troubleshoot metering pump dosing errors and poor repeatability by checking bubbles, inlet supply, fluid properties, tubing, tips and motor control.",
    coverImage: meteringPumpAccuracyRepeatabilityCoverImage,
    coverAlt: "FOREACH RPL-P4 valveless metering pump",
  },
  deck: "When the same program still produces unstable dispense volumes, first classify the error pattern, then check bubbles, inlet supply, fluid properties, tubing, the outlet and motor settings. This guide provides a practical first-pass troubleshooting method.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "Conclusion: If repeated dispenses are close to one another but consistently miss the target, the problem is usually accuracy or systematic bias; check calibration, displacement calculations and the actual operating point first. If results vary widely under the same program, the problem is usually repeatability; check bubbles, inlet supply, tubing compliance, the dispensing tip and drive consistency first. If results drift over time, check temperature, viscosity, crystallization, contamination and wear. Displacement per revolution does not directly define the minimum reliable dispense volume; final performance must be verified with the target fluid and complete fluid path.",
    },
  ],
  sections: [
    {
      title: "Use the dosing pattern to identify the likely problem",
      blocks: [
        {
          type: "table",
          headers: ["Observed behavior", "Check first", "First action"],
          rows: [
            [
              "Every dispense is high or low, but variation is small",
              "Operating point, calibration, target value or gravimetric conversion",
              "Weigh the target fluid again and verify displacement, revolutions and density",
            ],
            [
              "Results vary widely under the same program",
              "Bubbles, insufficient inlet supply, tubing compliance or liquid retained on the tip",
              "Prime the system again and observe the inlet, pump head and tip",
            ],
            [
              "The first few dispenses are inaccurate, then results stabilize",
              "The pump head or tubing is not completely filled",
              "Add priming cycles and begin recording only after the system stabilizes",
            ],
            [
              "Results drift after the system has been running",
              "Temperature, viscosity, crystallization, contamination or wear",
              "Hold temperature constant and compare results before and after cleaning",
            ],
            [
              "Intermittent no-flow, hanging drops or splashing",
              "Inlet blockage, bubbles, tip size or acceleration and deceleration",
              "Check filters, fittings, the tip and motor ramp settings",
            ],
          ],
        },
      ],
    },
    {
      title: "Check the fluid path and control settings in this order",
      blocks: [
        {
          type: "table",
          headers: ["Check", "How to verify", "Corrective action"],
          rows: [
            [
              "Pump head and bubbles",
              "Prime slowly and watch for bubbles that remain, compress or move back and forth in the pump head or inlet tube",
              "Prime and vent again, then confirm that fittings are not drawing in more air",
            ],
            [
              "Inlet supply",
              "Temporarily reduce suction lift or shorten the inlet tube, then repeat the test and look for improvement",
              "Reduce suction lift, shorten the inlet line and check filter resistance",
            ],
            [
              "Fluid and temperature",
              "Run the same program with the target fluid and a known reference fluid, and compare changes after switching fluid or temperature",
              "Hold the fluid and temperature constant, then recalibrate and retest with the target fluid",
            ],
            [
              "Outlet and dispensing tip",
              "Check for hanging drops, retained liquid or splashing, and confirm that each drop enters the receiving vessel",
              "Clean or replace the tip and fix the tip position, outlet conditions and start-stop settings",
            ],
            [
              "Tubing compliance and fittings",
              "Keep pump settings unchanged and compare results after fitting a shorter or less compliant tube",
              "Use shorter tubing with a suitable inner diameter and secure connections",
            ],
            [
              "Motor and program",
              "Confirm that revolutions, speed, start-stop phase and acceleration settings are identical for every run",
              "Fix the complete pump cycle and drive settings before comparing results",
            ],
          ],
        },
      ],
    },
    {
      title: "Run a quick 10-dispense check",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Clean and fully prime the pump head and tubing, removing visible bubbles.",
            "Fix the fluid, temperature, reservoir level, tubing, filter, tip and outlet position.",
            "Record the pump model, displacement setting, revolutions, speed, acceleration and deceleration.",
            "Run 10 consecutive dispenses with the same program and weigh each dispense separately instead of recording only the total.",
            "Convert mass to volume using the target-fluid density, calculate the mean and compare it with the target.",
            "Calculate the sample standard deviation or RSD to determine how closely the individual results cluster.",
            "Change only one condition before repeating the test so that causes remain distinguishable.",
          ],
        },
        {
          type: "formula",
          expression:
            "Mean deviation from target (%) = (mean measured volume − target volume) ÷ target volume × 100%",
          note: "A positive result means the mean dispense is above target; a negative result means it is below target. A persistent offset points first to calibration, operating point and conversion method.",
        },
        {
          type: "formula",
          expression:
            "Measured volume = net liquid mass ÷ target-fluid density",
          note: "Use compatible units for mass and density. For small volumes, confirm that balance resolution, evaporation and weighing time support the intended conclusion.",
        },
        {
          type: "formula",
          expression:
            "RSD (%) = sample standard deviation ÷ mean measured volume × 100%",
          note: "A high RSD points first to bubbles, inlet supply, tubing, the outlet and drive consistency.",
        },
        {
          type: "table",
          headers: ["10-run result", "Likely direction", "Next step"],
          rows: [
            [
              "Results cluster closely, but the mean remains high or low",
              "Calibration, displacement conversion, fluid density or system backpressure",
              "Recalibrate with the target fluid and verify the operating point",
            ],
            [
              "The mean is near target, but individual results are scattered",
              "Bubbles, inlet supply, tubing compliance or drive consistency",
              "Vent the system, then fix fluid-path and control conditions one at a time",
            ],
            [
              "The first few results are off, then stabilize",
              "Insufficient priming or an incompletely filled pump chamber",
              "Add priming and waste-dispense cycles",
            ],
            [
              "Results change gradually with run time",
              "Temperature, viscosity, crystallization, contamination or wear",
              "Hold temperature constant and compare results before and after cleaning",
            ],
            [
              "Results change after replacing the tip or tubing",
              "A change in outlet resistance or fluid-path volume",
              "Revalidate under the new fluid-path conditions",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Ten measurements are suitable for initial field troubleshooting, not formal performance validation. Set the sample size, allowable deviation and measuring equipment according to the project requirements.",
        },
      ],
    },
    {
      title: "Recheck after any of these changes",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Changing the fluid, concentration, batch or operating temperature;",
            "Changing tubing, filters, fittings, tips or nozzles;",
            "Changing reservoir height, suction lift, backpressure or outlet position;",
            "Changing displacement, revolutions, speed, acceleration, deceleration or the start-stop program;",
            "Cleaning the pump head, replacing wetted parts or removing crystallized deposits;",
            "Finding a shifted mean, increased scatter or results that drift with time.",
          ],
        },
        {
          type: "paragraph",
          text: "For selection or troubleshooting, provide the target dispense volume or flow rate, cycle time, fluid and temperature, inlet level, tubing dimensions, outlet backpressure, tip and drive method. This information is more useful for defining the actual operating point than asking only for a pump accuracy percentage.",
        },
      ],
    },
    {
      title: "Use RPL displacement only for initial model screening",
      blocks: [
        {
          type: "paragraph",
          text: "RPL displacement per revolution helps define a nominal operating range. Actual delivery still needs to be tested with the intended number of revolutions, cycle time, fluid and complete fluid path.",
        },
        {
          type: "table",
          headers: [
            "Model",
            "Displacement per revolution",
            "Tasks to evaluate first",
          ],
          rows: [
            [
              "RPL-P4",
              "12–80 μL/rev",
              "Small-volume reagent dosing, titrant delivery and repeated dispensing",
            ],
            [
              "RPL-P6.35",
              "50–300 μL/rev",
              "Reagent dispensing, titrant dosing and volumetric filling",
            ],
            [
              "RPL-P15",
              "300–1200 μL/rev",
              "Larger-volume reagent filling, buffer addition and quantitative delivery",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "The lower displacement limit per revolution is not the minimum reliable dispense volume. After selecting a model, verify it with the target fluid, tubing, backpressure, tip and control program.",
        },
      ],
    },
    {
      title: "Related pages",
      blocks: [
        {
          type: "links",
          ordered: true,
          items: [
            {
              href: articleHref("what-is-a-valveless-metering-pump"),
              label:
                "What Is a Valveless Metering Pump? Principle, Applications and Selection",
            },
            {
              href: articleHref("rpl-valveless-metering-pump-selection-guide"),
              label: "RPL Single-Head Valveless Metering Pump Selection Guide",
            },
            {
              href: productHref,
              label: "View RPL and DRPL valveless metering pumps",
            },
          ],
        },
      ],
    },
  ],
  faqTitle: "Metering pump dosing troubleshooting FAQ",
  faqItems: [
    {
      question:
        "Repeated results are close together but remain below the target. What should I check?",
      answer:
        "This indicates closely clustered results with a persistent operating-point bias. Use the target fluid to verify displacement, revolutions, density conversion, backpressure and calibration.",
    },
    {
      question: "Why does dispense volume change after switching fluids?",
      answer:
        "Different fluids have different viscosity, density, surface tension and volatility. These properties affect pump filling, tubing resistance and drop release at the tip. Prime and perform a new gravimetric check after changing fluids.",
    },
    {
      question:
        "Is the lower displacement limit per revolution the minimum reliable dispense volume?",
      answer:
        "No. The minimum reliable dispense also depends on drive positioning, complete pump cycles, bubbles, tubing, the tip and the measurement method, so it must be verified in the target fluid path.",
    },
  ],
  cta: {
    title: "Need to troubleshoot reagent dosing or select an RPL model?",
    description:
      "Share the target volume or flow rate, cycle time, fluid, tubing, backpressure, tip and drive method with FOREACH to review the operating point and validation conditions.",
    contactLabel: "Discuss technical selection",
    productsLabel: "View valveless metering pumps",
    productsHref: productHref,
  },
} satisfies DiaphragmPumpEngineeringArticleCopy;
