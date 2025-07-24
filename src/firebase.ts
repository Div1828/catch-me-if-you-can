import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCWVwbSn54SZiyF0rQTs1WLEb6TbkbPsVU",
  authDomain: "catch-me-if-you-can-b3b53.firebaseapp.com",
  databaseURL: "https://catch-me-if-you-can-b3b53-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "catch-me-if-you-can-b3b53",
  storageBucket: "catch-me-if-you-can-b3b53.firebasestorage.app",
  messagingSenderId: "711977868491",
  appId: "1:711977868491:web:e39db6dc9752885672cf4e"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);