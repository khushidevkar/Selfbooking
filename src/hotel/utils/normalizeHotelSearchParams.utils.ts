// utils/normalizeHotelSearchParams.ts

import { hotelTypes } from '@/index';

export function normalizeHotelSearchParams(
  raw: hotelTypes.ExternalHotelSearchPayload
): hotelTypes.HotelSearchParams {
  return {
    checkIn: raw.checkIn || raw.checkindate || '',
    checkOut: raw.checkOut || raw.checkoutdate || '',

    Rooms: Number(raw.Rooms ?? raw.room_count ?? 1),
    Adults: Number(raw.Adults ?? raw.PassengerADT ?? 1),
    Children: Number(raw.Children ?? raw.Passengerchild ?? 0),

    ChildAge:
      Array.isArray(raw.ChildAge)
        ? raw.ChildAge
        : raw.Passengerchildage && raw.Passengerchildage !== 'null'
        ? raw.Passengerchildage
            .split(',')
            .map((a) => Number(a))
            .filter(Number.isFinite)
        : [],

    CityCode: raw.CityCode ?? raw.city,
    city_name: raw.city_name || '',

    corporate_name: raw.corporate_name ?? null,
    payment: raw.payment ? Number(raw.payment) : undefined,
    admin_id: raw.admin_id,
    booking_id: raw.booking_id,
    booknow: raw.booknow,
    spoc_name: raw.spoc_name,
    approver1: raw.approver1_email,
    approver2: raw.approver2_email,
  };
}
