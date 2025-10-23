import { google } from 'googleapis';
import { config } from '../config.js';

const scopes = ['https://www.googleapis.com/auth/documents.readonly'];

function getClient() {
  const jwt = new google.auth.JWT({
    email: config.google.clientEmail,
    key: config.google.privateKey,
    scopes
  });
  return google.docs({ version: 'v1', auth: jwt });
}

export async function fetchDoc(docId: string) {
  const docs = getClient();
  const { data } = await docs.documents.get({ documentId: docId });
  return data;
}

export function extractPlainText(doc: any): string {
  const content = doc.body?.content ?? [];
  const parts: string[] = [];
  for (const elem of content) {
    const para = elem.paragraph;
    if (!para) continue;
    const texts = para.elements?.map((e: any) => e.textRun?.content ?? '').join('') ?? '';
    parts.push(texts.trim());
  }
  return parts.join('\n').replace(/ +/g, ' ').trim();
}

export function naiveSummary(text: string, maxChars = 1000): string {

  const lines = text.split(/\n+/).map(l => l.trim()).filter(Boolean);
  const prefer = lines.filter(l => /^[-*•]|^#{1,6}|^\d+\./.test(l));
  const joined = (prefer.length ? prefer : lines).join(' \n ');
  if (joined.length <= maxChars) return joined;
  return joined.slice(0, maxChars - 3) + '...';
}
