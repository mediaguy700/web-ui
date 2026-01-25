# MapsIndoors React Native Application

This is a React Native application converted from the web-based MapsIndoors demo. It includes:

- MapsIndoors map integration with Mapbox
- People tracking from an external API
- Real-time location updates (5-second refresh)
- API response details panel

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher)
- **React Native CLI** installed globally: `npm install -g react-native-cli`
- **Xcode** (for iOS development on macOS)
- **Android Studio** (for Android development)
- **CocoaPods** (for iOS): `sudo gem install cocoapods`

## Installation

1. **Navigate to the project directory:**
   ```bash
   cd react-native-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (macOS only):**
   ```bash
   cd ios
   pod install
   cd ..
   ```

## Configuration

### API Keys

The following API keys are already configured in the code:

- **MapsIndoors API Key**: `02c329e6777d431a88480a09` (configured in `App.js`)
- **Mapbox Access Token**: `pk.eyJ1IjoianByaWNlNjc5MSIsImEiOiJjbWtqNWo3OHoxMnI5M2NwbmlwM2locDhlIn0._L18RGG3ZVn-QeD6zs-MEQ` (configured in `App.js` and platform files)
- **People Tracking API**: `https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items` (configured in `PeopleTracker.js`)
- **API Key**: `2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk` (configured in `PeopleTracker.js`)

### Platform-Specific Setup

#### iOS

The Mapbox access token is configured in `ios/MapsIndoorsApp/AppDelegate.mm`. Location permissions are configured in `ios/MapsIndoorsApp/Info.plist`.

#### Android

The Mapbox access token is configured in `android/app/src/main/AndroidManifest.xml`. Location permissions are also configured there.

## Running the Application

### iOS

```bash
npm run ios
```

Or using Xcode:
1. Open `ios/MapsIndoorsApp.xcworkspace` in Xcode
2. Select your target device/simulator
3. Click Run

### Android

```bash
npm run android
```

Or using Android Studio:
1. Open the `android` folder in Android Studio
2. Wait for Gradle sync to complete
3. Select your target device/emulator
4. Click Run

## Project Structure

```
react-native-app/
├── App.js                    # Main application component
├── src/
│   └── components/
│       └── PeopleTracker.js  # People tracking component
├── ios/                       # iOS native code
├── android/                   # Android native code
├── package.json              # Dependencies
├── babel.config.js           # Babel configuration
└── metro.config.js           # Metro bundler configuration
```

## Features

### MapsIndoors Map

- Displays indoor maps using MapsIndoors SDK
- Initial center: 1968 Sunnyside Dr, Little Elm, TX 75068
- Initial zoom level: 17

### People Tracking

- Fetches people locations from AWS API Gateway endpoint
- Updates every 5 seconds
- Displays markers with full names
- Smooth marker updates (no blinking)
- Repositions map on initial load to show all people

### API Details Panel

- Toggle button in bottom-right corner
- Shows API request/response details
- Displays processed data and counts
- Useful for debugging

## Key Differences from Web Version

| Web (Original) | React Native |
|----------------|--------------|
| `mapsindoors.mapView.MapboxView` | `<MapsIndoorsMap>` component |
| `mapboxgl.Marker` | `<Marker>` from `@react-native-mapbox/maps` |
| DOM manipulation | React hooks (`useState`, `useEffect`) |
| CSS styles | `StyleSheet.create()` |
| `setInterval` | Same, but with `useRef` for cleanup |

## Troubleshooting

### iOS Build Issues

1. **Pod install errors:**
   ```bash
   cd ios
   pod deintegrate
   pod install
   cd ..
   ```

2. **Xcode build errors:**
   - Clean build folder: Product → Clean Build Folder (Shift+Cmd+K)
   - Delete DerivedData folder

### Android Build Issues

1. **Gradle sync errors:**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

2. **Metro bundler issues:**
   ```bash
   npm start -- --reset-cache
   ```

### Common Issues

- **"Unable to resolve module"**: Run `npm install` again
- **"Mapbox token not found"**: Verify the token is set in platform-specific files
- **Location permissions**: Ensure permissions are requested and granted on the device

## Dependencies

- `@mapsindoors/react-native-maps-indoors-mapbox`: MapsIndoors React Native SDK
- `@react-native-mapbox/maps`: Mapbox React Native integration
- `react-native-reanimated`: For smooth animations
- `react-native-gesture-handler`: For gesture handling

## API Integration

The people tracking feature integrates with:
- **Endpoint**: `https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items`
- **Method**: GET
- **Headers**: 
  - `x-api-key: 2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk`
  - `Content-Type: application/json`

### Expected API Response Format

The API should return an array of people objects or an object with an `items` array:

```json
[
  {
    "id": "person1",
    "name": "John Doe",
    "lat": 33.1847,
    "lng": -96.9067,
    "floor": 1,
    "status": "active",
    "timestamp": "2024-01-24T12:00:00Z"
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

## Development

### Making Changes

1. Edit `App.js` for main app changes
2. Edit `src/components/PeopleTracker.js` for people tracking changes
3. Restart Metro bundler: `npm start`
4. Reload the app on your device/simulator

### Debugging

- Use React Native Debugger or Chrome DevTools
- Check console logs in Metro bundler terminal
- Use the API Details panel in the app for API debugging

## License

Same as the original web application.
