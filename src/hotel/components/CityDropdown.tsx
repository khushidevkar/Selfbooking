
import { ui, icons, searchHotelFormTypes } from "@/index";

export const CityDropdown: React.FC<searchHotelFormTypes.CityDropdownProps> = ({
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