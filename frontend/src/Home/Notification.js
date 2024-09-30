import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNotification } from '../context/NotificationContext.js'; // Import Notification Context

const Notification = () => {
  const { messages, clearNotifications } = useNotification(); // Get messages and clear function

  // Log the messages and their count whenever the component renders
  console.log('Rendering Notification Component');
  console.log('Current Messages:', messages);
  console.log('Number of Messages:', messages.length);

  return (
    <Box
      sx={{
        p: 4,
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, color: 'black' }}>
        Notifications
      </Typography>
      {messages.length === 0 ? (
        <Typography variant="body1" sx={{ color: 'black' }}>
          No new messages.
        </Typography>
      ) : (
        messages.map((msg, index) => {
          console.log('Rendering Message:', msg); // Log each message
          return (
            <Typography key={index} variant="body1" sx={{ color: 'black', mb: 1 }}>
              {msg}
            </Typography>
          );
        })
      )}
      <Button variant="contained" color="error" onClick={clearNotifications}>
        Clear Notifications
      </Button>
    </Box>
  );
};

export default Notification;
