/*
    This files contains integration tests that verify whether the route methods
    within OrderStatusRouter.js operate correctly with the capstone-ots database.
*/

import axios from 'axios';
import { expect } from 'chai';
import Order from '../server/orm/models/Order.js';

const host = 'api/v1/orderstatuses';

describe('Order Status Router', () => {

    it('Should find order status by orderStatusCode.', async () => {
        await axios.post(`${host}/`, {
            orderStatusDescription: "new order status"
        });

        let allOrderStatuses = await axios.get(`${host}`)
        let newOrderStatusCode = allOrderStatuses.data[allOrderStatuses.data.length - 1].orderStatusCode;
        let testOrderStatus = await axios.get(`${host}/${newOrderStatusCode}`);
        expect(testOrderStatus.data.orderStatusDescription).to.equal("new order status");
        await axios.delete(`${host}/${newOrderStatusCode}`);
    });

    it('Should return all order statuses in the order status table.', async () => {
        let allOrderStatuses = await axios.get(`${host}`);
        let oldNumOrderStatuses = allOrderStatuses.data.length;

        await axios.post(`${host}/`, {
            orderStatusDescription: "new order status"
        });

        allOrderStatuses = await axios.get(`${host}`);
        let newOrderStatusCode = allOrderStatuses.data[allOrderStatuses.data.length - 1].orderStatusCode;
        let updatedNumOrderStatuses = allOrderStatuses.data.length;
        expect(updatedNumOrderStatuses).to.equal(oldNumOrderStatuses + 1);

        await axios.delete(`${host}/${newOrderStatusCode}`);
    });

    it('Should add a row to the table when using the post method.', async () => {
        await axios.post(`${host}/`, {
            orderStatusDescription: "new order status"
        });

        let allOrderStatuses = await axios.get(`${host}`)
        let newOrderStatusCode = allOrderStatuses.data[allOrderStatuses.data.length - 1].orderStatusCode;
        let testOrderStatus = await axios.get(`${host}/${newOrderStatusCode}`);
        expect(testOrderStatus.data.orderStatusDescription).to.equal("new order status");
        await axios.delete(`${host}/${newOrderStatusCode}`);
    });

    it('should update an order status using the PUT method.', async () => {
        await axios.post(`${host}/`, {
            orderStatusDescription: "new order status"
        });

        let allOrderStatuses = await axios.get(`${host}`)
        let newOrderStatusCode = allOrderStatuses.data[allOrderStatuses.data.length - 1].orderStatusCode;

        await axios.put(`${host}/${newOrderStatusCode}`, {
            orderStatusDescription: 'PUT order description'
        });

        let testOrderStatus = await axios.get(`${host}/${newOrderStatusCode}`);
        expect(testOrderStatus.data.orderStatusDescription).to.equal("PUT order description");
        await axios.delete(`${host}/${newOrderStatusCode}`);
    });

    it('should update an order status using the PATCH method.', async () => {
        await axios.post(`${host}/`, {
            orderStatusDescription: "new order status"
        });

        let allOrderStatuses = await axios.get(`${host}`)
        let newOrderStatusCode = allOrderStatuses.data[allOrderStatuses.data.length - 1].orderStatusCode;

        await axios.patch(`${host}/${newOrderStatusCode}`, {
            orderStatusDescription: 'PATCH order description'
        });

        let testOrderStatus = await axios.get(`${host}/${newOrderStatusCode}`);
        expect(testOrderStatus.data.orderStatusDescription).to.equal("PATCH order description");
        await axios.delete(`${host}/${newOrderStatusCode}`);
    });

    it('Should delete a row from the table using the delete method.', async () => {
        await axios.post(`${host}/`, {
            orderStatusDescription: "new order status"
        });

        let allOrderStatuses = await axios.get(`${host}`)
        let newOrderStatusCode = allOrderStatuses.data[allOrderStatuses.data.length - 1].orderStatusCode;
        let preDeleteTableLen = allOrderStatuses.data.length;
        await axios.delete(`${host}/${newOrderStatusCode}`);
        allOrderStatuses = await axios.get(`${host}`);
        let postDeleteTableLen = allOrderStatuses.data.length;

        expect(preDeleteTableLen).to.not.equal(postDeleteTableLen)

        if (allOrderStatuses.data.length > 0) {
            expect(allOrderStatuses.data[allOrderStatuses.data.length - 1].orderStatusCode).to.not.equal(newOrderStatusCode);
        }
    });
});