// Approved English H1 and introduction copy: bilingual review v2, 2026-10-04.
// Existing product terminology is primary; specifications remain model-specific.
import { fittingIntroductionLocales } from "./fitting-introductions.locales";
import { productOverviewHeadings } from "./product-overview-headings";

export type ProductIntroductionEn = { title: string; paragraphs: string[] };

export const productOverviewIntrosEn: Record<string, ProductIntroductionEn> = {
  "pumps": {
    "title": productOverviewHeadings.pumps.en,
    "paragraphs": [
      "FOREACH offers piston pumps, miniature diaphragm pumps, pipetting pumps, valveless metering pumps and syringe pumps for IVD, life science, laboratory automation and analytical equipment. Choose a series for reagent dispensing, sample aspiration, liquid transfer or mixed gas/liquid aspiration, then match its control and mounting requirements to your instrument.",
      "Compare models by dispense volume or working flow, backpressure and cycle timing. EA piston pumps cover capacities from 50 μL to 20 mL. The DPL60 has a free-flow rate of 600 mL/min, while the DPL30H has a rated pressure of 600 kPa; these values describe different models. RPL-P15 valveless pumps provide 300–1200 μL/rev displacement. Confirm operating performance for the selected configuration.",
      "Wetted materials and seals vary by series and model. Review fluid composition, concentration, viscosity, temperature, contact time and electrical interfaces when selecting pump heads, metering components, seals, tubing and ports. Where dosing accuracy and repeatability are critical, use the specifications and test conditions for the selected model rather than a category-wide performance assumption."
    ]
  },
  "valves": {
    "title": productOverviewHeadings.valves.en,
    "paragraphs": [
      "FOREACH offers rotary selector valves, high-pressure rotary valves and miniature diaphragm solenoid valves for IVD and analytical instruments. Use them to select fluid sources, switch reagent and wash paths, or open and close liquid flow. Selected high-pressure configurations support HPLC sample-loop loading, injection and venting.",
      "MRV3 rotary valves offer 10-, 16- and 24-channel configurations with RS232/RS485 communication. The HP two-position, six-port valve has a maximum operating pressure of 25 MPa and an internal volume of 0.8 μL. SV10 solenoid valves include two-way normally closed, two-way normally open and three-way versions, with an operating pressure range of −75 kPa to 0.25 MPa. These are model-specific examples.",
      "Select the valve around system pressure, residual-volume requirements, switching cycles, power-off state, port geometry and electrical interfaces. Wetted components and seals depend on the order configuration. Check their compatibility with reagents, samples, mobile phases and cleaning fluids before integrating the valve with pumps, tubing and fittings."
    ]
  },
  "fittings": {
    title: productOverviewHeadings.fittings.en,
    paragraphs: fittingIntroductionLocales.en.fittings!.paragraphs,
  },
  "needles": {
    "title": productOverviewHeadings.needles.en,
    "paragraphs": [
      "FOREACH develops custom sampling probes for samples and reagents, piercing probes, wash probes and mixing paddles for automated analyzers and liquid handling equipment. These components support aspiration and dispensing, access to sealed consumables, washing and waste removal, and reaction-fluid mixing. Designs are matched to your instrument using drawings or samples.",
      "Probe options include ID/OD, working length, tip geometry, side ports, bends and mounting ends. Piercing structures are matched to the film or stopper; wash structures to the wash station and waste path; and paddle geometry to the vessel, liquid volume and available motion space. Dimensions and acceptance criteria are agreed for each project.",
      "Internal polishing, coatings, welding and capacitive liquid-level detection compatibility are reviewed by project. Provide the fluids, cleaning method, liquid volumes and motion requirements so the design can be evaluated for residue, piercing force or mixing performance. Available manufacturing options do not establish a common performance rating for every component."
    ]
  },
  "control": {
    "title": productOverviewHeadings.control.en,
    "paragraphs": [
      "FOREACH offers bubble detection and pressure monitoring modules for IVD, life science and automated analytical equipment. ABD detects bubbles, droplets and gas/liquid states in transparent tubing. PDM5 measures fluid-path pressure. Their signals can support supply checks, blockage assessment and abnormal-state alarms in the equipment control system.",
      "ABD configurations cover transparent tubing ODs of 1.6–6.4 mm, with a specified detectable bubble or liquid width of >0.8 mm and a response time of 6 ms. PDM5 has a standard pressure range of 10–1200 kPa and an internal volume of ≤55 μL, with a default sampling rate of 37.5 Hz adjustable up to 100 Hz. These specifications belong to different products.",
      "ABD uses non-contact infrared detection; performance depends on the tubing wall, transparency and fluid optical properties. Its TTL interface and Modbus RTU protocol describe different parts of the electrical connection. PDM5 uses I2C communication and a PEEK flow path with 1/4-28 UNF connections. Validate mounting, signal interpretation and alarm thresholds in the assembled instrument."
    ]
  }
};

// Compatibility export: all fittings translations share one source.
export const fittingIntrosEn: Partial<Record<string, ProductIntroductionEn & { features: string[] }>> =
  Object.fromEntries(
    Object.entries(fittingIntroductionLocales.en)
      .filter(([key, intro]) => key !== "fittings" && intro)
      .map(([key, intro]) => [key, { ...intro!, features: [] }]),
  );

