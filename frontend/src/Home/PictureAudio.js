import { Box, Button, Typography } from '@mui/material';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { storage } from '../firebase.js'; // Make sure you import Firebase storage

const PictureAudio = () => {
  // Array to store audio and image references in Firebase Storage
  const audioMessages = [
    {
      audioRef: ref(storage, 'audios/liya.mp3'), // Reference to audio in Firebase Storage
      imageRef: ref(storage, 'images/liya.jpg'), // Reference to image in Firebase Storage
      alt: 'Friend 1',
    },
    {
      audioRef: ref(storage, 'audios/sive.mp3'),
      imageRef: ref(storage, 'images/sive.jpg'),
      alt: 'Friend 2',
    },
    {
      audioRef: ref(storage, 'audios/ntsika.mp3'),
      imageRef: ref(storage, 'images/ntsika.jpg'),
      alt: 'Friend 3',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [audioSrc, setAudioSrc] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const audioRef = useRef(new Audio());

  // Function to fetch URLs from Firebase Storage and set the audio/image source
  const fetchMediaURLs = async (index) => {
    try {
      // Get download URLs for the current audio and image
      const audioURL = await getDownloadURL(audioMessages[index].audioRef);
      const imageURL = await getDownloadURL(audioMessages[index].imageRef);

      setAudioSrc(audioURL); // Set the audio source
      setImageSrc(imageURL); // Set the image source
    } catch (error) {
      console.error('Error fetching media URLs:', error);
    }
  };

  // Function to play the audio
  const playAudio = () => {
    audioRef.current.src = audioSrc; // Set the audio source
    audioRef.current.play().then(() => {
      console.log("Audio playing successfully");
    }).catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  useEffect(() => {
    // Fetch media URLs when the component mounts or when currentIndex changes
    fetchMediaURLs(currentIndex);

    const handleEnded = () => {
      // Move to the next audio message when the current one ends
      setCurrentIndex((prevIndex) => (prevIndex + 1) % audioMessages.length);
    };

    audioRef.current.addEventListener('ended', handleEnded);

    // Clean up event listener and pause audio on unmount
    return () => {
      audioRef.current.removeEventListener('ended', handleEnded);
      audioRef.current.pause();
    };
  }, [currentIndex, audioSrc]); // Dependencies on currentIndex and audioSrc

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
        {imageSrc && (
          <img
            src={imageSrc}
            alt={audioMessages[currentIndex].alt}
            style={{ width: '200px', height: 'auto', borderRadius: '10px', marginBottom: '10px', cursor: 'pointer' }}
            onClick={playAudio} // Add onClick event to play audio
          />
        )}
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
