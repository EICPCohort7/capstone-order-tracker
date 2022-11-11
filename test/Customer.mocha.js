/* eslint-disable no-unused-expressions */
import { Customer } from '../server/orm/models/index.js';
import { expect } from 'chai';

describe('Customer model', () => {
  it('Smoke test', async () => {
    let result = await Customer.sync({ logging: false });
    expect(result).to.equal(Customer);
  });

  it('should query a Customer in the database', async () => {
    let testCustomer = await Customer.findByPk(1, { logging: false });
    expect(testCustomer).not.to.be.null;
    expect(testCustomer.firstName).to.equal('John');
    expect(testCustomer.middleInitial).to.equal('J');
    expect(testCustomer.lastName).to.equal('Johnso');
    expect(testCustomer.phone).to.equal('1111111111');
    expect(testCustomer.email).to.equal('imjohn@john.john');
    expect(testCustomer.customerNotes).to.equal('Nothing ordered');
    expect(testCustomer.billingAddressId).to.equal(1);
    expect(testCustomer.isActive).to.equal(1);
  });

  it('should query a Customer not in the database', async () => {
    let testCustomerFake = await Customer.findByPk(100000, { logging: false });
    expect(testCustomerFake).to.be.null;
  });

  it('should query Order (an association)', async () => {
    let testCustomer = await Customer.findByPk(3, { logging: false });
    expect(testCustomer.email).to.equal('immike@mike.mike');

    let ordersRecord = await testCustomer.getOrders({ logging: false });
    expect(ordersRecord.length).to.equal(1);

    let firstOrder = ordersRecord[0];
    expect(firstOrder.orderId).to.equal(3);
  });
});
