import { Customer } from '../server/orm/models/index.js';
import { expect } from 'chai';

describe('Customer model', () => {
  // Customer.belongsTo(Address, { foreignKey: 'billingAddressId' });
  it('should query Address (an association)', async () => {
    let testCustomer = await Customer.findByPk(1, { logging: false });
    expect(testCustomer.firstName).to.equal('John');

    let testAddress = await testCustomer.getAddress({ logging: false });
    expect(testAddress.street).to.equal('Street');
  });
});
