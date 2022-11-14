/* eslint-disable no-unused-expressions */
import { Order } from '../server/orm/models/index.js';
import { expect } from 'chai';

describe('Order model', () => {
  it('Smoke test', async () => {
    let result = await Order.sync({ logging: false });
    expect(result).to.equal(Order);
  });

  it('should query an Order in the database', async () => {
    let testOrder = await Order.findByPk(1, { logging: false });
    expect(testOrder).not.to.be.null;
    expect(testOrder.customerId).to.equal(1);
    expect(testOrder.orderStatusCode).to.equal(1);
    // expect(testOrder.orderPlaced).to.equal('1900-01-01T00:00:00.000Z');
    expect(testOrder.orderNotes).to.equal('order delivery delayed to 2022-11-20');
    expect(testOrder.shippingAddressId).to.be.null;
  });

  it('should query an Order not in the database', async () => {
    let testOrderFake = await Order.findByPk(100000, { logging: false });
    expect(testOrderFake).to.be.null;
  });

  it('should query Customer (an association)', async () => {
    let testOrder = await Order.findByPk(3, { logging: false });
    expect(testOrder.orderNotes).to.equal('black sweater to ship in seperate order');

    let customerRecord = await testOrder.getCustomer({ logging: false });
    expect(customerRecord.customerId).to.equal(3);
  });

  // Order.belongsTo(Address, { foreignKey: 'shippingAddressId' });
  it('should query Order for Address (an association)', async () => {
    let testOrder = await Order.findByPk(2, { logging: false });
    expect(testOrder.orderNotes).to.equal('order delivery delayed');

    let testAddress = await testOrder.getAddress({ logging: false });
    expect(testAddress.addressId).to.equal(2);
    expect(testAddress.street).to.equal('1223 lion ave');
  });

  it('should query Product (an association)', async () => {
    let testOrder = await Order.findByPk(2, { logging: false });
    expect(testOrder.orderStatusCode).to.equal(2);

    let productsRecord = await testOrder.getProducts({ logging: false });
    expect(productsRecord.length).to.equal(1);

    let firstProduct = productsRecord[0];
    expect(firstProduct.productId).to.equal(1);
    expect(firstProduct.productSku).to.equal('DEN-BLU-MEN');
  });
});
