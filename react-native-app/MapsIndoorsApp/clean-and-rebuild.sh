#!/bin/bash

# Clean and Rebuild Script for React Native Android Build Issues
# This script cleans all caches and build artifacts to fix R8/D8 and other build errors

set -e

echo "🧹 Starting comprehensive cleanup..."

cd "$(dirname "$0")"

# Clean npm/node_modules
echo "📦 Cleaning node_modules..."
rm -rf node_modules
rm -rf package-lock.json

# Clean Android build artifacts
echo "🔨 Cleaning Android build artifacts..."
cd android
./gradlew clean 2>/dev/null || true
rm -rf .gradle
rm -rf app/build
rm -rf build
rm -rf .idea
cd ..

# Clean global Gradle cache (CRITICAL for R8/D8 fix)
echo "🗑️  Cleaning global Gradle cache..."
rm -rf ~/.gradle/caches/transforms-3/
rm -rf ~/.gradle/caches/modules-2/
rm -rf ~/.gradle/caches/jars-*/
rm -rf ~/.gradle/caches/*/fileHashes/
rm -rf ~/.gradle/daemon/

# Clean Metro bundler cache
echo "🚇 Cleaning Metro bundler cache..."
rm -rf /tmp/metro-*
rm -rf /tmp/haste-map-*

echo "✅ Cleanup complete!"
echo ""
echo "📥 Next steps:"
echo "1. Run: npm install"
echo "2. Reapply reanimated fix if needed (see CRITICAL_FIXES.md)"
echo "3. Open Android Studio and sync Gradle"
echo "4. Build → Clean Project"
echo "5. Build → Rebuild Project"
