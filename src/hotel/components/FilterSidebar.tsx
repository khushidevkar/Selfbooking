
// import { useState, useMemo } from "react";
// import { ui, icons, filterTypes, hotelUtils } from "@/index";
// import { GoogleMap, Marker } from '@react-google-maps/api';
// import { useMapLoader } from '@/contexts/MapContext';

// export const FilterSidebar: React.FC<filterTypes.FilterSidebarProps> = ({
//   filters,
//   allRatings,
//   allFacilities,
//   allMealTypes,
//   priceRange,
//   handleFilterChange,
//   handleSearchChange,
//   mapCenter,
//   onMapClick,
//   hotels = []
// }) => {

//   const [facilitiesOpen, setFacilitiesOpen] = useState(true);
  
//   const { isLoaded, loadError } = useMapLoader();

//   // Calculate center from hotels or use provided mapCenter or default to Mumbai
//   const calculateCenter = () => {
//     // First priority: use provided mapCenter
//     if (mapCenter) return mapCenter;
    
//     // Second priority: calculate from first hotel with valid coordinates
//     if (hotels && hotels.length > 0) {
//       for (const hotel of hotels) {
//         const coords = hotelUtils.parseCoordinates(hotel?.Map);
//         if (coords) return coords;
//       }
//     }
    
//     // Fallback: Mumbai coordinates
//     return { lat: 19.0760, lng: 72.8777 };
//   };

//   const center = calculateCenter();

//   // Generate dynamic price buckets based on per-night prices
//   const { priceBuckets, minPrice, maxPrice } = useMemo(() => {
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
    
//     const getPercentile = (p: number) => {
//       const index = Math.floor(perNightPrices.length * p);
//       return perNightPrices[index] || 0;
//     };

//     const round = (n: number) => Math.round(n / 500) * 500;

//     const p20 = round(getPercentile(0.2));
//     const p40 = round(getPercentile(0.4));
//     const p60 = round(getPercentile(0.6));
//     const p80 = round(getPercentile(0.8));

//     const formatPrice = (price: number) => {
//       if (price >= 1000) return `₹${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}K`;
//       return `₹${price}`;
//     };

//     return {
//       priceBuckets: [
//         { label: 'Budget', range: `< ${formatPrice(p20)}`, min: min, max: p20 },
//         { label: 'Economy', range: `${formatPrice(p20)} - ${formatPrice(p40)}`, min: p20, max: p40 },
//         { label: 'Mid-Range', range: `${formatPrice(p40)} - ${formatPrice(p60)}`, min: p40, max: p60 },
//         { label: 'Premium', range: `${formatPrice(p60)} - ${formatPrice(p80)}`, min: p60, max: p80 },
//         { label: 'Luxury', range: `${formatPrice(p80)}+`, min: p80, max: max }
//       ],
//       minPrice: min,
//       maxPrice: max
//     };
//   }, [hotels]);

//   return (
//     <div className="hidden md:block bg-white rounded-lg w-1/3 p-4 sticky h-screen top-0 overflow-y-auto scrollbar-hide custom-scrollbar">
//       {/* Map Preview Card */}
//       <div className="mb-4">
//         <div
//           className="w-full bg-white shadow-lg rounded-lg border-2 border-[#785ef7]/20 cursor-pointer hover:shadow-xl hover:border-[#785ef7]/40 transition-all duration-300 overflow-hidden"
//           onClick={onMapClick}
//         >
//           <div className="relative">
//             {loadError ? (
//               <div className="w-full h-37.5 bg-linear-to-br from-[#785ef7]/10 to-[#644ed4]/10 flex items-center justify-center">
//                 <div className="text-center">
//                   <icons.MapPin className="w-12 h-12 text-red-500 mb-2" />
//                   <p className="text-xs text-gray-600">Map unavailable</p>
//                 </div>
//               </div>
//             ) : !isLoaded ? (
//               <div className="w-full h-37.5 bg-linear-to-br from-[#785ef7]/10 to-[#644ed4]/10 flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="w-8 h-8 border-4 border-[#785ef7] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
//                   <p className="text-xs text-gray-600 font-medium">Loading map...</p>
//                 </div>
//               </div>
//             ) : (
//               <GoogleMap
//                 mapContainerStyle={{
//                   width: "100%",
//                   height: "150px",
//                 }}
//                 center={center}
//                 zoom={13}
//                 options={{
//                   disableDefaultUI: true,
//                   zoomControl: false,
//                   scrollwheel: false,
//                   disableDoubleClickZoom: true,
//                   draggable: false,
//                   gestureHandling: "none",
//                   styles: [
//                     {
//                       featureType: "poi",
//                       elementType: "labels",
//                       stylers: [{ visibility: "off" }]
//                     }
//                   ]
//                 }}
//               >
//                 <Marker position={center} />
//               </GoogleMap>
//             )}
            
