
import React from 'react';
import { motion } from 'framer-motion';
import { icons, hotelTypes, dateFormatterUtils } from '@/index';

interface RoomPriceModalProps {
  isOpen: boolean;
  hotel: hotelTypes.HotelSearchItem;
  selectedRooms: hotelTypes.SelectedRoom[];
  onClose: () => void;
  onAddRoom: (room: hotelTypes.SelectedRoom) => void;
  onRemoveRoom: (bookingCode: string) => void;
  onShare: () => void;
}

export const RoomPriceModal: React.FC<RoomPriceModalProps> = ({
  isOpen,
  hotel,
  selectedRooms,
  onClose,
  onAddRoom,
  onRemoveRoom,
  onShare
}) => {
  const [expandedRows, setExpandedRows] = React.useState<Record<string, boolean>>({});
  const [expandedPolicies, setExpandedPolicies] = React.useState<Record<string, boolean>>({});
  const [isClosing, setIsClosing] = React.useState(false);

  const toggleRowExpansion = React.useCallback((bookingCode: string) => {
    setExpandedRows(prev => ({ ...prev, [bookingCode]: !prev[bookingCode] }));
  }, []);

  const togglePolicyExpansion = React.useCallback((bookingCode: string) => {
    setExpandedPolicies(prev => ({ ...prev, [bookingCode]: !prev[bookingCode] }));
  }, []);

  const handleClose = React.useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 150);
  }, [onClose]);

  // const getFirstDayBasePrice = React.useMemo(() => (room: hotelTypes.Room) => {
  //   if (room.DayRates && room.DayRates.length > 0) {
  //     const firstDay = room.DayRates[0];
  //     if (Array.isArray(firstDay) && firstDay.length > 0) {
  //       return firstDay[0].BasePrice || 0;
  //     }
  //   }
  //   return 0;
  // }, []);


  const getFirstDayBasePrice = React.useCallback((room: hotelTypes.Room): number => {
    if (room.DayRates?.length) {
      const firstDay = room.DayRates[0];
      if (firstDay?.length) {
        return firstDay[0].BasePrice ?? 0;
      }
    }
    return 0;
  }, []);


  // const getFlattenedDayRates = React.useMemo(() => (room: hotelTypes.Room): hotelTypes.DayRate => {
  //   if (!room.DayRates) return [];
  //   return room.DayRates.map((dayArray: any) =>
  //     Array.isArray(dayArray) && dayArray.length > 0 ? dayArray[0] : dayArray
  //   );
  // }, []);

  const getFlattenedDayRates = React.useCallback(
    (room: hotelTypes.Room): hotelTypes.DayRate[] => {
      if (!room.DayRates) return [];

      return room.DayRates
        .map(dayRates => dayRates[0])
        .filter(
          (rate): rate is hotelTypes.DayRate =>
            rate !== undefined
        );
    },
    []
  );

  const selectedRoomsTotal = React.useMemo(
    () => selectedRooms.reduce((sum, r) => sum + r.TotalFare, 0),
    [selectedRooms]
  );

  const rooms = hotel.Rooms ?? [];

  if (!isOpen || !hotel) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isClosing ? 0 : 1 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 bg-black/60 z-999 flex justify-center items-center pt-2 pb-2 overflow-auto"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: isClosing ? 0.95 : 1, opacity: isClosing ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="bg-white w-full max-w-350 max-h-fit h-fit rounded-2xl shadow-2xl overflow-hidden relative mx-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="sticky top-0 z-10 bg-[#785ef7] text-white px-4 py-2">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold mb-1">{hotel.HotelName}</h2>
              <p className="text-violet-100 text-sm mb-0">
                {hotel.CityName} • {rooms.length} rooms available
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <icons.X size={20} />
            </button>
          </div>

          {selectedRooms.length > 0 && (
            <div className="mt-1 flex items-center gap-1">
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full font-medium text-xs">
                {selectedRooms.length} room{selectedRooms.length > 1 ? 's' : ''} selected
              </span>
            </div>
          )}
        </div>

        {/* TABLE */}
        <div className="flex-1 overflow-hidden p-3">
          <div className="max-h-fit h-[70vh] overflow-x-auto overflow-y-auto rounded-xl border-2 border-gray-300 shadow-lg custom-scrollbar">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-linear-to-r from-gray-50 to-gray-100 z-10">
                <tr>
                  <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-700 border-r-2 border-gray-300 whitespace-nowrap">
                    Room Details
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-700 border-r-2 border-gray-300 whitespace-nowrap">
                    Meal Plan
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-700 border-r-2 border-gray-300 whitespace-nowrap">
                    Inclusions
                  </th>
                  <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 border-r-2 border-gray-300 whitespace-nowrap">
                    Base Price
                  </th>
                  <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 border-r-2 border-gray-300 whitespace-nowrap">
                    Tax
                  </th>
                  <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 border-r-2 border-gray-300 whitespace-nowrap">
                    Total Price
                  </th>
                  <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 border-r-2 border-gray-300 whitespace-nowrap">
                    Day Rates
                  </th>
                  <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 border-r-2 border-gray-300 whitespace-nowrap">
                    Cancellation
                  </th>
                  <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room: hotelTypes.Room, index: number) => {
                  const dayRates = getFlattenedDayRates(room);
                  const cancelPolicies = room.CancelPolicies || [];
                  const isAdded = selectedRooms.some((r) => r.BookingCode === room.BookingCode);
                  const isExpanded = expandedRows[room.BookingCode];
                  const isPolicyExpanded = expandedPolicies[room.BookingCode];
                  const firstDayBasePrice = getFirstDayBasePrice(room);

                  return (
                    <React.Fragment key={room.BookingCode || index}>
                      <tr
                        className={`border-t-2 border-gray-300 hover:bg-gray-50 transition-colors ${isAdded ? 'bg-green-50/50' : 'bg-white'
                          }`}
                      >
                        {/* Room Details */}
                        <td className="px-3 py-2.5 border-r-2 border-gray-300">
                          <div className="flex items-start gap-2">
                            {isAdded && (
                              <div className="shrink-0 mt-0.5">
                                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                                  <icons.Check size={10} className="text-white" />
                                </div>
                              </div>
                            )}
                            <div>
                              <h3 className="font-semibold text-gray-900 text-xs mb-0.5">
                                {room.Name?.[0] || "N/A"}
                              </h3>
                              <p className="text-[10px] text-gray-500">{room.RoomType}</p>
                            </div>
                          </div>
                        </td>

                        {/* Meal Plan */}
                        <td className="px-3 py-2.5 border-r-2 border-gray-300">
                          <div className="flex items-center gap-1.5">
                            <icons.UtensilsCrossed size={12} className="text-violet-600 shrink-0" />
                            <span className="text-xs text-gray-700">
                              {(room.MealType || 'N/A').replace(/_/g, ' ')}
                            </span>
                          </div>
                        </td>

                        {/* Inclusions */}
                        <td className="px-3 py-2.5 border-r-2 border-gray-300">
                          {room.Inclusion && room.Inclusion.length > 50 ? (
                            <details className="cursor-pointer group">
                              <summary className="text-xs text-violet-600 hover:text-violet-700 font-bold list-none flex items-center gap-1">
                                View details
                                <icons.ChevronDown size={12} className="transition-transform group-open:rotate-180" />
                              </summary>
                              <p className="text-[12px] text-gray-600 mt-1.5 leading-relaxed">{room.Inclusion}</p>
                            </details>
                          ) : (
                            <p className="text-xs text-gray-600">{room.Inclusion || 'Standard amenities'}</p>
                          )}
                        </td>

                        {/* Base Price */}
                        <td className="px-3 py-2.5 border-r-2 border-gray-300 text-center">
                          <div className="flex items-center justify-center gap-0.5">
                            <icons.IndianRupee size={12} className="text-gray-600" />
                            <span className="text-xs font-semibold text-gray-900">
                              {firstDayBasePrice.toFixed(2)}
                            </span>
                          </div>
                        </td>

                        {/* Tax */}
                        <td className="px-3 py-2.5 border-r-2 border-gray-300 text-center">
                          <div className="flex items-center justify-center gap-0.5">
                            <icons.IndianRupee size={12} className="text-orange-600" />
                            <span className="text-xs font-semibold text-orange-700">
                              {(room.TotalTax || 0).toFixed(2)}
                            </span>
                          </div>
                        </td>

                        {/* Total Price */}
                        <td className="px-3 py-2.5 border-r-2 border-gray-300 text-center bg-violet-50/50">
                          <div className="flex items-center justify-center gap-0.5">
                            <icons.IndianRupee size={14} className="text-violet-700" />
                            <span className="text-sm font-bold text-violet-900">
                              {room.TotalFare.toFixed(2)}
                            </span>
                          </div>
                        </td>

                        {/* Day Rates */}
                        <td className="px-3 py-2.5 border-r-2 border-gray-300 text-center">
                          {dayRates.length > 0 ? (
                            <button
                              onClick={() => toggleRowExpansion(room.BookingCode)}
                              className="inline-flex items-center gap-1 text-xs text-[#785ef7] hover:text-[#5a3ec8] font-medium hover:bg-violet-50 px-2 py-1 rounded-md transition-colors"
                            >
                              <icons.Calendar size={12} />
                              Daywise Price
                              <icons.ChevronDown
                                size={12}
                                className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''
                                  }`}
                              />
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </td>

                        {/* Cancellation */}
                        <td className="px-3 py-2.5 border-r-2 border-gray-300 text-center">
                          {cancelPolicies.length > 0 ? (
                            <button
                              onClick={() => togglePolicyExpansion(room.BookingCode)}
                              className="inline-flex items-center gap-1 text-[12px] font-bold text-red-600 bg-red-50 px-4 py-2 rounded-md border border-red-200 hover:bg-red-100 transition-colors"
                            >
                              <icons.AlertCircle size={12} />
                              Policy
                              <icons.ChevronDown
                                size={10}
                                className={`transition-transform duration-300 ${isPolicyExpanded ? 'rotate-180' : ''
                                  }`}
                              />
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                              <icons.Check size={10} />
                              Free
                            </span>
                          )}
                        </td>

                        {/* Action */}
                        <td className="px-3 py-2.5">
                          <div className="flex items-center justify-center gap-1.5">
                            {isAdded ? (
                              <>
                                <button
                                  className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-1 text-[10px] font-bold cursor-default"
                                  disabled
                                >
                                  <icons.Check size={12} /> Added
                                </button>
                                <button
                                  onClick={() => onRemoveRoom(room.BookingCode)}
                                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-colors"
                                >
                                  <icons.X size={12} />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() =>
                                  onAddRoom({
                                    ...room,
                                    HotelCode: hotel.HotelCode,
                                    HotelName: hotel.HotelName ?? 'Unknown Hotel',
                                    CityName: hotel.CityName ?? 'Unknown City',
                                    Address: hotel.Address ?? 'Address not available',
                                    Source: hotel.Source ?? 'Unknown',
                                    Description: hotel.Description,
                                    MealType: (room.MealType || 'N/A').replace(/_/g, ' '),
                                  })
                                }

                                className="bg-[#785ef7] hover:bg-[#5a3ec8] text-white px-4 py-2 rounded-md flex items-center gap-1 transition-colors text-[12px] font-bold"
                              >
                                <icons.Plus size={12} /> Add
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Row - Day Rates */}
                      {isExpanded && (
                        <tr className="bg-violet-50/30 border-t border-gray-200">
                          <td colSpan={9} className="px-4 py-3">
                            <h4 className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                              <icons.Calendar size={12} className="text-violet-600" />
                              Day-wise Rate Breakdown
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {dayRates.map((d: hotelTypes.DayRate, i: number) => (
                                <div
                                  key={i}
                                  className="bg-white px-2.5 py-1.5 rounded-lg border border-violet-200 shadow-sm"
                                >
                                  <div className="text-[9px] text-gray-500 mb-0.5 font-medium">
                                    Day {i + 1}
                                  </div>
                                  <div className="flex items-center gap-0.5">
                                    <icons.IndianRupee size={10} className="text-violet-600" />
                                    <span className="text-xs font-bold text-gray-900">
                                      {(d.BasePrice || 0).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}

                      {/* Expanded Row - Cancellation Policy */}
                      {isPolicyExpanded && cancelPolicies.length > 0 && (
                        <tr className="bg-red-50/30 border-t border-gray-200">
                          <td colSpan={9} className="px-4 py-3">
                            <h4 className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                              <icons.AlertCircle size={12} className="text-red-600" />
                              Cancellation Policy Details
                            </h4>
                            <div className="space-y-2">
                              {cancelPolicies.map((c: hotelTypes.CancellationPolicy, i: number) => {
                                const formattedDateTime = dateFormatterUtils.formatHotelDateTime(c.FromDate);

                                return (
                                  <div
                                    key={i}
                                    className="bg-white border-l-4 border-red-400 px-3 py-2 rounded shadow-sm"
                                  >
                                    <div className="font-semibold text-red-700 text-xs mb-0.5">
                                      From {formattedDateTime}
                                    </div>
                                    <div className="text-xs text-gray-700">
                                      {c.ChargeType === "Percentage"
                                        ? `${c.CancellationCharge}% charge`
                                        : `₹${c.CancellationCharge.toFixed(2)} charge`}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-white border-t-2 border-gray-300 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 shadow-lg">
          <div className="text-sm w-full sm:w-auto">
            {selectedRooms.length > 0 ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3">
                <span className="font-semibold text-gray-700 text-xs">
                  Selected: <span className="text-violet-600">{selectedRooms.length}</span>
                </span>
                <span className="font-bold text-sm sm:text-base text-gray-900 flex items-center gap-0.5">
                  Total:
                  <icons.IndianRupee size={14} className="text-violet-600 sm:w-4 sm:h-4" />
                  <span className="text-violet-600">
                    {selectedRoomsTotal.toFixed(2)}
                  </span>
                </span>
              </div>
            ) : (
              <span className="text-gray-500 text-xs">No rooms selected</span>
            )}
          </div>
          <button
            onClick={onShare}
            disabled={selectedRooms.length === 0}
            className={`w-full sm:w-auto flex items-center justify-center gap-1.5 font-semibold py-2 px-4 sm:px-5 rounded-lg transition-all shadow-md hover:shadow-lg text-xs sm:text-sm ${selectedRooms.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#785ef7] hover:bg-[#5a3ec8] text-white'
              }`}
          >
            <icons.Share2 size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Add to Share ({selectedRooms.length})</span>
            <span className="sm:hidden">Share ({selectedRooms.length})</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};