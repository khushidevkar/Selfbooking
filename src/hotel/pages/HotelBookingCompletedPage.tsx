
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  BookingHeader,
  BookingConfirmationCard,
  ImportantInfoSection,
  BookingPriceSummary,
  MapPreviewCard,
  BookingActions,
} from '@/hotel/components';

interface BookingDetails {
  BookingId: string;
  HotelName: string;
  StarRating: number;
  AddressLine1: string;
  AddressLine2?: string;
  CheckInDate: string;
  CheckOutDate: string;
  Rooms: Array<{
    RoomTypeName: string;
    Amenities?: string[];
    CancellationPolicy?: string;
  }>;
  RateConditions?: string[];
}

const HotelBookingCompletedPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const {
    bookingData,
    detailsData,
    personData,
    hotelsData,
    paymentRequired,
    hotelBooking,
  } = location.state || {};

  const [loader, setLoader] = useState(false);
  const hasFetched = useRef(false);

  const bookingDetails: BookingDetails = detailsData?.GetBookingDetailResult;
  const searchParams = JSON.parse(sessionStorage.getItem('hotelData_header') || '{}');

  // Calculate nights
  const calculateNights = (checkIn: string, checkOut: string) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Calculate base price
  const basePrice = Number(
    hotelBooking?.[0]?.Rooms?.[0]?.DayRates?.flat()?.reduce(
      (total: number, rate: any) => total + (rate?.BasePrice || 0),
      0
    )
  ) || 0;

  const taxAmount = hotelBooking?.[0]?.Rooms?.[0]?.TotalTax || 0;
  const totalAmount = hotelBooking?.[0]?.Rooms?.[0]?.NetAmount || 0;
  const nights = calculateNights(bookingDetails?.CheckInDate, bookingDetails?.CheckOutDate);

  // Assign booking to backend
  useEffect(() => {
    const assignBooking = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        if (!searchParams.booking_id || !hotelsData?.[0]) return;

        const access_token = sessionStorage.getItem('access_token');
        if (!access_token) return;

        const roomName = hotelsData[0].Rooms[0].Name?.join(' ') || '';
        const inclusion = hotelsData[0].Inclusion || '';
        const mealType = hotelsData[0].MealType || '';

        const dailyBreakfast = inclusion.toLowerCase().includes('breakfast') ? '1' : '0';
        const mealPlan = mealType.toLowerCase() === 'breakfast' ? '1' : '0';

        const formData = new URLSearchParams();
        formData.append('access_token', access_token);
        formData.append('assigned_hotel', hotelsData[0].HotelName);
        formData.append('booking_id', searchParams.booking_id);
        formData.append('assigned_hotel_address', hotelsData[0].Address);
        formData.append('assigned_room_type', hotelsData[0].Rooms[0].Name[0]);
        formData.append('daily_breakfast', dailyBreakfast);
        formData.append('meal_plan', mealPlan);
        formData.append('portal_used', 'sbt');
        formData.append('is_prepaid_booking', '0');
        formData.append('is_ac_room', '0');
        formData.append('hotel_id', hotelsData[0].HotelCode);
        
        const priceBreakup = hotelsData[0].Rooms[0].PriceBreakUp?.[0];
        if (priceBreakup) {
          formData.append('room_price', priceBreakup.RoomRate.toString());
          formData.append('vendor_taxable_amount', priceBreakup.RoomRate.toString());
        }

        formData.append('vendor_amount_paid_to', hotelsData[0].Rooms[0].TotalFare);
        formData.append('vendor_tax_paid_to', '0');
        formData.append('vendor_room_nights', hotelsData[0].Rooms[0].DayRates[0].length);
        formData.append('commission_earned', '');
        formData.append('vendor_invoice_comment', 'NA');
        formData.append('is_vendor_gst_applicable', '1');
        formData.append('booking_detail_result', JSON.stringify(bookingDetails));
        formData.append('cancellation_policies', JSON.stringify(bookingDetails.Rooms[0]?.CancelPolicies));
        formData.append('Booking_id', bookingDetails.BookingId);
        formData.append('EndUserIp', bookingData.endUserIp);
        formData.append('TokenId', bookingData.tokenId);
        formData.append('BookingMode', '5');
        formData.append('RequestType', '4');

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/hotels/assignSBTHotelBooking`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        });

        const data = await response.json();
        if (data.success === '0') {
          throw new Error(data.error || 'Failed to assign booking');
        }
      } catch (error) {
        console.error('Error assigning booking:', error);
      }
    };

    assignBooking();
  }, [hotelsData, bookingDetails, searchParams, bookingData]);

  // Download voucher handler
  const handleDownloadVoucher = async () => {
    setLoader(true);
    try {
      const requestBody = {
        BookingId: bookingDetails.BookingId,
        EndUserIp: bookingData.endUserIp,
        TokenId: bookingData.tokenId,
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/addSbtHotelBookingGenerateVoucher`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate voucher');
      }

      const data = await response.json();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Voucher downloaded successfully',
      });
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to download voucher',
      });
    } finally {
      setLoader(false);
    }
  };

  // Cancel booking handler
  const handleCancelBooking = async (remarks: string) => {
    try {
      const requestBody = {
        BookingMode: 5,
        RequestType: 4,
        Remarks: remarks,
        BookingId: bookingDetails.BookingId,
        EndUserIp: bookingData.endUserIp,
        TokenId: bookingData.tokenId,
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/sbtHotelSendChangeRequest`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      const responseStatus = data.HotelChangeRequestResult?.ResponseStatus;

      if (responseStatus === 1) {
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your booking was cancelled successfully',
        });
        navigate('/HotelCancellation', {
          state: { bookingData, hotelsData },
        });
      } else {
        throw new Error('Cancellation request failed');
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to cancel booking',
      });
    }
  };

  if (!bookingDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No booking details available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <BookingHeader
        bookingId={bookingDetails.BookingId}
        title="Your booking is confirmed"
        subtitle="No need to call for hotel information"
        status="confirmed"
      />

      {/* Loading Overlay */}
      {loader && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl flex items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#785ef7]" />
            <p className="text-gray-600 text-lg">Processing...</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Booking Actions */}
        <BookingActions
          onDownloadVoucher={handleDownloadVoucher}
          onCancelBooking={handleCancelBooking}
          isLoading={loader}
          showCancelButton={true}
          className="mb-6"
        />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Booking Confirmation */}
            <BookingConfirmationCard
              bookingDetails={bookingDetails}
              hotelImages={hotelsData?.[0]?.Images || []}
              hotelMap={hotelsData?.[0]?.Map}
              onViewMap={() => {
                const [lat, lng] = hotelsData[0].Map.split('|');
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
                  '_blank'
                );
              }}
            />

            {/* Important Information */}
            <ImportantInfoSection
              rateConditions={bookingDetails.RateConditions || []}
              previewCount={4}
            />
          </div>

          {/* Sidebar - Price Summary */}
          <div className="lg:w-96">
            <div className="lg:sticky lg:top-6">
              <BookingPriceSummary
                basePrice={basePrice}
                taxAmount={taxAmount}
                totalAmount={totalAmount}
                nights={nights}
                showBreakdown={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBookingCompletedPage;