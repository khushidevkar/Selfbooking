import React from 'react';
import { SearchHeader } from './SearchHeader';
import { hotelHooks } from '@/index';

export const SearchHeaderContainer: React.FC = () => {
  const {
    company,
    setCompany,
    companies,
    showDropdown,
    setShowDropdown,
    fetchCompanies,
    loading,

    city,
    setCity,
    cities,
    showDropdown2,
    setShowDropdown2,
    fetchCities,
    selectedCityCode,
    setSelectedCityCode,

    checkInDate,
    setCheckInDate,
    isCheckInOpen,
    setCheckInIsOpen,

    checkOutDate,
    setCheckOutDate,
    isCheckOutOpen,
    setCheckOutIsOpen,

    roomCount,
    roomadultCount,
    roomchildCount,
    childrenAges,
    isDropdownOpen,
    setIsDropdownOpen,
    errorMessage,

    handleSubmitForm,
    handleSelection,
    handleChildAgeChange,
    handleApply
  } = hotelHooks.useHotelSearch(); // or whatever hook you use

  return (
    <SearchHeader
      company={company}
      setCompany={setCompany}
      companies={companies}
      showDropdown={showDropdown}
      setShowDropdown={setShowDropdown}
      fetchCompanies={fetchCompanies}
      loading={loading}

      city={city}
      setCity={setCity}
      cities={cities}
      showDropdown2={showDropdown2}
      setShowDropdown2={setShowDropdown2}
      fetchCities={fetchCities}
      selectedCityCode={selectedCityCode}
      setSelectedCityCode={setSelectedCityCode}

      checkInDate={checkInDate}
      setCheckInDate={setCheckInDate}
      isCheckInOpen={isCheckInOpen}
      setCheckInIsOpen={setCheckInIsOpen}

      checkOutDate={checkOutDate}
      setCheckOutDate={setCheckOutDate}
      isCheckOutOpen={isCheckOutOpen}
      setCheckOutIsOpen={setCheckOutIsOpen}

      roomCount={roomCount}
      roomadultCount={roomadultCount}
      roomchildCount={roomchildCount}
      childrenAges={childrenAges}
      isDropdownOpen={isDropdownOpen}
      setIsDropdownOpen={setIsDropdownOpen}
      errorMessage={errorMessage}

      handleSubmitForm={handleSubmitForm}
      handleSelection={handleSelection}
      handleChildAgeChange={handleChildAgeChange}
      handleApply={handleApply}
    />
  );
};
