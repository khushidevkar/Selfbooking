// import { useState, useMemo } from "react";
// import { IndianRupee } from "lucide-react";

// // Mock UI components
// const Label = ({ children, className = "" }: any) => <label className={className}>{children}</label>;
// const Input = ({ ...props }: any) => <input {...props} className={`border-2 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#785ef7] ${props.className}`} />;

// interface PriceBucket {
//   label: string;
//   range: string;
//   min: number;
//   max: number;
// }

// interface PriceFilterProps {
//   hotels: any[];
//   priceRange: [number, number];
//   onPriceChange: (range: [number, number]) => void;
// }

// export default function PriceFilter({ hotels, priceRange, onPriceChange }: PriceFilterProps) {
  
//   // Calculate per-night prices and generate dynamic buckets
//   const { priceBuckets, minPrice, maxPrice } = useMemo(() => {
//     // Extract per-night prices from all hotels
//     const perNightPrices = hotels
//       .map(hotel => {
//         const lowestFareRoom = hotel.Rooms?.[0];
//         const numberOfNights = lowestFareRoom?.DayRates?.[0]?.length ?? 1;
//         const totalFare = lowestFareRoom?.TotalFare ?? 0;
//         return totalFare / numberOfNights;
//       })
//       .filter(price => price > 0)
//       .sort((a, b) => a - b);

//     if (perNightPrices.length === 0) {
//       // Fallback if no hotels
//       return {
//         priceBuckets: [
//           { label: 'Budget', range: '< ₹3K', min: 0, max: 3000 },
//           { label: 'Economy', range: '₹3K - ₹6K', min: 3000, max: 6000 },
//           { label: 'Mid-Range', range: '₹6K - ₹12K', min: 6000, max: 12000 },
//           { label: 'Premium', range: '₹12K - ₹25K', min: 12000, max: 25000 },
//           { label: 'Luxury', range: '₹25K+', min: 25000, max: 100000 }
//         ],
//         minPrice: 0,
//         maxPrice: 100000
//       };
//     }

//     const min = Math.floor(perNightPrices[0] / 100) * 100;
//     const max = Math.ceil(perNightPrices[perNightPrices.length - 1] / 100) * 100;
    
//     // Calculate percentiles
//     const getPercentile = (p: number) => {
//       const index = Math.floor(perNightPrices.length * p);
//       return perNightPrices[index] || 0;
//     };

//     // Round to nearest 500 for cleaner buckets
//     const round = (n: number) => Math.round(n / 500) * 500;

//     const p20 = round(getPercentile(0.2));
//     const p40 = round(getPercentile(0.4));
//     const p60 = round(getPercentile(0.6));
//     const p80 = round(getPercentile(0.8));

//     // Format price for display
//     const formatPrice = (price: number) => {
//       if (price >= 1000) return `₹${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}K`;
//       return `₹${price}`;
//     };

//     const buckets: PriceBucket[] = [
//       { 
//         label: 'Budget', 
//         range: `< ${formatPrice(p20)}/night`, 
//         min: min, 
//         max: p20 
//       },
//       { 
//         label: 'Economy', 
//         range: `${formatPrice(p20)} - ${formatPrice(p40)}/night`, 
//         min: p20, 
//         max: p40 
//       },
//       { 
//         label: 'Mid-Range', 
//         range: `${formatPrice(p40)} - ${formatPrice(p60)}/night`, 
//         min: p40, 
//         max: p60 
//       },
//       { 
//         label: 'Premium', 
//         range: `${formatPrice(p60)} - ${formatPrice(p80)}/night`, 
//         min: p60, 
//         max: p80 
//       },
//       { 
//         label: 'Luxury', 
//         range: `${formatPrice(p80)}+/night`, 
//         min: p80, 
//         max: max 
//       }
//     ];

//     return {
//       priceBuckets: buckets,
//       minPrice: min,
//       maxPrice: max
//     };
//   }, [hotels]);

//   const [minInput, setMinInput] = useState(priceRange[0]);
//   const [maxInput, setMaxInput] = useState(priceRange[1]);

//   // Apply filter
//   const handleApply = () => {
//     onPriceChange([minInput, maxInput]);
//   };

//   // Quick select bucket
//   const handleBucketClick = (bucket: PriceBucket) => {
//     setMinInput(bucket.min);
//     setMaxInput(bucket.max);
//     onPriceChange([bucket.min, bucket.max]);
//   };

//   return (
//     <div className="space-y-4 max-w-2xl mx-auto p-6 bg-white rounded-lg border-2 border-[#785ef7]/20">
//       <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//         <IndianRupee className="w-4 h-4 text-[#785ef7]" />
//         Price Range (Per Night)
//       </Label>
      
