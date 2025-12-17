import { ui, icons } from "@/index";

interface CityDropdownProps {
  city: string;
  setCity: (val: string) => void;
  cities: any[];
  showDropdown2: boolean;
  setShowDropdown2: (val: boolean) => void;
  fetchCities: () => void;
  setSelectedCityCode: (code: string) => void;
  loading: boolean;
}

export const CityDropdown: React.FC<CityDropdownProps> = ({
  city,
  setCity,
  cities,
  showDropdown2,
  setShowDropdown2,
  fetchCities,
  setSelectedCityCode,
  loading
}) => {
  return (
//     <div className="bg-white rounded-sm h-12.5 w-full pl-3">
//       <div className="flex gap-2">
//         <h6 className="text-xs text-[#785ef7]">CITY OR AREA</h6>
//         <img
//           src="../img/downarrow.svg"
//           className="w-3 h-4 cursor-pointer"
//           alt="Dropdown"
//           onClick={() => {
//             if (!showDropdown2) fetchCities();
//             setShowDropdown2(!showDropdown2);
//           }}
//         />
//       </div>

//       <div className="text-sm font-normal w-full bg-transparent border-none outline-none
//  relative">
//         <input
//           type="text"
//           className="font-semibold w-full"
//           value={city}
//           placeholder="Search City"
//           onChange={(e) => {
//             setCity(e.target.value);
//             setShowDropdown2(true);
//           }}
//           onClick={() => {
//             fetchCities();
//             setShowDropdown2(true);
//           }}
//         />

//         {showDropdown2 && (
//           <ul className="absolute top-full left-0 w-full bg-white border shadow-md max-h-60 overflow-auto z-10">
//             {loading ? (
//               <li className="p-2 text-gray-500">Loading...</li>
//             ) : (
//               cities
//                 .filter((c) => {
//                   if (!city) return true;
//                   return (c?.name || "")
//                     .toLowerCase()
//                     .includes(city.toLowerCase());
//                 })
//                 .map((c) => (
//                   <li
//                     key={c.id}
//                     className="p-2 cursor-pointer hover:bg-gray-200"
//                     onClick={() => {
//                       setCity(`${c.name}, ${c.state_name}, ${c.country_name}`);
//                       setSelectedCityCode(c.tbo_city_code);
//                       setShowDropdown2(false);
//                     }}
//                   >
//                     <span className="font-semibold">{c.name}</span>,{" "}
//                     <span className="text-gray-500">{c.state_name}</span>,{" "}
//                     <span className="text-gray-400">{c.country_name}</span>
//                   </li>
//                 ))
//             )}
//           </ul>
//         )}
//       </div>
//     </div>

 <ui.FormField label="City or Area" icon={icons.MapPin}>
      <ui.Popover open={showDropdown2} onOpenChange={setShowDropdown2}>
        <ui.PopoverTrigger asChild>
          <ui.Button
            variant="outline"
            role="combobox"
            aria-expanded={showDropdown2}
            className="w-full justify-between h-11 bg-white hover:bg-gray-50 border-gray-200"
            onClick={() => {
              if (!showDropdown2) fetchCities();
              setShowDropdown2(true);
            }}
          >
            <span className="truncate font-semibold">
              {city || "Select city"}
            </span>
            <icons.ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </ui.Button>
        </ui.PopoverTrigger>
        <ui.PopoverContent className="w-87.5 p-0 border-0 0shadow-lg shadow-black/15" align="start">
          <ui.Command className="bg-white">
            <ui.CommandInput 
              placeholder="Search city..." 
              value={city}
              onValueChange={setCity}
            />
            <ui.CommandList className="custom-scrollbar">
              <ui.CommandEmpty>
                {loading ? "Loading..." : "No city found."}
              </ui.CommandEmpty>
              <ui.CommandGroup>
                {cities
                  .filter((c) => {
                    if (!city) return true;
                    return (c?.name || "")
                      .toLowerCase()
                      .includes(city.toLowerCase());
                  })
                  .map((c) => (
                    <ui.CommandItem
                      key={c.id}
                      value={`${c.name} ${c.state_name} ${c.country_name}`}
                      onSelect={() => {
                        setCity(`${c.name}, ${c.state_name}, ${c.country_name}`);
                        setSelectedCityCode(c.tbo_city_code);
                        setShowDropdown2(false);
                      }}
                      className=" cursor-pointer
    rounded-md
    px-3 py-2
    transition-colors
    text-sm

    hover:bg-[#785ef7]/5

    data-[selected=true]:bg-[#785ef7]/10
    data-[selected=true]:text-[#785ef7]

    data-[disabled=true]:opacity-50
    data-[disabled=true]:pointer-events-none
  "
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold">{c.name}</span>
                        <span className="text-xs text-gray-500">
                          {c.state_name}, {c.country_name}
                        </span>
                      </div>
                    </ui.CommandItem>
                  ))}
              </ui.CommandGroup>
            </ui.CommandList>
          </ui.Command>
        </ui.PopoverContent>
      </ui.Popover>
    </ui.FormField>
  );
};