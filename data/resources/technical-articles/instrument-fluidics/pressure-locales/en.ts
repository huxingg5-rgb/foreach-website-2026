import type { DiaphragmPumpEngineeringArticleCopy } from "../../diaphragm-pump-engineering-article.types";
import { coverImage, paragraph as p, list, table, formula, links, ratingRows, flowSlug, overviewSlug, materialsSlug } from "./shared";

// Terminology: CPC quick disconnects, coupling body/insert, shutoff valves and connection force.
// https://www.cpcworldwide.com/General-Purpose/Products/Valved/PMC12
// FOREACH ratings and examples remain specific to the confirmed Chinese article.
const deck = "A quick disconnect's pressure rating depends on its series, materials and service conditions. FOREACH Q20 and Q40 standard POM/NBR and PP/EPDM configurations have a working pressure of 8.3 bar (approximately 0.83 MPa); Q60 PP/EPDM is rated at 4.2 bar (approximately 0.42 MPa). Check pressure drop at the required flow as well as local pressure peaks, fluid compatibility and temperature. A shutoff valve does not establish suitability for connection or disconnection under pressure.";

export const copy = {
  metadata: {
    title: "Quick Disconnect Fitting Pressure Ratings: Temperature and Connection Under Pressure",
    seoTitle: "Quick Disconnect Fitting Pressure Ratings & Temperature | FOREACH",
    seoDescription: "Check Q20, Q40 and Q60 working pressure against pressure drop, backpressure and temperature. Covers residual pressure, shutoff valves and assembly validation.",
    coverImage,
    coverAlt: "Q20, Q40 and Q60 quick disconnect coupling halves shown separated on a white background",
  },
  deck,
  leadBlocks: [p(deck), p("This guide covers separable coupling bodies and inserts used in instrument supply, wash, waste and reservoir lines. The companion flow guide calculates the pressure differential needed to deliver a target flow. Here, the question is whether the complete connection can withstand the actual pressure and temperature, and how it should be serviced and validated."), links("en", [[flowSlug, "Quick disconnect flow rate: pressure drop curves and Kv/Cv calculations"]])],
  sections: [
    { title: "What are the working pressure ratings of Q20, Q40 and Q60 couplings?", tocLabel: "Working pressure", blocks: [
      p("The two standard material combinations for Q20 and Q40 are rated at 8.3 bar; Q60-PP is rated at 4.2 bar. Use the temperature and tubing ranges below for initial selection. The maximum pressure and maximum temperature are not automatically permissible at the same time."),
      table(["Series", "Housing / O-ring", "Working pressure", "Operating temperature range", "Tubing inside diameter"], ratingRows("Maximum 71 °C; confirm minimum for the specific model")),
      p("Equal pressure ratings do not make POM/NBR and PP/EPDM interchangeable. Compare fluid compatibility and cleaning temperature. After changing an O-ring material, recheck the complete body-and-insert pair; the new seal's temperature capability does not increase the rating of the whole coupling."),
      list("1 bar = 0.1 MPa ≈ 14.5 psi ≈ 1.02 kgf/cm².", "8.3 bar ≈ 0.83 MPa ≈ 8.5 kgf/cm²; 120 psi is the approximate catalogue equivalent.", "4.2 bar ≈ 0.42 MPa ≈ 4.3 kgf/cm²; 60 psi is the approximate catalogue equivalent."),
      p("Specify the pressure unit explicitly. The informal expression ‘kilos of pressure’ normally refers to kgf/cm², not a unit of mass."),
      p("Available Q60 documents disagree on the lower temperature limit, so only the consistent 71 °C upper limit is stated here. Obtain model-specific data for allowable pressure at the service temperature, vacuum service and other material combinations."),
    ] },
    { title: "Does a larger quick disconnect bore mean a higher pressure rating?", tocLabel: "Bore and pressure", blocks: [
      p("Bore size contributes to flow capacity. Pressure capability also depends on the housing, latch, seal geometry and materials. Q60 accommodates larger tubing but its standard PP configuration is rated at 4.2 bar, compared with 8.3 bar for the Q20/Q40 configurations above. Size alone is not a pressure-rating criterion."),
      formula("Pressure force: F = ΔP × Aeff", "ΔP is the pressure differential in Pa, Aeff is the effective pressurized area in m², and F is in N. Tubing ID must not be substituted for the effective pressure diameter."),
      p("A larger effective area produces greater force at the same pressure differential, increasing the load on retention and sealing features. This relationship neither establishes a coupling's rating nor proves the sole reason for Q60's lower rating; use the specification for the selected configuration."),
      list("Check flow: estimate pressure drop from the applicable curve or Kv/Cv value.", "Check pressure: assess the highest pressure at the connection. Q60's higher flow capacity does not justify operation above its 4.2 bar rating.", "Check parallel layouts: parallel branches can distribute flow and reduce pressure loss, but they do not raise an individual coupling's pressure rating."),
    ] },
    { title: "How do working pressure, pressure drop and downstream backpressure differ?", tocLabel: "Drop and backpressure", blocks: [
      p("Working pressure defines the pressure the connection is rated to withstand under specified conditions. Pressure drop is the pressure lost as fluid passes through it. A small pressure drop can still occur across a coupling that is overpressurized on both sides."),
      table(["Parameter", "What it tells you", "What it does not establish"], [
        ["Rated working pressure", "Allowable service pressure for the specified fluid, temperature and configuration", "Permissible pressure for connecting or disconnecting"],
        ["Pressure drop ΔP", "Differential pressure consumed at the required flow", "Inlet or outlet pressure relative to the surroundings"],
        ["Pressure-hold test pressure", "Sample performance at a defined duration, temperature, fluid and acceptance criterion", "An unverified continuous working pressure"],
        ["Burst pressure", "Failure pressure in a destructive test", "Normal operating pressure, allowable spikes or connection/disconnection pressure"],
        ["Maximum axis value", "The plotted range, such as a 4.83 bar vertical scale", "Rated pressure or rated flow"],
      ]),
      formula("Pupstream = Pdownstream + ΔPcoupling", "Steady-state estimate with negligible elevation and velocity differences across the coupling. Use the same pressure reference on both sides. The examples below use gauge pressure, relative to ambient atmosphere."),
      list("Q40 with 3/8″ tubing: at 12 L/min and specific gravity 1.0, Kv ≈ 1.22 gives ΔP ≈ 0.35 bar. A downstream pressure of 3.0 bar gives approximately 3.35 bar upstream; 8.0 bar downstream gives approximately 8.35 bar upstream, exceeding the 8.3 bar rating. Comparing only 0.35 bar of pressure drop with an 8.3 bar rating would be incorrect.", "Q60 with 1/2″ tubing: at 50 L/min, the plotted pressure drop is approximately 0.8 bar. With 3.6 bar downstream backpressure, upstream pressure is approximately 4.4 bar, above Q60-PP's 4.2 bar rating. A flow point appearing on a curve is not sufficient evidence of an allowable operating point."),
      p("These are calculated examples explaining the pressure relationship, not test results for a complete assembly."),
      p("With the outlet at atmospheric or positive gauge pressure, inlet gauge pressure is at least as high as the coupling pressure drop. Q60 curve segments above 4.2 bar pressure drop therefore cannot be used directly for those conditions. Suction service can involve negative gauge pressure and requires separate verification of vacuum sealing; it does not make out-of-rating curve regions acceptable."),
      links("en", [[flowSlug, "Q20, Q40 and Q60 flow curves and Kv/Cv calculation assumptions"]]),
    ] },
    { title: "Which system pressures should be checked when selecting a quick disconnect?", tocLabel: "Pressure checks", blocks: [
      p("Evaluate pressure at the installed coupling, not just the pump nameplate or one normal operating reading. A blocked outlet, rapid valve actuation or a trapped liquid volume after shutdown can create different conditions."),
      table(["Condition", "Data to obtain", "Selection implication"], [
        ["Normal delivery and washing", "Upstream and downstream pressure at target flow", "Check inlet pressure and pressure-drop budget; free-flow pump data are insufficient"],
        ["Starting, stopping and switching valves", "Maximum transient pressure near the coupling", "Use peak pressure; sensor response and sampling rate must resolve the transient"],
        ["Blocked outlet or all downstream valves closed", "Highest pressure possible with the pump, regulator and pressure-limiting devices", "Provide suitable pressure limiting or interlocks where needed and verify operation"],
        ["Maintenance shutdown", "Residual pressure on both sides and in isolated pipe sections", "Stopping the pump does not establish a depressurized connection"],
        ["Heating a trapped liquid volume", "Pressure after process or ambient temperature rises", "Account for thermal expansion and provide suitable relief or protection"],
        ["Pump suction line", "Minimum inlet pressure, bubbles and delivery stability", "Check the permitted vacuum range separately from positive-pressure rating"],
      ]),
      p("For fluctuating pressure, use a measured or validated worst case, not the average. Near the rating limit, include measurement uncertainty, control variation, temperature and seal condition after service. A single safety factor is not specified for every configuration."),
    ] },
    { title: "How does temperature affect a quick disconnect's pressure capability?", tocLabel: "Temperature effects", blocks: [
      p("Higher temperature changes polymer stiffness and long-term load capacity, and affects seal compression and recovery. As service approaches a material or product limit, the usual working-pressure value cannot simply be carried over. Verify pressure and temperature as a combined operating condition."),
      table(["Service condition", "Initial assessment", "Further checks"], [
        ["80 °C wash with PP/EPDM", "Exceeds the 71 °C limit of the standard PP configurations covered here", "Change the wash conditions or connection solution; reduced pressure alone does not approve overtemperature use"],
        ["80 °C wash with Q20/Q40 POM/NBR", "Below the listed 82 °C limit; this does not establish an 8.3 bar rating at 80 °C", "Allowable pressure at temperature, exposure time, chemical compatibility and thermal cycling"],
        ["Higher-temperature O-ring substitution", "An O-ring rating is not the complete coupling rating", "Housing, valves, mating pair and tubing connection limits"],
        ["Cold start or refrigerated service", "Low-temperature suitability is model-specific", "Seal recovery, latch operation and fluid conditions; do not borrow another series' lower limit for Q60"],
      ]),
      p("Leak-free operation with water does not establish equal sealing or strength with a reagent or cleaning agent. Record the actual conditions for the wetted components:"),
      list("Fluid identity and concentration.", "Maximum and minimum service temperatures.", "Contact duration and cleaning frequency."),
      p("A complete pressure–temperature derating curve for these configurations is not available in the source data. Do not invent a percentage derating rule or assume the two maximum ratings apply simultaneously."),
      links("en", [[materialsSlug, "Fitting materials and chemical compatibility"]]),
    ] },
    { title: "Can quick disconnects be connected or disconnected under pressure?", tocLabel: "Pressure and servicing", blocks: [
      p("Neither ‘valved’ nor ‘8.3 bar working pressure’ establishes permission to connect or disconnect under pressure. A shutoff valve closes the passage on its own half after separation. Connection and disconnection under pressure involve mating force, latch release, liquid release and differential pressure; each capability requires separate confirmation."),
      p("Residual pressure can oppose the valve or mating mechanism, preventing full engagement. Disconnection can release liquid before or during valve closure. Double shutoff isolates both sides, but does not guarantee zero spillage or automatically relieve trapped pressure."),
      p("Unless the specific Q20, Q40 or Q60 model has explicit approval and conditions for connection and disconnection under pressure, shut down, isolate and depressurize before maintenance:"),
      list("Stop the pump or pressure source and prevent unintended restart. Let hot fluid cool to a serviceable temperature.", "Isolate tanks, branches and sources that could continue supplying pressure or fluid. Identify trapped volumes on both sides, including sections between check valves and closed valves.", "Use the equipment's designated pressure-relief and drain paths, then verify pressure has been released at the connection. Do not loosen the quick disconnect to check for or relieve pressure.", "Support the tubing and collect retained liquid before releasing the latch and separating the halves as specified. Unexpected resistance calls for another pressure and latch check.", "Before reconnection, inspect O-rings, mating surfaces and the latch. Verify full engagement, then check for leakage, air ingress and stable delivery after restart."),
      p("Once valved halves have separated, pressure may remain trapped in each line. Check both sides again before reconnecting; a previous disconnection does not prove that either side is depressurized."),
      links("en", [[overviewSlug, "Coupling bodies, inserts and shutoff arrangements"]]),
    ] },
    { title: "What should be checked when installing a large-bore quick disconnect?", tocLabel: "Q60 installation", blocks: [
      p("Assess the entire connection: insert, body, O-rings, end connections, tubing and retention method. For example, Q60 PP/EPDM has a working pressure of 4.2 bar, but this does not establish the same rating for the attached hose. The lowest allowable pressure of any component under actual conditions limits the assembly."),
      list("Tubing size: Q60 accommodates 9.5–19.0 mm ID tubing. Tubing ID is neither the minimum internal bore nor the effective pressure diameter used to calculate latch loads.", "3/4″ (19.0 mm) configuration: the source data contain no flow curve for this configuration. Obtain the applicable data or test a sample; do not scale the 1/2″ curve by tubing diameter.", "Hose support: larger tubing and its liquid contents impose weight and bending loads. Support sustained side loads with brackets rather than hanging the line from the coupling latch.", "Panel-mount body: Q60 accepts a maximum panel thickness of 7.5 mm, a Ø31 mm hole and an M30×3.5 mounting thread. Allow space for release, withdrawal, nut tightening and hose bend radius.", "Pump suction service: check air ingress under vacuum and air purging after reconnection as well as pressure drop. Absence of outward liquid leakage does not prove an airtight suction connection."),
      p("Record the connection and available installation space together with the fluid, temperature, peak pressure and maintenance conditions. This shows whether the flow benefit of a larger bore is compatible with the system's pressure and service requirements."),
    ] },
    { title: "How should quick disconnect pressure performance and sealing be validated in equipment?", tocLabel: "Assembly validation", blocks: [
      p("Use the intended complete body-and-insert pair, seals, tubing and support arrangement. A short room-temperature water hold test only characterizes those conditions; it does not cover hot cleaning, pressure cycling or repeated servicing."),
      table(["Validation item", "Record", "Purpose"], [
        ["Configuration and service", "Full part numbers, materials, valve arrangement, tubing material and size, fluid and temperature", "Match the test assembly to the intended installation"],
        ["Steady pressure and pressure drop", "Pressure on both sides and delivered flow at the required operating point", "Check pressure capability separately from available differential pressure"],
        ["Starts, stops and valve switching", "Pressure waveform, peaks, sensor response and sample rate", "Detect transient overpressure hidden by averaged readings"],
        ["Pressure protection and fault conditions", "Protection trip conditions and maximum pressure after operation", "Verify blocked-outlet or closed-valve protection without bypassing it to create overpressure"],
        ["Temperature and actual fluid", "Leakage, deformation and latch condition after hot/cold and wash cycles", "Evaluate fluid, temperature and cycling effects on the complete connection"],
        ["Shutdown, depressurization and reconnection", "Residual pressure on each side, engagement, retained liquid and delivery after restart", "Validate the service procedure; working pressure is not authorization for a pressurized make/break test"],
        ["Suction-line operation", "Minimum inlet pressure, bubbles, low reservoir level and purging after reconnection", "Check air ingress and delivery stability"],
      ]),
      p("Define allowable test pressure, hold time, cycle count and leakage acceptance criteria before testing, using the model and equipment requirements. This guide specifies no universal overpressure multiplier, burst value or service life. One leak-free test does not establish long-term reliability."),
    ] },
    { title: "Further reading on quick disconnect selection", tocLabel: "Further reading", blocks: [links("en", [[flowSlug, "Flow–pressure drop curves and Kv/Cv calculations"], [overviewSlug, "Quick disconnect bodies, inserts and valve configurations"], [materialsSlug, "PP, PA, POM, PVDF and PEEK fitting materials"]], true)] },
  ],
  faqTitle: "Quick disconnect pressure rating FAQ", faqTocLabel: "FAQ",
  faqItems: [
    { question: "Can I select an 8.3 bar coupling for a system that normally runs at 8 bar?", answer: "Not from those two figures alone. First locate the 8 bar reading: if it is downstream, add coupling pressure drop; if it is steady upstream pressure, check startup and shutdown peaks, control variation and allowable pressure at the actual temperature. Select a configuration near its limit only after reviewing the complete duty conditions." },
    { question: "Does the coupling pressure rating also apply to the completed hose assembly?", answer: "Not automatically. Hose material, wall thickness, temperature and end retention can be the limiting factors. Use the lowest allowable pressure among both coupling halves, seals, hose and other connections, then validate sealing and mechanical retention of the complete assembly." },
    { question: "How should pressure data from two coupling suppliers be compared?", answer: "Establish whether each value is working pressure, a pressure-hold test value or burst pressure. Compare complete mating pairs, valve and seal materials, fluid, temperature, duration, cycles and failure criteria. Obtain separate permitted conditions for connection and disconnection under pressure if required. Values from different conditions cannot be ranked by magnitude alone; a replacement still needs equipment-level validation." },
  ],
  cta: { title: "Review a quick disconnect for your service conditions", description: "Document the complete connection and operating conditions described above. FOREACH engineers can help review Q20, Q40 and Q60 candidate configurations and the required validation.", contactLabel: "Discuss coupling selection", productsLabel: "Explore quick disconnect models", productsHref: "/en/products/fittings/quick-connect-fittings/" },
} satisfies DiaphragmPumpEngineeringArticleCopy;
