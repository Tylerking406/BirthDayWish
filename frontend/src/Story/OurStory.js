// OurStory.js
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import NavigationTabs from '../components/NavigationTabs'; // Import the NavigationTabs component
import VideoBackground from '../components/VideoBackground';

const OurStory = () => {
  const [tabValue, setTabValue] = useState(2); // Set to the index for "Our Story"

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <VideoBackground>
      <Box sx={{ flexGrow: 1 }}>
        <NavigationTabs tabValue={tabValue} handleTabChange={handleTabChange} />
        <Box sx={{ mt: 10, textAlign: 'center', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ color: 'white' }}>
            Welcome to Our Story
          </Typography>
        </Box>
      </Box>
    </VideoBackground>
  );
};

export default OurStory;
