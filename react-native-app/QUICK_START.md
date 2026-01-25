# Quick Start - Testing the React Native App

## ⚡ Fastest Way to Test

### Step 1: Initialize React Native Project

Since this is a conversion, you need to create a full React Native project first:

```bash
cd /Users/juanprice/Maps/web-ui/react-native-app

# Create a new React Native project in a subdirectory
npx react-native@latest init MapsIndoorsApp --skip-install

# Move into the new project
cd MapsIndoorsApp
```

### Step 2: Copy Our Files

Replace the generated files with our converted files:

```bash
# Copy our App.js
cp ../App.js ./App.js

# Copy our index.js
cp ../index.js ./index.js

# Copy our app.json
cp ../app.json ./app.json

# Copy our babel config
cp ../babel.config.js ./babel.config.js

# Copy our metro config
cp ../metro.config.js ./metro.config.js

# Create components directory and copy PeopleTracker
mkdir -p src/components
cp ../src/components/PeopleTracker.js ./src/components/PeopleTracker.js
```

### Step 3: Update Platform Files

**iOS - Update AppDelegate.mm:**
```bash
# Edit ios/MapsIndoorsApp/AppDelegate.mm
# Add the Mapbox import and token (see ../ios/MapsIndoorsApp/AppDelegate.mm for reference)
```

**Android - Update AndroidManifest.xml:**
```bash
# Edit android/app/src/main/AndroidManifest.xml
# Add Mapbox token and permissions (see ../android/app/src/main/AndroidManifest.xml for reference)
```

### Step 4: Install Dependencies

```bash
# Install npm packages
npm install

# Install iOS pods (macOS only)
cd ios
pod install
cd ..
```

### Step 5: Start Testing

**Terminal 1 - Start Metro Bundler:**
```bash
npm start
```

**Terminal 2 - Run on iOS:**
```bash
npm run ios
```

**OR Terminal 2 - Run on Android:**
```bash
npm run android
```

## 🧪 What to Test

1. **Map Loading:**
   - Map should display MapsIndoors
   - Should center on Little Elm, TX (33.1847, -96.9067)
   - Zoom level should be 17

2. **People Tracking:**
   - People markers should appear (if API has data)
   - Markers should update every 5 seconds
   - Markers should show full names

3. **API Details:**
   - Tap "📡 API Details" button (bottom-right)
   - Panel should show API response
   - Should display request/response data

4. **Console Logs:**
   - Check Metro bundler terminal for logs
   - Should see API fetch logs every 5 seconds
   - Should see marker update logs

## 🐛 Common Issues

### "Command not found: react-native"
```bash
npm install -g react-native-cli
```

### "No devices found" (Android)
- Start Android Studio
- Open AVD Manager
- Start an emulator
- Or connect a physical device via USB

### "Build failed" (iOS)
```bash
cd ios
pod install
cd ..
# Then try again
```

### "Module not found"
```bash
rm -rf node_modules
npm install
```

## 📱 Testing Checklist

- [ ] Metro bundler starts successfully
- [ ] App builds without errors
- [ ] Map displays correctly
- [ ] Map centers on correct location
- [ ] People markers appear (if API has data)
- [ ] API Details button works
- [ ] API response panel shows data
- [ ] No console errors

## 🚀 Alternative: Test API First

Before testing the app, verify the API works:

```bash
curl -X GET \
  'https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items' \
  -H 'x-api-key: 2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk' \
  -H 'Content-Type: application/json'
```

If this returns data, the app should work!
