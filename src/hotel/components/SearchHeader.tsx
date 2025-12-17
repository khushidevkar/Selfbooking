
import React from 'react';
// import DatePicker from 'react-datepicker';
// import { DayPicker } from 'react-day-picker';
import { CompanyDropdown, CityDropdown, DateSelector, RoomsGuestsSelector } from './index'
import { hotelTypes,ui } from '@/index';


interface SearchHeaderProps {
  company: string;
  setCompany: (val: string) => void;
  companies: string[];
  showDropdown: boolean;
  setShowDropdown: (val: boolean) => void;
  fetchCompanies: () => void;
  loading: boolean;

  city: string;
  setCity: (val: string) => void;
  cities: any[];
  showDropdown2: boolean;
  setShowDropdown2: (val: boolean) => void;
  fetchCities: () => void;
  selectedCityCode: string;
  setSelectedCityCode: (val: string) => void;

  checkInDate: Date | null;
  setCheckInDate: (date: Date | null) => void;
  isCheckInOpen: boolean;
  setCheckInIsOpen: (val: boolean) => void;

  checkOutDate: Date | null;
  setCheckOutDate: (date: Date | null) => void;
  isCheckOutOpen: boolean;
  setCheckOutIsOpen: (val: boolean) => void;


  roomCount: number;
  roomadultCount: number;
  roomchildCount: number;
  childrenAges: number[];
  isDropdownOpen: boolean;
  setIsDropdownOpen: (val: boolean) => void;
  errorMessage: string;

  handleSubmitForm: (e: React.FormEvent) => void;
  handleSelection: (type: hotelTypes.GuestType, value: number) => void;

  handleChildAgeChange: (index: number, age: number) => void;
  handleApply: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = (props) => {
  return (
    <header className="px-2 bg-[#281f55] p-4 max-w-350 mx-auto mt-13.25 sticky top-2 z-10 shadow-md rounded-md
" id="widgetHeader">
      <form onSubmit={props.handleSubmitForm}>
        <div id="search-widget" className="hsw v2">
          <div className="px-2">
            <div className="relative grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">

              {/* Company Dropdown */}
              <CompanyDropdown
                company={props.company}
                setCompany={props.setCompany}
                companies={props.companies}
                showDropdown={props.showDropdown}
                setShowDropdown={props.setShowDropdown}
                fetchCompanies={props.fetchCompanies}
                loading={props.loading}
              />

              {/* City Dropdown */}
              <CityDropdown
                city={props.city}
                setCity={props.setCity}
                cities={props.cities}
                showDropdown2={props.showDropdown2}
                setShowDropdown2={props.setShowDropdown2}
                fetchCities={props.fetchCities}
                setSelectedCityCode={props.setSelectedCityCode}
                loading={props.loading}
              />

              {/* Check-in Date */}
              <DateSelector
                label="CHECK-IN DATE"
                date={props.checkInDate}
                isOpen={props.isCheckInOpen}
                setIsOpen={props.setCheckInIsOpen}
                onChange={(date) => props.setCheckInDate(date)}
                minDate={new Date()}
              />

              <DateSelector
                label="CHECK-OUT DATE"
                date={props.checkOutDate}
                isOpen={props.isCheckOutOpen}
                setIsOpen={props.setCheckOutIsOpen}
                onChange={(date) => props.setCheckOutDate(date)}
                minDate={props.checkInDate || new Date()}
              />


              {/* Rooms & Guests */}
              <RoomsGuestsSelector
                roomCount={props.roomCount}
                roomadultCount={props.roomadultCount}
                roomchildCount={props.roomchildCount}
                childrenAges={props.childrenAges}
                isDropdownOpen={props.isDropdownOpen}
                setIsDropdownOpen={props.setIsDropdownOpen}
                errorMessage={props.errorMessage}
                handleSelection={props.handleSelection}
                handleChildAgeChange={props.handleChildAgeChange}
                handleApply={props.handleApply}
              />

              {/* <button className="bg-[#785ef7] text-white px-9 py-2 rounded-lg
font-bold text-base w-40 mx-auto
shadow-md hover:bg-[#6b52e0] transition
 ">
                Search
              </button> */}
                <div className="flex items-end">
                <ui.Button 
                  onClick={(e) => {
                    e.preventDefault();
                    props.handleSubmitForm(e as any);
                  }}
                  className="w-full h-11 bg-[#785ef7] hover:bg-[#644ed4] text-white font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Search
                </ui.Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </header>
  );
};