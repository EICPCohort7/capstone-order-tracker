import Customer from './Customer.js';
import Address from './Address.js';
import Order from './Order.js';
import OrderStatus from './OrderStatus.js';
import Product from './Product.js';
import OrderDetails from './OrderDetails.js';

/**
 * Sequelize Association Declarations
 */

// Customer/Address - one to many
// Address.belongsTo(Customer, { foreignKey: 'addressId' });
Customer.hasOne(Address, {
  foreignKey: 'addressId',
  sourceKey: 'billingAddressId',
  as: 'address',
});

// Address/Order - one to many
// Address.hasMany(Order, { foreignKey: 'shippingAddressId' });
Order.hasOne(Address, {
  foreignKey: 'addressId',
  sourceKey: 'shippingAddressId',
  as: 'address',
});

// Customer/Order - one to many
Customer.hasMany(Order, { foreignKey: 'customerId' });
Order.hasOne(Customer, { foreignKey: 'customerId' });

// OrderStatus/Order - one to many
OrderStatus.hasMany(Order, { foreignKey: 'orderStatusCode' });
Order.hasOne(OrderStatus, { foreignKey: 'orderStatusCode' });

// Order/OrderDetails/Product - many to many
Order.belongsToMany(Product, {
  foreignKey: 'orderId',
  through: OrderDetails,
});
Product.belongsToMany(Order, {
  foreignKey: 'productId',
  through: OrderDetails,
});

export { Customer, Address, Product, Order, OrderDetails, OrderStatus };
