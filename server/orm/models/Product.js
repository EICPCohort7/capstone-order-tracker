/**
 * File for product model, to match db teams schema
 */

import { DataTypes } from 'sequelize';
import { dbConnection } from '../../capstone-connection.js';

const Product = dbConnection.define('Product', {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  productSku: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  productPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  productInventory: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productDescription: {
    type: DataTypes.STRING(255),
  },
});

export default Product;
