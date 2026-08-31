import {
  createLocalizedLifeScienceArticle,
  createLocalizedMotorArticle,
} from "./diaphragm-pump-new-articles.shared";

export const brushedVsBrushlessDiaphragmPumpMotorLifeEnCopy =
  createLocalizedMotorArticle("en", {
    metadata: {
      title: "Why Do Brushed Diaphragm Pumps Last Around 3,000 Hours and Brushless Pumps Around 10,000 Hours?",
      seoTitle: "Brushed vs. Brushless Diaphragm Pump Life: 3,000 vs. 10,000 Hours | FOREACH",
      seoDescription: "Learn why brushed diaphragm pumps are commonly rated around 3,000 hours and brushless pumps around 10,000 hours, including commutation, brush wear, bearings and operating conditions.",
      coverAlt: "Engineering comparison of brushed and brushless DC motors used in miniature diaphragm pumps",
    },
    deck: "Brushed miniature diaphragm pumps commonly have a reference life of approximately 3,000 hours; brushless versions are often rated around 10,000 hours. The difference reflects commutation, dominant wear mechanisms and the actual duty profile rather than a simple motor-quality ranking.",
    lead: [
      "Miniature diaphragm pump specifications often distinguish a brushed motor life of around 3,000 hours from a brushless motor life of around 10,000 hours. Engineers naturally ask why changing the drive motor can produce such different reference lives in an otherwise similar pump.",
      "The answer is not that brushless is automatically better or brushed is inherently unreliable. The two drive architectures use different commutation methods, so different components reach their practical service-life limits first.",
      "Brushed motors depend on continuous contact between brushes and a commutator. Brushless motors replace that mechanical interface with electronic commutation, shifting attention toward bearing wear, temperature rise, drive electronics and the actual pump load.",
    ],
    sections: {
      referenceLife: {
        title: "1. What do 3,000 and 10,000 operating hours actually mean?",
        paragraphs: ["Neither value is a guaranteed failure time. Both are engineering reference lives established under specified operating conditions and intended to help compare applications and maintenance expectations.", "Actual life changes with hydraulic load, outlet pressure, start-stop frequency, ambient temperature, continuous operating time, fluid-path resistance, chemical compatibility and installation."],
        notice: { label: "Engineering interpretation:", text: "Compare reference hours together with the intended duty cycle and application environment; do not treat them as unconditional guarantees." },
      },
      commutation: {
        title: "2. The fundamental difference: mechanical versus electronic commutation",
        paragraph: "A brushed DC motor switches current through brushes sliding against a mechanical commutator. A brushless DC motor performs commutation through an electronic controller. This structural distinction determines which wear mechanism dominates long-term operation.",
        figure: { alt: "Technical cross-section comparing mechanical brush commutation with electronic brushless commutation", caption: "Brushes contact the commutator in a brushed motor; an electronic controller commutates a brushless motor without continuous brush-contact wear." },
      },
      brushedLife: {
        title: "3. Why is a brushed configuration commonly rated around 3,000 hours?",
        introduction: ["The brush and commutator form the critical contact pair inside a brushed motor. As long as the rotor turns, the brush presses against the commutator surface and carries switching current.", "The main service-life mechanisms are:"],
        factors: ["Continuous sliding contact progressively wears both brush and commutator surfaces.", "Small commutation arcs and localized heating can accelerate material loss.", "Brush length decreases with cumulative operating time, eventually degrading electrical contact.", "Once wear becomes significant, performance may decline and the brush or motor may require replacement."],
        conclusion: "Therefore, brush-commutator wear can reach its practical limit before other components, explaining the approximately 3,000-hour reference class often associated with brushed miniature diaphragm pumps.",
      },
      brushlessLife: {
        title: "4. Why is a brushless configuration commonly rated around 10,000 hours?",
        paragraphs: ["A brushless motor removes the brush and mechanical commutator and uses electronic switching instead, eliminating the most characteristic sliding-contact wear mechanism.", "Brushless does not mean unlimited life. Bearings, lubricant condition, controller reliability, winding temperature and hydraulic load still constrain operating life.", "Because no brush gradually wears against a commutator, brushless drives are often better suited to continuous or high-utilization applications and commonly reach a reference class around 10,000 hours."],
        figure: { alt: "Research-style comparison of brushed 3,000-hour and brushless 10,000-hour motor wear mechanisms", caption: "Brushed life is strongly influenced by brush and commutator wear; brushless life depends more on bearings, temperature, electronics and real load. The illustration explains mechanisms and is not a measured wear curve or lifetime guarantee." },
      },
      wholePump: {
        title: "5. Motor life is not the same as complete pump life",
        paragraphs: ["A miniature diaphragm pump also contains an eccentric drive, connecting mechanism, diaphragm, check valves, pump head and sealing components. Complete pump life depends on all of these elements, not on the motor alone.", "Even a brushless drive cannot compensate for incompatible fluid-contact materials, diaphragm swelling, valve degradation or continuous operation against excessive back pressure."],
        notice: { label: "Important distinction:", text: "Choosing brushless primarily removes brush-contact wear; it does not eliminate the life limits of bearings, diaphragms, valves, seals or electronics." },
      },
      operatingFactors: {
        title: "6. Which operating conditions change the actual service life?",
        items: ["High hydraulic load and outlet pressure increase motor and transmission stress.", "Frequent starts and stops change mechanical loading and thermal cycling.", "Elevated ambient temperature affects windings, bearings, lubricants and diaphragm materials.", "Restrictive tubing, fittings, valves or filters can shift the pump away from its intended operating point.", "Incompatible liquids may accelerate swelling, hardening, corrosion or loss of sealing performance."],
      },
      selection: {
        title: "7. When should you choose brushed or brushless?",
        paragraphs: ["Motor selection should begin with the total operating hours the instrument requires during its expected service life—not just the numbers 3,000 and 10,000.", "A brushed drive may be suitable for intermittent operation, limited daily running time, accessible maintenance and cost-sensitive projects.", "A brushless drive is generally preferable when utilization is high, continuous operation is required, pump replacement is difficult or maintenance downtime is expensive."],
        headers: ["Selection factor", "Brushed drive", "Brushless drive"],
        rows: [["Reference life", "Approximately 3,000 hours", "Approximately 10,000 hours"], ["Duty profile", "Intermittent operation and shorter daily runtime", "Continuous operation or frequent use"], ["Accumulated hours", "Lower lifetime operating-hour requirement", "Higher lifetime operating-hour requirement"], ["Maintenance and cost", "Cost-sensitive design with accessible servicing", "High replacement cost or longer maintenance interval"]],
        figure: { alt: "Engineering decision chart for selecting brushed or brushless diaphragm pumps by operating hours and maintenance cost", caption: "Calculate accumulated operating hours first, then evaluate utilization, maintenance cost, required flow, pressure and fluid compatibility." },
      },
      accumulatedHours: {
        title: "8. A practical first calculation: accumulated operating hours",
        introduction: "At the beginning of a project, estimate the required operating time with a simple duty-profile calculation:",
        formula: "Daily operating hours × operating days per year × target equipment lifetime in years = required accumulated operating hours",
        paragraphs: ["If the required accumulated time is modest, a brushed configuration may be technically and economically adequate. As operating time or maintenance cost increases, the value of a brushless drive becomes more evident.", "The useful question is not simply which number is larger, but which drive architecture fits the instrument's actual lifecycle and hydraulic operating conditions."],
        link: { prefix: "For a more detailed discussion of continuous duty and pump durability, read:", label: "How long can a miniature diaphragm pump run continuously?", suffix: "." },
      },
      conclusion: {
        title: "Conclusion: reference life becomes meaningful only in the real application",
        paragraphs: ["The common distinction between approximately 3,000 brushed hours and 10,000 brushless hours results from commutation architecture, the dominant wear mechanism and typical operating conditions.", "A sound selection combines cumulative operating hours, actual fluid-path loading, chemical compatibility and maintenance economics. Reference life is useful only when interpreted within that complete engineering context."],
      },
    },
    faqTitle: "FAQ: brushed versus brushless diaphragm pump service life",
    faqItems: [
      { question: "Will a brushed motor always fail after 3,000 hours?", answer: "No. Around 3,000 hours is a reference value under specified conditions. Actual life depends on load, pressure, switching frequency, temperature and the complete fluid path." },
      { question: "Must a brushless motor be replaced after 10,000 hours?", answer: "Not necessarily. Around 10,000 hours is not a fixed replacement deadline; bearings, temperature rise, controller condition and application loading determine the practical limit." },
      { question: "Does a brushless motor have no wear?", answer: "No. It avoids brush-to-commutator contact wear, but bearings, lubricant, controller electronics and other moving pump components still have finite service lives." },
      { question: "Are brushed pumps unsuitable for long-term equipment use?", answer: "Not automatically. When daily runtime and accumulated lifetime hours are limited, a brushed pump can remain a practical and economical choice." },
      { question: "What else matters when selecting a miniature diaphragm pump?", answer: "Evaluate effective flow, operating pressure, self-priming, fluid compatibility, installation space, electrical supply, duty profile and maintenance accessibility." },
    ],
    cta: { title: "Need help choosing a brushed or brushless diaphragm pump?", description: "Share the daily operating time, annual operating days, target equipment lifetime, fluid, back pressure and maintenance requirements so an engineer can evaluate the real duty profile.", contactLabel: "Contact an engineer", productsLabel: "Explore diaphragm pumps" },
  });

