import type { ApplicationDocument } from '../analytical-documents/types';

const a = {
  selection: 'micro-plunger-pump-selection', accuracy: 'piston-pump-accuracy-repeatability-resolution',
  clinical: 'clinical-chemistry-piston-pump-100-250-500-ul-selection', bubbles: 'piston-pump-air-bubbles-dispensing-error',
  viscosity: 'piston-pump-viscous-liquid-aspiration-speed', materials: 'piston-pump-head-material-selection',
  syringe: 'what-is-a-programmable-syringe-pump', pipette: 'what-is-a-programmable-pipetting-pump', pipetting: 'what-is-pipetting',
  wash: 'ivd-cleaning-wash-rinse-pump-diaphragm-pump', drain: 'ivd-waste-aspiration-liquid-pump-vs-vacuum-pump',
  flow: 'diaphragm-pump-flow-pressure-curve-guide', balance: 'diaphragm-pump-multiple-wash-nozzles-flow-balance',
  rotary: 'rotary-valve-selection-guide', rotaryMaterials: 'rotary-valve-wetted-materials-selection', solenoid: 'what-is-a-solenoid-valve',
  tubing: 'tube-inner-diameter-affects-diaphragm-pump-flow', resistance: 'fluid-resistance-calculator-liquid-path-design-guide', fittings: 'hard-tube-fittings-selection-guide',
} as const;

/** A reading is attached to the section whose engineering question it answers. */
export type IvdReading = { section: string; slugs: readonly string[] };
const overviews: Record<string, readonly IvdReading[]> = {
  '': [{ section: 'selection-order', slugs: [a.accuracy] }, { section: 'candidate-selection', slugs: [a.syringe, a.wash, a.drain] }],
  'guide-clinical': [{ section: 'task-clinical-sample', slugs: [a.clinical, a.bubbles] }, { section: 'task-clinical-reagent', slugs: [a.viscosity] }, { section: 'task-clinical-switching', slugs: [a.rotary] }, { section: 'task-clinical-cleaning', slugs: [a.wash, a.balance] }],
  'guide-immunoassay': [{ section: 'task-immunoassay-sample', slugs: [a.accuracy] }, { section: 'task-immunoassay-reagent', slugs: [a.syringe] }, { section: 'task-immunoassay-beadWash', slugs: [a.wash, a.drain] }, { section: 'task-immunoassay-switching', slugs: [a.rotary] }],
  'guide-hematology': [{ section: 'task-hematology-sample', slugs: [a.accuracy] }, { section: 'task-hematology-dilution', slugs: [a.syringe] }, { section: 'task-hematology-channel', slugs: [a.rotary] }, { section: 'task-hematology-cleaning', slugs: [a.wash, a.drain] }, { section: 'task-hematology-monitoring', slugs: [a.bubbles] }],
  'guide-coagulation': [{ section: 'task-coagulation-reagent', slugs: [a.accuracy, a.syringe] }, { section: 'task-coagulation-switching', slugs: [a.rotary] }, { section: 'task-coagulation-cleaning', slugs: [a.wash] }],
  'guide-molecular': [{ section: 'task-molecular-lysis', slugs: [a.syringe, a.rotaryMaterials] }, { section: 'task-molecular-wash', slugs: [a.pipette, a.pipetting] }, { section: 'task-molecular-switching', slugs: [a.rotary] }, { section: 'task-molecular-connection', slugs: [a.fittings] }, { section: 'task-molecular-monitoring', slugs: [a.bubbles] }],
};
export function getIvdReadingPlan(document: ApplicationDocument): readonly IvdReading[] {
  if (overviews[document.slug]) return overviews[document.slug];
  const context = document.reviewContext;
  if (!context) throw new Error(`Missing IVD context: ${document.slug}`);
  const section = context.level === 'product' ? 'configuration-1' : document.sections.some(s => s.id === 'sizing') ? 'sizing' : 'working-conditions';
  const family = context.family;
  const related = family === 'piston' ? [a.selection, a.accuracy, ...(context.topic === 'clinical' ? [a.clinical] : [])]
    : family === 'syringe' ? [a.syringe, a.accuracy]
    : family === 'pipetting' ? [a.pipette, a.pipetting]
    : family === 'diaphragm' ? [a.wash, a.flow, a.drain]
    : family === 'valves' ? [a.rotary, a.rotaryMaterials, ...(context.products.includes('sv') ? [a.solenoid] : [])]
    : family === 'probes' ? [a.accuracy, ...(context.products.includes('washing') ? [a.wash, a.balance] : [a.bubbles])]
    : family === 'monitoring' ? [a.bubbles, a.resistance]
    : family === 'fluidics' ? [a.fittings, a.tubing, a.resistance] : [];
  if (!related.length) throw new Error(`Missing IVD reading plan: ${document.slug}/${family}`);
  return [{ section, slugs: related }];
}
