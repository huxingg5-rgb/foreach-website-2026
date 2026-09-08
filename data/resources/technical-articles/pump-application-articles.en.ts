import type { PumpApplicationArticleCopy, PumpApplicationArticleSlug } from "./pump-application-articles.types";

export const pumpApplicationArticlesEn = {
  "clinical-chemistry-piston-pump-100-250-500-ul-selection": {
    "metadata": {
      "title": "Choosing a 100, 250 or 500 μL Piston Pump for Clinical Chemistry Dosing",
      "seoTitle": "100, 250 or 500 μL Piston Pump Selection for Clinical Chemistry | FOREACH",
      "seoDescription": "Compare dose volume, stroke utilization, dispensing count and refill timing, then assess FOREACH EA, SM and TM configurations using the actual clinical chemistry fluid path.",
      "coverImage": "/images/resources/technical-articles/pump-application-guides/piston-capacity-series.png",
      "coverAlt": "FOREACH piston pumps in multiple capacities, including 100, 250 and 500 μL"
    },
    "deck": "Compare dose volume, stroke utilization, dispensing count and refill timing, then assess FOREACH EA, SM and TM configurations using the actual clinical chemistry fluid path.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "Start a clinical chemistry piston-pump selection by identifying the fluidic task: direct reagent dispensing, sample metering, diluent addition or system-liquid actuation of a sampling tip. The 100, 250 and 500 μL values describe nominal pump capacities. The decision depends on the volume actually delivered per dose, the number of doses required after one aspiration and the time available for the complete sequence."
      }
    ],
    "sections": [
      {
        "title": "1. Turn the dosing task into explicit inputs",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When reagent passes through the pump chamber, compatibility must cover the head, piston, seals and valves. When system liquid actuates a sample at the tip, the liquid interface, residual sample and complete transfer also need attention. Similar commanded volumes can therefore require different wetted paths and verification methods."
          },
          {
            "type": "table",
            "headers": [
              "Input",
              "What to specify",
              "Decision it supports"
            ],
            "rows": [
              [
                "Dose volumes",
                "Minimum, typical and maximum delivered volume, in μL",
                "Operating stroke range and test points"
              ],
              [
                "Dispensing sequence",
                "Doses after each aspiration; equal or variable volumes",
                "Capacity budget and aspiration count"
              ],
              [
                "Time window",
                "Aspiration, valve switching, dispensing, settling and refilling",
                "Complete cycle feasibility"
              ],
              [
                "Fluid path",
                "Liquid composition, temperature, levels, backpressure, valves and tip",
                "Materials and actual delivery"
              ],
              [
                "Integration",
                "Capacity-specific CAD, interfaces, cables and drive requirements",
                "Series and configuration selection"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Complete the task definition before ranking capacities. An industry name does not define a pump size, and different metering channels in one instrument need not use the same capacity."
          }
        ]
      },
      {
        "title": "2. A 20 μL command uses different fractions of the stroke",
        "blocks": [
          {
            "type": "formula",
            "expression": "Stroke utilization ≈ commanded dose volume / corresponding full-stroke capacity",
            "note": "An initial comparison for approximately linear displacement and volume, with consistent command and usable-stroke definitions. This is not a prediction of delivered-volume accuracy."
          },
          {
            "type": "table",
            "headers": [
              "Hypothetical 20 μL command",
              "100 μL capacity",
              "250 μL capacity",
              "500 μL capacity"
            ],
            "rows": [
              [
                "Nominal stroke utilization",
                "20%",
                "8%",
                "4%"
              ],
              [
                "Verification focus",
                "Actual 20 μL delivery and cycle time",
                "Small-stroke delivery and repeated dispensing",
                "Smaller-stroke delivery, refill benefit and space"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "The percentages describe motion range only. They do not prove that the 100 μL pump is more accurate, or justify transferring a full-stroke accuracy specification to a 4% stroke. Transmission behavior, valve timing, bubbles, tubing compliance, aspiration and dispense speed, and the delivery tip all matter. Command resolution and nominal volume per step do not establish a minimum reliable dose."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/piston-pump-accuracy-repeatability-resolution/",
                "label": "Accuracy, repeatability and resolution explained"
              }
            ]
          }
        ]
      },
      {
        "title": "3. Include repeated doses and reserved volume in the budget",
        "blocks": [
          {
            "type": "formula",
            "expression": "n = floor((Vusable − Vreserve) / Vdose)",
            "note": "For equal doses, n is an initial estimate of complete dispenses per aspiration. Vusable is the confirmed available aspirated volume, Vreserve is the process reserve and Vdose is the commanded dose. Vusable must be at least Vreserve, and Vdose must be positive."
          },
          {
            "type": "notice",
            "text": "Arithmetic example only: dispense 20 μL into each of eight cups, reserve 10 μL after each aspiration, and temporarily assume usable aspirated volume equals nominal capacity. The 10 μL reserve is not a common FOREACH specification. Confirm usable stroke, priming and reserve requirements for the actual fluid path.",
            "label": "Example assumptions"
          },
          {
            "type": "table",
            "headers": [
              "Candidate capacity",
              "Complete doses per aspiration",
              "Aspirations for eight cups",
              "Refills after the initial aspiration"
            ],
            "rows": [
              [
                "100 μL",
                "4",
                "2",
                "1"
              ],
              [
                "250 μL",
                "12",
                "1",
                "0"
              ],
              [
                "500 μL",
                "24",
                "1",
                "0"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Both 250 and 500 μL meet the assumed eight-cup budget without a further refill. Increasing capacity beyond that point does not reduce refills in this batch. Compare actual dose performance, space and liquid-change requirements next. Recalculate individual commands if usable volume or dose sizes differ."
          },
          {
            "type": "figure",
            "src": "/images/resources/technical-articles/pump-application-guides/piston-cycle-en.svg",
            "alt": "Reservoir, switching valve and piston pump dispensing into multiple cups",
            "width": 1200,
            "height": 500,
            "caption": "Fluid path and sequence schematic. Use the actual valve and drive configuration; the drawing does not imply integrated accessories on a particular model."
          }
        ]
      },
      {
        "title": "4. Compare the complete sequence, not dispense speed alone",
        "blocks": [
          {
            "type": "formula",
            "expression": "Tbatch = Σ(Taspiration + Tvalve + Tdispense + Tsettling + Tmotion and other required actions)",
            "note": "Count each action as it actually occurs. Where actions overlap, determine the critical path from the control sequence instead of adding overlapping times twice."
          },
          {
            "type": "paragraph",
            "text": "Avoiding a refill saves time only when that refill constrains the critical path. An instrument that aspirates while another mechanism moves differs from one that stops dosing to refill. A larger pump may also change aspiration travel, fluidic connections and installation constraints."
          },
          {
            "type": "list",
            "items": [
              "Keep batch size, doses and liquid constant and retain the complete command log.",
              "Separate the first dispense, the first dispense after refill, intermediate dispenses and the last dispense.",
              "Check delivered volume before ranking cycle time.",
              "When increasing speed, examine bubbles, valve response and the end of delivery. Motor-command completion does not establish complete delivery into the cup."
            ]
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/piston-pump-acceleration-deceleration-curves/",
                "label": "Acceleration and deceleration for piston pumps"
              },
              {
                "href": "/resources/technical-articles/precision-piston-pump-backlash-compensation/",
                "label": "Direction reversal and backlash compensation"
              }
            ]
          }
        ]
      },
      {
        "title": "5. Compare the actual EA, SM and TM configurations",
        "blocks": [
          {
            "type": "paragraph",
            "text": "FOREACH series information includes 100, 250 and 500 μL capacity options within EA, SM and TM. Check series positioning separately from the capabilities of an individual configuration. Equal nominal capacity does not establish matching dimensions, materials, interfaces, drive requirements or performance conditions."
          },
          {
            "type": "table",
            "headers": [
              "Series",
              "Main comparison at this stage",
              "Information to confirm"
            ],
            "rows": [
              [
                "EA precision piston pump",
                "Matching a broad-capacity platform to the channel task",
                "Capacity-specific drawing, materials, interface and control"
              ],
              [
                "SM miniature piston pump",
                "Pump, valve, tubing and cable placement in a compact instrument",
                "Complete installation envelope and performance at working dose"
              ],
              [
                "TM ultra-compact piston pump",
                "Integration where space is more restricted",
                "Model drawing; displayed PMMA head and ceramic piston, with other configurations reviewed separately"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "EA and SM series information includes 1/4-28 UNF or M6 fluidic interfaces; displayed TM configurations use 6-40 UNF. Confirm the actual drawing and allow for fitting projection, tubing bends and maintenance. EA full-stroke metrics, SM repeatability information and TM configuration-specific validation must not be combined into one promise for all three series."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/products/pumps/piston-pump/standard-piston-pump/",
                "label": "EA precision piston pumps"
              },
              {
                "href": "/products/pumps/piston-pump/miniature-piston-pump/",
                "label": "SM miniature piston pumps"
              },
              {
                "href": "/products/pumps/piston-pump/ultra-compact-piston-pump/",
                "label": "TM ultra-compact piston pumps"
              },
              {
                "href": "/resources/technical-articles/piston-pump-head-material-selection/",
                "label": "Pump-head and complete wetted-path material selection"
              }
            ]
          }
        ]
      },
      {
        "title": "6. Verify the working doses, not just the full stroke",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Cover the minimum, typical and maximum doses actually used, together with operating states that can change delivery. Choose repetition counts and acceptance criteria for the instrument requirement and verification purpose; a generic article cannot replace the project acceptance plan."
          },
          {
            "type": "table",
            "headers": [
              "Record group",
              "What to retain"
            ],
            "rows": [
              [
                "Sample and circuit",
                "Model, configuration, sample ID, valve, tip, tubing, liquid levels and backpressure"
              ],
              [
                "Liquid and measurement",
                "Actual medium, temperature, density, instrument, method and uncertainty"
              ],
              [
                "Command conditions",
                "Dose or steps, speeds, valve timing, settling and standby duration"
              ],
              [
                "Raw results",
                "Individual masses or volumes, first-dose/refill/steady-state labels and anomalies"
              ],
              [
                "Acceptance",
                "Accuracy, repeatability, delivery time, tip behavior and the basis for each criterion"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Gravimetric testing requires density at the relevant liquid temperature and control of evaporation, retained droplets and transfer losses. A formal procedure must also evaluate effects such as buoyancy corrections and measurement uncertainty. Dividing a mass reading by density is not, by itself, a complete calibration procedure."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "https://www.nist.gov/publications/nistir-7383-selected-procedures-volumetric-calibrations-2019-ed",
                "label": "Method background: NIST volumetric calibration procedures; not certification of this pump’s microliter performance"
              }
            ]
          }
        ]
      },
      {
        "title": "7. Record a reasoned selection",
        "blocks": [
          {
            "type": "paragraph",
            "text": "State the dose and timing requirements, why the capacity was retained, why the series and materials were chosen, what conditions were tested and what remains unverified. For the arithmetic task above, 250 μL is one candidate for reducing refills. That is not a final recommendation for a real clinical chemistry instrument."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/products/pumps/piston-pump/",
                "label": "Explore FOREACH piston-pump products and series"
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Frequently asked questions",
    "faqItems": [
      {
        "question": "Why not always choose 500 μL?",
        "answer": "If 250 μL already covers the required repeated doses, 500 μL may not remove another refill. Compare actual small-dose performance, timing, installation and liquid-change requirements."
      },
      {
        "question": "Does a 100 μL pump dispense only 100 μL at a time?",
        "answer": "No. Nominal capacity and dose volume are different. The usable dose range depends on commands, effective stroke and actual delivery verification."
      },
      {
        "question": "Can the example 10 μL reserve be used in firmware?",
        "answer": "Not without verification. It is an illustrative budget value, not a product requirement. Priming, usable stroke, valve paths and dispensing strategy determine the real reserve."
      },
      {
        "question": "Are equal-capacity EA, SM and TM pumps interchangeable?",
        "answer": "Capacity alone cannot establish interchangeability. Verify drawings, interfaces, materials, valve and drive arrangements, and performance at the actual dose and timing."
      },
      {
        "question": "What can be done before actual reagent testing?",
        "answer": "Use formal specifications and clearly stated calculations to shortlist candidates and prepare the test circuit. Actual medium compatibility and delivered-volume performance still require verification."
      }
    ],
    "cta": {
      "title": "Turn your operating conditions into a testable pump specification",
      "description": "Share the liquid, target volume or flow, timing, fluid path and installation constraints to review the pump configuration and verification method.",
      "contactLabel": "Contact technical support",
      "productsLabel": "Explore related products",
      "productsHref": "/products/pumps/piston-pump/"
    }
  },
  "diaphragm-pump-multiple-wash-nozzles-flow-balance": {
    "metadata": {
      "title": "Why do multiple wash nozzles deliver different flows from one miniature diaphragm pump?",
      "seoTitle": "Multiple wash nozzles: diaphragm pump flow balancing | FOREACH",
      "seoDescription": "Calculate demand from the volume and timing of each wash nozzle, separate insufficient pump output from unequal distribution, and verify each branch with collection and pressure measurements.",
      "coverImage": "/images/resources/technical-articles/pump-application-guides/dpl60-brushless-side-photo.jpg",
      "coverAlt": "Side view of a FOREACH DPL60 miniature diaphragm pump showing the pump head and fluid ports"
    },
    "deck": "Calculate demand from the volume and timing of each wash nozzle, separate insufficient pump output from unequal distribution, and verify each branch with collection and pressure measurements.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "One pump and one manifold do not guarantee equal delivery at every wash nozzle. A clinical chemistry analyzer or another instrument with parallel wash paths needs two checks: sufficient total flow at the actual operating pressure, and acceptable delivery through each branch. A total-flow measurement alone can conceal an under-supplied nozzle. All numerical examples below are hypothetical calculations, not measured product results."
      }
    ],
    "sections": [
      {
        "title": "1. Define the wash task at each nozzle",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Replace a general request for a wash pump with measurable requirements: the number of simultaneously active nozzles, the volume required per nozzle, the open-valve window, whether pre-filling is allowed, and the acceptance criteria for the first and subsequent cycles. Sequential operation changes both peak flow demand and the time needed to complete a batch."
          },
          {
            "type": "table",
            "headers": [
              "Required input",
              "Why it matters",
              "What to record"
            ],
            "rows": [
              [
                "Volume and tolerance per nozzle",
                "Sets the delivery requirement for each branch",
                "Individual collected volumes, not only their average"
              ],
              [
                "Effective delivery time",
                "Priming, startup and valve delays consume the window",
                "Delay between the command and actual liquid delivery"
              ],
              [
                "Number of open branches",
                "Sets peak simultaneous demand",
                "Normal and maximum concurrency"
              ],
              [
                "Liquid, temperature and fluid path",
                "Affects resistance, compatibility and operating point",
                "Liquid batch, temperature, bore, length and components"
              ]
            ]
          }
        ]
      },
      {
        "title": "2. Calculate total demand from individual delivery volumes",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Assume four nozzles operate together and each must deliver 3 mL in two seconds of effective liquid delivery. Each branch requires an average of 90 mL/min, giving a total of 360 mL/min. If two seconds is only the controller command window, subtract any interval without useful delivery before calculating the requirement."
          },
          {
            "type": "formula",
            "expression": "Qᵢ = 60 × Vᵢ / tᵢ; Qtotal = ΣQᵢ",
            "note": "With V in mL and t in seconds, Q is in mL/min. Sum concurrently active branches; this example includes no separate bypass or return flow."
          },
          {
            "type": "paragraph",
            "text": "FOREACH DPL30 and DPL60 selection guides describe 300 mL/min and 600 mL/min flow classes respectively. The DPL30 nominal figure does not establish that it can meet this hypothetical 360 mL/min duty. DPL60 is a candidate for further evaluation: its 600 mL/min figure is not automatically the flow available through the installed tubing, valves and nozzles. Confirm the operating point at the specified voltage, liquid, inlet conditions and required outlet pressure."
          },
          {
            "type": "notice",
            "text": "The 360 mL/min value is derived from an assumed wash task. It is neither a specification for a particular analyzer nor a universal recommendation for parallel wash systems."
          }
        ]
      },
      {
        "title": "3. Adequate total flow does not establish equal distribution",
        "blocks": [
          {
            "type": "figure",
            "src": "/images/resources/technical-articles/pump-application-guides/wash-branches-en.svg",
            "alt": "A pump feeds a manifold, with separate tubing and nozzles discharging into individually measured collection vessels",
            "width": 1200,
            "height": 500,
            "caption": "Conceptual layout: verify total supply and individual delivery separately. The drawing specifies no real tube dimensions or product performance."
          },
          {
            "type": "paragraph",
            "text": "For steady, approximately incompressible flow without a bypass or significant fluid storage, total flow equals the sum of branch flows. Each branch still responds to its own effective pressure difference and resistance. A common-pressure approximation is useful only when manifold inlet pressures, outlet pressures and elevation conditions are sufficiently similar."
          },
          {
            "type": "paragraph",
            "text": "The common supply tube and manifold inlet carry total flow; each downstream tube carries only its own branch flow. Applying total flow to every branch calculation overstates branch losses. Applying one branch flow to the common tube understates shared losses."
          },
          {
            "type": "table",
            "headers": [
              "Source of difference",
              "Possible observation",
              "Where to inspect"
            ],
            "rows": [
              [
                "Bore, length or tube deformation",
                "One branch remains consistently low",
                "Tube tolerances, insertion depth, bends and pinched sections"
              ],
              [
                "Nozzle or valve differences",
                "The low-flow position follows a swapped component",
                "Nozzle bore, contamination, valve opening and timing"
              ],
              [
                "Outlet elevation or immersion",
                "Distribution changes after installation changes",
                "Nozzle height, immersion and receiving-vessel pressure"
              ],
              [
                "Bubbles or compliant storage",
                "The first cycle differs from later cycles",
                "Trapped gas, tube expansion and priming state"
              ]
            ]
          }
        ]
      },
      {
        "title": "4. Use bore sensitivity as a diagnostic model",
        "blocks": [
          {
            "type": "formula",
            "expression": "ΔP = 128 μ L Q / (π d⁴)",
            "note": "For steady, fully developed laminar flow of a Newtonian liquid in a rigid circular straight tube. μ is dynamic viscosity, L is length and d is internal diameter. Consistent SI units give pressure loss in Pa."
          },
          {
            "type": "paragraph",
            "text": "For an otherwise identical ideal tube segment, a 10% smaller bore gives about 1/0.9⁴ = 1.52 times the resistance. At the same pressure difference, flow becomes approximately 0.9⁴ = 65.6% of the original value. This calculation describes sensitivity in one idealized segment; it does not predict a 34.4% reduction for the complete pump system."
          },
          {
            "type": "paragraph",
            "text": "An installed path also contains nozzle openings, fittings, valves, filters and pulsating flow. Short orifices, developing flow, turbulence or strongly deformable tubing need appropriate models or component data. Use available pressure-loss curves and verify the actual assembly. Changes to the network can also move the pump operating point."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "https://openstax.org/books/college-physics/pages/12-4-viscosity-and-laminar-flow-poiseuilles-law",
                "label": "Physics reference: OpenStax on viscosity, laminar flow and Poiseuille’s law"
              }
            ]
          }
        ]
      },
      {
        "title": "5. Measure the total and every branch in the same test",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Prime the system as designed. Fix the liquid, temperature, supply voltage, reservoir level, installation height and tubing. Label each nozzle and collection vessel.",
              "Collect each branch over the actual control sequence. Calculate Qᵢ = Vᵢ/t where useful; for a short wash pulse, delivered volume per event is the primary measurement.",
              "Record inlet, outlet or manifold pressure with sensor locations, ranges and sampling rates. A slow average may hide opening transients.",
              "Compare the summed branch collection with total delivery over the same window. Account separately for bypass flow, return flow, leakage and changes in stored liquid.",
              "Evaluate startup, repeated operation and maximum concurrency separately. Set repetitions and acceptance limits from the instrument wash requirements before testing."
            ]
          },
          {
            "type": "paragraph",
            "text": "If total delivery passes but one branch fails, investigate distribution and timing. If every branch is low, use pressure measurements to distinguish insufficient supply from common-path losses, inlet limitations or electrical supply issues. When swapping a suspect nozzle or tube, change one factor at a time and observe whether the deviation follows that component."
          }
        ]
      },
      {
        "title": "6. Compare changes against both timing and pressure",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Change",
              "Potential benefit",
              "What must be checked again"
            ],
            "rows": [
              [
                "Standardize branch dimensions and assembly",
                "Reduces manufacturing and routing differences",
                "Nozzles, valves and outlet elevations still matter"
              ],
              [
                "Add controlled resistance to higher-flow branches",
                "Can balance a specified operating condition",
                "Consumes pressure margin and changes total flow"
              ],
              [
                "Use grouped or sequential washing",
                "Reduces simultaneous demand",
                "Recalculate batch timing, valve duty and controls"
              ],
              [
                "Change the pump or improve the common supply path",
                "Can improve total delivery at the operating point",
                "Does not automatically remove unequal branch resistance"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Start with the delivery required by the failing branch. Raising voltage, selecting a larger pump or adding restrictors without individual measurements may change the total while leaving the root cause unresolved. Repeat the same acceptance method after adjustment, including every nozzle, the first cycle and total wash timing."
          }
        ]
      },
      {
        "title": "7. Continue to the related selection guides",
        "blocks": [
          {
            "type": "paragraph",
            "text": "This page addresses distribution from one pump into several wash paths. Pump selection also requires liquid compatibility, actual pressure and control requirements. If delivery declines with running time, investigate reservoir venting and the inlet supply as a separate condition."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/ivd-cleaning-wash-rinse-pump-diaphragm-pump/",
                "label": "Wash and rinse pump selection for instrument fluid paths"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "Using a flow–pressure curve to locate the operating point"
              },
              {
                "href": "/resources/technical-articles/tube-inner-diameter-affects-diaphragm-pump-flow/",
                "label": "How tube bore affects miniature diaphragm pump flow"
              },
              {
                "href": "/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide/",
                "label": "DPL30 liquid diaphragm pump selection guide"
              },
              {
                "href": "/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide/",
                "label": "DPL60 liquid diaphragm pump selection guide"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-drop-reservoir-venting/",
                "label": "Declining flow during operation: checking reservoir venting"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "Miniature liquid diaphragm pumps"
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Frequently asked questions",
    "faqItems": [
      {
        "question": "Can I divide total flow by the nozzle count?",
        "answer": "That gives an average, not proof that every nozzle meets its requirement. Collect individual delivery volumes over the same command window and check the minimum delivery and permitted variation."
      },
      {
        "question": "Do equal tube lengths guarantee equal flow?",
        "answer": "No. Bore, nozzles, valves, fittings, outlet elevation and trapped gas also matter. Equal length addresses only one part of assembly consistency."
      },
      {
        "question": "Will a 600 mL/min pump solve the problem?",
        "answer": "More supply capacity is relevant when total flow at the actual operating point is insufficient. Unequal branch resistance still requires separate attention, and the nominal flow must be checked against the pump curve."
      },
      {
        "question": "Should I measure average flow or volume per wash?",
        "answer": "Average flow can help diagnose continuous delivery. For short wash events, include delivered volume and completion time because startup, priming and valve movement can occupy a substantial part of the window."
      },
      {
        "question": "What percentage of imbalance is acceptable?",
        "answer": "There is no single limit for all instruments. Derive the acceptance criteria from cleaning performance, residual-contamination requirements and the measurement method, then allocate tolerances across the pump, valves, tubing and controls."
      }
    ],
    "cta": {
      "title": "Turn your operating conditions into a testable pump specification",
      "description": "Share the liquid, target volume or flow, timing, fluid path and installation constraints to review the pump configuration and verification method.",
      "contactLabel": "Contact technical support",
      "productsLabel": "Explore related products",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  },
  "diaphragm-pump-flow-drop-reservoir-venting": {
    "metadata": {
      "title": "Flow starts normally, then falls: how do you check reservoir venting for a miniature diaphragm pump?",
      "seoTitle": "Diaphragm pump flow drop: reservoir venting checks | FOREACH",
      "seoDescription": "Record reservoir headspace pressure, pump inlet pressure and delivery together to investigate restricted venting and distinguish liquid-level changes, blockage, air leaks and outlet backpressure.",
      "coverImage": "/images/resources/technical-articles/pump-application-guides/dpl30-brushless-rear-photo.jpg",
      "coverAlt": "Rear view of a FOREACH DPL30 miniature diaphragm pump showing the pump body and fluid ports"
    },
    "deck": "Record reservoir headspace pressure, pump inlet pressure and delivery together to investigate restricted venting and distinguish liquid-level changes, blockage, air leaks and outlet backpressure.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "A miniature diaphragm pump that initially delivers normally and then slows down is not necessarily damaged. When drawing from a reservoir, one useful check is whether gas can replace the withdrawn liquid as intended. Falling delivery can also result from a changing liquid level, filters, tubing or outlet load. The symptom alone does not establish a blocked vent."
      }
    ],
    "sections": [
      {
        "title": "1. Identify how the container compensates for withdrawn liquid",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Rigid bottles, collapsible bags and pressure-controlled reservoirs work differently. A rigid bottle commonly needs a designed gas-exchange or pressure-control path. A collapsible bag can compensate through deformation, while a pressurized reservoir requires its regulator and gas supply to be checked. Review the fluid schematic and container instructions before deciding whether a sealed condition is abnormal."
          },
          {
            "type": "paragraph",
            "text": "For a vented rigid bottle, inspect the complete gas path: ambient inlet, filter, connecting tube, cap fitting and internal opening. A visible hole does not prove adequate vent capacity during operation. A wetted membrane, kinked line or submerged internal opening can change the effective pressure loss."
          },
          {
            "type": "figure",
            "src": "/images/resources/technical-articles/pump-application-guides/reservoir-vent-en.svg",
            "alt": "Gas enters a reservoir through its designed vent while liquid flows through an immersed pickup to the pump; headspace and inlet pressures are measured separately",
            "width": 1200,
            "height": 500,
            "caption": "Conceptual arrangement: separate headspace and inlet measurements help distinguish gas-path restrictions from liquid-path losses. This is not a product-specific container drawing."
          }
        ]
      },
      {
        "title": "2. Why a sealed rigid bottle can become harder to empty",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Consider an explanatory model: a completely sealed rigid bottle, a fixed amount of gas at constant temperature, with evaporation, dissolved gas and leakage temporarily neglected. Removing liquid expands the headspace and lowers its absolute pressure."
          },
          {
            "type": "formula",
            "expression": "P₂,abs = P₁,abs × Vg₁ / (Vg₁ + ΔVliquid)",
            "note": "Isothermal ideal-gas approximation for a fixed gas quantity. P is absolute pressure, Vg₁ is initial headspace volume and ΔVliquid is withdrawn liquid volume. Do not substitute gauge pressure."
          },
          {
            "type": "paragraph",
            "text": "Assume an initial 100 mL headspace at 101.3 kPa absolute. After withdrawing 20 mL, the model gives 101.3 × 100/120 ≈ 84.4 kPa absolute, or approximately −16.9 kPa gauge relative to the original ambient pressure. These are illustrative calculations, not measurements from a FOREACH pump or a real reservoir."
          },
          {
            "type": "paragraph",
            "text": "Real containers can deform or leak; liquids can evaporate or release dissolved gas; temperature can change. Consequently, withdrawn volume alone does not determine actual headspace pressure. The model explains why restricted gas replacement can progressively burden suction. Measurements are still needed for diagnosis."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "https://www.grc.nasa.gov/www/k-12/BGP/boyle.html",
                "label": "Physics reference: NASA on Boyle’s law"
              }
            ]
          }
        ]
      },
      {
        "title": "3. Separate headspace pressure from suction-path losses",
        "blocks": [
          {
            "type": "formula",
            "expression": "Pinlet,abs ≈ Pheadspace,abs + ρg(zsurface − zinlet) − ΔPsuction",
            "note": "Approximate steady relation using consistent pressure units. ρ is liquid density and z is elevation. Fast pulsation, acceleration and two-phase flow require further analysis."
          },
          {
            "type": "paragraph",
            "text": "Falling headspace pressure, a falling liquid level and increasing suction-path resistance can all reduce pump inlet pressure. Measuring the headspace helps identify container gas-replacement conditions. An additional inlet measurement shows the combined influence of the liquid column and pickup path. Outlet flow alone cannot reliably distinguish these causes."
          },
          {
            "type": "paragraph",
            "text": "Diaphragm pump suction varies over the cycle. A slow sensor may report only an average, which cannot rule out brief suction problems. Instrumentation should not introduce a new air leak or significant dead volume."
          }
        ]
      },
      {
        "title": "4. Use observations and controlled comparisons to narrow the cause",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Possible cause",
              "Evidence to examine",
              "Follow-up check"
            ],
            "rows": [
              [
                "Restricted gas replacement",
                "Headspace pressure drifts outside its intended condition while delivery changes",
                "Check gas-path pressure loss and compare an approved, verified vent component on a controlled bench"
              ],
              [
                "Falling liquid level or changing lift",
                "Headspace pressure is normal but inlet conditions track liquid height",
                "Repeat at the same level and installation height"
              ],
              [
                "Blocked pickup filter or deformed tube",
                "Normal headspace pressure with increased suction-path pressure difference",
                "Inspect the filter, fittings and bends, changing one factor at a time"
              ],
              [
                "Air entry at the inlet",
                "Bubbles or temporary recovery after priming",
                "Check connection integrity; visible bubbles are not the only evidence"
              ],
              [
                "Changing outlet load",
                "Outlet pressure rises as delivery falls",
                "Inspect downstream valves, nozzles, tubing and receiving-vessel pressure"
              ],
              [
                "Electrical, thermal or liquid changes",
                "Voltage, current, temperature or viscosity-related conditions change",
                "Hold other conditions constant before comparing"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "These observations organize the investigation; no row is a unique fault signature. For example, increasingly negative inlet pressure can arise from restricted venting or a blocked liquid pickup filter. Combine pressure locations with controlled comparisons."
          }
        ]
      },
      {
        "title": "5. Make the venting check reproducible",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Record container type, pressure and vacuum ratings, liquid, temperature, initial level, headspace volume, installation height and the designed vent path.",
              "At the same electrical and control conditions, record elapsed time, cumulative withdrawal, flow, headspace pressure, inlet pressure and outlet pressure. Retain voltage, current and liquid-level information.",
              "Inspect gas and liquid paths before and during the symptom. Look for filter wetting, liquid in the vent line, a submerged gas opening or tube deformation.",
              "If comparison is needed, use a controlled bench with water or another suitable substitute and replace the vent component only through a method permitted by the design. Keep initial level, temperature, tubing and timing consistent.",
              "Compare pressure histories and delivered volumes before and after the change. Improvement in both, supported by component inspection, strengthens the diagnosis; brief flow recovery by itself is insufficient."
            ]
          },
          {
            "type": "notice",
            "text": "For real reagents, volatile liquids or systems requiring sterility, do not simply loosen the cap or bypass filtration and vapor controls. A comparison must respect the container and instrument design; a temporary opening is not a finished engineering solution."
          },
          {
            "type": "paragraph",
            "text": "Acceptance should cover the intended liquid-level range, longest operating period and peak withdrawal demand. Running for a few seconds from a full bottle is insufficient. Pressure limits and test duration must come from the container restrictions, pump inlet requirements and instrument duty."
          }
        ]
      },
      {
        "title": "6. Size the gas path against demand and allowable pressure loss",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Under approximately equal pressure and temperature conditions, incoming gas volume flow generally needs to replace the liquid volume being removed. Normalize gas-flow ratings to compatible reference pressure and temperature before comparing them. A filter flow rating is meaningful only with its associated pressure difference and test conditions."
          },
          {
            "type": "table",
            "headers": [
              "Selection input",
              "Data to obtain"
            ],
            "rows": [
              [
                "Maximum withdrawal demand",
                "Concurrent and peak liquid flow, with the corresponding gas-replacement requirement"
              ],
              [
                "Allowed headspace pressure deviation",
                "Container ratings, pump inlet requirements and process constraints"
              ],
              [
                "Gas-path pressure loss",
                "Filter, tube and fitting loss at relevant gas flow"
              ],
              [
                "Wetting and chemical exposure",
                "Liquid and vapor compatibility, installation orientation and drainage"
              ],
              [
                "Service and maintenance",
                "Supplier replacement criteria and a method for detecting abnormal pressure loss"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "A larger opening alone is not a complete selection rule. Do not assign a membrane pore size or universal vacuum alarm without the application requirements. Filtration, contamination control, chemical compatibility and gas-path resistance must be assessed together."
          }
        ]
      },
      {
        "title": "7. Return to pump selection after checking the supply conditions",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Restore the reservoir, inlet path and outlet load to their intended conditions, then assess whether the pump can complete the task. The 300 mL/min DPL30 and 600 mL/min DPL60 flow classes provide starting points for a shortlist, while usable delivery still depends on operating pressure, liquid and inlet conditions."
          },
          {
            "type": "paragraph",
            "text": "When gas replacement or the suction path is restricted, a larger pump can increase instantaneous withdrawal demand and does not guarantee recovery. Once the system conditions are established, use the relevant curve and assembled-system measurements to decide whether the pump model, tube bore or control timing needs to change."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/suction-vs-discharge-resistance-diaphragm-pump/",
                "label": "Suction-side versus discharge-side resistance"
              },
              {
                "href": "/resources/technical-articles/300-ml-min-micro-liquid-diaphragm-pump-self-priming-loss/",
                "label": "Troubleshooting reduced self-priming performance"
              },
              {
                "href": "/resources/technical-articles/300-ml-min-micro-liquid-diaphragm-pump-motor-runs-no-flow/",
                "label": "Motor running with no liquid delivery"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "Flow–pressure curves and the actual operating point"
              },
              {
                "href": "/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide/",
                "label": "DPL30 liquid diaphragm pump selection guide"
              },
              {
                "href": "/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide/",
                "label": "DPL60 liquid diaphragm pump selection guide"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-multiple-wash-nozzles-flow-balance/",
                "label": "Unequal delivery through multiple wash nozzles"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "Miniature liquid diaphragm pumps"
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Frequently asked questions",
    "faqItems": [
      {
        "question": "Does recovery after opening the cap prove the pump is healthy?",
        "answer": "It shows that changing the container boundary conditions affected delivery. It does not alone exclude pump issues or inlet leaks. Confirm the cause with an approved vent comparison and synchronized pressure measurements."
      },
      {
        "question": "Why can a bottle with a vent still develop vacuum?",
        "answer": "Gas needs a pressure difference to pass through filters, tubing and fittings. A small, obstructed, wetted or submerged path may not replace gas at the rate required by liquid withdrawal."
      },
      {
        "question": "Should every sealed container have a vent hole?",
        "answer": "No. Collapsible bags, pressurized reservoirs and controlled-atmosphere containers use their own volume-compensation or pressure-control methods. Check the intended design instead of converting every container into an open vessel."
      },
      {
        "question": "At what vacuum should an alarm trigger?",
        "answer": "Set it from the container rating, pump inlet conditions and instrument performance requirements. The −16.9 kPa value in this article is a hypothetical calculation, not an alarm setting or allowable product pressure."
      },
      {
        "question": "Will a larger pump prevent the gradual flow drop?",
        "answer": "That cannot be assumed. Resolve restricted gas replacement or inlet supply first, then verify the pump against the required delivery and operating duty at the actual working conditions."
      }
    ],
    "cta": {
      "title": "Turn your operating conditions into a testable pump specification",
      "description": "Share the liquid, target volume or flow, timing, fluid path and installation constraints to review the pump configuration and verification method.",
      "contactLabel": "Contact technical support",
      "productsLabel": "Explore related products",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  }
} satisfies Record<PumpApplicationArticleSlug, PumpApplicationArticleCopy>;
