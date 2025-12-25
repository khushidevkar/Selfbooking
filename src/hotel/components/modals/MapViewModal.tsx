
import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleMap, Marker, InfoWindowF, useLoadScript } from '@react-google-maps/api';
import { X, Search, MapPin, Star } from 'lucide-react';
import { hotelTypes } from '@/index';

interface MapViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotels: hotelTypes.Hotel[];
  extractAttraction: (description: string) => string;
  onSelectHotel: (hotel: hotelTypes.Hotel) => void;
}


export const MapViewModal: React.FC<MapViewModalProps> = ({
  isOpen,
  onClose,
  hotels,
  extractAttraction,
  onSelectHotel
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  // const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [selectedHotel, setSelectedHotel] = useState<hotelTypes.Hotel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [droppedMarkers, setDroppedMarkers] = useState<Record<string, boolean>>({});
  const [mapLoaded, setMapLoaded] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCnfQ-TTa0kZzAPvcgc9qyorD34aIxaZhk",
  });

  const parseCoords = (mapStr?: string) => {
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

  // const getHotelCoords = (hotel: hotelTypes.Hotel) => parseCoords(hotel?.Map);
  const getHotelCoords = useCallback(
    (hotel: hotelTypes.Hotel) => parseCoords(hotel.Map),
    []
  );


  const searchFilteredHotels = hotels.filter(hotel =>
    hotel.HotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.Address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const mapCenter = useMemo(() => {
  //   if (searchFilteredHotels.length > 0) {
  //     const coords = getHotelCoords(searchFilteredHotels[0]);
  //     if (coords) return coords;
  //   }
  //   return { lat: 19.0760, lng: 72.8777 };
  // }, [searchFilteredHotels]);

  const mapCenter = useMemo(() => {
    if (searchFilteredHotels.length > 0) {
      const coords = getHotelCoords(searchFilteredHotels[0]);
      if (coords) return coords;
    }
    return { lat: 19.0760, lng: 72.8777 };
  }, [searchFilteredHotels, getHotelCoords]);


  // useEffect(() => {
  //   if (!mapRef.current) return;

  //   if (searchFilteredHotels.length === 1) {
  //     const single = searchFilteredHotels[0];
  //     const coords = getHotelCoords(single);
  //     if (coords) {
  //       mapRef.current.panTo(coords);
  //       mapRef.current.setZoom(15);
  //     }
  //     setSelectedHotel(single);
  //   } else {
  //     setSelectedHotel(null);
  //   }
  // }, [searchFilteredHotels]);

 // Compute default selection (only if exactly 1 hotel)
const defaultSelectedHotel = useMemo(() => {
  return searchFilteredHotels.length === 1 ? searchFilteredHotels[0] : null;
}, [searchFilteredHotels]);

// Only pan map in effect, without touching state
useEffect(() => {
  if (!mapRef.current || !defaultSelectedHotel) return;

  const coords = getHotelCoords(defaultSelectedHotel);
  if (coords) {
    mapRef.current.panTo(coords);
    mapRef.current.setZoom(15);
  }
}, [defaultSelectedHotel, getHotelCoords]);

// selectedHotel state is now controlled only by user actions

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-30 z-50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-[95%] h-[95%] max-w-7xl flex flex-col relative overflow-hidden"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center pt-4 pb-4 px-6 bg-linear-to-r from-[#785ef7] to-[#644ed4] shadow-lg">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Explore Hotels on Map</h2>
              <p className="text-purple-100 text-sm m-0 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {searchFilteredHotels.length} hotels found
              </p>
            </div>
            <button
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200 hover:rotate-90 hover:text-red-500"
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
          <div className="p-4 md:p-6 bg-linear-to-b from-gray-50 to-white">
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search hotels by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#785ef7] focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* MAP + CARDS */}
          <div className="flex-1 relative flex flex-col md:flex-row overflow-hidden">
            {/* HOTEL CARDS PANEL */}
            <div className="w-full md:w-96 h-48 md:h-full overflow-y-auto border-r bg-linear-to-b from-white to-gray-50 custom-scrollbar">
              {searchFilteredHotels.length > 0 ? (
                <div className="p-3 space-y-3">
                  {searchFilteredHotels.map((hotel) => {
                    const isSelected = selectedHotel?.HotelCode === hotel.HotelCode;
                    return (
                      <motion.div
                        key={hotel.HotelCode}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        onClick={() => {
                          setSelectedHotel(hotel);
                          const coords = getHotelCoords(hotel);
                          if (mapRef.current && coords) {
                            mapRef.current.panTo(coords);
                            mapRef.current.setZoom(15);
                          }
                        }}
                        className={`border-2 rounded-xl p-3 cursor-pointer transition-all duration-200 ${isSelected
                          ? 'border-[#785ef7] bg-linear-to-br from-purple-50 to-white shadow-lg'
                          : 'border-gray-200 hover:border-[#785ef7] hover:shadow-md bg-white'
                          }`}
                      >
                        <div className="flex gap-3">
                          <div className="relative">
                            <img
                              src={hotel.Image}
                              alt={hotel.HotelName}
                              className="w-24 h-24 object-cover rounded-lg shrink-0 shadow-sm"
                              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Image";
                              }}

                            />
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 bg-[#785ef7] text-white rounded-full p-1">
                                <MapPin className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-gray-800 truncate mb-1">
                              {hotel.HotelName}
                            </h4>
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(hotel.HotelRating || 0)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                              <span className="text-xs text-gray-500 font-medium">({hotel.HotelRating})</span>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                              {hotel.Address}
                            </p>
                            <div className="flex items-center justify-between bg-linear-to-r from-[#785ef7] to-[#644ed4] text-white px-3 py-1.5 rounded-lg">
                              <span className="text-base font-bold">
                                ₹{hotel.Rooms?.[0]?.TotalFare?.toFixed(0)}
                              </span>
                              <span className="text-xs opacity-90">/night</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full p-4">
                  <div className="text-center">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 font-medium">No hotels found</p>
                    <p className="text-xs text-gray-400 mt-1">Try adjusting your search</p>
                  </div>
                </div>
              )}
            </div>

            {/* MAP */}
            <div className="flex-1 relative">
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-purple-50 to-blue-50">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#785ef7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading map...</p>
                  </div>
                </div>
              )}
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  onLoad={(map) => {
                    mapRef.current = map;
                    setMapLoaded(true);
                  }}
                  zoom={searchFilteredHotels.length === 1 ? 15 : 12}
                  center={mapCenter}
                  options={{
                    styles: [
                      {
                        featureType: "poi",
                        elementType: "labels",
                        stylers: [{ visibility: "off" }]
                      }
                    ],
                    mapTypeControl: true,
                    streetViewControl: false,
                    fullscreenControl: true
                  }}
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
                                ? undefined
                                : window.google.maps.Animation.DROP
                            : undefined
                        }

                        icon={{
                          url: isSelected
                            ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                            : "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
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
                      <div className="w-64 max-w-sm bg-white custom-scrollbar">
                        <div className="p-2.5">
                          <div className="relative mb-2">
                            <img
                              src={selectedHotel.Image}
                              alt={selectedHotel.HotelName}
                              className="w-full h-24 object-cover rounded-lg shadow-sm"
                              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Image";
                              }}

                            />
                            <div className="absolute top-1.5 right-1.5 bg-linear-to-r from-[#785ef7] to-[#644ed4] text-white px-2 py-0.5 rounded-md text-xs font-bold shadow-md">
                              ₹{selectedHotel.Rooms?.[0]?.TotalFare?.toFixed(0)}
                            </div>
                          </div>

                          <h3 className="font-bold text-sm mb-1 text-gray-800 line-clamp-1">
                            {selectedHotel.HotelName}
                          </h3>

                          <div className="flex items-center gap-0.5 mb-2">
                            {[...Array(selectedHotel.HotelRating || 0)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="text-xs text-gray-600 ml-1">
                              ({selectedHotel.HotelRating})
                            </span>
                          </div>

                          <div className="flex items-start gap-1.5 mb-2">
                            <MapPin className="w-3.5 h-3.5 text-red-700 mt-0.5 shrink-0" />
                            <p className="text-xs text-gray-600 line-clamp-2">{selectedHotel.Address}</p>
                          </div>

                          {selectedHotel.Rooms?.[0]?.Inclusion && (
                            <div className="mb-2">
                              <span className="inline-block bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-md font-medium border border-green-200">
                                ✓ {selectedHotel.Rooms[0].Inclusion}
                              </span>
                            </div>
                          )}

                          <button
                            className="w-full bg-linear-to-r from-[#785ef7] to-[#644ed4] text-white px-3 py-2 rounded-lg text-xs font-bold hover:shadow-lg hover:scale-105 transition-all duration-200"
                            onClick={() => {
                              onSelectHotel(selectedHotel);
                              onClose();
                              setSelectedHotel(null);
                              setSearchQuery("");
                            }}
                          >
                            View Details →
                          </button>
                        </div>
                      </div>
                    </InfoWindowF>
                  )}
                </GoogleMap>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};