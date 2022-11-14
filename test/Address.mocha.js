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
    expect(testAddress.street).to.equal('Street');
    expect(testAddress.aptNum).to.equal('1');
    expect(testAddress.city).to.equal('City');
    expect(testAddress.state).to.equal('State');
    expect(testAddress.zip).to.equal('ZIP');
    expect(testAddress.country).to.equal('Country');
  });

  // Address.hasMany(Customer, { foreignKey: 'billingAddressId' });
  it('should query Customers (an association)', async () => {
    let testAddress = await Address.findByPk(1, { logging: false });
    expect(testAddress.street).to.equal('Street');

    let testCustomers = await testAddress.getCustomers({ logging: false });
    expect(testCustomers.length).to.equal(2);
  });

  // Address.hasMany(Order, { foreignKey: 'shippingAddressId' });
  it('should query Orders (an association)', async () => {
    let testAddress = await Address.findByPk(1, { logging: false });
    expect(testAddress.street).to.equal('Street');

    let testCustomers = await testAddress.getOrders({ logging: false });
    expect(testCustomers.length).to.equal(1);
  });
});
