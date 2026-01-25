# Potential Future Errors After Fixing `initialCamera`

## ✅ Current Error Fixed

**Error:** `ReferenceError: Property 'initialCamera' doesn't exist`
**Fix:** Removed all references to `initialCamera` and duplicate `useEffect`

## 🔮 Potential Future Errors to Watch For

### 1. MapView Not Rendering / Blank Map

**Likely Cause:**
- MapView requires MapsIndoors to be loaded first
- Native module not properly linked
- Mapbox token not configured correctly

**Symptoms:**
- Blank screen (no map visible)
- MapView component renders but shows nothing

**Prevention:**
- Ensure MapsIndoors.load() completes before rendering MapView
- Verify `mapbox_access_token.xml` exists and has correct token
- Check native module linking

### 2. MapsIndoors.load() Fails

**Likely Cause:**
- Invalid API key
- Network connectivity issues
- MapsIndoors SDK not properly initialized

**Symptoms:**
- Error in console: "Error loading MapsIndoors"
- `mapsIndoorsInstance` remains null
- PeopleTracker won't work

**Prevention:**
- Verify API key is correct: `02c329e6777d431a88480a09`
- Check network connectivity
- Add better error handling

### 3. PeopleTracker Component Errors

**Likely Cause:**
- `mapsIndoorsInstance` is the MapsIndoors class, not an instance
- Methods called on wrong object
- API methods don't exist on the class

**Symptoms:**
- `TypeError: mapsIndoorsInstance.goTo is not a function`
- `TypeError: mapsIndoorsInstance.addMarker is not a function`
- PeopleTracker crashes

**Prevention:**
- Check if MapsIndoors needs to be instantiated differently
- Verify correct API usage for React Native SDK
- Add null checks before calling methods

### 4. Native Module Not Found

**Likely Cause:**
- MapsIndoors native module not properly linked
- React Native autolinking failed
- Native code not compiled

**Symptoms:**
- `Error: Native module MapsIndoorsView not found`
- `Error: Cannot find native module 'MapsIndoorsModule'`
- App crashes on startup

**Prevention:**
- Run `npx react-native unlink` then `npx react-native link` (if needed)
- Rebuild native code: `cd android && ./gradlew clean assembleDebug`
- Check `MainApplication.java` includes MapsIndoorsPackage

### 5. Mapbox Token Issues

**Likely Cause:**
- Token not accessible in native code
- Token format incorrect
- Token doesn't have required permissions

**Symptoms:**
- Map shows but no tiles load
- "Invalid access token" errors
- Mapbox logo but no map content

**Prevention:**
- Verify `mapbox_access_token.xml` is in correct location
- Check token has Mapbox Maps API enabled
- Verify token format is correct

### 6. Location Permissions

**Likely Cause:**
- Location permissions not requested
- User denied permissions
- Permissions not in AndroidManifest.xml

**Symptoms:**
- Location features don't work
- Errors when trying to get user location
- Map doesn't center on user

**Prevention:**
- Verify permissions in `AndroidManifest.xml`
- Request permissions at runtime
- Handle permission denial gracefully

### 7. PeopleTracker API Integration Issues

**Likely Cause:**
- Network request fails
- API returns unexpected format
- CORS or authentication issues

**Symptoms:**
- No people markers appear
- API errors in console
- "Failed to fetch" errors

**Prevention:**
- Test API endpoint independently
- Add proper error handling
- Verify API key is correct

### 8. MapView Camera/Position Issues

**Likely Cause:**
- MapView doesn't center on initial location
- Camera position not set correctly
- Map shows wrong location

**Symptoms:**
- Map shows default location (0,0)
- Map doesn't show expected area
- Can't programmatically move camera

**Prevention:**
- Set camera position after MapsIndoors loads
- Use MapsIndoors SDK methods to set position
- Verify coordinate format (lat/lng vs lng/lat)

### 9. React Native Version Compatibility

**Likely Cause:**
- MapsIndoors SDK version incompatible with RN 0.72.6
- Breaking changes in SDK
- Missing polyfills or dependencies

**Symptoms:**
- Unexpected runtime errors
- Methods not available
- Type errors

**Prevention:**
- Check MapsIndoors SDK compatibility with RN 0.72.6
- Review SDK changelog
- Test with different SDK versions if needed

### 10. Build/Compilation Issues

**Likely Cause:**
- Native dependencies not compiled
- Gradle sync issues
- Missing native libraries

**Symptoms:**
- App crashes immediately
- "UnsatisfiedLinkError"
- Native method not found

**Prevention:**
- Clean and rebuild: `./gradlew clean assembleDebug`
- Verify all native dependencies are included
- Check build logs for warnings

## 🎯 Most Likely Next Errors (Priority Order)

1. **MapView not rendering** - Most likely, since we removed camera prop
2. **MapsIndoors.load() fails** - API key or network issues
3. **PeopleTracker errors** - Wrong instance type passed
4. **Native module not found** - Linking issues

## 📋 Quick Diagnostic Checklist

After fixing `initialCamera`, check:

- [ ] App loads without errors
- [ ] MapView component renders (even if blank)
- [ ] MapsIndoors.load() completes successfully
- [ ] `mapsIndoorsInstance` is set correctly
- [ ] PeopleTracker receives valid instance
- [ ] No console errors about missing methods
- [ ] Map shows some content (even if wrong location)

## 🔧 Proactive Fixes Applied

1. ✅ Removed `initialCamera` reference
2. ✅ Removed duplicate `useEffect`
3. ✅ MapView renders without camera prop
4. ✅ Error handling for MapsIndoors.load()
5. ✅ Conditional rendering for PeopleTracker

The app should now load without the `initialCamera` error. Monitor for the issues above as you test!
