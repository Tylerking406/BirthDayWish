// HomePage.js
import {
    Box,
    createTheme,
    ThemeProvider,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import NavigationTabs from '../components/NavigationTabs'; // Import the NavigationTabs component
import VideoBackground from '../components/VideoBackground';
import MessageDisplay from './MessageDisplay';

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
          <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Happy Birthday Thimmy
          </Typography>
        </Box>
      </VideoBackground>
    </ThemeProvider>
  );
};

export default HomePage;
