/*
 * Product router for handling product related requests from client
 */

import express from 'express';
import { Product } from '../orm/models/index.js';
let router = express.Router();

// GET api/v1/products/
// Get all of the system's products
router.get('/', async (req, res) => {
  return res.json(await Product.findAll());
});

// GET api/v1/products/:productId
// Get product by product ID
router.get('/:productId([0-9]+)', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send(`Failed GET request for product with ID ${productId}. Must handle this on the frontend.`); // needs to be handled by front-end somehow
    } else {
      return res.send(product);
    }
  } catch (error) {
    handleError(res, error);
  }
});

// PUT api/v1/products/:productId
// Replace an already existing product by product ID
router.put('/:productId([0-9]+)', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send(`Failed PUT request for product with ID ${productId}. Must handle this on the frontend.`);
    }
    product.productSku = req.body.productSku || null;
    product.productPrice = req.body.productPrice || null;
    product.productName = req.body.productName || null;
    product.productInventory = req.body.productInventory || null;
    product.productDescription = req.body.productDescription || null;

    await product.update({ ...req.body });
    console.log(`Product ID ${productId} successfully updated with PUT request`);
    return res.json(product);
  } catch (error) {
    handleError(res, error);
  }
});

// PATCH api/v1/products/:productId
// Edit an already existing product by product ID
router.patch('/:productId([0-9]+)', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send(`Failed PATCH request for product with ID ${productId}. Must handle this on the frontend.`);
    }
    await product.update({ ...req.body });
    console.log(`Product ID ${productId} successfully updated with PATCH request`);
    return res.json(product);
  } catch (error) {
    handleError(res, error);
  }
});

function handleError(res, error) {
  return res.status(500).send('Product endpoint error: ', error.message);
}

export default router;