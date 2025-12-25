
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface BookingHeaderProps {
  bookingId?: string;
  title?: string;
  subtitle?: string;
  status?: 'confirmed' | 'pending' | 'cancelled';
  className?: string;
}

export const BookingHeader: React.FC<BookingHeaderProps> = ({
  bookingId,
  title = 'Your booking is confirmed',
  subtitle = 'No need to call for hotel information',
  status = 'confirmed',
  className = '',
}) => {
  const statusConfig = {
    confirmed: {
      bg: 'bg-gradient-to-r from-green-600 to-emerald-600',
      icon: <CheckCircle className="w-6 h-6 text-white" />,
    },
    pending: {
      bg: 'bg-gradient-to-r from-yellow-600 to-orange-600',
      icon: <Clock className="w-6 h-6 text-white" />,
    },
    cancelled: {
      bg: 'bg-gradient-to-r from-red-600 to-rose-600',
      icon: <XCircle className="w-6 h-6 text-white" />,
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`${config.bg} px-4 py-6 shadow-lg ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="shrink-0 mt-1">{config.icon}</div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-white mb-1 wrap-break-words">
                {title}
              </h1>
              <p className="text-sm md:text-base text-white/90">{subtitle}</p>
            </div>
          </div>
          {bookingId && (
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm shrink-0 uppercase"
            >
              <span className="text-xs md:text-sm font-semibold whitespace-nowrap">
                Booking ID: {bookingId}
              </span>
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;