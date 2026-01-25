# Fix "Unable to Load Script" - Step by Step

## ✅ Metro Status: RUNNING ✅

Metro bundler is confirmed running on port 8081. The issue is the app can't connect to it.

## 🔧 Step-by-Step Fix

### Step 1: Open Developer Menu on Device/Emulator

**For Android Emulator:**
- Press `Cmd + M` (Mac) or `Ctrl + M` (Windows/Linux)
- OR run: `adb shell input keyevent 82`

**For Physical Device:**
- Shake the device
- OR run: `adb shell input keyevent 82`

You should see a menu with options like:
- Reload
- Debug
- Settings
- etc.

### Step 2: Configure Debug Server

1. **Tap "Settings"** in the Dev Menu
2. **Tap "Debug server host & port for device"**
3. **Enter the correct address:**

   **For Android Emulator:**
   ```
   localhost:8081
   ```

   **For Physical Device:**
   ```
   YOUR_COMPUTER_IP:8081
   ```
   
   To find your IP:
   ```bash
   # Mac
   ipconfig getifaddr en0
   
   # Or
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
   
   Example: `192.168.1.100:8081`

4. **Press OK/Enter**

### Step 3: Reload the App

**Option A: From Dev Menu**
- Go back to Dev Menu
- Tap "Reload"

**Option B: From Metro Terminal**
- Press `r` in the Metro terminal

**Option C: From Device**
- Double-tap `R` on the device/emulator

### Step 4: Verify Connection

After reloading, you should see:
- Metro terminal shows bundle request
- App loads JavaScript
- App displays your content

## 🔍 Alternative: Check App Logs

If still not working, check what the app is trying to connect to:

```bash
adb logcat | grep -i "reactnative\|metro\|bundle\|localhost"
```

Look for lines showing what URL the app is trying to connect to.

## 🚀 Quick Fix Commands

**For Emulator (localhost should work):**
```bash
# Open Dev Menu
adb shell input keyevent 82

# Then manually set to: localhost:8081
# Then reload
```

**For Physical Device:**
```bash
# Get your IP
ipconfig getifaddr en0

# Then set in Dev Menu: YOUR_IP:8081
# Example: 192.168.1.100:8081
```

## ⚠️ Common Issues

### Issue 1: Can't Open Dev Menu

**Solution:**
```bash
# Force open Dev Menu via ADB
adb shell input keyevent 82
```

### Issue 2: "localhost" Doesn't Work on Physical Device

**Solution:**
- Use your computer's IP address instead
- Make sure device and computer are on same WiFi network
- Check firewall isn't blocking port 8081

### Issue 3: Still Can't Connect After Setting Address

**Try:**
1. **Stop Metro** (Ctrl+C in Metro terminal)
2. **Restart Metro with reset cache:**
   ```bash
   npm start -- --reset-cache
   ```
3. **Uninstall and reinstall app:**
   ```bash
   adb uninstall com.mapsindoorsapp
   npm run android
   ```

### Issue 4: Metro Shows Errors

**Check Metro terminal for:**
- JavaScript syntax errors
- Missing dependencies
- Module resolution errors

Fix any errors shown in Metro terminal.

## 📋 Complete Checklist

- [ ] Metro is running (✅ Confirmed)
- [ ] Dev Menu opened on device/emulator
- [ ] Debug server host set correctly:
  - Emulator: `localhost:8081`
  - Physical: `YOUR_IP:8081`
- [ ] App reloaded after setting address
- [ ] Metro terminal shows bundle request
- [ ] No errors in Metro terminal
- [ ] No errors in device logs

## 🎯 Expected Result

After following these steps:
1. Metro terminal shows: `Bundling index.bundle...`
2. App loads JavaScript bundle
3. App displays your MapsIndoors map
4. No "Unable to load script" error

## 🆘 Still Not Working?

1. **Check Metro is accessible:**
   - Open browser: http://localhost:8081
   - Should show Metro page

2. **Check device can reach Metro:**
   - On emulator: Open browser, go to http://localhost:8081
   - On physical device: Open browser, go to http://YOUR_IP:8081
   - Should show Metro page

3. **View full logs:**
   ```bash
   adb logcat | grep -i "react"
   ```

4. **Try complete reset:**
   ```bash
   # Stop Metro
   # Then:
   npm start -- --reset-cache
   
   # In another terminal:
   adb uninstall com.mapsindoorsapp
   adb shell pm clear com.mapsindoorsapp
   npm run android
   ```

The key is setting the correct debug server address in the Dev Menu! 🎯
