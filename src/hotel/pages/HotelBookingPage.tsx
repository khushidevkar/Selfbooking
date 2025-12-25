
import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ui, components } from '@/index';

const HotelBookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { selectedRoom, hotel } = location.state || {};
  const searchParams = JSON.parse(sessionStorage.getItem('hotelData_header') || '{}');

  // State management
  const [showModal, setShowModal] = useState(false);
  const [showInclusionModal, setShowInclusionModal] = useState(false);
  
  // Calculate nights using useMemo instead of useState + useEffect
  const nights = useMemo(() => {
    if (searchParams.checkIn && searchParams.checkOut) {
      const checkIn = new Date(searchParams.checkIn);
      const checkOut = new Date(searchParams.checkOut);
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  }, [searchParams.checkIn, searchParams.checkOut]);

  // Extract check-in and check-out times from hotel rate conditions
  const { checkInTime, checkOutTime } = useMemo(() => {
    const conditions = hotel?.RateConditions || [];
    
    const checkInCondition = conditions.find((condition: string) =>
      condition.includes('CheckIn Time-Begin:') || condition.includes('Check-In Time')
    );
    const checkOutCondition = conditions.find((condition: string) =>
      condition.includes('CheckOut Time:') || condition.includes('Check-Out Time')
    );

    return {
      checkInTime: checkInCondition
        ? checkInCondition.replace(/CheckIn Time-Begin:|Check-In Time:/gi, '').trim()
        : '2:00 PM', // Default fallback
      checkOutTime: checkOutCondition
        ? checkOutCondition.replace(/CheckOut Time:|Check-Out Time:/gi, '').trim()
        : '11:00 AM', // Default fallback
    };
  }, [hotel?.RateConditions]);

  // Initialize peopleData from sessionStorage using useMemo
  // const initialPeopleData = useMemo(() => {
  //   // const storedData = sessionStorage.getItem('peopleData');
  //   const storedData = sessionStorage.getItem('hotelData_header');
  //   console.log("storedData",storedData);
    
  //   if (storedData) {
  //     try {
  //       const parsedData = JSON.parse(storedData);
  //       if (parsedData?.success && parsedData?.response?.length > 0) {
  //         return parsedData.response.map((person: any) => ({
  //           firstName: person.people_name?.split(' ')[0] || '',
  //           lastName: person.people_name?.split(' ')[1] || '',
  //           email: person.people_email || '',
  //           contact_no: person.people_contact || '',
  //           title: person.gender === 'Female' ? 'Ms' : 'Mr',
  //           pan: '',
  //         }));
  //       }
  //     } catch (error) {
  //       console.error('Error parsing peopleData:', error);
  //     }
  //   }
  //   // Default value if no stored data
  //   return [
  //     { 
  //       title: 'Mr', 
  //       firstName: '', 
  //       lastName: '', 
  //       email: '', 
  //       contact_no: '', 
  //       pan: '' 
  //     },
  //   ];
  // }, []); // Empty dependency array since we only want to read from sessionStorage once


  const initialPeopleData = useMemo(() => {
  const storedData = sessionStorage.getItem('hotelData_header');

  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);

      return [
        {
          title: 'Mr',
          firstName: parsedData.spoc_name || '',
          lastName: '',
          email: parsedData.approver1 || '',
          contact_no: '',
          pan: '',
        },
      ];
    } catch (error) {
      console.error('Error parsing hotelData_header:', error);
    }
  }

  return [
    {
      title: 'Mr',
      firstName: '',
      lastName: '',
      email: '',
      contact_no: '',
      pan: '',
    },
  ];
}, []);


  // Guest details state - initialized with useMemo value
  const [peopleData, setPeopleData] = useState(initialPeopleData);
  console.log("peopleData", peopleData)
  // GST details state
  const [gstDetails, setGstDetails] = useState({
    gstNo: '',
    cName: '',
    cAddr: '',
    contactNo: '',
    email: '',
  });

  const [showGSTDetails, setShowGSTDetails] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [loader, setLoader] = useState(false);

  // Handlers
  const handleGuestChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPeopleData((prev) =>
      prev.map((person, i) => (i === index ? { ...person, [name]: value } : person))
    );
    
    // Clear error for this field
    setErrors((prev: any) => {
      const newErrors = { ...prev };
      if (newErrors[index]) {
        newErrors[index] = { ...newErrors[index], [name]: '' };
      }
      return newErrors;
    });
  };

  const handleGSTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGstDetails((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    setErrors((prev: any) => ({
      ...prev,
      [name]: value.trim() ? '' : prev[name],
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    // Validate people data
    peopleData.forEach((person, index) => {
      const personErrors: any = {};
      if (!person.firstName) personErrors.firstName = 'First name is required.';
      if (!person.lastName) personErrors.lastName = 'Last name is required.';
      if (!person.email) {
        personErrors.email = 'Email is required.';
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(person.email)) {
        personErrors.email = 'Invalid email format.';
      }
      if (!person.contact_no) {
        personErrors.contact_no = 'Contact number is required.';
      } else {
        const phoneNumberOnly = person.contact_no.replace(/\D/g, '').slice(-10);
        if (phoneNumberOnly.length !== 10) {
          personErrors.contact_no = 'Contact number must be 10 digits.';
        }
      }
      if (!person.pan) {
        personErrors.pan = 'PAN is required for international bookings.';
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(person.pan)) {
        personErrors.pan = 'Invalid PAN format (e.g., ABCDE1234F).';
      }

      if (Object.keys(personErrors).length > 0) {
        newErrors[index] = personErrors;
      }
    });

    // Validate GST details if enabled
    if (showGSTDetails) {
      if (!gstDetails.gstNo) {
        newErrors.gstNo = 'GST Number is required.';
      } else if (!/^[0-9A-Z]{15}$/i.test(gstDetails.gstNo)) {
        newErrors.gstNo = 'Invalid GST Number. Must be 15 alphanumeric characters.';
      }
      if (!gstDetails.cName) newErrors.cName = 'Company Name is required.';
      if (!gstDetails.cAddr) newErrors.cAddr = 'Company Address is required.';
      if (!gstDetails.contactNo) {
        newErrors.contactNo = 'Contact Number is required.';
      } else if (!/^\d{10}$/.test(gstDetails.contactNo)) {
        newErrors.contactNo = 'Invalid Contact Number. Must be 10 digits.';
      }
      if (!gstDetails.email) {
        newErrors.email = 'Email is required.';
      } else if (!/^\S+@\S+\.\S+$/.test(gstDetails.email)) {
        newErrors.email = 'Invalid email format.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // Process booking
    setLoader(true);
    // Your booking logic here
    console.log('Booking submitted with:', { peopleData, gstDetails });
    
  };

  if (!hotel || !selectedRoom) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No hotel data available</p>
      </div>
      
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-linear-to-r from-[#785ef7] to-[#5a3ec8] py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-white">Review your Booking</h1>
        </div>
      </div>

      

      {loader && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl flex items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#785ef7]"></div>
            <p className="text-gray-600 text-lg">Processing your booking...</p>
          </div>
        </div>
      )}

      

      <div className="max-w-7xl mx-auto px-4 py-6">
        
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left Column - Main Content */}
          <div className="bg-white pt-0 pb-4 px-4 flex-1 space-y-6">
            {/* Hotel Booking Summary */}
            <components.HotelBookingSummary
              hotelName={hotel.HotelName}
              hotelRating={hotel.HotelRating}
              address={hotel.Address}
              selectedRoom={selectedRoom}
              searchParams={searchParams}
              nights={nights}
              checkInTime={checkInTime}
              checkOutTime={checkOutTime}
              onSeeInclusion={() => setShowInclusionModal(true)}
            />

            {/* Important Information */}
            <components.HotelImportantInfo
              rateConditions={hotel.RateConditions || []}
              onViewMore={() => setShowModal(true)}
              previewCount={4}
            />

            {/* Guest Details Form */}
            <components.GuestDetailsForm
              peopleData={peopleData}
              gstDetails={gstDetails}
              showGSTDetails={showGSTDetails}
              errors={errors}
              onGuestChange={handleGuestChange}
              onGSTChange={handleGSTChange}
              onGSTToggle={setShowGSTDetails}
            />

            {/* Submit Button */}
            <div className="flex justify-end">
              <ui.Button
                onClick={handleSubmit}
                className="bg-linear-to-r from-[#785ef7] to-[#5a3ec8] hover:from-[#644ed4] hover:to-[#785ef7] text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Proceed to Payment
              </ui.Button>
            </div>
          </div>

          {/* Right Column - Price Breakdown (Sticky) */}
          <div className="lg:w-96">
            <div className="lg:sticky lg:top-6">
              <components.PriceSummary room={selectedRoom} nights={nights} />
            </div>
          </div>
        </div>
      </div>

      {/* Modals can be added here */}
    </div>
  );
};

export default HotelBookingPage;