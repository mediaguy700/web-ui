# Setting JAVA_HOME for Java 17

## Current Situation

Java 17 is not found via `/usr/libexec/java_home`, but you have Java available (likely through Android Studio's embedded JDK).

## ✅ Best Solution: Use Android Studio's Embedded JDK

**Recommended:** Use Android Studio's embedded JDK instead of setting JAVA_HOME manually.

1. **Android Studio → Preferences** (or **File → Settings**)
2. **Build, Execution, Deployment → Build Tools → Gradle**
3. **Gradle JDK:** Select **"Embedded JDK"** or **"jbr-17"**
4. Click **"Apply"** then **"OK"**
5. **File → Sync Project with Gradle Files**

This is the easiest and most reliable option!

## Alternative: Set JAVA_HOME Manually

If you want to set JAVA_HOME anyway, here's how:

### Step 1: Find Java Installation

**Option A: Use Android Studio's JDK**
```bash
# Android Studio's embedded JDK is usually at:
/Applications/Android\ Studio.app/Contents/jbr/Contents/Home
```

**Option B: Find Java via which**
```bash
which java
# This will show the Java path, then:
readlink -f $(which java)
# Or on macOS:
readlink $(which java)
```

### Step 2: Set JAVA_HOME (Temporary - Current Session Only)

```bash
export JAVA_HOME=/Applications/Android\ Studio.app/Contents/jbr/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH

# Verify
echo $JAVA_HOME
java -version
```

### Step 3: Make JAVA_HOME Permanent

Since you're using **zsh** (your shell is `/bin/zsh`), add to `~/.zshrc`:

```bash
# Add to ~/.zshrc
echo 'export JAVA_HOME=/Applications/Android\ Studio.app/Contents/jbr/Contents/Home' >> ~/.zshrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.zshrc

# Reload shell configuration
source ~/.zshrc

# Verify
echo $JAVA_HOME
java -version
```

### Step 4: Use in Android Studio

1. **Android Studio → Preferences**
2. **Build, Execution, Deployment → Build Tools → Gradle**
3. **Gradle JDK:** Select **"Use JAVA_HOME"**
4. Click **"Apply"** then **"OK"**
5. **File → Sync Project with Gradle Files**

## 🎯 Quick Commands

**To set JAVA_HOME to Android Studio's JDK permanently:**

```bash
# Add to ~/.zshrc
cat >> ~/.zshrc << 'EOF'

# Java Home for Android Development
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export PATH="$JAVA_HOME/bin:$PATH"
EOF

# Reload
source ~/.zshrc

# Verify
echo $JAVA_HOME
java -version
```

## ✅ Verification

After setting JAVA_HOME:

```bash
# Check JAVA_HOME
echo $JAVA_HOME

# Check Java version
java -version

# Should show Java 17.x.x
```

## 📋 Summary

**Easiest:** Use Android Studio's "Embedded JDK" option (no command line needed)

**Manual:** Set JAVA_HOME to Android Studio's JDK path:
```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
```

Then add to `~/.zshrc` to make it permanent.
