/*
  Order details router for handling order details related requests from client.
  This is not part of the original API endpoints.
 */

import express from 'express';
import { OrderDetails } from '../orm/models/index.js';
import { ValidationError } from 'sequelize';

let router = express.Router();

// GET api/v1/orderdetails/
// Get all of the system's order details rows
router.get('/', async (req, res) => {
  return res.json(await OrderDetails.findAll());
});

// GET api/v1/orderdetails/:orderDetailsId
// Get order detail by order detail ID
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
router.put('/:orderDetailsId([0-9]+)', async (req, res) => {
  try {
    const orderDetailsId = req.params.orderDetailsId;
    const orderDetails = await OrderDetails.findByPk(orderDetailsId);
    if (!orderDetails) {
      return res.status(404).send(`Failed PUT request for order detail with ID ${orderDetailsId}. Must handle this on the frontend.`);
    }
    orderDetails.productQuantity = req.body.productQuantity || null; // productQuantity is only column that is not a primary or foreign key
    await orderDetails.update({ ...req.body });
    console.log(`Order detail ID ${orderDetailsId} successfully updated with PUT request`);
    return res.json(orderDetails);
  } catch (error) {
    handleError(res, error);
  }
});

// PATCH api/v1/orderdetails/:orderDetailsId
// Edit an already existing order detail by order detail ID
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
