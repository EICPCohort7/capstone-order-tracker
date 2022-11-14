/* eslint-disable no-unused-expressions */
import { Product } from '../server/orm/models/index.js';
import { expect } from 'chai';

describe('Product model', () => {
  it('Smoke test', async () => {
    let result = await Product.sync({ logging: false });
    expect(result).to.equal(Product);
  });

  it('should query a Product in the database', async () => {
    let testProduct = await Product.findByPk(1, { logging: false });
    expect(testProduct).not.to.be.null;
    expect(testProduct.productSku).to.equal('A1B3011');
    expect(testProduct.productPrice).to.equal(55.3);
    expect(testProduct.productName).to.equal('Crocs');
    expect(testProduct.productInventory).to.equal(10);
    expect(testProduct.productDescription).to.equal('Nice crocs');
  });

  it('should query a Product not in the database', async () => {
    let testProductFake = await Product.findByPk(100000, { logging: false });
    expect(testProductFake).to.be.null;
  });

  it('should query Order (an association)', async () => {
    let testProduct = await Product.findByPk(3, { logging: false });
    expect(testProduct.productSku).to.equal('7Z41228');

    let ordersRecord = await testProduct.getOrders({ logging: false });
    expect(ordersRecord.length).to.equal(2);

    let firstOrder = ordersRecord[0];
    expect(firstOrder.orderId).to.equal(2);

    let secondOrder = ordersRecord[1];
    expect(secondOrder.orderId).to.equal(3);
  });
});
