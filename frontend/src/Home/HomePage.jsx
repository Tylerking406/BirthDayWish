import NotificationsIcon from '@mui/icons-material/Notifications'; // Import notification icon
import {
  Badge,
  Box,
  createTheme,
  IconButton,
  ThemeProvider,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationTabs from '../components/NavigationTabs.js';
import VideoBackground from '../components/VideoBackground.js';
import { useNotification } from '../context/NotificationContext.js'; // Import Notification Context
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
  const navigate = useNavigate();
  const { notificationCount } = useNotification(); // Get notification count from context
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Function to handle notification icon click
  const handleNotificationClick = () => {
    navigate("./notification");
 
  };

  return (
    <ThemeProvider theme={theme}>
      <VideoBackground>
        <NavigationTabs tabValue={tabValue} handleTabChange={handleTabChange} />

        <IconButton
          color="inherit"
          sx={{ position: 'absolute', top: 16, right: 32 }} // Adjusted right position
          onClick={handleNotificationClick} // Added click handler
        >
          <Badge badgeContent={notificationCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <MessageDisplay />
        </Box>
        <PictureAudio />
      </VideoBackground>
    </ThemeProvider>
  );
};

export default HomePage;
