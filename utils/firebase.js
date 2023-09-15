import  'firebase/compat/messaging';
import firebase from 'firebase/compat/app';
import localforage from "localforage";

const firebaseCloudMessaging = {
  init: async () => {
    if (!firebase?.apps?.length) {

      // Initialize the Firebase app with the credentials
      firebase?.initializeApp({
        apiKey: "AIzaSyBaX_pENYW9gHXR0pA2foZYy4Hgn4fbilU",
        authDomain: "notification-f8e3f.firebaseapp.com",
        projectId: "notification-f8e3f",
        storageBucket: "notification-f8e3f.appspot.com",
        messagingSenderId: "949097723079",
        appId: "1:949097723079:web:800616922a7b9d4a69fae2",
        measurementId: "G-07K9CB2JWV"
      });

      try {
        const messaging = firebase?.messaging();
        const tokenInLocalForage = await localforage.getItem("fcm_token");


         // Return the token if it is alredy in our local storage
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === "granted") {
        // Get new token from Firebase
          const fcm_token = await messaging?.getToken({
            vapidKey: "BCJNtt1Zuru5sSDcin_7S_dAYgYrdqr5XwGo8LZWAJC14BTiHQ6eDfEHHGKUBrIIYgg7VK8QWMW9_8NF9o-nUu8",
          });

          // Set token in our local storage
          if (fcm_token) {     
            localforage.setItem("fcm_token", fcm_token);
            console.log(fcm_token,"fcm_token");
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export { firebaseCloudMessaging };
