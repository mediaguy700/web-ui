# Embedded JDK vs jbr-17 - Which to Choose

## 📋 Both Options Explained

### Option 1: "Embedded JDK"
- **What it is:** Android Studio's bundled Java Development Kit
- **Version:** Usually Java 17 (bundled with Android Studio)
- **Location:** `/Applications/Android Studio.app/Contents/jbr/Contents/Home`
- **Best for:** Most users - simplest option

### Option 2: "jbr-17" 
- **What it is:** JetBrains Runtime 17 (same as Embedded JDK, just a different name)
- **Version:** Java 17
- **Location:** Same as Embedded JDK
- **Best for:** When you see this option specifically listed

## ✅ Which One to Choose?

**Either one works!** They're essentially the same thing:
- Both are Java 17
- Both are compatible with Gradle 7.6.3
- Both will solve your Java 21 incompatibility issue

**Recommendation:** Choose whichever appears in your dropdown:
- If you see **"Embedded JDK"** → Select that
- If you see **"jbr-17"** → Select that
- If you see both → Either one is fine

## 🎯 How to Select in Android Studio

### Step-by-Step:

1. **Open Android Studio Preferences:**
   - **macOS:** `Android Studio → Preferences` (or `⌘,`)
   - **Windows/Linux:** `File → Settings`

2. **Navigate to Gradle:**
   - Click **"Build, Execution, Deployment"** in left sidebar
   - Click **"Build Tools"**
   - Click **"Gradle"**

3. **Find "Gradle JDK" Dropdown:**
   - Look for **"Gradle JDK"** dropdown (usually near the top)
   - Click the dropdown arrow

4. **Select Java 17:**
   - Look for one of these options:
     - ✅ **"Embedded JDK"**
     - ✅ **"jbr-17"**
     - ✅ **"Embedded JDK (17)"**
     - ✅ **"jbr-17 (17)"**
   - Select whichever Java 17 option you see

5. **Apply Changes:**
   - Click **"Apply"** button
   - Click **"OK"** button

6. **Sync Gradle:**
   - **File → Sync Project with Gradle Files**
   - Wait for sync to complete

## 📸 What You'll See

In the Gradle JDK dropdown, you might see options like:
```
[Dropdown: Gradle JDK]
├─ Embedded JDK          ← Select this (Java 17)
├─ jbr-17                ← Or this (also Java 17)
├─ Use JAVA_HOME
├─ Download JDK...
└─ Add JDK...
```

## ✅ Verification

After selecting:

1. **Check the dropdown** - Should show "Embedded JDK" or "jbr-17"
2. **Sync Gradle** - Should complete without Java version errors
3. **Check build** - Should work without compatibility issues

## 🐛 If You Don't See These Options

### Option A: Download JDK 17
1. In the **Gradle JDK** dropdown, select **"Download JDK..."**
2. Choose:
   - **Version:** 17
   - **Vendor:** Eclipse Temurin (or any Java 17 vendor)
3. Click **"Download"**
4. Wait for download and installation
5. Select the downloaded JDK from dropdown

### Option B: Use System Java 17
If you have Java 17 installed elsewhere:

1. In the **Gradle JDK** dropdown, select **"Add JDK..."**
2. Navigate to your Java 17 installation
3. Select the Java 17 folder
4. Click **"OK"**
5. Select it from the dropdown

## 📋 Quick Summary

- **"Embedded JDK"** = Android Studio's built-in Java 17 ✅
- **"jbr-17"** = Same thing, different name ✅
- **Either one works** - just pick whichever you see
- **Both are Java 17** - compatible with Gradle 7.6.3

**Just select whichever Java 17 option appears in your dropdown!**
