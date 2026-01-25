# Build Errors Fix Guide

## Issues Identified

1. **React Native Reanimated Version Incompatibility**
   - Error: `[Reanimated] Unsupported React Native version. Please use 78. or newer.`
   - Cause: `react-native-reanimated@3.6.0` requires RN 0.78+, but project uses RN 0.72.6
   - **Fix Applied**: Downgraded to `react-native-reanimated@~3.3.0` (compatible with RN 0.72.6)

2. **Kotlin JVM Target Mismatch**
   - Error: `'compileDebugJavaWithJavac' task (current target is 11) and 'compileDebugKotlin' task (current target is 1.8) jvm target compatibility should be set to the same Java version.`
   - Cause: Kotlin and Java compilation targets were not aligned
   - **Fix Applied**: Added `compileOptions` and `kotlinOptions` to `android/app/build.gradle` to set both to Java 11

3. **R8/D8 NullPointerException During Dexing**
   - Error: `java.lang.NullPointerException: Cannot invoke "String.length()" because "<parameter1>" is null`
   - Cause: Likely corrupted Gradle cache or R8/D8 compatibility issue
   - **Fix Required**: Clean Gradle caches (see instructions below)

## Steps to Fix

### 1. Update Dependencies

The `package.json` has been updated. Run:

```bash
cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
npm install
```

### 2. Clean Gradle Caches

The R8/D8 NullPointerException is likely due to corrupted Gradle cache. Clean it:

```bash
cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp/android

# Clean project build artifacts
./gradlew clean

# Remove local Gradle caches
rm -rf .gradle
rm -rf app/build
rm -rf build

# Clean global Gradle cache (this will force re-download of dependencies)
rm -rf ~/.gradle/caches/
rm -rf ~/.gradle/wrapper/dists/

# Remove transformed artifacts that might be corrupted
rm -rf ~/.gradle/caches/transforms-3/
```

### 3. Rebuild in Android Studio

1. Open Android Studio
2. File → Invalidate Caches / Restart → Invalidate and Restart
3. Wait for Gradle sync to complete
4. Build → Clean Project
5. Build → Rebuild Project

### 4. Alternative: If R8/D8 Error Persists

If the NullPointerException in R8/D8 continues after cleaning caches, it might be an issue with the R8 version bundled with AGP 7.4.2. Try disabling R8 temporarily to see if the build completes:

In `android/app/build.gradle`, add to the `android` block:

```gradle
android {
    // ... existing config ...
    
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
            // Temporarily disable R8 to test
            // minifyEnabled false
        }
    }
}
```

However, this is just for testing. The real fix is usually cleaning the cache.

## Expected Results

After these fixes:
- ✅ React Native Reanimated should work with RN 0.72.6
- ✅ Kotlin compilation should succeed with matching JVM targets
- ✅ R8/D8 dexing should work after cache cleanup

## Verification

After cleaning caches and rebuilding, you should see:
- No more "Unsupported React Native version" error
- No more Kotlin JVM target mismatch errors
- No more NullPointerException during dexing

If errors persist, check:
1. Java version is 17 (not 21): `java -version`
2. Gradle is using Java 17: Check Android Studio → Settings → Build → Gradle → Gradle JDK
3. All dependencies are properly installed: `npm install` completed successfully
