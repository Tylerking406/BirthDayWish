// components/NavigationTabs.js
import { AppBar, Tab, Tabs } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationTabs = ({ tabValue, handleTabChange }) => {
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    handleTabChange(event, newValue);
    switch (newValue) {
      case 0:
        navigate('/'); // Navigate to Home
        break; 
      case 1:
        navigate('/gallery'); // Navigate to Gallery page
        break;
      case 2:
        navigate('/our-story'); // Navigate to Our Story page
        break;
      case 3:
        navigate('/guest-booking'); // Navigate to Guest Booking page
        break;
      default:
        break;
    }
  };

  return (
    <AppBar position="fixed" color="transparent">
      <Tabs 
        value={tabValue} 
        onChange={handleChange} 
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Home" />
        <Tab label="Gallery" />
        <Tab label="Our Story" />
        <Tab label="Guest Booking" />
      </Tabs>
    </AppBar>
  );
};

export default NavigationTabs;
