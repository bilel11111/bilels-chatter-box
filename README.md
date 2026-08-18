# Bilel's Chatter Box

A real-time communication workspace that combines room-based chat, user profiles, reactions, and lightweight multiplayer games.

## Overview

Bilel's Chatter Box is a responsive social application built around authenticated conversations. Users can join rooms, exchange messages, see activity updates, manage profiles, and start chess or tic-tac-toe sessions from the chat experience.

## Highlights

- Real-time rooms and message updates.
- Authentication and profile management.
- Reactions and typing/activity indicators.
- Integrated chess and tic-tac-toe game flows.
- Responsive chat layout with mobile support.
- Typed data access through Supabase integrations.

## Technology

- React 18 and TypeScript
- Vite
- Tailwind CSS and shadcn/ui
- Supabase authentication, realtime subscriptions, and persistence
- Zod, date-fns, and Lucide React

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and configure the required Supabase values. Keep local environment files and private service credentials out of version control.

## Project structure

Chat UI components are organized under `src/components/chat/`, game experiences under `src/components/games/`, and authentication and application state under `src/contexts/` and `src/components/auth/`.

## Status

A portfolio project demonstrating realtime application patterns, authenticated UX, and interactive multiplayer features.

## License

No license has been declared yet. Add a license before accepting external contributions or redistributing the project.

## Author

**Bilel JM** — [GitHub](https://github.com/bilel11111)
