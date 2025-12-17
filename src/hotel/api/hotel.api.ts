import { hotelAxios } from "@/libs/axios";

export const getHotelCodes = (city: string) =>
  hotelAxios.post("/sbtHotelCodesList", {
    CityCode: city,
    IsDetailedResponse: true,
  });

export const searchHotels = (payload: unknown) =>
  hotelAxios.post("/sbtHotelCodesSearch", payload);

export const getHotelDetails = (codes: string) =>
  hotelAxios.post("/sbtHotelDetails", {
    Hotelcodes: codes,
    Language: "EN",
  });

export const getCities = () =>
    hotelAxios.post("/getAllCities");
 