# Backend Deployment - Render

## Quick Start

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables (see below)
4. Deploy

## Environment Variables

Required in Render dashboard:

```
NODE_ENV=production
DATABASE_URL=postgresql://... (your Supabase connection string)
PORT=(auto-set by Render)
OPENAI_API_KEY=sk-... (optional)
```

## Build & Start Commands

- **Build Command:** `npm install`
- **Start Command:** `npm start`

## Server Configuration

The server automatically:
- Listens on `process.env.PORT` (required by Render)
- Handles CORS for frontend requests
- Connects to PostgreSQL via `DATABASE_URL`

## Health Check

After deployment, test:
- `https://your-backend-url.onrender.com/` - Should return `{"status":"success","message":"Backend running"}`
- `https://your-backend-url.onrender.com/db-test` - Should return database connection status

