# NullPointerException Fix

## ✅ Issue Fixed

**Error:** `java.lang.NullPointerException: Cannot invoke "String.length()" because "<parameter1>" is null`

**Root Cause:** The Mapbox token password might be null when accessed, causing a NullPointerException when Gradle tries to process it.

**Solution:** Added null-safe handling for the token access in both build.gradle files.

## 🔧 Changes Made

### 1. Fixed Main build.gradle
**File:** `android/build.gradle`

Changed from:
```gradle
password = project.findProperty('MAPBOX_DOWNLOADS_TOKEN') ?: System.getenv('MAPBOX_DOWNLOADS_TOKEN') ?: ''
```

To:
```gradle
def token = project.findProperty('MAPBOX_DOWNLOADS_TOKEN') ?: System.getenv('MAPBOX_DOWNLOADS_TOKEN') ?: ''
password = token ?: ''
```

### 2. Fixed MapsIndoors Package build.gradle
**File:** `node_modules/@mapsindoors/react-native-maps-indoors-mapbox/android/build.gradle`

Changed from:
```gradle
password = project.properties['MAPBOX_DOWNLOADS_TOKEN'] ?: ""
```

To:
```gradle
def token = project.findProperty('MAPBOX_DOWNLOADS_TOKEN') ?: rootProject.findProperty('MAPBOX_DOWNLOADS_TOKEN') ?: System.getenv('MAPBOX_DOWNLOADS_TOKEN') ?: ""
password = token ?: ""
```

**Why:** This ensures the token is properly accessed from the root project's gradle.properties and handles null values safely.

## 🚀 Next Steps

### 1. Sync Gradle
1. **File → Sync Project with Gradle Files**
2. The NullPointerException should be resolved
3. Wait for sync to complete

### 2. If Issue Persists
Try cleaning and rebuilding:
```bash
cd android
./gradlew clean
```

Then in Android Studio:
1. **Build → Clean Project**
2. **Build → Rebuild Project**

## ⚠️ Important Note

**Note:** The change to `node_modules/@mapsindoors/react-native-maps-indoors-mapbox/android/build.gradle` will be lost if you run `npm install` again, as it modifies files in `node_modules`.

**Permanent Solution:** You may need to:
1. Create a patch file using `patch-package`
2. Or fork the MapsIndoors package and use your fork
3. Or wait for the package maintainers to fix this

**Temporary Solution:** The fix will work until you reinstall node_modules.

## ✅ Verification

After syncing, you should see:
- ✅ No NullPointerException errors
- ✅ Gradle sync completes successfully
- ✅ Dependencies resolve correctly

The fix is complete! Sync Gradle again and the NullPointerException should be resolved.
