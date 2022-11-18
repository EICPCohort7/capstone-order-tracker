/* eslint-disable no-unused-expressions */
import { Customer } from '../server/orm/models/index.js';
import { expect } from 'chai';

/*
  Will need to add in additional unit testing based on changes to customer.
  POST api/v1/customers/
  GET api/v1/customers/search?email=[email]
  GET api/v1/customers/:customerId/orders
*/

describe('Customer model', () => {
  it('Smoke test', async () => {
    let result = await Customer.sync({ logging: false });
    expect(result).to.equal(Customer);
  });

  it('should query a Customer in the database', async () => {
    let testCustomer = await Customer.findByPk(1, { logging: false });
    expect(testCustomer).not.to.be.null;
    expect(testCustomer.firstName).to.equal('Steven');
    expect(testCustomer.middleInitial).to.equal('A');
    expect(testCustomer.lastName).to.equal('Park');
    expect(testCustomer.phone).to.equal('5584021342');
    expect(testCustomer.email).to.equal('stevepark@gmail.com');
    expect(testCustomer.customerNotes).to.equal('customer has file complaint before');
    expect(testCustomer.billingAddressId).to.equal(1);
    expect(testCustomer.isActive).to.equal(1);
  });

  it('should query a Customer not in the database', async () => {
    let testCustomerFake = await Customer.findByPk(100000, { logging: false });
    expect(testCustomerFake).to.be.null;
  });

  it('should query Order (an association)', async () => {
    let testCustomer = await Customer.findByPk(3, { logging: false });
    expect(testCustomer.email).to.equal('jamesy@hotmail.com');

    let ordersRecord = await testCustomer.getOrders({ logging: false });
    expect(ordersRecord.length).to.equal(4);

    let firstOrder = ordersRecord[0];
    expect(firstOrder.orderId).to.equal(3);

    let secondOrder = ordersRecord[1];
    expect(secondOrder.orderId).to.equal(8);

    let thirdOrder = ordersRecord[2];
    expect(thirdOrder.orderId).to.equal(18);

    let fourthOrder = ordersRecord[3];
    expect(fourthOrder.orderId).to.equal(28);
  });

  // From models/index.js - Customer.hasOne(Address, { foreignKey: 'addressId' });
  it('should query Address (an association)', async () => {
    let testCustomer = await Customer.findByPk(1, { logging: false });
    expect(testCustomer.email).to.equal('stevepark@gmail.com');

    let testAddress = await testCustomer.getAddress({ logging: false });
    expect(testAddress.addressId).to.equal(1);
    expect(testAddress.street).to.equal('lincoln street');
  });
});
