import CloseIcon from '@mui/icons-material/Close'; // Close icon
import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import NavigationTabs from '../components/NavigationTabs.js';
import VideoBackground from '../components/VideoBackground.js';
import { storage } from '../firebase.js'; // Import your Firebase config

const GalleryPage = () => {
  const [tabValue, setTabValue] = useState(1); // Controls which tab is active
  const [showImages, setShowImages] = useState(true); // Toggle images/videos
  const [openModal, setOpenModal] = useState(false); // Control modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // Store selected image
  const [images, setImages] = useState([]); // State for images
  const [videos, setVideos] = useState([]); // State for videos

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const handleImageClick = (image) => {
    setSelectedImage(image); // Open selected image
    setOpenModal(true); // Open modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close modal
    setSelectedImage(null); // Reset selected image
  };

  // Fetch images and videos from Firebase on component mount
  useEffect(() => {
    const fetchImages = async () => {
      const imageListRef = ref(storage, 'images/'); // Adjust your path as necessary
      const imageList = await listAll(imageListRef);
      const imagePromises = imageList.items.map((item) =>
        getDownloadURL(item).then((url) => url)
      );
      const imageUrls = await Promise.all(imagePromises);
      setImages(imageUrls);
    };

    const fetchVideos = async () => {
      const videoListRef = ref(storage, 'videos/'); // Adjust your path as necessary
      const videoList = await listAll(videoListRef);
      const videoPromises = videoList.items.map((item) =>
        getDownloadURL(item).then((url) => url)
      );
      const videoUrls = await Promise.all(videoPromises);
      setVideos(videoUrls);
    };

    fetchImages();
    fetchVideos();
  }, []);

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
