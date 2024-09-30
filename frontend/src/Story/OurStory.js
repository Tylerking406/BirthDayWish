import { Box, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import NavigationTabs from '../components/NavigationTabs'; // Import the NavigationTabs component
import VideoBackground from '../components/VideoBackground';

const OurStory = () => {
  const [tabValue, setTabValue] = useState(2); // Set to the index for "Our Story"
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the video is playing
  const [showVideo, setShowVideo] = useState(false); // State to control video visibility
  const videoRef = useRef(null); // Create a ref for the video element

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Function to handle video play/pause
  const togglePlay = () => {
    if (videoRef.current) { // Check if the videoRef is defined
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying); // Toggle the playing state
    }
  };

  // Function to show the video when the text is clicked
  const handleTextClick = () => {
    setShowVideo(true); // Show the video
    togglePlay(); // Play the video
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
            flexDirection: 'column', // Ensure video and text stack vertically
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: 'white', mb: 2, cursor: 'pointer' }} // Change cursor to pointer
            onClick={handleTextClick} // Call handleTextClick on click
          >
            Welcome to Our Story
          </Typography>
          {showVideo && ( // Conditionally render the video
            <video
              ref={videoRef} // Use useRef to set the reference
              src="/assets/videos/hide.mp4"
              controls={false} // Disable default controls
              style={{
                maxWidth: '300px', // Set max width to make the video smaller
                height: 'auto', // Maintain aspect ratio
                borderRadius: '10px', // Optional: Add rounded corners
                cursor: 'pointer', // Change cursor to pointer on hover
              }}
              onClick={togglePlay} // Call togglePlay on click
            />
          )}
        </Box>
      </Box>
    </VideoBackground>
  );
};

export default OurStory;
