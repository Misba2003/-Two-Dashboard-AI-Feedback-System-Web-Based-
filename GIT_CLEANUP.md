# Git Cleanup Instructions

This document provides commands to remove tracked files that should not be committed.

## Prerequisites

Ensure you have Git installed and the repository is initialized.

## Step 1: Remove node_modules from Git Tracking

Run these commands to remove all `node_modules` folders from Git tracking:

```bash
# Remove root node_modules
git rm -r --cached node_modules

# Remove backend node_modules (if tracked)
git rm -r --cached backend/node_modules

# Remove user-dashboard node_modules (if tracked)
git rm -r --cached user-dashboard/node_modules

# Remove admin-dashboard node_modules (if tracked)
git rm -r --cached admin-dashboard/node_modules

# Remove all node_modules recursively
git rm -r --cached **/node_modules
```

## Step 2: Remove .env files from Git Tracking

Run these commands to remove all `.env` files from Git tracking:

```bash
# Remove root .env files
git rm --cached .env .env.local 2>/dev/null || true

# Remove backend .env files
git rm --cached backend/.env backend/.env.local 2>/dev/null || true

# Remove user-dashboard .env files
git rm --cached user-dashboard/.env user-dashboard/.env.local 2>/dev/null || true

# Remove admin-dashboard .env files
git rm --cached admin-dashboard/.env admin-dashboard/.env.local 2>/dev/null || true

# Remove all .env files recursively
git rm --cached **/.env **/.env.local **/.env*.local 2>/dev/null || true
```

## Step 3: Verify .gitignore is in place

Ensure the root `.gitignore` file exists and contains the required patterns (already created).

## Step 4: Commit Changes

After removing files from tracking, commit the changes:

```bash
git add .gitignore
git commit -m "chore: add .gitignore and remove node_modules/env files from tracking"
```

## Step 5: Verify

Check that files are no longer tracked:

```bash
# Check for tracked node_modules
git ls-files | grep node_modules

# Check for tracked .env files
git ls-files | grep "\.env"
```

Both commands should return nothing if cleanup was successful.

## Alternative: One-liner Commands

If you prefer, you can use these one-liner commands:

**Windows (PowerShell):**
```powershell
git rm -r --cached node_modules, backend/node_modules, user-dashboard/node_modules, admin-dashboard/node_modules -ErrorAction SilentlyContinue
git rm --cached .env, .env.local, backend/.env, backend/.env.local, user-dashboard/.env, user-dashboard/.env.local, admin-dashboard/.env, admin-dashboard/.env.local -ErrorAction SilentlyContinue
```

**Linux/Mac:**
```bash
git rm -r --cached node_modules backend/node_modules user-dashboard/node_modules admin-dashboard/node_modules 2>/dev/null || true
git rm --cached .env .env.local backend/.env backend/.env.local user-dashboard/.env user-dashboard/.env.local admin-dashboard/.env admin-dashboard/.env.local 2>/dev/null || true
```

## Important Notes

- The `--cached` flag removes files from Git tracking but **keeps them on your local filesystem**
- Files will remain in your working directory
- The `.gitignore` file will prevent these files from being tracked in the future
- If files don't exist, the commands will fail silently (which is fine)

## Verification Checklist

- [ ] Root `.gitignore` file exists
- [ ] `.gitignore` contains `node_modules/`
- [ ] `.gitignore` contains `.env` and `.env.local`
- [ ] `node_modules` folders removed from Git tracking
- [ ] `.env` files removed from Git tracking
- [ ] Changes committed
- [ ] Verified no tracked node_modules or .env files remain

