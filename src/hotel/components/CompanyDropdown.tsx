import { ui, icons } from "@/index";
// import '@/styles/scrollbar.css'

interface CompanyDropdownProps {
  company: string;
  setCompany: (val: string) => void;
  companies: string[];
  showDropdown: boolean;
  setShowDropdown: (val: boolean) => void;
  fetchCompanies: () => void;
  loading: boolean;
}

export const CompanyDropdown: React.FC<CompanyDropdownProps> = ({
  company,
  setCompany,
  companies,
  showDropdown,
  setShowDropdown,
  fetchCompanies,
  loading
}) => {
  return (




    <ui.FormField label="Company" icon={icons.Building2}>
      <ui.Popover open={showDropdown} onOpenChange={setShowDropdown}>
        <ui.PopoverTrigger asChild>
          <ui.Button
            variant="outline"
            role="combobox"
            aria-expanded={showDropdown}
            className="w-full justify-between h-11 bg-white hover:bg-gray-50 border-gray-200"
            onClick={() => {
              if (!showDropdown) fetchCompanies();
              setShowDropdown(true);
            }}
          >
            <span className="truncate font-semibold">
              {company || "Select company"}
            </span>
            <icons.ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </ui.Button>
        </ui.PopoverTrigger>
        <ui.PopoverContent className="w-75 p-0 border-0 shadow-xl shadow-black/15" align="start">
          <ui.Command className="bg-white">
            <ui.CommandInput 
              placeholder="Search company..." 
              value={company}
              onValueChange={setCompany}
              
            />
            <ui.CommandList className="custom-scrollbar">
              <ui.CommandEmpty>
                {loading ? "Loading..." : "No company found."}
              </ui.CommandEmpty>
              <ui.CommandGroup>
                {companies
                  .filter((comp) =>
                    comp.toLowerCase().includes(company.toLowerCase())
                  )
                  .map((comp) => (
                    <ui.CommandItem
                      key={comp}
                      value={comp}
                      onSelect={() => {
                        setCompany(comp);
                        setShowDropdown(false);
                      }}
                      className="
                       cursor-pointer
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
                      {comp}
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