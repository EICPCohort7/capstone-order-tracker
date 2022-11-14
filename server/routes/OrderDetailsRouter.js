/*
  Order details router for handling order details related requests from client.
  This is not part of the original API endpoints.
 */

import express from 'express';
import { OrderDetails } from '../orm/models/index.js';
import { ValidationError } from 'sequelize';

let router = express.Router();

// Frontend response
// findAll() returns an array of objects
// findByPk returns an object

// GET api/v1/orderdetails/
// Get all of the system's order details rows
// Frontend response: array of objects
router.get('/', async (req, res) => {
  return res.json(await OrderDetails.findAll());
});

// GET api/v1/orderdetails/:orderDetailsId
// Get order detail by order detail ID
// Frontend response: object
router.get('/:orderDetailsId([0-9]+)', async (req, res) => {
  try {
    const orderDetailsId = req.params.orderDetailsId;
    const orderDetails = await OrderDetails.findByPk(orderDetailsId);
    if (!orderDetails) {
      return res.status(404).send(`Failed GET request for order detail with ID ${orderDetailsId}. Must handle this on the frontend.`); // needs to be handled by front-end somehow
    } else {
      return res.send(orderDetails);
    }
  } catch (error) {
    handleError(res, error);
  }
});

// POST api/v1/orderdetails
// Create new order detail
// Frontend response: object
router.post('/', async (req, res) => {
  try {
    const newOrderDetail = OrderDetails.build({ ...req.body });
    const result = await newOrderDetail.save();
    if (result instanceof ValidationError) {
      console.error('Validation failed:', result);
      throw result;
    }
    return res.status(201).json(newOrderDetail);
  } catch (error) {
    handleError(res, error);
  }
});

// PUT api/v1/orderdetails/:orderDetailsId
// Replace an already existing order detail by order detail ID
// Frontend response: object
router.put('/:orderDetailsId([0-9]+)', async (req, res) => {
  try {
    const orderDetailsId = req.params.orderDetailsId;
    const orderDetails = await OrderDetails.findByPk(orderDetailsId);
    if (!orderDetails) {
      return res.status(404).send(`Failed PUT request for order detail with ID ${orderDetailsId}. Must handle this on the frontend.`);
    }
    orderDetails.orderId = req.body.orderId || orderDetails.orderId;
    orderDetails.productId = req.body.productId || orderDetails.productId;
    orderDetails.productQuantity = req.body.productQuantity || null;

    await orderDetails.update({ ...req.body });
    console.log(`Order detail ID ${orderDetailsId} successfully updated with PUT request`);
    return res.json(orderDetails);
  } catch (error) {
    handleError(res, error);
  }
});

// PATCH api/v1/orderdetails/:orderDetailsId
// Edit an already existing order detail by order detail ID
// Frontend response: object
router.patch('/:orderDetailsId([0-9]+)', async (req, res) => {
  try {
    const orderDetailsId = req.params.orderDetailsId;
    const orderDetails = await OrderDetails.findByPk(orderDetailsId);
    if (!orderDetails) {
      return res.status(404).send(`Failed PATCH request for order detail with ID ${orderDetailsId}. Must handle this on the frontend.`);
    }
    await orderDetails.update({ ...req.body });
    console.log(`Order detail ID ${orderDetailsId} successfully updated with PATCH request`);
    return res.json(orderDetails);
  } catch (error) {
    handleError(res, error);
  }
});

// DELETE api/orderdetails/:orderDetailsId
// Delete an order detail by order detail ID (shouldn't allow for deletion of live orders)
// Frontend response: message string
router.delete('/:orderDetailsId([0-9]+)', async (req, res) => {
  try {
    const orderDetailsId = req.params.orderDetailsId;
    const orderDetails = await OrderDetails.findByPk(req.params.orderDetailsId);
    if (!orderDetails) {
      return res.status(404).send(`Failed DELETE request for order detail with ID ${orderDetailsId}. Must handle this on the frontend.`);
    }

    await orderDetails.destroy();
    console.log(`Order details with ID ${orderDetailsId} deleted.`);
    return res.status(204).send('');
  } catch (error) {
    handleError(res, error);
  }
});

function handleError(res, error) {
  return res.status(500).send('Order detail endpoint error: ', error.message);
}

export default router;
