
import React from 'react';
import { CompanyDropdown, CityDropdown, DateSelector, RoomsGuestsSelector } from './index'
import { hotelTypes, ui } from '@/index';

interface SearchHeaderProps {
  company: string;
  setCompany: (val: string) => void;
  companies: string[];
  showDropdown: boolean;
  setShowDropdown: (val: boolean) => void;
  fetchCompanies: () => void;
  loading: boolean;
  companiesLoading: boolean;

  city: string;
  setCity: (val: string) => void;
  cities: any[];
  showDropdown2: boolean;
  setShowDropdown2: (val: boolean) => void;
  fetchCities: () => void;
  selectedCityCode: string;
  setSelectedCityCode: (val: string) => void;
  citiesLoading: boolean;

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
    <header className="bg-linear-to-r from-[#785ef7] to-[#644ed4] px-2 py-4 md:mt-13.25 max-w-full w-full mx-auto sticky top-0 z-50 shadow-xl border-b-4 border-[#785ef7]/30">
      <form onSubmit={props.handleSubmitForm}>
        <div className="max-w-7xl mx-auto">
          <div className="px-2">
            {/* Search Form Grid */}
            <div className="relative grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">

              {/* Company Dropdown */}
              <CompanyDropdown
                company={props.company}
                setCompany={props.setCompany}
                companies={props.companies}
                showDropdown={props.showDropdown}
                setShowDropdown={props.setShowDropdown}
                fetchCompanies={props.fetchCompanies}
                loading={props.companiesLoading}
                
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
                loading={props.citiesLoading}
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

              {/* Check-out Date */}
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

              {/* Search Button */}
              <div className="flex items-end">
                <ui.Button 
                  onClick={(e) => {
                    e.preventDefault();
                    props.handleSubmitForm(e as any);
                  }}
                  className="w-full h-11 bg-white text-[#785ef7] font-bold rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200 border-2 border-white/20 hover:scale-[1.02]"
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