//             {/* Overlay Button */}
//             <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-10">
//               <button className="bg-white text-[#785ef7] hover:bg-gray-50 shadow-lg font-bold text-xs px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 border border-[#785ef7]/20 cursor-pointer">
//                 EXPLORE ON MAP
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Filters Card */}
//       <ui.Card className="border-2 border-[#785ef7]/20 pt-0 overflow-hidden gap-0">
//         <ui.CardHeader className="bg-linear-to-r from-[#785ef7] to-[#644ed4] text-white text-center">
//           <ui.CardTitle className="text-xl flex items-center gap-2 text-center">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
//             </svg>
//             Filters
//           </ui.CardTitle>
//         </ui.CardHeader>
//         <ui.CardContent className="p-4 space-y-5">
          
//           {/* Search Filter */}
//           <div className="space-y-2">
//             <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <icons.Search className="w-4 h-4 text-[#785ef7]" />
//               Search Hotels
//             </ui.Label>
//             <div className="relative">
//               <ui.Input
//                 type="text"
//                 placeholder="Search by name..."
//                 className="pl-10 border-gray-300 focus:border-[#785ef7] focus:ring-[#785ef7]"
//                 onChange={handleSearchChange}
//               />
//               <icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//             </div>
//           </div>

//           <div className="border-t border-gray-200 pt-4" />

//           {/* Price Range Filter - Hybrid */}
//           <div className="space-y-3">
//             <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <icons.IndianRupee className="w-4 h-4 text-[#785ef7]" />
//               Price Range (Per Night)
//             </ui.Label>
            
//             {/* Quick Select Chips */}
//             <div>
//               <p className="text-xs text-gray-600 mb-2 font-medium">Quick Select:</p>
//               <div className="flex flex-wrap gap-2">
//                 {priceBuckets.map((bucket) => (
//                   <button
//                     key={bucket.label}
//                     onClick={() => handleFilterChange("price", [bucket.min, bucket.max] as [number, number])}
//                     className="px-2 py-1 text-xs border-2 border-[#785ef7] text-[#785ef7] rounded-lg hover:bg-[#785ef7] hover:text-white transition-all duration-200 font-medium shadow-sm hover:shadow-md"
//                   >
//                     <div className="font-bold text-xs">{bucket.label}</div>
//                     <div className="text-[10px] opacity-80 whitespace-nowrap">{bucket.range}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Custom Input Fields */}
//             <div>
//               <p className="text-xs text-gray-600 mb-2 font-medium">Custom Range:</p>
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="text-xs text-gray-500 mb-1 block">Min/Night</label>
//                   <div className="relative">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
//                     <ui.Input
//                       type="number"
//                       value={filters.priceRange[0]}
//                       onChange={(e) => handleFilterChange("price", [Number(e.target.value), filters.priceRange[1]] as [number, number])}
//                       className="pl-7 text-sm border-[#785ef7] focus:ring-[#785ef7]"
//                       min={minPrice}
//                       max={filters.priceRange[1]}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-xs text-gray-500 mb-1 block">Max/Night</label>
//                   <div className="relative">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
//                     <ui.Input
//                       type="number"
//                       value={filters.priceRange[1]}
//                       onChange={(e) => handleFilterChange("price", [filters.priceRange[0], Number(e.target.value)] as [number, number])}
//                       className="pl-7 text-sm border-[#785ef7] focus:ring-[#785ef7]"
//                       min={filters.priceRange[0]}
//                       max={maxPrice}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Current Filter Display */}
//             <div className="text-center text-xs font-semibold text-white bg-linear-to-r from-[#785ef7] to-[#644ed4] p-2.5 rounded-lg shadow-sm">
//               ₹{filters.priceRange[0].toLocaleString('en-IN')} - ₹{filters.priceRange[1].toLocaleString('en-IN')}/night
//             </div>
//           </div>

