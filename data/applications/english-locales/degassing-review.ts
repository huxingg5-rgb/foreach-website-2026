import type { ApplicationBlock, ApplicationDocument, ApplicationReference, ApplicationSection } from '../analytical-documents/types';

const moduleName = 'EF-AG3-B inline vacuum degassing module';
const manufacturerSpecifications = 'https://www.separel.com/en/products/biochemical.html';

const productCard: ApplicationBlock = {
  type: 'links',
  viewDetails: 'View DIC EF-AG3 series specifications',
  items: [{
    label: moduleName,
    href: manufacturerSpecifications,
    description: 'Application example from the EF-AG3 series. See DIC’s series specifications and confirm the configuration for your liquid.',
    cardImage: {
      src: '/images/applications/common/ef-ag3-b-inline-degassing-module.webp',
      alt: 'Front view of the EF-AG3-B degassing module showing the cylindrical housing and side liquid port',
    },
  }],
};

const clinicalDegassingReference: ApplicationReference = {
  id: 'separel-biochemical-degassing',
  title: 'DIC SEPAREL — Membrane contactors for clinical chemistry analyzers',
  href: manufacturerSpecifications,
};

const clinicalDegassingSection: ApplicationSection = {
  id: 'clinical-supply-inline-degassing',
  title: 'When to evaluate inline degassing before reagent metering',
  tocLabel: 'Inline degassing before metering',
  blocks: [
    {
      type: 'paragraph',
      text: `If bubbles repeatedly appear before metering in a dedicated line that continuously supplies purified water, diluent or a reagent, first check the reservoir level, the seals on the suction-side fittings and priming after a bottle change. If warming or a local pressure drop is causing dissolved gas to come out of solution, evaluate the ${moduleName} upstream of the metering point.`,
      references: [clinicalDegassingReference.id],
    },
    {
      type: 'paragraph',
      text: 'Check wetted-material compatibility with the actual working liquid and cleaning solution. Measure degassing performance and liquid-side pressure drop at the target flow rate, liquid temperature and vacuum-side absolute pressure. On the instrument, compare the volume delivered to the reaction cuvette during continuous dispensing, after standby and after a bottle change. Account for liquid retained in the module when estimating changeover and flushing volumes.',
    },
    productCard,
  ],
};

export function addClinicalDegassingReview(document: ApplicationDocument): ApplicationDocument {
  if (document.slug !== 'piston-reagent-dispensing') return document;
  return {
    ...document,
    sections: document.sections.flatMap(section => section.id === 'operating-cycle' ? [section, clinicalDegassingSection] : [section]),
    references: [...document.references, clinicalDegassingReference],
  };
}

export const inkSupplyDegassingReference: ApplicationReference = {
  id: 'separel-ink-degassing',
  title: 'Sun Chemical — SEPAREL membrane degassing for inkjet inks',
  href: 'https://www.sunchemical.com/materials_degasification_inks/',
};

export const inkSupplyDegassingSection: ApplicationSection = {
  id: 'ink-supply-inline-degassing',
  title: 'When to evaluate inline degassing in the ink supply line',
  tocLabel: 'Inline ink degassing',
  blocks: [
    {
      type: 'paragraph',
      text: `If the refill flow rate and filter pressure drop meet the printer requirements and bubbles still recur upstream of the printhead, first check for air ingress on the suction side and verify priming after an ink container change. If dissolved gas is coming out of the ink, evaluate the ${moduleName} in the supply line upstream of the printhead. The vacuum draws away gas that passes through the membrane.`,
      references: [inkSupplyDegassingReference.id],
    },
    {
      type: 'paragraph',
      text: 'Check wetted-material compatibility with the intended ink and cleaning fluid. Measure degassing performance and liquid-side pressure drop at the operating ink temperature, flow rate and vacuum-side absolute pressure. Once the module is installed, record printhead inlet pressure and check for downstream bubbles when refilling starts or stops and during continuous printing. Use a nozzle check pattern to assess jetting.',
    },
    productCard,
  ],
};
