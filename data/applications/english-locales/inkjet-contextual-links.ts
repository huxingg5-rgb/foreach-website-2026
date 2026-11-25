import type { ApplicationDocument, ApplicationInlineLink } from '../analytical-documents/types';
import type { InkjetRouteKey } from '../inkjet-guide-navigation';
import routes from '../industrial-inkjet-routes.json';

type ParagraphLinkEdit = {
  excerpt: string;
  replacement?: string;
  anchor: ApplicationInlineLink;
};

const articles = '/en/resources/technical-articles/';

const edits: Partial<Record<InkjetRouteKey, Readonly<Record<string, ParagraphLinkEdit>>>> = {
  guide: {
    'ink-path-overview': {
      excerpt: 'Return flow only describes the printhead channel if ink actually passes through the specified channel.',
      replacement: 'Return flow only describes the printhead channel if ink actually passes through the specified channel. Compare the roles of supply, circulation and return pumps when assigning a pump to a branch.',
      anchor: {
        text: 'roles of supply, circulation and return pumps',
        href: `${articles}ink-circulation-supply-return-pump-diaphragm-pump/`,
      },
    },
    'inkjet-connection-guides': {
      excerpt: 'Size fixed internal assemblies by bore, length and port type.',
      replacement: 'Use the tubing and fittings overview to locate fixed and service connections in the circuit. Size fixed internal assemblies by bore, length and port type.',
      anchor: { text: 'tubing and fittings overview', href: routes.connectionGuide },
    },
    'inkjet-flow-control-guides': {
      excerpt: 'The upstream filter holds debris.',
      replacement: 'The filtration and flow control overview maps each component to its branch and operating conditions. The upstream filter holds debris.',
      anchor: { text: 'filtration and flow control overview', href: routes.flowControlGuide },
    },
  },
  supply: {
    'ink-supply': {
      excerpt: 'If less than 35 mL arrives, measure outlet pressure and filter pressure drop.',
      replacement: 'If less than 35 mL arrives, measure outlet pressure and filter pressure drop. Read the pump flow–pressure curve at the actual pressure difference across the pump to compare expected and delivered flow.',
      anchor: { text: 'pump flow–pressure curve', href: `${articles}diaphragm-pump-flow-pressure-curve-guide/` },
    },
  },
  recirculation: {
    'ink-recirculation-validation': {
      excerpt: 'If more flow is required, compare the DPL60-DB with the same ink, tubing and filter.',
      replacement: 'If more flow is required, compare the DPL60-DB with the same ink, tubing and filter. The 300 and 600 mL/min return pump comparison explains how installed resistance affects the choice.',
      anchor: {
        text: '300 and 600 mL/min return pump comparison',
        href: `${articles}300-vs-600-ml-min-ink-circulation-return-pump-selection/`,
      },
    },
  },
  cleaning: {
    'ink-waste-gas-liquid-aspiration': {
      excerpt: 'Its 6 L/min rating is the unloaded air flow per pump head.',
      replacement: 'Its 6 L/min rating is the unloaded air flow per pump head. Use the gas-liquid diaphragm pump selection guide to interpret gas flow and vacuum build-up curves for this duty.',
      anchor: {
        text: 'gas-liquid diaphragm pump selection guide',
        href: `${articles}dpgl800-gas-liquid-diaphragm-pump-selection-guide/`,
      },
    },
  },
  connectionGuide: {
    'inkjet-connection-selection': {
      excerpt: 'For a barbed filter, match tubing ID to the barb size.',
      anchor: { text: 'match tubing ID to the barb size', href: `${articles}what-is-a-barbed-fitting/` },
    },
  },
  flowControlGuide: {
    'inkjet-flow-control-positions': {
      excerpt: 'After pump shutdown, use tank levels and pressures to determine where ink could move.',
      replacement: 'After pump shutdown, use tank levels and pressures to determine where ink could move. Use the post-shutdown backflow and siphoning guide to distinguish reverse flow, forward siphoning and residual dripping.',
      anchor: {
        text: 'post-shutdown backflow and siphoning guide',
        href: `${articles}miniature-diaphragm-pump-backflow-check-valve/`,
      },
    },
  },
  cleaningFluidSwitching: {
    'inkjet-cleaning-multiport-valves': {
      excerpt: 'When several bottles feed one maintenance port in sequence, evaluate an MRV3 multiport rotary valve.',
      replacement: 'When several bottles feed one maintenance port in sequence, evaluate an MRV3 multiport rotary valve. When selecting a rotary valve for a shared fluid path, map the connected ports at each switching step.',
      anchor: {
        text: 'selecting a rotary valve for a shared fluid path',
        href: `${articles}rotary-valve-selection-guide/`,
      },
    },
  },
};

export function addEnglishInkjetContextualLinks(key: InkjetRouteKey, document: ApplicationDocument): ApplicationDocument {
  const sectionEdits = edits[key];
  if (!sectionEdits) return document;

  return {
    ...document,
    sections: document.sections.map(section => {
      const edit = sectionEdits[section.id];
      if (!edit) return section;

      return {
        ...section,
        blocks: section.blocks.map(block => {
          if (block.type !== 'paragraph' || !block.text.includes(edit.excerpt)) return block;

          return {
            ...block,
            text: edit.replacement ? block.text.replace(edit.excerpt, edit.replacement) : block.text,
            inlineLinks: [...(block.inlineLinks ?? []), edit.anchor],
          };
        }),
      };
    }),
  };
}
