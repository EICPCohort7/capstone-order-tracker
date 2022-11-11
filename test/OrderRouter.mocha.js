import axios from 'axios';
import { expect } from 'chai';
import Order from '../server/orm/models/Product.js';

const host = 'http://localhost:3000/api/v1/orders';

describe('Customer Router Tests', () => {
  it('Smoke Test', async () => {
    let result = await Order.sync({ logging: false });
    expect(result).to.equal(Order);
  });

  it('should find order by orderId', async () => {
    let testOrder = await Order.findByPk(2, { logging: false });
    expect(testOrder.data[0].customerId).to.equal(1);
  });
});
