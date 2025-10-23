# MCP Server

The **Model Context Protocol (MCP) Server** automates secure, end‑to‑end data workflows across productivity platforms like Google Docs, Notion, and GitHub. It’s designed to streamline context exchange between AI agents and user tools, enabling real‑time, identity‑aware task execution.

## 🚀 Features

- **Integrates with:**
  - Google Docs for content summarization and extraction
  - Notion for structured task and document management
  - GitHub for developer workflows and issue tracking
- 🔐 Identity‑aware access control with secure config handling
- 🧩 Modular architecture for new tools and extensions
- 📈 Evaluation framework to validate task accuracy and performance

## 🧠 Example Use Cases

- Sync a summary of Google Docs meeting notes into Notion
- Automatically create GitHub issues from Notion tasks
- Trigger Notion document updates based on agent‑generated content
- Evaluate task completion accuracy using `src/eval/eval.ts`

## 🔧 Setup

```bash
# Clone the repo
git clone https://github.com/you/MCP-Server.git
cd MCP-Server

# Install dependencies
npm install

# Configure env
cp .env.example .env
# ...fill in credentials...

# Start the server
npm start
```

The server starts at `http://localhost:${PORT || 3000}`.

## 🔎 Endpoints

- `POST /workflows/sync-docs-to-notion` — { docId, notionDatabaseId? }
- `POST /workflows/notion-to-github` — { notionDatabaseId? }
- `POST /workflows/llm-update-notion` — { pageId, instruction }
- `POST /eval/run` — run the built‑in evaluation and return a report

All endpoints require the header `x-api-key: <API_KEY>`.

