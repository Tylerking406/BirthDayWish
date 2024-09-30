// MessageDisplay.js
import { Box, Card, CardContent, Fade, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const messages = [
  { header: "Welcome!", content: "Welcome to the celebration!", path: "/welcome" },
  { header: "Enjoy!", content: "We're so glad you're here!", path: "/enjoy" },
  { header: "Memories!", content: "Make memories that will last a lifetime!", path: "/memories" },
  { header: "Fun!", content: "Enjoy the festivities!", path: "/fun" },
  { header: "Thank You!", content: "Thank you for joining us!", path: "/thank-you" }
];

const MessageDisplay = () => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(true);
  const navigate = useNavigate(); // Initialize the navigation hook

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false); // Fade out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % messages.length;
          setCurrentMessage(messages[nextIndex]);
          return nextIndex;
        });
        setShow(true); // Fade in
      }, 500); // Time to wait before changing the message (after fading out)
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleCardClick = () => {
    navigate(currentMessage.path); // Navigate to the corresponding path
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Fade in={show} timeout={{ enter: 500, exit: 500 }}>
        <Card 
          sx={{ 
            maxWidth: 400, 
            margin: 'auto', 
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
            cursor: 'pointer' 
          }} 
          onClick={handleCardClick} // Add click handler
        >
          <CardContent>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
              {currentMessage.header}
            </Typography>
            <Typography variant="body1">
              {currentMessage.content}
            </Typography>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default MessageDisplay;
