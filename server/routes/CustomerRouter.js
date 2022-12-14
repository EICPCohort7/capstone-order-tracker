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

/**
 * GET api/v1/customers/
 * Get all of the system's ACTIVE customers
 * Frontend response: array of objects
 */
router.get('/', async (req, res) => {
  try {
    let activeCustomers = await Customer.findAll({
      where: { isActive: true },
      include: [
        {
          model: Address,
          as: 'address',
        },
      ],
    });

    return res.status(200).json(activeCustomers);
  } catch (error) {
    return handleError(res, error);
  }
});

/**
 * GET api/v1/customers/all
 * Get all of the system's customers (active and inactive)
 * Frontend response: array of objects
 */
router.get('/all/', async (req, res) => {
  try {
    let result = await Customer.findAll({
      include: [
        {
          model: Address,
          as: 'address',
        },
      ],
    });
    return res.status(200).json(result);
  } catch (error) {
    handleError(error);
  }
});

/**
 * GET api/v1/customers/:customerId
 * Get customer by customer ID
 * Frontend response: object
 */
router.get('/:customerId([0-9]+)', async (req, res) => {
  try {
    let customerId = req.params.customerId;
    let customer = await Customer.findByPk(customerId);

    let customerAddress = await customer.getAddress();

    _.merge(customer.dataValues, { address: customerAddress });

    // Use lodash library to check if returned JSON is empty
    if (!_.isEmpty(customer)) {
      return res.status(200).send(customer);
    } else {
      return res.status(404).send('Customer with the passed customerId not found'); // needs to be handled by front-end somehow
    }
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * GET api/v1/customers/:customerId/orders
 * Get all of a customer's orders
 * Frontend response: object
 */
router.get('/:customerId([0-9]+)/orders', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await Customer.findByPk(customerId);

    // Check if the customer exists
    if (_.isEmpty(customer)) {
      return res.status(404).send('Customer with the passed customerId not found'); // needs to be handled by front-end somehow
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

/**
 * GET api/v1/customers/search?email=[email]
 * Get customer by email
 * Frontend response: array of objects
 */
router.get('/search', async (req, res) => {
  console.log('Query string', req.query);
  const criteria = new URLSearchParams(req.query);
  const email = criteria.get('email');

  try {
    if (email) {
      const customer = await Customer.findAll({
        where: { email },
        include: [
          {
            model: Address,
            as: 'address',
          },
        ],
      });

      if (customer.length) {
        return res.json(customer);
      }
      return res.status(404).json();
    }
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * POST api/v1/customers/
 * Create new customer
 *    - Additionally creates a new address if the customer's address doesn't exist. In this sense,
 *      this POST combines the functionality of POST for both customer and address.
 * Frontend response: object
 * The request from the frontend must include both the address and customer data as seen below.
 * The address data is stored in an object called "address".
 *      {
 *        "firstName": "Mike",
 *        ...
 *        "address": {
 *            "street": "123 Main St",
 *            ...
 *        }
 *      }
 */
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
      return res.status(404).send('Customer with the passed email already exists'); // need to handle this in a better way
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
    } else {
      // address doesn't already exist
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

/**
 * PUT api/v1/customers/:customerId
 * Replace existing customer by customerId
 * Frontend response: object
 */
router.put('/:customerId([0-9]+)', async (req, res) => {
  try {
    let customer = await Customer.findByPk(req.params.customerId);
    if (!customer) return res.status(404).send('Passed customer ID not found');

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

/**
 * PATCH api/v1/customers/:customerId
 * Edit an already existing customer by customerId.
 *    - Additionally provides the ability to edit the customer's address. In this sense,
 *      this PATCH combines the functionality of PATCH for both customer and address.
 * Frontend response: object
 * The request from the frontend can optionally include address information as seen below
 * Only edit customer
 *    {
 *        "firstName": "Mike",
 *        ...
 *    }
 * Edit both customer and address
 *    {
 *        "firstName": "Mike",
 *        ...
 *        "address": {
 *            "street": "123 Main St",
 *            ...
 *        }
 *    }
 */
router.patch('/:customerId([0-9]+)', async (req, res) => {
  try {
    let customer = await Customer.findByPk(req.params.customerId);
    if (!customer) return res.status(404).send('Passed customer ID not found');

    if (req.body.address) {
      let customerAddress = await customer.getAddress();
      await customerAddress.update({ ...req.body.address });
    }

    await customer.update({ ...req.body });
    console.log(`Customer id ${req.params.customerId} updated`);
    return res.status(200).json(customer);
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * DELETE api/v1/customers/:customerId
 * Delete customer by customer ID
 * Won't actually get used
 * Frontend response: message string
 */
router.delete('/:customerId([0-9]+)', async (req, res) => {
  try {
    let customerId = req.params.customerId;
    let customer = await Customer.findByPk(customerId);
    if (!customer) return res.status(404).send('Passed customer ID not found');
    await customer.destroy();
    console.log(`Customer ${req.params.customerId} deleted.`);
    return res.status(204).send(''); // Customer deleleted, no response required
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * Error handler
 */
function handleError(res, error) {
  return res.status(500).send(`Customer endpoint error: ${error.message}`);
}

export default router;
