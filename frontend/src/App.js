// App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import GalleryPage from './Gallery/GalleryPage';
import GuestBooking from './guestbooking/GuestBooking';
import HomePage from './Home/HomePage';
import OurStory from './Story/OurStory';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/guest-booking" element={<GuestBooking />} />
        
      </Routes>
    </Router>
  );
};

export default App;
