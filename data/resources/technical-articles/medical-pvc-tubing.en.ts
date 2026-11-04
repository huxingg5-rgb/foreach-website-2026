import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";
import { medicalPvcTubingDiameters, medicalPvcTubingImages, medicalPvcTubingSizeRows } from "./medical-pvc-tubing.shared";

/* =========================================================
   Medical PVC tubing — English
   Adapted for international readers (EU GMP / FED-STD-209E context
   instead of Chinese regulations); not a literal translation.
   Internal links use the Chinese-site paths; localizeTubingArticle
   adds the /en prefix. Non-product paths (/about/...) are written in full.
========================================================= */

const photos = {
  line: { ...medicalPvcTubingImages.line, alt: "Operator in a hooded cleanroom suit adjusting the control panel of a tubing extruder in FOREACH’s ISO 8 cleanroom" },
  gauge: { ...medicalPvcTubingImages.gauge, alt: "In-line non-contact diameter gauge on an extrusion line, with clear tubing running through the measuring window on guide rollers" },
  resin: { ...medicalPvcTubingImages.resin, alt: "Material dryers and vacuum hopper loaders inside the cleanroom" },
  die: { ...medicalPvcTubingImages.die, alt: "Close-up of the extrusion die and sizing entry, with the clear tube leaving the die and entering the water bath" },
  tank: { ...medicalPvcTubingImages.tank, alt: "Tubing cooling and sizing tank in the cleanroom, with ceiling air diffusers and lighting overhead" },
};

export const medicalPvcTubingMentionsEn = ["medical PVC tubing", "dimensional tolerances", "ISO 8 cleanroom", "ISO 13485"];

