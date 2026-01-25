# Setting Up Tokens and Keys

## ⚠️ Important: Sensitive Data

The following files contain sensitive tokens and are **NOT committed to git**:
- `android/gradle.properties` - Contains `MAPBOX_DOWNLOADS_TOKEN`
- `android/app/src/main/res/values/mapbox_access_token.xml` - Contains Mapbox public token
- `android/app/src/main/assets/index.android.bundle` - Generated bundle file

## 🔧 Setup Instructions

### 1. Mapbox Downloads Token

**File:** `android/gradle.properties`

Copy the example file:
```bash
cp android/gradle.properties.example android/gradle.properties
```

Then add your token:
```properties
MAPBOX_DOWNLOADS_TOKEN=your_mapbox_downloads_token_here
```

**OR** set it as an environment variable:
```bash
export MAPBOX_DOWNLOADS_TOKEN=your_mapbox_downloads_token_here
```

### 2. Mapbox Public Access Token

**File:** `android/app/src/main/res/values/mapbox_access_token.xml`

Copy the example file:
```bash
cp android/app/src/main/res/values/mapbox_access_token.xml.example android/app/src/main/res/values/mapbox_access_token.xml
```

Then edit it and replace `YOUR_KEY_HERE` with your Mapbox public access token:
```xml
<string name="mapbox_access_token" translatable="false">pk.eyJ1IjoianByaWNlNjc5MSIsImEiOiJjbWtqNWo3OHoxMnI5M2NwbmlwM2locDhlIn0._L18RGG3ZVn-QeD6zs-MEQ</string>
```

### 3. JavaScript Bundle (Optional)

The bundle file is generated automatically. If you need to create it manually:

```bash
npx react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res
```

## ✅ Verification

After setting up the tokens:
1. Verify `android/gradle.properties` contains `MAPBOX_DOWNLOADS_TOKEN`
2. Verify `android/app/src/main/res/values/mapbox_access_token.xml` exists with your token
3. Try building: `cd android && ./gradlew assembleDebug`

## 🔒 Security Notes

- **Never commit** these files to git
- Use environment variables when possible
- Keep tokens secure and rotate them if exposed
- The `.example` files are safe to commit (they don't contain real tokens)
