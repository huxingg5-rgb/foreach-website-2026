import type { ApplicationBlock, ApplicationDocumentBody, ApplicationLink, ApplicationReference, ApplicationSection } from "../types";
import type { LiquidChromatographySlug } from "../liquid-chromatography";
import { analyticalDocumentHref } from "../registry";
import { LC_PRODUCTS as products, LC_TASK_RESOURCES, lcArticleHref } from "../liquid-chromatography-resources";
import { getValvelessPumpPath } from "@/data/products/selection/valveless-pump-routes";

// Content only: render with the established application document blocks and styles.
const p = (text: string, references?: string[]): ApplicationBlock => ({ type: "paragraph", text, references });
const h = (title: string): ApplicationBlock => ({ type: "subheading", title });
const list = (...items: string[]): ApplicationBlock => ({ type: "list", items });
const table = (caption: string, headers: string[], rows: string[][], references?: string[]): ApplicationBlock => ({ type: "table", caption, headers, rows, references });
const flow = (caption: string, nodes: string[], note?: string): ApplicationBlock => ({ type: "flow", caption, nodes, note });
const links = (...items: ApplicationLink[]): ApplicationBlock => ({ type: "links", items });
const section = (id: string, title: string, ...blocks: ApplicationBlock[]): ApplicationSection => ({ id, title, blocks });
const guide = (slug: LiquidChromatographySlug, label: string): ApplicationLink => ({ label, href: analyticalDocumentHref(slug) });
const contact = { label: "Discuss your LC fluid-path requirements", href: "/en/contact/" };
const refs = {
  autosampler: { id: "autosampler", title: "Agilent 1200 Series High Performance Autosamplers: metering device and injection sequence", href: "https://www.agilent.com/Library/usermanuals/Public/G1367-90011_HP-Samplers_ebook.pdf" },
  loop: { id: "loop", title: "Waters 2707 Autosampler Operator's Guide: syringe, sample loop and injection modes", href: "https://help.waters.com/content/dam/waters/es/support/usermanuals/2017/71500168202/71500168202rc.pdf" },
  wash: { id: "wash", title: "Agilent: Needle Wash Supplies for HPLC", href: "https://www.agilent.com/en/product/liquid-chromatography/hplc-supplies-accessories/autosampler-fraction-collector-supplies-for-hplc/needle-wash-supplies-for-hplc" },
  drainage: { id: "drainage", title: "Thermo Scientific Vanquish HPLC System Operating Manual: wash and waste connections", href: "https://assets.thermofisher.com/TFS-Assets/CMD/manuals/man-4821-9001-hplc-system-man4821-9001-en.pdf" },
  reaction: { id: "reaction", title: "Shimadzu: Analytical Methods for Amino Acids — post-column derivatization", href: "https://www.ssi.shimadzu.com/service-support/technical-support/analysis-basics/basic/53/53intro.html" },
  ea: { id: "ea", title: "FOREACH EA piston-pump series: configuration and performance limits", href: products.ea.href },
  sm: { id: "sm", title: "FOREACH SM miniature piston-pump series", href: products.sm.href },
  tm: { id: "tm", title: "FOREACH TM ultra-compact piston-pump series", href: products.tm.href },
  dpl30: { id: "dpl30", title: "FOREACH DPL30: liquid-pump specifications", href: products.dpl30.href },
  dpl30h: { id: "dpl30h", title: "FOREACH DPL30H: liquid-pump specifications", href: products.dpl30h.href },
  dpgl800: { id: "dpgl800", title: "FOREACH DPGL800: gas-liquid media and gas-flow specifications", href: products.dpgl800.href },
  rpl4: { id: "rpl4", title: "FOREACH RPL-P4: displacement and configuration", href: products.rpl4.href },
  rpl635: { id: "rpl635", title: "FOREACH RPL-P6.35: displacement and configuration", href: products.rpl635.href },
  rpl15: { id: "rpl15", title: "FOREACH RPL-P15: displacement and configuration", href: getValvelessPumpPath("en", "rpl-p15") },
} satisfies Record<string, ApplicationReference>;
const pistonGuide = guide("lc-autosampler-piston-pumps", "Piston pumps in LC autosamplers");
const sampleGuide = guide("lc-sample-metering", "Sample aspiration and injection metering");
const loopGuide = guide("lc-sample-loop-loading", "Sample transfer and loop loading");
const diaphragmGuide = guide("lc-needle-wash-diaphragm-pumps", "Diaphragm pumps for LC needle washing and waste");
const supplyGuide = guide("lc-needle-wash-supply", "Needle-wash liquid supply");
const wasteGuide = guide("lc-waste-aspiration", "Wash-station waste aspiration");
const rplGuide = guide("lc-post-column-valveless-pumps", "Valveless pumps for post-column derivatization");
const dosingGuide = guide("lc-derivatization-reagent-dosing", "Continuous derivatization-reagent dosing");
const overviewGuide = guide("liquid-chromatography", "Liquid chromatography fluid-handling overview");

