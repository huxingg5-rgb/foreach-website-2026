import type { ApplicationBlock, ApplicationDocument } from '@/data/applications/analytical-documents/types';
import type { EnglishApplicationKind } from '@/data/applications/application-english';

type TaskCopy = {
  description: string;
  conditions?: string;
  acceptance: string;
  outcome: string;
  fault: string;
  recovery: string;
  boundary?: string;
};

/** Reviewed task corrections only; unlisted tasks retain their existing English copy. */
const taskCopy: Partial<Record<EnglishApplicationKind, Readonly<Record<string, TaskCopy>>>> = {
  ivd: {
    'clinical-switching': {
      description: 'Route clinical chemistry samples, reagents and wash fluid to the correct cuvette. Validate shared-path flushing, first-dose delivery and recovery after switching.',
      conditions: 'Sample, reagent, wash and waste port states; receiving cuvette; permitted switching pressure; shared liquid inventory; flushing destination and first-dose arrival',
      acceptance: 'Test each source-to-cuvette route for unintended connections, leakage and backflow. After a source change, measure the liquid needed to clear the shared segment and confirm the first useful dose reaches the intended cuvette.',
      outcome: 'Use the next sample or reagent and the assay-relevant blank or high/low sequence to assess residue. Record flushing consumption separately from the volume accepted by the reaction cuvette.',
      fault: 'A valve may reach position while old sample, reagent or wash fluid remains downstream. Wrong port mapping, backflow or incomplete replacement can therefore change the next cuvette even when the command completes.',
      recovery: 'Suspend the affected route and identify its source, valve state and cuvette. Establish whether any liquid entered that cuvette, route recovery liquid to the specified waste path, and verify replacement and first-dose delivery before resuming.',
      boundary: 'Valve position establishes a connection state, not sample suitability or an accepted reaction dose. The assay determines how to handle a cuvette with uncertain composition or partial delivery.',
    },
    'immunoassay-switching': {
      description: 'Separate immunoassay reagent, substrate and wash paths. Check shared-path residue and assay background before resuming additions after source changes.',
      conditions: 'Actual reagent and substrate formulations; dedicated and shared ports; wash and waste isolation; permitted switching pressure; shared volume and reaction-vessel destination',
      acceptance: 'Challenge the intended reagent, substrate and wash connections with the actual source-change sequence. Check leakage and backflow, then verify target-liquid arrival and residual effects on the next addition.',
      outcome: 'Assess assay background after the least favorable source changes permitted by the design. Confirm substrate-path sharing with the actual formulation and method rather than relying on valve closure alone.',
      fault: 'A shared segment can carry a previous reagent or wash fluid into the next addition. Misrouting or backflow can also connect a wash destination to a reaction vessel and alter assay background.',
      recovery: 'Hold additions to the affected vessels, identify the last source and destination, and determine whether delivery was partial or complete. Restore the correct isolation state and validate shared-path replacement and background before admitting the next reagent.',
      boundary: 'Path isolation, reagent-volume verification and solid-phase washing are separate checks. A closed valve or correct addition volume does not establish acceptable assay background.',
    },
    'coagulation-switching': {
      description: 'Coordinate coagulation reagent switching with actual liquid arrival. Validate shared-path residue, first-dose volume and the method-specific reaction sequence.',
      conditions: 'Assay-specific reagent sources and order; shared and isolated paths; switching pressure; flushing volume; first-dose arrival and the subsequent reaction window',
      acceptance: 'Measure replacement volume and reagent-arrival delay for each intended path change. Check the first dose at the reaction cuvette for volume and residue before relating it to the method-defined initiation and reading sequence.',
      outcome: 'Repeat these checks after standby or a change to tubing, probes or switching speed. Evaluate the complete method result with the actual reagent order, mixing and temperature conditions.',
      fault: 'A delayed first dose or residual liquid can shift reagent contact or composition even when the valve changes state on time. Treat port-position faults and reaction-timing faults separately.',
      recovery: 'Hold the affected reaction sequence, establish what reached the cuvette and when, and handle that cuvette according to the method. Restore the source and shared path, then recheck arrival and first-dose volume before starting another reaction.',
      boundary: 'Valve response time is not reagent-contact time. Clotting, chromogenic and immunoturbidimetric methods require their own initiation and reading rules.',
    },
    'molecular-switching': {
      description: 'Keep molecular-diagnostic reagents, eluate and waste in their intended paths. Validate shared-segment renewal and contamination boundaries after interruptions.',
      conditions: 'Reagent, eluate, cleaning and waste connections; sample and receiver identity; pre-/post-amplification boundaries; shared volume; maintenance and power-off states',
      acceptance: 'Verify the intended connections during extraction, eluate reception, cleaning, maintenance and power-off states. Check leakage, backflow and shared-segment renewal without connecting waste or cleaning liquid to an eluate receiver.',
      outcome: 'Confirm eluate identity and received volume, then assess negative blanks and downstream usability under the actual method. Keep these results separate from valve-position and pressure records.',
      fault: 'Wrong connections, backflow or retained liquid can mix sample identities or introduce wash fluid and waste into an eluate path. A mechanically completed switch does not resolve the contamination status of affected material.',
      recovery: 'Isolate the affected routes and establish source, destination and volume already transferred. Review exposed samples and contamination boundaries before cleaning or replacing affected parts; verify renewal and method-required blanks before restarting.',
      boundary: 'Neither valve closure nor low internal volume proves isolation of nucleic-acid eluate or pre-amplification work. The complete path and handling procedure require validation.',
    },
    'clinical-cleaning': {
      description: 'Validate separate probe and cuvette washing in clinical chemistry analyzers: surface coverage, residual liquid, high/low carryover and peak waste removal.',
      conditions: 'Probe-interior, probe-exterior and cuvette surfaces; wash formulation and contact time; supply coverage; aspiration height; peak station inflow and waste-container state',
      acceptance: 'Check wash-fluid arrival and contact at the probe interior, exterior and cuvette bottom separately. Under the installed load, measure residual liquid and confirm that drainage handles peak station inflow without pooling.',
      outcome: 'Run the assay-defined high/low concentration sequence and blanks, then examine the first dose through the cleaned path. Distinguish insufficient surface cleaning from residual wash liquid diluting the next addition.',
      fault: 'Restricted wash delivery, misplaced aspiration, foam or a full waste vessel can leave different residues at the probe and cuvette. More supply volume alone may increase pooling without cleaning the missed surface.',
      recovery: 'Stop supply to a station that cannot drain and identify affected probes and cuvettes. Restore supply coverage and waste removal, complete the applicable wash sequence, and verify residual liquid and carryover before returning that station to sample handling.',
      boundary: 'Wash-pump flow is only one input to cleaning. Select supply and waste configurations for their actual inlet media, and validate cleanliness and the next reaction with the assay.',
    },
    'hematology-cleaning': {
      description: 'Restore blood-analysis channels after cells, proteins and deposits accumulate. Check wash contact, drainage, channel blanks and the first sample after restart.',
      conditions: 'Protein, cell and deposit locations; permitted wash or soak sequence; channel flow; foam and peak drainage; waste-container status; post-maintenance blank and first sample',
      acceptance: 'Verify wash contact and flow through each affected sampling, reaction or detection branch. Check residual liquid, peak drainage and channel blanks after consecutive whole-blood samples, shutdown and maintenance.',
      outcome: 'Compare channel flow and the first post-cleaning sample with the method requirements. Record deposit or blockage trends separately from dilution-ratio and counting results so a clean-looking wash station does not conceal a channel fault.',
      fault: 'Protein or cell deposits can restrict a branch while the pump still runs. Inadequate contact, foam, dry aspiration or a full waste vessel can leave residue and delay channel recovery.',
      recovery: 'Hold the affected channels and stop additions that exceed available drainage. Apply the permitted cleaning or maintenance procedure, then verify channel flow, blanks and the first sample before restoring automatic measurement.',
      boundary: 'Cleaning requirements follow the actual channel architecture. Recovery of a metering path does not establish the stability of a separate sheath-fluid branch.',
    },
    'coagulation-cleaning': {
      description: 'Clean reusable coagulation probes and paths without altering the next reaction. Verify residual wash fluid, first-dose volume and actual reagent-arrival timing.',
      conditions: 'Reusable wetted surfaces; reagent cross-effects; wash formulation and contact; supply and separate drainage; residual liquid; first-dose volume and arrival time',
      acceptance: 'For reusable probes or paths, verify internal flushing, external coverage and removal of wash fluid under the actual load. Measure the first subsequent dose at the cuvette and record its arrival time.',
      outcome: 'Assess whether retained wash fluid or reagent residue changes the next formulation or complete assay result. Keep this check specific to the reagent sequence and reusable parts fitted to the instrument.',
      fault: 'Incomplete coverage or drainage can leave wash fluid in the next dose. A path may regain flow while first-dose composition or arrival delay remains unsuitable for the reaction sequence.',
      recovery: 'Pause additions through the affected reusable path and review any cuvette already exposed. Restore cleaning and drainage, verify first-dose volume, arrival and the method result, then resume the reaction program.',
      boundary: 'This cleaning task applies to reusable wetted parts; it does not prescribe washing disposable reaction cells. Recovered pump flow alone does not establish readiness for the next assay.',
    },
    'immunoassay-sample': {
      description: 'Validate fixed-probe sample addition for immunoassays: actual cuvette volume, low-volume aspiration, probe washing and carryover between samples.',
      conditions: 'Sample identity and assay-permitted condition; direct contact or system-liquid drive; remaining source volume; probe immersion; working dose; receiving cuvette and probe-wash coverage',
      acceptance: 'Measure the sample received by the identified reaction cuvette, covering routine and limiting working volumes, low source volume and the first aspiration after idle. Keep actual reception separate from piston displacement.',
      outcome: 'After internal and external probe washing, assess sample-to-sample residue with the method-relevant high/low sequence or blanks. Confirm sample identity, received volume and contamination results separately.',
      fault: 'Air aspiration, probe-wall contact, obstruction or leakage can leave an incomplete sample dose. Droplets and shared-path residue can contaminate the next sample even when the current cuvette receives the intended volume.',
      recovery: 'Hold the affected sample and cuvette, establish what was aspirated and delivered, and check probe position, the liquid column and wash state. Resample or flag the affected reaction according to the method, then verify the next sample after recovery.',
      boundary: 'This page covers fixed-probe sample addition. Disposable-tip transfer uses a different consumable sequence, and sample-volume checks do not establish solid-phase washing or complete-assay performance.',
    },
    'hematology-sample': {
      description: 'Evaluate whole-blood sampling with actual mixing, source volume and probe conditions. Verify delivered sample, subsequent dilution and next-sample recovery.',
      conditions: 'Whole-blood identity and mixing state; container geometry and remaining volume; clot or particle risk; probe position; aspiration program; sample receiver and subsequent dilution',
      acceptance: 'Measure whole-blood delivery at the reaction receiver after the specified mixing procedure. Cover normal and low source volumes and repeated aspirations, recording probe position, air aspiration and obstruction separately.',
      outcome: 'Verify sample volume before assessing the subsequent dilution ratio and channel result. After washing, check next-sample blanks and recovery so changes in blood condition are not hidden by water-only repeatability tests.',
      fault: 'Settling, clots, wall contact or incomplete aspiration can change the amount or composition of blood delivered. A correct commanded stroke cannot establish that a representative aliquot entered the reaction path.',
      recovery: 'Hold the affected specimen and reaction position, review the last mixing and aspiration state, and establish delivered volume. Address the obstruction or supply fault and follow the method for resampling or rejecting the affected aliquot before checking the next sample.',
      boundary: 'Whole-blood delivery, dilution and detection-channel performance require separate evidence. Results from repeated water transfers do not establish whole-blood sampling performance.',
    },
    'coagulation-sample': {
      description: 'Deliver the assay-specified coagulation sample to its reaction cuvette. Check sample condition, tip residue and actual volume before preincubation or reagent addition.',
      conditions: 'Method-approved sample and preparation; clot risk; container and remaining volume; probe-tip position; sample/system-liquid interface; target cuvette and next reaction step',
      acceptance: 'Measure sample reception at the reaction cuvette with the method-required sample preparation and actual probe geometry. Check low remaining volume, hanging drops, wall contact and the first transfer after idle.',
      outcome: 'Assess both received volume and preserved sample composition before the method-required preincubation or next addition. Keep sampling acceptance separate from the later reagent-trigger and reading checks.',
      fault: 'An obstructed aspiration, retained droplet or unsuitable system-liquid interface can change sample volume or composition. The effect belongs to the identified cuvette and may remain after the pump completes its stroke.',
      recovery: 'Pause the affected reaction, identify the sample and receiving cuvette, and establish whether delivery was absent, partial or complete. Correct the sampling fault and handle the cuvette according to the method before repeating or continuing the sequence.',
      boundary: 'The coagulation method defines sample suitability and the disposition of an interrupted reaction. A metering specification does not replace sampling and complete-method validation.',
    },
    'immunoassay-reagent': {
      description: 'Dispense immunoassay beads, labels, buffers and substrates by their own liquid conditions. Check first-dose recovery, resuspension and actual reaction-vessel delivery.',
      conditions: 'Reagent formulation and source; bead suspension or soluble reagent; mixing and standby needs; syringe inventory; refill window; shared residue and receiving reaction vessel',
      acceptance: 'Using each actual reagent formulation, measure first, middle and final doses at the reaction vessel, including after standby and replenishment. For suspensions, verify the required mixing state alongside delivered volume.',
      outcome: 'Check that source changes and shared residue do not alter the next reagent or substrate addition. Relate the complete addition sequence to assay background and reaction results; a batch mean can hide a poor first or last dose.',
      fault: 'Settled particles, source depletion, air entry or retained droplets can change the dose or formulation. An apparently correct syringe inventory does not confirm that the intended reagent reached the designated vessel.',
      recovery: 'Hold affected additions, reconcile source identity, remaining inventory and vessel delivery, then restore the reagent-specific mixing and priming conditions. Verify the first recovered dose and handle already dosed vessels without repeating completed additions.',
      boundary: 'Suspension mixing, metered delivery and magnetic solid-phase washing are distinct operations. Each reagent and complete assay require their own validation.',
    },
    'immunoassay-bead-wash': {
      description: 'Coordinate magnetic-particle washing with wash supply and aspiration. Evaluate bead loss, residual liquid, waste capacity and complete-immunoassay background.',
      acceptance: 'With the actual magnetic capture position and reaction vessel, measure bead loss and residual liquid through the wash sequence. Check wash-head coverage, aspiration height and drainage at peak inflow.',
      outcome: 'Evaluate complete-assay background after washing and before accepting the configured sequence. Record bead retention and residual wash fluid separately; adequate delivered wash volume cannot establish either result.',
      fault: 'Incomplete magnetic capture, aspiration too close to retained beads or poor coverage can remove solid phase or leave unbound material. Waste pooling can also change the next wash or substrate addition.',
      recovery: 'Hold the affected reaction vessels and identify the last completed capture, wash and aspiration steps. Assess bead retention and remaining liquid before repeating any step; restore waste removal and validate the recovered sequence against assay background.',
      boundary: 'The pump supplies or removes liquid; the magnetic mechanism retains the solid phase. Repeating a wash cannot recover beads already lost to waste.',
    },
    'hematology-dilution': {
      description: 'Meter whole-blood aliquots, diluent and lysing reagent as separate additions. Verify received ratios and mixing while assessing sheath supply independently.',
      conditions: 'Whole-blood aliquot; diluent and method-required lysing reagent; each delivered volume; addition order; reaction vessel and mixing; separate sheath-flow requirements where applicable',
      acceptance: 'Measure the sample, diluent and reaction reagent received in the actual reaction path separately. Verify their ratio after the specified mixing sequence, including the first additions after standby or a bottle change.',
      outcome: 'Use actual whole-blood conditions to assess the resulting channel blank and method response. Where detection uses sheath flow, evaluate that branch independently for sustained flow, pressure and stability.',
      fault: 'A small sample-volume error, incomplete reagent delivery or retained liquid can alter the dilution ratio. Inadequate mixing may leave a nonuniform aliquot even when the combined volume is correct.',
      recovery: 'Identify the affected aliquot and which additions are complete. Restore each source path and verify first-dose delivery, then prepare a new dilution or handle the incomplete mixture according to the method; do not replay all additions into an uncertain vessel.',
      boundary: 'Metered dilution and sheath-fluid flow serve different functions. A correct dilution ratio does not establish the operating conditions of a sheath-flow detector.',
    },
    'hematology-channel': {
      description: 'Route diluted blood samples to the correct detection branch. Check sample renewal, channel blanks, bubbles and recovery before admitting the next sample.',
      acceptance: 'For each configured detection branch, verify the intended diluted-sample route and actual sample arrival. Check method-required flow, pressure and bubbles, then assess blanks and counting or detection results after switching.',
      outcome: 'Repeat renewal and blank checks after maintenance and compare the first sample with subsequent operation. Evaluate sheath supply only on branches whose detection architecture requires it.',
      fault: 'A blocked branch, retained previous sample or entering bubble can disturb detection even when the selected port is correct. A normal upstream supply condition may conceal incomplete renewal at the detector.',
      recovery: 'Hold the affected detection branch and retain the associated sample identity. Confirm its port state, clear or service the path as permitted, then verify sample renewal, channel conditions and blanks before reconnecting the next sample.',
      boundary: 'Valve port count does not establish independent detection-channel count or simultaneous operation. Each detector and any sheath-flow branch require their own validation.',
    },
    'coagulation-reagent': {
      description: 'Relate coagulation reagent delivery to actual contact, mixing and assay timing. Verify dose volume and arrival delay after tubing, probe or sequence changes.',
      acceptance: 'Record the pump command, probe-tip outflow and actual reagent arrival at the cuvette separately. Measure delivered volume and arrival-delay variation before relating them to the method-defined mixing, initiation and reading events.',
      outcome: 'After a change to tubing, probes or speed, recheck the complete reaction with its required addition order and temperature conditions. Evaluate first-dose recovery after standby as well as repeated operation.',
      fault: 'A delayed droplet, incomplete dose or insufficient mixing can shift the reaction conditions while the control trigger remains unchanged. Command timing therefore needs to be reconciled with actual liquid contact.',
      recovery: 'Hold the affected cuvette and review which reagents arrived, their volumes and their timing. Apply the assay procedure to the interrupted reaction, restore the delivery path, and verify a new complete sequence before resuming measurements.',
      boundary: 'The assay defines its initiation and reading events. Pump or valve response time is not a universal reaction-start time.',
    },
    'molecular-lysis': {
      description: 'Deliver lysis and binding reagents through fixed paths with clear source and well identity. Validate actual additions separately from extraction recovery and blanks.',
      conditions: 'Lysis, binding and particle-containing formulations; source valves; fixed-path materials; priming destination; working dose; target well; mixing and processing sequence',
      acceptance: 'Measure each lysis or binding reagent at the intended receiving well using its actual formulation and source path. Include first doses after standby or replenishment and verify the order of completed additions.',
      outcome: 'Assess subsequent nucleic-acid recovery and contamination blanks with the complete extraction method. Keep these results separate from volume checks and from the mixing or processing time required for lysis and binding.',
      fault: 'An empty source, air entry, shared reagent residue or wrong receiving well can alter extraction conditions. Replaying a completed pump command may duplicate a reagent addition without restoring an interrupted extraction.',
      recovery: 'Hold the affected wells and reconcile sample identity, reagent source and volume already received. Restore the source and priming path, then follow the extraction method for partially processed samples before resuming reagent delivery.',
      boundary: 'This task applies to fixed-path reagent supply. A completed delivery does not prove lysis or binding, and magnetic-rod or disposable-tip architectures require their own handling sequence.',
    },
    'molecular-wash': {
      description: 'Separate discarded wash liquid from retained nucleic-acid eluate in tip-based workflows. Validate solid-phase retention, recovered volume and downstream usability.',
      acceptance: 'During tip-based washing, check that the required solid phase remains while discarded liquid reaches waste. During post-elution transfer, measure eluate in the identified receiver and evaluate remaining wash liquid and target recovery.',
      outcome: 'Use negative blanks and the downstream method to assess contamination and inhibition separately from recovered volume. Confirm the correct sample and destination well before the next setup step.',
      fault: 'Incorrect aspiration height can discard solid phase or retain unwanted wash liquid. A wrong destination can lose eluate, while duplicate aspiration after interruption can further reduce recovery.',
      recovery: 'Hold the source and receiving wells and determine which wash, discard or eluate-transfer step completed. Establish remaining solid phase, liquid and transferred volume before deciding how the method permits continuation; verify tip state and sample identity before the next action.',
      boundary: 'Tip-based liquid transfer and magnetic-rod bead transfer use different movements. Neither pump completion nor correct eluate volume alone establishes extraction quality.',
    },
  },
  'analytical-instruments': {
    'sample-prep-dilution': {
      description: 'Prepare analytical dilutions from measured sample and diluent deliveries. Validate mixing, concentration and blanks before resampling the prepared aliquot.',
      acceptance: 'Measure each sample, stock, diluent or method-required additive at the receiving vessel. Verify the combined ratio and mixing before taking the next aliquot, including the smallest doses and source changes.',
      outcome: 'Check concentration or method response with the specified blanks, ratio checks or spike-recovery procedure. Investigate a correct volume with poor analyte recovery separately from a dosing error.',
      fault: 'A missing addition, shared-path residue or incomplete mixing can change the prepared concentration. Later dilution levels can inherit that error even when their own commanded volumes are correct.',
      recovery: 'Identify the affected preparation level and any aliquots already taken from it. Reconcile completed additions and mixing, restore the relevant source path, then remake or handle the affected preparation and downstream levels according to the method.',
      boundary: 'Accepted delivered volume is only part of dilution validation. The prepared composition, mixing and analyte recovery must meet the analytical method.',
    },
    'sample-prep-extraction': {
      description: 'Transfer extracts and target phases with disposable tips. Validate phase selection, analyte recovery and residue before sending the product to analysis.',
      acceptance: 'For each loading, washing, elution or phase-transfer step, confirm the retained liquid and its destination. Measure analyte recovery, unwanted-phase carryover, vessel residue and blanks using the actual solvent and tip geometry.',
      outcome: 'Compare transfer at the intended phase interface and sample volume with the complete extraction result. A full receiving vessel does not establish that the correct phase or target fraction was recovered.',
      fault: 'An incorrect aspiration interface, emulsion or retained droplet can transfer the wrong phase or lose product. Adsorption can reduce analyte recovery despite acceptable liquid volume.',
      recovery: 'Preserve the identities of source, waste and product vessels and determine which phase was already transferred. Re-establish separation and replace affected consumables as permitted by the method before resuming; do not repeat a discard step on material of uncertain identity.',
      boundary: 'This task covers tip-based liquid transfers. Pressurized extraction through a fixed bed or other loaded path requires separately suitable equipment and method validation.',
    },
    'water-quality-sampling': {
      description: 'Meter water samples at the analytical unit with the actual particle and matrix conditions. Verify received volume, blanks and first-sample recovery after renewal.',
      acceptance: 'Measure the water sample at the analytical unit receiver using the permitted pretreatment and actual particle, salt and matrix conditions. Check the first sample after source changes, washing and standby alongside routine volumes.',
      outcome: 'Assess blanks and method response after the sample arrives. Record the upstream renewal time separately so accurate internal metering is not mistaken for representative field sampling.',
      fault: 'Air entry, particles, leaks or retained previous sample can change the volume or composition delivered to the analytical unit. A renewed upstream source does not prove that the internal metering path contains the new sample.',
      recovery: 'Hold the affected analysis and confirm source identity, renewal state and any sample already delivered. Restore the effective liquid column and shared-path update, then verify the first receiver volume and method blank before restarting the reaction sequence.',
    },
    'water-quality-reagent': {
      description: 'Coordinate water-analysis reagent doses with mixing and the measurement window. Verify actual arrival and first-dose recovery after bottle changes or standby.',
      acceptance: 'Measure each reagent addition and its actual arrival at the water-analysis reaction vessel. Confirm the method-required addition order, mixing, temperature conditions and wait before opening the measurement window.',
      outcome: 'After bottle changes or standby, check the first dose and complete reaction blank. Assess the method response with the actual formulations rather than substituting commanded pump steps for received volume.',
      fault: 'Partial delivery, retained droplets or delayed mixing can alter the reaction while the programmed measurement window stays unchanged. Source recovery does not repair a vessel whose reagent sequence is already uncertain.',
      recovery: 'Identify the affected reaction vessel and completed additions, then handle its partial reaction according to the method. Restore the source and priming destination and verify first-dose delivery, arrival and a complete reaction blank before returning to analysis.',
      boundary: 'Internal reagent metering and reaction timing are separate from field-sample representativeness. Both must meet the water-analysis method.',
    },
    'spectroscopy-sampling': {
      description: 'Transfer discrete liquid samples for spectroscopy using actual acid, salt and particle conditions. Check delivered volume and sample-change blank recovery.',
      acceptance: 'Measure each discrete aliquot at its dilution vessel, holding path or defined introduction receiver. Check the actual acid or salt matrix, low source volume, particle conditions and first transfer after a source change.',
      outcome: 'Record sample consumption, blank recovery and renewal time through the complete path. If the receiver requires continuous introduction, evaluate its flow, pressure and fluctuation separately from the discrete transferred volume.',
      fault: 'Air aspiration, deposits, particles or retained previous sample can change transfer and blank recovery. A correct syringe stroke may still deliver an unsuitable composition or disturb the introduction interface.',
      recovery: 'Hold the affected sample and confirm its destination and remaining source volume. Restore the permitted path, renew shared liquid and verify the first transferred aliquot and blank before reconnecting to the analytical sequence.',
    },
  },
  'life-science': {
    'genomics-sample-prep': {
      description: 'Transfer nucleic-acid samples and extraction reagents with disposable tips. Verify well identity, actual delivery and tip changes before checking recovery and blanks.',
      conditions: 'Disposable-tip seal and liquid class; source and receiving wells; sample identity; reagent formulation; remaining source volume; aspiration depth; working volume and mixing step',
      acceptance: 'Measure delivery into the identified well after tip pickup using the actual sample or extraction reagent. Cover low source volume, the intended immersion depth and tip-change sequence, then verify the required mixing step.',
      outcome: 'Check product recovery, downstream results and sample-to-sample blanks separately from liquid volume. Keep the source well, receiving well and completed reagent additions associated with each sample.',
      fault: 'Tip leakage, incorrect immersion, retained droplets or a missed tip change can change delivery and contamination status. A completed motion does not establish that the intended sample or reagent reached the correct well.',
      recovery: 'Pause the affected wells and establish the volume already transferred and the tip state. Handle the interrupted sample and consumable according to the experiment, then verify source, destination and readiness before the next aspiration.',
    },
    'cell-culture-transfer': {
      description: 'Transfer cell suspensions through a defined wetted path. Compare received volume, viability, recovery and aggregation before and after the actual transfer.',
      acceptance: 'Compare received volume, viability, cell recovery and aggregation before and after passage through the complete tubing and vessel arrangement. Use the actual cell density, flow or pressure differential and residence time.',
      outcome: 'Assess retained cells and liquid in the source and path separately from changes in cell condition. Validate sealing and the required process contamination controls across all wetted connections.',
      fault: 'Settling, aggregates, air entry or a restrictive section can change the cells received or their condition. Repeatedly moving an interrupted suspension through the same path can change its exposure without correcting the original loss.',
      recovery: 'Hold the affected source and receiver, establish transferred volume and the current suspension condition, and inspect the path for obstruction or leakage. Continue or reprocess only as the culture procedure permits after checking cell condition and contamination boundaries.',
    },
    'protein-sample': {
      description: 'Transfer protein samples with recovery as well as volume in view. Check adsorption, aggregation, vessel residue and blanks through the complete wetted path.',
      acceptance: 'Measure received volume and compare protein recovery with reference handling at the actual formulation, concentration, temperature and contact time. Assess aggregation or method response and sample-to-sample carryover separately.',
      outcome: 'Include the source vessel, pump, tubing and receiver in the comparison. Record the first sample after a changeover or maintenance so surface retention is not hidden by steady repeated transfer.',
      fault: 'Adsorption, aggregation, hanging droplets or shared-path residue can reduce target recovery despite acceptable volume. Changing the pump command alone cannot distinguish these mechanisms.',
      recovery: 'Preserve sample identity and establish the volume and protein already recovered. Inspect the wetted path and residue, then apply the experimental procedure to the remaining sample; verify blanks and the first recovered transfer before restarting.',
    },
    'automation-washing': {
      description: 'Wash reusable paths for nucleic-acid, protein or cell workflows. Validate actual coverage and drainage, then use method-relevant blanks to confirm return to service.',
      acceptance: 'Confirm that wash fluid reaches the reusable surfaces affected by nucleic-acid contamination, protein adsorption or cell residue. Check contact, residual liquid and drainage with the actual station load and inlet phase.',
      outcome: 'Use the experiment-relevant blank or next sample to judge return to service. Record contamination results separately from delivered wash volume and workstation timing.',
      fault: 'Missed surfaces, unsuitable contact conditions or inadequate drainage can leave molecular or cellular residue. A visually clean probe or completed wash command does not establish readiness for the next experiment.',
      recovery: 'Hold the affected reusable path and samples, resolve coverage or waste-removal faults, and repeat the permitted cleaning procedure. Verify the relevant contamination blank or next-sample result before releasing the path for experimental work.',
    },
  },
  'lab-automation': {
    'sample-prep-washing': {
      description: 'Coordinate wash, waste and product recovery across preparation stations. Validate shared-resource demand, sample identity and restart from the last completed step.',
      acceptance: 'Test the intended concurrent station load on shared wash and drainage resources. At each station, verify solid-phase or product retention, residual liquid and the separate destinations for discarded wash fluid and collected eluate.',
      outcome: 'Check method-relevant recovery and contamination results before handing the sample to the next station. Keep resource availability, completed volume and sample status consistent at the handoff.',
      fault: 'A shared supply or waste bottleneck can leave one station incompletely washed while another finishes. Incorrect aspiration height or an uncertain destination can lose product despite an apparently completed platform schedule.',
      recovery: 'Hold the affected stations and retain their resource reservations and sample identities until states are reconciled. Establish which wash, aspiration or collection actions completed, restore supply and drainage, and resume only the step permitted by the sample state and method.',
    },
  },
  'environmental-monitoring': {
    'gas-pretreatment-condensate': {
      description: 'Drain condensate without disturbing the sample-gas path. Check accumulation, vacuum leakage, backflow and composition recovery under actual inlet conditions.',
      acceptance: 'Test condensate removal at the actual temperature, formulation, system vacuum and inlet gas content. Check peak accumulation, full-vessel or blockage handling, bypass leakage and backflow while the sample-gas path operates.',
      outcome: 'After drainage or maintenance, verify gas tightness and the effect on sample-gas flow, pressure and method-specified target composition. Evaluate the collection and drain branch separately from the gas-analysis interface.',
      fault: 'Blocked drainage or foam can accumulate condensate; a leaking drain can admit air under vacuum or disturb sample-gas flow. Restoring liquid discharge alone may leave the measured gas composition affected.',
      recovery: 'Place the affected sampling branch in its defined maintenance state and isolate the drain as required. Clear the fault and verify drainage, gas tightness and sample-gas renewal before accepting measurements from the restored path.',
    },
  },
  'synthetic-biology': {
    'micro-bioreactor-waste': {
      description: 'Validate air-containing waste aspiration in microbioreactors. Check foam, peak inflow, vessel isolation and process-volume records before restarting after service.',
      acceptance: 'For the permitted gas-containing aspiration or vessel-vacuum arrangement, test actual biomass, aggregates and foam at peak incoming flow. Check accumulation, full-vessel protection, sealing and the intended isolation path.',
      outcome: 'Reconcile withdrawn liquid and any interrupted operation with the process-volume record. Confirm waste removal after maintenance without treating gas-flow ratings as continuous liquid-drainage capacity.',
      fault: 'Foam, aggregates, a full receiver or a leak can reduce aspiration and alter the volume removed. A pressure or bubble signal describes the monitored path state, not the amount withdrawn or the culture condition.',
      recovery: 'Isolate the affected waste route according to the culture procedure and establish the liquid already removed. Restore the receiver, seals and permitted inlet conditions, then verify aspiration and the complete contamination-control boundary before resuming.',
    },
  },
};

