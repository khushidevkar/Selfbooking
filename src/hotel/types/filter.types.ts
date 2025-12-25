// import * as hotelTypes from './hotel'

// export interface FilterSidebarProps {
//   // filters: any;
//   filters: hotelTypes.FilterState;
//   allRatings: number[];
//   allFacilities: string[];
//   allMealTypes: string[];
//   priceRange: { min: number; max: number };
//   handleFilterChange: <T extends hotelTypes.FilterType>(
//   filterType: T,
//   value: hotelTypes.FilterValueMap[T]
// ) => void;
//   handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   mapCenter?: { lat: number; lng: number };
//   onMapClick?: () => void;
// }


import * as hotelTypes from './hotel'

export interface FilterSidebarProps {
  filters: hotelTypes.FilterState;
  allRatings: number[];
  allFacilities: string[];
  allMealTypes: string[];
  priceRange: { min: number; max: number };
  handleFilterChange: <T extends hotelTypes.FilterType>(
    filterType: T,
    value: hotelTypes.FilterValueMap[T]
  ) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mapCenter?: { lat: number; lng: number };
  onMapClick?: () => void;
  hotels?: hotelTypes.Hotel[];  // ✅ ADD THIS LINE
}