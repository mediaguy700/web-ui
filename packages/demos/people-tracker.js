// people-tracker.js - Display multiple people's locations from a database

let peopleMarkers = [];
let mapboxInstance = null;
let updateInterval = null;
let lastApiResponse = null; // Store the last API response for display

/**
 * Initialize people tracking on the map
 * @param {object} mapboxMap - The Mapbox map instance
 */
function initPeopleTracker(mapboxMap) {
  mapboxInstance = mapboxMap;
  
  // Load initial people locations
  loadPeopleLocations();
  
  // Update people locations every 3 seconds (3000 milliseconds)
  updateInterval = setInterval(() => {
    loadPeopleLocations();
  }, 3000); // 3 seconds
}

/**
 * Fetch people's locations from your database/API
 * 
 * For GET requests:
 * fetch('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items', {
 *   method: 'GET',
 *   headers: {
 *     'x-api-key': '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk',
 *     'Content-Type': 'application/json'
 *   }
 * })
 * 
 * For POST requests:
 * fetch('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items', {
 *   method: 'POST',
 *   headers: {
 *     'x-api-key': '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk',
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({ name: 'Item', lat: '40.7128', lng: '-74.0060' })
 * })
 */
async function fetchPeopleLocations() {
  let rawData = null;
  try {
    console.log('Fetching people locations from API...');
    // For GET requests
    const response = await fetch('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items', {
      method: 'GET',
      headers: {
        'x-api-key': '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk',
        'Content-Type': 'application/json'
      }
    });
    
    console.log('API Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      rawData = { 
        error: `HTTP ${response.status}: ${response.statusText}`,
        status: response.status,
        statusText: response.statusText,
        body: errorText
      };
      console.error('API Error Response:', rawData);
      
      // Display error in API response panel
      if (typeof displayApiResponse === 'function') {
        displayApiResponse(rawData, []);
      }
      
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const contentType = response.headers.get('content-type');
    console.log('Response content-type:', contentType);
    
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // Try to parse as JSON anyway
      const text = await response.text();
      console.log('Response text:', text.substring(0, 200));
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        rawData = { error: 'Failed to parse JSON', rawText: text.substring(0, 500) };
        if (typeof displayApiResponse === 'function') {
          displayApiResponse(rawData, []);
        }
        return [];
      }
    }
    
    rawData = data;
    console.log('API Response data:', data);
    console.log('API Response data type:', typeof data);
    console.log('API Response is array?', Array.isArray(data));
    console.log('API Response keys:', Object.keys(data || {}));
    
    // Ensure the response is an array
    let peopleArray = [];
    if (Array.isArray(data)) {
      peopleArray = data;
      console.log('Response is direct array, length:', peopleArray.length);
    } else if (data && (data.items || data.people || data.locations)) {
      // Handle different response structures
      peopleArray = data.items || data.people || data.locations || [];
      console.log('Extracted from data.items/people/locations, length:', peopleArray.length);
      console.log('data.items:', data.items);
      console.log('data.people:', data.people);
      console.log('data.locations:', data.locations);
    } else if (data && data.body) {
      // Handle AWS Lambda response format
      const parsedBody = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
      peopleArray = Array.isArray(parsedBody) ? parsedBody : (parsedBody.items || parsedBody.people || parsedBody.locations || []);
      console.log('Extracted from data.body, length:', peopleArray.length);
    } else {
      console.warn('Unexpected API response format:', data);
      console.warn('Response structure:', JSON.stringify(data, null, 2));
      // Still display the response even if format is unexpected
      if (typeof displayApiResponse === 'function') {
        displayApiResponse(data, []);
      }
      return [];
    }
    
    console.log('Processed people array:', peopleArray);
    console.log('Number of people found:', peopleArray.length);
    
    if (peopleArray.length === 0) {
      console.warn('WARNING: peopleArray is empty after processing!');
      console.warn('Raw data structure:', JSON.stringify(data, null, 2));
    }
    
    // Normalize the data format (handle string coordinates, Status vs status, etc.)
    const normalizedArray = peopleArray.map(person => ({
      id: person.id,
      name: person.name,
      lat: typeof person.lat === 'string' ? parseFloat(person.lat) : person.lat,
      lng: typeof person.lng === 'string' ? parseFloat(person.lng) : person.lng,
      floor: person.floor,
      timestamp: person.timestamp,
      status: person.status || person.Status || 'active'
    }));
    
    console.log('Normalized people array:', normalizedArray);
    
    // Output full API response for debugging
    console.log('=== FULL API RESPONSE ===');
    console.log(JSON.stringify(data, null, 2));
    console.log('=== END API RESPONSE ===');
    
    // Store raw response globally for use in loadPeopleLocations
    lastApiResponse = rawData;
    
    // Also display in a visible area on the page for easy viewing
    if (typeof displayApiResponse === 'function') {
      displayApiResponse(rawData, normalizedArray);
    } else {
      console.error('displayApiResponse function not found!');
    }
    
    return normalizedArray;
  } catch (error) {
    console.error('Error fetching people locations:', error);
    console.error('Error details:', error.message, error.stack);
    
    // Store error response globally
    lastApiResponse = rawData || { 
      error: error.message, 
      stack: error.stack,
      timestamp: new Date().toISOString()
    };
    
    // Display error in API response panel
    if (typeof displayApiResponse === 'function') {
      displayApiResponse(lastApiResponse, []);
    }
    
    return [];
  }
}

