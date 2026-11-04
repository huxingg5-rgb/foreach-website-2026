import type { DiaphragmPumpEngineeringArticleCopy } from "../../diaphragm-pump-engineering-article.types";
import { dpgl800Card, dpgl800CurveImage, dpl30Card, dpl30CurveImage, imageBase, principleDiagram } from "./shared";

// English localization of what-is-a-diaphragm-pump.zh.ts. Product and category names follow the
// miniature diaphragm pump product pages; third-party photos keep their CC BY-SA attribution.
export const copy = {
  "metadata": {
    "title": "What Is a Diaphragm Pump? Working Principle, Types, Pros and Cons, and Selection",
    "seoTitle": "What Is a Diaphragm Pump? How It Works, Types & Selection | FOREACH",
    "seoDescription": "How diaphragm pumps work, how AODD, electric, metering, vacuum and miniature diaphragm pumps differ, their pros and limits, applications and key selection criteria.",
    "coverImage": dpl30Card,
    "coverAlt": "FOREACH DPL30 miniature liquid diaphragm pump"
  },
  "deck": "A diaphragm pump is a positive displacement pump that moves liquid or gas with a reciprocating flexible diaphragm and inlet and outlet check valves. This guide covers how it works, the main types, advantages and limitations, applications and selection criteria.",
  "leadBlocks": [
    {
      "type": "paragraph",
      "text": "A diaphragm pump is a positive displacement pump. A flexible diaphragm moves back and forth and, together with two check valves at the inlet and outlet, draws liquid or gas in through the inlet and pushes it out through the outlet."
    },
    {
      "type": "paragraph",
      "text": "The pumped medium contacts only the pump chamber, diaphragm and valves—never the motor, bearings or other drive components. With no dynamic seals, a diaphragm pump is less prone to leakage and suits corrosive, contamination-sensitive or high-purity media."
    },
    {
      "type": "paragraph",
      "text": "The working principle is the same whether it is a large air-operated diaphragm pump moving slurry in a chemical plant or a miniature diaphragm pump delivering a few to several hundred milliliters per minute inside an instrument."
    }
  ],
  "sections": [
    {
      "title": "How does a diaphragm pump work?",
      "tocLabel": "Working principle",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Each pumping cycle consists of a suction stroke and a discharge stroke. The pump moves the medium through changes in chamber volume and the coordinated action of two check valves."
        },
        {
          "type": "figure",
          "src": principleDiagram("en"),
          "alt": "Diagram of the suction and discharge strokes of a diaphragm pump",
          "width": 1520,
          "height": 640,
          "caption": "How a diaphragm pump works: red bars mark closed check valves; blue arrows show the direction of flow."
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Suction stroke: the diaphragm is pulled down, chamber volume increases and pressure falls. The pressure difference opens the inlet check valve while the outlet check valve stays closed, drawing the medium into the chamber.",
            "Discharge stroke: the diaphragm is pushed up, chamber volume decreases and pressure rises. The outlet check valve opens and the inlet check valve closes, pushing the medium out of the chamber."
          ]
        },
        {
          "type": "paragraph",
          "text": "The two strokes alternate continuously, producing a continuous but pulsating flow. A single-chamber pump delivers fluid only during the discharge stroke, so pulsation is pronounced; double-diaphragm and multi-chamber designs discharge from each chamber in turn and deliver a much smoother flow."
        },
        {
          "type": "subheading",
          "title": "Key components"
        },
        {
          "type": "list",
          "items": [
            "Diaphragm: separates the medium from the drive and flexes repeatedly to change chamber volume. Common materials include EPDM, FKM and PTFE, selected for the fluid's corrosiveness and temperature.",
            "Check valves: allow flow in one direction only. How well the valves seal directly affects self-priming and actual flow.",
            "Pump head: the housing that forms the chamber and contacts the medium. It is usually made from engineering plastics such as PP, PPS or PVDF; industrial pumps may also use aluminum alloy or stainless steel.",
            "Drive mechanism: the power source that moves the diaphragm—a motor with an eccentric or connecting rod, compressed air or a solenoid. Each drive method defines a different type of diaphragm pump."
          ]
        },
        {
          "type": "subheading",
          "title": "What determines the flow rate?"
        },
        {
          "type": "paragraph",
          "text": "Theoretical flow equals the displacement per stroke multiplied by the stroke frequency. Once the pump is installed, actual flow is also affected by suction lift, outlet backpressure, tubing size and fluid viscosity, and is usually lower than the free flow listed in the datasheet."
        },
        {
          "type": "paragraph",
          "text": "When selecting a pump, use its flow–pressure curve to confirm how much flow remains at the actual system pressure, rather than looking only at maximum flow."
        },
        {
          "type": "paragraph",
          "text": "Below is the flow–pressure curve of the FOREACH DPL30 miniature liquid diaphragm pump. At zero pressure, flow is slightly above 300 mL/min; when outlet backpressure rises to 100 kPa, flow drops to about 160 mL/min—roughly half. Flow also falls as inlet vacuum increases (a higher suction lift or more inlet resistance)."
        },
        {
          "type": "figure",
          "src": dpl30CurveImage("en"),
          "alt": "FOREACH DPL30 miniature liquid diaphragm pump flow–pressure curve",
          "width": 2080,
          "height": 668,
          "caption": "DPL30 flow–pressure curve: the left side of the horizontal axis is inlet negative pressure, the right side is outlet positive pressure, and the vertical axis is flow.",
          "link": {
            "href": "/en/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
            "label": "Learn more: how to read a diaphragm pump flow–pressure curve"
          }
        },
        {
          "type": "links",
          "items": [
            {
              "prefix": "To estimate the pressure drop in your tubing, use the ",
              "href": "/en/resources/calculators/fluid-resistance/",
              "label": "flow resistance calculator",
              "suffix": " with tubing diameter, length and flow, then read the flow at that pressure from the curve."
            }
          ]
        }
      ]
    },
    {
      "title": "What types of diaphragm pumps are there?",
      "tocLabel": "Main types",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Diaphragm pumps are mainly classified by drive method and application. Air-operated double-diaphragm pumps are the most common type in industrial plants, while miniature electric diaphragm pumps are the most common in instruments and equipment."
        },
        {
          "type": "table",
          "headers": ["Type", "Drive", "Flow range", "Typical uses"],
          "rows": [
            ["Air-operated double-diaphragm (AODD) pump", "Compressed air drives two diaphragms alternately", "High: tens to hundreds of liters per minute", "Chemicals, coatings, wastewater and slurry transfer"],
            ["Electric diaphragm pump", "A motor drives the diaphragm through an eccentric or connecting rod", "Very wide: from a few milliliters to tens of liters per minute", "Transfer inside equipment, spraying, water purification"],
            ["Solenoid diaphragm pump / diaphragm metering pump", "Solenoid or motor drive with adjustable stroke length and frequency", "Low to medium, with emphasis on metering accuracy", "Chemical dosing in water treatment, chemical feed"],
            ["Diaphragm vacuum pump / gas pump", "Motor-driven; moves gas", "Rated by pumping speed", "Laboratory vacuum filtration, gas sampling, vacuum liquid aspiration"],
            ["Miniature diaphragm pump", "A scaled-down electric diaphragm pump with a brushed or brushless DC motor", "A few to several hundred milliliters per minute (liquid)", "Analytical instruments, laboratory automation, environmental monitoring, ink circuits"]
          ]
        },
        {
          "type": "subheading",
          "title": "Air-operated double-diaphragm (AODD) pumps"
        },
        {
          "type": "paragraph",
          "text": "An AODD pump uses compressed air to drive two diaphragms alternately: one draws in fluid while the other discharges. It needs no electricity, which makes it suitable where explosion protection is required, and it can handle slurries containing particles and high-viscosity liquids. On the downside, it requires an air supply, consumes a lot of compressed air and has a noisy exhaust."
        },
        {
          "type": "figure",
          "src": `${imageBase}/aodd-tapflo-t50.jpg`,
          "alt": "Tapflo T50 air-operated double-diaphragm pump",
          "width": 900,
          "height": 480,
          "caption": "Tapflo T50 air-operated double-diaphragm pump. Photo: Aleksander Ma, CC BY-SA 4.0, via Wikimedia Commons."
        },
        {
          "type": "subheading",
          "title": "Electric diaphragm pumps"
        },
        {
          "type": "paragraph",
          "text": "In an electric diaphragm pump, a motor moves the diaphragm back and forth through an eccentric or connecting rod. Flow follows motor speed and can be adjusted through the supply voltage or the motor driver. Large electric diaphragm pumps are used for industrial transfer; small ones are built into many kinds of equipment."
        },
        {
          "type": "subheading",
          "title": "Solenoid diaphragm pumps and diaphragm metering pumps"
        },
        {
          "type": "paragraph",
          "text": "A solenoid diaphragm pump uses an electromagnet to push the diaphragm and completes one stroke for each electrical pulse. The dosing rate is controlled by adjusting pulse frequency and stroke length. Diaphragm metering pumps emphasize metering accuracy and are widely used for chemical dosing in water treatment and for chemical feed."
        },
        {
          "type": "subheading",
          "title": "Diaphragm vacuum pumps and gas pumps"
        },
        {
          "type": "paragraph",
          "text": "These diaphragm pumps move gas. The chamber is oil-free, so the extracted gas is not contaminated with oil. They are common in laboratory vacuum filtration, gas sampling and vacuum liquid aspiration inside equipment."
        },
        {
          "type": "figure",
          "src": dpgl800CurveImage("en"),
          "alt": "FOREACH DPGL800 gas-liquid diaphragm pump gas flow–pressure curve",
          "width": 2363,
          "height": 1100,
          "caption": "FOREACH DPGL800 gas flow–pressure curve: single-head gas flow is about 6 L/min at zero pressure; flow falls as vacuum deepens and approaches zero near -90 kPa, the pump's ultimate vacuum."
        },
        {
          "type": "subheading",
          "title": "Miniature diaphragm pumps"
        },
        {
          "type": "paragraph",
          "text": "Miniature diaphragm pumps are compact, low-power and DC-powered, so they integrate easily into instruments and equipment. Selection mainly comes down to three distinctions:"
        },
        {
          "type": "list",
          "items": [
            "Liquid vs. gas-liquid pumps: liquid pumps transfer liquid for tasks such as washing, replenishment and circulation. Gas-liquid pumps can handle gas and liquid together, making them suitable for waste aspiration and vacuum liquid aspiration.",
            "Brushed vs. brushless motors: brushless motors last longer and run more quietly, suiting long periods of continuous operation; brushed motors are simpler and lower in cost, suiting intermittent use.",
            "Standard vs. high pressure: circuits with high outlet backpressure—such as narrow tubing, long lines or nozzles—need a high-pressure model."
          ]
        },
        {
          "type": "links",
          "items": [
            {
              "prefix": "FOREACH miniature diaphragm pumps follow the same three distinctions: ",
              "href": "/en/products/pumps/miniature-diaphragm-pumps/dpl30-bb/",
              "label": "DPL30",
              "suffix": " (300 mL/min) and "
            },
            {
              "href": "/en/products/pumps/miniature-diaphragm-pumps/dpl60-bb/",
              "label": "DPL60",
              "suffix": " (600 mL/min) are standard-pressure liquid pumps rated at 100 kPa; "
            },
            {
              "href": "/en/products/pumps/miniature-diaphragm-pumps/dpl30h-bs/",
              "label": "DPL30H",
              "suffix": " is a high-pressure liquid pump rated at 600 kPa. All three series are available with brushed or brushless motors. "
            },
            {
              "href": "/en/products/pumps/miniature-diaphragm-pumps/dpgl800-bs/",
              "label": "DPGL800",
              "suffix": " is a 24 V brushless gas-liquid diaphragm pump with 6 L/min single-head no-load gas flow for waste aspiration and vacuum liquid aspiration; it is not intended for pumping 100% liquid."
            }
          ]
        },
        {
          "type": "figure",
          "src": dpl30Card,
          "alt": "FOREACH DPL30 miniature liquid diaphragm pump",
          "width": 2000,
          "height": 1500,
          "caption": "FOREACH DPL30 miniature liquid diaphragm pump."
        },
        {
          "type": "figure",
          "src": dpgl800Card,
          "alt": "FOREACH DPGL800 miniature gas-liquid diaphragm pump",
          "width": 1500,
          "height": 1500,
          "caption": "FOREACH DPGL800 miniature gas-liquid diaphragm pump."
        }
      ]
    },
    {
      "title": "Advantages and limitations of diaphragm pumps",
      "tocLabel": "Pros and limitations",
      "blocks": [
        {
          "type": "paragraph",
          "text": "The main strengths of a diaphragm pump are reliable sealing and self-priming; its main limitations are pulsating flow and flow that varies with backpressure. Weigh both before you select a pump."
        },
        {
          "type": "subheading",
          "title": "Advantages"
        },
        {
          "type": "list",
          "items": [
            "No dynamic seals, low risk of leakage: the diaphragm separates the medium from the drive, so there is no shaft seal or similar leak point.",
            "Self-priming: at start-up, the pump evacuates air from the inlet line and then draws up liquid, with no need for priming beforehand. Suction lift is limited, however—typically only a few meters of water for miniature pumps.",
            "Most can run dry for short periods: a temporary loss of liquid in the line is unlikely to cause damage; refer to the product manual for limits.",
            "Handles gas and gas-liquid mixtures: gas-liquid models can be used directly for waste aspiration and vacuum liquid aspiration.",
            "Selectable wetted materials: the diaphragm, valves and pump head can each be matched to the fluid, including acids, bases, solvents and a wide range of reagents.",
            "Low shear: the pump agitates and shears the fluid less than gear or centrifugal pumps, which suits shear-sensitive media."
          ]
        },
        {
          "type": "subheading",
          "title": "Limitations"
        },
        {
          "type": "list",
          "items": [
            "Pulsating flow: circuits that need smooth flow require a pulsation damper or a multi-chamber pump.",
            "Flow varies with backpressure: the narrower and longer the tubing, the lower the actual flow. For precise metering, a piston pump or syringe pump is a better fit.",
            "Noise and vibration: mounting and vibration isolation have a significant effect on overall equipment noise.",
            "Diaphragm and valve wear: these are wear parts, and their service life depends on operating conditions and motor type.",
            "Miniature pumps are sensitive to particles and high viscosity: valve clearances are small, so check in advance whether fluids containing particles, high-viscosity fluids or fluids that vaporize easily are suitable."
          ]
        }
      ]
    },
    {
      "title": "Where are diaphragm pumps used?",
      "tocLabel": "Applications",
      "blocks": [
        {
          "type": "paragraph",
          "text": "In industry, AODD pumps are widely used to transfer chemicals, coatings and wastewater. In instruments and automated equipment, miniature diaphragm pumps mainly handle washing, replenishment, circulation and waste aspiration:"
        },
        {
          "type": "table",
          "headers": ["Field", "What the diaphragm pump does"],
          "rows": [
            ["Analytical instruments", "Wash-fluid supply, replenishment, circulation and waste aspiration; needle wash in liquid chromatography"],
            ["Environmental monitoring", "Water sampling, reagent delivery and drainage; condensate removal in gas pretreatment"],
            ["Laboratory automation", "Plate washing in microplate washers; cleaning of sample preparation equipment"],
            ["Life sciences", "Media exchange in cell culture, automated washing and waste handling"],
            ["Synthetic biology", "Feeding and waste removal for microbioreactors"],
            ["In vitro diagnostics (IVD)", "Washing and waste handling in clinical chemistry, hematology, immunoassay and coagulation analyzers"],
            ["Printing and ink circuits", "Ink supply and return circulation that keeps white ink and other inks from settling"]
          ]
        },
        {
          "type": "paragraph",
          "text": "Within the same instrument, washing, replenishment and waste aspiration often place different demands on the pump. Washing prioritizes flow and pressure, for example, while waste aspiration depends on handling gas-liquid mixtures. It is best to select a pump for each task separately."
        }
      ]
    },
    {
      "title": "How to select a diaphragm pump",
      "tocLabel": "Selection",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Don't select a diaphragm pump by the maximum flow in the datasheet alone. Start from the fluid and the actual circuit, and check each of the following points in order:"
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "What is the medium? Liquid, gas or a gas-liquid mixture; whether it is corrosive or contains particles; its viscosity and temperature. These determine the pump type and wetted materials.",
            "How much flow is needed? Size for the actual operating point after installation and allow a margin, rather than comparing datasheet free-flow figures directly.",
            "How high are the suction lift and backpressure? How high the inlet must lift and how much resistance the outlet sees determine whether you need a standard or high-pressure model.",
            "Are the wetted materials compatible? Check the diaphragm, valves and pump head individually—not just one of them.",
            "Motor and control: brushed or brushless, supply voltage, and whether speed control and status feedback are required.",
            "Duty cycle and service life: continuous or intermittent operation and hours per day; estimate service life from actual operating conditions.",
            "Installation and tubing: noise, vibration, pulsation, tubing size, and whether the reservoir is vented."
          ]
        },
        {
          "type": "subheading",
          "title": "Common wetted materials"
        },
        {
          "type": "paragraph",
          "text": "Common wetted materials in diaphragm pumps (general guidance—confirm each fluid by composition, concentration and temperature)"
        },
        {
          "type": "table",
          "headers": ["Material", "Typical parts", "Strengths", "Watch out for"],
          "rows": [
            ["EPDM (ethylene propylene diene rubber)", "Diaphragm, valves", "Resists water, dilute acids and bases, and alcohols; suits aqueous media", "Not resistant to mineral oils, fuels or hydrocarbon solvents"],
            ["FKM (fluoroelastomer)", "Diaphragm, valves", "Resists oils, fuels and most acids", "Not resistant to ketones such as acetone, amines or strong bases"],
            ["FFKM (perfluoroelastomer)", "Valves, seals", "Chemical resistance close to PTFE while keeping rubber elasticity", "High cost"],
            ["PTFE (polytetrafluoroethylene)", "Diaphragm", "Highly inert; resists most strong acids, strong bases and organic solvents", "Less elastic than rubber"],
            ["PPS (polyphenylene sulfide)", "Pump head", "Heat- and chemical-resistant, dimensionally stable", "Only limited compatibility with concentrated hydrochloric acid, hydrogen peroxide and similar media"],
            ["PP (polypropylene)", "Pump head", "Resists acids, bases and common organic solvents; low cost", "Lower temperature limit; not resistant to xylene, dichloromethane and similar solvents"],
            ["PVDF (polyvinylidene fluoride)", "Pump head", "Chemical-resistant with good mechanical strength", "Only limited compatibility with ketones such as acetone"]
          ]
        },
        {
          "type": "paragraph",
          "text": "FOREACH miniature liquid diaphragm pumps (DPL30, DPL60 and DPL30H) use a PPS pump head with two wetted-material combinations: an EPDM diaphragm with EPDM valves, or a PTFE diaphragm with FFKM valves. For purified water, start by evaluating the EPDM combination; for reagents and cleaning fluids, check both combinations against the actual composition, concentration and temperature—including any fluids used for cleaning."
        },
        {
          "type": "links",
          "items": [
            {
              "prefix": "Look up specific fluids in the ",
              "href": "/en/resources/material-compatibility/",
              "label": "material compatibility table",
              "suffix": " for PPS, PTFE and other materials; for help choosing between the two combinations, see "
            },
            {
              "href": "/en/resources/technical-articles/micro-diaphragm-pump-materials-selection/",
              "label": "Which Materials Are Available for Miniature Diaphragm Pumps?",
              "suffix": "."
            }
          ]
        },
        {
          "type": "paragraph",
          "text": "At the prototype stage, measure flow and pressure in the real circuit and confirm the results before finalizing the design."
        }
      ]
    },
    {
      "title": "Summary",
      "tocLabel": "Summary",
      "blocks": [
        {
          "type": "paragraph",
          "text": "A diaphragm pump moves fluid with a reciprocating diaphragm and two check valves. It seals reliably, self-primes and is widely used, from industrial transfer to instrument fluidics. When selecting one, first define the medium and the actual operating point, then confirm the materials, motor and installation conditions."
        },
        {
          "type": "paragraph",
          "text": "If you are choosing a miniature diaphragm pump for your equipment, FOREACH offers both liquid and gas-liquid miniature diaphragm pumps. Send us your fluid, target flow and tubing layout, and our engineers will help you determine the operating point and the right model."
        },
        {
          "type": "subheading",
          "title": "Further reading"
        },
        {
          "type": "links",
          "ordered": true,
          "items": [
            {
              "href": "/en/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
              "label": "How to Read a Diaphragm Pump Flow-Pressure Curve—and Predict Installed Flow"
            },
            {
              "href": "/en/resources/technical-articles/micro-diaphragm-pump-materials-selection/",
              "label": "Which Materials Are Available for Miniature Diaphragm Pumps? Selection Considerations"
            },
            {
              "href": "/en/resources/technical-articles/diaphragm-pump-vs-peristaltic-pump/",
              "label": "Miniature Diaphragm vs. Peristaltic Pumps: Pros, Cons and Selection for Instrument Fluidics"
            },
            {
              "href": "/en/resources/technical-articles/miniature-diaphragm-pump-flow-pulsation-reduction/",
              "label": "Reducing Flow Pulsation in Miniature Diaphragm Pumps: Measurement and Practical Measures"
            },
            {
              "href": "/en/resources/technical-articles/self-priming-miniature-liquid-diaphragm-pump-selection/",
              "label": "Selecting a Self-Priming Miniature Liquid Diaphragm Pump: Lift, Priming Time and Dry or Wet Starts"
            },
            {
              "href": "/en/resources/technical-articles/brushed-vs-brushless-diaphragm-pump-3000h-10000h/",
              "label": "Why Do Brushed Diaphragm Pumps Last Around 3,000 Hours and Brushless Pumps Around 10,000 Hours?"
            }
          ]
        }
      ]
    }
  ],
  "faqTitle": "Frequently asked questions",
  "faqItems": [
    {
      "question": "Can a diaphragm pump run dry?",
      "answer": "Most diaphragm pumps are not damaged by brief dry running because they have no dynamic seals that rely on the liquid for lubrication. Prolonged dry running, however, accelerates diaphragm and valve wear; refer to the product manual for limits."
    },
    {
      "question": "Is a diaphragm pump self-priming?",
      "answer": "Yes. A diaphragm pump can draw up liquid even when the inlet line contains air, but suction lift is limited. For FOREACH miniature liquid diaphragm pumps, it is 6 mH₂O for the DPL30 and 3 mH₂O for the DPL60 and DPL30H. If self-priming deteriorates, common causes are an air leak on the inlet side or worn valves."
    },
    {
      "question": "Why is the flow lower than rated after installation?",
      "answer": "Rated flow is usually free flow with no backpressure. After installation, tubing diameter, tubing length, suction lift and backpressure all reduce flow; an unvented reservoir or an air leak at the inlet will also lower it."
    },
    {
      "question": "Diaphragm pump or peristaltic pump: which should I choose?",
      "answer": "A peristaltic pump moves fluid by squeezing flexible tubing; flow tracks rotational speed directly, but the tubing must be replaced regularly. A diaphragm pump needs no tube changes and self-primes well, but its flow pulsates. Peristaltic pumps are more common where metered dosing is required; diaphragm pumps are preferred for low-maintenance, long-term transfer, washing and waste aspiration."
    },
    {
      "question": "What is the difference between air-operated and electric diaphragm pumps?",
      "answer": "Air-operated diaphragm pumps are driven by compressed air, deliver high flow and are mainly used for industrial transfer. Electric diaphragm pumps are motor-driven, can be made very small and are easy to control, making them well suited for integration into instruments and equipment."
    },
    {
      "question": "Can a diaphragm pump be used for precise metering?",
      "answer": "Flow from a standard diaphragm pump varies with backpressure, so it is not suited to high-precision dosing. For precise metering, choose a diaphragm metering pump, piston pump or syringe pump."
    },
    {
      "question": "How long does a diaphragm pump last?",
      "answer": "Service life depends mainly on motor type and operating conditions. For FOREACH miniature diaphragm pumps, rated life is about 3,000 hours for brushed versions and about 10,000 hours for brushless versions; continuous operation, high backpressure and high temperatures all shorten actual service life."
    }
  ],
  "cta": {
    "title": "Need a miniature diaphragm pump for your equipment?",
    "description": "Share your fluid, target flow, suction lift, backpressure and tubing layout. FOREACH engineers can help determine the operating point and the right model.",
    "contactLabel": "Contact an engineer",
    "productsLabel": "View miniature diaphragm pumps",
    "productsHref": "/en/products/pumps/miniature-diaphragm-pumps/"
  }
} satisfies DiaphragmPumpEngineeringArticleCopy;
