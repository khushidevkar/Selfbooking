import { useState } from "react";
import { hotelTypes, icons , ui } from "@/index";
interface RoomsGuestsSelectorProps {
  roomCount: number;
  roomadultCount: number;
  roomchildCount: number;
  childrenAges: number[];
  isDropdownOpen: boolean;
  setIsDropdownOpen: (val: boolean) => void;
  errorMessage: string;
  handleSelection: (type: hotelTypes.GuestType, value: number) => void;
  handleChildAgeChange: (index: number, age: number) => void;
  handleApply: () => void;
}

export const RoomsGuestsSelector: React.FC<RoomsGuestsSelectorProps> = ({
  roomCount,
  roomadultCount,
  roomchildCount,
  childrenAges,
  isDropdownOpen,
  setIsDropdownOpen,
  errorMessage,
  handleSelection,
  handleChildAgeChange,
  handleApply
}) => {
  const [selectSize, setSelectSize] = useState(1);
  const [adultSize, setAdultSize] = useState(1);
  const [childSize, setChildSize] = useState(1);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    // <div className="bg-white rounded-sm h-12.5 w-full pl-3">
    //   <div
    //     className="flex gap-2 cursor-pointer"
    //     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    //   >
    //     <h6 className="text-xs hotel-form-text-color">ROOMS & GUESTS</h6>
    //     <img
    //       src="../img/downarrow.svg"
    //       className="w-3 h-4"
    //       alt="Down Arrow"
    //     />
    //   </div>
      
    //   <p className="hotel-city-name-2 font-semibold whitespace-nowrap">
    //     {roomCount} Rooms, {roomadultCount} Adults, {roomchildCount} Childs
    //   </p>

    //   {isDropdownOpen && (
    //     <div className="absolute right-0 bg-white rounded-lg mt-1 p-3 z-10 shadow-lg w-100 max-h-125">
    //       {/* Rooms Selector */}
    //       <div className="mb-2 flex items-center justify-between">
    //         <h6 className="textsizes">Rooms</h6>
    //         <select
    //           className="border border-gray-300 px-3 py-1 focus:outline-none"
    //           value={roomCount}
    //           size={selectSize}
    //           onClick={() => setSelectSize(5)}
    //           onChange={(e) => {
    //             handleSelection("rooms", parseInt(e.target.value));
    //             setTimeout(() => setSelectSize(1), 100);
    //           }}
    //           onBlur={() => setSelectSize(1)}
    //         >
    //           {Array.from({ length: 21 }, (_, i) => i).map((num) => (
    //             <option key={num} value={num}>
    //               {num}
    //             </option>
    //           ))}
    //         </select>
    //       </div>

    //       {errorMessage && (
    //         <p className="text-red-500 text-xs px-2">{errorMessage}</p>
    //       )}

    //       {/* Adults Selector */}
    //       <div className="mb-2 flex items-center justify-between">
    //         <h6 className="textsizes">Adults</h6>
    //         <select
    //           className="border border-gray-300 px-3 py-1 focus:outline-none"
    //           value={roomadultCount}
    //           size={adultSize}
    //           onClick={() => setAdultSize(5)}
    //           onChange={(e) => {
    //             handleSelection("adults", parseInt(e.target.value));
    //             setTimeout(() => setAdultSize(1), 100);
    //           }}
    //           onBlur={() => setAdultSize(1)}
    //         >
    //           {Array.from({ length: 41 }, (_, i) => i).map((num) => (
    //             <option key={num} value={num}>
    //               {num}
    //             </option>
    //           ))}
    //         </select>
    //       </div>

    //       {/* Children Selector */}
    //       <div className="mb-2 flex items-center justify-between">
    //         <div>
    //           <h6 className="textsizes">Child</h6>
    //           <p className="text-xs">0-17 yrs</p>
    //         </div>
    //         <select
    //           className="border border-gray-300 px-3 py-1 focus:outline-none"
    //           value={roomchildCount}
    //           size={childSize}
    //           onClick={() => setChildSize(5)}
    //           onChange={(e) => {
    //             handleSelection("children", parseInt(e.target.value));
    //             setTimeout(() => setChildSize(1), 100);
    //           }}
    //           onBlur={() => setChildSize(1)}
    //         >
    //           {Array.from({ length: 41 }, (_, i) => i).map((num) => (
    //             <option key={num} value={num}>
    //               {num}
    //             </option>
    //           ))}
    //         </select>
    //       </div>

    //       <p className="textcolor">
    //         Please provide the correct number of children along with their ages for the best options and prices.
    //       </p>
    //       <hr className="my-4 border-gray-500" />

    //       {/* Children Ages */}
    //       {roomchildCount > 0 && (
    //         <div className="overflow-y-auto grid grid-cols-2 gap-4" style={{ maxHeight: "150px" }}>
    //           {childrenAges.map((age, index) => (
    //             <div key={index} className="mb-4 flex items-center gap-4 justify-between">
    //               <h6 className="textsizes">Child&nbsp;{index + 1}</h6>
    //               <select
    //                 className="border border-gray-300 rounded-sm py-1 px-2 w-full focus:outline-none text-xs"
    //                 value={age === 0 ? 0 : age || ""}
    //                 size={expandedIndex === index ? 5 : 1}
    //                 onClick={() => setExpandedIndex(index)}
    //                 onChange={(e) => {
    //                   handleChildAgeChange(index, parseInt(e.target.value));
    //                   setTimeout(() => setExpandedIndex(null), 100);
    //                 }}
    //                 onBlur={() => setExpandedIndex(null)}
    //               >
    //                 {Array.from({ length: 18 }, (_, i) => i).map((num) => (
    //                   <option key={num} value={num}>
    //                     {num === 0 ? "0" : `${num} Yrs`}
    //                   </option>
    //                 ))}
    //               </select>
    //             </div>
    //           ))}
    //         </div>
    //       )}

    //       <ui.Button
    //         className="search-ui.Buttonn item-center justify-between"
    //         style={{ marginLeft: "25%" }}
    //         onClick={handleApply}
    //       >
    //         Apply
    //       </ui.Button>
    //     </div>
    //   )}
    // </div>


     <ui.FormField label="Rooms & Guests" icon={icons.Users}>
      <ui.Popover open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <ui.PopoverTrigger asChild>
          <ui.Button
            variant="outline"
            className="w-full justify-between h-11 bg-white hover:bg-gray-50 border-gray-200"
          >
            <span className="truncate font-semibold">
              {roomCount} Room{roomCount !== 1 ? 's' : ''}, {roomadultCount} Adult{roomadultCount !== 1 ? 's' : ''}, {roomchildCount} Child{roomchildCount !== 1 ? 'ren' : ''}
            </span>
            <icons.ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </ui.Button>
        </ui.PopoverTrigger>
        <ui.PopoverContent className="w-[320px] border-0 bg-white shadow-xl shadow-black/15" align="start">
          <div className="space-y-4">
            {/* Rooms */}
            <div className="flex items-center justify-between">
              <ui.Label className="text-sm font-medium">Rooms</ui.Label>
              <ui.Select 
                value={String(roomCount)} 
                onValueChange={(val) => handleSelection("rooms", Number(val))}
              >
                <ui.SelectTrigger className="w-20">
                  <ui.SelectValue />
                </ui.SelectTrigger>
                <ui.SelectContent>
                  {Array.from({ length: 21 }, (_, i) => i).map((num) => (
                    <ui.SelectItem key={num} value={String(num)}>{num}</ui.SelectItem>
                  ))}
                </ui.SelectContent>
              </ui.Select>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-500">{errorMessage}</p>
            )}

            {/* Adults */}
            <div className="flex items-center justify-between">
              <ui.Label className="text-sm font-medium">Adults</ui.Label>
              <ui.Select 
                value={String(roomadultCount)} 
                onValueChange={(val) => handleSelection("adults", Number(val))}
              >
                <ui.SelectTrigger className="w-20">
                  <ui.SelectValue />
                </ui.SelectTrigger>
                <ui.SelectContent>
                  {Array.from({ length: 41 }, (_, i) => i).map((num) => (
                    <ui.SelectItem key={num} value={String(num)}>{num}</ui.SelectItem>
                  ))}
                </ui.SelectContent>
              </ui.Select>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <ui.Label className="text-sm font-medium">Children</ui.Label>
                <p className="text-xs text-gray-500">0-17 years</p>
              </div>
              <ui.Select 
                value={String(roomchildCount)} 
                onValueChange={(val) => handleSelection("children", Number(val))}
              >
                <ui.SelectTrigger className="w-20">
                  <ui.SelectValue />
                </ui.SelectTrigger>
                <ui.SelectContent>
                  {Array.from({ length: 41 }, (_, i) => i).map((num) => (
                    <ui.SelectItem key={num} value={String(num)}>{num}</ui.SelectItem>
                  ))}
                </ui.SelectContent>
              </ui.Select>
            </div>

            <p className="text-xs text-gray-600">
              Please provide correct ages for best options and prices.
            </p>

            {/* Children Ages */}
            {roomchildCount > 0 && (
              <>
                <div className="border-t pt-3" />
                <div className="grid grid-cols-2 gap-3 max-h-37.5 overflow-y-auto">
                  {childrenAges.map((age, index) => (
                    <div key={index} className="space-y-1">
                      <ui.Label className="text-xs">Child {index + 1}</ui.Label>
                      <ui.Select 
                        value={String(age)} 
                        onValueChange={(val) => handleChildAgeChange(index, Number(val))}
                      >
                        <ui.SelectTrigger className="w-full h-9">
                          <ui.SelectValue />
                        </ui.SelectTrigger>
                        <ui.SelectContent>
                          {Array.from({ length: 18 }, (_, i) => i).map((num) => (
                            <ui.SelectItem key={num} value={String(num)}>
                              {num === 0 ? "< 1 Yr" : `${num} Yr${num !== 1 ? 's' : ''}`}
                            </ui.SelectItem>
                          ))}
                        </ui.SelectContent>
                      </ui.Select>
                    </div>
                  ))}
                </div>
              </>
            )}

            <ui.Button 
              className="w-full bg-[#785ef7] hover:bg-[#644ed4] text-white"
              onClick={() => {
                handleApply();
                setIsDropdownOpen(false);
              }}
            >
              Apply
            </ui.Button>
          </div>
        </ui.PopoverContent>
      </ui.Popover>
    </ui.FormField>
  );
};
