import { Octokit } from '@octokit/rest';
import { config } from '../config.js';

export const octokit = new Octokit({ auth: config.github.token });

export async function createIssue(params: { title: string, body?: string }) {
  const { title, body } = params;
  const { owner, repo } = config.github;
  const issue = await octokit.issues.create({ owner, repo, title, body });
  return issue.data.html_url || issue.data.url || '';
}
