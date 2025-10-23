import { z } from 'zod';

// Tiny evaluation harness. In real life, plug this into your task logs.
const ExampleRunSchema = z.object({
  name: z.string(),
  expected: z.string(),
  actual: z.string(),
});

const dataset = [
  { name: 'Title preserved', expected: 'Keep headings', actual: 'Keep headings' },
  { name: 'Bullets summarized', expected: 'Bullets summarized', actual: 'Bullets summarized' },
  { name: 'No hallucinations', expected: 'No hallucinations', actual: 'No hallucinations' },
];

export function accuracy(rows: z.infer<typeof ExampleRunSchema>[]) {
  const total = rows.length;
  const correct = rows.filter(r => r.expected.trim() === r.actual.trim()).length;
  const acc = total ? correct / total : 0;
  return { total, correct, accuracy: acc };
}

if (process.argv[1]?.includes('eval.ts')) {
  const res = accuracy(dataset);
  console.log(JSON.stringify(res, null, 2));
}
