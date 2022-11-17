import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

/**
 * Firebase SDK configuration
 */
const firebaseConfig = {
  apiKey: 'AIzaSyDBwudajT79KwjOATHCrmmcyDLbZKj68uI',
  authDomain: 'capstone-order-tracker.firebaseapp.com',
  projectId: 'capstone-order-tracker',
  storageBucket: 'capstone-order-tracker.appspot.com',
  messagingSenderId: '250968406037',
  appId: '1:250968406037:web:d429e612dbeafb055a361c',
  measurementId: 'G-34K3MX34DS',
};

/**
 * Initialize Firebase app and authentication
 */
export const fbApp = initializeApp(firebaseConfig);
export const auth = getAuth(fbApp);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.uid);
  }
});
