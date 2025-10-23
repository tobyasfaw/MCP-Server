import { fetchDoc, extractPlainText, naiveSummary } from '../integrations/googleDocs.js';
import { upsertPageFromDoc } from '../integrations/notion.js';

export async function syncDocsToNotion(params: { docId: string, databaseId: string }) {
  const { docId, databaseId } = params;
  const doc = await fetchDoc(docId);
  const title = doc.title || 'Untitled Google Doc';
  const text = extractPlainText(doc);
  const summary = naiveSummary(text);
  const res = await upsertPageFromDoc({ databaseId, docId, title, summary });
  return { ok: true, ...res };
}
