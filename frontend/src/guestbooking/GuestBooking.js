// GuestBooking.js
import { Box, Button, TextField, Typography } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import NavigationTabs from '../components/NavigationTabs.js';
import VideoBackground from '../components/VideoBackground.js';
import { db } from '../firebase.js'; // Import Firestore

const GuestBooking = () => {
  const [tabValue, setTabValue] = useState(3); // Set to the index for "Guest Booking"
  const [name, setName] = useState(''); // State for the name input
  const [message, setMessage] = useState(''); // State for the message input

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!name || !message) return; // Check if name and message are not empty

    try {
      // Add a new message to the "messages" collection in Firestore
      await addDoc(collection(db, 'messages'), {
        header: name, // Store the name
        text: message, // Store the message
        createdAt: new Date(), // Optional: Add timestamp
      });
      setName(''); // Clear the name input after submission
      setMessage(''); // Clear the message input after submission
      alert('Message sent!'); // Optional: Show success message
    } catch (error) {
      console.error('Error adding message: ', error); // Log any errors
    }
  };

  return (
    <VideoBackground>
      <Box sx={{ flexGrow: 1 }}>
        <NavigationTabs tabValue={tabValue} handleTabChange={handleTabChange} />
        <Box
          sx={{
            mt: 10,
            textAlign: 'center',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
            Welcome to Guest Booking
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
            <TextField
              label="Your Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2, backgroundColor: 'white', width: '100%' }} // Full width
            />
            <TextField
              label="Enter your message"
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ mb: 2, backgroundColor: 'white', width: '100%' }} // Full width
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Send Message
            </Button>
          </form>
        </Box>
      </Box>
    </VideoBackground>
  );
};

export default GuestBooking;
