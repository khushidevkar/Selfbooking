
import React, { useState } from 'react';
import {ui,icons, bookingTypes } from '@/index';

export const BookingConfirmationCard: React.FC<bookingTypes.BookingConfirmationCardProps> = ({
  bookingDetails,
  hotelImages = [],
  hotelMap,
  onViewMap,
  className = '',
}) => {
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(0);

  const formatDate = (date: string) => {
    const d = new Date(date);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <icons.Star
        key={index}
        size={16}
        className={index < rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}
      />
    ));
  };

  const parseCancellationPolicy = (policy: string) => {
    if (!policy) return [];
    return policy
      .split('#^#')[1]
      ?.split('|')
      .filter((line) => line && !line.includes('#!#'))
      .map((line) => line.trim()) || [];
  };

  const nights = calculateNights(bookingDetails.CheckInDate, bookingDetails.CheckOutDate);
  const selectedRoom = bookingDetails.Rooms[selectedRoomIndex];

  return (
    <>
      <ui.Card className={`border-gray-200 shadow-lg overflow-hidden ${className}`}>
        <ui.CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Section - Hotel Details */}
            <div className="flex-1 space-y-4">
              {/* Hotel Name & Address */}
              <div>
                <h5 className="text-xl font-semibold text-gray-900 mb-2">
                  {bookingDetails.HotelName}
                </h5>
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(bookingDetails.StarRating)}
                </div>
                <div className="flex items-start gap-2 text-gray-600">
                  <icons.MapPin size={16} className="mt-1 shrink-0" />
                  <p className="text-sm">
                    {bookingDetails.AddressLine1} {bookingDetails.AddressLine2}
                  </p>
                </div>
              </div>

              {/* Check-in/Check-out */}
              <ui.Card className="border-gray-200 bg-linear-to-br from-purple-50 to-blue-50">
                <ui.CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-center flex-1">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <icons.Calendar size={14} className="text-[#785ef7]" />
                        <h6 className="text-xs font-semibold text-gray-600 uppercase">
                          Check In
                        </h6>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 block">
                        {formatDate(bookingDetails.CheckInDate)}
                      </span>
                    </div>

                    <ui.Badge className="bg-[#785ef7] hover:bg-[#644ed4] text-white border-0 px-4 py-1">
                      {nights} {nights === 1 ? 'Night' : 'Nights'}
                    </ui.Badge>

                    <div className="text-center flex-1">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <icons.Calendar size={14} className="text-[#785ef7]" />
                        <h6 className="text-xs font-semibold text-gray-600 uppercase">
                          Check Out
                        </h6>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 block">
                        {formatDate(bookingDetails.CheckOutDate)}
                      </span>
                    </div>
                  </div>
                </ui.CardContent>
              </ui.Card>

              {/* Room Information */}
              {bookingDetails.Rooms.map((room, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h6 className="text-sm font-semibold text-gray-900">
                      {room.RoomTypeName || 'No Room Name Available'}
                    </h6>

                    {room.Amenities && room.Amenities.length > 0 ? (
                      <ui.Button
                        variant="ghost"
                        size="sm"
                        className="text-[#785ef7] hover:text-[#644ed4] hover:bg-purple-50 h-auto py-1 px-2"
                        onClick={() => {
                          setSelectedRoomIndex(index);
                          setShowAmenitiesModal(true);
                        }}
                      >
                        See Amenities
                      </ui.Button>
                    ) : (
                      <span className="text-xs text-gray-500">No amenities available</span>
                    )}
                  </div>

                  {/* Cancellation Policy */}
                  {room.CancellationPolicy ? (
                    <ui.Button
                      variant="ghost"
                      size="sm"
                      className="text-[#785ef7] hover:text-[#644ed4] hover:bg-purple-50 h-auto py-1 px-0 text-xs"
                      onClick={() => {
                        setSelectedRoomIndex(index);
                        setShowCancellationModal(true);
                      }}
                    >
                      View Cancellation Policy
                    </ui.Button>
                  ) : (
                    <p className="text-xs text-gray-500">Cancellation Policy Not Available</p>
                  )}
                </div>
              ))}
            </div>

            {/* Right Section - Image & Map */}
            <div className="lg:max-w-[18rem] space-y-3">
              {/* Hotel Image */}
              {hotelImages[0] && (
                <div className="relative overflow-hidden rounded-lg shadow-md group">
                  <img
                    src={hotelImages[0]}
                    alt="Hotel"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Map Preview */}
              {hotelMap && (
                <ui.Card className="border-gray-200 overflow-hidden">
                  <ui.CardContent className="p-0">
                    <ui.Button
                      onClick={onViewMap}
                      className="relative w-full h-32 bg-gray-100 hover:bg-gray-200 transition-colors group"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <icons.MapPin size={32} className="text-[#785ef7]" />
                      </div>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-md shadow-md">
                        <span className="text-xs font-semibold text-gray-900">
                          View on Map
                        </span>
                      </div>
                    </ui.Button>
                  </ui.CardContent>
                </ui.Card>
              )}
            </div>
          </div>
        </ui.CardContent>
      </ui.Card>

      {/* Amenities Modal */}
      <ui.Dialog open={showAmenitiesModal} onOpenChange={setShowAmenitiesModal}>
        <ui.DialogContent className="max-w-md">
          <ui.DialogHeader>
            <ui.DialogTitle className="flex items-center gap-2">
              <icons.Info className="w-5 h-5 text-[#785ef7]" />
              Room Amenities
            </ui.DialogTitle>
          </ui.DialogHeader>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {selectedRoom?.Amenities?.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg"
              >
                <div className="w-1.5 h-1.5 bg-[#785ef7] rounded-full shrink-0" />
                {amenity}
              </div>
            ))}
          </div>
        </ui.DialogContent>
      </ui.Dialog>

      {/* Cancellation Policy Modal */}
      <ui.Dialog open={showCancellationModal} onOpenChange={setShowCancellationModal}>
        <ui.DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <ui.DialogHeader>
            <ui.DialogTitle className="flex items-center gap-2">
              <icons.Info className="w-5 h-5 text-[#785ef7]" />
              Cancellation Policy
            </ui.DialogTitle>
          </ui.DialogHeader>
          <div className="space-y-3 mt-4">
            {parseCancellationPolicy(selectedRoom?.CancellationPolicy || '').map((line, idx) => (
              <div
                key={idx}
                className="flex gap-3 items-start p-3 rounded-lg bg-linear-to-r from-green-50 to-emerald-50 border border-green-200"
              >
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">{line}</span>
              </div>
            ))}
          </div>
        </ui.DialogContent>
      </ui.Dialog>
    </>
  );
};

export default BookingConfirmationCard;