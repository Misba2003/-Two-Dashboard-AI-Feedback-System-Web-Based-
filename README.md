# Two Dashboard AI Feedback System (Web-Based)

This project is a full-stack web-based AI feedback system featuring:
- A backend API
- A user dashboard for submitting reviews
- An admin dashboard for viewing and monitoring feedback

The system stores user reviews, analyzes them using AI logic, and exposes structured results through APIs and dashboards.

---
Live URLs (Deployed)
User Dashboard (Vercel)

👉 https://two-dashboard-ai-feedback-system-we.vercel.app

Users can submit ratings and textual reviews from this interface.

Admin Dashboard

Admin dashboard is implemented and available in the repository.
It is intended for internal/admin review of submitted feedback.

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
├── backend/      

│   ├── index.js

│   ├── db.js

│   ├── llm.js

│   └── package.json

│

├── user-dashboard/     

│   └── pages/index.js

│
├── admin-dashboard/    

│   └── pages/index.js

│

├── README.md

├── package.json

└── package-lock.json

---
Backend API
**Key endpoints**

GET /
Health check

GET /db-test
Verifies database connectivity

POST /api/review
Accepts user rating and review text

GET /api/reviews
Fetches all stored reviews (admin use)

**Environment Variables (Backend)**

Create a .env file inside the backend/ directory:

DATABASE_URL=your_supabase_postgres_connection_string
PORT=4000
---
Running Locally
Backend
cd backend
npm install
node index.js

Backend runs on:
👉 http://localhost:4000

## Dashboards

cd user-dashboard
npm install
npm run dev

### User Dashboard
- Submits reviews to backend
- Shows AI feedback response

### Admin Dashboard
- Displays all reviews
- Read-only view for monitoring

---

## Deployment Notes

User Dashboard is deployed on Vercel (Free Tier)

Backend is intentionally demonstrated via local execution to avoid paid cloud service requirements

Supabase PostgreSQL is used for database storage

This setup satisfies the requirement of providing working URLs while keeping the system cost-free.

---

**Assessment Focus Areas Covered**

Clean project architecture

API design and validation

Database integration

Error handling

Frontend UI improvements

Deployment readiness

---

## Author

Misba Yadgiri


