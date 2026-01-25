# Setup Guide - Converting Web App to React Native

## Quick Start

### Option 1: Use Existing React Native Project (Recommended)

If you already have a React Native project initialized:

1. **Copy the files** from this directory to your existing React Native project
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Install iOS pods** (macOS only):
   ```bash
   cd ios && pod install && cd ..
   ```
4. **Run the app:**
   ```bash
   npm run ios    # for iOS
   npm run android # for Android
   ```

### Option 2: Create New React Native Project

1. **Initialize a new React Native project:**
   ```bash
   npx react-native@latest init MapsIndoorsApp
   cd MapsIndoorsApp
   ```

2. **Replace the generated files** with the files from this directory:
   - `App.js` → Replace with our `App.js`
   - `package.json` → Merge dependencies (or replace)
   - `babel.config.js` → Replace with our version
   - `metro.config.js` → Replace with our version
   - `index.js` → Replace with our version
   - `app.json` → Replace with our version

3. **Create the component directory:**
   ```bash
   mkdir -p src/components
   ```
   Copy `src/components/PeopleTracker.js` to your project

4. **Update platform-specific files:**
   - **iOS**: Update `ios/MapsIndoorsApp/AppDelegate.mm` with Mapbox token
   - **Android**: Update `android/app/src/main/AndroidManifest.xml` with Mapbox token and permissions

5. **Install dependencies:**
   ```bash
   npm install
   cd ios && pod install && cd ..
   ```

6. **Run the app:**
   ```bash
   npm run ios    # for iOS
   npm run android # for Android
   ```

## File Structure

```
react-native-app/
├── App.js                          # Main app component
├── index.js                        # Entry point
├── app.json                        # App configuration
├── package.json                    # Dependencies
├── babel.config.js                 # Babel configuration
├── metro.config.js                 # Metro bundler config
├── .gitignore                      # Git ignore rules
├── README.md                       # Full documentation
├── SETUP.md                        # This file
└── src/
    └── components/
        └── PeopleTracker.js        # People tracking component
```

## Key Files Explained

### App.js
- Main application component
- Initializes MapsIndoors map
- Integrates PeopleTracker component
- Handles loading states

### src/components/PeopleTracker.js
- Fetches people locations from API
- Displays markers on map
- Updates every 5 seconds
- Shows API details panel

### Platform Files
- **iOS**: `ios/MapsIndoorsApp/AppDelegate.mm` - Sets Mapbox token
- **Android**: `android/app/src/main/AndroidManifest.xml` - Sets Mapbox token and permissions

## Dependencies to Install

The following packages are required (already in `package.json`):

```bash
npm install @mapsindoors/react-native-maps-indoors-mapbox
npm install @react-native-mapbox/maps
npm install @gorhom/bottom-sheet
npm install react-native-reanimated react-native-gesture-handler
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-safe-area-context react-native-screens
```

## Troubleshooting

### "Module not found" errors
- Run `npm install` again
- Clear Metro cache: `npm start -- --reset-cache`
- For iOS: `cd ios && pod install && cd ..`

### Mapbox token errors
- Verify token is set in:
  - `App.js` (for React Native)
  - `ios/MapsIndoorsApp/AppDelegate.mm` (for iOS native)
  - `android/app/src/main/AndroidManifest.xml` (for Android native)

### Build errors
- **iOS**: Clean build folder in Xcode (Product → Clean Build Folder)
- **Android**: `cd android && ./gradlew clean && cd ..`

## Next Steps

1. Test the app on iOS simulator/device
2. Test the app on Android emulator/device
3. Verify API integration is working
4. Customize styling as needed
5. Add additional features as required

## Support

Refer to:
- [MapsIndoors React Native Docs](https://docs.mapsindoors.com/sdks-and-frameworks/react-native)
- [React Native Docs](https://reactnative.dev/)
- [Mapbox React Native Docs](https://github.com/rnmapbox/maps)
