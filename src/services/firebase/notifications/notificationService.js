// This is the notification service that will be used to send notifications to the user

import admin from 'firebase-admin';
import { UserModel } from '../../../models/index.js';
import { messaging } from '../../../config/firebaseConfig.js';

// Function to send a push notification to a user
async function sendPushNotification(token, title, body) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  try {
    await messaging.send(message);
    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

// Function to subscribe a user to a topic
async function subscribeToTopic(token, topic) {
  await messaging.subscribeToTopic(token, topic);
}

// Function to send a push notification to a topic
async function sendTopicNotification(topic, title, body) {
  const message = {
    notification: { title, body },
    topic: topic,
  };

  try {
    await messaging.send(message);
    console.log('Topic notification sent successfully');
  } catch (error) {
    console.error('Error sending topic notification:', error);
  }
}

// Function to unsubscribe a user from a topic
async function unsubscribeFromTopic(token, topic) {
  try {
    await messaging.unsubscribeFromTopic(token, topic);
    console.log(`Token successfully unsubscribed from topic: ${topic}`);
  } catch (error) {
    console.error(`Error unsubscribing from topic: ${error}`);
  }
}

export {
  sendPushNotification,
  subscribeToTopic,
  sendTopicNotification,
  unsubscribeFromTopic,
};
