import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const MultiVideoBackground = ({ 
    videos, 
    children, 
    objectFit = 'cover',
    objectPosition = 'center'
}) => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoRefs = useRef(videos.map(() => React.createRef())); // Create refs for each video

    useEffect(() => {
        const currentVideo = videoRefs.current[currentVideoIndex]?.current; // Safe access with optional chaining
        const nextVideoIndex = (currentVideoIndex + 1) % videos.length;
        const nextVideo = videoRefs.current[nextVideoIndex]?.current; // Safe access with optional chaining

        // Ensure both current and next videos exist
        if (currentVideo && nextVideo) {
            const handleEnded = () => {
                currentVideo.style.opacity = 0;
                nextVideo.style.opacity = 1;
                nextVideo.play();
                setCurrentVideoIndex(nextVideoIndex);
            };

            currentVideo.addEventListener('ended', handleEnded);

            // Cleanup on unmount or index change
            return () => {
                currentVideo.removeEventListener('ended', handleEnded);
            };
        }
    }, [currentVideoIndex, videos]);

    useEffect(() => {
        const currentVideo = videoRefs.current[currentVideoIndex]?.current; // Safe access with optional chaining
        if (currentVideo) {
            currentVideo.play();
        }
    }, [currentVideoIndex]); // Only runs when currentVideoIndex changes

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            {videos.map((src, index) => (
                <video
                    key={src}
                    ref={videoRefs.current[index]}
                    muted
                    playsInline
                    autoPlay // Ensure autoplay for the videos
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        minWidth: '100%',
                        minHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        zIndex: -1,
                        transform: 'translate(-50%, -50%)',
                        objectFit,
                        objectPosition,
                        opacity: index === currentVideoIndex ? 1 : 0,
                        transition: 'opacity 1s ease-in-out',
                    }}
                >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ))}
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
                    zIndex: 1, // Ensure content is above videos
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default MultiVideoBackground;
