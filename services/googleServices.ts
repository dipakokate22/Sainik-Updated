// services/googleServices.ts
// Enhanced with comprehensive debugging for production troubleshooting

type GAddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

type GPlaceResult = {
  formatted_address?: string;
  address_components?: GAddressComponent[];
  geometry?: { location?: { lat?: number; lng?: number } };
  place_id?: string;
};

// Debug utility function
const debugLog = (category: string, message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[GOOGLE-PLACES-DEBUG] ${timestamp} [${category}] ${message}`, data || '');
};

export const googleSearch = async (query: string): Promise<{ results: GPlaceResult[] }> => {
  debugLog('INIT', '=== Starting googleSearch ===');
  debugLog('INPUT', `Query: "${query}"`);
  debugLog('INPUT', `Query length: ${query?.length || 0}`);
  debugLog('INPUT', `Query trimmed length: ${query?.trim()?.length || 0}`);

  // Early validation
  if (!query || query.trim().length < 1) {
    debugLog('VALIDATION', 'Query is empty or too short, returning empty results');
    return { results: [] };
  }

  // Server-side check
  if (typeof window === "undefined") {
    debugLog('ENVIRONMENT', 'Running server-side (SSR), returning empty results');
    return { results: [] };
  }

  // Environment debugging
  debugLog('ENVIRONMENT', `Node ENV: ${process.env.NODE_ENV}`);
  debugLog('ENVIRONMENT', `Window location: ${window.location.href}`);
  debugLog('ENVIRONMENT', `User agent: ${navigator.userAgent}`);
  debugLog('ENVIRONMENT', `Protocol: ${window.location.protocol}`);
  debugLog('ENVIRONMENT', `Hostname: ${window.location.hostname}`);

  // API Key debugging - with your original fallback logic preserved
  const envApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const windowApiKey = (window as any).__NEXT_PUBLIC_GOOGLE_MAPS_API_KEY__;
  const hardcodedKey = "AIzaSyBXm5uF-ladXhm6MijlNeEFxyrSHO8MpCw";
  
  const finalKey = windowApiKey || envApiKey || hardcodedKey;
  
  debugLog('API-KEY', `Environment API key exists: ${!!envApiKey}`);
  debugLog('API-KEY', `Environment API key length: ${envApiKey?.length || 0}`);
  debugLog('API-KEY', `Environment API key preview: ${envApiKey ? envApiKey.substring(0, 10) + '...' : 'null'}`);
  debugLog('API-KEY', `Window API key exists: ${!!windowApiKey}`);
  debugLog('API-KEY', `Window API key length: ${windowApiKey?.length || 0}`);
  debugLog('API-KEY', `Hardcoded key being used as fallback: ${!windowApiKey && !envApiKey}`);
  debugLog('API-KEY', `Final key selected: ${finalKey.substring(0, 10)}...`);

  // Google Maps SDK availability check
  const googleMapsAvailable = !!(window as any).google;
  const googleMapsAPIAvailable = !!(window as any).google?.maps;
  const googlePlacesAvailable = !!(window as any).google?.maps?.places;
  
  debugLog('GOOGLE-SDK', `Google object available: ${googleMapsAvailable}`);
  debugLog('GOOGLE-SDK', `Google Maps API available: ${googleMapsAPIAvailable}`);
  debugLog('GOOGLE-SDK', `Google Places API available: ${googlePlacesAvailable}`);

  if (googleMapsAvailable) {
    debugLog('GOOGLE-SDK', `Google Maps version: ${(window as any).google?.maps?.version || 'unknown'}`);
  }

  // If Maps JS SDK available -> use AutocompleteService + getDetails
  if (googlePlacesAvailable) {
    debugLog('PLACES-SDK', 'Using Google Places SDK');
    
    try {
      const AutocompleteService = (window as any).google.maps.places.AutocompleteService;
      const PlacesService = (window as any).google.maps.places.PlacesService;
      const SessionToken = (window as any).google.maps.places.AutocompleteSessionToken;

      debugLog('PLACES-SDK', `AutocompleteService available: ${!!AutocompleteService}`);
      debugLog('PLACES-SDK', `PlacesService available: ${!!PlacesService}`);
      debugLog('PLACES-SDK', `SessionToken available: ${!!SessionToken}`);

      const ac = new AutocompleteService();
      const sessionToken = new SessionToken();

      debugLog('PLACES-SDK', 'Created AutocompleteService and SessionToken instances');

      const preds: any = await new Promise((resolve, reject) => {
        const startTime = Date.now();
        debugLog('AUTOCOMPLETE', `Starting getPlacePredictions for: "${query}"`);
        
        ac.getPlacePredictions(
          { 
            input: query, 
            types: ["geocode"], 
            sessionToken 
          },
          (predictions: any[], status: any) => {
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            debugLog('AUTOCOMPLETE', `Response received in ${duration}ms`);
            debugLog('AUTOCOMPLETE', `Status: ${status}`);
            debugLog('AUTOCOMPLETE', `Status OK value: ${(window as any).google.maps.places.PlacesServiceStatus.OK}`);
            debugLog('AUTOCOMPLETE', `Predictions array: ${Array.isArray(predictions)}`);
            debugLog('AUTOCOMPLETE', `Predictions count: ${predictions?.length || 0}`);

            if (predictions && predictions.length > 0) {
              debugLog('AUTOCOMPLETE', 'First prediction preview:', {
                place_id: predictions[0].place_id,
                description: predictions[0].description,
                main_text: predictions[0].structured_formatting?.main_text
              });
            }

            if (status !== (window as any).google.maps.places.PlacesServiceStatus.OK) {
              debugLog('AUTOCOMPLETE', `Failed with status: ${status}`);
              
              // Log all possible status values for comparison
              const statusEnum = (window as any).google.maps.places.PlacesServiceStatus;
              debugLog('AUTOCOMPLETE', 'Available status values:', {
                OK: statusEnum.OK,
                UNKNOWN_ERROR: statusEnum.UNKNOWN_ERROR,
                OVER_QUERY_LIMIT: statusEnum.OVER_QUERY_LIMIT,
                REQUEST_DENIED: statusEnum.REQUEST_DENIED,
                INVALID_REQUEST: statusEnum.INVALID_REQUEST,
                ZERO_RESULTS: statusEnum.ZERO_RESULTS
              });
              
              resolve([]);
            } else {
              debugLog('AUTOCOMPLETE', 'Success! Resolving predictions');
              resolve(predictions || []);
            }
          }
        );
      });

      if (preds.length === 0) {
        debugLog('AUTOCOMPLETE', 'No predictions returned, returning empty results');
        return { results: [] };
      }

      debugLog('PLACE-DETAILS', `Getting details for ${preds.length} predictions`);

      // Create a temporary div for PlacesService
      const tempDiv = document.createElement("div");
      const svc = new PlacesService(tempDiv);
      
      debugLog('PLACE-DETAILS', 'Created PlacesService instance');

      // Convert each prediction -> place details
      const detailPromises = preds.map((p: { place_id: string; description?: string; structured_formatting?: { main_text: string } }, index: number) =>
        new Promise<GPlaceResult>((resolve) => {
          const startTime = Date.now();
          debugLog('PLACE-DETAILS', `Getting details for prediction ${index + 1}: ${p.place_id}`);
          
          svc.getDetails(
            {
              placeId: p.place_id,
              fields: ["formatted_address", "address_component", "geometry", "place_id"],
              sessionToken,
            },
            (placeResult: any, status: any) => {
              const endTime = Date.now();
              const duration = endTime - startTime;
              
              debugLog('PLACE-DETAILS', `Details response ${index + 1} received in ${duration}ms`);
              debugLog('PLACE-DETAILS', `Details status ${index + 1}: ${status}`);
              debugLog('PLACE-DETAILS', `Details result exists: ${!!placeResult}`);

              if (status !== (window as any).google.maps.places.PlacesServiceStatus.OK || !placeResult) {
                debugLog('PLACE-DETAILS', `Details failed for ${index + 1}, using fallback`);
                
                // Minimal fallback
                resolve({
                  formatted_address: p.description || p.structured_formatting?.main_text,
                  place_id: p.place_id,
                });
                return;
              }

              debugLog('PLACE-DETAILS', `Processing details for ${index + 1}:`, {
                formatted_address: placeResult.formatted_address,
                address_components_count: placeResult.address_components?.length || 0,
                has_geometry: !!placeResult.geometry,
                has_location: !!placeResult.geometry?.location
              });

              const address_components = (placeResult.address_components || []).map((c: GAddressComponent) => ({
                long_name: (c as any).long_name,
                short_name: (c as any).short_name,
                types: (c as any).types,
              }));

              const lat = placeResult.geometry?.location?.lat?.() ?? placeResult.geometry?.location?.lat;
              const lng = placeResult.geometry?.location?.lng?.() ?? placeResult.geometry?.location?.lng;

              debugLog('PLACE-DETAILS', `Coordinates for ${index + 1}: lat=${lat}, lng=${lng}`);

              resolve({
                formatted_address: placeResult.formatted_address,
                address_components,
                geometry: { location: { lat: Number(lat), lng: Number(lng) } },
                place_id: placeResult.place_id,
              });
            }
          );
        })
      );

      const results = await Promise.all(detailPromises);
      debugLog('PLACES-SDK', `Successfully processed ${results.length} place details`);
      debugLog('PLACES-SDK', 'Final results preview:', results.map(r => ({ 
        formatted_address: r.formatted_address, 
        place_id: r.place_id 
      })));
      
      return { results };

    } catch (error) {
      debugLog('PLACES-SDK', 'Places SDK error occurred:', error);
      debugLog('PLACES-SDK', 'Error name:', (error as any)?.name);
      debugLog('PLACES-SDK', 'Error message:', (error as any)?.message);
      debugLog('PLACES-SDK', 'Error stack:', (error as any)?.stack);
      
      // Continue to fallback
    }
  }

  // Fallback: use Geocoding REST API - using your original key selection logic
  debugLog('FALLBACK', 'Using Geocoding REST API fallback');
  
  try {
    const key = (window as any).__NEXT_PUBLIC_GOOGLE_MAPS_API_KEY__ || 
                (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "") || 
                "AIzaSyBXm5uF-ladXhm6MijlNeEFxyrSHO8MpCw";
    
    debugLog('FALLBACK', `Using API key: ${key.substring(0, 10)}...`);
    debugLog('FALLBACK', `Key source: ${
      (window as any).__NEXT_PUBLIC_GOOGLE_MAPS_API_KEY__ ? 'window' :
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? 'environment' : 'hardcoded'
    }`);

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${key}`;
    debugLog('FALLBACK', `Geocoding URL (key redacted): ${url.replace(key, '[REDACTED]')}`);
    
    const startTime = Date.now();
    const res = await fetch(url);
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    debugLog('FALLBACK', `Fetch completed in ${duration}ms`);
    debugLog('FALLBACK', `Response status: ${res.status}`);
    debugLog('FALLBACK', `Response ok: ${res.ok}`);
    debugLog('FALLBACK', `Response headers:`, Object.fromEntries(res.headers.entries()));
    
    if (!res.ok) {
      debugLog('FALLBACK', `HTTP error: ${res.status} ${res.statusText}`);
      const errorText = await res.text();
      debugLog('FALLBACK', `Error response body: ${errorText}`);
      return { results: [] };
    }
    
    const data = await res.json();
    
    debugLog('FALLBACK', `Geocoding API status: ${data.status}`);
    debugLog('FALLBACK', `Results count: ${data.results?.length || 0}`);
    
    if (data.error_message) {
      debugLog('FALLBACK', `API error message: ${data.error_message}`);
    }
    
    if (data.status !== 'OK') {
      debugLog('FALLBACK', `Geocoding failed with status: ${data.status}`);
      debugLog('FALLBACK', 'Full response:', data);
      return { results: [] };
    }

    if (data.results && data.results.length > 0) {
      debugLog('FALLBACK', 'First result preview:', {
        formatted_address: data.results[0].formatted_address,
        place_id: data.results[0].place_id,
        location: data.results[0].geometry?.location
      });
    }
    
    const results: GPlaceResult[] = (data.results || []).map((r: any, index: number) => {
      debugLog('FALLBACK', `Mapping result ${index + 1}:`, {
        formatted_address: r.formatted_address,
        components_count: r.address_components?.length || 0,
        has_geometry: !!r.geometry,
        place_id: r.place_id
      });

      return {
        formatted_address: r.formatted_address,
        address_components: r.address_components,
        geometry: { location: { lat: r.geometry.location.lat, lng: r.geometry.location.lng } },
        place_id: r.place_id,
      };
    });
    
    debugLog('FALLBACK', `Successfully processed ${results.length} geocoding results`);
    return { results };
    
  } catch (err) {
    debugLog('FALLBACK', 'Geocoding REST API error:', err);
    debugLog('FALLBACK', 'Error name:', (err as any)?.name);
    debugLog('FALLBACK', 'Error message:', (err as any)?.message);
    debugLog('FALLBACK', 'Error stack:', (err as any)?.stack);
    
    if (err instanceof TypeError && err.message.includes('fetch')) {
      debugLog('FALLBACK', 'Network error detected - possibly CORS or connectivity issue');
    }
    
    return { results: [] };
  } finally {
    debugLog('INIT', '=== Ending googleSearch ===');
  }
};

// Additional diagnostic function you can call separately
export const diagnosGoogleMapsSetup = () => {
  debugLog('DIAGNOSTIC', '=== Google Maps Setup Diagnostic ===');
  
  // Environment
  debugLog('DIAGNOSTIC', `Environment: ${process.env.NODE_ENV}`);
  debugLog('DIAGNOSTIC', `URL: ${window.location.href}`);
  debugLog('DIAGNOSTIC', `Protocol: ${window.location.protocol}`);
  
  // API Keys - with your original fallback
  const windowKey = (window as any).__NEXT_PUBLIC_GOOGLE_MAPS_API_KEY__;
  const envKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const hardcodedKey = "AIzaSyBXm5uF-ladXhm6MijlNeEFxyrSHO8MpCw";
  
  debugLog('DIAGNOSTIC', `Window API Key: ${windowKey ? windowKey.substring(0, 15) + '...' : 'MISSING'}`);
  debugLog('DIAGNOSTIC', `Env API Key: ${envKey ? envKey.substring(0, 15) + '...' : 'MISSING'}`);
  debugLog('DIAGNOSTIC', `Hardcoded Key: ${hardcodedKey.substring(0, 15)}...`);
  debugLog('DIAGNOSTIC', `Final key would be: ${(windowKey || envKey || hardcodedKey).substring(0, 15)}...`);
  
  // Google Objects
  debugLog('DIAGNOSTIC', `window.google: ${!!(window as any).google}`);
  debugLog('DIAGNOSTIC', `window.google.maps: ${!!(window as any).google?.maps}`);
  debugLog('DIAGNOSTIC', `window.google.maps.places: ${!!(window as any).google?.maps?.places}`);
  
  if ((window as any).google?.maps) {
    debugLog('DIAGNOSTIC', `Maps API version: ${(window as any).google.maps.version}`);
  }
  
  // Script tags check
  const scripts = Array.from(document.querySelectorAll('script[src*="maps.googleapis.com"]'));
  debugLog('DIAGNOSTIC', `Google Maps scripts found: ${scripts.length}`);
  scripts.forEach((script, i) => {
    debugLog('DIAGNOSTIC', `Script ${i + 1}: ${(script as HTMLScriptElement).src}`);
  });
  
  debugLog('DIAGNOSTIC', '=== End Diagnostic ===');
};
