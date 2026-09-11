import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

export const fluidResistanceCalculatorGuideEnCopy = {
  "metadata": {
    "title": "What is flow resistance calculation for? Using the FOREACH calculator in fluid-path design and selection",
    "seoTitle": "Flow resistance calculator: pressure drop and design | FOREACH",
    "seoDescription": "Compare tube diameter and valve Cv to estimate pressure loss, solve for flow, locate dominant resistance and assess fluid-path options with the FOREACH calculator, pump curves and measurements.",
    "coverImage": "/images/resources/technical-articles/fluid-resistance-guide/comparison.en.svg",
    "coverAlt": "FOREACH flow resistance calculation case: pressure drop comparison before and after adjusting pipe diameter and valve Cv"
  },
  "deck": "The free flow rate of the pump meets the requirements. After installing the pipelines, valves and joints, the liquid supply at the end is insufficient. Flow resistance calculations can break the problem down into comparable data: what pressure differential is required at the target flow rate, where does the pressure loss mainly occur, and what happens if the pipe diameter, pipe length, component Cv or medium viscosity is changed. This article combines the actual function of the FOREACH flow resistance calculator with a recalculable fluid circuit case to explain how to use the calculation results for design, selection, troubleshooting and prototype verification.",
  "leadBlocks": [
    {
      "type": "paragraph",
      "text": "In analytical instruments, IVD equipment, and laboratory automation fluid lines, the energy provided by pumps is required to overcome pipe wall friction, local resistance in valves and fittings, and other pressure conditions in the actual system. When the flow rate is insufficient, if you directly replace the pump with a larger flow rate, it may increase power consumption and debugging work, but still does not solve the limitations caused by the thinnest pipe section or a certain throttling element."
    },
    {
      "type": "paragraph",
      "text": "FOREACH flow resistance calculator supports the creation of ID rows according to the inner diameter and length of the pipeline, and the creation of Cv rows according to the flow coefficient of the component. It can also perform calculation of pressure drop with known flow rate, calculation of flow rate with known pressure drop, loss statistics, fluid path PQ curve calculation and Excel export. It is suitable for converting hydraulic circuit concepts into preliminary pressure estimates, and is also suitable for recalculation using known parameters after testing."
    },
    {
      "type": "paragraph",
      "text": "Before using it, the flow paths and conditions to be analyzed should be determined. The following gives priority to steady state, single-phase liquid, and the same series path as an example; the calculation results are model estimates and cannot replace the performance confirmation of pumps, valves, and complete instruments in actual media."
    },
    {
      "type": "links",
      "items": [
        {
          "href": "/resources/calculators/fluid-resistance/",
          "label": "Open the FOREACH flow resistance calculator and create calculations based on the case in this article"
        }
      ]
    }
  ],
  "sections": [
    {
      "title": "1. What does flow resistance calculation describe?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Flow represents the volume passed per unit time, and pressure drop represents the pressure lost before and after the fluid passes through a section of pipeline or component. Under a given medium and flow path structure, to maintain a certain flow rate, a corresponding pressure difference is required. Flow resistance calculation quantifies this relationship to help determine the driving pressure requirements of fluid circuit design."
        },
        {
          "type": "subheading",
          "title": "Distinguish pipe friction from local losses"
        },
        {
          "type": "paragraph",
          "text": "The frictional loss mainly comes from the friction caused by the fluid flowing along the pipe wall, which is related to the inner diameter, length, speed and physical properties. Local losses are associated with inlets, turns, reductions, valves and other structures. The same external dimensions of the joints does not mean that the internal flow channels or resistances are the same; the selection of hoses with the same outer diameter does not mean that their effective inner diameters are the same."
        },
        {
          "type": "formula",
          "expression": "Δp_path = ΣΔp_friction + ΣΔp_local",
          "note": "This is a summary of resistance losses listed on the same defined path. The losses of different parallel branches cannot all be added directly as the required pressure difference between the two common nodes."
        },
        {
          "type": "paragraph",
          "text": "In small-bore fluid paths, a small diameter change can substantially change pressure drop. Increasing tube length generally increases frictional loss; increasing volumetric flow increases velocity. The pressure–flow relationship also depends on flow regime, so a square-law approximation does not apply under every condition."
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/fluid-resistance-guide/path.en.svg",
          "alt": "Schematic diagram of fluid circuit calculation: pump, pipeline, Cv elements and terminals, as well as pressure boundaries that need to be confirmed individually",
          "width": 1400,
          "height": 620,
          "caption": "First identify the series path to be analyzed, and then enter the pipeline and components segment by segment. The calculator summarizes the losses for the inputs; source vessel pressure, level difference, and terminal pressure are additionally factored into the complete system budget."
        }
      ]
    },
    {
      "title": "2. Which engineering problems are suitable for flow resistance calculation first?",
      "blocks": [
        {
          "type": "table",
          "headers": [
            "Engineering question",
            "Calculation output",
            "Decision supported"
          ],
          "rows": [
            [
              "How much pressure is required for the target flow rate?",
              "Total and component pressure losses at a specified flow",
              "Establish hydraulic line pressure budget and evaluate operating conditions of candidate pumps"
            ],
            [
              "Approximately how much liquid can flow under the available pressure difference?",
              "Estimated flow satisfying the entered loss model",
              "Determine whether the existing pipeline is likely to meet the cycle-time requirements"
            ],
            [
              "Where does the main resistance come from?",
              "Pressure drop, frictional and local losses, and contribution of each row",
              "Determine which pipe segments or components should be prioritized for adjustment"
            ],
            [
              "Is it more effective to increase the pipe diameter or replace the valve?",
              "Comparison of results of multiple input solutions",
              "Compare the benefits of modifications and reduce replacement of parts without basis"
            ],
            [
              "What happens when fluid viscosity increases?",
              "Pressure drop and flow regime at different densities and viscosities",
              "Identify the differences between pure water testing and actual media"
            ],
            [
              "How pressure needs change as processing speed increases",
              "fluid path PQ curve, calculation points and fitting results",
              "Check the resistance changes under different flow rates to determine the subsequent test range"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "In the early stage of the plan, it helps to compare pipelines and component combinations; in the prototype stage, it helps to understand the gap between the measured flow rate and the expected; in revision, it helps to evaluate the impact of changes in pipe length, inner diameter, valve type or medium. The purpose is to provide a basis for judgment, and the final solution must also meet installation, material compatibility, residual, cost and maintenance requirements."
        }
      ]
    },
    {
      "title": "3. Prepare a clear fluid path parameter table before calculation.",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Divide the pipe sections whose parameters change along the flow direction, and record the effective inner diameter, length and component information. Two sections of pipe with different inner diameters should not be replaced by only the total length and average inner diameter; local thin channels may account for a large proportion of resistance. When measuring the inside diameter, attention should be paid to tolerances, pressure deformation of the hose, and diameter reduction due to assembly."
        },
        {
          "type": "table",
          "headers": [
            "Input",
            "Data source",
            "Misunderstandings to avoid"
          ],
          "rows": [
            [
              "Fluid density, viscosity and temperature",
              "Actual media data, measured physical properties or reference values suitable for working conditions",
              "Using a preset medium with a similar name does not mean that the exact recipe has been described"
            ],
            [
              "Pipe inner diameter and pipe length",
              "Drawings, specifications and actual piping dimensions",
              "The outer diameter cannot be directly used as the inner diameter; the tool tube length is entered in mm."
            ],
            [
              "Component Cv",
              "Product information corresponding to model, valve position and test conditions",
              "The connection port size, Kv or maximum flow rate cannot be directly regarded as Cv"
            ],
            [
              "Local resistance coefficient ξ",
              "Data consistent with actual structure and applicable flow regimes",
              "If the same component has been described by Cv, the same loss should not be superimposed repeatedly."
            ],
            [
              "Target flow or available pressure differential",
              "Equipment action requirements or defined pressure boundaries",
              "The maximum pressure of the pump is not equal to the full amount available to overcome pipeline resistance"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "The tool allows the use of dynamic or kinematic viscosity. The unit should be confirmed before input: 1 mPa·s = 0.001 Pa·s, 1 cSt = 10⁻⁶ m²/s. The two viscosities satisfy μ = ρν, where μ is the dynamic viscosity, ρ is the density, and ν is the kinematic viscosity. Copying values directly from the data table into the input boxes of different units may cause an order of magnitude error."
        },
        {
          "type": "paragraph",
          "text": "In the current tool, water properties are calculated from the entered temperature. Not all other fluid presets have a full temperature-dependent property model. For a reagent with a defined temperature, concentration or formulation, obtain the corresponding density and viscosity and use custom inputs. A preset name does not establish the actual fluid properties."
        }
      ]
    },
    {
      "title": "4. What questions do the two calculation modes answer?",
      "blocks": [
        {
          "type": "subheading",
          "title": "Known flow rate: first calculate how much resistance this fluid path needs to overcome"
        },
        {
          "type": "paragraph",
          "text": "When the cleaning volume, delivery time or cycle target has been determined, the requirements are first converted into working flow rates. For example, 30 mL of liquid needs to be delivered within an effective delivery time of 30 s, with an average flow requirement of 60 mL/min. Using this flow rate to calculate section by section, the pressure loss of the current pipeline and component combination can be obtained."
        },
        {
          "type": "paragraph",
          "text": "For a steady-state series fluid circuit with no splitting and no leakage, the flow rate of each section should be the same. The current known flow mode allows the flow rate to be set row by row, and the value of each row is used in the calculation, so each row should be checked instead of just modifying the input box above and assuming that all pipe segments are synchronized. Whether the pressure drop summary of different flow lines has physical meaning needs to be determined by the actual flow path relationship."
        },
        {
          "type": "subheading",
          "title": "Known pressure drop: estimate the flow rate corresponding to a given resistance pressure difference"
        },
        {
          "type": "paragraph",
          "text": "When the pressure differential available for the analyzed path is known, the backcalculation mode looks for the flow rate that makes the calculated loss consistent with the target pressure differential. The current back calculation is based on the common flow of each row and is suitable for well-defined series paths. It does not automatically calculate how to divide the parallel branches."
        },
        {
          "type": "formula",
          "expression": "Δp_available,loss = Δp_drive − Δp_boundary − ρgΔz",
          "note": "For a simplified steady-state, incompressible system budget, driving differential pressure must also account for endpoint pressure differences and elevation. Include velocity-head differences separately when significant. The inverse calculation input must be the pressure differential available for the listed losses, not the pump maximum pressure before these other terms are accounted for."
        },
        {
          "type": "paragraph",
          "text": "If the drive is from a diaphragm pump, its supply capacity will vary with flow and inlet and outlet conditions. Back-calculating the flow rate can only show that the input pressure difference matches the resistance model, but cannot prove that the actual pump will definitely run at that point. It is also necessary to check the pump curve and corresponding suction conditions, and determine through actual measurement if necessary."
        }
      ]
    },
    {
      "title": "5. Calculation case: Should I change the pipe diameter first or replace the valve first?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "The following example uses the FOREACH calculation core: water at 20 °C, target flow 60 mL/min, and a 1 m straight tube in series with a Cv component. Additional local loss coefficient for the tube is zero. The Cv component uses the orifice-throttling model with a sharp-edged thin-plate orifice assumption. The table excludes source and outlet pressures, elevation and any unlisted components."
        },
        {
          "type": "paragraph",
          "text": "Create two rows in the tool: the first row type ID, flow rate 60 mL/min, inner diameter 1 mm, tube length 1000 mm, ξ = 0; the second row type Cv, flow rate 60 mL/min, Cv = 0.02. Calculate the original solution first, and then change only the inner diameter of the tube or Cv respectively, keeping the other conditions consistent."
        },
        {
          "type": "table",
          "headers": [
            "Scenario",
            "Straight pipe pressure drop",
            "Cv component pressure drop",
            "Total pressure drop"
          ],
          "rows": [
            [
              "A: Inner diameter 1 mm, Cv = 0.02",
              "40.80 kPa",
              "4.41 kPa",
              "45.21 kPa"
            ],
            [
              "B: Inner diameter 2 mm, Cv = 0.02",
              "2.55 kPa",
              "4.41 kPa",
              "6.96 kPa"
            ],
            [
              "C: Inner diameter 1 mm, Cv = 0.04",
              "40.80 kPa",
              "1.11 kPa",
              "41.92 kPa"
            ]
          ]
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/fluid-resistance-guide/comparison.en.svg",
          "alt": "Stacked comparison of tube and Cv-component pressure losses for scenarios A, B and C; the original design is dominated by tube friction",
          "width": 1400,
          "height": 740,
          "caption": "Model calculation results, not actual product measurements. About 90% of the loss in the original plan comes from the straight pipe; after increasing the pipe diameter, the main resistance shifts to the Cv element. Numerical rounding may cause minor differences between the individual values and the total value."
        },
        {
          "type": "paragraph",
          "text": "In the original plan, straight-tube losses accounted for approximately 90% of the total losses. Although increasing the Cv of the valve reduces the pressure drop of the valve, the straight pipe still consumes about 40.80 kPa; increasing the pipe diameter reduces the total pressure drop to about 6.96 kPa. The results support prioritizing research on pipe sizing rather than determining which component is limiting flow based solely on component name or shape."
        },
        {
          "type": "subheading",
          "title": "Why is the impact of pipe diameter changes so obvious?"
        },
        {
          "type": "formula",
          "expression": "Δp = 128μLQ / (πd⁴)",
          "note": "This relationship holds for fully developed laminar flow, Newtonian fluids, and circular rigid straight pipes, using SI units. The calculated Reynolds numbers of the two pipe diameters in this example are approximately 1269 and 635, and the laminar flow relationship can be used to understand the frictional losses."
        },
        {
          "type": "paragraph",
          "text": "Under the same flow rate, viscosity and length, when the inner diameter increases from 1 mm to 2 mm, the pressure drop of the laminar flow straight pipe drops to approximately 1/16 of the original value. At the same time, the geometric volume in the tube increases from approximately 0.785 mL to 3.142 mL, which is 4 times. The benefits of reducing pressure drop should be evaluated in conjunction with priming, fluid change volume, and carryover control, not just minimum resistance."
        },
        {
          "type": "paragraph",
          "text": "This example does not mean that all liquid lines should be enlarged first. In plan B, the loss of the valve is already greater than that of the straight pipe, and the benefits of continuing to thicken the pipe will decrease. The loss distribution should be re-examined after each change, and the new major limits should be used as a basis for further judgment."
        }
      ]
    },
    {
      "title": "6. What data should be looked at first in the result table?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Start with total pressure drop, then examine each row and its percentage contribution. Finally use velocity and Reynolds number to check the operating conditions and model assumptions. Detailed result fields explain the calculation; they are not all independent performance targets."
        },
        {
          "type": "table",
          "headers": [
            "Result",
            "Engineering meaning",
            "How to use"
          ],
          "rows": [
            [
              "Total pressure drop ΔPt",
              "The sum of the resistance losses entered",
              "Put in full pressure budget and compare with available driving conditions"
            ],
            [
              "Frictional loss ΔPy and local loss ΔPj",
              "Does the loss come from pipeline friction or local components?",
              "Decide whether to prioritize inspection of pipe diameter/length or components and reduction structures"
            ],
            [
              "Flow velocity and Reynolds number Re",
              "Flow state under given physical properties and effective cross-section",
              "Check flow regimes and model assumptions to identify transition zones or unusual inputs"
            ],
            [
              "The largest source of loss and its proportion",
              "A row with more concentrated losses under the current input conditions",
              "It is used to prioritize improvements and is not a fixed conclusion for all working conditions."
            ],
            [
              "Overall or equivalent Cv",
              "Use flow coefficient to express resistance under specific conditions",
              "Auxiliary comparison; it should not be regarded as constant product attributes under different flow rates, media or correction assumptions."
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Identify dominant resistance from pressure loss at the actual entered flow. Across rows with different flows, the smallest equivalent Cv does not necessarily produce the largest loss. Even when one component dominates in one condition, a different constraint may emerge after the tubing or operating flow changes."
        }
      ]
    },
    {
      "title": "7. How the PQ curve helps understand design margins",
      "blocks": [
        {
          "type": "paragraph",
          "text": "The PQ curve in the tool is generated based on the calculation results of the input fluid path under a set of flow rates, and the vertical axis is the resistance loss. It shows how much pressure drop this model path needs to overcome when changing flow, not the supply curve of a specific pump."
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/fluid-resistance-guide/curve.en.svg",
          "alt": "According to the fluid path resistance curves of Scheme A and Scheme B generated by the calculation core, mark the calculation point of 60 mL/min.",
          "width": 1400,
          "height": 800,
          "caption": "For the same fluid and Cv, the two tube diameters produce different system resistance curves. These are model calculations; the highlighted points are at 60 mL/min. No pump curve or static pressure boundary is included."
        },
        {
          "type": "paragraph",
          "text": "To determine whether a pump is compatible with a system, the performance of the pump in the same medium and related conditions should be compared to the system requirements including boundary pressures and liquid level differences in the same pressure benchmark. The matching of the two needs to meet the suction conditions, operating range and stability requirements. The current tool does not automatically import pump curves, solve for pump-system intersections, or recommend specific models."
        },
        {
          "type": "paragraph",
          "text": "In per-row flow mode, curve generation scales every row flow by the same factor. This parameter sweep preserves the ratios entered by the user; it does not solve a parallel network again at each pressure. For unequal row flows, clearly identify the reference flow on the horizontal axis and each row’s relationship to it."
        },
        {
          "type": "paragraph",
          "text": "The fitting formula is suitable for describing the trend of the calculated interval and should not be extrapolated far away from the sampling range. R², residuals and other fitting indicators evaluate the closeness of the fitting to the calculated point; even if the fitting error is small, it cannot prove that the physical properties, component parameters or calculation model are consistent with the actual device."
        }
      ]
    },
    {
      "title": "8. Small bores, low Reynolds numbers and Cv data",
      "blocks": [
        {
          "type": "paragraph",
          "text": "After the fluid path enters a small diameter or a lower flow rate range, the viscous effect may significantly change the resistance characteristics. The Reynolds number, Re = ρud/μ, relates density, mean velocity, inner diameter, and dynamic viscosity. It helps in identifying flow regimes, but accurate losses for all complex components cannot be derived from just one Re value."
        },
        {
          "type": "paragraph",
          "text": "Tube calculations use the Darcy–Weisbach form with a Churchill friction-factor estimate. The interface has no wall-roughness input, so the current tube model assumes a smooth wall. Orifice and Cv corrections are model estimates; they do not replace measured pressure-drop curves for every valve geometry or the complete correction procedures of applicable standards."
        },
        {
          "type": "paragraph",
          "text": "Select Cv data for the actual model, valve position, fluid and calibration conditions. An equivalent orifice diameter derived from Cv is a model representation, not a measurement of the product’s true minimum bore. It cannot directly establish particle passage capability, clogging risk or manufacturing dimensions."
        },
        {
          "type": "paragraph",
          "text": "Fluid-property assumptions have limits too. Whole blood and some polymer solutions may behave as non-Newtonian fluids; one fixed viscosity is only an approximation under stated assumptions. The air preset is not a complete compressible-flow model. Large pressure differences, substantial density changes, choked flow and mixed gas/liquid conditions need more suitable models or measurement."
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/resources/technical-articles/cv-kv-correction-for-microfluidics/",
              "label": "Further reading: Cv/Kv calculation and correction in microfluidics and precision throttling"
            }
          ]
        }
      ]
    },
    {
      "title": "9. From calculation to actual measurement: How to determine where the deviation comes from",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Define the comparison boundaries first. Measure pressure at the same two nodes used in the calculation. If the space between gauges also includes unmodelled filters, quick connectors or tubing, a higher measured loss does not by itself prove a formula error. Account for hydrostatic pressure differences when measurement taps are at different heights."
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Establish a baseline: test with known media, temperature, short pipes and confirmed component parameters, and record stable flow and pressure difference.",
            "Check Units and Geometry: Check ID, Length, Flow Units, Cv/Kv, Density and Viscosity inputs to make sure resistance is not being double counted.",
            "Gradually connect to the actual fluid path: each time a section of pipe or component is added, the pressure drop increment is compared and the position where the deviation begins to appear is located.",
            "Boundary conditions are covered: checking low fluid levels, filter loading, temperature changes, different valve positions and operating flows.",
            "Preserve original data: record test devices, measuring points, instruments, media, parameter versions and exceptions, not just the final average."
          ]
        },
        {
          "type": "paragraph",
          "text": "The instantaneous flow and pressure of a diaphragm pump may pulsate. When comparing with the steady-state values in the calculator, the average time window for pressure and flow should be identified, and the peak values associated with the equipment should be recorded. Similar averages are not a substitute for transient pressure, nozzle fluctuations, or acceptance of cleaning effectiveness."
        },
        {
          "type": "paragraph",
          "text": "If there is no flow, intermittent liquid discharge, or a gradual decrease with running time, air leakage, bottle cap ventilation, air bubbles, valve status, blockage, and power supply should be checked at the same time. Flow resistance calculations can help evaluate resistance assumptions but will not automatically detect these failures, nor will they prove material compatibility, self-priming success, or long-term reliability."
        }
      ]
    },
    {
      "title": "10. Export calculation results so that plan comparisons can be traced",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Once the calculation is complete, it can be exported to Excel and the file contains the calculation results, statistical summary, and PQ curve data. It is suitable for retaining solution versions, comparing component changes and communicating with suppliers, but should be used in conjunction with input conditions, fluid circuit diagrams and test data."
        },
        {
          "type": "paragraph",
          "text": "It is recommended to fill in identifiable names for pipe sections and components, such as \"cleaning fluid bottle to pump inlet\" and \"1 mm pipe section after the valve group\", and indicate the data source or special status in the remarks. Separately record the media recipe, temperature, source of physical properties, Cv model and geometric assumptions, software version and calculation date; the exported file does not automatically contain all the context required for the project."
        },
        {
          "type": "paragraph",
          "text": "When comparing A/B scenarios, keep the media, target flow rate, and other unadjusted parameters consistent and make it clear what was changed each time. If multiple conditions change at the same time, they should be explained one by one to avoid lumping together the benefits caused by the decrease in viscosity, the increase in pipe diameter, and the change in valve Cv."
        }
      ]
    },
    {
      "title": "11. Use the results to discuss FOREACH pump, valve and tubing selection",
      "blocks": [
        {
          "type": "paragraph",
          "text": "When selecting a FOREACH miniature pump or associated valves, fittings and tubing, provide target flow, individual pressure losses, suction conditions and outlet pressure. These support a more useful discussion than a free-flow value alone. Calculations help define the conditions under which candidate configurations must be validated and show whether tubing should be optimized first."
        },
        {
          "type": "paragraph",
          "text": "If the current main loss comes from slender pipe sections, you can first compare the inner diameter and length; if it comes from components, you need the Cv, pressure drop curve and medium suitability of the corresponding valve position or model. If the structure cannot be adjusted and higher pressure is indeed required, then evaluate the candidate pump based on the pump curve, interface pressure bearing, and overall machine protection design. The calculator itself does not guarantee that a particular model will meet equipment requirements."
        },
        {
          "type": "paragraph",
          "text": "When submitting a request, it is recommended to attach a fluid path diagram, input parameters, calculation results, and measured flow and pressure. FOREACH can carry out model selection and engineering communication based on relevant component parameters, and further clarify the data and prototype verification conditions that need to be supplemented."
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/resources/calculators/fluid-resistance/",
              "label": "Open flow resistance calculator"
            },
            {
              "href": "/resources/technical-articles/foreach-miniature-diaphragm-pump-oem-integration/",
              "label": "Further reading: FOREACH diaphragm pump OEM integration, operating points and instrument validation"
            },
            {
              "href": "/products/",
              "label": "View FOREACH pumps, valves and fluid line components"
            }
          ]
        }
      ]
    }
  ],
  "faqTitle": "Flow Resistance Calculator FAQ",
  "faqItems": [
    {
      "question": "Can a flow resistance calculator tell me directly which pump I should buy?",
      "answer": "Pump selection cannot be completed directly. It calculates the resistance relationship of the input fluid path, and the results are combined with the pump curve, suction conditions, terminal pressure, liquid level difference, medium and cycle-time requirements to form a candidate configuration and verify it."
    },
    {
      "question": "Is the flow calculated back from the known pressure drop the actual flow?",
      "answer": "It is an estimated value obtained under the condition that the input physical properties, pipeline and component models are established. Whether the actual driving source can provide the corresponding pressure difference, whether there are unaccounted losses, as well as bubbles, blockage and pulsation, etc., may affect the installation results."
    },
    {
      "question": "Can multiple parallel branches be added directly after all input?",
      "answer": "The sum of the losses of different parallel branches cannot be regarded as the system pressure difference between common nodes. The current tool does not automatically solve the flow distribution of the parallel pipe network; the path, known flow rate and pressure boundary should be clearly defined first, and then analyzed according to the applicable method."
    },
    {
      "question": "Why is increasing the pipe diameter sometimes more effective than increasing the valve Cv?",
      "answer": "Depends on the original solution loss distribution. If the main pressure drop comes from a long slender pipe section, increasing the valve Cv will only reduce a smaller portion of the loss. In the case of this article, the original straight pipe accounts for about 90% of the total loss, so changing the pipe diameter is more effective, but at the same time, the impact of increasing the fluid path volume needs to be evaluated."
    },
    {
      "question": "The fitting of the tool curve is very good, does it mean that the calculation is very accurate?",
      "answer": "The fitting index only shows that the fitting curve is close to the calculation point, and cannot verify whether the physical properties, geometric assumptions or component data are consistent with the actual device. Engineering accuracy still needs to be confirmed through appropriate pressure and flow tests."
    },
    {
      "question": "Once a certain medium is entered, can the material compatibility of the pump be judged?",
      "answer": "No. Flow resistance calculations use physical properties to estimate flow loss and do not evaluate the chemical compatibility of pump heads, diaphragms, valves, seals, or tubing. Material and process suitability need to be confirmed individually."
    }
  ],
  "cta": {
    "title": "Discuss component options using your fluid-path parameters and calculation results",
    "description": "Please provide the medium, temperature, target flow, pipeline size, component parameters, inlet and outlet pressures and calculated or measured results so that FOREACH can assist in determining the key points of selection and verification.",
    "contactLabel": "Submit fluid-path requirements",
    "productsLabel": "Use the flow resistance calculator",
    "productsHref": "/resources/calculators/fluid-resistance/"
  }
} satisfies DiaphragmPumpEngineeringArticleCopy;