//           <div className="border-t border-gray-200 pt-4" />

//           {/* Star Rating Filter */}
//           <div className="space-y-3">
//             <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <icons.Star className="w-4 h-4 text-[#785ef7]" />
//               Star Rating
//             </ui.Label>
//             <div className="space-y-2">
//               {allRatings.map((rating) => (
//                 <div key={rating} className="flex items-center space-x-2 p-2 rounded hover:bg-[#785ef7]/5 transition-colors">
//                   <ui.Checkbox
//                     id={`rating-${rating}`}
//                     checked={filters.selectedRatings.includes(rating)}
//                     onCheckedChange={() => handleFilterChange("rating", rating)}
//                     className="border-[#785ef7] data-[state=checked]:bg-[#785ef7] data-[state=checked]:border-[#785ef7]"
//                   />
//                   <ui.Label
//                     htmlFor={`rating-${rating}`}
//                     className="text-sm text-gray-700 cursor-pointer flex items-center gap-1 flex-1"
//                   >
//                     <span className="font-medium">{rating}</span>
//                     <icons.Star className="w-3 h-3 fill-[#785ef7] text-[#785ef7]" />
//                     {rating === 1 ? '' : <span className="text-gray-500">& above</span>}
//                   </ui.Label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="border-t border-gray-200 pt-4" />

//           {/* Facilities Filter */}
//           <ui.Collapsible open={facilitiesOpen} onOpenChange={setFacilitiesOpen}>
//             <div className="space-y-3">
//               <ui.CollapsibleTrigger className="w-full">
//                 <ui.Label className="text-sm font-semibold text-gray-700 flex items-center justify-between cursor-pointer hover:text-[#785ef7] transition-colors">
//                   <span className="flex items-center gap-2">
//                     <icons.Coffee className="w-4 h-4 text-[#785ef7]" />
//                     Facilities
//                   </span>
//                   {facilitiesOpen ? (
//                     <icons.ChevronUp className="w-4 h-4 text-[#785ef7]" />
//                   ) : (
//                     <icons.ChevronDown className="w-4 h-4 text-[#785ef7]" />
//                   )}
//                 </ui.Label>
//               </ui.CollapsibleTrigger>
//               <ui.CollapsibleContent className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#785ef7] scrollbar-track-gray-100 custom-scrollbar">
//                 {allFacilities.slice(0, 20).map((facility) => (
//                   <div key={facility} className="flex items-center space-x-2 p-2 rounded hover:bg-[#785ef7]/5 transition-colors">
//                     <ui.Checkbox
//                       id={`facility-${facility}`}
//                       checked={filters.selectedFacilities.includes(facility)}
//                       onCheckedChange={() => handleFilterChange("facility", facility)}
//                       className="border-[#785ef7] data-[state=checked]:bg-[#785ef7] data-[state=checked]:border-[#785ef7]"
//                     />
//                     <label
//                       htmlFor={`facility-${facility}`}
//                       className="text-sm text-gray-700 cursor-pointer flex-1 truncate"
//                     >
//                       {facility}
//                     </label>
//                   </div>
//                 ))}
//               </ui.CollapsibleContent>
//             </div>
//           </ui.Collapsible>

//           <div className="border-t border-gray-200 pt-4" />

//           {/* Meal Type Filter */}
//           <div className="space-y-2">
//             <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <icons.Coffee className="w-4 h-4 text-[#785ef7]" />
//               Meal Type
//             </ui.Label>
//             <ui.Select value={filters.mealType || ""} onValueChange={(value) => handleFilterChange("meal", value)}>
//               <ui.SelectTrigger className="border-gray-300 focus:border-[#785ef7] focus:ring-[#785ef7]">
//                 <ui.SelectValue placeholder="All Meal Types" />
//               </ui.SelectTrigger>
//               <ui.SelectContent>
//                 <ui.SelectItem value="all">All Meal Types</ui.SelectItem>
//                 {allMealTypes.map((type) => (
//                   <ui.SelectItem key={type} value={type}>
//                     {type}
//                   </ui.SelectItem>
//                 ))}
//               </ui.SelectContent>
//             </ui.Select>
//           </div>

