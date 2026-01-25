# Opening in Android Studio

## 🚀 Quick Steps

### 1. Open Android Studio

### 2. Open the Android Project

**Option A: From Android Studio Welcome Screen**
1. Click **"Open"** or **"Open an Existing Project"**
2. Navigate to:
   ```
   /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp/android
   ```
3. Click **"OK"** or **"Open"**

**Option B: From File Menu**
1. File → Open...
2. Navigate to:
   ```
   /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp/android
   ```
3. Click **"Open"**

**Option C: From Terminal**
```bash
cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
open -a "Android Studio" android
```

## ⚠️ Important Notes

### Open the `android` folder, NOT the root project folder!

- ✅ **Correct**: Open `/Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp/android`
- ❌ **Wrong**: Opening `/Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp` (root folder)

## 📋 What Happens Next

1. **Gradle Sync**
   - Android Studio will automatically detect the project
   - It will start syncing Gradle files
   - This may take a few minutes the first time
   - Wait for "Gradle sync finished" message

2. **SDK Setup** (if needed)
   - Android Studio may prompt to install missing SDK components
   - Click "Install" if prompted
   - Wait for installation to complete

3. **Project Structure**
   - You'll see the Android project structure in the Project panel
   - Main files are in `app/src/main/`

## 🔧 Prerequisites

Before opening in Android Studio, make sure you have:

1. **Android Studio Installed**
   - Download from: https://developer.android.com/studio
   - Version: Latest stable version

2. **Android SDK Installed**
   - Android Studio usually installs this automatically
   - Check: Tools → SDK Manager

3. **Java Development Kit (JDK)**
   - Android Studio includes JDK
   - Or install separately: JDK 11 or higher

## 📱 Running from Android Studio

### Option 1: Run Button
1. Select a device/emulator from the device dropdown (top toolbar)
2. Click the green **▶️ Run** button
3. Or press `Shift + F10`

### Option 2: Terminal in Android Studio
1. Open Terminal in Android Studio (View → Tool Windows → Terminal)
2. Run:
   ```bash
   cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
   npm start
   ```
3. In another terminal or from command line:
   ```bash
   npm run android
   ```

## 🎯 What You'll See in Android Studio

### Project Structure
```
android/
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── AndroidManifest.xml  ← Mapbox token configured here
│   │       ├── java/                ← Java/Kotlin code
│   │       └── res/                 ← Resources
│   └── build.gradle                 ← App dependencies
├── build.gradle                     ← Project dependencies
└── settings.gradle                  ← Project settings
```

### Key Files to Check

1. **AndroidManifest.xml**
   - Location: `app/src/main/AndroidManifest.xml`
   - Contains: Mapbox token, permissions
   - Verify Mapbox token is present

2. **build.gradle** (app level)
   - Location: `app/build.gradle`
   - Contains: App dependencies, build config

3. **build.gradle** (project level)
   - Location: `build.gradle`
   - Contains: Project-wide settings

## 🐛 Troubleshooting

### "SDK location not found"
1. File → Project Structure → SDK Location
2. Set Android SDK location (usually auto-detected)
3. Click "Apply"

### "Gradle sync failed"
1. File → Invalidate Caches / Restart
2. Select "Invalidate and Restart"
3. Wait for Android Studio to restart
4. Gradle sync should work after restart

### "Build failed"
1. Build → Clean Project
2. Build → Rebuild Project
3. If still failing, check error messages in Build output

### "No devices found"
1. Tools → Device Manager
2. Create a new Virtual Device
3. Or connect a physical device via USB
4. Enable USB debugging on physical device

## ✅ Verification Checklist

After opening in Android Studio:

- [ ] Project opens without errors
- [ ] Gradle sync completes successfully
- [ ] No red error indicators in Project panel
- [ ] AndroidManifest.xml shows Mapbox token
- [ ] Can see device/emulator in device dropdown
- [ ] Build → Make Project succeeds

## 🚀 Quick Test

1. **Open Android Studio**
2. **Open the `android` folder**
3. **Wait for Gradle sync** (bottom status bar)
4. **Select a device** from dropdown
5. **Click Run** ▶️

The app should build and launch on your device/emulator!

## 📚 Additional Resources

- [Android Studio User Guide](https://developer.android.com/studio/intro)
- [React Native Android Setup](https://reactnative.dev/docs/environment-setup)
- [Running on Device](https://reactnative.dev/docs/running-on-device)
