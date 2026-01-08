# Exact Git Commands to Push to GitHub

Run these commands **in order** from the repository root directory (`fynd_task_2/`).

## Prerequisites

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

Example: If your GitHub URL is `https://github.com/john-doe/fynd_task_2`, then:
- `YOUR_USERNAME` = `john-doe`
- `YOUR_REPO_NAME` = `fynd_task_2`

---

## Step 1: Initialize Git (if not already initialized)

```bash
git init
```

---

## Step 2: Remove Sensitive Files from Tracking (if already tracked)

```bash
# Remove node_modules from Git tracking (keeps files locally)
git rm -r --cached node_modules 2>/dev/null || true
git rm -r --cached backend/node_modules 2>/dev/null || true
git rm -r --cached user-dashboard/node_modules 2>/dev/null || true
git rm -r --cached admin-dashboard/node_modules 2>/dev/null || true

# Remove .env files from Git tracking (keeps files locally)
git rm --cached .env 2>/dev/null || true
git rm --cached .env.local 2>/dev/null || true
git rm --cached backend/.env 2>/dev/null || true
git rm --cached backend/.env.local 2>/dev/null || true
git rm --cached user-dashboard/.env.local 2>/dev/null || true
git rm --cached admin-dashboard/.env.local 2>/dev/null || true
```

---

## Step 3: Add All Files to Staging

```bash
git add .
```

---

## Step 4: Make Initial Commit

```bash
git commit -m "Initial commit: Complete monorepo with backend and dashboards"
```

**OR** if you've already made commits and just want to add new changes:

```bash
git commit -m "chore: add .gitignore and cleanup repository"
```

---

## Step 5: Set Branch to Main

```bash
# Rename current branch to main (if on master or other branch)
git branch -M main
```

---

## Step 6: Add Remote Repository

**Option A: If remote doesn't exist yet:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Option B: If remote already exists, update it:**

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Option C: Check if remote exists:**

```bash
git remote -v
```

If you see output, remote already exists. If not, use Option A.

---

## Step 7: Push to GitHub

**If this is the first push (empty repository on GitHub):**

```bash
git push -u origin main
```

**If repository already has content and you want to force push (⚠️ use with caution):**

```bash
git push -u origin main --force
```

**If repository already has content and you want to merge:**

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## Complete Command Sequence (Copy-Paste Ready)

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` before running:

```bash
# Step 1: Initialize (if needed)
git init

# Step 2: Remove sensitive files from tracking
git rm -r --cached node_modules 2>/dev/null || true
git rm -r --cached backend/node_modules 2>/dev/null || true
git rm -r --cached user-dashboard/node_modules 2>/dev/null || true
git rm -r --cached admin-dashboard/node_modules 2>/dev/null || true
git rm --cached .env .env.local backend/.env backend/.env.local user-dashboard/.env.local admin-dashboard/.env.local 2>/dev/null || true

# Step 3: Add all files
git add .

# Step 4: Commit
git commit -m "Initial commit: Complete monorepo with backend and dashboards"

# Step 5: Set branch to main
git branch -M main

# Step 6: Add remote (replace YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Step 7: Push to GitHub
git push -u origin main
```

---

## Troubleshooting

### Error: "remote origin already exists"
```bash
# Remove existing remote
git remote remove origin

# Add remote again
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Error: "failed to push some refs"
```bash
# Pull and merge first
git pull origin main --allow-unrelated-histories

# Then push
git push -u origin main
```

### Error: "authentication failed"
```bash
# Use GitHub CLI (if installed)
gh auth login

# OR use personal access token
# GitHub → Settings → Developer settings → Personal access tokens → Generate new token
# Then use token as password when prompted
```

### Error: "branch 'main' does not exist"
```bash
# Create and switch to main branch
git checkout -b main

# Then push
git push -u origin main
```

---

## Verification Commands

After pushing, verify everything is correct:

```bash
# Check remote URL
git remote -v

# Check current branch
git branch

# Check status
git status

# Verify no sensitive files are tracked
git ls-files | grep node_modules
git ls-files | grep "\.env"
```

Both `grep` commands should return nothing if cleanup was successful.

---

## Quick Reference

**Your GitHub Repository URL Format:**
```
https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Example:**
```
https://github.com/john-doe/fynd_task_2.git
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual values.

