import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase.js'; // Use import instead of require

// Array of messages to add
const messages = [
  { header: "Happy 21st Birthday!", content: "Cheers to you on this amazing milestone!" },
  { header: "You Shine Bright!", content: "Your smile lights up the world; keep shining!" },
  { header: "21 Looks Fabulous!", content: "Embrace this year and all the adventures it brings!" },
  { header: "Here's to You!", content: "May this year be filled with love, laughter, and unforgettable memories!" },
  { header: "Birthday Wishes!", content: "Wishing you a day as wonderful as you are!" },
  { header: "Maya Angelou", content: "You can't use up creativity. The more you use, the more you have." },
  { header: "Pablo Picasso", content: "It takes a long time to become young." },
  { header: "C.S. Lewis", content: "You are never too old to set another goal or to dream a new dream." },
  { header: "Dr. Seuss", content: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose." },
  { header: "Monkey D. Luffy", content: "I don't want to conquer anything. I just think the guy with the most freedom in this whole ocean… is the King!" },
  { header: "Roronoa Zoro", content: "You don't get to decide how you die. You just have to live." },
  { header: "Nami", content: "I'm not a hero; I'm just a girl who wants to be free!" },
  { header: "Sanji", content: "A man's worth is not measured by how he treats the people he hates, but how he treats the people he loves." },
  { header: "Tony Tony Chopper", content: "You can't make the world a better place by just sitting on the sidelines." },
];

const addMessagesToFirestore = async () => {
  try {
    const messagesCollection = collection(db, 'messages'); // Reference to 'messages' collection

    for (const message of messages) {
      await addDoc(messagesCollection, message);
      console.log(`Added message: ${message.header}`);
    }
    
    console.log('All messages added successfully!');
  } catch (error) {
    console.error('Error adding messages: ', error);
  }
};

// Call the function to add messages
addMessagesToFirestore();
