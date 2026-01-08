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

## Backend

**Tech stack**
- Node.js
- Express
- PostgreSQL (Supabase)
- Render (deployment)

**Key endpoints**
- `GET /` – Health check
- `GET /db-test` – Database connectivity test
- `POST /api/review` – Submit a review
- `GET /api/reviews` – Fetch all reviews

**Environment variables (Render)**

DATABASE_URL=your_postgres_connection_string
PORT=4000

---

## Dashboards

Both dashboards are built using **Next.js** and deployed separately.

### User Dashboard
- Submits reviews to backend
- Shows AI feedback response

### Admin Dashboard
- Displays all reviews
- Read-only view for monitoring

---

## Deployment

- **Backend**: Render (root directory: `backend`)
- **Dashboards**: Vercel
- **Database**: Supabase PostgreSQL

---

## Notes

- AI logic includes graceful fallbacks if API keys are missing
- Backend handles errors without crashing
- Clean monorepo structure used intentionally

---

## Author

Misba Yadgiri


