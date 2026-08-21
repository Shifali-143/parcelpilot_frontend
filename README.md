# ParcelPilot Frontend

React + TypeScript + Vite + Tailwind CSS frontend for the ParcelPilot AI Support system.

## Prerequisites

- Node.js 18+
- npm or yarn
- Backend running at `http://localhost:8000`

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens at `http://localhost:3000`. API calls are proxied to `http://localhost:8000` via Vite.

## Build

```bash
npm run build
```

Output in `dist/`.

## Project Structure

```
src/
├── api/
│   └── api.ts              # All API calls (centralized)
├── types/
│   └── index.ts            # All TypeScript types (centralized)
├── hooks/
│   ├── useAuth.ts           # Authentication & token management
│   ├── useChat.ts           # Chat messages, sending, confirmation
│   ├── useDashboard.ts      # Dashboard data loading
│   └── useTheme.ts          # Light/dark theme
├── context/
│   └── AppContext.tsx        # Global state (auth + theme)
├── components/
│   ├── ui/                  # Reusable UI primitives
│   │   ├── Badge.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   └── Spinner.tsx
│   ├── layout/
│   │   ├── Header.tsx        # Top nav with user info + theme toggle
│   │   └── Sidebar.tsx       # Conversation history
│   ├── chat/
│   │   ├── ChatWindow.tsx    # Message list + input composition
│   │   ├── MessageBubble.tsx # User/assistant message display
│   │   ├── ChatInput.tsx     # Auto-resizing textarea
│   │   ├── ToolStepDisplay.tsx # Shows which tools the agent used
│   │   └── ConfirmAction.tsx # Escalation confirmation banner
│   └── dashboard/
│       ├── StatCard.tsx      # Metric cards
│       └── TicketTable.tsx   # Ticket list table
├── pages/
│   ├── ChatPage.tsx          # Chat interface (sidebar + window)
│   ├── DashboardPage.tsx     # Issue detection dashboard
│   └── SettingsPage.tsx      # Theme + user switching
├── styles/
│   └── index.css             # Tailwind + custom classes
├── App.tsx                   # Page routing + layout
└── main.tsx                  # Entry point
```

## Features

- Chat with ParcelPilot AI agent
- See which tools the agent used (document search, order lookup, etc.)
- Confirm/reject escalation actions
- Conversation history sidebar
- Issue detection dashboard (internal users only)
- Switch between customer and internal user roles
- Light/dark theme toggle
- Fully responsive

## Backend API Integration

All API calls go through `src/api/api.ts`. The Vite dev server proxies `/api` to `http://localhost:8000`.