//           <div className="border-t border-gray-200 pt-4" />

//           {/* Cancellation Filter */}
//           <div className="space-y-3">
//             <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <icons.RefreshCw className="w-4 h-4 text-[#785ef7]" />
//               Cancellation Policy
//             </ui.Label>
//             <ui.RadioGroup
//               value={
//                 filters.refundable === null
//                   ? "all"
//                   : filters.refundable
//                   ? "refundable"
//                   : "non-refundable"
//               }
//               onValueChange={(value) => {
//                 if (value === "all") handleFilterChange("refundable", null);
//                 else if (value === "refundable") handleFilterChange("refundable", true);
//                 else handleFilterChange("refundable", false);
//               }}
//               className="space-y-2 gap-0"
//             >
//               <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#785ef7]/5 transition-colors">
//                 <ui.RadioGroupItem value="all" id="refundable-all" className="border-[#785ef7] text-[#785ef7]" />
//                 <ui.Label htmlFor="refundable-all" className="text-sm cursor-pointer flex-1">
//                   All Options
//                 </ui.Label>
//               </div>
//               <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#785ef7]/5 transition-colors">
//                 <ui.RadioGroupItem value="refundable" id="refundable-yes" className="border-[#785ef7] text-[#785ef7]" />
//                 <ui.Label htmlFor="refundable-yes" className="text-sm cursor-pointer flex-1">
//                   Free Cancellation
//                 </ui.Label>
//               </div>
//               <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#785ef7]/5 transition-colors">
//                 <ui.RadioGroupItem value="non-refundable" id="refundable-no" className="border-[#785ef7] text-[#785ef7]" />
//                 <ui.Label htmlFor="refundable-no" className="text-sm cursor-pointer flex-1">
//                   Non-Refundable
//                 </ui.Label>
//               </div>
//             </ui.RadioGroup>
//           </div>

//           {/* Clear Filters Button */}
//           <div className="pt-4">
//             <ui.Button 
//               variant="outline" 
//               className="w-full border-[#785ef7] text-[#785ef7] hover:bg-[#785ef7] hover:text-white transition-colors"
//               onClick={() => {
//                 // Reset all filters - you'll need to implement this in parent
//                 console.log('Clear all filters');
//               }}
//             >
//               Clear All Filters
//             </ui.Button>
//           </div>
//         </ui.CardContent>
//       </ui.Card>
//     </div>
//   );
// };




import { useState } from "react";
import { ui, icons, filterTypes, hotelUtils } from "@/index";
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useMapLoader } from '@/contexts/MapContext';
import { PriceFilter } from './PriceFilter'; // Import the separate component

