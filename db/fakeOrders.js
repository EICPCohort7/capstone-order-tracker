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
  order = {
    orderId: i,
    customerId: i,
    orderStatusCode: faker.helpers.arrayElement([1, 2, 3, 4]),
    // converting to yyyy-mm-dd format and excluding time order was placed
    orderPlaced: faker.date
      .between('2022-01-01T00:00:00.000Z', '2022-11-16T00:00:00.000Z')
      .toISOString()
      .substring(0, 10),
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

let idStart = 200;
function printOrders(number) {
  for (let i = idStart; i <= number + idStart; i++) {
    let orderDB = generateOrderData(i);
    if (orderDB.cNotes === null) {
      orderDB.cNotes = null;
    } else {
      orderDB.cNotes = `'${orderDB.cNotes}'`;
    }
    console.log(
      `INSERT INTO orders VALUES (${orderDB.orderId}, ${orderDB.customerId}, ${orderDB.orderStatusCode}, '${orderDB.orderPlaced}', ${orderDB.orderNotes}, ${orderDB.shippingAddyId});`
    );
    console.log();
  }
}
// number of orders insert statements to be created (meant to be changed)
let number = 10;
printOrders(number);