/**
 * Load and display people's locations on the map
 */
async function loadPeopleLocations() {
  console.log('Loading people locations...');
  let people = [];
  let rawResponseData = null;
  
  try {
    // Fetch people locations
    const result = await fetchPeopleLocations();
    people = Array.isArray(result) ? result : [];
    
    // Get the raw response that was stored by fetchPeopleLocations
    rawResponseData = lastApiResponse;
    
    console.log('Received people data:', people);
    console.log('Raw response data:', rawResponseData);
    
    // Always display API response with actual data
    if (typeof displayApiResponse === 'function') {
      displayApiResponse(rawResponseData || { message: 'No API response data available' }, people);
    }
  } catch (error) {
    console.error('Error in loadPeopleLocations:', error);
    // Display error in API response panel
    if (typeof displayApiResponse === 'function') {
      displayApiResponse({ error: error.message, stack: error.stack }, []);
    }
    return;
  }
  
  if (!people || people.length === 0) {
    console.warn('No people data received or empty array');
    clearPeopleMarkers();
    return;
  }
  
  // Remove existing markers
  clearPeopleMarkers();
  
  // Collect valid coordinates for bounds calculation
  const validCoordinates = [];
  
  // Add new markers for each person
  let markersAdded = 0;
  let markersSkipped = 0;
  
  console.log(`Processing ${people.length} people to add markers...`);
  
  people.forEach((person, index) => {
    try {
      console.log(`Processing person ${index + 1}/${people.length}:`, person);
      
      // Validate before adding
      if (!person.id || !person.name) {
        console.warn(`Skipping person ${index + 1}: missing id or name`, person);
        markersSkipped++;
        return;
      }
      
      if (typeof person.lat !== 'number' || typeof person.lng !== 'number') {
        console.warn(`Skipping person ${index + 1}: invalid coordinates`, person);
        markersSkipped++;
        return;
      }
      
      if (isNaN(person.lat) || isNaN(person.lng)) {
        console.warn(`Skipping person ${index + 1}: NaN coordinates`, person);
        markersSkipped++;
        return;
      }
      
      addPersonMarker(person);
      markersAdded++;
      
      // Collect coordinates for bounds calculation
      validCoordinates.push([person.lng, person.lat]);
      console.log(`✓ Added marker for ${person.name} at (${person.lat}, ${person.lng})`);
    } catch (error) {
      console.error(`Error adding marker for person ${index + 1}:`, person, error);
      console.error('Error stack:', error.stack);
      markersSkipped++;
    }
  });
  
  console.log(`Marker summary: ${markersAdded} added, ${markersSkipped} skipped`);
  console.log(`Valid coordinates collected: ${validCoordinates.length}`);
  
  // Reposition map to show all people
  if (validCoordinates.length > 0 && mapboxInstance) {
    console.log('Repositioning map to show markers...');
    repositionMapToShowPeople(validCoordinates);
  } else {
    console.warn('Cannot reposition map:', {
      hasCoordinates: validCoordinates.length > 0,
      hasMapboxInstance: !!mapboxInstance
    });
  }
}

