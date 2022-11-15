/**
 * Customer router for handling customer related requests from client
 *
 * Utility functions from Lodash library utilised
 *    - https://lodash.com/
 */
import express from 'express';
import { ValidationError } from 'sequelize';
import { Customer, Address, Order } from '../orm/models/index.js';
import { validationResult } from 'express-validator';
import { validateCustomer } from './validators/CustomerValidator.js';

import _ from 'lodash';
let router = express.Router();

// Frontend response
// findAll() returns an array of objects
// findByPk returns an object

// GET api/v1/customers/
// Get all of the system's ACTIVE customers
// Frontend response: array of objects
router.get('/', async (req, res) => {
  try {
    let activeCustomers = await Customer.findAll({
      where: { isActive: true },
    });
    return res.status(200).json(activeCustomers);
  } catch (error) {
    return handleError(res, error);
  }
});

// GET api/v1/customers/all
// Get all of the system's customers (active and inactive)
// Frontend response: array of objects
router.get('/all/', async (req, res) => {
  try {
    let result = await Customer.findAll();
    return res.status(200).json(result);
  } catch (error) {
    handleError(error);
  }
});

// GET api/v1/customers/:customerId
// Get customer by customer ID
// Frontend response: object
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
    handleError(res, error);
  }
});

// GET api/v1/customers/:customerId/orders
// Get all of a customer's orders
// Frontend response: object
router.get('/:customerId([0-9]+)/orders', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await Customer.findByPk(customerId);

    // Check if the customer exists
    if (_.isEmpty(customer)) {
      return res.status(404).send(`Customer with the customerId of ${customerId} not found :(`); // needs to be handled by front-end somehow
    }

    // Get the customer's orders
    const orders = await Order.findAll({
      where: {
        customerId,
      },
    });
    return res.json(orders);
  } catch (error) {
    handleError(res, error);
  }
});

// GET api/v1/customers/search?email=[email]
// Get customer by email
// Frontend response: array of objects
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
    handleError(res, error);
  }
});

// POST api/v1/customers/
// Create new customer - also creates a new address if the new customer doesn't have an address
// that already exists
// Frontend response: object
router.post('/', validateCustomer, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // check if a customer with that email already exists
    let result = await Customer.findAll({
      where: {
        email: req.body.email,
      },
    });
    if (result.length) {
      return res.status(404).send(`Customer with email ${req.body.email} already exists`); // need to handle this in a better way
    }
    // check if address already exists
    const street = req.body.address.street;
    const aptNum = req.body.address.aptNum || null;
    const city = req.body.address.city;
    const state = req.body.address.state || null;
    const zip = req.body.address.zip;
    const country = req.body.address.country;
    const existingAddress = await Address.findOne({
      where: {
        street,
        aptNum,
        city,
        state,
        zip,
        country,
      },
    });

    let actualAddressId;

    // address already exists
    if (existingAddress !== null) {
      actualAddressId = existingAddress.dataValues.addressId;
    } else { // address doesn't already exist
      const newAddress = Address.build({ ...req.body.address }); // create new Address
      if (newAddress instanceof ValidationError) {
        console.error('Validation failed:', newAddress);
        throw newAddress;
      }
      result = await newAddress.save();

      if (result instanceof ValidationError) {
        console.error('Validation failed:', result);
        throw result;
      }
      actualAddressId = newAddress.dataValues.addressId;
    }

    // create the new Customer
    const newCustomer = Customer.build({
      firstName: req.body.firstName,
      middleInitial: req.body.middleInitial || null,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      customerNotes: req.body.customerNotes || null,
      billingAddressId: actualAddressId,
    });

    result = await newCustomer.save();

    if (result instanceof ValidationError) {
      console.error('Validation failed:', result);
      throw result;
    }

    return res.status(201).send(result);
  } catch (error) {
    handleError(res, error);
  }
});

// PUT api/v1/customers/:customerId
// Replace existing customer by customerId
// Frontend response: object
router.put('/:customerId([0-9]+)', async (req, res) => {
  try {
    let customer = await Customer.findByPk(req.params.customerId);
    if (!customer) return res.status(404).send(`Customer ID ${req.params.customerId} not found`);

    // PUT _replaces_ the record, whereas PATCH merges the record
    customer.firstName = req.body.firstName || customer.firstName;
    customer.middleInitial = req.body.middleInitial || null;
    customer.lastName = req.body.lastName || customer.lastName;
    customer.phone = req.body.phone || customer.phone;
    customer.email = req.body.email || customer.email;
    customer.customerNotes = req.body.customerNotes || null;
    customer.billingAddressId = req.body.billingAddressId || customer.billingAddressId;
    customer.isActive = req.body.isActive || customer.isActive;

    await customer.update({ ...req.body });
    console.log(`Customer id ${req.params.customerId} updated`);
    return res.json(customer);
  } catch (error) {
    handleError(res, error);
  }
});

// PATCH api/v1/customers/:customerId
// Edit an already existing customer by customerId
// Frontend response: object
router.patch('/:customerId([0-9]+)', async (req, res) => {
  try {
    let customer = await Customer.findByPk(req.params.customerId);
    if (!customer) return res.status(404).send(`Customer ID ${req.params.customerId} not found`);

    await customer.update({ ...req.body });
    console.log(`Customer id ${req.params.customerId} updated`);
    return res.status(200).json(customer);
  } catch (error) {
    handleError(res, error);
  }
});

// DELETE api/v1/customers/:customerId
// Delete customer by customer ID
// Won't actually get used
// Frontend response: message string
router.delete('/:customerId([0-9]+)', async (req, res) => {
  try {
    let customerId = req.params.customerId;
    let customer = await Customer.findByPk(customerId);
    if (!customer) return res.status(404).send(`Customer ID ${req.params.customerId} not found`);
    await customer.destroy();
    console.log(`Customer ${req.params.customerId} deleted.`);
    return res.status(204).send(''); // Customer deleleted, no response required
  } catch (error) {
    handleError(res, error);
  }
});

// Error handler
function handleError(res, error) {
  return res.status(500).send(`Customer endpoint error: ${error.message}`);
}

export default router;
