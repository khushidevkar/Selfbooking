// src/pages/HotelSearchPage.tsx

import React from 'react';
import { hotelHooks, components } from '@/index';

// Import your other components
// import { SearchHeader } from '../hotel/components/SearchHeader';
// import { FilterSidebar } from '../hotel/components/FilterSidebar';
// import { HotelCard } from '../hotel/components/HotelCard';
// import { ShareModal } from '../hotel/components/ShareModal';
// import { MapView } from '../hotel/components/MapView';

const HotelSearchPage: React.FC = () => {
  const initializer = hotelHooks.useHotelInitializer();
  const bootstrap = hotelHooks.useHotelBootstrap();
  const filters = hotelHooks.useHotelFilters(bootstrap.combinedHotels);
  const share = hotelHooks.useHotelShare(bootstrap.searchParams);

  const { loading, step } = initializer;
  if (loading) {
    return <components.HotelLoader step={step} />;
  }

  return (
    <div className="hotel-search-container">
      {/* Search Header Component */}

      <components.SearchHeader
        company={bootstrap.company}
        setCompany={bootstrap.setCompany}
        companies={bootstrap.companies}
        showDropdown={bootstrap.showDropdown}
        setShowDropdown={bootstrap.setShowDropdown}
        fetchCompanies={bootstrap.fetchCompanies}
        loading={bootstrap.loader}

        city={bootstrap.city}
        setCity={bootstrap.setCity}
        cities={bootstrap.cities}
        showDropdown2={bootstrap.showDropdown2}
        setShowDropdown2={bootstrap.setShowDropdown2}
        fetchCities={bootstrap.fetchCities}
        selectedCityCode={bootstrap.selectedCityCode}
        setSelectedCityCode={bootstrap.setSelectedCityCode}

        checkInDate={bootstrap.checkInDate}
        setCheckInDate={bootstrap.setCheckInDate}
        isCheckInOpen={bootstrap.isCheckInOpen}
        setCheckInIsOpen={bootstrap.setCheckInIsOpen}

        checkOutDate={bootstrap.checkOutDate}
        setCheckOutDate={bootstrap.setCheckOutDate}
        isCheckOutOpen={bootstrap.isCheckOutOpen}
        setCheckOutIsOpen={bootstrap.setCheckOutIsOpen}

        roomCount={bootstrap.roomCount}
        roomadultCount={bootstrap.roomadultCount}
        roomchildCount={bootstrap.roomchildCount}
        childrenAges={bootstrap.childrenAges}
        isDropdownOpen={bootstrap.isDropdownOpen}
        setIsDropdownOpen={bootstrap.setIsDropdownOpen}
        errorMessage={bootstrap.errorMessage}

        handleSubmitForm={bootstrap.handleSubmitForm}
        handleSelection={bootstrap.handleSelection}
        handleChildAgeChange={bootstrap.handleChildAgeChange}
        handleApply={bootstrap.handleApply}
      />

      {/* <components.SearchHeader {...bootstrap} /> */}


      <header className="px-2 search-bar2">
        {/* Your search form JSX here */}
        {/* Use bootstrap.handleSubmitForm, bootstrap.city, etc. */}
      </header>

      {/* Main Content */}
      <div className="yield-content">
        <div className="flex card-container">
          {/* Filter Sidebar */}
          <components.FilterSidebar
            filters={filters.filters}
            allRatings={filters.allRatings}
            allFacilities={filters.allFacilities}
            allMealTypes={filters.allMealTypes}
            priceRange={filters.priceRange}
            handleFilterChange={filters.handleFilterChange}
            handleSearchChange={filters.handleSearchChange}
          // mapCenter={mapCenter}
          // onMapClick={onMapClick}
          />


          {/* Hotel List */}
          <div className="w-full">
            <p className="py-7 px-6 text-2xl font-semibold mb-0">
              Showing Properties in {bootstrap.city}
            </p>

            {/* {filters.filteredHotels.length > 0 ? ( */}
            {filters.filteredHotels.length > 0 ? (
              filters.filteredHotels.map((hotel) => (
                <div key={hotel.HotelCode}>
                  {/* Hotel Card Component */}
                  <components.HotelCard
                    // hotel={hotel}
                    hotel={{
                      ...hotel,
                      Description: hotel.Description ?? "",
                      Images: hotel.Images ?? [],  // default empty array
                      Rooms: hotel.Rooms ?? [],    // default empty array
                    }}
                    booknow="1"
                    agent_portal="0"
                    onViewPrice={(h) => console.log("View price", h)}
                    onBookNow={(h) => console.log("Book now", h)}
                    onViewImages={(images) => console.log("View images", images)}
                    extractAttraction={(desc) => desc.split('.')[0]}
                    formatCancelPolicies={(policies) => policies.map(p => p.Description ?? "")}
                  />
                  {/* Pass hotel data and share.setSelectedRooms */}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <img alt="Result Not Found" src="./img/ResultNot.png" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Panel */}
      {share.selectedRooms.length > 0 && (
        <div className="fixed bottom-0 right-0">
          {/* Share panel component */}
          <components.SharePanel
            selectedRooms={share.selectedRooms}
            onClose={share.handleCancel}         // or your close handler
            onShare={share.handleShareOptions}         // your share handler
            onRemoveRoom={share.removeRoom}    // remove room handler
            extractAttraction={(desc) => desc.split('.')[0]} // example utility
          />

        </div>
      )}

      {/* Share Modal */}
      {share.isModalOpen && (
        <div className="fixed inset-0">
          {/* Share modal component */}
          <components.ShareModal
            isOpen={share.isModalOpen}
            onClose={share.handleCancel}
            formData={share.formData}
            toEmailList={share.toEmailList}
            ccEmailList={share.ccEmailList}
            errors={share.errors}
            isLoading={share.isLoading}
            onSubmit={share.handleSubmit}
            handleChange={share.handleChange}
            handleAddEmail={share.handleAddEmail}
            handleDeleteEmail={share.handleDeleteEmail}
            handleApproverEmailBlur={share.handleApproverEmailBlur}
            toEmail={share.toEmail}
            setToEmail={share.setToEmail}
            ccEmail={share.ccEmail}
            setCcEmail={share.setCcEmail}
          />

        </div>
      )}
    </div>
  );
};

export default HotelSearchPage;