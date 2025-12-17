
// // src/hotel/utils/hotel.helpers.ts

// import { hotelTypes } from '@/index';

// export const mergeHotelData = (
//   hotelDetails: hotelTypes.Hotel[],
//   hotelcityList: any[],
//   hotelData: Record<string, any>
// ): hotelTypes.Hotel[] => {
//   return hotelDetails.map(hotel => {
//     const matchedHotelList = hotelcityList.find(item => item.HotelCode === hotel.HotelCode);
//     const matchedHotelData = hotelData[hotel.HotelCode] || {};
//     return { ...hotel, ...matchedHotelList, ...matchedHotelData };
//   });
// };

// // Allocates adults and children into rooms based on max limits
// export const allocateRooms = (
//   totalAdults: number,
//   totalChildren: number,
//   childrenAges: number[]
// ) => {
//   const rooms: any[] = [];
//   let remainingAdults = totalAdults;
//   let remainingChildren = totalChildren;
//   let remainingChildrenAges = [...childrenAges];

//   const maxAdultsPerRoom = 8;
//   const maxChildrenPerRoom = 4;

//   while (remainingAdults > 0 || remainingChildren > 0) {
//     const adultsInRoom = Math.min(remainingAdults, maxAdultsPerRoom);
//     const childrenInRoom = Math.min(remainingChildren, maxChildrenPerRoom);
//     const childrenAgesInRoom = remainingChildrenAges.slice(0, childrenInRoom);

//     rooms.push({
//       Adults: adultsInRoom,
//       Children: childrenInRoom,
//       ChildrenAges: childrenAgesInRoom.length ? childrenAgesInRoom : null,
//     });

//     remainingAdults -= adultsInRoom;
//     remainingChildren -= childrenInRoom;
//     remainingChildrenAges = remainingChildrenAges.slice(childrenInRoom);
//   }

//   return rooms;
// };






// src/hotel/utils/hotel.utils.ts

import { hotelTypes } from '@/index';

// ============================================================================
// DATA TRANSFORMATION UTILITIES
// ============================================================================

/**
 * Merges hotel details with city list and additional hotel data
 * @param hotelDetails - Base hotel details from API
 * @param hotelcityList - City-specific hotel list
 * @param hotelData - Additional hotel data keyed by HotelCode
 * @returns Merged hotel array
 */
export const mergeHotelData = (
  hotelDetails: hotelTypes.Hotel[],
  // hotelcityList: any[],
  hotelcityList: hotelTypes.HotelCityItem[],
  hotelData: Record<string, any>
): hotelTypes.Hotel[] => {
  return hotelDetails.map((hotel) => {
    const matchedHotelList = hotelcityList.find(
      (item) => item.HotelCode === hotel.HotelCode
    );
    const matchedHotelData = hotelData[hotel.HotelCode] || {};
    return { ...hotel, ...matchedHotelList, ...matchedHotelData };
  });
};

// ============================================================================
// ROOM ALLOCATION UTILITIES
// ============================================================================

interface RoomAllocation {
  Adults: number;
  Children: number;
  ChildrenAges: number[] | null;
}

/**
 * Allocates adults and children into rooms based on max capacity limits
 * @param totalAdults - Total number of adults
 * @param totalChildren - Total number of children
 * @param childrenAges - Array of children ages
 * @returns Array of room allocations
 */
export const allocateRooms = (
  totalAdults: number,
  totalChildren: number,
  childrenAges: number[]
): RoomAllocation[] => {
  const rooms: RoomAllocation[] = [];
  let remainingAdults = totalAdults;
  let remainingChildren = totalChildren;
  let remainingChildrenAges = [...childrenAges];

  const maxAdultsPerRoom = 8;
  const maxChildrenPerRoom = 4;

  while (remainingAdults > 0 || remainingChildren > 0) {
    const adultsInRoom = Math.min(remainingAdults, maxAdultsPerRoom);
    const childrenInRoom = Math.min(remainingChildren, maxChildrenPerRoom);
    const childrenAgesInRoom = remainingChildrenAges.slice(0, childrenInRoom);

    rooms.push({
      Adults: adultsInRoom,
      Children: childrenInRoom,
      ChildrenAges: childrenAgesInRoom.length ? childrenAgesInRoom : null,
    });

    remainingAdults -= adultsInRoom;
    remainingChildren -= childrenInRoom;
    remainingChildrenAges = remainingChildrenAges.slice(childrenInRoom);
  }

  return rooms;
};

// ============================================================================
// TEXT EXTRACTION UTILITIES
// ============================================================================

// ============================================================================
// TEXT EXTRACTION UTILITIES
// ============================================================================

/**
 * Extracts attraction information from hotel description
 * @param description - Hotel description string
 * @returns Extracted attraction or default message
 */
export const extractAttraction = (description?: string): string => {
  if (!description || typeof description !== 'string') {
    return 'No Location Available';
  }

  const match = description.match(/HeadLine\s*:\s*([^<]+)/);
  return match ? match[1].trim() : 'No Location Available';
};

// ============================================================================
// CANCELLATION POLICY UTILITIES
// ============================================================================

/**
 * Formats cancellation policies for display
 * @param policies - Array of cancellation policies
 * @returns Array of formatted policy strings
 */
