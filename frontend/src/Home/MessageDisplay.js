// MessageDisplay.js
import { Box, Paper, Typography } from '@mui/material';
import 'animate.css'; // Import Animate.css
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase.js'; // Import Firestore

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
  const [messages, setMessages] = useState([]); // State for messages
  const [currentMessage, setCurrentMessage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0); // Current color index
  const [animationClass, setAnimationClass] = useState(animations[0]); // Default animation
  const [charIndex, setCharIndex] = useState(0); // Current character index for animation

  // Fetch messages from Firestore
  useEffect(() => {
    const fetchMessages = async () => {
      const messagesCollection = collection(db, 'messages'); // Specify your Firestore collection
      const messageSnapshot = await getDocs(messagesCollection);
      const messagesList = messageSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesList); // Set messages from Firestore
      setCurrentMessage(messagesList[0]); // Set the first message

      // Debug: Log all fetched messages
      console.log("Fetched messages:", messagesList);
    };

    fetchMessages();
  }, []);

  // Handle message rotation
  useEffect(() => {
    if (!messages.length) return; // Do nothing if no messages
    const interval = setInterval(() => {
      setAnimationClass(animations[Math.floor(Math.random() * animations.length)]); // Random animation
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % messages.length;
        setCurrentMessage(messages[nextIndex]);
        return nextIndex;
      });
      // Update color index, and reuse colors if needed
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);

      // Debug: Log current message being displayed
      console.log("Currently displaying message:", messages[currentIndex]);
    }, 4000); // Change message and color every 4 seconds

    return () => clearInterval(interval);
  }, [messages]);

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
      {currentMessage && (
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
            {currentMessage.content || currentMessage.text}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

// Export component
export default MessageDisplay;