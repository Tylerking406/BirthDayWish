import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import VideoBackground from '../components/VideoBackground';

const HomePage = () => {
    const [videoError, setVideoError] = useState(false);

    const handleVideoError = () => {
        console.error("Video failed to load");
        setVideoError(true);
    };

    return (
        <VideoBackground 
            src="/assets/videos/2.mp4" 
            onError={handleVideoError}
        >
            <Box>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to My Website Home
                </Typography>
                <Button variant="contained" color="primary">
                    Hello World
                </Button>
                {videoError && (
                    <Typography color="error">
                        Error: Video failed to load. Please check the console for more details.
                    </Typography>
                )}
            </Box>
        </VideoBackground>
    );
};

export default HomePage;