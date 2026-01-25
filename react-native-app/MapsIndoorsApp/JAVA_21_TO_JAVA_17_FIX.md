# Java 21 to Java 17 Fix for Gradle 7.6.3

## ✅ Issue

**Error:** `Your build is currently configured to use incompatible Java 21.0.6 and Gradle 7.6.3.`

**Root Cause:**
- Gradle 7.6.3 supports up to Java 19
- Your system is using Java 21.0.6
- These are incompatible

**Solution:** Configure Android Studio to use Java 17 for Gradle (recommended for React Native 0.72.6)

## 🔧 Fix: Configure Android Studio to Use Java 17

### Option 1: Use Embedded JDK (Easiest - Recommended)

1. **Open Android Studio**
2. **File → Settings** (or **Android Studio → Preferences** on macOS)
3. **Build, Execution, Deployment → Build Tools → Gradle**
4. **Gradle JDK:** Select **"Embedded JDK"** or **"jbr-17"** (Java 17)
   - If you see "jbr-17" in the dropdown, select it
   - If not, select "Embedded JDK" (which should be Java 17)
5. Click **Apply** and **OK**
6. **File → Sync Project with Gradle Files**

### Option 2: Use System Java 17 (If Available)

1. Check if Java 17 is installed:
   ```bash
   /usr/libexec/java_home -V
   ```
   Look for a version like `17.x.x`

2. If Java 17 is available:
   - **File → Settings → Build, Execution, Deployment → Build Tools → Gradle**
   - **Gradle JDK:** Click the dropdown and select **"Download JDK"** or browse to your Java 17 installation
   - Path should be something like: `/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home`
   - Click **Apply** and **OK**
   - **File → Sync Project with Gradle Files**

### Option 3: Set JAVA_HOME Environment Variable

If you need to set it system-wide:

**macOS (zsh):**
```bash
# Add to ~/.zshrc
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH=$JAVA_HOME/bin:$PATH

# Then reload
source ~/.zshrc
```

**Verify:**
```bash
java -version
# Should show: openjdk version "17.x.x"
```

Then restart Android Studio.

## ✅ Why Java 17?

For React Native 0.72.6:
- ✅ **Gradle 7.6.3** supports Java 17 (fully compatible)
- ✅ **Kotlin 1.7.20** works perfectly with Java 17
- ✅ **Android Gradle Plugin 7.4.2** supports Java 17
- ✅ This is the **proven stable combination** for RN 0.72.6

## 🚀 After Configuration

1. **File → Invalidate Caches / Restart → Invalidate and Restart**
2. Wait for Android Studio to restart
3. **File → Sync Project with Gradle Files**
4. The error should be gone!

## 📋 Verification

After syncing, check:
- ✅ No "incompatible Java" error
- ✅ Gradle sync completes successfully
- ✅ Build configuration loads

## 🔍 Alternative: Upgrade Gradle (Not Recommended)

If you must use Java 21, you would need to:
1. Upgrade Gradle to 8.5+ (in `gradle-wrapper.properties`)
2. Upgrade Android Gradle Plugin to 8.1.0+
3. Update Kotlin version
4. **BUT:** This may reintroduce Kotlin compatibility issues we've been fixing

**Recommendation:** Stick with Java 17 + Gradle 7.6.3 for React Native 0.72.6 stability.

## 🐛 If Java 17 is Not Available

If you don't have Java 17 installed:

**macOS:**
```bash
# Install Java 17 using Homebrew
brew install openjdk@17

# Link it
sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk

# Set JAVA_HOME
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

Then configure Android Studio as described above.
