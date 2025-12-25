
import React from 'react';      
import {ui, icons, bookingTypes } from '@/index';

export const HotelBookingSummary: React.FC<bookingTypes.HotelBookingSummaryProps> = ({
  hotelName,
  hotelRating,
  address,
  selectedRoom,
  searchParams,
  nights,
  checkInTime = 'N/A',
  checkOutTime = 'N/A',
  onSeeInclusion,
}) => {
  
  const formatDate = (date: string) => {
    const d = new Date(date);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <icons.Star
        key={index}
        size={14}
        className={index < rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}
      />
    ));
  };

  const formatCancelPolicies = (policies: bookingTypes.CancellationPolicy[]) => {
    if (!Array.isArray(policies) || policies.length === 0) {
      return ['No cancellation policies available.'];
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return policies
      .filter((policy) => {
        const policyDate = new Date(
          policy.FromDate.split(' ')[0].split('-').reverse().join('-')
        );
        return policyDate >= today;
      })
      .map((policy) => {
        const formattedDate = policy.FromDate.split(' ')[0];
        if (policy.ChargeType === 'Fixed' && policy.CancellationCharge === 0) {
          return 'Free Cancellation till check-in';
        } else if (policy.ChargeType === 'Fixed') {
          return `Booking will be cancelled from ${formattedDate} with a charge of ₹${policy.CancellationCharge}`;
        } else if (policy.ChargeType === 'Percentage') {
          return `From ${formattedDate}, the cancellation charge is ${policy.CancellationCharge}%`;
        }
        return `Policy starts from ${formattedDate}`;
      });
  };

  const getRoomName = () => {
    const roomNames = selectedRoom.Name;
    if (!roomNames || (Array.isArray(roomNames) && roomNames.length === 0)) {
      return 'No Room Available';
    }
    if (Array.isArray(roomNames)) {
      const allSame = roomNames.every((name) => name === roomNames[0]);
      return allSame ? roomNames[0] : roomNames.join(' | ');
    }
    return roomNames;
  };

  const cancelPolicies = formatCancelPolicies(selectedRoom.CancelPolicies || []);
  const hasFreeCancellation = cancelPolicies.some(policy => 
    policy.toLowerCase().includes('free cancellation')
  );

  return (
    <ui.Card className="border-2 border-[#785ef7]/20 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 py-0">
      <ui.CardContent className="p-0">
        {/* Compact Header */}
        <div className="bg-linear-to-r from-[#785ef7] to-[#644ed4] p-4 text-white">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold mb-1 truncate">{hotelName}</h3>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center gap-0.5">
                  {renderStars(hotelRating)}
                </div>
                <span className="text-xs font-semibold bg-white/20 px-1.5 py-0.5 rounded">
                  {hotelRating}.0
                </span>
              </div>
              <div className="flex items-start gap-1.5 text-white/90">
                <icons.MapPin size={12} className="mt-0.5 shrink-0" />
                <p className="text-xs line-clamp-1">{address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Compact Check-in/Check-out & Guest Info - Flexbox Layout */}
          <div className="flex flex-col md:flex-row gap-3">
            {/* Check-in/Check-out */}
            <div className="flex-1 bg-linear-to-br from-purple-50 to-blue-50 rounded-lg p-3 border border-[#785ef7]/10">
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <icons.Calendar size={12} className="text-[#785ef7]" />
                    <span className="text-gray-600 font-semibold uppercase text-[10px]">Check In</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-0.5">{formatDate(searchParams.checkIn)}</p>
                  <p className="text-[10px] text-gray-600">{checkInTime}</p>
                </div>

                <ui.Badge className="bg-linear-to-r from-[#785ef7] to-[#644ed4] text-white border-0 px-2 py-1 text-xs">
                  <icons.Moon size={12} className="mr-1" />
                  {nights} Nights
                </ui.Badge>

                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end gap-1 mb-1">
                    <span className="text-gray-600 font-semibold uppercase text-[10px]">Check Out</span>
                    <icons.Calendar size={12} className="text-[#785ef7]" />
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-0.5">{formatDate(searchParams.checkOut)}</p>
                  <p className="text-[10px] text-gray-600">{checkOutTime}</p>
                </div>
              </div>
            </div>

            {/* Guest Info */}
            <div className="flex-1 flex items-center justify-center gap-1 flex-wrap text-xs bg-linear-to-br from-purple-50/50 to-blue-50/50 py-2 px-3 rounded-lg border border-[#785ef7]/10">
              <icons.Users size={12} className="text-[#785ef7]" />
              <span className="font-bold text-gray-900">{searchParams.Adults}</span>
              <span className="text-gray-600">Adult{searchParams.Adults > 1 ? 's' : ''}</span>
              
              {searchParams.Children > 0 && (
                <>
                  <span className="text-gray-400 mx-0.5">•</span>
                  <span className="font-bold text-gray-900">{searchParams.Children}</span>
                  <span className="text-gray-600">Child{searchParams.Children > 1 ? 'ren' : ''}</span>
                </>
              )}
              
              <span className="text-gray-400 mx-0.5">•</span>
              <span className="font-bold text-gray-900">{searchParams.Rooms}</span>
              <span className="text-gray-600">Room{searchParams.Rooms > 1 ? 's' : ''}</span>
            </div>
          </div>

          <ui.Separator className="my-2" />

          {/* Compact Room Details */}
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-bold text-gray-900 flex-1 truncate">{getRoomName()}</h4>
            <ui.Button
              variant="ghost"
              size="sm"
              className="text-[#785ef7] hover:text-[#644ed4] hover:bg-purple-50 font-semibold text-xs h-7 px-2"
              onClick={onSeeInclusion}
            >
              See Inclusion
            </ui.Button>
          </div>

          {/* Compact Amenities */}
          <div className="space-y-1.5">
            {selectedRoom.Inclusion && (
              <div className="flex items-start gap-2 text-xs text-gray-700 bg-green-50 p-2 rounded border border-green-100">
                <icons.Check size={12} className="text-green-600 mt-0.5 shrink-0" />
                <span className="line-clamp-2">{selectedRoom.Inclusion}</span>
              </div>
            )}
            <div className="flex items-start gap-2 text-xs text-gray-700 bg-blue-50 p-2 rounded border border-blue-100">
              <icons.Check size={12} className="text-blue-600 mt-0.5 shrink-0" />
              <span>
                {selectedRoom.MealType === 'Room_Only'
                  ? 'No Meals Included'
                  : selectedRoom.MealType === 'BreakFast'
                  ? 'Breakfast Included'
                  : selectedRoom.MealType}
              </span>
            </div>
          </div>

          {/* Compact Cancellation */}
          <div className="bg-linear-to-br from-red-50 to-rose-50 rounded-lg p-2.5 border border-red-100">
            <div className="flex items-center gap-2 mb-1.5">
              {hasFreeCancellation ? (
                <ui.Badge className="bg-green-600 hover:bg-green-700 text-white border-0 text-xs h-5">
                  <icons.Check size={10} className="mr-1" />
                  Free Cancellation
                </ui.Badge>
              ) : (
                <ui.Badge variant="outline" className="bg-orange-100 border-orange-200 text-orange-800 text-xs h-5">
                  Cancellation Policy
                </ui.Badge>
              )}
            </div>
            
            <div className="space-y-1">
              {cancelPolicies.slice(0, 2).map((policy, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-700">
                  <icons.Check size={10} className="text-green-600 mt-0.5 shrink-0" />
                  <span className="line-clamp-1">{policy}</span>
                </div>
              ))}
              {cancelPolicies.length > 2 && (
                <p className="text-[10px] text-gray-500 pl-4">+{cancelPolicies.length - 2} more</p>
              )}
            </div>
          </div>
        </div>
      </ui.CardContent>
    </ui.Card>
  );
};

export default HotelBookingSummary;