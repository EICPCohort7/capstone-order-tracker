import axios from 'axios';
import { expect } from 'chai';
import Order from '../server/orm/models/Order.js';

const host = 'http://localhost:3000/api/v1/orders';

describe('Order Router Tests', () => {
  it('Smoke Test', async () => {
    let result = await Order.sync({ logging: false });
    expect(result).to.equal(Order);
  });

  // it('should find order by orderId', async () => {
  //   let testOrder = await Order.findByPk(2, { logging: false });
  //   console.log(testOrder.data);
  //   expect(testOrder.data[0].customerId).to.equal(1);
  // });

  // it('should remove order by orderId', async () => {
  //   await axios.post(`${host}/`, {
  //     customerId: 4,
  //     orderNotes: 'Notes',
  //     orderPlaced: '1900-01-01T00:00:00.000Z',
  //     orderStatusCode: 3,
  //     shippingAddressId: 3,
  //   });

  //   let allOrders = await axios.get(`${host}`);
  //   let preDeleteLen = allOrders.data.length;

  //   await axios.delete(`${host}/4}`);

  //   let allActive = await axios.get(`${host}`);
  //   let postDeleteLen = allActive.data.length;

  //   expect(postDeleteLen).to.equal(preDeleteLen - 1);
  // });
});