function withText(block: Extract<ApplicationBlock, { type: 'paragraph' }>, text: string): ApplicationBlock {
  return { ...block, text };
}

function refineGeneratedTask(document: ApplicationDocument, copy: TaskCopy): ApplicationDocument {
  const values: Record<string, string> = {
    'Acceptance target': copy.acceptance,
    'Fault localization': copy.fault,
    ...(copy.conditions ? { 'Actual operating conditions': copy.conditions } : {}),
  };
  return {
    ...document,
    description: copy.description,
    sections: document.sections.map(section => {
      let paragraphIndex = 0;
      return {
        ...section,
        blocks: section.blocks.map(block => {
          if (section.id === 'working-conditions' && block.type === 'table') {
            return { ...block, rows: block.rows.map(row => values[row[0]] ? [row[0], values[row[0]], ...row.slice(2)] : row) };
          }
          if (block.type !== 'paragraph') return block;
          const index = paragraphIndex++;
          if (section.id === 'acceptance' && index < 2) return withText(block, index === 0 ? copy.acceptance : copy.outcome);
          if (section.id === 'fault-recovery') {
            const text = [copy.fault, copy.recovery, copy.boundary][index];
            if (text) return withText(block, text);
          }
          if (section.id === 'component-roles' && copy.conditions && block.text.startsWith('For this task in ')) {
            return withText(block, `For this operation, confirm: ${copy.conditions}.`);
          }
          return block;
        }),
      };
    }),
  };
}

