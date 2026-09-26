import type { ApplicationDocumentBody } from "../types";
import {
  PISTON_PRODUCT_LINKS,
  PISTON_TECHNICAL_ARTICLE_LINKS,
} from "../piston-link-network";

const body = {
  intro: [
    { type: "paragraph", text: "FOREACH piston pumps provide the metering motion for sample aspiration and transfer in clinical chemistry analyzers. Working with a sampling probe, valves and a system-fluid channel, they deliver serum, assay-approved plasma or urine to the reaction vessel. For small samples, the configuration must address working stroke, the liquid segment at the probe and washing: the required volume must arrive without unintended dilution or unacceptable carryover from the previous sample.", inlineLinks: [
      { text: "FOREACH piston pumps", href: PISTON_PRODUCT_LINKS.category },
    ] },
    { type: "paragraph", text: "Consider a fixed-probe channel that normally delivers 5 μL and also needs a 20 μL dose. The following engineering example compares 50 μL and 100 μL capacities, system-fluid displacement, slow aspiration response, the first dose after idle and sample-change residue. The 5 μL and 20 μL points are design examples; the assay determines the instrument's actual volumes. EA offers capacity, material and drive options; SM and TM can be compared where space is constrained, while EAS addresses a separate need for easier pump-chamber deaeration.", inlineLinks: [
      { text: "slow aspiration response", href: PISTON_TECHNICAL_ARTICLE_LINKS.viscosity },
      { text: "first dose after idle", href: PISTON_TECHNICAL_ARTICLE_LINKS.drift },
      { text: "EA", href: PISTON_PRODUCT_LINKS.eaSeries },
      { text: "SM", href: PISTON_PRODUCT_LINKS.smSeries },
      { text: "TM", href: PISTON_PRODUCT_LINKS.tmSeries },
    ] },
  ],
  sections: [
    {
      id: "sample-and-contact-path",
      title: "Define the sample and its contact path first",
      blocks: [
        { type: "paragraph", text: "A sample channel must obtain a defined aliquot from a limited specimen, preserve its composition and deliver it to the reaction position. First decide where the sample will remain. With system-fluid displacement, the sample can stay mainly in the probe and front-end tubing while the pump contains system fluid. If sample passes through the pump, the pump, valves and tubing all become sample-contact surfaces that require cleaning. This decision comes before selecting the pump-head material or wash volume.", inlineLinks: [
          { text: "pump-head material", href: PISTON_TECHNICAL_ARTICLE_LINKS.materials },
        ] },
        { type: "table", caption: "Specimen and aspiration conditions are assay-specific", headers: ["Sample", "Channel design considerations", "Inputs needed"], rows: [
          ["Separated serum", "Where the sample segment resides; small-volume delivery; internal and external probe washing; carryover.", "Minimum and routine doses, available specimen volume, and abnormal protein content or visible microclots."],
          ["Assay-approved plasma, such as heparin plasma for applicable tests", "Anticoagulant, fibrin and specimen condition as well as volume.", "The anticoagulant and target assay. Acceptance for one assay does not establish suitability for every chemistry test."],
          ["Urine for the specified assay", "Direct sampling or predilution; sediment, mixing and aspiration position.", "The method's preparation, diluent, dilution ratio and aliquot volume."],
        ] },
        { type: "paragraph", text: "For example, the Roche GLUC3 method accepts serum, specified plasma types and urine under its respective method settings. FOREACH configures the metering channel around these defined conditions. When system fluid drives the sample, list the pump-contact liquid separately from the specimen contacting the probe.", references: ["roche-gluc3"] },
        { type: "paragraph", text: "Available specimen volume is not the same as the delivered dose. A 5 μL reaction dose does not mean that a tube containing only 5 μL can be sampled reliably. Probe immersion, inaccessible liquid at the container bottom, aspiration reserve and repeat tests all consume the specimen budget. For limited specimens, reduce unusable front-end volume and unnecessary aspiration loss first. This page concerns serum, plasma and urine prepared as required by the assay; cellular whole blood and disposable-tip pipetting require their own fluid-path design." },
      ],
    },
    {
      id: "capacity-and-stroke",
      title: "Compare 5 μL and 20 μL doses with the complete stroke budget",
      blocks: [
        { type: "paragraph", text: "The assay determines the working dose. Roche GLUC3 on cobas c 303, c 503 and c 703 uses a normal sample volume of 1.5 μL. That method point illustrates an even shorter stroke; it is not a FOREACH small-volume performance claim. The 5 μL and 20 μL points below are an independent capacity-selection example.", references: ["roche-gluc3"] },
        { type: "table", caption: "Nominal conversion for EA configurations with 2,000 full-stroke steps", headers: ["Delivered-volume target", "EA 50 μL: stroke / steps", "EA 100 μL: stroke / steps", "Selection implication"], rows: [
          ["1.5 μL", "3% / 60", "1.5% / 30", "Evaluate reversal, valve motion and probe-tip delivery at this short working stroke."],
          ["5 μL", "10% / 200", "5% / 100", "The smaller capacity uses more stroke; check that auxiliary aspiration segments still fit."],
          ["20 μL", "40% / 800", "20% / 400", "Compare 50 μL first if both doses are primary tasks, then check the maximum uninterrupted aspiration budget."],
        ], note: "Stroke percentages and step counts are calculated command relationships, not measured liquid-delivery accuracy.", references: ["ea-datasheet"] },
        { type: "paragraph", text: "The nominal full-step volumes are 0.025 μL for the 50 μL configuration and 0.05 μL for the 100 μL configuration. More full steps for the same dose permit finer command increments, but transmission behavior, reversal, valve switching and tip retention still affect delivery. Accuracy does not improve in direct proportion to the number of steps.", references: ["ea-datasheet"] },
        { type: "paragraph", text: "If a project sets a mean-volume error target of ±1% at 5 μL, the absolute allowance is ±0.05 μL—one nominal full step of the 100 μL / 2,000-step configuration. This comparison calls for both mechanical and liquid-delivery evaluation; the availability of motor microstepping alone does not establish compliance. The overview explains why full-stroke specifications and the datasheet's 2%-stroke displacement tests cannot replace validation of this delivered dose." },
        { type: "paragraph", text: "Include auxiliary movements in the same uninterrupted stroke. For example, 20 μL of useful sample, a nominal 5 μL air gap and 5 μL of auxiliary displacement total 30 μL, leaving 20 μL of nominal capacity in a 50 μL pump. Adding another 30 μL segment in that stroke raises the budget to 60 μL; compare a 100 μL configuration or change the sequence. These auxiliary volumes are calculation assumptions, not standard sample-program settings. Check gas compression and segment position under the actual pressure and sequence." },
        { type: "paragraph", text: "Limited specimen volume calls for reduced front-end waste. Large auxiliary segments call for a stroke-budget check. Restricted installation space calls for comparison with SM or TM. These are different constraints and do not all lead to a larger pump." },
        { type: "links", items: [{ label: "Piston-pump capacity and performance selection", href: "/en/applications/analytical-instruments/piston-pump/" }] },
      ],
    },
    {
      id: "system-fluid-sequence",
      title: "Keep the sample at the front end and deliver the aliquot to the vessel",
      blocks: [
        { type: "paragraph", text: "For patient samples that change from tube to tube, a FOREACH piston pump can move system fluid while the sample remains mainly in the probe and front-end tubing. This limits the extent of sample contact with the pump, but does not remove interface mixing, tip retention or wash residue. Direct aspiration into the pump is also possible in a suitable dedicated fluid path, provided every wetted surface can be cleaned and sample composition is preserved." },
        { type: "table", caption: "Turn the sampling cycle into defined liquid-handling actions", headers: ["Action", "Fluid-path and program arrangement", "Required outcome"], rows: [
          ["Prime", "Fill the pump, valves and drive tubing with the specified system fluid; send recovery liquid to waste.", "Establish a stable liquid column before metering. Priming volume is not sample volume."],
          ["Aspirate", "Coordinate liquid level, aspiration speed and settling time; define any method-approved air gap separately.", "Acquire the complete sample segment without aspirating air or excessive system-fluid mixing."],
          ["Deliver", "Coordinate valve position, dispensing, contact or non-contact transfer and subsequent retraction.", "Deliver the required sample to the reaction vessel, not merely complete the motor command."],
          ["Change samples", "Wash the probe internally and externally and clean the actual shared path.", "Control the previous sample's contribution to the next sample."],
        ] },
        { type: "paragraph", text: "Research on liquid-filled automated handling identifies liquid segments, air gaps and motion speed as variables affecting sample integrity. In a simple 5 μL delivery example, replacing 0.1 μL of sample with analyte-free system fluid lowers concentration by 2%, assuming additive volumes and no analyte loss. Measuring a total volume of 5 μL therefore does not, by itself, confirm the effective sample fraction.", references: ["sample-integrity"] },
        { type: "paragraph", text: "Fix the tip-delivery arrangement early. Contact dispensing uses the vessel wall or existing liquid to assist droplet transfer, so contact position and subsequent cleaning matter. Non-contact dispensing requires the drop to detach completely; dispensing speed, outlet geometry and liquid surface properties work together. If the final drop remains on the tip, extra motor steps may affect the next delivery rather than repair the current one. Tune retraction as a separate action after the effective dose has transferred." },
        { type: "paragraph", text: "A deliberate air gap is different from an uncontrolled bubble in the pump. The former is a defined part of the segment program; the latter can consume displacement as pressure changes. When composition is wrong, inspect interfaces and delivery order. When volume fluctuates under an unchanged program, investigate air aspiration, leaks and trapped gas. Metering motion, valves and probe handling must be tuned against the same receiving position; motor completion and valve confirmation are not substitutes for the final liquid result.", inlineLinks: [
          { text: "uncontrolled bubble in the pump", href: PISTON_TECHNICAL_ARTICLE_LINKS.bubbles },
        ] },
      ],
    },
    {
      id: "abnormal-samples-and-recovery",
      title: "Separate slow aspiration, clots, analytical interference and bubbles",
      blocks: [
        { type: "paragraph", text: "Distinguish liquid that has not reached its intended position in time from a specimen that is unsuitable for the assay. Fluid-path and motion changes may improve the former; the latter requires the method's specimen-handling rules. Treating every abnormal sample as a viscosity problem leads to the wrong compensation." },
        { type: "table", caption: "Match the response to the actual cause", headers: ["Observed condition", "Configuration or instrument response", "Decision boundary"], rows: [
          ["Serum or plasma with abnormal immunoglobulin content and slow aspiration response", "Evaluate inlet resistance at the actual temperature; adjust aspiration speed, acceleration and settling independently.", "Confirm under-aspiration. Protein precipitation or assay interference is a separate issue that slower pumping does not resolve."],
          ["Fibrin strands or microclots", "Use appropriate instrument clot detection and exception handling; apply the required specimen preparation before resampling.", "Do not use increased drive force to pull through a blockage. The pump does not replace specimen preparation."],
          ["Lipemic, hemolyzed or icteric specimens", "Coordinate with sample-integrity checks and assay-specific interference rules.", "Appearance or optical interference is not equivalent to high viscosity; changing dose or pump speed does not establish an acceptable assay result."],
          ["High-concentration sample followed by a low-concentration sample", "Reduce the shared sample path and apply internal, external and, where needed, targeted probe washes.", "Measure the effect on the low sample, not only the volume of a water blank."],
          ["Gas trapped in the system-fluid pump after a liquid change", "Compare EAS chamber geometry together with orientation, inlet sealing and a priming sequence.", "Easier chamber deaeration does not correct an empty inlet or continuing upstream gas release."],
        ], references: ["roche-gluc3", "paraprotein", "eas-datasheet"] },
        { type: "paragraph", text: "For confirmed slow aspiration without a blockage, first check inlet probe and tubing length and bore. Reduce aspiration speed, soften acceleration and allow the liquid column to settle while the probe remains in its specified position. Tune dispensing separately instead of slowing the entire cycle proportionally. These changes consume time: if volume recovers but throughput fails, improve the inlet path or redistribute the cycle time. Tecan's pump-selection guidance likewise relates liquid behavior to aspiration, dispensing, settling and throughput.", inlineLinks: [
          { text: "confirmed slow aspiration", href: PISTON_TECHNICAL_ARTICLE_LINKS.viscosity },
          { text: "soften acceleration", href: PISTON_TECHNICAL_ARTICLE_LINKS.acceleration },
        ], references: ["tecan-selection"] },
        { type: "paragraph", text: "A stable low mean under repeatable conditions may justify working-point calibration after residue and dilution have been excluded. An abnormal first dose followed by normal doses points to idle recovery or priming. Occasional large deficits point first to clots, air aspiration or bubbles. A fixed volume offset is not an effective correction for a changing fault. EAS supports chamber deaeration; it does not provide specimen-clot or low-level detection." },
        { type: "paragraph", text: "Carryover can be translated into an assay error budget. If a 3 mmol/L glucose segment has 0.1% of its volume replaced by a preceding 30 mmol/L sample, an ideal mixing calculation gives an increase of (30 − 3) × 0.001 = 0.027 mmol/L, or 0.9% of the low value. This is a worked error-budget example, not a universal carryover limit; the assay defines the acceptable effect." },
        { type: "links", items: [
          { label: "Aspiration and dispensing motion profiles", href: "/en/resources/technical-articles/piston-pump-acceleration-deceleration-curves/" },
          { label: "Priming and bubble-related dispensing error", href: "/en/resources/technical-articles/piston-pump-air-bubbles-dispensing-error/" },
        ] },
      ],
    },
    {
      id: "verify-the-sample-channel",
      title: "Verify volume, sample integrity and recovery at the receiving position",
      blocks: [
        { type: "table", caption: "Connect the metering configuration to the fixed-probe channel", headers: ["Area", "Conditions to define", "When to reconsider the arrangement"], rows: [
          ["Pump and front-end wetted path", "Configure the pump for the actual system fluid and cleaners passing through it; configure the probe for specimen, cleaners and aspiration position.", "If sample enters the pump, include its chamber and valves in compatibility, adsorption and washing evaluation."],
          ["Tip and valve path", "Define tip position, shared-path volume, internal and external washing together with the useful sample segment.", "If high-to-low carryover exceeds the assay allowance, locate residue before comparing dedicated paths or more effective washing."],
          ["Control and recovery", "Specify homing, optional position feedback, valve states and priming to waste separately.", "Air aspiration and blocked-probe detection need relevant sensing and exception logic; an encoder alone cannot identify them."],
        ] },
        { type: "paragraph", text: "EA offers an optional ISC1000 driver with RS-232, RS-485 or CAN interface configurations. Initial-position sensing and optional motor closed-loop optical encoder feedback are distinct options. FOREACH can match the metering drive, interfaces and valve components to the application; probe motion and assay coordination remain instrument-level functions.", references: ["ea-datasheet"] },
        { type: "paragraph", text: "For an illustrative acceptance target of ±1% mean-volume error and CV ≤1% at 5 μL, the acceptable mean is 4.95–5.05 μL and standard deviation is no more than 1% of the measured mean. A ±1% mean-volume target at 20 μL corresponds to 19.8–20.2 μL. These are project acceptance examples, not new small-dose product specifications. Define accuracy, repeatability and CV consistently with the selected test procedure." },
        { type: "paragraph", text: "Assess continuous sampling, the first dose after the longest planned idle period, the first dose after sample-change washing and sampling at low liquid level separately. Volume measurement establishes how much arrived; an appropriate tracer or analytical method checks unintended system-fluid dilution; a high-to-low sequence measures carryover. Verification of a liquid handler must cover the actual task and sample integrity as well as volume.", references: ["volume-verification", "sample-integrity"] },
        { type: "paragraph", text: "At 5 μL, a ±1% allowance is only ±0.05 μL. Record the specimen or surrogate, temperature, density, replicate count and measurement uncertainty, and control evaporation. Balance display resolution alone does not establish that the measurement method is adequate." },
        { type: "paragraph", text: "For configuration discussions, provide a concrete brief: fixed-probe serum channel; 5 μL routine and 20 μL maximum dose; identified system fluid and cleaners; auxiliary aspiration segments; complete cycle time; and separate first-dose and steady-state bias/CV targets. This narrows the choice to a useful capacity, wetted assembly and drive configuration." },
      ],
    },
  ],
  references: [
    { id: "roche-gluc3", title: "Roche — Glucose HK Gen.3, cobas c 303 / c 503 / c 703, V7.0 (2024)", href: "https://elabdoc-prod.roche.com/eLD/api/downloads/d6c2ba0d-5e34-ef11-2491-005056a772fd?countryIsoCode=be" },
    { id: "ea-datasheet", title: "FOREACH — EA Piston Pump Datasheet, basic capacities and test conditions", href: "https://www.foreachtek.com/downloads/resources/datasheets/en/Pumps/ps-120b-2507-00001-001-en-ea-piston-pump.pdf" },
    { id: "sample-integrity", title: "Ouyang et al. — Strategies to Maintain Sample Integrity Using a Liquid-Filled Automated Liquid-Handling System with Fixed Pipetting Tips (2008)", href: "https://doi.org/10.1016/j.jala.2007.10.007" },
    { id: "paraprotein", title: "Hortin et al. — Problematic Proteins: A Patient with a High Paraprotein Concentration (2024)", href: "https://doi.org/10.1093/clinchem/hvae065" },
    { id: "eas-datasheet", title: "FOREACH — EAS Easy-to-Degas Piston Pump Datasheet", href: "https://www.foreachtek.com/downloads/resources/datasheets/en/Pumps/ps-120b-2507-00002-001-en-eas-piston-pump.pdf" },
    { id: "tecan-selection", title: "Tecan — Liquid handling pump selection: a guide for lab automation engineers", href: "https://www.tecan.com/blog/pump-selection-guide-for-systems-engineers" },
    { id: "volume-verification", title: "Albert and Bradshaw — Importance of Integrating a Volume Verification Method for Liquid Handlers: Applications in Learning Performance Behavior (2007)", href: "https://doi.org/10.1016/j.jala.2006.10.005" },
  ],
  related: [
    { label: "Piston-pump capacity and configuration", href: "/en/applications/analytical-instruments/piston-pump/" },
    { label: "Predilution and resampling", href: "/en/applications/analytical-instruments/piston-dilution/" },
    { label: "Reagent dispensing and first-dose recovery", href: "/en/applications/analytical-instruments/piston-reagent-dispensing/" },
  ],
} satisfies ApplicationDocumentBody;

export default body;
