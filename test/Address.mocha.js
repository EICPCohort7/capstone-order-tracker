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
    expect(testAddress.country).to.equal('CAN');
  });

  it('should query an Address not in the database', async () => {
    let testAddress = await Address.findByPk(100000, { logging: false });
    expect(testAddress).to.be.null;
  });
});