type CitedParagraph = Extract<ApplicationBlock, { type: 'paragraph' }>;
function addEvidence(blocks: readonly ApplicationBlock[], additions: readonly CitedParagraph[]): readonly ApplicationBlock[] {
  return [...blocks, ...additions.filter(addition => !blocks.some(block => block.type === 'paragraph' && block.text === addition.text))];
}

/** These legacy tasks use different section IDs from generated hierarchy tasks. */
function refineClinicalPistonTask(document: ApplicationDocument): ApplicationDocument {
  const sample = document.slug === 'piston-sample-transfer';
  const description = sample
    ? 'Define clinical chemistry sample contact and system-liquid drive, then validate actual cuvette delivery, specimen integrity and carryover after interruptions.'
    : 'Match clinical chemistry reagent doses to capacity and refill timing. Verify first, middle and final doses at the cuvette, including recovery after bottle changes.';
  const replacements: Record<string, readonly string[]> = sample ? {
    'operating-cycle': [
      'Check liquid level, probe position and valve state before aspiration, maintain the specified dwell, then dispense at the target position. Low remaining volume, wall contact, hanging droplets or compressible air segments may alter probe-tip delivery. After interruption, first establish whether liquid has entered the reaction cuvette before deciding to resample.',
      'Associate the source specimen, receiving cuvette, probe position and completed aspiration or delivery with the actual received result. Mark uncertain or partial delivery explicitly; a completed drive command must not cause automatic resampling into a cuvette that may already contain sample.',
    ],
    acceptance: [
      'Measure actual sample reception in the target cuvette using the assay-permitted specimen or a justified test medium. Evaluate low remaining volume, the first transfer after idle, high/low concentration sequences and blanks. Investigate under-delivery, unintended dilution and previous-sample residue as separate failure modes.',
      'Quantify the transferred volume for the actual programmed task and record the measurement method and uncertainty. Albert and Bradshaw demonstrate how volume verification reveals delivery changes during liquid-handler parameter optimization; their study supports the verification approach, not a performance claim for this pump or analyzer.',
    ],
    questions: [
      'Air aspiration, clots or particles, probe-wall contact and leakage can interrupt sample acquisition. Stop the affected action and identify the specimen, probe state and cuvette before deciding how the assay permits resampling or flagging.',
      'Establish whether the cuvette received no sample, a partial dose or a complete dose. Correct the path or aspiration fault, restore the specified cleaning state and verify the first recovered transfer before restarting; handle an uncertain reaction according to the assay rather than replaying the previous command.',
    ],
  } : {
    'operating-cycle': [
      'After replenishment, bottle changes or long standby, restore an effective liquid column before dispensing working doses. Nozzle droplets or entering air may mainly affect the first dose. The controller must track replenishment state and affected cuvettes to avoid duplicate dispensing.',
      'Keep a per-cuvette record of the reagent source, completed additions, remaining usable inventory and refill state. Distinguish a completed pump motion from actual reception, particularly at the first and final doses of a batch or during a source change.',
    ],
    acceptance: [
      'Measure first, middle and final doses at the actual probe and receiving cuvette with the reagent or justified test medium. Include the first dose after replenishment, bottle changes and the longest planned idle interval; relate volume and residue to the reaction ratios, blanks and assay results.',
      'Use a volume-verification method to quantify each relevant transfer while adjusting the operating sequence. Albert and Bradshaw show why measured transfer results are useful during liquid-handler optimization; their results do not validate a particular FOREACH reagent dose or replace complete-assay testing.',
    ],
    questions: [
      'Source depletion, air entry, nozzle droplets or backpressure changes can affect first or final doses. Identify the affected source and cuvettes before priming, and keep recovery liquid separate from useful reagent additions.',
      'Reconcile remaining inventory and every completed or partial cuvette addition before restarting. Restore the source and effective liquid column, verify the first useful dose, and apply the assay procedure to uncertain reactions without repeating additions already completed.',
    ],
  };
  // Evidence scope checked against the cited method sheet and the original papers.
  // No specification, recovery threshold or instrument endorsement is inferred from them.
  const evidence: Record<string, readonly CitedParagraph[]> = sample ? {
    'system-position': [
      { type: 'paragraph', text: 'Roche GLUC3 illustrates why specimen suitability is method-specific: its instructions identify accepted specimen types and preparation conditions for that assay. Use the current method instructions for the intended analyzer; acceptance by one assay does not establish suitability for all clinical chemistry tests.', references: ['roche-gluc3'] },
      { type: 'paragraph', text: 'Ouyang and colleagues studied fixed-tip, liquid-filled handling and found that system liquid could dilute the delivered sample when operating parameters were unsuitable. This supports checking sample composition as well as received volume; their tested settings are not a universal sampling program.', references: ['sample-integrity'] },
    ],
  } : {
    'system-position': [
      { type: 'paragraph', text: 'The Roche GLUC3 method lists reagent and water additions separately. Preserve that distinction when budgeting this channel: a combined reaction addition is not the volume of neat reagent. The method is an engineering example, not evidence that the original analyzer uses FOREACH components.', references: ['roche-gluc3'] },
    ],
  };
  const requiredReferences = ['volume-verification', 'roche-gluc3', ...(sample ? ['sample-integrity'] : [])];
  for (const id of requiredReferences) {
    if (!document.references.some(reference => reference.id === id)) throw new Error(`Missing reviewed task reference: ${document.slug}/${id}`);
  }
  return {
    ...document,
    description,
    sections: document.sections.map(section => {
      let paragraphIndex = 0;
      const blocks = section.blocks.map(block => {
        if (block.type !== 'paragraph') return block;
        const index = paragraphIndex++;
        const text = replacements[section.id]?.[index];
        if (!text) return block;
        const updated = withText(block, text);
        return section.id === 'acceptance' && index === 1 ? { ...updated, references: ['volume-verification'] } : updated;
      });
      return { ...section, blocks: addEvidence(blocks, evidence[section.id] ?? []) };
    }),
  };
}

