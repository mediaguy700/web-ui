# Git Push Error - Repository Rule Violations

## ✅ Problem Identified

GitHub is blocking the push because **sensitive tokens are in the commit history**:
- Commit `2acb3475` contains `MAPBOX_DOWNLOADS_TOKEN` (sk.ey...)
- Commit `9c5e6f97` contains Mapbox public token (pk.ey...)
- Even though we removed them in latest commits, they're still in history

## 🔧 Solutions

### Solution 1: Create New Clean Branch (Easiest)

```bash
cd /Users/juanprice/Maps/web-ui

# Create new branch from clean remote state
git checkout origin/react_native
git checkout -b react_native_clean

# Copy all files except sensitive ones
git checkout react_native -- react-native-app/
git rm react-native-app/MapsIndoorsApp/android/gradle.properties
git rm react-native-app/MapsIndoorsApp/android/app/src/main/res/values/mapbox_access_token.xml
git rm react-native-app/MapsIndoorsApp/android/app/src/main/assets/index.android.bundle

# Commit clean version
git add react-native-app/
git commit -m "Add React Native app (clean, no tokens in history)"

# Push new branch
git push origin react_native_clean
```

### Solution 2: Interactive Rebase (Clean History)

```bash
cd /Users/juanprice/Maps/web-ui

# Start rebase before first token commit
git rebase -i 2acb3475^

# In editor, change "pick" to "edit" for commits:
# - 2acb3475 (Update Mapbox Downloads Token)
# - 9c5e6f97 (Enhance Android build configuration)
# - Any others with tokens

# For each commit marked "edit":
# 1. Remove token from file
# 2. git add <file>
# 3. git commit --amend --no-edit
# 4. git rebase --continue

# After rebase completes:
git push origin react_native --force-with-lease
```

### Solution 3: Contact Admin (If No Force Push Permission)

If you can't force push:
1. Contact repository administrator
2. Ask to temporarily disable repository rule
3. Or ask them to clean the history

## 🎯 Recommended: Solution 1 (New Branch)

**Why:**
- ✅ Safer (doesn't rewrite shared history)
- ✅ Simpler (no complex rebase)
- ✅ Can keep old branch for reference
- ✅ Clean from the start

## ⚠️ Security Note

Since tokens are already in the commit history:
1. **Rotate the tokens** - Generate new ones from Mapbox
2. **Update local files** with new tokens
3. **Clean history** before pushing

## 📋 Quick Steps for Solution 1

```bash
# 1. Create clean branch
git checkout origin/react_native
git checkout -b react_native_clean

# 2. Copy React Native app files (excluding tokens)
git checkout react_native -- react-native-app/MapsIndoorsApp/

# 3. Remove sensitive files
git rm react-native-app/MapsIndoorsApp/android/gradle.properties
git rm react-native-app/MapsIndoorsApp/android/app/src/main/res/values/mapbox_access_token.xml
git rm react-native-app/MapsIndoorsApp/android/app/src/main/assets/index.android.bundle

# 4. Commit
git add react-native-app/
git commit -m "Add React Native app - clean version without tokens"

# 5. Push
git push origin react_native_clean
```

Then you can:
- Use `react_native_clean` as your main branch
- Delete `react_native` branch later (after confirming clean branch works)
- Or merge `react_native_clean` into `react_native` after cleaning
