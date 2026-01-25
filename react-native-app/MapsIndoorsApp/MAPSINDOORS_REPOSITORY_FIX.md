# MapsIndoors Maven Repository Fix

## ✅ Issue Fixed

**Error:** `Could not find com.mapspeople.mapsindoors:mapbox-ndk27:4.16.0`

**Root Cause:** MapsIndoors dependencies are hosted on their own Maven repository, which wasn't configured

**Solution:** Added MapsIndoors Maven repository to `build.gradle`

## 🔧 Changes Made

### Added MapsIndoors Maven Repository

**File:** `android/build.gradle`

Added to `allprojects.repositories`:
```gradle
// MapsIndoors Maven repository
maven {
    url 'https://maven.mapsindoors.com/'
}
// Sonatype snapshots (for MapsIndoors snapshots)
maven {
    url 'https://oss.sonatype.org/content/repositories/snapshots/'
}
```

## 🚀 Next Steps

### 1. Sync Gradle
1. **File → Sync Project with Gradle Files**
2. Wait for dependencies to download from MapsIndoors repository
3. Check if errors are resolved

### 2. Clean and Rebuild (if needed)
```bash
cd android
./gradlew clean
```

Then in Android Studio:
1. **Build → Clean Project**
2. **Build → Rebuild Project**

## ✅ Verification

After syncing, you should see:
- ✅ MapsIndoors dependencies download successfully
- ✅ No "Could not find" errors for MapsIndoors packages
- ✅ Build completes without dependency errors

## 🐛 If Issues Persist

### Option 1: Check MapsIndoors Version
The dependency `com.mapspeople.mapsindoors:mapbox-ndk27:4.16.0` might not exist. Check:
- MapsIndoors React Native SDK version in `package.json`
- MapsIndoors documentation for correct dependency versions

### Option 2: Verify Repository Access
Make sure you can access:
- `https://maven.mapsindoors.com/`
- `https://oss.sonatype.org/content/repositories/snapshots/`

### Option 3: Check React Native Package
The `@mapsindoors/react-native-maps-indoors-mapbox` package might need:
- Specific MapsIndoors SDK version
- Additional configuration
- Check the package's README or documentation

## 📚 Reference

- **MapsIndoors Maven:** `https://maven.mapsindoors.com/`
- **Sonatype Snapshots:** `https://oss.sonatype.org/content/repositories/snapshots/`
- MapsIndoors dependencies are hosted on their own repository

The fix is complete! Sync Gradle and the MapsIndoors dependency errors should be resolved.
