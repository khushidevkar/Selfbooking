
import React from 'react';
import { Room } from '../types/hotel';

interface PriceBreakdownProps {
  room: Room;
  show: boolean;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ room, show }) => {
  if (!show || !room.DayRates) return null;

  return (
    <div className="absolute left-0 mt-2 w-80 bg-white shadow-xl rounded-lg p-4 border border-gray-300 z-20 animate-fade-in">
      {room.DayRates.map((dayRateArray, index) => {
        const totalBaseFare = dayRateArray.reduce(
          (total, rate) => total + (rate?.BasePrice || 0),
          0
        );

        return (
          <div key={index}>
            <div className="flex justify-between items-center pb-2">
              <h6 className="font-semibold text-gray-700 text-xs">
                Room {index + 1} price × {dayRateArray.length} Days
              </h6>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md font-medium text-xs">
                ₹ {totalBaseFare.toFixed(2)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PriceBreakdown;
