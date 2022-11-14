/* eslint-disable no-unused-expressions */
import { OrderStatus } from '../server/orm/models/index.js';
import { expect } from 'chai';

describe('Order model', () => {
  it('Smoke test', async () => {
    const result = await OrderStatus.sync({ logging: false });
    expect(result).to.equal(OrderStatus);
  });
  // need to modify order things for the new 5 order statuses
  it('should query an OrderStatus in the database', async () => {
    const testOrderStatus = await OrderStatus.findByPk(1, { logging: false });
    expect(testOrderStatus).not.to.be.null;
    expect(testOrderStatus.orderStatusDescription).to.equal('Order placed');
  });

  it('should query an OrderStatus not in the database', async () => {
    const testOrderStatus = await OrderStatus.findByPk(6, { logging: false });
    expect(testOrderStatus).to.be.null;
  });
});
