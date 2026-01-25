# Testing Guide - MapsIndoors React Native App

## Prerequisites

Before testing, ensure you have:

1. **Node.js** (v18 or higher) - Check with: `node --version`
2. **React Native CLI** - Install with: `npm install -g react-native-cli`
3. **For iOS (macOS only):**
   - Xcode (latest version from App Store)
   - CocoaPods: `sudo gem install cocoapods`
   - iOS Simulator (comes with Xcode)
4. **For Android:**
   - Android Studio
   - Android SDK
   - Android Emulator or physical device

## Step 1: Initialize React Native Project (If Not Done)

If you haven't initialized a React Native project yet:

```bash
cd /Users/juanprice/Maps/web-ui/react-native-app
npx react-native@latest init MapsIndoorsApp --skip-install
cd MapsIndoorsApp
```

Then copy the files from the parent directory:
- Copy `App.js`, `index.js`, `app.json`, `babel.config.js`, `metro.config.js`
- Copy `src/components/PeopleTracker.js`
- Update platform files with Mapbox token

## Step 2: Install Dependencies

```bash
# Install npm packages
npm install

# Install iOS dependencies (macOS only)
cd ios
pod install
cd ..
```

## Step 3: Start Metro Bundler

In a **separate terminal window**, start the Metro bundler:

```bash
cd /Users/juanprice/Maps/web-ui/react-native-app
npm start
```

Or if you're in the initialized project:
```bash
npm start
```

Keep this terminal open - it runs the JavaScript bundler.

## Step 4: Test on iOS (macOS only)

### Option A: Using Command Line

```bash
# Run on iOS Simulator
npm run ios

# Or specify a device
npm run ios -- --simulator="iPhone 14 Pro"
```

### Option B: Using Xcode

1. Open the project in Xcode:
   ```bash
   open ios/MapsIndoorsApp.xcworkspace
   ```
   **Note:** Use `.xcworkspace`, not `.xcodeproj`

2. Select a simulator from the device dropdown (top bar)

3. Click the **Play** button (▶️) or press `Cmd + R`

### What to Test on iOS:

- ✅ Map loads and displays MapsIndoors
- ✅ Map centers on 1968 Sunnyside Dr, Little Elm, TX
- ✅ People markers appear on the map (if API returns data)
- ✅ Markers update every 5 seconds
- ✅ "API Details" button appears in bottom-right
- ✅ Tapping "API Details" shows/hides API response panel
- ✅ Markers show full names
- ✅ Tapping markers shows popup with details

## Step 5: Test on Android

### Option A: Using Command Line

```bash
# Make sure Android emulator is running or device is connected
npm run android
```

### Option B: Using Android Studio

1. Open Android Studio
2. Open the `android` folder from your project
3. Wait for Gradle sync to complete
4. Select a device/emulator from the device dropdown
5. Click **Run** (▶️) button

### What to Test on Android:

- ✅ Map loads and displays MapsIndoors
- ✅ Map centers on 1968 Sunnyside Dr, Little Elm, TX
- ✅ People markers appear on the map (if API returns data)
- ✅ Markers update every 5 seconds
- ✅ "API Details" button appears in bottom-right
- ✅ Tapping "API Details" shows/hides API response panel
- ✅ Markers show full names
- ✅ Tapping markers shows popup with details

## Step 6: Verify API Integration

1. **Open the app** on your device/simulator
2. **Tap "API Details"** button (bottom-right)
3. **Check the API response panel** for:
   - API URL: `https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items`
   - API Key: `2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk`
   - Response data with people locations
   - Count of items
   - Last update timestamp

4. **Wait 5 seconds** and verify the data refreshes automatically

## Troubleshooting

### Metro Bundler Issues

```bash
# Clear Metro cache
npm start -- --reset-cache

# Or kill Metro and restart
# Press Ctrl+C to stop, then:
npm start
```

### iOS Build Issues

```bash
# Clean iOS build
cd ios
pod deintegrate
pod install
cd ..

# Clean Xcode build
# In Xcode: Product → Clean Build Folder (Shift+Cmd+K)
```

### Android Build Issues

```bash
# Clean Android build
cd android
./gradlew clean
cd ..

# Clear Gradle cache
cd android
./gradlew cleanBuildCache
cd ..
```

### "Unable to resolve module" Errors

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install

# For iOS, reinstall pods
cd ios
pod install
cd ..
```

### Mapbox Token Errors

Verify the token is set in:
- `App.js` (line with `MAPBOX_ACCESS_TOKEN`)
- `ios/MapsIndoorsApp/AppDelegate.mm` (line with `MGLMapboxAccessToken`)
- `android/app/src/main/AndroidManifest.xml` (meta-data tag)

### No People Markers Showing

1. Check API Details panel for API response
2. Verify API is returning data in expected format
3. Check console logs in Metro bundler terminal
4. Verify coordinates are valid numbers (not strings or NaN)

### Location Permissions

**iOS:** The app will request location permission. Make sure to allow it in:
- Settings → Privacy & Security → Location Services → MapsIndoorsApp

**Android:** Check that location permissions are granted in:
- Settings → Apps → MapsIndoorsApp → Permissions → Location

## Quick Test Checklist

- [ ] Metro bundler starts without errors
- [ ] App builds successfully on iOS/Android
- [ ] Map displays correctly
- [ ] Map centers on correct location (Little Elm, TX)
- [ ] People markers appear (if API has data)
- [ ] Markers update every 5 seconds
- [ ] API Details button works
- [ ] API response panel shows correct data
- [ ] No console errors in Metro bundler
- [ ] No crashes when interacting with map

## Testing API Endpoint Directly

You can test the API endpoint directly to verify it's working:

```bash
curl -X GET \
  'https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items' \
  -H 'x-api-key: 2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk' \
  -H 'Content-Type: application/json'
```

Expected response format:
```json
[
  {
    "id": "person1",
    "name": "John Doe",
    "lat": 33.1847,
    "lng": -96.9067,
    "floor": 1,
    "status": "active"
  }
]
```

Or:
```json
{
  "items": [
    {
      "id": "person1",
      "name": "John Doe",
      "lat": "33.1847",
      "lng": "-96.9067"
    }
  ]
}
```

## Debugging Tips

1. **Check Metro Bundler Console:** Look for errors, warnings, or API response logs
2. **Use React Native Debugger:** Install from https://github.com/jhen0409/react-native-debugger
3. **Enable Remote Debugging:**
   - iOS: Cmd+D → "Debug"
   - Android: Cmd+M (Mac) or Ctrl+M (Windows/Linux) → "Debug"
4. **Check Device Logs:**
   - iOS: Xcode → Window → Devices and Simulators → View Device Logs
   - Android: `adb logcat | grep ReactNativeJS`

## Next Steps After Testing

Once testing is successful:
1. Customize styling if needed
2. Add additional features
3. Test on physical devices
4. Prepare for production build
