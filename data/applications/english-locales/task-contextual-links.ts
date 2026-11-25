import { getDiaphragmPumpPath } from '@/data/products/detail/diaphragm-pump-routes';
import { getPipettingSeriesSlug } from '@/data/products/selection/pipetting-pump-routes';
import { getValvelessPumpPath } from '@/data/products/selection/valveless-pump-routes';
import { PISTON_PRODUCT_LINKS } from '../analytical-documents/piston-link-network';
import type { ApplicationBlock, ApplicationDocument, ApplicationInlineLink } from '../analytical-documents/types';
import type { EnglishApplicationKind } from '../application-english';
import { reviewProductCards } from '../english-review-resources';

type LinkedParagraph = {
  section: string;
  after: string;
  text: string;
  inlineLinks: readonly ApplicationInlineLink[];
};

const articles = '/en/resources/technical-articles/';

const taskParagraphs: Partial<Record<EnglishApplicationKind, Readonly<Record<string, readonly LinkedParagraph[]>>>> = {
  ivd: {
    'piston-reagent-dispensing': [{
      section: 'sizing',
      after: 'Select by dose, total cycle volume, replenishment interval and permissible pauses.',
      text: 'Use the clinical chemistry piston pump sizing guide to compare 100, 250 and 500 μL candidates by dose count and refill timing. For a 100 μL candidate, check the EA-100-PEEK piston pump specifications and confirm that its wetted materials and available stroke suit the actual reagent and dosing cycle.',
      inlineLinks: [
        { text: 'clinical chemistry piston pump sizing guide', href: articles + 'clinical-chemistry-piston-pump-100-250-500-ul-selection/' },
        { text: 'EA-100-PEEK piston pump specifications', href: PISTON_PRODUCT_LINKS.ea100Peek },
      ],
    }],
  },
  'analytical-instruments': {
    'diaphragm-replenishment': [{
      section: 'acceptance',
      after: 'Include peak consumption, low source levels and restart.',
      text: 'If flow starts normally and then drops, check reservoir venting and pump inlet pressure before changing the pump. If the inlet is clear and a brushed pump suits the duty, compare the DPL30-DB liquid diaphragm pump at the measured pressure difference and verify that the reservoir recovers within the refill window.',
      inlineLinks: [
        { text: 'check reservoir venting and pump inlet pressure', href: articles + 'diaphragm-pump-flow-drop-reservoir-venting/' },
        { text: 'DPL30-DB liquid diaphragm pump', href: getDiaphragmPumpPath('en', 'dpl30-db') },
      ],
    }],
  },
  'environmental-monitoring': {
    'gas-pretreatment-condensate': [{
      section: 'component-roles',
      after: 'DPGL800 handles gas or gas–liquid aspiration',
      text: 'If the drain intermittently draws gas, use the gas-flow and vacuum build-up guide to interpret the test conditions for the DPGL800-BS gas-liquid diaphragm pump. Verify condensate removal and sample-gas sealing in the assembled branch at the expected inlet conditions.',
      inlineLinks: [
        { text: 'gas-flow and vacuum build-up guide', href: articles + 'dpgl800-gas-liquid-diaphragm-pump-selection-guide/' },
        { text: 'DPGL800-BS gas-liquid diaphragm pump', href: getDiaphragmPumpPath('en', 'dpgl800-bs') },
      ],
    }],
  },
  'lab-automation': {
    'microplate-plate-wash': [{
      section: 'acceptance',
      after: 'Assess differences in delivered volume between wells',
      text: 'When several wash nozzles operate together, use the parallel-nozzle flow balance procedure to distinguish low total supply from uneven delivery between branches. If the measurements show that the supply pump is undersized, compare the DPL60-DB liquid diaphragm pump at the required pressure and flow, then repeat the measurements at each nozzle.',
      inlineLinks: [
        { text: 'parallel-nozzle flow balance procedure', href: articles + 'diaphragm-pump-multiple-wash-nozzles-flow-balance/' },
        { text: 'DPL60-DB liquid diaphragm pump', href: getDiaphragmPumpPath('en', 'dpl60-db') },
      ],
    }],
    'reagent-dispensing-repeated-filling': [{
      section: 'acceptance',
      after: 'Use actual media to check first, middle and last doses',
      text: 'Use the RPL valveless pump selection guide to compare the required dose and time per dispense. For a single-head candidate, check the RPL-P6.35 metering pump for adjustable displacement per revolution and wetted materials, then verify the delivered dose at the installed backpressure.',
      inlineLinks: [
        { text: 'RPL valveless pump selection guide', href: articles + 'rpl-valveless-metering-pump-selection-guide/' },
        { text: 'RPL-P6.35 metering pump', href: getValvelessPumpPath('en', 'rpl-p635') },
      ],
    }],
  },
  'life-science': {
    'automation-pipetting': [
      {
        section: 'component-roles',
        after: 'The air-displacement pump drives liquid inside the tip',
        text: 'For stations that need feedback on liquid level, tip presence or blockage, compare the SMTP2 programmable pipetting module and verify the available signals with the intended tips and liquids.',
        inlineLinks: [{
          text: 'SMTP2 programmable pipetting module',
          href: '/en/products/pumps/pipetting-pumps/' + getPipettingSeriesSlug('smtp2') + '/',
        }],
      },
      {
        section: 'fault-recovery',
        after: 'Tip air leaks, air aspiration, retained droplets',
        text: 'Review how programmable air-displacement pipetting controls aspiration, dispensing and detection when investigating a recurring fault. Check the tip seal and immersion separately from the programmed settings.',
        inlineLinks: [{ text: 'programmable air-displacement pipetting', href: articles + 'what-is-a-programmable-pipetting-pump/' }],
      },
    ],
  },
  'synthetic-biology': {
    'bio-process-integration-path-management': [{
      section: 'component-roles',
      after: 'Valves control the current source or destination',
      text: 'Use the rotary valve selection guide to map which ports connect at each step. If a common port connects to one branch at a time, compare MRV3 rotary selector valves by channel count, bore and internal volume before validating the switch sequence in the instrument.',
      inlineLinks: [
        { text: 'rotary valve selection guide', href: articles + 'rotary-valve-selection-guide/' },
        { text: 'MRV3 rotary selector valves', href: reviewProductCards.mrv.href },
      ],
    }],
  },
};

/** Insert reviewed English copy after the paragraph that introduces the decision. */
export function addEnglishTaskParagraphLinks(document: ApplicationDocument, kind: EnglishApplicationKind): ApplicationDocument {
  const additions = taskParagraphs[kind]?.[document.slug];
  if (!additions) return document;

  return {
    ...document,
    sections: document.sections.map(section => {
      const paragraphs = additions.filter(addition => addition.section === section.id
        && section.blocks.some(block => block.type === 'paragraph' && block.text.startsWith(addition.after)));
      if (!paragraphs.length) return section;

      const promotedArticles = new Set(paragraphs.flatMap(paragraph =>
        paragraph.inlineLinks.filter(link => link.href.startsWith(articles)).map(link => link.href),
      ));
      return {
        ...section,
        blocks: section.blocks.flatMap((block): ApplicationBlock[] => {
          if (block.type === 'links') {
            const items = block.items.filter(item => !promotedArticles.has(item.href));
            return items.length ? [{ ...block, items }] : [];
          }
          if (block.type !== 'paragraph') return [block];
          const addition = paragraphs.find(paragraph => block.text.startsWith(paragraph.after));
          return addition ? [block, { type: 'paragraph', text: addition.text, inlineLinks: addition.inlineLinks }] : [block];
        }),
      };
    }),
  };
}
