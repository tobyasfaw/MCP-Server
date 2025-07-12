import axios from 'axios';
import { config } from '../config';

export async function listRepos() {
  const res = await axios.get('https://api.github.com/user/repos', {
    headers: {
      Authorization: `token ${config.githubToken}`,
    },
  });

  return res.data.map((repo: any) => ({
    name: repo.full_name,
    private: repo.private,
    url: repo.html_url,
    language: repo.language,
    stars: repo.stargazers_count,
  }));
}
