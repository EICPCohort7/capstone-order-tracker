/* eslint-disable no-unused-expressions */
import { OrderStatus } from '../server/orm/models/index.js';
import { expect } from 'chai';

describe('OrderStatus model', () => {
  it('Smoke test', async () => {
    const result = await OrderStatus.sync({ logging: false });
    expect(result).to.equal(OrderStatus);
  });

  it('should query an OrderStatus in the database (Draft)', async () => {
    const testOrderStatus = await OrderStatus.findByPk(1, { logging: false });
    expect(testOrderStatus).not.to.be.null;
    expect(testOrderStatus.orderStatusDescription).to.equal('Draft');
  });

  it('should query an OrderStatus in the database (Order Placed)', async () => {
    const testOrderStatus = await OrderStatus.findByPk(2, { logging: false });
    expect(testOrderStatus).not.to.be.null;
    expect(testOrderStatus.orderStatusDescription).to.equal('Order Placed');
  });

  it('should query an OrderStatus in the database (In Transit)', async () => {
    const testOrderStatus = await OrderStatus.findByPk(3, { logging: false });
    expect(testOrderStatus).not.to.be.null;
    expect(testOrderStatus.orderStatusDescription).to.equal('In Transit');
  });

  it('should query an OrderStatus in the database (Delivered)', async () => {
    const testOrderStatus = await OrderStatus.findByPk(4, { logging: false });
    expect(testOrderStatus).not.to.be.null;
    expect(testOrderStatus.orderStatusDescription).to.equal('Delivered');
  });

  it('should query an OrderStatus in the database (Canceled)', async () => {
    const testOrderStatus = await OrderStatus.findByPk(5, { logging: false });
    expect(testOrderStatus).not.to.be.null;
    expect(testOrderStatus.orderStatusDescription).to.equal('Canceled');
  });

  it('should query an OrderStatus not in the database', async () => {
    const testOrderStatus = await OrderStatus.findByPk(10000, { logging: false });
    expect(testOrderStatus).to.be.null;
  });
});
