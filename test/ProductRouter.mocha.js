import axios from 'axios';
import { expect } from 'chai';
import Product from '../server/orm/models/Product.js';

const host = 'http://localhost:3000/api/v1/products';

describe('Product Router Tests', () => {
  it('Smoke Test', async () => {
    let result = await Product.sync({ logging: false });
    expect(result).to.equal(Product);
  });

  it('should query a product in the product db by productId', async () => {
    let testProduct = await Product.findByPk(1, { logging: false });
    expect(testProduct.productSku).to.equal('A1B3011');
  });

  it('should retrieve all products stored', async () => {
    let testProducts = await axios.get(`${host}`);
    expect(testProducts.data.length).to.equal(3);
  });

  it('should modify a desired product', async () => {
    let firstProduct = await axios.get(`${host}/1`);
    let preTestSku = firstProduct.data.productSku;

    let testProducts = await axios.patch(`${host}/1`, {
      productSku: 'A1B3011',
    });

    expect(testProducts.data.productSku).to.equal('A1B3011');

    await axios.patch(`${host}/1`, {
      productSku: preTestSku,
    });
  });

  describe('\nProduct Error Tests', () => {
    it('should respond with error code 404', async () => {
      try {
        await Product.findByPk(7, { logging: false });
      } catch (error) {
        expect(error.response.status).to.be(404);
      }
    });
  });
});
