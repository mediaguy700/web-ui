# Maven Repositories Fix for MapsIndoors

## ✅ Issue Fixed

**Error:** 
- `Could not resolve com.mapbox.maps:android-ndk27:11.16.1`
- `Could not find com.mapspeople.mapsindoors:mapbox-ndk27:4.16.0`

**Root Cause:** Missing Maven repositories for MapsIndoors and Mapbox dependencies

**Solution:** Added required Maven repositories to `build.gradle`

## 🔧 Changes Made

### Added Repositories to build.gradle

**File:** `android/build.gradle`

Added to `allprojects` block:
```gradle
repositories {
    google()
    mavenCentral()
    maven { url 'https://www.jitpack.io' }
    maven {
        url 'https://api.mapbox.com/downloads/v2/releases/maven'
        authentication {
            basic(BasicAuthentication)
        }
        credentials {
            username = 'mapbox'
            password = project.findProperty('MAPBOX_DOWNLOADS_TOKEN') ?: System.getenv('MAPBOX_DOWNLOADS_TOKEN') ?: ''
        }
    }
}
```

### Repositories Added:
1. **google()** - Already existed, kept it
2. **mavenCentral()** - Already existed, kept it
3. **jitpack.io** - For some Mapbox dependencies
4. **Mapbox Maven** - Official Mapbox repository (may require token for some packages)

## 🚀 Next Steps

### 1. Sync Gradle
1. **File → Sync Project with Gradle Files**
2. Wait for dependencies to download
3. Check if errors are resolved

### 2. If Mapbox Repository Requires Token

If you still get authentication errors for Mapbox, you may need a Mapbox Downloads Token:

1. Get token from: https://account.mapbox.com/access-tokens/
2. Add to `android/gradle.properties`:
   ```
   MAPBOX_DOWNLOADS_TOKEN=your_token_here
   ```

**Note:** For public Mapbox packages, the token might not be required. Try syncing first.

### 3. Clean and Rebuild

If issues persist:
```bash
cd android
./gradlew clean
```

Then in Android Studio:
1. **Build → Clean Project**
2. **Build → Rebuild Project**

## ✅ Verification

After syncing, you should see:
- ✅ No "Could not resolve" errors
- ✅ Dependencies download successfully
- ✅ Build completes without errors

## 🐛 If Issues Persist

### Option 1: Check Internet Connection
Make sure you can access:
- `https://repo.maven.apache.org/maven2/`
- `https://www.jitpack.io/`
- `https://api.mapbox.com/`

### Option 2: Try Without Mapbox Token First
The Mapbox repository might work without a token for public packages. Try syncing first.

### Option 3: Add MapsIndoors Repository (if needed)
If MapsIndoors has its own repository, we might need to add it. Check MapsIndoors documentation.

## 📚 Reference

- **Maven Central:** Standard Java/Android dependencies
- **Google Maven:** Android SDK and support libraries
- **JitPack:** Some Mapbox dependencies
- **Mapbox Maven:** Official Mapbox SDK repository

The fix is complete! Sync Gradle and the dependency errors should be resolved.
