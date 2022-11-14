/**
 * Customer router for handling customer related requests from client
 *
 * Utility functions from Lodash library utilised
 *    - https://lodash.com/
 */
import express from 'express';
import { ValidationError } from 'sequelize';
import { Customer } from '../orm/models/index.js';
import { validationResult } from 'express-validator';
import { validateCustomer } from './validators/CustomerValidator.js';

import _ from 'lodash';
let router = express.Router();

// GET api/v1/customers/
// Get all of the system's ACTIVE customers
router.get('/', async (req, res) => {
  try {
    let activeCustomers = await Customer.findAll({
      where: { isActive: true },
    });
    return res.status(200).json(activeCustomers);
  } catch (error) {
    return errorHandler(res, error);
  }
});

// GET api/v1/customers/all
// Get all of the system's customers (active and inactive)
router.get('/all/', async (req, res) => {
  try {
    let result = await Customer.findAll();
    return res.status(200).json(result);
  } catch (error) {
    errorHandler(error);
  }
});

// GET api/v1/customers/:customerId
// Get customer by customer ID
router.get('/:customerId([0-9]+)', async (req, res) => {
  try {
    let customerId = req.params.customerId;
    let customer = await Customer.findByPk(customerId);

    // Use lodash library to check if returned JSON is empty
    if (!_.isEmpty(customer)) {
      return res.status(200).send(customer);
    } else {
      return res.status(404).send(`Customer with the customerId of ${customerId} not found :(`); // needs to be handled by front-end somehow
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

// GET api/v1/customers/search?email=[email]
// Get customer by email
router.get('/search', async (req, res) => {
  console.log('Query string', req.query);
  let criteria = new URLSearchParams(req.query);
  let email = criteria.get('email');

  try {
    if (email) {
      let result = await Customer.findAll({
        where: {
          email,
        },
      });
      if (result.length) return res.json(result);
      return res.status(404).json();
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

// POST api/v1/customers/
// Create new customer
router.post('/', validateCustomer, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let addCustomer = Customer.build({ ...req.body });
    let result = await addCustomer.save();

    if (result instanceof ValidationError) {
      console.error('Validation failed:', result);
      throw result;
    }
    return res.status(201).json(addCustomer);
  } catch (error) {
    errorHandler(res, error);
  }
});

// PUT api/v1/customers/:customerId
// Modify existing customer by customerId
router.put('/:customerId([0-9]+)', async (req, res) => {
  try {
    let customer = await Customer.findByPk(req.params.customerId);
    if (!customer) return res.status(404).send(`Customer ID ${req.params.customerId} not found`);

    // PUT _replaces_ the record, whereas PATCH merges the record
    customer.firstName = req.body.firstName || null;
    customer.middleInitial = req.body.middleInitial || null;
    customer.lastName = req.body.lastName || null;
    customer.phone = req.body.phone || null;
    customer.email = req.body.email || null;
    customer.customerNotes = req.body.customerNotes || null;
    customer.billingAddressId = req.body.billingAddressId || null;
    customer.isActive = req.body.isActive || null;

    await customer.update({ ...req.body });
    console.log(`Customer id ${req.params.customerId} updated`);
    return res.json(customer);
  } catch (error) {
    errorHandler(res, error);
  }
});

// PATCH api/v1/customers/:customerId
// Edit an already existing customer by customerId
router.patch('/:customerId([0-9]+)', async (req, res) => {
  try {
    let customer = await Customer.findByPk(req.params.customerId);
    if (!customer) return res.status(404).send(`Customer ID ${req.params.customerId} not found`);

    await customer.update({ ...req.body });
    console.log(`Customer id ${req.params.customerId} updated`);
    return res.status(200).json(customer);
  } catch (error) {
    errorHandler(res, error);
  }
});

// DELETE api/v1/customers/:customerId
// Delete customer by customer ID
router.delete('/:customerId([0-9]+)', async (req, res) => {
  try {
    let customerId = req.params.customerId;
    let customer = await Customer.findByPk(customerId);
    if (!customer) return res.status(404).send(`Customer ID ${req.params.customerId} not found`);
    await customer.destroy();
    console.log(`Customer ${req.params.customerId} deleted.`);
    return res.status(204).send(''); // Customer deleleted, no response required
  } catch (error) {
    errorHandler(res, error);
  }
});

function errorHandler(res, error) {
  return res.status(500).send(`Customer endpoint error: ${error.message}`);
}

export default router;
