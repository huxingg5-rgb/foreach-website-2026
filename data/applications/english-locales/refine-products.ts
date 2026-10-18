import type { ApplicationBlock, ApplicationDocument } from '../analytical-documents/types';
import type { EnglishApplicationKind } from '../application-english';

// Summaries use existing scenario duties. Formal specifications stay in product records.
// Finalized LC and legacy guides retain their reviewed copy.
const descriptions: Partial<Record<EnglishApplicationKind, Readonly<Record<string, string>>>> = {
  ivd: {
    'clinical-piston-pumps': 'Compare piston pumps for clinical chemistry sample and reagent delivery by working stroke, wetted path, reaction-cuvette volume and first-dose recovery.',
    'clinical-syringe-pumps': 'Plan reagent aspiration, holding and dispensing in clinical chemistry syringe branches, including valve positions, usable volume and refill windows.',
    'clinical-diaphragm-pumps': 'Separate probe and cuvette wash-liquid supply from aerated-waste aspiration. Match pump branches to wash coverage, peak inflow and waste-container control.',
    'clinical-fluidic-valves': 'Route clinical chemistry samples, reagents and wash liquids with rotary valves, accounting for shared volume, flushing destinations and metering sequences.',
    'clinical-probes': 'Configure sampling and wash probes around reaction-cuvette geometry, low sample levels, droplets, wash coverage and residual-liquid removal.',
    'clinical-fluid-monitoring': 'Locate bubble and pressure sensing in clinical chemistry fluid paths; the controller combines signals with sample identity and delivery records before recovery.',
    'clinical-fluidic-connections': 'Connect clinical chemistry sources, pumps, probes and wash stations with tubing and fittings sized for priming, shared volume and first-dose recovery.',
    'immunoassay-piston-pumps': 'Meter immunoassay samples through fixed probes with piston pumps, comparing received volume, probe droplets and carryover across the sampling and wash sequence.',
    'immunoassay-syringe-pumps': 'Organize immunoassay reagent aspiration and dispensing around valve paths, refills and the separate handling needs of bead suspensions, binding reagents and substrates.',
    'immunoassay-diaphragm-pumps': 'Supply immunoassay wash heads and remove aerated waste in suitable branches, coordinating magnetic capture, aspiration height and peak wash demand.',
    'immunoassay-fluidic-valves': 'Coordinate immunoassay reagent selection and wash-branch switching with metering, magnetic capture, shared-volume flushing and reaction timing.',
    'immunoassay-probes': 'Match immunoassay sampling and wash probes to vessel geometry, droplet release, residual-liquid removal and solid-phase retention during magnetic washing.',
    'immunoassay-fluid-monitoring': 'Use branch bubble and pressure signals with controller records of doses, reaction vessels and wash stages to review interrupted immunoassay operations.',
    'immunoassay-fluidic-connections': 'Build immunoassay reagent, wash and waste paths around formulation-compatible materials, shared-segment residue, sealing and recovery after replacement.',
    'hematology-piston-pumps': 'Evaluate piston-driven whole-blood sampling with sample mixing, low remaining volume and probe position; verify sample delivery separately from dilution ratio.',
    'hematology-syringe-pumps': 'Configure hematology syringe branches for sample transfer and diluent delivery, measuring each received volume and any method-required lysing-reagent dose.',
    'hematology-diaphragm-pumps': 'Match hematology wash and auxiliary-supply pumps to actual channel loads, and separate liquid drainage from waste aspiration with gas-containing inlets.',
    'hematology-fluidic-valves': 'Select hematology reagent, detection-channel and wash paths with rotary valves, matching valve states to sample processing, fluid renewal and leakage checks.',
    'hematology-probes': 'Position whole-blood sampling probes for mixed samples, low remaining volume and container geometry, with particle risks and probe washing assessed together.',
    'hematology-fluid-monitoring': 'Set pressure and bubble sensing baselines for hematology aspiration, dispensing and detection stages; controller interpretation must distinguish signals from clot diagnosis.',
    'hematology-fluidic-connections': 'Connect hematology sampling, dilution and detection branches with materials and bores matched to actual media, channel blanks and post-maintenance recovery.',
    'coagulation-piston-pumps': 'Match piston-driven coagulation sample delivery to assay volumes and reaction-cuvette geometry, checking actual arrival separately from motor and trigger timing.',
    'coagulation-syringe-pumps': 'Plan coagulation reagent aspiration and dispensing around assay addition order, valve selection, refill timing and the permitted reaction window.',
    'coagulation-diaphragm-pumps': 'Supply wash liquid to reusable coagulation fluid paths, checking cleaning coverage, drainage and wash-liquid residue in the next reaction dose.',
    'coagulation-fluidic-valves': 'Select coagulation reagent sources while accounting for shared-path displacement and actual liquid arrival in the assay timing sequence.',
    'coagulation-probes': 'Configure coagulation sampling probes for reaction-cuvette access, droplet release and wall contact, then verify received volume and assay-relevant arrival timing.',
    'coagulation-fluid-monitoring': 'Combine bubble and pressure signals with controller records of the active coagulation cuvette, event time and delivery status before deciding how an assay proceeds.',
    'coagulation-fluidic-connections': 'Size coagulation tubing and fittings for sealing, shared volume and arrival delay; recheck the first dose and reaction timing after changing the path.',
    'molecular-syringe-pumps': 'Meter lysis, binding and other molecular-diagnostic reagents through fixed syringe paths, with formulation-specific wetted materials, priming and cleaning.',
    'molecular-pipetting-pumps': 'Use air-displacement pumps for tip-based sample, reagent and eluate transfer, coordinating tip changes, well identity, extraction and downstream reaction setup.',
    'molecular-diaphragm-pumps': 'Serve actual molecular-diagnostic wash stations and suitable aerated-waste branches, keeping waste destinations separate from nucleic-acid eluate receivers.',
    'molecular-fluidic-valves': 'Route molecular-diagnostic reagents, eluates and waste through fixed valve paths, defining shared-volume flushing and destinations during maintenance or power loss.',
    'molecular-fluid-monitoring': 'Provide branch bubble and pressure signals for controller review of extraction, washing, elution and setup; reconcile transferred reagents and eluates before retrying.',
    'molecular-fluidic-connections': 'Build molecular-diagnostic wetted paths around reagent compatibility, contamination zones and low-volume eluate recovery through all tubing and fittings.',
  },
  'life-science': {
    'genomics-syringe-pumps': 'Meter nucleic-acid workflow reagents through fixed syringe paths, coordinating source selection and priming with the liquid-transfer steps actually present.',
    'genomics-pipetting-pumps': 'Transfer samples, extraction reagents and eluates with disposable tips, keeping wash-liquid disposal, solid-phase retention and product recovery as distinct actions.',
    'genomics-fluidic-valves': 'Select reagent sources and receivers in fixed-path nucleic-acid workstations, with separate destinations for shared-path flushing, eluates and waste.',
    'genomics-fluid-monitoring': 'Use branch pressure and bubble signals with controller records of extraction, washing and elution to review delivered reagents and products before resuming.',
    'genomics-fluidic-connections': 'Assess nucleic-acid recovery through the complete fixed path, including wetted surfaces, fittings, added tubing volume and residue after sample changes.',
    'cell-culture-syringe-pumps': 'Compare syringe branches for periodic medium replenishment and discrete transfers; cell-contact paths also require assessment of bore, residence time and cell outcomes.',
    'cell-culture-valveless-pumps': 'Evaluate repeated or continuous medium supply at the actual formulation and backpressure, recording bottle changes, priming, no-flow intervals and cumulative volume.',
    'cell-culture-diaphragm-pumps': 'Supply culture-medium reservoirs or auxiliary wash branches with liquid diaphragm pumps, evaluating medium delivery separately from cell-suspension transfer.',
    'cell-culture-fluidic-valves': 'Plan pinch-controlled culture and transfer branches around tubing, closure and replacement procedures; assess contamination control across the complete assembled path.',
    'cell-culture-fluid-monitoring': 'Provide pressure and bubble signals for controller review of culture-medium supply; assess cumulative replenishment separately from biological culture condition.',
    'cell-culture-fluidic-connections': 'Connect culture vessels, medium sources and transfer branches using formulation, bore, temperature and contact duration, with cell outcomes assessed across all wetted parts.',
    'automation-syringe-pumps': 'Coordinate fixed-path reagent aspiration, holding and dispensing with valve positions, station receivers and the requirements of the next experimental step.',
    'automation-pipetting-pumps': 'Integrate air-displacement drives with robot motion, liquid levels and containers, using liquid-specific programs for nucleic-acid, cell and protein workflows.',
    'automation-diaphragm-pumps': 'Size shared experimental wash supply and suitable aerated-waste aspiration for station occupancy, peak demand and the workstations permitted to run together.',
    'automation-fluidic-valves': 'Route shared experimental fluid paths to the current source and workstation, coordinating sample identity, task scheduling and residue after switching.',
    'automation-fluid-monitoring': 'Provide bubble and pressure signals for controller association with the active vessel and delivery stage, so partial transfers can be reviewed before workflow recovery.',
    'automation-fluidic-connections': 'Connect automated experimental stations, wash resources and receivers, checking tube-length and shared-volume changes against recovery and analytical blanks.',
    'protein-syringe-pumps': 'Meter protein samples and buffers in fixed syringe paths, assessing received volume and target recovery separately across vessels, valves and wetted surfaces.',
    'protein-pipetting-pumps': 'Prepare protein samples and reaction mixtures with disposable tips, comparing received volume, analyte recovery and blanks for the actual liquid and container.',
    'protein-diaphragm-pumps': 'Supply auxiliary buffer and washing branches in protein workflows; evaluate any delivery into a pressurized separation path as a separate pump requirement.',
    'protein-fluidic-valves': 'Separate low-pressure buffer selection from pressurized separation switching, comparing valve states, shared-volume displacement and arrival of the new composition.',
    'protein-fluid-monitoring': 'Use bubble and pressure signals with controller records of protein samples, buffers and separation stages; assess analyte recovery through the analytical method.',
    'protein-fluidic-connections': 'Evaluate protein-contact tubing and fittings as part of the complete flow path, checking target recovery, shared volume and material contact with actual formulations.',
    'bio-process-syringe-pumps': 'Plan discrete experimental feeding and sampling with syringe pumps, budgeting working volume, refill timing and liquid consumed by sample-path renewal.',
    'bio-process-valveless-pumps': 'Compare valveless pumps for experimental feed branches using actual medium and load, with separate checks of time-window flow, cumulative volume and restart.',
    'bio-process-fluidic-valves': 'Route experimental feeding, sampling and maintenance paths, distinguishing selector-valve connections from tubing shutoff and defining discard and product destinations.',
    'bio-process-fluid-monitoring': 'Provide local pressure and bubble signals for controller event records during experimental feeding and sampling; verify actual volume and sample representativeness separately.',
    'bio-process-fluidic-connections': 'Connect experimental feed, sample and waste branches with wetted materials suited to formulation and duration, then recheck sealing and priming after maintenance.',
  },
  'lab-automation': {
    'sample-prep-syringe-pumps': 'Organize fixed-path preparation with syringe pumps, accounting for source selection, receiver position, refills and shared-path cleaning across the workflow.',
    'sample-prep-pipetting-pumps': 'Configure disposable-tip preparation steps around liquid class, motion and sample vessels, distinguishing the material retained during transfer, dilution and separation.',
    'sample-prep-diaphragm-pumps': 'Supply shared preparation wash stations and remove suitable aerated waste, checking concurrent demand, incoming-liquid peaks and full-container interlocks.',
    'sample-prep-fluidic-valves': 'Select sources, stations and maintenance outlets in fixed-path preparation platforms, tying valve positions to sample identity and shared-liquid displacement.',
    'sample-prep-fluid-monitoring': 'Provide branch pressure and bubble signals for controller review of source, station and delivery stage, with distinct recovery rules for partial and completed transfers.',
    'sample-prep-fluidic-connections': 'Connect preparation stations and shared resources, identifying wetted sections and checking sealing, priming and actual delivery after module replacement.',
    'pipetting-piston-pumps': 'Compare piston pumps for fixed-probe pipetting by working stroke, system-liquid or direct-contact layout, receiver geometry and delivered volume.',
    'pipetting-syringe-pumps': 'Drive fixed-probe aspiration and dispensing with syringe pumps, coordinating system liquid, valve position, probe motion and internal versus external washing.',
    'pipetting-air-displacement-pumps': 'Match air-displacement pipetting pumps to disposable tips, seals and liquid programs, including air gaps and retained volume when dispensing repeatedly from one aspiration.',
    'pipetting-probes': 'Configure fixed pipetting probes around source level, container access, droplets and internal/external washing, coordinated with the metering drive and motion.',
    'pipetting-fluid-monitoring': 'Use bubble and pressure signals at compatible tubing locations with controller records of source, destination and completed doses; verify actual delivery separately.',
    'pipetting-fluidic-connections': 'Define wetted tubing and shared volume for fixed-probe pipetting, and assess air-channel sealing separately for disposable-tip architectures.',
    'microplate-syringe-pumps': 'Meter microplate doses with syringe branches, coordinating valves, dispensing heads and well order while checking channels, first/last wells and refill recovery.',
    'microplate-diaphragm-pumps': 'Coordinate microplate wash supply and suitable aerated-waste aspiration, measuring per-well delivery and residue alongside manifold load and peak incoming liquid.',
    'microplate-fluidic-valves': 'Time microplate supply and drainage valves with pumps and wash heads, distinguishing independent branches from common manifolds and simultaneous demand.',
    'microplate-probes': 'Set microplate wash-probe geometry and aspiration height for the actual plate, checking residual liquid, wash coverage and method-required solid-phase retention.',
    'microplate-fluid-monitoring': 'Provide branch bubble and pressure signals for controller association with microplate tasks and potentially affected wells; assess local delivery independently.',
    'microplate-fluidic-connections': 'Build microplate supply and aspiration networks with defined shared and independent branches, checking bore, length and fitting differences against per-well delivery.',
    'reagent-dispensing-syringe-pumps': 'Plan batch aspiration and repeated syringe dispensing from usable stroke, valve states and receiver identity, measuring first, middle and last doses separately.',
    'reagent-dispensing-valveless-pumps': 'Evaluate valveless reagent dispensing under the actual formulation and load, separating individual-dose tests from time-window flow and cumulative-volume checks.',
    'reagent-dispensing-fluidic-valves': 'Coordinate reagent source selection and outlet shutoff with priming, bottle changes and receiving vessels, including residual droplets and post-stop delivery.',
    'reagent-dispensing-fluid-monitoring': 'Combine supply-line bubble and pressure signals with controller delivery records to distinguish unstarted, partial and completed reagent doses before recovery.',
    'reagent-dispensing-fluidic-connections': 'Connect reagent sources and outlets with formulation-compatible tubing and fittings, checking priming, standby first doses and recovery after replacement.',
    'system-integration-syringe-pumps': 'Integrate finite-stroke metering stations with platform records of source, receiver and replenishment state, so completed liquid delivery can be distinguished from commands.',
    'system-integration-pipetting-pumps': 'Coordinate air-displacement stations with platform scheduling, tip handling and motion while preserving channel, consumable and destination-vessel identity.',
    'system-integration-diaphragm-pumps': 'Integrate shared wash supply and suitable aerated-waste removal with station loads, concurrent inflow, resource occupancy and platform fault interlocks.',
    'system-integration-fluidic-valves': 'Connect shared platform resources through selector and on/off valve paths, defining resource locks, renewal volume, isolation and destinations after power loss.',
    'system-integration-fluid-monitoring': 'Feed branch pressure and bubble signals into workstation control alongside task and delivery records, keeping communication, motion and liquid results distinct.',
    'system-integration-fluidic-connections': 'Connect modular workstations, sources, wash stations and waste paths with clear routing, then validate sealing, priming and delivery after assembly or replacement.',
  },
  'analytical-instruments': {
    'spectroscopy-syringe-pumps': 'Prepare spectroscopy samples, dilutions and internal standards with separate syringe-metered volumes, distinguishing preparation from continuous introduction flow.',
    'spectroscopy-valveless-pumps': 'Assess valveless pumps for auxiliary spectroscopy liquid supply at the actual matrix and introduction-end load, checking flow and analytical-signal recovery.',
    'spectroscopy-fluidic-valves': 'Switch spectroscopy samples, standards, blanks and wash liquids while accounting for shared volume, composition renewal and recovery of the analytical blank.',
    'spectroscopy-probes': 'Match spectroscopy sampling probes to liquid matrices, low source volumes and rinse sequences, evaluating tip materials and residue with complete method blanks.',
    'spectroscopy-fluid-monitoring': 'Provide pressure and bubble signals in compatible spectroscopy supply branches for controller association with source and measurement window; verify analytical response separately.',
    'spectroscopy-fluidic-connections': 'Connect spectroscopy samples and standards to instrument interfaces, selecting materials for acid/salt matrices and evaluating shared volume and signal-arrival delay.',
    'water-quality-piston-pumps': 'Meter water samples and reagents inside analytical units with piston pumps, evaluating received volume, permitted sample matrices and actual arrival in the reaction sequence.',
    'water-quality-syringe-pumps': 'Coordinate syringe-metered water samples, standards and reagents with valves and mixing, measuring each branch volume and arrival time in the analysis sequence.',
    'water-quality-diaphragm-pumps': 'Supply in-cabinet water-analysis wash and auxiliary branches at their installed operating points, accounting for valves and wash-head load separately from field sampling.',
    'water-quality-fluidic-valves': 'Route samples, reagents, washing and maintenance inside water analyzers, with defined discharge for old liquid before the next measured reaction.',
    'water-quality-fluid-monitoring': 'Provide in-cabinet pressure and bubble signals for controller review of water-sample dosing and measurement stages; use path and method checks to establish recovery.',
    'water-quality-fluidic-connections': 'Build in-cabinet water-analysis paths with method-permitted filtration, checking analyte retention, pressure drop, shared volume and the first reaction after maintenance.',
    'sample-prep-syringe-pumps': 'Prepare analytical dilutions through fixed syringe paths, measuring sample, diluent and additive delivery before evaluating mixed composition and subsequent sampling.',
    'sample-prep-pipetting-pumps': 'Transfer analytical samples or liquid phases with disposable tips, defining retained and discarded fractions before assessing recovery and phase carryover.',
    'sample-prep-fluidic-valves': 'Route samples, solvents, wash liquid and products through fixed preparation paths, matching valve states and flushing destinations to the fraction retained at each step.',
    'sample-prep-fluidic-connections': 'Evaluate analytical preparation tubing, fittings and method-specified filters for analyte recovery, adsorption, blanks, pressure drop and post-maintenance first samples.',
    'lab-analyzer-piston-pumps': 'Integrate piston-driven sample, standard and reagent metering with valve states and measurement windows, checking working stroke, actual arrival and first-cycle recovery.',
    'lab-analyzer-syringe-pumps': 'Coordinate syringe aspiration, holding and sequential delivery with analyzer source selection, shared volume, refill timing and method state records.',
    'lab-analyzer-valveless-pumps': 'Supply method-compatible carrier liquid or auxiliary reagent with valveless pumps, assessing backpressure, arrival time, flow trends and blank recovery.',
    'lab-analyzer-diaphragm-pumps': 'Integrate analyzer wash, replenishment, circulation and suitable aerated-waste branches around actual loads, concurrent demand and waste-container interlocks.',
    'lab-analyzer-fluidic-valves': 'Coordinate analytical source selection and branch isolation with measurement windows, verifying new-liquid arrival, residue clearance and fault-state destinations.',
    'lab-analyzer-fluid-monitoring': 'Use pressure and bubble signals with controller records of analytical sources, actions and measurement windows, evaluating fault detection and method recovery separately.',
    'lab-analyzer-fluidic-connections': 'Connect analytical modules with defined independent and shared paths, checking priming, leaks, arrival delay and method blanks after installation or repair.',
  },
  'environmental-monitoring': {
    'water-quality-diaphragm-pumps': 'Transport field water samples or flush separate branches with suitable liquid diaphragm pumps, verifying lift, particle conditions, sample renewal and representativeness.',
    'water-quality-fluidic-valves': 'Select field water-sampling, flushing and maintenance paths, verifying old-sample discharge and fresh-sample arrival before analysis resumes.',
    'water-quality-fluid-monitoring': 'Provide field liquid-path pressure and bubble signals for controller review of supply, blockage and flushing states; verify sample renewal before releasing measurements.',
    'water-quality-fluidic-connections': 'Connect field sampling points to analysis with method-permitted filtration and backflow protection, evaluating lift, tubing volume and target preservation at the receiver.',
    'wastewater-diaphragm-pumps': 'Evaluate wastewater transfer or flushing pumps against actual particles, viscosity, temperature, corrosion and lift, comparing sample condition before and after transport.',
    'wastewater-fluidic-valves': 'Route wastewater samples and maintenance liquids through selector and on/off branches, checking backflush destinations and fresh-sample replacement before measurement.',
    'wastewater-fluid-monitoring': 'Use wastewater branch pressure and bubble signals with controller maintenance records to investigate supply changes; check received samples and first analyses after recovery.',
    'wastewater-fluidic-connections': 'Build wastewater sampling paths for the specified analyte fraction, assessing method-permitted filtration, deposition, pressure drop and maintenance access.',
    'gas-pretreatment-diaphragm-pumps': 'Separate suitable sample-gas or gas-liquid aspiration from absorbent-liquid supply, checking inlet medium, gas tightness, condensate drainage and analytical composition.',
    'gas-pretreatment-fluidic-valves': 'Control sample-gas or condensate tubing branches with pinch configurations matched to vacuum, drainage cycles, open-path resistance and closed-state leakage.',
    'gas-pretreatment-fluidic-connections': 'Keep sample-gas, condensate and absorbent-liquid paths distinct, evaluating gas-compatible protection, vacuum sealing, pressure drop and target-composition changes.',
    'sampling-prep-syringe-pumps': 'Aliquot and dilute environmental samples through fixed syringe paths, including preservation state, particle distribution and shared residue in ratio and recovery checks.',
    'sampling-prep-pipetting-pumps': 'Prepare environmental samples with disposable tips, retaining source-container, sampling-time and receiver records while checking mixed aliquots and carryover.',
    'sampling-prep-fluidic-valves': 'Select environmental sample, diluent and wash sources in fixed preparation paths, coordinating metering while keeping sample receivers and waste destinations distinct.',
    'sampling-prep-fluidic-connections': 'Match environmental preparation tubing and method-specified filtration to the analyte fraction, checking target recovery, blanks, pressure drop and replacement recovery.',
    'system-integration-diaphragm-pumps': 'Integrate online-monitor sampling and flushing pumps by branch medium, distance, lift and duration, then verify the installed load and simultaneous demand.',
    'system-integration-fluidic-valves': 'Coordinate online-monitor sample, wash and bypass routing with pump control and measurement status, defining destinations during operation, faults and maintenance.',
    'system-integration-fluid-monitoring': 'Provide liquid-path pressure and bubble signals for controller association with source, valve and maintenance state; confirm path recovery before the next valid measurement.',
    'system-integration-fluidic-connections': 'Connect field sampling, pretreatment and analysis with defined protective locations and service access, rechecking sealing, target retention and sample refresh after maintenance.',
  },
  'synthetic-biology': {
    'micro-bioreactor-syringe-pumps': 'Meter microbioreactor feed pulses and discrete samples with syringe branches, budgeting usable stroke, refill timing and liquid consumed by sampling and discard.',
    'micro-bioreactor-valveless-pumps': 'Evaluate repeated or continuous microbioreactor feeding under actual formulation and backpressure, checking time-window flow, cumulative additions and bottle-change recovery.',
    'micro-bioreactor-diaphragm-pumps': 'Assess suitable gas-containing waste aspiration for microbioreactors using actual biomass, foam and peak inflow, with sealing and isolation checked after maintenance.',
    'micro-bioreactor-fluidic-valves': 'Route microbioreactor feeding, sampling and maintenance with source-selection or tubing-control configurations, defining culture identity, discard destinations and isolation.',
    'micro-bioreactor-fluid-monitoring': 'Provide local pressure and bubble signals for controller records of microbioreactor feed, sampling and waste events; evaluate culture condition with process measurements.',
    'micro-bioreactor-fluidic-connections': 'Connect microbioreactor feed, culture and sample branches using formulation, temperature and run duration, including shared-path renewal in the process-volume budget.',
    'biofoundry-syringe-pumps': 'Dispense biological reagents through fixed biofoundry syringe branches, matching vessel or well identity with standby, first-dose and replenishment requirements.',
    'biofoundry-pipetting-pumps': 'Transfer biofoundry samples, enzyme solutions and culture formulations with disposable tips, linking platform records of constructs, strains, reagents and destination wells.',
    'biofoundry-diaphragm-pumps': 'Supply actual biofoundry shared wash stations and auxiliary reservoirs, coordinating plate-station demand separately from metered biological-reagent delivery.',
    'biofoundry-fluidic-valves': 'Select biofoundry reagent sources and receivers in fixed paths, coordinating task interlocks, destination wells and flushing after shared-path switching.',
    'biofoundry-fluid-monitoring': 'Provide branch pressure and bubble signals for controller review of biofoundry reagent sources, wells and delivery status, avoiding duplicate dosing during recovery.',
    'biofoundry-fluidic-connections': 'Connect biofoundry fixed stations and shared resources, assessing sample changes, maintenance and restart against carryover and experimental results.',
    'feeding-control-syringe-pumps': 'Compare finite-stroke and alternating syringe feed architectures by refill pauses, valve switching and recovery, using the process limit for allowable no-flow intervals.',
    'feeding-control-valveless-pumps': 'Evaluate extended valveless feeding with actual medium and backpressure, measuring time-window flow and cumulative volume through bottle changes, stops and restarts.',
    'feeding-control-fluidic-valves': 'Coordinate feed-formulation selection and tubing shutoff with priming, bottle changes and maintenance, verifying new-medium arrival and complete-path isolation.',
    'feeding-control-fluid-monitoring': 'Provide feed-line pressure and bubble signals alongside controller delivery records; the process program determines whether and how an interrupted feed may be compensated.',
    'feeding-control-fluidic-connections': 'Configure extended feed paths and backflow protection around formulation contact, culture-side backpressure, added resistance and bottle-change arrival delay.',
    'online-sampling-syringe-pumps': 'Withdraw and transfer defined process samples with syringe pumps, recording sample volume, path-refresh discard and any permitted return separately.',
    'online-sampling-fluidic-valves': 'Route process samples to analysis or discard and control sampling tubing, accounting for sample time, shared-path renewal and contamination-control boundaries.',
    'online-sampling-fluid-monitoring': 'Provide pressure and bubble signals for controller association with sampling intervals and transfer stages; verify received volume, refresh time and representativeness separately.',
    'online-sampling-fluidic-connections': 'Connect process sampling to analysis with method-appropriate particle handling, preserving the required cell, biomass or dissolved fraction through the complete path.',
    'bio-process-integration-syringe-pumps': 'Coordinate discrete bioprocess feeds and samples with vessel and refill records, reconciling confirmed delivery and unfinished actions before restart.',
    'bio-process-integration-valveless-pumps': 'Integrate extended feed branches with process-stage control, recording time-window flow, cumulative material and recovery after interruption under actual operating conditions.',
    'bio-process-integration-diaphragm-pumps': 'Integrate suitable gas-containing bioprocess waste aspiration with biomass, foam and waste-vessel conditions, including blockage and maintenance recovery in system interlocks.',
    'bio-process-integration-fluidic-valves': 'Coordinate multiple feed, sampling and maintenance paths with culture-vessel identity and interlocks, verifying fault destinations and isolation after module replacement.',
    'bio-process-integration-fluid-monitoring': 'Provide branch pressure and bubble signals to bioprocess control, which reconciles vessel state, cumulative material and unfinished actions before resuming.',
    'bio-process-integration-fluidic-connections': 'Connect culture, feed, sampling and waste modules for actual temperature and duration, rechecking routing, seals and contamination boundaries after disassembly.',
  },
};

