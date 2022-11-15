import { faker } from '@faker-js/faker';
import { INTEGER } from 'sequelize';

// customer constructor
let customer = {
  customerId: String,
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
    phone: faker.phone.number('###-###-####'),
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
function printCustomers(number) {
  for (let i = 1; i <= number; i++) {
    let customerDB = generateCustomerData(i);
    // console.log(customerDB.customerId);
    // console.log(customerDB.firstName);
    // console.log(customerDB.middleI);
    // console.log(customerDB.lastName);
    // console.log(customerDB.phone);
    // console.log(customerDB.email);
    // console.log(customerDB.cNotes);
    // console.log(customerDB.billingAddyId);
    // console.log(customerDB.isActive);
    // console.log();
    console.log(
      `INSERT INTO customers VALUES (${customerDB.customerId}, '${customerDB.firstName}', '${customerDB.middleI}', '${customerDB.lastName}', '${customer.phone}', '${customer.email}', '${customerDB.cNotes}', ${customerDB.billingAddyId}, ${customerDB.isActive});`
    );
    console.log();
  }
}
let number = 3;
printCustomers(number);

// function createRandomUser(): User {
//   return {
//     _id: faker.datatype.uuid(),
//     avatar: faker.image.avatar(),
//     birthday: faker.date.birthdate(),
//     email: faker.internet.email(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     sex: faker.name.sexType(),
//     subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
//   };
// }

// const user = createRandomUser();
