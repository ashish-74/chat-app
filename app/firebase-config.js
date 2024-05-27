import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getMessaging, getToken, onMessage } from '@firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAy7yFpgKYeHM7A3PFQq3FK7TBfPya_qOA",
    authDomain: "chat-app-0987.firebaseapp.com",
    projectId: "chat-app-0987",
    storageBucket: "chat-app-0987.appspot.com",
    messagingSenderId: "153534918873",
    appId: "1:153534918873:web:232ef56f07060761624ec8",
    measurementId: "G-9RRCZKYRE0"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
const setupNotifications = async () => {
  try {
    // Request permission for notifications
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // Get the FCM token
      const token = await getToken(messaging);
      console.log('FCM Token:', token);
    } else {
      console.log('Notification permission denied.');
    }
    // Handle foreground notifications
    onMessage(messaging, (payload) => {
      console.log('Foreground Message:', payload);
      // Handle the notification or update your UI
    });
  } catch (error) {
    console.error('Error setting up notifications:', error);
  }
};

export const auth = getAuth(app)
export const db = getFirestore(app)
export { messaging, setupNotifications };

