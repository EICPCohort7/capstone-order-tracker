import Customer from './Customer.js';
import Address from './Address.js';
import Order from './Order.js';
import OrderStatus from './OrderStatus.js';
import Product from './Product.js';
import OrderDetails from './OrderDetails.js';
// Sequelize associations go here...
// ...

// Version that uses hasOne
// Customer/Address - one to many
// Address.hasMany(Customer, { foreignKey: 'billingAddressId' });
// Customer.hasOne(Address, { foreignKey: 'billingAddressId' });

// // Address/Order - one to many
// Address.hasMany(Order, { foreignKey: 'shippingAddressId' });
// Order.hasOne(Address, { foreignKey: 'shippingAddressId' });

// // Customer/Order - one to many
// Customer.hasMany(Order, { foreignKey: 'customerId' });
// Order.hasOne(Customer, { foreignKey: 'customerId' });

// // Order/OrderDetails - one to many
// Order.hasMany(OrderDetails, { foreignKey: 'orderId' });
// OrderDetails.hasOne(Order, { foreignKey: 'orderId' });

// // OrderStatus/Order
// OrderStatus.hasMany(Order, { foreignKey: 'orderStatusCode' });
// Order.hasOne(OrderStatus, { foreignKey: 'orderStatusCode' });

// // Product/OrderDetails
// Product.hasMany(OrderDetails, { foreignKey: 'productId' });
// OrderDetails.hasOne(Product, { foreignKey: 'productId' });

// Version that uses belongsTo
// Customer/Address - one to many
Address.hasMany(Customer, { foreignKey: 'billingAddressId' });
Customer.belongsTo(Address, { foreignKey: 'billingAddressId' });

// Address/Order - one to many
Address.hasMany(Order, { foreignKey: 'shippingAddressId' });
Order.belongsTo(Address, { foreignKey: 'shippingAddressId' });

// Customer/Order - one to many
Customer.hasMany(Order, { foreignKey: 'customerId' });
Order.belongsTo(Customer, { foreignKey: 'customerId' });

// Order/OrderDetails - one to many
// Order.hasMany(OrderDetails, { foreignKey: 'orderId' });
// OrderDetails.belongsTo(Order, { foreignKey: 'orderId' });

// OrderStatus/Order
OrderStatus.hasMany(Order, { foreignKey: 'orderStatusCode' });
Order.belongsTo(OrderStatus, { foreignKey: 'orderStatusCode' });

// Product/OrderDetails
// Product.hasMany(OrderDetails, { foreignKey: 'productId' });
// OrderDetails.belongsTo(Product, { foreignKey: 'productId' });

// Order/OrderDetails/Product
Order.belongsToMany(Product, {
  foreignKey: 'orderId',
  through: OrderDetails,
});
Product.belongsToMany(Order, {
  foreignKey: 'productId',
  through: OrderDetails,
});

export { Customer, Address, Product, Order, OrderDetails, OrderStatus };
