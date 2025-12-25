
import { useEffect, useRef } from 'react';

interface AdvancedMarkerProps {
  position: { lat: number; lng: number };
  map: google.maps.Map | null;
  title?: string;
  onClick?: () => void;
}

export const AdvancedMarker: React.FC<AdvancedMarkerProps> = ({
  position,
  map,
  title,
  onClick
}) => {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  useEffect(() => {
    if (!map || !window.google?.maps?.marker?.AdvancedMarkerElement) return;

    // Create advanced marker
    markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
      map,
      position,
      title,
    });

    // Add click listener
    if (onClick) {
      markerRef.current.addListener('click', onClick);
    }

    // Cleanup
    return () => {
      if (markerRef.current) {
        markerRef.current.map = null;
      }
    };
  }, [map, position, title, onClick]);

  return null;
};