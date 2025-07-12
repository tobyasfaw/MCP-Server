<<<<<<< HEAD
# MCP-Server
=======
# MCP Server - Google Docs Viewer

This is a minimal MCP server that connects to the Google Drive API, authenticates with OAuth2, and lists your Google Docs in a simple HTML view.

## Features

- OAuth2 flow with Google
- Lists Google Docs (only `application/vnd.google-apps.document`)
- Uses `express`, `axios`, and `googleapis`

## Setup

1. **Create a `.env` file** with the following content:
```
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
REDIRECT_URI=http://localhost:3000/oauth2callback
PORT=3000
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the server**:
```bash
npm start
```

4. Visit `http://localhost:3000` to authenticate with Google.

## Notes

- Do not commit `.env` to version control.
- Ensure your Google OAuth Client allows `http://localhost:3000/oauth2callback` as a redirect URI.

MIT License.
>>>>>>> 56f5385 (Initial cleaned project upload)
