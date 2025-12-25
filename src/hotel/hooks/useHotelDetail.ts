// // src/hotel/hooks/useHotelDetail.ts

// import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Hotel, Room } from '../types/hotel';
// import { TaxivaxiData, DisplayRoom } from '../types/hotelDetail.types';

// interface UseHotelDetailProps {
//   hotel: Hotel;
//   taxivaxi?: TaxivaxiData;
//   fromBookNow?: boolean;
// }

// export const useHotelDetail = ({
//   hotel,
//   taxivaxi = {},
//   fromBookNow = false,
// }: UseHotelDetailProps) => {
//   const navigate = useNavigate();
//   const [showModal2, setShowModal2] = useState(false);
//   const [showModal3, setShowModal3] = useState(false);
//   const [showHeader, setShowHeader] = useState(false);
//   const [activeSection, setActiveSection] = useState('overview');
//   const [showRates, setShowRates] = useState(false);
//   const [showInfo, setShowInfo] = useState(true);

//   // References for sections
//   const overviewRef = useRef<HTMLElement>(null);
//   const roomsRef = useRef<HTMLElement>(null);
//   const locationRef = useRef<HTMLDivElement>(null);
//   const mapSectionRef = useRef<HTMLDivElement>(null);

//   // Get hotel rooms and filter them
//   const hotelRooms = hotel?.Rooms || [];

//   const filteredRooms = hotelRooms.filter((room) => {
//     const matchHotel =
//       Number(taxivaxi.hotel_code) === Number(hotel.HotelCode);
//     const matchMeal =
//       taxivaxi.meal_plan?.toLowerCase() === room.MealType?.toLowerCase();
//     const matchRoomName =
//       Array.isArray(room.Name) &&
//       room.Name.some((nm) =>
//         nm.toLowerCase().includes(taxivaxi.room_type_name?.toLowerCase() || '')
//       );
//     return matchHotel && matchMeal && matchRoomName;
//   });

//   const displayRoom: DisplayRoom | undefined = fromBookNow
//     ? hotel?.Rooms?.[0]
//     : filteredRooms[0];

//   // Handle scroll event
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       setShowHeader(scrollY > 200);

//       const sectionOffsets = {
//         overview: overviewRef.current?.offsetTop || 0,
//         rooms: roomsRef.current?.offsetTop || 0,
//         location: locationRef.current?.offsetTop || 0,
//       };

//       const scrollPosition = scrollY + 100;
//       let currentSection = 'overview';

//       for (const section in sectionOffsets) {
//         if (scrollPosition >= sectionOffsets[section]) {
//           currentSection = section;
//         }
//       }

//       setActiveSection(currentSection);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Smooth scrolling function
//   const scrollToSection = (section: string) => {
//     const refMap: Record<string, React.RefObject<any>> = {
//       overview: overviewRef,
//       rooms: roomsRef,
//       location: locationRef,
//     };

//     const sectionRef = refMap[section];
//     if (sectionRef?.current) {
//       window.scrollTo({
//         top: sectionRef.current.offsetTop - 80,
//         behavior: 'smooth',
//       });
//       setShowHeader(false);
//     }
//   };

//   const scrollToMap = () => {
//     mapSectionRef.current?.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start',
//     });
//   };

//   // const handleSelectRoom = (room: Room) => {
//   //   navigate('/HotelBooking', {
//   //     state: { selectedRoom: room, hotel: hotel },
//   //   });
//   // };


//   const handleSelectRoom = (room: Room) => {
//   // Ensure all required hotel data is included
//   const completeHotelData = {
//     ...hotel,
//     Address: hotel.Address || hotel.CityName || '', // Fallback to CityName if Address is missing
//     RateConditions: hotel.RateConditions || [], // Ensure RateConditions exists
//   };

//   // Ensure all required room data is included
//   const completeRoomData = {
//     ...room,
//     Name: room.Name || 'Standard Room', // Fallback if Name is missing
//     MealType: room.MealType || 'Room_Only', // Fallback if MealType is missing
//     Inclusion: room.Inclusion || '', // Ensure Inclusion exists
//     CancelPolicies: room.CancelPolicies || [], // Ensure CancelPolicies exists
//   };



//   console.log('=== NAVIGATING TO BOOKING ===');
//   console.log('Complete Hotel Data:', completeHotelData);
//   console.log('Complete Room Data:', completeRoomData);

//   navigate('/HotelBooking', {
//     state: { 
//       selectedRoom: completeRoomData, 
//       hotel: completeHotelData 
//     },
//   });
// };

//   const handleNavigateHome = () => {
//     navigate('/');
//   };

//   const handleNavigateSearch = () => {
//     navigate('/SearchHotel');
//   };

//   // Parse coordinates
//   const getMapCenter = (): { lat: number; lng: number } => {
//     if (!hotel.Map) return { lat: 0, lng: 0 };
//     const [lat, lng] = hotel.Map.split('|').map(Number);
//     return { lat, lng };
//   };

//   return {
//     // State
//     showModal2,
//     setShowModal2,
//     showModal3,
//     setShowModal3,
//     showHeader,
//     activeSection,
//     showRates,
//     setShowRates,
//     showInfo,
//     setShowInfo,

