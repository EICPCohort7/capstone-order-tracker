import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseConfig.js';
import express from 'express';

let router = express.Router();
// const auth = getAuth();

/**
 * Route for getting customer credentials from the HTTP request body
 * Validate and register with Firebase cloud
 */
router.post('/register', async (req, res) => {
  let email = req.body.username;
  let password = req.body.password;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return res.status(201).json('Responded with 200: User registered successfully');
  } catch (error) {
    // Submitted credential issue.
    return res.status(401).json(`Responded with 401 - ${error.code} + ${error.message}`);
  }
});

/**
 * Route for getting customer credentials from the HTTP request body
 * Validate and login / reject based on Firebase cloud response
 */
router.post('/login', async (req, res) => {
  let email = req.body.username;
  let password = req.body.password;
  try {
    let userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return res.status(200).json('User logged in successfully');
  } catch (error) {
    // Submitted credential issue.
    return res.status(401).json(`Responded with 401 - ${error.code} + ${error.message}`);
  }
});

export default router;
