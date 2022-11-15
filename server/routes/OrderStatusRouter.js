import express from 'express';
import { OrderStatus } from '../orm/models/index.js';
import { ValidationError } from 'sequelize';
let router = express.Router();

function handleError(res, error) {
  return res.status(500).send('Order Status endpoint error:', error.message);
}

// Frontend response
// findAll() returns an array of objects
// findByPk returns an object

// GET api/v1/orderstatuses
// Get all of the system's order statuses
// Frontend response: array of objects
router.get('/', async (req, res) => {
  try {
    return res.json(await OrderStatus.findAll());
  } catch (error) {
    handleError(res, error);
  }
});

// GET api/v1/orderstatuses/:orderStatusCode
// Get order status by orderStatusCode
// Frontend response: object
router.get('/:orderStatusCode([0-9]+)', async (req, res) => {
  try {
    let orderStatusCode = req.params.orderStatusCode;
    let orderStatus = await OrderStatus.findByPk(orderStatusCode);
    if (orderStatus) return res.json(orderStatus);

    return res.status(404).send(`Order Status Code ${orderStatusCode} not found`);
  } catch (error) {
    handleError(res, error);
  }
});

// POST api/v1/orderstatuses
// Create new order status
// Frontend response: object
router.post('/', async (req, res) => {
  try {
    let newOrderStatus = OrderStatus.build({ ...req.body });
    let result = await newOrderStatus.save();
    if (result instanceof ValidationError) {
      console.error('Validation failed:', result);
      throw result;
    }
    return res.status(201).json(newOrderStatus);
  } catch (error) {
    handleError(res, error);
  }
});

// PUT api/v1/orderstatuses/:orderStatusCode
// Replace an already existing order status by order status code
// Frontend response: object
router.put('/:orderStatusCode([0-9]+)', async (req, res) => {
  try {
    let orderStatus = await OrderStatus.findByPk(req.params.orderStatusCode);
    if (!orderStatus)
      return res.status(404).send(`Order Status Code ${req.params.orderStatusCode} not found`);

    orderStatus.orderStatusDescription = req.body.orderStatusDescription || null;

    await orderStatus.update({ ...req.body });
    console.log(`Order Status Code ${req.params.orderStatusCode} updated`);
    return res.json(orderStatus);
  } catch (error) {
    handleError(res, error);
  }
});

// PATCH api/orderstatuses/:orderStatusCode
// Edit an already existing order status by order status code
// Frontend response: object
router.patch('/:orderStatusCode([0-9]+)', async (req, res) => {
  try {
    let orderStatus = await OrderStatus.findByPk(req.params.orderStatusCode);
    if (!orderStatus)
      return res.status(404).send(`Order Status Code ${req.params.orderStatusCode} not found`);

    await orderStatus.update({ ...req.body });
    console.log(`Order Status Code ${req.params.orderStatusCode} updated`);
    return res.json(orderStatus);
  } catch (error) {
    handleError(res, error);
  }
});

// DELETE api/orderstatuses/:orderStatusCode
// Delete an orderStatus by orderStatusCode
// Frontend response: message string
router.delete('/:orderStatusCode([0-9]+)', async (req, res) => {
  try {
    let orderStatus = await OrderStatus.findByPk(req.params.orderStatusCode);
    if (!orderStatus)
      return res.status(404).send(`Order Status Code ${req.params.orderStatusCode} not found`);

    await orderStatus.destroy();
    console.log(`Order Status ${req.params.orderStatusCode} deleted.`);
    return res.status(204).send('');
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
