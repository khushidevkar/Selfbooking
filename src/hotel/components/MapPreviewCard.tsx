
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { MapPin, Loader2 } from 'lucide-react';

interface MapPreviewCardProps {
  mapCoordinates: string; // Format: "lat|lng"
  hotelName: string;
  className?: string;
  height?: string;
  onMapClick?: () => void;
  apiKey?: string;
}

export const MapPreviewCard: React.FC<MapPreviewCardProps> = ({
  mapCoordinates,
  hotelName,
  className = '',
  height = 'h-32',
  onMapClick,
  apiKey = 'AIzaSyCnfQ-TTa0kZzAPvcgc9qyorD34aIxaZhk',
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const parseCoordinates = () => {
    if (!mapCoordinates) return null;
    const [latStr, lngStr] = mapCoordinates.split('|');
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);
    
    if (isNaN(lat) || isNaN(lng)) return null;
    return { lat, lng };
  };

  const coordinates = parseCoordinates();

  const handleMapClick = () => {
    if (onMapClick) {
      onMapClick();
      return;
    }

    if (!coordinates) return;
    
    // Default behavior: Open Google Maps
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelName)}&query_place_id=${coordinates.lat},${coordinates.lng}`;
    window.open(mapsUrl, '_blank');
  };

  if (loadError) {
    return (
      <Card className={`border-gray-200 overflow-hidden ${className}`}>
        <CardContent className="p-0">
          <div className={`${height} bg-gray-100 flex items-center justify-center`}>
            <div className="text-center text-gray-500">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <p className="text-xs">Unable to load map</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isLoaded) {
    return (
      <Card className={`border-gray-200 overflow-hidden ${className}`}>
        <CardContent className="p-0">
          <div className={`${height} bg-gray-100 flex items-center justify-center`}>
            <Loader2 className="w-6 h-6 text-[#785ef7] animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!coordinates) {
    return (
      <Card className={`border-gray-200 overflow-hidden ${className}`}>
        <CardContent className="p-0">
          <div className={`${height} bg-gray-100 flex items-center justify-center`}>
            <div className="text-center text-gray-500">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <p className="text-xs">Location not available</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-gray-200 overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <button
          onClick={handleMapClick}
          className="relative w-full cursor-pointer group"
        >
          <div className={height}>
            <GoogleMap
              mapContainerClassName="w-full h-full"
              zoom={15}
              center={coordinates}
              options={{
                disableDefaultUI: true,
                gestureHandling: 'none',
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: true,
              }}
            >
              <Marker position={coordinates} />
            </GoogleMap>
          </div>

          {/* Overlay Button */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-gray-200 transition-all group-hover:bg-white group-hover:shadow-xl">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#785ef7]" />
              <span className="text-xs font-semibold text-gray-900">
                View on Map
              </span>
            </div>
          </div>
        </button>
      </CardContent>
    </Card>
  );
};

export default MapPreviewCard;