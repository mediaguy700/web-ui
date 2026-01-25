// Minimal App.js for testing - no MapsIndoors initialization
import React from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import MapView from '@mapsindoors/react-native-maps-indoors-mapbox';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.text}>Testing MapView without MapsIndoors.load()</Text>
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
  text: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
});
