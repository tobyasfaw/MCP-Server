import axios from 'axios';
import { config } from '../config';

export async function listNotionPages() {
  const res = await axios.post(
    'https://api.notion.com/v1/search',
    { page_size: 5 },
    {
      headers: {
        Authorization: `Bearer ${config.notionToken}`,
        'Notion-Version': '2022-06-28',
      },
    }
  );

  const pages = res.data.results.map((page: any) => ({
    id: page.id,
    title: page.properties?.Name?.title?.[0]?.text?.content || "Untitled"
  }));

  return pages;
}
