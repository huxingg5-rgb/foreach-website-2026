import type { ApplicationBlock, ApplicationDocument, ApplicationLink, ApplicationSection } from '@/data/applications/analytical-documents/types';
import type { EnglishApplicationKind } from '@/data/applications/application-english';

type TableRefinement = {
  caption: string;
  /** Keep the existing stage names and their relationship to the task sections. */
  details: readonly (readonly [string, string])[];
};
type SectionRefinement = {
  title?: string;
  paragraphs?: readonly string[];
  table?: TableRefinement;
  subheadings?: readonly string[];
};
type GuideRefinement = {
  description: string;
  contactDescription?: string;
  related?: readonly ApplicationLink[];
  intro?: readonly string[];
  sections: Readonly<Record<string, SectionRefinement>>;
};

const refinements: Readonly<Partial<Record<`${EnglishApplicationKind}/${string}`, GuideRefinement>>> = {
  'life-science/': {
    description: 'Compare fluidic components for nucleic acid, cell and protein workflows, with selection based on liquid delivery, target recovery and contamination control.',
    sections: {
      'selection-order': {
        title: 'Choose the fluid path around the material the experiment must retain',
        paragraphs: ['Start with the biological material and its receiving vessel: nucleic-acid eluate, a cell suspension and a protein fraction require different handling. Mark which fractions remain in the experiment and which go to waste before selecting metering drives, source-selection valves and wetted materials. Compare delivered volume alongside target recovery, cell condition or adsorption through the complete path. A repeatable buffer dose alone does not establish that the transferred biological material remains suitable for the next step.'],
      },
    },
  },
  'lab-automation/': {
    description: 'Select fluidic components for pipetting, microplate washing and reagent dispensing by working volume, shared resources, cycle timing and restart conditions.',
    sections: {
      'selection-order': {
        title: 'Match each workstation action to its container, timing and shared resources',
        paragraphs: ['Define the liquid operation at each workstation before choosing its pump: disposable-tip transfer, fixed-probe metering, well washing and waste aspiration have different interfaces and timing. Record the source, destination, working volume and container position together with any shared pump, valve or wash station. Check whether concurrent tasks compete for that resource and whether washing or refill fits the cycle. After an interruption, the controller needs the actual delivery state and container identity before it can choose to resume, repeat or discard an operation.'],
      },
    },
  },
  'environmental-monitoring/': {
    description: 'Select fluidic components for field sampling and online monitoring by sample renewal, permitted treatment, installed loads and maintenance recovery.',
    sections: {
      'selection-order': {
        title: 'Follow the field sample to the measurement interface',
        paragraphs: ['Begin at the sampling point and define what must reach the analytical unit: the method-required fraction of a water sample, a complex wastewater matrix or the conditioned sample gas. Set the transport distance, installed suction and discharge conditions, sample-renewal requirement and maintenance route before comparing drives. Filtration must preserve the fraction required by the method. Keep sample-gas transfer, condensate drainage and absorbent-liquid delivery as separate duties, then verify sample arrival and the first valid measurement after flushing or service.'],
      },
    },
  },
  'synthetic-biology/': {
    description: 'Configure fluidic components for culture feeding, biofoundry operations and process sampling, accounting for cumulative volumes, sample identity and restart.',
    sections: {
      'selection-order': {
        title: 'Define additions, withdrawals and allowed interruptions for the process',
        paragraphs: ['Use the culture vessel or screening well as the starting point. Define each feed profile, sampling withdrawal and path-renewal discard, then include them in the volume record over the operating period. Select discrete metering or continuous supply according to the required delivery pattern and permissible interruption, with valves and connections keeping feed, sample, wash and waste destinations distinct. Bubble and pressure signals support controller decisions about fluidic events; culture condition and the complete contamination-control boundary require their own process checks.'],
      },
    },
  },
  'life-science/guide-bio-process': {
    description: 'Plan feeding and repeated sampling for life science experiments around delivered volume, sample representativeness and the effect on experimental results.',
    contactDescription: 'Share the culture or reaction volume, actual media, addition schedule, sampling and discard volumes, and the result to be measured. Include the retained fraction and cleaning requirements so we can compare configurations for your experiment.',
    related: [
      { label: 'Continuous feeding: delivery profiles, interruptions and cumulative volume', href: '/en/applications/synthetic-biology/guide-feeding-control/' },
      { label: 'Online process sampling: representativeness and contamination control', href: '/en/applications/synthetic-biology/guide-online-sampling/' },
      { label: 'Bioprocess integration: coordinated feeds, sampling and restart', href: '/en/applications/synthetic-biology/guide-bio-process-integration/' },
    ],
    intro: ['In repeated culture or reaction experiments, adding medium or an inducer changes the experimental conditions, while sampling removes material from the vessel. Define each addition and withdrawal against the experimental time point, the material to retain and the result being measured. Evaluate those operations through the receiving sample and the remaining culture; extended process control and system integration are addressed in the synthetic biology guides.'],
    sections: {
      'fluid-path': {
        paragraphs: ['Mark the feed source, experimental vessel, sample receiver and discard path separately. Include sampling-line renewal and drainage in the withdrawn volume, so a small analytical sample is not mistaken for the entire disturbance to the experiment. Select wetted materials and the cleaning or sterilization procedure for the complete path that contacts the culture or collected sample.'],
      },
      'working-conditions': {
        table: {
          caption: 'Define additions and withdrawals against the experimental objective',
          details: [
            ['Experimental additions', 'Medium, inducer or adjustment liquid; intended addition time and delivered volume; vessel volume; mixing or equilibration required before the next experimental observation'],
            ['Repeated collection of an interpretable sample', 'Target cells, particles or dissolved analyte; sampling position and interval; path-renewal discard; receiving volume; permitted pretreatment and handling before analysis'],
            ['Preparation for the next experimental operation', 'Whether culture, collected sample or waste contacts the serviced path; cleaning-liquid destination; actual inlet condition for drainage; sealing, priming and contamination checks before reuse'],
          ],
        },
      },
      'task-feeding': {
        paragraphs: ['For medium, inducer or adjustment-liquid additions, specify why the experiment needs the addition and when the resulting sample will be assessed. Select a drive for the actual dose or delivery pattern, then verify liquid received by the vessel. Record the addition with the experimental time point; correct delivered volume does not by itself establish adequate mixing or the intended biological response.'],
      },
      'task-sampling': {
        paragraphs: ['Choose the sampling point and handling sequence for what the assay must measure: cells or particles may need to remain in the sample, while another method may require a separated liquid fraction. Refresh stagnant liquid before collection as required by the sampling method, and include that discard in the experimental volume budget. Compare collected samples with the source where practical to assess settling, adsorption or old-sample mixing.'],
      },
      'task-waste': {
        paragraphs: [
          'Keep cleaning liquid and discarded samples out of the culture and product-receiving paths. Select supply, liquid drainage or gas-containing aspiration according to the actual incoming medium, including cells, biomass or foam where present.',
          'After servicing a connection or replacing a component, recheck assembly, sealing and priming. Establish whether the interruption or maintenance changed the next sample, its collection time or the contamination-control boundary before using it to interpret the experiment.',
        ],
      },
      'validation': {
        paragraphs: [
          'Record actual additions, collected samples and discarded volumes alongside the experimental time points. Evaluate delivery separately from the biological or analytical result so that a changed outcome can be traced to the liquid operation, sampling method or experiment itself.',
          'A repeatable dose establishes one part of the experimental operation. Sample representativeness, mixing and contamination control need checks appropriate to the culture or reaction method.',
        ],
        table: {
          caption: 'Check whether fluid handling preserves an interpretable experimental result',
          details: [
            ['Measure the volume received for the intended addition pattern and record its timing; evaluate mixing and the subsequent experimental response separately.', 'Check the actual source, residual liquid, incomplete delivery and timing before attributing a changed result to the formulation or biological response.'],
            ['Record collected and discarded volumes; compare the intended target fraction in the collected sample with the source using the experimental method.', 'Investigate old-sample mixing, settling, adsorption and unintended loss of cells or analyte during pretreatment.'],
            ['Check sealing, priming, residual cleaning liquid and the next collected sample after servicing, using the contamination checks required by the experiment.', 'A restored pump action does not show that the sample is unchanged; review maintenance contact, changed collection timing and any uncertain sample history.'],
          ],
        },
      },
      'questions': {
        subheadings: [
          'Must sampling discard be included in the experimental volume record?',
          'Can the next experimental sample be accepted immediately after maintenance?',
        ],
        paragraphs: [
          'Include the collected sample, path-renewal discard and other withdrawals. Compare the total with the culture or reaction volume and the experiment\'s sampling plan, then check that the received fraction represents the intended target.',
          'First verify assembly, sealing, priming and the contamination-control boundary. Record any changed sample timing or uncertain liquid history before interpreting the next result. See the synthetic biology guides for extended-run control and interruption handling.',
        ],
      },
    },
  },
  'lab-automation/guide-system-integration': {
    description: 'Coordinate robots, pumps and valves through shared-resource states, container identity and verified delivery, including recovery from interrupted dispensing.',
    sections: {
      'working-conditions': {
        table: {
          caption: 'Define workstation resources and delivery states before scheduling actions',
          details: [
            ['Shared pumps, valves, wash stations and waste paths', 'Active sample and receiving container; resources reserved by each action; allowed concurrency; valve and motion confirmations; when resources can be released'],
            ['Module identity and the installed liquid path', 'Controller address and module identity; source-to-outlet tubing direction; interfaces, materials and installed pressure; priming sequence and the first working-volume check after reconnection'],
            ['Recovery at a known dispensing stage', 'Interruption before, during or after delivery; current container and resource occupancy; measured, estimated or unknown delivered volume; conditions for resuming, discarding or repeating'],
          ],
        },
      },
      'validation': {
        table: {
          caption: 'Test the workstation sequence at the receiving container',
          details: [
            ['Run tasks that request the same resources, including interrupted actions; check that reservations, sample identities and actual receiving locations remain consistent.', 'A resource released too early or a stale container position can direct a later operation to the wrong sample even when individual commands succeed.'],
            ['After module replacement, verify physical routing and sealing, prime the path and measure the first intended transfer at its receiver.', 'A correct module address does not confirm tube direction, priming or delivery; investigate these before changing a metering program.'],
            ['Interrupt dispensing before delivery, partway through and after completion. Compare recorded state with the liquid received and verify the permitted resume or discard action.', 'Retain uncertainty when delivery cannot be established. Repeating an unverified command can add a second dose to the same container.'],
          ],
        },
      },
    },
  },
  'analytical-instruments/guide-lab-analyzer': {
    description: 'Coordinate sample, standard, reagent and wash paths with measurement timing, then verify delivered volume, blanks and response after switching or maintenance.',
    sections: {
      'working-conditions': {
        table: {
          caption: 'Specify each analytical branch in relation to the measurement window',
          details: [
            ['Sample, standard, wash and bypass selection', 'Source identity, valve position, shared volume, installed flow and sample-arrival delay; measurement-inhibition conditions during washing, switching and recovery'],
            ['Metering, continuous auxiliary supply and waste handling', 'Working dose and time window for metering; actual flow and fluctuation for continuous supply; inlet medium and peak accumulation for drainage; pressure in each connected state'],
            ['Connections that affect sample arrival and method response', 'Wetted materials, tubing dimensions, shared volume, seals and installed pressure; priming and replacement procedure; blank recovery and signal delay after servicing'],
          ],
        },
      },
      'validation': {
        table: {
          caption: 'Validate branch coordination through the complete analytical method',
          details: [
            ['Run the method-defined sample, standard and blank sequence through switching and washing; confirm arrival at the measurement interface before assigning a result to the new source.', 'Valve positioning alone does not establish sample replacement. Investigate shared-volume carryover, transport delay and an incorrectly timed measurement window.'],
            ['Measure doses at the receiver, continuous delivery over the relevant time window and waste accumulation during concurrent operations; assess detector response separately.', 'Pressure disturbances or shared supply can change a branch during combined operation. Trace the affected branch instead of applying one flow correction to the whole system.'],
            ['After replacement, check sealing and priming, then compare blank recovery, sample-arrival delay and method response through the complete path.', 'Leaks, trapped gas, changed shared volume or retained sample can affect results despite matching mechanical interfaces.'],
          ],
        },
      },
    },
  },
  'environmental-monitoring/guide-system-integration': {
    description: 'Coordinate online sampling, analysis and maintenance bypasses by sample renewal, installed pump loads and the conditions for releasing valid measurement data.',
    sections: {
      'working-conditions': {
        table: {
          caption: 'Connect field sampling and maintenance states to measurement availability',
          details: [
            ['Measurement, flushing and maintenance bypass', 'Field source and analyzer inlet; old-sample and wash destinations; sample transit and renewal; bypass positions; periods when measurement data must be withheld or flagged'],
            ['Installed sampling, washing and drainage loads', 'Actual water or other branch medium, tubing distance, suction and discharge lift, outlet pressure and duty cycle; concurrent inflow and peak waste accumulation'],
            ['Serviceable connections between the field and cabinet', 'Tube identification, materials, seals and replacement access; site temperature, condensation and cold-weather conditions where applicable; renewal after reopening the path'],
            ['Sensor events and the first valid measurement', 'Sensor type and location, tubing and medium, configured decision thresholds and timing; controller event records; sample-restoration and method checks required after an alarm'],
          ],
        },
      },
      'validation': {
        table: {
          caption: 'Verify sample restoration before releasing measurement data',
          details: [
            ['Exercise measurement, wash and bypass states; verify liquid destinations and sample renewal at the analyzer interface before accepting the next method result.', 'A returned valve position does not show that old sample or wash liquid has cleared. Investigate the refresh path and the recorded maintenance interval.'],
            ['Measure sample delivery under the installed lift and pressure, including concurrent flushing or drainage; check accumulation and the first sample after service.', 'Long tubing, changing inlet conditions, fouling or a full waste container can change installed performance while the motor continues to run.'],
            ['After field servicing, check connections and sealing under the site conditions, then verify sample renewal and method response at the analytical interface.', 'A leak, reversed connection or changed tubing volume can delay or alter the arriving sample. Recheck the path before changing analytical calibration.'],
            ['Test fault events and controller records separately from the method checks used to release data; verify the affected interval and the first valid post-recovery result.', 'A cleared bubble or pressure alarm does not validate concentration. Retain the appropriate data status until sample restoration and method checks are complete.'],
          ],
        },
      },
    },
  },
  'synthetic-biology/guide-bio-process-integration': {
    description: 'Coordinate bioprocess feeding, sampling and maintenance with cumulative volume records, vessel identity and verified recovery after interrupted liquid delivery.',
    sections: {
      'working-conditions': {
        table: {
          caption: 'Define branch operation against the process vessel and material record',
          details: [
            ['Feed, culture, sample, wash and waste destinations', 'Formulation and vessel identity; port states and concurrent branch use; interlocks separating incompatible destinations; maintenance bypasses and isolation checks'],
            ['Delivery pattern over the operating period', 'Discrete additions or continuous feed profile; actual medium and backpressure; refill and bottle-change strategy; permissible no-flow intervals; sampling and discard volumes'],
            ['Prolonged wetted contact and maintenance', 'Complete wetted material set, seals and interfaces; temperature and contact duration; cleaning or sterilization procedure; reassembly and contamination-boundary checks'],
            ['Reconciliation after interrupted feeding or sampling', 'Actual vessel and completed step; measured, estimated or unknown additions and withdrawals; unfinished operations; cumulative volume record and process-defined restart restrictions'],
          ],
        },
      },
      'validation': {
        table: {
          caption: 'Reconcile fluidic events with cumulative material and process state',
          details: [
            ['Exercise concurrent feeding, sampling and maintenance states; verify actual source and destination, then test isolation using the procedure required for the complete path.', 'A closed valve or pinch point does not establish the complete contamination boundary. Check connected paths and maintenance interventions separately.'],
            ['Measure additions over relevant time windows and the full operating period, including refill and restart; reconcile sampling, renewal discard and drainage with vessel volume.', 'A correct final total can conceal interruptions or transient delivery changes. Review the timing as well as the cumulative quantity before changing a feed program.'],
            ['Assess sealing and material condition after the required contact and cleaning sequence; recheck the reassembled path and process contamination controls before reuse.', 'Interface fit alone does not establish prolonged compatibility or a restored contamination boundary after maintenance.'],
            ['Test power loss, an empty feed source and blockage recovery. Reconcile confirmed and uncertain delivery with the vessel record before authorizing the next action.', 'Repeating a partially completed feed can alter both cumulative material and culture volume. The controller needs delivery history; pressure and bubble signals alone do not establish culture condition.'],
          ],
        },
      },
    },
  },
};

