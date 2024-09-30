// GalleryPage.js
import CloseIcon from '@mui/icons-material/Close'; // Close icon
import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import NavigationTabs from '../components/NavigationTabs';
import VideoBackground from '../components/VideoBackground';

const images = [
  '/assets/images/1.jpg', '/assets/images/2.jpg', '/assets/images/3.jpg',
  '/assets/images/4.jpg', '/assets/images/5.jpg', '/assets/images/6.jpg',
  '/assets/images/7.jpg', '/assets/images/8.jpg', '/assets/images/9.jpg',
  '/assets/images/10.jpg', '/assets/images/11.jpg', '/assets/images/12.jpg'
];

const videos = [
  '/assets/videos/1.mp4', '/assets/videos/2.mp4', 
  '/assets/videos/3.mp4', '/assets/videos/4.mp4'
];

const GalleryPage = () => {
  const [tabValue, setTabValue] = useState(1); // Controls which tab is active
  const [showImages, setShowImages] = useState(true); // Toggle images/videos
  const [openModal, setOpenModal] = useState(false); // Control modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // Store selected image

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const handleImageClick = (image) => {
    setSelectedImage(image); // Open selected image
    setOpenModal(true); // Open modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close modal
    setSelectedImage(null); // Reset selected image
  };

  return (
    <VideoBackground>
      <Box sx={{ flexGrow: 1 }}>
        <NavigationTabs tabValue={tabValue} handleTabChange={handleTabChange} />
        <Box sx={{ mt: 10, textAlign: 'center', height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h4" sx={{ color: 'white', mb: 4 }}>
            Welcome to the Gallery
          </Typography>

          {/* Toggle Buttons */}
          <Box sx={{ mb: 2 }}>
            <Button 
              variant={showImages ? 'contained' : 'outlined'} 
              color="primary" 
              onClick={() => setShowImages(true)} 
              sx={{ marginRight: 1 }}
            >
              Images
            </Button>
            <Button 
              variant={!showImages ? 'contained' : 'outlined'} 
              color="primary" 
              onClick={() => setShowImages(false)} 
            >
              Videos
            </Button>
          </Box>

          {/* Image or Video Grid */}
          <Box sx={{ padding: 2, borderRadius: '8px', boxShadow: 2, height: 'calc(100% - 64px)', overflowY: 'auto' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
              {showImages ? (
                images.map((image, index) => (
                  <Box key={index} onClick={() => handleImageClick(image)} sx={{ cursor: 'pointer' }}>
                    <Box component="img" src={image} alt={`Gallery Image ${index + 1}`} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', boxShadow: 1 }} />
                  </Box>
                ))
              ) : (
                videos.map((video, index) => (
                  <Box key={index}>
                    <Box component="video" src={video} controls sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', boxShadow: 1 }} />
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>

        {/* Modal for Selected Image */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              boxShadow: 'none',
            },
          }}
        >
          <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }} aria-label="close">
              <CloseIcon />
            </IconButton>
            {selectedImage && (
              <Box component="img" src={selectedImage} alt="Selected" sx={{ width: 'auto', maxHeight: '90vh', objectFit: 'contain', zIndex: 10 }} />
            )}
          </Box>
        </Dialog>
      </Box>
    </VideoBackground>
  );
};

export default GalleryPage;