type OperationReview = { conditions: string; acceptance: string; fault: string };
type PistonReview = {
  checks: readonly (readonly [string, string])[];
  operations?: Readonly<Record<string, OperationReview>>;
  outcome: string;
  configuration?: Readonly<Record<string, string>>;
};

const pistonReviews: Readonly<Record<string, PistonReview>> = {
  'ivd/clinical-piston-pumps': {
    checks: [
      ['Working stroke', 'Budget sample and reagent doses separately, including any system-liquid, priming and refill displacement required by each probe cycle.'],
      ['Liquid contact and pressure', 'Identify which parts contact sample, reagent or system liquid, and specify the pressure and receiving cuvette for each valve state.'],
      ['Delivery and recovery', 'Measure cuvette receipt after low-source-volume aspiration, idle periods, bottle changes and washing; assess carryover separately from volume error.'],
    ],
    operations: {
      'Sample aspiration and transfer': {
        conditions: 'Method-permitted sample type, actual dose, remaining source volume, probe position, aspiration/dispensing program and direct-contact or system-liquid architecture',
        acceptance: 'Measure received sample volume over the working range and after idle. Assess the sample-change sequence with high/low concentrations and washing, separately from volume calibration.',
        fault: 'Air aspiration, sample particles or clots, probe-wall contact, leakage and shared-path residue can change delivery or the next sample; distinguish volume error from carryover.',
      },
      'Metered reagent dispensing': {
        conditions: 'Actual reagent formulation, dose, doses per fill, refill and bottle-change windows, backpressure and reaction-cuvette position',
        acceptance: 'Measure first, middle and last reagent doses and the first dose after refilling or bottle changes. Confirm actual cuvette receipt and timing before retrying an interrupted addition.',
        fault: 'An empty source, bubbles, probe droplets or a changed load can affect a dose; repeating a partly completed command can also add reagent twice to the same cuvette.',
      },
    },
    outcome: 'Evaluate sample delivery, reagent delivery and carryover at the reaction cuvette. A correct pump displacement does not establish the received volume or recovery after washing.',
  },
  'ivd/immunoassay-piston-pumps': {
    checks: [
      ['Working stroke', 'Set working sample or reagent doses for the fixed-probe architecture, including priming and replenishment displacement within the reaction schedule.'],
      ['Liquid contact and pressure', 'Map the sample-contact or system-liquid path, probe interface and pressure states; identify surfaces included in the probe-wash sequence.'],
      ['Delivery and recovery', 'Compare received volume and probe droplets through aspiration, delivery and washing, including the next container after a concentrated sample.'],
    ],
    operations: {
      'Sample addition with a fixed probe': {
        conditions: 'Method-permitted sample, working dose, source level, fixed-probe geometry, liquid-contact architecture and the complete sampling/washing sequence',
        acceptance: 'Measure sample received in the reaction vessel, then assess carryover through the fixed-probe wash sequence. Check first delivery after idle and recovery after concentrated samples.',
        fault: 'Air aspiration, leakage, probe-wall contact or retained droplets can affect received volume and contaminate the next container; investigate dose error and carryover separately.',
      },
    },
    outcome: 'Verify actual sample or reagent addition through the fixed probe and assess carryover after washing with the assay. Magnetic capture and bead-wash performance belong to the separate washing operation.',
  },
  'ivd/hematology-piston-pumps': {
    checks: [
      ['Working stroke', 'Define the whole-blood sampling dose and any reagent task separately, accounting for the usable stroke and replenishment needed by the actual architecture.'],
      ['Liquid contact and pressure', 'Map the blood-contact or system-liquid path, probe position and pressure states together with sample mixing and the source volume remaining.'],
      ['Delivery and recovery', 'Check repeated sampling with actual whole-blood conditions, low source volume and probe washing. Verify the delivered sample volume separately from the later dilution ratio.'],
    ],
    operations: {
      'Whole-blood sampling and delivery': {
        conditions: 'Whole-blood condition and mixing, sampling dose, time between repeated aspirations, remaining source volume, probe position and actual metering architecture',
        acceptance: 'Compare received sample volumes through repeated whole-blood sampling at normal and low source levels. Check sample changes and wash recovery, then validate the subsequent dilution ratio separately.',
        fault: 'Changes in sample condition, particles or clots, air aspiration, probe-wall contact or leakage can affect sampling. Use the actual sample and channel state when investigating an abnormal result.',
      },
    },
    outcome: 'Assess whole-blood sampling and recovery across the complete sample sequence. Metered sample volume, subsequent dilution ratio and detection-channel recovery are separate acceptance results.',
  },
  'ivd/coagulation-piston-pumps': {
    checks: [
      ['Working stroke', 'Use assay-specified sample and reagent volumes, with any priming and replenishment fitted into the permitted addition sequence.'],
      ['Liquid contact and pressure', 'Identify the sample-contact or system-liquid interface, probe outlet and reaction-cuvette geometry for each pressure and valve state.'],
      ['Delivery and recovery', 'Measure received volume and liquid-arrival time at the reaction position, including idle recovery and the first dose after washing.'],
    ],
    operations: {
      'Assay-specified sample delivery': {
        conditions: 'Assay-permitted sample and dose, probe/cuvette position, system-liquid interface where present, actual liquid-arrival time and the reaction trigger sequence',
        acceptance: 'Measure sample volume at the reaction cuvette and distinguish motor completion, liquid leaving the probe and actual arrival. Assess timing and post-wash residue with the assay.',
        fault: 'Air aspiration, leakage, probe droplets, wall contact or delayed arrival may alter volume or reaction timing; a completed motion does not confirm a valid reaction start.',
      },
    },
    outcome: 'Evaluate received volume, liquid arrival and trigger timing together at the reaction site. Use the assay to assess first-dose recovery and the effect of any wash-liquid residue.',
  },
  'lab-automation/pipetting-piston-pumps': {
    checks: [
      ['Working stroke', 'Budget the fixed-probe transfer or dispensing sequence, including usable stroke, any system-liquid displacement and the permitted refill window.'],
      ['Liquid contact and pressure', 'Define the fixed probe, its actual sample-contact or system-liquid path, source/receiver geometry and valve-state pressures.'],
      ['Delivery and recovery', 'Measure actual receipt at each intended vessel or well with the fixed probe, including low source volume, idle periods, refills and internal/external probe washing.'],
    ],
    outcome: 'Measure fixed-probe delivery with the actual liquids and receiving vessels or wells, including idle periods, refills and repeated dispensing. Evaluate probe washing and carryover through the complete sequence; disposable-tip handling is a separate architecture.',
  },
  'analytical-instruments/water-quality-piston-pumps': {
    checks: [
      ['Working stroke', 'Budget the water-sample and reagent doses, shared-path renewal and refill displacement for the actual in-cabinet analysis cycle.'],
      ['Liquid contact and pressure', 'Specify the method-permitted water matrix and actual metering path, including particle conditions, wetted materials and pressures at each valve state.'],
      ['Delivery and recovery', 'Measure volume received at the analytical vessel and actual reagent arrival; assess blanks, method recovery and the first reaction after washing or maintenance.'],
    ],
    configuration: {
      'configuration-1': 'Piston displacement meters water samples or reagents in the analytical unit. Identify which liquid contacts the pump head and whether the installed design uses direct sample contact or a system-liquid interface. Map aspiration, delivery and refill states, then measure the volume reaching the analytical vessel.',
      'configuration-2': 'Coordinate source selection, metering stroke and the receiving reaction step. Include path renewal and refilling in the cycle budget, with defined destinations for displaced sample and wash liquid. After changing the pump, tubing or fittings, recheck received volume and actual arrival against the measurement sequence.',
    },
    operations: {
      'Sample metering': {
        conditions: 'Method-permitted water matrix, particle and salt conditions, sample dose, actual intake and receiving geometry, shared volume and sample-renewal state inside the analyzer',
        acceptance: 'Measure sample volume at the analytical receiver using representative permitted water matrices. Assess sample changes, blanks and method recovery, separately from field-line sample transit and refresh.',
        fault: 'Particles, settling, air entry, shared-path residue or incomplete sample renewal can change the delivered aliquot or its composition. Inspect the actual intake and metering path rather than assuming a probe or system-liquid design.',
      },
      'Metered reagent addition and reaction timing': {
        conditions: 'Reagent formulation and working dose, addition order, actual arrival delay, mixing interval and the method measurement trigger',
        acceptance: 'Measure reagent receipt and arrival time at the reaction vessel, then assess the complete reaction, blank and recovery according to the method.',
        fault: 'Residual wash liquid, delayed arrival, outlet droplets or inadequate mixing can change reaction initiation or composition even when the commanded volume is correct.',
      },
    },
    outcome: 'Assess sample and reagent volumes, actual arrival, blanks and recovery in the water-analysis method. Where filtration is used, verify the fraction measured; field-sample transport remains a separate task.',
  },
  'analytical-instruments/lab-analyzer-piston-pumps': {
    checks: [
      ['Working stroke', 'Define sample, standard and reagent tasks separately, with working doses, auxiliary displacement and refill windows for each method cycle.'],
      ['Liquid contact and pressure', 'Map each source, valve state and receiving interface, including the actual direct-contact or system-liquid arrangement and pressure exposure.'],
      ['Delivery and recovery', 'Measure received volume and arrival relative to the analytical window, then verify blanks and the first valid method result after switching or maintenance.'],
    ],
    outcome: 'Verify discrete delivery and actual liquid arrival against the analytical method window. After switching, interruption or maintenance, reconcile completed additions before repeating a command and assess blank and method recovery separately.',
  },
};

