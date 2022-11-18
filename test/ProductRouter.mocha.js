/*
    This files contains integration tests that verify whether the route methods
    within ProductRouter.js operate correctly with the capstone-ots database.
*/

import axios from 'axios';
import { expect } from 'chai';
import Product from '../server/orm/models/Product.js';

const host = 'http://localhost:3000/api/v1/products';

describe('Product Router', () => {
  before(async () => {
    await Product.sync({ logging: false });
  });

  it('should query a product in the product db by productId', async () => {
    await Product.create({
      productId: 100,
      productSku: "acb-def-ghi",
      productPrice: 100.99,
      productName: "skittles",
      productInventory: 100,
      productDescription: "taste the rainbow"
    }, { logging: false });

    let testProduct = await axios.get(`${host}/100`)
    expect(testProduct.data.productSku).to.equal("acb-def-ghi");
    expect(testProduct.data.productPrice).to.equal(100.99);
    expect(testProduct.data.productName).to.equal('skittles');
    expect(testProduct.data.productInventory).to.equal(100);
    expect(testProduct.data.productDescription).to.equal('taste the rainbow');

    await Product.destroy({
      where: { productId: 100 },
      logging: false
    });
  });

  it('should retrieve all products stored', async () => {
    const numRowsExpected = await Product.count({ logging: false });
    let allProducts = await axios.get(`${host}`);
    let numProducts = allProducts.data.length;
    expect(numProducts).to.equal(numRowsExpected);

  });

  it('should update a product using the PUT method.', async () => {
    await Product.create({
      productId: 100,
      productSku: "acb-def-ghi",
      productPrice: 100.99,
      productName: "skittles",
      productInventory: 100,
      productDescription: "taste the rainbow"
    }, { logging: false });

    await axios.put(`${host}/100`, {
      productSku: 'ABC1234',
      productPrice: 20.20,
      productName: "PS5",
      productInventory: 10,
      productDescription: "The playstation 5"
    });

    let testProduct = await axios.get(`${host}/100`)
    expect(testProduct.data.productSku).to.equal('ABC1234');
    expect(testProduct.data.productPrice).to.equal(20.20);
    expect(testProduct.data.productName).to.equal('PS5');
    expect(testProduct.data.productInventory).to.equal(10);
    expect(testProduct.data.productDescription).to.equal('The playstation 5');

    await Product.destroy({
      where: { productId: 100 },
      logging: false
    });
  });

  it('should modify the desired product using the PATCH method.', async () => {
    await Product.create({
      productId: 100,
      productSku: "acb-def-ghi",
      productPrice: 100.99,
      productName: "skittles",
      productInventory: 100,
      productDescription: "taste the rainbow"
    }, { logging: false });

    await axios.patch(`${host}/100`, {
      productPrice: 599.99,
    });

    let testProduct = await axios.get(`${host}/100`)
    expect(testProduct.data.productSku).to.equal("acb-def-ghi");
    expect(testProduct.data.productPrice).to.equal(599.99);
    expect(testProduct.data.productName).to.equal('skittles');
    expect(testProduct.data.productInventory).to.equal(100);
    expect(testProduct.data.productDescription).to.equal('taste the rainbow');;

    await Product.destroy({
      where: { productId: 100 },
      logging: false
    });
  });
});
