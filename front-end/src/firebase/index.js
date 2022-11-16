// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCUqU2d79-VtTcv4YW6fYz97mwnueVDw0M',
  authDomain: 'captone-login-trial.firebaseapp.com',
  projectId: 'captone-login-trial',
  storageBucket: 'captone-login-trial.appspot.com',
  messagingSenderId: '580482058630',
  appId: '1:580482058630:web:10be4dd1af383065488407',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