function replaceTableRows(block: Extract<ApplicationBlock, { type: 'table' }>, rows: readonly (readonly string[])[]): ApplicationBlock {
  const content = [block.caption, ...block.headers, ...rows.flat(), block.note ?? ''].join('\n');
  return { ...block, rows, ...(block.inlineLinks ? { inlineLinks: block.inlineLinks.filter(link => content.includes(link.text)) } : {}) };
}

/** Refine already-translated English product overviews without changing ancestry or resources. */
export function refineEnglishProducts(document: ApplicationDocument, kind: EnglishApplicationKind): ApplicationDocument {
  if (document.reviewContext?.level !== 'product') return document;
  if (kind === 'life-science' && document.slug === 'protein-pipetting-pumps') document = {
    ...document,
    sections: document.sections.map(section => section.id !== 'configuration-2' ? section : {
      ...section,
      blocks: section.blocks.map(block => block.type === 'paragraph'
        ? { ...block, text: block.text.replace('recovering nucleic-acid eluate', 'recovering the protein-containing fraction') }
        : block),
    }),
  };
  const description = descriptions[kind]?.[document.slug];
  const review = pistonReviews[`${kind}/${document.slug}`];
  if (!description && !review) return document;
  if (!review) return { ...document, description: description ?? document.description };
  const sections = document.sections.map(section => ({
    ...section,
    blocks: section.blocks.map((block): ApplicationBlock => {
      if (block.type === 'paragraph' && review.configuration?.[section.id]) {
        return { ...block, text: review.configuration[section.id], inlineLinks: undefined };
      }
      if (section.id === 'acceptance' && block.type === 'paragraph') {
        return { ...block, text: review.outcome, inlineLinks: undefined };
      }
      if (block.type !== 'table') return block;
      if (section.id === 'working-conditions' && block.headers[0] === 'Condition') return replaceTableRows(block, review.checks);
      if (!review.operations || !['working-conditions', 'acceptance'].includes(section.id)) return block;
      const rows = block.rows.map(row => {
        const operation = review.operations?.[row[0]];
        if (!operation) return row;
        return section.id === 'working-conditions'
          ? [row[0], operation.conditions]
          : [row[0], operation.acceptance, operation.fault];
      });
      return replaceTableRows(block, rows);
    }),
  }));
  return { ...document, description: description ?? document.description, sections };
}
