
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { IndianRupee, Calendar, CreditCard } from 'lucide-react';

interface BookingPriceSummaryProps {
  basePrice: number;
  taxAmount: number;
  totalAmount: number;
  nights: number;
  showBreakdown?: boolean;
  className?: string;
}

export const BookingPriceSummary: React.FC<BookingPriceSummaryProps> = ({
  basePrice,
  taxAmount,
  totalAmount,
  nights,
  showBreakdown = true,
  className = '',
}) => {
  return (
    <Card className={`border-gray-200 shadow-xl overflow-hidden ${className}`}>
      {/* Header */}
      <CardHeader className="bg-linear-to-r from-[#785ef7] to-[#5a3ec8] px-4 py-3">
        <h5 className="text-white text-base font-bold">Price Breakup</h5>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {showBreakdown && (
          <>
            {/* Room Rate */}
            <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#785ef7]" />
                    <strong className="text-xs text-gray-800">
                      1 Room × {nights} {nights === 1 ? 'Night' : 'Nights'}
                    </strong>
                  </div>
                  <p className="text-[10px] text-gray-600 m-0">Base Price</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <IndianRupee className="w-4 h-4 text-[#785ef7]" />
                  <p className="text-lg font-bold text-[#785ef7] m-0">
                    {basePrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Tax Amount */}
            <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#785ef7]" />
                  <strong className="text-xs text-gray-800">Tax Amount</strong>
                </div>
                <div className="flex items-baseline gap-1">
                  <IndianRupee className="w-4 h-4 text-[#785ef7]" />
                  <p className="text-lg font-bold text-[#785ef7] m-0">
                    {taxAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-gray-300" />
          </>
        )}

        {/* Total Amount */}
        <div className="bg-linear-to-r from-[#785ef7] to-[#5a3ec8] rounded-lg py-3 px-3 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <IndianRupee className="w-4 h-4 text-white" />
              </div>
              <p className="text-xs text-white/90 font-medium m-0">Total Amount</p>
            </div>
            <div className="flex items-baseline gap-1">
              <IndianRupee className="w-5 h-5 text-white" />
              <p className="text-2xl font-bold text-white m-0">
                {totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
          <p className="text-[10px] text-white/70 mt-1.5 mb-0">
            Inclusive of all taxes and fees
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingPriceSummary;