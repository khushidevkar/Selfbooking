
// src/hooks/useHotelInitializer.ts
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { searchParamsUtils, hotelHooks } from "@/index";

export const useHotelInitializer = () => {
  const initializedRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Get functions from bootstrap hook
  const { initializeAndSearch, fetchCompanies, fetchCities } = hotelHooks.useHotelBootstrap();

  useEffect(() => {
    // Prevent double execution in React StrictMode
    if (initializedRef.current) return;
    initializedRef.current = true;

    const initialize = async () => {
      const params = new URLSearchParams(window.location.search);
      const rawData = params.get("taxivaxidata");
      console.log("Raw URL data:", rawData);

      if (!rawData) {
        await Swal.fire({
          icon: "error",
          title: "Missing Data",
          text: "No hotel search data found in URL",
          confirmButtonText: "Go Back"
        });
        navigate("/");
        setLoading(false);
        return;
      }

      try {
        // Step 1: Parse and normalize URL data
        setStep(1);
        const initialFormData = JSON.parse(decodeURIComponent(rawData));
        const normalized = searchParamsUtils.normalizeHotelSearchParams(initialFormData);

        // console.log("Normalized params:", normalized);

        // Store for later use
        sessionStorage.setItem("hotelData_header", JSON.stringify(normalized));

        // Step 2: Fetch companies and cities in parallel
        setStep(2);
        await Promise.all([
          fetchCompanies(),
          fetchCities()
        ]);

        // Step 3: Initialize state and search hotels (all-in-one)
        setStep(3);
        await initializeAndSearch(normalized);

        // Step 4: Done - navigate to results
        setStep(4);
        setLoading(false);
        navigate("/hotel-search");
        
      } catch (error: unknown) {
        // console.error("Initialization failed:", error);
        setLoading(false);

        let errorMessage = "Failed to load hotel data";

        if (error instanceof Error) {
          errorMessage = error.message;
        }

        await Swal.fire({
          icon: "error",
          title: "Initialization Failed",
          text: errorMessage,
          confirmButtonText: "Go Back",
        });

        navigate("/");
      }

    };

    initialize();
  }, [navigate, initializeAndSearch, fetchCompanies, fetchCities]);

  return { loading, step };
};