//       {/* Quick Select Chips */}
//       <div>
//         <p className="text-xs text-gray-600 mb-2 font-medium">Quick Select:</p>
//         <div className="flex flex-wrap gap-2">
//           {priceBuckets.map((bucket) => (
//             <button
//               key={bucket.label}
//               onClick={() => handleBucketClick(bucket)}
//               className="px-4 py-2 text-sm border-2 border-[#785ef7] text-[#785ef7] rounded-full hover:bg-[#785ef7] hover:text-white transition-all duration-200 font-medium shadow-sm hover:shadow-md"
//             >
//               <div className="font-bold">{bucket.label}</div>
//               <div className="text-xs opacity-80">{bucket.range}</div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Custom Input Fields */}
//       <div>
//         <p className="text-xs text-gray-600 mb-2 font-medium">Or Set Custom Range:</p>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="text-xs text-gray-600 mb-1 block">Min Price/Night</label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
//               <Input
//                 type="number"
//                 value={minInput}
//                 onChange={(e: any) => setMinInput(Number(e.target.value))}
//                 onBlur={handleApply}
//                 min={minPrice}
//                 max={maxInput}
//                 className="pl-7 border-[#785ef7]"
//                 placeholder="Min"
//               />
//             </div>
//           </div>
//           <div>
//             <label className="text-xs text-gray-600 mb-1 block">Max Price/Night</label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
//               <Input
//                 type="number"
//                 value={maxInput}
//                 onChange={(e: any) => setMaxInput(Number(e.target.value))}
//                 onBlur={handleApply}
//                 min={minInput}
//                 max={maxPrice}
//                 className="pl-7 border-[#785ef7]"
//                 placeholder="Max"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Current Filter Display */}
//       <div className="text-center text-sm font-semibold text-white bg-gradient-to-r from-[#785ef7] to-[#644ed4] p-3 rounded-lg shadow-md">
//         Showing hotels: ₹{minInput.toLocaleString('en-IN')} - ₹{maxInput.toLocaleString('en-IN')} per night
//       </div>

//       {/* Info Note */}
//       <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded text-sm">
//         <p className="text-blue-900 font-medium">💡 How It Works:</p>
//         <ul className="mt-2 space-y-1 text-blue-800 text-xs">
//           <li>• <strong>Quick Select:</strong> Click a category for instant filtering</li>
//           <li>• <strong>Custom Range:</strong> Type exact amounts for precise search</li>
//           <li>• <strong>Per Night Basis:</strong> All prices shown are per night rates</li>
//           <li>• <strong>Dynamic Buckets:</strong> Categories adapt to available hotels</li>
//         </ul>
//       </div>

//       {/* Statistics */}
//       <div className="grid grid-cols-5 gap-2 pt-4 border-t">
//         {priceBuckets.map((bucket) => {
//           const hotelsInBucket = hotels.filter(hotel => {
//             const lowestFareRoom = hotel.Rooms?.[0];
//             const numberOfNights = lowestFareRoom?.DayRates?.[0]?.length ?? 1;
//             const perNight = (lowestFareRoom?.TotalFare ?? 0) / numberOfNights;
//             return perNight >= bucket.min && perNight <= bucket.max;
//           }).length;
          
//           return (
//             <div key={bucket.label} className="text-center p-2 bg-gray-50 rounded">
//               <p className="text-xs font-bold text-[#785ef7]">{bucket.label}</p>
//               <p className="text-lg font-bold text-gray-800">{hotelsInBucket}</p>
//               <p className="text-xs text-gray-500">hotels</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // Example Usage Component
// export function ExampleUsage() {
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  
//   // Mock hotel data (replace with your actual data)
//   const mockHotels = [
//     { 
//       Rooms: [{ 
//         TotalFare: 6000, 
//         DayRates: [[{ BasePrice: 2000 }]] // 3 nights
//       }] 
//     },
//     { 
//       Rooms: [{ 
//         TotalFare: 4000, 
//         DayRates: [[{ BasePrice: 2000 }]] // 2 nights
//       }] 
//     },
//     // Add more mock hotels...
//   ];

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
//         Hybrid Price Filter - Per Night Basis
//       </h1>
      
//       <PriceFilter 
//         hotels={mockHotels}
//         priceRange={priceRange}
//         onPriceChange={setPriceRange}
//       />

//       <div className="mt-8 text-center text-gray-600">
//         <p>Current Filter: ₹{priceRange[0]} - ₹{priceRange[1]} per night</p>
//       </div>
//     </div>
//   );
// }



import { useMemo } from "react";
import { ui, icons } from "@/index";

