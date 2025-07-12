import express, { Request, Response } from 'express';
import { listGoogleDocs } from './tools/google';
import { listNotionPages } from './tools/notion';
import { listRepos } from './tools/github';

const app = express();
const port = 3000;

app.get('/', (_: Request, res: Response) => {
  res.send('MCP Server is running');
});

app.get('/google-docs', async (_: Request, res: Response) => {
  const docs = await listGoogleDocs();
  res.json(docs);
});

app.get('/notion-pages', async (_: Request, res: Response) => {
  const pages = await listNotionPages();
  res.json(pages);
});

app.get('/github-repos', async (_: Request, res: Response) => {
  const repos = await listRepos();
  res.json(repos);
});

app.listen(port, () => {
  console.log(`MCP server running at http://localhost:${port}`);
});
