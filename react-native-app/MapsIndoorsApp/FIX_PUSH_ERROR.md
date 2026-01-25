# Fixing Repository Rule Violations for Git Push

## ⚠️ Issue

**Error:** `push declined due to repository rule violations`

**Cause:** GitHub detected sensitive tokens (Mapbox API keys) in the commit history, even though they've been removed from the latest commits.

## 🔍 Problem

The tokens are still present in earlier commits in the history:
- Commit `2acb3475` - "Update Mapbox Downloads Token in gradle.properties"
- Other commits that added/modified `gradle.properties` and `mapbox_access_token.xml`

GitHub's repository rules scan the entire commit history being pushed, not just the latest commit.

## 🔧 Solutions

### Option 1: Interactive Rebase (Recommended for Small History)

Remove the tokens from commit history using interactive rebase:

```bash
cd /Users/juanprice/Maps/web-ui

# Start interactive rebase from before the first commit with tokens
git rebase -i 2acb3475^  # Rebase from before the problematic commit

# In the editor, mark commits to edit:
# - Change "pick" to "edit" for commits that contain tokens
# - Save and close

# For each commit marked for edit:
# 1. Remove the token from the file
# 2. git add android/gradle.properties (or other files)
# 3. git commit --amend --no-edit
# 4. git rebase --continue

# Repeat until all commits are cleaned
```

### Option 2: Create New Branch Without History

If the history cleanup is too complex, create a fresh branch:

```bash
cd /Users/juanprice/Maps/web-ui

# Create a new branch from origin/react_native (clean state)
git checkout origin/react_native
git checkout -b react_native_clean

# Cherry-pick only the commits you want (excluding token commits)
# Or manually apply the changes without tokens

# Then push the new branch
git push origin react_native_clean
```

### Option 3: Use BFG Repo-Cleaner (Advanced)

Remove tokens from entire history:

```bash
# Install BFG (if not installed)
# brew install bfg  # or download from https://rtyley.github.io/bfg-repo-cleaner/

cd /Users/juanprice/Maps/web-ui

# Create a file with tokens to remove
echo "your_secret_token_here" > tokens.txt
echo "pk.eyJ1IjoianByaWNlNjc5MSIsImEiOiJjbWtqNWo3OHoxMnI5M2NwbmlwM2locDhlIn0._L18RGG3ZVn-QeD6zs-MEQ" >> tokens.txt

# Clean the repository
bfg --replace-text tokens.txt

# Clean up
rm tokens.txt
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (WARNING: This rewrites history)
git push origin react_native --force
```

### Option 4: Contact Repository Admin

If you don't have permission to rewrite history or force push:
- Contact the repository administrator
- Ask them to temporarily disable the repository rule
- Or ask them to help clean the history

## ✅ Quick Fix: Remove Tokens from Specific Commits

If you want to fix just the recent commits:

```bash
cd /Users/juanprice/Maps/web-ui

# Check which commits have tokens
git log origin/react_native..HEAD -S "sk.ey" --oneline

# For each commit, create a fix commit that removes the token
# Then squash or amend as needed
```

## 🎯 Recommended Approach

**For your situation**, I recommend **Option 2** (new clean branch) because:
1. It's safer (doesn't rewrite shared history)
2. It's simpler (no complex rebase)
3. You can keep the old branch for reference
4. The new branch will be clean from the start

## 📋 Steps for Option 2 (New Clean Branch)

```bash
cd /Users/juanprice/Maps/web-ui

# 1. Create new branch from clean state
git checkout origin/react_native
git checkout -b react_native_clean

# 2. Apply all changes except token files
# (Copy files manually or use git checkout from your local branch, excluding sensitive files)

# 3. Commit the clean version
git add react-native-app/
git commit -m "Add React Native app (clean, no tokens)"

# 4. Push new branch
git push origin react_native_clean
```

## ⚠️ Important Notes

- **Never force push to shared branches** without team approval
- **Tokens in history are a security risk** - they should be rotated if exposed
- **Local files are fine** - the .gitignore prevents them from being committed going forward
- **The tokens are already exposed** in the commit history, so consider rotating them

## 🔒 Security Recommendation

Since the tokens are in the commit history, you should:
1. **Rotate the Mapbox tokens** - Generate new ones from Mapbox dashboard
2. **Update local files** with new tokens
3. **Clean the history** before pushing

Would you like me to help you create a clean branch or clean the history?
