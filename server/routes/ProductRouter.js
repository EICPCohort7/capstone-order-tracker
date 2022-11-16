/*
 * Product router for handling product related requests from client
 */

import express from 'express';
import { Product } from '../orm/models/index.js';
let router = express.Router();

/*
 * GET api/v1/products/
 * Get all of the system's products
 * Frontend response: array of objects
 */

router.get('/', async (req, res) => {
  try {
    let allProducts = await Product.findAll();
    return res.status(200).json(allProducts);
  } catch (error) {
    handleError(res, error);
  }
});

/*
 * GET api/v1/products/:productId
 * Get product by product ID
 * Frontend response: object
 */
router.get('/:productId([0-9]+)', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res
        .status(404)
        .send(
          `Failed GET request for product with ID ${productId}. Must handle this on the frontend.`
        ); // needs to be handled by front-end somehow
    } else {
      return res.send(product);
    }
  } catch (error) {
    handleError(res, error);
  }
});

/*
 * GET api/v1/products/search?productSku=[productSku]
 * Get product by productSku
 * Frontend response: array of objects
 */
router.get('/search', async (req, res) => {
  console.log('Query string', req.query);
  const criteria = new URLSearchParams(req.query);
  const productSku = criteria.get('productSku');

  try {
    if (productSku) {
      const result = await Product.findAll({
        where: {
          productSku,
        },
      });
      if (result.length) {
        return res.json(result);
      }
      return res.status(404).json('');
    }
  } catch (error) {
    handleError(res, error);
  }
});

/*
 * PUT api/v1/products/:productId
 * Replace an already existing product by product ID
 * Frontend response: object
 */
router.put('/:productId([0-9]+)', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res
        .status(404)
        .send(
          `Failed PUT request for product with ID ${productId}. Must handle this on the frontend.`
        );
    }
    product.productSku = req.body.productSku || product.productSku;
    product.productPrice = req.body.productPrice || product.productPrice;
    product.productName = req.body.productName || product.productName;
    product.productInventory = req.body.productInventory || product.productInventory;
    product.productDescription = req.body.productDescription || null;

    await product.update({ ...req.body });
    console.log(`Product ID ${productId} successfully updated with PUT request`);
    return res.json(product);
  } catch (error) {
    handleError(res, error);
  }
});

/*
 * PATCH api/v1/products/:productId
 * Edit an already existing product by product ID
 * Frontend response: object
 */
router.patch('/:productId([0-9]+)', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res
        .status(404)
        .send(
          `Failed PATCH request for product with ID ${productId}. Must handle this on the frontend.`
        );
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
