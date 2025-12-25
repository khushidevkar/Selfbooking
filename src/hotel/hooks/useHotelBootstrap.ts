
// src/hooks/useHotelBootstrap.ts
import { useState, useMemo, useCallback, useEffect } from 'react';
import { hotelApi, peopleApi, hotelTypes, hotelUtils, formTypes } from '@/index';

export const useHotelBootstrap = () => {
  const [loader, setLoader] = useState(false);
   const [companiesLoading, setCompaniesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);

  const [hotelDetails, setHotelDetails] = useState<hotelTypes.Hotel[]>(() => {
    const storedData = sessionStorage.getItem('hotelDetails');
    return storedData ? JSON.parse(storedData) : [];
  });


   const [searchParams, setSearchParams] = useState<hotelTypes.HotelSearchParams | null>(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    return storedParams ? JSON.parse(storedParams) : null;
  });


  // const [hotelSearchData, setHotelSearchData] = useState(() =>
  //   JSON.parse(sessionStorage.getItem('hotelSearchData') || '{}')
  // );

  const [hotelSearchData, setHotelSearchData] = useState<{ hotelcityList?: hotelTypes.HotelSearchItem[] }>(() =>
  JSON.parse(sessionStorage.getItem('hotelSearchData') || '{}')
);


  // const combinedHotels = useMemo(() => {
  //   const hotelcityList: hotelTypes.HotelCityItem[] = hotelSearchData.hotelcityList ?? [];
  //   return hotelDetails.map((hotel) => {
  //     const matchedHotel = hotelcityList.find(
  //       (item) => item.HotelCode === hotel.HotelCode
  //     );
  //     return {
  //       ...hotel,
  //       ...(matchedHotel ?? {}),
  //     };
  //   });
  // }, [hotelDetails, hotelSearchData]);

  const combinedHotels = useMemo(() => {
  const hotelcityList: hotelTypes.HotelSearchItem[] = hotelSearchData.hotelcityList ?? [];
  
  return hotelDetails.map((hotel) => {
    const matchedHotel = hotelcityList.find(
      (item) => item.HotelCode === hotel.HotelCode
    );
    
    return {
      ...hotel,
      ...matchedHotel,
      // Explicitly preserve Rooms from search results (has pricing)
      Rooms: matchedHotel?.Rooms || hotel.Rooms || [],
    };
  });
}, [hotelDetails, hotelSearchData]);


