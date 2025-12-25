
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Calendar, IndianRupee, CreditCard, Info, CheckCircle2 } from 'lucide-react';

interface TaxBreakup {
  TaxType: string;
  TaxPercentage: number;
  TaxableAmount: number;
}

interface DayRate {
  BasePrice: number;
  Date?: string;
}

interface PriceBreakupItem {
  TaxBreakup: TaxBreakup[];
}

interface Room {
  TotalFare: number;
  TotalTax: number;
  DayRates?: DayRate[][];
  PriceBreakUp?: PriceBreakupItem[];
}

interface PriceSummaryProps {
  room: Room;
  nights: number;
  className?: string;
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({
  room,
  nights,
  className = '',
}) => {
  const [showDayRates, setShowDayRates] = useState(false);

  // Calculate base price from day rates
  const basePrice = room?.DayRates?.flat()?.reduce((total, rate) => {
    return total + (rate?.BasePrice || 0);
  }, 0) || 0;

  const dayRates = room?.DayRates?.[0] || [];
  const hasDayRates = dayRates.length > 0;

  return (
    <div className={`w-full ${className}`}>
      <Card className="border-2 border-[#785ef7]/20 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 py-0 gap-0">
        {/* Header */}
        <CardHeader className="bg-linear-to-r from-[#785ef7] to-[#644ed4] px-6 py-4">
          <div className="flex items-center justify-between">
            <h5 className="text-white text-lg font-bold flex items-center gap-2">
              <IndianRupee className="w-5 h-5" />
              Price Summary
            </h5>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-white text-xs font-semibold">
                {nights} {nights === 1 ? 'Night' : 'Nights'}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {/* Room Rate Card */}
          <div className="bg-linear-to-br from-purple-50 to-blue-50 rounded-xl p-4 border-2 border-[#785ef7]/20 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-8 bg-[#785ef7]/10 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-[#785ef7]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Room Charges</p>
                    <p className="text-xs text-gray-600">
                      1 Room × {nights} {nights === 1 ? 'Night' : 'Nights'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="flex items-baseline gap-1">
                    <IndianRupee className="w-4 h-4 text-[#785ef7]" />
                    <p className="text-xl font-bold text-[#785ef7] m-0">
                      {basePrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">Base price</p>
                </div>

                {/* Day Rates Tooltip - Only show if we have day rates */}
                {hasDayRates && (
                  <TooltipProvider>
                    <Tooltip open={showDayRates} onOpenChange={setShowDayRates}>
                      <TooltipTrigger asChild>
                        <button
                          className="text-gray-400 hover:text-[#785ef7] transition-colors p-1"
                          onMouseEnter={() => setShowDayRates(true)}
                          onMouseLeave={() => setShowDayRates(false)}
                        >
                          <Info size={16} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="left"
                        className="w-64 bg-white border-2 border-[#785ef7]/20 shadow-2xl p-4"
                      >
                        <h6 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#785ef7]" />
                          Daily Rate Breakdown
                        </h6>
                        <div className="space-y-2">
                          {dayRates.map((rate, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center text-sm bg-linear-to-r from-purple-50 to-blue-50 px-3 py-2 rounded-lg border border-[#785ef7]/10"
                            >
                              <span className="text-gray-700 font-medium">Night {idx + 1}</span>
                              <span className="font-bold text-[#785ef7]">
                                ₹{rate.BasePrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          </div>

          {/* Tax Amount Card */}
          <div className="bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-4 border-2 border-orange-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Taxes & Fees</p>
                  <p className="text-xs text-gray-600">Inclusive of all charges</p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-baseline gap-1">
                  <IndianRupee className="w-4 h-4 text-orange-600" />
                  <p className="text-xl font-bold text-orange-600 m-0">
                    {room.TotalTax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dashed border-gray-300"></div>
            </div>
          </div>

          {/* Total Amount Card */}
          <div className="bg-linear-to-r from-[#785ef7] to-[#644ed4] rounded-xl p-5 shadow-lg hover:shadow-xl transition-all">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/90 font-medium m-0">Total Amount</p>
                  <p className="text-xs text-white/70 mt-0.5">All inclusive</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-baseline gap-0">
                  <IndianRupee className="w-6 h-6 text-white" />
                  <p className="text-2xl font-bold text-white m-0">
                    {room.TotalFare.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-4 justify-between">
              <CheckCircle2 className="w-6 h-6 text-white" />
              <p className="text-xs text-white/90 m-0">
                You won't be charged until booking is confirmed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceSummary;