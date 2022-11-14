import { Order } from '../server/orm/models/index.js';
import { expect } from 'chai';

describe('Order model', () => {
  // Order.belongsTo(Address, { foreignKey: 'shippingAddressId' });
  it('should query Order for Address (an association)', async () => {
    let testOrder = await Order.findByPk(1, { logging: false });
    expect(testOrder.orderNotes).to.equal('Notes');

    let testAddress = await testOrder.getAddress({ logging: false });
    expect(testAddress.street).to.equal('Street');
  });
});
