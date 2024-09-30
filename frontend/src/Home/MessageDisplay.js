import { Box, Paper, Typography } from '@mui/material';
import 'animate.css'; // Import Animate.css
import React, { useEffect, useState } from 'react';

const messages = [
  { header: "Welcome!", content: "Welcome to the celebration!" },
  { header: "Enjoy!", content: "We're so glad you're here!" },
  { header: "Memories!", content: "Make memories that will last a lifetime!" },
  { header: "Fun!", content: "Enjoy the festivities!" },
  { header: "Thank You!", content: "Thank you for joining us!" }
];

// Array of Animate.css classes
const animations = [
  'animate__fadeIn',
  'animate__bounceIn',
  'animate__zoomIn',
  'animate__slideInLeft',
  'animate__rollIn'
];

const MessageDisplay = () => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState(animations[0]); // Default animation

  useEffect(() => {
    const interval = setInterval(() => {
      // Set a new message
      setAnimationClass(animations[Math.floor(Math.random() * animations.length)]); // Random animation
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % messages.length;
        setCurrentMessage(messages[nextIndex]);
        return nextIndex;
      });
    }, 2000); // Change message every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Paper
        sx={{
          padding: 3,
          maxWidth: 500,
          margin: 'auto',
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 8px 50px rgba(0, 0, 0, 0.2)', // Elevated shadow
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)', // Shadow on hover
          }
        }}
        className={`${animationClass} animate__animated`} // Apply the animation class
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#3f51b5' }}>
          {currentMessage.header}
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: '1.1rem' }}>
          {currentMessage.content}
        </Typography>
      </Paper>
    </Box>
  );
};

export default MessageDisplay;