useEffect(() => {
  if (combinedHotels.length > 0) {
    console.log('=== COMBINED HOTELS CHECK ===');
    console.log('Total hotels:', combinedHotels.length);
    console.log('First hotel:', combinedHotels[0]);
    console.log('First hotel Rooms:', combinedHotels[0]?.Rooms);
    console.log('Rooms count:', combinedHotels[0]?.Rooms?.length);
  }
}, [combinedHotels]);

  // Cities
  const [cities, setCities] = useState<formTypes.City[]>([]);

  
    const [city, setCity] = useState(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.city_name || '';
    }
    return '';
  });



   const [selectedCityCode, setSelectedCityCode] = useState(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.CityCode || '';
    }
    return '';
  });

  const [showDropdown2, setShowDropdown2] = useState(false);

  // Companies
  const [companies, setCompanies] = useState<string[]>([]);

  
   const [company, setCompany] = useState(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.corporate_name || '';
    }
    return '';
  });

  const [showDropdown, setShowDropdown] = useState(false);

  // Dates

   const [checkInDate, setCheckInDate] = useState<Date | null>(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.checkIn ? new Date(params.checkIn) : null;
    }
    return null;
  });

   const [bookNow, setBookNow] = useState(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.booknow || '';
    }
    return null;
  });
  
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.checkOut ? new Date(params.checkOut) : null;
    }
    return null;
  });

  const [isCheckInOpen, setCheckInIsOpen] = useState(false);
  const [isCheckOutOpen, setCheckOutIsOpen] = useState(false);

  // Rooms & Guests

   const [roomCount, setRoomCount] = useState(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.Rooms || 1;
    }
    return 1;
  });

  
   const [roomadultCount, setRoomAdultCount] = useState(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.Adults || 1;
    }
    return 1;
  });

  
    const [roomchildCount, setRoomChildCount] = useState(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.Children || 0;
    }
    return 0;
  });
  
  
  const [childrenAges, setChildrenAges] = useState<number[]>(() => {
    const storedParams = sessionStorage.getItem('hotelData_header');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      return params.ChildAge || [];
    }
    return [];
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // -----------------------------
  // Helper Functions
  // -----------------------------

  const buildRoomsArray = useCallback((
    adults: number,
    children: number,
    childrenAges: number[]
  ) => {
    let remainingAdults = adults;
    let remainingChildren = children;
    let remainingChildrenAges = [...childrenAges];

    const roomsArray: { Adults: number; Children: number; ChildrenAges: number[] | null }[] = [];
    const maxAdultsPerRoom = 8;
    const maxChildrenPerRoom = 4;

    while (remainingAdults > 0 || remainingChildren > 0) {
      const allocatedAdults = Math.min(remainingAdults, maxAdultsPerRoom);
      const allocatedChildren = Math.min(remainingChildren, maxChildrenPerRoom);
      const allocatedChildrenAges = remainingChildrenAges.slice(0, allocatedChildren);

      roomsArray.push({
        Adults: allocatedAdults,
        Children: allocatedChildren,
        ChildrenAges: allocatedChildrenAges.length > 0 ? allocatedChildrenAges : null,
      });

      remainingAdults -= allocatedAdults;
      remainingChildren -= allocatedChildren;
      remainingChildrenAges = remainingChildrenAges.slice(allocatedChildren);
    }

    return roomsArray;
  }, []);

  // -----------------------------
  // API Functions
  // -----------------------------

  const handleSelection = useCallback((
    type: 'adults' | 'children' | 'rooms',
    value: number
  ) => {
    let newRoomAdultCount = roomadultCount;
    let newRoomChildCount = roomchildCount;
    let newRoomCount = roomCount;

    if (type === 'adults') {
      newRoomAdultCount = value;
      setRoomAdultCount(value);
    } else if (type === 'children') {
      newRoomChildCount = value;
      setRoomChildCount(value);

      setChildrenAges((prevAges) => {
        if (value > prevAges.length) {
          return [...prevAges, ...new Array(value - prevAges.length).fill(0)];
        } else {
          return prevAges.slice(0, value);
        }
      });
    } else if (type === 'rooms') {
      newRoomCount = value;
      setRoomCount(value);
    }

    const totalAdults = parseInt(String(newRoomAdultCount)) || 0;
    const totalChildren = parseInt(String(newRoomChildCount)) || 0;
    const selectedRooms = parseInt(String(newRoomCount)) || 0;

    const requiredRooms = hotelUtils.calculateRequiredRooms(totalAdults, totalChildren);

    if (selectedRooms < requiredRooms) {
      setErrorMessage(
        `Minimum ${requiredRooms} rooms required based on your selection.`
      );
    } else {
      setErrorMessage('');
    }
  }, [roomadultCount, roomchildCount, roomCount]);

  const handleChildAgeChange = useCallback((index: number, age: number) => {
    const updatedAges = [...childrenAges];
    updatedAges[index] = age;
    setChildrenAges(updatedAges);
  }, [childrenAges]);

  const handleApply = useCallback(() => {
    const totalAdults = parseInt(String(roomadultCount)) || 0;
    const totalChildren = parseInt(String(roomchildCount)) || 0;
    const selectedRooms = parseInt(String(roomCount)) || 0;

    const requiredRooms = hotelUtils.calculateRequiredRooms(totalAdults, totalChildren);

    if (selectedRooms !== requiredRooms) {
      setErrorMessage(
        `Minimum ${requiredRooms} rooms required based on your selection.`
      );
      return;
    }

    if (totalChildren > 0 && childrenAges.some((age) => age === 0)) {
      setErrorMessage('Please specify ages for all children');
      return;
    }

    setErrorMessage('');
    setIsDropdownOpen(false);
  }, [roomadultCount, roomchildCount, roomCount, childrenAges]);

  const fetchCompanies = useCallback(async () => {
     if (companies.length > 0) return;
    
    setCompaniesLoading(true);
    try {
      const response = await peopleApi.getCompanies<formTypes.CompaniesApiResponse>();
      if (response.data.success === '1' && Array.isArray(response.data.response.Companies)) {
        setCompanies(response.data.response.Companies.map((c: { corporate_name: string }) => c.corporate_name));
      } else {
        throw new Error('Failed to fetch companies');
      }
    } catch (error: unknown) {
      console.error('Fetch Companies Error:', error);
      throw error;
    } finally {
      setCompaniesLoading(false);
    }

  }, [companies.length]);

  const fetchCities = useCallback(async () => {
      if (cities.length > 0) return;
    
    setCitiesLoading(true);
    try {
      const response = await hotelApi.getCities();
      const data = response.data;
      if (data.success === '1' && Array.isArray(data.response?.Cities)) {
        setCities(data.response.Cities);
      } else {
        throw new Error(data?.Status?.Description || 'Failed to fetch cities');
      }
    } catch (error: unknown) {
      console.error('Fetch Cities Error:', error);
      throw error;
    }finally {
      setCitiesLoading(false);
    }
  }, [cities.length]);

  // -----------------------------
  // Complete initialization and search flow
  // -----------------------------
  

const initializeAndSearch = useCallback(async (params: hotelTypes.HotelSearchParams) => {
  setLoader(true);
  
  try {
    // Step 1: Set all state from params
    setSearchParams(params);
    setCity(params.city_name || '');
    setSelectedCityCode(params.CityCode || '');
    if (params.checkIn) setCheckInDate(new Date(params.checkIn));
    if (params.checkOut) setCheckOutDate(new Date(params.checkOut));
    setRoomCount(params.Rooms || 1);
    setRoomAdultCount(params.Adults || 1);
    setRoomChildCount(params.Children || 0);
    setChildrenAges(params.ChildAge || []);

    // Step 2: Validate params before proceeding
    if (!params.CityCode?.trim()) {
      throw new Error('City code is required');
    }
    
    if (!params.checkIn || !params.checkOut) {
      throw new Error('Check-in and check-out dates are required');
    }

    // Step 3: Fetch hotel codes
    const codesResponse = await hotelApi.getHotelCodes(params.CityCode.trim());
    const codesData = codesResponse.data;

    if (codesData.Status?.Code !== 200) {
      throw new Error(codesData.Status?.Description || 'Failed to fetch hotel codes');
    }

    const hotels = codesData.Hotels ?? [];
    if (!hotels.length) {
      throw new Error('No hotels found for this city');
    }

    // Step 4: Search hotels with the codes
    const codes = hotels.map((h: { HotelCode: string}) => h.HotelCode);
    
    const formattedCheckInDate = new Date(params.checkIn).toISOString().split('T')[0];
    const formattedCheckOutDate = new Date(params.checkOut).toISOString().split('T')[0];

    const roomsArray = buildRoomsArray(
      params.Adults || 1,
      params.Children || 0,
      params.ChildAge || []
    );

    const requestBody = {
      CheckIn: formattedCheckInDate,
      CheckOut: formattedCheckOutDate,
      HotelCodes: codes.toString(),
      GuestNationality: 'IN',
      PaxRooms: roomsArray,
      ResponseTime: 23.0,
      IsDetailedResponse: true,
      Filters: {
        Refundable: false,
        NoOfRooms: roomsArray.length,
        MealType: 0,
        OrderBy: 0,
        StarRating: 0,
        HotelName: null,
      },
    };

    const response = await hotelApi.searchHotels(requestBody);
    const data = response.data;

    if (data.Status?.Code !== 200) {
      throw new Error(data.Status?.Description || 'Hotel search failed');
    }

    // Step 5: Fetch and store hotel details

    const searchHotels = data.HotelResult ?? [];
    
    const hotelCodesForDetails = searchHotels
      .map((h: { HotelCode?: string}) => h.HotelCode?.toString())
      .filter(Boolean);

    //  FIX: Add proper error handling for hotel details
    if (hotelCodesForDetails.length > 0) {
      const detailsResponse = await hotelApi.getHotelDetails(
        hotelCodesForDetails.join(',')
      );

      const detailsData = detailsResponse.data;
      console.log("HotelDetails API response:", detailsData);

      // Check for success and throw error if failed
      if (detailsData.Status?.Code !== 200) {
        throw new Error(
          detailsData.Status?.Description || 'Failed to fetch hotel details'
        );
      }

      const details = detailsData.HotelDetails ?? [];
      
      // Optional: Validate that we got details
      if (details.length === 0) {
        throw new Error('No hotel details returned from API');
      }

      setHotelDetails(details);
      sessionStorage.setItem("hotelDetails", JSON.stringify(details));
    } else {
      // Handle case where no hotel codes were found
      throw new Error('No hotel codes available for fetching details');
    }

    // Step 6: Store search results
    const payload = { hotelcityList: searchHotels };
    sessionStorage.setItem('hotelSearchData', JSON.stringify(payload));
    setHotelSearchData(payload);

    return { success: true };
    
  } catch (error: unknown) {
    console.error('Hotel initialization error:', error);
    //  Make sure error is re-thrown so useHotelInitializer can catch it
    throw error;
  } finally {
    setLoader(false);
  }
}, [buildRoomsArray]);



  // Keep the original handleSubmitForm for manual searches (uses state)
  const handleSubmitForm = useCallback(async () => {
    if (!searchParams) {
      throw new Error('Hotel search not initialized yet');
    }
    
    // Reuse the same logic but with current state
    await initializeAndSearch(searchParams);
  }, [searchParams, initializeAndSearch]);

  return {
    loader,
    companiesLoading,
    citiesLoading,
    hotelDetails,
    combinedHotels,
    searchParams,
    cities,
    city,
    setCity,
    selectedCityCode,
    setSelectedCityCode,
    showDropdown2,
    setShowDropdown2,
    companies,
    company,
    setCompany,
    showDropdown,
    bookNow, 
    setBookNow,
    setShowDropdown,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    isCheckInOpen,
    setCheckInIsOpen,
    isCheckOutOpen,
    setCheckOutIsOpen,
    roomCount,
    roomadultCount,
    roomchildCount,
    childrenAges,
    isDropdownOpen,
    setIsDropdownOpen,
    errorMessage,
    handleSubmitForm,
    fetchCompanies,
    fetchCities,
    handleSelection,
    handleChildAgeChange,
    handleApply,
    initializeAndSearch, //  For URL-based initialization
  };
};