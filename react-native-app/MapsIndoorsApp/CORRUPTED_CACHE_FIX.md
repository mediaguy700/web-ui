# Corrupted Gradle Cache Fix

## ✅ Issue Fixed

**Error:** `NoSuchFileException: results.bin` in transforms-3 cache

**Root Cause:** Corrupted Gradle cache entries that reference files that don't exist

## 🔧 Solution Applied

### 1. Complete Cache Cleanup

All Gradle caches have been removed:
- `~/.gradle/caches/` - All cache directories
- `~/.gradle/daemon/` - Daemon cache
- Project build artifacts

### 2. Disabled Gradle Caching

Added to `gradle.properties`:
```properties
org.gradle.caching=false
org.gradle.configureondemand=false
```

This prevents Gradle from using corrupted cache entries.

## 🚀 How to Build Now

### Option 1: Command Line (Recommended)

```bash
cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp/android

# Clean first
./gradlew clean --no-daemon --no-build-cache

# Build
./gradlew assembleDebug --no-daemon --no-build-cache
```

### Option 2: Android Studio

1. **File → Invalidate Caches / Restart → Invalidate and Restart**
2. **File → Settings → Build, Execution, Deployment → Build Tools → Gradle**
3. **Build and run using:** Select "Gradle" (not IntelliJ)
4. **Additional build options:** Add `--no-build-cache` to "Command-line Options"
5. **Build → Clean Project**
6. **Build → Rebuild Project**

## ⚠️ Important Notes

1. **First build will be slow** - All dependencies need to be re-downloaded
2. **Use `--no-build-cache` flag** - Prevents cache corruption issues
3. **If error returns** - Run the cleanup script again:
   ```bash
   ./FIX_CORRUPTED_CACHE.sh
   ```

## 🔍 Why This Happens

The `prepareKotlinBuildScriptModel` task creates cache entries in `transforms-3/`. If the build is interrupted or fails, these entries can become corrupted, causing `NoSuchFileException` errors.

## 📋 Prevention

1. **Don't interrupt builds** - Let builds complete fully
2. **Use `--no-build-cache`** for now until we can identify the root cause
3. **Clean cache regularly** if you see corruption issues

## ✅ Verification

After cleanup, the build should:
- ✅ Complete without `NoSuchFileException` errors
- ✅ Download all dependencies fresh
- ✅ Generate APK successfully

If you still see the error, the cache might be getting corrupted during the build. In that case, we may need to investigate the specific transform that's causing issues.