export const formatCancelPolicies = (
  policies?: hotelTypes.CancellationPolicy[]
): string[] => {
  if (!Array.isArray(policies) || policies.length === 0) {
    return ['No cancellation policies available.'];
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return policies
    .filter((policy) => {
      const policyDate = new Date(
        policy.FromDate.split(' ')[0].split('-').reverse().join('-')
      );
      return policyDate >= today;
    })
    .map((policy) => {
      const formattedDate = policy.FromDate.split(' ')[0];
      
      if (policy.ChargeType === 'Fixed' && policy.CancellationCharge === 0) {
        return 'Free Cancellation till check-in';
      }
      
      if (policy.ChargeType === 'Fixed') {
        return `Booking will be cancelled from ${formattedDate} with a charge of ${policy.CancellationCharge}`;
      }
      
      if (policy.ChargeType === 'Percentage') {
        return `From ${formattedDate}, the cancellation charge is ${policy.CancellationCharge}%`;
      }
      
      return `Policy starts from ${formattedDate}`;
    });
};

// ============================================================================
// EMAIL VALIDATION UTILITIES
// ============================================================================

/**
 * Cleans and deduplicates email string
 * @param emailString - Comma-separated email string
 * @returns Cleaned email string
 */
export const cleanEmails = (emailString?: string): string => {
  if (!emailString) return '';
  
  const emails = emailString
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email);
  
  const uniqueEmails = [...new Set(emails)];
  return uniqueEmails.join(', ');
};

/**
 * Validates email format using regex
 * @param email - Email string to validate
 * @returns Boolean indicating if email is valid
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ============================================================================
// ROOM CALCULATION UTILITIES
// ============================================================================

/**
 * Calculates minimum required rooms based on adults and children
 * @param adults - Number of adults
 * @param children - Number of children
 * @returns Minimum number of rooms required
 */
// export const calculateRequiredRooms = (
//   adults: number,
//   children: number
// ): number => {
//   const roomsBasedOnAdults = Math.ceil(adults / 2);
//   const roomsBasedOnChildren = Math.ceil(children / 2);
//   const roomsBasedOnTotal = Math.ceil((adults + children) / 4);

//   return Math.max(roomsBasedOnAdults, roomsBasedOnChildren, roomsBasedOnTotal);
// };

export const getBasePrice = (room: hotelTypes.Room): number => {
  if (room.DayRates && room.DayRates.length > 0) {
    return room.DayRates.reduce(
      (sum, day) => sum + (day[0]?.BasePrice || 0),
      0
    );
  }
  return room.TotalFare - (room.TotalTax || 0);
};

/**
 * Gets the base price for the first day
 * @param room - Room object
 * @returns First day base price
 */
export const getFirstDayBasePrice = (room: hotelTypes.Room): number => {
  if (room.DayRates && room.DayRates.length > 0) {
    const firstDay = room.DayRates[0];
    if (Array.isArray(firstDay) && firstDay.length > 0) {
      return firstDay[0].BasePrice || 0;
    }
  }
  return 0;
};

/**
 * Flattens nested day rates array for easier processing
 * @param room - Room object
 * @returns Flattened array of day rates
 */
// export const getFlattenedDayRates = (room: hotelTypes.Room): hotelTypes.DayRate[] => {
//   if (!room.DayRates) return [];
  
//   return room.DayRates.map((dayArray) =>
//     Array.isArray(dayArray) && dayArray.length > 0 ? dayArray[0] : dayArray
//   );
// };


export const getFlattenedDayRates = (room: hotelTypes.Room): hotelTypes.DayRate[] => {
  if (!room.DayRates) return [];
  
  return room.DayRates.map((dayArray): hotelTypes.DayRate => {
    // If it's already a DayRate object, return it
    if (!Array.isArray(dayArray)) {
      return dayArray;
    }
    // If it's an array, return the first element or a default
    return dayArray.length > 0 ? dayArray[0] : { BasePrice: 0 };
  });
};

export const calculateRequiredRooms = (
  adults: number,
  children: number
): number => {
  // Each room can have:
  // - Max 2 adults AND
  // - Max 2 children AND
  // - Max 4 total people

  const roomsBasedOnAdults = Math.ceil(adults / 2);
  const roomsBasedOnChildren = Math.ceil(children / 2);
  const roomsBasedOnTotal = Math.ceil((adults + children) / 4);

  return Math.max(
    roomsBasedOnAdults,
    roomsBasedOnChildren,
    roomsBasedOnTotal
  );
};

export const parseCoordinates = (
  mapStr?: string
): { lat: number; lng: number } | null => {
  if (!mapStr || typeof mapStr !== 'string') return null;

  const cleaned = mapStr
    .trim()
    .replace(/\s*,\s*/g, '|')
    .replace(/\s+/g, '|');
  
  const parts = cleaned
    .split('|')
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length < 2) return null;

  const a = Number(parts[0]);
  const b = Number(parts[1]);

  if (
    Number.isFinite(a) &&
    Number.isFinite(b) &&
    Math.abs(a) <= 90 &&
    Math.abs(b) <= 180
  ) {
    return { lat: a, lng: b };
  }

  if (
    Number.isFinite(b) &&
    Number.isFinite(a) &&
    Math.abs(b) <= 90 &&
    Math.abs(a) <= 180
  ) {
    return { lat: b, lng: a };
  }

  return null;
};