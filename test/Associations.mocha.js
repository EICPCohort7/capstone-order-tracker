import { Customer, Address, Order } from '../server/orm/models/index.js';
import { expect } from 'chai';

describe('Association Functionality Tests', () => {
  // Customer.belongsTo(Address, { foreignKey: 'billingAddressId' });
  it('should query Customer for Address (an association)', async () => {
    let testCustomer = await Customer.findByPk(1, { logging: false });
    expect(testCustomer.firstName).to.equal('John');

    let testAddress = await testCustomer.getAddress({ logging: false });
    expect(testAddress.street).to.equal('Street');
  });

  // Address.hasMany(Customer, { foreignKey: 'billingAddressId' });
  it('should query Address for Customers (an association)', async () => {
    let testAddress = await Address.findByPk(1, { logging: false });
    expect(testAddress.street).to.equal('Street');

    let testCustomers = await testAddress.getCustomers({ logging: false });
    expect(testCustomers.length).to.equal(2);
  });

  // Order.belongsTo(Address, { foreignKey: 'shippingAddressId' });
  it('should query Order for Address (an association)', async () => {
    let testOrder = await Order.findByPk(1, { logging: false });
    expect(testOrder.orderNotes).to.equal('Notes');

    let testAddress = await testOrder.getAddress({ logging: false });
    expect(testAddress.street).to.equal('Street');
  });

  // Address.hasMany(Order, { foreignKey: 'shippingAddressId' });
  it('should query Address for Orders (an association)', async () => {
    let testAddress = await Address.findByPk(1, { logging: false });
    expect(testAddress.street).to.equal('Street');

    let testCustomers = await testAddress.getOrders({ logging: false });
    expect(testCustomers.length).to.equal(1);
  });
});
