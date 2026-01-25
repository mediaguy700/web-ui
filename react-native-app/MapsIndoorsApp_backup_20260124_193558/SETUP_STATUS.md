# Setup Status - React Native App

## ✅ Completed

1. **Project Structure Created**
   - Main app files copied to `MapsIndoorsApp/`
   - Component structure created (`src/components/`)
   - Configuration files in place

2. **Dependencies Installed**
   - All npm packages installed successfully
   - 952 packages installed
   - MapsIndoors React Native SDK ready

3. **Files Configured**
   - `App.js` - Main application component
   - `PeopleTracker.js` - People tracking component
   - `package.json` - Dependencies configured
   - `babel.config.js` - Babel configuration
   - `metro.config.js` - Metro bundler configuration
   - Platform files prepared (iOS/Android)

## ⚠️ Next Steps Required

### 1. Initialize Full React Native Project Structure

The current setup has the JavaScript files, but you need the full React Native native project structure. You have two options:

**Option A: Use React Native CLI (Recommended)**
```bash
cd /Users/juanprice/Maps/web-ui/react-native-app
# Backup current MapsIndoorsApp
mv MapsIndoorsApp MapsIndoorsApp_backup

# Create new React Native project
npx @react-native-community/cli@latest init MapsIndoorsApp

# Copy our files back
cp MapsIndoorsApp_backup/App.js MapsIndoorsApp/
cp MapsIndoorsApp_backup/index.js MapsIndoorsApp/
cp MapsIndoorsApp_backup/app.json MapsIndoorsApp/
cp MapsIndoorsApp_backup/babel.config.js MapsIndoorsApp/
cp MapsIndoorsApp_backup/metro.config.js MapsIndoorsApp/
cp -r MapsIndoorsApp_backup/src MapsIndoorsApp/
cp MapsIndoorsApp_backup/package.json MapsIndoorsApp/

# Install dependencies again
cd MapsIndoorsApp
npm install
```

**Option B: Manual Setup**
- Copy the iOS and Android native project structures from an existing React Native project
- Update the native files with Mapbox token configuration

### 2. Update Platform Files

**iOS (`ios/MapsIndoorsApp/AppDelegate.mm`):**
- Add Mapbox import: `#import <Mapbox/Mapbox.h>`
- Add token in `didFinishLaunchingWithOptions`:
  ```objc
  [MGLMapboxAccessToken setAccessToken:@"pk.eyJ1IjoianByaWNlNjc5MSIsImEiOiJjbWtqNWo3OHoxMnI5M2NwbmlwM2locDhlIn0._L18RGG3ZVn-QeD6zs-MEQ"];
  ```

**Android (`android/app/src/main/AndroidManifest.xml`):**
- Add Mapbox token meta-data:
  ```xml
  <meta-data
      android:name="com.mapbox.mapboxsdk.accessToken"
      android:value="pk.eyJ1IjoianByaWNlNjc5MSIsImEiOiJjbWtqNWo3OHoxMnI5M2NwbmlwM2locDhlIn0._L18RGG3ZVn-QeD6zs-MEQ" />
  ```
- Add location permissions (already in our AndroidManifest.xml)

### 3. Install iOS Pods (macOS only)

```bash
cd MapsIndoorsApp/ios
pod install
cd ../..
```

### 4. Fix Marker Implementation

The `PeopleTracker.js` component currently has a placeholder for markers. You need to:

1. Check MapsIndoors React Native SDK documentation for marker API
2. Update the marker implementation in `PeopleTracker.js` to use the SDK's marker methods
3. Or use `react-native-maps` as an alternative for custom markers

### 5. Test the Application

**Start Metro Bundler:**
```bash
cd MapsIndoorsApp
npm start
```

**Run on iOS:**
```bash
npm run ios
```

**Run on Android:**
```bash
npm run android
```

## 📋 Current File Structure

```
MapsIndoorsApp/
├── App.js                    ✅ Ready
├── index.js                  ✅ Ready
├── app.json                  ✅ Ready
├── package.json              ✅ Dependencies installed
├── babel.config.js           ✅ Ready
├── metro.config.js           ✅ Ready
├── node_modules/             ✅ Installed (952 packages)
├── src/
│   └── components/
│       └── PeopleTracker.js  ✅ Ready (needs marker implementation)
├── ios/                       ⚠️ Needs full native project structure
└── android/                   ⚠️ Needs full native project structure
```

## 🔧 Known Issues

1. **Marker Component**: The `Marker` import was removed because `@react-native-mapbox/maps` doesn't exist. Need to implement markers using MapsIndoors SDK API.

2. **Native Project Structure**: The iOS and Android folders need the full React Native native project structure (Xcode project, Gradle files, etc.)

3. **Pod Installation**: iOS pods need to be installed after getting the full project structure.

## 📚 Resources

- [MapsIndoors React Native Docs](https://docs.mapsindoors.com/sdks-and-frameworks/react-native)
- [React Native Setup Guide](https://reactnative.dev/docs/environment-setup)
- [MapsIndoors React Native Reference](https://docs.mapsindoors.com/reference-docs/react-native-sdk)

## 🎯 Quick Test Command

Once the full project structure is in place:

```bash
cd /Users/juanprice/Maps/web-ui/react-native-app/MapsIndoorsApp
npm start          # Terminal 1
npm run ios        # Terminal 2 (or npm run android)
```
