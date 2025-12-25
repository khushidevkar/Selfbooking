import React, { ReactNode } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import MapContext from '@/contexts/MapContext';

// Move outside component to prevent re-initialization
const libraries: ("marker" | "places" | "geometry")[] = ["marker"];

interface MapProviderProps {
  children: ReactNode;
}

const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCnfQ-TTa0kZzAPvcgc9qyorD34aIxaZhk',
    libraries,
    preventGoogleFontsLoading: true, // Prevents duplicate font loading

  });

  return (
    <MapContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;