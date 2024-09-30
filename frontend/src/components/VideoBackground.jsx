import { Box } from '@mui/material';
import React from 'react';

const VideoBackground = ({ src, type = 'video/mp4', children }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    minWidth: '100%',
                    minHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    zIndex: -3,
                    transform: 'translate(-50%, -50%)',
                    objectFit: 'cover',
                }}
            >
                <source src={src} type={type} />
                Your browser does not support the video tag.
            </video>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    textAlign: 'center',
                    padding: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent overlay
                    zIndex: 1, // Ensure content is above video
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default VideoBackground;