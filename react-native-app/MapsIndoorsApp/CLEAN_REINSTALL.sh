#!/bin/bash

# Complete Clean Reinstall Script
# This ensures the app is completely removed and reinstalled with fresh bundle

set -e

echo "🧹 Starting complete clean reinstall..."

cd "$(dirname "$0")"

# Step 1: Uninstall old app
echo "📱 Uninstalling old app..."
adb uninstall com.mapsindoorsapp 2>/dev/null || echo "App not installed (this is OK)"

# Step 2: Clear app data
echo "🗑️  Clearing app data..."
adb shell pm clear com.mapsindoorsapp 2>/dev/null || echo "No data to clear (this is OK)"

# Step 3: Clean Android build
echo "🔨 Cleaning Android build..."
cd android
./gradlew clean
rm -rf .gradle app/build build
cd ..

# Step 4: Regenerate bundle
echo "📦 Regenerating JavaScript bundle..."
rm -f android/app/src/main/assets/index.android.bundle
npx react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res

# Step 5: Rebuild APK
echo "🔨 Rebuilding APK..."
cd android
./gradlew assembleDebug
cd ..

# Step 6: Install new APK
echo "📲 Installing new APK..."
adb install android/app/build/outputs/apk/debug/app-debug.apk

echo ""
echo "✅ Clean reinstall complete!"
echo ""
echo "🚀 Next steps:"
echo "1. Launch the app on your device"
echo "2. Check if the error is resolved"
echo "3. If using Metro, make sure it's running: npm start"
