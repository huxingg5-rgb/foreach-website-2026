import type { ApplicationDocumentBody } from "../types";
import {
  PISTON_APPLICATION_GUIDES,
  PISTON_PRODUCT_LINKS,
  PISTON_TECHNICAL_ARTICLE_LINKS,
} from "../piston-link-network";
import { analyticalDocumentHref } from "../registry";

const pistonPump = {
  intro: [
    { type: "paragraph", text: "FOREACH piston pumps provide programmable aspiration and dispensing for sample transfer, reagent and standard addition, dilution and incremental titrant dosing. A pump works with selector valves, tubing and a probe or nozzle to control dose volume and the sequence of liquid movements. These precision dispensing configurations serve analytical fluid paths within their specified pressure range; they are not interchangeable with an HPLC high-pressure mobile-phase pump.", inlineLinks: [
      { text: "FOREACH piston pumps", href: PISTON_PRODUCT_LINKS.category },
      { text: "sample transfer", href: PISTON_APPLICATION_GUIDES[1].href },
      { text: "reagent and standard addition", href: PISTON_APPLICATION_GUIDES[2].href },
      { text: "dilution", href: PISTON_APPLICATION_GUIDES[3].href },
      { text: "incremental titrant dosing", href: PISTON_APPLICATION_GUIDES[4].href },
    ] },
    { type: "paragraph", text: "The EA series covers nominal capacities from 50 μL to 20 mL, SM from 50 μL to 1 mL, and TM from 50 to 500 μL. Delivering one 100 μL dose, dispensing several doses after one aspiration, and metering sample and diluent separately require different usable strokes and valve arrangements. FOREACH matches capacity, wetted materials, ports and drive options to these operating requirements.", inlineLinks: [
      { text: "EA series", href: PISTON_PRODUCT_LINKS.eaSeries },
      { text: "SM", href: PISTON_PRODUCT_LINKS.smSeries },
      { text: "TM", href: PISTON_PRODUCT_LINKS.tmSeries },
    ], references: ["piston-products"] },
  ],
  sections: [
    {
      id: "fluid-path", title: "Where a piston pump fits in the analytical fluid path",
      blocks: [
        { type: "paragraph", text: "Start by deciding whether the measured liquid enters the pump chamber. In direct reagent metering, reagent passes through the pump, valves and delivery line. In a liquid-filled, fixed-probe sample channel, the pump mainly contacts system fluid while the sample remains in the probe and front-end tubing. Both use controlled displacement, but they have different wetted-material requirements and different places to control sample carryover.", inlineLinks: [
          { text: "wetted-material requirements", href: PISTON_TECHNICAL_ARTICLE_LINKS.materials },
        ], references: ["hamilton-basic", "sample-integrity"] },
        { type: "flow", caption: "Direct metering: the reagent enters the pump chamber", nodes: ["Reagent or diluent reservoir", "Selector valve and FOREACH pump", "Outlet path and dispensing tip", "Reaction cup or mixing vessel"], focusIndex: 1, note: "Functional relationships, not a mandatory component order. The valve configuration selects aspiration and discharge paths." },
        { type: "flow", caption: "System-fluid drive: the sample stays near the probe tip", nodes: ["System fluid in the FOREACH pump", "Drive tubing and valves", "Sample segment in the probe", "Reaction cup"], focusIndex: 0, note: "The probe aspirates from the sample vessel and moves to the receiving position. Aspiration and dispensing are bidirectional movements; the sample need not pass through the pump chamber." },
        { type: "table", caption: "Four tasks, four different selection priorities", headers: ["Task", "Operating conditions to define", "Main selection decision"], rows: [
          ["Sample aspiration and transfer", "Fixed-probe serum, method-approved plasma or urine; minimum and routine dose; available sample volume", "Usable stroke at small doses, intact sample delivery and between-sample washing"],
          ["Reagent and standard dispensing", "Reagent and water doses; dedicated or shared path; aliquots per aspiration", "Capacity for each liquid, first-dose recovery, pre-dispense and fluid-change consumption"],
          ["Dilution and spiking", "Sample dose, diluent dose, mixing volume and subsequent aliquot", "Independent channel capacities, ratio error, mixing and residual volume"],
          ["Incremental titrant dosing", "Expected total consumption, near-endpoint increment and acceptable refill interruption", "Capacity, command increment and actual tip delivery must all fit the method"],
        ] },
        { type: "links", items: [
          { label: "Sample aspiration and transfer", href: analyticalDocumentHref("piston-sample-transfer") },
          { label: "Reagent and standard dispensing", href: analyticalDocumentHref("piston-reagent-dispensing") },
          { label: "Dilution, spiking and proportioning", href: analyticalDocumentHref("piston-dilution") },
          { label: "Incremental titrant dosing", href: analyticalDocumentHref("piston-titration") },
        ] },
      ],
    },
    {
      id: "capacity-and-performance", title: "Match capacity, command increment and dispensing performance",
      blocks: [
        { type: "paragraph", text: "A smaller capacity gives a longer stroke for the same dose. A larger capacity allows more aliquots before refill but uses a shorter stroke for each small dose. List minimum, routine and maximum doses first, then include any separation segments, draw-back or retained liquid that occupy the same stroke. Priming discharged separately to waste is not part of the useful dose, but still consumes liquid and cycle time." },
        { type: "table", caption: "EA basic capacity configurations and calculated displacement per full step", headers: ["Capacity", "Full-stroke steps", "Nominal volume per step", "Worked selection example"], rows: [
          ["50 μL", "2,000", "0.025 μL", "5 μL = 200 steps; 20 μL = 800 steps. Compare this capacity for small doses when auxiliary movements fit."],
          ["100 μL", "2,000", "0.05 μL", "20 μL = 400 steps; 60 μL = 1,200 steps. More stroke volume remains for longer liquid segments."],
          ["250 μL", "2,000", "0.125 μL", "106 μL = 848 steps, or 42.4% of stroke. Compare for a separate, larger water-addition channel."],
          ["500 μL", "2,000", "0.25 μL", "100 μL = 400 steps, or 20% of stroke. Allow for retained liquid when planning repeated aliquots."],
          ["1 mL", "2,000", "0.5 μL", "900 μL = 1,800 steps, or 90% of stroke. Only 100 μL remains for any same-stroke auxiliary movements."],
        ], note: "Calculated from nominal capacity divided by full-stroke steps. These values describe command subdivision, not measured droplet volume or minimum reliable dose.", references: ["ea-datasheet"] },
        { type: "table", caption: "EA-100-PEEK: distinguish specified test points from application doses", headers: ["Test point", "Accuracy / repeatability", "How to use the specification"], rows: [
          ["100% stroke", "≤0.5% / ≤0.5%", "Full-stroke performance under the stated specification conditions. Application qualification also fixes the real fluid, outlet path and operating program."],
          ["2% stroke", "≤2.0% / ≤1.5%", "The specification uses piston-displacement testing at this point. For a 100 μL pump, 2% is a nominal 2 μL movement, not a measured 2 μL droplet guarantee."],
        ], references: ["ea-datasheet", "ea-100"] },
        { type: "paragraph", text: "EA-100-PEEK has a 100 μL nominal capacity, 12.7 mm stroke and 2,000 full-stroke steps. Its nominal increment is 0.05 μL per step. A program can therefore represent a 5 μL command with 100 full steps, but the command count alone does not establish accuracy at 5 μL. At a routine 100 μL dose, start with the 100 μL configuration when no additional same-stroke aspiration is required; use more capacity or a different sequence when auxiliary liquid segments must also fit.", inlineLinks: [
          { text: "accuracy at 5 μL", href: PISTON_TECHNICAL_ARTICLE_LINKS.accuracy },
        ], references: ["ea-100"] },
        { type: "paragraph", text: "Tune the first dispense after reversal separately from a sequence of dispenses in one direction. Backlash compensation must be coordinated with valve position so that motion used to recover mechanical position is not counted as delivered reagent. Motor microstepping does not replace this sequence design or a liquid-delivery test.", inlineLinks: [
          { text: "Backlash compensation", href: PISTON_TECHNICAL_ARTICLE_LINKS.backlash },
        ] },
        { type: "links", items: [{ label: "Accuracy, repeatability and resolution explained", href: "/en/resources/technical-articles/piston-pump-accuracy-repeatability-resolution/" }] },
      ],
    },
    {
      id: "wetted-materials", title: "Select the complete wetted path, including cleaning and idle conditions",
      blocks: [
        { type: "paragraph", text: "List every liquid that contacts the pump head, piston, seals and valves: the metered fluid, system fluid and cleaning solutions. For a system-fluid-driven sample channel, assess the sample-contacting probe and front tubing separately. Concentration, temperature and contact time during dosing, idle soaking and cleaning can differ. A compatible pump head does not establish compatibility of the complete assembly." },
        { type: "paragraph", text: "EA pump-head options include PMMA, PCTG and PEEK; piston options include zirconia ceramic, alumina ceramic, PEEK and sapphire. SM offers PMMA, PSU, POM and PEEK pump heads. The displayed TM configurations use PMMA heads and ceramic pistons. Choose a specific material combination for the actual reagent and cleaning cycle, then check the seals, valves, tubing and fittings in the same path.", inlineLinks: [
          { text: "EA pump-head options", href: PISTON_TECHNICAL_ARTICLE_LINKS.materials },
        ], references: ["piston-products"] },
        { type: "paragraph", text: "Evaporation and crystallization of residual reagent can change seal friction and wear. EA offers an optional seal-wash arrangement. Define its supply and discharge paths separately from the main fluid path's shutdown rinse; seal washing does not replace cleaning the complete metering channel. Include the cleaning solution itself in the compatibility assessment, and define where displaced liquid goes before the next measurement.", references: ["ea-datasheet"] },
        { type: "paragraph", text: "The EA datasheet lists a ceramic piston and UHMWPE seal arrangement and a design life of 5 million cycles under pure-water, ambient-temperature and 50 kPa backpressure conditions. A salt-containing or solvent-containing reagent channel needs its own cycling and idle-exposure assessment; the water-test condition is not a reagent-life prediction.", references: ["ea-datasheet"] },
        { type: "links", items: [{ label: "Pump-head and wetted-material selection", href: "/en/resources/technical-articles/piston-pump-head-material-selection/" }] },
      ],
    },
    {
      id: "priming-and-cycle", title: "Include priming, pressure and recovery in the full dispensing cycle",
      blocks: [
        { type: "paragraph", text: "Priming establishes a continuous liquid column and clears trapped air and displaced fluid from the relevant path. A bubble accidentally entering the pump chamber can absorb displacement. An intentionally programmed air-separation segment has a different function and belongs to the sample-segment design. Its position and movement must be controlled rather than treated as a random priming defect.", inlineLinks: [
          { text: "bubble accidentally entering the pump chamber", href: PISTON_TECHNICAL_ARTICLE_LINKS.bubbles },
        ], references: ["hamilton-advanced"] },
        { type: "paragraph", text: "Where chamber air retention delays priming or first-dose recovery, compare an EAS easy-to-degas configuration together with mounting orientation, inlet sealing and the priming program. Continuing inlet air leaks, an empty reservoir or ongoing outgassing need correction at their source; chamber geometry alone does not clear every bubble in the instrument.", references: ["eas-datasheet"] },
        { type: "paragraph", text: "EA-100-PEEK specifies fluid pressure below 0.30 MPa and a recommended maximum motor speed of 600 RPM. The pressure value is not an inlet-vacuum rating, and the speed is not a universal setting for every liquid. With a long narrow probe, low reservoir level or slower-filling reagent, first reduce inlet restriction or aspiration speed and allow settling time; set discharge speed separately. Longer settling may improve filling but adds cycle time; it does not correct an inlet leak or an empty reservoir.", inlineLinks: [
          { text: "slower-filling reagent", href: PISTON_TECHNICAL_ARTICLE_LINKS.viscosity },
        ], references: ["ea-100", "tecan-selection"] },
        { type: "callout", title: "Motor travel time is not the analytical cycle time", text: "Worked calculation: a 12.7 mm stroke with a 1.27 mm screw lead requires 10 revolutions. At a constant 600 RPM, one full stroke would take 1 second, excluding acceleration, deceleration, valve movement and dwell. The complete instrument cycle also includes aspiration, probe positioning, delivery, draw-back and cleaning. This is a kinematic calculation, not a one-sample-per-second specification.", inlineLinks: [
          { text: "acceleration, deceleration", href: PISTON_TECHNICAL_ARTICLE_LINKS.acceleration },
        ], references: ["ea-100"] },
        { type: "table", caption: "EA integration options and the functions they provide", headers: ["Option", "Pump-side role", "Instrument-side coordination"], rows: [
          ["Home-position sensing", "Establish a stroke reference at startup and recovery", "Define homing conditions, valve positions and the waste path during recovery"],
          ["Optional optical encoder / closed-loop control", "Provide motion-position feedback", "Use appropriate fluid-level, pressure or bubble inputs for liquid-state decisions; position reached is not proof of liquid delivered"],
          ["Optional ISC1000 driver", "RS-232, RS-485 or CAN configurations for instrument integration", "Coordinate the selected driver and communication version with valves, probes and abnormal-state handling"],
        ], references: ["ea-datasheet"] },
        { type: "links", items: [{ label: "Aspiration and dispense acceleration profiles", href: "/en/resources/technical-articles/piston-pump-acceleration-deceleration-curves/" }] },
      ],
    },
    {
      id: "series-selection", title: "Choose an EA, SM, TM or EAS configuration",
      blocks: [
        { type: "paragraph", text: "Match liquid volume, wetted materials and timing before choosing by size. The series ranges below describe available capacity directions; each representative model has its own drive, dimensions and test conditions." },
        { type: "table", caption: "Series selection for analytical instrument integration", headers: ["Series", "Capacity / representative configuration", "When to compare it"], rows: [
          ["EA precision piston pump", "50 μL–20 mL; EA-100-PEEK: 100 μL, 2,000 steps, 1/4-28 UNF or M6", "A broad range of sample, reagent and diluent doses, with separate capacity and material choices for each channel"],
          ["SM miniature piston pump", "50 μL–1 mL; SM-100-PMMA: 100 μL, 2,000 steps, 1/4-28 UNF or M6", "Fixed metering channels where mounting space is restricted. Its specified full-stroke repeatability is ≤0.5%; select accuracy requirements at the actual configuration and dose."],
          ["TM ultra-miniature piston pump", "50–500 μL; TM-100-PMMA: 100 μL, 2,540 steps, 6-40 UNF; body approximately 20 × 26.3 × 102 mm", "Very compact installations. Include connector projection, tube bends and service access, not just the pump body."],
          ["EAS easy-to-degas piston pump", "Representative capacities: 100, 500 and 1,000 μL; 1/4-28 UNF or M6", "Chamber air clearance and priming recovery are important design constraints. Match metering performance after priming to the required dose."],
        ], references: ["piston-products", "ea-datasheet", "sm-datasheet", "tm-100", "eas-datasheet"] },
        { type: "paragraph", text: "Do not transfer a step count or performance figure between two pumps merely because their nominal capacities match. For example, TM-100 uses 2,540 steps rather than the 2,000-step EA-100 arrangement. Compare the actual material combination, port, lead and stroke in the selected drawing before fixing the controller settings." },
        { type: "links", items: [
          { label: "EA-100-PEEK specifications and drawings", href: "/en/products/pumps/piston-pump/ea-100-peek/" },
          { label: "SM-100-PMMA compact configuration", href: "/en/products/pumps/piston-pump/sm-100-pmma/" },
          { label: "TM-100-PMMA dimensions and ports", href: "/en/products/pumps/piston-pump/tm-100-pmma/" },
          { label: "All piston-pump configurations", href: "/en/products/pumps/piston-pump/" },
        ] },
      ],
    },
    {
      id: "delivery-check", title: "Confirm the result where the liquid is actually received",
      blocks: [
        { type: "paragraph", text: "Evaluate dispensing at the reaction cup, mixing vessel or detector inlet, not only at the pump outlet. Gravimetric measurement can assess delivered volume with suitable control of density, evaporation and measurement uncertainty. For system-fluid-driven transfer and multi-step dilution, also assess concentration or tracer recovery: the correct total volume can still contain too little original sample.", references: ["volume-verification", "sample-integrity"] },
        { type: "table", caption: "Qualification at a 100 μL working dose: normal operation and recovery states", headers: ["Operating state", "What to measure", "Decision supported"], rows: [
          ["Repeated routine dispensing", "Individual received volumes with the specified fluid, valve path, backpressure and program", "Mean volume deviation and repeatability at this working point"],
          ["Initial prime, longest planned idle time and bottle change", "The first dose separately, then subsequent doses during recovery", "First-dose acceptance and required recovery time or cycles"],
          ["Several dispenses after one aspiration", "First, middle and final aliquots, including the retained-volume limit", "Whether the entire sequence is usable, rather than just its average volume"],
          ["Sample transfer, dilution and high-to-low switching", "Sample recovery, final concentration and residue in the following blank or low sample", "Sample integrity, dilution performance and carryover under the analytical method"],
        ] },
        { type: "paragraph", text: "For a 100 μL target, mean volume deviation is (mean received volume − 100 μL) / 100 μL × 100%. Report repeatability using the agreed statistic, such as CV, with the number of measurements and measurement conditions. Keep this system-level statistic distinct from the repeatability definition in the pump specification. Also cover the minimum and maximum doses used by the instrument." },
        { type: "paragraph", text: "For configuration review, provide the dose range, allowable mean deviation and repeatability, available cycle time, reagent and cleaning-fluid composition, temperatures, backpressure and mounting envelope. FOREACH can then match the capacity, materials and drive and define the most relevant prototype working points. If the instrument already has a fixed probe and selector valve, a piston-pump configuration can focus on metering and packaging; compare a syringe-pump assembly for integrated syringe/valve handling, or a pipetting pump when disposable tips are part of the required sample-isolation strategy." },
        { type: "links", items: [
          { label: "Syringe-pump product configurations", href: "/en/products/pumps/syringe-pumps/" },
          { label: "Pipetting-pump product configurations", href: "/en/products/pumps/pipetting-pumps/" },
          { label: "Discuss an analytical fluid-path configuration", href: "/en/contact/" },
        ] },
      ],
    },
  ],
  references: [
    { id: "piston-products", title: "FOREACH: Precision piston-pump configurations", href: "/en/products/pumps/piston-pump/" },
    { id: "hamilton-basic", title: "Hamilton: Microlab 600 Basic Manual, Rev. K", href: "https://assets-labs.hamiltoncompany.com/Images-Knowledge-Base/Hamilton-ML600-Basic-Manual-Rev-K.pdf" },
    { id: "sample-integrity", title: "Ouyang et al. (2008): Strategies to Maintain Sample Integrity Using a Liquid-Filled Automated Liquid-Handling System", href: "https://doi.org/10.1016/j.jala.2007.10.007" },
    { id: "ea-datasheet", title: "FOREACH: EA Piston Pump Datasheet, PS-120B-2507-00001_001", href: "/downloads/resources/datasheets/en/Pumps/ps-120b-2507-00001-001-en-ea-piston-pump.pdf" },
    { id: "ea-100", title: "FOREACH: EA-100-PEEK specifications", href: "/en/products/pumps/piston-pump/ea-100-peek/" },
    { id: "hamilton-advanced", title: "Hamilton: Microlab 600 Advanced Manual, Rev. E", href: "https://assets-labs.hamiltoncompany.com/File-Uploads/Hamilton_ML600-Advanced-Manual-Rev-E.pdf" },
    { id: "eas-datasheet", title: "FOREACH: EAS Easy-to-Degas Piston Pump Datasheet, PS-120B-2507-00002_001", href: "/downloads/resources/datasheets/en/Pumps/ps-120b-2507-00002-001-en-eas-piston-pump.pdf" },
    { id: "tecan-selection", title: "Tecan: Liquid handling pump selection — a guide for lab automation engineers", href: "https://www.tecan.com/blog/pump-selection-guide-for-systems-engineers" },
    { id: "sm-datasheet", title: "FOREACH: SM Piston Pump Datasheet, PS-120B-2507-00004_001", href: "/downloads/resources/datasheets/en/Pumps/ps-120b-2507-00004-001-en-sm-piston-pump.pdf" },
    { id: "tm-100", title: "FOREACH: TM-100-PMMA specifications", href: "/en/products/pumps/piston-pump/tm-100-pmma/" },
    { id: "volume-verification", title: "Albert & Bradshaw (2007): Importance of Integrating a Volume Verification Method for Liquid Handlers", href: "https://doi.org/10.1016/j.jala.2006.10.005" },
  ],
  related: [{ label: "Sample aspiration and transfer", href: analyticalDocumentHref("piston-sample-transfer") }],
} satisfies ApplicationDocumentBody;

export default pistonPump;
