
import React from 'react';
import { hotelHooks, components, modals, hotelTypes } from '@/index';
import { useNavigate, useLocation } from 'react-router-dom';

const HotelSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { taxivaxi } = location.state || {};

  const bootstrap = hotelHooks.useHotelBootstrap();
  const filters = hotelHooks.useHotelFilters(bootstrap.combinedHotels);
  const share = hotelHooks.useHotelShare(bootstrap.searchParams);

  // const [activeHotel, setActiveHotel] = React.useState<any | null>(null);
  const [activeHotel, setActiveHotel] = React.useState<hotelTypes.Hotel | null>(null);
  const [isRoomPriceOpen, setIsRoomPriceOpen] = React.useState(false);
  const [isImageGalleryOpen, setIsImageGalleryOpen] = React.useState(false);
  const [isImageZoomOpen, setIsImageZoomOpen] = React.useState(false);
  const [galleryImages, setGalleryImages] = React.useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);

  // ADD THIS - Map modal state
  const [isMapOpen, setIsMapOpen] = React.useState(false);

  // const handleBookNow = (hotel: any) => {
  const handleBookNow = (hotel: hotelTypes.Hotel) => {
    console.log('=== BOOK NOW CLICKED ===');
    console.log('Hotel being sent:', hotel);
    console.log('Hotel Rooms:', hotel?.Rooms);
    console.log('Rooms length:', hotel?.Rooms?.length);

    if (!bootstrap.searchParams) {
      console.error('Search params missing');
      return;
    }

    navigate('/HotelDetail', {
      state: {
        hotel: hotel,
        fromBookNow: true,
        taxivaxi: taxivaxi || {
          checkindate: bootstrap.searchParams.checkIn,
          checkoutdate: bootstrap.searchParams.checkOut,
        }
      }
    });
  };

  //  ADD THIS - Helper function for map
  const extractAttraction = (description: string) => {
    if (!description || typeof description !== 'string') {
      return 'No Location Available';
    }
    const match = description.match(/HeadLine\s*:\s*([^<]+)/);
    return match ? match[1].trim() : 'No Location Available';
  };

  return (
    <div className="container max-w-full flex flex-col gap-2 items-center m-auto bg-gray-200 ">
      {/* Search Header */}
      <components.SearchHeader
        company={bootstrap.company}
        setCompany={bootstrap.setCompany}
        companies={bootstrap.companies}
        showDropdown={bootstrap.showDropdown}
        setShowDropdown={bootstrap.setShowDropdown}
        fetchCompanies={bootstrap.fetchCompanies}
        loading={bootstrap.loader}
        companiesLoading={bootstrap.companiesLoading}
        city={bootstrap.city}
        setCity={bootstrap.setCity}
        cities={bootstrap.cities}
        showDropdown2={bootstrap.showDropdown2}
        setShowDropdown2={bootstrap.setShowDropdown2}
        fetchCities={bootstrap.fetchCities}
        selectedCityCode={bootstrap.selectedCityCode || ''}
        setSelectedCityCode={bootstrap.setSelectedCityCode}
        citiesLoading={bootstrap.citiesLoading}
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

      <header className="px-2 search-bar2">
        {/* Any custom search form JSX can go here */}
      </header>

      {/* Main Content */}
      <div className="yield-content">
        <div className="flex gap-4 container max-w-7xl">

          {/*  UPDATE FilterSidebar - Add hotels and onMapClick props */}
          <components.FilterSidebar
            filters={filters.filters}
            allRatings={filters.allRatings}
            allFacilities={filters.allFacilities}
            allMealTypes={filters.allMealTypes}
            priceRange={filters.priceRange}
            handleFilterChange={filters.handleFilterChange}
            handleSearchChange={filters.handleSearchChange}
            hotels={filters.filteredHotels}  //  Pass hotels
            onMapClick={() => setIsMapOpen(true)}  //  Open map modal
          />

          {/* Hotel List */}
          <div className="w-full bg-white rounded-md px-4 flex flex-col">
            <p className="py-4 px-4 text-2xl font-semibold mb-0">
              Showing Properties in {bootstrap.city || "Selected City"}
            </p>

            {filters.filteredHotels.length > 0 ? (
              filters.filteredHotels.map((hotel) => (
                <div key={hotel.HotelCode}>
                  <components.HotelCard
                    hotel={{
                      ...hotel,
                      Description: hotel.Description ?? "",
                      Images: hotel.Images ?? [],
                      Rooms: hotel.Rooms ?? [],
                    }}
                    booknow={bootstrap.bookNow}
                    agent_portal="0"
                    // onViewPrice={(hotel) => {
                    onViewPrice={(hotel: hotelTypes.Hotel) => {
                      setActiveHotel(hotel);
                      setIsRoomPriceOpen(true);
                    }}
                    onBookNow={handleBookNow}
                    onViewImages={(images) => {
                      setGalleryImages(images || []);
                      setActiveImageIndex(0);
                      setIsImageGalleryOpen(true);
                    }}
                    extractAttraction={(desc) => desc.split('.')[0]}
                    // formatCancelPolicies={(policies) =>
                    //   policies.map((p) => p.Description ?? "")
                    formatCancelPolicies={(policies: hotelTypes.CancellationPolicy[]) =>
                      policies.map(
                        (p) =>
                          `${p.ChargeType} ${p.CancellationCharge}${p.ChargeType === 'Percentage' ? '%' : ''
                          }`
                      )
                    }
                  />
                </div>
              ))
            ) : (
              <div className="flex flex-1 justify-center items-start my-28">
                <img alt="Result Not Found" src="/img/ResultNot.png" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/*  ADD MapViewModal */}
      {isMapOpen && (
        <modals.MapViewModal
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          hotels={filters.filteredHotels}
          extractAttraction={extractAttraction}
          onSelectHotel={(hotel) => {
            setIsMapOpen(false);
            // Optional: Scroll to the selected hotel in the list
            const element = document.getElementById(`hotel-${hotel.HotelCode}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }}
        />
      )}

      {/* Share Panel */}
      {/* Share Modal */}


      {/* {share.selectedRooms.length > 0 && (
        <div className="fixed bottom-0 right-0">
          <modals.SharePanelModal
            selectedRooms={share.selectedRooms}
            onClose={() => {
              console.log('Parent onClose called');
              share.handleCancel();
            }}
            onShare={share.handleShareOptions}
            onRemoveRoom={share.removeRoom}
            extractAttraction={(desc) => desc.split('.')[0]}
          />
        </div>
      )}

      
      {share.isModalOpen && (
        <div className="fixed inset-0">
          <modals.SharePanelModal
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
      )} */}


      {/* Share Panel */}
  {share.selectedRooms.length > 0 && (
    <modals.SharePanelModal
      selectedRooms={share.selectedRooms}
      onClose={() => {
        // console.log('Parent onClose called');
        share.handleCancel();
      }}
      onShare={share.handleShareOptions}
      onRemoveRoom={share.removeRoom}
      extractAttraction={(desc) => desc.split('.')[0]}
    />
  )}

  {/* Share Modal */}
  <modals.ShareModal
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

      {isRoomPriceOpen && activeHotel && (
        <modals.RoomPriceModal
          isOpen={isRoomPriceOpen}
          hotel={activeHotel}
          selectedRooms={share.selectedRooms}
          onClose={() => setIsRoomPriceOpen(false)}
          onAddRoom={share.addRoom}
          onRemoveRoom={share.removeRoom}
          onShare={() => {
            setIsRoomPriceOpen(false);
          }}
        />
      )}

      {isImageGalleryOpen && (
        <modals.ImageGalleryModal
          isOpen={isImageGalleryOpen}
          images={galleryImages}
          onClose={() => {
            setIsImageGalleryOpen(false);
            setIsImageZoomOpen(false);
          }}
          onImageClick={(index) => {
            setActiveImageIndex(index);
            setIsImageZoomOpen(true);
          }}
        />
      )}

      {isImageZoomOpen && (
        <modals.ImageZoomModal
          isOpen={isImageZoomOpen}
          images={galleryImages}
          currentIndex={activeImageIndex}
          onClose={() => setIsImageZoomOpen(false)}
          onPrevious={() =>
            setActiveImageIndex((prev) =>
              prev === 0 ? galleryImages.length - 1 : prev - 1
            )
          }
          onNext={() =>
            setActiveImageIndex((prev) =>
              prev === galleryImages.length - 1 ? 0 : prev + 1
            )
          }
          onThumbnailClick={(index) => setActiveImageIndex(index)}
        />
      )}
    </div>
  );
};

export default HotelSearchPage;
