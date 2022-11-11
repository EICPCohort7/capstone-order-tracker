import express from 'express';
import { OrderStatus } from '../orm/models/index.js';
import { ValidationError } from 'sequelize';
let router = express.Router();

function handleError(res, error) {
  return res.status(500).send('Order Status endpoint error:', error.message);
}

// GET api/v1/orderstatuses
// Get all of the system's order statuses
router.get('/', async (req, res) => {
  try {
    return res.json(await OrderStatus.findAll());
  } catch (error) {
    handleError(res, error);
  }
});

// GET api/v1/orderstatuses/:orderStatusCode
// Get order status by orderStatusCode
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
router.put('/:orderStatusCode([0-9]+)', async (req, res) => {
  try {
    let orderStatus = await OrderStatus.findByPk(req.params.orderStatusCode);
    if (!orderStatus) return res.status(404).send(`Order Status Code ${req.params.orderStatusCode} not found`);

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
router.patch('/:orderStatusCode([0-9]+)', async (req, res) => {
  try {
    let orderStatus = await OrderStatus.findByPk(req.params.orderStatusCode);
    if (!orderStatus) return res.status(404).send(`Order Status Code ${req.params.orderStatusCode} not found`);

    await orderStatus.update({ ...req.body });
    console.log(`Order Status Code ${req.params.orderStatusCode} updated`);
    return res.json(orderStatus);
  } catch (error) {
    handleError(res, error);
  }
});

// DELETE api/orderstatuses/:orderStatusCode
// Delete an orderStatus by orderStatusCode
router.delete('/:orderStatusCode([0-9]+)', async (req, res) => {
  try {
    let orderStatus = await OrderStatus.findByPk(req.params.orderStatusCode);
    if (!orderStatus) return res.status(404).send(`Order Status Code ${req.params.orderStatusCode} not found`);

    await orderStatus.destroy();
    console.log(`Order Status ${req.params.orderStatusCode} deleted.`);
    return res.status(204).send('');

    /*
      if (results === 1) {
        console.log(`Book ${req.params.bookId} deleted.`);
        return res.status(204);
      } else if (results === 0) {
        console.log(`Book ${req.params.bookId} NOT deleted, for some reason.`);
        return res.status(500).send(`Book ${req.params.bookId} not deleted for some reason`);
      } else if (results > 1) {
        console.error('Multiple books deleted, this should not happen.');
        throw new Error('Multiple books deleted, this should not happen.');
      }
      */
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
