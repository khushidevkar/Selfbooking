import { useState } from "react";
import { hotelTypes, ui,icons } from "@/index";

interface FilterSidebarProps {
  // filters: any;
  filters: hotelTypes.FilterState;
  allRatings: number[];
  allFacilities: string[];
  allMealTypes: string[];
  priceRange: { min: number; max: number };
  // handleFilterChange: (type: string, value: any) => void;
  handleFilterChange: (filterType: hotelTypes.FilterType, value: any) => void
  // handleSearchChange: (e: React.ChangeEvent<HTMLui.InputElement>) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mapCenter?: { lat: number; lng: number };
  onMapClick?: () => void;
}


export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  allRatings,
  allFacilities,
  allMealTypes,
  priceRange,
  handleFilterChange,
  handleSearchChange,
  mapCenter,
  onMapClick
}) => {

  const [facilitiesOpen, setFacilitiesOpen] = useState(true);
  return (
    

    <div className="hidden md:block w-1/3 p-4 sticky h-screen top-0 overflow-y-auto scrollbar-hide custom-scrollbar">
      {/* Map Preview ui.Card */}
      <ui.Card 
        className="mb-4 py-0 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border-2 border-[#785ef7]/20"
        onClick={onMapClick}
      >
        <div className="relative bg-linear-to-br from-[#785ef7]/10 to-[#644ed4]/10 h-40 flex items-center justify-center">
          <icons.MapPin className="w-12 h-12 text-red-700" />
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
            <ui.Button className="bg-white text-[#785ef7] hover:bg-gray-50 shadow-md font-semibold text-sm">
              EXPLORE ON MAP
            </ui.Button>
          </div>
        </div>
      </ui.Card>

      {/* Main Filters ui.Card */}
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

          {/* Price Range Filter */}
          <div className="space-y-3">
            <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <icons.IndianRupee className="w-4 h-4 text-[#785ef7]" />
              Price Range
            </ui.Label>
            <div className="bg-[#785ef7]/5 p-3 rounded-lg">
              <div className="flex justify-between mb-3">
                <span className="text-sm font-semibold text-[#785ef7]">
                  ₹{filters.priceRange[0].toFixed(0)}
                </span>
                <span className="text-sm font-semibold text-[#785ef7]">
                  ₹{filters.priceRange[1].toFixed(0)}
                </span>
              </div>
              <ui.Slider
                min={priceRange.min}
                max={priceRange.max}
                step={100}
                value={filters.priceRange}
                onValueChange={(value) => handleFilterChange("price", value)}
                className="[&_[role=slider]]:bg-[#785ef7] [&_[role=slider]]:border-[#785ef7]"
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">₹{priceRange.min}</span>
                <span className="text-xs text-gray-500">₹{priceRange.max}</span>
              </div>
            </div>
          </div>

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
              <ui.CollapsibleContent className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#785ef7] scrollbar-track-gray-100">
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

          {/* Clear Filters ui.Button */}
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

  )}