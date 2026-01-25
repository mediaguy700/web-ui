# Gradle JDK Configuration Fix

## ✅ Issue

**Error:** `Invalid Gradle JDK configuration found. Undefined java.home on the project gradle/config.properties file when using the gradleJvm #GRADLE_LOCAL_JAVA_HOME macro.`

**Solution:** Configure Gradle JDK in Android Studio settings

## 🔧 Fix in Android Studio

### Option 1: Use Embedded JDK (Recommended - Easiest)

1. **Open Android Studio Settings:**
   - **File → Settings** (Windows/Linux)
   - **Android Studio → Preferences** (macOS)

2. **Navigate to Gradle Settings:**
   - **Build, Execution, Deployment → Build Tools → Gradle**

3. **Set Gradle JDK:**
   - Find **"Gradle JDK"** dropdown
   - Select **"Embedded JDK"** or **"jbr-17"** (Java 17)
   - Click **"Apply"** then **"OK"**

4. **Sync Gradle:**
   - **File → Sync Project with Gradle Files**

### Option 2: Use System JDK

1. **Open Android Studio Settings:**
   - **File → Settings** (Windows/Linux)
   - **Android Studio → Preferences** (macOS)

2. **Navigate to Gradle Settings:**
   - **Build, Execution, Deployment → Build Tools → Gradle**

3. **Set Gradle JDK:**
   - Find **"Gradle JDK"** dropdown
   - Click **"Download JDK..."** or select existing JDK
   - Choose **Java 17** (if available)
   - Or select **"Use JAVA_HOME"** if Java 17 is set in environment

4. **Click "Apply"** then **"OK"**

5. **Sync Gradle:**
   - **File → Sync Project with Gradle Files**

### Option 3: Set JAVA_HOME Environment Variable

If you want to use system Java 17:

**macOS (Terminal):**
```bash
# Add to ~/.zshrc or ~/.bash_profile
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc

# Reload shell
source ~/.zshrc

# Verify
echo $JAVA_HOME
java -version
```

Then in Android Studio:
1. **File → Settings → Build, Execution, Deployment → Build Tools → Gradle**
2. Select **"Use JAVA_HOME"** from Gradle JDK dropdown
3. Click **"Apply"** then **"OK"**
4. **File → Sync Project with Gradle Files**

## 🎯 Quick Fix (Recommended)

**Use Embedded JDK** - This is the easiest and most reliable option:

1. **File → Settings** (or **Android Studio → Preferences** on macOS)
2. **Build, Execution, Deployment → Build Tools → Gradle**
3. **Gradle JDK:** Select **"Embedded JDK"** or **"jbr-17"**
4. Click **"Apply"** then **"OK"**
5. **File → Sync Project with Gradle Files**

## ✅ Verification

After setting the Gradle JDK:

1. **File → Sync Project with Gradle Files**
2. Wait for sync to complete
3. Check bottom status bar - should show "Gradle sync finished"
4. No more JDK configuration errors

## 📋 What Each Option Does

- **Embedded JDK:** Uses Android Studio's bundled JDK (usually Java 17) - Most reliable
- **Download JDK:** Downloads and uses a specific JDK version
- **Use JAVA_HOME:** Uses the JDK from your system JAVA_HOME environment variable

## 🐛 If Issues Persist

### Check Current Java Version
```bash
java -version
# Should show Java 17 or compatible version
```

### Verify Android Studio JDK
1. **File → Project Structure → SDK Location**
2. Check **"JDK location"** - should point to a valid JDK

### Reset Gradle Settings
1. **File → Invalidate Caches / Restart**
2. Select **"Invalidate and Restart"**
3. After restart, configure Gradle JDK again

## 📚 Reference

- Android Studio includes an embedded JDK (usually Java 17)
- Gradle 7.6.3 requires Java 8-19 (Java 17 is ideal)
- The embedded JDK is the most reliable option for Android development

**The fix is simple: Just select "Embedded JDK" in Android Studio's Gradle settings!**
