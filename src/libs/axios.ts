import axios from "axios";
import { ENV } from "@/config/env";

export const hotelAxios = axios.create({
  // baseURL: ENV.API_BASE_URL,
  baseURL: '/api/hotels',
  // baseURL: '/api/tbo_hotel',
  timeout: 20000,
});

export const coreAxios = axios.create({
  baseURL: ENV.CORE_BASE_URL,
  timeout: 20000,
});
