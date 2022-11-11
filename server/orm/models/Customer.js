/**
 * File for customer model, to match db teams schema
 */
/**
 * Customer controller handles customer related requests and responses from router
 */
import { DataTypes } from 'sequelize';
import { dbConnection } from '../../capstone-connection.js';

const Customer = dbConnection.define('Customers', {
  customerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  middleInitial: {
    type: DataTypes.STRING(1),
  },
  lastName: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  customerNotes: {
    type: DataTypes.STRING(1024),
  },
  billingAddressId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
  },
});

export default Customer;
