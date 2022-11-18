/*
    This files contains integration tests that verify whether the route methods
    within OrderRouter.js operate correctly with the capstone-ots database.
*/

import axios from 'axios';
import { expect } from 'chai';
import Order from '../server/orm/models/Order.js';

const host = 'http://localhost:3000/api/v1/orders';

describe('Order Router', () => {

  it('Should find order by orderId.', async () => {
    await axios.post(`${host}/`, {
      customerId: 1,
      orderStatusCode: 1,
      orderPlaced: "1900-01-01T00:00:00.000Z",
      orderNotes: "New order",
      shippingAddressId: 1
    });

    let allOrders = await axios.get(`${host}`)
    let newOrderId = allOrders.data[allOrders.data.length - 1].orderId;
    let testOrder = await axios.get(`${host}/${newOrderId}`);

    expect(testOrder.data.orderStatusCode).to.equal(1);
    expect(testOrder.data.orderPlaced).to.equal("1900-01-01T00:00:00.000Z");
    expect(testOrder.data.orderNotes).to.equal("New order");
    expect(testOrder.data.shippingAddressId).to.equal(1);

    await axios.delete(`${host}/${newOrderId}`);
  });

  it('Should return all orders in the order table.', async () => {
    let allOrders = await axios.get(`${host}`);
    let oldNumOrders = allOrders.data.length;

    await axios.post(`${host}/`, {
      customerId: 1,
      orderStatusCode: 1,
      orderPlaced: "1900-01-01T00:00:00.000Z",
      orderNotes: "New order",
      shippingAddressId: 1
    });

    allOrders = await axios.get(`${host}`);
    let newOrderId = allOrders.data[allOrders.data.length - 1].orderId;
    let updatedNumOrders = allOrders.data.length;
    expect(updatedNumOrders).to.equal(oldNumOrders + 1);

    await axios.delete(`${host}/${newOrderId}`);
  });

  it('Should add a row to the table when using the post method.', async () => {
    await axios.post(`${host}/`, {
      customerId: 1,
      orderStatusCode: 1,
      orderPlaced: "1900-01-01T00:00:00.000Z",
      orderNotes: "New order",
      shippingAddressId: 1
    });

    let allOrders = await axios.get(`${host}`)
    let newOrderId = allOrders.data[allOrders.data.length - 1].orderId;
    let testOrder = await axios.get(`${host}/${newOrderId}`);

    expect(testOrder.data.orderStatusCode).to.equal(1);
    expect(testOrder.data.orderPlaced).to.equal("1900-01-01T00:00:00.000Z");
    expect(testOrder.data.orderNotes).to.equal("New order");
    expect(testOrder.data.shippingAddressId).to.equal(1);

    await axios.delete(`${host}/${newOrderId}`);
  });

  it('Should delete a row from the table when using the delete method.', async () => {
    await axios.post(`${host}/`, {
      customerId: 1,
      orderStatusCode: 1,
      orderPlaced: "1900-01-01T00:00:00.000Z",
      orderNotes: "New order",
      shippingAddressId: 1
    });

    let allOrders = await axios.get(`${host}`)
    let newOrderId = allOrders.data[allOrders.data.length - 1].orderId;
    let preDeleteTableLen = allOrders.data.length;
    await axios.delete(`${host}/${newOrderId}`);
    allOrders = await axios.get(`${host}`);
    let postDeleteTableLen = allOrders.data.length;

    expect(preDeleteTableLen).to.not.equal(postDeleteTableLen)

    if (allOrders.data.length > 0) {
      expect(allOrders.data[allOrders.data.length - 1].orderId).to.not.equal(newOrderId);
    }
  });

  it('should update an order using the PUT method.', async () => {
    await axios.post(`${host}/`, {
      customerId: 1,
      orderStatusCode: 1,
      orderPlaced: "1900-01-01T00:00:00.000Z",
      orderNotes: "New order",
      shippingAddressId: 1
    });

    let allOrders = await axios.get(`${host}`)
    let newOrderId = allOrders.data[allOrders.data.length - 1].orderId;

    await axios.put(`${host}/${newOrderId}`, {
      customerId: 2,
      orderStatusCode: 2,
      orderPlaced: "1901-01-01T00:00:00.000Z",
      orderNotes: "PUT order",
      shippingAddressId: 1
    });

    let testOrder = await axios.get(`${host}/${newOrderId}`);
    expect(testOrder.data.orderStatusCode).to.equal(2);
    expect(testOrder.data.orderPlaced).to.equal("1901-01-01T00:00:00.000Z");
    expect(testOrder.data.orderNotes).to.equal("PUT order");
    expect(testOrder.data.shippingAddressId).to.equal(1);
    await axios.delete(`${host}/${newOrderId}`);
  });

  it('should update an order using the PATCH method.', async () => {
    await axios.post(`${host}/`, {
      customerId: 1,
      orderStatusCode: 1,
      orderPlaced: "1900-01-01T00:00:00.000Z",
      orderNotes: "New order",
      shippingAddressId: 1
    });

    let allOrders = await axios.get(`${host}`)
    let newOrderId = allOrders.data[allOrders.data.length - 1].orderId;

    await axios.patch(`${host}/${newOrderId}`, {
      customerId: 2,
    });

    let testOrder = await axios.get(`${host}/${newOrderId}`);
    expect(testOrder.data.customerId).to.equal(2);
    expect(testOrder.data.orderStatusCode).to.equal(1);
    expect(testOrder.data.orderPlaced).to.equal("1900-01-01T00:00:00.000Z");
    expect(testOrder.data.orderNotes).to.equal("New order");
    expect(testOrder.data.shippingAddressId).to.equal(1);
    await axios.delete(`${host}/${newOrderId}`);
  });
});