
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ui, icons, hotelHooks, hotelDetailsTypes, components, dateFormatterUtils } from '@/index';
import { GoogleMap, Marker, InfoWindowF } from '@react-google-maps/api';
import { useMapLoader } from '@/contexts/MapContext'; // Add this
import { motion } from 'framer-motion';

const HotelDetailPage: React.FC = () => {


  const location = useLocation();
  const { hotel, taxivaxi, fromBookNow } = (location.state as hotelDetailsTypes.HotelDetailState) || {};

  useEffect(() => {
    console.log('=== HOTEL DETAIL PAGE ===');
    console.log('fromBookNow:', fromBookNow);
    console.log('hotel:', hotel);
    console.log('hotel.Rooms:', hotel?.Rooms);
    console.log('hotel.Rooms.length:', hotel?.Rooms?.length);
  }, [hotel, fromBookNow]);

  const agentPortal = sessionStorage.getItem('agent_portal');
  const bookingAccess = sessionStorage.getItem('has_search_access');

  const {
    showModal2,
    setShowModal2,
    showHeader,
    activeSection,
    showRates,
    setShowRates,
    showInfo,
    setShowInfo,
    overviewRef,
    roomsRef,
    locationRef,
    mapSectionRef,
    displayRoom,
    scrollToSection,
    scrollToMap,
    handleSelectRoom,
    handleNavigateHome,
    handleNavigateSearch,
    getMapCenter,
  } = hotelHooks.useHotelDetail({ hotel, taxivaxi, fromBookNow });

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: 'AIzaSyCnfQ-TTa0kZzAPvcgc9qyorD34aIxaZhk',
  // });

  const { isLoaded } = useMapLoader();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  if (!hotel) {
    return (
      <div className="flex items-center justify-center h-screen bg-linear-to-br from-[#785ef7]/5 to-[#644ed4]/5">
        <ui.Card className="p-8 text-center border-2 border-[#785ef7]/20">
          <icons.Building2 size={48} className="text-[#785ef7] mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No hotel data available</p>
        </ui.Card>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-linear-to-br from-[#785ef7]/5 to-[#644ed4]/5">
        <ui.Card className="p-8 text-center border-2 border-[#785ef7]/20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#785ef7] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Map...</p>
        </ui.Card>
      </div>
    );
  }

  const center = getMapCenter();
  const imageCount = hotel.Images?.length || 0;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, index) => (
      <icons.Star
        key={index}
        size={16}
        className={index < rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}
      />
    ));

  return (
    <div className="min-h-screen bg-linear-to-br from-[#785ef7]/5 to-[#644ed4]/5">
      {/* Sticky Header */}
      <components.StickyHeader
        showHeader={showHeader}
        activeSection={activeSection}
        // hasMultipleRooms={fromBookNow && hotel.Rooms.length > 1}
        hasMultipleRooms={Boolean(fromBookNow && hotel.Rooms?.length && hotel.Rooms.length > 1)}
        onNavigate={scrollToSection}
      />

      <div className="max-w-300 mx-auto px-4 py-6 space-y-6">
        {/* Breadcrumb */}
        {agentPortal !== null && String(agentPortal) === '0' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <components.BreadcrumbNav
              cityName={hotel.CityName}
              hotelName={hotel.HotelName}
              showHome={bookingAccess === '1'}
              onNavigateHome={handleNavigateHome}
              onNavigateSearch={handleNavigateSearch}
            />
          </motion.div>
        )}

        {/* Overview Section */}
        <motion.div
          ref={overviewRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ui.Card className="overflow-hidden border-2 border-[#785ef7]/20 shadow-xl py-0 gap-0">
            {/* Header Section */}
            <div className="bg-linear-to-r from-[#785ef7] to-[#644ed4] p-4 text-white">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-3">{hotel.HotelName}</h1>
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <div className="flex items-center gap-1">
                      {renderStars(hotel.HotelRating)}
                    </div>
                    <ui.Badge className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                      {hotel.HotelRating} Star Hotel
                    </ui.Badge>
                  </div>
                  <div className="flex items-start gap-2 text-white/90">
                    <icons.MapPin size={16} className="shrink-0 mt-1" />
                    <span className="text-sm">{hotel.Address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Check-in/Check-out Banner */}
            <div className="bg-[#785ef7]/10 border-b-2 border-[#785ef7]/20 px-6 py-4">
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <icons.Calendar size={18} className="text-[#785ef7]" />
                  <div>
                    <p className="text-xs text-gray-600 font-medium">Check-in</p>
                    <p className="font-semibold text-gray-900">
                      {dateFormatterUtils.formatDateTime(taxivaxi?.checkindate)}
                    </p>
                  </div>
                </div>
                <icons.ChevronRight size={20} className="text-gray-400" />
                <div className="flex items-center gap-2">
                  <icons.Calendar size={18} className="text-[#785ef7]" />
                  <div>
                    <p className="text-xs text-gray-600 font-medium">Check-out</p>
                    <p className="font-semibold text-gray-900">
                      {dateFormatterUtils.formatDateTime(taxivaxi?.checkoutdate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <ui.CardContent className="p-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Images & Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Image Gallery */}
                  {Array.isArray(hotel.Images) && hotel.Images.length > 0 ? (
                    <div className="relative group rounded-xl overflow-hidden shadow-lg">
                      <div className="relative h-96">
                        <motion.img
                          key={currentImageIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          src={hotel.Images[currentImageIndex]}
                          alt="Hotel"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />

                        {/* Navigation Arrows */}
                        {imageCount > 1 && (
                          <>
                            <ui.Button
                              size="icon"
                              onClick={handlePrevImage}
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all h-10 w-10 rounded-full"
                            >
                              <icons.ChevronLeft size={20} className="text-gray-900" />
                            </ui.Button>
                            <ui.Button
                              size="icon"
                              onClick={handleNextImage}
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all h-10 w-10 rounded-full"
                            >
                              <icons.ChevronRight size={20} className="text-gray-900" />
                            </ui.Button>
                          </>
                        )}

                        {/* Image Counter */}
                        <ui.Badge className="absolute top-4 right-4 bg-black/70 text-white border-0 hover:bg-black/80">
                          {currentImageIndex + 1} / {imageCount}
                        </ui.Badge>

                        {/* View All Photos Button */}
                        <ui.Button
                          onClick={() => setShowAllImages(true)}
                          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white hover:bg-gray-50 text-gray-900 shadow-lg"
                        >
                          <icons.ImageIcon size={16} className="mr-2" />
                          View All {imageCount} Photos
                        </ui.Button>

                        {/* Thumbnail Dots */}
                        {imageCount > 1 && imageCount <= 5 && (
                          <div className="absolute bottom-4 left-4 flex gap-2">
                            {hotel.Images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentImageIndex(idx);
                                }}
                                className={`h-2 rounded-full transition-all ${idx === currentImageIndex
                                  ? 'bg-white w-8'
                                  : 'bg-white/60 hover:bg-white/80 w-2'
                                  }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl overflow-hidden bg-linear-to-br from-[#785ef7]/10 to-[#644ed4]/10 h-96 flex items-center justify-center">
                      <div className="text-center">
                        <icons.Building2 size={64} className="text-[#785ef7]/40 mx-auto mb-4" />
                        <p className="text-gray-500">No images available</p>
                      </div>
                    </div>
                  )}

                  {/* Amenities */}
                  {hotel?.HotelFacilities && (
                    <ui.Card className="border-2 border-[#785ef7]/20 py-0">
                      <div className="p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                          <icons.Building2 size={24} className="text-[#785ef7]" />
                          Hotel Amenities
                        </h2>
                        <components.HotelAmenities
                          facilities={hotel.HotelFacilities}
                          onShowMore={() => setShowModal2(true)}
                        />
                      </div>
                    </ui.Card>
                  )}
                </div>

                {/* Right Column - Booking Card */}
                <div className="lg:col-span-1">
                  <div className="sticky top-6">
                    <ui.Card className="border-2 border-[#785ef7]/20 overflow-hidden shadow-lg py-0">
                      <div className="bg-linear-to-br from-[#785ef7]/10 to-[#644ed4]/10 p-6 border-b-2 border-[#785ef7]/20">
                        {/* Room Name */}
                        {/* <h3 className="font-bold text-lg mb-4 text-gray-900">
                          {fromBookNow
                            ? displayRoom?.Name?.length === 1
                              ? displayRoom.Name[0]
                              : displayRoom?.Name?.join(' • ') || 'Room Details'
                            : displayRoom?.Name?.length === 1
                            ? displayRoom.Name[0]
                            : displayRoom?.Name?.join(' • ') || 'Room Details'}
                        </h3> */}

                        <h3 className="font-bold text-lg mb-4 text-gray-900">
                          {(() => {
                            if (!displayRoom?.Name) return 'Room Details';

                            if (Array.isArray(displayRoom.Name)) {
                              return displayRoom.Name.length === 1
                                ? displayRoom.Name[0]
                                : displayRoom.Name.join(' • ');
                            } else {
                              return displayRoom.Name;
                            }
                          })()}
                        </h3>


                        {/* Inclusions */}
                        {displayRoom?.Inclusion && (
                          <div className="space-y-2 mb-4">
                            {displayRoom.Inclusion.split(',').map((item, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm">
                                <icons.Check size={16} className="text-green-600 shrink-0 mt-0.5" />
                                <span className="text-gray-700">{item.trim()}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Meal Type */}
                        <ui.Badge className="bg-[#785ef7]/20 text-[#785ef7] border-[#785ef7]/30 hover:bg-[#785ef7]/30 mb-4">
                          <icons.Coffee size={14} className="mr-1" />
                          {displayRoom?.MealType === 'Room_Only'
                            ? 'No Meals Included'
                            : displayRoom?.MealType === 'BreakFast'
                              ? 'Breakfast Included'
                              : displayRoom?.MealType}
                        </ui.Badge>

                        <ui.Separator className="my-4" />

                        {/* Cancellation Policy */}
                        <components.CancellationPolicyDisplay
                          policies={displayRoom?.CancelPolicies || []}
                          mealType={displayRoom?.MealType}
                          isRefundable={displayRoom?.IsRefundable}
                        />
                      </div>

                      {/* Price Section */}
                      <div className="p-6">
                        <div
                          className="relative mb-6 text-center"
                          onMouseEnter={() => setShowRates(true)}
                          onMouseLeave={() => setShowRates(false)}
                        >
                          <p className="text-sm text-gray-600 mb-2 font-medium">Total Price</p>
                          <div className="text-3xl font-bold bg-linear-to-r from-[#785ef7] to-[#644ed4] bg-clip-text text-transparent mb-2">
                            ₹{displayRoom?.TotalFare?.toLocaleString('en-IN')}
                          </div>
                          <p className="text-sm text-gray-500">
                            + ₹{displayRoom?.TotalTax?.toLocaleString('en-IN')} taxes & fees
                          </p>

                          {/* Price Breakdown */}
                          <components.PriceBreakdown room={displayRoom!} show={showRates} />
                        </div>

                        <ui.Button
                          className="w-full bg-linear-to-r from-[#785ef7] to-[#644ed4] hover:from-[#644ed4] hover:to-[#785ef7] text-white shadow-lg hover:shadow-xl transition-all text-lg py-6"
                          onClick={() => displayRoom && handleSelectRoom(displayRoom)}
                        >
                          Book Now
                        </ui.Button>

                        <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1">
                          <icons.Info size={12} />
                          You won't be charged yet
                        </p>
                      </div>
                    </ui.Card>
                  </div>
                </div>
              </div>
            </ui.CardContent>
          </ui.Card>
        </motion.div>

        {/* Rooms Section */}
        {fromBookNow && hotel?.Rooms && hotel.Rooms.length > 0 && (
          <motion.section
            ref={roomsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ui.Card className="border-2 border-[#785ef7]/20 overflow-hidden shadow-xl py-0">
              <div className="bg-linear-to-r from-[#785ef7] to-[#644ed4] px-6 py-4">
                <h2 className="text-xl font-bold text-white">Available Rooms</h2>
                <p className="text-sm text-white/80 mt-1">
                  {hotel.Rooms.length} room options for your stay
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {hotel.Rooms.map((room, index) => (
                  <components.RoomCard
                    key={index}
                    room={room}
                    hotel={hotel}
                    index={index}
                    onSelectRoom={handleSelectRoom}
                    onShowDetails={() => setShowModal2(true)}
                  />
                ))}
              </div>
            </ui.Card>
          </motion.section>
        )}

        {/* Map Section */}
        <motion.div
          ref={mapSectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ui.Card className="border-2 border-[#785ef7]/20 overflow-hidden shadow-xl py-0">
            <div className="bg-linear-to-r from-[#785ef7]/10 to-[#644ed4]/10 px-6 py-4 border-b-2 border-[#785ef7]/20 flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <icons.MapPin size={24} className="text-[#785ef7]" />
                Hotel Location
              </h2>
              <ui.Button
                variant="ghost"
                size="sm"
                onClick={scrollToMap}
                className="text-[#785ef7] hover:text-[#644ed4] hover:bg-[#785ef7]/10"
              >
                Scroll to Map
              </ui.Button>
            </div>

            <div className="w-full h-100 ">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={center}
                zoom={14}
                onClick={() => setShowInfo(false)}
              >
                <Marker
                  position={center}
                  animation={window.google.maps.Animation.DROP}
                  onClick={() => setShowInfo(true)}
                />

                {showInfo && (
                  <InfoWindowF position={center}>
                    <div className="w-67.5 p-2 flex gap-2 items-start bg-white">
                      <img
                        src={hotel.Image}
                        alt="hotel"
                        className="w-20 h-20 rounded-md object-cover shadow-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://via.placeholder.com/150x100?text=No+Image';
                        }}
                      />
                      <div className="flex flex-col w-full">
                        <h2 className="font-semibold text-sm text-gray-800 leading-tight">
                          {hotel.HotelName}
                        </h2>
                        <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">
                          {hotel.Address}
                        </p>
                        <div className="flex justify-end mt-1">
                          <span className="text-xs bg-linear-to-r from-[#785ef7] to-[#644ed4] text-white px-2 py-1 rounded-md">
                            ₹{hotel.Rooms?.[0]?.TotalFare?.toFixed(0) || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </InfoWindowF>
                )}
              </GoogleMap>
            </div>
          </ui.Card>
        </motion.div>
      </div>

      {/* Image Gallery Modal */}
      {showAllImages && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAllImages(false)}
        >
          <ui.Button
            size="icon"
            onClick={() => setShowAllImages(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white h-12 w-12 rounded-full"
          >
            <icons.ChevronLeft size={24} className="rotate-180" />
          </ui.Button>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl max-h-[90vh] overflow-auto p-4 custom-scrollbar">
            {Array.isArray(hotel.Images) && hotel.Images.length > 0 ? (
              hotel.Images.map((img, idx) => (
                <motion.img
                  key={idx}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  src={img}
                  alt={`Hotel ${idx + 1}`}
                  className="rounded-lg w-full h-64 object-cover hover:scale-105 transition-transform cursor-pointer shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No images available
              </div>
            )}
          </div>

        </motion.div>
      )}
    </div>
  );
};

export default HotelDetailPage;