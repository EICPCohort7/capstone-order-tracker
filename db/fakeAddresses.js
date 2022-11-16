import { faker } from '@faker-js/faker';
import { INTEGER } from 'sequelize';

// address constructor
let address = {
  addressId: INTEGER,
  street: String,
  aptNum: String,
  city: String,
  state: String,
  zip: String,
  country: String,
};

function generateAddressData(i) {
  address = {
    addressId: i,
    street: faker.address.streetAddress(),
    aptNum: faker.address.buildingNumber(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    country: faker.helpers.arrayElement(['US', 'UK', 'CAN']),
  };
  return address;
}

let idStart = 200;
function printAddresses(number) {
  for (let i = idStart; i <= number + idStart; i++) {
    let addressDB = generateAddressData(i);
    if (addressDB.aptNum !== null) {
      addressDB.aptNum = `'${addressDB.aptNum}'`;
    }
    console.log(
      `INSERT INTO orders VALUES (${addressDB.addressId}, '${addressDB.street}', ${addressDB.aptNum}, '${addressDB.city}', '${addressDB.state}', '${addressDB.zip}', '${addressDB.country}');`
    );
    console.log();
  }
}
// number of address insert statements to be created (meant to be changed)
let number = 10;
printAddresses(number);
