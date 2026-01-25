import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { MapsIndoorsMap } from '@mapsindoors/react-native-maps-indoors-mapbox';
import { Marker } from '@react-native-mapbox/maps';
import PeopleTracker from './src/components/PeopleTracker';

// Configuration - same as web version
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoianByaWNlNjc5MSIsImEiOiJjbWtqNWo3OHoxMnI5M2NwbmlwM2locDhlIn0._L18RGG3ZVn-QeD6zs-MEQ';
const MAPSINDOORS_API_KEY = '02c329e6777d431a88480a09';

// Initial map center - 1968 Sunnyside Dr, Little Elm, TX 75068
const INITIAL_CENTER = { latitude: 33.1847, longitude: -96.9067 };
const INITIAL_ZOOM = 17;

export default function App() {
  const [mapsIndoorsInstance, setMapsIndoorsInstance] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const handleMapsIndoorsReady = (instance) => {
    console.log('MapsIndoors is ready!');
    setMapsIndoorsInstance(instance);
    setIsReady(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* MapsIndoors Map */}
      <MapsIndoorsMap
        apiKey={MAPSINDOORS_API_KEY}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialCenter={INITIAL_CENTER}
        initialZoom={INITIAL_ZOOM}
        onMapsIndoorsReady={handleMapsIndoorsReady}
        style={styles.map}
      />

      {/* Loading indicator */}
      {!isReady && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4285f4" />
          <Text style={styles.loadingText}>Loading MapsIndoors...</Text>
        </View>
      )}

      {/* People Tracker Component */}
      {isReady && mapsIndoorsInstance && (
        <PeopleTracker mapsIndoorsInstance={mapsIndoorsInstance} />
      )}
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
});
