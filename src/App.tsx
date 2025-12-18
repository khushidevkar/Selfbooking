// src/App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { pages } from '.';
import Home from './Homepage/Home'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Bootstrap route - handles ?taxivaxidata=... */}
        <Route path="/hotel-bootstrap" element={<pages.HotelSearchBootstrap />} />
        
        {/* Main search page */}
        <Route path="/hotel-search" element={<pages.HotelSearchPage />} />
        
        {/* Default route */}
        <Route path="/" element={<Home />} />
        
        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/hotel-search" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;