/**
 * Reposition the map to show all people locations
 * @param {Array} coordinates - Array of [lng, lat] coordinate pairs
 */
function repositionMapToShowPeople(coordinates) {
  if (!mapboxInstance) {
    console.error('Cannot reposition: mapboxInstance is null');
    return;
  }
  
  if (!coordinates || coordinates.length === 0) {
    console.warn('Cannot reposition: no valid coordinates provided');
    return;
  }
  
  console.log(`Repositioning map to show ${coordinates.length} locations...`);
  console.log('Coordinates:', coordinates);
  
  try {
    if (coordinates.length === 1) {
      // Single location - center on it with a reasonable zoom
      const [lng, lat] = coordinates[0];
      console.log(`Flying to single location: (${lat}, ${lng})`);
      mapboxInstance.flyTo({
        center: [lng, lat],
        zoom: 17,
        duration: 1000,
        essential: true
      });
      console.log('✓ Map repositioned to single location');
    } else {
      // Multiple locations - fit bounds to show all
      console.log('Calculating bounds for multiple locations...');
      const bounds = new mapboxgl.LngLatBounds();
      coordinates.forEach(coord => {
        bounds.extend(coord);
      });
      
      console.log('Bounds calculated:', {
        sw: bounds.getSouthWest().toArray(),
        ne: bounds.getNorthEast().toArray()
      });
      
      mapboxInstance.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        duration: 1000,
        maxZoom: 20,
        essential: true
      });
      console.log(`✓ Map repositioned to fit bounds for ${coordinates.length} locations`);
    }
  } catch (error) {
    console.error('Error repositioning map:', error);
    console.error('Error stack:', error.stack);
  }
}

/**
 * Add a marker for a person on the map
 * @param {object} person - Person object with id, name, lat, lng, floor, etc.
 */
