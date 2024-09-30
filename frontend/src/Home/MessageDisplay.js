import { Box, Paper, Typography } from '@mui/material';
import 'animate.css'; // Import Animate.css
import React, { useEffect, useState } from 'react';

// Message array
const messages = [
  { header: "Happy 21st Birthday!", content: "Cheers to you on this amazing milestone!" },
  { header: "You Shine Bright!", content: "Your smile lights up the world; keep shining!" },
  { header: "21 Looks Fabulous!", content: "Embrace this year and all the adventures it brings!" },
  { header: "Here's to You!", content: "May this year be filled with love, laughter, and unforgettable memories!" },
  { header: "Birthday Wishes!", content: "Wishing you a day as wonderful as you are!" },
  { header: "Maya Angelou", content: "You can't use up creativity. The more you use, the more you have." },
  { header: "Pablo Picasso", content: "It takes a long time to become young." },
  { header: "C.S. Lewis", content: "You are never too old to set another goal or to dream a new dream." },
  { header: "Dr. Seuss", content: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose." },
  { header: "Monkey D. Luffy", content: "I don't want to conquer anything. I just think the guy with the most freedom in this whole ocean… is the King!" },
  { header: "Roronoa Zoro", content: "You don't get to decide how you die. You just have to live." },
  { header: "Nami", content: "I'm not a hero; I'm just a girl who wants to be free!" },
  { header: "Sanji", content: "A man's worth is not measured by how he treats the people he hates, but how he treats the people he loves." },
  { header: "Tony Tony Chopper", content: "You can't make the world a better place by just sitting on the sidelines." },
];

// Array of colors for background
const colors = [
  '#FFF',
  '#FF9800', // Orange
  '#F44336', // Red
  '#4CAF50', // Green
  '#FFC107', // Amber
  '#009688', // Teal
];

// Array of Animate.css classes
const animations = [
  'animate__fadeIn',
  'animate__bounceIn',
  'animate__zoomIn',
  'animate__slideInLeft',
  'animate__rollIn',
];

const MessageDisplay = () => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0); // Current color index
  const [animationClass, setAnimationClass] = useState(animations[0]); // Default animation
  const [charIndex, setCharIndex] = useState(0); // Current character index for animation

  useEffect(() => {
    const interval = setInterval(() => {
      // Set a new message
      setAnimationClass(animations[Math.floor(Math.random() * animations.length)]); // Random animation
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % messages.length;
        setCurrentMessage(messages[nextIndex]);
        return nextIndex;
      });
      // Update color index, and reuse colors if needed
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 4000); // Change message and color every 4 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animation interval for characters
    const characterInterval = setInterval(() => {
      setCharIndex((prevIndex) => (prevIndex + 1) % "Wishing You an Amazing Day, Thimmy!".length);
    }, 1000); // Change character every 1 second

    return () => clearInterval(characterInterval);
  }, []);

  // Function to animate each character
  const animateCharacters = (text) => {
    return [...text].map((char, index) => (
      <span
        key={index}
        style={{
          display: 'inline-block',
          margin: '0 5px', // Add horizontal spacing between characters
          padding: '5px', // Add padding around each character
          transition: 'transform 0.5s', // Smooth transition for scaling
          transform: index === charIndex ? 'scale(2.5)' : 'scale(1)', // Scale up the current character
        }}
      >
        {char}
      </span>
    ));
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          mb: 1,
          color: '#3f51b5',
          whiteSpace: 'nowrap', // Prevent wrapping of characters
        }}
      >
        {animateCharacters("Wishing You an Amazing Day, Thimmy!")}
      </Typography>

      {/* Rotating messages */}
      <Paper
        sx={{
          padding: 3,
          maxWidth: 500,
          margin: 'auto',
          borderRadius: 2,
          backgroundColor: colors[colorIndex], // Change background color based on color index
          boxShadow: '0 8px 50px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)',
          },
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

// Export component
export default MessageDisplay;
