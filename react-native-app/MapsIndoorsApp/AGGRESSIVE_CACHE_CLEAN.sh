#!/bin/bash

# Aggressive Cache Clean Script for D8 NullPointerException
# This script removes ALL Gradle caches that might contain corrupted D8 transforms

set -e

echo "🧹 Starting AGGRESSIVE Gradle cache cleanup..."
echo "⚠️  This will remove ALL Gradle caches. Dependencies will be re-downloaded."

cd "$(dirname "$0")"

# Stop Gradle daemon
echo "🛑 Stopping Gradle daemon..."
cd android
./gradlew --stop 2>/dev/null || true
cd ..

# Clean Android build artifacts
echo "🔨 Cleaning Android build artifacts..."
cd android
rm -rf .gradle
rm -rf app/build
rm -rf build
rm -rf .idea/caches
cd ..

# NUCLEAR: Remove ALL Gradle caches
echo "💣 Removing ALL Gradle caches (this is aggressive!)..."
rm -rf ~/.gradle/caches/
rm -rf ~/.gradle/daemon/
rm -rf ~/.gradle/wrapper/dists/

# Specifically target transforms-3 (where D8 errors occur)
echo "🎯 Specifically cleaning transforms-3 cache..."
rm -rf ~/.gradle/caches/transforms-3/ 2>/dev/null || true
rm -rf ~/.gradle/caches/transforms-*/ 2>/dev/null || true

# Clean module metadata
echo "📦 Cleaning module metadata..."
rm -rf ~/.gradle/caches/modules-2/
rm -rf ~/.gradle/caches/jars-*/

# Clean file hashes
echo "🔍 Cleaning file hashes..."
rm -rf ~/.gradle/caches/*/fileHashes/ 2>/dev/null || true

echo "✅ Aggressive cleanup complete!"
echo ""
echo "📥 Next steps:"
echo "1. Open Android Studio"
echo "2. File → Invalidate Caches / Restart → Invalidate and Restart"
echo "3. File → Sync Project with Gradle Files"
echo "4. Build → Clean Project"
echo "5. Build → Rebuild Project"
echo ""
echo "⚠️  Note: First build will be slow as dependencies are re-downloaded."