const bodies = {
  "liquid-chromatography": {
    intro: [p("Liquid chromatography combines sample introduction, separation and detection. High-pressure mobile-phase delivery, sample metering, needle-wash supply and waste removal require different pumping functions. Before choosing a pump, identify its branch, the liquid it contacts and whether the required result is an injection volume, a cleaning cycle or a continuous reagent flow."),
      p("This guide focuses on FOREACH piston-pump candidates for isolated autosampler metering paths, liquid and gas-liquid diaphragm pumps for justified wash tasks, and RPL valveless pumps for method-specific post-column reagent supply. These auxiliary configurations are not presented as replacements for an HPLC or UHPLC high-pressure mobile-phase pump.")],
    sections: [
      section("system-position", "Locate the pump in the LC fluid path",
        flow("Main analytical flow path", ["Mobile-phase reservoir", "High-pressure mobile-phase pump", "Injection valve / autosampler", "Column", "Detector"], "Needle-wash supply, wash-station drainage and post-column reagent addition are branches, not additional pumps in series along this main path."),
        p("An autosampler metering device may be isolated from the high-pressure side or exposed to it, depending on the injection architecture. Check aspiration, switching, injection and washing states before selecting an auxiliary pump. A post-column reagent branch is needed only when the analytical method requires it.", ["autosampler", "reaction"])),
      section("pump-names", "Different positions have different pump names and duties",
        table("Names refer to a function, not interchangeable pump specifications", ["Position", "Common name", "Duty and boundary"], [
          ["Mobile-phase delivery", "LC pump; solvent-delivery pump; binary or quaternary pump", "Deliver the analytical flow against column backpressure and support the system's gradient arrangement. This is the instrument's core high-pressure pumping function."],
          ["Autosampler metering", "Metering device; sample syringe; metering pump", "Create controlled displacement for aspiration and sample transfer, coordinated with the needle, loop and injection valve."],
          ["Needle-wash supply", "Needle-wash pump; rinse pump; wash-solvent pump", "Deliver cleaning liquid to the wash port. Solvent choice, coverage and contact time determine how effectively residue is removed."],
          ["Wash-station drainage", "Waste pump; drain pump; waste-aspiration pump", "Remove spent wash liquid. Include gas-liquid capability if the inlet intermittently draws air or foam."],
          ["Post-column reagent addition", "Derivatization-reagent pump; post-column dosing pump", "Feed a separate reagent branch before detection. Verify flow, mixing, backpressure and detector response with the actual method."],
        ])),
      section("product-direction", "Choose the product family from the task",
        table("Candidate directions, subject to configuration and application validation", ["Task", "FOREACH candidates", "Selection gate"], [
          ["Autosampler metering", "EA or SM; TM only where a constrained installation warrants it", "Actual dose, useful stroke, pressure exposure, materials and valve sequence. Nominal capacity does not establish minimum reliable injection volume."],
          ["Needle-wash delivery", "DPL30; DPL30H for a demonstrated higher-resistance requirement", "Installed liquid flow, controllable operating range, wash chemistry and outlet load. Higher pressure is not automatically better."],
          ["Wash-station waste", "DPL30 for a suitable liquid path; DPGL800 for a suitable gas-liquid path", "Inlet media, suction and peak drainage demand. Gas free-flow is not liquid drainage capacity; DPGL800 is not for 100% liquid transfer."],
          ["Post-column reagent supply", "RPL single-head valveless metering configurations", "An engineering candidate only: confirm speed, displacement, backpressure, pulsation and complete-method performance."],
        ]), links(products.ea, products.dpl30, products.dpgl800, products.rpl4)),
      section("task-guides", "Continue to the pump and task guide",
        links(pistonGuide, sampleGuide, loopGuide, diaphragmGuide, supplyGuide, wasteGuide, rplGuide, dosingGuide)),
      section("selection-start", "Start with the result your instrument must achieve",
        table("Inputs for the first configuration discussion", ["Customer requirement", "First checks", "Relevant task"], [
          ["Consistent volume for every injection", "Working injection volumes, injection architecture and pressure at the metering device", "Sample aspiration and metering"],
          ["Less sample consumption", "Loop size, needle and tubing volume, loading mode and usable vial volume", "Sample-loop loading"],
          ["Faster blank recovery after concentrated samples", "Residue location, solvent formulation, effective contact time and drainage", "Needle-wash supply"],
          ["No liquid accumulation at the wash station", "Peak incoming liquid, allowable hold-up, lift, air content and waste-vessel ventilation", "Waste aspiration"],
          ["Stable post-column response", "Reagent flow, actual backpressure, permitted fluctuations, reaction tubing and detection method", "Continuous reagent dosing"],
        ])),
      section("selection-questions", "Questions before choosing a model",
        h("Can one pump series cover the whole LC system?"), p("Do not select by instrument name alone. Discrete volume metering, wash delivery, mixed air-liquid drainage and continuous reagent addition impose different stroke, flow, pressure and wetted-path requirements. First define the duty; then compare the suitable configurations."),
        h("Can a FOREACH pump directly replace the original instrument pump?"), p("Provide the original model, interface drawing, control method, fluid-path diagram, media, pressures and acceptance criteria. Mechanical fit is only the first check: valve timing, firmware behaviour and complete-instrument results also need validation. These guides do not promise plug-and-play replacement of a particular instrument."),
        h("What should I send if I have not selected a model?"), p("Start with a fluid-path sketch, liquid composition, dose or flow, available time, inlet and outlet conditions, and installation space. Add the injection mode for sample metering, gas-liquid state for drainage, or baseline requirements for post-column dosing."), links(contact)),
    ], references: [refs.autosampler, refs.reaction], related: [pistonGuide, diaphragmGuide, rplGuide],
  },
  "lc-autosampler-piston-pumps": {
    intro: [p("In an LC autosampler, the metering device produces controlled displacement while the needle and injection valve organize sample uptake and transfer. The device can sit in an isolated low-pressure branch or form part of a pressurized path. Establish that pressure exposure before comparing FOREACH piston-pump capacity, materials and control resolution.")],
    sections: [
      section("pressure-boundary", "Check whether the metering device sees system pressure",
        p("The term autosampler metering pump does not mean low-pressure operation. Some flow-through designs expose the metering path to mobile phase after injection; other arrangements isolate the aspiration side. The instrument's valve-state diagram, rather than the component name, defines the pressure requirement.", ["autosampler"]),
        p("Consider EA, SM or TM only within the selected configuration's permitted pressure, media and drive limits. If the device is connected to the chromatographic high-pressure side, verify the complete-cycle pressure and isolation arrangement first. A general liquid-handling piston pump must not be substituted on the basis of dose volume alone."),
        table("Information needed before capacity selection", ["Provide", "Establish"], [
          ["Valve diagrams during aspiration, switching, injection and washing", "Whether the pump chamber communicates with the high-pressure path at any point"],
          ["Steady pressure and switching transients", "Required limits for the head, seals, fittings and drive"],
          ["Original metering and control arrangement", "Flow-through operation, pressure balancing, homing and interlock requirements"],
        ])),
      section("contact-path", "Distinguish direct sample contact from system-liquid displacement",
        h("Sample enters the metering chamber"), p("The head, piston, seals and associated valves become sample-contact components. Compatibility, adsorption, particles, residual liquid and cleaning recovery must be evaluated throughout this path."),
        h("System liquid moves a separate sample segment"), p("The pump displaces system liquid while the sample remains primarily in the needle and front-end tubing. Pump displacement still matters, but sample-contact materials and carryover control concentrate around the needle, seat, valve and loop. Keeping sample out of the chamber does not eliminate carryover elsewhere.")),
      section("series-selection", "Use capacity and installation needs to shortlist EA, SM or TM",
        table("Published series ranges are not validated injection-volume ranges", ["Series", "Nominal capacity", "Reason to evaluate", "Performance boundary"], [
          ["EA", "50 µL–20 mL", "Broader capacity and configuration choice", "Full-stroke accuracy and repeatability are specified at ≤0.5% under stated test conditions; verify the actual working dose separately."],
          ["SM", "50 µL–1 mL", "Compact microvolume or system-liquid metering", "Base configuration: 2,000 full-stroke steps and specified full-stroke repeatability ≤0.5%. Confirm accuracy for the configuration and working dose."],
          ["TM", "50–500 µL", "Severely constrained installation space", "Displayed configuration: 2,540 full-stroke steps. Pressure, accuracy, repeatability and service life require configuration-specific validation."],
        ], ["ea", "sm", "tm"]),
        p("Capacity, nominal volume per step and the smallest reliable delivered volume are different quantities. A smaller housing does not establish better small-dose accuracy. Compare a TM configuration only when its installation advantage is relevant."), links(products.ea, products.sm, products.tm)),
      section("channel-performance", "Evaluate the complete metering channel",
        list("Check inlet seals, priming and valve timing when bubbles change the effective liquid column.", "Include fittings, valve cavities, needle seats and loops when calculating hold-up volume and sample consumption.", "Locate residue on the needle exterior, valve passages and seals before increasing wash-pump output.", "Test volume bias, repeatability and carryover at the target injection volumes rather than extrapolating full-stroke specifications.")),
      section("pump-role", "What the pump provides, and what the instrument must provide",
        p("Controlled piston travel creates liquid displacement. The drive defines aspiration and discharge motion, while the head and piston configuration determine available capacity and material options. These capabilities support a repeatable fluid-transfer sequence."),
        p("Source selection, needle positioning, liquid-level recognition, high-pressure isolation and washing depend on the surrounding valves, sensors, tubing and control program. The pump does not independently detect an empty aspiration or guarantee chromatographic peak-area precision.")),
      section("capacity-example", "Compare 100 µL and 500 µL capacities at the working dose",
        p("List minimum, routine and maximum injection volumes and the path displacement genuinely needed in each cycle. Once capacity is sufficient, compare the useful stroke fraction, refill count and cycle time."),
        p("For two illustrative configurations with 2,000 steps per full stroke, 100 µL capacity gives 0.05 µL per nominal step and 500 µL gives 0.25 µL per nominal step. A nominal 10 µL movement uses 200 versus 40 steps. This compares control headroom; it does not demonstrate 10 µL delivery accuracy."),
        p("A smaller capacity may require extra refills and valve changes for larger transfers. Select the capacity that balances the routine dose with the complete cycle, not simply the smallest or largest available pump.")),
      section("common-questions", "Resolve material and small-dose questions before ordering",
        h("Does a full-stroke specification apply to every injection volume?"), p("No. Short travel, a different liquid or another valve arrangement may produce different errors. Measure mean volume bias and repeatability at the minimum, routine and maximum working volumes."),
        h("Which head should be used with organic solvents?"), p("Supply solvent identities, proportions, temperature, exposure time and cleaning agents. Check the head, piston, seals and valves together. A ceramic piston or a general chemical-resistance description cannot establish compatibility of the complete assembly."),
        links(sampleGuide, loopGuide, contact)),
    ], references: [refs.autosampler, refs.ea, refs.sm, refs.tm], related: [overviewGuide, sampleGuide, loopGuide],
  },
  "lc-sample-metering": {
    intro: [p("The goal of sample aspiration and injection metering is to move a defined sample volume from the vial into the instrument's injection path. A piston pump supplies controlled displacement; the volume actually transferred also depends on valve timing, needle and tubing volume, bubbles, leakage and liquid properties.")],
    sections: [
      section("injection-cycle", "Define the complete injection cycle",
        flow("Example functional sequence; confirm the actual autosampler architecture", ["Needle enters vial", "Controlled aspiration", "Needle returns to seat", "Valve switches / sample transfers", "Mobile phase carries sample to column"]),
        p("Metering is only one part of the sequence. Needle position, valve state, aspiration speed, dwell time and switching must be coordinated. Check pressure isolation in every state before evaluating a FOREACH configuration; this sequence is not a universal plumbing diagram.", ["autosampler"])),
      section("working-stroke", "Translate the injection volume into a useful working stroke",
        h("Routine dose"), p("Use the normal dose range to choose a repeatable, calibratable working stroke, rather than sizing only from the largest transfer. Reserve capacity for path filling only where the cycle actually requires it."),
        h("Priming and compensation"), p("Needles, valve passages and tubing can consume displacement before a sample reaches its destination. Establish this volume from the actual path and experiments; do not count it automatically as injected sample."),
        h("Nominal step volume"), p("Capacity divided by commanded full-stroke steps estimates command resolution. Mechanical lost motion, compressibility, bubbles and valve timing still affect the liquid result. Microstepping alone does not establish a minimum reliable injection volume.")),
      section("error-diagnosis", "Separate volume errors, carryover and short-stroke variation",
        table("Symptoms guide the first checks; they are not a diagnosis by themselves", ["Observed symptom", "Possible contributors", "First checks"], [
          ["Low or variable delivered volume", "Air entry, incomplete needle immersion, incomplete filling or valve leakage", "Inlet seals, vial level, priming, valve position and dwell time"],
          ["A high sample affects the next result", "Residue at the needle, seat, valve or poorly flushed regions", "Wash chemistry, internal versus external cleaning, wash volume and blank recovery"],
          ["Poor repeatability at small doses", "Too little useful stroke, compressible gas or lost motion", "Capacity choice, aspiration speed, reversal compensation and settling time"],
        ])),
      section("selection-inputs", "Give the supplier the operating window, not only a target dose",
        table("Data for a sample-metering configuration", ["Input", "Include"], [
          ["Volume and tolerance", "Minimum, routine and maximum injection volumes; acceptable bias and repeatability at each point"],
          ["Liquid and contact path", "Sample or system liquid in the pump; solvent composition, viscosity, temperature, particles and gas-release risk"],
          ["Program", "Aspiration speed, dwell, reversal and valve timing; any deliberately introduced air segment"],
          ["Hydraulics", "Needle/tubing volume, inlet height and pressure in every valve state"],
          ["Throughput", "Injections per hour, uninterrupted running time and first-injection requirements after idle"],
          ["Recovery", "Carryover limit, wash procedure, bottle-change recovery and maintenance interval"],
        ]), links(products.ea, products.sm)),
      section("acceptance", "Verify the volume at the point where the sample is received",
        list("Measure bias and repeatability at actual working volumes, using an appropriate validated measurement method.", "Include representative low- and high-viscosity samples and liquids prone to gas release.", "Follow a representative high-concentration sample with blanks to evaluate carryover and wash recovery.", "Compare initial startup, restart after idle, low reservoir level and continuous operation."),
        p("Keep pump delivery measurements separate from chromatographic peak-area repeatability. Sample stability, separation conditions and detector behaviour can change peak area even when displacement is repeatable.")),
      section("first-injection", "Investigate when the error occurs before replacing the pump",
        p("An abnormal first injection points toward priming, the liquid column after idle or retained liquid. An error only at low vial level calls for immersion and inlet checks. Continuous variation requires checking bubbles, seals, drive commands and valve states together."),
        p("Establish a baseline with a fixed vial, liquid, needle position and aspiration program. Change one variable at a time. This distinguishes an undersized or unsuitable metering configuration from a correct pump operating in an unstable fluid path.")),
      section("metering-questions", "Questions about speed and low carryover",
        h("Will faster aspiration always improve throughput?"), p("No. Excessive speed can introduce air or prevent a restrictive path from filling promptly. Find a stable aspiration window for the representative liquids, then optimize needle travel, dwell and valve timing around it."),
        h("Is carryover eliminated when the sample stays outside the pump?"), p("No. Sample can remain in the needle, seat, valve grooves and loop. A system-liquid drive reduces sample contact with some components but does not clean the entire injection path."),
        links(loopGuide, supplyGuide, contact)),
    ], references: [refs.autosampler], related: [pistonGuide, loopGuide, supplyGuide],
  },
  "lc-sample-loop-loading": {
    intro: [p("Sample-loop loading moves sample into the storage path defined by the injection valve. With full-loop loading, loop volume largely sets the injected volume; with partial-loop loading, metering and the operating procedure determine the sample portion. The piston pump creates transfer displacement, but its position depends on a push or pull architecture.")],
    sections: [
      section("loading-layout", "Trace the sample path component by component",
        table("Functional comparison, not a universal sample–pump–loop connection order", ["Arrangement", "Fluid movement", "Selection checks"], [
          ["Pull loading", "A downstream metering device draws sample through the needle and valve into the storage path", "Inlet resistance, continuity of the liquid column, designed air segments and stopping position"],
          ["Push loading", "The metering drive sends sample toward the loading port and loop", "Sample-contact materials, outlet resistance, residue and validated overfill"],
          ["Injection state", "Mobile phase transfers the loaded sample to the column", "Whether the metering device remains pressure-connected; valve isolation and switching sequence"],
        ], ["loop"])),
      section("volume-budget", "Pump displacement is not automatically loaded sample volume",
        p("Displacement can be used to fill the needle, connecting tubing and valve passages before the intended sample reaches the loop. Incomplete priming, trapped gas or early switching can therefore separate theoretical pump movement from actual loaded volume."),
        p("Define the injection strategy and validate path-fill and overfill volumes. Count the volume that this pump must move per cycle, including required path displacement, while keeping the routine metering segment within a useful stroke range.")),
      section("loop-modes", "Compare full-loop and partial-loop requirements",
        table("Loading mode affects both capacity and sample consumption", ["Mode", "Pump requirement", "Customer implication"], [
          ["Full-loop", "Move the loop volume plus path filling and experimentally established overfill", "Sample consumption may exceed nominal injection volume; check the usable volume in small vials"],
          ["Partial-loop", "Meter the target sample segment within the limits of the injection procedure", "Volume control and path condition become particularly important; validate each working point"],
        ]),
        p("There is no universal overfill multiple for every loop. Geometry, dispersion, loading strategy and sample properties change the required excess. Use the instrument procedure and loading experiments rather than a fixed multiplier.")),
      section("valve-sequence", "Coordinate aspiration, settling, switching and recovery",
        table("Control decisions to include in the prototype test", ["Control point", "Question", "Acceptance observation"], [
          ["Aspiration speed", "Does filling cause bubbles, volatilization or vial-surface disturbance?", "Consistent loaded sample across representative liquids"],
          ["Post-aspiration dwell", "Does the liquid column settle before switching?", "Stable loaded volume as dwell is adjusted"],
          ["Valve movement", "Is metering complete and valve position confirmed?", "Correct transfer with defined interlocks for failed switching"],
          ["Wash and reset", "Is the path clean and the starting position verified?", "Acceptable carryover and drift over a sequence"],
        ])),
      section("loop-pump-selection", "Choose the capacity around transfer volume and useful stroke",
        p("EA offers a broad capacity range for transfer tasks; SM is a compact candidate within its capacity range. TM should enter the comparison when the 50–500 µL range and a severely constrained installation are both relevant. None is selected before confirming pressure exposure and required isolation."),
        p("For direct sample contact, examine adsorption, particles, salt precipitation and wash recovery. For a system-liquid drive, verify the system liquid against the complete head, piston, seal and valve assembly. Request configuration-specific evidence at your working volume."), links(products.ea, products.sm, pistonGuide)),
      section("loop-acceptance", "Validate loaded volume and sample use together",
        list("Test loading bias, repeatability and linearity across the intended volumes.", "Measure sample consumed per cycle, including discarded overfill and priming.", "Check loop, seat and valve carryover after repeated high-concentration injections.", "Repeat at representative viscosity, volatility and vial level.", "Test interlocks for a needle out of position, valve failure and inlet air entry.")),
      section("loop-questions", "Common questions about loop size",
        h("Does a 20 µL loop require only 20 µL of sample aspiration?"), p("Not necessarily. Full-loop loading may also fill the needle and valve path and discard excess sample. Partial-loop programs control a defined segment. Establish the mode first, then calculate total sample use."),
        h("Can a larger pump handle every loop without a trade-off?"), p("A larger capacity may reduce refills, but a routine small dose may occupy very little travel. Compare total transfer volume, stroke fraction, sample consumption and cycle time together."), links(contact)),
    ], references: [refs.loop], related: [pistonGuide, sampleGuide, supplyGuide],
  },
  "lc-needle-wash-diaphragm-pumps": {
    intro: [p("Needle-wash supply and wash-station drainage are neighbouring but different duties. The supply side normally handles a defined cleaning liquid and is sized for installed flow, outlet resistance and compatibility. The waste side may encounter air, foam and spent solvent, making suction, recovery and media state essential selection criteria.")],
    sections: [
      section("wash-branches", "Separate the supply path from the drainage path",
        flow("Liquid supply", ["Wash-solvent reservoir", "Liquid supply pump", "Wash port / needle surface"]),
        flow("Waste removal, where active drainage is required", ["Spent wash liquid at station", "Drain pump selected for inlet media", "Waste vessel"]),
        p("Instrument wash and drain arrangements differ. Trace the original connections before adding or replacing a pump; an instrument manual establishes the equipment arrangement, not compatibility of a FOREACH replacement.", ["drainage"])),
      section("supply-versus-drain", "Do not compare supply and drainage by one flow figure",
        table("Different duties require different operating-point data", ["Duty", "Inlet media", "Capability to establish", "Candidate direction"], [
          ["Needle-wash supply", "Defined cleaning liquid", "Controllable delivery through the actual restriction; compatibility and start/stop response", "DPL30; evaluate DPL30H only if outlet resistance justifies it"],
          ["Liquid drainage", "Predominantly continuous liquid", "Installed liquid flow and recovery at actual lift", "A compatible liquid diaphragm configuration such as DPL30"],
          ["Gas-liquid aspiration", "Liquid alternating with air or foam", "Suction and recovery through the required mixed-media cycle", "DPGL800 only within its gas / gas-liquid operating boundary"],
        ])),
      section("diaphragm-candidates", "Keep the product shortlist conditional on the task",
        table("Published limits are not simultaneous installed operating points", ["Candidate", "Published reference data", "Boundary"], [
          ["DPL30", "300 mL/min free flow; 100 kPa rated pressure; 6 mH2O self-priming height under specified conditions", "A liquid-transfer candidate. Confirm actual solvent and installed flow; do not treat limiting lift as the normal design point."],
          ["DPL30H", "300 mL/min free flow; 600 kPa rated pressure", "Consider for a demonstrated higher-resistance liquid path, not merely because its pressure rating is higher."],
          ["DPGL800", "6 L/min single-head free-air flow; stated maximum negative pressure below −90 kPa", "Gas and gas-liquid mixtures; not 100% liquid transfer. Air flow does not quantify liquid drainage."],
        ], ["dpl30", "dpl30h", "dpgl800"]), links(products.dpl30, products.dpl30h, products.dpgl800)),
      section("need-for-pump", "Determine whether active pumping is needed at all",
        p("Some wash systems use other pump types, while some drain lines work by gravity. A wash station alone does not justify adding a diaphragm pump. If gravity drainage handles peak arrivals and ventilation is adequate, a simple drain may be sufficient."),
        p("Evaluate active removal when installation height, long tubing, intermittent accumulation or a defined vacuum requirement makes it necessary. A candidate pump must fit that architecture, not merely the instrument category.")),
      section("balance-wash-waste", "Match peak wash arrivals to usable drain capacity",
        p("The supply pump is evaluated by liquid delivered to the wash port. The drain is evaluated by liquid removed before the next cycle. Equal average flows do not prevent overflow if most wash liquid arrives in a short burst."),
        list("Record peak incoming flow, total wash volume, allowable accumulation and emptying time.", "Test the actual drain line with representative air and foam content.", "Check backflow, drips, noise and recovery after a bottle change.", "Never subtract gas free-flow from liquid supply flow as if they were the same quantity.")),
      section("wash-validation", "Verify the real cleaning cycle",
        list("Check weak and strong wash solvents against the head, diaphragm, valves, seals, fittings and tubing.", "Measure flow with the installed tube diameter, length, lift, filters and nozzle.", "Test start/stop behaviour and residue recovery at the intended cycle rate.", "For drainage, include alternating liquid, air and foam as well as waste-vessel level changes.")),
      section("diaphragm-questions", "Questions about priming and product count",
        h("Does self-priming mean the pump can continuously handle mixed waste?"), p("No. Establishing suction under a stated test condition is different from sustained alternating gas-liquid operation. Confirm the allowed media state and test the complete duty cycle."),
        h("Must DPL30, DPL30H and DPGL800 all be installed?"), p("No. They represent different candidate duties, not a required bill of materials. Select only the configuration needed for the defined supply or drainage path."), links(supplyGuide, wasteGuide, contact)),
    ], references: [refs.drainage, refs.dpl30, refs.dpl30h, refs.dpgl800], related: [overviewGuide, supplyGuide, wasteGuide],
  },
  "lc-needle-wash-supply": {
    intro: [p("A useful needle-wash cycle does more than move liquid. It brings a suitable solvent to the required surface for sufficient contact time and carries residue away from the wash port. Select the supply pump together with the wash geometry, nozzle, tubing resistance and cleaning program.")],
    sections: [
      section("wash-supply-path", "Define the surface and flow path being washed",
        flow("External needle-wash supply", ["Weak / strong wash reservoir", "Controlled liquid supply", "Wash port and needle exterior", "Waste outlet"]),
        p("The solvent dissolves or dislodges the target residue; the pump delivers it to the wash port. External needle washing does not automatically clean the internal needle, injection valve or sample loop. Those paths require the correct fluid connections and valve sequence.", ["wash"])),
      section("wash-pump-choice", "Evaluate DPL30 first where its operating range fits",
        table("Product choice follows measured resistance and controllable flow", ["Candidate", "Reason to evaluate", "Required confirmation"], [
          ["DPL30", "Routine liquid wash delivery within its installed operating envelope", "Its 300 mL/min free-flow value is not the flow through narrow tubing, filters and a wash nozzle."],
          ["DPL30H", "A path with a demonstrated higher outlet-pressure requirement", "The 600 kPa rated pressure is not a default selection reason. Confirm pressure limits for the complete path and usable flow at load."],
        ], ["dpl30", "dpl30h"]), links(products.dpl30, products.dpl30h)),
      section("wash-flow-calculation", "Convert wash volume and available time into installed flow",
        p("Nominal average delivery requirement equals wash volume divided by effective delivery time. For example, 2 mL delivered in 5 seconds requires an average 24 mL/min at the wash port. This initial calculation excludes startup delay, flow establishment and pulsation."),
        p("A DPL30 free-flow value of 300 mL/min does not prove stable, controllable delivery at 24 mL/min. Confirm the drive adjustment range, installed flow curve and start/stop repeatability. If the required low flow cannot be controlled, reassess the pump or fluid-path arrangement.")),
      section("wash-chemistry", "Specify weak and strong wash formulations, not only their names",
        p("Provide each liquid's solvent identities, mixing ratios, additives and temperature. Evaluate continuous exposure as well as residual liquid during idle periods across every wetted component."),
        p("When multiple solvents share a pump and line, the first liquid after switching contains the previous contents. Determine replacement volume from path volume and residue testing. Separate supply branches can reduce shared-path carryover but require extra space and components; choose from the acceptance requirement.")),
      section("carryover-validation", "Judge cleaning by blank recovery, not pump flow alone",
        p("Run a representative high-concentration sample followed by blanks. Compare solvent composition, effective wash time, delivered volume and wash repetitions. Measure the recovery that matters to the analytical method rather than assuming more flow is cleaner."),
        list("Confirm that the needle exterior and seat-contact regions receive the intended coverage.", "Evaluate internal-path cleaning separately from external washing.", "Observe splashing, droplets, foaming and liquid accumulation during the full cycle.", "Check the first wash after reservoir replacement and the first cycle after idle.")),
      section("wash-specification", "Prepare the supply-pump acceptance specification",
        table("Information for configuration and testing", ["Input", "Required detail"], [
          ["Media", "All wash recipes, temperatures, viscosity range and compatibility requirements"],
          ["Duty", "Volume per wash, effective supply time, cycle frequency and daily running hours"],
          ["Installed path", "Tube sizes and lengths, lift, filter and nozzle restriction"],
          ["Integration", "Permitted pressure, drive/control, noise, space and service access"],
          ["Result", "Carryover limit for representative samples, acceptable drips and restart recovery"],
        ])),
      section("wash-supply-questions", "Common wash-supply questions",
        h("Does higher flow always improve cleaning?"), p("No. Solvent action, contact time and surface coverage also matter. Excess flow can cause splashing, consume more solvent and overwhelm the drain. Use the high-sample/blank result to select a suitable program."),
        h("Should the pump use a brushed or brushless motor?"), p("Compare the available versions against daily running time, start/stop frequency, maintenance interval and budget. A brushless drive does not by itself guarantee low carryover or stable very-low-flow operation."), links(wasteGuide, contact)),
    ], references: [refs.wash, refs.dpl30, refs.dpl30h], related: [diaphragmGuide, wasteGuide, sampleGuide],
  },
  "lc-waste-aspiration": {
    intro: [p("The first question in wash-station drainage is whether the pump inlet remains filled with liquid. If the pickup becomes exposed, air enters intermittently or foam forms, selection moves from liquid transfer toward mixed-media aspiration and vacuum recovery. These are different operating requirements.")],
    sections: [
      section("waste-architecture", "Identify liquid drainage, mixed aspiration or vacuum collection",
        table("Trace the actual waste architecture before selecting a pump", ["Layout", "What passes through the pump", "Design requirement"], [
          ["Direct liquid drainage", "Predominantly liquid waste", "Liquid-transfer capability at the installed lift and resistance"],
          ["Direct mixed-media aspiration", "Air, spent liquid and potentially foam", "Approved gas-liquid duty, suction recovery and suitable materials"],
          ["Vacuum-over-liquid collection", "Gas withdrawn from a collection vessel", "Vacuum-rated vessel, level shutdown and protection against liquid entering the gas path"],
        ]), p("Keep waste connections, container ventilation and installation requirements consistent with the instrument design. A closed container and an atmospheric drain do not create the same pump operating point.", ["drainage"])),
      section("waste-candidates", "DPL30 and DPGL800 solve different waste duties",
        table("Use media state to separate the candidates", ["Candidate", "Published data", "Application boundary"], [
          ["DPL30 liquid diaphragm pump", "300 mL/min free flow; 100 kPa rated pressure; 6 mH2O self-priming height under specified conditions", "Evaluate for an appropriate predominantly liquid path. Verify waste chemistry, installed lift and delivered flow."],
          ["DPGL800 gas-liquid diaphragm pump", "6 L/min single-head free-air flow; stated maximum negative pressure below −90 kPa", "For gas and gas-liquid mixtures, not 100% liquid transfer. Confirm the actual mixed-media duty and vacuum operating point."],
        ], ["dpl30", "dpgl800"]),
        p("DPGL800's 6 L/min value does not mean it removes 6 litres of liquid waste each minute. Determine the needed gas capacity from station volume, vacuum establishment time, incoming air, media ratio and acceptable noise. Do not select it merely because its numerical flow is larger."), links(products.dpl30, products.dpgl800)),
      section("waste-failures", "Use the failure pattern to identify the design problem",
        table("Drainage observations and possible causes", ["Symptom", "Possible cause", "Check or design response"], [
          ["Liquid accumulates at the wash port", "Insufficient installed removal, obstruction or trapped gas at high points", "Measure emptying time and inspect pickup geometry and routing"],
          ["No recovery after an air-filled interval", "Unsuitable media duty or excessive inlet leakage", "Separate designed air intake from a leak; test recovery after realistic interruptions"],
          ["Foam reaches the waste-vessel outlet", "Foaming chemistry, aggressive aspiration or poor ventilation", "Review timing, separation space and vent arrangement"],
          ["Odour or leakage", "Incompatible tubing, loose fittings or poor container sealing", "Check wetted/seal materials and define level/leak response"],
        ])),
      section("waste-container", "Include the waste container in the specification",
        list("State whether collection is atmospheric or under vacuum and how it is vented.", "Test minimum and maximum liquid levels, real height differences and possible outlet submersion.", "Check stop-state backflow and siphoning with the installed tubing route.", "Use representative spent solvent, sample residue and foam for material and recovery testing.", "Define safe responses to a full vessel, blockage, disconnected tubing and pump failure.")),
      section("waste-diagnostics", "Investigate slow drainage in a useful order",
        { type: "list", ordered: true, items: ["Check whether the waste vessel is full, the vent is obstructed or the outlet is submerged.", "Inspect kinks, diameter changes, clogged filters, deposits at the pickup and the actual lift.", "Distinguish an inlet leak from expected entrained air. A leak can weaken suction; expected air requires an appropriate pump duty.", "Compare measured emptying time with the incoming wash profile to separate an unsuitable operating point from an unsuitable pump type."] },
        p("A vessel with usable buffer volume may absorb a short wash burst, but it must recover before the next burst. Average supply and drain figures alone do not establish this.")),
      section("waste-questions", "Questions about suction height and gas flow",
        h("Does 6 mH2O self-priming height guarantee useful flow at a six-metre lift?"), p("No. The figure has a defined test medium and setup. Tube length and diameter, liquid properties, air leaks and the desired flow change the installed result. A limiting suction figure is not a routine design point."),
        h("Are maximum vacuum and maximum flow available together?"), p("Do not combine endpoint ratings into one operating point. Use the relevant curve and test aspiration at actual inlet pressure, media state and outlet backpressure."),
        h("Is a waste pump necessary when gravity drainage works?"), p("Not automatically. If the drain removes peak arrivals without accumulating liquid and meets the installation and containment requirements, adding a pump may create unnecessary complexity."), links(contact)),
    ], references: [refs.drainage, refs.dpl30, refs.dpgl800], related: [diaphragmGuide, supplyGuide],
  },
  "lc-post-column-valveless-pumps": {
    intro: [p("Some LC methods introduce a derivatization reagent after the column and before detection. The pump continuously meters an auxiliary reagent, rather than supplying the mobile phase through the separation column. RPL single-head valveless pumps can be evaluated as engineering candidates; suitability depends on the reagent, backpressure, flow variation and complete analytical method.")],
    sections: [
      section("post-column-path", "Keep the reagent pump on a separate branch",
        flow("Separated analytes follow the main post-column path", ["Column effluent", "Mixing junction", "Reaction tubing", "Detector"]),
        flow("The reagent branch joins at the mixing junction above", ["Derivatization-reagent reservoir", "Candidate RPL metering pump", "Mixing junction"]),
        p("Column effluent does not pass through the RPL reagent pump in this arrangement. Post-column derivatization adds and reacts reagent with separated components before detection; the method determines whether this additional branch is needed.", ["reaction"])),
      section("rpl-candidates", "Shortlist by displacement, speed and method demand",
        table("Displacement per revolution is not flow per minute", ["Series", "Published displacement range", "When to evaluate"], [
          ["RPL-P4", "12–80 µL/rev", "An initial candidate when a smaller displacement is useful for the required reagent flow"],
          ["RPL-P6.35", "50–300 µL/rev", "A candidate where mechanical displacement adjustment and speed can provide the required operating range"],
          ["RPL-P15", "300–1,200 µL/rev", "Only where the method requires substantially more reagent; not a default low-flow LC selection"],
        ], ["rpl4", "rpl635", "rpl15"]),
        p("The range is neither a minimum reliable dose nor a guaranteed continuous-flow range. Confirm the permitted speed, displacement setting, duty and installed load. A larger RPL model is not included simply because it belongs to the same family."), links(products.rpl4, products.rpl635)),
      section("method-fit", "Validate the method, not just the pump's average output",
        list("Match reagent flow to column effluent, reaction chemistry and permitted dilution.", "Check mixing uniformity while controlling added volume and peak broadening.", "Evaluate whether output variation, speed changes or backpressure changes create unacceptable baseline noise.", "Use reagent composition, precipitation risk and cleaning procedure to assess every wetted material."),
        p("These checks establish an application candidate, not a prequalified reagent-pump replacement for every LC method. Obtain performance data at the intended working point before fixing the configuration.")),
      section("need-for-derivatization", "Add a reagent branch only when the detection method needs it",
        p("A method that detects the separated compounds without a post-column reaction does not need this pump branch. When derivatization is required, define reagent concentration and flow, mixing geometry, reaction conditions and detector acceptance first."), links(dosingGuide)),
      section("valveless-role", "Understand what valveless construction changes",
        p("RPL metering combines rotating and reciprocating ceramic-piston motion to organize inlet and outlet transfer without conventional dynamic check valves inside the pump. Displacement per revolution and rotational speed provide the basis for a metering configuration.", ["rpl635"]),
        p("Valveless does not mean instantaneous pulse-free delivery, nor does it remove the system's need for shutoff, source selection or anti-siphon measures. Check the detector baseline and standards as well as liquid collected over time.")),
      section("rpl-questions", "Questions before selecting an RPL configuration",
        h("Can an RPL candidate replace the high-pressure LC main pump?"), p("That is not the use described here. The candidate serves a post-column reagent branch. Main mobile-phase delivery requires its own validated high-pressure, continuous-flow and gradient capabilities."),
        h("Is a displacement range sufficient to select the model?"), p("No. You also need speed range, continuous-duty capability, actual backpressure, wetted materials, control and allowable flow fluctuation. A value in µL/rev cannot be compared directly with a target in mL/min."),
        h("What remains unconfirmed without method data?"), p("The final pump configuration, reagent compatibility, low-flow stability, baseline contribution and maintenance interval. Treat the shortlist as an engineering evaluation until these are established."), links(contact)),
    ], references: [refs.reaction, refs.rpl4, refs.rpl635, refs.rpl15], related: [overviewGuide, dosingGuide],
  },
  "lc-derivatization-reagent-dosing": {
    intro: [p("Continuous post-column dosing must sustain the auxiliary reagent flow throughout the analysis while keeping mixed concentration, reaction time and detector behaviour acceptable. Before choosing an RPL model, translate the method flow into a displacement setting, speed and actual backpressure, then verify the complete reagent path.")],
    sections: [
      section("reagent-operating-point", "Work back from the method to the pump operating point",
        h("Required reagent flow"), p("Set the minimum, routine and maximum flow from reaction chemistry, column flow, sensitivity and acceptable dilution. Maximum pump output is not the starting requirement."),
        h("Displacement and speed"), p("Use an achievable displacement setting and a stable, permitted speed range. Avoid selecting a large displacement that requires an unverified extreme low speed to meet the target."),
        h("Actual backpressure"), p("The mixer, reaction tubing, fittings and detector inlet load the reagent branch. Confirm the pressure envelope during startup and normal operation rather than assuming that every post-column path is near atmospheric pressure.")),
      section("reagent-flow-controls", "Follow the four functional control points",
        flow("Reagent dosing within the post-column method", ["RPL supplies reagent", "Reagent joins column effluent", "Mixing and reaction residence", "Detector response and baseline"]),
        p("The reagent pump is on the supply branch, not in the column-effluent line. The method must establish mixing and reaction before detection; average pump flow alone cannot confirm reaction completion.", ["reaction"])),
      section("reagent-calculations", "Estimate flow, mixing ratio and nominal reaction time",
        p("Nominal reagent flow equals displacement per revolution multiplied by rotational speed. An illustrative confirmed configuration set to 50 µL/rev at 20 rev/min gives 1 mL/min nominal average flow. Whether that setting and speed work reliably still depends on the drive, liquid, backpressure and measured output."),
        p("For a separate example, column effluent of 1 mL/min plus reagent at 0.2 mL/min gives approximately 1.2 mL/min total flow when liquid volumes are approximately additive. An effective reaction volume of 0.6 mL gives a nominal residence time of 0.5 minutes, or 30 seconds."),
        p("These are design calculations, not validated product operating points. They do not account for imperfect mixing or residence-time distribution. Confirm reaction yield, sensitivity and peak shape experimentally.")),
      section("reagent-selection-data", "Specify the liquid and detector constraints",
        table("Inputs for the RPL configuration review", ["Input", "Data to supply", "What it establishes"], [
          ["Flow window", "Low, routine and high reagent flow; total analysis duration", "Candidate displacement and speed combinations"],
          ["Reagent", "Composition, concentration, viscosity, temperature, crystallization and cleaning liquids", "Compatibility of the selected head, ceramic parts, seals and full path"],
          ["Load", "Backpressure created by the installed mixer, reaction tube and detector connection", "Drive margin and output stability at the real working point"],
          ["Detection", "Allowed baseline noise/drift, peak broadening and response time", "Whether mixing and flow fluctuations are acceptable"],
        ]),
        p("RPL-P4 and RPL-P6.35 offer different displacement ranges; review their actual configurations rather than assuming identical wetted materials. For a specified assembly, obtain confirmation covering reagent and cleaning exposure before prototype release.", ["rpl4", "rpl635"]), links(products.rpl4, products.rpl635)),
      section("method-validation", "Use complete-method results to confirm the configuration",
        list("Measure actual output at low, routine and high working points and record drift over the intended run time.", "Test startup, stopping and speed changes against the real hydraulic load.", "Compare controlled pump-state changes with baseline behaviour without running the detector outside its permitted conditions.", "Assess mixing, reaction time, standard response, sensitivity and peak shape together.", "Test flushing, precipitation prevention and recovery after the intended idle interval."),
        p("If collected average flow is acceptable but the baseline shows periodic variation, examine instantaneous delivery, bubbles and mixing. Correlation with the pump cycle is a diagnostic clue, not proof that the pump is the only source.")),
      section("shutdown-recovery", "Prevent precipitation and define restart recovery",
        p("For salt-containing or precipitation-prone reagents, establish a compatible displacement and flush sequence instead of leaving residue in the pump and reaction tubing. Consider whether the flush liquid can react with or precipitate the remaining reagent."),
        p("At restart, prime and remove gas, establish stable supply and check the baseline before analyzing samples. Record time to acceptable stability; observing that the motor is turning is not an acceptance test. Use these results to set maintenance and idle procedures.")),
      section("continuous-dosing-questions", "Questions about low flow and baseline stability",
        h("Does reducing speed always give more stable low flow?"), p("No. At very low speed, the time pattern of delivery may become more noticeable to the reaction and detector. Compare displacement adjustment, drive behaviour and complete-method results instead of judging only average flow."),
        h("Does baseline fluctuation always indicate pump pulsation?"), p("Bubbles, mixing, reaction temperature, reagent changes and the detector can also contribute. Hold other conditions steady and compare measured flow, pump timing and the signal before assigning a cause."),
        h("When is the final configuration ready to specify?"), p("After the required flow range, reagent compatibility, backpressure, baseline acceptance and shutdown/restart recovery have been demonstrated with the intended fluid path. Record the tested model, materials, control settings and limits so the result is reproducible."), links(contact)),
    ], references: [refs.reaction, refs.rpl4, refs.rpl635], related: [rplGuide, overviewGuide],
  },
} satisfies Record<LiquidChromatographySlug, ApplicationDocumentBody>;

// Keep contextual reading links and bottom cards on the same task-specific source.
// These are normal document paragraphs/anchors, rendered with the existing blocks.
export const liquidChromatographyBodies = (Object.keys(bodies) as LiquidChromatographySlug[])
  .reduce<Record<LiquidChromatographySlug, ApplicationDocumentBody>>((result, slug) => {
    const body: ApplicationDocumentBody = bodies[slug];
    const readings = LC_TASK_RESOURCES[slug].readings;
    for (const reading of readings) {
      if (!body.sections.some((item) => item.id === reading.sectionId) || !reading.text.includes(reading.anchor)) {
        throw new Error(`Invalid LC reading placement: ${slug}/${reading.slug}`);
      }
    }
    result[slug] = {
      ...body,
      sections: body.sections.map((section) => ({
        ...section,
        blocks: [
          ...section.blocks,
          ...readings.filter((reading) => reading.sectionId === section.id).map((reading): ApplicationBlock => ({
            type: "paragraph", text: reading.text,
            inlineLinks: [{ text: reading.anchor, href: lcArticleHref(reading.slug) }],
          })),
        ],
      })),
    };
    return result;
  }, { ...bodies });
