// // src/App.tsx

// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { pages } from '.';

// const App: React.FC = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Bootstrap route - handles ?taxivaxidata=... */}
//         <Route path="/HotelSearch" element={<pages.HotelSearchBootstrap />} />
        
//         {/* Main search page */}
//         <Route path="/hotel-search" element={<pages.HotelSearchPage />} />
        
//         {/* Default route */}
//         <Route path="/" element={<pages.Home />} />

//         // In App.tsx
//       <Route path="/HotelDetail" element={<pages.HotelDetailPage />} />
        
//         {/* 404 fallback */}
//         {/* <Route path="*" element={<Navigate to="/hotel-search" replace />} /> */}
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;



// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { pages } from '.';

// const App: React.FC = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Home/Landing Page */}
//         <Route path="/" element={<pages.Home />} />

//         {/* Bootstrap route - handles ?taxivaxidata=... */}
//         <Route path="/HotelSearch" element={<pages.HotelSearchBootstrap />} />
        
//         {/* Main search results page */}
//         <Route path="/hotel-search" element={<pages.HotelSearchPage />} />
        
//         {/* Hotel detail page */}
//         <Route path="/HotelDetail" element={<pages.HotelDetailPage />} />

//         {/* Hotel booking page */}
//         <Route path="/HotelBooking" element={<pages.HotelBookingPage />} />

//         {/* Payment page (if payment required) */}
//         {/* <Route path="/HotelPayment" element={<pages.HotelPayment />} /> */}

//         {/* Booking completed page */}
//         <Route path="/HotelBookingCompleted" element={<pages.HotelBookingCompletedPage />} />

//         {/* Cancellation page */}
//         {/* <Route path="/HotelCancellation" element={<pages.HotelCancellation />} /> */}

//         {/* Booking done/confirmation page */}
//         {/* <Route path="/BookingDone" element={<pages.BookingDone />} /> */}
        
//         {/* 404 fallback - redirect to home */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { pages, MapProvider } from '.'; // Import MapProvider

const App: React.FC = () => {
  return (
    <MapProvider> {/* Wrap BrowserRouter with MapProvider */}
      <BrowserRouter>
        <Routes>
          {/* Home/Landing Page */}
          <Route path="/" element={<pages.Home />} />

          {/* Bootstrap route - handles ?taxivaxidata=... */}
          <Route path="/HotelSearch" element={<pages.HotelSearchBootstrap />} />
          
          {/* Main search results page */}
          <Route path="/hotel-search" element={<pages.HotelSearchPage />} />
          
          {/* Hotel detail page */}
          <Route path="/HotelDetail" element={<pages.HotelDetailPage />} />

          {/* Hotel booking page */}
          <Route path="/HotelBooking" element={<pages.HotelBookingPage />} />

          {/* Payment page (if payment required) */}
          {/* <Route path="/HotelPayment" element={<pages.HotelPayment />} /> */}

          {/* Booking completed page */}
          <Route path="/HotelBookingCompleted" element={<pages.HotelBookingCompletedPage />} />

          {/* Cancellation page */}
          {/* <Route path="/HotelCancellation" element={<pages.HotelCancellation />} /> */}

          {/* Booking done/confirmation page */}
          {/* <Route path="/BookingDone" element={<pages.BookingDone />} /> */}
          
          {/* 404 fallback - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MapProvider>
  );
};

export default App;