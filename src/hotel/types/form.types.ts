
export type FormData = {
  city: string;
  checkindate: string;
  checkoutdate: string;
  PassengerADT: number;
  Passengerchild: number;
  Passengerchildage?: number[] | null;
  passengerDetailsArray: string[] | string;
};

export interface Company {
  id: string;
  corporate_name: string;
  corporate_code: string;
  is_active: string;
  is_deleted: string;
  // add more fields ONLY if you actually use them
}

export interface CompaniesApiResponse {
  success: string;
  error?: string;
  response: {
    Companies: Company[];
  };
}

export interface City {
  id: string;
  name: string;
  city_code: string;
  state_id: string;
  state_name: string;
  country_code: string;
  country_name: string;
  tbo_city_code: string;
}

export interface CityDropdownProps {
  city: string;
  setCity: (val: string) => void;
  cities: City[];
  showDropdown2: boolean;
  setShowDropdown2: (val: boolean) => void;
  fetchCities: () => void;
  setSelectedCityCode: (code: string) => void;
  loading: boolean;
}

export interface CompanyDropdownProps {
  company: string;
  setCompany: (val: string) => void;
  companies: string[];
  showDropdown: boolean;
  setShowDropdown: (val: boolean) => void;
  fetchCompanies: () => void;
  loading: boolean;
}

export interface DateSelectorProps {
  label: string;
  date: Date | null;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onChange: (date: Date | null) => void;
  minDate?: Date;
}