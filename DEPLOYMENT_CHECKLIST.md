# Deployment Checklist

## Pre-Deployment

- [ ] All code pushed to GitHub
- [ ] Supabase PostgreSQL database created
- [ ] Database table `reviews` created with columns: `id`, `rating`, `review`, `ai_response`, `ai_summary`, `ai_action`, `created_at`
- [ ] OpenAI API key obtained (optional)

---

## 1. Backend (Render)

### Setup
- [ ] Render account created
- [ ] GitHub repository connected to Render
- [ ] New Web Service created
- [ ] Root directory set to: `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`

### Environment Variables
- [ ] `NODE_ENV` = `production`
- [ ] `DATABASE_URL` = (Supabase PostgreSQL connection string)
- [ ] `PORT` = (auto-set by Render)
- [ ] `OPENAI_API_KEY` = (optional, for LLM features)

### Verification
- [ ] Backend URL obtained: `https://________________.onrender.com`
- [ ] Health check works: `GET /` returns success
- [ ] DB test works: `GET /db-test` returns success
- [ ] Backend accessible from browser

---

## 2. User Dashboard (Vercel)

### Setup
- [ ] Vercel account created
- [ ] GitHub repository connected to Vercel
- [ ] New Project created
- [ ] Root directory set to: `user-dashboard`
- [ ] Framework: Next.js (auto-detected)

### Environment Variables
- [ ] `NEXT_PUBLIC_API_URL` = `https://your-backend-url.onrender.com`
  - Replace with actual Render backend URL
  - Must use `https://` (not `http://`)
  - Added to: Production, Preview, Development

### Verification
- [ ] User dashboard URL obtained: `https://________________.vercel.app`
- [ ] Dashboard loads without errors
- [ ] Can submit review successfully
- [ ] AI response displays
- [ ] No console errors

---

## 3. Admin Dashboard (Vercel)

### Setup
- [ ] New Vercel Project created (separate from user dashboard)
- [ ] Root directory set to: `admin-dashboard`
- [ ] Framework: Next.js (auto-detected)

### Environment Variables
- [ ] `NEXT_PUBLIC_API_URL` = `https://your-backend-url.onrender.com`
  - Same URL as user dashboard
  - Must use `https://` (not `http://`)
  - Added to: Production, Preview, Development

### Verification
- [ ] Admin dashboard URL obtained: `https://________________.vercel.app`
- [ ] Dashboard loads without errors
- [ ] Reviews table displays
- [ ] Auto-refresh works (every 10 seconds)
- [ ] No console errors

---

## 4. End-to-End Testing

### Test Flow
1. [ ] Open user dashboard
2. [ ] Select rating: 5
3. [ ] Enter review text: "Test review"
4. [ ] Click Submit
5. [ ] Verify AI response appears
6. [ ] Open admin dashboard
7. [ ] Verify new review appears in table
8. [ ] Verify all columns populated: rating, review, ai_summary, ai_action, created_at
9. [ ] Wait 10 seconds, verify auto-refresh works
10. [ ] Refresh admin dashboard, verify data persists

### Data Persistence
- [ ] Submit multiple reviews from user dashboard
- [ ] All reviews appear in admin dashboard
- [ ] Refresh admin dashboard, all reviews still visible
- [ ] Data persists across browser sessions

---

## URLs Record

**Backend:**
```
https://________________.onrender.com
```

**User Dashboard:**
```
https://________________.vercel.app
```

**Admin Dashboard:**
```
https://________________.vercel.app
```

---

## Common Issues & Solutions

### Backend Issues

**Issue:** 503 timeout on first request
- **Solution:** Render free tier spins down. Wait 30-60 seconds for first response.

**Issue:** Database connection errors
- **Solution:** Verify `DATABASE_URL` format. Check Supabase connection string.

**Issue:** CORS errors
- **Solution:** Backend has CORS enabled. Verify frontend URLs are correct.

### Frontend Issues

**Issue:** "Failed to fetch" errors
- **Solution:** 
  - Check `NEXT_PUBLIC_API_URL` is set correctly
  - Ensure backend URL uses `https://`
  - Verify backend is running

**Issue:** Environment variables not working
- **Solution:**
  - Variables must start with `NEXT_PUBLIC_`
  - Redeploy after adding variables
  - Check variable names are exact

---

## Final Sign-Off

- [ ] All three services deployed successfully
- [ ] All environment variables configured
- [ ] End-to-end testing completed
- [ ] Data persistence verified
- [ ] No console errors
- [ ] All URLs documented

**Deployment Date:** _______________
**Deployed By:** _______________

