# Android Studio Setup Guide

## ✅ Build Status

**Command Line Build:** ✅ **SUCCESSFUL**
- The project compiles successfully from the command line
- This means it **should compile in Android Studio** as well

## 🚀 Steps to Build in Android Studio

### Step 1: Open Project in Android Studio

1. Open Android Studio
2. **File → Open**
3. Navigate to: `/Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp/android`
4. Click **OK**

### Step 2: Configure Gradle JDK (CRITICAL)

**IMPORTANT:** Android Studio must use Java 17, not Java 21!

1. **File → Settings** (or **Android Studio → Preferences** on Mac)
2. **Build, Execution, Deployment → Build Tools → Gradle**
3. **Gradle JDK:** Select **"Embedded JDK"** or **"jbr-17"** (Java 17)
   - ⚠️ **DO NOT** use Java 21 - it's incompatible with Gradle 7.6.3
4. Click **Apply** and **OK**

### Step 3: Sync Gradle Files

1. Android Studio will automatically prompt to sync Gradle files
2. If not, click **File → Sync Project with Gradle Files**
3. Wait for sync to complete (may take a few minutes on first sync)

### Step 4: Clean and Rebuild

1. **Build → Clean Project**
2. Wait for clean to complete
3. **Build → Rebuild Project**

### Step 5: Build APK

1. **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. Wait for build to complete
3. APK will be in: `app/build/outputs/apk/debug/app-debug.apk`

## ⚠️ If Build Fails in Android Studio

### Issue 1: Java Version Mismatch

**Error:** `Your build is currently configured to use incompatible Java 21.0.6 and Gradle 7.6.3`

**Solution:**
- Follow Step 2 above to set Gradle JDK to Java 17
- **File → Invalidate Caches / Restart → Invalidate and Restart**

### Issue 2: D8 NullPointerException

**Error:** `java.lang.NullPointerException: Cannot invoke "String.length()" because "<parameter1>" is null`

**Solution:**
1. Close Android Studio
2. Run from terminal:
   ```bash
   cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp/android
   rm -rf ~/.gradle/caches/transforms-3/
   ./gradlew clean
   ```
3. Reopen Android Studio
4. **File → Invalidate Caches / Restart → Invalidate and Restart**
5. **Build → Rebuild Project**

### Issue 3: Gradle Sync Fails

**Error:** Gradle sync fails with dependency errors

**Solution:**
1. **File → Invalidate Caches / Restart → Invalidate and Restart**
2. **File → Sync Project with Gradle Files**
3. If still failing, check that `MAPBOX_DOWNLOADS_TOKEN` is set in `gradle.properties`

### Issue 4: Kotlin Compilation Errors

**Error:** `Unresolved reference: BaseReactPackage` or similar

**Solution:**
- This should be fixed with the downgraded library versions
- If it appears, run:
  ```bash
  cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
  npm install
  ```
- Then sync Gradle files again

## 📋 Verification Checklist

Before building in Android Studio, ensure:

- ✅ Java 17 is configured as Gradle JDK (not Java 21)
- ✅ `gradle.properties` contains `MAPBOX_DOWNLOADS_TOKEN`
- ✅ All dependencies are installed: `npm install` completed successfully
- ✅ Transforms cache is clean (if D8 errors appear)

## 🎯 Expected Result

After following these steps:
- ✅ Gradle sync completes successfully
- ✅ Build completes without errors
- ✅ APK is generated in `app/build/outputs/apk/debug/`
- ✅ You can run the app on an emulator or device

## 💡 Tips

1. **First Time Setup:** The first Gradle sync may take 5-10 minutes as it downloads dependencies
2. **Use Command Line for Troubleshooting:** If Android Studio has issues, you can always build from command line: `./gradlew assembleDebug`
3. **Check Build Logs:** If build fails, check the **Build** tab at the bottom of Android Studio for detailed error messages

## 🔍 Quick Test

To quickly verify everything is set up correctly:

1. Open Android Studio
2. Open the project
3. Check **File → Settings → Build Tools → Gradle → Gradle JDK** shows Java 17
4. Click **File → Sync Project with Gradle Files**
5. If sync succeeds, you're good to go! 🎉
