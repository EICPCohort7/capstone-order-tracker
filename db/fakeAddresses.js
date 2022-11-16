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
