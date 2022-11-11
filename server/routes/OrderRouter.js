import express from 'express';
import { Order } from '../orm/models/index.js';
import { ValidationError } from 'sequelize';
let router = express.Router();

function handleError(res, error) {
  return res.status(500).send('Order endpoint error:', error.message);
}

// GET api/v1/orders
// Get all of the system's orders
router.get('/', async (req, res) => {
  try {
    return res.json(await Order.findAll());
  } catch (error) {
    handleError(res, error);
  }
});

// GET api/v1/orders/:orderId
// Get order by order ID
router.get('/:orderId([0-9]+)', async (req, res) => {
  try {
    let orderId = req.params.orderId;
    let order = await Order.findByPk(orderId);
    if (order) return res.json(order);

    return res.status(404).send(`Order ID ${orderId} not found`);
  } catch (error) {
    handleError(res, error);
  }
});

// POST api/v1/orders
// Create new order (think about how to differentiate between draft and live orders)
router.post('/', async (req, res) => {
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

// PUT api/v1/orders/:orderId
// Replace an already existing order by order ID
router.put('/:orderId([0-9]+)', async (req, res) => {
  try {
    let order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).send(`Order ID ${req.params.orderId} not found`);

    order.customerId = req.body.customerId || order.customerId;
    order.orderNotes = req.body.orderNotes || null;
    order.orderPlaced = req.body.orderPlaced || null;
    order.orderStatusCode = req.body.orderStatusCode || order.orderStatusCode;
    order.shippingAddressId = req.body.shippingAddressId || order.shippingAddressId;

    await order.update({ ...req.body });
    console.log(`Order id ${req.params.orderId} updated`);
    return res.json(order);
  } catch (error) {
    handleError(res, error);
  }
});

// PATCH api/orders/:orderId
// Edit an already existing order by order ID
router.patch('/:orderId([0-9]+)', async (req, res) => {
  try {
    let order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).send(`Order ID ${req.params.orderId} not found`);

    await order.update({ ...req.body });
    console.log(`Order id ${req.params.orderId} updated`);
    return res.json(order);
  } catch (error) {
    handleError(res, error);
  }
});

// DELETE api/orders/:orderId
// Delete a draft order by orderId (shouldn't allow for deletion of live orders)
router.delete('/:orderId([0-9]+)', async (req, res) => {
  try {
    let order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).send(`Order ID ${req.params.orderId} not found`);

    await order.destroy();
    console.log(`Order ${req.params.orderId} deleted.`);
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