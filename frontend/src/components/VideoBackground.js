// VideoBackground.js
import { Box } from '@mui/material';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import MultiVideoBackground from '../components/MultiVideoBackground.jsx';
import { storage } from '../firebase.js'; // Make sure to import the Firebase storage

const VideoBackground = ({ children }) => {
  const [videoURLs, setVideoURLs] = useState([]); // State to hold the video URLs

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // References to your videos in Firebase Storage
        const videoRefs = [
          ref(storage, 'videos/us.mp4'),
          ref(storage, 'videos/friends.mp4'),
        ];

        // Fetch download URLs for each video
        const urls = await Promise.all(videoRefs.map((videoRef) => getDownloadURL(videoRef)));
        setVideoURLs(urls); // Update state with fetched URLs
      } catch (error) {
        console.error('Error fetching video URLs:', error);
      }
    };

    fetchVideos(); // Fetch the video URLs when the component mounts
  }, []);

  return (
    <MultiVideoBackground
      videos={videoURLs} // Use the dynamically fetched video URLs
      objectFit="cover"
      objectPosition="center center"
    >
      <Box sx={{ minHeight: '100vh' }}>
        {children}
      </Box>
    </MultiVideoBackground>
  );
};

export default VideoBackground;
