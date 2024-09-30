// VideoBackground.js
import { Box } from '@mui/material';
import React from 'react';
import MultiVideoBackground from '../components/MultiVideoBackground.jsx';

const VideoBackground = ({ children }) => {
  const videos = [
    '/assets/videos/us.mp4',
    '/assets/videos/friends.mp4'
  ];

  return (
    <MultiVideoBackground 
      videos={videos}
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
