import axios from 'axios';
import { expect } from 'chai';
import Order from '../server/orm/models/Order.js';

const host = 'http://localhost:3000/api/v1/orderdetails';

describe('Order Details', () => {

    it('Should find order details by orderDetailsId.', async () => {
        await axios.post(`${host}/`, {
            orderId: 1,
            productId: 1,
            productQuantity: 10,
        });

        let allOrdersDetails = await axios.get(`${host}`)
        let newOrderDetailsId = allOrdersDetails.data[allOrdersDetails.data.length - 1].orderDetailsId;
        let testOrderDetails = await axios.get(`${host}/${newOrderDetailsId}`);

        expect(testOrderDetails.data.orderId).to.equal(1);
        expect(testOrderDetails.data.productId).to.equal(1);
        expect(testOrderDetails.data.productQuantity).to.equal(10);

        await axios.delete(`${host}/${newOrderDetailsId}`);
    });

    it('Should return all order details in the order details table.', async () => {
        let allOrderDetails = await axios.get(`${host}`);
        let oldNumOrderDetails = allOrderDetails.data.length;

        await axios.post(`${host}/`, {
            orderId: 1,
            productId: 1,
            productQuantity: 10,
        });

        allOrderDetails = await axios.get(`${host}`);
        let newOrderDetailsId = allOrderDetails.data[allOrderDetails.data.length - 1].orderDetailsId;
        let updatedNumOrderDetails = allOrderDetails.data.length;
        expect(updatedNumOrderDetails).to.equal(oldNumOrderDetails + 1);

        await axios.delete(`${host}/${newOrderDetailsId}`);
    });

    it('Should add a row to the table when using the post method.', async () => {
        await axios.post(`${host}/`, {
            orderId: 1,
            productId: 1,
            productQuantity: 10,
        });

        let allOrderDetails = await axios.get(`${host}`)
        let newOrderDetailsId = allOrderDetails.data[allOrderDetails.data.length - 1].orderDetailsId;
        let testOrderDetails = await axios.get(`${host}/${newOrderDetailsId}`);

        expect(testOrderDetails.data.orderId).to.equal(1);
        expect(testOrderDetails.data.productId).to.equal(1);
        expect(testOrderDetails.data.productQuantity).to.equal(10);

        await axios.delete(`${host}/${newOrderDetailsId}`);
    });

    it('should update an order detail using the PUT method.', async () => {
        await axios.post(`${host}/`, {
            orderId: 1,
            productId: 1,
            productQuantity: 10,
        });

        let allOrderDetails = await axios.get(`${host}`)
        let newOrderDetailsId = allOrderDetails.data[allOrderDetails.data.length - 1].orderDetailsId;

        await axios.put(`${host}/${newOrderDetailsId}`, {
            orderId: 2,
            productId: 2,
            productQuantity: 5,
        });

        let testOrderDetails = await axios.get(`${host}/${newOrderDetailsId}`);
        expect(testOrderDetails.data.orderId).to.equal(2);
        expect(testOrderDetails.data.productId).to.equal(2);
        expect(testOrderDetails.data.productQuantity).to.equal(5);
        await axios.delete(`${host}/${newOrderDetailsId}`);
    });

    it('should update an order detail using the PATCH method.', async () => {
        await axios.post(`${host}/`, {
            orderId: 1,
            productId: 1,
            productQuantity: 10,
        });

        let allOrderDetails = await axios.get(`${host}`)
        let newOrderDetailsId = allOrderDetails.data[allOrderDetails.data.length - 1].orderDetailsId;

        await axios.patch(`${host}/${newOrderDetailsId}`, {
            productQuantity: 5,
        });

        let testOrderDetails = await axios.get(`${host}/${newOrderDetailsId}`);
        expect(testOrderDetails.data.orderId).to.equal(1);
        expect(testOrderDetails.data.productId).to.equal(1);
        expect(testOrderDetails.data.productQuantity).to.equal(5);
        await axios.delete(`${host}/${newOrderDetailsId}`);
    });

    it('Should delete a row from the table using the delete method.', async () => {
        await axios.post(`${host}/`, {
            orderId: 1,
            productId: 1,
            productQuantity: 10,
        });

        let allOrderDetails = await axios.get(`${host}`)
        let newOrderDetailsId = allOrderDetails.data[allOrderDetails.data.length - 1].orderDetailsId;
        let preDeleteTableLen = allOrderDetails.data.length;
        await axios.delete(`${host}/${newOrderDetailsId}`);
        allOrderDetails = await axios.get(`${host}`);
        let postDeleteTableLen = allOrderDetails.data.length;

        expect(preDeleteTableLen).to.not.equal(postDeleteTableLen)

        if (allOrderDetails.data.length > 0) {
            expect(allOrderDetails.data[allOrderDetails.data.length - 1].orderDetailsId).to.not.equal(newOrderDetailsId);
        }
    });
});