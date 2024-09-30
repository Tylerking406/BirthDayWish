// App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import GalleryPage from './Gallery/GalleryPage.js';
import GuestBooking from './guestbooking/GuestBooking.js';
import HomePage from './Home/HomePage.jsx';
import Notification from './Home/Notification.js';
import OurStory from './Story/OurStory.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/guest-booking" element={<GuestBooking />} />
        <Route path="/notification" element={<Notification />} />
        
      </Routes>
    </Router>
  );
};

export default App;
