
import { useState } from 'react';
import { hotelTypes, ui, icons } from '@/index';
import { motion } from 'framer-motion';
interface HotelCardProps {
  hotel: hotelTypes.Hotel;
  booknow: string;
  agent_portal: string;
  onViewPrice: (hotel: hotelTypes.Hotel) => void;
  onBookNow: (hotel: hotelTypes.Hotel) => void;
  onViewImages: (images: string[]) => void;
  extractAttraction: (description: string) => string;
  formatCancelPolicies: (
    policies: hotelTypes.CancellationPolicy[]
  ) => string[];
}

export const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  booknow,
  agent_portal,
  onViewPrice,
  onBookNow,
  onViewImages,
  extractAttraction,
  formatCancelPolicies
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const rooms = hotel.Rooms ?? [];
  const imageCount = hotel.Images?.length || 0;

  const lowestFareRoom = rooms.reduce(
    (min, room) => (room.TotalFare < min.TotalFare ? room : min),
    rooms[0]
  );

  // Calculate number of nights from DayRates
  const numberOfNights = lowestFareRoom?.DayRates?.[0]?.length ?? 1;

  const totalFare = lowestFareRoom?.TotalFare ?? 0;
  const totalTax = lowestFareRoom?.TotalTax ?? 0;
  const totalPrice = totalFare + totalTax;

  // Calculate per night prices
  const perNightFare = totalFare / numberOfNights;

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, index) => (
      <icons.Star
        key={index}
        size={14}
        className={
          index < rating
            ? 'fill-yellow-400 stroke-yellow-400'
            : 'stroke-gray-300'
        }
      />
    ));

  // Facility icon mapping
  const facilityIcons: Record<string, { icon: React.ReactNode; label: string }> = {
    wifi: { icon: <icons.Wifi size={16} />, label: 'Free WiFi' },
    parking: { icon: <icons.Car size={16} />, label: 'Parking' },
    restaurant: { icon: <icons.Utensils size={16} />, label: 'Restaurant' },
    breakfast: { icon: <icons.Coffee size={16} />, label: 'Breakfast' },
    gym: { icon: <icons.Dumbbell size={16} />, label: 'Gym' },
    conference: { icon: <icons.Building2 size={16} />, label: 'Conference' },
  };

  const getAvailableFacilities = () => {
    const facilities: { icon: React.ReactNode; label: string }[] = [];
    const facilityList = hotel.HotelFacilities?.map(f => f.toLowerCase()) || [];

    Object.entries(facilityIcons).forEach(([key, value]) => {
      if (facilityList.some(f => f.includes(key))) {
        facilities.push(value);
      }
    });

    return facilities.slice(0, 4);
  };

  const cancellationPolicies = formatCancelPolicies(lowestFareRoom?.CancelPolicies ?? []);
  const isCancellable = cancellationPolicies.length > 0;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="w-full mb-4"
    >
      <ui.Card className="overflow-hidden py-0 border-2 border-[#785ef7]/20 hover:shadow-xl transition-all duration-300 bg-white">
        <ui.CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">

            {/* Image Section with Carousel */}
            <div className="lg:w-80 relative group shrink-0">
              <div className="relative h-64 lg:h-80">
                {hotel.Images?.length ? (
                  <>
                    {/* Main Carousel Image */}
                    <img
                      src={hotel.Images[currentImageIndex]}
                      alt={hotel.HotelName}
                      className="w-full h-full object-cover transition-opacity duration-300"
                      loading="lazy"
                    />

                    {/* Rating Badge - Top Left */}
                    <ui.Badge className="absolute top-3 left-3 bg-linear-to-r from-[#785ef7] to-[#644ed4] text-white hover:from-[#644ed4] hover:to-[#785ef7] shadow-lg border-0 rounded-md">
                      <span className="font-bold">{hotel.HotelRating}.0</span>
                      <icons.Star size={12} className="fill-white ml-1" />
                    </ui.Badge>

                    {/* Image Counter - Top Right */}
                    <ui.Badge variant="secondary" className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white hover:bg-black/80 border-0">
                      {currentImageIndex + 1}/{imageCount}
                    </ui.Badge>

                    {/* Navigation Arrows */}
                    {imageCount > 1 && (
                      <>
                        <ui.Button
                          size="icon"
                          variant="secondary"
                          onClick={handlePrevImage}
                          className="absolute bg-white left-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all h-9 w-9 cursor-pointer"
                        >
                          <icons.ChevronLeft className="h-4 w-4" />
                        </ui.Button>
                        <ui.Button
                          size="icon"
                          variant="secondary"
                          onClick={handleNextImage}
                          className="absolute bg-white right-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all h-9 w-9 cursor-pointer"
                        >
                          <icons.ChevronRight className="h-4 w-4" />
                        </ui.Button>
                      </>
                    )}

                    {/* View All Photos Button */}
                    <ui.Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (hotel.Images && hotel.Images.length > 0) {
                          onViewImages(hotel.Images);
                        }
                      }}

                      className="absolute text-center bg-white bottom-3 left-1/2 transform -translate-x-1/2 shadow-lg hover:scale-105 transition-all cursor-pointer"
                    >
                      <icons.ImageIcon className="h-4 w-4 mr-1 text-[#785ef7]" />
                      View All {imageCount} Photos
                    </ui.Button>

                    {/* Thumbnail Dots Indicator */}
                    {imageCount > 1 && imageCount <= 5 && (
                      <div className="absolute bottom-3 left-3 flex gap-1.5">
                        {hotel.Images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(idx);
                            }}
                            className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex
                                ? 'bg-white w-6'
                                : 'bg-white/60 hover:bg-white/80 w-1.5'
                              }`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-[#785ef7]/10 to-[#644ed4]/10 flex items-center justify-center">
                    <icons.Building2 size={48} className="text-[#785ef7]/40" />
                  </div>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col lg:flex-row">

              {/* Hotel Details */}
              <div className="flex-1 p-5 lg:p-6">

                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 hover:text-[#785ef7] cursor-pointer transition-colors">
                        {hotel.HotelName}
                      </h3>
                      <div className="flex items-center gap-1">
                        {renderStars(hotel.HotelRating)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <icons.MapPin size={14} className="text-red-600" />
                      <span className="font-medium">{hotel.CityName}</span>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                {getAvailableFacilities().length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {getAvailableFacilities().map((facility, i) => (
                      <ui.Badge
                        key={i}
                        variant="outline"
                        className="bg-[#785ef7]/5 border-[#785ef7]/20 hover:bg-[#785ef7]/10 text-gray-700"
                      >
                        <span className="text-[#785ef7] mr-1.5">{facility.icon}</span>
                        {facility.label}
                      </ui.Badge>
                    ))}
                  </div>
                )}

                {/* Inclusions */}
                {lowestFareRoom?.Inclusion && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {lowestFareRoom.Inclusion.split(',').slice(0, 4).map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-sm text-gray-700">
                          <icons.Check size={14} className="text-green-600 shrink-0" />
                          <span>{item.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Divider */}
                <ui.Separator className="my-4" />

                {/* Cancellation Policy */}
                <div className="flex items-start gap-2">
                  {isCancellable ? (
                    <ui.Badge variant="outline" className="bg-green-600 text-white border-green-200 hover:bg-green-700 rounded-lg py-1 px-3">
                      <icons.Check size={16} className="mr-2" />
                      Free Cancellation Available
                    </ui.Badge>
                  ) : (
                    <ui.Badge variant="outline" className="bg-red-600 text-white border-red-200 hover:bg-red-700 rounded-lg py-1 px-3">
                      <icons.Info size={16} className="mr-2" />
                      Non-Refundable
                    </ui.Badge>
                  )}
                </div>
              </div>

              {/* Price Section */}
              <div className="lg:w-56 bg-linear-to-br from-[#785ef7]/5 to-[#644ed4]/5 p-5 lg:p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l-2 border-[#785ef7]/20 shrink-0">

                {/* Price */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-right mb-6">
                    <p className="text-xs text-gray-600 mb-2 font-medium">Per Night Price</p>
                    <div className="flex items-baseline justify-end gap-2 mb-2">
                      <span className="text-2xl font-bold bg-linear-to-r from-[#785ef7] to-[#644ed4] bg-clip-text text-transparent">
                        ₹{Math.round(perNightFare).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Excluding taxes & fees
                    </p>

                    {/* Total Price Badge */}
                    <ui.Badge
                      variant="outline"
                      className="mt-3 bg-[#785ef7]/10 border-[#785ef7]/20 px-3 py-2 h-auto rounded-xl"
                    >
                      <div className="flex flex-col items-end">
                        <p className="text-xs font-semibold text-gray-700">
                          Total ({numberOfNights} {numberOfNights > 1 ? 'nights' : 'night'}): <span className="text-[#785ef7] text-base">₹{Math.round(totalPrice).toLocaleString('en-IN')}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          ₹{Math.round(totalFare).toLocaleString('en-IN')} + ₹{Math.round(totalTax).toLocaleString('en-IN')} tax
                        </p>
                      </div>
                    </ui.Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {booknow === '0' && (
                    <ui.Button
                      onClick={() => onViewPrice(hotel)}
                      variant="outline"
                      className="w-full border-2 border-[#785ef7] text-[#785ef7] hover:bg-[#785ef7] hover:text-white font-semibold cursor-pointer"
                    >
                      View All Rooms
                      <icons.ChevronRight className="ml-2 h-4 w-4" />
                    </ui.Button>
                  )}

                  {agent_portal === '0' && booknow === '1' && (
                    <ui.Button
                      onClick={() => onBookNow(hotel)}
                      className="w-full bg-linear-to-r from-[#785ef7] to-[#644ed4] hover:from-[#644ed4] hover:to-[#785ef7] text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      Book Now
                      <icons.ChevronRight className="ml-2 h-4 w-4" />
                    </ui.Button>
                  )}

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                    <icons.Building2 size={14} className="text-[#785ef7]" />
                    <span className="font-medium text-gray-700">{rooms.length} room option{rooms.length > 1 ? 's' : ''} available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ui.CardContent>
      </ui.Card>
    </motion.div>
  );
};