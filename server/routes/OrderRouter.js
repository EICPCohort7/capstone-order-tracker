/**
 * Order router for handling address related requests from client
 */

import express from 'express';
import { Order } from '../orm/models/index.js';
import { ValidationError } from 'sequelize';
import { validationResult } from 'express-validator';
import { validateOrder } from './validators/OrderValidator.js';
let router = express.Router();

/**
 * Error handler
*/
function handleError(res, error) {
  return res.status(500).send(`Order endpoint error: ${error.message}`);
}

/*
 * GET api/v1/orders
 * Get all of the system's orders
 * Frontend response: array of objects
 */
router.get('/', async (req, res) => {
  try {
    let orders = await Order.findAll();
    return res.status(200).json(orders);
  } catch (error) {
    handleError(res, error);
  }
});

/*
 * GET api/v1/orders/:orderId
 * Get order by order ID
 * Frontend response: object
 */
router.get('/:orderId([0-9]+)', async (req, res) => {
  try {
    let orderId = req.params.orderId;
    let order = await Order.findByPk(orderId);
    if (order) return res.status(200).json(order);

    return res.status(404).send('Order ID not found');
  } catch (error) {
    handleError(res, error);
  }
});

/*
 * POST api/v1/orders
 * Create new order
 * Frontend response: object
 */
router.post('/', validateOrder, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let newOrder = Order.build({ ...req.body });
    let result = await newOrder.save();
    if (result instanceof ValidationError) {
      console.error('Validation failed:', result);
      throw result;
    }
    return res.status(201).json(newOrder);
  } catch (error) {
    handleError(res, error);
  }
});

/*
 * PUT api/v1/orders/:orderId
 * Replace an already existing order by order ID
 * Frontend response: object
 */
router.put('/:orderId([0-9]+)', async (req, res) => {
  try {
    let order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).send('Order ID not found');

    order.customerId = req.body.customerId || order.customerId;
    order.orderNotes = req.body.orderNotes || null;
    order.orderPlaced = req.body.orderPlaced || null;
    order.orderStatusCode = req.body.orderStatusCode || order.orderStatusCode;
    order.shippingAddressId = req.body.shippingAddressId || null;

    await order.update({ ...req.body });
    console.log('Order updated');
    return res.json(order);
  } catch (error) {
    handleError(res, error);
  }
});

/*
 * PATCH api/orders/:orderId
 * Edit an already existing order by order ID
 * Frontend response: object
 */
router.patch('/:orderId([0-9]+)', async (req, res) => {
  try {
    let order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).send('Order ID not found');

    await order.update({ ...req.body });
    console.log('Order id updated');
    return res.json(order);
  } catch (error) {
    handleError(res, error);
  }
});

/*
 * DELETE api/orders/:orderId
 * Delete a draft order by orderId (shouldn't allow for deletion of live orders)
 * Frontend response: message string
 */
router.delete('/:orderId([0-9]+)', async (req, res) => {
  try {
    let order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).send('Order ID not found');

    await order.destroy();
    console.log('Order deleted.');
    return res.status(204).send('');
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
