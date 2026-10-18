import type { ApplicationBlock, ApplicationDocument, ApplicationSection } from '../analytical-documents/types';
import type { EnglishApplicationKind } from '../application-english';

type Pair = readonly [string, string];
type ProductCopy = {
  intro: string;
  role: string;
  secondaryRole?: string;
  configuration: readonly [Pair, Pair];
  checks: readonly Pair[];
  operationConditions: readonly string[];
  acceptance: readonly Pair[];
  outcome: string;
  question: string;
  answer: string;
  operation?: readonly string[];
};

// Instrument-specific decisions; shared product specifications and links stay in the source document.
const copy: Readonly<Record<string, ProductCopy>> = {
  'clinical-fluid-monitoring': {
    intro: 'A bubble alarm during sample aspiration and a pressure change during reagent dispensing affect different parts of a clinical chemistry cycle. Choose the monitored branch and observation window around the sample, reagent or wash operation, then define how the controller identifies the affected reaction cuvette.',
    role: 'Monitor the actual sample, reagent or wash branch at a location where its state can be interpreted. A sensor upstream of a selector describes the selected supply; it does not independently identify which downstream cuvette received liquid. That association comes from the analyzer sequence and its delivery records.',
    configuration: [
      ['Choose the branch before choosing the alarm window', 'For sample aspiration, relate the sensing position to the probe and any intentional air segment. For a reagent supply, decide whether the purpose is to observe bottle depletion before the metering unit or disturbances during delivery. A common supply sensor covers a different part of the path from a sensor on one metering branch; map the intervening valves before assigning an alarm to a sample.'],
      ['Keep a fluid-path alarm separate from a confirmed dose', 'Record the selected source, valve state and cuvette when the event occurs. Distinguish no delivery, partial delivery and a completed transfer using the available observations; mark an unmeasured amount as unknown. The controller can then hold the affected task for the method-defined response. Repeating the command before resolving a partial dose may change the reaction ratio.'],
    ],
    checks: [
      ['Sample aspiration', 'Specify the actual specimen or justified test medium, probe sequence, intended air segments and sensor position relative to the source and metering unit.'],
      ['Reagent dispensing', 'Include bottle level, replenishment state and valve transitions in the baseline; compare the first dose after a bottle change with routine delivery.'],
      ['Alarm association', 'Define which source and cuvette records accompany the signal, how uncertain delivery is represented, and which tasks must remain paused.'],
    ],
    operationConditions: ['Sampling or reagent branch, actual liquid and tubing, valve state, intended air segments, acquisition timing and the cuvette affected by a late signal'],
    acceptance: [['Challenge source depletion, a permitted introduced bubble and representative branch-load changes during the relevant phase. Record missed events, false alarms and time from signal to controller action, then measure the affected transfer at the cuvette.', 'A normal trace after priming may coexist with an earlier incomplete dose. Separate the event that stopped the task from the evidence used to release the next sample.']],
    outcome: 'Accept the monitoring arrangement only when a recorded event can be traced to the affected operation and a defined response. Check actual first-dose delivery after recovery and assess any carryover through the assay sequence.',
    question: 'Can a common reagent-supply sensor identify a faulty cuvette?',
    answer: 'It identifies the state at its sensing location. The controller must relate that event to the selected branch, elapsed transfer sequence and current cuvette; shared volume and delayed signal arrival can widen the set of operations requiring review.',
    operation: [
      'During low-volume sample aspiration, compare an alarm with probe position, remaining specimen volume and the actual received sample. Air entry and a restriction can require different handling even when both interrupt the cycle.',
      'During reagent replenishment, keep the source-change event separate from subsequent cuvette additions. Reprime toward the intended outlet and establish which addition was unfinished before resuming the sequence.',
      'Test the complete response while normal valve changes and intended air segments are present. A detector that responds in isolation may still create false stops if the observation window includes an expected transition.',
      'After a fault, verify the repaired path and first subsequent transfer separately from the disposition of the earlier reaction. A recovered sensor baseline does not determine that reaction result.',
    ],
  },
  'immunoassay-fluid-monitoring': {
    intro: 'Immunoassay reagent addition and solid-phase washing need different monitoring responses. A supply disturbance may affect one reagent dose, while an interrupted wash can change residual liquid or solid-phase retention. Assign bubble and pressure observations to the relevant reaction vessel and process stage.',
    role: 'Place monitoring in the reagent, wash-supply or permitted aspiration branch that carries the condition of interest. The controller combines the signal with the reaction vessel and completed steps; magnetic capture, residual liquid and assay background need their own observations.',
    configuration: [
      ['Separate reagent-dose monitoring from wash-cycle monitoring', 'A reagent-line observation should be interpreted against bottle state, mixing where required and the metered addition. A wash-line observation belongs to a particular fill or aspiration phase. Gas entry near the end of aspiration may have a different meaning from air entering a reagent dose, so one alarm rule should not be copied between those branches.'],
      ['Retain the reaction history when a wash is interrupted', 'The response depends on whether reagent addition, magnetic capture, filling or aspiration was active. Record the completed stage and the affected vessel before stopping the station. After restoring supply or drainage, the assay procedure determines whether the interrupted reaction can continue; adding another wash or reagent dose changes the sequence and requires a defined method decision.'],
    ],
    checks: [
      ['Reagent branch', 'Define formulation, storage-to-use state, any suspension handling, bottle-change sequence and the actual addition being monitored.'],
      ['Wash branch', 'Locate the sensing point relative to the wash head, aspiration path and waste receiver, with phase-specific expectations for liquid and gas.'],
      ['Vessel and stage record', 'Associate the event with completed reagent additions, capture and wash steps; retain the state of every reaction using a shared wash resource.'],
    ],
    operationConditions: ['Reagent, wash-supply or aspiration branch; intended liquid/gas state in each phase; active reaction vessel; completed capture, fill and aspiration steps'],
    acceptance: [['Exercise representative source depletion and wash-supply or aspiration disturbances in their actual phases. Compare signal timing and controller response with received reagent, residual wash liquid and retained solid phase.', 'A supply alarm cannot distinguish inadequate magnetic capture from misplaced aspiration. If background remains abnormal after path recovery, assess those station conditions and the assay separately.']],
    outcome: 'Validate dose monitoring against actual reagent receipt and wash monitoring against the completed wash cycle. Recovery must account for the affected reaction history as well as the next vessel using the station.',
    question: 'Does a normal pressure trace confirm successful magnetic washing?',
    answer: 'It confirms only the pressure observed at that location and time. Wash acceptance also requires the intended solid-phase retention, residual-liquid removal and assay background; a recovered pressure trace cannot reconstruct an interrupted wash.',
    operation: [
      'For a reagent-source event, review the specific addition and whether mixing or replenishment was underway. Confirm the next actual dose after restoring the source instead of treating a cleared alarm as evidence of correct reagent composition.',
      'For a wash interruption, preserve the capture, fill and aspiration history. Check the wash head and waste receiver together before deciding which reactions need method-defined handling.',
      'Challenge monitoring during normal station transitions as well as faults. Measure unnecessary stops separately from missed supply or aspiration disturbances, including the effect on other vessels sharing the station.',
      'Use station observations to locate the problem: supply, aspiration geometry, capture or waste accumulation. The monitoring module contributes a signal to that investigation, not a direct measurement of bead loss or washing effectiveness.',
    ],
  },
  'hematology-fluid-monitoring': {
    intro: 'Whole-blood aspiration, dilution and detection-channel supply produce different normal fluidic states. Monitoring in a hematology analyzer must be tied to the active channel and sample condition so a viscosity change, air entry or interrupted supply is not treated as the same event.',
    role: 'Acquire pressure or bubble information where the sample or supporting liquid actually passes. Keep aspiration, dilution and detection-supply observations distinct, including the detection architecture used by the instrument. The controller uses these records to investigate a fault; a pressure change alone does not diagnose a clot.',
    configuration: [
      ['Build baselines for the blood-sampling and reagent branches separately', 'The sampling branch should be evaluated with method-permitted whole blood, its mixing state and the interval before aspiration. Reagent and detection-supply branches have different media and loads. Establish observations for each actual pump and valve phase rather than carrying a water-only sampling baseline into blood handling or a metered-dilution rule into continuous supply.'],
      ['Connect the affected sample to channel recovery', 'An interruption before sample transfer is different from one after dilution or during detection. Preserve the sample identity, preparation stage and channel in use. Restore the fluid path, then check channel renewal and the method-required blank before deciding which sample result must be repeated or withheld under the analyzer procedure.'],
    ],
    checks: [
      ['Blood aspiration', 'Include mixing state, remaining sample volume, probe position and elapsed handling time in the sampling baseline.'],
      ['Channel supply', 'Identify the actual diluent, lysing reagent or method-required sheath branch and its operating phase; do not assume all counting channels use sheath flow.'],
      ['Recovery evidence', 'Record sample identity, dilution stage, affected channel, renewal sequence and blank result alongside the pressure or bubble event.'],
    ],
    operationConditions: ['Actual whole-blood handling and channel architecture, sampling versus supply phases, liquid-specific baselines, sample/preparation identity and required channel recovery'],
    acceptance: [['Compare normal and challenged aspiration with representative permitted blood conditions, then exercise the relevant channel-supply faults. Record false alarms, missed events and recovery observations separately for each branch.', 'Air, source depletion, sample changes and a restriction may produce overlapping observations. Check the active path and sample state before assigning a cause or accepting a channel result.']],
    outcome: 'Verify that the alarm identifies a useful investigation window and that channel renewal restores the method-required conditions. Keep sample-delivery, dilution-ratio and detection-result checks as separate evidence.',
    question: 'Can one pressure threshold identify a blood clot?',
    answer: 'A threshold may flag a departure from the established baseline. Its cause still depends on sample condition, probe and valve state, liquid level and the measured location; investigate these conditions before deciding the sample and channel response.',
    operation: [
      'During aspiration, relate the trace to the mixed specimen and remaining source volume. If delivery changes, review probe position and air entry together with the pressure event before repeating the sample operation.',
      'During detection supply, distinguish a transient valve transition from sustained loss of the required liquid condition. Use the specific channel sequence to establish the observation and recovery windows.',
      'Include repeated specimens and routine cleaning in verification. A baseline that works for one specimen or a clean line may misclassify normal variation or miss a progressively restricted path.',
      'After clearing an affected branch, inspect renewal and the channel blank before returning to sample measurement. Record which sample stages were completed so a restart does not silently reuse a partially processed preparation.',
    ],
  },
  'coagulation-fluid-monitoring': {
    intro: 'A fluidic event in a coagulation analyzer matters partly because of when it occurs relative to sample and reagent contact. Locate monitoring around the addition sequence, and preserve the reaction-cuvette and method timing records needed to decide what happens after an interruption.',
    role: 'Use the defined bubble or pressure location to observe the dispensing branch, while the controller associates the event with the active cuvette and addition phase. A signal upstream of the probe has to be interpreted with the intervening path and actual liquid-arrival sequence.',
    configuration: [
      ['Relate sensing position to the reaction-start sequence', 'Identify whether the monitored segment contains sample, reagent or system liquid and where it lies relative to the probe outlet. Record motor completion, liquid leaving the outlet and arrival at the reaction position as separate events when validating the sequence. Choose the observation window around the event relevant to the assay rather than around a generic motion command.'],
      ['Preserve timing when an addition is interrupted', 'An event before liquid contact and an event during or after contact leave different reaction states. Retain the cuvette, addition order, recorded times and evidence of received volume before attempting recovery. Clotting, chromogenic and immunoturbidimetric methods define different initiation or reading rules; the method decides whether a reaction can continue after the path is restored.'],
    ],
    checks: [
      ['Observed liquid and location', 'Map the sample, reagent or system-liquid segment, probe outlet and sensing point so the distance between an observed event and the reaction is explicit.'],
      ['Method timing', 'Define the addition phase, contact event, incubation or acquisition window and controller record used for the selected assay.'],
      ['Interrupted reaction', 'Keep the affected cuvette and known or unknown delivery status with the timestamps; define the method response before allowing another addition.'],
    ],
    operationConditions: ['Assay-specific addition and reading sequence, sensing position, liquid-arrival observations, current cuvette and treatment of uncertain partial delivery'],
    acceptance: [['Challenge the dispensing branch before, during and after the relevant addition phase. Compare sensor events and controller response with observed liquid arrival, actual receipt and retained reaction timing.', 'An alarm cleared after priming does not restore an earlier reaction-start time. Review the interrupted reaction separately from verification of the next valid dispensing cycle.']],
    outcome: 'Acceptance requires a useful association between the observed fluidic event and the method-defined reaction state. Verify the next addition after recovery without treating motion completion as a measurement of liquid delivery.',
    question: 'Can an interrupted addition resume when the bubble alarm clears?',
    answer: 'Only the assay procedure can determine whether the recorded reaction state permits continuation. Establish whether contact or partial addition occurred, retain the original timing, and handle that cuvette separately from restoring the dispensing path.',
    operation: [
      'Observe events with the actual sample and reagent sequence, including idle recovery and the first addition after washing. A signal observed during priming has a different consequence from the same signal during an assay addition.',
      'Keep the cuvette association valid until the affected liquid could have reached its destination. Review the recorded path and timing if a delayed alarm arrives after the controller has advanced to another step.',
      'Measure event detection and end-to-end controller response under the relevant addition phases. Compare these with actual receipt and contact observations rather than using the sensor timestamp as the reaction-start timestamp.',
      'After restoring the path, check the next valid addition and the method response to residual wash liquid. The interrupted cuvette remains subject to its own method-defined disposition.',
    ],
  },
  'molecular-fluid-monitoring': {
    intro: 'In molecular diagnostics, an interruption during lysis-reagent addition, wash removal or eluate transfer affects different material and destinations. Monitor only the fluid branches present in the workstation, and connect each event to the sample, well and extraction stage.',
    role: 'Provide observations for an actual liquid-supply, transfer or waste branch. Fixed-tubing sensors do not observe every disposable-tip transfer or magnetic-rod movement. The controller must combine the relevant branch signal with the workstation records before identifying which samples or eluates require review.',
    configuration: [
      ['Choose monitoring around the liquid operation that exists', 'Map fixed reagent feeds, sample-contact paths and waste branches separately from bead transfer and tip handling. Where a branch may contain beads or precipitated material, establish its normal operating state and permitted handling with the actual formulation. A detector position suitable for one supply tube cannot be assumed to cover a downstream well or another handling architecture.'],
      ['Recover by sample stage and retained material', 'The record must distinguish reagent added, wash supernatant removed and eluate collected. After a disturbance, establish the destination and the amount known to have moved; leave uncertain amounts explicit. The method then determines whether to complete a transfer, stop the sample or repeat preparation, avoiding a second reagent addition or loss of eluate to a waste route.'],
    ],
    checks: [
      ['Architecture and branch', 'Identify the fixed liquid path that the module can observe, with tube dimensions, formulation and any permitted particles or gas segments.'],
      ['Material and destination', 'Associate sample identity and well position with lysis/binding addition, washing, elution or downstream setup.'],
      ['Fault response', 'Define how the workstation preserves transferred and uncertain material, separates eluate from waste, and releases a sample after method-specific checks.'],
    ],
    operationConditions: ['Actual liquid-transfer architecture, formulation and particle conditions, sample/well identity, retained fraction, destination and the extraction or setup stage'],
    acceptance: [['Challenge reagent depletion and representative restrictions or waste disturbances in the branches actually monitored. Check event-to-well association and handling of partially completed transfers, then assess recovery and blanks with the downstream method.', 'A normal supply signal cannot establish successful lysis, bead retention or eluate suitability. If preparation fails, investigate the physical transfer and the extraction or assay result separately.']],
    outcome: 'Verify branch detection and controller bookkeeping with the actual workflow, then confirm recovered product and between-sample contamination through the method. Sensor status alone is not nucleic-acid quality or PCR acceptance.',
    question: 'Can the workstation repeat a transfer after clearing an extraction alarm?',
    answer: 'First determine which material has already reached which well or receiver. Repeating a lysis addition, wash removal or eluate transfer has different consequences; the continuation rule must use the sample stage and the actual retained material.',
    operation: [
      'During reagent delivery, associate the supply event with the wells being filled and any shared distribution segment. Confirm the destination records before retrying a partially completed batch.',
      'During wash removal, observe the actual aspiration or waste branch while tracking the solid phase retained in the vessel. Do not treat successful waste removal as proof of adequate extraction washing.',
      'During elution or setup, retain product identity when a transfer stops. Verify the receiving position and recoverable amount before moving liquid again or opening a maintenance route.',
      'Test recovery using the method-required blanks and product checks. Persistent contamination or poor recovery after a normal fluidic trace calls for investigation beyond the monitored branch.',
    ],
  },
  'clinical-fluidic-connections': {
    intro: 'A replacement tube can seal correctly yet change the first sample or reagent reaching a clinical chemistry cuvette. Select connections as part of the complete sampling, metering and washing path, with attention to where sample contacts the circuit and how shared liquid is renewed.',
    role: 'Connect bottles, metering units, valves and probes while preserving the intended sample-contact and system-liquid boundaries. Tubing used to drive a sample at the probe has a different contact duty from tubing that carries the specimen itself; that distinction determines materials, cleaning and recovery checks.',
    configuration: [
      ['Separate specimen contact from system-liquid displacement', 'Draw the path in each aspiration and delivery state before choosing materials or bore. In a system-liquid architecture, verify the interface that separates the specimen from the driving liquid; in a direct-contact path, include the entire specimen-wetted section in the wash sequence. Reducing internal volume can reduce liquid held between operations, but the selected bore and routing must still support aspiration, probe motion and service access.'],
      ['Treat a connection change as a change to the delivery sequence', 'Record the installed tube length, bore and port seating when a line or fitting is replaced. Added volume can alter priming and the time at which fresh reagent reaches the probe; a gap can retain an earlier composition. Recheck the first transfer and the sample-change sequence, not only the absence of visible leakage, before restoring the original program.'],
    ],
    checks: [
      ['Contact map', 'Mark specimen, reagent, system-liquid and wash contact for each segment, including the cleaning agents and actual contact conditions.'],
      ['Installed dimensions', 'Record the length and bore that determine held liquid, together with tube outer diameter, end position, fitting seal and mating port.'],
      ['Return to service', 'Define the priming outlet and first-dose check, then assess the relevant high-to-low sample sequence or reagent blank after a connection change.'],
    ],
    operationConditions: ['Actual specimen-contact or system-liquid layout, reagent and wash formulations, installed tube dimensions, port seating and the transfer sequence after service'],
    acceptance: [['Compare cuvette receipt and first-dose arrival before and after the connection change. Include idle recovery and the relevant high-to-low sequence with the complete probe-wash procedure.', 'A leak test may pass while extra length, a seating gap or retained wash liquid changes the first transfer. Inspect the changed segment before compensating with a different pump command.']],
    outcome: 'Keep an installation record that can reproduce the accepted path. Release it after sealing, actual delivery and the relevant carryover or blank checks agree with the analyzer method.',
    question: 'Is a replacement tube acceptable when the threads fit and the line does not leak?',
    answer: 'Also compare bore, installed length, tube-end seating and the wetted seal. Those changes can alter held liquid and first-dose behavior without an external leak, so verify the actual transfer and sample-change sequence after replacement.',
    operation: [
      'Start at the liquid source and follow the active path through the valve, metering unit and probe. Label where the specimen is retained and which sections contain driving or wash liquid; this determines what a connection change can affect.',
      'When replacing a line, restore the intended routing and port seating before changing the dosing program. Measure priming and the first received transfer so an assembly difference is not hidden by a software correction.',
      'Assess aspiration and delivery pressure states with the actual assembly, including movement of the probe where relevant. Check that routing remains seated and does not kink during the programmed motion.',
      'If volume recovers but the next sample or blank remains affected, investigate retained liquid and washing at the changed interface. Volume calibration and removal of previous composition solve different problems.',
    ],
  },
  'immunoassay-fluidic-connections': {
    intro: 'Immunoassay tubing connects reagent metering, wash heads and waste collection, but those branches need different acceptance checks. Select the wetted path around each formulation and the solid-phase washing sequence so a successful leak test is not mistaken for acceptable assay background.',
    role: 'Build the actual reagent, wash-supply and aspiration paths with connections suited to their liquids and pressure states. Shared reagent segments require a formulation-specific residue decision; wash-head and waste connections must also sustain the intended fill and removal sequence.',
    configuration: [
      ['Decide which reagent paths may be shared', 'List the formulations that contact each tube, fitting and seal, including cleaning liquids. Where suspensions or substrates are used, include their handling and storage-to-use conditions in the path review. A common line reduces separate plumbing but adds held liquid and a changeover requirement; use dedicated paths when the assay cannot tolerate the proposed sharing and cleaning sequence.'],
      ['Evaluate wash-head connections at the reaction vessel', 'Changes in line length or a fitting near the wash head can alter installed supply and aspiration behavior. Compare wash delivery, remaining liquid and solid-phase retention at the vessel after maintenance. If assay background changes despite a sealed path, examine reagent residue, wash coverage, aspiration position and capture together rather than treating tubing flow as a complete wash result.'],
    ],
    checks: [
      ['Reagent contact', 'Identify suspension, binding-reagent or substrate paths actually present, their contact duration and cleaning exposure, and any permitted shared segment.'],
      ['Wash and waste assembly', 'Specify wash-head connections, aspiration routing, expected gas/liquid phases and the waste receiver, including branches that run together.'],
      ['Post-service evidence', 'Plan first reagent doses and a complete wash cycle after replacement, with residual-liquid, solid-phase and assay-background observations.'],
    ],
    operationConditions: [
      'Fixed-probe sample-contact or system-liquid layout, internal/external wash interfaces and the connections changed during service',
      'Formulation-specific wetted path, dedicated or shared supply, retained line volume and replenishment or bottle-change conditions',
      'Wash-head supply and aspiration routing, vessel geometry, actual solid phase, waste destination and simultaneous wash demand',
    ],
    acceptance: [
      ['Measure receipt through the assembled probe path and assess the next container after the sample-change wash sequence.', 'A new fitting or line may add retained liquid or admit air during aspiration even if dispensing appears normal.'],
      ['Check the first reagent received after standby, bottle change and line replacement, then assess the assay blank for the actual sharing sequence.', 'Retained reagent, wash liquid or a suspension-handling change can affect composition independently of total volume.'],
      ['Compare wash delivery and residual liquid at the reaction vessel, including solid-phase retention and background after the complete wash.', 'A supply or aspiration connection can change the station load; also inspect capture and aspiration position before attributing bead loss to the tubing.'],
    ],
    outcome: 'Approve the reagent path with dose and composition-sensitive results, and the wash path with vessel-level washing results. Keep the assembly details that produced those results for subsequent replacement.',
    question: 'Can all immunoassay reagents share one connection material and wash routine?',
    answer: 'Only after reviewing the actual formulations, contact conditions and assay response. A material name or a successful water flush cannot establish suspension handling, substrate compatibility or removal of the previous reagent from a shared path.',
  },
  'hematology-fluidic-connections': {
    intro: 'Hematology fluid paths connect blood sampling, dilution, reagent treatment and detection. Choose tubing and fittings by the medium and role of each branch, then verify how a changed connection affects sample delivery, channel renewal and the first measurement after maintenance.',
    role: 'Form the real blood-contact, reagent and detection-supply paths. A blood-sampling line, a metered diluent line and a method-required sheath branch do not have interchangeable flow or renewal duties, even when their fittings look similar.',
    configuration: [
      ['Choose dimensions by the material moving through the branch', 'For the sample path, include mixed whole blood, remaining specimen volume and the actual pressure states in the bore and routing decision. Reagent paths must suit their formulations and cleaning exposure. Avoid selecting every branch from one nominal tube size: reducing held volume and providing the required installed flow are competing considerations that must be resolved for that branch.'],
      ['Restore channel state after opening the circuit', 'Replacement introduces a new assembly state and may change held volume or admit air. Establish the correct liquid path, prime toward its intended destination and check sample renewal before measurement. Compare the channel blank and method-required detection conditions after cleaning; restoring a sampled volume alone does not show that the downstream channel has recovered.'],
    ],
    checks: [
      ['Blood-contact section', 'Record actual sample handling, contact surfaces, bore, routing and pressure states, including the wash procedure for that section.'],
      ['Reagent and detection sections', 'Separate metered diluent and lysing-reagent duties from any required continuous supply; identify the relevant channel rather than assuming a common sheath architecture.'],
      ['Maintenance release', 'Document replaced dimensions and seating, priming destination, channel renewal and the blank or recovery result before processing samples.'],
    ],
    operationConditions: [
      'Blood-contact or system-liquid sampling path, sample mixing and remaining volume, installed connection dimensions and probe wash sequence',
      'Sampling, reaction and detection segments reached by cleaning; actual return/waste routing, air removal and the channel blank required after service',
    ],
    acceptance: [
      ['Measure whole-blood sample receipt through the serviced path using representative permitted conditions, then verify the subsequent dilution separately.', 'An altered bore, deformation or trapped gas may change aspiration; a correct sample dose does not establish the prepared dilution.'],
      ['Check the channel renewal sequence, air clearance and blank after cleaning or replacement, followed by the method-required recovery measurement.', 'A path can be leak-tight but retain old sample or cleaning liquid. Investigate the affected segment and channel state before repeating measurement.'],
    ],
    outcome: 'Release the serviced circuit with separate evidence for sample transfer, preparation and channel recovery. Preserve its routing and installed dimensions so future replacements reproduce the validated arrangement.',
    question: 'Can a blood-sampling tube be replaced with a similar tube from a reagent branch?',
    answer: 'Compare the actual bore, materials, pressure states and cleaning duty first. A reagent branch may not share the same sample-contact or renewal requirements; verify blood transfer and downstream recovery in the complete assembly.',
  },
  'coagulation-fluidic-connections': {
    intro: 'In a coagulation analyzer, the connection between the metering unit and reaction position contributes to liquid arrival as well as sealing. Evaluate a tube or fitting change against the assay addition sequence, particularly the first delivery after washing or service.',
    role: 'Connect sample or reagent sources to the metering and probe interfaces without losing the relationship between the programmed addition and arrival at the cuvette. Include any system-liquid segment and reused wash path when reviewing a change.',
    configuration: [
      ['Budget the path from metering unit to reaction contact', 'Identify the installed length, bore and interface volumes between the active source and the probe. A different connection can change liquid retained and renewed before the next addition. Keep the actual arrival event separate from motor or valve completion, and assess the effect of the proposed assembly with the method-defined addition and reading sequence.'],
      ['Check the first reaction after washing or replacement', 'The maintained path may be mechanically sound while retaining wash liquid or a different liquid column. Reprime to the intended destination and measure the next received dose and arrival time. Then evaluate the assay response to that first addition; clotting, chromogenic and immunoturbidimetric methods do not share one universal restart timing rule.'],
    ],
    checks: [
      ['Assembly and contact', 'Specify sample, reagent or system-liquid contact, installed tube dimensions, mating-port geometry and seal arrangement.'],
      ['Arrival relative to method', 'Define the probe/cuvette position, addition sequence and actual contact observation used to relate a connection change to assay timing.'],
      ['Wash and service recovery', 'Include priming destination, residual wash liquid and first-dose observations in the release procedure after opening the path.'],
    ],
    operationConditions: [
      'Actual sample-contact or system-liquid path, installed tube and fitting volume, probe position and method-specific liquid-arrival sequence',
      'Reused sections reached by washing, drain/prime destinations and the first dose through the cleaned path before a method-valid reaction',
    ],
    acceptance: [
      ['Compare received sample volume and observed arrival at the cuvette before and after the assembly change, using the assay addition sequence.', 'Extra held volume, trapped gas or a seating gap may change the transfer even when the valve and motor report the same timings.'],
      ['Assess the first addition after washing or maintenance for volume, arrival and the assay effect of residual wash liquid.', 'Mechanical sealing alone cannot confirm restoration of the intended liquid composition or reaction timing.'],
    ],
    outcome: 'Accept the connection change with evidence at the reaction position: sealed assembly, delivered volume, arrival and the appropriate first-reaction result. Keep the method timing record distinct from component response time.',
    question: 'Can the original timing program be retained after changing tube length?',
    answer: 'Retain it only if the assembled path still meets the required delivery and arrival sequence. Recheck the actual reaction position, including the first dose after washing; matching fittings or an unchanged pump command do not establish that result.',
  },
  'molecular-fluidic-connections': {
    intro: 'A molecular-diagnostic path can deliver the expected liquid volume while losing nucleic acid to retained liquid or wetted surfaces. Select connections around the actual reagent, eluate and waste routes, and assess recovered target and blanks across the complete fixed path.',
    role: 'Connect the fixed branches actually used for reagent supply or product transfer, keeping sample and eluate destinations separate from wash waste. The location and contact history of each fitting matter when a small recovered amount passes through several components.',
    configuration: [
      ['Select the wetted path by the retained fraction', 'Identify whether a segment carries a reagent, sample preparation, wash supernatant or recovered eluate. A connection acceptable for bulk reagent delivery may introduce too much hold-up or unwanted contact in a low-volume product path. Compare the assembled material surfaces and interface volume with the intended recovery, while preserving feasible installation and cleaning access.'],
      ['Design replacement around contamination zones and recovery', 'Document which connectors are opened, where remaining liquid is sent and how the path is re-established. A shorter tube or lower-volume fitting can reduce held liquid, but does not by itself prove removal of earlier sample or wash constituents. After service, compare product recovery and the required blanks with the method, including the downstream use of the eluate.'],
    ],
    checks: [
      ['Liquid and zone', 'Map lysis/binding reagents, wash liquids, eluate and waste with their actual formulations, contact conditions and contamination boundaries.'],
      ['Product-path volume', 'Record tubing bore and length, fitting seating and retained interfaces in relation to the intended recovered amount.'],
      ['Replacement procedure', 'Define opened sections, prime/discard destinations and post-service recovery and blank checks without transferring maintenance liquid into product receivers.'],
    ],
    operationConditions: ['Formulation-specific fixed wetted paths, sample or eluate contact, contamination zone, installed internal volume, receiver identity and replacement/cleaning procedure'],
    acceptance: [['Compare received liquid and nucleic-acid recovery through all installed connections with appropriate reference handling. Include method-required blanks and the intended downstream use after maintenance.', 'Adsorption, hold-up or contamination can alter the recovered target even when delivered volume is acceptable. Investigate the changed contact section and handling sequence rather than correcting volume alone.']],
    outcome: 'Accept the complete connection path on both liquid transfer and method-relevant product results. Keep reagent delivery, wash removal and eluate collection distinct in the assembly and service records.',
    question: 'Does minimizing connection volume guarantee good nucleic-acid recovery?',
    answer: 'It addresses held liquid, but recovery also depends on wetted surfaces, the target and formulation, and the handling sequence. Compare the assembled path with reference handling and required blanks; verify the downstream method rather than inferring suitability from geometry.',
    operation: [
      'Trace the product-contact route through each tube, valve and receiver connection. Exclude paths that only carry reagent from claims about eluate recovery, and include every surface actually contacted by the recovered material.',
      'Compare transfer through the assembly with appropriate reference handling to distinguish liquid left behind from changes in recovered target. Record the received amount and method result separately.',
      'Before replacing a fitting, define which contamination zone is opened and where priming liquid will go. Restore routing and sealing without using a product receiver as a maintenance discharge destination.',
      'If blanks or recovery change after service, inspect the replaced section and handling procedure first. A successful leak check and a matching thread are insufficient evidence of restored product performance.',
    ],
  },
  'clinical-fluidic-valves': {
    intro: 'A clinical chemistry source-selection valve must connect the intended sample, reagent or wash path while the metering unit is in the correct state. Select the port arrangement around the real transfer sequence, then account for the old liquid remaining between the selected port and the probe.',
    role: 'Use multiport selection where several liquid sources or destinations must connect to the metering branch. Define which routes may share wetted sections and where old liquid is discharged before a new sample or reagent is delivered to a cuvette.',
    configuration: [
      ['Choose ports from source and destination states', 'List the required sample, reagent, wash and maintenance connections, including the state needed while the pump aspirates or dispenses. A selectable source is not an independent simultaneous supply path. If two tasks must run together, determine whether the proposed internal connection structure and shared metering branch permit that schedule before choosing a port count.'],
      ['Trade shared plumbing against changeover liquid and time', 'A shared valve-to-probe segment reduces separate tubing but retains the previous liquid after source selection. Establish which switching combinations matter to the assay and where their displacement or cleaning liquid will go. If the permitted sequence cannot clear a shared segment before the next dose, reconsider the route or use a dedicated path rather than assuming another valve command solves the residue.'],
    ],
    checks: [
      ['Operating states', 'Map source, destination, metering action and permitted pressure for sampling, reagent addition and cleaning, including maintenance positions.'],
      ['Shared-section budget', 'Identify the retained segment and discharge destination for each relevant change of liquid, with its required renewal and time allowance.'],
      ['Concurrent tasks', 'Compare requested simultaneous operations with the real port connections and shared resources; include shutoff leakage and power-loss handling.'],
    ],
    operationConditions: ['Sample/reagent/wash port map, metering sequence, shared-path volume, intended displacement destination, state pressures and tasks requested at the same time'],
    acceptance: [['Exercise the intended source changes with the actual metering sequence. Verify the selected connection, new-liquid arrival and residue at the receiver, including the first dose after washing or replenishment.', 'A confirmed valve position may still leave old liquid downstream. Investigate unintended connections, leakage and incomplete renewal before changing the metered amount.']],
    outcome: 'Choose the valve configuration from the required connection states and accepted changeover sequence. Validate liquid delivery at the cuvette after switching, while the linked task page defines the detailed operating procedure.',
    question: 'When should two reagent sources use separate paths instead of one selector?',
    answer: 'Consider separation when the assay cannot tolerate their shared residue, the available changeover liquid or time is inadequate, or the tasks require independent simultaneous supply. Compare those constraints with the actual valve and drive connections rather than port count alone.',
  },
  'immunoassay-fluidic-valves': {
    intro: 'Immunoassay source selection and wash-branch shutoff are different valve duties. Organize reagent routing around formulation compatibility, and coordinate supply and aspiration branches with capture and wash timing so a valve change cannot silently alter the reaction sequence.',
    role: 'A rotary selector connects the reagent or wash source required by a metering task. Decide whether substrates, binding reagents or suspensions may share the downstream segment from the actual assay and handling procedure, rather than from the number of available ports.',
    secondaryRole: 'An on/off valve controls an appropriate wash-supply or aspiration branch in coordination with pumps and the wash head. Define the open and closed states around capture, filling and removal; valve closure alone does not establish magnetic retention or acceptable wash residue.',
    configuration: [
      ['Assign selection and shutoff to separate functions', 'Use the source map to identify where a rotary connection is needed, and the wash sequence to identify where a branch must open or close. For an on/off configuration, check flow direction, differential pressure and the required power-off state. These decisions solve different parts of the fluid path and should not be reduced to choosing one valve type for every operation.'],
      ['Make the sharing decision with the assay background', 'A shared reagent line retains liquid between source changes; some formulation sequences may require a dedicated route. Evaluate the proposed renewal procedure with the actual assay blank or background and first received dose. For washing, validate opening and closing in the complete capture, fill and aspiration sequence, including the effect of an interrupted cycle on the reaction vessel.'],
    ],
    checks: [
      ['Reagent selection', 'List source formulations, permitted sharing, receiving vessel and metering state, including suspension or substrate handling where applicable.'],
      ['Wash-branch control', 'Specify supply and aspiration destinations, actual pressure differences, flow direction and the valve state required during each wash phase.'],
      ['Fault and service states', 'Define isolation after power loss or interruption, then retain the completed reaction stages before permitting another dose or wash.'],
    ],
    operationConditions: ['Separate reagent-selection and wash-branch state diagrams, formulation sharing, capture/fill/aspiration timing, power-off states and affected reaction-vessel records'],
    acceptance: [['Check reagent arrival and assay background after the proposed source changes; separately test wash-branch opening, shutoff leakage and complete vessel washing with the chosen valve timing.', 'Wrong-source connection, a leaking closed branch or delayed wash removal can have different effects. Identify the relevant state and reaction stage before adjusting a common timing parameter.']],
    outcome: 'Accept source selection against reagent identity and assay-compatible changeover, and on/off control against the complete wash sequence. Document which valve function each candidate configuration is intended to perform.',
    question: 'Can adding a shutoff valve make a shared substrate line acceptable?',
    answer: 'A shutoff can control a connection state but does not remove liquid already retained downstream. Determine sharing from formulation compatibility, the renewal sequence and assay background; a separate substrate path may still be needed.',
  },
  'hematology-fluidic-valves': {
    intro: 'Hematology valve selection connects sample preparation to the detection channel required by the method. Define the actual reagent and channel states before choosing ports, and include the renewal and cleaning sequence that allows the next sample to enter a recovered channel.',
    role: 'Route the required reagent, prepared sample or wash source to its intended branch where selection is needed. Bind each valve state to the corresponding preparation or detection stage so the receiving channel and the liquid in the shared segment remain known.',
    configuration: [
      ['Build the connection map from the detection architecture', 'Identify which paths perform metered dilution, reagent treatment and detection supply. Include sheath flow only where the chosen channel requires it. The valve arrangement must accommodate the relevant pressures and permitted overlap of operations; a single selector cannot be assumed to provide independent simultaneous supply merely because it has enough source ports.'],
      ['Plan renewal between preparation, measurement and cleaning', 'Switching from a prepared sample to wash liquid, or from washing back to the next sample, changes what remains in the common segment. Define the discharge route and method-required renewal before detection resumes. If shared routing cannot meet channel preparation and timing requirements, reconsider which branches share the valve rather than increasing a nominal source flow.'],
    ],
    checks: [
      ['Channel architecture', 'List actual preparation and detection branches, media and required operating states; identify metered tasks separately from continuous supply.'],
      ['Pressure and concurrency', 'Provide pressure in each source/receiver state and the operations that must overlap, including isolation from an inactive channel.'],
      ['Renewal and cleaning', 'Map sample, wash and discard destinations, with the channel blank and recovery evidence required before the next measurement.'],
    ],
    operationConditions: ['Method-specific preparation/detection connections, state pressures, channel overlap, shared-liquid renewal and the blank required after washing or interruption'],
    acceptance: [['Run the actual preparation-to-detection and cleaning-to-sample transitions. Measure channel conditions, liquid renewal and blanks, then assess the method response after switching.', 'A correctly selected port may still deliver an old preparation or an air segment from the shared path. Inspect renewal and inactive-channel leakage before assigning the change to sample counting.']],
    outcome: 'Validate the selected path with the channel actually receiving liquid. Retain separate evidence for metered preparation, any required detection supply and the first measurement after channel recovery.',
    question: 'Can one valve-state program serve every hematology detection channel?',
    answer: 'Only if it matches their actual media, pressure and renewal requirements. Different channel architectures can require different preparation and supply states; verify each intended path instead of copying a sheath-flow sequence to all channels.',
  },
  'coagulation-fluidic-valves': {
    intro: 'A coagulation reagent selector must deliver the required liquid in time for the assay addition sequence. Port selection establishes a connection; the liquid still has to renew the shared path and reach the reaction position at the appropriate stage.',
    role: 'Connect the method-required reagent source to its metering path and define the destination during priming or changeover. Keep source identity, shared-segment renewal and actual arrival tied to the addition sequence of the selected assay.',
    configuration: [
      ['Select routing that fits the method addition sequence', 'List reagent sources in their required order, with metering, preincubation and reading stages where applicable. Determine whether selection and renewal can finish before each addition is needed. A dedicated route may be appropriate when a shared path imposes an unacceptable changeover step; the decision depends on the assay and instrument schedule, not a universal valve switching time.'],
      ['Distinguish position feedback from reagent contact', 'After the valve reaches its position, old liquid may remain between the selected source and probe. Verify the intended reagent at the receiver after the actual renewal sequence, and observe arrival relative to the method event. Include a wash-to-reagent transition and the first addition after service because restored routing does not alone establish the intended reaction composition.'],
    ],
    checks: [
      ['Reagent order', 'Provide the selected assay, source identity and required addition order, including the permitted time for path renewal before each dose.'],
      ['Receiver and shared path', 'Map the metering branch, probe and reaction destination, along with the separate discharge route for priming or old liquid.'],
      ['Interrupted sequence', 'Define permitted valve states and pressure after a stop, preserving the cuvette and addition history before the controller resumes.'],
    ],
    operationConditions: ['Assay reagent order, source and discharge paths, shared volume, actual arrival observation, valve-state pressures and reaction history after interruption'],
    acceptance: [['Verify connection state, reagent identity and actual arrival through the complete metering path. Include source changes, wash recovery and the first valid addition after service under the method sequence.', 'Position feedback may precede fresh-reagent arrival; retained liquid or leakage can alter the addition. Review composition and timing before adjusting reaction-start commands.']],
    outcome: 'Select the routing from the available method window and accepted renewal sequence. Preserve the distinction between valve response, liquid arrival and the assay-defined start or reading event.',
    question: 'Does a faster valve switch guarantee an earlier valid reaction start?',
    answer: 'The reaction depends on actual liquid contact and the method sequence. A faster position change may leave the same shared liquid to renew; confirm the reagent reaching the cuvette and its arrival before changing the assay timing.',
  },
  'molecular-fluidic-valves': {
    intro: 'A molecular-diagnostic selector must keep reagent delivery, wash disposal and eluate collection pointed at the correct destinations. Configure the fixed paths that actually exist, with sample identity and maintenance states included in the connection map.',
    role: 'Route sources and receivers where the workstation uses fixed fluidics. Separate product collection from wash and maintenance discharge, and coordinate the selected route with the material retained at each extraction step. Magnetic-rod or disposable-tip actions still require their own handling controls.',
    configuration: [
      ['Select ports by material destination and contamination zone', 'Map lysis and binding reagents, wash liquids, eluate receivers and waste only where they connect through the valve. A common selector can reduce separate plumbing but introduces shared wetted surfaces and state-dependent routes. If product and waste cannot be kept appropriately separated through operation and service, use a different routing arrangement rather than relying on the next commanded position.'],
      ['Verify every transition that can affect recovered product', 'Consider reagent-to-wash and wash-to-elution changes together with the liquid retained downstream. Direct renewal liquid to its intended discard destination before product collection begins. Include maintenance and power-loss states in the review, since an unintended connection or backflow at those times can affect a later extraction even when routine selection works.'],
    ],
    checks: [
      ['Source and receiver map', 'Identify the fixed reagent, sample or eluate paths, corresponding wells/receivers and the material retained or discarded at each step.'],
      ['Shared contact and renewal', 'List formulations contacting common sections, their required renewal procedure and the destination of each prime or wash discharge.'],
      ['Isolation and restart', 'Check operation, maintenance and power-loss connections, including leakage/backflow risks and preserved records of completed product transfers.'],
    ],
    operationConditions: ['Actual fixed-fluidic architecture, sample/receiver identity, reagent and eluate versus waste destinations, shared-contact renewal and all service or power-loss states'],
    acceptance: [['Exercise the relevant reagent, wash and eluate transitions plus maintenance states. Verify destination and received product, then compare extraction recovery and blanks with the downstream method.', 'A valid rotary position does not remove retained wash liquid or prove isolation from waste. Trace the affected route and sample stage before repeating an extraction or collection step.']],
    outcome: 'Accept the valve arrangement only with the intended product and waste destinations preserved through the full workflow. Evaluate recovery and contamination through the method, not from port count or low internal volume alone.',
    question: 'Can wash waste and eluate use the same selected outlet at different times?',
    answer: 'That requires a method-supported sharing and renewal strategy with verified destinations, residue control and fault states. If those conditions cannot be met, separate the routes; switching the port does not erase prior contact or establish contamination isolation.',
  },
};

