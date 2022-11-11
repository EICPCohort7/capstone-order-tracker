/**
 * File for product model, to match db teams schema
 */

import { DataTypes } from 'sequelize';
import { dbConnection } from '../../capstone-connection.js';

const OrderDetails = dbConnection.define(
  'OrderDetails',
  {
    orderDetailsId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productQuantity: {
      type: DataTypes.INTEGER,
    },
  },
  { tableName: 'order_details' }
);

export default OrderDetails;
