import dotenv from 'dotenv';
dotenv.config();

export const config = {
  googleApiKey: process.env.GOOGLE_API_KEY!,
  notionToken: process.env.NOTION_API_KEY!,
  githubToken: process.env.GITHUB_TOKEN!,
};
