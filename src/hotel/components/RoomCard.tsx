// src/hotel/components/RoomCard.tsx
import React from 'react';
import { BedDouble } from 'lucide-react';
import { RoomCardProps } from '../types/hotelDetail.types';

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  hotel,
  index,
  onSelectRoom,
  onShowDetails,
}) => {

  const facilities = hotel.HotelFacilities ?? [];

  return (
    <div className="p-6 border-b last:border-b-0 border-gray-100 hover:bg-purple-50/30 transition-all duration-200">
      {/* Large Screen: Horizontal Layout */}
      <div className="hidden lg:flex justify-between items-start gap-6">
        {/* Left Section - Room Details */}
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-4">
            {/* Icon Badge */}
            <div className="w-10 h-10 bg-linear-to-br from-[#785ef7] to-[#5a3ec8] rounded-xl flex items-center justify-center shrink-0 shadow-md">
              <BedDouble className="w-5 h-5 text-white" />
            </div>

            {/* Room Name & Meal Type */}
            <div className="flex-1">
              <h5 className="text-[#3b3f5c] text-lg font-bold mb-1 leading-tight">
                {room?.Name?.[0] || 'No Room Info Available'}
              </h5>

              <div className="flex gap-2">
                <div className="text-gray-700">Meal: </div>
                {room?.MealType && (
                  <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    </svg>
                    {room.MealType}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Facilities Grid */}
          {facilities.length > 0 && (
            <div className="mb-3">
              <div className="grid grid-cols-2 gap-2">
                {facilities.slice(0, 6).map((facility, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <div className="w-1.5 h-1.5 bg-[#785ef7] rounded-full"></div>
                    {facility}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* More Details & Inclusion */}
          <div className="space-y-2 mt-4">
            <button
              className="text-[#785ef7] hover:text-[#5a3ec8] text-sm font-semibold flex items-center gap-1 transition-colors"
              onClick={onShowDetails}
            >
              View Full Details
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {room?.Inclusion && (
              <div className="flex items-start gap-2 text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
                <svg
                  className="w-4 h-4 text-green-600 mt-0.5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{room.Inclusion}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Price & Button */}
        <div className="text-right flex flex-col justify-between min-w-55 bg-gray-50 rounded-xl p-5 border border-gray-200">
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-semibold">
              Total Price
            </p>
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-lg text-gray-600">₹</span>
              <h5 className="text-xl font-bold text-[#785ef7]">
                {room.TotalFare.toLocaleString('en-IN')}
              </h5>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              + ₹{room.TotalTax} taxes & fees
            </p>
          </div>

          <button
            className="bg-linear-to-r from-[#785ef7] to-[#5a3ec8] hover:from-[#5a3ec8] hover:to-[#4a2eb8] text-white px-6 py-2 rounded-lg font-bold text-sm transition-all duration-300 w-full shadow-md hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
            onClick={() => onSelectRoom(room)}
          >
            SELECT ROOM
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Medium & Small Screen: Vertical Layout */}
      <div className="lg:hidden">
        {/* Room Header with Icon */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 bg-linear-to-br from-[#785ef7] to-[#5a3ec8] rounded-xl flex items-center justify-center shrink-0 shadow-md">
            <BedDouble className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-[#3b3f5c] text-base md:text-lg font-bold mb-2 leading-tight">
              {room?.Name?.[0] || 'No Room Info Available'}
            </h5>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs md:text-sm text-gray-600">Meal:</span>
              {room?.MealType && (
                <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium">
                  <svg
                    className="w-3 h-3 md:w-3.5 md:h-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  </svg>
                  {room.MealType}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Facilities */}
        {facilities.length > 0 && (
          <div className="mb-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {facilities.slice(0, 6).map((facility, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs md:text-sm text-gray-700"
                >
                  <div className="w-1.5 h-1.5 bg-[#785ef7] rounded-full shrink-0"></div>
                  {facility}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View Details */}
        <button
          className="text-[#785ef7] hover:text-[#5a3ec8] text-xs md:text-sm font-semibold flex items-center gap-1 transition-colors mb-3"
          onClick={onShowDetails}
        >
          View Full Details
          <svg
            className="w-3 h-3 md:w-4 md:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Inclusion */}
        {room?.Inclusion && (
          <div className="flex items-start gap-2 text-xs md:text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg mb-4">
            <svg
              className="w-4 h-4 text-green-600 mt-0.5 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{room.Inclusion}</span>
          </div>
        )}

        {/* Price & Button - Side by Side on Mobile */}
        <div className="flex items-center justify-between gap-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-semibold">
              Total Price
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-base text-gray-600">₹</span>
              <h5 className="text-lg md:text-xl font-bold text-[#785ef7]">
                {room.TotalFare.toLocaleString('en-IN')}
              </h5>
            </div>
            <p className="text-xs text-gray-500">+ ₹{room.TotalTax} taxes</p>
          </div>

          <button
            className="bg-linear-to-r from-[#785ef7] to-[#5a3ec8] hover:from-[#5a3ec8] hover:to-[#4a2eb8] text-white px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-bold text-xs md:text-sm transition-all duration-300 shadow-md hover:shadow-xl whitespace-nowrap"
            onClick={() => onSelectRoom(room)}
          >
            SELECT
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;