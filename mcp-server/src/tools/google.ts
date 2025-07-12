import axios from 'axios';
import { config } from '../config';

export async function listGoogleDocs() {
  const url = `https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.document'&key=${config.googleApiKey}`;
  const res = await axios.get(url);
  return res.data.files;
}
