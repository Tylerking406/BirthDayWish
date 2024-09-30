import {
  Box,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import React, { useState } from 'react';
import NavigationTabs from '../components/NavigationTabs.js'; // Import the NavigationTabs component
import VideoBackground from '../components/VideoBackground.js';
import MessageDisplay from './MessageDisplay.js';
import PictureAudio from './PictureAudio.js';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4081',
    },
    secondary: {
      main: '#3f51b5',
    },
  },
});

const HomePage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <VideoBackground>
        <NavigationTabs tabValue={tabValue} handleTabChange={handleTabChange} />

        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <MessageDisplay />
        </Box>
        <PictureAudio />
      </VideoBackground>
    </ThemeProvider>
  );
};

export default HomePage;
