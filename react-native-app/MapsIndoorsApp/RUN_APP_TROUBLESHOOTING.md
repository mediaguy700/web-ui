# Running the App - Troubleshooting Guide

## ✅ Build Status: SUCCESSFUL

Your app builds successfully, but you can't run it. Here are the most common issues and solutions:

## 🔍 Common Issues & Solutions

### Issue 1: Metro Bundler Not Running

**Symptoms:**
- App installs but shows blank screen
- Error: "Unable to connect to Metro bundler"
- Error: "Could not connect to development server"

**Solution:**
1. **Start Metro Bundler** in a separate terminal:
   ```bash
   cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
   npm start
   ```
2. Keep Metro running (don't close the terminal)
3. The Metro bundler must be running **before** you launch the app

### Issue 2: Device/Emulator Not Connected

**Symptoms:**
- Error: "No devices found"
- App doesn't install
- `adb devices` shows no devices

**Solution for Android:**

1. **Check if device is connected:**
   ```bash
   adb devices
   ```
   Should show your device or emulator

2. **If using emulator:**
   - Open Android Studio
   - Tools → Device Manager
   - Start an emulator
   - Wait for it to fully boot

3. **If using physical device:**
   - Enable USB debugging on your Android device
   - Connect via USB
   - Accept the USB debugging prompt on device
   - Run `adb devices` to verify

### Issue 3: App Crashes on Startup

**Symptoms:**
- App opens then immediately closes
- "App has stopped" error
- Crash logs in logcat

**Solution:**

1. **Check crash logs:**
   ```bash
   # For Android
   adb logcat | grep -i "error\|exception\|crash"
   
   # Or view full logs
   adb logcat
   ```

2. **Common crash causes:**
   - Missing Metro bundler (see Issue 1)
   - JavaScript errors in App.js
   - Missing native dependencies
   - Permission issues

### Issue 4: Wrong Way to Run the App

**❌ DON'T:**
- Just build the APK and install it manually
- Run from Android Studio without Metro bundler
- Build and expect it to work without `npm start`

**✅ DO:**
1. **Terminal 1 - Start Metro:**
   ```bash
   cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
   npm start
   ```

2. **Terminal 2 - Run the app:**
   ```bash
   cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
   npm run android
   ```
   
   OR in Android Studio:
   - Make sure Metro is running (Terminal 1)
   - Click the **Run** button (▶️) in Android Studio

## 🚀 Correct Way to Run the App

### Method 1: Command Line (Recommended)

**Step 1: Start Metro Bundler**
```bash
cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
npm start
```
Keep this terminal open!

**Step 2: In a NEW terminal, run the app**
```bash
cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
npm run android
```

This will:
- Install the app on your device/emulator
- Connect to Metro bundler
- Launch the app

### Method 2: Android Studio

**Step 1: Start Metro Bundler** (in terminal):
```bash
cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
npm start
```

**Step 2: In Android Studio:**
1. Open the project: `/Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp/android`
2. Wait for Gradle sync
3. Select device/emulator from dropdown
4. Click **Run** button (▶️)

## 🔧 Quick Diagnostic Commands

Run these to diagnose the issue:

```bash
# 1. Check if Metro is running
curl http://localhost:8081/status

# 2. Check if device is connected (Android)
adb devices

# 3. Check if app is installed
adb shell pm list packages | grep mapsindoors

# 4. View app logs (Android)
adb logcat | grep -i "reactnative\|mapsindoors"

# 5. Clear app data and reinstall
adb uninstall com.mapsindoorsapp
npm run android
```

## 📱 What Should Happen

When you run the app correctly:

1. **Metro bundler starts** - You'll see:
   ```
   Metro waiting on exp://192.168.x.x:8081
   ```

2. **App builds and installs** - You'll see Gradle build output

3. **App launches** - The app opens on your device/emulator

4. **JavaScript loads** - You'll see the MapsIndoors map

## ⚠️ Important Notes

1. **Metro MUST be running** - React Native apps need the Metro bundler to serve JavaScript
2. **Don't close Metro** - Keep it running while developing
3. **First launch is slow** - The app needs to download JavaScript bundle on first run
4. **Check device/emulator** - Make sure it's actually running and connected

## 🆘 Still Not Working?

### Check These:

1. **Is Metro running?**
   - Open browser: http://localhost:8081
   - Should show Metro bundler page

2. **Is device connected?**
   ```bash
   adb devices
   ```
   Should list your device

3. **Are there JavaScript errors?**
   - Check Metro bundler terminal for errors
   - Check device logs: `adb logcat`

4. **Try resetting everything:**
   ```bash
   # Stop Metro (Ctrl+C)
   # Then:
   cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
   npm start -- --reset-cache
   
   # In another terminal:
   adb uninstall com.mapsindoorsapp
   npm run android
   ```

## 📋 Step-by-Step Checklist

- [ ] Metro bundler is running (`npm start`)
- [ ] Device/emulator is connected (`adb devices` shows device)
- [ ] App is built successfully (you confirmed this ✅)
- [ ] Running app with `npm run android` (not just installing APK)
- [ ] No errors in Metro bundler terminal
- [ ] No errors in device logs

If all checked, the app should run! 🎉
