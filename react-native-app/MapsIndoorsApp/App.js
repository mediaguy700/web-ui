import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, Text, ActivityIndicator } from 'react-native';
import MapView from '@mapsindoors/react-native-maps-indoors-mapbox';
// Temporarily comment out MapsIndoors to test if it's causing the error
// import MapsIndoors from '@mapsindoors/react-native-maps-indoors-mapbox';
// import PeopleTracker from './src/components/PeopleTracker';

// Configuration - same as web version
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoianByaWNlNjc5MSIsImEiOiJjbWtqNWo3OHoxMnI5M2NwbmlwM2locDhlIn0._L18RGG3ZVn-QeD6zs-MEQ';
const MAPSINDOORS_API_KEY = '02c329e6777d431a88480a09';

// Initial map center - 1968 Sunnyside Dr, Little Elm, TX 75068
const INITIAL_CENTER = { latitude: 33.1847, longitude: -96.9067 };
const INITIAL_ZOOM = 17;

export default function App() {
  // Temporarily disable MapsIndoors initialization to test if it's causing the error
  const [isReady] = useState(true);
  
  console.log('Rendering App - Minimal version without MapsIndoors.load()');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Debug: Show status */}
      <View style={styles.debugContainer}>
        <Text style={styles.debugText}>
          Testing: MapView without MapsIndoors.load()
        </Text>
      </View>
      
      {/* MapsIndoors Map - Testing without MapsIndoors.load() */}
      <MapView
        style={styles.map}
        showCompass={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4285f4',
    fontWeight: '500',
  },
  debugContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  debugText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'monospace',
  },
});
