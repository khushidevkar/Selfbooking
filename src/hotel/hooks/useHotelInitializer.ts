// src/hotel/hooks/useHotelInitializer.ts
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export const useHotelInitializer = () => {
//   const [loading, setLoading] = useState(true);
//   const [step, setStep] = useState('Initializing...');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const rawData = params.get('taxivaxidata');
    
//     if (rawData) {
//       try {
//         const initialFormData = JSON.parse(decodeURIComponent(rawData));
        
//         // Store in session storage
//         sessionStorage.setItem('hotelData_header', JSON.stringify(initialFormData));
        
//         setStep('Loading hotels...');
//         // Navigate to the main search page
//         navigate('/hotel-search');
//       } catch (error) {
//         console.error('Failed to parse initial data:', error);
//       }
//     }
    
//     setLoading(false);
//   }, [navigate]);

//   return { loading, step };
// };


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useHotelInitializer = () => {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<number>(1); // Step starts at 1
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      const params = new URLSearchParams(window.location.search);
      const rawData = params.get("taxivaxidata");

      if (rawData) {
        try {
          const initialFormData = JSON.parse(decodeURIComponent(rawData));

          // Store in session storage
          sessionStorage.setItem("hotelData_header", JSON.stringify(initialFormData));

          // Move to next step and navigate asynchronously
          setStep(2); // Example: step 2 = loading hotels
          // Small delay ensures React processes state update before navigation
          setTimeout(() => {
            navigate("/hotel-search");
          }, 0);
        } catch (error) {
          console.error("Failed to parse initial data:", error);
        }
      }

      setLoading(false); // Done initializing
    };

    initialize();
  }, [navigate]);

  return { loading, step };
};

