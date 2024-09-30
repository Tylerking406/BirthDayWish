// scripts/uploadMedia.js
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db, storage } from '../src/firebase.js'; // Adjust the path based on where you place uploadMedia.js

// If using ES modules, you need to handle __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to your image and video files relative to the script's location
const images = [
    path.join(__dirname, '../public/assets/images/1.jpg'),
    path.join(__dirname, '../public/assets/images/2.jpg'),
    path.join(__dirname, '../public/assets/images/3.jpg'),
    path.join(__dirname, '../public/assets/images/4.jpg'),
    path.join(__dirname, '../public/assets/images/5.jpg'),
    path.join(__dirname, '../public/assets/images/6.jpg'),
    path.join(__dirname, '../public/assets/images/7.jpg'),
    path.join(__dirname, '../public/assets/images/8.jpg'),
    path.join(__dirname, '../public/assets/images/9.jpg'),
    path.join(__dirname, '../public/assets/images/10.jpg'),
    path.join(__dirname, '../public/assets/images/11.jpg'),
    path.join(__dirname, '../public/assets/images/12.jpg')
];

const videos = [
    path.join(__dirname, '../public/assets/videos/1.mp4'),
    path.join(__dirname, '../public/assets/videos/2.mp4'),
    path.join(__dirname, '../public/assets/videos/3.mp4'),
    path.join(__dirname, '../public/assets/videos/4.mp4')
];

// Function to upload media
const uploadMedia = async () => {
    try {
        const imageCollection = collection(db, 'images'); // Reference to the images collection
        const videoCollection = collection(db, 'videos'); // Reference to the videos collection

        // Upload images
        for (const imagePath of images) {
            // Check if file exists
            if (!fs.existsSync(imagePath)) {
                console.error(`Image file does not exist: ${imagePath}`);
                continue; // Skip to the next file
            }

            const imageBuffer = fs.readFileSync(imagePath); // Read the image file as a buffer
            const imageName = path.basename(imagePath); // Get the file name
            const imageRef = ref(storage, `images/${imageName}`); // Create a storage reference for the image

            await uploadBytes(imageRef, imageBuffer); // Upload the image buffer to Firebase Storage
            const downloadURL = await getDownloadURL(imageRef); // Get the download URL

            // Add the download URL to Firestore
            await addDoc(imageCollection, { url: downloadURL });
            console.log(`Uploaded image: ${downloadURL}`);
        }

        // Upload videos
        for (const videoPath of videos) {
            // Check if file exists
            if (!fs.existsSync(videoPath)) {
                console.error(`Video file does not exist: ${videoPath}`);
                continue; // Skip to the next file
            }

            const videoBuffer = fs.readFileSync(videoPath); // Read the video file as a buffer
            const videoName = path.basename(videoPath); // Get the file name
            const videoRef = ref(storage, `videos/${videoName}`); // Create a storage reference for the video

            await uploadBytes(videoRef, videoBuffer); // Upload the video buffer to Firebase Storage
            const downloadURL = await getDownloadURL(videoRef); // Get the download URL

            // Add the download URL to Firestore
            await addDoc(videoCollection, { url: downloadURL });
            console.log(`Uploaded video: ${downloadURL}`);
        }

        console.log('All media uploaded successfully!');
    } catch (error) {
        console.error('Error uploading media: ', error);
    }
};

// Run the upload function
uploadMedia();
