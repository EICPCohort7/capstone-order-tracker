/* eslint-disable no-unused-expressions */
import { OrderDetails } from '../server/orm/models/index.js';
import { expect } from 'chai';

describe('OrderDetails model', () => {
  it('Smoke test', async () => {
    let result = await OrderDetails.sync({ logging: false });
    expect(result).to.equal(OrderDetails);
  });

  it('should query an OrderDetails in the database', async () => {
    let testOrderDetails = await OrderDetails.findByPk(1, { logging: false });
    expect(testOrderDetails).not.to.be.null;
    expect(testOrderDetails.orderId).to.equal(1);
    expect(testOrderDetails.productId).to.equal(1);
    expect(testOrderDetails.productQuantity).to.equal(1);
  });

  it('should query an OrderDetails not in the database', async () => {
    let testOrderDetailsFake = await OrderDetails.findByPk(100000, { logging: false });
    expect(testOrderDetailsFake).to.be.null;
  });
});
