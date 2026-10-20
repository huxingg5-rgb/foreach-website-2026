import { coverImage, productPath, paragraph as p, table as t, list as l, figure as f, type QuickDisconnectTranslation } from "./shared";

export const en: QuickDisconnectTranslation = {
  metadata: {
    title: "What Is a Quick Disconnect Fitting? Male/Female Connections, Valves and Selection",
    seoTitle: "Quick Disconnect Fittings: Connections, Valves & Selection | FOREACH",
    seoDescription: "Learn how quick disconnect fittings work, compare valved and non-valved connections, and select FOREACH Q20, Q40 and Q60 fittings for tubing and panel mounting.",
    coverImage, coverAlt: "Photo of three FOREACH quick disconnect fittings in different sizes and configurations",
  },
  deck: "Select a quick disconnect for an instrument fluid path by checking the mating interface, shutoff requirements, tubing, seals and mounting space.",
  leadBlocks: [
    p("A quick disconnect fitting consists of mating male and female halves. Connecting them creates a continuous fluid path; releasing the latch allows rapid separation. Typical uses include replacing reservoirs, removing fluid modules and servicing instruments. These products are also called quick disconnect couplings.", "A quick disconnect fitting consists of mating male and female halves."),
    p("This article covers fittings that separate between the two coupling halves. Push-in tube fittings, sometimes also called quick-connect fittings, instead release the tube from a gripping mechanism. First establish whether maintenance requires separating the coupling or removing the tube."),
    p("FOREACH Q20, Q40 and Q60 fittings offer different tubing connections, threads, mounting options and valve configurations. Q20 and Q40 include PP and POM housings; the listed Q60 housing material is PP. The series identifies the mating family, while the complete model specifies the configuration of each half."),
  ],
  sections: [
    { title: "How does a quick disconnect work, and how do male and female halves connect?", blocks: [
      p("A quick disconnect joins the fluid path through male/female engagement, mechanical retention and a sealing ring. The male insert enters the female socket, whose latch holds it in the connected position. The seal on the male half contacts the female mating surface. The rear terminations connect to tubing or equipment ports. Here, male and female describe the coupling interface, not external and internal threads.", "A quick disconnect joins the fluid path through male/female engagement, mechanical retention and a sealing ring."),
      f("pair", "Original Q20 product views showing the male insert, female socket, seal, release latch and tubing terminations", "Figure 1 | Q2001-PNV-SPPE male and Q2001-SMV-SPPE panel-mount female. Original side views are used, with the male view reversed to explain engagement. The arrow shows assembly direction, not fluid direction; not to scale."),
      p("Retention, sealing and shutoff perform different functions. The latch prevents separation during normal use; the mating seal closes the fluid path to the outside; a valved half also closes its own passage when disconnected. Assess these three functions separately."),
      { type: "figure", src: "", width: 1200, height: 300, alt: "Quick disconnect sequence: align, latch and establish flow, then depressurize and disconnect", caption: "Check engagement and valve operation separately. After latching, verify sealing and flow in the actual fluid path.", flowNodes: [
        { label: "Align and connect", detail: "Use the same mating family; inspect seals and clean interfaces" },
        { label: "Latch and check flow", detail: "Confirm full engagement, sealing and flow at the point of use" },
        { label: "Depressurize and disconnect", detail: "Release the latch; shutoff depends on the valve configuration" },
      ] },
      p("The Q series uses a push-to-release latch. Sound or tactile feedback can assist assembly but does not replace retention and leak checks. Routine service separates the mating halves without pulling the tubing off the barb each time, reducing repeated stretching of the tube end."),
    ] },
    { title: "What is the difference between valved and non-valved quick disconnects?", blocks: [
      p("A valved half contains a shutoff mechanism that automatically closes its own passage when disconnected. Correct mating and full engagement open the valve to establish flow. A non-valved half has no automatic shutoff and remains open after separation. The external release latch and the internal valve are separate features.", "A valved half contains a shutoff mechanism that automatically closes its own passage when disconnected."),
      p("The two Q20 panel-mount female examples are Q2001-SMX-SPPE without a valve and Q2001-SMV-SPPE with a valve. They share the tubing size, mounting arrangement and material configuration. X and V in this position of the code mean non-valved and valved. Confirm the complete model rather than judging by the housing or release latch."),
      f("valves", "Q20 valved and non-valved comparison with panel-mount, straight-barbed, elbow-barbed and threaded female product views; blue lines show passages and red marks show shutoff", "Figure 2 | The lower female examples show Q20 panel-mount barbed, straight barbed, elbow barbed and threaded terminations. X means non-valved and V means valved. Lines illustrate passage states only; images are not to scale."),
      p("After disconnecting, does the equipment side, the removable module side, or both need to retain liquid? The following configurations describe a pair. A single model marked valved only identifies a valve in that half."),
      t(["Pair configuration", "Passage state after separation", "Tasks to evaluate"], [
        ["Neither half valved", "Both passages remain open; other system components must control the liquid", "Service connections that can be drained and left open"],
        ["One half valved", "The valved side closes; the other side remains open", "Connections needing shutoff only on the equipment or reservoir side"],
        ["Both halves valved", "Each half closes its own passage", "Connections where both the module and equipment must limit liquid loss"],
      ]),
      p("Double shutoff does not guarantee zero spillage. Residual liquid in the mating cavity may be released during separation, and reconnection may introduce air. Fluid paths sensitive to sample loss, cross-contamination or bubbles need separate checks for disconnect spillage, air inclusion and recovery time after reconnection."),
      p("Dry-break and non-spill designs also depend on valve-face geometry, cavity volume and the sequence of valve and seal movement. Two valves alone do not establish a non-spill rating. A valved coupling is not automatically suitable for connection or disconnection under pressure; follow the model and system operating requirements."),
    ] },
    { title: "Are FOREACH quick disconnect fittings compatible with similar international-brand products?", blocks: [
      p("FOREACH quick disconnect fittings support compatible mating with similar products in corresponding series from major international brands. Confirm compatibility for the specific models.", "FOREACH quick disconnect fittings support compatible mating with similar products in corresponding series from major international brands."),
      p("Interchangeability depends on the male/female mating interface. Matching tubing sizes, similar appearance or the ability to insert one half cannot alone prove reliable retention, sealing and valve opening. Confirm the mating family and interface dimensions, then validate the actual connection."),
      p("Each half has two different interfaces: a mating end for the other coupling half and a termination for tubing or a threaded equipment port. The mating end depends on the series, male/female geometry and valve combination; the termination depends on tubing inside diameter or thread specification. Accepting the same tube size does not prove that two halves can mate."),
      t(["Interface", "What to record", "Common mistake"], [
        ["Male/female mating end", "Series, profile, latch, seal location and valve combination", "Assuming similar appearance or insertion proves reliable interchange"],
        ["Hose-barb termination", "Tube inside/outside diameter, material, hardness and engagement length", "Confusing tube ID with the minimum fitting bore or tube OD"],
        ["Threaded termination", "Internal/external thread, standard, pitch, port depth and sealing method", "Recording only 1/8 or 1/4 without NPT, UNF or other thread details"],
        ["Panel mounting", "Panel thickness, cutout, fastening and operating space", "Treating the mounting thread as a fluid connection thread"],
      ]),
      p("Select Q20, Q40 and Q60 halves within their corresponding mating families. Cross-series or cross-brand replacement still requires checks of mating dimensions, seal compression and valve travel, followed by retention, leakage and flow validation. Appearance or a series cross-reference alone is insufficient to confirm direct replacement."),
    ] },
    { title: "How do you size a quick disconnect, and how does tubing ID differ from bore size?", blocks: [
      p("Choose a barb by tubing inside diameter and a threaded termination by thread standard and size. Then confirm the mating family and pressure drop of the complete connection at the target flow. Tubing ID describes the tube, not the fitting's minimum internal bore or the tube outside diameter."),
      p("The examples below distinguish series, tubing and mounting configurations. Each row is one complete model; its materials, valve or mounting option do not describe every product in the series."),
      t(["Complete model", "Tubing ID", "Mating end and mounting", "Valve and materials"], [
        ["Q2001-PNV-SPPE", "1.6 mm", "Q20 male, non-panel, straight", "Valved; PP housing, EPDM seal"],
        ["Q2001-SMV-SPPE", "1.6 mm", "Q20 female, panel-mount, straight", "Valved; PP housing, EPDM seal"],
        ["Q4004-PNV-SPPE", "6.4 mm", "Q40 male, non-panel, straight", "Valved; PP housing, EPDM seal"],
        ["Q6006-SNV-SPPE", "9.5 mm", "Q60 female, non-panel, straight", "Valved; PP housing, EPDM seal"],
      ]),
      p("In Q2001-PNV-SPPE, Q20 identifies the series and 01 corresponds to 1.6 mm tubing for this model. P means male, N means non-panel, and V means valved; the trailing S, PP and E identify straight geometry, PP housing and EPDM seal. In the mating Q2001-SMV-SPPE, S means female and M means panel-mount. A letter's meaning depends on its position in the complete code."),
      p("Tubing ID is not the smallest passage in the complete coupling. Resistance also depends on the internal passages, valve structure, combination of halves and fluid viscosity. Enlarging the tubing termination may not remove a restriction at a valve or another local feature."),
    ] },
    { title: "How do you install a panel-mount quick disconnect and choose the cutout and panel thickness?", blocks: [
      p("A panel-mount fitting clamps the panel between the body shoulder and nut. Maximum panel thickness for Q20, Q40 and Q60 female halves is 8.5 mm, 11.5 mm and 7.5 mm respectively. Q20 and Q40 male halves allow 3.3 mm and 5.5 mm respectively. Do not apply a female limit to a male half."),
      f("panel", "Original Q20 female product view and mounting schematic: panel between shoulder and nut, maximum thickness 8.5 mm, with connection and tubing clearance on each side", "Figure 3 | Q2001-SMV-SPPE illustrates panel mounting with t ≤ 8.5 mm. The lower assembly schematic is not to scale. Cutout and thickness limits for all three series are listed below."),
      t(["Series", "Cutout dimensions (mm)", "Female max. panel thickness (mm)", "Male max. panel thickness (mm)"], [
        ["Q20", "D-shaped: Ø13 (0 / −0.3); flat to opposite edge 12.1 (0 / −0.1)", "8.5", "3.3"],
        ["Q40", "D-shaped: Ø18 (0 / −0.5); flat to opposite edge 17 (0 / −0.3)", "11.5", "5.5"],
        ["Q60", "Round: Ø31 (0 / −0.5)", "7.5", "Not listed in the catalog"],
      ]),
      p("These values come from the A02 catalog assembly notes. Parentheses give upper/lower deviations: Ø13 (0 / −0.3), for example, means 12.7–13.0 mm. Q20 and Q40 must also meet the flat dimension. Panel fastening threads are Q20: 1/2″-24UNS; Q40: 11/16″-24UNS; Q60: M30×3.5."),
      p("Panel mounting and valving are independent options. Mounting describes attachment to the panel; valving describes automatic shutoff after separation. After choosing the series, select male/female, panel/non-panel and valved/non-valved configurations separately."),
      p("Panel thickness is the material clamped between shoulder and nut, not thread length or mating engagement depth. Leave space outside the panel for insertion, removal and latch operation, and inside for nut tightening, tubing attachment and tube bends."),
    ] },
    { title: "How do fluid compatibility, pressure and flow affect quick disconnect selection?", blocks: [
      p("First select wetted materials compatible with both the process fluid and cleaning agents. Check operating pressure at temperature, start/stop peaks and vacuum requirements, then evaluate pressure drop at the target flow. Material, pressure and flow must be assessed together; tube size or a single maximum rating is insufficient."),
      t(["Condition", "Selection check", "Effect on the instrument"], [
        ["Fluid and cleaning agents", "Identity, concentration, temperature and contact time; check housing, seals and other wetted parts separately", "Housing resistance does not prove seal or valve-part resistance"],
        ["Pressure and temperature", "Normal duty, transients, vacuum and service residual pressure; check ratings for the complete pair", "Separate maximum ratings do not define combined operating conditions"],
        ["Flow and pressure drop", "Measure differential pressure and point-of-use flow at the target duty", "Suction resistance changes pump inlet conditions; discharge resistance consumes pressure margin"],
        ["Service and contamination", "Disconnect frequency, residual liquid, air entry, cleaning and dust protection", "Affects maintenance time, priming and cross-contamination control"],
        ["Panel and tubing layout", "Cutout, thickness, latch clearance, bend radius and strain relief", "Affects full engagement and long-term sealing"],
      ]),
      p("Material selection must cover both operation and cleaning. For PP housings with EPDM seals, assess both materials rather than treating 'PP fitting' as a description of every wetted part. For another seal material, choose a documented complete model; a series-level option is not the default configuration of every model."),
    ] },
    { title: "How can you reduce liquid loss when disconnecting a reservoir?", blocks: [
      p("Determine which side must retain liquid. Consider one valved half when only the equipment side needs shutoff, or two valved halves when both equipment and reservoir need it. Valves stop continued discharge from their respective lines, but liquid can remain in the mating cavity. Measure disconnect spillage rather than treating double shutoff as a zero-spill guarantee."),
      p("Suppose an instrument uses 1.6 mm ID tubing between a removable reservoir module and an equipment panel, with shutoff required on both sides. If the fluid is compatible with PP, EPDM and the other wetted parts, Q2001-PNV-SPPE and Q2001-SMV-SPPE are candidate mating halves: the non-panel male is on the removable module tubing, and the panel-mount female is fixed to the instrument."),
      l([
        "Confirm both halves: Q20 male and female, both valved. Record each complete model and product code in the bill of materials.",
        "Confirm the tubing: use 1.6 mm ID on both sides, record OD, wall thickness, hardness and material, and validate the barb connection.",
        "Confirm panel assembly: use the Q20 female mounting drawing to check cutout, thickness and nut fastening, with release, withdrawal and rear tubing clearance.",
        "Check operation: test leakage at the target flow, temperature and pressure. On a pump inlet, also check air ingress under vacuum and point-of-use flow.",
        "Check service: stop and depressurize before separating; observe shutoff and residual liquid on both sides. After reconnecting, measure air inclusion and priming recovery time.",
        "Document the approved fitting/tube combination, drawing revision, assembly method and acceptance criteria for repeat purchasing and maintenance.",
      ], true),
      p("This example derives a candidate configuration from the application requirements. Fluid compatibility, pressure drop and disconnect life still require validation under the instrument's conditions. If only the equipment side needs shutoff, reassess a single-valved pair; very low spillage requirements require appropriate low-spill designs and test data."),
    ] },
    { title: "What should you check if a quick disconnect leaks, will not connect or restricts flow?", blocks: [
      p("Stop the equipment, isolate the necessary fluid paths and depressurize before troubleshooting. Leakage at the coupling calls for seal and engagement checks; failure to connect calls for mismatch, debris and residual-pressure checks; reduced flow calls for valve-opening, blockage and sharp-bend checks. If liquid continues to flow after separation, first establish whether that half is valved."),
      { type: "subheading", title: "Review assembly and disconnection first" },
      l([
        "Check both model numbers, latch, seals, mating surfaces and tubing before assembly. Resolve scratches, cracks, missing parts or contamination.",
        "Complete tubing and panel installation first. Push the tube axially onto the barb to the required position and support it so its weight does not continually pull the fitting sideways.",
        "Align and fully connect the halves as specified, then confirm retention. Stop if force is abnormal and check mismatch, debris, a pressure-loaded valve or seal damage.",
        "Check leakage and flow under the specified conditions. Before service, stop, isolate and release residual pressure, then operate the latch and separate.",
        "Protect exposed interfaces from particles. Inspect seals and tube ends before reconnection and recheck operation after service.",
      ], true),
      t(["Symptom", "Check first", "Verification after correction"], [
        ["Will not connect or latch", "Mating family, male/female pair, latch, debris and residual pressure", "Confirm full engagement; do not force a mismatched pair"],
        ["Leak at the mating interface", "Seal surface, mating face and engagement depth", "Replace damaged parts and retest at operating pressure and temperature"],
        ["Continued discharge after separation", "Whether the leaking half is valved; valve-seat debris or damage", "Distinguish brief residual spillage from failure to shut off; inspect both halves"],
        ["More bubbles after reconnection", "Air in the mating cavity, upstream supply and termination sealing under vacuum", "Check sections of the fluid path and record priming recovery"],
        ["Reduced flow", "Valve opening, internal passages, sharp tube bends and contamination", "Compare actual flow and pressure drop before and after fitting installation"],
      ]),
    ] },
  ],
  faqTitle: "Quick disconnect fitting FAQs",
  faqItems: [
    { question: "How do valved and non-valved quick disconnects differ?", answer: "After separation, a valved half closes its own passage automatically, while a non-valved half remains open. If both sides need shutoff, choose a valve in both the male and female halves. A valve does not guarantee zero spillage." },
    { question: "How is a quick disconnect different from a push-in tube fitting?", answer: "A quick disconnect separates between male and female halves. A push-in fitting releases the tube from the fitting. Q20, Q40 and Q60 use mating halves, so routine disconnection does not require pulling tubing off the rear termination." },
    { question: "Can quick disconnects from different brands mate?", answer: "Appearance or tube size alone is insufficient. Check mating dimensions, retention and seal location; for valved versions, confirm full valve opening after connection. A series cross-reference does not replace validation of the actual pair." },
  ],
  cta: {
    title: "Specify a complete quick disconnect pair for your fluid path",
    description: "Provide both interfaces, shutoff requirements, fluid, pressure, temperature and panel constraints to review mating models, seal materials and sample validation.",
    contactLabel: "Discuss fitting selection", productsLabel: "View quick disconnect models", productsHref: `/en${productPath}`,
  },
  navigationLabels: ["Operation and mating", "Valved vs. non-valved", "International-brand compatibility", "Tubing ID and bore size", "Panel mounting and thickness", "Materials and operating conditions", "Reservoir replacement and spillage", "Leaks and connection faults"],
  about: ["Quick disconnect fittings", "Male/female mating", "Quick disconnect valve configurations"],
  productTitles: ["Q20 valved non-panel male fitting", "Q20 valved panel-mount female fitting", "Q40 valved straight male fitting", "Q60 valved straight female fitting"],
};
