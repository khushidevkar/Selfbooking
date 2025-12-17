
import { useState, useRef, useMemo } from 'react';

import Swal from 'sweetalert2';

import { hotelApi, peopleApi, hotelTypes,hotelUtils } from '@/index';
export const useHotelBootstrap = () => {
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hotelDetails, setHotelDetails] = useState<hotelTypes.Hotel[]>(() => {
    const storedData = sessionStorage.getItem('hotelDetails');
    return storedData ? JSON.parse(storedData) : [];
  });

  const searchParams: hotelTypes.HotelSearchParams =
    JSON.parse(sessionStorage.getItem('hotelData_header') || '{}');

  const hotelData = JSON.parse(sessionStorage.getItem('hotelSearchData') || '{}');
  const combinedHotels = useMemo(() => {
    const hotelcityList: hotelTypes.HotelCityItem[] = hotelData.hotelcityList ?? [];

    return hotelDetails.map((hotel) => {
      const matchedHotelList = hotelcityList.find(
        (item: hotelTypes.HotelCityItem) => item.HotelCode === hotel.HotelCode
      );

      const matchedHotelData =
        (hotelData[hotel.HotelCode] as Record<string, unknown>) ?? {};

      return {
        ...hotel,
        ...(matchedHotelList ?? {}),
        ...matchedHotelData,
      };
    });
  }, [hotelDetails, hotelData]);


  // Cities
  const [cities, setCities] = useState<hotelTypes.City[]>([]);
  const [city, setCity] = useState(
    searchParams.filteredCities?.[0]?.Name || searchParams.City_name
  );
  const [selectedCityCode, setSelectedCityCode] = useState(
    searchParams.filteredCities?.[0]?.tbo_city_code || ''
  );
  const [showDropdown2, setShowDropdown2] = useState(false);

  // Companies
  const [companies, setCompanies] = useState<string[]>([]);
  const [company, setCompany] = useState(searchParams.corporate_name || '');
  const [showDropdown, setShowDropdown] = useState(false);

  // Dates
 const [checkInDate, setCheckInDate] = useState<Date | null>(
  searchParams.checkIn ? new Date(searchParams.checkIn) : null
);
const [checkOutDate, setCheckOutDate] = useState<Date | null>(
  searchParams.checkOut ? new Date(searchParams.checkOut) : null
);


  const [isCheckInOpen, setCheckInIsOpen] = useState(false);
  const [isCheckOutOpen, setCheckOutIsOpen] = useState(false);

  // Rooms & Guests
  const [roomCount, setRoomCount] = useState(searchParams.Rooms || 1);
  const [roomadultCount, setRoomAdultCount] = useState(searchParams.Adults || 2);
  const [roomchildCount, setRoomChildCount] = useState(searchParams.Children || 0);
  const [childrenAges, setChildrenAges] = useState<number[]>(
    searchParams.ChildAge || []
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isFetchCitysCalled = useRef(false);

  // const fetchCompanies = async () => {
  //   try {
  //     const companyList = await peopleApi.getCompanies();
  //     setCompanies(companyList);
  //   } catch (error) {
  //     console.error('Fetch Error:', error);
  //   }
  // };



  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await peopleApi.getCompanies();

      if (
        response.data.success === "1" &&
        Array.isArray(response.data.response.Companies)
      ) {
        setCompanies(
          response.data.response.Companies.map(
            (c: { corporate_name: string }) => c.corporate_name
          )
        );
      } else {
        console.error("API Error: No companies found or invalid response format");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };


  const fetchCities = async () => {
    try {
      const response = await hotelApi.getCities();
      const data = response.data; // actual API response

      if (data.success === '1' && Array.isArray(data.response?.Cities)) {
        setCities(data.response.Cities);
      } else {
        await Swal.fire({
          title: 'Error!',
          text: data?.Status?.Description || 'Something went wrong!',
          imageWidth: 75,
          imageHeight: 75,
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };



  const handleSelection = (
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
  };

  const handleChildAgeChange = (index: number, age: number) => {
    const updatedAges = [...childrenAges];
    updatedAges[index] = age;
    setChildrenAges(updatedAges);
  };

  const handleApply = () => {
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
  };



  const fetchSearchApi = async (hotelCodes: string[]) => {
  if (!hotelCodes || hotelCodes.length < 3) {
    console.warn("Skipping search: Not enough hotel codes.");
    return;
  }

  if (!checkInDate || !checkOutDate) {
    console.error("Check-in or check-out date missing");
    return;
  }

  const formattedCheckInDate = checkInDate.toISOString().split("T")[0];
  const formattedCheckOutDate = checkOutDate.toISOString().split("T")[0];

  let remainingAdults = roomadultCount;
  let remainingChildren = roomchildCount;
  let remainingChildrenAges = [...childrenAges];

  const roomsArray: {
    Adults: number;
    Children: number;
    ChildrenAges: number[] | null;
  }[] = [];

  const maxAdultsPerRoom = 8;
  const maxChildrenPerRoom = 4;

  while (remainingAdults > 0 || remainingChildren > 0) {
    const allocatedAdults = Math.min(remainingAdults, maxAdultsPerRoom);
    const allocatedChildren = Math.min(remainingChildren, maxChildrenPerRoom);

    const allocatedChildrenAges = remainingChildrenAges.slice(
      0,
      allocatedChildren
    );

    roomsArray.push({
      Adults: allocatedAdults,
      Children: allocatedChildren,
      ChildrenAges:
        allocatedChildrenAges.length > 0 ? allocatedChildrenAges : null,
    });

    remainingAdults -= allocatedAdults;
    remainingChildren -= allocatedChildren;
    remainingChildrenAges = remainingChildrenAges.slice(allocatedChildren);
  }

  const requestBody = {
    CheckIn: formattedCheckInDate,
    CheckOut: formattedCheckOutDate,
    HotelCodes: hotelCodes.toString(),
    GuestNationality: "IN",
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

  try {
    const response = await hotelApi.searchHotels(requestBody);
    const data = response.data; // ✅ ACTUAL API RESPONSE

    if (data.Status?.Code === 200) {
      const hotels = data.HotelResult ?? [];

      const hotelCodesForDetails = hotels
        .map((hotel: hotelTypes.HotelSearchItem) => hotel.HotelCode?.toString())
        .filter((code: string | undefined): code is string => Boolean(code));

      if (!isFetchCitysCalled.current && hotelCodesForDetails.length > 0) {
        isFetchCitysCalled.current = true;
        await fetchCitys(hotelCodesForDetails);
      }

      sessionStorage.setItem(
        "hotelSearchData",
        JSON.stringify({ hotelcityList: hotels })
      );
    } else if (data.Status?.Code === 201) {
      setLoader(false);
      await Swal.fire({
        title: "Error!",
        text: data.Status?.Description || "Something went wrong!",
        imageWidth: 75,
        imageHeight: 75,
        confirmButtonText: "OK",
      });
    }
  } catch (error) {
    console.error("Error fetching hotels:", error);
    setLoader(false);
  }
};


  const fetchCitys = async (hotelCodes: string[]) => {
  if (!Array.isArray(hotelCodes)) {
    console.error("Invalid hotel codes format - expected array");
    return;
  }

  const validCodes = hotelCodes
    .map((code) => code.toString())
    .filter((code): code is string => Boolean(code));

  if (validCodes.length === 0) {
    console.warn("No valid hotel codes to fetch details for");
    return;
  }

  const codesString = validCodes.join(",");

  try {
    const response = await hotelApi.getHotelDetails(codesString);
    const data = response.data; // ACTUAL API RESPONSE

    setLoader(false);

    if (data.Status?.Code === 200) {
      const hotelDetails = data.response?.HotelDetails ?? [];

      setHotelDetails(hotelDetails);

      sessionStorage.setItem(
        "hotelDetails",
        JSON.stringify(hotelDetails)
      );
    } else {
      await Swal.fire({
        title: "Error!",
        text: data.Status?.Description || "Something went wrong!",
        imageWidth: 75,
        imageHeight: 75,
        confirmButtonText: "OK",
      });
    }
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    setLoader(false);
  }
};

const handleSubmitForm = async (e: React.FormEvent) => {
  e.preventDefault();

  if (errorMessage) {
    console.warn("Form contains errors, submission stopped.");
    return;
  }

  setLoader(true);

  if (!selectedCityCode) {
    console.error("City code not selected!");
    setLoader(false);
    return;
  }

  try {
    const response = await hotelApi.getHotelCodes(selectedCityCode);
    const data: hotelTypes.HotelCodesResponse = response.data; //ACTUAL API RESPONSE

    if (data.Status?.Code === 200) {
      const hotels = data.Hotels ?? [];
      
      if (hotels.length > 0) {
        const codes = hotels.map((hotel: hotelTypes.HotelApiItem) => hotel.HotelCode);
        await fetchSearchApi(codes);
      } else {
        console.warn("No hotels found in response.");
        setLoader(false);
      }
    } else {
      await Swal.fire({
        title: "Error!",
        text: data.Status?.Description || "Something went wrong!",
        imageWidth: 75,
        imageHeight: 75,
        confirmButtonText: "OK",
      });
      setLoader(false);
    }
  } catch (error) {
    console.error("Error fetching hotels:", error);
    setLoader(false);
  }
};


  return {
    loader,
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
    handleSelection,
    handleChildAgeChange,
    handleApply,
    handleSubmitForm,
    fetchCompanies,
    fetchCities,
  };
};