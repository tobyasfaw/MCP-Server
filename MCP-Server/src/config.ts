import 'dotenv/config';

function str(name: string, def?: string) {
  const v = process.env[name] ?? def;
  if (v === undefined) throw new Error(`Missing env: ${name}`);
  return v;
}

export const config = {
  port: parseInt(process.env.PORT ?? '3000', 10),
  apiKey: str('API_KEY'),
  orgAllowlist: (process.env.ORG_ALLOWLIST ?? '').split(',').map(s => s.trim()).filter(Boolean),

  google: {
    clientEmail: str('GOOGLE_CLIENT_EMAIL'),
    privateKey: str('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n'),
  },

  notion: {
    apiKey: str('NOTION_API_KEY'),
    tasksDbId: process.env.NOTION_TASKS_DATABASE_ID,
  },

  github: {
    token: str('GITHUB_TOKEN'),
    owner: str('GITHUB_REPO_OWNER'),
    repo: str('GITHUB_REPO_NAME'),
  }
};