export const FilterSidebar: React.FC<filterTypes.FilterSidebarProps> = ({
  filters,
  allRatings,
  allFacilities,
  allMealTypes,
  handleFilterChange,
  handleSearchChange,
  mapCenter,
  onMapClick,
  hotels = []
}) => {

  const [facilitiesOpen, setFacilitiesOpen] = useState(true);
  
  const { isLoaded, loadError } = useMapLoader();

  // Calculate center from hotels or use provided mapCenter or default to Mumbai
  const calculateCenter = () => {
    if (mapCenter) return mapCenter;
    
    if (hotels && hotels.length > 0) {
      for (const hotel of hotels) {
        const coords = hotelUtils.parseCoordinates(hotel?.Map);
        if (coords) return coords;
      }
    }
    
    return { lat: 19.0760, lng: 72.8777 };
  };

  const center = calculateCenter();

  return (
    <div className="hidden md:block bg-white rounded-lg w-1/3 p-4 sticky h-screen top-0 overflow-y-auto scrollbar-hide custom-scrollbar">
      {/* Map Preview Card */}
      <div className="mb-4">
        <div
          className="w-full bg-white shadow-lg rounded-lg border-2 border-[#785ef7]/20 cursor-pointer hover:shadow-xl hover:border-[#785ef7]/40 transition-all duration-300 overflow-hidden"
          onClick={onMapClick}
        >
          <div className="relative">
            {loadError ? (
              <div className="w-full h-37.5 bg-linear-to-br from-[#785ef7]/10 to-[#644ed4]/10 flex items-center justify-center">
                <div className="text-center">
                  <icons.MapPin className="w-12 h-12 text-red-500 mb-2" />
                  <p className="text-xs text-gray-600">Map unavailable</p>
                </div>
              </div>
            ) : !isLoaded ? (
              <div className="w-full h-37.5 bg-linear-to-br from-[#785ef7]/10 to-[#644ed4]/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-[#785ef7] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-xs text-gray-600 font-medium">Loading map...</p>
                </div>
              </div>
            ) : (
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "150px",
                }}
                center={center}
                zoom={13}
                options={{
                  disableDefaultUI: true,
                  zoomControl: false,
                  scrollwheel: false,
                  disableDoubleClickZoom: true,
                  draggable: false,
                  gestureHandling: "none",
                  styles: [
                    {
                      featureType: "poi",
                      elementType: "labels",
                      stylers: [{ visibility: "off" }]
                    }
                  ]
                }}
              >
                <Marker position={center} />
              </GoogleMap>
            )}
            
            {/* Overlay Button */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-10">
              <button className="bg-white text-[#785ef7] hover:bg-gray-50 shadow-lg font-bold text-xs px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 border border-[#785ef7]/20 cursor-pointer">
                EXPLORE ON MAP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Filters Card */}
      <ui.Card className="border-2 border-[#785ef7]/20 pt-0 overflow-hidden gap-0">
        <ui.CardHeader className="bg-linear-to-r from-[#785ef7] to-[#644ed4] text-white text-center">
          <ui.CardTitle className="text-xl flex items-center gap-2 text-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filters
          </ui.CardTitle>
        </ui.CardHeader>
        <ui.CardContent className="p-4 space-y-5">
          
          {/* Search Filter */}
          <div className="space-y-2">
            <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <icons.Search className="w-4 h-4 text-[#785ef7]" />
              Search Hotels
            </ui.Label>
            <div className="relative">
              <ui.Input
                type="text"
                placeholder="Search by name..."
                className="pl-10 border-gray-300 focus:border-[#785ef7] focus:ring-[#785ef7]"
                onChange={handleSearchChange}
              />
              <icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4" />

          {/* Price Range Filter - Using Separate Component */}
          <PriceFilter
            hotels={hotels}
            priceRange={filters.priceRange}
            onPriceChange={(range) => handleFilterChange("price", range)}
          />

          <div className="border-t border-gray-200 pt-4" />

          {/* Star Rating Filter */}
          <div className="space-y-3">
            <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <icons.Star className="w-4 h-4 text-[#785ef7]" />
              Star Rating
            </ui.Label>
            <div className="space-y-2">
              {allRatings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2 p-2 rounded hover:bg-[#785ef7]/5 transition-colors">
                  <ui.Checkbox
                    id={`rating-${rating}`}
                    checked={filters.selectedRatings.includes(rating)}
                    onCheckedChange={() => handleFilterChange("rating", rating)}
                    className="border-[#785ef7] data-[state=checked]:bg-[#785ef7] data-[state=checked]:border-[#785ef7]"
                  />
                  <ui.Label
                    htmlFor={`rating-${rating}`}
                    className="text-sm text-gray-700 cursor-pointer flex items-center gap-1 flex-1"
                  >
                    <span className="font-medium">{rating}</span>
                    <icons.Star className="w-3 h-3 fill-[#785ef7] text-[#785ef7]" />
                    {rating === 1 ? '' : <span className="text-gray-500">& above</span>}
                  </ui.Label>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4" />

          {/* Facilities Filter */}
          <ui.Collapsible open={facilitiesOpen} onOpenChange={setFacilitiesOpen}>
            <div className="space-y-3">
              <ui.CollapsibleTrigger className="w-full">
                <ui.Label className="text-sm font-semibold text-gray-700 flex items-center justify-between cursor-pointer hover:text-[#785ef7] transition-colors">
                  <span className="flex items-center gap-2">
                    <icons.Coffee className="w-4 h-4 text-[#785ef7]" />
                    Facilities
                  </span>
                  {facilitiesOpen ? (
                    <icons.ChevronUp className="w-4 h-4 text-[#785ef7]" />
                  ) : (
                    <icons.ChevronDown className="w-4 h-4 text-[#785ef7]" />
                  )}
                </ui.Label>
              </ui.CollapsibleTrigger>
              <ui.CollapsibleContent className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#785ef7] scrollbar-track-gray-100 custom-scrollbar">
                {allFacilities.slice(0, 20).map((facility) => (
                  <div key={facility} className="flex items-center space-x-2 p-2 rounded hover:bg-[#785ef7]/5 transition-colors">
                    <ui.Checkbox
                      id={`facility-${facility}`}
                      checked={filters.selectedFacilities.includes(facility)}
                      onCheckedChange={() => handleFilterChange("facility", facility)}
                      className="border-[#785ef7] data-[state=checked]:bg-[#785ef7] data-[state=checked]:border-[#785ef7]"
                    />
                    <label
                      htmlFor={`facility-${facility}`}
                      className="text-sm text-gray-700 cursor-pointer flex-1 truncate"
                    >
                      {facility}
                    </label>
                  </div>
                ))}
              </ui.CollapsibleContent>
            </div>
          </ui.Collapsible>

          <div className="border-t border-gray-200 pt-4" />

          {/* Meal Type Filter */}
          <div className="space-y-2">
            <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <icons.Coffee className="w-4 h-4 text-[#785ef7]" />
              Meal Type
            </ui.Label>
            <ui.Select value={filters.mealType || ""} onValueChange={(value) => handleFilterChange("meal", value)}>
              <ui.SelectTrigger className="border-gray-300 focus:border-[#785ef7] focus:ring-[#785ef7]">
                <ui.SelectValue placeholder="All Meal Types" />
              </ui.SelectTrigger>
              <ui.SelectContent>
                <ui.SelectItem value="all">All Meal Types</ui.SelectItem>
                {allMealTypes.map((type) => (
                  <ui.SelectItem key={type} value={type}>
                    {type}
                  </ui.SelectItem>
                ))}
              </ui.SelectContent>
            </ui.Select>
          </div>

          <div className="border-t border-gray-200 pt-4" />

          {/* Cancellation Filter */}
          <div className="space-y-3">
            <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <icons.RefreshCw className="w-4 h-4 text-[#785ef7]" />
              Cancellation Policy
            </ui.Label>
            <ui.RadioGroup
              value={
                filters.refundable === null
                  ? "all"
                  : filters.refundable
                  ? "refundable"
                  : "non-refundable"
              }
              onValueChange={(value) => {
                if (value === "all") handleFilterChange("refundable", null);
                else if (value === "refundable") handleFilterChange("refundable", true);
                else handleFilterChange("refundable", false);
              }}
              className="space-y-2 gap-0"
            >
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#785ef7]/5 transition-colors">
                <ui.RadioGroupItem value="all" id="refundable-all" className="border-[#785ef7] text-[#785ef7]" />
                <ui.Label htmlFor="refundable-all" className="text-sm cursor-pointer flex-1">
                  All Options
                </ui.Label>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#785ef7]/5 transition-colors">
                <ui.RadioGroupItem value="refundable" id="refundable-yes" className="border-[#785ef7] text-[#785ef7]" />
                <ui.Label htmlFor="refundable-yes" className="text-sm cursor-pointer flex-1">
                  Free Cancellation
                </ui.Label>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#785ef7]/5 transition-colors">
                <ui.RadioGroupItem value="non-refundable" id="refundable-no" className="border-[#785ef7] text-[#785ef7]" />
                <ui.Label htmlFor="refundable-no" className="text-sm cursor-pointer flex-1">
                  Non-Refundable
                </ui.Label>
              </div>
            </ui.RadioGroup>
          </div>

          {/* Clear Filters Button */}
          <div className="pt-4">
            <ui.Button 
              variant="outline" 
              className="w-full border-[#785ef7] text-[#785ef7] hover:bg-[#785ef7] hover:text-white transition-colors"
              onClick={() => {
                // Reset all filters - you'll need to implement this in parent
                console.log('Clear all filters');
              }}
            >
              Clear All Filters
            </ui.Button>
          </div>
        </ui.CardContent>
      </ui.Card>
    </div>
  );
};