function paragraph(block: ApplicationBlock, text: string): ApplicationBlock {
  if (block.type !== 'paragraph') throw new Error('Expected IVD product paragraph');
  for (const link of block.inlineLinks ?? []) {
    if (!text.includes(link.text)) throw new Error(`IVD product refinement would remove inline link: ${link.text}`);
  }
  return { ...block, text };
}

function replaceParagraphs(section: ApplicationSection, replacements: Readonly<Partial<Record<number, string>>>): ApplicationSection {
  let index = 0;
  const blocks = section.blocks.map(block => {
    if (block.type !== 'paragraph') return block;
    const text = replacements[index++];
    return text === undefined ? block : paragraph(block, text);
  });
  if (Object.keys(replacements).some(key => Number(key) >= index)) throw new Error(`Missing paragraph in IVD product section ${section.id}`);
  return { ...section, blocks };
}

function replaceTables(section: ApplicationSection, replacement: (block: Extract<ApplicationBlock, { type: 'table' }>, index: number) => Extract<ApplicationBlock, { type: 'table' }>): ApplicationSection {
  let index = 0;
  return { ...section, blocks: section.blocks.map(block => block.type === 'table' ? replacement(block, index++) : block) };
}

function rowsWithDetails(block: Extract<ApplicationBlock, { type: 'table' }>, details: readonly (readonly string[])[]) {
  if (block.rows.length !== details.length) throw new Error(`Unexpected IVD product rows: ${block.caption}`);
  const rows = block.rows.map((row, index) => [row[0], ...details[index]]);
  if (rows.some(row => row.length !== block.headers.length)) throw new Error(`Unexpected IVD product columns: ${block.caption}`);
  const text = rows.flat().join(' ');
  for (const link of block.inlineLinks ?? []) {
    if (!text.includes(link.text)) throw new Error(`IVD product refinement would remove table link: ${link.text}`);
  }
  return { ...block, rows };
}

