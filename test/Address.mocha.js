/* eslint-disable no-unused-expressions */
import { Address } from '../server/orm/models/index.js';
import { expect } from 'chai';

describe('Address Model', () => {
  it('Smoke test', async () => {
    let result = await Address.sync({ logging: false });
    expect(result).to.equal(Address);
  });

  it('should query an Address in the database', async () => {
    let testAddress = await Address.findByPk(1, { logging: false });
    expect(testAddress).not.to.be.null;
    expect(testAddress.addressId).to.equal(1);
    expect(testAddress.street).to.equal('lincoln street');
    expect(testAddress.aptNum).to.equal('45');
    expect(testAddress.city).to.equal('Toronto');
    expect(testAddress.state).to.equal('ON');
    expect(testAddress.zip).to.equal('K1K Z4Z');
    expect(testAddress.country).to.equal('Canada');
  });

  it('should query an Address not in the database', async () => {
    let testAddress = await Address.findByPk(100000, { logging: false });
    expect(testAddress).to.be.null;
  });

  // From models/index.js - Address.hasMany(Customer, { foreignKey: 'billingAddressId' });
  it('should query Customers (an association)', async () => {
    let testAddress = await Address.findByPk(1, { logging: false });
    expect(testAddress.street).to.equal('lincoln street');

    let customersRecord = await testAddress.getCustomers({ logging: false });
    expect(customersRecord.length).to.equal(1);

    let firstCustomer = customersRecord[0];
    expect(firstCustomer.customerId).to.equal(1);
  });

  // From models/index.js - Address.hasMany(Order, { foreignKey: 'shippingAddressId' });
  it('should query Orders (an association)', async () => {
    let testAddress = await Address.findByPk(2, { logging: false });
    expect(testAddress.street).to.equal('1223 lion ave');

    let ordersRecord = await testAddress.getOrders({ logging: false });
    expect(ordersRecord.length).to.equal(1);

    let firstOrder = ordersRecord[0];
    expect(firstOrder.orderId).to.equal(2);
  });
});
