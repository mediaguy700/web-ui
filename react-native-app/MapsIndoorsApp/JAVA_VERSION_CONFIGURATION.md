# Java Version Configuration Guide

## Current Issue

**Error:** `Your build is currently configured to use incompatible Java 21.0.6 and Gradle 7.6.3.`

**Problem:** Gradle 7.6.3 supports up to Java 19, but you're using Java 21.

## ✅ Solution 1: Use Java 17 (Recommended)

This is the **best option** for React Native 0.72.6 stability.

### Step 1: Configure Android Studio Gradle JDK

1. **Open Android Studio**
2. **File → Settings** (macOS: **Android Studio → Preferences**)
3. Navigate to: **Build, Execution, Deployment → Build Tools → Gradle**
4. Under **"Gradle JDK"**, select one of:
   - **"Embedded JDK"** (usually Java 17)
   - **"jbr-17"** (if available)
   - Or browse to a Java 17 installation
5. Click **Apply** and **OK**

### Step 2: Verify Java Version

In terminal:
```bash
java -version
# Should show: openjdk version "17.x.x"
```

If it shows Java 21, set JAVA_HOME:
```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

### Step 3: Sync Gradle

1. **File → Invalidate Caches / Restart → Invalidate and Restart**
2. **File → Sync Project with Gradle Files**

## ✅ Solution 2: Upgrade Gradle to 8.5+ (Alternative)

If you prefer to use Java 21, upgrade Gradle:

### Changes Required

**File:** `android/gradle/wrapper/gradle-wrapper.properties`
```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.5-bin.zip
```

**File:** `android/build.gradle`
```gradle
classpath("com.android.tools.build:gradle:8.1.0")  // Upgrade from 7.4.2
```

**Note:** This may reintroduce Kotlin compatibility issues. You may need to:
- Update Kotlin version to 1.9.0+
- Adjust other configurations

## 🎯 Recommendation

**Use Solution 1 (Java 17)** because:
- ✅ Gradle 7.6.3 + Java 17 is the proven stable setup for RN 0.72.6
- ✅ Avoids Kotlin compatibility issues we've been fixing
- ✅ All previous fixes remain valid
- ✅ No need to change Gradle/AGP versions

## 📋 Quick Fix Commands

If you want to set Java 17 system-wide:

**macOS (zsh):**
```bash
# Add to ~/.zshrc
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# Reload
source ~/.zshrc

# Verify
java -version
```

Then restart Android Studio and configure Gradle JDK as described above.