function replaceParagraphs(blocks: readonly ApplicationBlock[], replacements: readonly string[], context: string): readonly ApplicationBlock[] {
  const count = blocks.filter(block => block.type === 'paragraph').length;
  if (count !== replacements.length) throw new Error(`Unexpected paragraph count in ${context}: ${count}`);
  let index = 0;
  return blocks.map(block => block.type === 'paragraph' ? { ...block, text: replacements[index++] } : block);
}

function refineSection(section: ApplicationSection, refinement: SectionRefinement, context: string): ApplicationSection {
  let blocks = refinement.paragraphs ? replaceParagraphs(section.blocks, refinement.paragraphs, context) : section.blocks;
  if (refinement.subheadings) {
    const subheadings = refinement.subheadings;
    if (blocks.filter(block => block.type === 'subheading').length !== subheadings.length) throw new Error(`Unexpected question count in ${context}`);
    let index = 0;
    blocks = blocks.map(block => block.type === 'subheading' ? { ...block, title: subheadings[index++] } : block);
  }
  if (refinement.table) {
    const table = refinement.table;
    if (blocks.filter(block => block.type === 'table').length !== 1) throw new Error(`Expected one table in ${context}`);
    blocks = blocks.map(block => {
      if (block.type !== 'table') return block;
      if (block.headers.length !== 3 || block.rows.length !== table.details.length) throw new Error(`Unexpected table shape in ${context}`);
      return { ...block, caption: table.caption, rows: block.rows.map((row, index) => [row[0], ...table.details[index]]) };
    });
  }
  return { ...section, title: refinement.title ?? section.title, blocks };
}

