# Production Deployment Guide

This guide covers deploying all three components of the application:
1. Backend (Render)
2. User Dashboard (Vercel)
3. Admin Dashboard (Vercel)

---

## Prerequisites

- GitHub repository with all code pushed
- Render account (free tier available)
- Vercel account (free tier available)
- Supabase PostgreSQL database URL
- OpenAI API key (optional, for LLM features)

---

## 1. Backend Deployment (Render)

### Step 1: Prepare Backend

The backend is already configured to:
- Listen on `process.env.PORT` (required by Render)
- Use `DATABASE_URL` from environment variables
- Handle CORS for frontend requests

### Step 2: Deploy to Render

#### Option A: Using render.yaml (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect `backend/render.yaml`
5. Configure environment variables (see below)
6. Click **"Apply"**

#### Option B: Manual Setup

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `fynd-task-2-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click **"Create Web Service"**

### Step 3: Configure Environment Variables

In Render dashboard, go to **Environment** tab and add:

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | Required |
| `DATABASE_URL` | `postgresql://...` | Your Supabase PostgreSQL connection string |
| `PORT` | (auto-set by Render) | Render automatically sets this |
| `OPENAI_API_KEY` | `sk-...` | Optional, for LLM features |

**Important:** 
- `DATABASE_URL` should be your Supabase PostgreSQL connection string
- Format: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`
- Mark `DATABASE_URL` and `OPENAI_API_KEY` as **Secret**

### Step 4: Verify Backend Deployment

1. Wait for deployment to complete (usually 2-5 minutes)
2. Your backend URL will be: `https://fynd-task-2-backend.onrender.com` (or your custom domain)
3. Test endpoints:
   - Health: `https://your-backend-url.onrender.com/`
   - DB Test: `https://your-backend-url.onrender.com/db-test`
   - Reviews: `https://your-backend-url.onrender.com/api/reviews`

**Note:** Render free tier services spin down after 15 minutes of inactivity. First request may take 30-60 seconds.

---

## 2. User Dashboard Deployment (Vercel)

### Step 1: Prepare User Dashboard

1. Ensure `user-dashboard/vercel.json` exists (already created)
2. The dashboard reads `NEXT_PUBLIC_API_URL` from environment variables

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
cd user-dashboard
npm install -g vercel
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? (Select your account)
- Link to existing project? **No**
- Project name: `user-dashboard` (or your choice)
- Directory: `./`
- Override settings? **No**

#### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `user-dashboard`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
5. Click **"Deploy"**

### Step 3: Configure Environment Variables

After first deployment, go to **Settings** → **Environment Variables**:

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend-url.onrender.com` | Production, Preview, Development |

**Important:**
- Replace `your-backend-url.onrender.com` with your actual Render backend URL
- `NEXT_PUBLIC_API_URL` must start with `https://` (not `http://`)
- Add to all environments (Production, Preview, Development)

### Step 4: Redeploy

After adding environment variables:
1. Go to **Deployments** tab
2. Click **"..."** on latest deployment → **"Redeploy"**
3. Wait for deployment to complete

### Step 5: Verify User Dashboard

1. Visit your Vercel URL: `https://user-dashboard.vercel.app` (or custom domain)
2. Test:
   - Submit a review with rating 1-5
   - Verify AI response appears
   - Check for errors in browser console

---

## 3. Admin Dashboard Deployment (Vercel)

### Step 1: Prepare Admin Dashboard

1. Ensure `admin-dashboard/vercel.json` exists (already created)
2. The dashboard reads `NEXT_PUBLIC_API_URL` from environment variables

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
cd admin-dashboard
vercel
```

Follow the prompts (similar to user dashboard):
- Project name: `admin-dashboard` (or your choice)

#### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository (same repo)
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `admin-dashboard`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
5. Click **"Deploy"**

### Step 3: Configure Environment Variables

After first deployment, go to **Settings** → **Environment Variables**:

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend-url.onrender.com` | Production, Preview, Development |

**Important:**
- Use the same backend URL as user dashboard
- Add to all environments

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment → **"Redeploy"**
3. Wait for deployment to complete