export const lifeScienceInstrumentDpl60SelectionEnCopy =
  createLocalizedLifeScienceArticle("en", {
    metadata: {
      title: "How to Select a Miniature Diaphragm Pump for Life-Science Instruments: DPL60 Washing, Drainage and Waste-Fluid Guide",
      seoTitle: "DPL60 Diaphragm Pump Selection for Life-Science Instrument Fluid Paths | FOREACH",
      seoDescription: "Evaluate DPL60 miniature liquid diaphragm pumps for life-science instrument washing, flushing, drainage and waste lines using actual flow, back pressure, self-priming, materials and service-life tests.",
      coverAlt: "FOREACH DPL60 miniature liquid diaphragm pump for life-science instrument washing and waste-fluid systems",
    },
    deck: "Life-science instruments need more than accurate sample dispensing: they also wash reaction chambers, flush tubing, remove waste, prime lines and circulate liquid. Reliable diaphragm-pump selection depends on complete fluid-path resistance, suction conditions, wetted materials and long-term duty rather than catalog maximum flow alone.",
    lead: ["Nucleic-acid extraction systems, immunoassay analyzers, cell-analysis platforms and laboratory automation equipment often combine precise metering with rapid fluid transfer. While piston or syringe pumps meter volume, miniature liquid diaphragm pumps commonly handle washing, flushing, draining, priming and circulation.", "Using the FOREACH DPL60 as an example, this guide explains how to evaluate a 600 mL/min-class pump against the actual instrument task, operating point, self-priming conditions, gas-liquid behavior, material compatibility, service life and mechanical integration."],
    sections: {
      tasks: {
        title: "1. Define what the diaphragm pump must do inside the instrument",
        introduction: "Before choosing a pump, specify its responsibility in the instrument workflow. Typical duties include:",
        items: ["Draw cleaning solution or buffer from a reservoir and deliver it to downstream modules.", "Flush reaction chambers, flow cells, probes, tubing or valve manifolds to reduce liquid-exchange time.", "Drain fluid into a waste container while limiting residual liquid and cross-contamination.", "Prime long lines and remove trapped air during startup, bottle replacement or maintenance.", "Circulate compatible buffer, cleaning fluid or temperature-control liquid within the validated operating range."],
        figure: { alt: "Engineering diagram of washing, flushing, circulation and waste-fluid paths in a life-science instrument", caption: "The pump, valves, filters, reaction chamber, tubing and reservoir elevation jointly determine the installed operating point of a life-science fluid system." },
        notice: { label: "Define the duty first:", text: "High-accuracy dispensing, extremely low pulsation or controlled gradients may require a different metering technology. For rapid washing, drainage, priming and circulation, a DPL60-class pump is a practical starting point." },
      },
      candidate: {
        title: "2. Why start with a 600 mL/min-class DPL60 diaphragm pump?",
        introduction: "When washing and drainage must finish within a limited cycle time, the DPL60 provides a useful starting point for comparing flow class, pressure capability, package size, electrical power, noise and service life. Its catalog values must still be interpreted within the complete fluid path.",
        figure: { alt: "FOREACH DPL60 brushless miniature liquid diaphragm pump", caption: "Actual FOREACH DPL60 miniature liquid diaphragm pump; the accompanying system diagrams use technical engineering illustrations." },
        headers: ["Selection item", "Representative DPL60 brushless specification", "Engineering interpretation"],
        rows: [["Pump type", "Liquid diaphragm pump", "Suitable for transfer, flushing, drainage, priming and circulation"], ["Rated voltage", "24 V DC ±10%; a 12 V DC ±10% version is also available", "Match the instrument power supply and control method"], ["Rated power", "≤8.4 W", "Check power capacity, wiring voltage drop and thermal dissipation"], ["Free-flow rate", "600 mL/min", "Low-resistance reference flow, not a guaranteed installed flow"], ["Rated pressure", "100 kPa", "Pressure capability limit; do not combine it with free flow as a single operating point"], ["Self-priming lift", "3 mH₂O", "Retest at the lowest liquid level, longest suction line and dry-start condition"], ["Tubing connection", "Compatible with 3.2 mm inside-diameter tubing", "Also verify tube length, bends and the minimum bore of fittings and valves"], ["Representative wetted materials", "PPS pump head; EPDM or PTFE diaphragm; EPDM or FFKM check valve", "Validate every wetted component for the actual fluid, temperature and exposure time"], ["Reference service life", "10,000 h for the brushless version", "Applies under specified voltage, fluid, load and duty-cycle conditions"]],
        conclusion: "These values define an initial selection window, not an equipment-level performance guarantee. Fluid properties, pressure, temperature, installation orientation, switching strategy and manufacturing variation can all alter actual results.",
      },
      installedFlow: {
        title: "3. Do not assume 600 mL/min is the installed flow rate",
        paragraphs: ["A 600 mL/min rating normally describes free flow under specified low-load conditions. In an instrument, suction tubing, valves, fittings, filters, flow cells, elevation changes and waste-side back pressure create system resistance; actual flow occurs where the pump curve intersects the system curve.", "Specify the required effective flow and measure or estimate inlet vacuum and outlet back pressure. If filters are present, test a new filter, a partially loaded filter and the resistance near its replacement point."],
        figure: { alt: "Comparison of a low-resistance pump test circuit with a fully installed life-science instrument fluid path", caption: "A long fluid path with elevation, valves, filters and a flow cell usually delivers less flow than a short low-resistance bench circuit." },
        link: { prefix: "Learn more:", label: "How to read a miniature diaphragm pump flow-pressure curve", suffix: "." },
      },
      selfPriming: {
        title: "4. Evaluate self-priming together with bottle position and dry-line startup",
        introduction: "Self-priming lift is not independent of the suction circuit. Reservoir elevation, tube inside diameter, length, bends, reduced-bore fittings, trapped air and pump position all affect dry-start and repriming time.",
        items: ["Measure the real elevation difference from the lowest permissible fluid level to the pump inlet.", "Test with the final tube diameter, length, bend radius and fitting combination.", "Check high points for trapped air and inspect suction lines for pinching or kinks.", "Cover the first dry startup, bottle replacement and repriming after maintenance.", "Record the time until stable liquid delivery rather than checking only whether priming eventually succeeds."],
      },
      waste: {
        title: "5. Waste drainage transitions from liquid to a gas-liquid mixture and then air",
        paragraphs: ["A waste line is not always completely full. Toward the end of drainage, bubbles may appear, followed by gas-liquid mixture and eventually mostly air. These states change flow, noise, pulsation, temperature rise and check-valve response.", "Validate with the actual waste fluid, foam content and drain sequence. If the main duty becomes sustained gas-liquid extraction rather than liquid transfer, evaluate a purpose-designed gas-liquid diaphragm pump instead of relying only on DPL60 liquid specifications."],
      },
      compatibility: {
        title: "6. Material compatibility requires more than one PTFE component",
        introduction: "Fluid contacts the pump head, diaphragm, check valves, tubing, fittings and seals. One PTFE part does not make the entire wetted path compatible. Published DPL60 performance uses purified water as a reference; buffers, detergents, disinfectants and surfactant-containing fluids require separate validation.",
        items: ["Exact fluid name, formulation or principal ingredients.", "Operating concentration and minimum/maximum temperature.", "Single exposure duration, daily cycle count and accumulated operating time.", "Different fluids used during cleaning, disinfection or idle soaking.", "Acceptable swelling, leaching, adsorption, permeation and particle-generation risks."],
        notice: { label: "Validation boundary:", text: "Compatibility charts are useful for screening only. Confirm the final choice by soaking, circulating and retesting with the actual fluid and temperature." },
      },
      serviceLife: {
        title: "7. Consider motor life, duty cycle and maintenance intervals",
        paragraphs: ["Pump life cannot be inferred solely from the instrument's calendar life. Accumulated operating hours, switching events, back pressure, current, temperature, fluid and dry-running time affect the motor, bearings, diaphragm and valves.", "The DPL60 brushed version commonly has a reference life of 3,000 h, while the brushless version commonly has 10,000 h under specified conditions. Continuous operation, frequent cycling and high back pressure can produce different life distributions even at the same accumulated hours."],
        link: { prefix: "Related engineering guide:", label: "How long can a miniature diaphragm pump run continuously?", suffix: "." },
      },
      pulsation: {
        title: "8. Account for pulsation, tubing compliance and valve response",
        paragraphs: ["Diaphragm pumps deliver periodic flow. Tubing elasticity, internal volume, check-valve dynamics and downstream chambers modify pressure ripple and instantaneous flow. Average flow may dominate washing time, while sensitive flow cells, sensors or spray patterns also require pulsation assessment.", "Choose a buffer volume, damper or alternative tubing only when downstream sensitivity and measured results justify it. Additional volume can increase fluid-exchange time and residual liquid."],
      },
      installation: {
        title: "9. Verify mounting and noise in the complete instrument structure",
        introduction: "The same pump can sound different when installed on sheet metal, a plastic bracket or a closed enclosure. Mounting stiffness, vibration isolation, tubing loads, enclosure resonance, entrained air and back pressure all change perceived noise and vibration transfer.",
        items: ["Test the final mounting orientation and attachment points without imposing side loads on pump ports.", "Check tubing bend radius, connection stress and high-point air accumulation.", "Record noise during dry priming, stable liquid transfer, gas-liquid flow and final drainage.", "Close the instrument enclosure and inspect interactions among pump, bracket, wiring harness and tubing."],
      },
      alternatives: {
        title: "10. When is the DPL60 no longer the best candidate?",
        introduction: "The DPL60 is not a universal answer for every life-science fluid path. Change the candidate pump when the controlling system constraint changes.",
        headers: ["Fluid-system requirement", "Candidate to evaluate", "Selection reasoning"],
        rows: [["Routine washing, flushing, drainage or circulation with fast liquid exchange", "DPL60", "Start from the 600 mL/min free-flow class and validate the actual operating point"], ["Lower flow with tighter size and electrical-power limits", "DPL30", "A lower flow class can reduce oversupply and package size"], ["High resistance from narrow tubing, needles, filters or pressurized chambers", "DPL30H", "Check remaining effective flow at the required operating pressure"], ["Sustained gas-liquid mixture, waste aspiration or higher flow demand", "DPGL800 or another gas-liquid pump", "Select according to actual gas fraction, evacuation state and task profile"]],
        linkPrefix: "Explore",
        linkSuffix: ".",
        productLabels: ["DPL60 liquid diaphragm pump", "DPL30 liquid diaphragm pump", "DPL30H high-pressure liquid diaphragm pump", "DPGL800 gas-liquid diaphragm pump"],
      },
      validation: {
        title: "11. Complete at least six prototype validation groups",
        items: ["Operating-point validation: use final tubing, valves, filters, chambers and elevation; record inlet pressure, outlet pressure, flow, voltage and current.", "Self-priming validation: cover the lowest reservoir level, longest suction line, first dry startup, bottle changes and post-maintenance repriming.", "Bubble and drainage validation: observe startup bubbles, gas-liquid flow, end-of-drain behavior, residual volume, noise and recovery time.", "Fluid compatibility validation: soak and circulate actual buffers, detergents and disinfectants, then repeat performance and visual checks.", "Duty-cycle and lifetime validation: reproduce actual start-stop timing, back pressure, temperature and daily runtime; define failure criteria before testing.", "Mechanical integration validation: inspect noise, temperature rise, resonance, tubing stress and assembly interference in the final mounting, enclosure and wiring configuration."],
        notice: { text: "Validation records should identify the fluid, pressure, reservoir level, tubing, supply voltage, temperature and operating program—not simply whether the pump rotates." },
      },
      conclusion: {
        title: "Conclusion: draw the complete fluid path before selecting the DPL60",
        paragraphs: ["Selecting a miniature diaphragm pump for a life-science instrument requires more than comparing catalog maximum flow. Define washing, drainage, waste, priming or circulation duties first, then validate fluid, tubing, valves, filters, elevation, back pressure, duty cycle and installation together.", "A DPL60-class 600 mL/min miniature liquid diaphragm pump is a useful starting point for washing and drainage. If prototype results identify low-flow packaging, high back pressure or sustained gas-liquid handling as the dominant constraint, switch to a more suitable pump architecture."],
        notice: { label: "Specification note:", text: "DPL60 figures reflect currently available product information. Actual installed flow, self-priming time, lifetime, chemical suitability and instrument performance must be validated under application-specific conditions." },
      },
    },
    faqTitle: "FAQ: selecting a DPL60 diaphragm pump for life-science instruments",
    faqItems: [
      { question: "Will an installed DPL60 always deliver its nominal 600 mL/min?", answer: "No. The rating represents low-resistance free flow; inlet vacuum, outlet back pressure, valves, filters, flow cells, tubing and elevation determine the actual installed operating point." },
      { question: "Is the DPL60 suitable for high-accuracy sample dispensing?", answer: "It is primarily suited to washing, flushing, drainage, priming and circulation. Evaluate a piston or syringe pump when precise metered volume is essential." },
      { question: "Can a 3 mH₂O self-priming rating be used as a guaranteed 3 m design lift?", answer: "No. Validate the real priming time at the lowest fluid level, with the final suction tubing, fittings and valves, during dry startup and bottle replacement." },
      { question: "Can the DPL60 transfer every buffer, detergent and disinfectant?", answer: "No. Validate all wetted pump components, tubing, fittings and seals against actual concentration, temperature, contact duration and cleaning or soaking procedures." },
      { question: "Can the DPL60 handle waste containing many bubbles?", answer: "Test the actual gas fraction and drain sequence. Short end-of-drain bubbles may be manageable, but continuous gas-liquid handling may require a dedicated gas-liquid pump." },
      { question: "How should brushed and brushless DPL60 versions be compared?", answer: "Compare their approximately 3,000 h and 10,000 h reference lives together with accumulated runtime, switching frequency, control method, noise, maintenance interval and project cost." },
      { question: "Is a downstream damper or buffer volume always necessary?", answer: "No. Measure downstream pulsation sensitivity, fluid-exchange time and acceptable residual volume before adding components that increase internal volume." },
      { question: "What mounting orientation should be used?", answer: "Follow the official installation drawing and validate the complete instrument, avoiding port side loads, trapped air, excessively tight bends and structural resonance." },
      { question: "Why can changing tubing or the enclosure change pump noise?", answer: "Mounting stiffness, bracket design, tubing restraint, enclosure resonance, gas content and back pressure change vibration transmission and perceived noise." },
      { question: "What information should be provided for engineering selection?", answer: "Provide the fluid, concentration, temperature, required effective flow, inlet vacuum, outlet back pressure, suction lift, tubing dimensions, valves, fittings, filters, duty cycle, noise target and available installation space." },
    ],
    cta: { title: "Need to validate a life-science instrument washing or waste-fluid path?", description: "Share the fluid, target flow, tubing dimensions, valves, filters, elevation difference, back pressure, duty cycle and installation space so an engineer can evaluate the DPL60 or a more suitable pump.", contactLabel: "Contact an engineer", productsLabel: "Explore diaphragm pumps" },
  });
