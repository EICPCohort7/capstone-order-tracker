/** Test file for executing HTTP requests through API */
import axios from 'axios';
import { response } from 'express';

try {
  await axios.post('http://localhost:3000/api/v1/register', {
    username: 'fakeemaiss',
    password: 'plaintext',
  });
} catch (error) {
  if (error.response.status === 401) {
    console.log(error.response.data);
  }
}

try {
  await axios.get('http://localhost:3000/api/v1/customers/111');
} catch (error) {
  console.log(error.response.data);
}
