#!/bin/bash

# Fix Corrupted Gradle Cache Script
# This script cleans all Gradle caches that might be corrupted

set -e

echo "🧹 Cleaning corrupted Gradle cache..."

cd "$(dirname "$0")"

# Stop Gradle daemon
echo "🛑 Stopping Gradle daemon..."
cd android
./gradlew --stop 2>/dev/null || true
cd ..

# Clean project build artifacts
echo "🔨 Cleaning project build artifacts..."
cd android
rm -rf .gradle
rm -rf app/build
rm -rf build
cd ..

# NUCLEAR: Remove ALL Gradle caches
echo "💣 Removing ALL Gradle caches..."
rm -rf ~/.gradle/caches/
rm -rf ~/.gradle/daemon/
rm -rf ~/.gradle/wrapper/dists/

# Specifically target transforms-3 (where corruption occurs)
echo "🎯 Specifically cleaning transforms-3 cache..."
rm -rf ~/.gradle/caches/transforms-3/ 2>/dev/null || true

# Clean module metadata
echo "📦 Cleaning module metadata..."
rm -rf ~/.gradle/caches/modules-2/ 2>/dev/null || true

# Clean file hashes
echo "🔍 Cleaning file hashes..."
rm -rf ~/.gradle/caches/*/fileHashes/ 2>/dev/null || true

echo "✅ Cache cleanup complete!"
echo ""
echo "📥 Next steps:"
echo "1. Open Android Studio"
echo "2. File → Invalidate Caches / Restart → Invalidate and Restart"
echo "3. File → Sync Project with Gradle Files"
echo "4. Build → Clean Project"
echo "5. Build → Rebuild Project"
echo ""
echo "⚠️  Note: First build will be slow as dependencies are re-downloaded."
