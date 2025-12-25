
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
  // const [selectSize, setSelectSize] = useState(1);
  // const [adultSize, setAdultSize] = useState(1);
  // const [childSize, setChildSize] = useState(1);
  // const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
  
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
                <ui.SelectContent className="bg-white h-48">
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
