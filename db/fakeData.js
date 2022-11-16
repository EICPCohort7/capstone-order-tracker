import { faker } from '@faker-js/faker';
import { INTEGER } from 'sequelize';

// customer constructor
let customer = {
  customerId: INTEGER,
  firstName: String,
  middleI: String,
  lastName: String,
  phone: String,
  email: String,
  cNotes: String,
  billingAddyId: INTEGER,
  isActive: INTEGER,
};

/**
 *
 * @param {number of iteration bc db is AI customerIds} i
 * @returns customer with the fake data
 */
function generateCustomerData(i) {
  // have to save these vars to reuse in creting the obj or else for email it refers to the index of names before it
  let fName = faker.name.firstName();
  let lName = faker.name.lastName();
  customer = {
    customerId: i, // or can do faker.random.numeric
    firstName: fName,
    middleI: faker.name.middleName().substring(0, 1),
    lastName: lName,
    phone: faker.phone.number('##########'),
    email: faker.internet.email(fName, lName),
    cNotes: faker.helpers.arrayElement([
      'One of our repeat customers',
      null,
      'has filed complaint before',
      null,
    ]),
    billingAddyId: i,
    isActive: 1,
    // faker.helpers.arrayElement(['free', 'basic', 'business'])
    // faker.helpers.maybe<True>(callback: () => True, False {probability = .9}),
  };
  return customer;
}

/**
 *
 * @param {# of fake customers to create} number
 */
// id starting place
let idStart = 200;
function printCustomers(number) {
  for (let i = idStart; i <= number + idStart; i++) {
    let customerDB = generateCustomerData(i);
    // making sure that null is not put in the insert statement as a string
    if (customerDB.cNotes === null) {
      customerDB.cNotes = null;
    } else {
      customerDB.cNotes = `'${customerDB.cNotes}'`;
    }
    console.log(
      `INSERT INTO customers VALUES (${customerDB.customerId}, '${customerDB.firstName}', '${customerDB.middleI}', '${customerDB.lastName}', '${customer.phone}', '${customer.email}', ${customerDB.cNotes}, ${customerDB.billingAddyId}, ${customerDB.isActive});`
    );
    console.log();
  }
}
// number of customer insert statements to be created (meant to be changed)
let number = 3;
printCustomers(number);
