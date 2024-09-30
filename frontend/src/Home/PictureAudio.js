import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const PictureAudio = () => {
  // Array of audio messages and corresponding images
  const audioMessages = [
    {
      src: '/assets/audios/liya.mp3', // Replace with actual audio path
      img: '/assets/images/liya.jpg', // Replace with actual image path
      alt: 'Friend 1',
    },
    {
      src: '/assets/audios/sive.mp3', // Replace with actual audio path
      img: '/assets/images/sive.jpg', // Replace with actual image path
      alt: 'Friend 2',
    },
    {
      src: '/assets/audios/ntsika.mp3', // Replace with actual audio path
      img: '/assets/images/ntsika.jpg', // Replace with actual image path
      alt: 'Friend 3',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(new Audio(audioMessages[currentIndex].src));

  // Function to play the audio
  const playAudio = () => {
    console.log("Attempting to play audio:", audioMessages[currentIndex].src); // Debug statement
    audioRef.current.play().then(() => {
      console.log("Audio playing successfully"); // Debug statement
    }).catch((error) => {
      console.error("Error playing audio:", error); // Debug statement
    });
  };

  useEffect(() => {
    // Set up audio source
    audioRef.current.src = audioMessages[currentIndex].src; // Update the audio source on index change
    console.log("Audio source updated to:", audioRef.current.src); // Debug statement

    const handleEnded = () => {
      console.log("Audio ended, moving to next message"); // Debug statement
      // Move to the next audio when the current one ends
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % audioMessages.length;
        audioRef.current.src = audioMessages[nextIndex].src; // Update audio source
        console.log("Next audio source set to:", audioRef.current.src); // Debug statement
        playAudio(); // Play the next audio
        return nextIndex;
      });
    };

    audioRef.current.addEventListener('ended', handleEnded);

    // Clean up event listener and pause audio on unmount
    return () => {
      audioRef.current.removeEventListener('ended', handleEnded);
      audioRef.current.pause();
    };
  }, [currentIndex]); // Dependency on currentIndex

  return (
    <Box sx={{ mt: 5 }}>
      <Box
        sx={{
          maxHeight: '300px', // Set a max height for scrolling
          overflowY: 'auto', // Enable vertical scrolling
          border: '1px solid #ccc', // Optional: Add a border for visibility
          borderRadius: '10px', // Rounded corners
          padding: 2, // Optional: Add padding inside the box
        }}
      >
        <img
          src={audioMessages[currentIndex].img}
          alt={audioMessages[currentIndex].alt}
          style={{ width: '200px', height: 'auto', borderRadius: '10px', marginBottom: '10px', cursor: 'pointer' }}
          onClick={playAudio} // Add onClick event to play audio
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#3f51b5' }}>
          {audioMessages[currentIndex].alt}'s Message
        </Typography>
        <Button variant="contained" onClick={playAudio} sx={{ mt: 2 }}>
          Play Message
        </Button>
      </Box>
    </Box>
  );
};

export default PictureAudio;
