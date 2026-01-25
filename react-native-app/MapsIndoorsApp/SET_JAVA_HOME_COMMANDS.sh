#!/bin/bash
# Commands to set JAVA_HOME for Java 17

# Option 1: Use Android Studio's Embedded JDK (Recommended)
# This is the most reliable option
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export PATH="$JAVA_HOME/bin:$PATH"

# Verify
echo "JAVA_HOME is set to: $JAVA_HOME"
java -version

# To make this permanent, add to ~/.zshrc:
# echo 'export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"' >> ~/.zshrc
# echo 'export PATH="$JAVA_HOME/bin:$PATH"' >> ~/.zshrc
# source ~/.zshrc
