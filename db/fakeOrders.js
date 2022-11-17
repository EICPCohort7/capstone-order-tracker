import { faker } from '@faker-js/faker';
import { INTEGER } from 'sequelize';

let order = {
  orderId: INTEGER,
  customerId: INTEGER,
  orderStatusCode: INTEGER,
  orderPlaced: String,
  orderNotes: String,
  shippingAddyId: INTEGER,
};

function generateOrderData(i) {
  let orderTime = faker.date
    .between('2022-01-01T00:00:00.000Z', '2022-11-16T00:00:00.000Z')
    .toISOString()
    .substring(0, 16);
  order = {
    orderId: i,
    customerId: i,
    orderStatusCode: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    // converting to yyyy-mm-dd format and excluding time order was placed
    orderPlaced: `${orderTime.substring(0, 10)} ${orderTime.substring(
      11,
      13
    )}:${orderTime.substring(14, 16)}`,
    orderNotes: faker.helpers.arrayElement([
      'Order delayed',
      'Partial order delayed',
      null,
      null,
      'Item/s out of stock',
      null,
    ]),
    shippingAddyId: i,
  };
  return order;
}

let idStart = 31;
function printOrders(number) {
  for (let i = idStart; i <= number + idStart; i++) {
    let orderDB = generateOrderData(i);
    if (orderDB.orderNotes === null) {
      orderDB.orderNotes = null;
    } else {
      orderDB.orderNotes = `"${orderDB.orderNotes}"`;
    }
    console.log(
      `(${orderDB.orderId}, ${orderDB.customerId}, ${orderDB.orderStatusCode}, "${orderDB.orderPlaced}", ${orderDB.orderNotes}, ${orderDB.shippingAddyId}),`
    );
  }
}
// number of orders insert statements to be created (meant to be changed)
let number = 30;
printOrders(number);
