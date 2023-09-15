'use client'

import PushNotificationLayout from "@/components/PushNotificationLayout";
import { useState } from "react";
import axios from 'axios';
import './globals.css';


export default function Home() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem('token');
  const title = `Hi ${username}`;
  const body = 'Welcome to HRMS';
  

  const showNotification = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/api/sendNotification', { token, title, body }, {
        headers: {
          Authorization: `key=AAAAouCF9vY:APA91bEvDGTc9dbiGnMAd4gd_ambM8hiAR94XF8vhRfihySdciLKInctBSlWEtbtm0hmrcK3i96ul3IV4r7eF3Wo-7qKxxMqKeajvMciNkCJ6Jg6zzheT34J4c3rS8ZuSE6cD2n3JzYB`,
        }
      });
      if (username && password) {
        token && new Notification(title, { body: body });
      } else {
        new Notification("Please fill required field");
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }



  // useEffect(() => {
  //   const messaging = firebase?.messaging();
  //   messaging
  //     .requestPermission()
  //     .then(() => {
  //       console.log('Notification permission granted.');
  //       return messaging.getToken();
  //     })
  //     .then((token) => {
  //       console.log('FCM Token:', token);
  //     })
  //     .catch((error) => {
  //       console.error('Unable to get permission to notify.', error);
  //     });
  // }, []);

  // const sendNotificationToOtherDevice = async () => {
  //   try {
  //     const response = await axios.post('/api/sendNotification', {
  //       targetDeviceToken: 'egQ2v7BNTSQK81mLaDtxmP:APA91bEwzHV3VcTlltOJFAK2pS3AEsh_qfZ3HLMwzI26FrMJAlb3SIj4eRkW6YmNmhFnXGtIsMOXKsO-ISKoJbzVGM9htFK1LFmMGUpf0CgYUPGPmXw-t31JFVchgA5nc424VHvIW9pg',
  //       title: 'Your Notification Title',
  //       body: 'Your Notification Message',
  //     });
  //     console.log('Notification sent:', response.data);
  //   } catch (error) {
  //     console.error('Error sending notification:', error);
  //   }
  // };

  return (
    <PushNotificationLayout>
      <main>
        <h2 className="btn">Login Page</h2>
        <form action="#" method="">
          <div className="container">
            <div className="form-item">
              <label><b>Username:</b></label>
              <input type="text" placeholder="Enter Username" required value={username} onChange={(e) => { setUsername(e.target.value) }} />
            </div>
            <div className="form-item">
              <label><b>Password:</b></label>
              <input type="password" placeholder="Enter Password" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            <button onClick={showNotification} type="button">Login</button>
          </div>
        </form>

      </main>
    </PushNotificationLayout>
  );
}



