import { createIssue } from '../integrations/github.js';
import { listTasksToExport, markTaskExported } from '../integrations/notion.js';

export async function notionTasksToGitHubIssues(databaseId: string) {
  const tasks = await listTasksToExport(databaseId);
  const results: any[] = [];
  for (const t of tasks) {
    const title = (t.properties?.Name?.title?.[0]?.plain_text) || 'Task';
    const body = (t.properties?.Description?.rich_text?.map((r: any) => r.plain_text).join('\n')) || '';
    const url = await createIssue({ title, body });
    await markTaskExported(t.id, url);
    results.push({ notionPageId: t.id, issueUrl: url });
  }
  return { count: results.length, results };
}