function addPersonMarker(person) {
  if (!mapboxInstance) {
    console.error('Mapbox instance not available, cannot add marker');
    throw new Error('Mapbox instance not available');
  }
  
  // Validate required fields
  if (!person.id || !person.name) {
    console.warn('Invalid person data: missing id or name', person);
    throw new Error('Missing required fields: id or name');
  }
  
  if (typeof person.lat !== 'number' || typeof person.lng !== 'number') {
    console.warn('Invalid person data: invalid coordinates', person);
    throw new Error('Invalid coordinates: must be numbers');
  }
  
  if (isNaN(person.lat) || isNaN(person.lng)) {
    console.warn('Invalid person data: NaN coordinates', person);
    throw new Error('Coordinates are NaN');
  }
  
  console.log('Adding marker for person:', person.name, 'at', person.lat, person.lng);
  
  // Create a custom HTML element for the marker
  const el = document.createElement('div');
  el.className = 'person-marker';
  el.style.width = '32px';
  el.style.height = '32px';
  el.style.borderRadius = '50%';
  el.style.backgroundColor = '#FF6B6B';
  el.style.border = '3px solid white';
  el.style.cursor = 'pointer';
  el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
  el.style.display = 'flex';
  el.style.alignItems = 'center';
  el.style.justifyContent = 'center';
  el.style.fontSize = '14px';
  el.style.fontWeight = 'bold';
  el.style.color = 'white';
  
  // Add person's initial as marker content
  const name = person.name || 'Unknown';
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase() || '?';
  el.textContent = initials;
  el.title = name;
  
  // Create Mapbox marker
  const floorText = person.floor !== undefined && person.floor !== null ? `Floor: ${person.floor}` : 'Floor: Unknown';
  const statusText = person.status ? `Status: ${person.status}` : '';
  const timestampText = person.timestamp ? `Last updated: ${new Date(person.timestamp).toLocaleTimeString()}` : '';
  
  const popupContent = `
    <div style="padding: 8px;">
      <strong>${person.name || 'Unknown'}</strong><br>
      ${floorText ? `<small>${floorText}</small><br>` : ''}
      ${statusText ? `<small>${statusText}</small><br>` : ''}
      ${timestampText ? `<small>${timestampText}</small>` : ''}
    </div>
  `;
  
  try {
    const marker = new mapboxgl.Marker(el)
      .setLngLat([person.lng, person.lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(popupContent)
      )
      .addTo(mapboxInstance);
    
    // Store marker reference
    peopleMarkers.push({
      id: person.id,
      marker: marker,
      person: person
    });
    
    console.log(`✓ Marker created and added to map for ${person.name}`);
  } catch (error) {
    console.error('Error creating Mapbox marker:', error);
    throw error;
  }
}

/**
 * Remove all people markers from the map
 */
function clearPeopleMarkers() {
  peopleMarkers.forEach(item => {
    item.marker.remove();
  });
  peopleMarkers = [];
}

/**
 * Display API response on the page for debugging
 * @param {object} rawResponse - Raw API response
 * @param {Array} processedData - Processed people array
 */
function displayApiResponse(rawResponse, processedData) {
  console.log('displayApiResponse called with:', { rawResponse, processedData });
  
  // Remove existing display if any
  let displayDiv = document.getElementById('api-response-display');
  if (!displayDiv) {
    console.log('Creating API response display panel...');
    displayDiv = document.createElement('div');
    displayDiv.id = 'api-response-display';
    displayDiv.style.cssText = `
      position: fixed;
      bottom: 10px;
      right: 10px;
      width: 500px;
      max-height: 500px;
      background: white;
      border: 4px solid #4285f4;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.6);
      z-index: 10000;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      overflow-y: auto;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    `;
    
    const header = document.createElement('div');
    header.style.cssText = 'font-weight: bold; margin-bottom: 12px; color: #4285f4; cursor: pointer; font-size: 16px; padding: 10px; background: #f0f7ff; border-radius: 4px; border: 2px solid #4285f4;';
    header.textContent = '📡 API Response (click to collapse)';
    let isExpanded = true;
    header.onclick = () => {
      isExpanded = !isExpanded;
      contentDiv.style.display = isExpanded ? 'block' : 'none';
      header.textContent = isExpanded ? '📡 API Response (click to collapse)' : '📡 API Response (click to expand)';
    };
    displayDiv.appendChild(header);
    
    const contentDiv = document.createElement('div');
    contentDiv.id = 'api-response-content-wrapper';
    contentDiv.style.cssText = 'display: block;';
    
    const content = document.createElement('pre');
    content.id = 'api-response-content';
    content.style.cssText = 'margin: 0; white-space: pre-wrap; word-wrap: break-word; background: #f8f9fa; padding: 12px; border-radius: 4px; border: 1px solid #e0e0e0; max-height: 400px; overflow-y: auto; font-size: 11px;';
    contentDiv.appendChild(content);
    displayDiv.appendChild(contentDiv);
    
    document.body.appendChild(displayDiv);
    console.log('API Response display panel created and added to DOM');
  }
  
  const content = document.getElementById('api-response-content');
  if (!content) {
    console.error('API response content element not found!');
    return;
  }
  
  const responseInfo = {
    timestamp: new Date().toLocaleTimeString(),
    apiUrl: 'https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items',
    apiKey: '2GQCAw8pQV9eqaaKy3aY58TSOHQndXGk69MBToxk',
    rawResponse: rawResponse,
    processedData: processedData,
    count: processedData ? processedData.length : 0
  };
  
  content.textContent = JSON.stringify(responseInfo, null, 2);
  displayDiv.style.display = 'block';
  displayDiv.style.visibility = 'visible';
  displayDiv.style.opacity = '1';
  
  console.log('API Response displayed in panel:', responseInfo);
  console.log('Display div is visible:', displayDiv.style.display, displayDiv.style.visibility);
}

/**
 * Stop tracking people (cleanup)
 */
function stopPeopleTracker() {
  if (updateInterval) {
    clearInterval(updateInterval);
    updateInterval = null;
  }
  clearPeopleMarkers();
  
  // Remove API response display
  const displayDiv = document.getElementById('api-response-display');
  if (displayDiv) {
    displayDiv.remove();
  }
}

// Export functions for use in main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initPeopleTracker,
    stopPeopleTracker,
    loadPeopleLocations
  };
}
