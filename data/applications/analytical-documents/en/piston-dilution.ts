import type { ApplicationDocumentBody } from "../types";
import {
  PISTON_PRODUCT_LINKS,
  PISTON_TECHNICAL_ARTICLE_LINKS,
} from "../piston-link-network";

const body = {
  intro: [
    { type: "paragraph", text: "FOREACH piston pumps can meter sample and specified diluent separately in a clinical chemistry analyzer. Together with valves, a dilution vessel and a mixing sequence, they support predilution, reduced-sample measurement and subsequent aliquoting. Different pump capacities can give the small sample volume and the larger diluent volume appropriate working strokes.", inlineLinks: [
      { text: "FOREACH piston pumps", href: PISTON_PRODUCT_LINKS.category },
    ] },
    { type: "paragraph", text: "Routine testing must follow an assay-approved dilution procedure. Development work such as spike recovery or standard preparation needs a separately defined stock concentration, matrix and final volume. The examples below connect the actual liquid-handling actions to capacity selection, fluid-path design and separate verification of volume, concentration ratio and the aliquot delivered after mixing." },
  ],
  sections: [
    {
      id: "predilution-capacity-example",
      title: "20 μL sample, 60 μL diluent, then a 3 μL aliquot",
      blocks: [
        { type: "paragraph", text: "The decreased-sample setting in Roche GLUC3 V7.0 for cobas c 303, c 503 and c 703 predilutes 20 μL of sample with 60 μL of the specified NaCl diluent, then uses 3 μL of the diluted sample. The normal sample setting is 1.5 μL.", references: ["roche-gluc3"] },
        { type: "paragraph", text: "Assuming additive volumes, complete mixing and no analyte loss, the dilution vessel contains one-quarter of the original concentration. Its 3 μL aliquot therefore contains the equivalent of 0.75 μL of original sample—half the 1.5 μL normal sample input. This explains the method sheet's 1:2 rerun dilution and automatic result multiplication by two. The fourfold concentration dilution in the vessel and the method's twofold rerun correction describe different stages; do not multiply the correction factors again. The analyzer handles the reported concentration according to the method.", references: ["roche-gluc3"] },
        { type: "table", caption: "FOREACH capacity-design example based on those volumes; step counts are nominal", headers: ["Channel and action", "Capacity, steps and stroke", "Configuration rationale"], rows: [
          ["20 μL original sample", "EA 50 μL / 2,000 steps: 800 steps, 40% stroke.", "Use the smaller capacity for sample-side displacement. The sample can remain at the probe front end and be driven by system fluid."],
          ["60 μL diluent", "EA 100 μL / 2,000 steps: 1,200 steps, 60% stroke.", "Cover the diluent volume independently, with its own materials, speed and refill sequence."],
          ["3 μL aliquot after mixing", "The same EA 50 μL configuration: 120 steps, 6% stroke.", "The sample drive may be reused, but the small aliquot needs its own aspiration, settling, dispensing and tip-delivery settings."],
          ["Mixing and low-level management", "80 μL nominal mixture in the dilution vessel.", "The instrument defines sufficient mixing, minimum usable liquid level and aspiration position. Completed piston travel does not confirm these conditions."],
        ], references: ["ea-datasheet"] },
        { type: "paragraph", text: "The 50 μL and 100 μL capacities are EA standard configurations. The calculations use nominal capacity divided by full-stroke steps; they are not delivery-accuracy results at these working points. EA-100-PEEK's full-stroke accuracy and repeatability specifications of ≤0.5%, under the stated test conditions, cannot be transferred directly to partial strokes or mixture concentration. This design example does not imply that the Roche analyzer uses FOREACH products.", inlineLinks: [
          { text: "EA standard configurations", href: PISTON_PRODUCT_LINKS.eaSeries },
          { text: "EA-100-PEEK", href: PISTON_PRODUCT_LINKS.ea100Peek },
          { text: "accuracy and repeatability", href: PISTON_TECHNICAL_ARTICLE_LINKS.accuracy },
        ], references: ["ea-datasheet", "ea-100"] },
        { type: "paragraph", text: "Budget any isolation segments, retraction and retained volume in the same stroke. If sample-side auxiliary actions exceed the usable 50 μL stroke, compare 100 μL; the 3 μL aliquot would then correspond to 60 full steps, and the control program must change accordingly. If aspiration/dispensing mixing requires a larger liquid movement, arrange an appropriate mixing action or separate channel instead of assuming that the small-dose metering capacity must also handle the whole mixture." },
      ],
    },
    {
      id: "diluent-and-matrix",
      title: "Specify diluent, reaction water and calibration matrix separately",
      blocks: [
        { type: "paragraph", text: "Dilution changes salt concentration, protein matrix and reaction conditions as well as analyte concentration. Establish the assay-approved diluent and any required stabilization interval before designing the metering sequence. The method determines whether water, saline or a dedicated matrix is suitable." },
        { type: "table", caption: "Different preparation tasks have different liquid requirements", headers: ["Task", "Liquid example", "Design requirement"], rows: [
          ["Sample predilution", "NaCl diluent in the GLUC3 decreased-sample setting.", "Use the specified working solution and sequence. A concentrate's label concentration is not automatically its concentration when it contacts the sample."],
          ["Water added to the reaction", "Method water associated with GLUC3 reaction reagents.", "Meter and record it separately from sample predilution; the two additions have different roles."],
          ["Dedicated ISE dilution", "HEPES / triethanolamine diluent in the Cobas 8000 ISE workflow.", "Retain the formulation and procedure for that electrolyte-measurement system."],
          ["Calibration materials and development standards", "Specified reconstitution liquid, blank matrix or method diluent.", "Confirm reconstitution instructions, matrix, stability and target concentration; do not assume water is suitable for every preparation."],
        ], references: ["roche-gluc3", "cdc-sodium"] },
        { type: "paragraph", text: "High-protein or abnormal immunoglobulin specimens may also precipitate or produce matrix interference during processing, so assay suitability must be assessed separately. Once the liquids are known, list what actually passes through the pump, valves, probe and tubing—including maintenance cleaners—and evaluate material compatibility against composition, concentration, temperature and contact time.", inlineLinks: [
          { text: "material compatibility", href: PISTON_TECHNICAL_ARTICLE_LINKS.materials },
        ], references: ["paraprotein", "materials"] },
      ],
    },
    {
      id: "channel-architecture",
      title: "Choose separate channels, sequential switching or system-fluid displacement",
      blocks: [
        { type: "table", caption: "Choose the architecture by contact path and action timing", headers: ["Arrangement", "When it is useful", "Integration work to include"], rows: [
          ["Separate sample and diluent metering", "Different volume ranges or independent speed and refill requirements.", "Select capacity and valves for each channel; include the shared path after the streams meet in the cleaning evaluation."],
          ["One pump, sequential valve-selected liquids", "Sequential operation is acceptable and shared-path residue can be controlled.", "Include valve changes, displacement and washing in the cycle; cover both minimum dose and maximum aspiration volume."],
          ["System-fluid-driven sample with separately dispensed diluent", "The sample should remain mainly at the probe front end, limiting patient-sample contact with the pump.", "Distinguish system fluid, effective sample and intentionally added diluent; control interfaces and the end of dispensing."],
        ] },
        { type: "paragraph", text: "Separate metering addresses capacity and timing; system-fluid displacement addresses where the sample contacts the instrument. They can be combined. Liquid-handling systems such as Hamilton Microlab 600 provide examples of fluid-path organization, but a FOREACH assembly must still be designed around the selected pumps, valves and connections.", references: ["hamilton-basic"] },
        { type: "paragraph", text: "If a single-pump program aspirates both liquids as one segmented column, it needs space beyond 20 μL plus 60 μL for isolation and other movements. If it aspirates and dispenses them separately, budget the switching displacement instead. Eliminating a pump does not necessarily reduce reagent use or shorten the cycle; shared-path recovery to the required composition can consume both liquid and time." },
        { type: "paragraph", text: "System fluid is not part of the formulation while it remains outside the useful mixture. If it enters the mixture, it becomes additional dilution. A system-fluid-driven channel must therefore deliver the complete useful sample segment, not merely execute an equivalent piston displacement." },
        { type: "paragraph", text: "Where installation space is limited, compare SM or TM using the already-defined working points, then recheck that model's step volume, connections and performance. Where chamber gas is difficult to clear, compare EAS with a suitable priming program. Continuing air aspiration, inlet leakage or inadequate liquid level must still be corrected at their source; extra steps cannot reliably compensate a changing gas-compression volume.", inlineLinks: [
          { text: "SM", href: PISTON_PRODUCT_LINKS.smSeries },
          { text: "TM", href: PISTON_PRODUCT_LINKS.tmSeries },
          { text: "chamber gas is difficult to clear", href: PISTON_TECHNICAL_ARTICLE_LINKS.bubbles },
        ], references: ["eas-datasheet"] },
      ],
    },
    {
      id: "mix-and-resample",
      title: "Confirm mixing and usable volume before taking the next aliquot",
      blocks: [
        { type: "paragraph", text: "Correct sample and diluent volumes do not guarantee a correct local concentration. Addition position, vessel geometry and liquid level affect mixing; premature aspiration may collect a sample-rich or diluent-rich region. Establish the mixing sequence in the actual vessel and make mixing completion a prerequisite for resampling." },
        { type: "paragraph", text: "Mixing may use an appropriate mechanical stirrer or aspiration/dispensing movements. For the latter, the mixing volume must remain below the volume safely accessible at that moment, with the probe at the specified immersion. Mechanical mixing also needs control of bubbles and vessel-to-vessel carryover. More mixing cycles add time and can add tip retention or bubbles; evaluate adequacy through concentration consistency at different sampling positions and times." },
        { type: "paragraph", text: "An 80 μL nominal total cannot simply be divided by 3 μL to declare the number of available tests. Inaccessible bottom volume, the minimum level for mixing, wall retention and repeat-test reserve reduce usable liquid. Evaluate the last aliquot separately from the first. If several assays share one predilution, schedule them within each assay's allowed holding time." },
        { type: "paragraph", text: "Resampling is its own small-dose action. Acceptance of the original sample dose does not validate aspiration, tip retention and delivery of the diluted aliquot. Wash the probe according to its actual contact path before it changes tasks." },
      ],
    },
    {
      id: "volume-ratio-and-transfer-errors",
      title: "Separate volume error, dilution-ratio error and subsequent transfer error",
      blocks: [
        { type: "paragraph", text: "For analyte-free diluent, additive volumes, complete mixing and no analyte loss, the concentration ratio is Vsample ÷ (Vsample + Vdiluent). The target for 20 μL plus 60 μL is 0.25. The directions of the two volume errors jointly determine the actual ratio." },
        { type: "table", caption: "Ideal ratio calculations, not product test results", headers: ["Volume change", "Actual ratio and total", "Interpretation"], rows: [
          ["Sample +1%; diluent −1%", "20.2 ÷ (20.2 + 59.4) ≈ 0.25377; concentration is about 1.51% above the target ratio.", "Opposing errors reinforce the concentration-ratio error."],
          ["Sample and diluent both +1%", "20.2 ÷ (20.2 + 60.6) = 0.25; total volume is 80.8 μL.", "The ratio is unchanged even though both delivered volumes and the total are above target."],
        ] },
        { type: "paragraph", text: "Evaluate each channel, the mixed concentration and the later aliquot separately. Allocate verification requirements for volume, mixing, interface loss and resampling from the customer's allowable final concentration or analytical-result error. One pump specification cannot serve as the error allowance for every stage." },
        { type: "table", caption: "Three verification layers within one dilution procedure", headers: ["Verification target", "Measurement", "What it helps locate"], rows: [
          ["Sample and diluent delivery", "Measure channels separately and report mean error, repeatability and conditions.", "Calibrate stable working-point bias; investigate supply and recovery when error changes with level or idle."],
          ["Ratio and uniformity", "Use an appropriate tracer or analytical method at different positions and times.", "If volumes are stable but concentration is not, inspect mixing, interfaces and sampling position."],
          ["Aliquot reaching the reaction position", "Check small-dose delivery, low level, first dose after idle and sample-change residue.", "If vessel concentration is correct but the subsequent result is not, examine resampling, tip retention and reaction additions."],
        ] },
        { type: "paragraph", text: "Liquid-handling verification combines volume measurement with sample-integrity evaluation. If only particular specimens fail after dilution, also investigate method suitability and matrix changes. Locate the failing stage before changing both pump calibrations and the software dilution factor together.", references: ["volume-verification", "sample-integrity"] },
      ],
    },
    {
      id: "spiking-and-standards",
      title: "Convert a spike addition into its final concentration",
      blocks: [
        { type: "paragraph", text: "In reagent development, sample preparation or method evaluation, a piston pump can meter a known-concentration standard into sample or blank matrix for spike recovery or concentration-series preparation. Define the standard, stock concentration, matrix, added volume and final volume together. Routine calibrators and QC materials still follow their preparation instructions; this is not permission to reformulate them." },
        { type: "callout", title: "Worked mass-balance example—not a clinical assay recipe", text: "Mixing 900 μL of a 5 mmol/L glucose matrix with 100 μL of a 20 mmol/L standard gives 1 mL at (900 × 5 + 100 × 20) ÷ 1,000 = 6.5 mmol/L, assuming additive volumes and no analyte loss. A control made from the same matrix plus 100 μL of glucose-free carrier would be 4.5 mmol/L. The difference is 2 mmol/L; it includes the dilution of the original matrix caused by the addition." },
        { type: "paragraph", text: "For that example, compare an EA 100 μL full stroke for the standard and 90% of an EA 1 mL stroke for the matrix. A full 100 μL stroke leaves no same-stroke space for auxiliary liquid; adjust capacity or sequencing if predispense, isolation or reserve is required. Protein matrices, special solvents and low-concentration analytes also require checks of mixture stability, wetted compatibility and adsorption. Repeatable volume alone does not demonstrate spike recovery.", references: ["ea-datasheet"] },
        { type: "paragraph", text: "A concentration series may be prepared independently from the same stock or serially from the preceding level. Independent preparations reduce dependence on the previous vessel's metering and mixing error, although all levels still share stock-concentration uncertainty. Serial dilution may conserve stock and replace impractically small stock aliquots with more manageable intermediate volumes, but earlier ratio and mixing errors propagate. List stock volume, diluent volume and final volume at every level, then compare the lowest working volume, mixing burden and allowable error." },
        { type: "paragraph", text: "A standard channel used infrequently also needs first-dose-after-idle testing. Whether an additional dilution stage is permitted, which matrix to use and how to calculate the result are method decisions when the required range exceeds one preparation step.", inlineLinks: [
          { text: "first-dose-after-idle testing", href: PISTON_TECHNICAL_ARTICLE_LINKS.drift },
        ] },
      ],
    },
    {
      id: "sequence-and-exception-handling",
      title: "Connect selection requirements to the instrument sequence and recovery logic",
      blocks: [
        { type: "paragraph", text: "Pumps and valves execute aspiration, dispensing and switching; the instrument coordinates the dilution vessel, mixer, probe motion and method calculations. The full program must establish priming and gas clearance, correct liquid sources and valve states, and adequate mixing before resampling. Include cleaning and low-level handling; completed motion is not proof that the liquid state is correct." },
        { type: "paragraph", text: "After air aspiration, gas entry, incorrect valve switching or an interrupted preparation, isolate the affected mixture and let the instrument method determine whether to remake it or apply another approved response. Restore supply and the liquid column, then recheck the first dose and critical working points. A mixture with uncertain composition should not be returned to reportable testing simply by adding a theoretical missing volume." },
        { type: "paragraph", text: "For selection, provide the sample and diluent identities, every metered volume, target ratio, mixing method, resampling volume, available specimen volume, allowed cycle time and cleaning conditions. FOREACH can then match capacities, wetted materials, valves and drive configuration and define validation in the actual vessel and fluid path." },
      ],
    },
  ],
  references: [
    { id: "roche-gluc3", title: "Roche — Glucose HK Gen.3, cobas c 303 / c 503 / c 703, V7.0 (2024)", href: "https://elabdoc-prod.roche.com/eLD/api/downloads/d6c2ba0d-5e34-ef11-2491-005056a772fd?countryIsoCode=be" },
    { id: "ea-datasheet", title: "FOREACH — EA Piston Pump Datasheet, basic capacities and test conditions", href: "https://www.foreachtek.com/downloads/resources/datasheets/en/Pumps/ps-120b-2507-00001-001-en-ea-piston-pump.pdf" },
    { id: "ea-100", title: "FOREACH — EA-100-PEEK configuration and specifications", href: "/en/products/pumps/piston-pump/ea-100-peek/" },
    { id: "cdc-sodium", title: "CDC / NHANES — Sodium, Roche Cobas 8000 Laboratory Procedure Manual (2021–2023)", href: "https://wwwn.cdc.gov/nchs/data/nhanes/public/2021/labmethods/BIOPRO-L-MET-Sodium-508.pdf" },
    { id: "paraprotein", title: "Hortin et al. — Problematic Proteins: A Patient with a High Paraprotein Concentration (2024)", href: "https://doi.org/10.1093/clinchem/hvae065" },
    { id: "materials", title: "FOREACH — Piston-pump head and wetted-material selection", href: "/en/resources/technical-articles/piston-pump-head-material-selection/" },
    { id: "hamilton-basic", title: "Hamilton — Microlab 600 Basic Manual, Rev. K", href: "https://assets-labs.hamiltoncompany.com/Images-Knowledge-Base/Hamilton-ML600-Basic-Manual-Rev-K.pdf" },
    { id: "eas-datasheet", title: "FOREACH — EAS Easy-to-Degas Piston Pump Datasheet", href: "https://www.foreachtek.com/downloads/resources/datasheets/en/Pumps/ps-120b-2507-00002-001-en-eas-piston-pump.pdf" },
    { id: "volume-verification", title: "Albert and Bradshaw — Importance of Integrating a Volume Verification Method for Liquid Handlers: Applications in Learning Performance Behavior (2007)", href: "https://doi.org/10.1016/j.jala.2006.10.005" },
    { id: "sample-integrity", title: "Ouyang et al. — Strategies to Maintain Sample Integrity Using a Liquid-Filled Automated Liquid-Handling System with Fixed Pipetting Tips (2008)", href: "https://doi.org/10.1016/j.jala.2007.10.007" },
  ],
  related: [
    { label: "Piston-pump capacity and configuration", href: "/en/applications/analytical-instruments/piston-pump/" },
    { label: "Sample aspiration and transfer", href: "/en/applications/analytical-instruments/piston-sample-transfer/" },
    { label: "Reagent dispensing and first-dose recovery", href: "/en/applications/analytical-instruments/piston-reagent-dispensing/" },
    { label: "Piston-pump models and configurations", href: "/en/products/pumps/piston-pump/" },
  ],
} satisfies ApplicationDocumentBody;

export default body;
