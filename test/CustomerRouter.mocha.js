/*
    This files contains integration tests that verify whether the route methods
    within CustomerRouter.js operate correctly with the capstone-ots database.
*/

import axios from 'axios';
import { expect } from 'chai';
import Customer from '../server/orm/models/Customer.js';

const host = 'http://localhost:3000/api/v1/customers';

describe('Customer Router', () => {

  before(async () => {
    await Customer.sync({ logging: false });
  });

  it('should query a customer in the customer table by customer_id.', async () => {
    let allCustomers = await axios.get(`${host}`);
    let tableLen = allCustomers.data.length;

    await Customer.create({
      firstName: 'first',
      middleInitial: 'm',
      lastName: 'last',
      phone: '777777777',
      email: 'newemail@gmail.com',
      customerNotes: 'Nothing ordered',
      billingAddressId: 1,
      customerId: 100
    }, { logging: false });

    let testCustomer = await axios.get(`${host}/100`)
    expect(testCustomer.data.firstName).to.equal('first');
    expect(testCustomer.data.middleInitial).to.equal('m');
    expect(testCustomer.data.lastName).to.equal('last');
    expect(testCustomer.data.phone).to.equal('777777777');
    expect(testCustomer.data.email).to.equal('newemail@gmail.com');
    expect(testCustomer.data.customerNotes).to.equal('Nothing ordered');
    expect(testCustomer.data.billingAddressId).to.equal(1);

    await Customer.destroy({
      where: { customerId: 100 },
      logging: false
    });
  });

  it('should return customers flagged as active', async () => {
    let allActive = await axios.get(`${host}`);
    let customerData = allActive.data;

    customerData.forEach((customer) => {
      expect(customer.isActive).to.equal(1);
    });
  });

  it('should return customer of specified email', async () => {
    const testEmail = 'newemail@gmail.com'

    await Customer.create({
      firstName: 'first',
      middleInitial: 'm',
      lastName: 'last',
      phone: '777777777',
      email: testEmail,
      customerNotes: 'Nothing ordered',
      billingAddressId: 1,
      customerId: 100
    }, { logging: false });

    let testCustomer = await axios.get(`${host}/search?email=${testEmail}`);

    let testCustomerData = testCustomer.data[0];
    expect(testCustomerData.firstName).to.equal('first');
    expect(testCustomerData.lastName).to.equal('last');
    expect(testCustomerData.email).to.equal(testEmail);

    await Customer.destroy({
      where: { customerId: testCustomerData.customerId },
      logging: false
    });
  });

  it('should add a new customer', async () => {
    const customerEmail = 'newemail@gmail.com';

    await axios.post(`${host}/`, {
      firstName: 'first',
      middleInitial: 'm',
      lastName: 'last',
      phone: '777777777',
      email: customerEmail,
      customerNotes: 'Nothing ordered',
      address: {
        street: "123 Main Street",
        aptNum: "20",
        city: "Calgary",
        state: "AB",
        zip: "90210",
        country: "Canada"
      }
    });

    let testCustomer = await axios.get(`${host}/search?email=${customerEmail}`);

    expect(testCustomer.data[0].firstName).to.equal('first');
    expect(testCustomer.data[0].lastName).to.equal('last');
    expect(testCustomer.data[0].email).to.equal(customerEmail);

    await axios.delete(`${host}/${testCustomer.data[0].customerId}`);
  });

  it('should delete a customer\'s record', async () => {
    const customerEmail = 'newemail@gmail.com';

    await axios.post(`${host}/`, {
      firstName: 'first',
      middleInitial: 'm',
      lastName: 'last',
      phone: '777777777',
      email: customerEmail,
      customerNotes: 'Nothing ordered',
      address: {
        street: "123 Main Street",
        aptNum: "20",
        city: "Calgary",
        state: "AB",
        zip: "90210",
        country: "Canada"
      }
    });

    let testCustomer = await axios.get(`${host}/search?email=${customerEmail}`);
    let newCustomerId = testCustomer.data[0].customerId;

    let allCustomers = await axios.get(`${host}`);
    let preDeleteLen = allCustomers.data.length;

    await axios.delete(`${host}/${newCustomerId}`);

    let allActive = await axios.get(`${host}`);
    let postDeleteLen = allActive.data.length;

    expect(postDeleteLen).to.equal(preDeleteLen - 1);
  });

  it('should edit a field in a customer column using the PATCH method.', async () => {
    const customerEmail = 'newemail@gmail.com';

    await axios.post(`${host}/`, {
      firstName: 'first',
      middleInitial: 'm',
      lastName: 'last',
      phone: '777777777',
      email: customerEmail,
      customerNotes: 'Nothing ordered',
      address: {
        street: "123 Main Street",
        aptNum: "20",
        city: "Calgary",
        state: "AB",
        zip: "90210",
        country: "Canada"
      }
    });

    let testCustomer = await axios.get(`${host}/search?email=${customerEmail}`);
    const customerId = testCustomer.data[0].customerId;

    let patchEmail = "patchedemail@gmail.com";
    await axios.patch(`${host}/${customerId}`, {
      firstName: 'Tommy',
      email: patchEmail
    });

    let postPatchCustomer = await axios.get(`${host}/search?email=${patchEmail}`);
    expect(postPatchCustomer.data[0].firstName).to.equal('Tommy');
    expect(postPatchCustomer.data[0].email).to.equal(patchEmail);
    await axios.delete(`${host}/${testCustomer.data[0].customerId}`);
  });

  it('should edit a row in the customer table using the PUT method.', async () => {
    const customerEmail = 'newemail@gmail.com';

    await axios.put(`${host}/1`, {
      firstName: 'first',
      middleInitial: 'm',
      lastName: 'last',
      phone: '777777777',
      email: customerEmail,
      customerNotes: 'Nothing ordered',
      address: {
        street: "123 Main Street",
        aptNum: "20",
        city: "Calgary",
        state: "AB",
        zip: "90210",
        country: "Canada"
      }
    });

    let customer = await axios.get(`${host}/1`);
    expect(customer.data.firstName).to.equal('first')
    expect(customer.data.middleInitial).to.equal('m')
    expect(customer.data.lastName).to.equal('last')
    expect(customer.data.phone).to.equal('777777777')
    expect(customer.data.email).to.equal(customerEmail)
    expect(customer.data.customerNotes).to.equal('Nothing ordered')
    expect(customer.data.isActive).to.equal(1)
  });

  describe('Customer Router Functionality Tests', () => {
    it("should test error message if a customer doesn't exist", async () => {
      try {
        await axios.get(`${host}/5`);
      } catch (error) {
        expect(error.response.status).to.equal(400);
      }
    });
  });
});
