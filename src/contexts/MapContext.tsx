/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';

export interface MapContextType {
  isLoaded: boolean;
  loadError: Error | undefined;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const useMapLoader = (): MapContextType => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapLoader must be used within MapProvider');
  }
  return context;
};

export default MapContext;