/** Applied only by the English adapter, after translation and earlier product refinements. */
export function refineEnglishIvdProducts(document: ApplicationDocument, kind: EnglishApplicationKind): ApplicationDocument {
  if (kind !== 'ivd' || document.reviewContext?.level !== 'product') return document;
  const refinement = copy[document.slug];
  if (!refinement) return document;
  const required = ['product-position', 'configuration-1', 'configuration-2', 'working-conditions', 'acceptance', 'configuration-question'];
  if (required.some(id => !document.sections.some(section => section.id === id))) throw new Error(`Unexpected IVD product structure: ${document.slug}`);
  let introChanged = false;
  const intro = document.intro.map(block => {
    if (block.type !== 'paragraph' || introChanged) return block;
    introChanged = true;
    return paragraph(block, refinement.intro);
  });
  if (!introChanged) throw new Error(`Missing IVD product intro: ${document.slug}`);
  const sections = document.sections.map(section => {
    if (section.id === 'product-position') return replaceParagraphs(section, {
      0: refinement.role,
      ...(refinement.secondaryRole ? { 2: refinement.secondaryRole } : {}),
    });
    if (section.id === 'configuration-1' || section.id === 'configuration-2') {
      const [title, text] = refinement.configuration[section.id === 'configuration-1' ? 0 : 1];
      return { ...replaceParagraphs(section, { 0: text }), title };
    }
    if (section.id === 'working-conditions') return replaceTables(section, (block, index) => {
      if (index === 0) {
        if (block.rows.length !== refinement.checks.length || block.headers.length !== 2) throw new Error(`Unexpected configuration table: ${document.slug}`);
        return { ...block, rows: refinement.checks };
      }
      if (index === 1) return rowsWithDetails(block, refinement.operationConditions.map(text => [text]));
      return block;
    });
    if (section.id === 'acceptance') return replaceParagraphs(replaceTables(section, (block, index) => index === 0 ? rowsWithDetails(block, refinement.acceptance) : block), { 0: refinement.outcome });
    if (section.id === 'configuration-question') return { ...replaceParagraphs(section, { 0: refinement.answer }), title: refinement.question };
    if (section.id.startsWith('operation-') && refinement.operation) return replaceParagraphs(section, Object.fromEntries(refinement.operation.map((text, index) => [index, text])));
    return section;
  });
  return { ...document, intro, sections };
}