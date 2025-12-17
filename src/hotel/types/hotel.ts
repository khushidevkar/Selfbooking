
// export type Hotel = {
//   HotelCode: string;
// };

export type HotelLoaderProps = {
  step: number;
};

// src/hotel/types/hotel.ts

export interface HotelImage {
  url: string;
  alt?: string;
}

export interface DayRate {
  BasePrice: number;
  Date?: string;
  [key: string]: any;
}

export interface CancellationPolicy {
  FromDate: string;
  ToDate: string;
  ChargeType: 'Fixed' | 'Percentage';
  CancellationCharge: number;
}

export interface Room {
  BookingCode: string;
  Name: string | string[];
  RoomType?: string;
  MealType?: string;
  Inclusion?: string;
  TotalFare: number;
  TotalTax: number;
  DayRates?: DayRate[][];
  CancelPolicies?: CancellationPolicy[];
  Source?: string;
}

export interface Hotel {
  HotelCode: string;
  HotelName: string;
  HotelRating: number;
  CityName: string;
  Address: string;
  Description?: string;
  Image?: string;
  Images?: string[];
  Map?: string;
  HotelFacilities?: string[];
  Rooms?: Room[];
  Source?: string;
}

export interface HotelCityItem {
  HotelCode: string;
  HotelName: string;
  HotelRating: number;
  CityId: string;
  CityName: string;
  CountryCode: string;
  CountryName: string;
  Address: string;
  Description?: string;
  Image?: string;
  Images?: string[];
  Map?: string;
  HotelFacilities?: string[];
  PhoneNumber?: string;
  PinCode?: string;
  Email?: string;
  FaxNumber?: string;
  CheckInTime?: string;
  CheckOutTime?: string;
}

export interface HotelData {
  hotelcityList?: HotelCityItem[];
  [hotelCode: string]: unknown;
}


export interface HotelSearchParams {
  checkIn: string;
  checkOut: string;
  Rooms: number;
  Adults: number;
  Children: number;
  ChildAge: number[];
  CityCode?: string;
  corporate_name?: string | null;
  City_name: string;
  payment?: number;
  filteredCities?: Array<{
    Name: string;
    tbo_city_code: string;
  }>;
  admin_id?: string;
  booking_id?: string;
  booknow?: string;
  spoc_name?: string;
  approver1?: string;
  approver2?: string;
}


export interface HotelApiItem {
  HotelCode: string;
  HotelName: string;
  HotelRating: string; // "ThreeStar" etc.
  ImageUrls?: { ImageUrl: string }[];
  Address: string;
  Attractions?: string[];
  CountryName: string;
  CountryCode: string;
  Description?: string;
  FaxNumber?: string;
  HotelFacilities?: string[];
  Map?: string;
  Email?: string;
  PhoneNumber?: string;
  PinCode?: string;
  HotelWebsiteUrl?: string;
  CityName: string;
}

export interface HotelCodesResponse {
  Status: {
    Code: number;
    Description: string;
  };
  Hotels: HotelApiItem[];
}



export interface HotelSearchItem {
  HotelCode: string;
  HotelName?: string;
  HotelRating?: number | string;
  CityName?: string;
  Address?: string;
  Description?: string;
  Image?: string;
  Images?: string[];
  Map?: string;
  HotelFacilities?: string[];
  Rooms?: any[]; // you can refine this later if you know the structure
  Source?: string;
}

export interface HotelSearchResponse {
  Status: {
    Code: number;
    Description: string;
  };
  HotelResult: HotelSearchItem[];
}

export interface City {
  CityId: string;
  CityName: string;
  CountryCode: string;
  CountryName: string;
}

export interface SelectedRoom extends Room {
  HotelCode: string;
  HotelName: string;
  CityName: string;
  Address: string;
  Description?: string;
}

export interface HotelFilters {
  priceRange: [number, number];
  selectedRatings: number[];
  selectedFacilities: string[];
  mealType: string;
  refundable: boolean | null;
  searchQuery: string;
}

export interface ShareOptionRoom {
  RoomType: string;
  MealPlan: string | null;
  BaseFare: string | null;
  TotalFare: number;
  Tax: number;
}

export interface ShareOption {
  hotel_code: string;
  booking_code: string;
  hotel_name: string;
  hotel_address: string;
  city: string;
  source: string;
  Rooms: ShareOptionRoom[];
}

export interface ShareFormData {
  clientName: string;
  spocName: string;
  spocEmail: string;
  remark: string;
}

export interface ShareFormErrors {
  spocName?: string;
  spocEmail?: string;
  toEmail?: string;
  ccEmail?: string;
}

export type GuestType = 'adults' | 'children' | 'rooms';

export type FilterType =
  | 'price'
  | 'rating'
  | 'facility'
  | 'meal'
  | 'refundable'
  | 'search';


export interface FilterState {
  priceRange: [number, number];
  selectedRatings: number[];
  selectedFacilities: string[];
  mealType: string;
  refundable: boolean | null;
  searchQuery: string;
}