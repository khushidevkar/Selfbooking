export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  CORE_BASE_URL: import.meta.env.VITE_CORE_BASE_URL,
} as const;

if (!ENV.API_BASE_URL || !ENV.CORE_BASE_URL) {
  throw new Error("Missing environment variables");
}
