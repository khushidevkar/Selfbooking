import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleMap, Marker, InfoWindowF, useLoadScript } from '@react-google-maps/api';
import { X, Search, MapPin, Star } from 'lucide-react';

interface MapViewProps {
  isOpen: boolean;
  onClose: () => void;
  hotels: any[];
  extractAttraction: (description: string) => string;
  onSelectHotel: (hotel: any) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  isOpen,
  onClose,
  hotels,
  extractAttraction,
  onSelectHotel
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [droppedMarkers, setDroppedMarkers] = useState<Record<string, boolean>>({});

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCnfQ-TTa0kZzAPvcgc9qyorD34aIxaZhk",
  });

  const parseCoords = (mapStr: string) => {
    if (!mapStr || typeof mapStr !== "string") return null;
    const cleaned = mapStr.trim().replace(/\s*,\s*/g, "|").replace(/\s+/g, "|");
    const parts = cleaned.split("|").map((p) => p.trim()).filter(Boolean);
    if (parts.length < 2) return null;

    const a = Number(parts[0]);
    const b = Number(parts[1]);

    if (Number.isFinite(a) && Number.isFinite(b) && Math.abs(a) <= 90 && Math.abs(b) <= 180) {
      return { lat: a, lng: b };
    }
    if (Number.isFinite(b) && Number.isFinite(a) && Math.abs(b) <= 90 && Math.abs(a) <= 180) {
      return { lat: b, lng: a };
    }
    return null;
  };

  const getHotelCoords = (hotel: any) => parseCoords(hotel?.Map);

  const searchFilteredHotels = hotels.filter(hotel =>
    hotel.HotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.Address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const mapCenter = useMemo(() => {
    if (searchFilteredHotels.length > 0) {
      const coords = getHotelCoords(searchFilteredHotels[0]);
      if (coords) return coords;
    }
    return { lat: 19.0760, lng: 72.8777 };
  }, [searchFilteredHotels]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (searchFilteredHotels.length === 1) {
      const single = searchFilteredHotels[0];
      const coords = getHotelCoords(single);
      if (coords) {
        mapRef.current.panTo(coords);
        mapRef.current.setZoom(15);
      }
      setSelectedHotel(single);
    } else {
      setSelectedHotel(null);
    }
  }, [searchFilteredHotels]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-2xl w-[95%] h-[95%] max-w-7xl flex flex-col relative"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center pt-2 pb-2 px-4 border-b bg-[#785ef7] rounded-t-lg">
            <div>
              <h2 className="text-xl font-bold text-white mb-0">Hotels Map View</h2>
              <p className="text-blue-100 text-sm m-0">{searchFilteredHotels.length} hotels found</p>
            </div>
            <button
              className="text-white hover:bg-violet-600 rounded-full p-2 transition"
              onClick={() => {
                onClose();
                setSelectedHotel(null);
                setSearchQuery("");
              }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* SEARCH BAR */}
          <div className="p-2 md:p-4 border-b bg-gray-50">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search hotels by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* MAP + CARDS */}
          <div className="flex-1 relative flex flex-col md:flex-row overflow-hidden">
            {/* HOTEL CARDS PANEL */}
            <div className="w-full md:w-96 h-48 md:h-full overflow-y-auto border-r bg-white">
              {searchFilteredHotels.length > 0 ? (
                <div className="p-2 space-y-2">
                  {searchFilteredHotels.map((hotel) => {
                    const isSelected = selectedHotel?.HotelCode === hotel.HotelCode;
                    return (
                      <div
                        key={hotel.HotelCode}
                        onClick={() => {
                          setSelectedHotel(hotel);
                          const coords = getHotelCoords(hotel);
                          if (mapRef.current && coords) {
                            mapRef.current.panTo(coords);
                            mapRef.current.setZoom(15);
                          }
                        }}
                        className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-lg ${
                          isSelected ? 'border-[#785ef7] bg-purple-50 shadow-md' : 'border-gray-200 hover:border-[#785ef7]'
                        }`}
                      >
                        <div className="flex gap-3">
                          <img
                            src={hotel.Image}
                            alt={hotel.HotelName}
                            className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                            onError={(e: any) => (e.target.src = "https://via.placeholder.com/96x96?text=No+Image")}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-gray-800 truncate mb-1">
                              {hotel.HotelName}
                            </h4>
                            <div className="flex items-center gap-1 mb-1">
                              {[...Array(hotel.HotelRating || 0)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                              <span className="text-xs text-gray-500">({hotel.HotelRating})</span>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                              {hotel.Address}
                            </p>
                            <div className="flex items-baseline justify-between">
                              <span className="text-lg font-bold text-[#785ef7]">
                                ₹{hotel.Rooms?.[0]?.TotalFare?.toFixed(0)}
                              </span>
                              <span className="text-xs text-gray-500">/night</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full p-4">
                  <div className="text-center">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600">No hotels found</p>
                  </div>
                </div>
              )}
            </div>

            {/* MAP */}
            <div className="flex-1 relative">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  onLoad={(map) => (mapRef.current = map)}
                  zoom={searchFilteredHotels.length === 1 ? 15 : 12}
                  center={mapCenter}
                >
                  {searchFilteredHotels.map((hotel) => {
                    const coords = getHotelCoords(hotel);
                    if (!coords) return null;

                    const isSelected = selectedHotel?.HotelCode === hotel.HotelCode;

                    return (
                      <Marker
                        key={hotel.HotelCode}
                        position={coords}
                        onLoad={() => {
                          setDroppedMarkers((prev) =>
                            prev[hotel.HotelCode] ? prev : { ...prev, [hotel.HotelCode]: true }
                          );
                        }}
                        onClick={() => {
                          setSelectedHotel(hotel);
                          if (mapRef.current) {
                            mapRef.current.panTo(coords);
                            mapRef.current.setZoom(15);
                          }
                        }}
                        label={{
                          text: `₹${hotel.Rooms?.[0]?.TotalFare?.toFixed(0) ?? "N/A"}`,
                          color: "white",
                          fontSize: "11px",
                          fontWeight: "bold",
                        }}
                        animation={
                          window?.google?.maps
                            ? isSelected
                              ? window.google.maps.Animation.BOUNCE
                              : droppedMarkers[hotel.HotelCode]
                              ? null
                              : window.google.maps.Animation.DROP
                            : null
                        }
                        icon={{
                          url: isSelected
                            ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                            : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                          scaledSize: new window.google.maps.Size(40, 40),
                          anchor: new window.google.maps.Point(20, 40),
                        }}
                      />
                    );
                  })}

                  {selectedHotel && getHotelCoords(selectedHotel) && (
                    <InfoWindowF
                      position={getHotelCoords(selectedHotel)!}
                      onCloseClick={() => {
                        setSelectedHotel(null);
                        setSearchQuery("");
                      }}
                    >
                      <div className="w-64">
                        <div className="p-2">
                          <div className="relative">
                            <img
                              src={selectedHotel.Image}
                              alt={selectedHotel.HotelName}
                              className="w-full h-24 object-cover rounded mb-2"
                              onError={(e: any) => (e.target.src = "https://via.placeholder.com/300x200?text=No+Image")}
                            />
                            <div className="absolute top-1 right-1 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                              ₹{selectedHotel.Rooms?.[0]?.TotalFare?.toFixed(0)}
                            </div>
                          </div>

                          <h3 className="font-bold text-sm mb-1 text-gray-800 line-clamp-1">
                            {selectedHotel.HotelName}
                          </h3>

                          <div className="flex items-center gap-0.5 mb-1">
                            {[...Array(selectedHotel.HotelRating || 0)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="text-xs text-gray-600 ml-1">
                              ({selectedHotel.HotelRating})
                            </span>
                          </div>

                          <div className="flex items-start gap-1 mb-2">
                            <MapPin className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-gray-600 line-clamp-1">{selectedHotel.Address}</p>
                          </div>

                          {selectedHotel.Rooms?.[0]?.Inclusion && (
                            <div className="mb-2">
                              <span className="inline-block bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded">
                                {selectedHotel.Rooms[0].Inclusion}
                              </span>
                            </div>
                          )}

                          <button
                            className="w-full bg-[#785ef7] text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-violet-600 transition"
                            onClick={() => {
                              onSelectHotel(selectedHotel);
                              onClose();
                              setSelectedHotel(null);
                              setSearchQuery("");
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </InfoWindowF>
                  )}
                </GoogleMap>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p>Loading map...</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};