export const productDetailIntrosEn: Partial<Record<string, ProductIntroductionEn>> = {
  "sampling-probes": {
    "title": "Custom Sampling Probes for Samples and Reagents",
    "paragraphs": [
      "FOREACH custom sampling probes for samples and reagents support aspiration, dispensing and measured liquid transfer in automated analyzers. Designs are matched to the instrument layout, container geometry, liquid volume and motion sequence, rather than selected by tube dimensions alone.",
      "Specify probe ID/OD, overall and working length, pointed, flat or V-shaped tips, side ports, bends and mounting ends. Capacitive liquid-level detection compatibility can be reviewed with the probe structure, cable connection and instrument-level detection scheme.",
      "Internal polishing, external coatings and surface treatments are evaluated against the fluid and cleaning process. Provide drawings or samples, aspiration/dispense rates, target volumes and residue requirements to define the geometry, manufacturing process and acceptance criteria. Validate carryover performance in the actual workflow."
    ]
  },
  "piercing-probes": {
    "title": "Custom Piercing Probes for Sealed Consumables",
    "paragraphs": [
      "FOREACH custom piercing probes provide liquid access through films or stoppers in sealed reagent reservoirs, sample containers and consumables. The probe is designed around the target consumable, piercing depth and motion path in the automated instrument.",
      "Design options include tip angle, cutting-edge orientation, side ports, vent holes or grooves, bends and mounting ends. Review the gas and liquid paths together with consumable thickness, penetration force, probe strength and aspiration position.",
      "Provide consumable drawings or samples, fluid details, cycle timing and installation space. Probe materials, welding and surface processes are confirmed for the project. Validate piercing stability, liquid access and venting with the actual consumable and instrument motion."
    ]
  },
  "wash-probes": {
    "title": "Custom Wash Probes for Automated Analyzers",
    "paragraphs": [
      "FOREACH custom wash probes integrate into automated analyzer wash stations for external probe washing, internal flushing, waste aspiration and residual-liquid removal. The configuration is developed around the wash-fluid and waste-fluid paths.",
      "Single-head, dual-head, multi-head, side-port and bent configurations are matched to the available space and cleaning sequence. Hole position, size and direction are coordinated with the target wash area, waste outlet and aspiration direction.",
      "Provide wash-station drawings, wash and waste-fluid compositions, flow, cycle timing and service-life requirements to review welding, polishing, coatings and surface treatments. Validate wash coverage, residual liquid and carryover control in the complete cleaning process."
    ]
  },
  "stirring-paddles": {
    "title": "Custom Mixing Paddles for Reaction Vessels",
    "paragraphs": [
      "FOREACH custom mixing paddles mix samples, reagents, diluents and reaction fluids in automated analyzers. Paddle geometry is developed for the reaction vessel, target liquid volume and drive arrangement as an instrument component.",
      "Options include flat, helical and 90-degree-angle paddle geometries. Define paddle dimensions, working position, concentricity and mounting ends around the vessel bottom, liquid level, speed range and available motion space.",
      "Materials, welding and coatings are reviewed for fluid compatibility, cleaning and strength. Provide vessel drawings, mixing time and bubble or splash requirements. Evaluate mixing performance and residue after cleaning using the actual fluid and vessel."
    ]
  },
  "abd-air-bubble-detector": {
    "title": "ABD Air Bubble Detection Module for Transparent Tubing",
    "paragraphs": [
      "The FOREACH ABD Air Bubble Detection Module uses non-contact infrared detection to identify bubbles, droplets and gas/liquid states in transparent tubing without contacting the fluid. Its signals can support reagent-line monitoring, liquid-supply checks and abnormal-state alarms.",
      "Configurations cover tubing ODs of 1.6–6.4 mm. The specified detectable bubble or liquid width is >0.8 mm, with a response time of 6 ms. Confirm detection with the actual tubing wall, flow conditions, fluid optical properties and mounting position.",
      "Transparent PU, PVC, PTFE, PFA and FEP tubing can be evaluated for the applicable configuration. Match TTL/UART connections, the Modbus RTU protocol and model-specific IO outputs to the equipment controls. Validate detection thresholds and alarm handling in the assembled system."
    ]
  },
  "pdm5-pressure-sensor": {
    "title": "PDM5 Pressure Sensing Module with I2C Communication",
    "paragraphs": [
      "The FOREACH PDM5 Pressure Sensing Module measures pressure in instrument and automated-equipment fluid paths. Its digital signal is available through I2C for downstream-of-pump feedback, blockage assessment and abnormal-state detection in the equipment control system.",
      "The standard pressure range is 10–1200 kPa, with an internal volume of ≤55 μL. The default sampling rate is 37.5 Hz, adjustable up to 100 Hz. Select the mounting position and sampling configuration around pressure fluctuations, required response and fluid-path volume.",
      "The PEEK flow path and 1/4-28 UNF female-thread ports must be matched to the fittings and sealing structure. Confirm fluid compatibility, temperature, supply and communication requirements, then validate pressure interpretation and alarm logic in the complete fluid path."
    ]
  }
};
