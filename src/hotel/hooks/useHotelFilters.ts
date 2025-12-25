
import { useState, useMemo } from 'react';
import { hotelTypes } from '@/index';


export const useHotelFilters = (combinedHotels: hotelTypes.Hotel[]) => {
  // Extract unique values from hotels
  const allFacilities = useMemo(
    () => [
      ...new Set(
        combinedHotels.flatMap((hotel) => hotel.HotelFacilities || [])
      ),
    ],
    [combinedHotels]
  );

  const allRatings = useMemo(
    () =>
      [...new Set(combinedHotels.map((hotel) => hotel.HotelRating || 0))].sort(
        (a, b) => b - a
      ),
    [combinedHotels]
  );

  // const allMealTypes = useMemo(
  //   () => [
  //     ...new Set(
  //       combinedHotels.flatMap((hotel) =>
  //         (hotel.Rooms || []).map((room) => room.MealType)
  //       )
  //     ),
  //   ],
  //   [combinedHotels]
  // );

  const allMealTypes = useMemo(
    () =>
      Array.from(
        new Set(
          combinedHotels
            .flatMap((hotel) => hotel.Rooms || [])
            .map((room) => room.MealType)
            .filter((meal): meal is string => Boolean(meal))
        )
      ),
    [combinedHotels]
  );


  // Calculate price range
  const priceRange = useMemo(() => {
    const prices = combinedHotels
      .flatMap((hotel) => hotel.Rooms || [])
      .map((room) => room.TotalFare || 0)
      .filter((price) => price > 0);

    return {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 10000,
    };
  }, [combinedHotels]);

  // State for filters
  const [filters, setFilters] = useState<hotelTypes.FilterState>({
    priceRange: [priceRange.min, priceRange.max],
    selectedRatings: [],
    selectedFacilities: [],
    mealType: '',
    refundable: null,
    searchQuery: '',
  });

  const filteredHotels = useMemo(() => {
  return combinedHotels.filter((hotel) => {
    if (!hotel.Rooms || hotel.Rooms.length === 0) return false;

    // Price filter
    const minPrice = Math.min(
      ...hotel.Rooms.map((room) => room.TotalFare || 0)
    );
    if (
      minPrice < filters.priceRange[0] ||
      minPrice > filters.priceRange[1]
    ) {
      return false;
    }

    // Rating filter
    if (
      filters.selectedRatings.length > 0 &&
      !filters.selectedRatings.includes(hotel.HotelRating || 0)
    ) {
      return false;
    }

    // Facilities filter
    if (filters.selectedFacilities.length > 0) {
      const hotelFacilities = hotel.HotelFacilities || [];
      if (
        !filters.selectedFacilities.every((fac) =>
          hotelFacilities.includes(fac)
        )
      ) {
        return false;
      }
    }

    // Meal filter
    if (
      filters.mealType &&
      !hotel.Rooms.some((room) => room.MealType === filters.mealType)
    ) {
      return false;
    }

    // Refundable filter
    if (filters.refundable !== null) {
      const now = new Date();
      const match = hotel.Rooms.some((room) => {
        const hasActivePolicy =
          room.CancelPolicies?.some(
            (p) => new Date(p.ToDate) > now
          ) ?? false;

        return filters.refundable ? hasActivePolicy : !hasActivePolicy;
      });

      if (!match) return false;
    }

    // Search filter
    if (
      filters.searchQuery &&
      !hotel.HotelName?.toLowerCase().includes(
        filters.searchQuery.toLowerCase()
      )
    ) {
      return false;
    }

    return true;
  });
}, [combinedHotels, filters]);


  // Handle filter changes
  // const handleFilterChange = (filterType: hotelTypes.FilterType, value: any) => {
  //   setFilters((prevFilters) => {
  //     const newFilters = { ...prevFilters };

  //     switch (filterType) {
  //       case 'price':
  //         newFilters.priceRange = value;
  //         break;
  //       case 'rating':
  //         newFilters.selectedRatings = newFilters.selectedRatings.includes(
  //           value
  //         )
  //           ? newFilters.selectedRatings.filter((r) => r !== value)
  //           : [...newFilters.selectedRatings, value];
  //         break;
  //       case 'facility':
  //         newFilters.selectedFacilities =
  //           newFilters.selectedFacilities.includes(value)
  //             ? newFilters.selectedFacilities.filter((f) => f !== value)
  //             : [...newFilters.selectedFacilities, value];
  //         break;
  //       case 'meal':
  //         newFilters.mealType = value;
  //         break;
  //       case 'refundable':
  //         newFilters.refundable = value;
  //         break;
  //       case 'search':
  //         newFilters.searchQuery = value;
  //         break;
  //       default:
  //         break;
  //     }

  //     return newFilters;
  //   });
  // };


  const handleFilterChange = <T extends hotelTypes.FilterType>(
  filterType: T,
  value: hotelTypes.FilterValueMap[T]
) => {
  setFilters((prevFilters) => {
    const newFilters = { ...prevFilters };

    switch (filterType) {
      case 'price':
        newFilters.priceRange = value as [number, number];
        break;

      case 'rating':
        newFilters.selectedRatings = newFilters.selectedRatings.includes(value as number)
          ? newFilters.selectedRatings.filter((r) => r !== value)
          : [...newFilters.selectedRatings, value as number];
        break;

      case 'facility':
        newFilters.selectedFacilities = newFilters.selectedFacilities.includes(value as string)
          ? newFilters.selectedFacilities.filter((f) => f !== value)
          : [...newFilters.selectedFacilities, value as string];
        break;

      case 'meal':
        newFilters.mealType = value as string;
        break;

      case 'refundable':
        newFilters.refundable = value as boolean | null;
        break;

      case 'search':
        newFilters.searchQuery = value as string;
        break;
    }

    return newFilters;
  });
};



  const [searchTimeout, setSearchTimeout] = useState<
    ReturnType<typeof setTimeout> | null
  >(null);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (searchTimeout) clearTimeout(searchTimeout);

    const timeout = setTimeout(() => {
      handleFilterChange('search', value);
    }, 300);

    setSearchTimeout(timeout);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      priceRange: [priceRange.min, priceRange.max],
      selectedRatings: [],
      selectedFacilities: [],
      mealType: '',
      refundable: null,
      searchQuery: '',
    });
  };

  return {
    filters,
    filteredHotels,
    allFacilities,
    allRatings,
    allMealTypes,
    priceRange,
    handleFilterChange,
    handleSearchChange,
    resetFilters,
  };
};
