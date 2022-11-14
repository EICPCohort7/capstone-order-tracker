import axios from 'axios';
import { expect } from 'chai';
import Customer from '../server/orm/models/Customer.js';

const host = 'http://localhost:3000/api/v1/customers';

describe('Customer Router Functionality Tests', () => {
  it('Smoke Test', async () => {
    let result = await Customer.sync({ logging: false });
    expect(result).to.equal(Customer);
  });

  it('should query a customer in the customerDb', async () => {
    let testCustomer = await Customer.findByPk(2, { logging: false });
    expect(testCustomer.firstName).to.equal('Denim');
    expect(testCustomer.lastName).to.equal('Rob');
  });

  it('should return customers flagged as active', async () => {
    let allActive = await axios.get(`${host}`);
    let customerData = allActive.data;

    customerData.forEach((customer) => {
      expect(customer.isActive).to.equal(1);
    });
  });

  it('should return customer of specified email', async () => {
    const customerEmail = 'jenny12@icloud.com';
    let testCustomer = await axios.get(`${host}/search?email=${customerEmail}`);

    let testCustomerData = testCustomer.data[0];
    expect(testCustomerData.firstName).to.equal('Jenny');
    expect(testCustomerData.lastName).to.equal('nolan');
    expect(testCustomerData.email).to.equal(customerEmail);
  });

  it('should delete a customers record', async () => {
    // Add a new customer
    await axios.post(`${host}/`, {
      firstName: 'James',
      middleInitial: 'J',
      lastName: 'Jamesy',
      phone: '1111111112',
      email: 'james@james.james',
      customerNotes: 'Nothing ordered',
      billingAddressId: 3,
      isActive: true,
    });

    let testCustomer = await axios.get(`${host}/search?email=james@james.james`);
    let newCustomerId = testCustomer.data[0].customerId;

    let allCustomers = await axios.get(`${host}`);
    let preDeleteLen = allCustomers.data.length;

    await axios.delete(`${host}/${newCustomerId}`);

    let allActive = await axios.get(`${host}`);
    let postDeleteLen = allActive.data.length;

    expect(postDeleteLen).to.equal(preDeleteLen - 1);
  });

  it('should add a new customer', async () => {
    await axios.post(`${host}/`, {
      firstName: 'Tom',
      middleInitial: 'J',
      lastName: 'Tomsey',
      phone: '07985745727',
      email: 'tom@tom.tom',
      customerNotes: 'Nothing ordered',
      billingAddressId: 3,
      isActive: true,
    });

    const customerEmail = 'tom@tom.tom';
    let testCustomer = await axios.get(`${host}/search?email=${customerEmail}`);

    expect(testCustomer.data[0].email).to.equal(customerEmail);

    await axios.delete(`${host}/${testCustomer.data[0].customerId}`);
  });

  it('should edit a field in a customer column', async () => {
    await axios.post(`${host}/`, {
      firstName: 'Tom',
      middleInitial: 'J',
      lastName: 'Tomsey',
      phone: '07985745727',
      email: 'tom@tom.tom',
      customerNotes: 'Nothing ordered',
      billingAddressId: 3,
      isActive: true,
    });

    const customerEmail = 'tom@tom.tom';
    let testCustomer = await axios.get(`${host}/search?email=${customerEmail}`);
    const customerId = testCustomer.data[0].customerId;

    await axios.patch(`${host}/${customerId}`, {
      firstName: 'Tommy',
    });

    let postPatchCustomer = await axios.get(`${host}/search?email=${customerEmail}`);

    expect(postPatchCustomer.data[0].firstName).to.equal('Tommy');

    await axios.delete(`${host}/${testCustomer.data[0].customerId}`);
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
