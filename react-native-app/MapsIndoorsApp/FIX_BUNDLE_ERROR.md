# Fix "Unable to Load Script" - Bundle Error

## ✅ Issue

**Error:** "Unable to load script. Make sure you're either running Metro (run 'npx react-native start') or that your bundle 'index.android.bundle' is packaged correctly for release"

**Root Cause:** The app is trying to load a pre-bundled JavaScript file instead of connecting to Metro bundler.

## 🚀 Solution

### Option 1: Connect to Metro (Development - Recommended)

The app should connect to Metro in debug mode. Follow these steps:

#### Step 1: Ensure Metro is Running

```bash
cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
npm start
```

Keep Metro running!

#### Step 2: Open Developer Menu

**On Emulator:**
- Press `Cmd + M` (Mac) or `Ctrl + M` (Windows)
- OR: `adb shell input keyevent 82`

**On Physical Device:**
- Shake the device
- OR: `adb shell input keyevent 82`

#### Step 3: Configure Debug Server

1. Tap **"Settings"** in Dev Menu
2. Tap **"Debug server host & port for device"**
3. Enter:
   - **Emulator:** `localhost:8081`
   - **Physical Device:** `YOUR_IP:8081` (find IP with `ipconfig getifaddr en0`)
4. Tap **OK**

#### Step 4: Reload App

- Tap **"Reload"** in Dev Menu
- OR press `r` in Metro terminal
- OR double-tap `R` on device

### Option 2: Create Bundle File (If Option 1 Doesn't Work)

If the app still can't connect to Metro, create the bundle file:

```bash
cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp

# Create assets directory
mkdir -p android/app/src/main/assets

# Generate bundle
npx react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res

# Rebuild app
cd android
./gradlew assembleDebug
```

### Option 3: Reinstall App with Metro Running

Sometimes the app gets into a bad state. Try:

```bash
# Terminal 1: Start Metro
cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
npm start

# Terminal 2: Uninstall and reinstall
adb uninstall com.mapsindoorsapp
npm run android
```

## 🔍 Troubleshooting

### Check 1: Is App in Debug Mode?

Make sure you're building debug, not release:

```bash
# Should be:
./gradlew assembleDebug

# NOT:
./gradlew assembleRelease
```

### Check 2: Is Metro Accessible?

```bash
# Test Metro
curl http://localhost:8081/status

# Should return: packager-status:running
```

### Check 3: Check App Logs

```bash
adb logcat | grep -i "reactnative\|metro\|bundle"
```

Look for:
- Connection attempts to Metro
- Bundle loading errors
- Network errors

### Check 4: Verify Build Configuration

The app should be configured to connect to Metro in debug mode. Check `android/app/build.gradle` - it should have:

```gradle
buildTypes {
    debug {
        // Should NOT have bundleInDebug: true
    }
}
```

## 📋 Quick Fix Checklist

- [ ] Metro is running (`npm start`)
- [ ] App is built in debug mode (`assembleDebug`)
- [ ] Dev Menu opened on device
- [ ] Debug server address set correctly
- [ ] App reloaded after setting address
- [ ] No bundle file in `android/app/src/main/assets/` (for debug mode)

## 🎯 Expected Behavior

**Debug Mode (Development):**
- App connects to Metro bundler
- JavaScript loads from Metro
- Hot reload works
- No bundle file needed

**Release Mode (Production):**
- App uses pre-bundled file
- Bundle file must exist in `android/app/src/main/assets/`
- No Metro connection needed

## ⚠️ Important Notes

1. **For Development:** Use Metro (Option 1) - no bundle file needed
2. **For Release:** Create bundle file (Option 2) - required for production builds
3. **Debug builds should connect to Metro** - if they don't, check Dev Menu settings

## 🆘 Still Not Working?

1. **Try creating bundle file** (Option 2) - this will work even if Metro connection fails
2. **Check if app is in release mode:**
   ```bash
   adb shell dumpsys package com.mapsindoorsapp | grep -i "debuggable"
   ```
   Should show `debuggable=true` for debug builds

3. **Full reset:**
   ```bash
   # Stop Metro
   # Then:
   npm start -- --reset-cache
   
   # Uninstall app
   adb uninstall com.mapsindoorsapp
   
   # Rebuild and install
   cd android
   ./gradlew clean assembleDebug
   cd ..
   npm run android
   ```

The key is ensuring the app connects to Metro in debug mode! 🎯
