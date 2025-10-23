import { Client } from '@notionhq/client';
import { config } from '../config.js';

export const notion = new Client({ auth: config.notion.apiKey });

export async function upsertPageFromDoc(params: {
  databaseId: string,
  docId: string,
  title: string,
  summary: string
}) {
  // naive "upsert": find an existing page by external_id property, else create
  const { databaseId, docId, title, summary } = params;
  const search = await notion.databases.query({
    database_id: databaseId,
    filter: { property: 'External ID', rich_text: { equals: docId } }
  }).catch(() => ({ results: [] as any[] }));

  const props: any = {
    Name: { title: [{ text: { content: title } }] },
    Summary: { rich_text: [{ text: { content: summary } }] },
    'External ID': { rich_text: [{ text: { content: docId } }] }
  };

  if (search.results.length > 0) {
    const page = search.results[0];
    await notion.pages.update({ page_id: page.id, properties: props });
    return { id: page.id, updated: true };
  } else {
    const page = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: props
    });
    return { id: page.id, created: true };
  }
}

export async function listTasksToExport(databaseId: string) {
  const res = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        { property: 'Status', select: { equals: 'To GitHub' } }
      ]
    }
  });
  return res.results as any[];
}

export async function markTaskExported(pageId: string, issueUrl: string) {
  await notion.pages.update({
    page_id: pageId,
    properties: {
      Status: { select: { name: 'Filed' } },
      'Issue URL': { url: issueUrl }
    } as any
  });
}

export async function updatePageSummary(pageId: string, summary: string) {
  await notion.pages.update({
    page_id: pageId,
    properties: { Summary: { rich_text: [{ text: { content: summary } }] } } as any
  });
}
