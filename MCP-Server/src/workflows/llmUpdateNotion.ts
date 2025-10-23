import { updatePageSummary } from '../integrations/notion.js';

/**
 * For environments without an LLM, we apply a small deterministic "instruction" set:
 * - 'uppercase': uppercase the summary
 * - 'lowercase': lowercase the summary
 * - 'prefix:<text>': prefix the summary with text
 */
function applyInstruction(current: string, instruction: string): string {
  if (instruction === 'uppercase') return current.toUpperCase();
  if (instruction === 'lowercase') return current.toLowerCase();
  const m = instruction.match(/^prefix:(.+)$/i);
  if (m) return `${m[1].trim()} ${current}`;
  // Default: no-op
  return current;
}

export async function llmGeneratedUpdate(params: {
  pageId: string,
  currentSummary: string,
  instruction: string
}) {
  const next = applyInstruction(params.currentSummary, params.instruction);
  await updatePageSummary(params.pageId, next);
  return { ok: true, newSummary: next };
}
