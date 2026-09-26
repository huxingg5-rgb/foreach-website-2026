import type { ApplicationDocumentBody } from "../types";
import {
  PISTON_PRODUCT_LINKS,
  PISTON_TECHNICAL_ARTICLE_LINKS,
} from "../piston-link-network";

const body = {
  intro: [
    { type: "paragraph", text: "FOREACH piston pumps meter reaction reagents, method-specified water and other fixed-source liquids in clinical chemistry analyzers. EA provides capacity, wetted-material and drive options; SM supports compact integration; EAS is an option where pump-chamber deaeration is important. The configuration must cover the useful dose, refill and liquid-change sequences, and the liquid actually received at the dispensing position.", inlineLinks: [
      { text: "FOREACH piston pumps", href: PISTON_PRODUCT_LINKS.category },
      { text: "EA", href: PISTON_PRODUCT_LINKS.eaSeries },
      { text: "SM", href: PISTON_PRODUCT_LINKS.smSeries },
      { text: "wetted-material", href: PISTON_TECHNICAL_ARTICLE_LINKS.materials },
    ] },
    { type: "paragraph", text: "When small reagent doses coexist with larger water additions, define each volume separately before choosing dedicated supply channels or a shared reagent probe. Buffers, enzyme reagents, calibrators and cleaning solutions have different functions and contact paths; capacity, materials and operating parameters should reflect those differences." },
  ],
  sections: [
    {
      id: "liquid-purpose-and-contact",
      title: "Separate reaction reagents, calibration materials and cleaners",
      blocks: [
        { type: "paragraph", text: "Reagent channels often combine a fixed formulation, repeated doses and long contact times. Reaction reagents, calibration materials and maintenance cleaners differ in when they are used, how much is required and which parts they contact. Describing them all as aqueous reagents is not enough to select one material set and operating program." },
        { type: "table", caption: "Liquid function and actual exposure", headers: ["Liquid example", "Instrument function", "Configuration implications"], rows: [
          ["Roche GLUC3 R1: MES buffer, ATP, NADP and magnesium; R3: HEPES buffer, hexokinase and glucose-6-phosphate dehydrogenase", "Separate components of the hexokinase glucose assay.", "Manage R1, R3 and their associated water additions separately, retaining the method's order and use conditions."],
          ["L-alanine, α-ketoglutarate, NADH, LDH and Tris buffer in the Beckman SYNCHRON / UniCel DxC ALT method", "Components used in an enzymatic ALT assay.", "Check the formulation, stabilizers and storage conditions for the actual reagent bottle or compartment; do not transfer liquid-handling settings between formulations without evaluation."],
          ["Calibrators and normal/abnormal quality-control materials", "Establish a calibration relationship or check system performance.", "Sample them according to the calibration or QC procedure. A separate standard dose is not automatically added to every patient sample."],
          ["Acidic, alkaline or surfactant-containing cleaners", "Wash probes, reaction vessels or designated fluid paths.", "Identify cleaners that enter the pump separately from those contacting only the probe or vessel; include maintenance exposure in material selection."],
        ], references: ["roche-gluc3", "beckman-alt"] },
        { type: "paragraph", text: "With direct metering from a fixed source, reagent contacts the pump head, piston, seal and valves, so prolonged immersion and liquid left during shutdown matter. With a system-fluid-driven shared probe, reagent can remain mainly at the front end while the pump contains system fluid. List pump-material requirements separately from probe-end residue requirements. FOREACH can match the wetted assembly to the actual path.", inlineLinks: [
          { text: "pump-material requirements", href: PISTON_TECHNICAL_ARTICLE_LINKS.materials },
        ], references: ["materials"] },
        { type: "paragraph", text: "ISE internal standard, diluent and reference electrolyte have their own functions and supply sequence. For example, the Cobas 8000 ISE internal standard supports correction between sample measurements; it should not be treated as an ordinary colorimetric reaction reagent. Define the dose and channel for each fixed-source liquid separately.", references: ["cdc-sodium"] },
      ],
    },
    {
      id: "dose-and-capacity",
      title: "Match 8 μL and 21 μL reagent doses separately from water additions",
      blocks: [
        { type: "paragraph", text: "Roche GLUC3 V7.0 for cobas c 303, c 503 and c 703 specifies R1 at 21 μL with 106 μL water, and R3 at 8 μL with 15 μL water. Reagent and water are distinct metering actions; their sum is not a dose of neat reagent. The following FOREACH capacity comparison uses those method volumes as engineering inputs and does not imply that the original analyzer uses FOREACH components.", references: ["roche-gluc3"] },
        { type: "table", caption: "Nominal command calculations for EA standard capacities", headers: ["Action", "Capacity and nominal command", "Reason for comparison and remaining margin"], rows: [
          ["21 μL reagent", "EA 50 μL / 2,000 steps: 840 steps, 42% stroke.", "A 100 μL pump uses 21% stroke. If one aspiration serves two 21 μL doses, 8 μL remains in the 50 μL capacity for any same-stroke predispense and reserve."],
          ["8 μL reagent", "EA 50 μL / 2,000 steps: 320 steps, 16% stroke.", "A 100 μL pump uses 160 steps and 8% stroke. More capacity can reduce refills, but the small dose still needs its own aspiration, dispensing, settling and compensation settings."],
          ["106 μL method water", "EA 250 μL / 2,000 steps: 848 steps, 42.4% stroke.", "This exceeds a 100 μL nominal capacity in one stroke. Compare a larger dedicated water channel or multiple actions if the instrument cycle permits."],
          ["15 μL method water", "The same EA 250 μL configuration: 120 steps, 6% stroke.", "Capacity for the larger water addition does not establish performance at 15 μL. Validate this working point separately; compare separate channels or another drive configuration where needed."],
        ], references: ["ea-datasheet"] },
        { type: "paragraph", text: "EA spans nominal capacities from 50 μL to 20 mL. The table uses the stated 2,000-step configurations; nominal volume per step organizes commands but is not delivered-volume accuracy. For example, EA-100-PEEK specifies full-stroke accuracy and repeatability of ≤0.5% under its specified test conditions. Those results cannot be applied directly to an 8 μL or 21 μL dose.", inlineLinks: [
          { text: "EA-100-PEEK", href: PISTON_PRODUCT_LINKS.ea100Peek },
          { text: "accuracy and repeatability", href: PISTON_TECHNICAL_ARTICLE_LINKS.accuracy },
        ], references: ["ea-datasheet", "ea-100"] },
        { type: "paragraph", text: "For a few repeatedly used reagents, compare small-capacity reagent channels with a larger water channel so each volume occupies an appropriate working stroke. If one system-fluid drive also handles aspiration, air gaps, retraction or water delivery, recalculate the maximum uninterrupted displacement. Selecting only for the smallest 8 μL dose can overlook auxiliary travel; adding reagent and water volumes also does not mean both liquids physically enter the pump chamber." },
        { type: "paragraph", text: "Keep distinct working-point parameters for 8 μL, 21 μL, 106 μL and 15 μL. A capacity or drive change requires an updated volume-to-pulse conversion and renewed checks of valve state and final delivery. Do not apply one dose's compensation factor to every volume." },
      ],
    },
    {
      id: "dedicated-or-shared",
      title: "Compare dedicated supply and shared probes by switching loss and throughput",
      blocks: [
        { type: "paragraph", text: "Dedicated channels suit a small number of frequently dispensed reagents, particularly when cross-contamination matters: materials and liquid parameters can be set independently, with less cross-reagent displacement. The costs are more pumps and valves, installation space and maintenance paths. A shared probe reduces the number of independent channels when many bottles must be accessed randomly, but aspiration, travel, delivery and washing all count toward the cycle. Compare reagent variety, switching frequency, permitted consumption and throughput together.", references: ["tecan-selection"] },
        { type: "paragraph", text: "A shared arrangement can mean either a selector valve brings fixed-source reagents into the pump, or system fluid drives a reagent segment at the probe front end. In the former, pump, valve and tubing residue all matter during a liquid change. In the latter, probe washing, segment interfaces and tip recovery are central. Both use displacement metering, but their cleaning targets and stroke budgets differ." },
        { type: "paragraph", text: "Shared-path volume directly affects small-dose reagent consumption. A circular tube with 0.5 mm internal diameter and 500 mm length holds π × (0.5 mm ÷ 2)² × 500 mm ≈ 98.2 μL, before valves and the probe are included. Against an 8 μL useful dose, the shared liquid inventory is already substantial. A larger pump can reduce aspiration frequency but cannot remove switching residue." },
        { type: "paragraph", text: "The calculated 98.2 μL is geometric tube volume, not a validated flushing volume. Valve cavities, fittings and surface retention change the concentration-recovery profile. Determine actual displacement from its effect on the following reagent or blank. Compare a shorter shared segment, switching closer to the delivery point, or dedicated channels for costly or mutually interfering reagents before settling on pump capacity." },
      ],
    },
    {
      id: "first-dose-and-maintenance",
      title: "Recover the first dose after refrigeration, idle or a bottle change",
      blocks: [
        { type: "paragraph", text: "If continuous dispensing is normal but the first dose after idle is low, first inspect tip evaporation, retained liquid and liquid-column recovery. If the problem begins after changing a bottle, check inlet air and interrupted supply. Complete recovery before useful metering and send priming and predispense liquid to the defined waste path.", inlineLinks: [
          { text: "first dose after idle", href: PISTON_TECHNICAL_ARTICLE_LINKS.drift },
        ] },
        { type: "table", caption: "Plan recovery for the actual liquid and operating state", headers: ["State or medium", "Structural or program response", "Record alongside dose performance"], rows: [
          ["Refrigerated enzyme or coenzyme reagent", "Set aspiration speed and settling at the actual aspiration temperature; reduce inlet resistance and retain the reagent's storage and on-board use requirements.", "Minimum dose, first delivered dose, bubbles and full cycle time. Do not warm the reagent arbitrarily to accelerate aspiration."],
          ["Bottle change, low level or chamber air after priming", "Inspect bottle supply and inlet joints; compare EAS if trapped chamber gas is difficult to clear; prime to waste.", "Recovery liquid consumption, recovery time, then the first and subsequent doses."],
          ["Tip evaporation or liquid-column change during planned idle", "Define tip recovery and any predispense using the longest expected idle interval.", "Record the first dose separately. Predispense is not part of the reaction dose."],
          ["Salt-containing residue drying near the seal", "Compare EA's optional seal flushing and establish shutdown washing and residual-liquid management for the formulation.", "Seal condition, motion resistance and maintenance interval; keep flush liquid out of useful reagent."],
        ], references: ["ea-datasheet", "eas-datasheet"] },
        { type: "paragraph", text: "When aspiration response slows, reduce aspiration speed, soften acceleration or extend settling and observe whether delivery recovers; then check whether the full cycle remains acceptable. Aspiration and dispensing can be tuned independently. If the added wait exceeds the cycle budget, optimize the inlet path and action sequence rather than assuming that more waiting is the final solution.", references: ["tecan-selection"] },
        { type: "paragraph", text: "Record storage temperature, reagent-compartment temperature and actual aspiration temperature separately. A reagent's 2–8°C storage instruction is not automatically the temperature inside the operating pump. Beckman's glucose reagent instructions identify unusual turbidity, precipitate or color change as possible deterioration indicators. Follow the reagent instructions for these conditions; slower pumping or recalibration cannot restore reagent activity.", references: ["beckman-glucose"] },
        { type: "paragraph", text: "If warming causes continuing gas release, address upstream supply temperature and degassing conditions. Longer settling alone may not solve it. EAS improves pump-chamber priming and gas clearance; removing dissolved gas from the liquid is a different task.", references: ["eas-datasheet", "idex-degassing"] },
        { type: "paragraph", text: "Material selection must include liquids encountered during maintenance. The CDC Cobas 8000 procedure, for example, records 1 mol/L NaOH and 200 mmol/L HCl for designated probe or reaction-cell cleaning. These are that instrument's cleaning conditions, not a universal piston-pump cleaning recipe. Assess the actual concentration, temperature, duration and contact path across the head, piston, seal, valves and tubing. A PEEK head alone does not establish compatibility of the whole channel.", references: ["cdc-sodium", "materials"] },
        { type: "paragraph", text: "Define the seal-flush inlet, discharge path and shutdown sequence so flushing manages deposits at the intended location without adding cleaning water to the effective reagent. Increasing resistance, metering drift or visible deposits calls for inspection of residue and seals, not indefinite drive-force compensation. EA's five-million-cycle life statement is tied to pure water at room temperature and 50 kPa backpressure; maintenance in a reagent channel depends on formulation, cleaning and duty cycle.", inlineLinks: [
          { text: "metering drift", href: PISTON_TECHNICAL_ARTICLE_LINKS.drift },
        ], references: ["ea-datasheet"] },
      ],
    },
    {
      id: "batch-and-refill-budget",
      title: "Budget useful doses, predispense and reserve within one aspiration",
      blocks: [
        { type: "paragraph", text: "A fixed reagent source or dedicated channel can deliver several doses after one aspiration. A shared probe moving between reagent bottles must satisfy switching and washing requirements first. The batch capacity must contain useful doses, any same-stroke predispense and the ending reserve." },
        { type: "table", caption: "Worked 8 μL batch budget; 5 μL predispense and 5 μL reserve are assumptions", headers: ["Configuration", "Complete doses available", "Nominal command per dose"], rows: [
          ["EA 50 μL / 2,000 steps", "Floor[(50 − 5 − 5) ÷ 8] = 5 doses.", "320 steps; 16% stroke."],
          ["EA 100 μL / 2,000 steps", "Floor[(100 − 5 − 5) ÷ 8] = 11 doses, with a further 2 μL not used for a complete dose.", "160 steps; 8% stroke."],
        ], references: ["ea-datasheet"] },
        { type: "paragraph", text: "Predispense and reserve must actually occupy the same stroke for this calculation to apply. Recovery from a separate priming cycle has its own liquid and time cost. Five and eleven doses are budgets under the stated assumptions, not fixed product capabilities; the actual reserve depends on the tip, idle state and recovery sequence." },
        { type: "paragraph", text: "Choose 100 μL when fewer refills produce a useful cycle-time benefit while the 8 μL working point still meets requirements. At 500 μL and 1 mL capacity, an 8 μL dose uses only 1.6% and 0.8% stroke respectively. Compare small-dose delivery, refill time and differences between the first, middle and final doses—not simply how many doses fit in a full pump." },
      ],
    },
    {
      id: "verify-delivery-and-consumption",
      title: "Verify first and last doses as well as total reagent consumption",
      blocks: [
        { type: "paragraph", text: "Measure at the actual receiving position with the reagent or justified surrogate, temperature, valve path, tubing, tip and aspiration/dispensing program fixed. For an 8 μL action, a project mean-volume error target of ±1% corresponds to 7.92–8.08 μL. This is an illustrative acceptance target, not an added product specification. Define repeatability separately and record the statistical method, replicate count and measurement uncertainty.", references: ["volume-verification"] },
        { type: "table", caption: "Keep steady-state, recovery and batch-position results separate", headers: ["Operating state", "What to evaluate", "Response to a difference"], rows: [
          ["Steady repeated dispensing", "Mean error, repeatability and time at 8 μL, 21 μL and each water volume.", "Consider working-point calibration for a stable bias; do not transfer one volume's correction to another."],
          ["Longest planned idle or bottle change", "First dose, subsequent doses, recovery time and recovery consumption.", "If only the first dose is low, improve priming, tip recovery or predispense; if the result changes with level, inspect supply and air entry."],
          ["One aspiration, multiple deliveries", "First, middle and final doses and the first dose after refill, including reversal and valve switching.", "Check reserve and recovery; a batch average can conceal first- or last-dose errors."],
          ["Reagent switching", "Residue effect on the next reagent or blank, wash time and actual displacement volume.", "Inspect the shared segment and wash path first. Correct pump displacement can coexist with incorrect composition."],
        ] },
        { type: "paragraph", text: "Consumption includes useful doses, priming, predispense, switching displacement and shutdown washing. Full cycle time includes refill, settling, valve switching and probe washing. Compatibility evaluation should also inspect adsorption, precipitation and recovery after cleaning; acceptable volume alone does not establish unchanged reagent concentration or activity." },
        { type: "paragraph", text: "Provide each channel's reagent or formulation range, actual operating temperature, minimum and routine dose, doses per batch, longest idle period, bottle-change method, bias and repeatability targets, backpressure, cleaning path and installation envelope. FOREACH can then match capacity, wetted materials, seal flushing, valves and drive. Compare SM or TM where space is limited and EAS where chamber deaeration limits recovery.", inlineLinks: [
          { text: "SM", href: PISTON_PRODUCT_LINKS.smSeries },
          { text: "TM", href: PISTON_PRODUCT_LINKS.tmSeries },
        ] },
      ],
    },
  ],
  references: [
    { id: "roche-gluc3", title: "Roche — Glucose HK Gen.3, cobas c 303 / c 503 / c 703, V7.0 (2024)", href: "https://elabdoc-prod.roche.com/eLD/api/downloads/d6c2ba0d-5e34-ef11-2491-005056a772fd?countryIsoCode=be" },
    { id: "beckman-alt", title: "Beckman Coulter — Alanine Aminotransferase, SYNCHRON / UniCel DxC, A18452 AU", href: "https://www.beckmancoulter.com/download/file/phxA18452AU-EN_US/A18452AU?type=pdf" },
    { id: "materials", title: "FOREACH — Piston-pump head and wetted-material selection", href: "/en/resources/technical-articles/piston-pump-head-material-selection/" },
    { id: "cdc-sodium", title: "CDC / NHANES — Sodium, Roche Cobas 8000 Laboratory Procedure Manual (2021–2023)", href: "https://wwwn.cdc.gov/nchs/data/nhanes/public/2021/labmethods/BIOPRO-L-MET-Sodium-508.pdf" },
    { id: "ea-datasheet", title: "FOREACH — EA Piston Pump Datasheet, capacities and test conditions", href: "https://www.foreachtek.com/downloads/resources/datasheets/en/Pumps/ps-120b-2507-00001-001-en-ea-piston-pump.pdf" },
    { id: "ea-100", title: "FOREACH — EA-100-PEEK configuration and specifications", href: "/en/products/pumps/piston-pump/ea-100-peek/" },
    { id: "tecan-selection", title: "Tecan — Liquid handling pump selection: a guide for lab automation engineers", href: "https://www.tecan.com/blog/pump-selection-guide-for-systems-engineers" },
    { id: "eas-datasheet", title: "FOREACH — EAS Easy-to-Degas Piston Pump Datasheet", href: "https://www.foreachtek.com/downloads/resources/datasheets/en/Pumps/ps-120b-2507-00002-001-en-eas-piston-pump.pdf" },
    { id: "beckman-glucose", title: "Beckman Coulter — Glucose, AU / DxC AU, BAOSR6X21", href: "https://www.beckmancoulter.com/download/file/phxBAOSR6X2116-EN_US/BAOSR6X2116?type=pdf" },
    { id: "idex-degassing", title: "IDEX Health & Science — Degassing and bubble control", href: "https://idex-hs.com/capabilities/fluidics/component-technology/degassers" },
    { id: "volume-verification", title: "Albert and Bradshaw — Importance of Integrating a Volume Verification Method for Liquid Handlers: Applications in Learning Performance Behavior (2007)", href: "https://doi.org/10.1016/j.jala.2006.10.005" },
  ],
  related: [
    { label: "Piston-pump capacity and configuration", href: "/en/applications/analytical-instruments/piston-pump/" },
    { label: "Sample aspiration and transfer", href: "/en/applications/analytical-instruments/piston-sample-transfer/" },
    { label: "Dilution, spiking and proportioning", href: "/en/applications/analytical-instruments/piston-dilution/" },
    { label: "Incremental titrant dosing", href: "/en/applications/analytical-instruments/piston-titration/" },
  ],
} satisfies ApplicationDocumentBody;

export default body;