/** Input is already English; callers keep this out of all other locale pipelines. */
export function refineEnglishTasks(document: ApplicationDocument, kind: EnglishApplicationKind): ApplicationDocument {
  if (document.kind !== 'task') return document;
  if (kind === 'ivd' && ['piston-sample-transfer', 'piston-reagent-dispensing'].includes(document.slug)) return refineClinicalPistonTask(document);
  if (kind === 'lab-automation' && document.slug === 'pipetting-needle-wash') return {
    ...document,
    sections: document.sections.map(section => ({
      ...section,
      blocks: section.blocks.map(block => {
        if (section.id === 'operating-sequence' && block.type === 'list') return { ...block, items: [
          'Choose the sequence for the installed architecture. For a reusable probe, identify internal and external wetted surfaces; for disposable tips, identify the permitted tip, pickup position and sample-to-tip assignment.',
          'With a fixed probe, coordinate internal flushing, external wash coverage, contact time and drainage. Check station accumulation and liquid remaining at the needle opening before the next sample.',
          'With disposable tips, establish pickup and sealing at the intended rack position before aspiration. After the assigned transfer, eject to the designated waste location and confirm release before picking up the next tip. Use only observations supported by the workstation to establish these states.',
          'Verify the next actual delivery and the method-required contamination sequence. For fixed probes this follows the complete wash; for tips it follows pickup, use, ejection and replacement, including a failed pickup or interrupted change.',
        ] };
        if (section.id === 'fault-recovery' && block.type === 'paragraph' && block.text.startsWith('Stop supply')) return { ...block, text: 'For fixed-probe washing, stop the affected sequence, restore wash supply and drainage, and verify blank recovery. For failed tip pickup, sealing or ejection, hold the affected channel and establish which tip is attached and which samples or wells have already been contacted. Correct the mechanical or consumable state, replace the tip through the defined sequence and verify the next transfer. Review uncertain earlier samples separately instead of silently repeating their additions.' };
        return block;
      }),
    })),
  };
  const copy = taskCopy[kind]?.[document.slug];
  return copy ? refineGeneratedTask(document, copy) : document;
}