export const medicalPvcTubingCopyEn: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "Medical PVC Tubing: How to Evaluate Tolerances, Cleanroom Production and Certifications",
    seoTitle: "Medical PVC Tubing: Tolerances, ISO 8 Cleanroom & Certifications | FOREACH",
    seoDescription: "What separates medical PVC tubing from hardware-store vinyl tubing: material properties, ID/OD tolerances and in-line gauging, ISO 8 cleanroom extrusion, ISO 13485 and RoHS documentation.",
    coverImage: photos.line.src,
    coverAlt: photos.line.alt,
  },
  deck: "Medical PVC tubing and general-purpose vinyl tubing start from the same polymer. What separates them is the compound and plasticizer, dimensional consistency, the production environment and the documentation behind each lot. This guide covers four checks—material properties, dimensional precision, cleanroom production and certifications—and shows how FOREACH extrudes and inspects PVC tubing in an ISO 8 (Class 100,000) cleanroom.",
  leadBlocks: [
    { type: "paragraph", text: "Medical PVC tubing is flexible polyvinyl chloride tubing used in medical devices, IVD systems and analytical instruments—typically for wash, reagent, sample and waste lines, and for low-pressure gas lines. Chemically it belongs to the same family as the clear vinyl tubing sold in hardware stores and aquarium shops. The difference lies in how tightly the compound, the dimensions, the production environment and the documentation are controlled." },
    { type: "paragraph", text: "When you specify it, check four things in order: whether the material suits your fluid and temperature; whether the ID and OD tolerances keep fittings sealed and flow consistent from unit to unit; whether the production environment keeps particles and debris out of the bore; and whether the supplier can back each lot with a certified quality system, compliance reports and traceability records. The guide ends with a checklist you can attach to your RFQ." },
  ],
  sections: [
    { title: "Medical PVC tubing vs. general-purpose vinyl tubing", tocLabel: "Medical vs. general", blocks: [
      { type: "paragraph", text: "Both are plasticized PVC. The real question is not whether the tubing is PVC, but whether the formulation is locked, the process is controlled and a problem can be traced back to its source. The table summarizes the usual differences." },
      { type: "table", headers: ["Check", "General-purpose vinyl tubing", "Tubing for medical devices and instruments"], rows: [
        ["Raw material", "May contain regrind or recycled PVC; lot-to-lot composition is hard to trace", "Virgin compound with a locked formulation and recorded resin lots"],
        ["Plasticizer", "Often DEHP or other ortho-phthalates, rarely declared", "Declared plasticizer system; restricted-substance test reports available"],
        ["Dimensional control", "Spot checks; datasheets often list nominal sizes only", "OD gauged in line during extrusion; ID and wall checked per lot against stated tolerances"],
        ["Production environment", "Standard factory floor", "Cleanroom extrusion that keeps particles, fibers and oil out of the tubing"],
        ["Documentation", "Usually no lot records", "Made under a certified QMS with traceable material, process and inspection records"],
        ["Typical uses", "Garden, drainage, aquariums, general water transfer", "Fluid and gas lines in medical devices, IVD and analytical instruments, lab automation"],
      ] },
      { type: "paragraph", text: "“Medical grade” usually also implies biocompatibility data for the compound, such as USP Class VI or ISO 10993 testing. That data belongs to a specific formulation, not to PVC as a material. If the tubing contacts patients or drug solutions, or goes into a regulated device, request the data for the exact grade and complete the evaluation at device level." },
    ] },
    { title: "Material properties of PVC tubing", tocLabel: "Material properties", blocks: [
      { type: "paragraph", text: "PVC tubing is clear, flexible, has low gas permeability and costs little. You can see liquid and bubbles in the line, which makes it a good fit for aqueous fluids at room temperature and low pressure. Its limits are a modest temperature range, poor resistance to most organic solvents, and plasticizer that can migrate or leach." },
      { type: "table", headers: ["Property", "FOREACH PVC tubing (typical)", "What it means for design"], rows: [
        ["Hardness (Shore A)", "55A / 65A", "55A is softer and easier to push over barbs; 65A holds its shape and resists collapse under vacuum"],
        ["ID / OD", `${medicalPvcTubingDiameters.inner} mm / ${medicalPvcTubingDiameters.outer} mm`, "One ID comes in several wall thicknesses—specify ID × OD, not just “size”"],
        ["Service temperature", "-42 to 75 °C", "Typical value; confirm with your fluid, pressure and fittings"],
        ["Brittleness temperature", "-46 °C", "Leave margin in cold environments"],
        ["Tensile strength", "14.3 MPa", "Suited to low-pressure lines"],
        ["Density / water absorption", "1.18 g/cm³ / 0.12%", "—"],
      ] },
      { type: "paragraph", text: "PVC only becomes flexible with a plasticizer, and traditional compounds use ortho-phthalates such as DEHP. Commission Delegated Directive (EU) 2015/863—often called RoHS 3—added DEHP, BBP, DBP and DIBP to the RoHS restricted-substance list at 0.1% by weight in homogeneous materials. For medical devices (including IVD devices) and monitoring and control instruments, the restriction has applied since 22 July 2021. If your instrument ships to the EU, the tubing’s RoHS report should cover all four." },
      { type: "paragraph", text: "Plasticized PVC can also take up components of the fluid. Lipophilic drugs such as nitroglycerin and diazepam are known to absorb into PVC tubing, and proteins such as insulin adsorb onto tubing walls. For concentration-sensitive reagents, samples or standards, compare concentrations before and after the line using your actual fluid; for organic solvents, switch to fluoropolymer tubing such as PTFE or FEP." },
      { type: "notice", label: "FOREACH documentation", text: "RoHS test reports are available for FOREACH PVC tubing by part number. If you need DEHP, BBP, DBP and DIBP results confirmed separately, mention it in your inquiry." },
      { type: "links", items: [
        { label: "PVC tubing: hardness, routing and flexible-tube fittings", href: "/resources/technical-articles/what-is-pvc-tubing/" },
      ] },
    ] },
    { title: "Dimensional precision: why ID and OD tolerances matter", tocLabel: "Dimensional precision", blocks: [
      { type: "paragraph", text: "For flexible tubing, precision means consistent ID, OD, wall thickness, concentricity and ovality—plus cut length for cut-to-length tubing. Two coils with the same nominal size can behave differently in the same instrument if their actual dimensions drift." },
      { type: "list", items: [
        "Fitting seal and retention: barbed fittings seal through elastic expansion of the tube’s ID and wall; push-to-connect fittings that grip the OD need the OD within tolerance. Oversize tubing leaks or pulls off; undersize tubing is hard to assemble and damages the tube end.",
        "Flow consistency: in laminar flow, resistance scales with the inverse fourth power of the ID. A small ID deviation becomes a much larger resistance deviation, so flow, priming time and wash performance vary from unit to unit.",
        "Wall uniformity: tubing with uneven walls or ovality collapses locally under vacuum and kinks more easily at bends.",
      ] },
      { type: "formula", expression: "R = 128μL / (πd⁴); an ID deviation of ±5% changes resistance by about −18% to +23%", note: "R = hydraulic resistance, μ = dynamic viscosity, L = length, d = inner diameter (laminar flow, rigid round tube). For a 0.8 mm ID tube, ±0.05 mm shifts resistance by about −22% to +29%. The smaller the bore, the more a given absolute tolerance matters." },
      { type: "figure", ...photos.gauge, caption: "In-line diameter gauge on a FOREACH extrusion line: the tubing runs continuously through the measuring window and its OD is measured during production." },
      { type: "paragraph", text: "FOREACH’s tubing extrusion lines use an in-line, non-contact diameter gauge (Proton Products InteliSENS DGk series). It measures the OD on multiple axes at once with solid-state LED/CCD optics, calculates mean diameter and ovality, and can raise an alarm when the OD leaves the set tolerance band. Unlike stopping the line for spot checks, in-line gauging covers the full length of every coil." },
      { type: "paragraph", text: "An OD gauge cannot see the bore. ID and wall thickness are measured offline on cut sections; FOREACH’s quality lab uses an image measuring instrument and vision measuring systems for dimensional and feature inspection. Every size has defined ID/OD tolerances and a sampling plan, which we can supply with the specification." },
      { type: "links", items: [
        { label: "Check ID and pressure drop with the fluid resistance calculator", href: "/resources/calculators/fluid-resistance/" },
        { label: "Barbed fitting expansion ratio explained", href: "/resources/technical-articles/barbed-fitting-expansion-ratio/" },
      ] },
    ] },
    { title: "Cleanroom production: what ISO 8 (Class 100,000) really means", tocLabel: "Cleanroom production", blocks: [
      { type: "paragraph", text: "Many supplier datasheets still say “Class 100,000”. That designation comes from the US federal standard FED-STD-209E, which was cancelled in 2001. The current standard is ISO 14644-1, and the equivalent is ISO Class 8: no more than 3,520,000 particles ≥0.5 µm per cubic meter of air. Outdoor air in a typical city carries around 35 million, roughly ISO 9." },
      { type: "table", headers: ["ISO 14644-1 class", "Former FED-STD-209E class", "Max. particles ≥0.5 µm per m³"], rows: [
        ["ISO 5", "Class 100", "3,520"],
        ["ISO 6", "Class 1,000", "35,200"],
        ["ISO 7", "Class 10,000", "352,000"],
        ["ISO 8", "Class 100,000", "3,520,000"],
        ["ISO 9", "— (roughly ordinary room air)", "35,200,000"],
      ] },
      { type: "figure", ...photos.line, caption: "FOREACH’s cleanroom extrusion area: an operator in a hooded cleanroom suit and face mask adjusts process settings at the extruder control panel." },
      { type: "paragraph", text: "FOREACH runs its tubing extrusion lines inside an ISO 8 (Class 100,000) cleanroom. HEPA-filtered supply air, a pressure cascade, gowning and controlled material transfer keep particles, fibers, hair and oil away from the melt, the tube wall and the open tube ends. On clear tubing, that kind of contamination shows up as black specks or debris in the bore—or later as particle background in your assay." },
      { type: "paragraph", text: "Keep the scope in mind: a cleanroom controls particulate and microbial contamination during production. It does not make the tubing sterile, and it says nothing about biocompatibility. Lines that must be sterile need a validated sterilization step; biocompatibility depends on test data for the compound and the finished tubing." },
      { type: "paragraph", text: "For a sense of scale, ISO 8 matches the at-rest particle limit of EU GMP Annex 1 Grade D—the grade pharmaceutical plants use for their least critical steps, such as handling components after washing. An ISO 8 tubing cleanroom is therefore a controlled environment for keeping product clean, not an aseptic processing area." },
    ] },
    { title: "How FOREACH extrudes PVC tubing", tocLabel: "Extrusion process", blocks: [
      { type: "paragraph", text: "PVC tubing is made by melting compound pellets in an extruder, forming the melt into a tube at the die, then cooling, sizing, gauging and coiling it. On FOREACH’s lines, every step below takes place inside the cleanroom:" },
      { type: "list", ordered: true, items: [
        "Material handling: pellets are dried as the material requires and conveyed by a closed vacuum loader to the extruder hopper, avoiding dust from open-bag feeding.",
        "Extrusion: the screw melts and homogenizes the compound, and the melt is formed into a tube at the die. Temperatures and screw speed are set at the control panel, and key process data are recorded in the MES.",
        "Cooling and sizing: the tube enters a water-cooled sizing tank, where its final ID and OD are set.",
        "In-line gauging: the finished tube passes continuously through the diameter gauge, which measures OD and ovality in real time and alarms when they leave the set limits.",
        "Haul-off, coiling and inspection: the tube is coiled or cut to length, checked offline for ID, wall thickness and appearance, then packed.",
      ] },
      { type: "figure", ...photos.resin, caption: "Material dryers and vacuum loaders inside the cleanroom feed pellets to the extruder through closed lines." },
      { type: "figure", ...photos.die, caption: "Extrusion die and sizing entry: the tube leaves the die and goes straight into the cooling bath." },
      { type: "figure", ...photos.tank, caption: "Cooling and sizing tank in the cleanroom; the tube cools here before gauging and haul-off." },
    ] },
    { title: "Certifications and documentation: QMS, compliance reports and lot traceability", tocLabel: "Certifications", blocks: [
      { type: "paragraph", text: "When a supplier says its tubing is “certified”, ask what exactly was certified. A quality management system certificate shows that the company’s processes are controlled; a compliance report shows that restricted substances in the material are below legal limits; lot records let you trace a problem back to its cause. One does not replace the others." },
      { type: "table", headers: ["Layer", "What it proves", "Available from FOREACH"], rows: [
        ["Quality management system", "Design, purchasing, production, inspection and delivery are controlled", "ISO 9001 and ISO 13485 certification"],
        ["Material compliance", "Restricted substances are below regulatory limits", "RoHS and other compliance reports by part number"],
        ["Biocompatibility data", "Compound or finished tubing passed USP Class VI, ISO 10993 or similar tests", "Confirmed per project on request"],
        ["Lot traceability", "Resin lot, process parameters and inspection results can be retrieved", "Key material, process and inspection data recorded in PDM, ERP and MES"],
      ] },
      { type: "paragraph", text: "ISO 13485 is the quality management standard for the medical device industry. It certifies the supplier’s system—how design, purchasing, production and changes are managed—not an individual tube. It does not make the tubing a medical device, and it does not replace biocompatibility testing." },
      { type: "links", items: [
        { label: "FOREACH quality system", href: "/en/about/quality/" },
      ] },
    ] },
    { title: "7 questions to ask a medical PVC tubing supplier", tocLabel: "Supplier checklist", blocks: [
      { type: "paragraph", text: "Send these questions with your RFQ. The more specific the answers, the shorter your qualification." },
      { type: "list", ordered: true, items: [
        "Is the compound virgin material? Will you notify us before changing the formulation or the resin supplier?",
        "Which plasticizer do you use? Can you provide restricted-substance test reports, and does your RoHS report cover DEHP, BBP, DBP and DIBP?",
        "What are the ID, OD and wall-thickness tolerances? Is the OD gauged in line, and how are ID and wall sampled?",
        "Where is the tubing extruded, cut and packed? What cleanroom class is it, and is it monitored?",
        "Which quality-system certificates do you hold? Is USP Class VI or ISO 10993 data available for the compound or the finished tubing?",
        "Can each shipment be traced to the resin lot, production date and inspection records?",
        "Can you supply samples for testing with our actual fluids, temperatures and fittings?",
      ] },
      { type: "paragraph", text: "You can put all of these questions to FOREACH directly; our engineers will confirm which documents are available for each part number." },
    ] },
    { title: "FOREACH PVC tubing sizes and custom options", tocLabel: "FOREACH sizes", blocks: [
      { type: "paragraph", text: "FOREACH PVC tubing comes in 55A and 65A hardness. Buy it by the coil, have it cut to length to your drawing, or order it as a tubing assembly with fittings. The table summarizes the sizes currently available." },
      { type: "table", headers: ["Hardness", "Sizes", "ID range (mm)", "OD range (mm)"], rows: medicalPvcTubingSizeRows },
      { type: "paragraph", text: "When you place an order or build a BOM, keep the full part number, hardness, ID × OD and package unit. For cut lengths, assemblies or non-standard sizes, also send the fluid, temperature, pressure or vacuum, routing and fitting drawings so we can confirm feasibility, MOQ and lead time." },
      { type: "links", items: [
        { label: "View full PVC tubing specifications", href: "/products/tubing/pvc-tubing/" },
        { label: "Quick-connect fittings", href: "/products/fittings/quick-connect-fittings/" },
        { label: "Barbed fittings", href: "/products/fittings/barbed-fittings/" },
      ] },
    ] },
    { title: "Explore other instrument tubing materials", tocLabel: "Related tubing", blocks: [
      { type: "links", items: [
        { label: "PVC tubing: hardness, routing and flexible-tube fittings", href: "/resources/technical-articles/what-is-pvc-tubing/" },
        { label: "PTFE tubing: material, flow resistance and fitting selection", href: "/resources/technical-articles/what-is-ptfe-tubing/" },
        { label: "FEP tubing: transparent small-bore tubing and flanged connections", href: "/resources/technical-articles/what-is-fep-tubing/" },
        { label: "PFA tubing: reagent transfer and cleanliness control", href: "/resources/technical-articles/what-is-pfa-tubing/" },
      ] },
    ] },
  ],
  faqTitle: "Medical PVC tubing FAQ",
  faqItems: [
    { question: "Why does medical PVC tubing cost more than hardware-store vinyl tubing?", answer: "The difference comes from the whole production and quality system: virgin compound and a declared plasticizer system, the running cost of a cleanroom, in-line gauging plus offline inspection and the scrap they catch, and the lot records and compliance reports behind each shipment. Swapping the plasticizer alone usually adds relatively little. General-purpose tubing is fine for garden or drain lines; in instrument fluid paths, the rework and downtime caused by dimensional drift or debris usually cost far more than the price difference." },
    { question: "Is tubing made in an ISO 8 cleanroom sterile?", answer: "No. A cleanroom controls particulate and microbial contamination during production; the tubing is not sterilized before shipment. If the line must be sterile, the device or assembly manufacturer sterilizes and validates it, using a method that suits the specific PVC compound." },
    { question: "Does PVC tubing absorb drugs or reagents?", answer: "Some substances, yes. Lipophilic drugs such as nitroglycerin and diazepam are absorbed into plasticized PVC, and proteins such as insulin adsorb onto the inner wall of many tubing materials. For concentration-sensitive reagents, samples or standards, compare concentrations before and after the line with your actual fluid, and shorten the wetted length or switch to PTFE or FEP if needed." },
    { question: "What does RoHS mean for PVC tubing in instruments sold in the EU?", answer: "Directive (EU) 2015/863 (RoHS 3) restricts DEHP, BBP, DBP and DIBP to 0.1% each by weight in homogeneous materials, and the restriction has applied to medical devices (including IVD devices) and monitoring and control instruments since 22 July 2021. Confirm that the tubing’s RoHS report covers all four phthalates, and state any REACH or other requirements in your inquiry." },
    { question: "Can FOREACH cut PVC tubing to length or supply tubing assemblies?", answer: "Yes. Tubing is available by the coil, cut to length to your drawing, or as assemblies with barbed or quick-connect fittings. Send the length, ID/OD, hardness, end fittings and operating conditions, and our engineers will confirm feasibility, MOQ and lead time." },
  ],
  cta: {
    title: "Request PVC tubing samples and documentation",
    description: "Tell us the application, fluid, ID/OD, hardness, length and the documents you need—such as RoHS reports or lot records—and FOREACH engineers will help confirm the specification and arrange samples for testing.",
    contactLabel: "Contact an engineer",
    productsLabel: "View PVC tubing specifications",
    productsHref: "/products/tubing/pvc-tubing/",
  },
};
