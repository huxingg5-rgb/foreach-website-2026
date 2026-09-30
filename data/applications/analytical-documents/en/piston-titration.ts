import type { ApplicationDocumentBody } from "../types";
import {
  PISTON_PRODUCT_LINKS,
  PISTON_TECHNICAL_ARTICLE_LINKS,
} from "../piston-link-network";

const body = {
  intro: [
    { type: "paragraph", text: "A FOREACH EA piston pump can form a programmable dosing channel with a titrant reservoir, switching valve and titration tip. In aqueous acid–base potentiometric titration, EA provides metered aspiration and dispensing with a configurable drive. The instrument uses the electrode signal to coordinate additions, mixing, readings and stopping; pump motion must follow those states.", inlineLinks: [
      { text: "FOREACH EA piston pump", href: PISTON_PRODUCT_LINKS.eaSeries },
    ] },
    { type: "paragraph", text: "Consider standardized 0.1 mol/L aqueous NaOH or HCl, an expected consumption near 2 mL and a design aim to compare increments around 4 μL near the endpoint. These are inputs to the worked example, not universal acid–base titration settings. The method determines reagent preparation, concentration and endpoint criteria." },
  ],
  sections: [
    {
      id: "capacity-and-increments",
      title: "Select capacity from both total consumption and the endpoint increment",
      blocks: [
        { type: "paragraph", text: "A larger capacity reduces refills; a smaller capacity gives the same increment a longer stroke. An expected 2 mL total does not, by itself, justify a large pump, and a microliter endpoint increment does not automatically require the smallest one. Compare total consumption, minimum increment and drive configuration together." },
        { type: "table", caption: "EA standard-step comparison: 2 mL total and 4 μL increments are design assumptions", headers: ["EA configuration", "Nominal relationship for 4 μL", "Capacity budget for 2 mL", "Selection condition"], rows: [
          ["100 μL / 2,000 steps", "0.05 μL per full step; 80 steps; 4% stroke.", "Ideally 20 full-stroke dispensing segments: at least 19 refills after the initial fill.", "Fine command increments, provided the method can accommodate frequent refill and recovery."],
          ["500 μL / 2,000 steps", "0.25 μL per full step; 16 steps; 0.8% stroke.", "Ideally four full-stroke dispensing segments: at least three refills after the initial fill.", "Fewer refills, but the 4 μL partial-stroke action and tip delivery still need separate evaluation."],
          ["2.5 mL / 2,000 steps", "1.25 μL per full step; 4 μL equals 3.2 full steps.", "2 mL uses 80% of stroke, leaving 0.5 mL nominal capacity.", "Integer full steps cannot represent exactly 4 μL. Compare another drive configuration or a method-permitted increment verified at the tip."],
        ], note: "These ideal capacity budgets exclude predispense, reserve and refill recovery. Deduct any same-stroke auxiliary volumes from usable capacity.", references: ["ea-datasheet"] },
        { type: "paragraph", text: "For an approximately 2 mL determination, the 2.5 mL configuration leaves a nominal 0.5 mL margin, which must also accommodate any predispense and reserve using that stroke. Other resolutions can be considered, but a finer command still needs to be evaluated against mechanical response and the delivered liquid increment.", references: ["ea-datasheet"] },
        { type: "paragraph", text: "Metrohm's guidance on transferring manual titration to autotitration recommends an expected endpoint volume within 10–90% of buret capacity. It illustrates why total consumption and refill planning matter alongside fine increments. That recommendation belongs to its titration-method development context; it is not a guaranteed accuracy range for every FOREACH pump.", references: ["metrohm-transfer"] },
        { type: "paragraph", text: "The 2.5 mL row uses the EA basic-capacity table's 2,000-step, 1.42 mm screw-lead configuration. EA-2500 also has a 2,236-step, 1.27 mm lead configuration, giving approximately 1.118 μL per full step. Match the ordered version, drive conversion and software volume accumulator. Do not interchange the two step counts or substitute the EAS-2500 configuration without recalculation.", inlineLinks: [
          { text: "EA-2500", href: PISTON_PRODUCT_LINKS.ea2500Peek },
        ], references: ["ea-datasheet", "ea-2500"] },
      ],
    },
    {
      id: "increment-versus-result",
      title: "A 4 μL increment is not a titration-accuracy specification",
      blocks: [
        { type: "paragraph", text: "4 μL ÷ 2.00 mL = 0.2%, while 20 μL ÷ 2.00 mL = 1%. These ratios help judge whether an increment may be too coarse relative to expected consumption; they are not the accuracy of the titration result. Fixed-endpoint stopping, dynamic equivalence-point detection and curve evaluation use the data differently. Reaction kinetics, mixing and electrode response also affect the result." },
        { type: "paragraph", text: "For the 2.5 mL / 2,000-step configuration, three full steps represent 3.75 μL and four represent 5 μL. If the controller executes three steps but adds 4 μL to the recorded total, that action has a 0.25 μL command-label discrepancy. Keep the volume conversion, drive configuration and accumulated record consistent. Where variable increments are method-permitted, record each commanded increment; an average of 4 μL is not a valid substitute for every individual action's record." },
        { type: "paragraph", text: "Validate the selected configuration at the intended small-increment working point with its valves, tubing and tip. Full-stroke specifications—and the separate displacement-based short-stroke tests—help define the component's stated conditions, but cannot replace this liquid-delivery result.", inlineLinks: [
          { text: "small-increment working point", href: PISTON_TECHNICAL_ARTICLE_LINKS.accuracy },
        ] },
        { type: "links", items: [{ label: "Full-stroke specifications and short-stroke test boundaries", href: "/en/applications/analytical-instruments/piston-pump/" }] },
      ],
    },
    {
      id: "method-and-motion-control",
      title: "Coordinate variable increments, constant increments and endpoint control",
      blocks: [
        { type: "paragraph", text: "Metrohm distinguishes dynamic equivalence-point titration (DET), monotonic equivalence-point titration (MET) and endpoint titration (SET). DET varies the volume increment with the curve, MET uses constant increments, and SET controls toward a predefined signal endpoint. Readings can depend on waiting time or signal-drift conditions. The reaction and method determine the mode; running the pump continuously at one speed does not perform all these functions.", references: ["metrohm-modes"] },
        { type: "table", caption: "Separate FOREACH dosing actions from instrument-level method decisions", headers: ["Operating state", "EA and valve action", "Instrument decision and record"], rows: [
          ["Prime before the run", "Aspirate titrant and route gas-clearance and displacement liquid to waste.", "Confirm a stable column at the tip. Waste volume is not titration consumption."],
          ["Early addition", "Execute the method-permitted initial dose or larger increments; record command volumes for the actual configuration.", "Maintain mixing and determine when a denser set of measurement points is needed."],
          ["Near the endpoint", "Deliver the requested small increment, then hold the defined valve and tip state.", "Wait for mixing and electrode response; record each addition, signal and time. Do not treat response lag as a reason to continue a large addition."],
          ["Refill and recover", "Isolate the titration-vessel path, refill and perform any required gas clearance or predispense.", "Accumulate only the portion delivered into the vessel. Where the method permits, schedule refill windows instead of interrupting unexpectedly near the endpoint."],
          ["Stop", "End useful dispensing and manage retained drops or retraction.", "Record the endpoint criterion and confirm that subsequent dripping does not continue the reaction."],
        ] },
        { type: "paragraph", text: "The FOREACH drive executes displacement, speed and reversal; electrode acquisition and endpoint recognition belong to the instrument. Optional ISC1000 configurations with RS-232, RS-485 or CAN connect the dosing channel to the controller. Optional closed-loop position feedback is not a feedback loop for the titration reaction itself.", references: ["ea-datasheet"] },
      ],
    },
    {
      id: "titrant-and-wetted-materials",
      title: "Define wetted materials and maintenance for the actual aqueous titrant",
      blocks: [
        { type: "paragraph", text: "This example uses standardized 0.1 mol/L aqueous NaOH or HCl. Specify concentration, temperature, contact duration and cleaners rather than describing the service only as acid or alkali. Non-aqueous titration, organic-solvent systems and Karl Fischer reagents are different applications and must not inherit this aqueous configuration without evaluation." },
        { type: "paragraph", text: "EA supports different head and piston configurations; its datasheet lists a ceramic piston, UHMWPE seal and optional seal flushing. Compatibility must extend beyond the head to seals, valves, tubing and fittings under their actual exposure. For salt-containing or crystallization-prone residue, establish cleaning and shutdown management at the affected surfaces rather than masking rising friction indefinitely with more drive force.", inlineLinks: [
          { text: "head and piston configurations", href: PISTON_TECHNICAL_ARTICLE_LINKS.materials },
        ], references: ["ea-datasheet"] },
        { type: "paragraph", text: "For an insufficient first dose after a bottle change, first address the inlet air segment, bottle supply and priming. If chamber gas remains difficult to clear, compare EAS. If air enters on every refill, inspect level and inlet sealing at the source. EAS improves the chamber's gas-clearance path; it does not control titrant concentration or guarantee a bubble-free complete fluid path.", inlineLinks: [
          { text: "chamber gas remains difficult to clear", href: PISTON_TECHNICAL_ARTICLE_LINKS.bubbles },
        ], references: ["eas-datasheet"] },
        { type: "links", items: [{ label: "Pump-head, piston and complete wetted-material selection", href: "/en/resources/technical-articles/piston-pump-head-material-selection/" }] },
      ],
    },
    {
      id: "tip-release-and-reading-time",
      title: "Ensure each increment reaches the reaction before taking the reading",
      blocks: [
        { type: "paragraph", text: "Liquid retained on the tip after pump motion stops has not all entered the titration vessel. A drop that falls after the electrode reading separates the recorded event from the reaction event. When evaluating a 4 μL-scale increment, fix tip geometry, position and relationship to the liquid surface; observe isolated increments, continuous additions and the first dose after a pause separately." },
        { type: "paragraph", text: "Above-surface delivery requires timely droplet detachment. An immersed tip also requires management of back-diffusion, sample contact and cleaning. Choose the position according to the method and tip design. Excessive retraction can draw in air or make the next command first restore the liquid column. Evaluate retraction against the following dose, not only whether the tip appears drip-free." },
        { type: "paragraph", text: "The full cycle includes dosing, mixing, electrode response and any refill. Shorter motor travel time does not necessarily shorten the determination. If the increment has reached the vessel but the signal is still changing, follow the method's wait or exception rules instead of removing the wait indiscriminately.", references: ["metrohm-modes"] },
        { type: "paragraph", text: "Gravimetric evaluation of microliter increments needs an appropriate balance, density correction and evaporation control. A cumulative weight from many doses helps assess total volume but can conceal erratic individual doses or a deficient first dose. After checking liquid delivery, use an appropriate reference material under the method to evaluate the complete titration result." },
      ],
    },
    {
      id: "single-or-coarse-fine-channel",
      title: "Choose one pump or coarse/fine channels from consumption and cycle requirements",
      blocks: [
        { type: "paragraph", text: "For low total consumption with fine increments and acceptable refill opportunities, begin by comparing small-capacity EA channels. For consumption approaching several milliliters where frequent refill is undesirable, compare 2.5 mL or another suitable capacity with its actual drive configuration. Covering the total volume does not mean that standard full steps can express any desired small increment. Match the drive and tip at the minimum useful increment.", inlineLinks: [
          { text: "small-capacity EA channels", href: PISTON_PRODUCT_LINKS.eaSeries },
        ] },
        { type: "paragraph", text: "If early bulk addition consumes much of the cycle while the endpoint still requires fine dosing, compare two coarse/fine channels: a larger capacity handles the method-permitted early addition and a smaller capacity handles the final region. Both require calibration, independent isolation and metering records; include the additional valves and maintenance cost. A second channel is unnecessary if one pump already meets increment and cycle requirements." },
        { type: "paragraph", text: "Provide titrant identity and concentration, minimum/routine/maximum consumption, minimum useful increment, method mode, allowed cycle time, whether refill interruptions are permissible, tip position and cleaning requirements. Keep records of individual increments, cumulative delivery, the first dose after pause or refill, and the full titration's endpoint performance. FOREACH can then match capacity, wetted assembly, valves and drive instead of selecting a model solely from a 2 mL total." },
      ],
    },
  ],
  references: [
    { id: "ea-datasheet", title: "FOREACH — EA Piston Pump Datasheet, capacities, drive options and test conditions", href: "https://www.foreachtek.com/downloads/resources/datasheets/en/Pumps/ps-120b-2507-00001-001-en-ea-piston-pump.pdf" },
    { id: "metrohm-transfer", title: "Metrohm — How to transfer manual titration to autotitration (2026)", href: "https://www.metrohm.com/en/discover/blog/2026/from-manual-titration-to-autotitration.html" },
    { id: "ea-2500", title: "FOREACH — EA-2500-PEEK transmission configurations", href: "/en/products/pumps/piston-pump/ea-2500-peek/" },
    { id: "metrohm-modes", title: "Metrohm — Eco Titrator manual, §6.12: DET, MET and SET parameters", href: "https://www.metrohm.com/content/dam/metrohm/shared/documents/manuals/81/810088001EN.pdf" },
    { id: "eas-datasheet", title: "FOREACH — EAS Easy-to-Degas Piston Pump Datasheet", href: "https://www.foreachtek.com/downloads/resources/datasheets/en/Pumps/ps-120b-2507-00002-001-en-eas-piston-pump.pdf" },
  ],
  related: [
    { label: "Piston-pump capacity and configuration", href: "/en/applications/analytical-instruments/piston-pump/" },
    { label: "Reagent dispensing and idle recovery", href: "/en/applications/analytical-instruments/piston-reagent-dispensing/" },
    { label: "Dilution, spiking and proportioning", href: "/en/applications/analytical-instruments/piston-dilution/" },
  ],
} satisfies ApplicationDocumentBody;

export default body;
