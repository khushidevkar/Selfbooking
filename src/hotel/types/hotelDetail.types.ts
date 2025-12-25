// src/hotel/types/hotelDetail.types.ts

import { Hotel, Room, CancellationPolicy } from './hotel';

export type SectionKey = 'overview' | 'rooms' | 'location';

export interface HotelDetailState {
  hotel: Hotel;
  taxivaxi?: TaxivaxiData;
  fromBookNow?: boolean;
}

export interface TaxivaxiData {
  hotel_code?: string;
  meal_plan?: string;
  room_type_name?: string;
  checkindate?: string;
  checkoutdate?: string;
  
}

export interface DisplayRoom extends Room {
IsRefundable?: boolean;
  Inclusion?: string;
  MealType?: string;
  CancelPolicies?: CancellationPolicy[];
}

export interface StickyHeaderProps {
  showHeader: boolean;
  activeSection: SectionKey;
  hasMultipleRooms: boolean;
  // onNavigate: (section: string) => void;
  onNavigate: (section: SectionKey) => void;
}

export interface HotelOverviewProps {
  hotel: Hotel;
  taxivaxi: TaxivaxiData;
  displayRoom: DisplayRoom;
  fromBookNow: boolean;
  onSelectRoom: (room: Room) => void;
  onShowAmenities: () => void;
}

export interface RoomCardProps {
  room: Room;
  hotel: Hotel;
  index: number;
  onSelectRoom: (room: Room) => void;
  onShowDetails: () => void;
}

export interface HotelMapProps {
  hotel: Hotel;
  center: { lat: number; lng: number };
}

export interface BreadcrumbProps {
  cityName: string;
  hotelName: string;
  showHome?: boolean;
  onNavigateHome?: () => void;
  onNavigateSearch?: () => void;
}

export interface PriceBreakdownProps {
  room: DisplayRoom;
  show: boolean;
}

export interface CancellationPolicyDisplayProps {
  policies: CancellationPolicy[];
  mealType?: string;
  isRefundable?: boolean;
}