### Step 5: Verify Admin Dashboard

1. Visit your Vercel URL: `https://admin-dashboard.vercel.app` (or custom domain)
2. Test:
   - Verify reviews table loads
   - Check auto-refresh (every 10 seconds)
   - Verify data persists on refresh

---

## 4. Final Verification Checklist

### Backend Verification

- [ ] Backend URL is reachable: `https://your-backend-url.onrender.com/`
- [ ] Health check returns: `{"status":"success","message":"Backend running"}`
- [ ] DB test endpoint works: `https://your-backend-url.onrender.com/db-test`
- [ ] CORS is enabled (no CORS errors in browser console)

### User Dashboard Verification

- [ ] User dashboard loads: `https://user-dashboard.vercel.app`
- [ ] Can select rating (1-5)
- [ ] Can enter review text
- [ ] Submit button works
- [ ] AI response displays on success
- [ ] Error message displays on failure
- [ ] No console errors

### Admin Dashboard Verification

- [ ] Admin dashboard loads: `https://admin-dashboard.vercel.app`
- [ ] Reviews table displays
- [ ] Table shows: rating, review, ai_summary, ai_action, created_at
- [ ] Auto-refresh works (updates every 10 seconds)
- [ ] Data persists on page refresh
- [ ] No console errors

### End-to-End Test

1. **Submit Review:**
   - [ ] Go to user dashboard
   - [ ] Select rating: 5
   - [ ] Enter review: "Great product!"
   - [ ] Click Submit
   - [ ] Verify AI response appears

2. **View in Admin:**
   - [ ] Go to admin dashboard
   - [ ] Verify new review appears in table
   - [ ] Verify all columns are populated
   - [ ] Wait 10 seconds, verify auto-refresh works

3. **Data Persistence:**
   - [ ] Refresh admin dashboard
   - [ ] Verify review still appears
   - [ ] Submit another review from user dashboard
   - [ ] Verify it appears in admin dashboard

---

## Troubleshooting

### Backend Issues

**Problem:** Backend returns 503 or timeout
- **Solution:** Render free tier spins down after inactivity. First request may take 30-60 seconds.

**Problem:** Database connection errors
- **Solution:** Verify `DATABASE_URL` is correct in Render environment variables. Check Supabase connection string format.

**Problem:** CORS errors
- **Solution:** Backend already has CORS enabled. Verify frontend URLs are correct.

### Frontend Issues

**Problem:** "Failed to fetch" errors
- **Solution:** 
  - Verify `NEXT_PUBLIC_API_URL` is set correctly in Vercel
  - Ensure backend URL uses `https://` (not `http://`)
  - Check backend is running and accessible

**Problem:** Build fails on Vercel
- **Solution:**
  - Verify `package.json` has correct dependencies
  - Check build logs in Vercel dashboard
  - Ensure root directory is set correctly

**Problem:** Environment variables not working
- **Solution:**
  - Variables starting with `NEXT_PUBLIC_` must be set in Vercel
  - Redeploy after adding environment variables
  - Check variable names are exact (case-sensitive)

---

## URLs Summary

After deployment, you should have:

- **Backend:** `https://fynd-task-2-backend.onrender.com`
- **User Dashboard:** `https://user-dashboard.vercel.app`
- **Admin Dashboard:** `https://admin-dashboard.vercel.app`

Replace with your actual URLs from Render and Vercel dashboards.

---

## Production Notes

1. **Render Free Tier:**
   - Services spin down after 15 minutes of inactivity
   - First request after spin-down takes 30-60 seconds
   - Consider upgrading for production use

2. **Vercel Free Tier:**
   - Unlimited deployments
   - Automatic HTTPS
   - Global CDN

3. **Database:**
   - Supabase free tier includes PostgreSQL
   - Connection pooling recommended for production

4. **Security:**
   - Never commit `.env` files
   - Use environment variables for all secrets
   - Enable CORS only for your frontend domains

---

## Support

If you encounter issues:
1. Check deployment logs in Render/Vercel dashboards
2. Verify all environment variables are set correctly
3. Test backend endpoints directly using curl or Postman
4. Check browser console for frontend errors