//     // Refs
//     overviewRef,
//     roomsRef,
//     locationRef,
//     mapSectionRef,

//     // Data
//     displayRoom,
//     filteredRooms,
//     hotelRooms,

//     // Functions
//     scrollToSection,
//     scrollToMap,
//     handleSelectRoom,
//     handleNavigateHome,
//     handleNavigateSearch,
//     getMapCenter,
//   };
// };


import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { hotelDetailsTypes, hotelTypes } from '@/index';

interface UseHotelDetailProps {
  hotel: hotelTypes.Hotel;
  taxivaxi?: hotelDetailsTypes.TaxivaxiData;
  fromBookNow?: boolean;
}

export const useHotelDetail = ({
  hotel,
  taxivaxi = {},
  fromBookNow = false,
}: UseHotelDetailProps) => {
  const navigate = useNavigate();

  // -------------------- State --------------------
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [activeSection, setActiveSection] =
    useState<hotelDetailsTypes.SectionKey>('overview');
  const [showRates, setShowRates] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  // -------------------- Refs --------------------
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const roomsRef = useRef<HTMLDivElement | null>(null);
  const locationRef = useRef<HTMLDivElement | null>(null);
  const mapSectionRef = useRef<HTMLDivElement | null>(null);

  // -------------------- Rooms Logic --------------------
  const hotelRooms = hotel?.Rooms || [];

  const filteredRooms = hotelRooms.filter((room) => {
    const matchHotel =
      Number(taxivaxi.hotel_code) === Number(hotel.HotelCode);

    const matchMeal =
      taxivaxi.meal_plan?.toLowerCase() ===
      room.MealType?.toLowerCase();

    const matchRoomName =
      Array.isArray(room.Name) &&
      room.Name.some((nm) =>
        nm
          .toLowerCase()
          .includes(taxivaxi.room_type_name?.toLowerCase() || '')
      );

    return matchHotel && matchMeal && matchRoomName;
  });

  const displayRoom: hotelDetailsTypes.DisplayRoom | undefined = fromBookNow
    ? hotelRooms[0]
    : filteredRooms[0];

  // -------------------- Scroll Spy --------------------
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowHeader(scrollY > 200);

      const sectionOffsets: Record<hotelDetailsTypes.SectionKey, number> = {
        overview: overviewRef.current?.offsetTop ?? 0,
        rooms: roomsRef.current?.offsetTop ?? 0,
        location: locationRef.current?.offsetTop ?? 0,
      };

      const scrollPosition = scrollY + 100;
      let current: hotelDetailsTypes.SectionKey = 'overview';

      (Object.keys(sectionOffsets) as hotelDetailsTypes.SectionKey[]).forEach(
        (section) => {
          if (scrollPosition >= sectionOffsets[section]) {
            current = section;
          }
        }
      );

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // -------------------- Scroll Helpers --------------------
  const scrollToSection = (section: hotelDetailsTypes.SectionKey) => {
    const refMap: Record<
      hotelDetailsTypes.SectionKey,
      React.RefObject<HTMLElement | null>
    > = {
      overview: overviewRef,
      rooms: roomsRef,
      location: locationRef,
    };

    const sectionRef = refMap[section];

    if (sectionRef.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop - 80,
        behavior: 'smooth',
      });
      setShowHeader(false);
    }
  };

  const scrollToMap = () => {
    mapSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // -------------------- Navigation --------------------
  const handleSelectRoom = (room: hotelTypes.Room) => {
    const completeHotelData = {
      ...hotel,
      Address: hotel.Address || hotel.CityName || '',
      RateConditions: hotel.RateConditions || [],
    };

    const completeRoomData = {
      ...room,
      Name: room.Name || 'Standard Room',
      MealType: room.MealType || 'Room_Only',
      Inclusion: room.Inclusion || '',
      CancelPolicies: room.CancelPolicies || [],
    };

    navigate('/HotelBooking', {
      state: {
        selectedRoom: completeRoomData,
        hotel: completeHotelData,
      },
    });
  };

  const handleNavigateHome = () => navigate('/');
  const handleNavigateSearch = () => navigate('/SearchHotel');

  // -------------------- Map --------------------
  const getMapCenter = (): { lat: number; lng: number } => {
    if (!hotel.Map) return { lat: 0, lng: 0 };
    const [lat, lng] = hotel.Map.split('|').map(Number);
    return { lat, lng };
  };

  // -------------------- Exposed API --------------------
  return {
    // State
    showModal2,
    setShowModal2,
    showModal3,
    setShowModal3,
    showHeader,
    activeSection,
    showRates,
    setShowRates,
    showInfo,
    setShowInfo,

    // Refs
    overviewRef,
    roomsRef,
    locationRef,
    mapSectionRef,

    // Data
    displayRoom,
    filteredRooms,
    hotelRooms,

    // Functions
    scrollToSection,
    scrollToMap,
    handleSelectRoom,
    handleNavigateHome,
    handleNavigateSearch,
    getMapCenter,
  };
};
