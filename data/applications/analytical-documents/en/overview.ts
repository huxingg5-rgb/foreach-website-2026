import type { ApplicationDocumentBody, ApplicationLink } from "../types";
import { analyticalDocumentHref } from "../registry";
import { getEnglishAnalyticalInstrumentLinks } from "../../analytical-instruments/navigation";

// Use the desktop menu as the source of instrument labels and destinations.
const instruments = getEnglishAnalyticalInstrumentLinks();
function instrumentLink(imageName: string): ApplicationLink {
  const entry = instruments.find((item) => item.key.endsWith("/" + imageName + ".webp"));
  if (!entry) throw new Error("Missing analytical instrument navigation: " + imageName);
  return { label: entry.label, href: entry.href };
}

const overview = {
  intro: [
    { type: "paragraph", text: "Start with the instrument, then identify where liquid is moved and what the operation must achieve. An autosampler loading a sample loop, an elemental-analysis system preparing a dilution and a water analyzer adding a reaction reagent impose different requirements on the pump and its surrounding fluid path." },
    { type: "paragraph", text: "Explore the instrument categories below to identify the relevant metering, washing, transfer or waste-handling task. FOREACH supplies fluid-handling components; selection depends on the actual liquid, working volume or flow, pressure, timing and result at the point of use. For clinical chemistry and other diagnostic workflows, use the separate IVD application area.", inlineLinks: [{ text: "IVD application area", href: "/en/applications/ivd/" }] },
  ],
  sections: [
    {
      id: "instrument-tasks", title: "Chromatography and autosamplers",
      blocks: [
        { type: "paragraph", text: "In liquid chromatography, mobile-phase delivery, sample introduction and needle washing are different fluid-handling duties. Identify the branch before selecting a component: the pressure seen by an autosampler metering device depends on the injection architecture and valve state, not simply on its location beside the column." },
        { type: "table", caption: "Where to start in a liquid chromatography system", headers: ["Position and task", "Selection question", "Continue with"], rows: [
          ["Autosampler sample aspiration and loop loading", "What volume must reach the injection path, and is the metering channel isolated from system pressure?", "Piston-pump metering and sample-loop loading guides"],
          ["Needle-wash supply and wash-station drainage", "What installed wash flow and waste removal rate are required, and does the waste inlet receive air as well as liquid?", "Liquid and gas-liquid diaphragm-pump task guides"],
          ["Separate post-column derivatization reagent branch", "Does the method require reagent addition, and what flow ratio, backpressure and detector stability must be validated?", "Conditional evaluation of valveless reagent metering"],
        ] },
        { type: "paragraph", text: "The liquid chromatography guide separates these positions and leads to the relevant pump and task pages. FOREACH precision dispensing piston pumps are not presented as replacements for an HPLC high-pressure mobile-phase pump. Post-column reagent dosing is relevant only to methods that require that additional branch." },
        { type: "links", items: [instrumentLink("analytical-chromatography-autosampler")] },
      ],
    },
    {
      id: "instrument-elemental-analysis", title: "Spectroscopy and elemental analysis",
      blocks: [
        { type: "paragraph", text: "For liquid-sample elemental analysis, distinguish sample preparation from the instrument's sample-introduction process. Preparing a calibration solution, diluting an overrange sample and rinsing a shared path are separate tasks; they should not be assigned one generic pump setting." },
        { type: "paragraph", text: "Agilent's Advanced Dilution System 2 distinguishes fixed dilution, overrange dilution and calibration-standard preparation. This is a workflow reference, not a claim that FOREACH supplies that system. For a proposed fluid path, define the stock and diluent volumes, matrix and acid composition, mixing sequence and blank recovery before choosing metering components.", references: ["ads2"] },
        { type: "list", items: [
          "Specify the smallest stock aliquot as well as the final prepared volume; nominal pump capacity alone does not establish concentration accuracy.",
          "Include sample and cleaning chemistry when assessing every wetted material, not only the pump head.",
          "Verify dilution and high-to-low carryover at the receiving vessel or sample-introduction point used by the method.",
        ] },
        { type: "links", items: [instrumentLink("analytical-spectroscopy-elemental-analysis")] },
      ],
    },
    {
      id: "instrument-water-monitoring", title: "Water quality and environmental monitoring",
      blocks: [
        { type: "paragraph", text: "Start with the measurement method and sampling arrangement. A water-analysis fluid path may need to select a source, transfer a sample, add a defined reagent volume, wait for a reaction and restore the path before the next measurement. These actions have different flow and timing requirements." },
        { type: "table", caption: "Separate measurement duties from auxiliary handling", headers: ["Duty", "Information needed"], rows: [
          ["Sample acquisition and transfer", "Source level, suction lift, particles, sample-line volume and exchange time"],
          ["Reagent or standard addition", "Actual dose, formulation, permitted error and the sequence specified by the method"],
          ["Washing and waste removal", "Cleaning liquid, available time, installed resistance and liquid or gas-liquid inlet conditions"],
        ] },
        { type: "paragraph", text: "Check the complete measurement and recovery cycle, including reservoir changes and idle periods. A component that can transfer the liquid is not, by that fact alone, validated to meter the reagent or preserve the sample for the analytical method." },
        { type: "links", items: [instrumentLink("analytical-water-environment-monitoring")] },
      ],
    },
    {
      id: "instrument-sample-preparation", title: "Sample preparation systems",
      blocks: [
        { type: "paragraph", text: "Describe what must happen to the sample before measurement: aliquoting, dilution, reagent addition, mixing, washing or recovery of a prepared fraction. Select the liquid-handling architecture from sample contact, contamination limits and the required receiving volume, rather than starting with a list of pump families." },
        { type: "list", items: [
          "For a fixed shared path, define the previous-to-next sample sequence and how the complete contacted path will be cleaned.",
          "Where disposable tips are required, assess the full pipetting arrangement rather than treating a liquid metering pump as a direct substitute.",
          "For dilution or standard preparation, verify concentration and mixing separately from the volume delivered by each channel.",
          "For wash addition or waste aspiration, specify the actual medium, installed load and the material or fraction that must remain in the vessel.",
        ] },
        { type: "links", items: [instrumentLink("analytical-sample-pretreatment")] },
      ],
    },
    {
      id: "instrument-system-integration", title: "Laboratory analyzer system integration",
      blocks: [
        { type: "paragraph", text: "Use this route when several fluid-handling duties must operate together in one instrument. Integration concerns the interfaces and complete sequence: which source is connected, when a valve changes state, where liquid is received, how abnormal conditions are detected and how the path is restored." },
        { type: "paragraph", text: "Define each branch before combining components. Metered sample delivery, reagent supply and wash-station drainage need separate acceptance criteria even when they share a controller. Confirm mounting space, connectors, tubing bends and service access as part of the design, rather than checking the pump body's dimensions alone." },
        { type: "list", items: [
          "Draw normal operation, priming, washing, idle and restart as separate fluid-path states.",
          "Specify valve confirmation, sensor signals and controller responses without assuming a motor command proves liquid delivery.",
          "Validate the assembled path at the receiver, including the first cycle after a bottle change or planned shutdown.",
        ] },
        { type: "links", items: [instrumentLink("analytical-laboratory-system-integration")] },
      ],
    },
    {
      id: "configuration-inputs", title: "Prepare the operating conditions for component selection",
      blocks: [
        { type: "table", caption: "Information to provide with an instrument-specific request", headers: ["Input", "Include", "Decision supported"], rows: [
          ["Instrument and position", "Instrument type, measurement method, fluid-path diagram and the component's task", "Select the relevant application rather than transferring assumptions from another instrument"],
          ["Liquid and exposure", "Composition, concentration, temperature, cleaning liquid and idle contact time", "Assess the full wetted path and maintenance requirements"],
          ["Operating point", "Minimum, routine and maximum dose or flow; inlet conditions and outlet pressure", "Evaluate useful stroke or installed flow rather than unrelated maximum ratings"],
          ["Cycle and acceptance", "Timing, washing, refill, delivered-volume requirement, carryover and recovery criteria", "Validate performance at the actual receiving position"],
          ["Installation", "Available space, interfaces, tubing layout, control and service access", "Build a configuration that can be installed, controlled and maintained"],
        ] },
        { type: "paragraph", text: "FOREACH can use these inputs to assess candidate pumps, valves and associated fluid-path components. The relevant instrument guide explains where each component works; the product page then provides the configuration and specification information needed for the next selection step." },
        { type: "links", items: [{ label: "Discuss your analytical instrument fluid path", href: "/en/contact/" }] },
      ],
    },
  ],
  references: [
    { id: "ads2", title: "Agilent: Advanced Dilution System 2", href: "https://icp-oes.help.agilent.com/en/HowTo/Accessories/Advanced_Dilution_System_2.htm" },
  ],
  related: [
    { label: "Liquid chromatography fluid handling", href: analyticalDocumentHref("liquid-chromatography") },
    { label: "IVD diagnostic instrument applications", href: "/en/applications/ivd/" },
  ],
} satisfies ApplicationDocumentBody;

export default overview;
