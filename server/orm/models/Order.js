/**
 * File for Order model, to match db teams schema
 */

import { DataTypes } from 'sequelize';
import { dbConnection } from '../capstone-connection.js';

const Order = dbConnection.define('Order', {
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderNotes: {
    type: DataTypes.STRING(1024),
  },
  orderPlaced: {
    type: DataTypes.DATE,
  },
  orderStatusCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  shippingAddressId: {
    type: DataTypes.INTEGER,
  },
});

export default Order;
