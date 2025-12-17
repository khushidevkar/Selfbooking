import axios from "axios";
import { ENV } from "@/config/env";

export const hotelAxios = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: { Origin: "*" },
  timeout: 20000,
});

export const coreAxios = axios.create({
  baseURL: ENV.CORE_BASE_URL,
  headers: { Origin: "*" },
  timeout: 20000,
});
