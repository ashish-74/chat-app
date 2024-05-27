importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAy7yFpgKYeHM7A3PFQq3FK7TBfPya_qOA",
    authDomain: "chat-app-0987.firebaseapp.com",
    projectId: "chat-app-0987",
    storageBucket: "chat-app-0987.appspot.com",
    messagingSenderId: "153534918873",
    appId: "1:153534918873:web:232ef56f07060761624ec8",
    measurementId: "G-9RRCZKYRE0"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
// Customize background notification handling here
messaging.onBackgroundMessage((payload) => {
  console.log('Background Message:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});