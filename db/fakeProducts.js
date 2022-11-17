import { faker } from '@faker-js/faker';
import { FLOAT, INTEGER } from 'sequelize';

let product = {
  productId: INTEGER,
  sku: INTEGER,
  price: FLOAT,
  name: String,
  inventory: INTEGER,
  description: String,
};

function generateProductData(i) {
  // let item = faker.commerce
  let sku = `${faker.commerce.productName().substring(0, 3)}-${faker.color
    .human()
    .substring(0, 3)}-${faker.commerce.department().substring(0, 3)}`;
  product = {
    productId: i,
    sku: sku.toUpperCase(),
    price: faker.commerce.price(15, 120),
    name: faker.commerce.productName(),
    inventory: faker.random.numeric(2),
    description: faker.commerce.productDescription(),
  };
  return product;
}

let idStart = 31;
function printProducts(number) {
  for (let i = idStart; i <= number + idStart; i++) {
    let productDB = generateProductData(i);
    console.log(
      `(${productDB.productId}, "${productDB.sku}", ${productDB.price}, "${productDB.name}", ${productDB.inventory}, "${productDB.description}"),`
    );
  }
}
// number of address insert statements to be created (meant to be changed)
let number = 30;
printProducts(number);
