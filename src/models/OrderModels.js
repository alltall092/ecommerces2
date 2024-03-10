const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Products = require('./ProductsModels');

const Order = sequelize.define('Order', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false},
        
          totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
          },
          status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending' // Podría ser 'pending', 'shipped', 'delivered', etc.
          },
          productId: {
            type: DataTypes.INTEGER,
            references: {
              model: Products,
              key: 'id'
            }
          }

  // Puedes agregar campos adicionales según sea necesario
});

module.exports = Order;
