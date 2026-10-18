import type { ApplicationBlock, ApplicationDocument } from '../analytical-documents/types';
import type { EnglishApplicationKind } from '../application-english';

/** Keep condensate removal and absorbent supply distinct from wash-station duties. */
export function refineEnglishSampleGas(document: ApplicationDocument, kind: EnglishApplicationKind): ApplicationDocument {
  if (kind !== 'environmental-monitoring') return document;
  const parent = document.slug === 'gas-pretreatment-diaphragm-pumps';
  const absorption = document.slug === 'gas-pretreatment-absorption';
  const condensate = document.slug === 'gas-pretreatment-condensate';
  if (!parent && !absorption && !condensate) return document;
  return {
    ...document,
    sections: document.sections.map(section => ({
      ...section,
      ...(parent && section.id === 'configuration-2' ? { title: 'Match absorbent supply and drainage to the operating gas path' } : {}),
      ...(parent && section.id === 'configuration-question' ? { title: 'Does absorbent-liquid flow establish sample-gas handling capacity?' } : {}),
      blocks: section.blocks.map((block): ApplicationBlock => {
        if (parent && section.id === 'configuration-question' && block.type === 'paragraph' && block.text.startsWith('Compare peak')) return { ...block, text: 'Absorbent delivery, sample-gas flow and condensate removal have separate operating points. Establish the liquid required by the contact unit, the gas flow and pressure required by the analytical method, and the peak condensate load. Verify each branch in the assembled system and check the first valid analytical result after an interruption.' };
        if (absorption && section.id === 'acceptance' && block.type === 'paragraph' && block.text.startsWith('Check actual drainage')) return { ...block, text: 'Verify supply recovery, liquid level or operating state at the gas-contact unit and the analytical response after source replacement or maintenance. For a recirculating arrangement, confirm restored circulation; for replenishment, confirm the actual addition and resulting inventory.' };
        if (absorption && section.id === 'fault-recovery' && block.type === 'paragraph' && block.text.startsWith('Reconcile undelivered')) return { ...block, text: 'Restore the source, liquid column and installed flow, then check the contact unit and method response before accepting new data. In a replenishment branch, reconcile any measured or unknown addition with the receiver inventory. In a recirculating branch, verify circulation and liquid condition rather than treating circulating volume as fresh absorbent added.' };
        if (parent && section.id === 'configuration-1' && block.type === 'paragraph') return { ...block, text: 'An absorbent-supply branch delivers liquid to the contact vessel; a condensate drain removes liquid collected from the sample-gas path. Define the inlet phase and destination for each pump. Use a liquid-transfer configuration for the actual absorbent and a configuration suited to the gas-liquid state encountered during drainage. A drain must preserve the intended gas-path pressure and sealing arrangement.' };
        if (parent && section.id === 'configuration-2' && block.type === 'paragraph') return { ...block, text: 'For absorbent supply, measure installed liquid flow and cumulative delivery under the actual vessel backpressure, including bottle changes and the permitted interruption. For drainage, compare removal with peak condensate accumulation and test the full receiver or blocked-outlet response. Check whether opening or running the drain admits air, leaks sample gas or disturbs gas flow before accepting the next measurement.' };
        if (parent && section.id === 'working-conditions' && block.type === 'table' && block.headers[0] === 'Condition') return { ...block, rows: block.rows.map(row => row[0] === 'Actual supply and removal' ? [row[0], 'Measure absorbent delivery at the contact vessel and condensate accumulation at the drain. Check source depletion, full receiver, blockage and gas-path pressure during recovery.'] : row) };
        if ((!parent && section.id !== 'component-roles') || (parent && section.id !== 'product-position') || block.type !== 'paragraph') return block;
        if (block.text.startsWith('Diaphragm pumps perform')) return { ...block, text: absorption
          ? 'The pump supplies absorbent liquid to the gas-contact vessel at the required installed flow. Confirm formulation, receiving backpressure, cumulative volume and refill interruptions; gas-liquid waste aspiration is a separate duty.'
          : 'The drain pump removes collected condensate while the sample-gas path remains in its intended pressure state. Establish whether the inlet remains liquid-filled or intermittently draws gas, then choose the compatible pumping arrangement and receiver.' };
        if (block.text.startsWith('Compare DPL30, DPL60 and DPL30H')) return { ...block, text: absorption || parent
          ? 'Compare DPL30, DPL60 and DPL30H against the actual absorbent formulation and supply load. Tubing, valves and receiving-vessel pressure determine installed flow; measure delivery and recovery after refilling at the contact vessel.'
          : 'For a separate liquid-filled condensate-transfer branch, compare DPL30, DPL60 and DPL30H against the actual liquid, suction condition and outlet load. Confirm that this arrangement maintains a permitted inlet state and does not open an unintended air path into the sample gas.' };
        return block;
      }),
    })),
  };
}
