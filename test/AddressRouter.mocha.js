/*
    This file contains integration tests that verify whether the route methods
    within AddressRouter.js operate correctly with the capstone-ots database.
*/

import axios from 'axios';
import { expect } from 'chai';
import Address from '../server/orm/models/Address.js';

const host = 'http://localhost:3000/api/v1/addresses';


describe('Address Router', () => {

    before(async () => {
        await Address.sync({ logging: false });
    });

    it('Should return all orders in the address table.', async () => {
        const numRowsExpected = await Address.count({ logging: false });
        let allAddresses = await axios.get(`${host}`);
        let numAddresses = allAddresses.data.length;
        expect(numAddresses).to.equal(numRowsExpected);
    });

    it('Should add a row to the table when using the post method.', async () => {
        await axios.post(`${host}/`, {
            street: "123 Main Street",
            aptNum: "100",
            city: "Las Vegas",
            state: "NV",
            zip: "12345",
            country: "US",
        });

        let allAddresses = await axios.get(`${host}`);
        let testAddress = allAddresses.data[allAddresses.data.length - 1];

        expect(testAddress.street).to.equal("123 Main Street");
        expect(testAddress.aptNum).to.equal("100");
        expect(testAddress.city).to.equal("Las Vegas");
        expect(testAddress.state).to.equal("NV");
        expect(testAddress.zip).to.equal('12345');
        expect(testAddress.country).to.equal('US');

        await Address.destroy({
            where: { addressId: testAddress.addressId },
            logging: false
        });
    });

    it('should query an address in the address table.', async () => {
        await axios.post(`${host}/`, {
            street: "123 Main Street",
            aptNum: "100",
            city: "Las Vegas",
            state: "NV",
            zip: "12345",
            country: "US",
        });

        let allAddresses = await axios.get(`${host}`)
        let newAddressId = allAddresses.data[allAddresses.data.length - 1].addressId;
        let testAddress = await axios.get(`${host}/${newAddressId}`);

        expect(testAddress.data.street).to.equal("123 Main Street");
        expect(testAddress.data.aptNum).to.equal("100");
        expect(testAddress.data.city).to.equal("Las Vegas");
        expect(testAddress.data.state).to.equal("NV");
        expect(testAddress.data.zip).to.equal('12345');
        expect(testAddress.data.country).to.equal('US');

        await Address.destroy({
            where: { addressId: newAddressId },
            logging: false
        });
    });
});