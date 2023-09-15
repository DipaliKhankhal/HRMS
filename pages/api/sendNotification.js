
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { token, title, body } = req.body;
      const response = await axios.post('https://fcm.googleapis.com/fcm/send',
        {
          to: token,
          notification: {
            title,
            body,
          },
        },
        {
          headers: {
            Authorization: `key=AAAA3Pqh9Mc:APA91bFkIvYsXTP_Pv7nGEeXcXKSqAOBm8LFV7_9oDvsiCnaxh5xL-_ABWpw0KLBnvW_i1D8EzLT6i6JXUPXkeNCXbPNQc2Lc71_DT9jyrEx5yDr_qpmIkiPreE7oXdZRz4zJJYy5K8k`,
          },
        }
      );
      res.status(200).json({ success: true, response: response?.data });
    } catch (error) {
      console.error('Error sending notification:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// // pages/api/send-notification.js
// import firebase from './../../config';

// export default async (req, res) => {
//   const { targetDeviceToken, title, body } = req.body;
//   const messaging = firebase?.messaging();
 
//   try {
//     const message = {
//       notification: {
//         title,
//         body,
//       },
//       token: targetDeviceToken,
//     };

//     await messaging?.send(message);
//     res.status(200).json({ message: 'Notification sent successfully' });
//   } catch (error) {
//     console.error('Error sending notification:', error);
//     res.status(500).json({ message: 'Error sending notification' });
//   }
// };




