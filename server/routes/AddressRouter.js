/**
 * Address router for handling address related requests from client
 *
 * Utility functions from Lodash library utilised
 *    - https://lodash.com/
 */

import express from 'express';
import { ValidationError } from 'sequelize';
import { Address } from '../orm/models/index.js';

import _ from 'lodash';
let router = express.Router();

// Frontend response
// findAll() returns an array of objects
// findByPk returns an object

// GET api/v1/addresses/
// Get all of the system's addresses
router.get('/', async (req, res) => {
  return res.json(await Address.findAll());
});

// GET api/v1/addresses/:addressId
// Get address by address ID
router.get('/:addressId([0-9]+)', async (req, res) => {
  try {
    let addressId = req.params.addressId;
    let address = await Address.findByPk(addressId);

    // Use lodash library to check if returned JSON is empty
    if (!_.isEmpty(address)) {
      return res.status(201).send(address);
    } else {
      return res.status(400).send(`Address with the addressId of ${addressId} not found :(`); // needs to be handled by front-end somehow
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

// POST api/v1/addresses/
// Create new address
router.post('/', async (req, res) => {
  try {
    let addAddress = Address.build({ ...req.body });
    let result = await addAddress.save();

    if (result instanceof ValidationError) {
      console.error('Validation failed:', result);
      throw result;
    }
    return res.status(201).json(addAddress);
  } catch (error) {
    errorHandler(res, error);
  }
});

function errorHandler(res, error) {
  return res.status(500).send(`Address endpoint error: ${error.message}`);
}

export default router;
