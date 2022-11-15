/**
 * File for OrderStatus model, to match db teams schema
 */

import { DataTypes } from 'sequelize';
import { dbConnection } from '../capstone-connection.js';

const OrderStatus = dbConnection.define('OrderStatus', {
  orderStatusCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  orderStatusDescription: {
    type: DataTypes.STRING(45),
  },
});

export default OrderStatus;
