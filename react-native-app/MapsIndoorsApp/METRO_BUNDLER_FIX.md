# Metro Bundler Fix - "Unable to Load Script"

## ✅ Issue

**Error:** "Unable to load script. Make sure you're either running Metro (run `npx react-native start`)"

**Root Cause:** Metro bundler is not running or the app can't connect to it.

## 🚀 Solution

### Step 1: Start Metro Bundler

**Open a terminal and run:**
```bash
cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
npm start
```

**OR with cache reset (if you have issues):**
```bash
npm start -- --reset-cache
```

**Keep this terminal open!** Metro must keep running.

### Step 2: Verify Metro is Running

You should see output like:
```
                 ######                ######               
               ###     ####        ####     ###             
             ##         ###      ###         ##             
            ##          ####    ####          ##            
            ##         ###  ###  ###         ##             
            ##        ###   ###   ###        ##             
             ##     ####     ###     ####     ##            
              ##  ###         ###         ###  ##           
                ######         ###         ######           
                  
                  Welcome to Metro!
                  
                  Fast - Scalable - Integrated
                  
                  
                  To reload the app press "r"
                  To open developer menu press "d"
                  
                  Metro waiting on exp://192.168.x.x:8081
```

### Step 3: Run the App

**In a NEW terminal window:**
```bash
cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
npm run android
```

## 🔍 Troubleshooting

### Issue 1: Metro Won't Start

**Error:** Port 8081 already in use

**Solution:**
```bash
# Kill process on port 8081
lsof -ti:8081 | xargs kill -9

# Then start Metro again
npm start
```

### Issue 2: App Can't Connect to Metro

**Symptoms:**
- Metro is running but app shows "Unable to load script"
- App shows "Could not connect to development server"

**Solutions:**

1. **Check Metro URL:**
   - Look at Metro terminal output
   - Should show: `Metro waiting on exp://192.168.x.x:8081`
   - Note the IP address

2. **Shake device/emulator to open Dev Menu:**
   - Physical device: Shake it
   - Emulator: Press `Cmd + M` (Mac) or `Ctrl + M` (Windows/Linux)
   - Or: `adb shell input keyevent 82`

3. **Select "Settings" → "Debug server host & port for device"**
   - Enter: `localhost:8081` (for emulator)
   - OR: `YOUR_COMPUTER_IP:8081` (for physical device)
   - Example: `192.168.1.100:8081`

4. **Reload the app:**
   - Press `r` in Metro terminal
   - OR shake device and select "Reload"

### Issue 3: Network Issues

**If using physical device:**

1. **Make sure device and computer are on same WiFi network**

2. **Find your computer's IP address:**
   ```bash
   # Mac/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Or
   ipconfig getifaddr en0
   ```

3. **In Dev Menu, set debug server to:** `YOUR_IP:8081`
   - Example: `192.168.1.100:8081`

### Issue 4: Cache Issues

**If Metro starts but app still can't load:**

```bash
# Stop Metro (Ctrl+C)
# Then restart with cache reset:
npm start -- --reset-cache
```

## 📋 Quick Checklist

- [ ] Metro bundler is running (`npm start`)
- [ ] Metro shows "Metro waiting on..." message
- [ ] App is trying to connect (not just installed)
- [ ] Device/emulator and computer on same network (for physical device)
- [ ] Dev Menu configured with correct server address
- [ ] No firewall blocking port 8081

## 🎯 Correct Workflow

**Terminal 1 - Metro (Keep Running):**
```bash
cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
npm start
```

**Terminal 2 - Run App:**
```bash
cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
npm run android
```

**OR in Android Studio:**
1. Make sure Metro is running (Terminal 1)
2. Click Run button (▶️)

## ⚠️ Important Notes

1. **Metro MUST be running** - React Native apps need Metro to serve JavaScript
2. **Don't close Metro terminal** - Keep it running while developing
3. **First load is slow** - App downloads JavaScript bundle on first run
4. **Reload with `r`** - Press `r` in Metro terminal to reload app

## 🆘 Still Not Working?

1. **Check Metro is actually running:**
   ```bash
   curl http://localhost:8081/status
   ```
   Should return: `{"status":"running"}`

2. **Check device can reach Metro:**
   - Open browser on device/emulator: `http://localhost:8081` (emulator)
   - OR: `http://YOUR_IP:8081` (physical device)
   - Should show Metro bundler page

3. **View app logs:**
   ```bash
   adb logcat | grep -i "reactnative\|metro\|bundle"
   ```

4. **Try full reset:**
   ```bash
   # Stop Metro
   # Then:
   npm start -- --reset-cache
   
   # In another terminal:
   adb uninstall com.mapsindoorsapp
   npm run android
   ```

The app should now connect to Metro and load! 🎉
