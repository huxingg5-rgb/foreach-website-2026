import { getRplSelectionGuide } from "@/data/resources/technical-articles/rpl-selection-links";
import type { ValvelessLocaleCopy } from "./types";
import { getValvelessPumpNames } from "../valveless-pump-names";

const rplSelectionGuideHref = getRplSelectionGuide("en").href;

// Authored application copy, not a word-by-word runtime translation.
// Industry references and engineering boundaries follow valveless-pump-content.zh.ts.
export const en: ValvelessLocaleCopy = {
  ...getValvelessPumpNames("en"),
  category: { title: "Precision Valveless Metering Pumps", metaDescription: "Explore FOREACH RPL and DRPL valveless metering pumps for reagent dispensing, titration, filling and dilution. Compare displacement, ratios and wetted materials.", paragraphs: [
    "FOREACH precision valveless metering pumps use the combined rotary and reciprocating motion of a ceramic piston to draw in and discharge liquid. They support reagent dispensing, titrant delivery, liquid filling and proportional preparation in automated analytical instruments, laboratory liquid-handling equipment and reagent dispensing systems. RPL single-head pumps serve one liquid path; DRPL dual-head pumps deliver two liquids in a specified volume ratio.",
    "Names follow the fluidic task: a pump may be specified as a reagent dispensing pump, a titrant dosing pump or a liquid filling pump. In concentrate dilution and buffer preparation, a dual-head configuration provides proportional delivery of concentrate and diluent. These application names describe the task, not a different pump mechanism.",
    `The RPL series covers displacement ranges of 12–80 μL/rev, 50–300 μL/rev and 300–1200 μL/rev. RPL-P6.35 and RPL-P15 support mechanical displacement adjustment; motor speed can be selected to match delivery rate. Displacement per revolution, [volume per dispense](${rplSelectionGuideHref}) and flow per minute are different quantities. Accuracy and repeatability must be checked with the actual liquid, backpressure and operating sequence.`,
    "The DRPL series offers concentrate-to-diluent volume ratios of 1:9 and 1:19 for reagent dilution, buffer preparation and proportional dosing. Specify the required output from both paths, the ratio and the cycle time. The pump delivers the two liquids; downstream junctions and mixing arrangements determine the uniformity of the prepared liquid.",
    "RPL-P6.35 uses a polyvinylidene fluoride (PVDF) pump head and a zirconium dioxide (ZrO₂) ceramic set. RPL-P15 uses a polyvinylidene fluoride (PVDF) pump head and an aluminium oxide (Al₂O₃) ceramic set. Check all wetted components against the reagent and cleaning liquid, and plan cleaning for crystallization or residue. Ports, drive controls and mounting depend on the model and configuration.",
    "Provide the required dispense volume or flow rate, cycle time, liquid composition, backpressure and installation dimensions. For proportional preparation, also provide the target volume ratio and output of each liquid path so that the configuration can be assessed."
  ] },
  single: { title: "RPL Single-Head Valveless Metering Pumps", paragraphs: [
    `FOREACH RPL single-head pumps provide quantitative delivery through one liquid path in analytical instruments, titration equipment, laboratory dispensing modules and reagent filling systems. RPL-P4, RPL-P6.35 and RPL-P15 cover 12–80 μL/rev, 50–300 μL/rev and 300–1200 μL/rev respectively. Select displacement against the [required dispense volume and cycle time](${rplSelectionGuideHref}).`,
    "Depending on the task, an RPL pump can serve as a reagent dispensing pump, titrant dosing pump, buffer dispensing pump or volumetric filling pump. RPL-P4 addresses smaller-volume delivery; RPL-P6.35 addresses reagent dispensing and titrant delivery; RPL-P15 addresses filling and supply tasks requiring greater displacement per revolution.",
    "RPL-P6.35 and RPL-P15 allow mechanical adjustment of displacement, combined with motor-speed selection to match flow. Displacement per revolution is not the minimum reliable dose. Verify output with the liquid, backpressure and dispensing sequence of the intended system.",
    "RPL-P6.35 uses a polyvinylidene fluoride (PVDF) head, a zirconium dioxide (ZrO₂) ceramic set and a 1/4-28 UNF-2B working-fluid port. RPL-P15 uses a polyvinylidene fluoride (PVDF) head, an aluminium oxide (Al₂O₃) ceramic set and a G1/8 working-fluid port. Confirm cleaning, tubing and mounting requirements for the configuration."
  ] },
  dual: { title: "DRPL Dual-Head Valveless Metering Pumps", paragraphs: [
    "FOREACH DRPL dual-head pumps deliver two liquids proportionally in analyzer dilution modules, laboratory preparation equipment and reagent preparation systems. DRPL-0109 and DRPL-0119 provide concentrate-to-diluent volume ratios of 1:9 and 1:19 respectively.",
    "Depending on the task, the configuration can be specified as a concentrate dilution pump, proportioning pump or dual-channel metering pump. It supplies concentrate and diluent in the required relationship for reagent dilution, buffer preparation and proportional dosing.",
    "A ratio of 1:9 means one part concentrate plus nine parts diluent; 1:19 means one part concentrate plus nineteen parts diluent. Define both path outputs, total volume and cycle time. Proportional delivery and mixing are separate functions: confirm uniformity with the downstream fluidic arrangement.",
    "Provide the composition, viscosity, inlet conditions and outlet backpressure of each liquid, together with the ratio, tubing, drive controls and available space. Check the wetted materials and configuration of both paths separately."
  ] },
  materials: { pvdf: "polyvinylidene fluoride (PVDF)", alumina: "aluminium oxide (Al₂O₃)", zirconia: "zirconium dioxide (ZrO₂)" },
  // Adapted from the reviewed Chinese cards and three-paragraph introductions (2026-10-23).
  cards: {
    "p4": "P4 Miniature Valveless Piston Pump for Reagent Dispensing in Analyzers",
    "p635": "P6.35 OEM Valveless Rotary Piston Pump for Laboratory Liquid Handling",
    "p15": "P15 Ceramic Piston Metering Pump for Reagent Filling in Life Sciences",
    "dual9": "DRPL-0109 Dual-Head Ceramic Piston Pump for IVD Reagent Dilution",
    "dual19": "DRPL-0119 Dual-Head Piston Pump for Proportional Dosing in Labs"
  },
  introductions: {
    "p4": {
      "title": "RPL-P4 Miniature Valveless Piston Pump for Reagent Dispensing in Analyzers",
      "paragraphs": [
        "RPL-P4 is a miniature valveless ceramic piston metering pump for reagent dispensing in IVD and clinical chemistry analyzers, titrant dosing, and small-volume filling of vials and reagent tubes. Displacement is 12–80 μL/rev, with an operating speed of 5–300 rpm and a flow range of 0.06–24 mL/min.",
        "The ceramic piston rotates and reciprocates within its cylinder, alternately connecting the pumping chamber to the inlet and outlet. This combines fluid delivery and port switching without separate inlet or outlet check valves, eliminating those valve components and their maintenance. The small displacement range suits low-volume dispensing: displacement and revolution count determine the calculated dose, while speed determines how quickly it is delivered.",
        "The configuration shown has a polyvinylidene fluoride (PVDF) pump head and an aluminium oxide (Al₂O₃) ceramic piston and cylinder set. The 1/4-28 UNF-2B fluid ports accept matching flat-bottom fittings and tubing connections. Measuring 57 × 57 × 115 mm and weighing 500 g, the pump fits reagent dispensing modules where installation space is limited."
      ],
      "commonApplications": [
        "Automated analyzers: small-volume reagent dispensing and dosing",
        "Automatic titrators: titrant delivery and incremental dosing",
        "Laboratory filling systems: volumetric filling of vials and reagent tubes"
      ],
      "metaDescription": "RPL-P4 valveless ceramic piston metering pump, 12–80 μL/rev, for small-volume reagent dispensing and titration. PVDF head and alumina ceramic set."
    },
    "p635": {
      "title": "RPL-P6.35 OEM Valveless Rotary Piston Pump for Laboratory Liquid Handling",
      "paragraphs": [
        "RPL-P6.35 is a single-head valveless ceramic piston metering pump with mechanically adjustable displacement from 50 to 300 μL/rev. It operates at 5–300 rpm over a flow range of 0.25–90 mL/min. Applications include reagent dispensing and sequential dosing in analyzers, titrant delivery, and volumetric filling of reagent tubes and small bottles.",
        "Combined rotary and reciprocating piston motion handles suction, discharge and port switching without separate check valves. Mechanical adjustment changes the piston stroke and displacement per revolution; revolution count sets the calculated dose, and speed sets delivery time. For equipment handling several fill volumes, select a displacement that suits the required volume and cycle time, then calibrate delivery at that setting.",
        "The configuration shown uses a polyvinylidene fluoride (PVDF) pump head and plugs with a zirconium dioxide (ZrO₂) ceramic piston and cylinder set. Process and rinse ports are both 1/4-28 UNF-2B. The separate rinse circuit allows the piston area to be flushed when handling salt-containing reagents or liquids prone to crystallization. Overall dimensions are 78 × 78 × 145 mm, with a weight of 750 g, for OEM integration into analyzers and automated laboratory dispensing modules."
      ],
      "commonApplications": [
        "Automated analyzers: reagent dispensing and staged dosing",
        "Laboratory titrators: titrant delivery and dosing",
        "Reagent filling systems: volumetric filling of tubes and small bottles"
      ],
      "metaDescription": "RPL-P6.35 valveless metering pump, 50–300 μL/rev, for reagent dispensing, titration and filling. PVDF head, zirconia ceramic set and piston wash ports."
    },
    "p15": {
      "title": "RPL-P15 Ceramic Piston Metering Pump for Reagent Filling in Life Sciences",
      "paragraphs": [
        "RPL-P15 is a valveless ceramic piston metering pump for larger dispense volumes and higher liquid delivery requirements. Mechanically adjustable displacement of 300–1200 μL/rev and a speed range of 5–300 rpm provide a flow range of 1.5–360 mL/min. Typical tasks include diagnostic reagent bottle filling, buffer dispensing, reservoir replenishment and metered supply to analytical instruments.",
        "The ceramic piston rotates and reciprocates to draw in liquid, discharge it and switch between ports without separate check valves. A larger displacement reduces the number of revolutions needed for a given fill. For example, 10 revolutions at 1000 μL/rev give a calculated fill volume of 10 mL. Different fill volumes can be accommodated by changing revolution count or displacement, followed by output calibration at the required filling cycle.",
        "The configuration shown combines a polyvinylidene fluoride (PVDF) pump head and plugs with an aluminium oxide (Al₂O₃) ceramic piston and cylinder set. G1/8 process ports connect the working-fluid circuit, while 1/4-28 UNF-2B rinse ports allow flushing around the piston to help limit residue buildup and crystallization. The pump measures 78 × 78 × 160 mm and weighs 900 g."
      ],
      "commonApplications": [
        "Reagent filling systems: volumetric bottle filling",
        "Laboratory preparation workstations: premixed buffer dispensing and reservoir replenishment",
        "Analytical instrument supply modules: metered liquid delivery"
      ],
      "metaDescription": "RPL-P15 valveless metering pump, 300–1200 μL/rev, for reagent filling and buffer dispensing. PVDF head, alumina ceramic set and piston wash ports."
    },
    "dual9": {
      "title": "DRPL-0109 Dual-Head Ceramic Piston Pump for IVD Reagent Dilution",
      "paragraphs": [
        "DRPL-0109 is a dual-head valveless ceramic piston metering pump for delivering concentrate and diluent at a 1:9 volumetric ratio. The configuration shown delivers 100 μL + 900 μL per revolution. At 60–300 rpm, the combined flow range is 60–300 mL/min. Applications include on-instrument dilution of concentrated reagents and wash solutions, fixed-ratio buffer preparation, and proportional dosing in reagent production.",
        "A common drive operates both pump heads, avoiding the need to synchronize two independent pump drives. Each ceramic piston rotates and reciprocates to meter its liquid. Speed changes the combined delivery rate; the configured displacements define the nominal volume ratio. One part concentrate plus nine parts diluent can be used to prepare a 1× working solution from a compatible 10× formulation, with mixing provided downstream.",
        "Channel A has 1/4-28 UNF-2B process ports; channel B has G1/8 process ports supplied with metal push-in fittings as standard. Both channels have 1/4-28 UNF-2B rinse connections. The assembly measures 180 × 83.7 × 75 mm. Connect the outlets to downstream combining and mixing components, calibrate each channel separately, then verify the concentration and uniformity of the prepared solution."
      ],
      "commonApplications": [
        "Automated analyzers: inline reagent dilution at a 1:9 concentrate-to-diluent ratio",
        "Laboratory preparation equipment: fixed-ratio buffer preparation",
        "Reagent production stations: proportional batch dosing of two liquids"
      ],
      "metaDescription": "DRPL-0109 dual-head valveless metering pump for 1:9 concentrate-to-diluent dosing. Explore reagent dilution, buffer preparation and mixing requirements."
    },
    "dual19": {
      "title": "DRPL-0119 Dual-Head Piston Pump for Proportional Dosing in Labs",
      "paragraphs": [
        "DRPL-0119 is a dual-head valveless ceramic piston metering pump for concentrate dilution at a 1:19 volumetric ratio. The configuration shown delivers 60 μL + 1140 μL per revolution. At 60–300 rpm, the combined flow range is 72–360 mL/min. It is intended for dilution of 20× reagents and wash concentrates in analyzers, preparation of laboratory working solutions, and fixed-ratio dosing of two liquids.",
        "Both pump heads share one drive, with rotary and reciprocating ceramic pistons metering the two liquids. The 1:19 ratio combines one part concentrate with nineteen parts diluent for formulations designed to dilute 20× concentrate to working strength. For the same final volume and target concentration, a 20× formulation uses half the concentrate volume of a 10× formulation. Instrument designers can use this to reduce the concentrate reservoir size or extend the refill interval at the same reservoir capacity.",
        "Channel A has 1/4-28 UNF-2B process ports; channel B has G1/8 process ports supplied with metal push-in fittings as standard. Both channels have 1/4-28 UNF-2B rinse connections. At 180 × 83.7 × 75 mm, the assembly has the same overall dimensions as DRPL-0109. With only 60 μL of concentrate delivered per revolution, calibrate each channel individually: combined flow alone does not confirm the dilution ratio. Downstream mixing and the preparation sequence determine solution uniformity."
      ],
      "commonApplications": [
        "Automated analyzers: reagent dilution at a 1:19 concentrate-to-diluent ratio",
        "Laboratory preparation systems: fixed-ratio working-solution preparation",
        "Reagent preparation stations: proportional batch delivery of concentrate and diluent"
      ],
      "metaDescription": "DRPL-0119 dual-head valveless metering pump for 1:19 concentrate-to-diluent dosing. Explore concentrate dilution and fixed-ratio working-solution preparation."
    }
  },
  intros: {
    p4: "RPL-P4 addresses small-volume dosing through one liquid path. It may be specified as a reagent dispensing pump, titrant dosing pump or volumetric filling pump according to its task. These names do not identify different pump mechanisms. The applications below connect dose volume, operating sequence and timing.",
    p635: "RPL-P6.35 addresses single-path reagent dispensing and filling. Reagent dispensing pump, titrant dosing pump and reagent filling pump are task-based names. Its displacement range is greater than that of RPL-P4; choose against the required volume and time rather than the industry name alone.",
    p15: "RPL-P15 addresses delivery and filling tasks that need greater displacement per revolution. It may serve as a reagent filling pump, buffer dispensing pump or quantitative supply pump. Filling controls volume per container, continuous supply controls volume per unit time, and reservoir replenishment must coordinate with level control.",
    dual: "{{model}} addresses two-liquid preparation at a concentrate-to-diluent volume ratio of {{ratio}}. It may be specified as a concentrate dilution pump, proportioning pump or dual-channel metering pump. {{ratio}} describes the volume relationship between the liquids, not a speed setting or a final volume of only {{parts}} times the concentrate volume."
  },
  reagentSetup: {
    p4: "Commission the circuit by priming and removing air, fixing displacement and cycle count, collecting repeated doses, and correcting output. Compare continuous dispensing with the first dose after a pause. A first-dose deviation calls for inspection of bubbles, tip droplets and liquid retraction. Supplying reagent from a reservoir is not equivalent to aspirating and transferring a sample.",
    p635: "Priming the working-fluid path and washing the piston area are different operations. Priming establishes a stable liquid column; the wash circuit addresses residue around the piston. For salt-containing or crystallizing reagents, select a compatible cleaning liquid and shutdown sequence. A wash port does not establish compatibility with every corrosive liquid."
  },
  applications: {
    reagent: { title: "Automated analysis and in vitro diagnostics: reagent dispensing", paragraphs: [
      "In automated analyzers and in vitro diagnostics (IVD) reagent circuits, liquid travels from a reagent bottle through the pump, tubing and dispensing tip into a reaction vessel. The component may be specified as a reagent dispensing pump or reagent dosing pump. Define the volume required by each analytical step and the time available to deliver it, not only the flow per minute.",
      "Displacement and complete operating revolutions determine nominal dose volume. Calculation example: {{exampleQ}} μL/rev × 5 revolutions = {{exampleDose}} μL. At a constant 150 rpm, those revolutions take 2 seconds, excluding acceleration, stopping and other machine actions. This is a sizing calculation, not measured performance. Recalibrate output after changing the displacement setting.",
      "{{reagentSetup}}"
    ] },
    titration: { title: "Automatic titration: incremental titrant dosing", paragraphs: [
      "In laboratory titrators, a titrant dosing pump delivers liquid to the titration vessel under instrument control. The sequence combines an addition, mixing and electrode response, followed by the decision on the next addition. The pump supplies liquid; the instrument detects and determines the endpoint.",
      "Specify initial delivery speed and the smallest reliable increment near the endpoint separately. At unchanged displacement and complete revolution count, reducing speed mainly increases delivery time, not dose volume. {{minimum}} μL/rev is the lower end of the displacement range, not a validated minimum titration increment. Do not infer arbitrary small doses by dividing it by motor steps.",
      "Collect and measure repeated target increments with the actual titrant, tip and tubing. Check droplet carryover after stopping and leave time for mixing and stable readings. Drive positioning and start/stop behavior must support the required sequence; the pump accuracy specification alone is not the analytical accuracy of the complete titrator."
    ] },
    smallfill: { title: "Reagent production and laboratory dispensing: small-container filling", paragraphs: [
      "At a small-vial or reagent-tube station, RPL-P4 can be assessed as a reagent filling pump or volumetric dispensing pump. After the dispensing tip delivers liquid, the instrument indexes the next container. Assess the volume actually received by each container during continuous operation and after pauses.",
      "Break cycle time into pump delivery, container indexing, tip motion and settling. In the 400 μL example at 80 μL/rev and 150 rpm, 2 seconds is only the theoretical pump running time; it does not demonstrate 30 bottles per minute. If the cycle is too long, assess displacement, drive speed and station motion together.",
      "Measure initial fills, consecutive fills and the first fill after a pause separately. For gravimetric checks, convert mass to volume using liquid density at the test temperature and an appropriate balance. With foaming or wall-wetting liquids, also inspect tip retention and whether the entire droplet enters the container."
    ] },
    midfill: { title: "Reagent dispensing: microliter-to-milliliter filling stations", paragraphs: [
      "In repeated filling of reagent tubes and small bottles, RPL-P6.35 can be specified as a reagent filling pump or liquid dispensing pump. One fill may accumulate one or several complete operating cycles; its volume is not limited to the displacement of a single revolution. Coordinate delivery with container indexing and tip movement.",
      "Calculation example: at 200 μL/rev, a nominal 1 mL fill requires 5 revolutions. At a constant 150 rpm, the theoretical pump running time is 2 seconds. Add indexing, tip motion and settling to obtain the station cycle. This calculation is not a verified filling rate or accuracy claim.",
      "Test consecutive fills and restart fills using the intended tubing and tip, and inspect dripping and foaming. The polyvinylidene fluoride (PVDF) head and zirconium dioxide (ZrO₂) ceramic set must be checked against the reagent and cleaning liquid together with fittings, tubing and all other wetted components."
    ] },
    largefill: { title: "Diagnostic reagent production: volumetric bottle filling", paragraphs: [
      "In reagent production or laboratory packaging, liquid travels from a supply vessel through the pump and filling tip into each bottle. RPL-P15 can be assessed as a reagent filling pump or volumetric dispensing pump. Balance per-container volume with cycle time; different displacement settings require different revolution counts for the same target fill.",
      "Calculation example: a nominal 5 mL fill at 1000 μL/rev requires 5 complete revolutions. At a constant 150 rpm, pump running time is theoretically 2 seconds. Container indexing, acceleration, stopping and tip motion are additional; this is not a production-line throughput claim. Calibrate the actual volume delivered at the outlet.",
      "Before increasing speed, check inlet supply, tip restriction and droplet release. For foaming liquids, assess dispensing height and motion as well. Measure both consecutive fills and the first fill after a pause to evaluate the complete station rather than the pump alone."
    ] },
    buffer: { title: "Laboratory preparation: buffer dispensing and replenishment", paragraphs: [
      "A pump distributing premixed buffer among containers may be called a buffer dispensing pump; one refilling an intermediate reservoir may be called a replenishment pump. Neither task is the same as preparing buffer from two liquids. Single-head RPL-P15 does not independently control a concentrate-to-diluent ratio.",
      "For repeated dispensing, match volume, displacement and operating cycles. For reservoir replenishment, level measurement or an instrument command determines start and stop. Level sensing, dry-run protection and overflow prevention belong to the system design and cannot be assumed to be included with the pump.",
      "Include a compatible shutdown rinse when using salt-containing buffers to limit residue drying and crystallization around the piston. The G1/8 working-fluid port and 1/4-28 UNF-2B wash-fluid port serve different circuits. Connect them according to the configuration drawing and check for air introduced after replenishment."
    ] },
    continuous: { title: "Analytical instrument supply: continuous metered delivery", paragraphs: [
      "When an instrument needs liquid over an extended period, RPL-P15 can be assessed as a liquid metering pump or quantitative supply pump. Unlike per-container filling, the primary inputs are average flow, run duration and the downstream process tolerance for flow fluctuations.",
      "Estimate nominal average flow as displacement per revolution multiplied by speed. Calculation example: 500 μL/rev × 120 rpm = 60000 μL/min, or 60 mL/min. This is an average value, not constant instantaneous flow or a substitute for measurement with the actual liquid and backpressure.",
      "Measure output collected over a defined interval at the actual outlet resistance, and check the effect of pulsation on the downstream process. Adding a mixer or other restriction requires renewed backpressure and inlet-supply checks. Valveless construction does not by itself guarantee pulseless flow or unlimited continuous operation."
    ] },
    dilution: { title: "Automated analyzers: on-instrument concentrate dilution", paragraphs: [
      "One path draws concentrate and the other draws diluent; the outputs meet and mix before reaching the working-solution reservoir. For this task, {{model}} may be specified as a concentrate dilution pump or reagent dilution pump. Proportional pumping supplies the liquids, while downstream mixing determines uniformity.",
      "Ratio calculation: {{ratio}} means one part concentrate plus {{parts}} parts diluent. Assuming additive volumes, no target solute in the diluent and no reaction, the combined volume is {{factor}} times the concentrate volume and the target-solute concentration is 1/{{factor}} of its original value. The shown {{concentrate}} μL + {{diluent}} μL configuration gives a nominal {{total}} mL. Confirm concentration from measured outputs and prepared-liquid testing.",
      "Prime and remove air from both paths before assessing the liquid entering the mixer, especially after startup or liquid changes. A depleted supply or bubbles in one path can cause a concentration error even if combined volume appears acceptable. Measure each path independently before assessing the mixed working solution."
    ] },
    preparation: { title: "Laboratory and reagent preparation: fixed-ratio buffer dilution", paragraphs: [
      "In laboratory preparation equipment, a component combining concentrate and diluent may be specified as a buffer preparation pump or proportioning pump. Choose {{model}} because the formulation requires a {{ratio}} volume ratio, not merely because the application uses the word buffer.",
      "Calculation example: a nominal 100 mL batch at {{ratio}} requires {{batchConcentrate}} mL concentrate and {{batchDiluent}} mL diluent. This is formulation arithmetic, not a batch-accuracy guarantee. Check the prepared liquid against the formulation requirements for ionic strength, acidity and dissolution state.",
      "Correct proportions do not automatically ensure uniform mixing. Select the downstream junction, mixer and reservoir for batch volume, delivery timing and residence time. Test mixtures that may precipitate or foam. A ceramic piston does not establish compatibility of every component in both liquid paths."
    ] },
    batch: { title: "Reagent production: proportional batch dosing", paragraphs: [
      "When two liquids enter a preparation vessel in a fixed relationship, {{model}} may be described as a proportioning pump or dual-channel metering pump. Specify ratio, total batch volume and allowable preparation time. Filling the prepared liquid into individual bottles is a separate downstream task, not an integrated function implied by the dual-head pump.",
      "Increasing or decreasing both path outputs by the same factor does not change their ratio. Overall speed adjustment therefore cannot turn a 1:9 configuration into 1:19. A different formulation requires reassessment of pump-head and displacement configuration. At batch startup and shutdown, consider path volumes, arrival times at the mixer and residual liquid.",
      "The shown working-fluid ports are 1/4-28 UNF-2B for reagent A and G1/8 for reagent B; both wash-fluid ports are 1/4-28 UNF-2B. Confirm the A/B-to-liquid mapping from the configuration drawing rather than port size alone. Check the pressure and supply status of both paths separately."
    ] }
  },
  modelFaqs: {
    "p635": [
      {
        "question": "How should I choose between RPL-P6.35 and RPL-P4?",
        "answer": "Their displacement ranges are 50–300 μL/rev and 12–80 μL/rev respectively. Start with the target dose and available time to estimate displacement and revolution count, then compare small-dose output and drive options. Greater displacement does not mean greater accuracy."
      },
      {
        "question": "What do displacement adjustment and motor speed control?",
        "answer": "Mechanical adjustment changes the nominal volume delivered per complete revolution. Motor speed changes how many revolutions are completed per unit time. Estimate dose from displacement × revolution count and average flow from displacement × speed, then calibrate actual output."
      },
      {
        "question": "How do the wash ports differ from the working-fluid ports?",
        "answer": "Both use 1/4-28 UNF-2B threads in the shown configuration, but they serve different circuits. Working-fluid ports carry reagent into and out of the pump; wash ports rinse the piston area. Matching threads do not make them interchangeable. Follow the drawing for the supplied configuration."
      }
    ],
    "p15": [
      {
        "question": "How does RPL-P15 differ from RPL-P6.35?",
        "answer": "Their displacement ranges are 300–1200 μL/rev and 50–300 μL/rev respectively. RPL-P15 is an option for larger-volume filling and liquid supply. Compare the target fill volume, delivery time and any small-dose requirements, rather than choosing by flow alone."
      },
      {
        "question": "Can 300–1200 μL/rev be read as a flow rate?",
        "answer": "No. It is displacement per revolution; flow also depends on speed. For example, 500 μL/rev × 120 rpm gives a nominal average flow of 60 mL/min. Calibrate the actual flow with the liquid and backpressure in use. Average flow does not imply pulse-free delivery."
      },
      {
        "question": "Can RPL-P15 prepare a two-liquid mixture on its own?",
        "answer": "It is a single-head pump for metering or dispensing one liquid. Proportional preparation of two liquids requires another fluid path and suitable control. For fixed concentrate-to-diluent ratios of 1:9 or 1:19, a DRPL dual-head configuration can be assessed separately."
      }
    ]
  },
  faqSingle: [
    { question: "How do application names relate to a valveless metering pump?", answer: "Valveless metering pump describes the pump mechanism and metering function. Reagent dispensing pump, titrant dosing pump and filling pump describe tasks within an instrument. These task names do not mean that every pump used in that application has the same mechanism." },
    { question: "Is {{range}} the volume of each dispense?", answer: "It is displacement per revolution, not a guaranteed dose or minimum reliable volume. For complete revolutions, multiply the displacement setting by revolution count to estimate nominal dose, then calibrate at the outlet. Do not assume proportional delivery at every arbitrary partial angle." },
    { question: "Does reducing motor speed reduce the dose?", answer: "At the same displacement and complete revolution count, lower speed mainly increases delivery time. A smaller dose requires appropriate displacement and drive control. Likewise, average flow is displacement multiplied by speed, but actual output must be verified with the liquid and fluidic circuit." },
    { question: "Which materials and ports are shown for {{model}}?", answer: "{{materialDetails}} Check the reagent and cleaning liquid against all wetted components, not just the pump head. Confirm the drive, mounting and interfaces for the supplied configuration." },
    { question: "How should accuracy, pressure and service-life values be used?", answer: "Confirm the definitions and test conditions, including liquid, temperature, displacement, speed and backpressure. A pressure rating is not automatically the permitted operating backpressure, and cycle life is not a guarantee under every condition. Valveless construction does not mean that a complete instrument needs no switching or shutoff valves." }
  ],
  faqDual: [
    { question: "What dilution factor does {{ratio}} represent?", answer: "It denotes concentrate-to-diluent volume ratio: one part plus {{parts}} parts. With additive volumes, no target solute in the diluent and no reaction, the final volume is {{factor}} parts and concentration is 1/{{factor}} of the concentrate value. Do not confuse liquid ratio with final dilution factor." },
    { question: "What output is shown for {{model}}?", answer: "The shown configuration is {{concentrate}} μL concentrate plus {{diluent}} μL diluent, nominally {{total}} mL combined. Confirm batch output against the actual drive and operating sequence; these quantities are not a validated minimum under all conditions." },
    { question: "Does proportional pumping also guarantee mixing?", answer: "No. The pump controls the relationship between two delivered liquids. Junctions, mixing and storage determine downstream uniformity. Measure both path outputs independently and test the prepared liquid; combined volume alone cannot confirm ratio or concentration." },
    { question: "Can speed adjustment change 1:9 to 1:19?", answer: "Not by overall speed adjustment alone. If both outputs change by the same factor, their ratio stays unchanged. A new ratio requires confirmation of the pump-head and displacement configuration, not simply a different speed setting." },
    { question: "How are the two paths specified?", answer: "Working-fluid ports A and B are shown as 1/4-28 UNF-2B and G1/8; both wash-fluid ports are 1/4-28 UNF-2B. Verify each path's wetted materials from the configuration specification rather than borrowing the materials of an RPL model. Confirm operating backpressure separately from the pressure rating." }
  ],
  materialDetails: {
    p4: "The shown configuration uses a polyvinylidene fluoride (PVDF) pump head, an aluminium oxide (Al₂O₃) ceramic set and a 1/4-28 UNF-2B working-fluid port.",
    p635: "The shown configuration uses a polyvinylidene fluoride (PVDF) head and plug, a zirconium dioxide (ZrO₂) ceramic set, and 1/4-28 UNF-2B working-fluid and wash-fluid ports. Identical threads do not make the two circuits interchangeable.",
    p15: "The shown configuration uses a polyvinylidene fluoride (PVDF) head and plug, an aluminium oxide (Al₂O₃) ceramic set, a G1/8 working-fluid port and a 1/4-28 UNF-2B wash-fluid port."
  },
  selectionSingle: "Provide liquid composition, dose volume or continuous flow, allowable delivery time, daily run duration, inlet conditions, outlet backpressure and drive requirements. Use these inputs to size displacement and timing, then verify output in the actual circuit. Application directions are not claims of validation in every listed instrument.",
  selectionDual: "Provide both liquids, target volume ratio, batch volume or total flow, preparation time, both inlet conditions and backpressures, and the downstream mixing arrangement. Assess proportional delivery, instrument control and mixture uniformity separately; listed applications are selection directions, not universal validation claims.",
  specs: { "产品类型": "Product type", "排量范围": "Displacement per revolution", "转速": "Speed", "准确度": "Accuracy", "准确性": "Accuracy", "重复性": "Repeatability", "耐压": "Pressure rating", "寿命": "Service life", "泵头材质": "Pump head material", "堵头材质": "Plug material", "陶瓷套件": "Ceramic set", "工作液路接口": "Working-fluid port", "清洗液路接口": "Wash-fluid port", "整体尺寸": "Overall dimensions", "重量": "Weight", "配置方式": "Configuration", "稀释比": "Concentrate-to-diluent volume ratio", "浓缩液份数": "Concentrate parts", "稀释液份数": "Diluent parts", "浓缩液定量（μL）": "Concentrate volume (μL)", "稀释液定量（μL）": "Diluent volume (μL)", "配液量（mL）": "Combined volume (mL)", "流量 QMin，mL/min": "Minimum flow QMin (mL/min)", "流量 QMax，mL/min": "Maximum flow QMax (mL/min)", "试剂A 工作液路接口": "Reagent A working-fluid port", "试剂B 工作液路接口": "Reagent B working-fluid port", "试剂A 清洗液路接口": "Reagent A wash-fluid port", "试剂B 清洗液路接口": "Reagent B wash-fluid port", "试剂A 端耐压": "Reagent A pressure rating", "试剂B 端耐压": "Reagent B pressure rating", "尺寸/mm": "Dimensions (mm)" },
  customConfiguration: "Custom configuration", metalFitting: "G1/8 (metal push-in fitting by default)",
  applicationsTab: "Applications", applicationsTitle: "Typical applications", selectionTitle: "Define the fluidic task and configuration",
  ctaTitle: "Confirm the {{model}} configuration for your instrument", ctaButton: "Submit requirements",
  drawingUnavailable: "A public 2D drawing is not available for {{model}}. Add a drawing request to the selection list and submit the inquiry; the configuration and drawing revision must be confirmed separately.",
  modelUnavailable: "A public 3D model is not available for {{model}}. Contact us with the required installation space and configuration to request a suitable file.",
  specNotesSingle: ["Flow ranges are calculated from displacement per revolution and speed. Calibrate actual delivery with the intended liquid, backpressure and fluid circuit.","Displacement per revolution is not the dose or minimum reliable volume; verify actual output with the drive, liquid and circuit.","Accuracy, repeatability and life require the applicable test conditions. Confirm permitted working backpressure separately from the pressure rating."],
  specNotesDual: ["Combined flow is calculated from the total displacement of both heads and speed. Verify each channel's output and the volume ratio under the intended liquid and pressure conditions.","The ratio is concentrate volume to diluent volume. Verify both path outputs separately; total volume alone does not establish mixture concentration.","Proportional delivery is separate from mixing. Confirm wetted materials, working backpressure and performance conditions for each path."]
};
