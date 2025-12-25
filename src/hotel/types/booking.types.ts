// 
export interface BookingRoom {
  RoomTypeName: string;
  Amenities?: string[];
  CancellationPolicy?: string;
}

export interface BookingDetails {
  HotelName: string;
  StarRating: number;
  AddressLine1: string;
  AddressLine2?: string;
  CheckInDate: string;
  CheckOutDate: string;
  Rooms: BookingRoom[];
  RateConditions?: string[];
}

export interface BookingConfirmationCardProps {
  bookingDetails: BookingDetails;
  hotelImages?: string[];
  hotelMap?: string;
  onViewMap?: () => void;
  className?: string;
}


// HotelBookingSummary Types
export interface CancellationPolicy {
  FromDate: string;
  ToDate: string;
  ChargeType: 'Fixed' | 'Percentage';
  CancellationCharge: number;
}

export interface RoomSummary {
  Name: string | string[];
  Inclusion?: string;
  MealType?: string;
  CancelPolicies?: CancellationPolicy[];
}

export interface SearchParams {
  checkIn: string;
  checkOut: string;
  Adults: number;
  Children: number;
  ChildAge?: number[];
  Rooms: number;
}

export interface HotelBookingSummaryProps {
  hotelName: string;
  hotelRating: number;
  address: string;
  selectedRoom: RoomSummary;
  searchParams: SearchParams;
  nights: number;
  checkInTime?: string;
  checkOutTime?: string;
  onSeeInclusion: () => void;
}


// Price Summary Types
export interface TaxBreakup {
  TaxType: string;
  TaxPercentage: number;
  TaxableAmount: number;
}

export interface DayRate {
  BasePrice: number;
  Date?: string;
}

export interface PriceBreakupItem {
  TaxBreakup: TaxBreakup[];
}

export interface RoomPriceSummary  {
  TotalFare: number;
  TotalTax: number;
  DayRates?: DayRate[][];
  PriceBreakUp?: PriceBreakupItem[];
}

export interface PriceSummaryProps {
  room: RoomPriceSummary;
  nights: number;
  className?: string;
}