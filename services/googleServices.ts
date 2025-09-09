// services/googleServices.ts
// Lightweight client-side Google Places search + details -> returns { results: GPlaceResult[] }

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

export const googleSearch = async (query: string): Promise<{ results: GPlaceResult[] }> => {
  if (!query || query.trim().length < 1) return { results: [] };

  // If running server-side (Next SSR), fallback to empty
  if (typeof window === "undefined") return { results: [] };

  // If Maps JS SDK available -> use AutocompleteService + getDetails (recommended)
  if ((window as any).google?.maps?.places) {
    const AutocompleteService = (window as any).google.maps.places.AutocompleteService;
    const PlacesService = (window as any).google.maps.places.PlacesService;
    const SessionToken = (window as any).google.maps.places.AutocompleteSessionToken;

    const ac = new AutocompleteService();
    const sessionToken = new SessionToken();

    const preds: any = await new Promise(
      (resolve, reject) => {
        ac.getPlacePredictions(
          { input: query, types: ["geocode"], sessionToken },
          (predictions: any[], status: any) => {
            if (status !== ((window as any).google.maps.places.PlacesServiceStatus.OK)) {
              resolve([]);
            } else {
              resolve(predictions || []);
            }
          }
        );
      }
    );

    if (preds.length === 0) return { results: [] };

    // create a temporary div for PlacesService
    const svc = new PlacesService(document.createElement("div"));

    // convert each prediction -> place details (to obtain address_components + geometry)
    const detailPromises = preds.map(
      (p: { place_id: string; description?: string; structured_formatting?: { main_text: string } }) =>
        new Promise<GPlaceResult>((resolve) => {
          svc.getDetails(
            {
              placeId: p.place_id,
              fields: ["formatted_address", "address_component", "geometry", "place_id"],
              sessionToken,
            },
            (placeResult: any, status: any) => {
              if (status !== ((window as any).google.maps.places.PlacesServiceStatus.OK) || !placeResult) {
                // Minimal fallback: use prediction text only
                resolve({
                  formatted_address: p.description || p.structured_formatting?.main_text,
                  place_id: p.place_id,
                });
                return;
              }

              const address_components = (placeResult.address_components || []).map((c: GAddressComponent) => ({
                long_name: (c as any).long_name,
                short_name: (c as any).short_name,
                types: (c as any).types,
              }));

              const lat = placeResult.geometry?.location?.lat?.() ?? placeResult.geometry?.location?.lat;
              const lng = placeResult.geometry?.location?.lng?.() ?? placeResult.geometry?.location?.lng;

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
    return { results };
  }

  // Fallback: use Geocoding REST (works if key allowed on referrers) — will run in browser only
  try {
    const key = (window as any).__NEXT_PUBLIC_GOOGLE_MAPS_API_KEY__ || 
                (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "") || 
                "AIzaSyBXm5uF-ladXhm6MijlNeEFxyrSHO8MpCw";
    
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      query
    )}&key=${key}`;
    
    const res = await fetch(url);
    const data = await res.json();
    
    const results: GPlaceResult[] = (data.results || []).map((r: any) => ({
      formatted_address: r.formatted_address,
      address_components: r.address_components,
      geometry: { location: { lat: r.geometry.location.lat, lng: r.geometry.location.lng } },
      place_id: r.place_id,
    }));
    
    return { results };
  } catch (err) {
    console.error("googleSearch fallback failed:", err);
    return { results: [] };
  }
};
