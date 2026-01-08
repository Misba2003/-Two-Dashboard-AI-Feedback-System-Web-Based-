# Admin Dashboard

Minimal Next.js app for viewing all reviews.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

3. Run development server:
```bash
npm run dev
```

The app will run on http://localhost:3001 (different port to avoid conflict with user-dashboard)

## Features

- Displays all reviews in a table
- Shows: rating, review, ai_summary, ai_action, created_at
- Auto-refreshes every 10 seconds
- Read-only view

