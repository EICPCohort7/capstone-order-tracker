/**
 * File for address model, to match db teams schema
 */
/**
 * Address controller handles address related requests and responses from router
 */
import { DataTypes } from 'sequelize';
import { dbConnection } from '../capstone-connection.js';

const Address = dbConnection.define('Addresses', {
  addressId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  aptNum: {
    type: DataTypes.STRING(10),
  },
  city: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(45),
  },
  zip: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

export default Address;
