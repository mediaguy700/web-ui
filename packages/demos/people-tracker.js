// people-tracker.js - Display multiple people's locations from a database

let peopleMarkers = [];
let mapboxInstance = null;
let updateInterval = null;

/**
 * Initialize people tracking on the map
 * @param {object} mapboxMap - The Mapbox map instance
 */
function initPeopleTracker(mapboxMap) {
  mapboxInstance = mapboxMap;
  
  // Load initial people locations
  loadPeopleLocations();
  
  // Update people locations every 4 seconds (adjust as needed)
  updateInterval = setInterval(() => {
    loadPeopleLocations();
  }, 4000);
}

/**
 * Fetch people's locations from your database/API
 */
async function fetchPeopleLocations() {
  try {
    console.log('Fetching people locations from API...');
    const response = await fetch('https://dxpsn25dt0.execute-api.us-east-2.amazonaws.com/Prod/items');
    
    console.log('API Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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
        return [];
      }
    }
    
    console.log('API Response data:', data);
    
    // Ensure the response is an array
    let peopleArray = [];
    if (Array.isArray(data)) {
      peopleArray = data;
    } else if (data.items || data.people || data.locations) {
      // Handle different response structures
      peopleArray = data.items || data.people || data.locations || [];
    } else if (data.body) {
      // Handle AWS Lambda response format
      const parsedBody = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
      peopleArray = Array.isArray(parsedBody) ? parsedBody : (parsedBody.items || parsedBody.people || parsedBody.locations || []);
    } else {
      console.warn('Unexpected API response format:', data);
      return [];
    }
    
    console.log('Processed people array:', peopleArray);
    console.log('Number of people found:', peopleArray.length);
    
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
    
    // Also display in a visible area on the page for easy viewing
    if (typeof displayApiResponse === 'function') {
      displayApiResponse(data, normalizedArray);
    } else {
      console.error('displayApiResponse function not found!');
    }
    
    return normalizedArray;
  } catch (error) {
    console.error('Error fetching people locations:', error);
    console.error('Error details:', error.message, error.stack);
    return [];
  }
}

/**
 * Load and display people's locations on the map
 */
async function loadPeopleLocations() {
  console.log('Loading people locations...');
  const people = await fetchPeopleLocations();
  
  console.log('Received people data:', people);
  
  if (!people || people.length === 0) {
    console.warn('No people data received or empty array');
    return;
  }
  
  // Remove existing markers
  clearPeopleMarkers();
  
  // Collect valid coordinates for bounds calculation
  const validCoordinates = [];
  
  // Add new markers for each person
  let markersAdded = 0;
  people.forEach(person => {
    try {
      addPersonMarker(person);
      markersAdded++;
      
      // Collect coordinates for bounds calculation
      if (typeof person.lat === 'number' && typeof person.lng === 'number') {
        validCoordinates.push([person.lng, person.lat]);
      }
    } catch (error) {
      console.error('Error adding marker for person:', person, error);
    }
  });
  
  console.log(`Successfully added ${markersAdded} markers to the map`);
  
  // Reposition map to show all people
  if (validCoordinates.length > 0 && mapboxInstance) {
    repositionMapToShowPeople(validCoordinates);
  }
}

/**
 * Reposition the map to show all people locations
 * @param {Array} coordinates - Array of [lng, lat] coordinate pairs
 */
function repositionMapToShowPeople(coordinates) {
  if (!mapboxInstance || !coordinates || coordinates.length === 0) {
    return;
  }
  
  try {
    if (coordinates.length === 1) {
      // Single location - center on it with a reasonable zoom
      const [lng, lat] = coordinates[0];
      mapboxInstance.flyTo({
        center: [lng, lat],
        zoom: 17,
        duration: 1000
      });
      console.log('Repositioned map to single location:', lat, lng);
    } else {
      // Multiple locations - fit bounds to show all
      const bounds = coordinates.reduce((bounds, coord) => {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
      
      mapboxInstance.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        duration: 1000,
        maxZoom: 20
      });
      console.log('Repositioned map to fit bounds for', coordinates.length, 'locations');
    }
  } catch (error) {
    console.error('Error repositioning map:', error);
  }
}

/**
 * Add a marker for a person on the map
 * @param {object} person - Person object with id, name, lat, lng, floor, etc.
 */
function addPersonMarker(person) {
  if (!mapboxInstance) {
    console.error('Mapbox instance not available, cannot add marker');
    return;
  }
  
  // Validate required fields
  if (!person.id || !person.name || typeof person.lat !== 'number' || typeof person.lng !== 'number') {
    console.warn('Invalid person data, skipping marker:', person);
    console.warn('Required fields check:', {
      hasId: !!person.id,
      hasName: !!person.name,
      hasLat: typeof person.lat === 'number',
      hasLng: typeof person.lng === 'number',
      lat: person.lat,
      lng: person.lng
    });
    return;
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
      width: 450px;
      max-height: 400px;
      background: white;
      border: 3px solid #4285f4;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.5);
      z-index: 10000;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      overflow-y: auto;
      display: block;
    `;
    
    const header = document.createElement('div');
    header.style.cssText = 'font-weight: bold; margin-bottom: 12px; color: #4285f4; cursor: pointer; font-size: 14px; padding: 8px; background: #f0f7ff; border-radius: 4px;';
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
    content.style.cssText = 'margin: 0; white-space: pre-wrap; word-wrap: break-word; background: #f8f9fa; padding: 12px; border-radius: 4px; border: 1px solid #e0e0e0; max-height: 320px; overflow-y: auto;';
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
    rawResponse: rawResponse,
    processedData: processedData,
    count: processedData ? processedData.length : 0
  };
  
  content.textContent = JSON.stringify(responseInfo, null, 2);
  displayDiv.style.display = 'block';
  
  console.log('API Response displayed in panel:', responseInfo);
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
