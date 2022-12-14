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

/**
 * GET api/v1/addresses/
 * Get all of the system's addresses
 * Frontend response: array of objects
 */
router.get('/', async (req, res) => {
  return res.json(await Address.findAll());
});

/**
 * GET api/v1/addresses/:addressId
 * Get address by address ID
 * Frontend response: object
 */
router.get('/:addressId([0-9]+)', async (req, res) => {
  try {
    let addressId = req.params.addressId;
    let address = await Address.findByPk(addressId);

    // Use lodash library to check if returned JSON is empty
    if (!_.isEmpty(address)) {
      return res.status(201).send(address);
    } else {
      return res.status(400).send('Address with the specified not found :('); // needs to be handled by front-end somehow
    }
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * POST api/v1/addresses/
 * Create new address
 * Frontend response: object
 */
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
    handleError(res, error);
  }
});

/**
 * Error handler
 */
function handleError(res, error) {
  return res.status(500).send(`Address endpoint error: ${error.message}`);
}

export default router;
