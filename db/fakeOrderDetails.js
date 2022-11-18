import { faker } from '@faker-js/faker';
import { INTEGER } from 'sequelize';

// order details constructor
let orderDetails = {
  orderdetailsId: INTEGER,
  orderId: INTEGER,
  productId: INTEGER,
  productQuant: INTEGER,
};

/**
 *
 * @param {the count of orderDetails} i
 * @returns orderDetails
 */
function generateOrderDetailsData(i) {
  orderDetails = {
    orderdetailsId: i,
    orderId: i,
    productId: i,
    productQuant: faker.random.numeric(),
  };
  return orderDetails;
}
// id starting place
let idStart = 30;
function printAddresses(number) {
  for (let i = idStart; i <= number + idStart; i++) {
    let orderDetailsDB = generateOrderDetailsData(i);
    console.log(
      `(${orderDetailsDB.orderdetailsId}, ${orderDetailsDB.orderId}, ${orderDetailsDB.productId}, ${orderDetailsDB.productQuant}),`
    );
  }
}
// number of address insert statements to be created (meant to be changed)
let number = 30;
printAddresses(number);