/** Refine only the named English pages after their existing translation and scenario corrections. */
export function refineEnglishGuides(document: ApplicationDocument, kind: EnglishApplicationKind): ApplicationDocument {
  const refinement = refinements[`${kind}/${document.slug}`];
  if (!refinement) return document;
  for (const id of Object.keys(refinement.sections)) {
    if (!document.sections.some(section => section.id === id)) throw new Error(`Missing section ${kind}/${document.slug}#${id}`);
  }
  return {
    ...document,
    description: refinement.description,
    related: refinement.related
      ? [...(document.related ?? []), ...refinement.related.filter(link => !document.related?.some(existing => existing.href === link.href))]
      : document.related,
    intro: refinement.intro ? replaceParagraphs(document.intro, refinement.intro, `${kind}/${document.slug} intro`) : document.intro,
    sections: document.sections.map(section => {
      const sectionRefinement = refinement.sections[section.id];
      return sectionRefinement ? refineSection(section, sectionRefinement, `${kind}/${document.slug}#${section.id}`) : section;
    }),
  };
}

/** Keep the experiment-focused guide's contact request aligned with its visible scope. */
export function refineEnglishGuideCta<T extends { description: string }>(cta: T, document: ApplicationDocument, kind: EnglishApplicationKind): T {
  const description = refinements[`${kind}/${document.slug}`]?.contactDescription;
  return description ? { ...cta, description } : cta;
}
