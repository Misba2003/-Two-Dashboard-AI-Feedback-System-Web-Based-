# Two Dashboard AI Feedback System (Web-Based)

This project is a full-stack web-based AI feedback system featuring:
- A backend API
- A user dashboard for submitting reviews
- An admin dashboard for viewing and monitoring feedback

The system stores user reviews, analyzes them using AI logic, and exposes structured results through APIs and dashboards.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL (Supabase)
- dotenv
- CORS

### Frontend
- Next.js (User Dashboard)
- Next.js (Admin Dashboard)

---
├── backend/ # Express API + database + AI logic
├── user-dashboard/ # User-facing Next.js app
├── admin-dashboard/ # Admin-facing Next.js app
├── README.md
├── DEPLOYMENT.md
├── DEPLOYMENT_CHECKLIST.md


---

## Backend Features

- Health check endpoint
- PostgreSQL connectivity
- Review submission API
- AI-based review analysis (with safe fallback if API key is missing)
- Graceful error handling

### Key Endpoints

- `GET /` → Backend health check  
- `GET /db-test` → Database connectivity test  
- `POST /api/review` → Submit a review with rating  
- `GET /api/reviews` → Fetch all reviews (admin view)

---

## Database Schema

The backend expects a PostgreSQL table named `reviews`:

```sql
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  rating INTEGER NOT NULL,
  review TEXT NOT NULL,
  ai_response TEXT,
  ai_summary TEXT,
  ai_action VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Environment Variables (Backend)

The backend requires the following environment variables:

DATABASE_URL=postgresql://...
PORT=4000
OPENAI_API_KEY=optional


If OPENAI_API_KEY is not provided, the system uses a mocked AI response.
Deployment Notes

The project is structured as a monorepo

Backend is configured for deployment on Render

Dashboards are configured for deployment on Vercel

Deployment was attempted, but Render requires billing details for Web Services.
All functionality works correctly when run locally.

cd backend
npm install
node index.js
Backend runs on http://localhost:4000

Submission Note
This repository is submitted as part of an internship/technical assessment.
The focus is on:

Correct architecture

API design

Database integration

Error handling

Clean project structure


## Project Structure

