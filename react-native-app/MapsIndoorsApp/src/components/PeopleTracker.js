import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Marker } from '@react-native-mapbox/maps';

// API Configuration - same as web version
const API_URL = 'https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items';
const API_KEY = '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk';
const REFRESH_INTERVAL = 5000; // 5 seconds

export default function PeopleTracker({ mapsIndoorsInstance }) {
  const [people, setPeople] = useState([]);
  const [showApiDetails, setShowApiDetails] = useState(false);
  const [lastApiResponse, setLastApiResponse] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const intervalRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapsIndoorsInstance) {
      // Load initial people locations
      loadPeopleLocations();

      // Set up interval for updates (5 seconds)
      intervalRef.current = setInterval(() => {
        loadPeopleLocations();
      }, REFRESH_INTERVAL);

      // Cleanup
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [mapsIndoorsInstance]);

  /**
   * Fetch people's locations from the API
   */
  const fetchPeopleLocations = async () => {
    let rawData = null;
    try {
      console.log('Fetching people locations from API...');
      
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
      });

      console.log('API Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        rawData = {
          error: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        };
        console.error('API Error Response:', rawData);
        setLastApiResponse(rawData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      console.log('Response content-type:', contentType);

      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.log('Response text:', text.substring(0, 200));
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error('Failed to parse response as JSON:', e);
          rawData = { error: 'Failed to parse JSON', rawText: text.substring(0, 500) };
          setLastApiResponse(rawData);
          return [];
        }
      }

      rawData = data;
      console.log('API Response data:', data);
      console.log('API Response is array?', Array.isArray(data));

      // Extract people array from response
      let peopleArray = [];
      if (Array.isArray(data)) {
        peopleArray = data;
        console.log('Response is direct array, length:', peopleArray.length);
      } else if (data && (data.items || data.people || data.locations)) {
        peopleArray = data.items || data.people || data.locations || [];
        console.log('Extracted from data.items/people/locations, length:', peopleArray.length);
      } else if (data && data.body) {
        const parsedBody = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
        peopleArray = Array.isArray(parsedBody)
          ? parsedBody
          : parsedBody.items || parsedBody.people || parsedBody.locations || [];
        console.log('Extracted from data.body, length:', peopleArray.length);
      } else {
        console.warn('Unexpected API response format:', data);
        setLastApiResponse(data);
        return [];
      }

      console.log('Processed people array:', peopleArray);
      console.log('Number of people found:', peopleArray.length);

      // Normalize the data format (handle string coordinates, Status vs status, etc.)
      const normalizedArray = peopleArray.map((person) => ({
        id: person.id,
        name: person.name,
        lat: typeof person.lat === 'string' ? parseFloat(person.lat) : person.lat,
        lng: typeof person.lng === 'string' ? parseFloat(person.lng) : person.lng,
        floor: person.floor,
        timestamp: person.timestamp,
        status: person.status || person.Status || 'active',
      }));

      console.log('Normalized people array:', normalizedArray);

      // Store raw response
      setLastApiResponse(rawData);

      return normalizedArray;
    } catch (error) {
      console.error('Error fetching people locations:', error);
      console.error('Error details:', error.message, error.stack);

      const errorResponse = rawData || {
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      };
      setLastApiResponse(errorResponse);

      return [];
    }
  };

  /**
   * Load and display people's locations on the map
   */
  const loadPeopleLocations = async () => {
    console.log('Loading people locations...');

    try {
      const peopleData = await fetchPeopleLocations();

      if (!peopleData || peopleData.length === 0) {
        console.warn('No people data received or empty array');
        setPeople([]);
        return;
      }

      // Update people state smoothly
      setPeople((prevPeople) => {
        // Create a map of existing people by ID for efficient lookup
        const existingMap = new Map(prevPeople.map((p) => [p.id, p]));
        const seenIds = new Set();

        // Update or add people
        peopleData.forEach((person) => {
          seenIds.add(person.id);
          existingMap.set(person.id, person);
        });

        // Filter to only include people that are still in the data
        const filtered = Array.from(existingMap.values()).filter((p) => seenIds.has(p.id));

        return filtered;
      });

      // Reposition map to show all people only on initial load
      if (isInitialLoad && peopleData.length > 0 && mapsIndoorsInstance) {
        console.log('Repositioning map to show markers (initial load)...');
        repositionMapToShowPeople(peopleData);
        setIsInitialLoad(false);
      } else if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    } catch (error) {
      console.error('Error in loadPeopleLocations:', error);
    }
  };

  /**
   * Reposition the map to show all people locations
   */
  const repositionMapToShowPeople = (peopleData) => {
    if (!mapsIndoorsInstance || !peopleData || peopleData.length === 0) {
      console.warn('Cannot reposition: invalid parameters');
      return;
    }

    console.log(`Repositioning map to show ${peopleData.length} locations...`);

    try {
      const validCoords = peopleData
        .filter((p) => typeof p.lat === 'number' && typeof p.lng === 'number' && !isNaN(p.lat) && !isNaN(p.lng))
        .map((p) => [p.lng, p.lat]);

      if (validCoords.length === 0) {
        console.warn('No valid coordinates for repositioning');
        return;
      }

      if (validCoords.length === 1) {
        // Single location - center on it
        const [lng, lat] = validCoords[0];
        console.log(`Flying to single location: (${lat}, ${lng})`);
        // Note: You may need to use MapsIndoors SDK methods for map positioning
        // This is a placeholder - adjust based on actual SDK API
        if (mapsIndoorsInstance.goTo) {
          mapsIndoorsInstance.goTo({
            lat: lat,
            lng: lng,
            zoom: 17,
          });
        }
      } else {
        // Multiple locations - fit bounds
        console.log('Calculating bounds for multiple locations...');
        // Note: You may need to use MapsIndoors SDK methods for bounds fitting
        // This is a placeholder - adjust based on actual SDK API
        if (mapsIndoorsInstance.fitBounds) {
          mapsIndoorsInstance.fitBounds(validCoords, {
            padding: { top: 50, bottom: 50, left: 50, right: 50 },
            maxZoom: 20,
          });
        }
      }
    } catch (error) {
      console.error('Error repositioning map:', error);
    }
  };

  return (
    <>
      {/* People Markers */}
      {people.map((person) => {
        if (
          typeof person.lat !== 'number' ||
          typeof person.lng !== 'number' ||
          isNaN(person.lat) ||
          isNaN(person.lng)
        ) {
          return null;
        }

        return (
          <Marker
            key={person.id}
            coordinate={[person.lng, person.lat]}
            title={person.name}
            description={`Floor: ${person.floor || 'Unknown'}\nStatus: ${person.status}`}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText} numberOfLines={1} ellipsizeMode="tail">
                {person.name}
              </Text>
            </View>
          </Marker>
        );
      })}

      {/* API Details Toggle Button */}
      <TouchableOpacity style={styles.apiButton} onPress={() => setShowApiDetails(!showApiDetails)}>
        <Text style={styles.apiButtonText}>📡 API Details</Text>
      </TouchableOpacity>

      {/* API Details Panel */}
      {showApiDetails && (
        <View style={styles.apiPanel}>
          <ScrollView style={styles.apiContent}>
            <Text style={styles.apiTitle}>API Response</Text>
            <Text style={styles.apiText}>
              {JSON.stringify(
                {
                  timestamp: new Date().toLocaleTimeString(),
                  apiUrl: API_URL,
                  count: people.length,
                  rawResponse: lastApiResponse,
                  processedData: people,
                },
                null,
                2
              )}
            </Text>
            <View style={styles.apiSummary}>
              <Text style={styles.apiSummaryText}>
                Status: {lastApiResponse?.error ? 'ERROR' : 'OK'} | Items: {people.length} | Refresh: 5 seconds
              </Text>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  marker: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'white',
    minWidth: 40,
    maxWidth: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  markerText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  apiButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#4285f4',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4285f4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  apiButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  apiPanel: {
    position: 'absolute',
    bottom: 60,
    right: 10,
    width: 350,
    maxHeight: 400,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 4,
    borderColor: '#4285f4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  apiContent: {
    padding: 16,
    maxHeight: 380,
  },
  apiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4285f4',
    marginBottom: 12,
  },
  apiText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#333',
  },
  apiSummary: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#e8f4f8',
    borderRadius: 4,
  },
  apiSummaryText: {
    fontSize: 11,
    color: '#333',
  },
});