interface PriceBucket {
  label: string;
  range: string;
  min: number;
  max: number;
}

interface PriceFilterProps {
  hotels: any[];
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  hotels,
  priceRange,
  onPriceChange
}) => {
  
  // Generate dynamic price buckets based on per-night prices
  const { priceBuckets, minPrice, maxPrice } = useMemo(() => {
    const perNightPrices = hotels
      .map(hotel => {
        const lowestFareRoom = hotel.Rooms?.[0];
        const numberOfNights = lowestFareRoom?.DayRates?.[0]?.length ?? 1;
        const totalFare = lowestFareRoom?.TotalFare ?? 0;
        return totalFare / numberOfNights;
      })
      .filter(price => price > 0)
      .sort((a, b) => a - b);

    if (perNightPrices.length === 0) {
      return {
        priceBuckets: [
          { label: 'Budget', range: '< ₹3K', min: 0, max: 3000 },
          { label: 'Economy', range: '₹3K - ₹6K', min: 3000, max: 6000 },
          { label: 'Mid-Range', range: '₹6K - ₹12K', min: 6000, max: 12000 },
          { label: 'Premium', range: '₹12K - ₹25K', min: 12000, max: 25000 },
          { label: 'Luxury', range: '₹25K+', min: 25000, max: 100000 }
        ],
        minPrice: 0,
        maxPrice: 100000
      };
    }

    const min = Math.floor(perNightPrices[0] / 100) * 100;
    const max = Math.ceil(perNightPrices[perNightPrices.length - 1] / 100) * 100;
    
    const getPercentile = (p: number) => {
      const index = Math.floor(perNightPrices.length * p);
      return perNightPrices[index] || 0;
    };

    const round = (n: number) => Math.round(n / 500) * 500;

    const p20 = round(getPercentile(0.2));
    const p40 = round(getPercentile(0.4));
    const p60 = round(getPercentile(0.6));
    const p80 = round(getPercentile(0.8));

    const formatPrice = (price: number) => {
      if (price >= 1000) return `₹${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}K`;
      return `₹${price}`;
    };

    return {
      priceBuckets: [
        { label: 'Budget', range: `< ${formatPrice(p20)}`, min: min, max: p20 },
        { label: 'Economy', range: `${formatPrice(p20)} - ${formatPrice(p40)}`, min: p20, max: p40 },
        { label: 'Mid-Range', range: `${formatPrice(p40)} - ${formatPrice(p60)}`, min: p40, max: p60 },
        { label: 'Premium', range: `${formatPrice(p60)} - ${formatPrice(p80)}`, min: p60, max: p80 },
        { label: 'Luxury', range: `${formatPrice(p80)}+`, min: p80, max: max }
      ],
      minPrice: min,
      maxPrice: max
    };
  }, [hotels]);

  return (
    <div className="space-y-3">
      <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <icons.IndianRupee className="w-4 h-4 text-[#785ef7]" />
        Price Range (Per Night)
      </ui.Label>
      
      {/* Quick Select Chips */}
      <div>
        <p className="text-xs text-gray-600 mb-2 font-medium">Quick Select:</p>
        <div className="flex flex-wrap gap-2">
          {priceBuckets.map((bucket) => (
            <button
              key={bucket.label}
              onClick={() => onPriceChange([bucket.min, bucket.max])}
              className="px-2 py-1 text-xs border-2 border-[#785ef7] text-[#785ef7] rounded-lg hover:bg-[#785ef7] hover:text-white transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              <div className="font-bold text-xs">{bucket.label}</div>
              <div className="text-[10px] opacity-80 whitespace-nowrap">{bucket.range}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Input Fields */}
      <div>
        <p className="text-xs text-gray-600 mb-2 font-medium">Custom Range:</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Min/Night</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
              <ui.Input
                type="number"
                value={priceRange[0]}
                onChange={(e) => onPriceChange([Number(e.target.value), priceRange[1]])}
                className="pl-7 text-sm border-[#785ef7] focus:ring-[#785ef7]"
                min={minPrice}
                max={priceRange[1]}
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Max/Night</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
              <ui.Input
                type="number"
                value={priceRange[1]}
                onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
                className="pl-7 text-sm border-[#785ef7] focus:ring-[#785ef7]"
                min={priceRange[0]}
                max={maxPrice}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Current Filter Display */}
      <div className="text-center text-xs font-semibold text-white bg-gradient-to-r from-[#785ef7] to-[#644ed4] p-2.5 rounded-lg shadow-sm">
        ₹{priceRange[0].toLocaleString('en-IN')} - ₹{priceRange[1].toLocaleString('en-IN')}/night
      </div>
    </div>
  );
};